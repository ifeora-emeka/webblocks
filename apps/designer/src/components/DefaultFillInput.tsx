import { TbX } from 'react-icons/tb'

type Props = {
  value: string;
  onChange: (val:string) => void;
}

export default function DefaultFillInput({ value, onChange }:Props){
  return <>
    <div className={'bg-background p-default_spacing rounded-md flex items-center gap-default_spacing min-h-10'}>
      <div className={'min-h-6 min-w-6 max-w-6 rounded-sm'} style={{ background: value }} />
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
