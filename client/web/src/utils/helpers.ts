const dateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: false,
  timeZone: "Europe/Helsinki",
};
const dateTimeFormat = new Intl.DateTimeFormat("fi-FI", dateOptions);

export function parseDate(timestamp: string) {
  return dateTimeFormat.format(Date.parse(timestamp));
}
