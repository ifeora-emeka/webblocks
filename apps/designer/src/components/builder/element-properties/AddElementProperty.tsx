'use client'
import { TbPlus } from 'react-icons/tb'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChakraProps } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { AppStore } from '@/redux/store'
import { generateStaticBreakpoints } from '@/lib/designer.utils'
import { DndElementData } from '@repo/designer/types/designer.types'
import { useBuilderUtils } from '../hooks/builder-utils.hooks'

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
  const { updateElementChakraStyleData } = useBuilderUtils()
  const { active_element, allElements } = useSelector(
    (state: AppStore) => state.renderer,
  )

  const activeElement = allElements.find(
    (el) => el.dnd_id === active_element[0].dnd_id,
  )
  const chakraProps = activeElement?.element_data?.chakraProps
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
                  onClick={() => {
                    updateElementChakraStyleData({
                      element_id: active_element[0].element_data.element_id,
                      //@ts-ignore
                      newChakraStyle: {
                        [option.property]: generateStaticBreakpoints(
                          option.defaultValue,
                        ),
                      },
                    })
                  }}
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
