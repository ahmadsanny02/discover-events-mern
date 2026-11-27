import { ToasterContext } from "@/contexts/ToasterContext";
import useMediaHandling from "@/hooks/useMediaHandling";
import bannerServices from "@/services/banner.service";
import { IBanner } from "@/types/Banner";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
    title: yup.string().required("Please input title"),
    isShow: yup.string().required("Please input isShow"),
    image: yup.mixed<FileList | string>().required("Please input image"),
});

const useAddBannerModal = () => {
    const { setToaster } = useContext(ToasterContext);

    const {
        isPendingMutateUploadFile,
        isPendingMutateDeleteFile,

        handleUploadFile,
        handleDeleteFile,
    } = useMediaHandling();

    const {
        control,
        handleSubmit: handleSubmitForm,
        formState: { errors },
        reset,
        watch,
        getValues,
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const preview = watch("image")

    const fileUrl = getValues("image")


    const handleUploadIcon = (
        files: FileList,
        onChange: (files: FileList | undefined) => void,
    ) => {
        handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
            if (fileUrl) {
                setValue("image", fileUrl)
            }
        },)
    };

    const handleDeleteIcon = (onChange: (files: FileList | undefined) => void) => {
        handleDeleteFile(fileUrl, () => onChange(undefined))
    }

    const handleOnClose = (onClose: () => void) => {
        handleDeleteFile(fileUrl, () => {
            reset()
            onClose()
        })
    }

    const addBanner = async (payload: IBanner) => {
        const res = await bannerServices.addBanner(payload);

        return res;
    };

    const {
        mutate: mutateAddBanner,
        isPending: isPendingMutateAddBanner,
        isSuccess: isSuccessMutateAddBanner,
    } = useMutation({
        mutationFn: addBanner,
        onError: (error) => {
            setToaster({
                type: "error",
                message: error.message,
            });
        },
        onSuccess: () => {
            setToaster({
                type: "success",
                message: "Successfully added a banner",
            });
            reset();
        },
    });

    const handleAddBanner = (data: IBanner) => mutateAddBanner(data);

    return {
        control,
        errors,
        reset,
        handleSubmitForm,
        handleAddBanner,
        isPendingMutateAddBanner,
        isSuccessMutateAddBanner,

        preview,
        handleUploadIcon,
        isPendingMutateUploadFile,
        handleDeleteIcon,
        isPendingMutateDeleteFile,
        handleOnClose
    };
};

export default useAddBannerModal;
