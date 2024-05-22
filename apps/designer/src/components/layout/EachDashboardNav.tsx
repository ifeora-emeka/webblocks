import { TbLayoutDashboard } from 'react-icons/tb'
import { cn } from '@/lib/utils'

type Props = {
  label: string
  isActive?: boolean
  hasNotification?: boolean
  icon: any
}

export default function EachDashboardNav({
  label,
  isActive,
  hasNotification,
  icon: Icon,
}: Props) {
  return (
    <>
      <div
        role={'button'}
        className={cn(
          'flex items-center hover:bg-accent rounded-md p-default_spacing',
          {
            'bg-accent': isActive,
          },
        )}
      >
        <div
          className={
            'flex items-center gap-default_spacing flex-1 text-accent-foreground'
          }
        >
          <Icon size={17} />
          <span>{label}</span>
        </div>
        {hasNotification && (
          <div className={'bg-primary min-h-2 min-w-2 rounded-full'} />
        )}
      </div>
    </>
  )
}
