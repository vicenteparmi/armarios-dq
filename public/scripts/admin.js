const db = firebase.firestore();
const realtimeDb = firebase.database();

// ========================================
// State Management
// ========================================
let userId;
let contracts = [];
let filteredContracts = [];
let currentPage = 1;
let itemsPerPage = 25;
let currentSort = { column: 'id', direction: 'asc' };
let isAdmin = false;
let adminData = null;

// ========================================
// Authentication & Admin Check
// ========================================
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    userId = user.uid;
    checkAdminStatus(userId);
  } else {
    userId = null;
    showToast("Você precisa estar logado para acessar esta página.", "error");
    setTimeout(() => {
      window.location.href = "auth.html";
    }, 2000);
  }
});

function checkAdminStatus(uid) {
  // Query the admins collection for this user's UID
  realtimeDb.ref('admins').orderByChild('UID').equalTo(uid).once('value')
    .then((snapshot) => {
      if (snapshot.exists()) {
        // User found in admin collection
        const adminEntries = snapshot.val();
        const adminKey = Object.keys(adminEntries)[0];
        adminData = adminEntries[adminKey];
        
        if (adminData.isAdmin === true) {
          isAdmin = true;
          console.log('Admin access granted:', adminData.notes || 'No notes');
          loadContracts();
        } else {
          // User exists but isAdmin is false
          showToast("Acesso negado: você não tem permissão de administrador.", "error");
          setTimeout(() => {
            window.location.href = "index.html";
          }, 2000);
        }
      } else {
        // User not found in admin collection
        showToast("Acesso negado: você não está na lista de administradores.", "error");
        setTimeout(() => {
          window.location.href = "index.html";
        }, 2000);
      }
    })
    .catch((error) => {
      console.error("Error checking admin status:", error);
      showToast("Erro ao verificar permissões de administrador.", "error");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
    });
}

// ========================================
// Load Contracts
// ========================================
function loadContracts() {
  db.collection("armarios")
    .get()
    .then((snapshot) => {
      contracts = [];
      const ownerPromises = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        const id = doc.id;
        const date = data.date ? new Date(data.date.seconds * 1000) : null;
        const expires = data.expires ? data.expires.toDate() : null;

        const contract = {
          id: id,
          sit: data.situacao,
          ownerRef: data.dono,
          ownerName: "Carregando...",
          date: date ? date.toLocaleDateString("pt-BR") : "...",
          dateObj: date,
          expires: expires ? expires.toLocaleDateString("pt-BR") : "...",
          expiresObj: expires,
          color: data.color,
          pay: data.payment,
        };

        contracts.push(contract);

        // Load owner name
        if (data.dono) {
          const promise = data.dono.get().then((ownerDoc) => {
            if (ownerDoc.exists) {
              contract.ownerName = ownerDoc.data().nome || "Sem nome";
            } else {
              contract.ownerName = "Usuário não encontrado";
            }
          }).catch(() => {
            contract.ownerName = "Erro ao carregar";
          });
          ownerPromises.push(promise);
        } else {
          contract.ownerName = "Não informado";
        }
      });

      // Wait for all owner names to load
      Promise.all(ownerPromises).then(() => {
        // Sort by ID initially
        contracts.sort((a, b) => parseInt(a.id) - parseInt(b.id));
        filteredContracts = [...contracts];
        
        updateDashboard();
        renderTable();
        updatePagination();
      });
    })
    .catch((error) => {
      console.error("Error loading contracts:", error);
      showToast("Erro ao carregar contratos", "error");
    });
}

