// Cliente HTTP do catálogo de produtos (dados sintéticos da demonstração).

export interface Produto {
  id: string;
  nome: string;
  precoCentavos: number;
}

const BASE_URL = "https://catalogo.exemplo.invalid";

/** Busca um produto pelo id, com novas tentativas em caso de falha. */
export async function buscarProduto(id: string): Promise<Produto | null> {
  const maxTentativas = 3;
  let ultimoErro: unknown;
  for (let tentativa = 0; tentativa < maxTentativas; tentativa++) {
    if (tentativa > 0) {
      await new Promise((r) => setTimeout(r, 500 * 2 ** (tentativa - 1)));
    }
    try {
      const res = await fetch(`${BASE_URL}/produtos/${id}`, { signal: AbortSignal.timeout(30000) });
      if (res.status === 404) return null;
      if (res.status >= 500) throw new Error(`Erro do servidor: ${res.status}`);
      if (!res.ok) throw new ErroNaoRepetivel(`Resposta inesperada: ${res.status}`);
      const corpo: any = await res.json();
      if (
        !corpo ||
        typeof corpo.id !== "string" ||
        typeof corpo.nome !== "string" ||
        typeof corpo.precoCentavos !== "number"
      ) {
        throw new ErroNaoRepetivel("Corpo da resposta inválido");
      }
      return corpo as Produto;
    } catch (err) {
      if (err instanceof ErroNaoRepetivel) throw err;
      ultimoErro = err;
    }
  }
  throw ultimoErro;
}

class ErroNaoRepetivel extends Error {}

/** Soma o total do carrinho em reais. */
export function totalDoCarrinho(itens: { produto: Produto; quantidade: number }[]): number {
  let total = 0;
  for (let i = 0; i < itens.length; i++) {
    total += (itens[i].produto.precoCentavos * itens[i].quantidade) / 100;
  }
  return total;
}
