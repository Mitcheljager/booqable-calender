import { readable } from "svelte/store"

const daysOfTheWeek = readable([
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
])

export { daysOfTheWeek }
