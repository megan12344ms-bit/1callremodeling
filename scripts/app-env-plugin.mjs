/**
 * Vite plugin for app environment variable injection.
 * Exposes environment variables via virtual module for dev server.
 */

export function appEnvPlugin() {
  const virtualModuleId = 'virtual:app-env';
  const resolvedId = `\0${virtualModuleId}`;

  return {
    name: 'app-env-plugin',

    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedId;
      }
    },

    load(id) {
      if (id === resolvedId) {
        const env = {};
        
        // Expose specific environment variables
        const publicVars = [
          'BETTER_AUTH_URL',
          'VITE_API_BASE_URL',
          'VITE_APP_NAME'
        ];

        for (const key of publicVars) {
          if (process.env[key]) {
            env[key] = process.env[key];
          }
        }

        return `export default ${JSON.stringify(env, null, 2)};`;
      }
    },

    configureServer(server) {
      // Middleware to serve environment variables in dev mode
      server.middlewares.use('/__app-env', (req, res) => {
        const env = {};
        
        const publicVars = [
          'BETTER_AUTH_URL',
          'VITE_API_BASE_URL',
          'VITE_APP_NAME'
        ];

        for (const key of publicVars) {
          if (process.env[key]) {
            env[key] = process.env[key];
          }
        }

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(env));
      });
    }
  };
}
