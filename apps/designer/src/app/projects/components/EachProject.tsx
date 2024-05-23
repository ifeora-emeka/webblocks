import { ProjectsDocument } from '@/app/api/api-services/projects/projects.schema'
import { TbDots, TbExternalLink } from 'react-icons/tb'
import Link from 'next/link'
import { IS_DEV, PREVIEW_URL } from '@/lib/constants'

type Props = {
  project: ProjectsDocument
}

export default function EachProject({ project }: Props) {
  return (
    <>
      <div
        className={
          'border rounded-md hover:shadow-sm min-h-14 overflow-hidden flex flex-col select-none group'
        }
      >
        <div className={'relative'}>
          <div
            className={
              'bg-black/60 w-full h-full absolute z-30 flex opacity-0 group-hover:opacity-100 items-center justify-center text-white font-semibold group-hover:flex ease-in-out transition'
            }
          >
            <button
              className={
                'bg-white absolute top-3 right-3 text-muted h-5 flex justify-center items-center rounded-sm w-6'
              }
            >
              <TbDots />
            </button>
            <Link href={`/projects/${project?._id}`}>
              <span
                role={'button'}
                className={'flex items-center gap-default_spacing'}
              >
                Open <TbExternalLink />
              </span>
            </Link>
          </div>
          <img
            src={
              'https://cdn.dribbble.com/userupload/9847888/file/original-8ec98275ee10becd02260adb3666da90.jpeg?resize=752x'
            }
            alt={'preview'}
          />
        </div>
        <div className={'p-default_spacing truncate'}>
          <h6 className={'truncate font-semibold'}>{project.name}</h6>
          <div className={'flex truncate'}>
            <a
              rel="noopener noreferrer"
              target={'_blank'}
              href={`${IS_DEV ? 'http://' : 'https://'}${project.subdomain}.${PREVIEW_URL}`}
              className={
                'flex text-muted gap-1 hover:underline cursor-pointer truncate'
              }
            >
              <small className={'truncate text-muted flex'}>
                {project.subdomain}
              </small>
              <div>
                <TbExternalLink />
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
