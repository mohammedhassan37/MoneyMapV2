import { drawChart } from './drawChart.js';

export const token = localStorage.getItem("token");
export const container = document.getElementById("transactions");

if (!token) window.location.href = "index.html";

export async function loadTransactions() {
    try {
        const res = await fetch("/transactions", {
            headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();

        container.innerHTML = "";

        const table = document.createElement("table");
        table.classList.add("table");
        table.innerHTML = `
            <tr>
                <th>Select</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Description</th>
                <th>Type</th>
            </tr>
        `;

        data.forEach(t => {
            const formattedDate = new Date(t.date).toLocaleDateString("en-GB");
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><input type="checkbox" data-id="${t.id}"></td> 
                <td>£${t.amount}</td>
                <td><em>${formattedDate}</em></td>
                <td>${t.description}</td>
                <td>${t.type}</td> 
            `;
            table.appendChild(row);
        });

        container.appendChild(table);

        

        
        
        drawChart();

    } catch (err) {
        console.error("Error loading transactions:", err);
        container.innerHTML = "<p style='color:red;'>Failed to load transactions</p>";
    }
}

// Run on page load
document.addEventListener("DOMContentLoaded", loadTransactions);
