module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? '/english10/dist/'
    : '/',
  transpileDependencies: [
    'vuetify'
  ]
}
