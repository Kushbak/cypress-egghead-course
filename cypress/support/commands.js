// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

const _ = require('lodash')

Cypress.Commands.add("store", (stateName = '') => {
  let log = Cypress.log({ name: 'store' })

  const cb = (state) => {
    log.set({
      message: JSON.stringify(state),
      consoleProps: () => state
    })

    return state
  }

  return cy.window({ log: false })
    .then($window => $window.store?.getState())
    .then(state => {
      if(stateName.length > 0) {
        return cy.wrap(state, { log: false })
          .its(stateName)
          .then(cb)
      } else {
        return cy.wrap(state, { log:false })
          .then(cb)
      }
      
    })
  // .its('store').invoke('getState')
})

let loMethods = _.functions(_).map(fn => `lo_${fn}`)

loMethods.forEach((loFn) => {
  let loName = loFn.replace(/lo_/, '')

  Cypress.Commands.add(loFn, { prevSubject: true }, (subject, fn, ...arr) => {
    const result = _[loName](subject, fn, ...arr)
    Cypress.log({  
      message: JSON.stringify(result),
      name: loName,
      consoleProps: () => result
    })
    return result
  })
})


