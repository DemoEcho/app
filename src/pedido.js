// Dados sintéticos de demonstração.
/** Total do pedido em centavos. */
export function totalCentavos(itens) {
  return itens.reduce((soma, i) => soma + i.precoCentavos * i.quantidade, 0);
}
