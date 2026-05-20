let contadorItens = 1;

function adicionarItem() {
  contadorItens++;

  const container = document.getElementById("itens");

  const item = document.createElement("div");
  item.classList.add("item-orcamento");

  item.innerHTML = `
    <div class="cabecalho-item">
      <h3>Item ${contadorItens}</h3>
      <button type="button" class="btn-remover" onclick="removerItem(this)">
        Remover
      </button>
    </div>

    <div class="campos">
      <div class="campo">
        <label>Largura em metros</label>
        <input 
          type="number" 
          class="largura" 
          min="0" 
          step="0.01" 
          oninput="calcularTotal()"
        >
      </div>

      <div class="campo">
        <label>Altura em metros</label>
        <input 
          type="number" 
          class="altura" 
          min="0" 
          step="0.01" 
          oninput="calcularTotal()"
        >
      </div>

      <div class="campo">
        <label>Quantidade</label>
        <input 
          type="number" 
          class="quantidade" 
          value="1" 
          min="1" 
          step="1" 
          oninput="calcularTotal()"
        >
      </div>
    </div>

    <div class="resultado-item">
      <p>Valor real: <strong class="valor-real-item">R$ 0,00</strong></p>
      <p>Valor final: <strong class="valor-final-item">R$ 0,00</strong></p>
    </div>
  `;

  container.appendChild(item);
  calcularTotal();
}

function removerItem(botao) {
  const item = botao.closest(".item-orcamento");
  item.remove();

  calcularTotal();
}

function calcularTotal() {
  const precoProduto = parseFloat(document.getElementById("precoProduto").value) || 0;
  const itens = document.querySelectorAll(".item-orcamento");

  let totalGeral = 0;
  let totalReal = 0;

  itens.forEach(item => {
    const largura = parseFloat(item.querySelector(".largura").value) || 0;
    const altura = parseFloat(item.querySelector(".altura").value) || 0;
    const quantidade = parseInt(item.querySelector(".quantidade").value) || 1;

    const area = largura * altura;
    const valorReal = area * precoProduto * quantidade;
    const valorFinal = arredondarValor(valorReal);

    totalReal += valorReal;
    totalGeral += valorFinal;

    item.querySelector(".valor-real-item").textContent = formatarMoeda(valorReal);
    item.querySelector(".valor-final-item").textContent = formatarMoeda(valorFinal);
  });

  document.getElementById("totalReal").textContent = formatarMoeda(totalReal);
  document.getElementById("totalGeral").textContent = formatarMoeda(totalGeral);
}

function arredondarValor(valor) {
  if (valor <= 0) {
    return 0;
  }

  if (valor <= 20) {
    return 20;
  }

  let arredondado = Math.ceil(valor / 5) * 5;

  if (valor % 5 === 0) {
    arredondado += 5;
  }

  return arredondado;
}

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}
