//const Task = require("./Task.js");
//const Time = require("./Time.js");
//import Task from "./Task";
//import Time from "./Time.js";
class TaskList {
    constructor() {
        this._taskArr =  [];
    }

    /*
        Sets the task's start time to previous task end time.
        Changes the task's duration if flexible is false.
        Keeps the task's duration the same and changes it's end time
        if flexible is true.
    */
    adjustTaskStartTime(index, flexible) {
        if(index < this._taskArr.length && index > 0) {
            let curr = this._taskArr[index];
            let prev = this._taskArr[index - 1];
            if(flexible) {
                let duration = curr.duration;
                curr.setStartTime(prev.endTime);
                curr.setDuration(duration);
            } else {
                curr.setStartTime(prev.endTime);
            }
        }
    }

    /*
        Sets the task's end time to next tasks start time.
        Changes the task's duration if flexible is flase.
        Keeps the task's duration the same and changes it's start time
        if flexible is true.
    */
    adjustTaskEndTime(index, flexible) {
        if(index < this._taskArr.length - 1) {
            let curr = this._taskArr[index];
            let next = this._taskArr[index + 1];
            if(flexible) {
                let oldDuration = curr.endTime;
                curr.setEndTime(next.startTime);
                let duration = curr.duration;
                let difference = Time.subtract(oldDuration, duration);
                if(oldDuration.compareTo(duration) < 0) {
                    curr.increaseStartTime(difference);
                } else if(oldDuration.compareTo(duration) > 0) {
                    curr.decreaseStartTime(difference);
                }
            } else {
                curr.setEndTime(next.startTime);
            }
        }
    }

    /*
        Adds a task to the front of the list.
        Adjusts the task times of all tasks if flexible is false.
        Keeps other tasks' times the same if flexible is true.
    */
    addToFront(task, flexible) {
        this._taskArr.unshift(task);
        if(this._taskArr.length > 1) {
            for(let i = 1; i < this._taskArr.length; i++) {
                this.adjustTaskStartTime(i, flexible);
            }
        }
    }

    /*
        Adds a task to the back of the list.
        Adjusts the task times of all tasks if flexible is false.
        Keeps other tasks' times the same if flexible is true.
    */
    addToBack(task, flexible) {
        this._taskArr.push(task);
        if(!flexible) {
            if(this._taskArr.length > 1) {
                for(let i = this._taskArr.length - 2; i >= 0; i--) {
                    this.adjustTaskEndTime(i, flexible);
                }
            }
        }
    }

    /*
        Adds task at the index.
        Adjusts the task times of all tasks after.
        Keeps other tasks' duration the same if flexible is true.
        Reduces other tasks' duration if flexible is false;
    */
    addAtIndex(task, index, flexible) {
        if(index === 0) {
            this.addToFront(task, flexible);
        } else if(index === this._taskArr.length) {
            this.addToBack(task, flexible);
        } else if(index < this._taskArr.length) {
            this._taskArr.splice(index,0, task);
            this.adjustTaskStartTime(index + 1, flexible);
        }
    }

    /*
        Removes a task from the front.
        Sets the next task's start time to removed task's and increases it's
        duration, if flexible is false.
        Removes the task without changing next taks if flexible is true.
    */
    removeFront(flexible) {
        if(this._taskArr.length === 1) {
            this._taskArr.shift();
        } else if(this._taskArr.length > 1) {
            if(flexible) {
                this._taskArr.shift();
            } else {
                let curr = this._taskArr[0];
                let next = this._taskArr[1];
                next.setStartTime(curr.startTime);
                this._taskArr.shift();
            }
        }
    }

    /*
        Removes a task from the back.
        Sets the previous task's end time to removed task's end time
        and increases it's duration if flexible is false.
        Removes the task without changing previous task if flexible is true.
    */
    removeBack(flexible) {
        if(this._taskArr.length === 1) {
            this._taskArr.pop();
        } else if(this._taskArr.length > 1) {
            if(flexible) {
                this._taskArr.pop();
            } else {
                let curr = this._taskArr[this._taskArr.length - 1];
                let prev = this._taskArr[this._taskArr.length - 2];
                prev.setEndTime(curr.endTime);
                this._taskArr.pop();
            } 
        }
    }

    /*
        Removes task at index.
        Sets the next task's start time to current task's start time.
        Changes duration of the next task if flexible is false.
        Changes the end time and keeps the duration of the next task the same,
        and adjusts all tasks after accordingly, if flexible is true.
    */
    removeAtIndex(index, flexible) {
        if(index === 0) {
            this.removeFront(flexible);
        } else if (index === this._taskArr.length - 1) {
            this.removeBack();
        } else if(index > 0) {
            let curr = this._taskArr[index];
            let next = this._taskArr[index + 1];
            if(flexible) {
                let oldDuration = next.duration;
                next.setStartTime(curr.startTime);
                let duration = next.duration;
                let difference = Time.subtract(oldDuration, duration);
                next.decreaseEndTime(difference);
                if(index + 2 < this._taskArr.length) {
                    for(let i = index + 2; i < this._taskArr.length; i++) {
                        this.adjustTaskStartTime(i, flexible);
                    }
                }
            } else {
                next.setStartTime(curr.startTime);
            }
            this._taskArr.splice(index, 1);
        }

    }

    /*
        Returns task at index.
    */
    get(index) {
        return this._taskArr[index];
    }

    toString() {
        let taskString = '';
        this._taskArr.forEach(element => taskString += element.toString() + "\n");
        return taskString;
    }

    length() {
        return this._taskArr.length;
    }

    get taskArr() {
        return this._taskArr;
    }
}
//module.exports = Tasklist;