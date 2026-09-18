import {
    Autocomplete,
    AutocompleteItem,
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
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { useEffect } from "react";
import useAddEventModal from "./useAddEventModal";
import { ICategory } from "@/types/Category";

interface PropTypes {
    isOpen: boolean;
    onClose: () => void;
    onOpenChange: () => void;
    refetchEvents: () => void;
}

const AddEventModal = (props: PropTypes) => {
    const { isOpen, onClose, onOpenChange, refetchEvents } = props;

    const {
        control,
        errors,

        handleSubmitForm,
        handleAddEvent,
        isPendingMutateAddEvent,
        isSuccessMutateAddEvent,

        preview,
        handleUploadBanner,
        isPendingMutateUploadFile,
        handleDeleteBanner,
        isPendingMutateDeleteFile,
        handleOnClose,

        dataCategory
    } = useAddEventModal();

    useEffect(() => {
        if (isSuccessMutateAddEvent) {
            onClose();
            refetchEvents();
        }
    }, [isSuccessMutateAddEvent]);

    const disabledSubmit =
        isPendingMutateAddEvent ||
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
            <form className="" onSubmit={handleSubmitForm(handleAddEvent)}>
                <ModalContent className="m-4">
                    <ModalHeader>Add Event</ModalHeader>
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
                                name="slug"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        label="Slug"
                                        variant="bordered"
                                        type="text"
                                        isInvalid={errors.slug !== undefined}
                                        errorMessage={errors.slug?.message}
                                        className="mb-2"
                                    />
                                )}
                            />
                            <Controller
                                name="category"
                                control={control}
                                render={({ field: { onChange, ...field } }) => (
                                    <Autocomplete
                                        {...field}
                                        defaultItems={dataCategory?.data.data || []}
                                        label="Category"
                                        variant="bordered"
                                        type="text"
                                        isInvalid={errors.category !== undefined}
                                        errorMessage={errors.category?.message}
                                        className="mb-2"
                                        onSelectionChange={(value) => onChange(value)}
                                    >
                                        {(category: ICategory) => (
                                            <AutocompleteItem key={`${category._id}`}>
                                                {category.name}
                                            </AutocompleteItem>
                                        )}
                                    </Autocomplete>
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
                            <p className="text-sm font-bold">Cover</p>
                            <Controller
                                name="banner"
                                control={control}
                                render={({ field: { onChange, value, ...field } }) => (
                                    <InputFile
                                        {...field}
                                        onDelete={() => handleDeleteBanner(onChange)}
                                        onUpload={(files) => handleUploadBanner(files, onChange)}
                                        isDeleting={isPendingMutateDeleteFile}
                                        isUploading={isPendingMutateUploadFile}
                                        isInvalid={errors.banner !== undefined}
                                        errorMessage={errors.banner?.message}
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
                            onPress={onClose}
                            disabled={disabledSubmit}
                        >
                            {isPendingMutateAddEvent ? (
                                <Spinner size="sm" color="white" />
                            ) : (
                                "Create Event"
                            )}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    );
};

export default AddEventModal;
