interface ITicket {
    _id?: string;
    name?: string;
    price?: number | string;
    quantity?: number | string;
    description?: string;
    events?: string;
}

export type { ITicket };
