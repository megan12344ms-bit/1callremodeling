import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: IndexPage,
})

function IndexPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-5xl font-bold" style={{ fontFamily: 'Fraunces' }}>
        1Call Remodeling
      </h1>
      <p className="max-w-md text-lg" style={{ color: 'hsl(var(--muted))' }}>
        Professional remodeling services in Hartford, AL
      </p>
      <p className="text-sm" style={{ color: 'hsl(var(--muted))' }}>
        Coming soon...
      </p>
    </div>
  )
}
