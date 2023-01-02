import { $schema } from '@renderer/modules/editor'
import { createApi } from 'effector'
import { createPrismaSchemaBuilder } from '@mrleebo/prisma-ast'
import { PrismaDatasourceProvider } from '@shared/common/configs/prisma'

interface OnDatasourceChangeProps {
  provider: {
    value: PrismaDatasourceProvider
    url: string
    isEnv: boolean
  }
  relationMode: string
}

export const projectSchemaSettingsApi = createApi($schema, {
  onDatasourceChange: (schema, props: OnDatasourceChangeProps) => {
    const { provider, relationMode } = props

    const builder = createPrismaSchemaBuilder(schema)

    builder.datasource(provider.value, provider.isEnv ? { env: provider.url } : provider.url)

    return builder.print()
  }
})
