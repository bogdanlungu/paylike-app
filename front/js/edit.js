/*** The edit function here
****/
module.exports = (event) => {

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
