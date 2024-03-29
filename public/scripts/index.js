const db = firebase.firestore();

let lockers = [];

// Load table
function loadPage() {
  const lockersRef = db.collection("armarios");

  lockersRef.get().then((snapshot) => {
    snapshot.forEach((doc) => {
      const data = doc.data();
      const id = doc.id;
      const date = data.date;
      const owner = data.dono;
      const sit = data.situacao;
      const color = data.color;

      lockers.push({
        id: id,
        date: date,
        owner: owner,
        situation: sit,
        color: color,
      });
    });

    prepareTable();

    document.getElementById("pre-load").style.display = "none";
    document.getElementById("loaded-table1").style.display = "block";
    document.getElementById("loaded-table2").style.display = "block";
  });
}

// Build table

function prepareTable() {
  let tableLocation;

  const numberOfLockers = 384; // Number of lockers - NI

  for (let i = 0; i < numberOfLockers; i++) {
    let content;
    for (let i2 = 0; i2 < lockers.length; i2++) {
      if (lockers[i2].id == i + 1) {
        content = lockers[i2];
      }
    }
    if (content == undefined) {
      content = {
        id: i + 1,
        situation: "Livre",
      };
    }

    if (i < numberOfLockers / 2) {
      tableLocation = document.getElementById("table1");
    } else {
      tableLocation = document.getElementById("table2");
    }

    buildTable(content, tableLocation);
  }
}

function buildTable(content, location) {
  const row = document.createElement("tr");
  const id = document.createElement("td");
  const situation = document.createElement("td");

  id.innerHTML = ni(content.id);
  situation.innerHTML = content.situation;

  row.appendChild(id);
  row.appendChild(situation);

  situation.style.color = content.color;

  location.appendChild(row);
}

// --------------------------------------------------
// Display user's lockers
// --------------------------------------------------

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    var userId = user.uid;
    const categoryDocRef = db.collection("users").doc(userId);

    let username;

    db.collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          username = doc.data().nome;
          loadContracts(categoryDocRef, username);
        }
      });

    // Display user's lockers
    document.getElementById("user-lockers").style.display = "block";
  } else {
    // No user is signed in.
    var userId = null;
  }
});

let contracts = [];

function loadContracts(user, username) {
  let curso = user.get();

  db.collection("armarios")
    .where("dono", "==", user)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.data();
        const id = pad(doc.id, 3);
        const date = new Date(data.date.seconds * 1000);
        const owner = username;
        const sit = data.situacao;
        const color = data.color;
        const expires =
          data.expires == undefined
            ? "..."
            : new Date(data.expires.seconds * 1000);

        contracts.push({
          id: id,
          sit: sit,
          owner: owner,
          date: date.toLocaleDateString("pt-BR"),
          expires: expires.toLocaleDateString("pt-BR"),
          color: color,
        });
      });

      contracts.forEach((contract) => {
        displayInfo(contract);
      });
    });
}

function displayInfo(info) {
  let buttons = [
    `<button class="locker-detailed-button" onclick="window.location.href = '/createnew.html'"><i class="material-symbols-outlined">source_notes</i>Renovar</button>`,
    `<button class="locker-detailed-button" onclick="toggleModal(` +
      info.id +
      `)"><i class="material-symbols-outlined">autorenew</i>Trocar</button>`,
    `<button class="locker-detailed-button" onclick="abandonLocker(` +
      info.id +
      `)"><i class="material-symbols-outlined">delete</i>Abandonar</button>`,
  ];
  let activeButtons = [];

  if (info.sit == "Regular" || info.sit == "Problema no cadastro" || info.sit == "Aguardando pagamento") {
    activeButtons.push(buttons[1]);
    activeButtons.push(buttons[2]);
  } else if (info.sit == "Irregular") {
    activeButtons.push(buttons[0]);
    activeButtons.push(buttons[2]);
  }

  activeButtons = activeButtons.join("");

  let lockerHTML =
    `
  <div class="locker-detailed-container unactive">
        <div class="locker" style="cursor: pointer" onclick="toggleDetailed(this)" id="locker` +
    info.id +
    `">
          <h2 class="locker-title">` +
    info.id +
    `</h2>
          <div class="locker-status" style="background-color: ` +
    info.color +
    `">
            ` +
    info.sit +
    `
          </div>
        </div>
        <div class="locker-detailed">
          <h2 class="locker-detailed-title">Armário ` +
    info.id +
    `</h2>
          <div class="locker-detailed-info">
            <div>
              <p class="locker-datailed-info-sub">Data do contrato</p>
              <p class="locker-datailed-info-main">` +
    info.date +
    `</p>
            </div>
            <div>
              <p class="locker-datailed-info-sub">Validade</p>
              <p class="locker-datailed-info-main">` +
    info.expires +
    `</p>
            </div>
          </div>
          <div class="locker-detailed-buttons">
            ` +
    activeButtons +
    `
          </div>
        </div>
      </div>`;

  // Append as the first child
  document
    .getElementById("lockers-holder")
    .insertAdjacentHTML("afterbegin", lockerHTML);
}

