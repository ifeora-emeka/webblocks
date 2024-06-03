import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { useEffect, useState } from 'react'

type Props = {
  value: number;
  max: number;
  step: number;
  onChange: (value:number) => void;
}

export default function DefaultSliderInput({value, max, step, onChange}:Props){

  const [number, setNumber] = useState(0);

  useEffect(() => {
    setNumber((value))
  },[])

  useEffect(() => {
    onChange(number)
  },[number])

  return <>
    <div className={'flex items-center gap-default_spacing'}>
      <Input
        type={'number'}
        className={'bg-background text-card-foreground w-14'}
        value={number}
        onChange={(e) =>
          setNumber(Number(e.target.value))
        }
      />
      <Slider
        defaultValue={[number]}
        value={[number]}
        max={max}
        step={step}
        className={'w-full'}
        onValueChange={(e) => {
          setNumber(e[0])
        }}
      />
    </div>
  </>
}
