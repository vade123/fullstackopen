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

  describe.only('when logged in', function() {
    beforeEach(function() {
      cy.login({ username:'testi', password:'salasana' });
    });
    it('A blog can be created', function() {
      cy.contains('new blog').click();
      cy.get('#title').type('testipenan bloki');
      cy.get('#author').type('pertti');
      cy.get('#url').type('facebook.com');
      cy.get('#submit-button').click();

      cy.contains('testipenan bloki');
      cy.contains('pertti');
    });

    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'testipenan bloki',
          author: 'pertti',
          url: 'facebook.com'
        });
      });

      it('it can be liked', function() {
        cy.contains('view').click();
        cy.get('#like-button').click();
        cy.contains('likes:1');
      });
      it('can be removed', function() {
        cy.contains('view').click();
        cy.contains('delete blog').click();
        cy.get('html').should('not.contain', 'testipenan bloki');
      });
    });

    describe('and multiple blogs exist', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'testipenan bloki',
          author: 'pertti',
          url: 'facebook.com'
        });
        cy.createBlog({
          title: 'testipenan bloki 2',
          author: 'pertti',
          url: 'facebook.com'
        });
      });
      it('most likes is on top', function() {
        cy.contains('testipenan bloki 2')
          .contains('view')
          .click();
        cy.contains('like').click();

        cy.get('.blog')
          .then(blogs => {
            cy.wrap(blogs[1]).contains('likes:1');
          });
      });
    });
  });
});