if(document.cookie !== "undefined"){
  console.log("Cookie fundet! Logger ind!")
  console.log({cookie: document.cookie})
  handleLogin();
} else {
  handleLogout();
}

instantiateLogoutButton();
instantiateRegisterButton();
instantiateLoginButton();

function instantiateLogoutButton() {
  $("#logout-button").click(()=>{
    handleLogout();
  })
}

async function instantiateRegisterButton() {
    $("#register-button").click(async () => {
        console.log("register clicked");

        let email = $("#email-input").val();
        let password = $("#password-input").val();

        const response = await fetch("/login/register", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.status === 500) {
            alert("Bruger eksisterer allerede.")
            return
        }
        alert("Bruger registreret");
    })
}

async function instantiateLoginButton() {
    $("#login-button").click(async () => {
        console.log("Login clicked");

        let email = $("#email-input").val();
        let password = $("#password-input").val();

        const response = await fetch("/login/login", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.status === 404) {
            alert("Bruger/password kombination forkert")
            return
        }
        let res = await response.json();

        document.cookie = res.token
        console.log(document.cookie);
        handleLogin();
    })
}

function handleLogin() {
  $("#login-div").hide()
  $("#logout-div").show()
}
function handleLogout() {
  console.log("handling logout");
  $("#logout-div").hide()
  document.cookie = undefined;
  $("#login-div").show()
}