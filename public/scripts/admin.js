const db = firebase.firestore();

// Find user in database
let userId;

firebase.auth().onAuthStateChanged(function (user) {
  if (user.uid == ("bpbIRaXHHLZ3isMjeXUqcTdZ1CN2" || "qPjBuIUwEBRXsUYipLGzi4HVOeA2")) {

    userId = user.uid;

    let username;

    db.collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        username = doc.data().nome;
      });
  } else {
    // No user is signed in.
    userId = null;
    alert("Você não tem permissão para acessar essa página.");
    window.location.href = "index.html";
  }
});

// Load contracts from this user
let contracts = [];

function loadContracts() {
  if (contracts.length == 0) {
    db.collection("armarios")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;
          const date = new Date(data.date.seconds * 1000);
          const sit = data.situacao;
          const color = data.color;
          const pay = data.payment;
          let owner;

          // Firebase timestamp to date string (dd/mm/yyyy)
          const expires =
            data.expires == undefined
              ? "..."
              : data.expires.toDate().toLocaleDateString("pt-BR");
          const ownerRef = doc.data().dono;

          contracts.push({
            id: id,
            sit: sit,
            owner: owner,
            ownerRef: ownerRef,
            date: date.toLocaleDateString("pt-BR"),
            color: color,
            pay: pay,
            expires: expires,
          });

          owner = doc
            .data()
            .dono.get()
            .then((doc) => {
              //document.getElementById("ow" + id).innerText = doc.data().nome;
              contracts.filter((c) => c.id == id)[0].ownerName =
                doc.data().nome;
            });
        });

        // Sort contracts by number
        contracts.sort((a, b) => {
          return a.id - b.id;
        });

        // Set stats values
        const totalNumber =
          contracts.length -
          contracts.filter((c) => c.sit == "Não utilizável").length -
          contracts.filter((c) => c.sit == "CAQuí (Reservado)").length;
        document.getElementById("big-number").innerText = totalNumber;
        document.getElementById("cRegulares").innerText = contracts.filter(
          (c) => c.sit == "Regular"
        ).length;
        document.getElementById("cIrregulares").innerText = contracts.filter(
          (c) => c.sit == "Irregular"
        ).length;
        document.getElementById("cAguaP").innerText = contracts.filter(
          (c) => c.sit == "Aguardando pagamento"
        ).length;
        document.getElementById("cInutilizavel").innerText = contracts.filter(
          (c) => c.sit == "Não utilizável"
        ).length;

        document.getElementById("table").style.display = "table";
      });
  } else {
    document.getElementById("table").style.display = "table";
  }
}

loadContracts();

function prepareTable() {
  document.getElementById("popup-table").style.display = "block";
  const table = document.getElementById("table");
  table.innerHTML =
    '<colgroup> <col span="1" style="width: 3%;"> <col span="1" style="width: 15%;"> <col span="1" style="width: 51%;"> <col span="1" style="width: 8%;"> <col span="1" style="width: 8%;"> <col span="1" style="width: 15%;"> </colgroup><tr> <th>Número</th> <th>Situação</th> <th>Proprietário</th> <th>Data do Contrato</th> <th>Vencimento</th> <th>Ações</th> </tr>';
  table.style.display = "table";

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
  const expires = document.createElement("td");

  // Action buttons
  const edit = document.createElement("button");
  const deleteBtn = document.createElement("button");

  id.innerText = content.id;
  situation.innerText = content.sit;
  situation.style.color = content.color;
  date.innerText = content.date;
  owner.id = "ow" + content.id;
  owner.innerText = content.ownerName
    ? content.ownerName
    : "Usuário não encontrado";
  expires.innerText = content.expires;

  row.id = "row" + content.id;
  row.appendChild(id);
  row.appendChild(situation);
  row.appendChild(owner);
  row.appendChild(date);
  row.appendChild(expires);

  edit.innerText = "Editar";
  edit.className = "btn btn-primary";
  edit.id = "edit" + content.id;
  edit.onclick = function () {
    editContract(content.id);
  };

  deleteBtn.innerText = "Deletar";
  deleteBtn.className = "btn btn-danger";
  deleteBtn.id = "delete" + content.id;
  deleteBtn.onclick = function () {
    deleteContract(content.id);
  };

  row.appendChild(edit);
  row.appendChild(deleteBtn);

  location.appendChild(row);
}

