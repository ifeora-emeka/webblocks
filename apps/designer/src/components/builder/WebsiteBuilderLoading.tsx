'use client'
import Image from 'next/image'
import { Progress } from '@/components/ui/progress'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

export default function WebsiteBuilderLoading({ start }: { start?: boolean }) {
  const [progress, setProgress] = useState(5)
  const [show, setShow] = useState(true)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (start) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 120) {
            clearInterval(interval)
            setTimeout(() => {
              setShow(false)
            }, 1500)
            return 100
          }
          return prevProgress + 1
        })
      }, 30)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [start])

  if (!show) {
    return null
  }

  return (
    <>
      <div
        className={
          cn('opacity-100 bg-card dark fixed z-[1400] w-[100vw] h-[100vh] flex justify-center items-center slow-transition', {
            "opacity-0": progress == 100
          })
        }
      >
        <div
          className={'w-[300px] flex flex-col gap-default_spacing items-center'}
        >
          <Image
            src={'/brand/brand-text-white.png'}
            alt={'brand text'}
            width={200}
            height={60}
            className={'mb-10'}
          />
          <Progress value={progress} className={'w-[80%] bg-background'} />
        </div>
      </div>
    </>
  )
}
