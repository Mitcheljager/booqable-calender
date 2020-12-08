import { readable } from "svelte/store"

const daysOfTheWeek = readable([
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
])

export { daysOfTheWeek }
