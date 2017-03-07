const CREDINTIALS = {
  id: '58b5c00f1a074f7d705aec9d',
  key: 'd21013ca-0927-4fe3-9718-27a2e55df628'
}

const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || 8000

const MAXIMUM_MERCHANTS = 10

module.exports = {
  PORT,
  CREDINTIALS,
  MAXIMUM_MERCHANTS,
}
