var database = [];

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
    console.log("AddToList()");
}