if (document.cookie !== "undefined") {  //grimt hack, men undefined oversættes til en streng. Evt. TODO
  console.log("Cookie fundet! Logger ind!")
  console.log({ cookie: document.cookie })
  handleLogin();
} else {
  handleLogout();
}


$("#expander-button").click(() => {
  if ($("#expander-button").hasClass("plus")) {
    $("#expander-button").text("-")
    $("#expander-button").toggleClass("plus")

  } else {
    console.log("it does get in");
    $("#expander-button").text("+")
    $("#expander-button").toggleClass("plus")

  }
})


makeLogoutButton();
makeRegisterButton();
makeLoginButton();
makeCreateButton();

function makeLogoutButton() {
  $("#logout-button").click(() => {
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

async function makeCreateButton() {
  $("#create-button").click(async () => {
    let type = $("#type-input").val();
    let data = $("#paste-input").val();


    if (data.length > 144) {
      alert("Der understøttes desværre kun op til 144 tegn - ligesom gammeldags Twitter");
      return
    }
    console.log({ type });
    console.log({ data });

    const response = await fetch("/postit", {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        "jwt": document.cookie
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ type, data })
    });
    if (response.status === 500) {
      alert("Teh server took a shit and died")
      return
    }
    console.log("create!");
    getAllPosts();
  })
}

async function deleteThisPost(id,) {

  const response = await fetch("/postit/" + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      "jwt": document.cookie
    }
  })

  getAllPosts();

}

async function getAllPosts() {
  $("#postit-row").html("");
  const response = await fetch("/postit", {
    method: 'GET',
    headers: { "jwt": document.cookie },
  })

  let decoded = await response.json();

  decoded.forEach(post => {
    console.log(post.data)
    console.log(post._id)
    let postit = $elem("div")
      .css({
        "width": "450px", "height": "450px",
        "position": "relative",
        "background-size": "450px 450px",
        "background-image": "url(https://www.seekpng.com/png/detail/13-136199_note-post-it-reminder-sticky-note-yellow-o.png)"
      }).append(
        $elem("p").html("&times;").attr("data", post._id).css({ "position": "absolute", "right": "45px", "top": "40px", "font-size": "30px", "cursor": "pointer" })
          .click((event) => {
            let id = $(event.target).attr("data")
            console.log({ id });
            deleteThisPost(id);
          })
      );

    if (post.type === "billede") {
      postit.append(
        $elem("img").attr("src", post.data).css({ "width": "300px", "height": "300px", "margin-left": "83px", "margin-top": "75px" }),
        $elem("p").html(post.owner).css("text-align", "center")
      )


    } else if (post.type === "video") {
      postit.append(
        $elem("div").addClass("embed-responsive col-md ").css({ "min-width": "300px", "height": "300px", "margin-left": "83px", "margin-top": "75px" })
          .append(
            $elem("iframe").addClass("embed-responsive-item embed-responsive-16by9").attr("src", post.data).css({ "width": "300px", "height": "300px" })
            ,
            $elem("p").html(post.owner).css("text-align", "center")
          )
      )
    } else {
      postit.append(
        $elem("div").css({ "min-width": "300px", "height": "300px", "margin-left": "83px", "margin-top": "75px" }).append(
          $elem("h5").html(post.data).css({ "word-break": "break-word" }),
        ),
        $elem("p").html(post.owner).css({ "text-align": "center" })
      )
    }

    $("#postit-row").append(
      postit
    );
  })
}


function $elem(arg) {
  return $(document.createElement(arg))
}

function handleLogin() {
  $("#login-div").hide()
  $("#logout-div").show()
  $("#whiteboard-div").show()
  getAllPosts();

}
function handleLogout() {
  console.log("handling logout");
  $("#logout-div").hide()
  document.cookie = undefined;
  $("#login-div").show()
  $("#whiteboard-div").hide()
}