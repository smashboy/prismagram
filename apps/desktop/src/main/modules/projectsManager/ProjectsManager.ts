import { BrowserWindow } from 'electron'
import fs from 'fs'
import { randomUUID } from 'crypto'
import * as path from 'path'
import { Project } from '@shared/common/models/Project'
import { createFile, readDirectoryFiles, readDirectoryPath } from '../../services/filesManager'
import { PRISMA_SCHEMA_FILE_NAME, PROJECTS_FOLDER_PATH } from '../../constants'
import { PrismaCommand } from '@shared/common/models/Prisma'
import { defaultSchemaPaths } from '@shared/common/configs/prisma'
import { getPrismaDocument, formatPrismaSchema } from '../../services/prisma'
import { prismaSchema2Diagram } from '../../services/diagrams'

export class ProjectsManager {
  private createProjectFileName(id = randomUUID()) {
    return [`${id}.json`, id] as const
  }

  async getProjectsList(): Promise<Project[]> {
    const projects = await readDirectoryFiles(PROJECTS_FOLDER_PATH)

    return projects.map((project) => JSON.parse(project))
  }

  async createProject(args: Omit<Project, 'id'>) {
    const [fileName, id] = this.createProjectFileName()

    const project: Project = { id, ...args }

    await createFile(PROJECTS_FOLDER_PATH, fileName, JSON.stringify(project))

    return project
  }

  updateProject(project: Project) {
    return createFile(
      PROJECTS_FOLDER_PATH,
      this.createProjectFileName(project.id)[1],
      JSON.stringify(project)
    )
  }

  projectExists(project: Project) {
    return fs.existsSync(project.projectDirectory)
  }

  async saveSchema(schema: string, project: Project) {
    const schemaPath = this.getProjectSchemaPath(project.projectDirectory)

    if (schemaPath) {
      const formattedSchema = await formatPrismaSchema(schema)

      await createFile(
        schemaPath.replace(`${PRISMA_SCHEMA_FILE_NAME}`, ''),
        PRISMA_SCHEMA_FILE_NAME,
        formattedSchema
      )

      return formattedSchema
    }
  }

  getProjectDirectory(browserWindow: BrowserWindow) {
    return readDirectoryPath(browserWindow, {
      title: 'Open project directory',
      buttonLabel: 'Open'
    })
  }

  async createCommand(command: PrismaCommand, project: Project) {
    const [fileName] = this.createProjectFileName(project.id)

    const id = randomUUID()

    const fragment = { [id]: command }

    project.commands = project.commands ? { ...project.commands, ...fragment } : fragment

    await createFile(PROJECTS_FOLDER_PATH, fileName, JSON.stringify(project))

    return project
  }

  getProjectSchemaPath(projectDirectory: string) {
    let schemaPath: string | null = null

    const rootSchemaDirectory = path.join(projectDirectory, defaultSchemaPaths.root)
    const prismaRootSchemaDirectory = path.join(projectDirectory, defaultSchemaPaths.prismaRoot)

    if (fs.existsSync(rootSchemaDirectory)) schemaPath = rootSchemaDirectory
    if (fs.existsSync(prismaRootSchemaDirectory)) schemaPath = prismaRootSchemaDirectory

    const packageJsonPath = path.join(projectDirectory, './package.json')

    if (fs.existsSync(packageJsonPath)) {
      const file = fs.readFileSync(packageJsonPath, { encoding: 'utf-8' })

      try {
        const pckgjson = JSON.parse(file)
        const pckgPath = pckgjson?.prisma?.schema as string

        if (pckgPath) {
          const possibleSchemaPath = path.join(projectDirectory, pckgPath)
          if (fs.existsSync(possibleSchemaPath)) schemaPath = possibleSchemaPath
        }
      } catch (error) {
        console.error(error)
      }
    }

    return schemaPath
  }

  getProjectSchema(project: Project) {
    const schemaPath = this.getProjectSchemaPath(project.projectDirectory)

    if (!schemaPath) return

    const schema = fs.readFileSync(schemaPath, { encoding: 'utf-8' })

    return schema
  }

  async getSchemaDiagram(schema: string) {
    const prismadoc = await getPrismaDocument(schema)

    return prismaSchema2Diagram(prismadoc)
  }
}
