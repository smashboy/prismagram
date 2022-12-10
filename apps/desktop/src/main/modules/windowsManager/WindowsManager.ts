import { randomUUID } from 'crypto'
import { BrowserWindow } from 'electron'
import { PROJECTS_FOLDER_PATH } from '../../constants'
import {
  CREATE_PROJECT_ENDPOINT,
  EDITOR_LAYOUT_NODES,
  GET_EDITOR_DATA,
  GET_FOLDER_DIRECTORY_ENDPOINT,
  GET_PRISMA_DOCUMENT_ENDPOINT,
  GET_PRISMA_SCHEMA_PATH_ENDPOINT,
  GET_PROJECTS_LIST_ENDPOINT
} from '@shared/common/configs/api'
import { Project } from '@shared/common/models/Project'
import { createFile, readDirectoryFiles, readDirectoryPath } from '../../services/filesManager'
import {
  getPrismaDocument,
  readPrismaSchemaFile,
  readPrismaSchemaFilePath
} from '../../services/prisma'
import { WindowManager } from './models'
import WindowsManagerBase from './WindowsManagerBase'
import { readEditorData, ReadEditorDataOptions } from '../../services/editor'
import { Diagram } from '@shared/common/models/Diagram'
import { DiagramLayout } from '@shared/common/configs/diagrams'
import { layoutDiagramElements } from '../../services/diagrams'

export default class WindowsManager extends WindowsManagerBase {
  protected appWindow: WindowManager | undefined

  protected createAppWindow() {
    this.appWindow = this.createWindow({
      width: 900,
      height: 670,
      show: false,
      autoHideMenuBar: true
    })

    const browserWindow = this.appWindow!.getWindow()

    this.appWindow.createApiRoute(GET_PRISMA_DOCUMENT_ENDPOINT, async () => {
      const schemaSrc = await readPrismaSchemaFile(browserWindow)

      if (!schemaSrc) return schemaSrc

      return getPrismaDocument(schemaSrc)
    })

    this.appWindow.createApiRoute(GET_PRISMA_SCHEMA_PATH_ENDPOINT, () =>
      readPrismaSchemaFilePath(browserWindow)
    )

    this.appWindow.createApiRoute(GET_FOLDER_DIRECTORY_ENDPOINT, () =>
      readDirectoryPath(browserWindow, {
        title: 'Open project directory',
        buttonLabel: 'Open'
      })
    )

    this.appWindow.createApiRoute(GET_PROJECTS_LIST_ENDPOINT, async () => {
      const projects = await readDirectoryFiles(PROJECTS_FOLDER_PATH)

      return projects.map((project) => JSON.parse(project))
    })

    this.appWindow.createApiRoute(CREATE_PROJECT_ENDPOINT, async (args: Omit<Project, 'id'>) => {
      const id = randomUUID()
      const fileName = `${id}.json`

      const project: Project = { id, ...args }

      await createFile(PROJECTS_FOLDER_PATH, fileName, JSON.stringify(project))

      return project
    })

    this.appWindow.createApiRoute(GET_EDITOR_DATA, (args: ReadEditorDataOptions) =>
      readEditorData(args)
    )

    this.appWindow.createApiRoute(
      EDITOR_LAYOUT_NODES,
      async ({ diagram, layout }: { diagram: Diagram; layout: DiagramLayout }) =>
        layoutDiagramElements(diagram, layout)
    )
  }

  protected get allWindowsCount() {
    return BrowserWindow.getAllWindows().length
  }
}
