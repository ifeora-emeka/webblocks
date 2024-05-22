import DefaultBtnTab from '@/components/DefaultBtnTab'
import { TbArrowDown, TbArrowRight } from 'react-icons/tb'

export default function FlexDisplayProperties() {
  return (
    <>
      <div className={'flex flex-col gap-default_spacing'}>
        <small>Direction</small>
        <DefaultBtnTab
          value={'flex'}
          data={[
            {
              value: 'row',
              label: <TbArrowRight size={16} />,
              tooltip: <p>Row: This will stack element horizontally</p>,
            },
            {
              value: 'column',
              label: <TbArrowDown size={16} />,
              tooltip: <p>Colum: This will stack element vertically</p>,
            },
          ]}
          onChange={(e) => {}}
        />
      </div>
    </>
  )
}
