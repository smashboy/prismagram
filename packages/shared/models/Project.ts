import { PrismaDatasource, PrismaGenerator } from './Prisma'

export interface Project {
  id: string
  name: string
  schema: string
  projectDirectory?: string
}

export interface ProjectSettings {
  prisma: ProjectPrismaSettings
}

export interface ProjectPrismaSettings {
  datasources: Record<string, PrismaDatasource>
  generators: Record<string, PrismaGenerator>
}

export interface GlobalSettings {
  prisma: GlobalPrismaSettings
}

export interface GlobalPrismaSettings {
  previewFeaturesList: string[]
}
