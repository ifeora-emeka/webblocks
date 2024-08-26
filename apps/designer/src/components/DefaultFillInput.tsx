import { TbLayersLinked, TbX } from 'react-icons/tb'
import ColorPicker from 'react-best-gradient-color-picker'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppStore } from '@/redux/store'
import DefaultTooltip from '@/components/DefaultTooltip'

type Props = {
  value: string
  onChange: (val: string) => void
}

export default function DefaultFillInput({ value, onChange }: Props) {
  const { active_element } = useSelector((state: AppStore) => state.renderer)
  const [show, setShow] = useState(false)
  const [color, setColor] = useState(value)

  useEffect(() => {
    if (value && active_element.length > 0) {
      setColor(value)
    }
  }, [value, active_element])

  const updateFillColor = (color: string) => {
    setColor(color)
    onChange(color)
  }

  return (
    <>
      {show && (
        <div
          className={
            'bottom-[6rem] w-80 min-h-96- bg-background p-3 rounded-lg absolute z-50 right-72 shadow-lg animate__animated animate__fadeIn animate__faster flex flex-col gap-default_spacing'
          }
        >
          <header className={'flex items-center justify-between h-8 max-h-8'}>
            <span>Fill</span>
            <button onClick={() => setShow(false)}>
              <TbX />
            </button>
          </header>
          <ColorPicker value={value} onChange={e => updateFillColor(e)} height={100} width={300} hidePresets hideAdvancedSliders  />
          {/*<ReactGPicker*/}
          {/*  format={'hex'}*/}
          {/*  value={color}*/}
          {/*  onChange={updateFillColor}*/}
          {/*  debounce*/}
          {/*  debounceMS={150}*/}
          {/*  showInputs*/}
          {/*/>*/}
        </div>
      )}
      <div
        className={
          'bg-background p-default_spacing rounded-md flex items-center gap-default_spacing min-h-8 max-h-8 dark relative w-full'
        }
      >
        <div
          className={'min-h-5 min-w-5 max-w-5 rounded-sm cursor-pointer'}
          style={{ background: color }}
          onClick={() => setShow(!show)}
        />
        <div className={'flex w-full max-w-[65%] flex-1 '}>
          <small className={'truncate'}>{color}</small>
        </div>
        <DefaultTooltip content={<p>Link styles</p>}>
          <button className={'text-muted-foreground hover:text-white/80'}>
            <TbLayersLinked />
          </button>
        </DefaultTooltip>
      </div>
    </>
  )
}
