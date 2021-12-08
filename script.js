let allReferences = [];
let currentType = "all";

const addDataToTable = (favorite, discard, all = false) => {
    // console.log(favorite, discard);
    let tableBody = document.getElementById("tableBody");
    tableBody.innerText = "";

    allReferences.forEach((element, i) => {
        if (all || ((favorite == element.favorite) || (discard == element.discard))) {
            // console.log(i, "Added")
            let tr = document.createElement("tr");
            let reftd = document.createElement("td");
            reftd.innerText = element.reference;
            tr.appendChild(reftd);

            let cittd = document.createElement("td");
            cittd.innerText = element.citation;
            tr.appendChild(cittd);

            let actiontd = document.createElement("td");
            let afavbtn = document.createElement("button");
            afavbtn.setAttribute("onClick", "favbtn(" + i + ")");
            afavbtn.innerText = "Favorite";
            actiontd.appendChild(afavbtn);

            let adiscardbtn = document.createElement("button");
            adiscardbtn.setAttribute("onClick", "discardbtn(" + i + ")")
            adiscardbtn.innerText = "Discard";
            actiontd.appendChild(adiscardbtn);


            tr.appendChild(actiontd);

            tableBody.appendChild(tr);

        } else {
            // console.log("String not added", element)
        }
    });
}
const getLocalData = () => {
    let references = localStorage.getItem("saveReferences");
    if (references) {
        references = JSON.parse(references);
    } else {
        references = [];
    }
    allReferences = references;
}

const init = () => {
    console.log("Init called");

    getLocalData();
    addDataToTable(true, true, true)
}
init();


const favbtn = (index) => {
    // console.log('favbtn called')
    // console.log(index)

    let reference = allReferences[index];
    let newReference = {
        ...reference,
        favorite: "yes",
        discard: "no"
    }
    allReferences[index] = newReference;

    saveToLocalStorage();
}

const discardbtn = (index) => {

    let reference = allReferences[index];
    let newReference = {
        ...reference,
        favorite: "no",
        discard: "yes"
    }

    allReferences[index] = newReference;

    saveToLocalStorage();
}

const filter = (type) => {
    // console.log(type);
    currentType = type;

    if (type == "all") {
        // addDataToTable("yes", "no")
        // addDataToTable("no", "yes")
        addDataToTable(true, true, true)
    }
    if (type == "favorite") {
        addDataToTable("yes", "no")
    }
    if (type == "discard") {
        addDataToTable("no", "yes")
    }
    if (type == "nfnd") { //not favorite not discard
        addDataToTable("", "")
    }
}

const add = () => {
    let addedReference = document.getElementById("reference").value;
    let addedCitation = document.getElementById("citation").value;
    let newReference = {
        reference: addedReference,
        citation: addedCitation,
        favorite: "",
        discard: ""
    }

    allReferences.push(newReference);

    saveToLocalStorage();

    document.getElementById("reference").value = "";
    document.getElementById("citation").value = "";
}

const saveToLocalStorage = () => {
    localStorage.setItem("saveReferences", JSON.stringify(allReferences));
    filter(currentType);
}