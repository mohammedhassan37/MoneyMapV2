// Delete button handler
document.getElementById("deleteBtn").addEventListener("click", async () => {
    const checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
    const ids = Array.from(checkboxes).map(cb => cb.dataset.id);

    if (ids.length === 0) {
        alert("Please select at least one transaction to delete.");
        return;
    }

    try {
        const res = await fetch("/transactions", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ ids })
        });

        const data = await res.json();
        if (data.success) {
            alert(`Deleted ${data.deleted} transaction(s).`);
            loadTransactions();
        } else {
            alert(data.message || "Delete failed");
        }
    } catch (err) {
        console.error(err);
        alert("Server error while deleting");
    }
});
