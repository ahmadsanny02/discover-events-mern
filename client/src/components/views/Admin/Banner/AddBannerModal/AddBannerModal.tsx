import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem,
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
    refetchBanners: () => void;
}

const AddBannerModal = (props: PropTypes) => {
    const { isOpen, onClose, onOpenChange, refetchBanners } = props;

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
            refetchBanners();
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
                                name="title"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        autoFocus
                                        label="Name"
                                        variant="bordered"
                                        type="text"
                                        isInvalid={errors.title !== undefined}
                                        errorMessage={errors.title?.message}
                                        className="mb-2"
                                    />
                                )}
                            />
                            <Controller
                                name="isShow"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        label="Status"
                                        variant="bordered"
                                        isInvalid={errors.isShow !== undefined}
                                        errorMessage={errors.isShow?.message}
                                        disallowEmptySelection
                                    >
                                        <SelectItem key="true" value="true">
                                            Show
                                        </SelectItem>
                                        <SelectItem key="false" value="false">
                                            Hide
                                        </SelectItem>
                                    </Select>
                                )}
                            />
                            <p className="text-sm font-bold">Image</p>
                            <Controller
                                name="image"
                                control={control}
                                render={({ field: { onChange, value, ...field } }) => (
                                    <InputFile
                                        {...field}
                                        onDelete={() => handleDeleteIcon(onChange)}
                                        onUpload={(files) => handleUploadIcon(files, onChange)}
                                        isDeleting={isPendingMutateDeleteFile}
                                        isUploading={isPendingMutateUploadFile}
                                        isInvalid={errors.image !== undefined}
                                        errorMessage={errors.image?.message}
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
                        <Button color="danger" type="submit" disabled={disabledSubmit}>
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
