const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
const userBalanceEl = document.getElementById('userBalance');
const userTransactionsList = document.getElementById('userTransactionsList');

function updateUserBalance() {
    const balance = transactions.reduce((total, transaction) => {
        return transaction.type === 'income' 
            ? total + transaction.amount 
            : total - transaction.amount;
    }, 0);
    userBalanceEl.textContent = `Your current balance: ₹${balance.toFixed(2)}`;
}

function displayUserTransactions() {
    userTransactionsList.innerHTML = '';
    if (transactions.length === 0) {
        userTransactionsList.innerHTML = '<li>No transactions yet</li>';
    } else {
        transactions.forEach(transaction => {
            const listItem = document.createElement('li');
            listItem.textContent = `${transaction.description}: ₹${transaction.amount.toFixed(2)} (${transaction.type})`;
            userTransactionsList.appendChild(listItem);
        });
    }
    updateUserBalance();
}

document.getElementById('userLogoutBtn').addEventListener('click', () => {
    window.location.href = 'index.html'; 
});

displayUserTransactions(); 
