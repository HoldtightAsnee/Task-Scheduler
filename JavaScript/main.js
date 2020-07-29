let schedule = new Schedule();

let scheduleTable = document.createElement("table");
scheduleTable.id = "schedTable";
scheduleTable.addEventListener("click", tableButtonDelegator);

let tableBody = document.createElement("tbody");

let submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", displayTable);

let dayStartTime;
let dayEndTime;
let dayDuration;

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
    weekday.appendChild(addDayBeforeBtn);
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
        data.id = rowCount + "col" + colCount;
        let desc = task.description;
        let startTime = "Start Time: " + task.startTime + "<br>";
        let endTime = "End Time: " + task.endTime + "<br>";
        let duration = "Duration: " + task.duration + "<br>";
        let descLabel = '<label for="task"> Description: </Label>'
        let descInput = '<input name="task" ' + ' value="' + desc + '">';
        data.innerHTML = descLabel + descInput +"<p>" + startTime + endTime + duration + "</p>";
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
    }
}

/*
    This function adds the day the current day to the 
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
        let tableBodyNodes = tableBody.childNodes
        for(let i = index; i < tableBodyNodes.length; i++) {
            rowCount++;
            tableBody.childNodes[i].id = "row" + rowCount;
        }
        tableBody.insertBefore(newRow, tableBodyNodes[index]);
    } else {
        alert(action);
    }
}