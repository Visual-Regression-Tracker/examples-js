describe("Visual test", () => {
  before(() => {
    cy.vrtStart();
  });

  after(() => {
    cy.vrtStop();
  });

  it("tracks the page, an element and a fixture", () => {
    cy.visit("/");

    cy.vrtTrack("Home page");

    cy.get("h1.heading").vrtTrack("Heading");

    cy.fixture("test.png").then((logo) => {
      cy.vrtTrackBase64("Fixture image", logo);
    });
  });
});