// ========================================
// Dashboard Updates
// ========================================
function updateDashboard() {
  const TOTAL_LOCKERS = 384; // Total number of lockers in the system
  
  const regular = contracts.filter(c => c.sit === "Regular").length;
  const irregular = contracts.filter(c => c.sit === "Irregular").length;
  const waiting = contracts.filter(c => c.sit === "Aguardando pagamento").length;
  const unusable = contracts.filter(c => c.sit === "Não utilizável").length;
  const reserved = contracts.filter(c => c.sit === "CAQuí (Reservado)").length;
  
  // Free lockers = total - all registered lockers
  const registeredLockers = contracts.length;
  const free = TOTAL_LOCKERS - registeredLockers;
  
  // Active contracts = registered contracts - unusable - reserved (CAQuí)
  const total = registeredLockers - unusable - reserved;

  // Update stat cards
  document.getElementById("stat-total").textContent = total;
  document.getElementById("stat-regular").textContent = regular;
  document.getElementById("stat-irregular").textContent = irregular;
  document.getElementById("stat-waiting").textContent = waiting;
  document.getElementById("stat-unusable").textContent = unusable;
  document.getElementById("stat-free").textContent = free;

  // Update distribution bar with tooltips (based on total 384)
  const regularPercent = (regular / TOTAL_LOCKERS * 100).toFixed(1);
  const irregularPercent = (irregular / TOTAL_LOCKERS * 100).toFixed(1);
  const waitingPercent = (waiting / TOTAL_LOCKERS * 100).toFixed(1);
  const reservedPercent = (reserved / TOTAL_LOCKERS * 100).toFixed(1);
  const freePercent = (free / TOTAL_LOCKERS * 100).toFixed(1);
  const unusablePercent = (unusable / TOTAL_LOCKERS * 100).toFixed(1);

  // Update widths
  document.getElementById("bar-regular").style.width = regularPercent + "%";
  document.getElementById("bar-irregular").style.width = irregularPercent + "%";
  document.getElementById("bar-waiting").style.width = waitingPercent + "%";
  document.getElementById("bar-reserved").style.width = reservedPercent + "%";
  document.getElementById("bar-free").style.width = freePercent + "%";
  document.getElementById("bar-unusable").style.width = unusablePercent + "%";

  // Update tooltip data
  document.getElementById("bar-regular").setAttribute("data-count", regular);
  document.getElementById("bar-regular").setAttribute("data-percent", regularPercent + "%");
  
  document.getElementById("bar-irregular").setAttribute("data-count", irregular);
  document.getElementById("bar-irregular").setAttribute("data-percent", irregularPercent + "%");
  
  document.getElementById("bar-waiting").setAttribute("data-count", waiting);
  document.getElementById("bar-waiting").setAttribute("data-percent", waitingPercent + "%");
  
  document.getElementById("bar-reserved").setAttribute("data-count", reserved);
  document.getElementById("bar-reserved").setAttribute("data-percent", reservedPercent + "%");
  
  document.getElementById("bar-free").setAttribute("data-count", free);
  document.getElementById("bar-free").setAttribute("data-percent", freePercent + "%");
  
  document.getElementById("bar-unusable").setAttribute("data-count", unusable);
  document.getElementById("bar-unusable").setAttribute("data-percent", unusablePercent + "%");

  // Check for expiring contracts
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  const expiring = contracts.filter(c => {
    if (!c.expiresObj) return false;
    return c.expiresObj >= today && c.expiresObj <= nextWeek && c.sit === "Regular";
  });

  if (expiring.length > 0) {
    document.getElementById("expiring-alert").style.display = "flex";
    document.getElementById("expiring-count").textContent = expiring.length;
  }
}

// ========================================
// Table Rendering
// ========================================
function renderTable() {
  const tbody = document.getElementById("table-body");
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageContracts = filteredContracts.slice(start, end);

  if (pageContracts.length === 0) {
    tbody.innerHTML = `
      <tr class="empty-row">
        <td colspan="6">
          <span class="material-symbols-outlined">inbox</span>
          Nenhum contrato encontrado
        </td>
      </tr>
    `;
    document.getElementById("results-count").textContent = "Nenhum resultado";
    return;
  }

  tbody.innerHTML = pageContracts.map(contract => `
    <tr data-id="${contract.id}">
      <td><strong>${contract.id}</strong></td>
      <td>${getStatusBadge(contract.sit)}</td>
      <td>${escapeHtml(contract.ownerName)}</td>
      <td>${contract.date}</td>
      <td>${contract.expires}</td>
      <td>
        <div class="table-actions">
          <button class="btn-edit" onclick="editContract('${contract.id}')">
            <span class="material-symbols-outlined" style="font-size:16px">edit</span>
            Editar
          </button>
          <button class="btn-delete" onclick="deleteContract('${contract.id}')">
            <span class="material-symbols-outlined" style="font-size:16px">delete</span>
          </button>
        </div>
      </td>
    </tr>
  `).join('');

  document.getElementById("results-count").textContent = 
    `Mostrando ${start + 1}-${Math.min(end, filteredContracts.length)} de ${filteredContracts.length} contratos`;
}

