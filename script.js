let allReferences = [];

let currentType = "all";
/**
 * {
 * reference: string,
 * citation: string,
 * favorite: boolean,
 * discard: boolean
 * }
 */

allReferences.push({
    reference: "Apple always fall down due to gravity.",
    citation: "Newton Issac",
    favorite: "yes",
    discard: "no"
})
allReferences.push({
    reference: "Similarly, Orange always fall down due to gravity.",
    citation: "Another Newton",
    favorite: "yes",
    discard: "no"
})

allReferences.push({
    reference: "Including other materials also fall down.",
    citation: "Newton Common Sense",
    favorite: "no",
    discard: "yes"
})

allReferences.push({
    reference: "Nothing falls; gravity is illusion.",
    citation: "Mr Present Scientist",
    favorite: "",
    discard: ""
})

const addDataToTable = (favorite, discard) => {
    console.log(favorite, discard);
    let tableBody = document.getElementById("tableBody");
    tableBody.innerText = "";

    allReferences.forEach((element, i) => {
        if ((favorite == element.favorite) || (discard == element.discard)) {
            console.log(i, "Added")
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
            console.log("String not added", element)
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
    getLocalData();
    console.log("Init called");
    addDataToTable("yes", "no");
    addDataToTable("no", "yes");
    addDataToTable("", "");
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
    // console.log(allReferences);

    filter(currentType);
}

const discardbtn = (index) => {

    let reference = allReferences[index];
    let newReference = {
        ...reference,
        favorite: "no",
        discard: "yes"
    }
    allReferences[index] = newReference;
    // console.log(allReferences)
    filter(currentType);
}

const filter = (type) => {
    console.log(type);
    currentType = type;

    if (type == "all" || type == "favorite" || type == "discard" || type == "nfnd") {
        addDataToTable("yes", "no")
        addDataToTable("no", "yes")
        addDataToTable("", "")
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
}

const add = () => {
    console.log('Before adding', allReferences.length);
    let addedReference = document.getElementById("reference").value;
    let addedCitation = document.getElementById("citation").value;
    let newReference = {
        reference: addedReference,
        citation: addedCitation,
        favorite: "",
        discard: ""
    }
    // allReferences.push(newReference);

    let saveReferences = localStorage.getItem("saveReferences");
    if (saveReferences) {
        saveReferences = JSON.parse(saveReferences);
    } else {
        saveReferences = [];
    }

    saveReferences.push(newReference);

    allReferences = saveReferences;

    localStorage.setItem("saveReferences", JSON.stringify(saveReferences))

    console.log('Add called!', allReferences.length);
    filter(currentType);

    document.getElementById("reference").value = "";
    document.getElementById("citation").value = "";
}

























































let allAnswer = [];

const updateFillingFor = () => {
    let lastId = localStorage.getItem("lastId");
    if (lastId) {
        lastId = parseInt(lastId);
    } else {
        lastId = 0;
    }

    let fillingFor = document.getElementById('fillingFor');
    let fillingFor2 = document.getElementById('fillingFor2');
    fillingFor.innerText = lastId + 1;
    fillingFor2.innerText = lastId + 1;
}

const readInitial = () => {
    fetch("./references.csv")
        // fetch("https://quiz.bloggernepal.com/questions.json")
        .then(response => {

            console.log(response);

            // let data = response.body.toString();

            // console.log(data);
            return response.text()
        })
        .then(data => {
            // console.log(data);

            let csvData = Papa.parse(data);

            // console.log(csvData);

            let references = [];
            csvData.data.forEach((element, i) => {
                // console.log(element[0])
                // ignore last and first
                if (i != 0 && i != csvData.data.length - 1) {
                    // console.log(element[0])
                    // let citation = element[1];
                    references.push({
                        reference: element[0],
                        citation: element[1]
                    })
                }
            })

            populateReferences(references);
            updateFillingFor();
        })
}

// readInitial();

function populateReferences(references) {

    allReferences = references;

    let referencesHolder = document.getElementById("references");
    referencesHolder.innerText = "";
    // console.log(references);

    references.forEach((element, i) => {
        // console.log(element)

        // 1 create a div
        let div = document.createElement("div");

        // 2 create h2 for question
        let h2 = document.createElement("h2");
        h2.innerText = (i + 1) + ") " + element.reference;

        let h5 = document.createElement("h5");
        h5.innerText = "--> " + element.citation;

        let favbtn = document.createElement("button");
        favbtn.innerText = "Favorite";
        favbtn.setAttribute("onClick", "favbtn(" + i + ")");

        let discardbtn = document.createElement("button");
        discardbtn.innerText = "Discard";
        discardbtn.setAttribute("onClick", "discardbtn(" + i + ")");

        // 3 add (appendChild) h2 to div
        div.appendChild(h2)
        div.appendChild(h5)
        div.appendChild(favbtn)
        div.appendChild(discardbtn)

        // check question type

        // if it is choise, create radio and append to div
        if (element.questionType == 'choice' || element.questionType == 'choiceInput') {
            element.options.forEach((option, j) => {
                let input = document.createElement("input");
                input.setAttribute("type", "radio");
                input.setAttribute("id", "question-" + i + "-" + j);
                input.setAttribute("name", "opt" + i);
                let label = document.createElement("label");
                label.innerText = option;
                // label.appendChild(input);
                label.insertBefore(input, label.firstChild);
                div.appendChild(label);

                let br = document.createElement("br");
                div.appendChild(br);
            });
        }

        // if mchoice create checkbox and append to div
        if (element.questionType == 'mChoice' || element.questionType == 'mChoiceInput') {
            element.options.forEach((option, j) => {
                let input = document.createElement("input");
                input.setAttribute("type", "checkbox");
                input.setAttribute("id", "question-" + i + "-" + j);
                let label = document.createElement("label");
                label.innerText = option;
                label.insertBefore(input, label.firstChild);
                div.appendChild(label)

                let br = document.createElement("br");
                div.appendChild(br);
            });
        }

        // if it is input
        // create input and append it it div
        if (element.questionType == 'input' || element.questionType == 'choiceInput' || element.questionType == 'mChoiceInput') {
            let input = document.createElement("input");
            input.setAttribute("id", 'question-' + i);
            input.setAttribute("size", "60");
            div.appendChild(input);
        }


        // last add (appendChild) div to questionsHolder
        referencesHolder.appendChild(div);

    });
}

const populate = () => {
    populateQuestions(allReferences);
}



const save = () => {
    allAnswer = [];
    console.log('Save called!')
    console.log(allReferences.length, allAnswer.length)

    // allReferences.forEach((reference, i) => {
    //     console.log(reference);
    //     let answer = {
    //         ...reference
    //     }
    //     if (question.questionType == 'choice' || question.questionType == 'choiceInput') {
    //         question.options.forEach((option, j) => {
    //             let input = document.getElementById("question-" + i + "-" + j);
    //             if (input.checked) {
    //                 answer.choice = option;
    //                 // console.log(option);
    //             }
    //         });
    //     }

    //     if (question.questionType == 'mChoice' || question.questionType == 'mChoiceInput') {

    //         let selected = [];
    //         question.options.forEach((option, j) => {
    //             let input = document.getElementById("question-" + i + "-" + j);
    //             if (input.checked) {
    //                 selected.push(option)
    //                 // console.log(option);
    //             }
    //         });
    //         answer.selected = selected;
    //     }

    //     if (question.questionType == 'input' || question.questionType == 'choiceInput' || question.questionType == 'mChoiceInput') {
    //         let input = document.getElementById("question-" + i);
    //         // console.log(input.value);
    //         answer.input = input.value
    //     }

    //     allAnswer.push(answer);
    // })

    console.log(allAnswer);
    saveToLocal();
    updateFillingFor();
    populate();
}


const saveToLocal = () => {
    let lastId = localStorage.getItem("lastId");
    if (lastId) {
        lastId = parseInt(lastId);
    } else {
        lastId = 0;
    }

    lastId = lastId + 1;
    localStorage.setItem("lastId", lastId);

    localStorage.setItem("respondent-" + lastId, JSON.stringify(allAnswer))

    createResponseFile("respondent-" + lastId);

    createCummulativeResponseFile();
}

const createResponseFile = (filename) => {
    let downloadHolder = document.getElementById("downloadHolder");
    let a = document.createElement("a");

    let message = "Name,Age\nSagar,26\nAmrit,28\nNawaraj,14"
    // console.log(message);

    message = responseToCSVString(allAnswer)

    let blob = new Blob([message], {
        type: 'text/csv;charset=utf-8;'
    });

    let url = URL.createObjectURL(blob);
    a.href = url;
    a.download = filename + ".csv";
    a.innerText = 'Download';

    a.click();

    // downloadHolder.append(a);
}

const responseToCSVString = (answers) => {
    let message = 'question, questionType, options, choice, selected, input\n';

    answers.forEach(answer => {
        if (answer.question) {
            message = message + answer.question + ','
        } else {
            message = message + ','
        }
        if (answer.questionType) {
            message = message + answer.questionType + ','
        } else {
            message = message + ','
        }
        if (answer.options) {
            let options = [...answer.options]
            options = options.join("---")
            message = message + options + ','
        } else {
            message = message + ','
        }
        if (answer.choice) {
            message = message + answer.choice + ','
        } else {
            message = message + ','
        }

        if (answer.selected) {
            let selected = [...answer.selected]
            selected = selected.join("---")
            message = message + selected + ','
        } else {
            message = message + ','
        }
        if (answer.input) {
            message = message + answer.input + ','
        } else {
            message = message + ','
        }
        message = message + '\n'
    });
    return message;
}

const createCummulativeResponseFile = () => {
    let lastId = localStorage.getItem("lastId");
    if (lastId) {
        lastId = parseInt(lastId);
    } else {
        lastId = 0;
    }

    if (lastId == 0) {
        return;
    }

    let message = '';

    // allQuestions.forEach(element => {
    allReferences.forEach(element => {
        message = message + element.question + ',,'
    });
    message = message + '\n';




    for (let i = 1; i <= lastId; i++) {
        let keyName = "respondent-" + i;
        let answers = JSON.parse(localStorage.getItem(keyName));
        message = message + responseToCSVStringForCumulative(answers)

    }

    let a = document.createElement("a");


    let blob = new Blob([message], {
        type: 'text/csv;charset=utf-8;'
    });

    let url = URL.createObjectURL(blob);
    a.href = url;
    a.download = 'Upto-' + lastId + ".csv";
    a.innerText = 'Download';

    a.click();
}

const responseToCSVStringForCumulative = (answers) => {
    let message = '';
    answers.forEach(answer => {

        if (answer.choice) {
            message = message + answer.choice + ','
        }

        if (answer.selected) {
            let selected = [...answer.selected]
            selected = selected.join("---")
            message = message + selected + ','
        }

        if (!answer.choice && !answer.selected) {
            message = message + ','

        }
        if (answer.input) {
            message = message + answer.input + ','
        } else {
            message = message + ','
        }
    });
    message = message + '\n'

    return message;
}