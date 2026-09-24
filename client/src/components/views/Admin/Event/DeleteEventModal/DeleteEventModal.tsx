import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Spinner,
} from "@nextui-org/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteEventModal from "./useDeleteEventModal";

interface PropTypes {
    isOpen: boolean;
    onClose: () => void;
    onOpenChange: () => void;
    refetchEvents: () => void;
    selectedId: string;
    setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteEventModal = (props: PropTypes) => {
    const {
        isOpen,
        onClose,
        onOpenChange,
        selectedId,
        setSelectedId,
        refetchEvents,
    } = props;

    const {
        mutateDeleteEvent,
        isPendingMutateDeleteEvent,
        isSuccessMutateDeleteEvent,
    } = useDeleteEventModal();

    useEffect(() => {
        if (isSuccessMutateDeleteEvent) {
            onClose();
            refetchEvents();
        }
    }, [isSuccessMutateDeleteEvent]);

    return (
        <Modal
            onOpenChange={onOpenChange}
            isOpen={isOpen}
            placement="center"
            scrollBehavior="inside"
        >
            <ModalContent className="m-4">
                <ModalHeader>Delete Event</ModalHeader>
                <ModalBody>
                    <p className="text-medium">
                        Are you sure you want to delete this event?
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="danger"
                        variant="flat"
                        onPress={() => {
                            onClose();
                            setSelectedId("");
                        }}
                        disabled={isPendingMutateDeleteEvent}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="danger"
                        type="submit"
                        onPress={() => mutateDeleteEvent(selectedId)}
                        disabled={isPendingMutateDeleteEvent}
                    >
                        {isPendingMutateDeleteEvent ? (
                            <Spinner size="sm" color="white" />
                        ) : (
                            "Delete Event"
                        )}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default DeleteEventModal;
