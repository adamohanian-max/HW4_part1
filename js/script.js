/* Name: Adam Ohanian
   Email: adam_ohanian@student.uml.edu
   File: script.js 
   Description: JavaScript for the dynamic multiplication table for HW3. 
   Dependencies: style.css, index.html
   Copywright (c) 2026 Adam Ohanian */
$(function () {
  const $form = $("#tableForm");
  const $tableContainer = $("#table-container");
  const $errorMessage = $("#error-message");

  // Custom validator methods for min <= max
  $.validator.addMethod("colRangeValid", function (value, element) {
    const minCol = parseInt($("#minCol").val(), 10);
    const maxCol = parseInt($("#maxCol").val(), 10);
    if (isNaN(minCol) || isNaN(maxCol)) return true; // handled by required/number
    return minCol <= maxCol;
  }, "Minimum column value cannot be greater than maximum column value.");

  $.validator.addMethod("rowRangeValid", function (value, element) {
    const minRow = parseInt($("#minRow").val(), 10);
    const maxRow = parseInt($("#maxRow").val(), 10);
    if (isNaN(minRow) || isNaN(maxRow)) return true;
    return minRow <= maxRow;
  }, "Minimum row value cannot be greater than maximum row value.");

  $form.validate({
    rules: {
      minCol: {
        required: true,
        number: true,
        min: -50,
        max: 50,
        colRangeValid: true
      },
      maxCol: {
        required: true,
        number: true,
        min: -50,
        max: 50,
        colRangeValid: true
      },
      minRow: {
        required: true,
        number: true,
        min: -50,
        max: 50,
        rowRangeValid: true
      },
      maxRow: {
        required: true,
        number: true,
        min: -50,
        max: 50,
        rowRangeValid: true
      }
    },
    messages: {
      minCol: {
        required: "Please enter a minimum column value.",
        number: "Minimum column must be an integer.",
        min: "Minimum column must be at least -50.",
        max: "Minimum column must be at most 50."
      },
      maxCol: {
        required: "Please enter a maximum column value.",
        number: "Maximum column must be an integer.",
        min: "Maximum column must be at least -50.",
        max: "Maximum column must be at most 50."
      },
      minRow: {
        required: "Please enter a minimum row value.",
        number: "Minimum row must be an integer.",
        min: "Minimum row must be at least -50.",
        max: "Minimum row must be at most 50."
      },
      maxRow: {
        required: "Please enter a maximum row value.",
        number: "Maximum row must be an integer.",
        min: "Maximum row must be at least -50.",
        max: "Maximum row must be at most 50."
      }
    },
    errorPlacement: function (error, element) {
      // default: place right after the input
      error.insertAfter(element);
    },
    submitHandler: function (form) {
      // Only called if valid
      $tableContainer.empty();

      const minCol = parseInt($("#minCol").val(), 10);
      const maxCol = parseInt($("#maxCol").val(), 10);
      const minRow = parseInt($("#minRow").val(), 10);
      const maxRow = parseInt($("#maxRow").val(), 10);

      const table = generateTable(minCol, maxCol, minRow, maxRow);
      $tableContainer.append(table);
    }
  });
});
// Generates a multiplication table based on the provided minimum and maximum column and row values, and returns the table element
  function generateTable(minCol, maxCol, minRow, maxRow) {
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
// Create the header row with column labels and an empty corner cell
    const headerRow = document.createElement("tr");
    const cornerCell = document.createElement("th");
    cornerCell.textContent = "";
    headerRow.appendChild(cornerCell);
// Populate the header row with column labels
    for (let col = minCol; col <= maxCol; col++) {
      const th = document.createElement("th");
      th.textContent = col;
      headerRow.appendChild(th);
    }

    thead.appendChild(headerRow);
// Create the body of the table with row labels and multiplication results
    for (let row = minRow; row <= maxRow; row++) {
      const tr = document.createElement("tr");

      const rowHeader = document.createElement("th");
      rowHeader.textContent = row;
      tr.appendChild(rowHeader);

      for (let col = minCol; col <= maxCol; col++) {
        const td = document.createElement("td");
        td.textContent = row * col;
        tr.appendChild(td);
      }

      tbody.appendChild(tr);
    }

    table.appendChild(thead);
    table.appendChild(tbody);
// Return the generated table element
    return table;
  };