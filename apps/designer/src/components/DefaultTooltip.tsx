import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

export default function DefaultTooltip({
  children,
  content,
  side,
  className,
}: {
  children: any
  content: any
  side?: 'right' | 'top' | 'bottom' | 'left'
  className?: string
}) {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipContent
            side={side || 'top'}
            className={cn(
              'bg-popover shadow-md text-popover-foreground',
              className,
            )}
          >
            {content}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  )
}
