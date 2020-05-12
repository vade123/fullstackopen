describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Testi Käyttäjä',
      username: 'testi',
      password: 'salasana'
    };
    cy.request('POST', 'http://localhost:3003/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('Login from is shown', function() {
    cy.contains('log in to application');
    cy.contains('username');
    cy.contains('password');
  });

  describe('login', function() {
    it('succeeds with valid credentials', function() {
      cy.get('#username').type('testi');
      cy.get('#password').type('salasana');
      cy.get('#login-button').click();

      cy.contains('Testi Käyttäjä logged in');
    });
    it('fails with wrong credentials', function() {
      cy.get('#username').type('testi');
      cy.get('#password').type('salasana123');
      cy.get('#login-button').click();

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)');

      cy.get('html').should('not.contain', 'Testi Käyttäjä logged in');
    });
  });
});