import DashboardLayout from '@/components/layout/DashboardLayout'
import React from 'react'
import AdminNav from './components/AdminNav'

export default function layout({ children }: any) {
    return (
        <>
            <DashboardLayout leftNav={<AdminNav />}>{children}</DashboardLayout>
        </>
    )
}
