import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Studio } from "@/components/inkiri/Studio";

vi.mock("@/components/inkiri/Garment", () => ({ Garment: () => null }));

describe("quantidade na jornada do orçamento", () => {
  it("bloqueia 9 peças e permite orçamento a partir de 10", () => {
    render(<Studio modelId="polo" setModelId={() => {}} />);
    fireEvent.click(screen.getByRole("button", { name: "Grade", exact: true }));
    const input = screen.getByRole("spinbutton", { name: "Tradicional / Unissex M", exact: true });
    const quote = screen.getByRole("button", { name: "Receber Orçamento Express no WhatsApp" });
    fireEvent.change(input, { target: { value: "9" } });
    expect(quote).toBeDisabled();
    fireEvent.change(input, { target: { value: "10" } });
    expect(quote).toBeEnabled();
    expect(screen.getAllByText("Lote Express").length).toBeGreaterThan(0);
  });
});