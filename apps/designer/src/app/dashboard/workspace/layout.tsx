import DashboardLayout from '@/components/layout/DashboardLayout'
import React from 'react'
import WorkspaceNav from './components/WorkspaceNav'
import DashboardBodyContainer from '@/components/layout/DashboardBodyContainer'

export default function layout({ children }: { children: any }) {
    return (
        <>
            <DashboardLayout leftNav={<WorkspaceNav />}>
                {children}
            </DashboardLayout>
        </>
    )
}
