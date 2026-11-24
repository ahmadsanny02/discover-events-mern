import { DateValue } from "@nextui-org/react";
import { address } from "framer-motion/client";

interface IRegency {
    id: string;
    name: string;
}

interface IEvent {
    _id?: stirng;
    name?: string;
    slug?: string;
    category?: string;
    isFeatured?: boolean | string;
    isOnline?: boolean | string;
    isPublish?: boolean | string;
    description?: string;
    startDate?: string;
    endDate?: string;
    location?: {
        address: string;
        region: string;
        coordinates: number[];
    };
    banner?: string | FileList;
}

interface IEventForm extends IEvent {
    startDate?: DateValue;
    endDate?: DateValue;
    region?: string;
    address?: string;
    latitude?: string;
    longitude?: string;
}

export type { IRegency, IEvent, IEventForm };
