window.addEventListener("pageshow", (event) => {
    if (event.persisted) { // page loaded from back/forward cache
      const username = document.getElementById("username");
      const password = document.getElementById("password");
      if (username) username.value = "";
      if (password) password.value = "";
    }
  });