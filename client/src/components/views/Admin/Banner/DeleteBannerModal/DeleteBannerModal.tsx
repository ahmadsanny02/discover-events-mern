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
import useDeleteBannerModal from "./useDeleteBannerModal";

interface PropTypes {
    isOpen: boolean;
    onClose: () => void;
    onOpenChange: () => void;
    refetchBanner: () => void;
    selectedId: string;
    setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteBannerModal = (props: PropTypes) => {
    const {
        isOpen,
        onClose,
        onOpenChange,
        selectedId,
        setSelectedId,
        refetchBanner,
    } = props;

    const {
        mutateDeleteBanner,
        isPendingMutateDeleteBanner,
        isSuccessMutateDeleteBanner,
    } = useDeleteBannerModal();

    useEffect(() => {
        if (isSuccessMutateDeleteBanner) {
            onClose();
            refetchBanner();
            setSelectedId("")
        }
    }, [isSuccessMutateDeleteBanner]);

    return (
        <Modal
            onOpenChange={onOpenChange}
            isOpen={isOpen}
            placement="center"
            scrollBehavior="inside"
        >
            <ModalContent className="m-4">
                <ModalHeader>Delete Banner</ModalHeader>
                <ModalBody>
                    <p className="text-medium">
                        Are you sure you want to delete this Banner?
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
                        disabled={isPendingMutateDeleteBanner}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="danger"
                        type="submit"
                        onPress={() => mutateDeleteBanner(selectedId)}
                        disabled={isPendingMutateDeleteBanner}
                    >
                        {isPendingMutateDeleteBanner ? (
                            <Spinner size="sm" color="white" />
                        ) : (
                            "Delete Banner"
                        )}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default DeleteBannerModal;
