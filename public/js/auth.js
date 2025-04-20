document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const messageDiv = document.getElementById('message');
  
    if (registerForm) {
      registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const nama = document.getElementById('nama').value;
        const username = document.getElementById('username').value;
        const jurusan = document.getElementById('jurusan').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
  
        try {
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nama, username, jurusan, email, password })
          });
  
          const data = await response.json();
  
          if (data.success) {
            showMessage('Registrasi berhasil! Silakan login.', 'success');
            registerForm.reset();
          } else {
            showMessage(data.message, 'danger');
          }
        } catch (error) {
          console.error('Error:', error);
          showMessage('Terjadi kesalahan saat registrasi.', 'danger');
        }
      });
    }
  
    function showMessage(message, type) {
      messageDiv.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
          ${message}
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;
    }
  });