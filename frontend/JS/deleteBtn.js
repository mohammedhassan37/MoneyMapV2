const deleteBtn = document.getElementById("deleteBtn");

deleteBtn.addEventListener("click", async () => {
  const checkboxes = document.querySelectorAll("#transactions input[type='checkbox']:checked");
  const idsToDelete = Array.from(checkboxes).map(cb => Number(cb.dataset.id));

  if (idsToDelete.length === 0) {
    alert("Please select at least one transaction to delete");
    return;
  }

  try {
    const res = await fetch("/transactions", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}` // make sure token is stored
      },
      body: JSON.stringify({ ids: idsToDelete })
    });

    const ct = res.headers.get("content-type") || "";
    const payload = ct.includes("application/json") 
      ? await res.json() 
      : { success: false, message: await res.text() };

    if (!res.ok || !payload.success) {
      console.error("Delete failed:", payload);
      alert(payload.message || "Delete failed");
      return;
    }

    console.log("✅ Deleted:", payload);
    if (typeof loadTransactions === "function") loadTransactions(); // refresh table
  } catch (err) {
    console.error(err);
    alert("Server error while deleting");
  }
});
