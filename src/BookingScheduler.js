import { Booking } from './Booking.js'

export class BookingScheduler {
  constructor() {
    this.bookings = []
  }

  addBooking(date, startTime, duration) {
    const booking = new Booking(date, startTime, duration)

    this.bookings.push(booking)
  }

  getBookings() {
    return [...this.bookings]
  }
}