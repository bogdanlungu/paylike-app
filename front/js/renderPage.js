/*** Render the right page
****/
module.exports = (page) => {

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