function getStatusBadge(status) {
  const statusMap = {
    "Regular": "regular",
    "Irregular": "irregular",
    "Aguardando pagamento": "waiting",
    "Problema no cadastro": "problem",
    "CAQuí (Reservado)": "reserved",
    "Não utilizável": "unusable"
  };
  const className = statusMap[status] || "default";
  return `<span class="status-badge ${className}">${escapeHtml(status)}</span>`;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text || '';
  return div.innerHTML;
}

// ========================================
// Filtering & Search
// ========================================
function searchContracts() {
  applyFilters();
}

function applyFilters() {
  const searchTerm = document.getElementById("search-input").value.toLowerCase();
  const statusFilter = document.getElementById("filter-status").value;
  const expiryFilter = document.getElementById("filter-expiry").value;

  filteredContracts = contracts.filter(contract => {
    // Search filter
    const matchesSearch = !searchTerm || 
      contract.id.toLowerCase().includes(searchTerm) ||
      contract.ownerName.toLowerCase().includes(searchTerm);

    // Status filter
    const matchesStatus = statusFilter === "all" || contract.sit === statusFilter;

    // Expiry filter
    let matchesExpiry = true;
    if (expiryFilter !== "all" && contract.expiresObj) {
      const today = new Date();
      const daysUntilExpiry = Math.ceil((contract.expiresObj - today) / (1000 * 60 * 60 * 24));
      
      if (expiryFilter === "expired") {
        matchesExpiry = daysUntilExpiry < 0;
      } else {
        matchesExpiry = daysUntilExpiry >= 0 && daysUntilExpiry <= parseInt(expiryFilter);
      }
    } else if (expiryFilter !== "all" && !contract.expiresObj) {
      matchesExpiry = false;
    }

    return matchesSearch && matchesStatus && matchesExpiry;
  });

  currentPage = 1;
  applySorting();
  renderTable();
  updatePagination();
}

function clearFilters() {
  document.getElementById("search-input").value = "";
  document.getElementById("filter-status").value = "all";
  document.getElementById("filter-expiry").value = "all";
  filteredContracts = [...contracts];
  currentPage = 1;
  applySorting();
  renderTable();
  updatePagination();
}

function filterExpiring() {
  document.getElementById("filter-expiry").value = "7";
  document.getElementById("filter-status").value = "Regular";
  applyFilters();
}

// ========================================
// Sorting
// ========================================
function sortTable(column) {
  if (currentSort.column === column) {
    currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
  } else {
    currentSort.column = column;
    currentSort.direction = 'asc';
  }

  // Update header icons
  document.querySelectorAll('#contracts-table th').forEach(th => {
    th.classList.remove('sorted-asc', 'sorted-desc');
  });

  applySorting();
  renderTable();
}

function applySorting() {
  const { column, direction } = currentSort;
  const multiplier = direction === 'asc' ? 1 : -1;

  filteredContracts.sort((a, b) => {
    let valueA, valueB;

    switch (column) {
      case 'id':
        valueA = parseInt(a.id) || 0;
        valueB = parseInt(b.id) || 0;
        break;
      case 'status':
        valueA = a.sit || '';
        valueB = b.sit || '';
        break;
      case 'owner':
        valueA = a.ownerName || '';
        valueB = b.ownerName || '';
        break;
      case 'date':
        valueA = a.dateObj ? a.dateObj.getTime() : 0;
        valueB = b.dateObj ? b.dateObj.getTime() : 0;
        break;
      case 'expires':
        valueA = a.expiresObj ? a.expiresObj.getTime() : 0;
        valueB = b.expiresObj ? b.expiresObj.getTime() : 0;
        break;
      default:
        return 0;
    }

    if (typeof valueA === 'string') {
      return valueA.localeCompare(valueB) * multiplier;
    }
    return (valueA - valueB) * multiplier;
  });
}

// ========================================
// Pagination
// ========================================
function updatePagination() {
  const totalPages = Math.ceil(filteredContracts.length / itemsPerPage) || 1;
  
  document.getElementById("current-page").textContent = currentPage;
  document.getElementById("total-pages").textContent = totalPages;
  
  document.getElementById("prev-page").disabled = currentPage <= 1;
  document.getElementById("next-page").disabled = currentPage >= totalPages;
}

