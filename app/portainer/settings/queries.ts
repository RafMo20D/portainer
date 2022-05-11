import { useQuery, useMutation, useQueryClient } from 'react-query';

import {
  mutationOptions,
  withError,
  withInvalidate,
} from '@/react-tools/react-query';

import { PublicSettingsViewModel } from '../models/settings';

import {
  updateSettings,
  getSettings,
  Settings,
  getPublicSettings,
} from './settings.service';

export function usePublicSettings<T = PublicSettingsViewModel>(
  select?: (settings: PublicSettingsViewModel) => T
) {
  return useQuery(['settings', 'public'], () => getPublicSettings(), {
    select,
    ...withError('Unable to retrieve public settings'),
  });
}

export function useSettings<T = Settings>(select?: (settings: Settings) => T) {
  return useQuery(['settings'], getSettings, {
    select,
    ...withError('Unable to retrieve settings'),
  });
}

export function useUpdateSettingsMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    updateSettings,
    mutationOptions(
      withInvalidate(queryClient, [['settings'], ['cloud']]),
      withError('Unable to update settings')
    )
  );
}
