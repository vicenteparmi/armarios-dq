// Add event listener to select to show input text if "other" is selected
document
    .getElementById("newContractType")
    .addEventListener("change", function () {
        if (this.value == "Outro") {
            document.getElementById("newContractOther").style.display = "block";
        } else {
            document.getElementById("newContractOther").style.display = "none";
        }
    });

let categoryDocRef;
let userId;
const db = firebase.firestore();

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        userId = user.uid;
        categoryDocRef = db.collection("users").doc(userId);
    } else {
        // No user is signed in.
        userId = null;
        loading.innerHTML =
            "Não há usuário logado. Entre para visualizar seus contratos.";
    }
});

let contract, user;

function requestContract() {
    // Get the values from the form
    const name = document.getElementById("newContractName").value;
    const number = document.getElementById("newContractNumber").value;
    const type = document.getElementById("newContractType").value;
    let other = document.getElementById("newContractOther").value;
    const grr = document.getElementById("newContractGRR").value;
    const email = document.getElementById("newContractEmail").value;
    const phone = document.getElementById("newContractPhone").value;
    const payment = document.getElementById("newContractPaymentMethod").value;

    // Check if the fields are empty
    if (
        name == "" ||
        number == "" ||
        type == "" ||
        grr == "" ||
        email == "" ||
        phone == "" ||
        payment == ""
    ) {
        alert("Preencha todos os campos!");
        return;
    }

    // Check if the contract number is already in use
    db.collection("armarios")
        .doc(number)
        .get()
        .then(function (doc) {
            if (doc.exists) {
                alert("Armário já ocupado! Caso esteja regularizando seu contrato, continue, caso contrário, escolha um armário vazio.");
                return;
            }
        });

    // Check if number

    if (other == "") {
        other = "Química";
    }

    contract = {
        number: number,
        payment: payment,
        situacao: "Aguardando pagamento",
        color: "blueviolet",
        dono: categoryDocRef,
        date: new Date(),
    };

    user = {
        nome: name,
        email: email,
        phone: phone,
        type: type,
        course: other,
        grr: grr,
    };

    summarizeContract();
}

function summarizeContract() {
    // Show the modal with the summary
    document.getElementById("summarizeModal").style.display = "block";

    const date = new Date();

    // Show the contract summary
    document.getElementById("sumName").innerHTML = user.nome;
    document.getElementById("sumEmail").innerHTML = user.email;
    document.getElementById("sumPhone").innerHTML = user.phone;
    document.getElementById("sumType").innerHTML = user.course;
    document.getElementById("sumGRR").innerHTML = user.grr;
    document.getElementById("sumNumber").innerHTML = contract.number;
    document.getElementById("sumPaymentMethod").innerHTML = contract.payment;
    document.getElementById("sumStartDate").innerHTML =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    document.getElementById("sumEndDate").innerHTML =
        "Final do ano letivo de " + date.getFullYear();

    // Calculate the price
    let price = 0;
    if ((user.course = "Química")) {
        price = 20;
    } else {
        price = 35;
    }

    // Show the price
    document.getElementById("sumPrice").innerHTML = price;

    // Observation
    const obs = [
        "Leia atentamente todos os ítens do contrato ates de assinar.",
        "Leia todas as informações de uso do contrato na aba <i>Como reservar</i>.",
        "Conforme o método de pagamento escolhido, o pagamento deve ser realizado <b>presencialmente no CAQuí em até 7 dias</b>. Após esse prazo, a solicitação e contrato serão removidos do sistema.",
        "Conforme o método de pagamento escolhido, o envio do valor do armario deve ser realizado <b>via PIX em até 7 dias</b> para a chave <i>caqui.ufpr@gmail.com</i> e o comprovante deve ser enviado logo em seguida para caqui.ufpr+armario@gmail.com. Sem o envio do comprovante a solicitação e contrato serão cancelados.",
    ];

    // Show the observations
    const obsDiv = document.getElementById("sumObservations");
    obsDiv.innerHTML += "<p>" + obs[0] + " " + obs[1] + "</p>";

    if (contract.payment != "PIX") {
        obsDiv.innerHTML += "<p>" + obs[2] + "</p>";
    } else {
        obsDiv.innerHTML += "<p>" + obs[3] + "</p>";
    }
}

function cancelContract() {
    document.getElementById("summarizeModal").style.display = "none";
}

function sendContract() {
    // Add the contract to the database only if it doesn't exist
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
                        document.getElementById("summarizeModal").style.display = "none";
                        // Clear the form
                        document.getElementById("newContractName").value = "";
                        document.getElementById("newContractNumber").value = "";
                        document.getElementById("newContractType").value = "";
                        document.getElementById("newContractOther").value = "";
                        document.getElementById("newContractGRR").value = "";
                        document.getElementById("newContractEmail").value = "";
                        document.getElementById("newContractPhone").value = "";
                        document.getElementById("newContractPaymentMethod").value = "";
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