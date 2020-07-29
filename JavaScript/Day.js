//const TaskList = require("./TaskList.js");
//const Time = require("./Time.js");
//const Task = require("./Task.js");
/*import TaskList from "./TaskList";
import Task from "./Task";
import Time from "./Time";
*/
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
        let tempStartTime = startTime;
        let count = 0;
        while(true) {
            let task = new Task("Please enter a description.", tempStartTime, duration);
            if(this.taskList.length() > 0) {
                let prev = this.taskList.get(this.taskList.length() - 1);
                if(prev.endTime.compareTo(endTime) < 0) {
                    let difference = Time.subtract(prev.endTime, endTime);
                    if(difference.compareTo(duration) > 0) {
                        this.taskList.addToBack(task, false);
                    } else if(difference.compareTo(duration) === 0) {
                        this.taskList.addToBack(task, false);
                        break;
                    } else {
                        task.setDuration(difference);
                        this.taskList.addToBack(task, false);
                        break;
                    }
                } else if(prev.endTime.compareTo(endTime) === 0) {
                    break;
                }else {
                    let difference = Time.subtract(prev.startTime, endTime);
                    prev.setDuration(difference);
                    break;
                }
            } else {
                this.taskList.addToBack(task, false);
            }
            tempStartTime = Time.add(tempStartTime, duration);
            count++;
            if(count > 10000) {
                break;
            }
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
//module.exports = Day;
