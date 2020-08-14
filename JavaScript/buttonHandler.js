/*
    The function delegates all buttons events in the table.
    It is meant to be a part of the table's event listeners.
*/
function tableButtonDelegator(event) {
    let target = event.target;
    if(target.tagName != "BUTTON") {
        return;
    }
    if(target.dataset.role === "addDayBefore") {
        addDayBefore(target);
    } else if(target.dataset.role === "addDayAfter") {
        addDayAfter(target);
    } else if(target.dataset.role === "removeDay") {
        removeDay(target);
    } else if(target.dataset.role === "editTask") {
        if(target != selectEdit && selectEdit) {
            cancelEdit(selectEdit);
        }
        editTask(target);
    } else if(target.dataset.role === "cancelEdit") {
        cancelEdit(target);
    } else if(target.dataset.role === "saveEdit") {
        saveEdit(target);
    } else if(target.dataset.role === "addTaskBefore") {
        addTaskBefore(target);
    } else if(target.dataset.role === "addTaskAfter") {
        addTaskAfter(target);
    } else if(target.dataset.role === "removeTask") {
        removeTask(target);
    }
}

/*
    This function adds the day before the current day to the 
    schedule, if it is not already presnet. It also adds
    a new row with the day and tasks to the table, and 
    adjusts the id of the rows after.
*/
function addDayBefore(button) {
    let row = button.parentNode.parentNode;
    let index = parseInt(row.id[row.id.length - 1]);
    let rowCount = index;
    let action = schedule.addDayBefore(index, dayStartTime, dayEndTime, dayDuration);
    if(action === undefined) {
        let newRow = loadDay(index, schedule.get(index));
        loadTasks(newRow, schedule.get(index));
        let tableBodyNodes = tableBody.childNodes;
        for(let i = index; i < tableBodyNodes.length; i++) {
            rowCount++;
            tableBodyNodes[i].id = "row" + rowCount;
            tableBodyNodes[i].childNodes[0].childNodes[3].id = rowCount + "removeDay";
            updateTaskId(rowCount, tableBodyNodes[i].childNodes);
            
        }
        tableBody.insertBefore(newRow, tableBodyNodes[index]);
    } else {
        alert(action);
    }
}

/*
    This function adds the day after the current day to the 
    schedule, if it is not already present. It also adds
    a new row with the day and tasks to the table, and 
    adjusts the id of the rows after.
*/
function addDayAfter(button) {
    let row = button.parentNode.parentNode;
    let index = parseInt(row.id[row.id.length - 1]);
    let rowCount = index + 1;
    let action = schedule.addDayAfter(index, dayStartTime, dayEndTime, dayDuration);
    if(action === undefined) {
        let newRow = loadDay(rowCount, schedule.get(index + 1));
        loadTasks(newRow, schedule.get(index + 1));
        let tableBodyNodes = tableBody.childNodes;
        if(index === tableBodyNodes.length - 1) {
            tableBody.appendChild(newRow);
        } else {
            for(let i = index + 1; i < tableBodyNodes.length; i++) {
                tableBodyNodes[i].id = "row" + rowCount;
                tableBodyNodes[i].childNodes[0].childNodes[3].id = rowCount + "removeDay";
                updateTaskId(rowCount, tableBodyNodes[i].childNodes);
                rowCount++;
            }
            tableBody.insertBefore(newRow, tableBodyNodes[index + 1]);
        }
    } else {
        alert(action);
    }
}

/*
    This function removes the day from the schedule
    and adjusts the id of the following rows in the 
    table.
*/
function removeDay(button) {
    let row = button.parentNode.parentNode;
    let index = parseInt(row.id[row.id.length - 1]);
    let rowCount = index;
    let action = schedule.remove(index);
    if(action === undefined) {
        let tableBodyNodes = tableBody.childNodes;
        tableBody.removeChild(row);
        if(tableBodyNodes.length < 1) {
            console.log(scheduleTable.childNodes);
            while(scheduleTable.childNodes.length > 0) {
                scheduleTable.removeChild(scheduleTable.lastChild);
            }
        }
        for(let i = index; i < tableBodyNodes.length; i++) {
            tableBodyNodes[i].id = "row" + rowCount;
            tableBodyNodes[i].childNodes[0].childNodes[3].id = rowCount + "removeDay";
            updateTaskId(rowCount, tableBodyNodes[i].childNodes);
            rowCount++;
        }
    } else {
        alert(action);
    }
}

