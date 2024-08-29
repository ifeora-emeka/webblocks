import React from 'react'

export default function layout({ children }: { children: any }) {
    return (
        <>
            <div className='min-h-[100vh]'>
                {children}
            </div>
        </>
    )
}
