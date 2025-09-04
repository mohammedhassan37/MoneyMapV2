export async function updateTotal() {
    try {
        const res = await fetch('/transactions/amounts', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        const data = await res.json();
        console.log("Fetched total:", data);

       
        return data.total || 0;

    } catch (err) {
        console.error("Error fetching amounts:", err);
        return 0;
    }
}


document.addEventListener("DOMContentLoaded", updateTotal);
