import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export default function DefaultTooltip({
  children,
  content,
  side,
}: {
  children: any
  content: any
  side?: 'right' | 'top' | 'bottom' | 'left'
}) {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>{children}</TooltipTrigger>
          <TooltipContent
            side={side || 'top'}
            className={'bg-accent text-white text-center'}
          >
            {content}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  )
}
