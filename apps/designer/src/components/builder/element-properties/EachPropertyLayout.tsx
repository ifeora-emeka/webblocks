import React from 'react'
import { TbPlus } from 'react-icons/tb'

type Props = {
  label: string
  children: React.ReactNode;
  isEmpty?: boolean;
  onAddValue: () => void;
}

export default function EachPropertyLayout({ children, label, isEmpty, onAddValue }: Props) {
  return (
    <>
      <div
        className={'dark flex items-center gap-default_spacing justify-between'}
      >
        <small>{label}</small>
        <div className={'min-w-[70%] max-w-[70%] flex gap-default_spacing'}>
          {
            isEmpty ? <>
              <div className={'w-full flex justify-end'}>
                <button onClick={onAddValue} className={'flex px-3 py-1 rounded-md items-center gap-default_spacing text-xs text-muted-foreground hover:text-card-foreground hover:bg-accent'}>
                  Add <TbPlus />
                </button>
              </div>
            </>: children
          }
        </div>
      </div>
    </>
  )
}