function changePage(delta) {
  const totalPages = Math.ceil(filteredContracts.length / itemsPerPage);
  const newPage = currentPage + delta;
  
  if (newPage >= 1 && newPage <= totalPages) {
    currentPage = newPage;
    renderTable();
    updatePagination();
  }
}

function changeItemsPerPage() {
  itemsPerPage = parseInt(document.getElementById("items-per-page").value);
  currentPage = 1;
  renderTable();
  updatePagination();
}

// ========================================
// Contract Actions
// ========================================
function editContract(id) {
  const contract = contracts.find(c => c.id === id);
  if (!contract) return;

  document.getElementById("contractNumber").textContent = id;
  document.getElementById("editContractStatus").value = contract.sit;
  
  // Convert date from dd/mm/yyyy to yyyy-mm-dd for date input
  if (contract.dateObj) {
    const year = contract.dateObj.getFullYear();
    const month = String(contract.dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(contract.dateObj.getDate()).padStart(2, '0');
    document.getElementById("editContractDate").value = `${year}-${month}-${day}`;
  }
  
  // Set expiry date
  if (contract.expiresObj) {
    const year = contract.expiresObj.getFullYear();
    const month = String(contract.expiresObj.getMonth() + 1).padStart(2, '0');
    const day = String(contract.expiresObj.getDate()).padStart(2, '0');
    document.getElementById("editContractExpiry").value = `${year}-${month}-${day}`;
  } else {
    document.getElementById("editContractExpiry").value = "";
  }
  
  document.getElementById("editContractPayment").value = contract.pay || "";

  // Load owner details and populate editable fields
  if (contract.ownerRef) {
    contract.ownerRef.get().then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        document.getElementById("editOwnerName").value = data.nome || "";
        document.getElementById("editOwnerEmail").value = data.email || "";
        document.getElementById("editOwnerPhone").value = data.phone || "";
        document.getElementById("editOwnerGRR").value = data.grr || "";
        document.getElementById("editOwnerCourse").value = data.course || "";
        
        // Store owner UID for saving
        document.getElementById("editContractId").value = doc.id;
      }
    }).catch(() => {
      showToast("Erro ao carregar dados do proprietário", "error");
    });
  } else {
    // Clear fields if no owner
    document.getElementById("editOwnerName").value = "";
    document.getElementById("editOwnerEmail").value = "";
    document.getElementById("editOwnerPhone").value = "";
    document.getElementById("editOwnerGRR").value = "";
    document.getElementById("editOwnerCourse").value = "";
    document.getElementById("editContractId").value = id;
  }

  document.getElementById("editContract").style.display = "block";
}

function deleteContract(id) {
  if (!confirm("Tem certeza que deseja deletar este contrato?")) return;

  db.collection("armarios").doc(id).delete()
    .then(() => {
      contracts = contracts.filter(c => c.id !== id);
      filteredContracts = filteredContracts.filter(c => c.id !== id);
      updateDashboard();
      renderTable();
      updatePagination();
      showToast("Contrato deletado com sucesso!", "success");
    })
    .catch((error) => {
      console.error("Error deleting:", error);
      showToast("Erro ao deletar contrato", "error");
    });
}

