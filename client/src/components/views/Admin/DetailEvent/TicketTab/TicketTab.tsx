import DropdownAction from "@/components/commons/DropdownAction";
import DataTable from "@/components/ui/DataTable";
import { convertIDR } from "@/utils/currency";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    useDisclosure,
} from "@nextui-org/react";
import { Fragment, Key, ReactNode, useCallback, useState } from "react";
import { COLUMN_LIST_TICKET } from "./TicketTab.constants";
import useTicketTab from "./useTicketTab";
import DeleteTicketModal from "./DeleteTicketModal";
import AddTicketModal from "./AddTicketModal";
import { ITicket } from "@/types/Ticket";

const TicketTab = () => {
    const { dataTicket, refetchTicket, isPendingTicket, isRefetchingTicket } =
        useTicketTab();

    const addTicketModal = useDisclosure();
    const deleteTicketModal = useDisclosure();
    const updateTicketModal = useDisclosure();

    const [selectedDataTicket, setSelectedDataTicket] = useState<ITicket | null>(null)

    const renderCell = useCallback(
        (ticket: Record<string, unknown>, columnKey: Key) => {
            const cellValue = ticket[columnKey as keyof typeof ticket];

            switch (columnKey) {
                case "price":
                    return `${convertIDR(cellValue as number)}`;
                case "actions":
                    return (
                        <DropdownAction
                            onPressButtonDetail={() => {
                                updateTicketModal.onOpen();
                            }}
                            onPressButtonDelete={() => {
                                deleteTicketModal.onOpen();
                                setSelectedDataTicket(ticket as ITicket)
                            }}
                        />
                    );
                default:
                    return cellValue as ReactNode;
            }
        },
        [],
    );

    return (
        <Fragment>
            <Card className="w-full p-4">
                <CardHeader className="flex items-center justify-between">
                    <div className="flex flex-col items-center">
                        <h1 className="w-full text-xl font-bold">Event Ticket</h1>
                        <p className="w-full text-small text-default-400">
                            Manage ticket of this event.
                        </p>
                    </div>
                    <Button color="danger" onPress={addTicketModal.onOpen}>Add New Ticket</Button>
                </CardHeader>
                <CardBody className="pt-0">
                    <DataTable
                        columns={COLUMN_LIST_TICKET}
                        data={dataTicket || []}
                        emptyContent="Ticket is empty"
                        isLoading={isPendingTicket || isRefetchingTicket}
                        renderCell={renderCell}
                        showLimit={false}
                        showSearch={false}
                        totalPages={1}
                    />
                </CardBody>
            </Card>
            <AddTicketModal {...addTicketModal} refetchTicket={refetchTicket} />
            <DeleteTicketModal
                {...deleteTicketModal}
                selectedDataTicket={selectedDataTicket}
                setSelectedDataTicket={setSelectedDataTicket}
                refetchTicket={refetchTicket} />
        </Fragment>
    );
};

export default TicketTab;
