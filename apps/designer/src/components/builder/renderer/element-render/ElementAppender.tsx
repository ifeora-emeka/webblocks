import { DndElementData } from '@repo/designer/types/designer.types'
import { useBuilder } from '@/components/builder/hooks/builder.hooks'
import { staticHeadingElement } from '@/components/builder/renderer/element-render/static-element-data/heading-element'
import { cn } from '@/lib/utils'
import { TbPlus } from 'react-icons/tb'
import React from 'react'
import { useSelector } from 'react-redux'
import { AppStore } from '@/redux/store'


function ElementAppender ({
                           orientation,
                           position,
                           parent_element,
                           element,
                         }: {
  orientation: 'horizontal' | 'vertical'
  position: 'up' | 'down'
  parent_element: DndElementData | null
  element: DndElementData
})  {
  const { addElementToPage } = useBuilder();
  const { active_element } = useSelector((state: AppStore) => state.renderer);

  if(active_element.length > 1) {
    return null;
  }

  const addElement = () => {
    if (element) {
      addElementToPage({
        element: staticHeadingElement({
          index: position == 'up' ? element.index : element.index + 1,
          parent_id: parent_element?.dnd_id as string,
        }),
        position,
      })
    }
  }

  return (
    <>
      <button
        onClick={addElement}
        className={cn(
          'absolute hover:bg-primary rounded-full bg-primary text-white shadow-lg max-h-8 min-h-8 min-w-8 max-w-8 flex justify-center items-center z-50',
          {
            'left-1/2 transform-x-1/2 -top-10':
              orientation === 'vertical' && position === 'up',
            'left-1/2 transform-x-1/2 -bottom-10':
              orientation === 'vertical' && position === 'down',
            '': orientation === 'horizontal' && position === 'up',
            '': orientation === 'horizontal' && position === 'down',
          },
        )}
        // style={{ [position]: '-40px', left: '50%' }}
      >
        <TbPlus className="h-4 w-4" />
      </button>
    </>
  )
}

export default ElementAppender;
