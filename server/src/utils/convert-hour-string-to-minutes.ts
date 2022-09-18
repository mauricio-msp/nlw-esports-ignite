/**
 *
 * @param hourString
 * 18:00 -> 1080
 * @return
 */
export function convertHourStringToMinutes(hourString: string): number {
  const [hours, minutes]: number[] = hourString.split(':').map(Number)

  const minutesAmount: number = hours * 60 + minutes

  return minutesAmount
}
