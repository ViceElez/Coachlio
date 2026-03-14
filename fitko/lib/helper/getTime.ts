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
    return mins >= 60 ? `${Math.round(mins / 60)}h` : `${mins} min`;
}

export function localDatetimeToISOString(datetimeLocal: string) {
    if (!datetimeLocal) return "";

    const [datePart, timePart] = datetimeLocal.split("T");
    const [year, month, day] = datePart.split("-").map(Number);
    const [hour, minute] = timePart.split(":").map(Number);

    const d = new Date(year, month - 1, day, hour, minute);
    return d.toISOString();
}