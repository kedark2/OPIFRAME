//hardcoded data. Will be removed when connected to real database
var database = [];
var id = 100;

window.onload = function () {
    createForm();
}
createForm = () => {
    let anchor = document.getElementById("anchor");
    let form = document.createElement("form");

    //item type input
    let typeinput = document.createElement("input");
    typeinput.setAttribute("type", "text");
    typeinput.setAttribute("id", "type");
    typeinput.setAttribute("name", "type");

    let typelabel = document.createElement("label");
    typelabel.setAttribute("for", "type");

    let typelabeltext = document.createTextNode("Type:");
    typelabel.appendChild(typelabeltext);

    //count input
    let countinput = document.createElement("input");
    countinput.setAttribute("type", "number");
    countinput.setAttribute("id", "count");
    countinput.setAttribute("name", "count");

    let countlabel = document.createElement("label");
    countlabel.setAttribute("for", "count");

    let countlabeltext = document.createTextNode("Count:");
    countlabel.appendChild(countlabeltext);

    //price input
    let priceinput = document.createElement("input");
    priceinput.setAttribute("type", "number");
    priceinput.setAttribute("id", "price");
    priceinput.setAttribute("name", "price");
    priceinput.setAttribute("step", "0.01"); //this line is same as the line below 
    //<input type="number" id="price" name="price" step="0.01"></input>

    let pricelabel = document.createElement("label");
    pricelabel.setAttribute("for", "price");

    let pricelabeltext = document.createTextNode("Price:");
    pricelabel.appendChild(pricelabeltext);

    // submit button

    let submitButton = document.createElement("input");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("value", "Add");

    // build the form

    let br = document.createElement("br");

    //type line
    form.appendChild(typelabel);
    form.appendChild(typeinput);
    form.appendChild(br);
    //count line
    form.appendChild(countlabel);
    form.appendChild(countinput);
    form.appendChild(br.cloneNode());

    //price line
    form.appendChild(pricelabel);
    form.appendChild(priceinput);
    form.appendChild(br.cloneNode());
    //submit button
    form.appendChild(submitButton);
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        addToList();
    })
    anchor.appendChild(form);


}

addToList = () => {
    console.log("addToList()");
    let typeinput = document.getElementById("type");
    let countinput = document.getElementById("count");
    let priceinput = document.getElementById("price");
    let item = {
        id: id,
        type: typeinput.value,
        count: countinput.value,
        price: priceinput.value
    }
    id++
    database.push(item);
    console.log(database);
    populateTable();
}

removeFromList = (id) => {
    console.log("removeFromList");
    let tempId = parseInt(id, 10);
    database = database.filter(item => item.id !== tempId);
    populateTable();
}

populateTable = () => {
    let anchor = document.getElementById("anchor");
    let table = document.getElementById("table");
    if (table) {
        anchor.removeChild(table);

    }
    let newTable = document.createElement("table");
    newTable.setAttribute("id", "table");

    //header and header row
    let header = document.createElement("thread");
    let headerRow = document.createElement("tr");

    //type header
    let typeHeader = document.createElement("th");
    let typeLabel = document.createTextNode("Type");
    typeHeader.appendChild(typeLabel);

    //count header
    let countHeader = document.createElement("th");
    let countLabel = document.createTextNode("Count");
    countHeader.appendChild(countLabel);

    //price header
    let priceHeader = document.createElement("th");
    let priceLabel = document.createTextNode("Price");
    priceHeader.appendChild(priceLabel);

    //remove header
    let removeHeader = document.createElement("th");
    let removeLabel = document.createTextNode("Buy");
    removeHeader.appendChild(removeLabel)

    headerRow.appendChild(typeHeader);
    headerRow.appendChild(countHeader);
    headerRow.appendChild(priceHeader);
    headerRow.appendChild(removeHeader)
    header.appendChild(headerRow);
    newTable.appendChild(header);

    //Table body
    let body = document.createElement("tbody");
    for (let i = 0; i < database.length; i++) {
        let tableRow = document.createElement("tr");
        for (x in database[i]) {
            if (x === "id") {
                continue;
            }
            let column = document.createElement("td");
            let node = document.createTextNode(database[i][x]);
            column.appendChild(node);
            tableRow.appendChild(column);
        }
        let column = document.createElement("td");
        let removeButton = document.createElement("button");
        let removeText = document.createTextNode("Buy");
        removeButton.appendChild(removeText);
        removeButton.setAttribute("name", database[i].id);
        removeButton.addEventListener("click", function (e) {
            removeFromList(e.target.name);
        })
        column.appendChild(removeButton);
        tableRow.appendChild(column)
        body.appendChild(tableRow);
    }
    newTable.appendChild(body);
    anchor.appendChild(newTable);
}