import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { TbLayersLinked, TbSearch } from 'react-icons/tb'
import { useBuilderVariables } from '@/context/builder-variables.context'
import { VariableData } from '@repo/designer/types/variables.types'

export default function VariableListDropdown({ children }:{children:any}){

  return <>
    <DropdownMenu>
      <DropdownMenuTrigger>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className={'dark mt-5 p-0 min-h-80 max-h-80 min-w-[300px] max-w-[300px] mr-5'}>
        <VariableList />
      </DropdownMenuContent>
    </DropdownMenu>
  </>
}

function VariableList(){
  const { state: { variables, variableSets } } = useBuilderVariables();

  return <>
    <div className={'select-none dark min-h-80 max-h-80 w-full rounded-md'}>
      <div className={'bg-card border-b min-h-builder_nav_size_sm flex gap-default_spacing items-center px-default_spacing text-muted-foreground'}>
        <TbSearch />
        <input placeholder={'Search'} className={'bg-inherit text-card-foreground outline-none'} />
      </div>
      <div className={'bg-card h-[calc(20rem-35px)] max-h-[calc(20rem-35px)] overflow-y-auto flex gap-default_spacing_lg flex-col'}>
        {
          variableSets.map((set, i) => {
            return <div key={set._id} className={'flex flex-col'}>
              <small className={'capitalize text-muted-foreground m-default_spacing'}>{set.name}</small>
              {variables.filter(x => x.set === set._id).map((vars) => {
                return <EachVariable key={vars._id} variable={vars} />
              })}
            </div>
          })
        }
      </div>
    </div>
  </>
}

function EachVariable({ variable }: {variable: VariableData}){
  return <>
      <div className={'min-h-builder_nav_size_sm hover:bg-accent px-default_spacing'}>
        <p>{variable.name}</p>
      </div>
  </>
}
