import { Booking } from './Booking.js'

export class BookingScheduler {
  constructor() {
    this.bookings = []
    this.nextBookingId = 1
  }

  addBooking(date, startTime, duration) {
    const booking = new Booking(
      this.nextBookingId,
      date,
      startTime,
      duration
    )

    if (!booking.isValidTime()) {
      throw new Error('Invalid booking time')
    }

    if (!booking.isValidDuration()) {
      throw new Error('Invalid booking duration')
    }

    if (!this.isAvailable(date, startTime, duration)) {
      throw new Error('Booking time is not available')
    }

    this.bookings.push(booking)
    this.nextBookingId++
  }

  isAvailable(date, startTime, duration) {
    const newBooking = new Booking(
      this.nextBookingId,
      date,
      startTime,
      duration
    )

    for (const booking of this.bookings) {
      if (booking.date !== date) {
        continue
      }

      const newStart = newBooking.getStartTimeMinutes()
      const newEnd = newBooking.getEndTimeMinutes()

      const existingStart = booking.getStartTimeMinutes()
      const existingEnd = booking.getEndTimeMinutes()

      if (newStart < existingEnd && newEnd > existingStart) {
        return false
      }
    }

    return true
  }

  getBookings() {
    return [...this.bookings]
  }
}