import { ToasterContext } from "@/contexts/ToasterContext";
import eventServices from "@/services/event.service";
import { IEvent, IEventForm } from "@/types/Event";
import { toDateStandard } from "@/utils/date";
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
        const { data } = await eventServices.updateEvent(`${query.id}`, payload);

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

    const handleUpdateEvent = (data: IEvent) => mutateUpdateEvent(data);

    const handleUpdateInfo = (data: IEventForm) => {
        const payload = {
            ...data,
            isFeatured: Boolean(data.isFeatured),
            isPublished: Boolean(data.isPublished),
            startDate: data.startDate ? toDateStandard(data.startDate) : "",
            endDate: data.endDate ? toDateStandard(data.endDate) : "",
        };
        mutateUpdateEvent(payload);
    };

    const handleUpdateLocation = (data: IEventForm) => {
        const payload = {
            isOnline: Boolean(data.isOnline),
            location: {
                region: `${data.region}`,
                coordinates: [Number(data.latitude), Number(data.longitude)],
            },
        };
        mutateUpdateEvent(payload);
    };

    const { data: dataDefaultRegion, isPending: isPendingDefaultRegion } = useQuery({
        queryKey: ["defaultRegion"],
        queryFn: () => eventServices.getRegencyById(`${dataEvent?.location?.region}`),
        enabled: !!dataEvent?.location?.region,
    });

    return {
        dataEvent,
        dataDefaultRegion,
        handleUpdateEvent,
        handleUpdateInfo,
        handleUpdateLocation,
        isPendingDefaultRegion,
        isPendingMutateUpdateEvent,
        isSuccessMutateUpdateEvent,
    };
};

export default useDetailEvent;
