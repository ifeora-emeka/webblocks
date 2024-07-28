import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import DefaultTooltip from '@/components/DefaultTooltip'
import { Button } from '@/components/ui/button'
import {
  TbChartCircles,
  TbNumbers,
  TbPalette,
  TbPlus,
  TbTextSize,
  TbTrash,
} from 'react-icons/tb'
import { cn } from '@/lib/utils'
import { useBuilderVariables } from '@/context/builder-variables.context'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function VariableSetDetails({
  children,
}: React.PropsWithChildren) {
  const [mounted, setMounted] = React.useState(false)
  const { activeSet } = useBuilderVariables()

  React.useEffect(() => setMounted(true), [])

  if (!activeSet) {
    return null
  }

  return (
    <div className="min-h-[calc(100vh-50px)] max-h-[calc(100vh-50px)] bg-card w-[400px] fixed bottom-0 left-[calc(50px+250px)] z-80 text-foreground animate__animated animate__fadeInLeft animate__faster select-none z-[90]">
      <Table>
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
                    <DropdownMenuItem className={'flex gap-default_spacing'}>
                      <TbNumbers size={17} /> Number
                    </DropdownMenuItem>
                    <DropdownMenuItem className={'flex gap-default_spacing'}>
                      <TbTextSize size={17} /> Text
                    </DropdownMenuItem>
                    <DropdownMenuItem className={'flex gap-default_spacing'}>
                      <TbPalette size={17} /> Color
                    </DropdownMenuItem>
                    {process.env.NODE_ENV !== 'production' && (
                      <DropdownMenuItem className={'flex gap-default_spacing'}>
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
          {new Array(7).fill(null).map((_, i) => {
            return <EachVariable key={i} />
          })}
        </TableBody>
      </Table>
    </div>
  )
}

const EachVariable = () => {
  return (
    <>
      <TableRow className="text-foreground group">
        <TableCell className="p-default_spacing"></TableCell>
        <TableCell className="p-default_spacing">
          <div className="max-w-[60%]">
            <Input
              className="border-0 hover:bg-card focus:bg-card focus:ring-border"
              placeholder="Enter name"
              value="The name"
            />
          </div>
        </TableCell>
        <TableCell className="p-default_spacing">
          <div className="max-w-[60%]">
            <Input
              className="border-0 hover:bg-card focus:bg-card focus:ring-border"
              placeholder="Enter value"
              value="48px"
            />
          </div>
        </TableCell>
        <TableCell className="p-default_spacing">
          <DefaultTooltip content={'Delete variable'} side={'top'}>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                'hover:bg-card hover:text-danger text-muted opacity-0 group-hover:opacity-100',
              )}
            >
              <TbTrash className="h-4 w-4" />
            </Button>
          </DefaultTooltip>
        </TableCell>
      </TableRow>
    </>
  )
}
