import { ToasterContext } from "@/contexts/ToasterContext";
import useMediaHandling from "@/hooks/useMediaHandling";
import categoryServices from "@/services/caategory.service";
import { ICategory } from "@/types/Category";
import { yupResolver } from "@hookform/resolvers/yup";
import { DateValue } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
    name: yup.string().required("Please input name"),
    slug: yup.string().required("Please input slug"),
    category: yup.string().required("Please select category"),
    startDate: yup.mixed<DateValue>().required("Please select start date"),
    endDate: yup.mixed<DateValue>().required("Please select start date"),
    isPublished: yup.string().required("Please select status"),
    isFeatured: yup.string().required("Please select featured"),
    description: yup.string().required("Please input description"),
    isOnline: yup.string().required("Please select online or offline"),
    region: yup.string().required("Please select region"),

    banner: yup.mixed<FileList | string>().required("Please input banner"),
});

const useAddEventModal = () => {
    const { setToaster } = useContext(ToasterContext);

    const {
        mutateUploadFile,
        isPendingMutateUploadFile,
        mutateDeleteFile,
        isPendingMutateDeleteFile,
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

    const preview = watch("banner")

    const addEvent = async (payload: ICategory) => {
        const res = await categoryServices.addEvent(payload);

        return res;
    };

    const {
        mutate: mutateAddEvent,
        isPending: isPendingMutateAddEvent,
        isSuccess: isSuccessMutateAddEvent,
    } = useMutation({
        mutationFn: addEvent,
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

    const handleAddEvent = (data: ICategory) => mutateAddEvent(data);

    return {
        control,
        errors,
        reset,
        handleSubmitForm,
        handleAddEvent,
        isPendingMutateAddEvent,
        isSuccessMutateAddEvent,

        preview,
        handleUploadBanner,
        isPendingMutateUploadFile,
        handleDeleteBanner,
        isPendingMutateDeleteFile,
        handleOnClose
    };
};

export default useAddEventModal;
