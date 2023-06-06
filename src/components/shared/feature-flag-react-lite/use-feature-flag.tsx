import { useContext } from 'react'
import FeatureFlagsContext, { FeatureFlagInterface } from './feature-flag-context'

const useFeatureFlags = (): FeatureFlagInterface =>
  useContext(FeatureFlagsContext)

export default useFeatureFlags

