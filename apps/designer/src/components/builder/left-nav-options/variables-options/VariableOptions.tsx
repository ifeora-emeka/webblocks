import React, { useEffect, useState } from 'react'
import BuilderLeftPanelContainer from '../../layout/BuilderLeftPanelContainer'
import DefaultTooltip from '@/components/DefaultTooltip'
import { Button } from '@/components/ui/button'
import { TbDotsVertical, TbPencil, TbPlus, TbTrash } from 'react-icons/tb'
import { cn } from '@/lib/utils'
import VariableSetDetails from './VariableSetDetails'
import { useBuilderVariables } from '@/components/builder/context/builder-variables.context'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import EachVariableSet from '@/components/builder/left-nav-options/variables-options/EachVariableSet'

type Props = {}

export default function VariableOptions({}: Props) {
  const {
    createVariableSet,
    setActiveSet,
    state: { variableSets, activeSet },
  } = useBuilderVariables()

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
              isStatic={v.isStatic}
            />
          )
        })}
      </BuilderLeftPanelContainer>
      <VariableSetDetails />
    </>
  )
}
