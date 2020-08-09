function taskInputDelegator(event) {
    let target = event.target;
    if(target.tagName != 'INPUT') {
        return;
    } else {
        if(target.type === "checkbox") {
            return;
        }
        let cell;
        if(target.parentNode.tagName === "TD") {
            cell = target.parentNode;

        } else {
            cell = target.parentNode.parentNode.parentNode;
        }
        let dayIndex = parseInt(cell.id[0]);
        let taskIndex = parseInt(cell.id[cell.id.length - 1]);
        let task = schedule.get(dayIndex).taskList.get(taskIndex);
        if(target.value === "") {
            return;
        }
        if(target.id === "startHour") {
            let startTime = new Time(parseInt(target.value), parseInt(document.getElementById("startMin").value));
            updateDuration(startTime, tempTask, false);
        } else if(target.id === "startMin") {
            let startTime = new Time(parseInt(document.getElementById("startHour").value), parseInt(target.value));
            updateDuration(startTime, tempTask, false);
        } else if(target.id === "endHour") {
            let endTime = new Time(parseInt(target.value), parseInt(document.getElementById("endMin").value));
            updateDuration(endTime, tempTask, true);
        } else if(target.id === "endMin") {
            let endTime =  new Time(parseInt(document.getElementById("endHour").value), parseInt(target.value));
            updateDuration(endTime, tempTask, true);
        } else if(target.id === "durHour") {
            let duration = new Time(parseInt(target.value), parseInt(document.getElementById("durMin").value));
            updateEndTime(duration, tempTask);
        }else if(target.id === "durMin") {
            let duration = new Time(parseInt(document.getElementById("durHour").value), parseInt(target.value));
            updateEndTime(duration, tempTask);
        } else if(target.id === dayIndex + "desc" + taskIndex) {
            task.description = target.value;
        }
    }
}

/*
    This function updates the duration input values
*/
function updateDuration(time, task, isEndTime) {
    let action;
    if(isEndTime) {
        action = task.setEndTime(time);
    } else {
        action = task.setStartTime(time);
    }
    if(action === undefined) {
        document.getElementById("durHour").value = task.duration.hour;
        document.getElementById("durMin").value = task.duration.minute;
    } else {
        alert(action);
    }
}

/*
    This function updates the end time input values
*/
function updateEndTime(time, task) {
    let action = task.setDuration(time);
    if(action === undefined) {
        document.getElementById("endHour").value = task.endTime.hour;
        document.getElementById("endMin").value = task.endTime.minute;
    } else {
        alert(action);
    }
}