import { TbLayersLinked } from 'react-icons/tb'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import VariableListDropdown from '@/components/builder/inputs/VariableLIstDropdown'


type Props = {
  value: string;
  
}

export default function UOMInput(){
  const [focused, setFocused] = useState(false);

  return <>
    <div className={cn('flex items-center dark h-9 px-2 rounded-lg hover:bg-background w-[62%] justify-between gap-default_spacing_lg border', {
      "bg-background": focused
    })}>
      <div className={'flex items-center'}>
        <input value={384} className={'w-full bg-inherit dark outline-none text-sm'} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
        <div className={'h-full flex items-start text-sm'}>
          px
        </div>
      </div>
      <VariableListDropdown>
        <div className={'text-purple-500 h-full flex items-center'}>
          <TbLayersLinked />
        </div>
      </VariableListDropdown>
    </div>
  </>
}
