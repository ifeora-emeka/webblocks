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
  value: string
}

export default function DefaultBtnTab({ data, onChange, value }: Props) {
  let isActive = value
  return (
    <>
      <div className={'flex'}>
        <div
          className={
            'p-1 bg-background rounded-lg w-auto flex gap-default_spacing'
          }
        >
          {data.map((btn) => {
            return (
              <DefaultTooltip content={btn.tooltip} key={btn.value}>
                <button
                  onClick={() => onChange(btn.value)}
                  className={cn('px-4 rounded-sm py-1 hover:bg-card text-xs', {
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
