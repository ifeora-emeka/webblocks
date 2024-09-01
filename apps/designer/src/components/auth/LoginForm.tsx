'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import Link from 'next/link'
import { Button } from '../ui/button'
import { TbBrandGoogleFilled } from 'react-icons/tb'
import axios from 'axios'
import { API_URL } from '@/lib/constants'
import Cookie from 'js-cookie'

type FormValues = {
  email: string
  password: string
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
})

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: FormValues) => {
    console.log(data)
    try {
      const res = await axios(API_URL + `/auth/login`, {
        method: 'POST',
        data,
      })
      const token = String(res.data.data.token)
        .split('=')[1]
        .trim()
        .split(';')[0]

      Cookie.set('token', token, { expires: 120 })
      window.location.reload()
    } catch (error) {
      console.log('THE ERROR::', error)
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto grid w-[350px] gap-6"
      >
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
              className={`bg-card focus:shadow-md focus:ring-primary ${
                errors.email ? 'border-red-500' : ''
              }`}
              {...register('email')}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
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
            <Input
              id="password"
              type="password"
              className={`bg-card focus:shadow-md focus:ring-primary ${
                errors.password ? 'border-red-500' : ''
              }`}
              {...register('password')}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button className="flex gap-default_spacing items-center text-card-foreground w-full bg-card hover:shadow-md focus:bg-white">
            <TbBrandGoogleFilled size={16} className="text-muted-foreground" />{' '}
            Login with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href="#" className="underline">
            Sign up
          </Link>
        </div>
      </form>
    </>
  )
}
