"use client";

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center py-24 text-center gap-4">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-lg">Sorry, we couldn&apos;t find the page you were looking for.</p>
      <Button asChild>
        <Link href="/">Go back home</Link>
      </Button>
    </main>
  )
}
