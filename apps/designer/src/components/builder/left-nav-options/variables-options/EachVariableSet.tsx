import React, { useEffect, useState } from 'react'
import { useBuilderVariables } from '@/context/builder-variables.context'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { TbDotsVertical, TbLock, TbPencil, TbTrash } from 'react-icons/tb'

export default function EachVariableSet({
  label,
  isActive,
  editEnabled,
  onClick,
  isStatic,
  _id,
}: {
  isActive?: boolean
  label: string
  editEnabled?: boolean
  onClick: () => void
  isStatic?: boolean
  _id: string
}) {
  const [editMode, setEditMode] = useState(false)
  const [name, setName] = useState(label)
  const { updateVariableSet, deleteSetByID } = useBuilderVariables()

  const handleUpdate = () => {
    updateVariableSet({
      name,
      _id,
    })
    setEditMode(false)
  }

  useEffect(() => {
    setEditMode(editEnabled || false)
    setName(label)
  }, [editEnabled, label])
  return (
    <>
      <div
        onClick={onClick}
        onDoubleClick={() => setEditMode(true)}
        className={cn(
          'flex gap-default_spacing items-center border-b p-default_spacing hover:bg-accent group hover:text-card-foreground',
          {
            'bg-accent text-card-foreground': isActive,
            'cursor-pointer': !editMode,
          },
        )}
      >
        <div className="flex-1 truncate">
          {editMode ? (
            <input
              onChange={(e) => setName(e.target.value)}
              className={cn(
                'dark bg-card text-card-foreground hover:bg-accent group-hover:bg-accent outline-none text-sm',
                {
                  'bg-accent': isActive,
                },
              )}
              placeholder={'Enter name'}
              value={name}
              onBlur={handleUpdate}
              autoFocus
            />
          ) : (
            <span className={'text-sm '}>{name}</span>
          )}
        </div>
        {isStatic && <TbLock />}
        {!editMode && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                }}
                className={cn('', {
                  '': isActive,
                  'opacity-0 group-hover:opacity-100': !isActive,
                })}
              >
                <TbDotsVertical />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={'z-[100] dark'}>
              <DropdownMenuItem
                className={'flex gap-default_spacing'}
                onClick={() => setEditMode(true)}
              >
                <TbPencil size={17} />
                Edit
              </DropdownMenuItem>
              {!isStatic && (
                <DropdownMenuItem
                  className={'flex gap-default_spacing'}
                  onClick={() => deleteSetByID(_id)}
                >
                  <TbTrash size={17} />
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </>
  )
}
