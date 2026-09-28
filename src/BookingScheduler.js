import { Booking } from './Booking.js'
import { OpeningHours } from './OpeningHours.js'

export class BookingScheduler {
  constructor() {
    this.bookings = []
    this.nextBookingId = 1
    this.openingHours = []
  }

  setOpeningHours(day, openTime, closeTime) {
    const hours = new OpeningHours(day, openTime, closeTime)
    this.openingHours.push(hours)
  }

  getOpeningHours(day) {
    return this.openingHours.find(
      hours => hours.day === day
    )
  }

  getDayFromDate(date) {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ]

    const dayNumber = new Date(date).getDay()

    return days[dayNumber]
  }

  isWithinOpeningHours(date, startTime, duration) {
    const day = this.getDayFromDate(date)

    const openHours = this.getOpeningHours(day)

    if (!openHours) {
      return false
    }

    return openHours.isWithinOpeningHours(startTime, duration)
  }


  addBooking(date, startTime, duration) {
    const booking = new Booking(
      this.nextBookingId,
      date,
      startTime,
      duration
    )

    if (!booking.isValidDate()) {
      throw new Error('Invalid booking date')
    }

    if (!booking.isValidTime()) {
      throw new Error('Invalid booking time')
    }

    if (!booking.isValidDuration()) {
      throw new Error('Invalid booking duration')
    }

    if (!this.isWithinOpeningHours(date, startTime, duration)) {
      throw new Error('Booking is outside of opening hours')
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

  getAvailableSlots(date, duration) {
    const day = this.getDayFromDate(date)
    const openHours = this.getOpeningHours(day)

    if (!openHours) {
      return []
    }

    const [openHour, openMinute] = openHours.openTime.split(':').map(Number)
    const openingTime = openHour * 60 + openMinute

    const [closeHour, closeMinute] = openHours.closeTime.split(':').map(Number)
    const closeTime = closeHour * 60 + closeMinute

    const availableSlots = []

    for (let currentTime = openingTime; currentTime + duration
      <= closeTime; currentTime += duration
    ) {
      const hours = Math.floor(currentTime / 60)
      const minutes = currentTime % 60

      const startTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`

      if (this.isAvailable(date, startTime, duration)) {
        availableSlots.push(startTime)
      }
    }

    return availableSlots
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

    if (!updatedBooking.isValidDate()) {
      throw new Error('Invalid booking date')
    }

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