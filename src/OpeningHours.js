export class OpeningHours {
  constructor(day, openTime, closeTime) {
    this.day = day
    this.openTime = openTime
    this.closeTime = closeTime
  }

  isWithinOpeningHours(startTime, duration) {

    const [openHours, openMinutes] = this.openTime.split(':').map(Number)
    const [closeHours, closeMinutes] = this.closeTime.split(':').map(Number)

    const openingTime = openHours * 60 + openMinutes
    const closingTime = closeHours * 60 + closeMinutes

    const [startHours, startMinutes] = startTime.split(':').map(Number)

    const bookingStart = startHours * 60 + startMinutes
    const bookingEnd = bookingStart + duration

    if (bookingStart < openingTime) {
    return false
  }

    if (bookingEnd > closingTime) {
    return false
}

    return true
  }

}