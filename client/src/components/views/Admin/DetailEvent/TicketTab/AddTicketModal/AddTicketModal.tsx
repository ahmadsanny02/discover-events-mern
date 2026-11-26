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
import useAddTicketModal from "./useAddTicketModal";
import { Controller } from "react-hook-form";
import { useEffect } from "react";

interface PropTypes {
    isOpen: boolean;
    onClose: () => void;
    onOpenChange: () => void;
    refetchTicket: () => void;
}

const AddTicketModal = (props: PropTypes) => {
    const { isOpen, onClose, onOpenChange, refetchTicket } = props;

    const {
        control,
        errors,
        reset,

        handleSubmitForm,
        handleAddTicket,
        isPendingMutateAddTicket,
        isSuccessMutateAddTicket,

    } = useAddTicketModal();

    useEffect(() => {
        if (isSuccessMutateAddTicket) {
            onClose();
            refetchTicket();
        }
    }, [isSuccessMutateAddTicket]);

    const handleOnClose = () => {
        reset()
        onClose()
    }

    return (
        <Modal
            onOpenChange={onOpenChange}
            isOpen={isOpen}
            onClose={handleOnClose}
            placement="center"
            scrollBehavior="inside"
        >
            <form className="" onSubmit={handleSubmitForm(handleAddTicket)}>
                <ModalContent className="m-4">
                    <ModalHeader>Add Ticket</ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-4">
                            <p className="text-sm font-bold">Information</p>
                            <div className="flex flex-col gap-4">
                                <Controller
                                    name="name"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            label="Name"
                                            variant="bordered"
                                            type="text"
                                            isInvalid={errors.name !== undefined}
                                            errorMessage={errors.name?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    name="price"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            label="Price"
                                            variant="bordered"
                                            type="text"
                                            isInvalid={errors.price !== undefined}
                                            errorMessage={errors.price?.message}
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
                                        />
                                    )}
                                />
                                <Controller
                                    name="quantity"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            label="Quantity"
                                            variant="bordered"
                                            type="text"
                                            isInvalid={errors.quantity !== undefined}
                                            errorMessage={errors.quantity?.message}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="danger"
                            variant="flat"
                            onPress={handleOnClose}
                            disabled={isPendingMutateAddTicket}
                        >
                            Cancel
                        </Button>
                        <Button
                            color="danger"
                            type="submit"
                            disabled={isPendingMutateAddTicket}
                        >
                            {isPendingMutateAddTicket ? (
                                <Spinner size="sm" color="white" />
                            ) : (
                                "Create Ticket"
                            )}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    );
};

export default AddTicketModal;
