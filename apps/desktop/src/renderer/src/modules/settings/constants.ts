import {
  IconAdjustments,
  IconAlertTriangle,
  IconBrandPrisma,
  IconBriefcase,
  IconCommand,
  IconDashboard,
  IconHomeCog,
  IconInfoCircle,
  IconPalette,
  IconPrompt,
  IconYoga
} from '@tabler/icons'
import { SettingsRouteOptions } from './types'

export enum SettingsRoute {
  GENERAL = 'general',
  SHORTCUTS = 'shortcuts',
  PROJECT = 'project',
  ABOUT = 'about'
}

export enum GeneralSettingsRoute {
  CUSTOMIZATION = 'customization',
  ZEN_MODE = 'zen',
  PERFORMANCE = 'performance'
}

export enum ProjectSettingsRoute {
  GENERAL = 'general',
  COMMANDS = 'commands',
  PRISMA = 'prisma',
  DANGER = 'danger'
}

export const settingsRoutes = new Map<SettingsRoute, SettingsRouteOptions>([
  [SettingsRoute.GENERAL, { label: 'General', icon: IconHomeCog, color: 'indigo' }],
  [SettingsRoute.SHORTCUTS, { label: 'Shortcuts', icon: IconCommand, color: 'cyan' }],
  [SettingsRoute.PROJECT, { label: 'Project', icon: IconBriefcase, color: 'orange' }],
  [SettingsRoute.ABOUT, { label: 'About', icon: IconInfoCircle, color: 'pink' }]
])

export const generalSettingsRoutes = new Map<GeneralSettingsRoute, SettingsRouteOptions>([
  [GeneralSettingsRoute.CUSTOMIZATION, { label: 'Customization', icon: IconPalette }],
  [GeneralSettingsRoute.ZEN_MODE, { label: 'Zen mode', icon: IconYoga }],
  [GeneralSettingsRoute.PERFORMANCE, { label: 'Performance', icon: IconDashboard }]
])

export const projectSettingsRoutes = new Map<ProjectSettingsRoute, SettingsRouteOptions>([
  [ProjectSettingsRoute.GENERAL, { label: 'General', icon: IconAdjustments }],
  [ProjectSettingsRoute.COMMANDS, { label: 'Commands', icon: IconPrompt }],
  [ProjectSettingsRoute.PRISMA, { label: 'Schema', icon: IconBrandPrisma }],
  [ProjectSettingsRoute.DANGER, { label: 'Danger', icon: IconAlertTriangle }]
])

export const settingsRoutesArray = [...settingsRoutes.entries()]

export const generalSettingsRoutesArray = [...generalSettingsRoutes.entries()]

export const projectSettingsRoutesArray = [...projectSettingsRoutes.entries()]
