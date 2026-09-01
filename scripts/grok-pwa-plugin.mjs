/**
 * Vite plugin for Progressive Web App configuration.
 * Generates PWA manifest and provides install tutorial page.
 */

export function grokPwaPlugin() {
  return {
    name: 'grok-pwa-plugin',
    apply: 'build',
    
    transformIndexHtml(html) {
      // Add PWA meta tags to HTML head
      const pwaMetaTags = `
    <meta name="theme-color" content="#ffffff">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <link rel="manifest" href="/manifest.json">
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
      `.trim();
      
      return html.replace('</head>', `${pwaMetaTags}\n  </head>`);
    },

    resolveId(id) {
      if (id === 'virtual-pwa-manifest') {
        return id;
      }
    },

    load(id) {
      if (id === 'virtual-pwa-manifest') {
        return `
export default {
  name: "Remodeling App",
  short_name: "Remodeling",
  description: "Professional remodeling company app",
  start_url: "/",
  scope: "/",
  display: "standalone",
  background_color: "#ffffff",
  theme_color: "#ffffff",
  icons: [
    {
      src: "/icon-192.png",
      sizes: "192x192",
      type: "image/png",
      purpose: "any maskable"
    },
    {
      src: "/icon-512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "any maskable"
    }
  ]
};
        `;
      }
    }
  };
}
