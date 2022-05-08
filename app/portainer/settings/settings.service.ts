import { PublicSettingsViewModel } from '@/portainer/models/settings';

import axios, { parseAxiosError } from '../services/axios';

enum AuthenticationMethod {
  Internal = 1,
  LDAP,
  OAuth,
}
export interface PublicSettingsResponse {
  // URL to a logo that will be displayed on the login page as well as on top of the sidebar. Will use default Portainer logo when value is empty string
  LogoURL: string;
  // Active authentication method for the Portainer instance. Valid values are: 1 for internal, 2 for LDAP, or 3 for oauth
  AuthenticationMethod: AuthenticationMethod;
  // Whether edge compute features are enabled
  EnableEdgeComputeFeatures: boolean;
  // Supported feature flags
  Features: Record<string, boolean>;
  // The URL used for oauth login
  OAuthLoginURI: string;
  // The URL used for oauth logout
  OAuthLogoutURI: string;
  // Whether portainer internal auth view will be hidden
  OAuthHideInternalAuth: boolean;
  // Whether telemetry is enabled
  EnableTelemetry: boolean;
  // The expiry of a Kubeconfig
  KubeconfigExpiry: string;
}

export async function getPublicSettings() {
  try {
    const { data } = await axios.get<PublicSettingsResponse>(
      buildUrl('public')
    );
    return new PublicSettingsViewModel(data);
  } catch (e) {
    throw parseAxiosError(
      e as Error,
      'Unable to retrieve application settings'
    );
  }
}

export interface Settings {
  LogoURL: string;
  BlackListedLabels: { name: string; value: string }[];
  AuthenticationMethod: AuthenticationMethod;
  SnapshotInterval: string;
  TemplatesURL: string;
  EnableEdgeComputeFeatures: boolean;
  UserSessionTimeout: string;
  KubeconfigExpiry: string;
  EnableTelemetry: boolean;
  HelmRepositoryURL: string;
  KubectlShellImage: string;
  TrustOnFirstConnect: boolean;
  EnforceEdgeID: boolean;
  AgentSecret: string;
  EdgePortainerUrl: string;
  EdgeAgentCheckinInterval: number;
  EdgePingInterval: number;
  EdgeSnapshotInterval: number;
  EdgeCommandInterval: number;
}

export async function getSettings() {
  try {
    const { data } = await axios.get<Settings>(buildUrl());
    return data;
  } catch (e) {
    throw parseAxiosError(
      e as Error,
      'Unable to retrieve application settings'
    );
  }
}

export async function updateSettings(settings: Partial<Settings>) {
  try {
    await axios.put(buildUrl(), settings);
  } catch (e) {
    throw parseAxiosError(e as Error, 'Unable to update application settings');
  }
}

function buildUrl(subResource?: string, action?: string) {
  let url = 'settings';
  if (subResource) {
    url += `/${subResource}`;
  }

  if (action) {
    url += `/${action}`;
  }

  return url;
}
