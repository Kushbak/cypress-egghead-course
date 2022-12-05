/// <reference types="Cypress" />

describe('01 Todo', () => {

  beforeEach(function () {
    cy.fixture('todos/all.json').as('todosPreload')
  })

  it('loads the page', () => {
    // ! getting mock data from fixtures for other describes too

    cy.visit('/')
    cy.visit('/')
    // ! mocking data
    cy.intercept('api/todos', [
      {
        "text": "Hello world",
        "completed": false,
        "id": 3
      },
      {
        "id": 4,
        "completed": false,
        "text": "Goodnight moon"
      },
      {
        "text": "asdasd",
        "completed": false,
        "id": 5
      }
    ]).as('preload') // alias

    // ! just testing 
    // cy.get('.new-todo')
    //   .type('Hello World!')
    //   .type('{enter}')


    // cy.get('.new-todo')
    //   .type('Good night moon')
    //   .type('{enter}')

    // cy.get('.todo-list li:nth-child(2)')
    //   .find('.toggle').check()

    // cy.get('.todo-list li:nth-child(1)')
    //   .should('have.text', 'Hello World!')
    //   .should('not.have.class', 'completed')
    //   .find('.toggle')
    //   .should('not.be.checked')

    // cy.get('.todo-list li:nth-child(2)')
    //   .should('have.text', 'Good night moon')
    //   .should('have.class', 'completed')
    //   .find('.toggle')
    //   .should('be.checked')
  })
  // it('create new todos from fixtures', () => {
  //   cy.intercept('api/todos', '@todosPreload').as('preload') // alias
  //   cy.visit('/')

  //   cy.wait('@preload')
  // })
  it('testing store data', () => {
    // ! getting data from store in window
    // cy.window().then($window => console.log($window.store))
    // cy.store('todos').should('deep.equal', {
    //   todos: [
    //     {
    //       "text": "Hello world",
    //       "completed": false,
    //       "id": 3
    //     },
    //     {
    //       "id": 4,
    //       "completed": false,
    //       "text": "Goodnight moon"
    //     },
    //     {
    //       "text": "asdasd",
    //       "completed": false,
    //       "id": 5
    //     }
    //   ],
    //   visibilityFilter: 'show_all'
    // })

    // ! custom commands from support/commands file 
    // cy.store('todos').lo_filter(todo => { todo.id === 1 }).should('deep.equal', [
    //   {
    //     id: 1,
    //     text: 'first todo',
    //     completed: false
    //   }
    // ])

    // cy.store('todos')
    //   .lo_find(todo => todo.id === 1)
    //   .lo_pick('text')
    //   .should('deep.equal', {
    //     text: '1st todo'
    //   })
    // cy.wait('@preload')
  })
  // context
  context.only('Todo creation retries', function () {
    this.beforeEach(() => {
      cy.server()

      cy.intercept('/api/todos', '@todos').as('preload')

      cy.visit('/')
      cy.wait('@preload')
    })
    it('retries 3 times', () => {

    }) 

    it('fails after 3 unsuccesful attempts', () => {

    })
  })
})