/*
    This function changes the display of the task's cell
    in the table into one that can be edited. The user
    can then change the desired times and task description.
*/
function editTask(button) {
    if(selectEdit === button) {
        return;
    }
    selectEdit = button;
    let cell = button.parentNode;
    let cellNodes = cell.childNodes;
    let displayPara = cellNodes[1];
    let dayIndex = parseInt(cell.id[0]);
    let taskIndex = parseInt(cell.id.slice(5));
    let task = schedule.get(dayIndex).taskList.get(taskIndex);
    tempTask = tempTask = new Task(task.description, task.startTime, task.duration);
    let colon = document.createElement("span");
    colon.innerHTML = ":";
    displayPara.hidden = true;
    //start time hour
    let startHour = document.createElement("input");
    startHour.type = "number";
    startHour.value = task.startTime.hour;
    startHour.id = "startHour";
    startHour.max = task.endTime.hour;
    startHour.min = 0;
    startHour.className = "task-times";
    //start time min 
    let startMin = document.createElement("input");
    startMin.type = "number";
    startMin.value = task.startTime.minute;
    startMin.id = "startMin";
    startMin.max = 59;
    startMin.min = 0;
    startMin.className = "task-times";
    //startSpan
    let startSpan = document.createElement("span");
    startSpan.innerHTML = "Start Time: ";
    startSpan.appendChild(startHour);
    startSpan.appendChild(colon);
    startSpan.appendChild(startMin);
    //end time hour
    let endHour = document.createElement("input");
    endHour.type = "number";
    endHour.value = task.endTime.hour;
    endHour.id = "endHour";
    endHour.max = 24;
    endHour.min = tempTask.startTime.hour;
    endHour.className = "task-times";
    //end time min
    let endMin = document.createElement("input");
    endMin.type = "number";
    endMin.value = task.endTime.minute;
    endMin.id = "endMin";
    endMin.max = 59;
    endMin.min = 0;
    endMin.className = "task-times";
    //endSpan
    let endSpan = document.createElement("span");
    endSpan.innerHTML="<br>End Time: ";
    endSpan.appendChild(endHour);
    endSpan.appendChild(colon.cloneNode(true));
    endSpan.appendChild(endMin);
    //duration hour
    let durationHour = document.createElement("input");
    durationHour.type = "number";
    durationHour.value = task.duration.hour;
    durationHour.id = "durHour";
    durationHour.max = 24;
    durationHour.min = 0;
    durationHour.className = "task-times";
    //duration minute
    let durationMin = document.createElement("input");
    durationMin.type = "number";
    durationMin.value = task.duration.minute;
    durationMin.id = "durMin";
    durationMin.max = 59;
    durationMin.min = 0;
    durationMin.className = "task-times";
    //duration span
    let durSpan = document.createElement("span");
    durSpan.innerHTML = "<br>Duration: ";
    durSpan.appendChild(durationHour);
    durSpan.appendChild(colon.cloneNode(true));
    durSpan.appendChild(durationMin);
    //edit paragraph
    let editPara = document.createElement("p");
    editPara.appendChild(startSpan);
    editPara.appendChild(endSpan);
    editPara.appendChild(durSpan);
    //hide displayPara and show edit para in its place
    cell.insertBefore(editPara, displayPara);
    displayPara.hidden = true;
    //show save and cancel buttons
    cellNodes[cellNodes.length - 1].hidden = false;
    cellNodes[cellNodes.length - 2].hidden = false;
    //hide add before and add after buttons
    if(schedule.get(dayIndex).taskList.length() === 1) {
        cellNodes[3].hidden = true;
        cellNodes[4].hidden = true;
        cellNodes[5].hidden = true;
        cellNodes[6].hidden = true;
    } else {
        if(taskIndex === 0 ) {
            cellNodes[3].hidden = true;
            cellNodes[5].hidden = true;
        }
        if(taskIndex === schedule.get(dayIndex).taskList.length() - 1) {
            cellNodes[3].hidden = true;
            cellNodes[4].hidden = true;
            cellNodes[5].hidden = true;
        } else {
            cellNodes[3].hidden = true;
            cellNodes[4].hidden = true;
        }
    }
}

