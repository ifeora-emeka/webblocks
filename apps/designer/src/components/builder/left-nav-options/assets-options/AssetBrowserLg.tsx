import {
  TbBrandUnsplash,
  TbFolderPlus,
  TbPhoto,
  TbSearch,
} from 'react-icons/tb'
import { Button } from '@/components/ui/button'
import EachFile from '@/components/builder/left-nav-options/assets-options/EachFile'

export default function AssetBrowserLg() {
  return (
    <>
      <div
        className={
          'min-w-[700px] max-w-[700px] h-[calc(100vh-50px)] max-h-[calc(100vh-50px)] bg-card fixed shadow-lg left-[50px] border-l border-r flex'
        }
        style={{ zIndex: 500 }}
      >
        <div
          className={
            'w-[50px] max-w-[50px] border-r h-[calc(100vh-50px)] max-h-[calc(100vh-50px)] text-muted-foreground flex flex-col items-center py-default_spacing gap-default_spacing'
          }
        >
          <Button variant="outline" size="icon" className={'bg-card'}>
            <TbPhoto className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" className={'bg-card'}>
            <TbBrandUnsplash className="h-5 w-5" />
          </Button>
        </div>
        <div
          className={
            'bg-background flex-grow flex flex-col max-w-[calc(700px-50px)]'
          }
        >
          <div
            className={
              'h-[500px] max-h-[50px] border-b bg-card flex items-center justify-between px-default_spacing gap-default_spacing'
            }
          >
            <Button
              variant="ghost"
              size="icon"
              className={'text-muted-foreground'}
            >
              <TbFolderPlus className="h-5 w-5" />
            </Button>

            <div
              className={
                'border hover:bg-background rounded-lg flex flex-grow p-default_spacing items-center text-muted-foreground gap-default_spacing'
              }
            >
              <TbSearch />
              <input
                placeholder={'Search items...'}
                className={
                  'flex-1 bg-inherit outline-none text-card-foreground text-sm'
                }
                type={'search'}
              />
            </div>

            <Button
              variant="ghost"
              size="icon"
              className={'text-muted-foreground'}
            >
              <TbFolderPlus className="h-5 w-5" />
            </Button>
          </div>
          <div
            className={
              'min-h-[calc(100vh-50px-50px)] max-h-[calc(100vh-50px-50px)] flex flex-grow overflow-y-auto flex-col'
            }
          >
            <div
              className={
                'grid grid-cols-5 gap-default_spacing p-default_spacing'
              }
            >
              {new Array(35).fill(null).map((_) => {
                return (
                  <EachFile
                    key={crypto.randomUUID()}
                    preview={'/designer/img/folder.webp'}
                    name={'The name of the file'}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
