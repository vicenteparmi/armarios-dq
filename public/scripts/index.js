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
        } else {
          displayInfo({
            owner: "Nenhum contrato criado",
            sit: "Nenhum contrato foi criado por você através do site. Clque em 'Gerenciar' para fazer seu contrato.",
            id: "NI",
            date: "...",
          });
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
  console.log(curso);

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
        const expires = data.expires == undefined ? "..." : data.expires;

        contracts.push({
          id: id,
          sit: sit,
          owner: owner,
          date: date.toLocaleDateString("pt-BR"),
          expires: expires,
          color: color,
        });
      });

      contracts.forEach((contract) => {
        displayInfo(contract);
      });
    });
}

function displayInfo(info) {
  const name = document.getElementById("name");
  const number = ni(document.getElementById("locker"));
  const situation = document.getElementById("status");
  const date = document.getElementById("date");

  // Get contracts holder
  const holder = document.getElementById("lockers-holder");

  // Create divs
  const locker = document.createElement("div");
  const lockerNumber = document.createElement("div");
  const lockerSituation = document.createElement("div");
  const lockerDate = document.createElement("div");

  // Add classes
  locker.classList.add("locker");
  lockerNumber.classList.add("locker-title");
  lockerSituation.classList.add("locker-status");
  lockerDate.classList.add("locker-date");

  // Set color
  lockerSituation.style.backgroundColor = info.color;

  // Add content
  lockerNumber.innerHTML = info.id;
  lockerSituation.innerHTML = info.sit;
  lockerDate.innerHTML =
    "Validade<br/><b>" +
    new Date(info.expires).toLocaleDateString("pt-BR") +
    "</b>";

  if (info.number == 69) {
    lockerNumber.style.transform = "rotate(90deg)";
  }

  // Add to holder
  locker.appendChild(lockerNumber);
  locker.appendChild(lockerSituation);
  locker.appendChild(lockerDate);
  holder.appendChild(locker);
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

  document.getElementById("price-year-regular").innerHTML = "R$" + data.yearRegular;
  document.getElementById("price-year-chem").innerHTML = "R$" + data.yearChem;
  document.getElementById("price-sem-regular").innerHTML ="R$" +  data.semRegular;
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