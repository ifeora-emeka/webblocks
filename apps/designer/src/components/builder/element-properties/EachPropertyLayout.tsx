import React from 'react'
import { TbBorderCorners, TbPlus } from 'react-icons/tb'
import DefaultTooltip from '@/components/DefaultTooltip'
import { IoRemoveOutline } from 'react-icons/io5'

type Props = {
  label: string
  children: React.ReactNode
  isEmpty?: boolean
  onAddValue: () => void
  onRemoveValue?: () => void
  onAddCorners?: () => void
}

export default function EachPropertyLayout({
  children,
  label,
  isEmpty,
  onAddValue,
  onRemoveValue,
  onAddCorners
}: Props) {
  return (
    <>
      <div
        className={'dark flex items-center justify-between min-h-10 max-h-10-'}
      >
        <div className={'min-w-[30%] max-w-[30%]'}>
          <label className="text-xs text-muted-foreground">{label}</label>
        </div>
        <div
          className={
            'min-w-[65%] max-w-[65%] flex gap-default_spacing justify-end'
          }
        >
          {isEmpty ? (
            <>
              <div className={'w-full flex justify-end'}>
                <button
                  onClick={onAddValue}
                  className={
                    'flex px-3 py-1 rounded-md items-center gap-default_spacing text-xs text-muted-foreground hover:text-card-foreground hover:bg-accent'
                  }
                >
                  Add <TbPlus />
                </button>
              </div>
            </>
          ) : (
            children
          )}
          {
            onAddCorners && !isEmpty && <button onClick={onAddCorners}>
              <TbBorderCorners />
            </button>
          }
          {onRemoveValue && !isEmpty && (
            <DefaultTooltip content={'Remove'}>
              <button
                onClick={onRemoveValue}
                className={'text-card-foreground hover:text-card-foreground'}
              >
                <IoRemoveOutline />
              </button>
            </DefaultTooltip>
          )}
        </div>
      </div>
    </>
  )
}
