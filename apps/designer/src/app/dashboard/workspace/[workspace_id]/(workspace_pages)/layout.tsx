import DashboardLayout from '@/components/layout/DashboardLayout';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'
import WorkspaceNav from '../../components/WorkspaceNav';

export default function layout({ children }: any) {
    const cookie = cookies();
    let token = cookie.get('token')?.value;

    if(!token) {
        return redirect('/')
    }
    
    return (
        <>
            <DashboardLayout leftNav={<WorkspaceNav />}>
                {children}
            </DashboardLayout>
        </>
    )
}
