// Text fields validation

window.onload = function () {
  // Close modal when clicking outside of it
  document.getElementById("modal").addEventListener("click", function (e) {
    if (e.target == document.getElementById("modal")) {
      toggleModal();
    }
  });

  // Email validation
  document
    .getElementById("email-input")
    .addEventListener("change", function () {
      validation();
    });

  // Phone validation
  document
    .getElementById("phone-input")
    .addEventListener("change", function () {
      validation();
    });

  // GRR validation
  document.getElementById("grr-input").addEventListener("change", function () {
    validation();
  });

  // Display other input field when "Outro" is selected
  document
    .getElementById("course-input")
    .addEventListener("change", function () {
      if (document.getElementById("course-input").value == "outro") {
        document.getElementById("course-input-other").style.display = "block";
      } else {
        document.getElementById("course-input-other").style.display = "none";
      }
    });

  // Load user data

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      var userId = user.uid;

      // Define firestore database
      var db = firebase.firestore();

      // Get user data from firestore database and display it with querySelector
      db.collection("users")
        .doc(userId)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            // Display user data on page
            document.querySelector("#name").innerHTML = doc.data().nome;
            document.querySelector("#email").innerHTML = doc.data().email;
            document.querySelector("#phone").innerHTML = doc.data().phone;
            document.querySelector("#grr").innerHTML = "GRR" + doc.data().grr;
            document.querySelector("#course").innerHTML = doc.data().course;

            // Display user data on modal
            document.querySelector("#name-input").value = doc.data().nome;
            document.querySelector("#email-input").value = doc.data().email;
            document.querySelector("#phone-input").value = doc.data().phone;
            document.querySelector("#grr-input").value = doc.data().grr;
            document.querySelector("#course-input").value = doc.data().type;
            document.querySelector("#course-input-other").value =
              doc.data().course;
            document.querySelector("#course-input-other").style.display =
              doc.data().course == "outro" ? "block" : "none";
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    } else {
      // No user is signed in, redirect to home page
      window.location.href = "index.html";
    }
  });
};

function toggleModal() {
  document.getElementById("modal").classList.toggle("modal-closed");
}

function validation() {
  let status = true;

  // Email validation
  var email = document.getElementById("email-input").value;
  var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (emailRegex.test(email)) {
    document.getElementById("email-error").style.display = "none";
  } else {
    document.getElementById("email-error").style.display = "block";
    document.getElementById("email-error").innerHTML =
      "Endereço de e-mail inválido";
    status = false;
  }

  // Phone validation (11999999999 or 11 99999-9999)
  var phone = document.getElementById("phone-input").value;
  var phoneRegex = /^(\d{2})\s?(\d{4,5})-?(\d{4})$/;
  if (phoneRegex.test(phone)) {
    document.getElementById("phone-error").style.display = "none";
  } else {
    document.getElementById("phone-error").style.display = "block";
    document.getElementById("phone-error").innerHTML =
      "Número de telefone inválido. Exemplo: 11 99999-9999";
    status = false;
  }

  // GRR validation
  // Must have a total of 8 digits and start with a year between 2015 and 2035
  var grr = document.getElementById("grr-input").value;
  var grrRegex = /^(20(1[5-9]|2[0-9]|3[0-5]))\d{4}$/;
  if (grrRegex.test(grr) || grr == "00000000") {
    document.getElementById("grr-error").style.display = "none";
  } else {
    document.getElementById("grr-error").style.display = "block";
    document.getElementById("grr-error").innerHTML =
      "GRR inválido. Exemplo: 20220000";
    status = false;
  }

  // Hide error message of the empty fields
  if (email == "") {
    document.getElementById("email-error").style.display = "none";
  }
  if (phone == "") {
    document.getElementById("phone-error").style.display = "none";
  }
  if (grr == "") {
    document.getElementById("grr-error").style.display = "none";
  }

  // Is other is selected, check if the field is empty
  if (document.getElementById("course-input").value == "outro") {
    if (document.getElementById("course-input-other").value == "") {
      document.getElementById("course-error").style.display = "block";
      document.getElementById("course-error").innerHTML =
        "Por favor, digite o nome do seu curso";
      status = false;
    } else {
      document.getElementById("course-error").style.display = "none";
    }
  }

  return status;
}

// Logout firebase
function logout() {
  if (!confirm("Deseja sair?")) {
    return;
  }

  firebase.auth().signOut();
  // Redirect to home page
  window.location.href = "index.html";
}

// Delete account
function deleteAccount() {
  // Get user prompt to confirm account deletion
  var confirmation = prompt(
    "Digite 'excluir' para confirmar a exclusão da sua conta.\nTodos os armários serão marcados como livres e você perderá os contratos.\nEsta ação não pode ser desfeitas nem por membros do CAQuí."
  );

  // If user types 'deletar', delete account
  if (confirmation == "excluir") {
    var user = firebase.auth().currentUser;
    user
      .delete()
      .then(function () {
        // Account deleted.
        alert("Sua conta foi excluída.");
        // Redirect to home page
        window.location.href = "index.html";
      })
      .catch(function (error) {
        // An error happened.
        alert("Erro ao excluir a conta.");
      });
  }
}

// Update user data
function update() {

  // Run validation
  if (!validation()) {
    return;
  }

  // Get user data from modal
  var name = document.getElementById("name-input").value;
  var email = document.getElementById("email-input").value;
  var phone = document.getElementById("phone-input").value;
  var grr = document.getElementById("grr-input").value;
  var courseType = document.getElementById("course-input").value;
  var courseOther = document.getElementById("course-input-other").value;

  // Check if there are empty fields
  if (name == "" || email == "" || phone == "" || grr == "") {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  // ISet the name of the course to the value of the input
  const courses = {
    "12B": "Química Bacharelado (12B)",
    "12D": "Química Licenciatura Diurno (12D)",
    "104A": "Química Licenciatura Noturno (104A)",
    "12E": "Química Licenciatura + Bacharelado (12E)",
  };

  // If the user selects 'Outro', set the course to the value of the input
  let course = courseType;
  if (course == "outro") {
    course = courseOther;
  } else {
    course = courses[course];
  }

  // Define firestore database
  var db = firebase.firestore();

  // Get user id
  var user = firebase.auth().currentUser;
  var userId = user.uid;

  // Update user data on firestore database
  db.collection("users")
    .doc(userId)
    .update({
      nome: name,
      email: email,
      phone: phone,
      grr: grr,
      course: course,
      type: courseType,
    })
    .then(function () {
      // Update successful
      alert("Dados atualizados com sucesso.");

      document.getElementById("name").innerHTML = name;
      document.getElementById("email").innerHTML = email;
      document.getElementById("phone").innerHTML = phone;
      document.getElementById("grr").innerHTML = grr;
      document.getElementById("course").innerHTML = course;

      // Close modal (toggle class name)
      document.getElementById("modal").classList.toggle("modal-closed");

      // Change name and email on firebase auth
      firebase.auth().currentUser.updateProfile({
        displayName: name,
      }).then(function() {
        // Update successful.
        console.log("Nome atualizado com sucesso.");
      }).catch(function(error) {
        // An error occurred.
        console.log("Erro ao atualizar o nome.");
      });
      
    })
    .catch(function (error) {
      // An error happened
      alert("Erro ao atualizar os dados.");
    });
}
