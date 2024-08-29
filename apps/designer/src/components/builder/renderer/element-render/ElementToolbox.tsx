import { Box } from '@chakra-ui/react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  TbArrowDown,
  TbArrowUp,
  TbChevronDown,
  TbCopy,
  TbTrash,
} from 'react-icons/tb'
import React from 'react'
import { DndElementData } from '@repo/designer/types/designer.types'
import { useBuilder } from '../../hooks/builder.hooks'
import { useSelector } from 'react-redux'
import { AppStore } from '@/redux/store'
import ElementMenu from '@/components/builder/renderer/element-render/ElementMenu'

export default function ElementToolbar({
  element,
}: {
  element: DndElementData
}) {
  const { changeElementPosition, removeElementFromPage } = useBuilder()
  let parentID = element.parent_dnd_id
  const { active_element } = useSelector((state: AppStore) => state.renderer)
  const isRootElement = !element?.element_data?.parent_element_id

  const move = (direction: 'up' | 'down') => {
    changeElementPosition({
      element_id: element.dnd_id,
      direction,
    })
  }

  const remove = () => {
    removeElementFromPage({
      dnd_ids: [element.dnd_id],
    })
  }

  if (active_element?.length > 1) {
    return null
  }

  return (
    <>
      <Box
        opacity={1}
        className={cn(
          'element_toolbox bg-card absolute p-2 rounded-md shadow-xl border z-[1000]  min-h-10 border-border text-muted-foreground flex items-center gap-default_spacing_lg justify-between opacity-100 hover:opacity-100 ',
          {
            'top-5 right-5': !parentID,
            '-top-12 left-0': parentID,
          },
        )}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        {!isRootElement && (
          <>
            <div className={'flex items-center gap-default_spacing'}>
              <button className='hover:text-foreground' onClick={remove}>
                <TbTrash className="h-4 w-4" />
              </button>
            </div>
            <div className={'flex items-center gap-default_spacing'}>
              <button className='hover:text-foreground'
                onClick={() => move('down')}
              >
                <TbArrowDown className="h-4 w-4" />
              </button>
              <button className='hover:text-foreground' onClick={() => move('up')}>
                <TbArrowUp className="h-4 w-4" />
              </button>
            </div>
          </>
        )}

        <div className={'flex items-center gap-default_spacing'}>
          {!isRootElement && (
            <button className='hover:text-foreground' onClick={remove}>
              <TbCopy className="h-4 w-4" />
            </button>
          )}
          <ElementMenu onOpenChange={() => {}} element={element}>
            <button className='hover:text-foreground' >
              <TbChevronDown className="h-4 w-4" />
            </button>
          </ElementMenu>
        </div>
      </Box>
    </>
  )
}
