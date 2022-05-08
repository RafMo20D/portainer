import { useQuery, useMutation, useQueryClient } from 'react-query';

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
    meta: {
      error: {
        title: 'Failure',
        message: 'Unable to retrieve settings',
      },
    },
  });
}

export function useSettings<T = Settings>(select?: (settings: Settings) => T) {
  return useQuery(['settings'], getSettings, {
    select,
    meta: {
      error: {
        title: 'Failure',
        message: 'Unable to retrieve settings',
      },
    },
  });
}

export function useUpdateSettingsMutation() {
  const queryClient = useQueryClient();

  return useMutation(updateSettings, {
    onSuccess() {
      queryClient.invalidateQueries(['settings']);

      // invalidate the cloud info too, incase the cloud api keys changed
      return queryClient.invalidateQueries(['cloud']);
    },
    meta: {
      error: {
        title: 'Failure',
        message: 'Unable to update settings',
      },
    },
  });
}
