'use client'
import DashboardBodyContainer from '@/components/layout/DashboardBodyContainer'
import React, { useEffect, useState } from 'react'
import EachProject from '../components/EachProject'
import { Button } from '@/components/ui/button'
import { TbLoader2, TbPlus } from 'react-icons/tb'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { useCreateProjectMutation } from '@/redux/apis/project.api'
import { useRouter } from 'next/navigation'


type Props = {
    projects: any[]
}

export default function ProjectsPage({ projects }: Props) {
    const [createProject, { isLoading, data }] = useCreateProjectMutation();
    const [name, setName] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createProject({
            name,
            type: "default"
        })
    }

    useEffect(() => {
        if(data){
            router.refresh();
        }
    },[data])

    return (
        <>
            <DashboardBodyContainer heading="Projects" rightContent={<>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <TbPlus className="mr-2 h-4 w-4" /> Create Project
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create new project</DialogTitle>
                            <DialogDescription>
                                Enter a name for your project to get started
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className='flex flex-col gap-default_spacing'>
                            <Input placeholder='Enter project name' onChange={e => setName(e.target.value)} />
                            <Button disabled={isLoading || name.length < 2} type='submit'>
                                {isLoading && <TbLoader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Create Project
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </>}>
                <hr />
                <div className="grid grid-cols-1 gap-default_spacing sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {
                        projects.map((_, i) => {
                            return <EachProject key={`project-${i}`} project={_.project} />
                        })
                    }
                </div>
            </DashboardBodyContainer>
        </>
    )
}