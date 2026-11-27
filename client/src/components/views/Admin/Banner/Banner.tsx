import DataTable from "@/components/ui/DataTable";
import { Chip, useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LIST_BANNER } from "./Banner.constants";
import useBanner from "./useBanner";
import AddBannerModal from "./AddBannerModal";
import DeleteBannerModal from "./DeleteBannerModal";
import Image from "next/image";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";

const Banner = () => {
    const { push, isReady, query } = useRouter();

    const {
        dataBanners,
        isLoadingBanners,
        isRefetchingBanners,
        refetchBanners,

        selectedId,
        setSelectedId,
    } = useBanner();

    const { setUrl } = useChangeUrl();

    const addBannerModal = useDisclosure();
    const deleteBannerModal = useDisclosure();

    useEffect(() => {
        if (isReady) {
            setUrl();
        }
    }, [isReady]);

    const renderCell = useCallback(
        (banner: Record<string, unknown>, columnKey: Key) => {
            const cellValue = banner[columnKey as keyof typeof banner];

            switch (columnKey) {
                case "image":
                    return (
                        <Image
                            src={`${cellValue}`}
                            alt="image"
                            width={300}
                            height={200}
                            className="h-32 w-52 object-cover"
                        />
                    );
                case "isShow":
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
                            onPressButtonDetail={() => push(`/admin/banner/${banner._id}`)}
                            onPressButtonDelete={() => {
                                setSelectedId(`${banner._id}`);
                                deleteBannerModal.onOpen();
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
                    buttonTopContentLabel="Create Banner"
                    columns={COLUMN_LIST_BANNER}
                    data={dataBanners?.data || []}
                    emptyContent="Banner is empty"
                    isLoading={isLoadingBanners || isRefetchingBanners}
                    onClickButtonTopContent={addBannerModal.onOpen}
                    renderCell={renderCell}
                    totalPages={dataBanners?.pagination.totalPages}
                />
            )}
            <AddBannerModal {...addBannerModal} refetchBanner={refetchBanners} />
            <DeleteBannerModal
                {...deleteBannerModal}
                refetchBanner={refetchBanners}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
            />
        </section>
    );
};

export default Banner;
