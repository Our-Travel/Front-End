const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    '/test',
    createProxyMiddleware({
      target: 'https://ourtravel.site/api/dev/ws/chat',
      changeOrigin: true,
    })
  );
};
