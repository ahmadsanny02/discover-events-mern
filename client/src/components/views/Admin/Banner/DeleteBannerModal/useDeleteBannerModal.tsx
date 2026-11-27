import { ToasterContext } from "@/contexts/ToasterContext";
import bannerServices from "@/services/banner.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteBannerModal = () => {
    const { setToaster } = useContext(ToasterContext);

    const deleteBanner = async (id: string) => {
        const res = await bannerServices.deleteBanner(id);

        return res;
    };

    const {
        mutate: mutateDeleteBanner,
        isPending: isPendingMutateDeleteBanner,
        isSuccess: isSuccessMutateDeleteBanner,
    } = useMutation({
        mutationFn: deleteBanner,
        onSuccess: () => {
            setToaster({
                type: "success",
                message: "Successfully deleted a banner",
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
        mutateDeleteBanner,
        isPendingMutateDeleteBanner,
        isSuccessMutateDeleteBanner,
    };
};

export default useDeleteBannerModal;
