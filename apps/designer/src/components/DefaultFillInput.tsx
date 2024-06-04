import { TbX } from 'react-icons/tb';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import ColorPicker from 'react-best-gradient-color-picker'

type Props = {
  value: string;
  onChange: (val:string) => void;
}

export default function DefaultFillInput({ value, onChange }:Props){
  return <>
    <div className={'bottom-[6rem] w-80 min-h-96 bg-background p-3 rounded-lg absolute z-50 right-72 shadow-lg'}>
      <ColorPicker value={value} onChange={e => console.log(e)} height={100} width={300} />
    </div>
    <div className={'bg-background p-default_spacing rounded-md flex items-center gap-default_spacing min-h-10 dark relative'}>
      <Popover>
        <PopoverTrigger asChild>
          <div className={'min-h-6 min-w-6 max-w-6 rounded-sm'} style={{ background: value }} />
        </PopoverTrigger>
        <PopoverContent side={'left'} className={'dark'}>
          <ColorPicker value={value} onChange={e => console.log(e)} height={100} width={300} />
        </PopoverContent>
      </Popover>
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
