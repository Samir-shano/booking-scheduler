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


  cancelBooking(id) {
    const bookingIndex = this.bookings.findIndex(
      booking => booking.id === id
    )

    if (bookingIndex === -1) {
    return false
  }

  this.bookings.splice(bookingIndex, 1)
  return true
  }

rescheduleBooking(id, newDate, newStartTime, newDuration) {
  const booking = this.bookings.find(
  booking => booking.id === id
 )
  if (!booking) {
    return false
  }

  const updatedBooking = new Booking(
    id,
    newDate,
    newStartTime,
    newDuration
  )

  if (!updatedBooking.isValidTime()) {
  throw new Error('Invalid booking time')
}

  if (!updatedBooking.isValidDuration()) {
  throw new Error('Invalid booking duration')
}

for (const existingBooking of this.bookings) {
  if (existingBooking.id === id) {
    continue
  }
if (existingBooking.date !== newDate) {
    continue
  }
  const newStart = updatedBooking.getStartTimeMinutes()
  const newEnd = updatedBooking.getEndTimeMinutes()

  const existingStart = existingBooking.getStartTimeMinutes()
  const existingEnd = existingBooking.getEndTimeMinutes()

  if (newStart < existingEnd && newEnd > existingStart) {
  return false
}
}
booking.date = newDate
  booking.startTime = newStartTime
  booking.duration = newDuration

  return true
}

  getBookings() {
    return [...this.bookings]
  }
}