import test from 'node:test'
import assert from 'node:assert/strict'
import { BookingScheduler } from '../src/BookingScheduler.js'

test('adds a booking', () => {
  const scheduler = new BookingScheduler()

  scheduler.setOpeningHours('Monday', '08:00', '17:00')

  scheduler.addBooking(
    '2026-09-28',
    '10:00',
    60
  )

  const bookings = scheduler.getBookings()

  assert.equal(bookings.length, 1)
})

test('rejects an overlapping booking', () => {
  const scheduler = new BookingScheduler()

  scheduler.setOpeningHours('Monday', '08:00', '17:00')

  scheduler.addBooking(
    '2026-09-28',
    '10:00',
    60
  )

  assert.throws(() => {
    scheduler.addBooking(
      '2026-09-28',
      '10:30',
      60
    )
  })
})

test('cancels an existing booking', () => {
  const scheduler = new BookingScheduler()

  scheduler.setOpeningHours('Monday', '08:00', '17:00')

  scheduler.addBooking(
    '2026-09-28',
    '10:00',
    60
  )

  const result = scheduler.cancelBooking(1)

  assert.equal(result, true)
  assert.equal(scheduler.getBookings().length, 0)
})