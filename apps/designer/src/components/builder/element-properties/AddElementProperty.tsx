'use client'
import { TbPlus } from 'react-icons/tb'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChakraProps } from '@chakra-ui/react'
import { useBuilderUtils } from '../hooks/builder-utils.hooks'
import { useRenderer } from '../context/renderer.context'

interface AddElementMenuType {
  label: string
  property: keyof ChakraProps
  defaultValue: string
}

type Props = {
  options: AddElementMenuType[]
  label?: string
}

export default function AddElementProperty({ options, label }: Props) {
  const {} = useBuilderUtils()
  const { state: { active_element, allElements } } = useRenderer()

  const activeElement = allElements.find((el) => el.id === active_element[0].id)
  const chakraProps = activeElement?.chakraProps
  const chakraKeys = chakraProps ? Object.keys(chakraProps) : []

  if (options.filter((x) => !chakraKeys.includes(x.property)).length === 0) {
    return null
  }

  return (
    <>
      <div
        className={
          'w-full justify-start py-default_spacing gap-default_spacing items-center flex text-muted-foreground'
        }
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={
                'flex gap-default_spacing items-center hover:text-foreground'
              }
            >
              <div>{label || 'Add new'}</div>
              <TbPlus />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className={'dark'}>
            {options.map((option, index) => {
              if (chakraKeys.includes(option.property)) {
                return null
              }
              return (
                <DropdownMenuItem
                  key={`add-option-${index}`}
                  onClick={() => {}}
                >
                  {option.label}
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )
}
