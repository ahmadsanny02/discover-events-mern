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
import useUpdateTicketModal from "./useUpdateTicketModal";
import { Controller } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect } from "react";
import { ITicket } from "@/types/Ticket";

interface PropTypes {
    isOpen: boolean;
    onClose: () => void;
    onOpenChange: () => void;
    refetchTicket: () => void;
    selectedDataTicket: ITicket | null;
    setSelectedDataTicket: Dispatch<SetStateAction<ITicket | null>>;
}

const UpdateTicketModal = (props: PropTypes) => {
    const {
        isOpen,
        onClose,
        onOpenChange,
        refetchTicket,
        selectedDataTicket,
        setSelectedDataTicket,
    } = props;

    const {
        control,
        errors,
        reset,

        handleSubmitForm,
        handleUpdateTicket,
        isPendingMutateUpdateTicket,
        isSuccessMutateUpdateTicket,
        setValueUpdateTicket,
    } = useUpdateTicketModal(`${selectedDataTicket?._id}`);

    useEffect(() => {
        if (isSuccessMutateUpdateTicket) {
            onClose();
            refetchTicket();
            setSelectedDataTicket(null);
        }
    }, [isSuccessMutateUpdateTicket]);

    useEffect(() => {
        if (selectedDataTicket) {
            setValueUpdateTicket("name", `${selectedDataTicket?.name}`);
            setValueUpdateTicket("price", `${selectedDataTicket?.price}`);
            setValueUpdateTicket("description", `${selectedDataTicket?.description}`);
            setValueUpdateTicket("quantity", `${selectedDataTicket?.quantity}`);
        }
    }, [selectedDataTicket]);

    const handleOnClose = () => {
        reset();
        onClose();
        setSelectedDataTicket(null);
    };

    return (
        <Modal
            onOpenChange={onOpenChange}
            isOpen={isOpen}
            onClose={handleOnClose}
            placement="center"
            scrollBehavior="inside"
        >
            <form className="" onSubmit={handleSubmitForm(handleUpdateTicket)}>
                <ModalContent className="m-4">
                    <ModalHeader>Update Ticket</ModalHeader>
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
                            disabled={isPendingMutateUpdateTicket}
                        >
                            Cancel
                        </Button>
                        <Button
                            color="danger"
                            type="submit"
                            disabled={isPendingMutateUpdateTicket}
                        >
                            {isPendingMutateUpdateTicket ? (
                                <Spinner size="sm" color="white" />
                            ) : (
                                "Update Ticket"
                            )}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    );
};

export default UpdateTicketModal;