function saveEdit() {
  const id = document.getElementById("contractNumber").textContent;
  const sit = document.getElementById("editContractStatus").value;
  const dateValue = document.getElementById("editContractDate").value; // yyyy-mm-dd
  const expiryValue = document.getElementById("editContractExpiry").value; // yyyy-mm-dd
  const payment = document.getElementById("editContractPayment").value;
  const color = getColor(sit);
  
  // Get owner data
  const ownerUid = document.getElementById("editContractId").value;
  const ownerName = document.getElementById("editOwnerName").value;
  const ownerEmail = document.getElementById("editOwnerEmail").value;
  const ownerPhone = document.getElementById("editOwnerPhone").value;
  const ownerGRR = document.getElementById("editOwnerGRR").value;
  const ownerCourse = document.getElementById("editOwnerCourse").value;

  if (sit === "Livre") {
    if (confirm("Deseja realmente tornar este armário livre? (Será removido da base de dados)")) {
      db.collection("armarios").doc(id).delete()
        .then(() => {
          contracts = contracts.filter(c => c.id !== id);
          filteredContracts = filteredContracts.filter(c => c.id !== id);
          closeModal();
          updateDashboard();
          renderTable();
          updatePagination();
          showToast("Armário liberado com sucesso!", "success");
        });
    }
    return;
  }

  // Parse date from yyyy-mm-dd
  const dateParts = dateValue.split("-");
  const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);

  // Prepare update object for contract
  const updateData = {
    situacao: sit,
    date: date,
    color: color,
  };

  // Add payment if provided
  if (payment) {
    updateData.payment = payment;
  }

  // Add expiry date if provided, or remove it if cleared
  if (expiryValue) {
    const expiryParts = expiryValue.split("-");
    const expiryDate = new Date(expiryParts[0], expiryParts[1] - 1, expiryParts[2]);
    updateData.expires = firebase.firestore.Timestamp.fromDate(expiryDate);
  } else {
    // Remove expires field if date was cleared
    updateData.expires = firebase.firestore.FieldValue.delete();
  }

  // Prepare owner data update
  const ownerData = {
    nome: ownerName,
    email: ownerEmail,
    phone: ownerPhone,
    grr: ownerGRR,
    course: ownerCourse,
    type: ownerCourse, // type is same as course
  };

  // Update both contract and owner data
  Promise.all([
    db.collection("armarios").doc(id).update(updateData),
    db.collection("users").doc(ownerUid).set(ownerData, { merge: true })
  ])
  .then(() => {
    // Update local state
    const contract = contracts.find(c => c.id === id);
    if (contract) {
      contract.sit = sit;
      contract.dateObj = date;
      contract.date = date.toLocaleDateString("pt-BR");
      contract.color = color;
      contract.pay = payment;
      contract.ownerName = ownerName; // Update owner name in local state
      
      if (expiryValue) {
        const expiryParts = expiryValue.split("-");
        const expiryDate = new Date(expiryParts[0], expiryParts[1] - 1, expiryParts[2]);
        contract.expiresObj = expiryDate;
        contract.expires = expiryDate.toLocaleDateString("pt-BR");
      } else {
        // Clear expiry date from local state
        contract.expiresObj = null;
        contract.expires = "...";
      }
    }
    
    closeModal();
    updateDashboard();
    renderTable();
    showToast("Contrato e proprietário atualizados com sucesso!", "success");
  })
  .catch((error) => {
    console.error("Error updating:", error);
    showToast("Erro ao atualizar contrato", "error");
  });
}

// ========================================
// New Contract
// ========================================
function newContractModal() {
  document.getElementById("newContract").style.display = "block";
  document.getElementById("newContractDate").value = new Date().toLocaleDateString("pt-BR");
  
  // Clear form
  document.getElementById("newContractForm").reset();
  document.getElementById("newContractDate").value = new Date().toLocaleDateString("pt-BR");
}

function saveNew() {
  const number = document.getElementById("newContractNumber").value;
  const name = document.getElementById("newContractName").value;
  let uid = document.getElementById("newContractUid").value || userId;
  const phone = document.getElementById("newContractPhone").value;
  const email = document.getElementById("newContractEmail").value;
  const course = document.getElementById("newContractCourse").value;
  const grr = document.getElementById("newContractGRR").value;
  let dateStr = document.getElementById("newContractDate").value;
  const payment = document.getElementById("newContractPay").value;
  const sit = document.getElementById("newContractStatus").value;

  if (!number || !dateStr) {
    showToast("Preencha pelo menos o número e a data!", "warning");
    return;
  }

  // Parse date
  const dateParts = dateStr.split("/");
  const date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
  const color = getColor(sit);
  const ownerRef = db.collection("users").doc(uid);

  const contract = {
    number: number,
    situacao: sit,
    dono: ownerRef,
    date: date,
    color: color,
    payment: payment,
  };

  db.collection("armarios").doc(number).get()
    .then((doc) => {
      if (!doc.exists || doc.data().situacao === "Irregular") {
        return db.collection("armarios").doc(number).set(contract);
      } else {
        throw new Error("Armário já ocupado!");
      }
    })
    .then(() => {
      // Save user data
      const user = {
        id: uid,
        nome: name,
        phone: phone,
        email: email,
        course: course,
        grr: grr,
        type: course,
      };
      
      return db.collection("users").doc(uid).set(user, { merge: true });
    })
    .then(() => {
      closeModal();
      loadContracts(); // Reload all contracts
      showToast("Contrato criado com sucesso!", "success");
    })
    .catch((error) => {
      showToast("Erro: " + error.message, "error");
    });
}

