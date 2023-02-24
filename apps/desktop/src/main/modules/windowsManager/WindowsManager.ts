import { app, BrowserWindow } from 'electron'
import {
  CREATE_PROJECT_ENDPOINT,
  EDITOR_CLOSE_PRISMA_STUDIO_ENDPOINT,
  EDITOR_LAYOUT_NODES_ENDPOINT,
  GET_EDITOR_DATA_ENDPOINT,
  GET_PROJECT_DIRECTORY_ENDPOINT,
  GET_GLOBAL_SETTINGS_ENDPOINT,
  GET_PROJECTS_LIST_ENDPOINT,
  UPDATE_PROJECT_ENDPOINT,
  EDITOR_SAVE_SCHEMA,
  EDITOR_FORMAT_SCHEMA,
  EDITOR_SAVE_DIAGRAM,
  APP_UPDATE_CHECK,
  APP_UPDATE_DOWNLOAD,
  APP_UPDATE_INSTALL,
  APP_CLOSE
} from '@shared/common/configs/api'
import { GlobalSettings, Project } from '@shared/common/models/Project'
import { formatPrismaSchema, getPrismaPreviewFeaturesList } from '../../services/prisma'
import { WindowManager } from './models'
import WindowsManagerBase from './WindowsManagerBase'
import { Diagram } from '@shared/common/models/Diagram'
import { DiagramLayout } from '@shared/common/configs/diagrams'
import { layoutDiagramElements } from '../../services/diagrams'
import CommandsManager from '../commandsManager/CommandsManager'
import { ProjectsManager } from '../projectsManager/ProjectsManager'
import { PackageManager } from '@shared/common/configs/projects'
import { UpdatedManager } from '../UpdatesManager'

export default class WindowsManager extends WindowsManagerBase {
  protected appWindow: WindowManager | undefined

  private readonly commandsManager = new CommandsManager()

  protected createAppWindow() {
    this.appWindow = this.createWindow({
      width: 900,
      height: 670,
      show: false,
      autoHideMenuBar: true
    })

    const browserWindow = this.appWindow!.getWindow()
    const projectsManager = new ProjectsManager(browserWindow)
    const updatesManager = new UpdatedManager(browserWindow)

    updatesManager.initUpdateListeners()

    this.appWindow.createApiRoute(APP_CLOSE, async () => app.quit())

    this.appWindow.createApiRoute(APP_UPDATE_CHECK, () => updatesManager.checkForUpdates())

    this.appWindow.createApiRoute(APP_UPDATE_DOWNLOAD, () =>
      updatesManager.startDownloadingUpdate()
    )

    this.appWindow.createApiRoute(APP_UPDATE_INSTALL, async () => updatesManager.installUpdate())

    this.appWindow.createApiRoute(GET_PROJECTS_LIST_ENDPOINT, () =>
      projectsManager.getProjectsList()
    )

    this.appWindow.createApiRoute(CREATE_PROJECT_ENDPOINT, (args: Omit<Project, 'id'>) =>
      projectsManager.createProject(args)
    )

    this.appWindow.createApiRoute(UPDATE_PROJECT_ENDPOINT, (project: Project) =>
      projectsManager.updateProject(project)
    )

    this.appWindow.createApiRoute(
      EDITOR_SAVE_SCHEMA,
      (args: { project: Project; schema: string }) =>
        projectsManager.saveSchema(args.schema, args.project)
    )

    this.appWindow.createApiRoute(
      EDITOR_SAVE_DIAGRAM,
      (args: { diagram: Diagram; project: Project }) =>
        projectsManager.saveDiagram(args.diagram, args.project)
    )

    this.appWindow.createApiRoute(GET_PROJECT_DIRECTORY_ENDPOINT, async () => {
      const directory = await projectsManager.getProjectDirectory(browserWindow)

      if (!directory) return

      const schemaPath = projectsManager.getProjectSchemaPath(directory)

      return [directory, schemaPath]
    })

    // this.appWindow.createApiRoute(
    //   CREATE_COMMAND_ENDPOINT,
    //   (args: { project: Project; command: PrismaCommand }) =>
    //     projectsManager.createCommand(args.command, args.project)
    // )

    this.appWindow.createApiRoute(GET_EDITOR_DATA_ENDPOINT, async (project: Project) => {
      const schemaPath = projectsManager.getProjectSchemaPath(project.projectDirectory)
      const diagram = projectsManager.getProjectDiagram(project)

      if (schemaPath) {
        const schema = projectsManager.getProjectSchema(project)

        projectsManager.watchSchemaChanges(schemaPath)

        return { schema, schemaPath, diagram }
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

    // this.appWindow.createApiRoute(
    //   EDITOR_LAUNCH_PRISMA_STUDIO_ENDPOINT,
    //   async (project: Project) => {
    //     const { prismaStudioPort, projectDirectory } = project
    //     this.commandsManager.launchPrismaStudio(prismaStudioPort, projectDirectory)
    //   }
    // )

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
