import { useEffect } from 'react'
import withRenderer, { WithRendererProps } from '@/components/builder/HOCs/WithRenderer'

type Props = {} & WithRendererProps

function BuilderKeyMapper({ builderHook, rendererState }: Props) {
  const { removeElementFromPage } = builderHook;
  const { active_element } = rendererState;

  const initializeHotkeys = () => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Delete') {
        if (active_element) {
          removeElementFromPage({ dnd_id: active_element.dnd_id })
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    // Save the event handler to remove it later
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }

  useEffect(() => {
    const cleanup = initializeHotkeys()

    return () => {
      cleanup()
    }
  }, [active_element])

  return <></>
}

export default withRenderer(BuilderKeyMapper)
