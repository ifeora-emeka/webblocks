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
import { ElementData } from '@repo/designer/types/designer.types'
import { useSelector } from 'react-redux'
import { AppStore } from '@/redux/store'
import ElementMenu from '@/components/builder/renderer/element-render/ElementMenu'
import { useBuilderUtils } from '../../hooks/builder-utils.hooks'
import { useRenderer } from '@/components/builder/context/renderer.context'

export default function ElementToolbar({ element }: { element: ElementData }) {
  const { state: { active_element }, removeElements, updateElementIndex, duplicateSelected } = useRenderer();
  let parentID = element.parent_element_id
  const isRootElement = !element?.parent_element_id

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
              <button className="hover:text-foreground" onClick={() => removeElements([element.id])}>
                <TbTrash className="h-4 w-4" />
              </button>
            </div>
            <div className={'flex items-center gap-default_spacing'}>
              <button
                className="hover:text-foreground"
                onClick={() => updateElementIndex('increment')}
              >
                <TbArrowDown className="h-4 w-4" />
              </button>
              <button
                className="hover:text-foreground"
                onClick={() => updateElementIndex('decrement')}
              >
                <TbArrowUp className="h-4 w-4" />
              </button>
            </div>
          </>
        )}

        <div className={'flex items-center gap-default_spacing'}>
          {!isRootElement && (
            <button className="hover:text-foreground" onClick={duplicateSelected}>
              <TbCopy className="h-4 w-4" />
            </button>
          )}
          <ElementMenu onOpenChange={() => {}} element={element}>
            <button className="hover:text-foreground">
              <TbChevronDown className="h-4 w-4" />
            </button>
          </ElementMenu>
        </div>
      </Box>
    </>
  )
}
