import { Tab, Tabs } from "@nextui-org/react";
import ImageTab from "./ImageTab";
import InfoTab from "./InfoTab";
import useDetailBanner from "./useDetailBanner";

const DetailBanner = () => {
    const {
        dataBanner,

        handleUpdateBanner,
        isPendingMutateUpdateBanner,
        isSuccessMutateUpdateBanner,
    } = useDetailBanner();

    return (
        <Tabs aria-label="Options">
            <Tab key="icon" title="Icon">
                <ImageTab
                    currentImage={dataBanner?.image}
                    onUpdate={handleUpdateBanner}
                    isPendingUpdate={isPendingMutateUpdateBanner}
                    isSuccessUpdate={isSuccessMutateUpdateBanner}
                />
            </Tab>
            <Tab key="info" title="Info">
                <InfoTab
                    dataBanner={dataBanner}
                    onUpdate={handleUpdateBanner}
                    isPendingUpdate={isPendingMutateUpdateBanner}
                    isSuccessUpdate={isSuccessMutateUpdateBanner}
                />
            </Tab>
        </Tabs>
    );
};

export default DetailBanner;