// Editing contract

function editContract(id) {
  const contract = contracts.find((contract) => contract.id === id);
  const sit = contract.sit;
  const date = contract.date;

  document.getElementById("editContractStatus").value = sit;
  document.getElementById("editContractDate").value = date;
  document.getElementById("infoPay").innerText = contract.pay;

  let owner;
  try {
    owner = contract.ownerRef.get().then((doc) => {
      document.getElementById("infoName").innerText = doc.data().nome;
      document.getElementById("infoName").innerText = doc.data().nome;
      document.getElementById("infoPhone").innerText = doc.data().phone;
      document.getElementById("infoEmail").innerText = doc.data().email;
      document.getElementById("infoCourse").innerText = doc.data().course;
      document.getElementById("infoGRR").innerText = "GRR" + doc.data().grr;
    });
  } catch (e) {
    console.log(e);
    owner = null;
  }

  document.getElementById("contractNumber").innerText = id;

  document.getElementById("editContract").style.display = "block";
}

function deleteContract(id) {
  // Delte contract from database
  const conf = confirm("Tem certeza que deseja deletar este contrato?");

  if (conf) {
    db.collection("armarios")
      .doc(id)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
        alert("Contrato deletado com sucesso!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
        alert("Erro ao deletar contrato!");
      });

    // Delete contract from table
    const row = document.getElementById("row" + id);
    row.parentNode.removeChild(row);
  } else {
    console.log("Cancelado");
  }
}

function saveEdit() {
  const sit = document.getElementById("editContractStatus").value;
  let date = document.getElementById("editContractDate").value;
  const id = document.getElementById("contractNumber").innerText;
  let color = getColor(sit);

  if (sit == "Livre") {
    if (
      confirm(
        "Deseja realmente tornar este armário livre? (Será removido da base de dados)"
      )
    ) {
      const docRef = db.collection("armarios").doc(id);
      docRef
        .delete()
        .then(function () {
          console.log("Document successfully deleted!");
          alert("Contrato deletado com sucesso!");
          document.getElementById("editContract").style.display = "none";
        })
        .catch(function (error) {
          console.error("Error removing document: ", error);
        });
    }
    return;
  }

  // Update table
  const row = document.getElementById("row" + id);
  row.childNodes[1].innerText = sit;
  row.childNodes[1].style.color = color;
  row.childNodes[3].innerText = date;

  date = date.split("/");
  date = new Date(date[2], date[1] - 1, date[0]);

  db.collection("armarios")
    .doc(id)
    .update({
      situacao: sit,
      date: date,
      color: color,
    })
    .then(function () {
      console.log("Document successfully updated!");
      alert("Contrato editado com sucesso!");
      closeModal();
    })
    .catch(function (error) {
      console.error("Error updating document: ", error);
      alert("Erro ao editar contrato!");
    });
}

// Close modal
function closeModal() {
  document.getElementById("editContract").style.display = "none";
  document.getElementById("newContract").style.display = "none";
}

function newContractModal() {
  document.getElementById("newContract").style.display = "block";
  document.getElementById("newContractDate").value =
    new Date().toLocaleDateString();
}

