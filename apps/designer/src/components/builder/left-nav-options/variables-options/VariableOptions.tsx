import React, { useEffect, useState } from 'react'
import BuilderLeftPanelContainer from '../../layout/BuilderLeftPanelContainer'
import DefaultTooltip from '@/components/DefaultTooltip'
import { Button } from '@/components/ui/button'
import { TbDotsVertical, TbPencil, TbPlus, TbTrash } from 'react-icons/tb'
import { cn } from '@/lib/utils'
import VariableSetDetails from './VariableSetDetails'
import { useBuilderVariables } from '@/context/builder-variables.context'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type Props = {}

export default function VariableOptions({}: Props) {
  const { variableSets, createVariableSet, setActiveSet, activeSet } =
    useBuilderVariables()

  const createSet = () => {
    createVariableSet('Untitled set')
  }

  return (
    <>
      <BuilderLeftPanelContainer
        onSearch={() => {}}
        heading="Variables"
        actions={
          <div>
            <DefaultTooltip content={'Create set'} side={'top'}>
              <Button
                variant="ghost"
                size="icon"
                className={'hover:bg-card'}
                onClick={createSet}
              >
                <TbPlus className="h-4 w-4" />
              </Button>
            </DefaultTooltip>
          </div>
        }
      >
        {variableSets.map((v) => {
          return (
            <EachVariableSet
              _id={v._id}
              label={v.name}
              key={v._id + v.index}
              editEnabled={v.editEnabled}
              onClick={() => setActiveSet(v._id)}
              isActive={v._id === activeSet}
            />
          )
        })}
      </BuilderLeftPanelContainer>
      <VariableSetDetails />
    </>
  )
}

const EachVariableSet = ({
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
}) => {
  const [editMode, setEditMode] = useState(false)
  const [name, setName] = useState(label)
  const { updateVariableSet } = useBuilderVariables()

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
              <DropdownMenuItem className={'flex gap-default_spacing'}>
                <TbPencil size={17} />
                Edit
              </DropdownMenuItem>
              {!isStatic && (
                <DropdownMenuItem className={'flex gap-default_spacing'}>
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
