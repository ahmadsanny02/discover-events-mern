import { ToasterContext } from "@/contexts/ToasterContext";
import BannerServices from "@/services/Banner.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteBannerModal = () => {
    const { setToaster } = useContext(ToasterContext);

    const deleteBanner = async (id: string) => {
        const res = await BannerServices.deleteBanner(id);

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
                message: "Successfully deleted a Banner",
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
