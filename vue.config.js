module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/space-coffee/'
    : '/',
  transpileDependencies: [
    'vue-meta',
  ],
};
