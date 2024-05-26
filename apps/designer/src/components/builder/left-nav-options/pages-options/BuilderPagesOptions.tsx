import BuilderLeftPanelContainer from '../../layout/BuilderLeftPanelContainer'
import { cn } from '@/lib/utils'
import { TbPlus, TbSettings2 } from 'react-icons/tb'
import DefaultTooltip from '@/components/DefaultTooltip'
import { Button } from '@/components/ui/button'

export default function BuilderPageOptions() {
  return (
    <>
      <BuilderLeftPanelContainer
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
          <EachPageSelection heading={'Home'} route={'/'} isActive />
          <EachPageSelection heading={'About'} route={'/about'} />
          <EachPageSelection heading={'Products'} route={'/products'} />
          <EachPageSelection
            heading={'Product details'}
            route={'/products/:slug/:product_id'}
          />
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
            'bg-accent shadow-sm': isActive,
          },
        )}
      >
        <DefaultTooltip content={'Page setting'} side={'right'}>
          <button
            className={
              'absolute right-2 top-2 opacity-0 group-hover:opacity-100 hover:text-white/80'
            }
          >
            <TbSettings2 />
          </button>
        </DefaultTooltip>
        <small className={'text-card-foreground'}>{heading}</small>
        <small>{route}</small>
      </div>
    </>
  )
}
