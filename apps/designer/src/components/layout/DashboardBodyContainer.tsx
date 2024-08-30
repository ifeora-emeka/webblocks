import React from 'react'

type Props = {
    children: any;
    heading: string;
    subHeading?: string;
    rightContent?: any;
}

export default function DashboardBodyContainer({ children, heading, subHeading, rightContent }: Props) {
    return (
        <div className='min-h-screen max-h-screen bg-background flex flex-col flex-1'>
            <header className={`min-h-[50px] max-h-[50px] bg-white`}></header>
            <main className='flex justify-center w-full max-h-[calc(100vh-50)] overflow-y-auto py-default_spacing_lg'>
                <div className='xl:max-w-[900px] xl:min-w-[900px] lg:max-w-full px-default_spacing flex flex-col gap-default_spacing_lg'>
                    <div className='flex justify-between items-center'>
                        <div className='flex flex-col gap-default_spacing'>
                            <h1 className='text-2xl font-bold'>{heading}</h1>
                            {subHeading && <p>{subHeading}</p>}
                        </div>
                        {rightContent}
                    </div>
                    {children}
                </div>
            </main>
        </div>
    )
}