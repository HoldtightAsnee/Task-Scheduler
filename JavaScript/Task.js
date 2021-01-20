//const Time = require("./Time.js");
//import Time from "./Time.js";
class Task{
    constructor(description, startTime, duration) {
        this._description = description;
        this._startTime = startTime;
        this._endTime = Time.add(startTime, duration);
        this._duration = duration;
    }

    /* Increases the instances duration by adding a time
       object to the duration and calculates the new end
       time.
    */
    increaseDuration(time) {
        try {
            let duration = Time.add(this.duration, time);
            let endTime = Time.add(this.startTime, duration);
            if(typeof(duration.hour) === 'number' && typeof(endTime.hour) === 'number') {
                this._duration = duration;
                this._endTime = endTime;
            } else {
                throw new Error("Invalid time.");
            }
        } catch(err) {
            return err;
        }
    }

    /* Decreases the instances duration by subtracting
       the time object from the duration and calcutes
       the new end time.
    */
    decreaseDuration(time) {
        try{
            if(this.duration.compareTo(time) <= 0) {
                throw new Error("Invalid time");
            } else {
                let duration = Time.subtract(this.duration, time);
                let endTime = Time.add(duration, this.startTime);
                if(typeof(duration.hour) === 'number' && typeof(endTime.hour) === 'number') {
                    this._duration = duration;
                    this._endTime = endTime;
                } else {
                    throw new Error("Invalid time.");
                }
            }
        } catch(err) {
            return err;
        }
    }

    /* Increases the instance's start time by adding the
       time object to it and calculates the new duration.
    */
    increaseStartTime(time) {
        try {
            let startTime = Time.add(this.startTime, time);
            if(typeof(startTime.hour) === 'number') {
                if(startTime.compareTo(this.endTime) >= 0) {
                    throw new Error("Start time cannot exceed end time.");
                } else {
                    this._startTime = startTime;
                    this._duration = Time.subtract(this.startTime, this.endTime);
                }
            } else {
                throw new Error("Invalid time.")
            }
            
        } catch(err) {
            return err;
        }
    }

    /*  Decreases the instance's start time by subtracting
        the time object from it and calculates the new duration
    */
    decreaseStartTime(time) {
        try {
            if(this.startTime.compareTo(time) < 0) {
                throw new Error("Invalid time.");
            } else {
                let startTime = Time.subtract(this.startTime, time);
                console.log(startTime);
                if(typeof(startTime.hour) === 'number') {
                    if(startTime.compareTo(new Time(0,0)) < 0) {
                        throw new Error("Start time cannot be before 00:00.");
                    } else {
                        this._startTime = startTime;
                        this._duration = Time.subtract(this.startTime, this.endTime);
                    }
                } else {
                    throw new Error("Invalid time.");
                }
            }
        } catch(err) {
            return err;
        }
    }

    /*  Increases the instance's end time by adding the time 
        object to it and calculates the new duration.
    */
    increaseEndTime(time) {
        try {
            let endTime = Time.add(this.endTime, time);
            if(typeof(endTime.hour) === 'number') {
                if(endTime.compareTo(new Time(24,0)) >= 0) {
                    throw new Error("End time cannot exceed 24 hours.");
                } else {
                    this._endTime = endTime;
                    this._duration = Time.subtract(this.startTime, this.endTime);
                }
            } else {
                throw new Error("Invalid time.");
            }
        } catch(err) {
            return err;
        }
    }

    /*  Decreases the instance's end time by adding the time
        object to it and calculates the new duration.
    */
    decreaseEndTime(time) {
        try {
            let endTime = Time.subtract(this.endTime, time);
            if(typeof(endTime.hour) === 'number') {
                if(endTime.compareTo(this.startTime) <= 0) {
                    throw new Error("End time cannot be before nor equal to start time.");
                } else {
                    this._endTime = endTime;
                    this._duration = Time.subtract(this.startTime, this.endTime);
                }
            } else {
                throw new Error("Invalid time.");
            }
        } catch(err) {
            return err;
        }
    }

    /*  Sets the instance's start time to the 
        time object. Calculates new duration.
    */
    setStartTime(time) {
        try {
            if(time.hour > 24 || time.hour < 0 || time.minute < 0 || time.minute > 59) {
                throw new Error("Invalid start time.");
            }
            if(time.compareTo(this.endTime) < 0) {
                if(time.compareTo(new Time(0,0)) >= 0) {
                    this._startTime = time;
                    this._duration = Time.subtract(this.startTime, this.endTime);
                } else {
                    throw new Error("Start time cannot be before 00:00.")
                }
            } else {
                throw new Error("Start time cannot exceed nor equal end time.");
            }
        } catch(err) {
            return err;
        }
    }
    /* Sets the instance's end time to the time
       object. Calculates new duration.
    */
    setEndTime(time) {
        try {
            if(time.hour > 24 || time.hour < 0 || time.minute < 0 || time.minute > 59) {
                throw new Error("Invalid end time.");
            }
            if(time.compareTo(this.startTime) > 0) {
                if(time.compareTo(new Time(24,0)) <= 0) {
                    this._endTime = time;
                    this._duration = Time.subtract(this.startTime, this.endTime);
                } else {
                    throw new Error("End time cannot exceed 24 hours.");
                }
            } else {
                throw new Error("End time cannot be before nor equal to start time.");
            }
        } catch(err) {
            return err;
        }
    }

    /* Sets the instance's duration to the time
        object and calculates the new end time.
    */
    setDuration(time){
        try {
            if(time.hour > 24 || time.hour < 0 || time.minute < 0 || time.minute > 59) {
                throw new Error("Invalid duration.");
            }
            if(time.compareTo(new Time(0,0)) === 0) {
                throw new Error("Duration cannot be 00:00.");
            }
            let endTime = Time.add(this.startTime, time);
            if(endTime.compareTo(new Time(24,0)) < 0) {
                this._duration = time;
                this._endTime = endTime;
            } else {
                throw new Error("Duration cannot cause end time to exceed 24 hours");
            }
        } catch(err) {
            return err;
        }
    }

    set description(description) {
        this._description = description;
    }

    get description() {
        return this._description;
    }

    get startTime() {
        return this._startTime;
    }

    get endTime() {
        return this._endTime;
    }

    get duration() {
        return this._duration;
    }
    
    toString() {
        const taskString = `Description: ${this.description}
        Start Time: ${this.startTime}
        End Time: ${this.endTime}
        Duration: ${this.duration}`;
        return taskString;
    }

    /*
        Creates a copy of a task
        and returns it.
    */
    static copyTask(task) {
        return new Task(task.description, task.startTime, task.endTime);
    }
}
//module.exports = Task;