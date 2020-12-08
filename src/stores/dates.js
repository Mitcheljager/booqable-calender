import { writable, readable } from "svelte/store"

const now = new Date()
const today = readable(now)

const currentDay = readable(now.getDay())
const currentYear = writable(now.getFullYear())

function getCurrentWeek() {
  const startOfYear = new Date(now.getFullYear(), 0, 1)
  const millisecondsInDay = 86400000
  const currentDayOfYear = (((now.getTime() - startOfYear.getTime()) / millisecondsInDay) + startOfYear.getDay() + 1)

  return Math.ceil(currentDayOfYear / 7)
}

const currentWeek = readable(getCurrentWeek())
const viewingWeek = writable(getCurrentWeek())

const startDateOfWeek = writable(now)

export { today, currentDay, currentWeek, currentYear, viewingWeek, startDateOfWeek }
