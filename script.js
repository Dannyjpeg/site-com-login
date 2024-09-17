document.getElementById('loginForm')?.addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (result.success) {
            alert('Login bem-sucedido!');
            window.location.href = 'pagina-principal.html'; // Redireciona para página após login
        } else {
            document.getElementById('error-message').textContent = result.message;
        }
    } catch (error) {
        document.getElementById('error-message').textContent = 'Erro ao fazer login.';
    }
});

document.getElementById('registerForm')?.addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (result.success) {
            document.getElementById('register-message').textContent = 'Conta criada com sucesso!';
        } else {
            document.getElementById('register-message').textContent = result.message;
        }
    } catch (error) {
        document.getElementById('register-message').textContent = 'Erro ao registrar a conta.';
    }
});
