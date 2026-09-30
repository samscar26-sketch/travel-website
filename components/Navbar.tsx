"use client"

import { NAV_LINKS } from "@/constants"
import Image from "next/image"
import Link from "next/link"
import { FormEvent, useEffect, useState } from "react"
import Button from "./Button"

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [passwordError, setPasswordError] = useState("")

  useEffect(() => {
    const updateActiveLink = () => {
      const hash = window.location.hash.slice(1)
      const matchingLink = NAV_LINKS.find((link) => link.href.slice(1) === hash)
      setActiveLink(matchingLink?.key ?? "home")
    }

    updateActiveLink()
    window.addEventListener("hashchange", updateActiveLink)

    return () => window.removeEventListener("hashchange", updateActiveLink)
  }, [])

  const handleLinkClick = (key: string) => {
    setActiveLink(key)
    setIsMenuOpen(false)
  }

  const openLogin = () => {
    setIsLoginOpen(true)
    setIsMenuOpen(false)
    setIsSubmitted(false)
    setPasswordError("")
  }

  const handleLoginSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const password = form.get("password")
    const confirmPassword = form.get("confirmPassword")

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.")
      setIsSubmitted(false)
      return
    }

    setPasswordError("")
    setIsSubmitted(true)
    event.currentTarget.reset()
  }

  return (
    <nav className="flexBetween max-container padding-container relative z-30 py-5">
      <Link href="#home" onClick={() => handleLinkClick("home")}>
        <Image src="/hilink-logo.svg" alt="logo" width={74} height={29} />
      </Link>

      <ul className="hidden h-full gap-12 lg:flex">
        {NAV_LINKS.map((link) => (
          <Link
            href={link.href}
            key={link.key}
            onClick={() => handleLinkClick(link.key)}
            className={`regular-16 flexCenter cursor-pointer border-b-2 pb-1.5 transition-all hover:font-bold ${activeLink === link.key ? "border-green-50 font-bold text-white" : "border-transparent text-gray-50"}`}
          >
            {link.label}
          </Link>
        ))}
      </ul>

      <div className="lg:flexCenter hidden">
        <Button 
          type="button"
          title="Login"
          icon="/user.svg"
          variant="btn_dark_green"
          onClick={openLogin}
        />
      </div>

      <button
        type="button"
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((open) => !open)}
        className="inline-block cursor-pointer lg:hidden"
      >
        <Image src="/menu.svg" alt="" width={32} height={32} />
      </button>

      {isMenuOpen && (
        <ul className="absolute right-6 top-20 flex w-56 flex-col gap-1 rounded-2xl bg-white p-4 shadow-lg lg:hidden">
          {NAV_LINKS.map((link) => (
            <li key={link.key}>
              <Link
                href={link.href}
                onClick={() => handleLinkClick(link.key)}
                className={`block rounded-lg px-4 py-3 regular-16 transition-colors ${activeLink === link.key ? "bg-green-50 font-bold text-white" : "text-gray-90 hover:bg-gray-10"}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="mt-2 border-t border-gray-10 pt-3">
            <Button
              type="button"
              title="Login"
              icon="/user.svg"
              variant="btn_dark_green"
              full
              onClick={openLogin}
            />
          </li>
        </ul>
      )}

      {isLoginOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsLoginOpen(false)
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="login-title"
            className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"
          >
            <button
              type="button"
              aria-label="Close login form"
              onClick={() => setIsLoginOpen(false)}
              className="absolute right-5 top-4 text-2xl text-gray-50 hover:text-gray-90"
            >
              &times;
            </button>
            <h2 id="login-title" className="bold-32 text-gray-90">Welcome back</h2>
            <p className="regular-14 mt-2 text-gray-30">Enter your details to continue.</p>

            {isSubmitted ? (
              <p className="mt-8 rounded-xl bg-green-50/10 p-4 text-center font-semibold text-green-50">
                Your details were submitted successfully.
              </p>
            ) : (
              <form onSubmit={handleLoginSubmit} className="mt-6 flex flex-col gap-4">
                <label className="flex flex-col gap-2 text-sm font-semibold text-gray-90">
                  Email
                  <input
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    className="rounded-xl border border-gray-20 px-4 py-3 font-normal outline-none focus:border-green-50"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-semibold text-gray-90">
                  Password
                  <input
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    minLength={6}
                    required
                    className="rounded-xl border border-gray-20 px-4 py-3 font-normal outline-none focus:border-green-50"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-semibold text-gray-90">
                  Confirm password
                  <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    minLength={6}
                    required
                    className="rounded-xl border border-gray-20 px-4 py-3 font-normal outline-none focus:border-green-50"
                  />
                </label>
                {passwordError && <p className="text-sm text-red-600">{passwordError}</p>}
                <button
                  type="submit"
                  className="mt-2 rounded-full bg-green-90 px-8 py-4 font-bold text-white transition-colors hover:bg-black"
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar