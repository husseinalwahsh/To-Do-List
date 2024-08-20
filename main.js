class List {
    #nameTest
    #statusTest
    #completeTest
    constructor(nameTest, statusTest) {
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

addList.addEventListener("click", () => {
    if (textTest.value !== "") {
        let newTest = new List(textTest.value,priority.value);
        //    console.log(document.getElementById("priority").value)
        arrayTest.push(newTest);
    
     console.log(arrayTest) 
     
    }
})
