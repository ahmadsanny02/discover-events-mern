import { ToasterContext } from "@/contexts/ToasterContext";
import useMediaHandling from "@/hooks/useMediaHandling";
import categoryServices from "@/services/category.service";
import { ICategory } from "@/types/Category";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
    name: yup.string().required("Please input name"),
    description: yup.string().required("Please input description"),
    icon: yup.mixed<FileList | string>().required("Please input icon"),
});

const useAddCategoryModal = () => {
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

    const preview = watch("icon")

    const fileUrl = getValues("icon")


    const handleUploadIcon = (
        files: FileList,
        onChange: (files: FileList | undefined) => void,
    ) => {
        handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
            if (fileUrl) {
                setValue("icon", fileUrl)
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

    const addCategory = async (payload: ICategory) => {
        const res = await categoryServices.addCategory(payload);

        return res;
    };

    const {
        mutate: mutateAddCategory,
        isPending: isPendingMutateAddCategory,
        isSuccess: isSuccessMutateAddCategory,
    } = useMutation({
        mutationFn: addCategory,
        onError: (error) => {
            setToaster({
                type: "error",
                message: error.message,
            });
        },
        onSuccess: () => {
            setToaster({
                type: "success",
                message: "Success add category",
            });
            reset();
        },
    });

    const handleAddCategory = (data: ICategory) => mutateAddCategory(data);

    return {
        control,
        errors,
        reset,
        handleSubmitForm,
        handleAddCategory,
        isPendingMutateAddCategory,
        isSuccessMutateAddCategory,

        preview,
        handleUploadIcon,
        isPendingMutateUploadFile,
        handleDeleteIcon,
        isPendingMutateDeleteFile,
        handleOnClose
    };
};

export default useAddCategoryModal;
