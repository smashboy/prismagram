import { BrowserWindow } from 'electron'
import {
  CREATE_COMMAND_ENDPOINT,
  CREATE_PROJECT_ENDPOINT,
  EDITOR_CLOSE_PRISMA_STUDIO_ENDPOINT,
  EDITOR_LAUNCH_PRISMA_STUDIO_ENDPOINT,
  EDITOR_LAYOUT_NODES_ENDPOINT,
  GET_EDITOR_DATA_ENDPOINT,
  GET_PROJECT_DIRECTORY_ENDPOINT,
  GET_GLOBAL_SETTINGS_ENDPOINT,
  GET_PROJECTS_LIST_ENDPOINT,
  UPDATE_PROJECT_ENDPOINT,
  EDITOR_SAVE_SCHEMA,
  EDITOR_FORMAT_SCHEMA
} from '@shared/common/configs/api'
import { GlobalSettings, Project } from '@shared/common/models/Project'
import { formatPrismaSchema, getPrismaPreviewFeaturesList } from '../../services/prisma'
import { WindowManager } from './models'
import WindowsManagerBase from './WindowsManagerBase'
import { Diagram } from '@shared/common/models/Diagram'
import { DiagramLayout } from '@shared/common/configs/diagrams'
import { layoutDiagramElements } from '../../services/diagrams'
import { PrismaCommand } from '@shared/common/models/Prisma'
import CommandsManager from '../commandsManager/CommandsManager'
import { ProjectsManager } from '../projectsManager/ProjectsManager'
import { PackageManager } from '@shared/common/configs/projects'

export default class WindowsManager extends WindowsManagerBase {
  protected appWindow: WindowManager | undefined

  private readonly commandsManager = new CommandsManager()
  private readonly projectsManager = new ProjectsManager()

  protected createAppWindow() {
    this.appWindow = this.createWindow({
      width: 900,
      height: 670,
      show: false,
      autoHideMenuBar: true
    })

    const browserWindow = this.appWindow!.getWindow()

    this.appWindow.createApiRoute(GET_PROJECTS_LIST_ENDPOINT, () =>
      this.projectsManager.getProjectsList()
    )

    this.appWindow.createApiRoute(CREATE_PROJECT_ENDPOINT, (args: Omit<Project, 'id'>) =>
      this.projectsManager.createProject(args)
    )

    this.appWindow.createApiRoute(UPDATE_PROJECT_ENDPOINT, (project: Project) =>
      this.projectsManager.updateProject(project)
    )

    this.appWindow.createApiRoute(
      EDITOR_SAVE_SCHEMA,
      (args: { project: Project; schema: string }) =>
        this.projectsManager.saveSchema(args.schema, args.project)
    )

    this.appWindow.createApiRoute(GET_PROJECT_DIRECTORY_ENDPOINT, async () => {
      const directory = await this.projectsManager.getProjectDirectory(browserWindow)

      if (!directory) return

      const schemaPath = this.projectsManager.getProjectSchemaPath(directory)

      return [directory, schemaPath]
    })

    this.appWindow.createApiRoute(
      CREATE_COMMAND_ENDPOINT,
      (args: { project: Project; command: PrismaCommand }) =>
        this.projectsManager.createCommand(args.command, args.project)
    )

    this.appWindow.createApiRoute(GET_EDITOR_DATA_ENDPOINT, async (project: Project) => {
      const schemaPath = this.projectsManager.getProjectSchemaPath(project.projectDirectory)

      if (schemaPath) {
        const schema = this.projectsManager.getProjectSchema(project)

        return { schema, schemaPath }
      }

      return void 0
    })

    this.appWindow.createApiRoute(
      EDITOR_LAYOUT_NODES_ENDPOINT,
      async ({ diagram, layout }: { diagram: Diagram; layout: DiagramLayout }) =>
        layoutDiagramElements(diagram, layout)
    )

    this.appWindow.createApiRoute(EDITOR_FORMAT_SCHEMA, (schema: string) =>
      formatPrismaSchema(schema)
    )

    this.appWindow.createApiRoute(GET_GLOBAL_SETTINGS_ENDPOINT, async () => {
      const settings: GlobalSettings = {
        prisma: {
          previewFeaturesList: getPrismaPreviewFeaturesList(),
          packageManager: PackageManager.NPM
        }
      }

      return settings
    })

    this.appWindow.createApiRoute(
      EDITOR_LAUNCH_PRISMA_STUDIO_ENDPOINT,
      async (project: Project) => {
        const { prismaStudioPort, projectDirectory } = project
        this.commandsManager.launchPrismaStudio(prismaStudioPort, projectDirectory)
      }
    )

    this.appWindow.createApiRoute(EDITOR_CLOSE_PRISMA_STUDIO_ENDPOINT, async () => {
      this.commandsManager.killPrismaStudio()
    })
  }

  protected get allWindowsCount() {
    return BrowserWindow.getAllWindows().length
  }

  protected onAppClose() {
    return this.commandsManager.killAllProcesses()
  }
}
