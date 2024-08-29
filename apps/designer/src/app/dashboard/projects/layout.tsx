import { BUILDER_NAV_SIZE } from '@/components/builder/builder.constants'
import React from 'react'

export default function layout({ children }: { children:any} ) {
    return (
        <div className='flex'>
            <div className={`bg-primary_darker dark:bg-card min-w-[${BUILDER_NAV_SIZE}] min-h-screen max-h-screen`}>

            </div>
            <aside className='bg-card min-w-72 max-w-72 min-h-screen max-h-screen border-r'>
                <div className={`min-h-[50px] max-h-[50px] border-b`}>

                </div>

            </aside>
            <main className='max-h-[calc(100vh-50px)] overflow-y-auto'>
                {children}
            </main>
        </div>
    )
}
