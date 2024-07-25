import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const EachPropertyButton = ({
  children,
  isActive,
  onClick,
  toolTip,
}: {
  children: any
  isActive?: boolean
  onClick: () => void
  toolTip: string
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className={cn(
              'h-6 text-xs w-full rounded-md flex justify-center items-center hover:text-card-foreground',
              {
                'bg-card': isActive,
                'text-muted-foreground': !isActive,
              },
            )}
            onClick={onClick}
          >
            {children}
          </button>
        </TooltipTrigger>
        <TooltipContent className="bg-background text-card-foreground">
          <p>{toolTip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default EachPropertyButton
