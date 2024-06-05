import { TbX } from 'react-icons/tb';
import ColorPicker from 'react-best-gradient-color-picker'
import { useState } from 'react'

type Props = {
  value: string;
  onChange: (val:string) => void;
}

export default function DefaultFillInput({ value, onChange }:Props){
  const [show, setShow] = useState(false);
  const [color, setColor] = useState(value);

  return <>
    {
      show && <div
        className={'bottom-[6rem] w-80 min-h-96 bg-background p-3 rounded-lg absolute z-50 right-72 shadow-lg animate__animated animate__fadeIn animate__faster flex flex-col gap-default_spacing'}>
        <header className={'flex items-center justify-between h-8 max-h-8'}>
          <span>Fill</span>
          <button onClick={() => setShow(false)}>
            <TbX />
          </button>
        </header>
        <ColorPicker value={value} onChange={e => setColor(e)} height={100} width={300} />
      </div>
    }
    <div
      className={'bg-background p-default_spacing rounded-md flex items-center gap-default_spacing min-h-10 dark relative'}>
      <div className={'min-h-6 min-w-6 max-w-6 rounded-sm cursor-pointer'} style={{ background: color }} onClick={() => setShow(!show)} />
      <div className={'flex-grow'}>
        <span className={'truncate'}>
          {value}
        </span>
      </div>
      <button className={'text-muted-foreground hover:text-white/80'}>
        <TbX />
      </button>
    </div>
  </>
}
