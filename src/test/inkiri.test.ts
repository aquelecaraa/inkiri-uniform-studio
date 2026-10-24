import { describe, it, expect } from "vitest";
import { getTier, MIN_ORDER, isPriorityDate } from "@/lib/inkiri";
describe("regras de pedido", () => {
  it("pedido mínimo é 10", () => expect(MIN_ORDER).toBe(10));
  it("abaixo de 10 sem faixa", () => expect(getTier(9)).toBeNull());
  it("10-29 Express", () => { expect(getTier(10)?.id).toBe("express"); expect(getTier(29)?.id).toBe("express"); });
  it("30-99 Empresarial", () => { expect(getTier(30)?.id).toBe("empresarial"); expect(getTier(99)?.id).toBe("empresarial"); });
  it("100+ Atacado", () => expect(getTier(100)?.id).toBe("atacado"));
  it("data em 2 dias é prioridade", () => expect(isPriorityDate("2026-10-26", new Date("2026-10-24T12:00"))).toBe(true));
  it("data em 10 dias não é prioridade", () => expect(isPriorityDate("2026-11-03", new Date("2026-10-24T12:00"))).toBe(false));
});
