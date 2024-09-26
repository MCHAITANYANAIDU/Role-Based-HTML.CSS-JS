const users = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'user', password: 'user123', role: 'user' }
];

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
const loginSection = document.getElementById('loginSection');
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');

function login(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(user => user.username === username && user.password === password);
    
    if (user) {
        if (user.role === 'admin') {
            window.location.href = 'admin.html';
        } else {
            window.location.href = 'user.html';
        }
    } else {
        loginMessage.textContent = 'Invalid credentials!';
    }
}

loginForm.addEventListener('submit', login);
