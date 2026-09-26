import useMediaHandling from "@/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateIcon = yup.object().shape({
    icon: yup.mixed<FileList | string>().required("Please input icon."),
});

const useIconTab = () => {
    const {
        isPendingMutateUploadFile,
        isPendingMutateDeleteFile,

        handleUploadFile,
        handleDeleteFile,
    } = useMediaHandling();

    const {
        control: controlUpdateIcon,
        handleSubmit: handleSubmitUpdateIcon,
        formState: { errors: errorsUpdateIcon },
        reset: resetUpdateIcon,
        watch: watchUpdateIcon,
        getValues: getValuesUpdateIcon,
        setValue: setValueUpdateIcon,
    } = useForm({
        resolver: yupResolver(schemaUpdateIcon),
    });

    const preview = watchUpdateIcon("icon");
    const fileUrl = getValuesUpdateIcon("icon");

    const handleUploadIcon = (
        files: FileList,
        onChange: (files: FileList | undefined) => void,
    ) => {
        handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
            if (fileUrl) {
                setValueUpdateIcon("icon", fileUrl);
            }
        });
    };

    const handleDeleteIcon = (
        onChange: (files: FileList | undefined) => void,
    ) => {
        handleDeleteFile(fileUrl, () => onChange(undefined));
    };

    return {
        handleDeleteIcon,
        handleUploadIcon,
        isPendingMutateDeleteFile,
        isPendingMutateUploadFile,

        controlUpdateIcon,
        handleSubmitUpdateIcon,
        errorsUpdateIcon,
        resetUpdateIcon,
        watchUpdateIcon,
        getValuesUpdateIcon,
        setValueUpdateIcon,

        preview,
    };
};

export default useIconTab;
