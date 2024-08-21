class List {
    #nameTest
    #statusTest
    #completeTest
    id
    constructor(id, nameTest, statusTest) {
        this.id = id
        this.#nameTest = nameTest;
        this.#statusTest = statusTest;
        this.#completeTest = false;
    }
    getNameTest() {
        return this.#nameTest;
    }
    getstatusTest() {
        return this.#statusTest;
    }
    getcompleteTest() {
        return this.#completeTest;
    }
    setNameTest(nameTest) {
        this.#nameTest = nameTest;
    }
    setStatusTes(setNameTest) {
        this.#statusTest = setNameTest;
    }
    setCompleteTest(completeTest) {
        this.#completeTest = completeTest;
    }
}



//Vareble in this code 
let addList = document.getElementById("addList")
let textTest = document.getElementById("textTest")
let priority = document.getElementById("priority")
let arrayTest = []
let ul = document.getElementById("ul")
let cunt = 0

addList.addEventListener("click", () => {
    let newTest = ""
    if (textTest.value !== "") {
        cunt++;
        newTest = new List(arrayTest.length, textTest.value, priority.value);
        //    console.log(document.getElementById("priority").value)
        arrayTest.push(newTest);

        console.log(arrayTest)

    }
    textTest.value = ""
    display()

    taskPriority(newTest.getstatusTest())

})

// disply the test 
const display = () => {

    let test = ""
    arrayTest.forEach((item) => {

        test += `<li>
                    <p>${item.getNameTest()}</p> 
                    <div>
                        <input type="checkbox" id="myCheckbox" name="myCheckbox">
                        <button id="delete" onclick=taskdelete(${item.id})>delete</button>
                        <button id="edit">edit</button>
                    </div>

                </li>
`


        // console.log(  document.querySelector("li") )


    }
    )
    ul.innerHTML = test;
}

// remove test 
const taskdelete = (id) => {
    const index = arrayTest.findIndex(item => item.id === id);
    if (arrayTest.length !== -1) {
        arrayTest.splice(index, 1)
    }
    display()



}
