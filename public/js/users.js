document.addEventListener('DOMContentLoaded', function() {
    const usersTableBody = document.getElementById('usersTableBody');
    const messageDiv = document.getElementById('message');
  
    async function loadUsers() {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
  
        if (data.success) {
          renderUsers(data.data);
        } else {
          showMessage(data.message, 'danger');
        }
      } catch (error) {
        console.error('Error:', error);
        showMessage('Gagal memuat data user.', 'danger');
      }
    }
  
    function renderUsers(users) {
      usersTableBody.innerHTML = users.map(user => `
        <tr>
          <td>${user.id}</td>
          <td>${user.nama}</td>
          <td>${user.username}</td>
          <td>${user.jurusan}</td>
          <td>${user.email}</td>
          <td>${new Date(user.createdAt).toLocaleString()}</td>
        </tr>
      `).join('');
    }
  
    function showMessage(message, type) {
      messageDiv.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
          ${message}
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;
    }
  
    // Load users ketika halaman dimuat
    loadUsers();
  });