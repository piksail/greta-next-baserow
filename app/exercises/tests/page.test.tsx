import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "./page";

test("Vérifie que la page rende bien un h1 et un retour vers la page d'accueil", () => {
  render(<Page />);

  // Approche "humaine/utilisateur"
  expect(
    screen.getByRole("heading", { level: 1, name: "Exo : tests" }),
  ).toBeDefined();
  expect(screen.getByRole("link", { name: "Aller à l'accueil" })).toBeDefined();

  // Approche "technique"
  expect(screen.getByTestId("mainHeading")).toBeDefined();
  expect(screen.getByTestId("backToHome")).toBeDefined();
});
