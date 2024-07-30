import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import DefaultTooltip from '@/components/DefaultTooltip'
import { Button } from '@/components/ui/button'
import {
  TbChartCircles,
  TbColumns,
  TbNumbers,
  TbPalette,
  TbPlus,
  TbTextSize,
} from 'react-icons/tb'
import { cn } from '@/lib/utils'
import { useBuilderVariables } from '@/context/builder-variables.context'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { VariableValueType } from '@repo/designer/types/variables.types'
import EachVariable from '@/components/builder/left-nav-options/variables-options/EachVariable'

export default function VariableSetDetails({
  children,
}: React.PropsWithChildren) {
  const {
    state: { variables, activeSet },
    addAVariableToSet,
  } = useBuilderVariables()
  const activeVariables = variables.filter((v) => v.set === activeSet)

  const addVariable = (type: VariableValueType) => {
    if (activeSet) {
      addAVariableToSet({
        name: '',
        setId: activeSet,
        value_type: type,
      })
    }
  }

  if (!activeSet) {
    return null
  }

  return (
    <div className="min-h-[calc(100vh-50px)] max-h-[calc(100vh-50px)] bg-card w-[400px] fixed bottom-0 left-[calc(50px+250px)] z-80 text-foreground animate__animated animate__fadeInLeft animate__faster select-none z-[90]">
      <Table>
        <TableCaption>
          {activeVariables.length === 0 ? (
            <div
              className={
                'flex flex-col w-full items-center justify-center gap-default_spacing text-muted-foreground p-10 h-72'
              }
            >
              <TbColumns size={25} />
              <small>
                No variable added yet. Click on the plus icon at the top right
                to add one
              </small>
            </div>
          ) : null}
        </TableCaption>
        <TableHeader className="max-h-[2.20rem]">
          <TableRow>
            <TableHead className="min-w-[30px] pl-5 h-[2.20rem]"></TableHead>
            <TableHead className="min-w-[200px] pl-5 h-[2.20rem]">
              Name
            </TableHead>
            <TableHead className="min-w-[100px] pl-5 h-[2.20rem]">
              Value
            </TableHead>
            <TableHead>
              <DefaultTooltip content={'Add variable'} side={'top'}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        'hover:bg-card hover:text-card-foreground text-muted',
                      )}
                    >
                      <TbPlus className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className={'dark z-[100]'}>
                    <DropdownMenuItem
                      className={'flex gap-default_spacing'}
                      onClick={() => addVariable(VariableValueType.NUMBER)}
                    >
                      <TbNumbers size={17} /> Number
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className={'flex gap-default_spacing'}
                      onClick={() => addVariable(VariableValueType.TEXT)}
                    >
                      <TbTextSize size={17} /> Text
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className={'flex gap-default_spacing'}
                      onClick={() => addVariable(VariableValueType.COLOR)}
                    >
                      <TbPalette size={17} /> Color
                    </DropdownMenuItem>
                    {process.env.NODE_ENV !== 'production' && (
                      <DropdownMenuItem
                        className={'flex gap-default_spacing'}
                        onClick={() => addVariable(VariableValueType.BOOLEAN)}
                      >
                        <TbChartCircles size={17} />
                        Boolean
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </DefaultTooltip>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {variables
            .filter((v) => v.set === activeSet)
            .map((v, i) => {
              return <EachVariable key={i} variable={v} />
            })}
        </TableBody>
      </Table>
    </div>
  )
}
