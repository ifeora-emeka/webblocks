import React from 'react'
import { DesignerProvider } from './[page_slug]/DesignerProvider'

export default async function layout(props: any) {
    const { children, params } = props
    // let project = await fetchAPI(`/projects/${params?.project_id}`, {})

    return (
        <>
            <DesignerProvider
                // project={project.data.project}
                // pages={project.data.pages}
                // metadata={project.data.metadata}
            >
                {children}
            </DesignerProvider>
        </>
    )
}
