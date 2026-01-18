function cadastrar() {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  if (!nome || !email || !senha) {
    alert("Preencha todos os campos");
    return;
  }

  const fotografo = { nome, email, senha };
  localStorage.setItem("fotografo", JSON.stringify(fotografo));

  alert("Conta criada com sucesso!");
  window.location.href = "login.html";
}

function login() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const fotografo = JSON.parse(localStorage.getItem("fotografo"));

  if (!fotografo || fotografo.email !== email || fotografo.senha !== senha) {
    alert("Email ou senha inválidos");
    return;
  }

  localStorage.setItem("fotografoLogado", JSON.stringify(fotografo));
  window.location.href = "dashboard.html";
}

function logout() {
  localStorage.removeItem("fotografoLogado");
  window.location.href = "login.html";
}
