import { ToasterContext } from "@/contexts/ToasterContext";
import eventServices from "@/services/event.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteEventModal = () => {
    const { setToaster } = useContext(ToasterContext);

    const deleteEvent = async (id: string) => {
        const res = await eventServices.deleteEvent(id);

        return res;
    };

    const {
        mutate: mutateDeleteEvent,
        isPending: isPendingMutateDeleteEvent,
        isSuccess: isSuccessMutateDeleteEvent,
    } = useMutation({
        mutationFn: deleteEvent,
        onSuccess: () => {
            setToaster({
                type: "success",
                message: "Event deleted successfully",
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
        mutateDeleteEvent,
        isPendingMutateDeleteEvent,
        isSuccessMutateDeleteEvent,
    };
};

export default useDeleteEventModal;
