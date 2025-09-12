    // Handle form submission
        form.addEventListener('submit', async e => {
            e.preventDefault(); // prevent page reload
            message.textContent = ""; // clear previous message

            // Collect input values
            const userData = {
                username: document.getElementById("username").value.trim(),
                password: document.getElementById("password").value,
                email: emailInput.value.trim()
            };

            // Choose endpoint based on mode
            const url = isLogin ? '/login' : '/register';

            try {
                // Send data to server
                const res = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userData)
                });

                const data = await res.json(); // parse server response

                if(data.success){
                    // If login successful, save token to localStorage
                    if(isLogin && data.token) localStorage.setItem("token", data.token);

                    message.style.color = "green";
                    message.textContent = isLogin ? "Login successful!" : "Registration successful!";

                    // Redirect to dashboard if login
                    if(isLogin) window.location.href = "dashboard.html";
                } else {
                    message.style.color = "red";
                    message.textContent = data.message || "Error occurred";
                }
            } catch(err){
                console.error(err);
                message.style.color = "red";
                message.textContent = "Server error";
            }
        })