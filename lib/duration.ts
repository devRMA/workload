const MINUTES_PER_HOUR = 60;
const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = MINUTES_PER_HOUR * SECONDS_PER_MINUTE;
const HOURS_PER_DAY = 24;

export const DURATION_GROUP_SIZES = [2, 2] as const;

function pad(value: number): string {
  return value.toString().padStart(2, "0");
}

export function isRealDuration(duration: string): boolean {
  const [hours, minutes] = duration.split(":").map(Number);
  return hours >= 0 && hours < HOURS_PER_DAY && minutes >= 0 && minutes < MINUTES_PER_HOUR;
}

export function splitHoursAndMinutes(minutes: number): { hours: number; minutes: number } {
  const wholeMinutes = Math.round(minutes);

  return {
    hours: Math.floor(wholeMinutes / MINUTES_PER_HOUR),
    minutes: wholeMinutes % MINUTES_PER_HOUR,
  };
}

export function formatHoursAndMinutes(minutes: number): string {
  const parts = splitHoursAndMinutes(minutes);
  return `${parts.hours}h ${parts.minutes}m`;
}

export function formatSignedHoursAndMinutes(minutes: number): string {
  return `${minutes < 0 ? "-" : "+"}${formatHoursAndMinutes(Math.abs(minutes))}`;
}

export function formatPaddedDuration(minutes: number): string {
  const parts = splitHoursAndMinutes(minutes);
  return `${pad(parts.hours)}:${pad(parts.minutes)}`;
}

export function parsePaddedDuration(duration: string): number {
  const [hours, minutes] = duration.split(":").map(Number);
  return hours * MINUTES_PER_HOUR + minutes;
}

export function formatClock(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / SECONDS_PER_HOUR);
  const minutes = Math.floor((totalSeconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE);
  const seconds = Math.floor(totalSeconds % SECONDS_PER_MINUTE);
  return [hours, minutes, seconds].map(pad).join(":");
}

export function minutesToSeconds(minutes: number): number {
  return minutes * SECONDS_PER_MINUTE;
}

export function minutesToHours(minutes: number): number {
  return minutes / MINUTES_PER_HOUR;
}
