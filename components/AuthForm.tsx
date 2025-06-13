'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle,
} from '@/components/ui/dialog'
import {
  Tabs, TabsList, TabsTrigger, TabsContent,
} from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'

export default function AuthForm() {
  const [open, setOpen] = useState(false)

  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [registerForm, setRegisterForm] = useState({ name: "", email: "", password: "" })

  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async () => {
    setLoading(true)
    const res = await signIn("credentials", {
      ...loginForm,
      redirect: false,
    })

    setLoading(false)

    if (res?.ok) {
      setOpen(false)
      router.refresh() // if you're using app router
    } else {
      alert("Login failed")
    }
  }

  const handleRegister = async () => {
    setLoading(true)
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(registerForm),
      headers: { "Content-Type": "application/json" },
    })

    setLoading(false)

    if (res.ok) {
      alert("Registration successful. You can log in now.")
    } else {
      const data = await res.json()
      alert(data.error || "Registration failed")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="inline-block">Sign In</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Welcome</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4 mt-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} />
            </div>
            <Button className="w-full" onClick={handleLogin} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </TabsContent>

          <TabsContent value="register" className="space-y-4 mt-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" type="text" value={registerForm.name}
                onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="email-register">Email</Label>
              <Input id="email-register" type="email" value={registerForm.email}
                onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="password-register">Password</Label>
              <Input id="password-register" type="password" value={registerForm.password}
                onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })} />
            </div>
            <Button className="w-full" onClick={handleRegister} disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
