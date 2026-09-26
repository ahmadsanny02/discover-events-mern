import { DateValue } from "@nextui-org/react";

interface IRegency {
    id: string;
    name: string;
}

interface IEvent {
    _id?: stirng
    name?: string;
    slug?: string;
    category?: string;
    isFeatured?: boolean | string;
    isOnline?: boolean | string
    isPublished?: boolean | string;
    description?: string;
    startDate?: string;
    endDate?: string;
    location?: {
        region: string;
        coordinates: number[];
    };
    banner?: string | FileList;
}

interface IEventForm extends IEvent {
    region?: string;
    startDate?: DateValue;
    endDate?: DateValue;
    latitude?: string;
    longitude?: string;
}

export type { IRegency, IEvent, IEventForm };
