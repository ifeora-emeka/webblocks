'use client'
import { cn } from '@/lib/utils'
import DefaultIconBtn from '@/components/DefaultIconBtn'
import {
  TbArrowBackUp,
  TbArrowForwardUp,
  TbCircleCheckFilled,
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
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { AppStore } from '@/redux/store'
import { useBuilderUtils } from '../../hooks/builder-utils.hooks'
import { useRenderer } from '@/components/builder/context/renderer.context'

type Props = {}

function BuilderHeader({}: Props) {
  const { project } = useSelector((state: AppStore) => state.builder)
  const {
    state: { activeBreakpoint },
  } = useRenderer()
  const { updateRenderer } = useBuilderUtils()

  const clearAllTheShit = () => {
    sessionStorage.clear()
    localStorage.clear()
    window.location.reload()
  }

  return (
    <>
      <header
        className={cn(
          `min-h-builder_nav_size max-h-builder_nav_size bg-card w-full flex justify-between h-full px-default_spacing items-center z-[100] border-b select-none`,
        )}
      >
        <div className={'flex gap-default_spacing items-center min-w-96'}>
          <Link
            href={'/'}
            className={'min-w-builder_nav_size max-w-builder_nav_size flex'}
          >
            <Image
              src={'/brand/brand-icon-blue.png'}
              alt={'brand'}
              width={30}
              height={30}
            />
            {/*<DefaultIconBtn*/}
            {/*  Icon={TbBrandFramerMotion}*/}
            {/*  tooltip={'Home'}*/}
            {/*  onClick={() => {}}*/}
            {/*  side={'right'}*/}
            {/*/>*/}
          </Link>
          <div className="flex gap-default_spacing_lg">
            <button
              className={
                'rounded-md text-sm text-muted-foreground hover:text-card-foreground px-2 hover:bg-background flex gap-1 border items-center py-1'
              }
            >
              <TbFile /> Home
            </button>
            <div className="flex">
              <DefaultIconBtn
                Icon={() => <TbArrowBackUp size={20} />}
                tooltip={'Undo'}
                onClick={() => {}}
              />
              <DefaultIconBtn
                Icon={() => <TbArrowForwardUp size={20} />}
                tooltip={'Redo'}
                onClick={() => {}}
              />
            </div>
          </div>
        </div>
        <div className={'flex item-center gap-default_spacing'}>
          <DefaultIconBtn
            Icon={() => (
              <TbCircleCheckFilled className={'text-success'} size={20} />
            )}
            tooltip={'Project saved'}
            onClick={clearAllTheShit}
          />
          <input
            className={
              'bg-inherit text-muted-foreground text-start outline-none truncate focus:text-foreground'
            }
            placeholder={'Project name'}
            value={project?.name || 'Untitled project'}
          />
        </div>
        <div
          className={
            'items-center min-w-[350px] max-w-[350px] flex justify-end gap-default_spacing'
          }
        >
          <DropdownMenu>
            <DropdownMenuTrigger>
              <DefaultIconBtn
                Icon={TbDeviceDesktop}
                tooltip={'Viewport width'}
                onClick={() => {}}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
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
      </header>
    </>
  )
}

export default BuilderHeader
