import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import Link from 'next/link'
import { Button } from '../ui/button'
import { TbBrandGoogleFilled } from 'react-icons/tb'

type Props = {}

export default function LoginForm({ }: Props) {
    return (
        <>
            <div className="mx-auto grid w-[350px] gap-6">
                <div className="grid gap-2 text-center">
                    <h1 className="text-3xl font-bold">Login</h1>
                    <p className="text-balance text-muted-foreground">
                        Enter your email below to login to your account
                    </p>
                </div>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                            className='bg-card focus:shadow-md focus:ring-primary'
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            <Link
                                href="/forgot-password"
                                className="ml-auto inline-block text-sm underline"
                            >
                                Forgot your password?
                            </Link>
                        </div>
                        <Input id="password" type="password" required className='bg-card focus:shadow-md focus:ring-primary' />
                    </div>
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                    <Button className="flex gap-default_spacing items-center text-card-foreground w-full bg-card hover:shadow-md focus:bg-white">
                        <TbBrandGoogleFilled size={16}  className='text-muted-foreground'/> Login with Google
                    </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="#" className="underline">
                        Sign up
                    </Link>
                </div>
            </div>
        </>
    )
}