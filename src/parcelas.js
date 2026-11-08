// Dados sintéticos de demonstração.
/** Divide o total (centavos) em n parcelas. */
export function parcelas(totalCentavos, n) {
  const valor = Math.floor(totalCentavos / n);
  return Array.from({ length: n }, () => valor);
}
