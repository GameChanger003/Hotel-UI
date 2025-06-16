const baseURL = "http://localhost:8090";

document.addEventListener("DOMContentLoaded",()=>{
document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;
    document.getElementById("submitBtn").disabled=true;

        const response = await fetch("http://localhost:8090/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
    

    const result = await response.json();
    document.getElementById("submitBtn").disabled=false;

    if (result.token) {
        const payload = JSON.parse(atob(result.token.split('.')[1]));
        const role = payload.role;
        localStorage.setItem("jwtToken",result.token)
        console.log(role)
        if (role === "ADMIN") {
            console.log(result.token)
            window.location.href = "./Admin/admin.html";
        } else if (role === "GUEST") {
            window.location.href = "./Guest/userDash.html ";
        }else if(role =="MANAGER")
        {
            window.location.href="./Manager/ManagerDash.html";
        }
        else {
            document.getElementById("message").innerText = "Invalid role!";
        }
    } else {
        document.getElementById("message").innerText = "Login failed!";
    }
})});
