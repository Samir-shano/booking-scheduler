// import { Booking } from "./Booking.js"

// const booking = new Booking("2026-09-21", "10:00", 60)

// console.log(booking.isValidDuration())

import { BookingScheduler } from './BookingScheduler.js'

const scheduler = new BookingScheduler()

scheduler.addBooking('2026-09-22', '10:00', 60)
scheduler.addBooking('2026-09-22', '13:00', 60)

console.log('Before:',scheduler.getBookings())
console.log(
  'Rescheduled:',
  scheduler.rescheduleBooking(99, '2026-09-22', '15:00', 60))

console.log('After:', scheduler.getBookings())

// console.log(scheduler.getBookings()[0].getEndTimeMinutes())

// console.log(scheduler.isAvailable('2026-09-22', '11:00', 60)) 
