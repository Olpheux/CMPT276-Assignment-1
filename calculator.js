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
    var validRows = 0;

    // Collect weights and grades
    for(iterations = 0; iterations < rowCounter; iterations++){
        // Messy, but adds every 3rd element in the form to the array of weights,
        // then similar method for the grades.
        //
        // Due to layout of the form, this will work regardless of how many rows are added
        // (Up until an int overflow, I guess, but why are you doing that?)
        weights.push(Number(((document.getElementById("calculatorForm").elements.item((iterations * 3)))).value));
        var gradeReceived = Number((document.getElementById("calculatorForm").elements.item((iterations * 3) + 1).value));
        var gradeMaximumRawValue = document.getElementById("calculatorForm").elements.item((iterations * 3) + 2).value;
    
        if(gradeMaximumRawValue == null || gradeMaximumRawValue == 0){
            alert("Division by zero (or blank field) detected. Omitting from calculations...");
            percents.push(0);
        } else {
            var gradeMaximum = Number(gradeMaximumRawValue);
            var percent = gradeReceived / gradeMaximum;

            // Probably bad variable naming here...
            percents.push(percent);
            validRows++;
        }
    }

    var weightedResultTotal = 0;
    var weightsTotal = 0;

    // Now that all data has been collected, we can process it
    // If we have an error on above step, this effectively omits it from
    // the calculations, as it relies on multiplication and addition -- 
    // will just add 0 if an error!
    // Still have to manually check on weighting however; possible to
    // have a high-weighted assignment we got a 0% on.
    for(iterations = 0; iterations < rowCounter; iterations++){
        weightedResultTotal = weightedResultTotal + (percents[iterations] *  weights[iterations]);
        if(gradeMaximumRawValue != null || gradeMaximumRawValue != 0){
            weightsTotal = weightsTotal + weights[iterations];
        }
    }

    var finalResult = weightedResultTotal / weightsTotal;

    // Finally, output results
    var resultsColumn = document.querySelectorAll(".result");
    for(i = 0; i < rowCounter; i++){
        resultsColumn[i].innerHTML = ((percents[i] * 100).toFixed(3));
    }

    var finalResultOutput = document.querySelector("#finalResult");
    finalResultOutput.innerHTML = "Result: " + ((finalResult * 100).toFixed(3)) + "%";
}

function meanCalc(){
    // Code largely copied from above with weighting functionality stripped out
    var percents = []; // Set up empty array to hold grades
    var validRows = 0;

    // Collect grades
    for(iterations = 0; iterations < rowCounter; iterations++){
        var gradeReceived = Number((document.getElementById("calculatorForm").elements.item((iterations * 3) + 1).value));
        var gradeMaximumRawValue = document.getElementById("calculatorForm").elements.item((iterations * 3) + 2).value;
    
        if(gradeMaximumRawValue == null || gradeMaximumRawValue == 0){
            alert("Division by zero (or blank field) detected. Omitting from calculations...");
            percents.push(0);
        } else {
            var gradeMaximum = Number(gradeMaximumRawValue);
            var percent = gradeReceived / gradeMaximum;

            // Probably bad variable naming here...
            percents.push(percent);
            validRows++;
        }
    }

    // Now that all data has been collected, we can process it
    var resultTotal = 0;
    for(iterations = 0; iterations < percents.length; iterations++){
        resultTotal = resultTotal + (percents[iterations]);
    }

    var finalResult = resultTotal / validRows;

    // Finally, output results
    var resultsColumn = document.querySelectorAll(".result");
    for(i = 0; i < rowCounter; i++){
        resultsColumn[i].innerHTML = ((percents[i] * 100).toFixed(3));
    }

    var finalResultOutput = document.querySelector("#finalResult");
    finalResultOutput.innerHTML = "Result: " + ((finalResult * 100).toFixed(3)) + "%";
}