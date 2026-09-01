import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "1Call Remodeling · Hartford, AL" },
      {
        name: "description",
        content: "Professional remodeling services in Hartford, AL",
      },
      { name: "theme-color", content: "#2f4a3c" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Outfit:wght@400;500;600&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: RootDocument,
  notFoundComponent: NotFound,
});

function RootDocument() {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 text-center" style={{ backgroundColor: "hsl(var(--bg))", color: "hsl(var(--fg))" }}>
      <p className="text-xs font-medium uppercase tracking-[0.16em]" style={{ color: "hsl(var(--muted))" }}>
        404
      </p>
      <h1 className="mt-3 text-4xl" style={{ fontFamily: "Fraunces" }}>That page is not here.</h1>
      <p className="mt-3 max-w-md" style={{ color: "hsl(var(--muted))" }}>
        The link may be old. Head home, or call the shop and we will point you
        the right way.
      </p>
      <a
        href="/"
        className="mt-8 inline-flex h-11 items-center rounded-md px-5 text-sm font-medium"
        style={{ backgroundColor: "hsl(var(--accent))", color: "hsl(var(--accent-fg))" }}
      >
        Back to 1Call
      </a>
    </main>
  );
}
