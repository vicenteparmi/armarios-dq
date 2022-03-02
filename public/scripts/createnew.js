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

    if (other == "") {
        other = "Química";
    }

    // Create a new contract
    const contract = {
        payment: payment,
        situacao: "Aguardando pagamento",
        color: "gold",
        dono: categoryDocRef,
        date: Date.now(),
    };

    const user = {
        nome: name,
        email: email,
        phone: phone,
        type: type,
        course: other,
        grr: grr,
    };

    // Add the contract to the database
    db.collection("armarios")
        .doc(number)
        .set(contract)
        .then(function (docRef) {
            alert("Contrato criado com sucesso!");
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });

    // Add the user to the database or update if it doesn't exist
    db.collection("users")
        .doc(userId)
        .set(user, {
            merge: true
        })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef);
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}