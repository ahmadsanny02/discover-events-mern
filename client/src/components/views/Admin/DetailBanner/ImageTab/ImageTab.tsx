import InputFile from "@/components/ui/InputFile";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Skeleton,
    Spinner,
} from "@nextui-org/react";
import Image from "next/image";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { ICategory } from "@/types/Category";
import useImageTab from "./useImageTab";
import { IBanner } from "@/types/Banner";

interface PropTypes {
    currentImage: string;
    onUpdate: (data: IBanner) => void;
    isPendingUpdate: boolean;
    isSuccessUpdate: boolean;
}

const ImageTab = (props: PropTypes) => {
    const { currentImage, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
    const {
        handleDeleteImage,
        handleUploadImage,
        isPendingMutateDeleteFile,
        isPendingMutateUploadFile,

        controlUpdateImage,
        handleSubmitUpdateImage,
        errorsUpdateImage,
        resetUpdateImage,
        watchUpdateImage,
        getValuesUpdateImage,
        setValueUpdateImage,

        preview,
    } = useImageTab();

    useEffect(() => {
        if (isSuccessUpdate) {
            resetUpdateImage();
        }
    }, [isSuccessUpdate]);

    return (
        <Card className="w-full p-4 lg:w-1/2">
            <CardHeader className="flex flex-col items-center">
                <h1 className="w-full text-xl font-bold">Category Image</h1>
                <p className="w-full text-small text-default-400">
                    Manage Image of this category.
                </p>
            </CardHeader>
            <CardBody>
                <form
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmitUpdateImage(onUpdate)}
                >
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium text-default-700">Current Image</p>
                        <Skeleton
                            isLoaded={!!currentImage}
                            className="aspect-square rounded-lg"
                        >
                            <Image src={currentImage} alt="Image" fill className="!relative" />
                        </Skeleton>
                    </div>
                    <Controller
                        name="image"
                        control={controlUpdateImage}
                        render={({ field: { onChange, value, ...field } }) => (
                            <InputFile
                                {...field}
                                onDelete={() => handleDeleteImage(onChange)}
                                onUpload={(files) => handleUploadImage(files, onChange)}
                                isDeleting={isPendingMutateDeleteFile}
                                isUploading={isPendingMutateUploadFile}
                                isInvalid={errorsUpdateImage.image !== undefined}
                                errorMessage={errorsUpdateImage.image?.message}
                                isDropable
                                label={
                                    <p className="mb-2 text-sm font-medium text-default-700">
                                        Upload New Image
                                    </p>
                                }
                                preview={typeof preview === "string" ? preview : ""}
                            />
                        )}
                    />

                    <Button
                        color="danger"
                        className="mt-2 disabled:bg-default-500"
                        type="submit"
                        disabled={isPendingMutateUploadFile || isPendingUpdate || !preview}
                    >
                        {isPendingUpdate ? (
                            <Spinner size="sm" color="white" />
                        ) : (
                            "Save Changes"
                        )}
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
};

export default ImageTab;
