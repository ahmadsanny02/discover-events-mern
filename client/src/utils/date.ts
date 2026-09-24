import { parseAbsoluteToLocal } from "@internationalized/date";
import { DateValue } from "@nextui-org/react";

const standardTime = (time: number) => {
    if (time < 10) {
        return `0${time}`
    } else {
        return time
    }
}

const toDateStandard = (date: DateValue) => {
    const year = date.year
    const month = date.month
    const day = date.day

    const hour = "hour" in date ? date.hour : 0
    const minute = "minute" in date ? date.minute : 0
    const second = "second" in date ? date.second : 0

    const result = `${year}-${month}-${day} ${standardTime(hour)}:${standardTime(minute)}:${standardTime(second)}`
    return result
}

const toInputDate = (date: string) => {
    const formattedDate = parseAbsoluteToLocal(`${date.replace(" ", "T")}+07:00`)
    return formattedDate
}

export { toDateStandard, toInputDate }