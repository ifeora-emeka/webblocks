import { cn } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import { TbSearch } from 'react-icons/tb'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

type Props = {
  actions: any
  children: any
  heading: string
  onSearch: (keyword:string) => void;
}

export default function BuilderLeftPanelContainer({
                                                    actions,
                                                    children,
                                                    heading,
                                                    onSearch
                                                  }: Props) {
  return (
    <>
      <aside
        className={
          'bg-card shadow-xl z-50 border-l border-r min-w-[250px] max-w-[250px] min-h-[calc(100vh-50px)] max-h-[calc(100vh-50px)] bottom-0  left-[50px] flex flex-col text-muted-foreground select-none animate__animated animate__fadeInLeft animate__faster'
        }
      >
        <div
          className={cn(
            `h-[2.25rem] max-h-[2.25rem] border-b flex items-center px-default_spacing justify-between`,
          )}
        >
          <small className={'text-white/80'}>{heading}</small>
          <div className={'flex items-center gap-default_spacing'}>
            {actions}
          </div>
        </div>
        <div
          className={cn(
            `h-[2.25rem] max-h-[2.25rem] border-b flex items-center px-default_spacing`,
          )}
        >
          <SearchInput onSearch={onSearch} />
        </div>
        <div
          className={`flex-grow max-h-[calc(100vh-50px-2.25rem-2.25rem)] overflow-y-auto overflow-x-hidden`}
        >
          {children}
        </div>
      </aside>
    </>
  )
}

const SearchInput = ({ onSearch }: { onSearch: (keyword:string) => void;}) => {
  const { panel } = useSelector((state: RootState) => state.builder_view)
  const [inFocus, setInFocus] = useState(false);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    onSearch(keyword)
  }, [keyword])

  return (
    <>
      <div
        className={cn(
          ' flex items-center w-full rounded-md gap-default_spacing py-[3px] px-default_spacing',
          {
            'bg-background': inFocus,
          },
        )}
      >
        <TbSearch />
        <input
          onChange={e => setKeyword(e.target.value)}
          value={keyword}
          onFocus={() => setInFocus(true)}
          onBlur={() => setInFocus(false)}
          placeholder={`Search ${panel}...`}
          className={'bg-inherit text-sm outline-none flex-1 text-white/80'}
        />
      </div>
    </>
  )
}
