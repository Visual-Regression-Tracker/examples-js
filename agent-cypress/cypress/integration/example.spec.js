context('Visual Regression Tracker', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/viewport')
  })

  it('Whole page example', () => {
    cy.track('Whole page')
  })

  it('Separate element example', () => {
    cy.get('#navbar').track('Separate element')
  })

  it('Additional options example', () => {
    cy.track("With additional options", {
      os: "MacOS",
      device: "Cloud agent",
      diffTollerancePercent: 0,
    })
  })
})
