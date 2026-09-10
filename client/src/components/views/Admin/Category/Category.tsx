import DataTable from "@/components/ui/DataTable";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LIST_CATEGORY } from "./Category.constants";
import { CiMenuKebab } from "react-icons/ci";
import useCategory from "./useCategory";
import AddCategoryModal from "./AddCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";
import Image from "next/image";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";

const Category = () => {
    const { push, isReady, query } = useRouter();

    const {
        dataCategory,
        isLoadingCategory,
        isRefetchingCategory,
        refetchCategory,

        selectedId,
        setSelectedId,
    } = useCategory();

    const { setUrl } = useChangeUrl();

    const addCategoryModal = useDisclosure();
    const deleteCategoryModal = useDisclosure();

    useEffect(() => {
        if (isReady) {
            setUrl();
        }
    }, [isReady]);

    const renderCell = useCallback(
        (category: Record<string, unknown>, columnKey: Key) => {
            const cellValue = category[columnKey as keyof typeof category];

            switch (columnKey) {
                case "icon":
                    return (
                        <Image
                            src={`${cellValue}`}
                            alt="icon"
                            width={100}
                            height={200}
                            className="h-32 w-52 object-cover"
                        />
                    );
                case "actions":
                    return (
                        <DropdownAction
                            onPressButtonDetail={() => push(`/admin/category/${category._id}`)}
                            onPressButtonDelete={() => {
                                setSelectedId(`${category._id}`);
                                deleteCategoryModal.onOpen()
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
                    buttonTopContentLabel="Create Category"
                    columns={COLUMN_LIST_CATEGORY}
                    data={dataCategory?.data || []}
                    emptyContent="Category is empty"
                    isLoading={isLoadingCategory || isRefetchingCategory}
                    onClickButtonTopContent={addCategoryModal.onOpen}
                    renderCell={renderCell}
                    totalPages={dataCategory?.pagination.totalPages}
                />
            )}
            <AddCategoryModal
                refetchCategory={refetchCategory}
                {...addCategoryModal}
            />
            <DeleteCategoryModal
                refetchCategory={refetchCategory}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                {...deleteCategoryModal}
            />
        </section>
    );
};

export default Category;
