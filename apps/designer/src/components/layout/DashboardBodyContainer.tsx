import React from 'react'

type Props = {
    children: any;
    heading: string;
    subHeading?: string;
}

export default function DashboardBodyContainer({ children, heading, subHeading }: Props) {
    return (
        <div className='min-h-screen max-h-screen bg-background flex flex-col flex-1'>
            <header className={`min-h-[50px] max-h-[50px]`}></header>
            <main className='flex justify-center w-full'>
                <div className='xl:max-w-[900px] xl:min-w-[900px] lg:max-w-full px-default_spacing flex flex-col gap-default_spacing_lg'>
                    <div className='flex flex-col gap-default_spacing'>
                        <h1 className='text-2xl font-bold'>{heading}</h1>
                        {subHeading && <p>{subHeading}</p>}
                    </div>
                    {children}
                </div>
            </main>
        </div>
    )
}