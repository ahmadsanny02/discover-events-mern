import DataTable from "@/components/ui/DataTable";
import {
    Button,
    Chip,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LIST_EVENT } from "./Event.constants";
import { CiMenuKebab } from "react-icons/ci";
import Image from "next/image";
import useChangeUrl from "@/hooks/useChangeUrl";
import useEvent from "./useEvent";
import DropdownAction from "@/components/commons/DropdownAction";

const Event = () => {
    const { push, isReady, query } = useRouter();

    const {
        dataEvents,
        isLoadingEvents,
        isRefetchingEvents,
        refetchEvents,

        selectedId,
        setSelectedId,
    } = useEvent();

    const addEventModal = useDisclosure();
    const deleteEventModal = useDisclosure();

    const { setUrl } = useChangeUrl();

    useEffect(() => {
        if (isReady) {
            setUrl();
        }
    }, [isReady]);

    const renderCell = useCallback(
        (event: Record<string, unknown>, columnKey: Key) => {
            const cellValue = event[columnKey as keyof typeof event];

            switch (columnKey) {
                case "banner":
                    return (
                        <Image
                            src={`${cellValue}`}
                            alt="banner"
                            width={200}
                            height={100}
                            className="aspect-video w-36 rounded-lg object-cover"
                        />
                    );
                case "isPublish":
                    return (
                        <Chip
                            color={cellValue ? "success" : "warning"}
                            size="sm"
                            variant="flat"
                        >
                            {cellValue === true ? "Publish" : "Not Publish"}
                        </Chip>
                    );
                case "actions":
                    return (
                        <DropdownAction
                            onPressButtonDetail={() => push(`/admin/event/${event._id}`)}
                            onPressButtonDelete={() => {
                                setSelectedId(`${event._id}`);
                            }}
                        />
                    );
                default:
                    return cellValue as ReactNode;
            }
        },
        [push],
    );

    return (
        <section>
            {Object.keys(query).length > 0 && (
                <DataTable
                    buttonTopContentLabel="Create Event"
                    columns={COLUMN_LIST_EVENT}
                    data={dataEvents?.data || []}
                    emptyContent="Events is empty"
                    isLoading={isLoadingEvents || isRefetchingEvents}
                    onClickButtonTopContent={addEventModal.onOpen}
                    renderCell={renderCell}
                    totalPages={dataEvents?.pagination.totalPages}
                />
            )}
            {/* <AddEventModal
                refetchEvent={refetchEvent}
                {...addEventModal}
            />
            <DeleteEventModal
                refetchEvent={refetchEvent}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                {...deleteEventModal}
            /> */}
        </section>
    );
};

export default Event;
