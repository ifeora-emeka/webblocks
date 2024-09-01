'use client'
import { Button } from '@/components/ui/button'
import { ProjectData } from '@/types/projects.types'
import { useParams } from 'next/navigation'
import { useRouter } from 'next13-progressbar'
import React from 'react'

type Props = {
  project: ProjectData
}

export default function EachProject({ project }: Props) {
  const router = useRouter()
  const { workspace_id } = useParams()

  return (
    <div className="flex flex-col gap-default_spacing">
      <div className="rounded-md bg-card border hover:shadow-sm overflow-hidden h-52 relative group flex justify-center">
        <div className="absolute bg-black/80 h-full w-full flex items-center justify-center opacity-0 group-hover:opacity-100 fast-transition flex-col gap-default_spacing_lg">
          <Button
            onClick={() =>
              router.push(
                `/dashboard/workspace/${workspace_id}/project/${project._id}/designer/home`,
              )
            }
          >
            Open in designer
          </Button>
          <Button
            variant={'outline'}
            className="bg-white/0 text-white"
            onClick={() =>
              router.push(
                `/dashboard/workspace/${workspace_id}/project/${project._id}/admin`,
              )
            }
          >
            Open in admin
          </Button>
        </div>
        <img
          src="https://www.productplan.com/wp-content/uploads/2018/09/what-is-a-wireframe-225x300.png"
          className="min-h-full w-full"
        />
      </div>
      <div className="pb-default_spacing_lg truncate flex flex-col">
        <p className="truncate">{project.name}</p>
        <small className="text-muted-foreground">Updated 5 days ago</small>
      </div>
    </div>
  )
}
