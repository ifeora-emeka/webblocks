import React from 'react'
import { BUILDER_NAV_SIZE } from '../builder/builder.constants'

type Props = {
    children: any;
    leftNav: React.ReactNode;
}

export default function DashboardLayout({ children, leftNav }: Props) {
    return (
        <>
            <div className='flex'>
                <div className={`bg-primary_darker dark:bg-card min-w-[${BUILDER_NAV_SIZE}] min-h-screen max-h-screen`}>
                </div>
                <aside className='bg-card min-w-72 max-w-72 min-h-screen max-h-screen border-r'>
                    <div className={`min-h-[50px] max-h-[50px] border-b`}>

                    </div>
                    <div className='max-h-[calc(100vh-50px)] overflow-y-auto min-h-[calc(100vh-50px)]'>
                        {leftNav}
                    </div>

                </aside>
                <div className='max-h-[calc(100vh-50px)] overflow-y-auto'>
                    {children}
                </div>
            </div>
        </>
    )
}