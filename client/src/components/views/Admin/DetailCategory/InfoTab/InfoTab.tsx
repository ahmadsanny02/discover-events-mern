import { ICategory } from "@/types/Category";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Input,
    Skeleton,
    Spinner,
    Textarea,
} from "@nextui-org/react";
import useInfoTab from "./useInfoTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";

interface PropTypes {
    dataCategory: ICategory;
    onUpdate: (data: ICategory) => void;
    isPendingUpdate: boolean;
    isSuccessUpdate: boolean;
}

const InfoTab = (props: PropTypes) => {
    const { dataCategory, onUpdate, isPendingUpdate, isSuccessUpdate } = props;

    const {
        controlUpdateInfo,
        handleSubmitUpdateInfo,
        errorsUpdateInfo,
        resetUpdateInfo,
        setValueUpdateInfo,
    } = useInfoTab();

    useEffect(() => {
        setValueUpdateInfo("name", `${dataCategory?.name}`);
        setValueUpdateInfo("description", `${dataCategory?.description}`);
    }, [dataCategory]);

    useEffect(() => {
        if (isSuccessUpdate) {
            resetUpdateInfo();
        }
    }, [isSuccessUpdate]);

    return (
        <Card className="w-full p-4 lg:w-1/2">
            <CardHeader className="flex flex-col items-center">
                <h1 className="w-full text-xl font-bold">Category Information</h1>
                <p className="w-full text-small text-default-400">
                    Manage information of this category.
                </p>
            </CardHeader>
            <CardBody>
                <form
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmitUpdateInfo(onUpdate)}
                >
                    <Skeleton isLoaded={dataCategory?.name !== undefined} className="rounded-lg">
                        <Controller
                            name="name"
                            control={controlUpdateInfo}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label="Name"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    type="text"
                                    isInvalid={errorsUpdateInfo.name !== undefined}
                                    errorMessage={errorsUpdateInfo.name?.message}
                                    className="mt-2"
                                    defaultValue={dataCategory?.name}
                                />
                            )}
                        />
                    </Skeleton>
                    <Skeleton isLoaded={dataCategory?.description !== undefined} className="rounded-lg">
                        <Controller
                            name="description"
                            control={controlUpdateInfo}
                            render={({ field }) => (
                                <Textarea
                                    {...field}
                                    label="Description"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    isInvalid={errorsUpdateInfo.description !== undefined}
                                    errorMessage={errorsUpdateInfo.description?.message}
                                    defaultValue={dataCategory?.description}
                                />
                            )}
                        />
                    </Skeleton>

                    <Button
                        color="danger"
                        className="mt-2 disabled:bg-default-500"
                        type="submit"
                        disabled={isPendingUpdate || !dataCategory?._id}
                    >
                        {isPendingUpdate ? (
                            <Spinner size="sm" color="white" />
                        ) : (
                            "Save Changes"
                        )}
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
};

export default InfoTab;
