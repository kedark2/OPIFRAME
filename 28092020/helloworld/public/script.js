pressTheButton = (event) => {
    let header = document.getElementById("header");
    let name = document.getElementById("nameinput").value;
    let request = {
        method: "GET",
        mode: "cors",
        header: { "Content-type": "application/json" }
    }
    fetch("/hello/" + name, request).then((response) => {
        if (response.ok) {
            response.json().then((data) => {
                header.textContent = data.message;
            }).catch((error) => {
                console.log(error);
            })
        } else {
            console.log("Server responded with status:" + response.statusText);
        }

    }).catch((error) => {
        console.log(error);
    })
    // header.textContent = "Hello " + name
}