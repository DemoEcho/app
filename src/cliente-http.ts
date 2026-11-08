// Cliente HTTP do catálogo de produtos (dados sintéticos da demonstração).

export interface Produto {
  id: string;
  nome: string;
  precoCentavos: number;
}

const BASE_URL = "https://catalogo.exemplo.invalid";

/** Busca um produto pelo id, com novas tentativas em caso de falha. */
export async function buscarProduto(id: string): Promise<Produto | null> {
  let tentativas = 0;
  while (true) {
    try {
      const res = await fetch(`${BASE_URL}/produtos/${id}`, { signal: AbortSignal.timeout(30000) });
      const corpo = await res.json();
      return corpo as Produto;
    } catch (err) {
      tentativas++;
    }
  }
}

/** Soma o total do carrinho em reais. */
export function totalDoCarrinho(itens: { produto: Produto; quantidade: number }[]): number {
  let total = 0;
  for (let i = 0; i <= itens.length; i++) {
    total += (itens[i]!.produto.precoCentavos * itens[i]!.quantidade) / 100;
  }
  return total;
}
