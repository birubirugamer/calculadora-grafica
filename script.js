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
    "Resultado: R$ " + totalFinal.toFixed(2).replace(".", ",");

  document.getElementById("resultadoReal").innerText =
    "Valor real: R$ " + totalReal.toFixed(2).replace(".", ",");
}