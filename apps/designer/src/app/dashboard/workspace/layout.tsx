import DashboardLayout from '@/components/layout/DashboardLayout'
import React from 'react'
import WorkspaceNav from './components/WorkspaceNav'
import DashboardBodyContainer from '@/components/layout/DashboardBodyContainer'

export default function layout({ children }: { children: any }) {
    return (
        <>
            <DashboardLayout leftNav={<WorkspaceNav />}>
                <DashboardBodyContainer>
                    <div className='bg-card p-default_spacing rounded-md'>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus illo omnis perspiciatis sequi magni explicabo quia illum possimus, suscipit rem sapiente autem officiis tempora ipsum natus perferendis mollitia, recusandae quaerat!</p>
                        </div>
                </DashboardBodyContainer>
            </DashboardLayout>
        </>
    )
}
