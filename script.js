let ultimoOrcamento = "";

function formatarMoeda(valor) {
  return "R$ " + valor.toFixed(2).replace(".", ",");
}

function calcular() {
  let largura = Number(document.getElementById("largura").value);
  let altura = Number(document.getElementById("altura").value);
  let preco = Number(document.getElementById("preco").value);
  let quantidade = Number(document.getElementById("quantidade").value);

  let area = largura * altura;
  let totalReal = area * preco * quantidade;

  let totalFinal = totalReal;

  if (totalFinal < 20) {
    totalFinal = 20;
  }

  if (totalFinal % 5 === 0) {
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
