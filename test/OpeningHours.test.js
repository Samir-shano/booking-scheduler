import test from 'node:test'
import assert from 'node:assert/strict'
import { OpeningHours } from '../src/OpeningHours.js'

test('accepts a booking within opening hours', () => {
  const openingHours = new OpeningHours(
    'Monday',
    '08:00',
    '17:00'
  )

  assert.equal(
    openingHours.isWithinOpeningHours('10:00', 60),
    true
  )
})

