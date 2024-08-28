import { TbCapture, TbX } from 'react-icons/tb'
import React, { useRef, useState } from 'react'
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
  isCorners?: boolean
  withoutUOM?: boolean
  leftContent?: any[]
}

export default function UOMInput(props: Props) {
  if (props.isCorners) {
    return <MultipleUOMInput {...props} />
  }
  return <SingleUOMInput {...props} />
}

export function MultipleUOMInput(props: Props) {
  const { leftContent } = props
  const { isCorners, onChange, value, allowed_values, ref_value } = props

  let allValues = value.split(' ')

  const updateCornerValue = (value: string, index: number) => {
    let allUOM = [...allValues]
    allUOM[index] = value
    let newVal = allUOM.join(' ')

    onChange(newVal)
  }

  return (
    <>
      <div
        className={
          'min-h-20 rounded-md w-full flex flex-wrap gap-default_spacing'
        }
      >
        <div className={'flex gap-default_spacing'}>
          <SingleUOMInput
            {...props}
            leftContent={leftContent && leftContent[0]}
            onChange={(val) => updateCornerValue(`${val}`, 0)}
            value={allValues[0]}
            allowed_values={allowed_values}
            ref_value={ref_value}
          />
          <SingleUOMInput
            {...props}
            leftContent={leftContent && leftContent[1]}
            onChange={(val) => updateCornerValue(`${val}`, 1)}
            value={allValues[1]}
            allowed_values={allowed_values}
            ref_value={ref_value}
          />
        </div>
        <div className={'flex gap-default_spacing'}>
          <SingleUOMInput
            {...props}
            leftContent={leftContent && leftContent[2]}
            onChange={(val) => updateCornerValue(`${val}`, 2)}
            value={allValues[2]}
            allowed_values={allowed_values}
            ref_value={ref_value}
          />
          <SingleUOMInput
            {...props}
            leftContent={leftContent && leftContent[3]}
            isCorners={isCorners}
            onChange={(val) => updateCornerValue(`${val}`, 3)}
            value={allValues[3]}
            allowed_values={allowed_values}
            ref_value={ref_value}
          />
        </div>
      </div>
    </>
  )
}

export function SingleUOMInput({
  allowed_values,
  value,
  onChange,
  ref_value,
  withoutUOM,
  leftContent,
  isCorners,
}: Props) {
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFocus = () => {
    if (inputRef.current) {
      setFocused(true)
      inputRef.current.select()
    }
  }

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
          'flex items-center dark h-9 px-2 rounded-lg hover:bg-background max-w-[100%] justify-between  border',
          {
            'bg-background': focused,
            'gap-default_spacing': withoutUOM,
            'gap-default_spacing_lg': !withoutUOM,
          },
        )}
      >
        <div className={'flex items-center gap-default_spacing text-xs'}>
          {leftContent && isCorners && (
            <div className={'text-muted-foreground text-[9px]'}>
              {leftContent}
            </div>
          )}
          {value.includes('ref') ? (
            <EachVariableBadge
              onChange={onChange}
              ref_value={ref_value}
              allowed_values={allowed_values}
            />
          ) : (
            <>
              <div className={'flex items-center w-full'}>
                <input
                  type={'number'}
                  ref={inputRef}
                  className={'w-full bg-inherit dark outline-none text-sm'}
                  onFocus={handleFocus}
                  onBlur={() => setFocused(false)}
                  value={removeUOM(value.trim())}
                  onChange={(e) =>
                    onChange(
                      parseInt(e.target.value.trim() || '0') +
                        getUOM(value.trim()) || 'px',
                    )
                  }
                />
                {!withoutUOM && (
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
                            checked={value.includes(
                              //@ts-ignore
                              SUPPORTED_UOM[uom] as string,
                            )}
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
                )}
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
      </div>
    </>
  )
}

const EachVariableBadge = ({
  allowed_values,
  ref_value,
  onChange,
}: {
  allowed_values: VariableValueType[]
  onChange: (val: string) => void
  ref_value: string
}) => {
  return (
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
  )
}
