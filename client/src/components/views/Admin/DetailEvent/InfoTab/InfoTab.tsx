import { IEvent } from "@/types/Event";
import {
    Autocomplete,
    AutocompleteItem,
    Button,
    Card,
    CardBody,
    CardHeader,
    DatePicker,
    Input,
    Skeleton,
    Spinner,
    Textarea,
} from "@nextui-org/react";
import useInfoTab from "./useInfoTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { ICategory } from "@/types/Category";
import { getLocalTimeZone, now } from "@internationalized/date";
import { toInputDate } from "@/utils/date";

interface PropTypes {
    dataEvent: IEvent;
    onUpdate: (data: IEvent) => void;
    isPendingUpdate: boolean;
    isSuccessUpdate: boolean;
}

const InfoTab = (props: PropTypes) => {
    const { dataEvent, onUpdate, isPendingUpdate, isSuccessUpdate } = props;

    const {
        controlUpdateInfo,
        handleSubmitUpdateInfo,
        errorsUpdateInfo,
        resetUpdateInfo,
        setValueUpdateInfo,

        dataCategory,
    } = useInfoTab();

    useEffect(() => {
        if (dataEvent) {
            setValueUpdateInfo("name", `${dataEvent?.name}`);
            setValueUpdateInfo("description", `${dataEvent?.description}`);
            setValueUpdateInfo("slug", `${dataEvent?.slug}`);
            setValueUpdateInfo("category", `${dataEvent?.category}`);
            setValueUpdateInfo("startDate", toInputDate(`${dataEvent?.startDate}`))
            setValueUpdateInfo("endDate", toInputDate(`${dataEvent?.endDate}`))
            // setValueUpdateInfo("slug", `${dataEvent?.slug}`)
        }
    }, [dataEvent]);

    useEffect(() => {
        if (isSuccessUpdate) {
            resetUpdateInfo();
        }
    }, [isSuccessUpdate]);

    return (
        <Card className="w-full p-4 lg:w-1/2">
            <CardHeader className="flex flex-col items-center">
                <h1 className="w-full text-xl font-bold">Event Information</h1>
                <p className="w-full text-small text-default-400">
                    Manage information of this Event.
                </p>
            </CardHeader>
            <CardBody>
                <form
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmitUpdateInfo(onUpdate)}
                >
                    <Skeleton isLoaded={!!dataEvent?.name} className="rounded-lg">
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
                                    defaultValue={dataEvent?.name}
                                />
                            )}
                        />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataEvent?.slug} className="rounded-lg">
                        <Controller
                            name="slug"
                            control={controlUpdateInfo}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label="Slug"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    type="text"
                                    isInvalid={errorsUpdateInfo.slug !== undefined}
                                    errorMessage={errorsUpdateInfo.slug?.message}
                                    className="mt-2"
                                    defaultValue={dataEvent?.slug}
                                />
                            )}
                        />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataEvent?.category} className="rounded-lg">
                        <Controller
                            name="category"
                            control={controlUpdateInfo}
                            render={({ field: { onChange, ...field } }) => (
                                <Autocomplete
                                    {...field}
                                    defaultItems={dataCategory?.data.data || []}
                                    label="Category"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    defaultSelectedKey={dataEvent?.category}
                                    isInvalid={errorsUpdateInfo.category !== undefined}
                                    errorMessage={errorsUpdateInfo.category?.message}
                                    onSelectionChange={(value) => onChange(value)}
                                    placeholder="Search category here..."
                                >
                                    {(category: ICategory) => (
                                        <AutocompleteItem key={`${category._id}`}>
                                            {category.name}
                                        </AutocompleteItem>
                                    )}
                                </Autocomplete>
                            )}
                        />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataEvent?.description} className="rounded-lg">
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
                                    defaultValue={dataEvent?.description}
                                />
                            )}
                        />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataEvent?.startDate} className="rounded-lg">
                        <Controller
                            name="startDate"
                            control={controlUpdateInfo}
                            render={({ field }) => (
                                <DatePicker
                                    {...field}
                                    label="Start Date"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    hideTimeZone
                                    showMonthAndYearPickers
                                    isInvalid={errorsUpdateInfo.startDate !== undefined}
                                    errorMessage={errorsUpdateInfo.startDate?.message}
                                />
                            )}
                        />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataEvent?.endDate} className="rounded-lg">
                        <Controller
                            name="endDate"
                            control={controlUpdateInfo}
                            render={({ field }) => (
                                <DatePicker
                                    {...field}
                                    label="End Date"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    hideTimeZone
                                    showMonthAndYearPickers
                                    isInvalid={errorsUpdateInfo.endDate !== undefined}
                                    errorMessage={errorsUpdateInfo.endDate?.message}
                                />
                            )}
                        />
                    </Skeleton>

                    <Button
                        color="danger"
                        className="mt-2 disabled:bg-default-500"
                        type="submit"
                        disabled={isPendingUpdate || !dataEvent?._id}
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
