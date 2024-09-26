const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
const balanceEl = document.getElementById('balance');
const formEl = document.getElementById('transactionForm');
const descriptionEl = document.getElementById('description');
const amountEl = document.getElementById('amount');
const typeEl = document.getElementById('type');
const tableEl = document.getElementById('transactionsTable').getElementsByTagName('tbody')[0];
const exportBtn = document.getElementById('exportButton');

function updateBalance() {
    const balance = transactions.reduce((total, transaction) => {
        return transaction.type === 'income' 
            ? total + transaction.amount 
            : total - transaction.amount;
    }, 0);
    balanceEl.textContent = `Balance: ₹${balance.toFixed(2)}`;
}

function addTransactionToTable(transaction, index) {
    const row = tableEl.insertRow();
    row.innerHTML = `
        <td>${transaction.description}</td>
        <td>₹${transaction.amount.toFixed(2)}</td>
        <td>${transaction.type}</td>
        <td><button class="delete-btn" data-index="${index}">Delete</button></td>
    `;
}

function displayEmptyMessage() {
    tableEl.innerHTML = `
        <tr class="empty-message">
            <td colspan="4">
                <img src="./no-data1.png" alt="No data" style="height:250px;width:350px;display:block;margin:0 auto;">
                <p style="color:red;text-align:center;font-weight:bold">No transactions yet</p>
            </td>
        </tr>
    `;
}

function displayTransactions() {
    tableEl.innerHTML = '';
    if (transactions.length === 0) {
        displayEmptyMessage();
    } else {
        transactions.forEach((transaction, index) => {
            addTransactionToTable(transaction, index);
        });
    }
    updateBalance();
}

function addTransaction(e) {
    e.preventDefault();
    const transaction = {
        description: descriptionEl.value,
        amount: parseFloat(amountEl.value),
        type: typeEl.value
    };
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    displayTransactions();
    formEl.reset();
}

function deleteTransaction(index) {
    transactions.splice(index, 1);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    displayTransactions();
}

function exportTransactionsToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text('Transactions Report', 20, 20);
    doc.autoTable({
        head: [['Description', 'Amount', 'Type']],
        body: transactions.map(transaction => [
            transaction.description,
            `₹${transaction.amount.toFixed(2)}`,
            transaction.type
        ]),
    });
    
    doc.save('transactions.pdf');
}

document.getElementById('logoutBtn').addEventListener('click', () => {
    window.location.href = 'index.html'; 
});
formEl.addEventListener('submit', addTransaction);
tableEl.addEventListener('click', e => {
    if (e.target.classList.contains('delete-btn')) {
        const index = e.target.getAttribute('data-index');
        deleteTransaction(index);
    }
});
exportBtn.addEventListener('click', exportTransactionsToPDF);

displayTransactions(); 
