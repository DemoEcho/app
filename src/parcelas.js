// Dados sintéticos de demonstração.
/** Divide o total (centavos) em n parcelas. */
export function parcelas(totalCentavos, n) {
  if (!Number.isInteger(n) || n <= 0) {
    throw new RangeError("n deve ser um inteiro positivo");
  }
  if (!Number.isInteger(totalCentavos) || totalCentavos < 0) {
    throw new RangeError("totalCentavos deve ser um inteiro não negativo");
  }
  const base = Math.floor(totalCentavos / n);
  const resto = totalCentavos % n;
  return Array.from({ length: n }, (_, i) => base + (i < resto ? 1 : 0));
}
