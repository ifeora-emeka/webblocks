import { Input } from '@/components/ui/input'
import DefaultBtnTab from '@/components/DefaultBtnTab'
import { TbArrowsMaximize, TbLink } from 'react-icons/tb'
import { useEffect, useState } from 'react'


type Props = {
  value: number;
  onChange: (val:number) => void;
}

export default function DefaultEdgeInput({ onChange, value }:Props){

  const [number, setNumber] = useState(value);


  useEffect(() => {
    setNumber(value)
  },[value])

  useEffect(() => {
    onChange(number)
  }, [number])

  return <>
    <div className={'flex items-center gap-1 justify-between'}>
      <Input
        type={'number'}
        value={value}
        className={'bg-background text-card-foreground w-12'}
        onChange={(e) => setNumber(parseInt(e.target.value))}
      />
      <DefaultBtnTab
        className={'flex-1'}
        value={'single'}
        data={[
          {
            value: 'single',
            label: <TbLink size={16} />,
            tooltip: <p>Row: This will stack element horizontally</p>,
          },
          {
            value: 'multiple',
            label: <TbArrowsMaximize size={16} />,
            tooltip: <p>Colum: This will stack element vertically</p>,
          },
        ]}
        onChange={(e) => {
        }}
      />
    </div>
  </>
}
