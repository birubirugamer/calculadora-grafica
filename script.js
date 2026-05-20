const listaItens = document.getElementById("lista-itens");
const btnAdicionar = document.getElementById("adicionar-item");
const btnCalcular = document.getElementById("calcular");
const valorFinalEl = document.getElementById("valor-final");
const valorRealEl = document.getElementById("valor-real");

const produtos = [
  { nome: "Banner", preco: 80 },
  { nome: "Adesivo de vinil", preco: 80 },
  { nome: "MDF 3mm adesivado", preco: 130 },
  { nome: "MDF 6mm adesivado", preco: 190 },
  { nome: "PVC adesivado", preco: 230 }
];

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function arredondarParaCimaDe5Em5(valor) {
  if (valor <= 0) {
    return 0;
  }

  if (valor <= 20) {
    return 20;
  }

  if (valor === 20) {
    return 20;
  }

  if (valor % 5 === 0) {
    return valor + 5;
  }

  return Math.ceil(valor / 5) * 5;
}

function criarOptionsProdutos() {
  let options = "";

  produtos.forEach(produto => {
    const precoFormatado = produto.preco.toFixed(2).replace(".", ",");
    options += `<option value="${produto.preco}">${produto.nome} - R$ ${precoFormatado} o m²</option>`;
  });

  return options;
}

function atualizarNumeracaoItens() {
  const itens = document.querySelectorAll(".item");

  itens.forEach((item, index) => {
    const titulo = item.querySelector("h2");
    titulo.textContent = `Item ${index + 1}`;
    item.dataset.item = index + 1;
  });
}

function criarItem() {
  const item = document.createElement("div");
  item.classList.add("item");

  item.innerHTML = `
    <div class="item-header">
      <h2>Item</h2>
    </div>

    <div class="grid">
      <div class="campo">
        <label>Produto</label>
        <select class="produto">
          ${criarOptionsProdutos()}
        </select>
      </div>

      <div class="campo">
        <label>Largura em cm</label>
        <input type="number" class="largura" min="0" step="0.01" placeholder="Largura" />
      </div>

      <div class="campo">
        <label>Altura em cm</label>
        <input type="number" class="altura" min="0" step="0.01" placeholder="Altura" />
      </div>

      <div class="campo">
        <label>Quantidade</label>
        <input type="number" class="quantidade" min="1" step="1" value="1" />
      </div>
    </div>

    <button class="btn-remover" type="button">Remover item</button>
  `;

  listaItens.appendChild(item);
  atualizarNumeracaoItens();
}

function calcularOrcamento() {
  const itens = document.querySelectorAll(".item");
  let valorReal = 0;

  itens.forEach(item => {
    const produto = Number(item.querySelector(".produto").value);
    const largura = Number(item.querySelector(".largura").value);
    const altura = Number(item.querySelector(".altura").value);
    const quantidade = Number(item.querySelector(".quantidade").value);

    if (largura > 0 && altura > 0 && quantidade > 0) {
      const larguraMetros = largura / 100;
      const alturaMetros = altura / 100;
      const metroQuadrado = larguraMetros * alturaMetros;
      const valorItem = metroQuadrado * produto * quantidade;

      valorReal += valorItem;
    }
  });

  let valorFinal = arredondarParaCimaDe5Em5(valorReal);

  valorRealEl.textContent = formatarMoeda(valorReal);
  valorFinalEl.textContent = formatarMoeda(valorFinal);
}

btnAdicionar.addEventListener("click", () => {
  criarItem();
});

btnCalcular.addEventListener("click", () => {
  calcularOrcamento();
});

listaItens.addEventListener("click", event => {
  if (event.target.classList.contains("btn-remover")) {
    const itens = document.querySelectorAll(".item");

    if (itens.length > 1) {
      event.target.closest(".item").remove();
      atualizarNumeracaoItens();
      calcularOrcamento();
    }
  }
});

listaItens.addEventListener("input", () => {
  calcularOrcamento();
});

listaItens.addEventListener("change", () => {
  calcularOrcamento();
});

atualizarNumeracaoItens();
calcularOrcamento();
