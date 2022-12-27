const db = firebase.firestore();
const loading = document.getElementById("loading");

let lockers = [];

// Load table
function loadPage() {
  const lockersRef = db.collection("armarios");

  lockersRef.get().then((snapshot) => {
    snapshot.forEach((doc) => {
      const data = doc.data();
      const id = doc.id;
      const sit = data.situacao;
      const color = data.color;
      let special = 0;

      // Check if special locker
      if (sit == "Irregular") {
        special = 2;
      }

      lockers.push({
        id: id,
        situation: sit,
        color: color,
        special: special
      });
    })
  }).then(() => {

    // Fill missing lockers in array
    for (let i = 0; i < 384; i++) {
      let found = false;
      for (let i2 = 0; i2 < lockers.length; i2++) {
        if (lockers[i2].id == i + 1) {
          found = true;
        }
      }
      if (!found) {
        lockers.push({
          id: i + 1,
          situation: "Livre",
          color: "#008000",
          special: 1
        });
      }
    }

    document.getElementById("loading").style.display = "none";
    const container = document.getElementById("lockers-container");

    // Sort lockers by id
    lockers.sort((a, b) => {
      return a.id - b.id;
    });

    lockers.forEach((locker) => {
      // Create locker
      const lockerDiv = document.createElement("div");
      lockerDiv.classList.add("locker");
      lockerDiv.setAttribute("id", "locker"+locker.id);

      // Create locker number
      const lockerNumber = document.createElement("div");
      lockerNumber.classList.add("locker-info");
      lockerNumber.innerHTML = "<h3>" + locker.id + "</h3>";

      // Create locker situation
      const lockerSituation = document.createElement("div");
      lockerSituation.classList.add("locker-status");
      lockerSituation.innerHTML = "<p>" + locker.situation + "</p>";

      // Set color to locker number
      lockerNumber.style.color = locker.color;

      // Check if special locker
      if (locker.special == 1) {
        // Free locker with light green background
        lockerDiv.style.backgroundColor = "#90EE90";
      } else if (locker.special == 2) {
        // Irregular locker with light red background
        lockerDiv.style.backgroundColor = "#FFB6C1";
      }

      // Append locker number and situation to locker
      lockerDiv.appendChild(lockerNumber);
      lockerDiv.appendChild(lockerSituation);

      // Append locker to container
      container.appendChild(lockerDiv);
    });
  });
}

// Load page
loadPage();