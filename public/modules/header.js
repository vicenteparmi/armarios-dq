initApp = function () {
  firebase.auth().onAuthStateChanged(
    function (user) {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var uid = user.uid;
        var phoneNumber = user.phoneNumber;
        var providerData = user.providerData;
        
        // Get the first name of the user
        displayName = displayName.split(" ")[0];

        user.getIdToken().then(function (accessToken) {
          document.getElementById("loginStatus").innerHTML =
            '<i class="material-icons">account_circle</i> <spam>Olá, ' +
            displayName +
            "!</spam>";
          document
            .getElementById("loginStatus")
            .addEventListener("click", function () {
              // Redirect to profile page
              window.location.href = "perfil.html";
            });
        });
      } else {
        document.getElementById("loginStatus").innerHTML =
          '<i class="material-icons">account_circle</i> <u>Entrar ou Registrar</u>';
        document
          .getElementById("loginStatus")
          .addEventListener("click", function () {
            window.location.href = "auth.html";
          });
      }
    },
    function (error) {
      console.log(error);
    }
  );
};

window.addEventListener("load", function () {
  initApp();

  switch (window.location.pathname) {
    case "/index.html":
      document.getElementById("hdInicio").classList.add("active");
      break;
    case "/armarios.html":
      document.getElementById("hdManage").classList.add("active");
      break;
    case "/help.html":
      document.getElementById("hdHelp").classList.add("active");
      break;
    case "" || "/":
      document.getElementById("hdInicio").classList.add("active");
      break;
  }
});

// Togle Menu
function toggleMenu() {
  document.getElementById("links").classList.toggle("active");
}

// Change colors on scroll (header)

window.onscroll = function () {
  updateHeader();
};

function updateHeader() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("header").classList.add("active-header");
  } else {
    document.getElementById("header").classList.remove("active-header");
  }
}
