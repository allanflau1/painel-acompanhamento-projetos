const projetos = [
  {
    nome: "Projeto Alfa",
    descricao: "Implantação inicial de uma solução de acompanhamento.",
    status: "Planejamento",
    progresso: 25
  },
  {
    nome: "Projeto Beta",
    descricao: "Desenvolvimento das principais funcionalidades do sistema.",
    status: "Em andamento",
    progresso: 60
  },
  {
    nome: "Projeto Gama",
    descricao: "Projeto finalizado e validado para demonstração.",
    status: "Concluído",
    progresso: 100
  },
  {
    nome: "Projeto Delta",
    descricao: "Ajustes de interface e organização das informações.",
    status: "Em andamento",
    progresso: 75
  }
];

const listaProjetos = document.getElementById("listaProjetos");
const filtroStatus = document.getElementById("filtroStatus");
const btnOrdenar = document.getElementById("btnOrdenar");

let ordemCrescente = false;

function classeStatus(status) {
  if (status === "Planejamento") return "status-planejamento";
  if (status === "Em andamento") return "status-andamento";
  return "status-concluido";
}

function atualizarResumo() {
  const total = projetos.length;
  const andamento = projetos.filter(p => p.status === "Em andamento").length;
  const concluidos = projetos.filter(p => p.status === "Concluído").length;
  const media = Math.round(
    projetos.reduce((soma, projeto) => soma + projeto.progresso, 0) / total
  );

  document.getElementById("totalProjetos").textContent = total;
  document.getElementById("projetosAndamento").textContent = andamento;
  document.getElementById("projetosConcluidos").textContent = concluidos;
  document.getElementById("avancoMedio").textContent = `${media}%`;
}

function renderizarProjetos() {
  const statusSelecionado = filtroStatus.value;

  let projetosExibidos = projetos.filter(projeto => {
    return statusSelecionado === "todos" || projeto.status === statusSelecionado;
  });

  projetosExibidos = [...projetosExibidos].sort((a, b) => {
    return ordemCrescente
      ? a.progresso - b.progresso
      : b.progresso - a.progresso;
  });

  listaProjetos.innerHTML = "";

  if (projetosExibidos.length === 0) {
    listaProjetos.innerHTML =
      '<div class="mensagem-vazia">Nenhum projeto encontrado para o filtro selecionado.</div>';
    return;
  }

  projetosExibidos.forEach(projeto => {
    const card = document.createElement("article");
    card.className = "projeto-card";

    card.innerHTML = `
      <h3>${projeto.nome}</h3>
      <p>${projeto.descricao}</p>
      <span class="status ${classeStatus(projeto.status)}">${projeto.status}</span>
      <div class="barra" aria-label="Progresso do projeto">
        <div class="barra-preenchimento" style="width: ${projeto.progresso}%"></div>
      </div>
      <div class="progresso-texto">Avanço: ${projeto.progresso}%</div>
    `;

    listaProjetos.appendChild(card);
  });
}

filtroStatus.addEventListener("change", renderizarProjetos);

btnOrdenar.addEventListener("click", () => {
  ordemCrescente = !ordemCrescente;
  btnOrdenar.textContent = ordemCrescente
    ? "Ordenar do maior para o menor"
    : "Ordenar do menor para o maior";

  renderizarProjetos();
});

atualizarResumo();
renderizarProjetos();
