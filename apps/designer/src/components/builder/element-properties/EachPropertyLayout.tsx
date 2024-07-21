import React from 'react'
import { TbPlus, TbX } from 'react-icons/tb'
import DefaultTooltip from '@/components/DefaultTooltip'

type Props = {
  label: string
  children: React.ReactNode
  isEmpty?: boolean
  onAddValue: () => void
  onRemoveValue?: () => void
}

export default function EachPropertyLayout({
  children,
  label,
  isEmpty,
  onAddValue,
  onRemoveValue,
}: Props) {
  return (
    <>
      <div
        className={'dark flex items-center gap-default_spacing justify-between'}
      >
        <small>{label}</small>
        <div className={'min-w-[70%] max-w-[70%] flex gap-default_spacing'}>
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
          {onRemoveValue && !isEmpty && (
            <DefaultTooltip content={'Remove'}>
              <button
                onClick={onRemoveValue}
                className={'text-muted-foreground hover:text-card-foreground'}
              >
                <TbX />
              </button>
            </DefaultTooltip>
          )}
        </div>
      </div>
    </>
  )
}
