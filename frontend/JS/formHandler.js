// formHandler.js
import { loadTransactions, token } from './transactions.js'; // fine if both in JS/


const form = document.getElementById("transactionsForm");
const message = document.getElementById("message");

form.addEventListener('submit', async e => {
    e.preventDefault();
    message.textContent = "";

    const transactionData = {
        amount: parseFloat(document.getElementById("amount").value),
        type: document.getElementById("type").value.trim(),
        category: document.getElementById("category").value.trim(),
        date: document.getElementById("date").value,
        description: document.getElementById("description").value.trim()
    };

    if (!transactionData.amount || !transactionData.type || !transactionData.category || !transactionData.date){
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
        if(data.success){
            message.style.color = "green";
            message.textContent = "Transaction added!";
            form.reset();
            loadTransactions();
        } else {
            message.style.color = "red";
            message.textContent = data.message || "Error adding transaction";
        }
    } catch(err){
        console.error(err);
        message.style.color = "red";
        message.textContent = "Server error";
    }
});
