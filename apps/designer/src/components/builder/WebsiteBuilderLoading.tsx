import { cn } from '@/lib/utils'
import { BUILDER_NAV_SIZE } from '@/components/builder/builder.constants'

export default function WebsiteBuilderLoading() {
  return (
    <>
      <div
        className={
          'bg-background min-h-[100vh] max-h-[100vh] flex dark flex-col'
        }
      >
        <div
          className={cn(
            `min-h-builder_nav_size max-h-builder_nav_size bg-card w-full`,
          )}
        ></div>
        <div className={'flex-1 flex'}>
          <div
            className={cn(
              `min-h-[calc(100vh-${BUILDER_NAV_SIZE})] max-h-[calc(100vh-50px)] bg-card min-w-builder_nav_size`,
            )}
          ></div>
          <div
            className={cn(
              `flex-1 flex justify-center min-h-[calc(100vh-${BUILDER_NAV_SIZE})] max-h-[calc(100vh-50px)] overflow-y-auto `,
            )}
          >
            <div
              className={'bg-card rounded-lg min-h-screen min-w-[95%] my-10'}
            ></div>
          </div>
          <div
            className={`min-h-[calc(100vh-${BUILDER_NAV_SIZE})] max-h-[calc(100vh-${BUILDER_NAV_SIZE})] bg-card min-w-[400px] max-w-[500px]`}
          ></div>
        </div>
      </div>
    </>
  )
}
