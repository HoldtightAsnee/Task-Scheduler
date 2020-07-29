/*const Day = require("./Day.js");
const Task = require("./Task.js");
const TaskList = require("./TaskList.js");
const Time = require("./Time.js");
*/
//import Day from "./Day";
class Schedule {
    constructor() {
        this._weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        this._days = [];
    }

    /*
        Adds a day to the front of the _days array,
        if there are not more than 7 days in the array. 
        The day added is the chronological day 
        before the first day in the array.
        Adds Monday if array is empty.
    */
    addToFront(startTime, endTime, duration, day = 'Monday') {
        try{
            if(this._days.length < 1) {
                this._days.unshift(new Day(day, startTime, endTime, duration));
            } else {
                let dayId = this._days[0].id;
                if(this._days.length < 7) {
                    if(dayId === 0) {
                        dayId = 7;
                    }
                    let day = new Day(this._weekDays[dayId - 1], startTime, endTime, duration);
                    this._days.unshift(day);
                } else {
                    throw new Error("Cannot add more days.");
                }
            }
        } catch(err) {
            return err;
        }
    }

    /*
        Adds a day to the back of the _days array,
        if there are not more than 6 days in the array. The day added is
        the chronological day after the last day in the array.
    */
    addToBack(startTime, endTime, duration, day = 'Monday') {
        try {
            if(this._days.length < 1) {
                this._days.push(new Day(day, startTime, endTime, duration));
            } else {
                let dayId = this._days[this._days.length - 1].id;
                if(this._days.length < 7) {
                    if(dayId === 6) {
                        dayId = -1;
                    }
                    let day = new Day(this._weekDays[dayId + 1], startTime, endTime, duration);
                    this._days.push(day);
                } else {
                    throw new Error("Cannot add more days.");
                }
            }
        } catch(err) {
            return err;
        }

    }

    /*
        Adds the chronological day before the day at the index
        if it is not already in the _days array, and there are
        not more than 6 days in the array.
    */
    addDayBefore(index, startTime, endTime, duration) {
        try {
            if(this._days.length < 7) {
                if(index === 0) {
                    this.addToFront(startTime, endTime, duration);
                } else {
                    let dayId = this._days[index].id;
                    if(dayId === 0) {
                        dayId === 7;
                    }
                    const checkDay = (element) => element.id === dayId - 1;
                    if(!this._days.some(checkDay)) {
                        let day = new Day(this._weekDays[dayId - 1], startTime, endTime, duration);
                        this._days.splice(index, 0, day);
                    } else {
                        throw new Error("Day before is already in the list.");
                    }
                }
            } else {
                throw new Error("Cannot add more days.");
            }
        } catch(err) {
            return err;
        }
    }

    /*
        Adds the chronological day after the day at the index
        if it is not already in the _days array.
    */
    addDayAfter(index, startTime, endTime, duration) {
        try {
            if(this._days.length < 7) {
                if(index === this._days.length - 1) {
                    this.addToBack(startTime, endTime, duration);
                } else {
                    let dayId = this._days[index].id;
                    if(dayId === 6) {
                        dayId = -1;
                    }
                    const checkDay = (element) => element.id === dayId + 1;
                    if(!this._days.some(checkDay)) {
                        let day = new Day(this._weekDays[dayId + 1], startTime, endTime, duration);
                        this._days.splice(index + 1, 0, day);
                    } else {
                        throw new Error("Day after is already in the list.");
                    }
                }
            } else {
                throw new Error("Cannot add more days.");
            }
        } catch(err) {
            return err;
        }
    }

    /*
        Removes the first day of the _days array.
    */
    removeFront() {
        if(this._days.length > 0) {
            this._days.shift();
        }
    }

    /*
        Removes the last day of the _days array.
    */
    removeBack() {
        if(this._days.length > 0) {
            this._days.pop();
        }
    }

    /*
        Removes the day after the day at the index.
    */
    removeDayAfter(index) {
        try {
            if(this._days.length > 1) {
                if(index === this._days.length - 2) {
                    this.removeBack();
                } else if(index >= 0 && index < this._days.length - 2) {
                    this._days.splice(index + 1, 1);
                } else {
                    throw new Error("No day to remove.");
                }
            } else {
                throw new Error("No day to remove.")
            }   
        } catch(err) {
            return err;
        }
    }
        

    /*
        Removes the day before the day at the index.
    */
    removeDayBefore(index) {
        try{
            if(this._days.length > 1) {
                if(index === 1) {
                    this.removeFront();
                } else if(index > 1 && index < this._days.length) {
                    this._days.splice(index - 1, 1);
                } else {
                    throw new Error("No day to remove.");
                }
            } else {
                throw new Error("No day to remove.");
            }
        } catch(err) {
            return err;
        }
    }
    
    /* Fills in the _days array with the first day being 'start
       and the last day being 'end'. If 'start and 'end' are the same
       then only 'start' is added to the array.
    */
    generateSchedule(start, end, startTime, endTime, duration) {
        this._days = [];
        if(start != end) {
            this.addToFront(startTime, endTime, duration, start);
            let startDayId = this._days[0].id;
            let endDay = new Day(end, startTime, endTime, duration);
            let index = 0;
            if(startDayId < endDay.id) {
                while(startDayId < endDay.id) {
                    this.addDayAfter(index, startTime, endTime, duration);
                    startDayId++;
                    index++;
                }
            } else if (endDay.id < startDayId) {
                while(startDayId != endDay.id) {
                    this.addDayAfter(index, startTime, endTime, duration);
                    startDayId++;
                    index++;
                    if(startDayId === 6) {
                        startDayId = -1;
                    }
                }
            }
            //this._days.push(endDay);
        } else {
            this.addToFront(startTime, endTime, duration, start);
        }

    }

    /*
        Returns the day at the index.
    */
    get(index) {
        return this._days[index];
    }

    toString() {
        let string = '';
        this._days.forEach(element => {
           //string+= `${element.day}: \n${element.taskList.get(0).toString()}\n${element.taskList.get(element.taskList.length() -1).toString()}\n`;
           string+= `${element.day}\n`;
        })
        return string;
    }

    get days() {
        return this._days;
    }

    clear() {
        this._days = [];
    }
}
//module.exports = Schedule;
