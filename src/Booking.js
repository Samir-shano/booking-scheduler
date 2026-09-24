export class Booking {
  constructor(id, date, startTime, duration){
    this.id = id
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

  getStartTimeMinutes() {
    const [hours, minutes] = this.startTime.split(':').map(Number)
    return hours * 60 + minutes

  }

  getEndTimeMinutes() {
    return this.getStartTimeMinutes() + this.duration
  }

  isValidTime(){
    const parts = this.startTime.split(':')

    if(parts.length !== 2) {
      return false
    }

    const hours = Number(parts[0])
    const minutes = Number(parts[1])

    if (!Number.isInteger(hours)|| !Number.isInteger(minutes)){
      return false
    }

    if (hours < 0 ||hours > 23) {
      return false
    }
    
    if (minutes < 0 || minutes > 59) {
      return false
    }
    return true
  }

  isValidDuration() {
    if (!Number.isInteger(this.duration)){
      return false
    }

    if (this.duration <= 0) {
      return false
    }
    return true
  }
}