function saveNew() {
  // Get values from modal
  const number = document.getElementById("newContractNumber").value;
  const name = document.getElementById("newContractName").value;
  let uid = document.getElementById("newContractUid").value;
  const phone = document.getElementById("newContractPhone").value;
  const email = document.getElementById("newContractEmail").value;
  const course = document.getElementById("newContractCourse").value;
  const grr = document.getElementById("newContractGRR").value;
  let date = document.getElementById("newContractDate").value;
  const payment = document.getElementById("newContractPay").value;
  const sit = document.getElementById("newContractStatus").value;

  // Validate fields
  if (
    number === "" ||
    payment === "" ||
    name === "" ||
    phone === "" ||
    email === "" ||
    course === "" ||
    grr === "" ||
    date === "" ||
    sit === ""
  ) {
    alert("Preencha todos os campos!");
    return;
  }

  // Set UID
  if (uid === "") {
    uid = userId;
  }

  // Set date
  let dateArray = date.split("/");
  date = new Date(dateArray[2], dateArray[1] - 1, dateArray[0]);

  // Set color
  let color = getColor(sit);

  // Get owner reference
  const ownerRef = db.collection("users").doc(uid);

  // Create contract object
  const contract = {
    number: number,
    situacao: sit,
    dono: ownerRef,
    date: date,
    color: color,
    payment: payment,
  };

  // Create user object
  const user = {
    id: uid,
    nome: name,
    phone: phone,
    email: email,
    course: course,
    grr: grr,
    type: course,
  };

  // Add contract to database

  db.collection("armarios")
    .doc(contract.number)
    .get()
    .then(function (doc) {
      if (!doc.exists || doc.data().situacao == "Irregular") {
        db.collection("armarios")
          .doc(contract.number)
          .set(contract)
          .then(function () {
            // Show the success message as an alert
            alert("Contrato criado com sucesso!");
            // Hide the modal
            document.getElementById("newContract").style.display = "none";
          })
          .catch(function (error) {
            // Show the error message as an alert
            alert("Erro ao criar contrato: " + error);
          });
      } else {
        // Show the error message as an alert
        alert("Erro ao criar contrato: Armário já ocupado!");
      }
    });

  // Check and add the user to the database only if it doesn't exist
  db.collection("users")
    .doc(user.id)
    .get()
    .then(function (doc) {
      if (doc.exists) {
        // Confirm user update
        if (confirm("Deseja atualizar os dados desse usuário/armário?")) {
          db.collection("users")
            .doc(user.id)
            .set(user)
            .then(function () {
              // Show the success message as an alert
              alert("Usuário atualizado com sucesso!");
            })
            .catch(function (error) {
              // Show the error message as an alert
              alert("Erro ao atualizar usuário: " + error);
            });
        }
      } else if (doc.exists == false) {
        // Add the user to the database
        db.collection("users")
          .doc(user.id)
          .set(user)
          .then(function () {
            // Show the success message as an alert
            alert("Usuário criado com sucesso!");
          })
          .catch(function (error) {
            // Show the error message as an alert
            alert("Erro ao criar usuário: " + error);
          });
      }
    });
}

function closeTable() {
  document.getElementById("popup-table").style.display = "none";
}

function preContract(mode) {
  // Get values from modal
  const number = document.getElementById("newContractNumber").value;
  let date = document.getElementById("newContractDate").value;

  // Validate fields
  if (number === "") {
    alert("Preencha o número do armário!");
    return;
  }

  // Set date
  let dateArray = date.split("/");
  date = new Date(dateArray[2], dateArray[1] - 1, dateArray[0]);

  // Get owner reference
  const ownerRef = db.collection("users").doc(number);

  let contract;

  switch (mode) {
    case 0:
      contract = {
        number: number,
        situacao: "Irregular",
        color: getColor("Irregular"),
        date: date,
        dono: ownerRef,
        payment: "Não utilizado",
      };
      break;
    case 1:
      contract = {
        number: number,
        situacao: "Não utilizável",
        color: getColor("Não utilizável"),
        date: date,
        dono: ownerRef,
        payment: "Não utilizado",
      };
      break;
  }

  // Add contract to database
  db.collection("armarios")
    .doc(contract.number)
    .set(contract)
    .then(function () {
      // Show the success message as an alert
      alert("Contrato criado com sucesso!");
      // Hide the modal
      document.getElementById("newContract").style.display = "none";
    })
    .catch(function (error) {
      // Show the error message as an alert
      alert("Erro ao criar contrato: " + error);
    });

  // Set user

  const user = {
    id: number,
    nome: "Não informado",
    phone: "Não informado",
    email: "Não informado",
    course: "Não informado",
    grr: "Não informado",
    type: "Não informado",
  };

  db.collection("users")
    .doc(user.id)
    .set(user)
    .then(function () {
      // Show the success message as an alert
      alert("Usuário criado com sucesso!");
    })
    .catch(function (error) {
      // Show the error message as an alert
      alert("Erro ao criar usuário: " + error);
    });
}

