import useChangeUrl from "@/hooks/useChangeUrl";
import categoryServices from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useCategory = () => {
    const [selectedId, setSelectedId] = useState<string>("");
    const router = useRouter();

    const { currentLimit, currentPage, currentSearch } = useChangeUrl();

    const getCategories = async () => {
        let params = `limit=${currentLimit}&page=${currentPage}`;
        if (currentSearch) {
            params += `&search=${currentSearch}`;
        }
        const res = await categoryServices.getCategories(params);
        const { data } = res;

        return data;
    };

    const {
        data: dataCategory,
        isLoading: isLoadingCategory,
        isRefetching: isRefetchingCategory,
        refetch: refetchCategory,
    } = useQuery({
        queryKey: ["Categories", currentPage, currentLimit, currentSearch],
        queryFn: () => getCategories(),
        enabled: router.isReady && !!currentPage && !!currentLimit,
    });

    return {
        dataCategory,
        isLoadingCategory,
        isRefetchingCategory,
        refetchCategory,

        selectedId,
        setSelectedId,
    };
};

export default useCategory;
