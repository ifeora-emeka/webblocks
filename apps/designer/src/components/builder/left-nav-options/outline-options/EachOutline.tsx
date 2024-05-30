import { cn } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import { PiRowsFill } from 'react-icons/pi'
import {
  TbCaretDownFilled,
  TbDots,
  TbTrash,
  TbEyeClosed,
  TbBracketsContain,
  TbLock,
  TbCaretRightFilled,
  TbCopy,
} from 'react-icons/tb'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DndElementData } from '@repo/designer/types/designer.types'
import { useSelector } from 'react-redux'
import { AppStore } from '@/redux/store'
import { useBuilder } from '@/components/builder/hooks/builder.hooks'
import slugify from 'slugify'
import withRenderer, { WithRendererProps } from '@/components/builder/HOCs/WithRenderer'

type Props = {
  element: DndElementData;
  children?: any;
} & WithRendererProps;

//https://dribbble.com/shots/18864162-Updated-Nav-Icons
function EachOutline({ children, element, rendererState, builderHook }: Props) {
  const { updateElementData, updateRenderer } = builderHook;
  const { active_element } = rendererState;
  const [menuOpen, setMenuOpen] = useState(false)
  const { element_data } = element

  const isRoot = element.dnd_id.includes('-root__')
  const [showChildren, setShowChildren] = useState(isRoot);
  const isActive = active_element && active_element.dnd_id === element.dnd_id;
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState('');

  const handleNameUpdate = () => {
    setEdit(false);
    if(!name) return setName(element.element_data.name);

    updateElementData({
      element_id: element.dnd_id,
      data: {
        ...element,
        element_data: {
          ...element.element_data,
          name,
          slug: slugify(name)
        }
      }
    })

  }

  useEffect(() => {
    setName(element.element_data.name)
  }, [element])

  return (
    <>
      <div
        onClick={() => updateRenderer({ active_element: element })}
        onDoubleClick={() => {
          if(!isRoot) {
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
        {
          edit ? <input onBlur={() => handleNameUpdate()} className="truncate flex-grow outline-none border-0 bg-inherit bg-none" value={name} onChange={e => setName(e.target.value)}  /> : <span className="truncate flex-grow">{name}</span>
        }

        {
          !isRoot &&<DropdownMenu onOpenChange={setMenuOpen}>
            <DropdownMenuTrigger className={'py-0'}>
            <span
              className={cn('opacity-0 hidden group-hover:block', {
                'group-hover:opacity-100': !isActive,
                'opacity-100 block': isActive || menuOpen,
              })}
            >
              <TbDots size={18} />
            </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="dark bg-card">
              <DropdownMenuItem className="gap-default_spacing">
                <TbEyeClosed /> Hide
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-default_spacing">
                <TbCopy /> Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-default_spacing">
                <TbBracketsContain /> Group
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-default_spacing">
                <TbLock /> Lock
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/20" />
              <DropdownMenuItem className="gap-default_spacing">
                <TbTrash /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        }
      </div>
      {showChildren && (
        <div className="border-l rounded-lg flex flex-col gap-default_spacing pl-[1rem]">
          {children}
        </div>
      )}
    </>
  )
}

export default withRenderer(EachOutline);
