export async function updateTotal() {
    try {
        const res = await fetch('/transactions/amounts', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        const data = await res.json();
        console.log("Fetched total:", data); // <-- see what backend returns
        amountDisplayed.innerHTML = `<p>£${data.total}</p>`;
    } catch (err) {
        console.error("Error fetching amounts:", err);
        amountDisplayed.innerHTML = '<p style="color:red;">Failed to load amounts</p>';
    }
}
// Optional: update total on page load
document.addEventListener("DOMContentLoaded", updateTotal);