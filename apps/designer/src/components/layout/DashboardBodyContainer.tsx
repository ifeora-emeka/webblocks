import React from 'react'

type Props = {
    children: any;
}

export default function DashboardBodyContainer({ children }: Props) {
    return (
        <div className='min-h-screen max-h-screen bg-background flex flex-col'>
            <header className={`min-h-[50px] max-h-[50px]`}></header>
            <main className='md:px-[300px] md:py-[50px]'>
                {children}
            </main>
        </div>
    )
}