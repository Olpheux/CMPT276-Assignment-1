var rowCounter = 4; // Table has 4 rows by default

function addRow(){
    rowCounter++;

    var table = document.getElementById("calculatorTable");
    
    var row = document.createElement("tr");
    var cellName = document.createElement("td");
    var cellShortName = document.createElement("td");
    var cellWeight = document.createElement("td");
    var cellGrade = document.createElement("td");
    var cellPercent = document.createElement("td");

    cellName.innerHTML = "Activity " + rowCounter;
    cellShortName.innerHTML = "A" + rowCounter;
    cellWeight.innerHTML = "<input type=\"text\" size=\"1\" class=\"weight\" />";
    cellGrade.innerHTML = "<input type=\"text\" size=\"1\" class=\"gradeRecevied\" /> / <input type=\"text\" size=\"1\" class=\"gradeMaximum\" />";
    cellPercent.innerHTML = "RESULT";

    row.appendChild(cellName);
    row.appendChild(cellShortName);
    row.appendChild(cellWeight);
    row.appendChild(cellGrade);
    row.appendChild(cellPercent);

    table.appendChild(row);  
}
