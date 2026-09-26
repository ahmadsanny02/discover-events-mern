import { Tab, Tabs } from "@nextui-org/react";
import InfoTab from "./InfoTab";
import useDetailEvent from "./useDetailEvent";
import CoverTab from "./CoverTab";

const DetailEvent = () => {
    const {
        dataEvent,

        handleUpdateEvent,
        isPendingMutateUpdateEvent,
        isSuccessMutateUpdateEvent,
    } = useDetailEvent();

    return (
        <Tabs aria-label="Options">
            <Tab key="cover" title="Cover">
                <CoverTab
                    currentCover={dataEvent?.banner}
                    onUpdate={handleUpdateEvent}
                    isPendingUpdate={isPendingMutateUpdateEvent}
                    isSuccessUpdate={isSuccessMutateUpdateEvent}
                />
            </Tab>
            <Tab key="info" title="Info">
                <InfoTab
                    dataEvent={dataEvent}
                    onUpdate={handleUpdateEvent}
                    isPendingUpdate={isPendingMutateUpdateEvent}
                    isSuccessUpdate={isSuccessMutateUpdateEvent}
                />
            </Tab>
        </Tabs>
    );
};

export default DetailEvent;
