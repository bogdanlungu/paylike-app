/*** Edit - save the merchant
****/
module.exports = () => {
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
}
