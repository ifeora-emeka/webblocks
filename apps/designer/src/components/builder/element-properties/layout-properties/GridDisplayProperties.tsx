import EachPropertyLayout from '@/components/builder/element-properties/EachPropertyLayout'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function GridDisplayProperties() {
  return (
    <>
      <EachPropertyLayout label={'Distribution'}>
        <Select>
          <SelectTrigger className={'bg-background'}>
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent className={'dark'}>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </EachPropertyLayout>
    </>
  )
}
