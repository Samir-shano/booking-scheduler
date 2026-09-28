import test from 'node:test'
import assert from 'node:assert/strict'
import { Booking } from '../src/Booking.js'

test('calculates the correct end time', () => {
  const booking = new Booking(
    1,
    '2026-09-28',
    '10:00',
    60
  )

  assert.equal(booking.getEndTime(), '11:00')
})
