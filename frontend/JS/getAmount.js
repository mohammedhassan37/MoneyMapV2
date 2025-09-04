import { drawChart } from './drawChart.js'; // import the drawChart function

export async function updateTotal() {
    try {
        const res = await fetch('/transactions/amounts', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        const data = await res.json();
        console.log("Fetched total:", data);
        const amountEl = document.getElementById('amountDisplayed');
        amountEl.innerHTML = `<p>£${data.total}</p>`;

        // Immediately update the chart
        drawChart();
    } catch (err) {
        console.error("Error fetching amounts:", err);
        document.getElementById('amountDisplayed').innerHTML =
            '<p style="color:red;">Failed to load amounts</p>';
    }
}

// Optional: update total on page load
document.addEventListener("DOMContentLoaded", updateTotal);