// Format number

function pad(n, length) {
  var len = length - ("" + n).length;
  return (len > 0 ? new Array(++len).join("0") : "") + n;
}

// NI

function ni(num) {
  if (num == 61) {
    return "NI";
  } else return num;
}

// Form type animation

// Get form fields

const exampleName = document.getElementById("type-field1");
const exampleNumber = document.getElementById("type-field2");
const exampleEmail = document.getElementById("type-field3");

// Animate

var letter = 0;

const namesExample = [
  "Centro Acadêmico de Química",
  "Vicente K. Parmigiani",
  "Arnold Sommerfeld",
];
const numbersExample = ["12", "321", "69"];
const emailsExample = [
  "caqui.ufpr@gmail.com",
  "vicenteparmigiani@ufpr.br",
  "arnoldsommerfeld2023@gmail.com",
];

let nameExample = namesExample[0];
let numberExample = numbersExample[0];
let emailExample = emailsExample[0];
let currentExample = 0;
var speed = 50;

function typeWriter() {
  if (letter < nameExample.length) {
    exampleName.innerHTML += nameExample.charAt(letter);
    letter++;
    setTimeout(typeWriter, speed);
  } else if (letter < nameExample.length + numberExample.length) {
    exampleNumber.innerHTML += numberExample.charAt(
      letter - nameExample.length
    );
    letter++;
    setTimeout(typeWriter, speed);
  } else if (
    letter <
    nameExample.length + numberExample.length + emailExample.length
  ) {
    exampleEmail.innerHTML += emailExample.charAt(
      letter - nameExample.length - numberExample.length
    );
    letter++;
    setTimeout(typeWriter, speed);
  } else {
    // Clear and reset animation delete
    if (exampleName.innerHTML.length > 0) {
      exampleName.innerHTML = exampleName.innerHTML.slice(0, -1);
      setTimeout(typeWriter, speed / 2);
      return;
    } else if (exampleNumber.innerHTML.length > 0) {
      exampleNumber.innerHTML = exampleNumber.innerHTML.slice(0, -1);
      setTimeout(typeWriter, speed / 2);
      return;
    } else if (exampleEmail.innerHTML.length > 0) {
      exampleEmail.innerHTML = exampleEmail.innerHTML.slice(0, -1);
      setTimeout(typeWriter, speed / 2);
      return;
    }

    // Reset animation
    letter = 0;
    setTimeout(typeWriter, 1000);

    // Set next texts
    currentExample = (currentExample + 1) % namesExample.length;
    nameExample = namesExample[currentExample];
    numberExample = numbersExample[currentExample];
    emailExample = emailsExample[currentExample];
  }

  // Random speed
  speed = Math.floor(Math.random() * 100) + 50;
}

typeWriter();

// Get settings

