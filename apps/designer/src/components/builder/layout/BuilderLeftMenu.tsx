'use client'
import { cn } from '@/lib/utils'
import {
  TbBox,
  TbBrush,
  TbColumns,
  TbDatabase,
  TbDiamonds,
  TbFile,
  TbFolder,
  TbHelp,
  TbListTree,
  TbSettings2,
  TbShoppingCart,
  TbUsers,
} from 'react-icons/tb'
import { BUILDER_NAV_SIZE } from '@/components/builder/builder.constants'
import { Separator } from '@/components/ui/separator'
import DefaultIconBtn from '@/components/DefaultIconBtn'
import { useDispatch, useSelector } from 'react-redux'
import { toggleLeftPanel } from '@/redux/features/builder/builder-view.slice'
import { RootState } from '@/redux/store'

export default function BuilderLeftMenu() {
  const dispatch = useDispatch()
  const { panel } = useSelector((state: RootState) => state.builder_view)

  return (
    <>
      <div
        style={{ zIndex: 1000 }}
        className={cn(
          `min-h-[calc(100vh-${BUILDER_NAV_SIZE})] max-h-[calc(100vh-50px)] bg-card min-w-builder_nav_size flex flex-col justify-between py-default_spacing z-[100]`,
        )}
      >
        <div
          className={
            'flex flex-col flex-1 items-center w-full gap-default_spacing'
          }
        >
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
          <DefaultIconBtn
            Icon={TbDiamonds}
            tooltip={'Components'}
            onClick={() => dispatch(toggleLeftPanel('components'))}
            side={'right'}
            isActive={panel === 'components'}
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
            onClick={() => dispatch(toggleLeftPanel('variables'))}
            side={'right'}
            isActive={panel === 'variables'}
          />
          <DefaultIconBtn
            Icon={TbBrush}
            tooltip={'Themes'}
            onClick={() => {}}
            side={'right'}
          />
          <Separator className={'bg-muted-foreground opacity-30'} />
          <DefaultIconBtn
            Icon={TbFolder}
            tooltip={'File browser'}
            onClick={() => dispatch(toggleLeftPanel('assets'))}
            side={'right'}
            isActive={panel === 'assets'}
          />
          <DefaultIconBtn
            Icon={TbDatabase}
            tooltip={'Content management'}
            onClick={() => {}}
            side={'right'}
          />
          <DefaultIconBtn
            Icon={TbShoppingCart}
            tooltip={'Ecommerce'}
            onClick={() => {}}
            side={'right'}
          />
          <DefaultIconBtn
            Icon={TbUsers}
            tooltip={'Users'}
            onClick={() => {}}
            side={'right'}
          />
          <Separator className={'bg-muted-foreground opacity-30'} />
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
            Icon={TbHelp}
            tooltip={'Help'}
            onClick={() => {}}
            side={'right'}
          />
        </div>
      </div>
    </>
  )
}
