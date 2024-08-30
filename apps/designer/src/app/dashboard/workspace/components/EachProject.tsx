import { Button } from '@/components/ui/button'
import React from 'react'

type Props = {}

export default function EachProject({ }: Props) {
    return (
        <div className='rounded-md bg-card border hover:shadow-sm overflow-hidden h-64 relative group flex justify-center'>
            <div className='absolute bg-black/80 h-full w-full flex items-center justify-center opacity-0 group-hover:opacity-100 fast-transition flex-col gap-default_spacing_lg'>
                <Button>
                    Open in designer
                </Button>
                <Button variant={'outline'} className='bg-white/0 text-white'>
                    Open in admin
                </Button>
            </div>
            <img src='https://www.productplan.com/wp-content/uploads/2018/09/what-is-a-wireframe-225x300.png' className='min-h-full w-full' />
        </div>
    )
}