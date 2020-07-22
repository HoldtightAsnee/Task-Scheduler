const TaskList = require("./TaskList.js");
const Time = require("./Time.js");
const Task = require("./Task.js");
class Day {
    constructor(day, startTime, endTime, duration) {
        this._day = day;
        switch(day) {
            case 'Monday':
                this._id = 0;
                break;
            case 'Tuesday':
                this._id = 1;
                break;
            case 'Wednesday':
                this._id = 2;
                break;
            case 'Thursday':
                this._id = 3;
                break;
            case 'Friday':
                this._id = 4;
                break;
            case 'Saturday':
                this._id = 5;
                break;
            case 'Sunday':
                this._id = 6;
                break;
            default:
                this._id = -1;
                break;
        }
        this._taskList = new TaskList();
        this._startTime = startTime;
        this._endTime = endTime;
        this._duration = duration;
        let timeInBetween = Time.subtract(startTime, endTime);
        let tempStartTime = startTime;
        let count = Math.floor(timeInBetween.convertToMinutes() / duration.convertToMinutes());
        while(count > 0) {
            let task = new Task("Please enter a description.", tempStartTime, duration);
            if(count === 1) {
                let tempDuration = Time.subtract(endTime, tempStartTime);
                task.setDuration(tempDuration);
            }
            this.taskList.addToBack(task, false);
            tempStartTime = Time.add(tempStartTime, duration);
            count--;
        }
        
    }

    get id() {
        return this._id;
    }

    get day() {
        return this._day;
    }

    get taskList() {
        return this._taskList;
    }

    toString() {
        let string = `Day: ${this._day}\n${this._taskList.toString()}`;
        return string;
    }
}
module.exports = Day;
