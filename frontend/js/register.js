const registerForm = document.getElementById('registerForm');
registerForm?.addEventListener('submit', function(e){
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    let users = JSON.parse(localStorage.getItem('users') || '[]');
    if(users.find(u => u.email === email)){
        alert('Email already registered');
        return;
    }

    const newUser = { name, email, password, role: 'user' }; // Default role = user
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful!');
    window.location.href = 'login.html';
});
