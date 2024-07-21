'use client'
import { cn } from '@/lib/utils'
import DefaultIconBtn from '@/components/DefaultIconBtn'
import {
  TbBrandFramerMotion,
  TbCircleCheckFilled,
  TbCode,
  TbDeviceDesktop,
  TbDeviceMobile,
  TbDeviceTablet,
  TbFile,
  TbPlayerPlay,
  TbRocket,
  TbUserPlus,
} from 'react-icons/tb'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import withRenderer, {
  WithRendererProps,
} from '@/components/builder/HOCs/WithRenderer'

type Props = {} & WithRendererProps

function BuilderHeader({ rendererState, builderHook }: Props) {
  const { activeBreakpoint } = rendererState
  const { updateRenderer } = builderHook

  const clearAllTheShit = () => {
    sessionStorage.clear()
    localStorage.clear()
    window.location.reload()
  }

  return (
    <>
      <div
        className={cn(
          `min-h-builder_nav_size max-h-builder_nav_size bg-card w-full flex justify-between h-full px-default_spacing items-center z-[90] border-b select-none`,
        )}
      >
        <div className={'flex gap-default_spacing items-center'}>
          <Link
            href={'/projects'}
            className={'min-w-builder_nav_size max-w-builder_nav_size flex'}
          >
            <DefaultIconBtn
              Icon={TbBrandFramerMotion}
              tooltip={'Home'}
              onClick={() => {}}
              side={'right'}
            />
          </Link>
          <button
            className={
              'rounded-md text-sm text-muted-foreground hover:text-card-foreground px-2 hover:bg-background flex gap-1 border items-center py-1'
            }
          >
            <TbFile /> Home
          </button>
        </div>
        <div className={'flex item-center'}>
          <input
            className={
              'bg-inherit text-muted-foreground text-center outline-none truncate focus:text-white/80'
            }
            placeholder={'Project name'}
            value={'Untitled project'}
          />
        </div>
        <div
          className={
            'items-center min-w-[350px] max-w-[350px] flex justify-end gap-default_spacing'
          }
        >
          <DefaultIconBtn
            Icon={() => (
              <TbCircleCheckFilled className={'text-success'} size={20} />
            )}
            tooltip={'Project saved'}
            onClick={clearAllTheShit}
          />
          <DefaultIconBtn
            Icon={() => <TbCode className={'text-mode_on'} size={20} />}
            tooltip={'Dev mode: ON'}
            onClick={() => {}}
          />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <DefaultIconBtn
                Icon={TbDeviceDesktop}
                tooltip={'Viewport width'}
                onClick={() => {}}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="dark">
              <DropdownMenuCheckboxItem
                checked={activeBreakpoint === 'lg'}
                className="flex gap-default_spacing"
                onCheckedChange={() =>
                  updateRenderer({
                    activeBreakpoint: 'lg',
                  })
                }
              >
                <TbDeviceDesktop size={20} /> Desktop
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={activeBreakpoint === 'md'}
                className="flex gap-default_spacing"
                onCheckedChange={() =>
                  updateRenderer({
                    activeBreakpoint: 'md',
                  })
                }
              >
                <TbDeviceTablet size={20} /> Tablet
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={activeBreakpoint === 'base'}
                className="flex gap-default_spacing"
                onCheckedChange={() =>
                  updateRenderer({
                    activeBreakpoint: 'base',
                  })
                }
              >
                <TbDeviceMobile size={20} /> Mobile
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DefaultIconBtn
            Icon={TbUserPlus}
            tooltip={'Invite teammates'}
            onClick={() => {}}
          />
          <DefaultIconBtn
            Icon={TbPlayerPlay}
            tooltip={'Preview'}
            onClick={() => {}}
          />
          <Separator className={'h-full w-3'} orientation={'vertical'} />
          <Button size={'sm'}>
            Publish <TbRocket size={17} className={'ml-2'} />
          </Button>
        </div>
      </div>
    </>
  )
}

export default withRenderer(BuilderHeader)
