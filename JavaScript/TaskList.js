class TaskList {
    constructor() {
        this._taskArr =  [];
    }

    /*
        Sets the task's start time to previous task end time.
    */
    adjustTaskStartTime(index) {
        if(index < this._taskArr.length && index > 0) {
            let curr = this._taskArr[index];
            let prev = this._taskArr[index - 1];
            if(prev.endTime.compareTo(curr.endTime) >= 0) {
                this.removeAtIndex(index);
            } else {
                curr.setStartTime(prev.endTime);
            }
        }
    }

    /*
        Sets the task's end time to next tasks start time.
        Changes the task's duration.
    */
    adjustTaskEndTime(index) {
        if(index < this._taskArr.length - 1 && index >= 0) {
            let curr = this._taskArr[index];
            let next = this._taskArr[index + 1];
            if(curr.startTime.compareTo(next.startTime) < 0) {
                curr.setEndTime(next.startTime);
            } else {
                this.removeAtIndex(index, true);
            }
        }
    }
    /*
        Adjusts all tasks start times after the task at
        the index
    */
    adjustAllStartTimes(index) {
        while(index < this._taskArr.length) {
            this.adjustTaskStartTime(index);
            index++;
        }
    }

    /*
        Adjusts all tasks end times after the task at the index.
    */
    adjustAllEndTimes(index) {
        while(index >= 0) {
            this.adjustTaskEndTime(index);
            index--;
        }
    }

    /*
        Adds a task to the front of the list.
        Adjusts the task times of all tasks.
    */
    addToFront(task) {
        this._taskArr.unshift(task);
        if(this._taskArr.length > 1) {
            this.adjustAllStartTimes(1);
        }
    }

    /*
        Adds a task to the back of the list
    */
    addToBack(task) {
        this._taskArr.push(task);
    }

    /*
        Adds task at the index.
        Adjusts the task times of all tasks after.
    */
    addAtIndex(task, index) {
        if(index === 0) {
            this.addToFront(task);
        } else if(index === this._taskArr.length) {
            this.addToBack(task);
        } else if(index < this._taskArr.length) {
            this._taskArr.splice(index,0, task);
            this.adjustTaskStartTime(index + 1);
        }
    }

    /*
        Removes a task from the front.
        Sets the next task's start time to removed task's and increases it's
        duration.
    */
    removeFront() {
        this._taskArr.shift();
        /*
        if(this._taskArr.length === 1) {
            
        } else if(this._taskArr.length > 1) {
            let curr = this._taskArr[0];
            let next = this._taskArr[1];
            next.setStartTime(curr.startTime);
            this._taskArr.shift();
        }
        */
    }

    /*
        Removes a task from the back.
        Sets the previous task's end time to removed task's end time
    */
    removeBack() {
        this._taskArr.pop();
        /*
        if(this._taskArr.length === 1) {
            this._taskArr.pop();
        } else if(this._taskArr.length > 1) {
            let curr = this._taskArr[this._taskArr.length - 1];
            let prev = this._taskArr[this._taskArr.length - 2];
            prev.setEndTime(curr.endTime);
        }
        */
    }

    /*
        Removes task at index.
        Sets the next task's start time to current task's start time,
        if adjustEndTimes is false. Sets the previous task's start time
        to the current tasks start time, if adjustEndTimes is true.
    */
    removeAtIndex(index, adjustEndTimes = false) {
        if(index === 0) {
            this.removeFront();
        } else if (index === this._taskArr.length - 1) {
            this.removeBack();
        } else if(index > 0 && index < this._taskArr.length) {
            let curr = this._taskArr[index];
            if(adjustEndTimes) {
                let prev = this._taskArr[index - 1];
                if(prev.startTime.compareTo(curr.startTime) >= 0) {
                    this.removeAtIndex(index - 1);
                } else {
                    prev.setEndTime(curr.startTime);
                }
                this._taskArr.splice(index, 1);
                this.adjustAllEndTimes(index);
            } else {
                let next = this._taskArr[index + 1];
                if(curr.endTime.compareTo(next.endTime) >= 0) {
                    this.removeAtIndex(index + 1);
                } else {
                    next.setStartTime(curr.startTime);
                }
                this._taskArr.splice(index, 1);
                this.adjustAllStartTimes(index);
            }
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

    /* 
        Replaces the instances taskArr with a 
        copy of the specified taskList's taskArr
    */
    copyTaskArr(taskList) {
        this._taskArr = [];
        for(let i = 0; i < taskList.length(); i++) {
            this._taskArr[i] = Task.copyTask(taskList.taskArr[i]);
        }
    }
}