// Get prices from firebase realtime database
var pricesRef = firebase.database().ref("settings/prices");
pricesRef.on("value", (snapshot) => {
  const data = snapshot.val();

  document.getElementById("price-year-regular").innerHTML =
    "R$" + data.yearRegular;
  document.getElementById("price-year-chem").innerHTML = "R$" + data.yearChem;
  document.getElementById("price-sem-regular").innerHTML =
    "R$" + data.semRegular;
  document.getElementById("price-sem-chem").innerHTML = "R$" + data.semChem;

  // Remove loading class from all .price elements
  document.querySelectorAll(".price").forEach((price) => {
    price.classList.remove("loading-price");
  });
});

// Display warning if needed

var warningRef = firebase.database().ref("settings/warning");
warningRef.on("value", (snapshot) => {
  const data = snapshot.val();

  if (data.display) {
    document.getElementById("warning").innerHTML = data.content;
    document.getElementById("warning").style.display = "block";
  }
});

// Show detailed info on locker click

function toggleDetailed(thisLocker) {
  thisLocker.classList.toggle("active-locker");

  // Toggle the div that is is contained in
  thisLocker.parentElement.classList.toggle("unactive");
}

// Abandon locker

function abandonLocker(lockerId) {
  // Confirm with prompt
  const prompt = window.prompt(
    "Tem certeza que deseja abandonar este armário? Digite 'sim' para confirmar.\n\nATENÇÃO: Você não poderá mais usar este armário e não receberá reembolso pelo período já pago."
  );
  if (prompt.toLowerCase() != "sim") {
    return;
  }

  lockerId = lockerId.toString();

  db.collection("armarios")
    .doc(lockerId)
    .delete()
    .then(() => {
      console.log("Armário abandonado com sucesso!");

      // Reload page
      setTimeout(() => {
        location.reload();
      }, 1000);
    })
    .catch((error) => {
      console.error("Erro ao abandonar armário: ", error);
    });
}

// Open and close modal
function toggleModal(lockerId) {
  if (lockerId) {
    // Set locker id on modal
    document.getElementById("change-locker-last-id").innerHTML = lockerId;
    // Set locker id on button
    document
      .getElementById("change-locker-button")
      .setAttribute("onclick", "changeLocker(" + lockerId + ")");
  }

  document.getElementById("change-locker-modal").classList.toggle("closed");
}

// Change locker

function changeLocker(lockerId) {
  // Animate arrow
  document.getElementById("change-locker-arrow").classList.add("animate");

  // Parse locker id to string
  lockerId = lockerId.toString();

  // Get error and hide
  const error = document.getElementById("change-locker-error");
  error.style.display = "none";

  // Get new locker id
  const newLockerId = document.getElementById("change-locker").value.toString();

  // Check if new locker id is valid
  if (newLockerId <= 0 || newLockerId > 384) {
    // Display error
    error.style.display = "flex";

    // Stop animation
    document.getElementById("change-locker-arrow").classList.remove("animate");
    return;
  }

  // Check if new locker id is available
  db.collection("armarios")
    .doc(newLockerId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        // Check if locker is available
        let sit = doc.data().situacao;
        let allowedSit = ["Irregular", "Livre"];
        if (allowedSit.includes(sit)) {
          saveChangeLocker(lockerId, newLockerId);
        } else {
          // Stop animation
          document.getElementById("change-locker-arrow").classList.remove("animate");
          // Display error
          error.style.display = "flex";
        }
      } else {
        saveChangeLocker(lockerId, newLockerId);
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
}

function saveChangeLocker(old, newL) {
  // Get locker data
  db.collection("armarios")
    .doc(old)
    .get()
    .then((doc) => {
      // Create new locker
      db.collection("armarios")
        .doc(newL)
        .set(doc.data())
        .then(() => {
          console.log("Armário criado com sucesso!");

          // Delete old locker
          db.collection("armarios")
            .doc(old)
            .delete()
            .then(() => {
              console.log("Armário abandonado com sucesso!");
              alert("Troca realizada com sucesso!");

              // Reload page
              setTimeout(() => {
                location.reload();
              }, 1000);
            })
            .catch((error) => {
              console.error("Erro ao abandonar armário: ", error);
            });
        })
        .catch((error) => {
          console.error("Erro ao criar armário: ", error);
        });
    });
}
