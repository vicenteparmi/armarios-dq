const db = firebase.firestore();

// Find user in database
let userId;

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        userId = user.uid;
        const categoryDocRef = db.collection("users").doc(userId);

        let username;

        db.collection("users").doc(userId).get().then((doc) => {
            username = doc.data().nome;
            //loadContracts(categoryDocRef, username);
        });

    } else {
        // No user is signed in.
        userId = null;
    }
});

// Load contracts from this user
let contracts = [];

function loadContracts() {

    db
        .collection("armarios")
        .get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                const data = doc.data();
                const id = doc.id;
                const date = new Date(data.date.seconds * 1000);
                const sit = data.situacao;
                const color = data.color;
                let owner;

                const expires = "31/12/" + date.getFullYear();

                try {
                    owner = doc.data().dono.get().then((doc) => {
                        document.getElementById("ow" + id).innerText = doc.data().nome;
                    });
                } catch (e) {
                    console.log(e);
                }

                const ownerRef = doc.data().dono;

                contracts.push({
                    id: id,
                    sit: sit,
                    owner: owner,
                    ownerRef: ownerRef,
                    date: date.toLocaleDateString("pt-BR"),
                    color: color,
                    expires: expires
                });
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
    const expires = document.createElement("td");

    // Action buttons
    const edit = document.createElement("button");
    const deleteBtn = document.createElement("button");

    id.innerText = content.id;
    situation.innerText = content.sit;
    situation.style.color = content.color;
    date.innerText = content.date;
    owner.id = "ow" + content.id;
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

loadContracts();

// Editing contract

function editContract(id) {
    const contract = contracts.find((contract) => contract.id === id);
    const sit = contract.sit;
    const date = contract.date;

    document.getElementById("editContractStatus").value = sit;
    document.getElementById("editContractDate").value = date;

    const owner = contract.ownerRef.get().then((doc) => {
        document.getElementById("infoName").innerText = doc.data().nome;
        document.getElementById("infoName").innerText = doc.data().nome;;
        document.getElementById("infoPhone").innerText = doc.data().phone;
        document.getElementById("infoEmail").innerText = doc.data().email;
        document.getElementById("infoCourse").innerText = doc.data().course;
        document.getElementById("infoGRR").innerText = "GRR" + doc.data().grr;
    });

    document.getElementById("contractNumber").innerText = id;
    // document.getElementById("infoName").innerText = doc.data().nome;;
    // document.getElementById("infoPhone").innerText = contract.owner.get().data().phone;
    // document.getElementById("infoEmail").innerText = contract.owner.get().data().email;
    // document.getElementById("infoCourse").innerText = contract.owner.get().data().course;
    // document.getElementById("infoGRR").innerText = contract.owner.get().data().grr;

    document.getElementById("editContract").style.display = "block";
}

function deleteContract(id) {
    // Delte contract from database
    const conf = confirm("Tem certeza que deseja deletar este contrato?");

    if (conf) {
        db.collection("armarios").doc(id).delete().then(function () {
            console.log("Document successfully deleted!");
            alert("Contrato deletado com sucesso!");
        }).catch(function (error) {
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
        if (confirm('Deseja realmente tornar este armário livre? (Será removido da base de dados)')) {
            const docRef = db.collection("armarios").doc(id);
            docRef.delete().then(function () {
                console.log("Document successfully deleted!");
                alert("Contrato deletado com sucesso!");
                document.getElementById("editContract").style.display = "none";
            }).catch(function (error) {
                console.error("Error removing document: ", error);
            }
            );
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

    db.collection("armarios").doc(id).update({
        situacao: sit,
        date: date,
        color: color
    }).then(function () {
        console.log("Document successfully updated!");
        alert("Contrato editado com sucesso!");
        closeModal();
    }).catch(function (error) {
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
    if (number === "" || payment === "" || name === "" || phone === "" || email === "" || course === "" || grr === "" || date === "" || sit === "") {
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
        nome: name,
        phone: phone,
        email: email,
        course: course,
        grr: grr,
        type: course
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
        .doc(userId)
        .get()
        .then(function (doc) {
            if (doc.exists) {
                // Confirm user update
                if (confirm("Deseja atualizar seus dados?\nSeus dados já se encontram na base de dados, clique em OK para atualizar suas informações.")) {
                    db.collection("users")
                        .doc(userId)
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
                    .doc(userId)
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