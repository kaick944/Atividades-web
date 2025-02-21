document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('loginForm').addEventListener('submit', function(event) {
      event.preventDefault(); // Impede o envio padrão do formulário

      console.log('Formulário enviado');

      let formData = new FormData(this);

      fetch('login.php', {
          method: 'POST',
          body: formData
      })
      .then(response => {
          console.log('Resposta recebida do servidor');
          return response.json();
      })
      .then(data => {
          let messageDiv = document.getElementById('message');
          if (messageDiv) {
              console.log('Dados recebidos:', data);
              messageDiv.textContent = data.message;
              if (data.success) {
                  alert('Logado com sucesso!');
              } else {
                  alert('Login mal-sucedido! ' );
              }
              location.reload();
          } else {
              console.error('Erro:', data);
          }
      })
      .catch(error => {
          let messageDiv = document.getElementById('message');
          if (messageDiv) {
              messageDiv.textContent = 'Erro: ' + error;
              messageDiv.style.color = 'red';
          } else {
              console.error('Erro:', error);
          }
      });
  });
});
