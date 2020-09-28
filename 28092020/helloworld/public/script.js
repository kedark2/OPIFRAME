pressTheButton = (event) => {
    let header = document.getElementById("header");
    let name = document.getElementById("nameinput").value;
    header.textContent = "Hello " + name
}