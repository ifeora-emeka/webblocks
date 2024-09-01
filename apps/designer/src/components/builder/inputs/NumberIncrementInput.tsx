import React, { useRef, useState } from 'react'

type Props = {
  value: number
  onChange: (value: number) => void
}

export default function NumberIncrementInput({ onChange, value }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [focused, setFocused] = useState(false)

  const handleFocus = () => {
    if (inputRef.current) {
      setFocused(true)
      inputRef.current.select()
    }
  }

  return (
    <div className="flex border border-border rounded-md hover:bg-background gap-default_spacing overflow-hidden p-1">
      <input
        onFocus={handleFocus}
        ref={inputRef}
        className="w-full bg-inherit border-0 outline-none px-default_spacing"
        value={value || 0}
        type={'number'}
        onChange={(e) => onChange(parseInt(e.target.value))}
      />
      <div className="flex items-center border-l border-border">
        <button
          className="text-xl font-bold text-muted-foreground hover:text-foreground px-default_spacing hover:bg-card"
          onClick={() => onChange(value ? value - 1 : 0)}
          disabled={value == 0}
        >
          -
        </button>
        <button
          className="text-xl font-bold text-muted-foreground hover:text-foreground px-default_spacing border-l hover:bg-card rounded-tr-md rounded-br-md"
          onClick={() => onChange(value ? value + 1 : 1)}
        >
          +
        </button>
      </div>
    </div>
  )
}
