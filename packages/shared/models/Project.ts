import { PrismaCommand } from './Prisma'

export interface Project {
  id: string
  name: string
  projectDirectory: string
  prismaStudioPort?: number
  commands?: Record<string, PrismaCommand>
}

export interface GlobalSettings {
  prisma: GlobalPrismaSettings
}

export interface GlobalPrismaSettings {
  previewFeaturesList: string[]
}
