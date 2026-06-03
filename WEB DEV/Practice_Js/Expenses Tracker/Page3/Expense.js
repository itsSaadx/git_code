let expenseTableBody =
document.querySelector(".expense-table-body");

let expenseAddBtn =
document.querySelector(".expense-add-btn");

let expenseTable =
document.querySelector(".expense-transaction-table");

let expenseTitleInput =
document.querySelector(".expense-title-input");

let expenseAmountInput =
document.querySelector(".expense-amount-input");

let expenseDateInput =
document.querySelector(".expense-date-input");


// LOCAL STORAGE
let expenseTransaction =
JSON.parse(localStorage.getItem("expenseTransactions")) || [];


// ADD BUTTON
expenseAddBtn.addEventListener("click", (e)=>{
    e.preventDefault()

    storeExpenseTransaction()
})


// STORE
function storeExpenseTransaction(){

    let obj = {
        title: expenseTitleInput.value,
        amount: expenseAmountInput.value,
        date: expenseDateInput.value
    }

    expenseTransaction.push(obj)

    localStorage.setItem(
        "expenseTransactions",
        JSON.stringify(expenseTransaction)
    )

    expenseTitleInput.value = ""
    expenseAmountInput.value = ""
    expenseDateInput.value = ""

    renderExpenseTable()
}


// RENDER SINGLE + FULL TABLE
function renderExpenseTable(){

    expenseTableBody.innerHTML = ""

    expenseTransaction.forEach((transaction, index)=>{

        expenseTable.style.display = "table"

        let tr = document.createElement("tr")

        let titleTd = document.createElement("td")
        let amountTd = document.createElement("td")
        let dateTd = document.createElement("td")
        let deleteTd = document.createElement("td")

        titleTd.innerText = transaction.title
        amountTd.innerText = transaction.amount
        dateTd.innerText = transaction.date

        let deleteBtn = document.createElement("button")
        deleteBtn.innerText = "Delete"
        deleteBtn.classList.add("delete-btn")

        deleteBtn.addEventListener("click", ()=>{

            expenseTransaction.splice(index, 1)

            localStorage.setItem(
                "expenseTransactions",
                JSON.stringify(expenseTransaction)
            )

            renderExpenseTable()

            if(expenseTransaction.length === 0){
                expenseTable.style.display = "none"
            }
        })

        deleteTd.appendChild(deleteBtn)

        tr.append(titleTd, amountTd, dateTd, deleteTd)

        expenseTableBody.appendChild(tr)
    })
}


// LOAD DATA ON START
renderExpenseTable()