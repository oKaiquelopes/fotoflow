const user = JSON.parse(localStorage.getItem("fotografoLogado"));
if (!user) window.location.href = "login.html";

document.getElementById("welcome").innerText =
  `Olá, ${user.nome}. 
  Bem-vindo ao FotoFlow!`;

let ensaios = JSON.parse(localStorage.getItem("ensaios")) || [];

function renderEnsaios() {
  const lista = document.getElementById("listaEnsaios");
  lista.innerHTML = "";

  ensaios.forEach((ensaio, index) => {
    const div = document.createElement("div");
    div.className = "ensaio";

    div.innerHTML = `
      <h4>${ensaio.titulo}</h4>

      <label class="toggle">
        <input type="checkbox" ${ensaio.status === "liberado" ? "checked" : ""} 
          onchange="toggleStatus(${index})">
        <span></span>
      </label>

      <p>${ensaio.descricao || ""}</p>

      <div class="actions">
        <button onclick="editarEnsaio(${index})">Editar</button>
        <button onclick="deletarEnsaio(${index})" class="danger">Excluir</button>
      </div>
    `;

    lista.appendChild(div);
  });
}


function abrirModal() {
  document.getElementById("modal").style.display = "flex";
}

function fecharModal() {
  document.getElementById("modal").style.display = "none";
}

function criarEnsaio() {
  const titulo = document.getElementById("tituloEnsaio").value;
  const descricao = document.getElementById("descricaoEnsaio").value;

  if (!titulo) {
    alert("Informe o nome do ensaio");
    return;
  }

  ensaios.push({
  titulo,
  descricao,
  status: "bloqueado",
  fotos: []
});


  localStorage.setItem("ensaios", JSON.stringify(ensaios));

  fecharModal();
  renderEnsaios();
}

renderEnsaios();



const perfil = JSON.parse(localStorage.getItem("perfil")) || {};

document.getElementById("nomePerfil").value = perfil.nome || user.nome;
document.getElementById("bioPerfil").value = perfil.bio || "";

if (perfil.foto) {
  document.getElementById("fotoPerfil").src = perfil.foto;
}

document.getElementById("uploadFoto").addEventListener("change", function () {
  const file = this.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    document.getElementById("fotoPerfil").src = reader.result;
    perfil.foto = reader.result;
  };

  if (file) reader.readAsDataURL(file);
});

function salvarPerfil() {
  perfil.nome = document.getElementById("nomePerfil").value;
  perfil.bio = document.getElementById("bioPerfil").value;

  localStorage.setItem("perfil", JSON.stringify(perfil));
  document.getElementById("welcome").innerText = `Olá, ${perfil.nome}`;
  alert("Perfil atualizado!");
}





function toggleStatus(index) {
  ensaios[index].status =
    ensaios[index].status === "liberado" ? "bloqueado" : "liberado";

  localStorage.setItem("ensaios", JSON.stringify(ensaios));
}

function deletarEnsaio(index) {
  if (confirm("Excluir este ensaio?")) {
    ensaios.splice(index, 1);
    localStorage.setItem("ensaios", JSON.stringify(ensaios));
    renderEnsaios();
  }
}




function uploadFotos(event, index) {
  const files = event.target.files;

  Array.from(files).forEach(file => {
    const reader = new FileReader();
    reader.onload = () => {
      ensaios[index].fotos.push(reader.result);
      localStorage.setItem("ensaios", JSON.stringify(ensaios));
    };
    reader.readAsDataURL(file);
  });
}
