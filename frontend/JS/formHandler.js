import { loadTransactions, token } from './transactions.js';
import { updateTotal } from './getAmount.js';
import { drawChart } from './drawChart.js';  


const form = document.getElementById("transactionsForm");
const message = document.getElementById("message");

form.addEventListener('submit', async e => {
    e.preventDefault();
    message.textContent = "";

  const amountValue = parseFloat(document.getElementById("amount").value);
const transactionData = {
    amount: amountValue,
    type: document.getElementById("type").value.trim(),
    date: document.getElementById("date").value,
    description: document.getElementById("description").value.trim()
};

// validation
if (isNaN(amountValue) || !transactionData.type || !transactionData.date) {
    message.style.color = "red";
    message.textContent = "Please fill in all required fields.";
    return;
}


    try {
        const res = await fetch("/transactions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(transactionData)
        });

        const data = await res.json();
        if (data.success) {
            message.style.color = "green";
            message.textContent = "Transaction added!";
            form.reset();
            await loadTransactions(); // refresh transactions table
            await updateTotal();   
            await drawChart();          // refresh totals (income/expenses)
        } else {
            message.style.color = "red";
            message.textContent = data.message || "Error adding transaction";
        }
    } catch (err) {
        console.error(err);
        message.style.color = "red";
        message.textContent = "Server error";
    }
});
