describe('Note app', function() {

    beforeEach(function() {
        cy.request('POST','http://localhost:3002/api/testing/reset')
        const user = {
            name: 'Drine Kim',
            username:'drine',
            password: 'ymt722015'
        }
        cy.request('POST','http://localhost:3002/api/users',user)
        cy.visit('http://localhost:3000')
    })

    // it('front page can be opened', function() {
    //   cy.contains('Notes')
    //   cy.contains('Note app, Department of Computer Science, University of Helsinki 2021')
    // })

    // it('login form can be opened', function() {
    //     cy.contains('login').click()
    // })

    it('login fails with wrong password', function() {
        cy.contains('login').click()
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()
    
        //cy.get('.errormsg_error').contains('wrong credentials')
        cy.get('.errormsg_error').should('contain', 'wrong credentials') 
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

        cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
      })

    it('user can login', function () {
        cy.contains('login').click()
        cy.get('#username').type('drine')
        cy.get('#password').type('ymt722015')
        cy.get('#login-button').click()

        cy.contains('drine logged in')
    })  


    describe('when logged in', function() {
        beforeEach( function() {
            cy.login({username: 'drine',password:'ymt722015'})
        })

        it('a new note can be created', function() {
            cy.contains('new note').click()
    
            cy.get('input').type('a note created by cypress')
            cy.contains('Add').click()
            cy.contains('a note created by cypress')
        })

        describe('and several notes exist', function() {
            beforeEach( function() {
                cy.createNote({content: 'first note',important: false})
                cy.createNote({content: 'second note',important: false})
                cy.createNote({content: 'third note',important: false})
            })

            it('one of those can be made important', function() {
                cy.contains('second note')
                  .contains('make important')
                  .click()

                cy.contains('second note')
                  .contains('make no important')
                // cy.contains('second note').parent().find('button').as('theButton')
                // cy.get('@theButton').click({ multiple: true })
                // cy.get('@theButton').should('contain', 'make no important')
            })


        })
    })

  })