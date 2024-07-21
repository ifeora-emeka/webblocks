import { cn } from '@/lib/utils'

const EachPropertyButton = ({
  children,
  isActive,
  onClick,
}: {
  children: any
  isActive?: boolean
  onClick: () => void
}) => {
  return (
    <button
      className={cn(
        'h-6 text-xs w-full rounded-md flex justify-center items-center',
        {
          'bg-accent': isActive,
        },
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default EachPropertyButton
