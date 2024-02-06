import React from 'react'

export default function QuoteSection() {
  return (
    <>
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">“Best practices” don’t actually work.</h1>
          <p className="text-md font-medium mx-auto max-w-3xl">
            I’ve written a few thousand words on why traditional “semantic class names” are the reason CSS is hard to maintain, but the truth is you’re never going to believe me until you actually try it. If you can suppress the urge to retch long enough to give it a chance, I really think you’ll wonder how you ever worked with CSS any other way.
          </p>
        </div>
      </div>
    </>
  )
}
