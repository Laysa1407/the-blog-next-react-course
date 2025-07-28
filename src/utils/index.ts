import { formatDate, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export function dateformated(
    date: string,
    format = "dd/MM/yyyy 'ás' HH'h'mm'"
): string {
    const dateformated = new Date(date);
    return formatDate(dateformated, format, {
        locale: ptBR,
    });
}

export function dateDistanceToNow(date: string) {
    return formatDistanceToNow(date, { locale: ptBR, addSuffix: true });
}
