import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'

export default function layout({ children }: any) {
    const cookie = cookies();
    let token = cookie.get('token')?.value;

    if(!token) {
        return redirect('/')
    }
    
    return (
        <>
            {children}
        </>
    )
}
