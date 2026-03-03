export function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

export function formatTime(iso: string) {
    return new Date(iso).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    });
}

export function getDuration(start: string, end: string) {
    const mins = Math.round((new Date(end).getTime() - new Date(start).getTime()) / 60000);
    return mins >= 60 ? `${Math.round(mins / 60)}h` : `${mins} min`;
}