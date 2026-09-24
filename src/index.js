// import { Booking } from "./Booking.js"

// const booking = new Booking("2026-09-21", "10:00", 60)

// console.log(booking.isValidDuration())

import { BookingScheduler } from './BookingScheduler.js'

const scheduler = new BookingScheduler()

scheduler.addBooking('2026-09-22', '10:00', 60)
scheduler.addBooking('2026-09-22', '10:30', 60)

console.log(scheduler.getBookings())

// console.log(scheduler.getBookings()[0].getEndTimeMinutes())

// console.log(scheduler.isAvailable('2026-09-22', '11:00', 60)) 
