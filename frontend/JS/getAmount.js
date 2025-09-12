export async function updateTotal() {
    try {
        const res = await fetch('/transactions/amounts', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        const data = await res.json();
        console.log("Fetched totals:", data);

        const income = Number(data.income_total) || 0;
        const expenses = Number(data.expense_total) || 0;

        return { income, expenses };

    } catch (err) {
        console.error("Error fetching amounts:", err);
        return { income: 0, expenses: 0 };
    }
}
