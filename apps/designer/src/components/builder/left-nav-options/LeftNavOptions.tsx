import { useSelector } from 'react-redux'
import BuilderPageOptions from './pages-options/BuilderPagesOptions'
import BuilderBlocksOptions from './blocks-options/BuilderBlocksOptions'
import { RootState } from '@/redux/store'
import AssetBrowserLg from '@/components/builder/left-nav-options/assets-options/AssetBrowserLg'

export default function LeftNavOptions() {
  const { panel } = useSelector((state: RootState) => state.builder_view)
  switch (panel) {
    case 'pages':
      return <BuilderPageOptions />
    case 'blocks':
      return <BuilderBlocksOptions />
    case 'assets':
      return <AssetBrowserLg />
    default:
      return null
  }
}