function filterContract() {
  alert("Filtro ainda não implementado!");
}

function getColor(sit) {
  let color = "";

  switch (sit) {
    case "Aguardando pagamento":
      color = "blueviolet";
      break;
    case "Regular":
      color = "green";
      break;
    case "Irregular":
      color = "red";
      break;
    case "Livre":
      color = "blue";
      break;
    case "Problema no cadastro":
      color = "blue";
      break;
    case "CAQuí (Reservado)":
      color = "darkorange";
      break;
    case "Não utilizável":
      color = "gray";
      break;
    default:
      color = "black";
  }

  return color;
}

// Set all regular or waiting payment contracts to a fixed expire date (24/12/2022)
// This function is only used once to set all contracts to expire in 2022
// It is not used anymore

// function setAllContractsExpired() {
//     db.collection("armarios")
//         .get()
//         .then(function (querySnapshot) {
//             querySnapshot.forEach(function (doc) {
//                 let contract = doc.data();
//                 let contractNumber = doc.id;

//                 // Get timestamp to save in database
//                 let date = new Date(2022, 11, 24);
//                 date = firebase.firestore.Timestamp.fromDate(date);

//                 if (contract.situacao == "Regular" || contract.situacao == "Aguardando pagamento") {
//                     db.collection("armarios")
//                         .doc(contractNumber)
//                         .update({
//                             expires: date
//                         })
//                         .then(function () {
//                             console.log("Contrato " + contractNumber + " expirado!");
//                         })
//                         .catch(function (error) {
//                             console.error("Erro ao atualizar contrato: ", error);
//                         });
//                 }
//             });
//         })
//         .catch(function (error) {
//             console.log("Erro ao ler contratos: ", error);
//         });
// }

// Mark contracts as expired
function expireContracts() {
  // Confirm
  if (
    !confirm("Tem certeza que deseja marcar todos os contratos como expirados?")
  ) {
    return;
  } else {
    alert(
      "Aguarde enquanto os contratos são marcados como expirados...\nUm aviso será exibido quando a operação for concluída."
    );
  }

  let error = false;

  db.collection("armarios")
    .get()
    .then(function (querySnapshot) {
      querySnapshot
        .forEach(function (doc) {
          let contract = doc.data();
          let contractNumber = doc.id;
          // Check if contract has an expiration date
          let contractDate = contract.expires
            ? new Date(contract.expires.seconds * 1000)
            : new Date(3000, 0, 1);

          let today = new Date();
          let diff = today.getTime() - contractDate.getTime();
          let days = Math.ceil(diff / (1000 * 60 * 60 * 24));

          if (days > 0 && contract.situacao == "Regular") {
            db.collection("armarios")
              .doc(contractNumber)
              .update({
                situacao: "Irregular",
                color: getColor("Irregular"),
              })
              .then(function () {
                console.log(
                  "Contrato " +
                    contractNumber +
                    " expirado! (Diferença de " +
                    days +
                    " dias)"
                );
              })
              .catch(function (error) {
                console.error(
                  "Erro ao expirar contrato " + contractNumber + ": " + error
                );
                error = true;
              });
          }
        })
        
        setTimeout(function () {
          if (error) {
            alert("Erro ao expirar contratos!");
          } else {
            alert("Contratos expirados com sucesso!");
          }
        }, 10000);
    });
}
