import { test } from "node:test";
import assert from "node:assert/strict";
import { totalCentavos } from "../src/pedido.js";

test("soma preço vezes quantidade", () => {
  assert.equal(totalCentavos([{ precoCentavos: 1000, quantidade: 2 }, { precoCentavos: 250, quantidade: 1 }]), 2250);
});

test("pedido vazio dá zero", () => {
  assert.equal(totalCentavos([]), 0);
});
