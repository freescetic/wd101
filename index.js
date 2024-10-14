document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const dob = document.getElementById('dob').value;
    const password = document.getElementById('password').value;
    const acceptedTerms = document.getElementById('terms').checked;

    if (!validateEmail(email)) {
        alert('Invalid email address!');
        return;
    }

    const entry = { name, email, dob, password, acceptedTerms };
    let entries = JSON.parse(sessionStorage.getItem('entries')) || [];
    entries.push(entry);
    sessionStorage.setItem('entries', JSON.stringify(entries));

    this.reset();

    updateEntriesTable();
});

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
}

function updateEntriesTable() {
    const entries = JSON.parse(sessionStorage.getItem('entries')) || [];
    const tbody = document.querySelector('#entriesTable tbody');
    tbody.innerHTML = '';

    entries.forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.name}</td>
            <td>${entry.email}</td>
            <td>${entry.dob}</td>
            <td>${entry.password}</td>
            <td>${entry.acceptedTerms ? 'true' : 'false'}</td>
        `;
        tbody.appendChild(row);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    updateEntriesTable();
});
