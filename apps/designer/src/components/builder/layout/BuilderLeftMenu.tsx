'use client'
import { cn } from '@/lib/utils'
import {
  TbBox,
  TbBrandHipchat,
  TbBrush,
  TbColumns,
  TbDatabase,
  TbFile,
  TbListTree,
  TbPhoto,
  TbPlus,
  TbSchool,
  TbSettings2,
} from 'react-icons/tb'
import { BUILDER_NAV_SIZE } from '@/components/builder/builder.constants'
import { Separator } from '@/components/ui/separator'
import DefaultIconBtn from '@/components/DefaultIconBtn'
import { useDispatch, useSelector } from 'react-redux'
import { toggleLeftPanel } from '@/redux/features/builder/builder-view.slice'
import { AppStore } from '@/redux/store'

export default function BuilderLeftMenu() {
  const dispatch = useDispatch()
  const { panel } = useSelector((state: AppStore) => state.builder_view)

  return (
    <>
      <div
        style={{ zIndex: 1000 }}
        className={cn(
          `min-h-[calc(100vh-${BUILDER_NAV_SIZE})] max-h-[calc(100vh-50px)] bg-card min-w-builder_nav_size flex flex-col justify-between py-default_spacing z-50`,
        )}
      >
        <div
          className={
            'flex flex-col flex-1 items-center w-full gap-default_spacing'
          }
        >
          <DefaultIconBtn
            Icon={TbPlus}
            tooltip={'Add elements'}
            onClick={() => dispatch(toggleLeftPanel('elements'))}
            side={'right'}
            isActive={panel === 'elements'}
          />
          <DefaultIconBtn
            Icon={TbFile}
            tooltip={'Pages'}
            onClick={() => dispatch(toggleLeftPanel('pages'))}
            side={'right'}
            isActive={panel === 'pages'}
          />
          <DefaultIconBtn
            Icon={TbListTree}
            tooltip={'Outline'}
            onClick={() => dispatch(toggleLeftPanel('outline'))}
            side={'right'}
            isActive={panel === 'outline'}
          />
          <Separator className={'bg-muted-foreground opacity-30'} />
          <DefaultIconBtn
            Icon={TbBox}
            tooltip={'Blocks'}
            onClick={() => dispatch(toggleLeftPanel('blocks'))}
            side={'right'}
            isActive={panel === 'blocks'}
          />
          <DefaultIconBtn
            Icon={TbColumns}
            tooltip={'Variables'}
            onClick={() => {}}
            side={'right'}
          />
          <DefaultIconBtn
            Icon={TbBrush}
            tooltip={'Themes'}
            onClick={() => {}}
            side={'right'}
          />
          <Separator className={'bg-muted-foreground opacity-30'} />
          <DefaultIconBtn
            Icon={TbPhoto}
            tooltip={'Asset browser'}
            onClick={() => {}}
            side={'right'}
          />
          <DefaultIconBtn
            Icon={TbDatabase}
            tooltip={'Content management'}
            onClick={() => {}}
            side={'right'}
          />
          <DefaultIconBtn
            Icon={TbSettings2}
            tooltip={'Site settings'}
            onClick={() => {}}
            side={'right'}
          />
        </div>
        <div
          className={'flex flex-col items-center w-full gap-default_spacing'}
        >
          <DefaultIconBtn
            Icon={TbBrandHipchat}
            tooltip={'Chat support'}
            onClick={() => {}}
            side={'right'}
          />
          <DefaultIconBtn
            Icon={TbSchool}
            tooltip={'Tutorials'}
            onClick={() => {}}
            side={'right'}
          />
        </div>
      </div>
    </>
  )
}
