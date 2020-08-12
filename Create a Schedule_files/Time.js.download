class Time{
    constructor(hour, minute) {
        this._hour = hour;
        this._minute = minute;
    }

    /* This method adds a time object to the current 
       instance. It adds the time's hour and minute
       to the instance's hour and minute. Meant to be
       used in the add method. 
    */
    addHelper(time) {
            let hour = time.hour;
            let minute = time.minute;
            if((this._hour + hour) <= 24) {
                this._hour += hour;
            } else {
                throw new Error("Invalid hour");
            }
            if((this._minute + minute) <= 59) {
                this._minute += minute;
            } else {
                let hour2 = Math.floor((this._minute + minute) / 60);
                let minute2 = (this._minute + minute) % 60;
                let time2 = new Time(hour2, minute2);
                this._minute = 0;
                this.addHelper(time2);
            }
    }

    /* This method subtracts a time object from the current 
       instance. It subtracts the time's hour and minute
       from the instance's hour and minute. Meant to be
       used in the add subtract. 
       */
    subtractHelper(time) {
            let hour = time.hour;
            let minute = time.minute;
            if((this._hour - hour) >= 0) {
                this._hour -= hour;
            } else {
                throw new Error("Invalid hour");
            }
            if((this._minute - minute) >= 0) {
                this._minute -= minute;
            } else {
                this._hour -= Math.floor((60 - (this._minute - minute)) / 60);
                this._minute = 60 + (this._minute - minute);
            }
    }

    /* Takes the hour from a string in 
       the format hh:mm and returns an int.
    */
    static stringToHour(time) {
        let hourString = time.slice(0, 2);
        return parseInt(hourString);
    }

    /* Takes the minute from a string in 
       the format hh:mm and returns an int.
    */
    static stringToMinute(time) {
        let minuteString = time.slice(3);
        return parseInt(minuteString);
    }

    static stringToTime(time) {
        let hour = Time.stringToHour(time);
        let minute = Time.stringToMinute(time);
        return new Time(hour, minute);
    }

    /* Converts an instance into minutes and returns
       the minutes
    */
    convertToMinutes() {
        let minutes = this._hour * 60 + this._minute;
        return minutes;
    }

    /* Adds two time objects and returns a new time
       object that is the result of the sum.
    */
    static add(time1, time2) {
        let finalTime = new Time(time1.hour, time1.minute);
        try {
            finalTime.addHelper(time2);
            return finalTime;
        } catch(err) {
            return err;
        }
        
    }

     /* Subtracts two time objects and returns a new time 
        object that is the result of the subtraction.
    */
    static subtract(time1, time2) {
        try {
            let finalTime;
            if(time1.compareTo(time2) === 1) {
                finalTime = new Time(time1.hour, time1.minute);
                finalTime.subtractHelper(time2);
            } else {
                finalTime = new Time(time2.hour, time2.minute);
                finalTime.subtractHelper(time1);
            }
            return finalTime;
        } catch(err) {
            return err;
        }
    }

    /*  Compares the instance to another time object.
        If the instance is:
        greater, returns 1
        equal to, returns 0
        less than, returns -1
    */
    compareTo(time) {
        let inMinutes = this.convertToMinutes();
        let timeInMinutes = time.convertToMinutes();
        if (inMinutes > timeInMinutes) {
            return 1;
        } else if (inMinutes === timeInMinutes) {
            return 0;
        } else {
            return -1;
        }
    }

    /* Returns the time as a string in the format hh:mm
    */
    toString() {
        let timeString = ""
        if(this.hour < 10) {
            timeString += "0" + this.hour + ":";
        } else {
            timeString += this.hour + ":";
        }
        if(this.minute < 10) {
            timeString += "0" + this.minute;
        } else {
            timeString += this.minute;
        }
        return timeString;
    }
    get hour() {
        return this._hour;
    }

    get minute() {
        return this._minute;
    }

    set hour(hour) {
        this._hour = hour;
    }

    set minute(minute) {
        this._minute = minute;
    }
}
//module.exports = Time;