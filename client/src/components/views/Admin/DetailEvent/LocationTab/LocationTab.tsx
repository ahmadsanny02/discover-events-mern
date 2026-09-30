import { IEvent, IEventForm, IRegency } from "@/types/Event";
import {
    Autocomplete,
    AutocompleteItem,
    Button,
    Card,
    CardBody,
    CardHeader,
    Input,
    Select,
    SelectItem,
    Skeleton,
    Spinner,
    Textarea,
} from "@nextui-org/react";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import useLocationTab from "./useLocationTab";

interface PropTypes {
    dataEvent: IEvent;
    onUpdate: (data: IEventForm) => void;
    isPendingUpdate: boolean;
    isSuccessUpdate: boolean;
    dataDefaultRegion: string
    isPendingDefaultRegion: boolean
}

const LocationTab = (props: PropTypes) => {
    const { dataEvent, onUpdate, isPendingUpdate, isSuccessUpdate, dataDefaultRegion, isPendingDefaultRegion } = props;

    const {
        controlUpdateLocation,
        handleSubmitUpdateLocation,
        errorsUpdateLocation,
        resetUpdateLocation,
        setValueUpdateLocation,
        dataRegion,
        handleSearchRegion,
        searchRegency
    } = useLocationTab();

    useEffect(() => {
        if (dataEvent) {
            setValueUpdateLocation("isOnline", `${dataEvent?.isOnline}`);
            setValueUpdateLocation("region", `${dataEvent?.location?.region}`);
            setValueUpdateLocation("latitude", `${dataEvent?.location?.coordinates[0]}`);
            setValueUpdateLocation("longitude", `${dataEvent?.location?.coordinates[1]}`);
        }
    }, [dataEvent]);

    useEffect(() => {
        if (isSuccessUpdate) {
            resetUpdateLocation();
        }
    }, [isSuccessUpdate]);

    return (
        <Card className="w-full p-4 lg:w-1/2">
            <CardHeader className="flex flex-col items-center">
                <h1 className="w-full text-xl font-bold">Event Location</h1>
                <p className="w-full text-small text-default-400">
                    Manage location of this Event.
                </p>
            </CardHeader>
            <CardBody>
                <form
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmitUpdateLocation(onUpdate)}
                >
                    <Skeleton isLoaded={!!dataEvent} className="rounded-lg">
                        <Controller
                            name="isOnline"
                            control={controlUpdateLocation}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label="Online / Offline"
                                    variant="bordered"
                                    labelPlacement="outside"
                                    isInvalid={errorsUpdateLocation.isOnline !== undefined}
                                    errorMessage={errorsUpdateLocation.isOnline?.message}
                                    disallowEmptySelection
                                    defaultSelectedKeys={[dataEvent?.isOnline ? "true" : "false"]}
                                >
                                    <SelectItem key="true" value="true">
                                        Online
                                    </SelectItem>
                                    <SelectItem key="false" value="false">
                                        Offline
                                    </SelectItem>
                                </Select>
                            )}
                        />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataEvent?.location?.coordinates[0]} className="rounded-lg">
                        <Controller
                            name="latitude"
                            control={controlUpdateLocation}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label="Latitude"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    type="text"
                                    isInvalid={errorsUpdateLocation.latitude !== undefined}
                                    errorMessage={errorsUpdateLocation.latitude?.message}
                                    className="mt-2"
                                    defaultValue={dataEvent?.location?.coordinates[0]}

                                />
                            )}
                        />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataEvent?.location?.coordinates[1]} className="rounded-lg">
                        <Controller
                            name="longitude"
                            control={controlUpdateLocation}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label="Longitude"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    type="text"
                                    isInvalid={errorsUpdateLocation.longitude !== undefined}
                                    errorMessage={errorsUpdateLocation.longitude?.message}
                                    className="mt-2"
                                    defaultValue={dataEvent?.location?.coordinates[1]}
                                />
                            )}
                        />
                    </Skeleton>

                    <Skeleton isLoaded={!!dataEvent?.location?.region && !isPendingDefaultRegion} className="rounded-lg">
                        {!isPendingDefaultRegion ? (
                            <Controller
                                name="region"
                                control={controlUpdateLocation}
                                render={({ field: { onChange, ...field } }) => (
                                    <Autocomplete
                                        {...field}
                                        defaultItems={
                                            dataRegion?.data.data && searchRegency !== ""
                                                ? dataRegion?.data.data
                                                : []
                                        }
                                        label="City"
                                        defaultInputValue={dataDefaultRegion}
                                        variant="bordered"
                                        labelPlacement="outside"
                                        onInputChange={(search) => handleSearchRegion(search)}
                                        isInvalid={errorsUpdateLocation.region !== undefined}
                                        errorMessage={errorsUpdateLocation.region?.message}
                                        onSelectionChange={(value) => onChange(value)}
                                        placeholder="Search city here..."
                                    >
                                        {(regency: IRegency) => (
                                            <AutocompleteItem key={`${regency.id}`}>
                                                {regency.name}
                                            </AutocompleteItem>
                                        )}
                                    </Autocomplete>
                                )}
                            />
                        ) : (
                            <div className="w-full h-16" />
                        )}
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

export default LocationTab;
