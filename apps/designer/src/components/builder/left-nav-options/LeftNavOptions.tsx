import { useSelector } from 'react-redux'
import BuilderElementOptions from './elements-options/BuilderElementOptions'
import BuilderPageOptions from './pages-options/BuilderPagesOptions'
import BuilderBlocksOptions from './blocks-options/BuilderBlocksOptions'
import { RootState } from '@/redux/store'

export default function LeftNavOptions() {
  const { panel } = useSelector((state: RootState) => state.builder_view)
  switch (panel) {
    case 'elements':
      return <BuilderElementOptions />
    case 'pages':
      return <BuilderPageOptions />
    case 'blocks':
      return <BuilderBlocksOptions />
    default:
      return null
  }
}
