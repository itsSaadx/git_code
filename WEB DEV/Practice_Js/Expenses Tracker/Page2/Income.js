let tabelbody = document.querySelector(".tabelbody");
let addbtn = document.querySelector(".add-btn");
let expenseTable = document.querySelector(".expense-table");

let titleInput = document.querySelector(".title-input");
let amountInput = document.querySelector(".amount-input");
let dateInput = document.querySelector(".date-input");

// LOCAL STORAGE
let incomeTransection =
JSON.parse(localStorage.getItem("transactions")) || [];


// ADD BUTTON
addbtn.addEventListener("click", (e) => {
    e.preventDefault();

    storeTransaction();
});


// STORE
function storeTransaction(){

    let obj = {
        title: titleInput.value,
        amount: amountInput.value,
        date: dateInput.value
    };

    incomeTransection.push(obj);

    localStorage.setItem(
        "transactions",
        JSON.stringify(incomeTransection)
    );

    titleInput.value = "";
    amountInput.value = "";
    dateInput.value = "";

    renderTable();
}


// RENDER TABLE
function renderTable(){

    tabelbody.innerHTML = "";

    if(incomeTransection.length === 0){
        expenseTable.style.display = "none";
        return;
    }

    expenseTable.style.display = "table";
    
         // for each
    incomeTransection.forEach((transaction, index) => {

        let tr = document.createElement("tr");

        let titleTd = document.createElement("td");
        let amountTd = document.createElement("td");
        let dateTd = document.createElement("td");
        let deleteTd = document.createElement("td");

        titleTd.innerText = transaction.title;
        amountTd.innerText = transaction.amount;
        dateTd.innerText = transaction.date;

        let deleteBtn = document.createElement("button");

        deleteBtn.innerText = "Delete";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click", () => {
 
          // delete one item of the array
            incomeTransection.splice(index, 1);


            // update local storage
            localStorage.setItem(
                "transactions",
                JSON.stringify(incomeTransection)
            );

            renderTable();
        });

        deleteTd.appendChild(deleteBtn);

        tr.append(
            titleTd,
            amountTd,
            dateTd,
            deleteTd
        );

        tabelbody.appendChild(tr);
      });
}


// LOAD DATA ON START
renderTable();