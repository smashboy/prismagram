import { PackageManager } from '../configs/projects'
import { PrismaCommand } from './Prisma'

export interface Project {
  id: string
  name: string
  projectDirectory: string
  prismaStudioPort?: number
  commands?: Record<string, PrismaCommand>
  packageManager?: PackageManager | 'app-default'
  customization?: {
    showMiniMap?: boolean
    backgroundVariant?: string
    snapToGrid?: boolean
    snapGrid?: number
  }
}

export interface GlobalSettings {
  prisma: GlobalPrismaSettings
}

export interface GlobalPrismaSettings {
  previewFeaturesList: string[]
  packageManager: PackageManager
}