function preContract(mode) {
  const number = document.getElementById("newContractNumber").value;
  let dateStr = document.getElementById("newContractDate").value;

  if (!number) {
    showToast("Preencha o número do armário!", "warning");
    return;
  }

  const dateParts = dateStr.split("/");
  const date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
  const ownerRef = db.collection("users").doc(number);

  const sitMap = { 0: "Irregular", 1: "Não utilizável" };
  const sit = sitMap[mode];

  const contract = {
    number: number,
    situacao: sit,
    color: getColor(sit),
    date: date,
    dono: ownerRef,
    payment: "Não utilizado",
  };

  db.collection("armarios").doc(number).set(contract)
    .then(() => {
      const user = {
        id: number,
        nome: "Não informado",
        phone: "Não informado",
        email: "Não informado",
        course: "Não informado",
        grr: "Não informado",
        type: "Não informado",
      };
      return db.collection("users").doc(number).set(user);
    })
    .then(() => {
      closeModal();
      loadContracts();
      showToast(`Armário ${sit} criado com sucesso!`, "success");
    })
    .catch((error) => {
      showToast("Erro: " + error.message, "error");
    });
}

// ========================================
// Expire Contracts
// ========================================
function expireContracts() {
  // Open the confirmation modal instead of using default confirm
  document.getElementById("confirmExpireModal").style.display = "block";
}

function closeExpireModal() {
  document.getElementById("confirmExpireModal").style.display = "none";
}

function confirmExpireContracts() {
  // Close the modal first
  closeExpireModal();
  
  showToast("Atualizando contratos vencidos...", "warning");
  let updateCount = 0;

  const promises = contracts.map(contract => {
    if (!contract.expiresObj || contract.sit !== "Regular") return Promise.resolve();
    
    const today = new Date();
    if (contract.expiresObj < today) {
      updateCount++;
      return db.collection("armarios").doc(contract.id).update({
        situacao: "Irregular",
        color: getColor("Irregular"),
      });
    }
    return Promise.resolve();
  });

  Promise.all(promises)
    .then(() => {
      loadContracts();
      showToast(`${updateCount} contratos marcados como irregulares!`, "success");
    })
    .catch((error) => {
      showToast("Erro ao atualizar contratos", "error");
    });
}

// ========================================
// Export Data
// ========================================
function exportData() {
  const headers = ["Número", "Status", "Proprietário", "Data", "Vencimento", "Pagamento"];
  const rows = filteredContracts.map(c => [
    c.id,
    c.sit,
    c.ownerName,
    c.date,
    c.expires,
    c.pay || ""
  ]);

  let csv = headers.join(",") + "\n";
  rows.forEach(row => {
    csv += row.map(cell => `"${cell}"`).join(",") + "\n";
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `armarios_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();

  showToast("Dados exportados com sucesso!", "success");
}

// ========================================
// Utility Functions
// ========================================
function closeModal() {
  document.getElementById("editContract").style.display = "none";
  document.getElementById("newContract").style.display = "none";
  document.getElementById("confirmExpireModal").style.display = "none";
}

function getColor(sit) {
  const colorMap = {
    "Aguardando pagamento": "blueviolet",
    "Regular": "green",
    "Irregular": "red",
    "Livre": "blue",
    "Problema no cadastro": "blue",
    "CAQuí (Reservado)": "darkorange",
    "Não utilizável": "gray"
  };
  return colorMap[sit] || "black";
}

function showToast(message, type = "info") {
  const toast = document.getElementById("toast");
  const icon = toast.querySelector(".toast-icon");
  const msg = toast.querySelector(".toast-message");

  const iconMap = {
    success: "check_circle",
    error: "error",
    warning: "warning",
    info: "info"
  };

  toast.className = `toast show ${type}`;
  icon.textContent = iconMap[type] || "info";
  msg.textContent = message;

  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}

// Close modals on outside click
window.onclick = function(event) {
  if (event.target.classList.contains('modal')) {
    closeModal();
  }
};

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});
