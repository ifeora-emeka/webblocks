import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@chakra-ui/react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { TbArrowDown, TbArrowUp, TbTrash } from 'react-icons/tb'
import React from 'react'
import { DndElementData } from '@repo/designer/types/designer.types'
import { AppStore } from '@/redux/store'
import { moveElement } from '@/redux/features/renderer/renderer.slice'

export default function ElementToolbar({ element }: { element: DndElementData }){
    const { allElements } = useSelector((state:AppStore) => state.renderer);
    const dispatch = useDispatch()
    let parentID = element.parent_dnd_id

  const move = (direction: 'up' | 'down') => {
    dispatch(moveElement({
      element_id: element.dnd_id,
      direction
    }))
  };

  return <>
    <Box
      opacity={1}
      className={cn(
        'element_toolbox bg-card absolute p-2 rounded-md shadow-xl border z-50 min-w-[200px] min-h-10  right-2 border-border text-muted-foreground flex items-center gap-default_spacing justify-between opacity-100 hover:opacity-100 ',
        {
          'top-5 right-5': !parentID,
          '-top-14': parentID,
        },
      )}
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <div className={'flex items-center gap-1'}>
        <Button variant="outline" size="icon">
          <TbTrash className="h-4 w-4" />
        </Button>
      </div>
      <div className={'flex items-center gap-1'}>
        <Button variant="outline" size="icon" onClick={() => move('down')}>
          <TbArrowDown className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => move('up')}>
          <TbArrowUp className="h-4 w-4" />
        </Button>
      </div>
    </Box>
  </>
}