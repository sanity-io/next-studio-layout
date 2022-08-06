import { useMemo } from 'react'
import {
  type Config,
  type StudioTheme,
  type WorkspaceOptions,
  defaultTheme,
} from 'sanity'

export function isWorkspaces(config: Config): config is WorkspaceOptions[] {
  return Array.isArray(config)
}

export interface WorkspaceWithTheme extends Omit<WorkspaceOptions, 'theme'> {
  theme: StudioTheme
}

export function isWorkspaceWithTheme(
  workspace: WorkspaceOptions
): workspace is WorkspaceWithTheme {
  return Boolean(workspace.theme)
}

export function useTheme(config: Config): StudioTheme {
  const workspace = useMemo<WorkspaceOptions>(
    () => (isWorkspaces(config) ? config[0] : config),
    [config]
  )
  return useMemo<StudioTheme>(
    () => (isWorkspaceWithTheme(workspace) ? workspace.theme : defaultTheme),
    [workspace]
  )
}
