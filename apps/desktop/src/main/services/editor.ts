import fs from 'fs/promises'
import { getPrismaDocument } from './prisma'
import { EditorData } from '@shared/common/models/Editor'
import { prismaSchema2Diagram } from './diagrams'

export interface ReadEditorDataOptions {
  schemaPath: string
}

export const readEditorData = async (options: ReadEditorDataOptions): Promise<EditorData> => {
  const { schemaPath } = options

  const schema = await fs.readFile(schemaPath, { encoding: 'utf-8' })

  const document = await getPrismaDocument(schema)

  const diagram = await prismaSchema2Diagram(document)

  return {
    diagram,
    schema
  }
}
