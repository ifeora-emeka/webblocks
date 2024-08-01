import { TbCapture, TbX } from 'react-icons/tb'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import VariableListDropdown from '@/components/builder/inputs/VariableLIstDropdown'
import { VariableValueType } from '@repo/designer/types/variables.types'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SUPPORTED_UOM } from '@/components/builder/builder.constants'

type Props = {
  value: string
  allowed_values: VariableValueType[]
  onChange: (e: number | string) => void
  ref_value: string
}

export default function UOMInput({
  allowed_values,
  value,
  onChange,
  ref_value,
}: Props) {
  const [focused, setFocused] = useState(false)

  const removeUOM = (value: string) => {
    let val
    Object.values(SUPPORTED_UOM).forEach((uom) => {
      if (value.includes(uom.trim())) {
        val = value.replaceAll(uom, '')
      }
    })
    return val
  }

  const getUOM = (val: string): string => {
    for (const uom of Object.values(SUPPORTED_UOM)) {
      if (val.trim().endsWith(uom.trim())) {
        return uom.trim()
      }
    }
    return 'px'
  }

  return (
    <>
      <div
        className={cn(
          'flex items-center dark h-9 px-2 rounded-lg hover:bg-background max-w-[90%] justify-between gap-default_spacing_lg border',
          {
            'bg-background': focused,
          },
        )}
      >
        {value.includes('ref') ? (
          <div
            className={
              'bg-purple-300 font-bold text-purple-700 border border-purple-700 text-center rounded-sm flex items-center px-1 gap-default_spacing cursor-pointer'
            }
          >
            <VariableListDropdown
              allowed_values={allowed_values}
              onChange={(val) => onChange(val)}
            >
              <small className={'flex-1 truncate pl-2'}>{ref_value}</small>
            </VariableListDropdown>

            <button onClick={() => onChange(ref_value.trim() || '16' + 'px')}>
              <TbX />
            </button>
          </div>
        ) : (
          <>
            <div className={'flex items-center w-full'}>
              <input
                type={'number'}
                className={'w-full bg-inherit dark outline-none text-sm'}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                value={removeUOM(value.trim())}
                onChange={(e) =>
                  onChange(
                    parseInt(e.target.value.trim() || '0') +
                      getUOM(value.trim()) || 'px',
                  )
                }
              />
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className={'h-full flex items-start text-sm'}>
                    {getUOM(value)}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className={'dark'}>
                  {Object.keys(SUPPORTED_UOM).map((uom) => {
                    return (
                      <DropdownMenuCheckboxItem
                        className={'capitalize'}
                        key={uom}
                        // @ts-ignore
                        checked={value.includes(SUPPORTED_UOM[uom] as string)}
                        onCheckedChange={(e) =>
                          // @ts-ignore
                          onChange(removeUOM(value) + SUPPORTED_UOM[uom])
                        }
                      >
                        {uom.replaceAll('_', ' ')}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <VariableListDropdown
              allowed_values={allowed_values}
              onChange={(val) => onChange(val)}
            >
              <div className={'text-purple-400 h-full flex items-center'}>
                <TbCapture />
              </div>
            </VariableListDropdown>
          </>
        )}
      </div>
    </>
  )
}
