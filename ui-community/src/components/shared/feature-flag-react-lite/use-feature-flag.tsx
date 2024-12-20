import { useContext } from 'react'
import { FeatureFlagsContext, FeatureFlagInterface } from './feature-flag-context'

export const useFeatureFlags = (): FeatureFlagInterface =>
  useContext(FeatureFlagsContext)


