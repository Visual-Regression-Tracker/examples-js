/// <reference types="cypress" />
/// <reference types="@visual-regression-tracker/agent-cypress/dist" />

before(() => {
  cy.vrtStart();
});

after(() => {
  cy.vrtStop();
});

context("Visual Regression Tracker", () => {
  beforeEach(() => {
    cy.visit("https://example.cypress.io/commands/viewport");
  });

  it("Whole page example", () => {
    cy.vrtTrack("Whole page");
  });

  it("Separate element example", () => {
    cy.get("#navbar").vrtTrack("Separate element1");
    cy.get("#navbar").vrtTrack("Separate element2", {
      retryLimit: 0,
    });
  });

  it("Additional options example", () => {
    cy.vrtTrack("With additional options", {
      os: "MacOS",
      device: "Cloud agent",
      diffTollerancePercent: 0,
      ignoreAreas: [
        {
          x: 10,
          y: 20,
          width: 100,
          height: 300,
        },
      ],
    });
  });
});
