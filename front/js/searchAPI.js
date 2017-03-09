/*** Call the api - the search
****/
const request = require('request')

module.exports = (search, updateState) => {

  const url = 'http://localhost:8000/api/search?name=' + search

  request({
    url: url,
    json: true
  }, function (error, response, body) {

    if (!error && response.statusCode === 200) {
      let newArray = []
      const response = body.merchants
      response.map((index) => {
        const id = index.id,
          name = index.name,
          email = index.email,
          descriptor = index.descriptor
        theObject = {
          id,
          name,
          email,
          descriptor
        }
        newArray.push(theObject)
      })

      updateState(newArray, search)
    }
  })
}
