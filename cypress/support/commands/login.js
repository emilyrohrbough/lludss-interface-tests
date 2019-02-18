Cypress.Commands.add('login', () => {
  cy.visit('/user/signin')

  cy.get('[data-target="#visitors"]').click()

  cy.get('#username').type('***REMOVED***')
  cy.get('#password').type('***REMOVED***')
  cy.get(':submit[value="Sign in with visitors card"]').click()
})
