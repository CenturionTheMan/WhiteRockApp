export const toDate = (iso: string) => new Date(iso);
export const toDisplay = (iso: string) => new Date(iso).toLocaleDateString();
export const toISO = (date: Date) => date.toISOString();
