import { Booking } from './Booking.js'

export class BookingScheduler {
  constructor() {
    this.bookings = []
  }

  addBooking(date, startTime, duration) {
    const booking = new Booking(date, startTime, duration)

    if (!booking.isValidTime()) {
      throw new Error('Invalid booking time')
    }

    if (!booking.isValidDuration()) {
      throw new Error('Invalid booking duration')
    }

    this.bookings.push(booking)
  }

  getBookings() {
    return [...this.bookings]
  }
}