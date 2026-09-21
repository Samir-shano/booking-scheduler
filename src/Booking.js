export class Booking {
  constructor( date, startTime, duration){
    this.date= date
    this.startTime=startTime
    this.duration= duration
  }

  getEndTime() {
    const [hours, minutes] = this.startTime.split(':').map(Number)
    const totalMinutes = hours * 60 + minutes + this.duration

    const endHours = Math.floor(totalMinutes / 60 )
    const endMinutes = totalMinutes % 60

    return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`
  }
}