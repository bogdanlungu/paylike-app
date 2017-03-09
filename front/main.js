const mainLoop = require("main-loop")
const h = require('virtual-dom/h')
const diff = require('virtual-dom/diff')
const patch = require('virtual-dom/patch')
const createElement = require('virtual-dom/create-element')
const request = require('request')
const EventListener = require('vdom-event-listener')


const searchAPI = require('./js/searchAPI')
// const render = require('./js/render')

/*** State objects
****/
let initState = { results: ['Type something'], keyword: '' }
let state = {
  currentPage: 'search',
  startEdit: false,
  merchantToEdit: {}
}


/*** Render function vdom
****/

function render(state) {

  const renderResult = (result) => {
    if (result.id) {
      return h('li', [
        h('span', result.name),
        h('a', {
          href: '#',
          className: 'edit-link',
          dataset: { 'id': result.id },
          listeningHook: new EventListener(edit, 'click')
        }, 'Edit'),
      ])
    } else {
      return h('li', [
        h('span', result)
      ])
    }
  }

  return h('div', [
    h('div', [
      h('span', 'Search: '),
      h('span.name', state.keyword)
    ]),
    h('ul', state.results.map(renderResult))
  ])

}



/*** Set up a loop
****/
let loop = mainLoop(initState, render, {

  create: require('virtual-dom/create-element'),
  diff: require('virtual-dom/diff'),
  patch: require('virtual-dom/patch')

})

const contentContainer = document.getElementById('content')
contentContainer.appendChild(loop.target)


/*** Render the page
****/
renderPage()


/*** Make the search
****/
const theInput = document.querySelector('.form-input');

theInput.addEventListener('keyup', () => {
  const value = theInput.value
  setTimeout(() => {
    searchAPI(value, updateState)
  }, 200)
})


/*** Update the state
****/
function updateState(results, search) {

  if (search.length !== 0) {
    loop.update({
      results: results,
      keyword: search
    })
  } else {
    loop.update({
      results: ['Please type something'],
      keyword: search
    })
  }
}


/*** Render the right page
****/
function renderPage(page) {

  const editPage = document.querySelector('.edit').classList
  const searchPage = document.querySelector('.search').classList

  switch (page) {
    case 'search':
      editPage.add('hide')
      editPage.remove('show')
      searchPage.add('show')
      break

    case 'edit':
      editPage.add('show')
      searchPage.remove('show')
      searchPage.add('hide')
      break

    default:
      editPage.add('hide')
      searchPage.add('show')
  }
}


/*** The edit function here
****/
function edit(event) {

  const theId = event.target.getAttribute('data-id')
  const theResults = loop.state.results
  let theName = document.getElementById('name'),
    theEmail = document.getElementById('email'),
    theDescriptor = document.getElementById('descriptor')


  // update merchant to edit - the state
  theResults.map((a) => {
    if (a.id === theId) {

      state.merchantToEdit = {
        id: a.id,
        name: a.name,
        email: a.email,
        descriptor: a.descriptor
      }

    }

    theName.value = state.merchantToEdit.name
    theEmail.value = state.merchantToEdit.email
    theDescriptor.value = state.merchantToEdit.descriptor

  })

  // update the edif form
  renderPage('edit')
}


/*** Go back to the search
****/
let goBack = document.querySelector('.go-back')

goBack.addEventListener('click', () => {

  // refresh search list
  searchAPI(theInput.value, updateState)
  // reset state - merchantToEdit
  state.merchantToEdit
  renderPage('search')
})


/*** Edit - save the merchant
****/
let saveButton = document.querySelector('.save')
saveButton.addEventListener('click', () => {

  let theName = document.getElementById('name'),
    theEmail = document.getElementById('email'),
    theDescriptor = document.getElementById('descriptor')

  request.put('http://localhost:8000/api/merchant', {
    form: {
      name: theName.value,
      email: theEmail.value,
      descriptor: theDescriptor.value,
      id: state.merchantToEdit.id
    }
  }, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      alert('The shop was saved!')
    }
  })

})
