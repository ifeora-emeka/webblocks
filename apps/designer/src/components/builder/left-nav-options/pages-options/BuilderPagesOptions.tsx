'use client'
import BuilderLeftPanelContainer from '../../layout/BuilderLeftPanelContainer'
import { cn } from '@/lib/utils'
import { TbPencil, TbPlus, TbSettings2 } from 'react-icons/tb'
import DefaultTooltip from '@/components/DefaultTooltip'
import { Button } from '@/components/ui/button'
import { useBuilder } from '../../hooks/builder.hooks'
import { useParams } from 'next/navigation'

export default function BuilderPageOptions() {
  const { page_slug } = useParams()
  const {
    builderState: { pages },
  } = useBuilder()
  return (
    <>
      <BuilderLeftPanelContainer
        onSearch={() => {}}
        heading="Pages"
        actions={
          <div>
            <DefaultTooltip content={'Create page'} side={'top'}>
              <Button variant="ghost" size="icon" className={'hover:bg-card'}>
                <TbPlus className="h-4 w-4" />
              </Button>
            </DefaultTooltip>
          </div>
        }
      >
        <div className={'p-default_spacing flex flex-col gap-default_spacing'}>
          {pages.map((page) => {
            return (
              <EachPageSelection
                heading={page.name}
                route={page.route}
                isActive={
                  page._id === page_slug ||
                  (page_slug === 'home' && page.route == '/')
                }
                key={page.route}
              />
            )
          })}
        </div>
      </BuilderLeftPanelContainer>
    </>
  )
}

const EachPageSelection = ({
  isActive,
  route,
  heading,
}: {
  isActive?: boolean
  heading: string
  route: string
}) => {
  return (
    <>
      <div
        aria-label={'page'}
        role={'button'}
        className={cn(
          'relative p-default_spacing rounded-md hover:bg-accent hover:shadow-sm flex flex-col group',
          {
            'bg-accent text-accent-foreground shadow-sm': isActive,
          },
        )}
      >
        <DefaultTooltip content={'Edit page'} side={'top'}>
          <button
            className={cn(
              'absolute right-2 top-2 group-hover:opacity-100 text-accent-foreground hover:text-foreground',
              {
                'opacity-100': isActive,
                'opacity-0': !isActive,
              },
            )}
          >
            <TbPencil />
          </button>
        </DefaultTooltip>
        <small className={cn('text-accent-foreground')}>{heading}</small>
        <small className={cn('text-muted-foreground')}>{route}</small>
      </div>
    </>
  )
}
