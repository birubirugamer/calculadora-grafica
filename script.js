let ultimoOrcamento = "";

function formatarMoeda(valor) {
  return "R$ " + valor.toFixed(2).replace(".", ",");
}

function selecionarProduto() {
  let produto = document.getElementById("produto");
  let precoSelecionado = produto.value;

  if (precoSelecionado !== "") {
    document.getElementById("precoProduto").value = precoSelecionado;
  } else {
    document.getElementById("precoProduto").value = "";
  }
}

function atualizarPrecoProduto() {
  let produto = document.getElementById("produto");
  let precoProduto = Number(document.getElementById("precoProduto").value);

  for (let i = 0; i < produto.options.length; i++) {
    if (Number(produto.options[i].value) === precoProduto) {
      produto.selectedIndex = i;
      return;
    }
  }
}

function pegarNomeProduto() {
  let select = document.getElementById("produto");

  if (select.value === "") {
    return "Produto não informado";
  }

  return select.options[select.selectedIndex].dataset.nome;
}

function calcular() {
  let largura = Number(document.getElementById("largura").value);
  let altura = Number(document.getElementById("altura").value);
  let precoProduto = Number(document.getElementById("precoProduto").value);
  let quantidade = Number(document.getElementById("quantidade").value);

  if (largura <= 0 || altura <= 0 || precoProduto <= 0 || quantidade <= 0) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  let area = largura * altura;
  let totalReal = area * precoProduto * quantidade;

  let totalFinal = totalReal;

  if (totalFinal < 20) {
    totalFinal = 20;
  }

  if (totalFinal === 20) {
    totalFinal = 20;
  } else if (totalFinal % 5 === 0) {
    totalFinal = totalFinal + 5;
  } else {
    totalFinal = Math.ceil(totalFinal / 5) * 5;
  }

  document.getElementById("resultado").innerText =
    "Resultado: " + formatarMoeda(totalFinal);

  document.getElementById("resultadoReal").innerText =
    "Valor real: " + formatarMoeda(totalReal);

  ultimoOrcamento =
`Orçamento Máxima

Produto: ${pegarNomeProduto()}
Preço do produto: ${formatarMoeda(precoProduto)}
Medida: ${largura}m x ${altura}m
Área: ${area.toFixed(2).replace(".", ",")} m²
Quantidade: ${quantidade}
Valor final: ${formatarMoeda(totalFinal)}`;
}

function copiarOrcamento() {
  if (ultimoOrcamento === "") {
    alert("Calcule um orçamento primeiro.");
    return;
  }

  navigator.clipboard.writeText(ultimoOrcamento);

  alert("Orçamento copiado!");
}
