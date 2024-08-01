import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { TbNumbers, TbPalette, TbSearch, TbTextSize } from 'react-icons/tb'
import { useBuilderVariables } from '@/context/builder-variables.context'
import {
  VariableData,
  VariableValueType,
} from '@repo/designer/types/variables.types'
import { cn } from '@/lib/utils'
import { createRefString } from '@/components/builder/builder.utils'

type Props = {
  children: React.ReactNode
  allowed_values: VariableValueType[]
  onChange: (e: string) => void
}

export default function VariableListDropdown({
  children,
  allowed_values,
  onChange,
}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        className={
          'dark mt-5 p-0 min-h-80 max-h-80 min-w-[300px] max-w-[300px] mr-5'
        }
      >
        <VariableList allowed_values={allowed_values} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function VariableList({
  allowed_values,
  onChange,
}: {
  allowed_values: VariableValueType[]
  onChange: (e: string) => void
}) {
  const {
    state: { variables, variableSets },
  } = useBuilderVariables()
  const [searchQuery, setSearchQuery] = useState<string>('')

  const filteredVariablesByType = variables.filter((variable) =>
    allowed_values.includes(variable.value_type),
  )

  const filteredVariableSets = variableSets.filter((set) =>
    filteredVariablesByType.some(
      (variable) =>
        variable.set === set._id &&
        variable.name.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  )

  const filteredVariables = filteredVariablesByType.filter((variable) =>
    variable.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const displayedVariables = filteredVariables.filter((variable) =>
    filteredVariableSets.some((set) => set._id === variable.set),
  )

  return (
    <div className={'select-none dark min-h-80 max-h-80 w-full rounded-md'}>
      <div
        className={
          'bg-card border-b min-h-builder_nav_size_sm flex gap-default_spacing items-center px-default_spacing_lg text-muted-foreground'
        }
      >
        <TbSearch />
        <input
          placeholder={'Search variables'}
          className={'bg-inherit text-card-foreground outline-none'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div
        className={
          'bg-card h-[calc(20rem-40px)] max-h-[calc(20rem-35px)] overflow-y-auto flex gap-default_spacing_lg flex-col p-default_spacing'
        }
      >
        {filteredVariableSets.map((set) => (
          <div key={set._id} className={'flex flex-col'}>
            <small
              className={'capitalize text-muted-foreground m-default_spacing'}
            >
              {set.name}
            </small>
            {displayedVariables
              .filter((variable) => variable.set === set._id)
              .map((variable) => (
                <EachVariable
                  key={variable._id}
                  variable={variable}
                  onClick={() =>
                    onChange(
                      createRefString({
                        type: 'variables',
                        ref_id: variable._id,
                      }),
                    )
                  }
                />
              ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function EachVariable({
  variable,
  onClick,
}: {
  variable: VariableData
  onClick: () => void
}) {
  const renderValue = () => {
    switch (variable.value_type) {
      case VariableValueType.COLOR:
        return (
          <div
            className={cn(`h-5 w-5 rounded-full`)}
            style={{ background: variable.value }}
          />
        )
      default:
        return <p className={'text-muted-foreground'}>{variable.value}</p>
    }
  }

  const renderIcon = () => {
    switch (variable.value_type) {
      case VariableValueType.COLOR:
        return <TbPalette />
      case VariableValueType.NUMBER:
        return <TbNumbers />
      default:
        return <TbTextSize />
    }
  }

  return (
    <div
      onClick={onClick}
      className={
        'p-default_spacing hover:bg-accent px-default_spacing items-center flex justify-between rounded-md cursor-pointer'
      }
    >
      <div className={'flex gap-default_spacing items-center'}>
        <div>{renderIcon()}</div>
        <p>{variable.name}</p>
      </div>
      {renderValue()}
    </div>
  )
}
