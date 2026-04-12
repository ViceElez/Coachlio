export function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("hr-HR", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

export function formatTime(iso: string) {
    return new Date(iso).toLocaleTimeString("hr-HR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
}

export function getDuration(start: string, end: string) {
    const mins = Math.round((new Date(end).getTime() - new Date(start).getTime()) / 60000);
    if (!Number.isFinite(mins)) return "";

    const absMins = Math.abs(mins);
    const sign = mins < 0 ? "-" : "";

    const hours = Math.floor(absMins / 60);
    const minutes = absMins % 60;

    if (hours === 0) return `${sign}${minutes} min`;
    if (minutes === 0) return `${sign}${hours}h`;
    return `${sign}${hours}h ${minutes}m`;
}

export function localDatetimeToISOString(datetimeLocal: string) {
    if (!datetimeLocal) return "";

    const [datePart, timePart] = datetimeLocal.split("T");
    const [year, month, day] = datePart.split("-").map(Number);
    const [hour, minute] = timePart.split(":").map(Number);

    const d = new Date(year, month - 1, day, hour, minute);
    return d.toISOString();
}

function toDatetimeLocalValue(date: Date) {
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function getEarliestSessionStart(now: Date = new Date()) {
    return new Date(now.getTime() + 60 * 60 * 1000);
}

export function earliestSessionStartDatetimeLocal(now: Date = new Date()) {
    return toDatetimeLocalValue(getEarliestSessionStart(now));
}

