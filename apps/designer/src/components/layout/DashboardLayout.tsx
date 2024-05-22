import { ICON_LOGO } from '@/lib/constants'
import EachDashboardNav from '@/components/layout/EachDashboardNav'
import DashboardLayoutHeader from '@/components/layout/DashboardLayoutHeader'
import {
  TbLayoutDashboard,
  TbMoneybag,
  TbSettings2,
  TbUsers,
  TbVideo,
} from 'react-icons/tb'
import { Separator } from '@/components/ui/separator'

export default function DashboardLayout({ children }: any) {
  return (
    <div className={'flex flex-col bg-white'}>
      <DashboardLayoutHeader />
      <div className={'flex justify-center min-h-screen'}>
        <div className={'lg:min-w-[1000px] lg:max-w-[1000px] w-screen flex'}>
          <aside
            className={
              'hidden lg:flex flex-col border-r border-border min-w-[250px] '
            }
          >
            <div
              className={
                'sticky top-0 bottom-0 rounded-md min-h-[80vh] flex flex-col gap-default_spacing p-default_spacing select-none'
              }
            >
              <EachDashboardNav
                icon={TbLayoutDashboard}
                label={'All site'}
                isActive
              />
              <EachDashboardNav icon={TbMoneybag} label={'Billing'} />
              <EachDashboardNav icon={TbVideo} label={'Tutorial'} />
              <Separator />
              <EachDashboardNav icon={TbSettings2} label={'Settings'} />
            </div>
          </aside>
          <main className={'flex-1 min-h-screen flex flex-col'}>
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
