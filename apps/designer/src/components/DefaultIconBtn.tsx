import DefaultTooltip from '@/components/DefaultTooltip'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const DefaultIconBtn = ({
  Icon,
  tooltip,
  onClick,
  side,
  className,
  isActive,
}: {
  Icon: any
  tooltip: string
  onClick: () => void
  side?: 'right' | 'top' | 'bottom' | 'left'
  className?: string
  isActive?: boolean
}) => {
  return (
    <DefaultTooltip content={tooltip} side={side}>
      <Button
        onClick={onClick}
        variant="ghost"
        size="icon"
        className={cn(
          'text-muted-foreground',
          {
            'text-accent-foreground bg-accent': isActive,
          },
          className,
        )}
      >
        <Icon size={20} />
      </Button>
    </DefaultTooltip>
  )
}

export default DefaultIconBtn
