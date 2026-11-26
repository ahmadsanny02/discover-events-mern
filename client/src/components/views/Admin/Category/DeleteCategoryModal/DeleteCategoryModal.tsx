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
import useDeleteCategoryModal from "./useDeleteCategoryModal";

interface PropTypes {
    isOpen: boolean;
    onClose: () => void;
    onOpenChange: () => void;
    refetchCategory: () => void;
    selectedId: string;
    setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteCategoryModal = (props: PropTypes) => {
    const {
        isOpen,
        onClose,
        onOpenChange,
        selectedId,
        setSelectedId,
        refetchCategory,
    } = props;

    const {
        mutateDeleteCategory,
        isPendingMutateDeleteCategory,
        isSuccessMutateDeleteCategory,
    } = useDeleteCategoryModal();

    useEffect(() => {
        if (isSuccessMutateDeleteCategory) {
            onClose();
            refetchCategory();
            setSelectedId("")
        }
    }, [isSuccessMutateDeleteCategory]);

    return (
        <Modal
            onOpenChange={onOpenChange}
            isOpen={isOpen}
            placement="center"
            scrollBehavior="inside"
        >
            <ModalContent className="m-4">
                <ModalHeader>Delete Category</ModalHeader>
                <ModalBody>
                    <p className="text-medium">
                        Are you sure you want to delete this category?
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
                        disabled={isPendingMutateDeleteCategory}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="danger"
                        type="submit"
                        onPress={() => mutateDeleteCategory(selectedId)}
                        disabled={isPendingMutateDeleteCategory}
                    >
                        {isPendingMutateDeleteCategory ? (
                            <Spinner size="sm" color="white" />
                        ) : (
                            "Delete Category"
                        )}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default DeleteCategoryModal;
