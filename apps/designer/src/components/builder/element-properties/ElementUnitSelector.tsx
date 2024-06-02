import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function ElementUnitSelector(){
  return <>
    <Select defaultValue={'px'}>
      <SelectTrigger className="max-w-20 bg-background">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent className={'dark'}>
        <SelectItem value="px">px</SelectItem>
        <SelectItem value="%">fill</SelectItem>
        <SelectItem value="vh">vh</SelectItem>
        <SelectItem value="vw">vw</SelectItem>
      </SelectContent>
    </Select>
  </>
}