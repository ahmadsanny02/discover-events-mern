import { ToasterContext } from "@/contexts/ToasterContext";
import categoryServices from "@/services/category.service";
import { ICategory } from "@/types/Category";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailCategory = () => {
    const { query, isReady } = useRouter();
    const { setToaster } = useContext(ToasterContext);



    const getCategoryById = async (id: string) => {
        const { data } = await categoryServices.getCategoryById(id);

        return data.data;
    };

    const { data: dataCategory, refetch: refetchCategory } = useQuery({
        queryKey: ["Category"],
        queryFn: () => getCategoryById(`${query.id}`),
        enabled: isReady,
    });

    const updateCategory = async (payload: ICategory) => {
        const { data } = await categoryServices.updateCategory(
            `${query.id}`,
            payload,
        );

        return data.data;
    };

    const {
        mutate: mutateUpdateCategory,
        isPending: isPendingMutateUpdateCategory,
        isSuccess: isSuccessMutateUpdateCategory,
    } = useMutation({
        mutationFn: (payload: ICategory) => updateCategory(payload),
        onError: (error) => {
            setToaster({
                type: "error",
                message: error.message,
            });
        },
        onSuccess: () => {
            refetchCategory();
            setToaster({
                type: "success",
                message: "Success update category",
            });
        },
    });

    const handleUpdateCategory = (data: ICategory) => mutateUpdateCategory(data)



    return {
        dataCategory,

        handleUpdateCategory,
        isPendingMutateUpdateCategory,
        isSuccessMutateUpdateCategory,
    };
};

export default useDetailCategory;
