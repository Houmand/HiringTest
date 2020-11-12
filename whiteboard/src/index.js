
console.log("index.js reached!");
instantiateRegisterButton();

async function instantiateRegisterButton() {
    
    $("#register-button").click(async () => {
        console.log("register clicked");

        let email = $("#email-input").val();
        let password = $("#password-input").val();

        // const response = await fetch("/login/register", {
        //     method: 'POST',
        //     mode: 'cors',
        //     headers: {
        //         'Content-type': 'application/json'
        //     },
        //     body: JSON.stringify({ email, password })
        // });

        const response = await fetch("/login/register", {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({ email, password })
          });

        if (response.status === 500) {
            alert("Bruger eksisterer allerede.")
            return
        }
        alert("Bruger registreret");
    })
}