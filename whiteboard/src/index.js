if(document.cookie !== "undefined"){  //grimt hack, men undefined oversættes til en streng. Evt. TODO
  console.log("Cookie fundet! Logger ind!")
  console.log({cookie: document.cookie})
  handleLogin();
} else {
  handleLogout();
}

$("#expander-button").click(()=>{
  if($("#expander-button").hasClass("plus")){
    $("#expander-button").text("-")
    $("#expander-button").toggleClass("plus")

  } else{
    console.log("it does get in");
    $("#expander-button").text("+")
    $("#expander-button").toggleClass("plus")

  }
})


makeLogoutButton();
makeRegisterButton();
makeLoginButton();

function makeLogoutButton() {
  $("#logout-button").click(()=>{
    handleLogout();
  })
}

async function makeRegisterButton() {
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

async function makeLoginButton() {
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
        handleLogin();
    })
}

function handleLogin() {
  $("#login-div").hide()
  $("#logout-div").show()
  $("#whiteboard-div").show()
}
function handleLogout() {
  console.log("handling logout");
  $("#logout-div").hide()
  document.cookie = undefined;
  $("#login-div").show()
  $("#whiteboard-div").hide()
}