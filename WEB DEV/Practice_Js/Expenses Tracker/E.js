let inc = document.querySelector(".inc")
let exp = document.querySelector(".exp")
let bal = document.querySelector(".bal")
let sav = document.querySelector(".sav")

function updateCards(){

    let incomeData =
    JSON.parse(localStorage.getItem("transactions")) || []

    let expenseData =
    JSON.parse(localStorage.getItem("expenseTransactions")) || []

    let savingData =
    JSON.parse(localStorage.getItem("savings")) || []


    let totalIncome = 0
    let totalExpense = 0
    let totalSaving = 0


    for(let item of incomeData){
        totalIncome += Number(item.amount)
    }

    for(let item of expenseData){
        totalExpense += Number(item.amount)
    }

    for(let item of savingData){
        totalSaving += Number(item.amount)
    }


    inc.innerText = totalIncome
    exp.innerText = totalExpense
    sav.innerText = totalSaving

    // balance = income - expense - saving
    bal.innerText = totalIncome - totalExpense - totalSaving
}


// auto update when storage changes (other pages)
window.addEventListener("storage", updateCards)

updateCards()