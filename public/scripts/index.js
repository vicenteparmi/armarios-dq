const db = firebase.firestore();

// Load table
let lockers = [];

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
});

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
} else {
  // No user is signed in.
  var userId = null;
  displayInfo({
    owner: "Nenhum usuário conectado",
    sit: "Não há usuário logado. Entre para visualizar seus contratos.",
    id: "NI",
    date: "...",
  });
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
        const date = new Date(data.date);
        const owner = username;
        const sit = data.situacao;

        const expires = "31/12/" + date.getFullYear();

        contracts.push({
          id: id,
          sit: sit,
          owner: owner,
          date: date.toLocaleDateString("pt-BR"),
          expires: expires,
        });
      });

      contracts.forEach((contract) => {
        displayInfo(contract);
      });

      if (contracts.length == 0) {
        displayInfo({
          owner: "Nenhum contrato",
          sit: "Nenhum contrato encontrado. Clique em 'Gerenciar' para fazer seu contrato.",
          id: "NI",
          date: "...",
        });
      }
    });
}

function displayInfo(info) {
  const name = document.getElementById("name");
  const number = ni(document.getElementById("locker"));
  const situation = document.getElementById("status");
  const date = document.getElementById("date");

  name.innerHTML = info.owner;
  number.innerHTML += info.id + "<br />";
  situation.innerHTML += info.sit + "<br />";
  date.innerHTML += info.date + "<br />";

  if (info.number == 69) {
    number.style.transform = "rotate(180deg)";
  }
}

// Format number

function pad(n, length) {
  var len = length - ("" + n).length;
  return (len > 0 ? new Array(++len).join("0") : "") + n;
}

// NI

function ni(num) {
  if (num == -1) {
    return "NI";
  } else return num;
}