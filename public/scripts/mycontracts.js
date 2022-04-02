const db = firebase.firestore();
const loading = document.getElementById("loading");

// Find user in database

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    var userId = user.uid;
    const categoryDocRef = db.collection("users").doc(userId);

    let username;

    db.collection("users").doc(userId).get().then((doc) => {
      username = doc.data().nome;
      loadContracts(categoryDocRef, username);
    });

    loading.remove();

  } else {
    // No user is signed in.
    var userId = null;
    loading.innerHTML = "Não há usuário logado. Entre para visualizar seus contratos.";
  }
});

// Load contracts from this user
let contracts = [];

function loadContracts(user, username) {

  let curso = user.get();
  console.log(curso);

  const lockersRef = db
    .collection("armarios")
    .where("dono", "==", user)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.data();
        const id = doc.id;
        const date = new Date(data.date.seconds * 1000);
        const owner = username;
        const sit = data.situacao;

        const expires = "31/12/" + date.getFullYear();

        contracts.push({
          id: id,
          sit: sit,
          owner: owner,
          date: date.toLocaleDateString("pt-BR"),
          expires: expires
        });
      });

      // Sort contracts by number
      contracts.sort((a, b) => {
        return a.id - b.id;
      });

      prepareTable();
    });
}

function prepareTable() {
  const table = document.getElementById("table");

  for (let i = 0; i < contracts.length; i++) {
    let content = contracts[i];
    buildTable(content, table);
  }
}

function buildTable(content, location) {
  const row = document.createElement("tr");
  const id = document.createElement("td");
  const situation = document.createElement("td");
  const date = document.createElement("td");
  const owner = document.createElement("td");
  const color = document.createElement("td");
  const expires = document.createElement("td");

  id.innerText = content.id;
  situation.innerText = content.sit;
  date.innerText = content.date;
  owner.innerText = content.owner;
  expires.innerText = content.expires;

  row.appendChild(id);
  row.appendChild(situation);
  row.appendChild(owner);
  row.appendChild(date);
  row.appendChild(expires);

  location.appendChild(row);
}