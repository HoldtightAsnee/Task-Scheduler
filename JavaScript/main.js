let schedule = new Schedule();

let scheduleTable = document.createElement("table");
scheduleTable.id = "schedTable";
scheduleTable.addEventListener("click", tableButtonDelegator);
scheduleTable.addEventListener("input", taskInputDelegator);

let tableBody = document.createElement("tbody");

let submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", displayTable);

let dayStartTime;
let dayEndTime;
let dayDuration;

let selectEdit;
let tempTask;

/*
    Creates the schedule in the schedule object
    using the inputs from the page.
*/
function createSchedule() {
    dayStartTime = Time.stringToTime(document.getElementById("startTime").value);
    dayEndTime = Time.stringToTime(document.getElementById("endTime").value);
    let durHour = document.getElementById("durationHour").value;
    let durMin = document.getElementById("durationMinute").value;
    dayDuration = new Time(parseInt(durHour), parseInt(durMin));
    let startDay = document.getElementById("startDay").value;
    let endDay = document.getElementById("endDay").value;

    if(dayStartTime.compareTo(dayEndTime) >= 0) {
        alert("Start time cannot be greater than or equal to end time.");
        return false;
    } else if(dayDuration.compareTo(Time.subtract(dayStartTime, dayEndTime)) > 0) {
        alert("Duration must be between the start time and end time.")
        return false;
    } else {
        schedule.generateSchedule(startDay, endDay, dayStartTime, dayEndTime, dayDuration);
        return true;
    }
}
/*
    Creates a tr element for a day and returns the node.
*/
function loadDay(rowCount, day) {
    let row = document.createElement("tr");
    row.id = "row" + rowCount;
    let weekday = document.createElement('td');
    weekday.innerHTML = day.day;
    let addDayBeforeBtn = document.createElement('button');
    addDayBeforeBtn.innerHTML = "Add Day Before";
    addDayBeforeBtn.dataset.role = "addDayBefore";
    let addDayAfterBtn = document.createElement("button");
    addDayAfterBtn.innerHTML = "Add Day After";
    addDayAfterBtn.dataset.role = "addDayAfter";
    let removeDayBtn = document.createElement("button");
    removeDayBtn.innerHTML = "Remove";
    removeDayBtn.dataset.role = "removeDay";
    removeDayBtn.id = rowCount + "removeDay";
    weekday.appendChild(addDayBeforeBtn);
    weekday.appendChild(addDayAfterBtn);
    weekday.appendChild(removeDayBtn);
    row.appendChild(weekday);
    return row;
}

/*
    Creates td elements for each task in a day
    and appends them to a row node.
*/
function loadTasks(row, day) {
    let rowCount = row.id[row.id.length - 1];
    let colCount = 0;
    day.taskList.taskArr.forEach(task => {
        let data = document.createElement('td');
        data.id = rowCount + "task" + colCount;
        let descId = rowCount + "desc" + colCount;
        let desc = task.description;
        let startTime = "Start Time: " + task.startTime + "<br>";
        let endTime = "End Time: " + task.endTime + "<br>";
        let duration = "Duration: " + task.duration + "<br>";
        let descLabel = '<label for="task"> Description: </Label>'
        let descInput = '<input name="task" id="' + descId + '"placeholder="' + desc + '">';
        let timesId = rowCount + "taskTimes" + colCount;
        data.innerHTML = descLabel + descInput +"<p id='" + timesId + "'>" + startTime + endTime + duration + "</p>";
        //Add before button
        let addTaskBeforeBtn = document.createElement("button");
        addTaskBeforeBtn.innerHTML = "Add";
        addTaskBeforeBtn.dataset.role ="addTaskBefore";
        //Add after button
        let addTaskAfterBtn = document.createElement("button");
        addTaskAfterBtn.innerHTML = "Add";
        addTaskAfterBtn.dataset.role = "addTaskAfter";
        //Edit Button
        let editTaskBtn = document.createElement("button");
        editTaskBtn.innerHTML = "Edit";
        editTaskBtn.dataset.role = "editTask";
        //Remove button
        let removeTaskBtn = document.createElement("button");
        removeTaskBtn.innerHTML = "Remove";
        removeTaskBtn.dataset.role = "removeTask";
        //Save button
        let saveEditBtn = document.createElement("button");
        saveEditBtn.innerHTML = "Save";
        saveEditBtn.dataset.role = "saveEdit";
        saveEditBtn.hidden = true;
        //Cancel button
        let cancelEditBtn = document.createElement("button");
        cancelEditBtn.innerHTML = "Cancel";
        cancelEditBtn.dataset.role = "cancelEdit";
        cancelEditBtn.hidden = true; 
        cancelEditBtn.id = rowCount + "cancel" + colCount;
        //adding buttons to data
        if(colCount === 0) {
            data.appendChild(addTaskBeforeBtn);
        }
        data.appendChild(editTaskBtn);
        data.appendChild(removeTaskBtn);
        if(colCount === day.taskList.length() - 1) {
            data.appendChild(addTaskAfterBtn);
        }
        data.appendChild(saveEditBtn);
        data.appendChild(cancelEditBtn);
        row.appendChild(data);
        colCount++;
    });
}

/*
    Creates a tr elements for each day and appends them to
    the table body. Clears the tbody's child nodes
    if there are any.
*/
function fillTable() {
    if(!scheduleTable.hasChildNodes()) {
        scheduleTable.innerHTML = "<thead><th>Schedule</th></thead>";   
    }
    if(tableBody.hasChildNodes()) {
        while(tableBody.hasChildNodes()) {
            tableBody.removeChild(tableBody.lastChild);
        }
    }
    scheduleTable.appendChild(tableBody);
    let rowCount = 0;
    schedule.days.forEach(element => {
        let row = loadDay(rowCount, element);
        loadTasks(row, element);
        rowCount++
        tableBody.appendChild(row);
    });
    document.getElementById("schedule-table").appendChild(scheduleTable);
}

/*
    Displays the table when the submit button is pressed.
*/
function displayTable() {
    let action = createSchedule();
    if(action) {
        fillTable();
    }
}

function updateTaskId(rowCount, rowNodes) {
            let colCount = 0;
            while(colCount < rowNodes.length - 1) {
                let cell = rowNodes[colCount + 1];
                cell.id = rowCount + "task" + colCount;
                cell.childNodes[2].id = rowCount + "taskTimes" + colCount;
                colCount++;
            }
}


