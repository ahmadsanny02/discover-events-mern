import { ToasterContext } from "@/contexts/ToasterContext";
import ticketServices from "@/services/ticket.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteTicketModal = () => {
    const { setToaster } = useContext(ToasterContext);

    const deleteTicket = async (id: string) => {
        const res = await ticketServices.deleteTicket(id);

        return res;
    };

    const {
        mutate: mutateDeleteTicket,
        isPending: isPendingMutateDeleteTicket,
        isSuccess: isSuccessMutateDeleteTicket,
    } = useMutation({
        mutationFn: deleteTicket,
        onSuccess: () => {
            setToaster({
                type: "success",
                message: "Successfully deleted a ticket",
            });
        },
        onError: (error) => {
            setToaster({
                type: "error",
                message: error.message,
            });
        },
    });

    return {
        mutateDeleteTicket,
        isPendingMutateDeleteTicket,
        isSuccessMutateDeleteTicket,
    };
};

export default useDeleteTicketModal;
