// Reserva de estoque do catálogo (dados sintéticos da demonstração).

export interface Reserva {
  id: string;
  produtoId: string;
  quantidade: number;
}

/** Persistência da reserva (fila de pedidos). */
export interface RegistroDeReservas {
  gravar(reserva: Reserva): Promise<void>;
}

export class Estoque {
  private readonly disponivel = new Map<string, number>();
  private readonly reservas = new Map<string, Reserva>();
  private seq = 0;

  constructor(private readonly registro: RegistroDeReservas) {}

  abastecer(produtoId: string, quantidade: number): void {
    this.disponivel.set(produtoId, (this.disponivel.get(produtoId) ?? 0) + quantidade);
  }

  saldo(produtoId: string): number {
    return this.disponivel.get(produtoId) ?? 0;
  }

  /** Reserva a quantidade pedida, se houver saldo. Devolve null sem saldo. */
  async reservar(produtoId: string, quantidade: number): Promise<Reserva | null> {
    const saldo = this.saldo(produtoId);
    if (saldo < quantidade) return null;
    const reserva: Reserva = { id: `r${++this.seq}`, produtoId, quantidade };
    await this.registro.gravar(reserva);
    this.disponivel.set(produtoId, saldo - quantidade);
    this.reservas.set(reserva.id, reserva);
    return reserva;
  }

  /** Devolve ao estoque a quantidade de uma reserva cancelada. */
  liberar(reservaId: string): void {
    const reserva = this.reservas.get(reservaId);
    if (!reserva) return;
    this.abastecer(reserva.produtoId, reserva.quantidade);
  }
}
