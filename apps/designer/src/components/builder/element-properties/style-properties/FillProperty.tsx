import DefaultFillInput from '@/components/DefaultFillInput'
import EachPropertyLayout from '@/components/builder/element-properties/EachPropertyLayout'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppStore } from '@/redux/store'
import { useBuilder } from '@/components/builder/hooks/builder.hooks'

function FillProperty(){
  const { updateElementChakraStyleData } = useBuilder()
  const { active_element, activeBreakpoint, allElements } = useSelector((state:AppStore) => state.renderer)

  const activeElement = allElements.filter(el => el.dnd_id === active_element[0].dnd_id)[0]
  const chakraProps = activeElement.element_data.chakraProps;

  // @ts-ignore

  const [background, setBackground] = useState<string>(chakraProps['background'][activeBreakpoint]);
  useEffect(() => {
    // @ts-ignore
    setBackground(chakraProps['background'][activeBreakpoint])

  },[active_element])


  useEffect(() => {
    // @ts-ignore
    setBackground(chakraProps['background'][activeBreakpoint]);
  },[]);


  if(!chakraProps['background']) {
    return null
  }

  const updateBackground = (color:string) => {
    updateElementChakraStyleData({
      element_id: active_element[0].element_data.element_id,
      newChakraStyle: {
        background: {
          ...chakraProps['background'],
          [activeBreakpoint]: color
        }
      }
    })
    setBackground(color)
  }


  return <>
    <EachPropertyLayout label={'Fill'}>
      {/*@ts-ignore*/}
      <DefaultFillInput value={active_element[0].element_data.chakraProps['background'][activeBreakpoint] as any || ''} onChange={e => {
        updateBackground(e)
      }} />
    </EachPropertyLayout>
  </>
}

export default FillProperty
