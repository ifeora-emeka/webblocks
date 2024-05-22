import { ICON_LOGO } from '@/lib/constants'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function DashboardLayoutHeader() {
  return (
    <>
      <header
        className={
          'min-h-14 bg-white border-b z-50 min-w-full flex justify-center items-center border-border select-none '
        }
      >
        <div
          className={
            'lg:min-w-[1000px] lg:max-w-[1000px] w-screen flex justify-between items-center px-default_spacing'
          }
        >
          <div className={'min-w-14'}>
            <img src={ICON_LOGO} alt={'logo'} width={30} />
          </div>
          <div className={'flex gap-default_spacing items-center'}>
            <Avatar className={'h-8 w-8'}>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span>Account</span>
          </div>
        </div>
      </header>
    </>
  )
}
