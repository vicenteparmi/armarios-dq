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
        user.getIdToken().then(function (accessToken) {
          document.getElementById("loginStatus").textContent =
            "Olá, " + displayName + "!";
          document
            .getElementById("loginStatus")
            .addEventListener("click", function () {
              if (confirm("Deseja sair?")) {
                firebase.auth().signOut();
                location.reload();
              }
            });
        });
      } else {
        document.getElementById("loginStatus").textContent =
          "Entrar ou registrar";
        document
          .getElementById("loginStatus")
          .addEventListener("click", function () {
            window.location.href = "auth.php";
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
});
