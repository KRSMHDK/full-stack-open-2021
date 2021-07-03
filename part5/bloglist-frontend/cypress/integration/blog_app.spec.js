describe('Blog App', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000/');
  });
  it('front page can be opened', function () {
    cy.contains('blogs');
  });

  it('user can login', function () {
    cy.contains('log in').click();
    cy.get('#username').type('12345');
    cy.get('#password').type('12345');
    cy.get('#login-button').click();

    cy.contains('Superuser logged-in');
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('log in').click();
      cy.get('#username').type('12345');
      cy.get('#password').type('12345');
      cy.get('#login-button').click();
    });

    it('a new blog can be created', function () {
      cy.contains('new blog').click();
      cy.get('#title').type('leo');
      cy.get('#author').type('leo2');
      cy.get('#url').type('www.0leo.com');
      cy.contains('create').click();
    });
  });
});
