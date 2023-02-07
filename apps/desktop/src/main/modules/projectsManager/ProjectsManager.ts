import { BrowserWindow } from 'electron'
import fs from 'fs'
import fsPromise from 'fs/promises'
import { randomUUID } from 'crypto'
import * as path from 'path'
import { Project } from '@shared/common/models/Project'
import { createFile, readDirectoryFolders, readDirectoryPath } from '../../services/filesManager'
import { PRISMA_SCHEMA_FILE_NAME, PROJECTS_FOLDER_PATH } from '../../constants'
import { PrismaCommand } from '@shared/common/models/Prisma'
import { defaultSchemaPaths } from '@shared/common/configs/prisma'
import { formatPrismaSchema } from '../../services/prisma'
import { Diagram } from '@shared/common/models/Diagram'

export class ProjectsManager {
  private geProjecFolderPath(id = randomUUID()) {
    return [path.join(PROJECTS_FOLDER_PATH, id), id]
  }

  private getProjectDiagramPath(id: string) {
    return path.join(id, 'diagram.json')
  }

  async getProjectsList(): Promise<Project[]> {
    const projectFolders = await readDirectoryFolders(PROJECTS_FOLDER_PATH)

    const projects = await Promise.all(
      projectFolders.map((id) =>
        fsPromise.readFile(path.join(PROJECTS_FOLDER_PATH, id, 'project.json'), {
          encoding: 'utf-8'
        })
      )
    )

    return projects.map((project) => JSON.parse(project))
  }

  async createProject(args: Omit<Project, 'id'>) {
    const [folderPath, id] = this.geProjecFolderPath()

    const project: Project = { id, ...args }

    await createFile(folderPath, 'project.json', JSON.stringify(project))

    return project
  }

  async updateProject(project: Project) {
    await createFile(
      this.geProjecFolderPath(project.id)[0],
      'project.json',
      JSON.stringify(project)
    )

    return project
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

    return void 0
  }

  async saveDiagram(diagram: Diagram, project: Project) {
    const diagramFilePath = this.getProjectDiagramPath(project.id)

    await createFile(PROJECTS_FOLDER_PATH, diagramFilePath, JSON.stringify(diagram))

    return diagram
  }

  getProjectDirectory(browserWindow: BrowserWindow) {
    return readDirectoryPath(browserWindow, {
      title: 'Open project directory',
      buttonLabel: 'Open'
    })
  }

  async createCommand(command: PrismaCommand, project: Project) {
    const [folderPath] = this.geProjecFolderPath(project.id)

    const id = randomUUID()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fragment = { [id]: command }

    // project.commands = project.commands ? { ...project.commands, ...fragment } : fragment

    await createFile(folderPath, 'commands.json', JSON.stringify(project))

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
}
