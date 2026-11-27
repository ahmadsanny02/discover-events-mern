import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Spinner,
    Textarea,
} from "@nextui-org/react";
import useAddBannerModal from "./useAddBannerModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { useEffect } from "react";

interface PropTypes {
    isOpen: boolean;
    onClose: () => void;
    onOpenChange: () => void;
    refetchBanner: () => void;
}

const AddBannerModal = (props: PropTypes) => {
    const { isOpen, onClose, onOpenChange, refetchBanner } = props;

    const {
        control,
        errors,

        handleSubmitForm,
        handleAddBanner,
        isPendingMutateAddBanner,
        isSuccessMutateAddBanner,

        preview,
        handleUploadIcon,
        isPendingMutateUploadFile,
        handleDeleteIcon,
        isPendingMutateDeleteFile,
        handleOnClose,
    } = useAddBannerModal();

    useEffect(() => {
        if (isSuccessMutateAddBanner) {
            onClose();
            refetchBanner();
        }
    }, [isSuccessMutateAddBanner]);

    const disabledSubmit =
        isPendingMutateAddBanner ||
        isPendingMutateUploadFile ||
        isPendingMutateDeleteFile;

    return (
        <Modal
            onOpenChange={onOpenChange}
            isOpen={isOpen}
            onClose={() => handleOnClose(onClose)}
            placement="center"
            scrollBehavior="inside"
        >
            <form className="" onSubmit={handleSubmitForm(handleAddBanner)}>
                <ModalContent className="m-4">
                    <ModalHeader>Add Banner</ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-bold">Information</p>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        autoFocus
                                        label="Name"
                                        variant="bordered"
                                        type="text"
                                        isInvalid={errors.name !== undefined}
                                        errorMessage={errors.name?.message}
                                        className="mb-2"
                                    />
                                )}
                            />
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                    <Textarea
                                        {...field}
                                        label="Description"
                                        variant="bordered"
                                        isInvalid={errors.description !== undefined}
                                        errorMessage={errors.description?.message}
                                        className="mb-2"
                                    />
                                )}
                            />
                            <p className="text-sm font-bold">Icon</p>
                            <Controller
                                name="icon"
                                control={control}
                                render={({ field: { onChange, value, ...field } }) => (
                                    <InputFile
                                        {...field}
                                        onDelete={() => handleDeleteIcon(onChange)}
                                        onUpload={(files) => handleUploadIcon(files, onChange)}
                                        isDeleting={isPendingMutateDeleteFile}
                                        isUploading={isPendingMutateUploadFile}
                                        isInvalid={errors.icon !== undefined}
                                        errorMessage={errors.icon?.message}
                                        isDropable
                                        preview={typeof preview === "string" ? preview : ""}
                                    />
                                )}
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="danger"
                            variant="flat"
                            onPress={() => handleOnClose(onClose)}
                            disabled={disabledSubmit}
                        >
                            Cancel
                        </Button>
                        <Button
                            color="danger"
                            type="submit"
                            disabled={disabledSubmit}
                        >
                            {isPendingMutateAddBanner ? (
                                <Spinner size="sm" color="white" />
                            ) : (
                                "Create Banner"
                            )}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    );
};

export default AddBannerModal;
