import { TbDeviceDesktopCheck, TbDeviceMobileOff } from 'react-icons/tb'

export default function Layout({ children }: any) {
  return (
    <>
      <div
        className={
          'bg-card dark fixed top-0 left-0 right-0 bottom-0 text-white/80 items-center justify-center  lg:hidden flex '
        }
        style={{ zIndex: 1500 }}
      >
        <div className={'flex items-center flex-col gap-5'}>
          <div className={'flex gap-10 text-muted-foreground'}>
            <TbDeviceMobileOff size={50} />
            <TbDeviceDesktopCheck size={50} />
          </div>
          <h2>Your screen size is too small</h2>
        </div>
      </div>
      {children}
    </>
  )
}
