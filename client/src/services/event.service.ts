import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const eventServices = {
    getEvents: (params?: string) =>
        instance.get(`${endpoint.EVENT}?${params}`),
    addEvent: (payload: string) =>
        instance.post(endpoint.EVENT, payload),
};

export default eventServices;
