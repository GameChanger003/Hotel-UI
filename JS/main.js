const baseURL = "http://localhost:8090";

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const submitBtn = document.getElementById("submitBtn");
    const messageDiv = document.getElementById("message");

    if (!loginForm) return; // ✅ Prevents errors if form is missing

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const email = document.getElementById("emailInput").value;
        const password = document.getElementById("passwordInput").value;
        submitBtn.disabled = true;

        try {
            const response = await fetch(`${baseURL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error("Login failed! Please check your credentials.");
            }

            const result = await response.json();
            submitBtn.disabled = false;

            if (result.token) {
                localStorage.setItem("jwtToken", result.token);

                let payload;
                try {
                    payload = JSON.parse(atob(result.token.split('.')[1]));
                } catch (error) {
                    throw new Error("Invalid token format.");
                }

                const role = payload.role;
                console.log("User Role:", role);

                // ✅ Redirect based on role
                if (role === "ADMIN") {
                    window.location.href = "./Admin/admin.html";
                } else if (role === "GUEST") {
                    window.location.href = "./Guest/userDash.html";
                } else if (role === "MANAGER") {
                    window.location.href = "./Manager/ManagerDash.html";
                } else {
                    messageDiv.innerText = "Invalid role!";
                }
            } else {
                messageDiv.innerText = "Login failed!";
            }
        } catch (error) {
            console.error("Error:", error);
            messageDiv.innerText = error.message;
            submitBtn.disabled = false;
        }
    });
});
