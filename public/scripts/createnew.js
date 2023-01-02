let categoryDocRef;
let userId;
let prices;
let selectedLockerNumber;
let expirationDateGlobal;
const db = firebase.firestore();

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    userId = user.uid;
    categoryDocRef = db.collection("users").doc(userId);

    // Get the user data from firestore database
    db.collection("users")
      .doc(userId)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          // Format the phone number to (xx) xxxxx-xxxx
          let phone = doc.data().phone;
          phone =
            "(" +
            phone.substring(0, 2) +
            ") " +
            phone.substring(2, 7) +
            "-" +
            phone.substring(7, 11);

          // Show the user data in the screen
          const content =
            `<b>Nome completo:</b> <span>` +
            doc.data().nome +
            `</span><br>
          <b>Curso:</b> <span>` +
            doc.data().course +
            `</span><br>
          <b>GRR:</b> <span>GRR` +
            doc.data().grr +
            `</span><br>
          <b>Email:</b> <span>` +
            doc.data().email +
            `</span><br>
          <b>Telefone:</b> <span>` +
            phone +
            `</span><br>`;

          document.getElementById("userData").innerHTML = content;

          document.getElementById("contract-name").innerHTML = doc.data().nome;
          document.getElementById("contract-course").innerHTML =
            doc.data().course;

          // Load user's lockers
          db.collection("armarios")
            .where("dono", "==", categoryDocRef)
            .get()
            .then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                // Format the date to dd/mm/yyyy
                let date = doc.data().date.toDate();
                date =
                  date.getDate() +
                  "/" +
                  (date.getMonth() + 1) +
                  "/" +
                  date.getFullYear();

                let expires = doc.data().expires.toDate();
                expires =
                  expires.getDate() +
                  "/" +
                  (expires.getMonth() + 1) +
                  "/" +
                  expires.getFullYear();

                // Check if should be disabled
                let disabled = "";
                if (
                  doc.data().situacao == "Regular" ||
                  doc.data().situacao == "Problema no cadastro"
                ) {
                  disabled = "locker-disabled";
                }

                // Add the locker to the lockers-holder
                const content =
                  `<div class="locker ` +
                  disabled +
                  `" onclick="selectLocker(this, '` +
                  doc.id +
                  `')">
                    <div class="locker-number">
                        <span>` +
                  doc.data().number +
                  `</span>
                    </div>
                    <div class="locker-status" style="background-color: ` +
                  doc.data().color +
                  `;">
                        <span>` +
                  doc.data().situacao +
                  `</span>
                    </div>
                </div>`;

                // Add the locker to the lockers-holder
                document
                  .getElementById("lockers-holder")
                  .insertAdjacentHTML("beforeend", content);
              });
            })
            .catch(function (error) {
              console.log("Error getting lockers: ", error);
            });

          // Load the price list from realtime database
          firebase
            .database()
            .ref("settings/prices")
            .once("value")
            .then(function (snapshot) {
              prices = {
                semChem: snapshot.val().semChem,
                semRegular: snapshot.val().semRegular,
                yearChem: snapshot.val().yearChem,
                yearRegular: snapshot.val().yearRegular,
              };

              // Show the prices in the screen based on the user's course type
              const discountTypes = ["12B", "12E", "12D", "104A"];

              // Check if the user's course type isn't in the discountTypes array and is different from "other"
              if (
                !discountTypes.includes(doc.data().type) &&
                doc.data().type != "outro"
              ) {
                alert(
                  "Seu cadastro pode estar incompleto, vá até a página de perfil para corrigir antes de fazer o contrato."
                );
              }

              if (discountTypes.includes(doc.data().type)) {
                document.getElementById("price-1").innerHTML =
                  "R$ " + prices.semChem;
                document.getElementById("price-2").innerHTML =
                  "R$ " + prices.yearChem;

                // Show the discount payment-warning
                document.getElementById("payment-warning").style.display = "block";
              } else {
                document.getElementById("price-1").innerHTML =
                  "R$ " + prices.semRegular;
                document.getElementById("price-2").innerHTML =
                  "R$ " + prices.yearRegular;
              }
            });

          // Calculate duration
          setTimeout(function () {
            changeDuration();
          }, 1000);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  } else {
    // No user is signed in.
    userId = null;
    alert(
      "Você precisa estar logado para solicitar um contrato! Crie uma conta ou faça login."
    );
    window.location.href = "auth.html";
  }
});

// Select the locker

let selectedLocker = document.getElementsByClassName("locker-new")[0];

function selectLocker(locker, number) {
  if (locker.classList.contains("locker-disabled")) {
    return;
  }

  // Remove warning message
  document.getElementById("locker-select-error").style.display = "none";

  if (selectedLocker != null) {
    selectedLocker.classList.remove("locker-selected");
  }

  locker.classList.add("locker-selected");
  selectedLocker = locker;
  selectedLockerNumber = number;

  // Validate if the locker is the "new"
  if (locker.classList.contains("locker-new")) {
    validateLockerNumber();
    selectedLockerNumber = document.getElementById("newLockerNumber").value;
  }

  document.getElementById("contract-number").innerHTML = number;
}

