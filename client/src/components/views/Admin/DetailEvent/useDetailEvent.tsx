import { ToasterContext } from "@/contexts/ToasterContext";
import eventServices from "@/services/event.service";
import { IEvent } from "@/types/Event";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailEvent = () => {
    const { query, isReady } = useRouter();
    const { setToaster } = useContext(ToasterContext);



    const getEventById = async (id: string) => {
        const { data } = await eventServices.getEventById(id);

        return data.data;
    };

    const { data: dataEvent, refetch: refetchEvent } = useQuery({
        queryKey: ["Event"],
        queryFn: () => getEventById(`${query.id}`),
        enabled: isReady,
    });

    const updateEvent = async (payload: IEvent) => {
        const { data } = await eventServices.updateEvent(
            `${query.id}`,
            payload,
        );

        return data.data;
    };

    const {
        mutate: mutateUpdateEvent,
        isPending: isPendingMutateUpdateEvent,
        isSuccess: isSuccessMutateUpdateEvent,
    } = useMutation({
        mutationFn: (payload: IEvent) => updateEvent(payload),
        onError: (error) => {
            setToaster({
                type: "error",
                message: error.message,
            });
        },
        onSuccess: () => {
            refetchEvent();
            setToaster({
                type: "success",
                message: "Success update event",
            });
        },
    });

    const handleUpdateEvent = (data: IEvent) => mutateUpdateEvent(data)



    return {
        dataEvent,

        handleUpdateEvent,
        isPendingMutateUpdateEvent,
        isSuccessMutateUpdateEvent,
    };
};

export default useDetailEvent;
