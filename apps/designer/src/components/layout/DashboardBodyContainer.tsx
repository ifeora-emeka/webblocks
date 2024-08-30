import React from 'react'

type Props = {
    children: any;
}

export default function DashboardBodyContainer({ children }: Props) {
    return (
        <div className='min-h-screen max-h-screen bg-background flex flex-col flex-1'>
            <header className={`min-h-[50px] max-h-[50px]`}></header>
            <main className='flex justify-center w-full'>
                <div className='xl:max-w-[900px] lg:max-w-full px-default_spacing'>
                    {children}
                </div>
            </main>
        </div>
    )
}