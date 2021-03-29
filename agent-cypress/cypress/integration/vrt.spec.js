describe("Test", () => {

const viewports = {
    
    "desktop": {"viewportWidth": 1920, "viewportHeight": 1080}
}

var target_paths

before(() => {
    cy.vrtStart()
    cy.fixture('vrt-page-path.json').then((paths) => {
       target_paths = paths
    })
});
  
after(() => {
    cy.vrtStop()
});

context("Visual Regression Tracker", () => {

    Object.keys(viewports).forEach((viewport) => {
       it(`VRT Test for ${viewport}`, function() {
          cy.wrap(Object.keys(target_paths)).each(function(page) {
                cy.viewport(viewports[viewport].viewportWidth, viewports[viewport].viewportHeight)
                cy.log(Cypress.config("viewportHeight"))
                cy.visit(target_paths[page])
                cy.vrtTrack(`${page}-${viewport}`, {
                    viewport: viewports[viewport].viewportWidth + "x" + viewports[viewport].viewportHeight
                })
            })
        })
   })
})
})