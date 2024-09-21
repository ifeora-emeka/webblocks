import DashboardLayout from '@/components/layout/DashboardLayout'
import React from 'react'

export default function layout({ children }: any) {
    return (
        <>
            <DashboardLayout leftNav={null}>{children}</DashboardLayout>
        </>
    )
}
