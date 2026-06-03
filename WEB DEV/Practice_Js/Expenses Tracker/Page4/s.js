let savingInput = document.querySelector(".saving-input")
let saveBtn = document.querySelector(".save-btn")
let savingTable = document.querySelector(".saving-table")
let savingBody = document.querySelector(".saving-body")

// localStorage
let savings =
JSON.parse(localStorage.getItem("savings")) || []


// ADD SAVING
saveBtn.addEventListener("click", (e)=>{
    e.preventDefault()

    addSaving()
})

function addSaving(){

    let obj = {
        amount: savingInput.value
    }

    savings.push(obj)

    localStorage.setItem(
        "savings",
        JSON.stringify(savings)
    )

    savingInput.value = ""

    renderSavings()
}


// RENDER TABLE
function renderSavings(){

    savingBody.innerHTML = ""

    if(savings.length === 0){
        savingTable.style.display = "none"
        return
    }

    savingTable.style.display = "table"

    savings.forEach((item, index)=>{

        let tr = document.createElement("tr")

        let saveTd = document.createElement("td")
        let amountTd = document.createElement("td")
        let deleteTd = document.createElement("td")

        saveTd.innerText = "Saving"
        amountTd.innerText = item.amount

        let deleteBtn = document.createElement("button")
        deleteBtn.innerText = "Delete"
        deleteBtn.classList.add("delete-btn")

        deleteBtn.addEventListener("click", ()=>{

            savings.splice(index, 1)

            localStorage.setItem(
                "savings",
                JSON.stringify(savings)
            )

            renderSavings()
        })

        deleteTd.appendChild(deleteBtn)

        tr.append(saveTd, amountTd, deleteTd)
        savingBody.appendChild(tr)
    })
}


// LOAD ON START
renderSavings()