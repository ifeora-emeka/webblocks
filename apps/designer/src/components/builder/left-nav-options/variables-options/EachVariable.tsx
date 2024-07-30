import { TableCell, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import DefaultTooltip from '@/components/DefaultTooltip'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { TbLock, TbTrash } from 'react-icons/tb'
import React, { useEffect, useState } from 'react'
import { VariableData } from '@repo/designer/types/variables.types'
import { useBuilderVariables } from '@/context/builder-variables.context'

type Props = {
  variable: VariableData
}

export default function EachVariable({ variable }: Props) {
  const { updateVariable, deleteVariable } = useBuilderVariables()
  const [name, setName] = useState(variable.name)
  const [value, setValue] = useState(variable.value)
  const [isNameActive, setIsNameActive] = useState(false)

  useEffect(() => {
    setName(variable.name)
    setValue(variable.value)
  }, [variable])

  const handleNameUpdate = () => {
    updateVariable({
      name,
      value,
      _id: variable._id,
    })
  }

  return (
    <>
      <TableRow className="text-foreground group">
        <TableCell className="p-default_spacing"></TableCell>
        <TableCell className="p-default_spacing">
          <div className="max-w-[60%]">
            <Input
              className="border-0 hover:bg-card focus:bg-card focus:ring-border"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus={!name}
              onBlur={() => handleNameUpdate()}
            />
          </div>
        </TableCell>
        <TableCell className="p-default_spacing">
          <div className="max-w-[60%]">
            <Input
              className="border-0 hover:bg-card focus:bg-card focus:ring-border"
              placeholder="Enter value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={() => handleNameUpdate()}
            />
          </div>
        </TableCell>
        <TableCell className="p-default_spacing">
          {variable.isStatic ? (
            <DefaultTooltip content={'Locked'} side={'top'}>
              <Button
                disabled
                variant="ghost"
                size="icon"
                className={cn(
                  'hover:bg-card hover:text-danger text-muted opacity-0 group-hover:opacity-100',
                )}
              >
                <TbLock className="h-4 w-4" />
              </Button>
            </DefaultTooltip>
          ) : (
            <DefaultTooltip content={'Delete variable'} side={'top'}>
              <Button
                onClick={() => deleteVariable(variable._id)}
                variant="ghost"
                size="icon"
                className={cn(
                  'hover:bg-card hover:text-danger text-muted opacity-0 group-hover:opacity-100',
                )}
              >
                <TbTrash className="h-4 w-4" />
              </Button>
            </DefaultTooltip>
          )}
        </TableCell>
      </TableRow>
    </>
  )
}
