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

    cellPercent.classList.add("result");

    cellName.innerHTML = "Activity " + rowCounter;
    cellShortName.innerHTML = "A" + rowCounter;
    cellWeight.innerHTML = "<input type=\"text\" size=\"1\" class=\"weight\" />";
    cellGrade.innerHTML = "<input type=\"text\" size=\"1\" class=\"gradeRecevied\" /> / <input type=\"text\" size=\"1\" class=\"gradeMaximum\" />";
    cellPercent.innerHTML = "";

    row.appendChild(cellName);
    row.appendChild(cellShortName);
    row.appendChild(cellWeight);
    row.appendChild(cellGrade);
    row.appendChild(cellPercent);

    table.appendChild(row);  
}

function weightedCalc(){
    var weights = []; // Set up empty array to hold weights and grades
    var percents = [];

    // Collect weights and grades
    for(iterations = 0; iterations < rowCounter; iterations++){
        // Messy, but adds every 3rd element in the form to the array of weights,
        // then similar method for the grades.
        //
        // Due to layout of the form, this will work regardless of how many rows are added
        // (Up until an int overflow, I guess, but why are you doing that?)
        weights.push(document.getElementById("calculatorForm").elements.item((iterations * 3)));
        var gradeReceived = document.getElementById("calculatorForm").elements.item((iterations * 3) + 1);
        var gradeMaximum = document.getElementById("calculatorForm").elements.item((iterations * 3) + 2);
    
        var percent = gradeReceived / gradeMaximum;

        // Probably bad variable naming here...
        percents.push(percent);

        // And put the result into the results column.
        var resultOutput = document.querySelector(".result");
        resultOutput.innerHTML = (percent);
    }

    var weightedResultTotal = 0;
    var weightsTotal = 0;

    // Now that all data has been collected, we can process it
    for(iterations = 0; iterations < rowCounter; iterations++){
        weightedResultTotal = weightedResultTotal + (percents[iterations] *  weights[iterations]);
        weightsTotal = weightsTotal + weights[iterations];
    }

    var finalResult = weightedResultTotal / weightsTotal;

    // Finally, output weighted results
    var finalResultOutput = document.querySelector("#finalResult");
    finalResultOutput.innerHTML = "Result: " + finalResult;
}