// Validate locker number

function validateLockerNumber() {
  // Get the locker number
  let num = document.getElementById("newLockerNumber").value;

  // Locate the locker on the database by id
  db.collection("armarios")
    .doc(num)
    .get()
    .then(function (doc) {
      if (doc.exists) {
        // Check if the locker is available
        if (
          doc.data().situacao == "Livre" ||
          doc.data().situacao == "Irregular"
        ) {
          // Select the locker
          document.getElementById("contract-number").innerHTML = num;
          // Hide the error message
          document.getElementById("locker-select-error").style.display = "none";
        } else {
          document.getElementById("locker-select-error").style.display =
            "block";
        }
      } else {
        // Select the locker
        document.getElementById("contract-number").innerHTML = num;
        selectedLockerNumber = num;
        // Hide the error message
        document.getElementById("locker-select-error").style.display = "none";
      }
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
    });
}

// Change duration on radio change

function changeDuration() {
  // Get the selected radio
  let radio = document.querySelector('input[name="plan"]:checked').value;
  let thisPrice;

  if (radio == "1") {
    radio = "Anual";
    price = document.getElementById("price-1").innerHTML;
  } else if (radio == "2") {
    radio = "Semestral";
    price = document.getElementById("price-2").innerHTML;
  }

  // Change the duration and price in the contract
  document.getElementById("contract-duration").innerHTML = radio;
  document.getElementById("contract-price").innerHTML = price;

  // Update expiration date
  updateExpirationDate();

  // Set the price
}

// Update expiration date

function updateExpirationDate() {
  // Get the selected radio
  let radio = document.querySelector('input[name="plan"]:checked').value;

  // Get the current date
  let date = new Date();

  // Add the months based on the selected radio
  if (radio == "1") {
    date.setMonth(date.getMonth() + 12);
  } else if (radio == "2") {
    date.setMonth(date.getMonth() + 6);
  }

  // Get the expiration date
  let expirationDate = date.toLocaleDateString("pt-BR");

  // Save var on global
  expirationDateGlobal = date;

  // Change the expiration date in the contract
  document.getElementById("start-date").innerHTML =
    new Date().toLocaleDateString("pt-BR");
  document.getElementById("end-date").innerHTML = expirationDate;
}

// Select payment method

document.getElementById("payment").addEventListener("change", () => {
  // Get the selected payment method
  let payment = document.getElementById("payment").value;

  // Change the payment method in the contract
  document.getElementById("contract-payment").innerHTML =
    payment == "1" ? "PIX" : "Dinheiro";

  // Display the payment instructions
  if (payment == "1") {
    document.getElementById("payment-instructions-PIX").style.display = "block";
    document.getElementById("payment-instructions-dinheiro").style.display =
      "none";
  } else if (payment == "2") {
    document.getElementById("payment-instructions-PIX").style.display = "none";
    document.getElementById("payment-instructions-dinheiro").style.display =
      "block";
  }
});

// Make the contract

function makeContract() {
  // Check if user agreed to the terms
  if (!document.getElementById("agree").checked) {
    alert("Você precisa aceitar os termos do contrato para continuar!");
    document.getElementById("agree").focus();
    document.getElementById("agree").scrollIntoView();

    // Scroll to the middle of the page
    window.scrollBy(0, -window.innerHeight / 2);

    document.getElementById("agree-error").style.display = "block";
    return;
  }

  // Check if the user selected a locker
  if (selectedLockerNumber == null) {
    alert("Você precisa selecionar um armário para continuar!");
    document.getElementById("newLockerNumber").scrollIntoView();

    // Scroll to the middle of the page
    window.scrollBy(0, -window.innerHeight / 2);
    return;
  }

  // Get current user id
  let userId = firebase.auth().currentUser.uid;

  // Get owner ref from user id
  let ownerRef = db.collection("users").doc(userId);

  // Build the contract object
  const contract = {
    number: selectedLockerNumber,
    color: "blueviolet",
    date: new Date(),
    expires: expirationDateGlobal,
    payment: document.getElementById("payment").value,
    situacao: "Aguardando pagamento",
    dono: ownerRef,
  };

  console.log(contract);

  // Add the contract to the firestore database
  db.collection("armarios")
    .doc(selectedLockerNumber)
    .set(contract)
    .then(() => {
      // Alert the user
      alert("Contrato criado com sucesso!");

      // Log event firebase
      firebase.analytics().logEvent("contract_created", {
        number: contract.number,
        payment: contract.payment,
        date: contract.date,
      });

      // Redirect to the home page
      window.location.href = "index.html";
    })
    .catch((error) => {
      // Alert the user
      alert("Erro ao criar o contrato: " + error);
    });
}
