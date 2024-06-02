import { cn } from '@/lib/utils'
import DefaultTooltip from '@/components/DefaultTooltip'

type BtnTabProps = {
  label: any
  value: string
  tooltip: any
}

interface Props {
  data: BtnTabProps[]
  onChange: (value: string) => void
  value: string;
  className?: string;
}

export default function DefaultBtnTab({ data, onChange, value, className }: Props) {
  let isActive = value
  return (
    <>
      <div className={'flex'}>
        <div
          className={
            cn('p-1 flex-1 bg-background rounded-lg w-auto flex gap-default_spacing h-9', className)
          }
        >
          {data.map((btn) => {
            return (
              <DefaultTooltip content={btn.tooltip} key={btn.value}>
                <button
                  onClick={() => onChange(btn.value)}
                  className={cn('w-full text-center px-4 rounded-sm py-1 hover:bg-card text-xs flex justify-center items-center', {
                    'bg-card': value === btn.value,
                  })}
                >
                  {btn.label}
                </button>
              </DefaultTooltip>
            )
          })}
        </div>
      </div>
    </>
  )
}