/*
    This function reverts the task's cell display,
    and does not change the task in any way.
*/
function cancelEdit(button) {
    selectEdit = null;
    let cell = button.parentNode;
    let dayIndex = parseInt(cell.id[0]);
    let taskIndex = parseInt(cell.id.slice(5));
    let cellNodes = cell.childNodes;
    let displayPara = cellNodes[2];
    let editPara = cellNodes[1];
    cell.removeChild(editPara);
    displayPara.hidden = false;
    //hide save and cancel buttons
    cellNodes[cellNodes.length - 1].hidden = true;
    cellNodes[cellNodes.length - 2].hidden = true;
    //show add before, add after and remove buttons
    if(schedule.get(dayIndex).taskList.length() === 1) {
            cellNodes[2].hidden = false;
            cellNodes[3].hidden = false;
            cellNodes[4].hidden = false;
            cellNodes[5].hidden = false;
    } else {
        if(taskIndex === 0 || taskIndex === schedule.get(dayIndex).taskList.length() - 1) {
            cellNodes[2].hidden = false;
            cellNodes[3].hidden = false;
            cellNodes[4].hidden = false;
        } else {
            cellNodes[2].hidden = false;
            cellNodes[3].hidden = false;
        }
    }
}

/*
    This function updates the task's values 
    using the input values, and displays these
    changes in the cell.
*/
function saveEdit(button) {
    selectEdit = null;
    let cell = button.parentNode;
    let row = button.parentNode.parentNode;
    let dayIndex = parseInt(cell.id[0]);
    let taskIndex = parseInt(cell.id.slice(5));
    let day = schedule.get(dayIndex);
    let task = day.taskList.get(taskIndex);
    if(task.startTime.compareTo(tempTask.startTime) <= 0) {
        task.setStartTime(tempTask.startTime);
        task.setEndTime(tempTask.endTime);
        day.taskList.adjustAllStartTimes(taskIndex + 1);
        day.taskList.adjustAllEndTimes(taskIndex - 1);
    } else {
        task.setStartTime(tempTask.startTime);
        task.setEndTime(tempTask.endTime);
        day.taskList.adjustAllEndTimes(taskIndex - 1);
    }
    while(row.childNodes.length > 1) {
        row.removeChild(row.lastChild);
    }
    if(task.endTime.compareTo(tempTask.endTime) != 0) {
        task.setEndTime(tempTask.endTime);
    }
    if(task.startTime.compareTo(tempTask.startTime) != 0) {
        task.setStartTime(tempTask.startTime);
    }
    loadTasks(row, schedule.get(dayIndex)); 
}

function addTaskBefore(button) {
    let cell = button.parentNode;
    let row = button.parentNode.parentNode;
    let dayIndex = parseInt(cell.id[0]);
    let taskIndex = parseInt(cell.id[cell.id.length - 1]);
    let day = schedule.get(dayIndex);
    let curr = day.taskList.get(taskIndex);
    if(curr.startTime.compareTo(new Time(0,0)) === 0) {
        alert("Cannot add task that starts before midnight.");
        return;
    }
    let startTime = Time.subtract(curr.startTime, curr.duration);
    let task = new Task("Please enter a description.", startTime, dayDuration);
    day.taskList.addAtIndex(task, taskIndex);
    while(row.childNodes.length > 1) {
        row.removeChild(row.lastChild);
    }
    loadTasks(row, schedule.get(dayIndex)); 
}

function addTaskAfter(button) {
    let cell = button.parentNode;
    let row = button.parentNode.parentNode;
    let dayIndex = parseInt(cell.id[0]);
    let taskIndex = parseInt(cell.id.slice(5));
    console.log(cell.id);
    console.log(taskIndex);
    let day = schedule.get(dayIndex);
    let curr = day.taskList.get(taskIndex);
    let task = new Task("Please enter a description.", curr.endTime, dayDuration);
    day.taskList.addToBack(task);
    while(row.childNodes.length > 1) {
        row.removeChild(row.lastChild);
    }
    loadTasks(row, schedule.get(dayIndex)); 
}

function removeTask(button) {
    let cell = button.parentNode;
    let row = button.parentNode.parentNode;
    let dayIndex = parseInt(cell.id[0]);
    let taskIndex = parseInt(cell.id[cell.id.length - 1]);
    let day = schedule.get(dayIndex);
    day.taskList.removeAtIndex(taskIndex);
    if(day.taskList.length() === 0) {
        removeDay(document.getElementById(dayIndex + "removeDay"));
    } else {
        while(row.childNodes.length > 1) {
            row.removeChild(row.lastChild);
        }
        loadTasks(row, schedule.get(dayIndex)); 
    }
}