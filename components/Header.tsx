'use client'

import Link from "next/link";
import { Button } from "./ui/button";
import AuthForm from "./AuthForm";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession()

  return (
    <header className="bg-white h-16 flex items-center justify-between px-6 m-4 border border-gray-300 rounded-2xl ">
      <Link href="/">
        <h1 className="text-2xl font-bold">
          <span className="text-black">Fix</span>
          <span className="text-amber-500">It</span>
          <span>.</span>
        </h1>
      </Link>

      <nav className="hidden md:flex gap-4 font-bold">
        <Link href="/" className="hover:underline">Beranda</Link>
        <Link href="/layanan" className="hover:underline">Layanan</Link>
        <Link href="/#about" className="hover:underline">Tentang Kami</Link>
      </nav>

      {session ? <Link href="/dashboard"><Button>{session.user?.name}</Button></Link> :
      <AuthForm /> }
    </header>
  );
}
