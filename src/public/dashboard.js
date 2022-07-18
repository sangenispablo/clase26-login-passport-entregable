let user;
fetch("/currentSession")
  .then((result) => result.json())
  .then((json) => {
    console.log(json);
    if (json.status==='ok') {
      document.getElementById("usuarioName").innerHTML =
        json.msg.firstname + ", " + json.msg.lastname;
      document.getElementById("usuarioEmail").innerHTML = json.msg.email;
    } else {
      location.replace("./login.html")
    }
  });

/// para el logout
const btnLogout = document.getElementById("btnLogout");

btnLogout.addEventListener("click", (event) => {
  fetch("/logout")
    .then((result) => result.json())
    .then((json) => {
        location.replace("./login.html")
    });
});
