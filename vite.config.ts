import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { handleQuoteSubmission, handleNewsletterSubmission } from './server/quoteHandler.cjs';

// Vite API Middleware Plugin
function apiMiddlewarePlugin(): Plugin {
  return {
    name: 'aether-api-middleware',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.method === 'POST' && req.url === '/api/quote') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const parsed = JSON.parse(body || '{}');
              const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
              const result = handleQuoteSubmission(parsed, Array.isArray(ip) ? ip[0] : ip);
              res.statusCode = result.status;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(result.body));
            } catch (err: any) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, message: 'Invalid JSON payload' }));
            }
          });
          return;
        }

        if (req.method === 'POST' && req.url === '/api/newsletter') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const parsed = JSON.parse(body || '{}');
              const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
              const result = handleNewsletterSubmission(parsed, Array.isArray(ip) ? ip[0] : ip);
              res.statusCode = result.status;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(result.body));
            } catch (err: any) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, message: 'Invalid JSON payload' }));
            }
          });
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig({
  base: '/Kamakshi/',
  plugins: [react(), apiMiddlewarePlugin()],
  server: {
    port: 3000,
    open: false,
    host: true
  }
});
