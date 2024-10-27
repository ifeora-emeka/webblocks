import { cn } from '@/lib/utils'
import React, { useEffect, useRef, useState } from 'react'
import { PiRowsFill } from 'react-icons/pi'
import { TbCaretDownFilled, TbDots, TbCaretRightFilled } from 'react-icons/tb'
import { ElementData } from '@repo/designer/types/designer.types'
import { DebounceInput } from 'react-debounce-input'
import ElementMenu from '@/components/builder/renderer/element-render/ElementMenu'
import { useRenderer } from '@/components/builder/context/renderer.context'

type Props = {
  element: ElementData
  children?: any
}

//https://dribbble.com/shots/18864162-Updated-Nav-Icons
function EachOutline({ children, element }: Props) {
  const { setRendererState } = useRenderer()
  const inputRef = useRef(null)
  const {
    state: { allElements, active_element },
  } = useRenderer()
  const [menuOpen, setMenuOpen] = useState(false)
  const element_data = element

  const isRoot = element.id.includes('-root__')
  const [showChildren, setShowChildren] = useState(isRoot)
  const targetElement = active_element.filter(
    (x: ElementData) => x.id === element.id,
  )
  const isActive: boolean =
    targetElement?.length > 0 && targetElement[0]?.id === element.id
  const [edit, setEdit] = useState(false)
  const [name, setName] = useState('')

  const handleNameUpdate = () => {
    setEdit(false)
    if (!name) return setName(element.name)
  }

  const handleSingleClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation()
    if (e.shiftKey) {
      e.preventDefault()
    } else {
      setRendererState({
        active_element: [element],
      })
    }
  }

  useEffect(() => {
    setName(element.name)
  }, [element])

  return (
    <>
      <div
        onClick={handleSingleClick}
        onDoubleClick={() => {
          if (!isRoot) {
            setEdit(true)
          }
        }}
        className={cn(
          'max-h-[31px] p-default_spacing text-xs rounded-lg hover:bg-accent hover:text-white/80 cursor-pointer flex gap-default_spacing items-center dark',
          {
            'bg-primary text-white hover:bg-primary hover:text-white': isActive,
            group: !menuOpen,
            'bg-accent text-white/80': menuOpen && !isActive,
          },
        )}
      >
        {children && (
          <button
            onClick={() => setShowChildren(!showChildren)}
            className={cn('opacity-0', {
              'group-hover:opacity-100': !isActive,
              'opacity-100': isActive || menuOpen,
              'hidden group-hover:block': children,
            })}
          >
            {showChildren ? <TbCaretDownFilled /> : <TbCaretRightFilled />}
          </button>
        )}
        <div
          className={cn('', {
            'group-hover:hidden block': children,
          })}
        >
          <PiRowsFill />
        </div>
        {edit ? (
          <DebounceInput
            ref={inputRef}
            minLength={2}
            debounceTimeout={600}
            onBlur={() => handleNameUpdate()}
            className="truncate flex-grow outline-none border-0 bg-inherit bg-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <span className="truncate flex-grow">{name}</span>
        )}

        <ElementMenu onOpenChange={setMenuOpen} element={element}>
          <span
            className={cn('opacity-0 hidden group-hover:block', {
              'group-hover:opacity-100': !isActive,
              'opacity-100 block': isActive || menuOpen,
            })}
          >
            <TbDots size={18} />
          </span>
        </ElementMenu>
      </div>
      {showChildren && (
        <div className="border-l rounded-lg flex flex-col gap-default_spacing pl-[1rem]">
          {children}
        </div>
      )}
    </>
  )
}

export default EachOutline
