import { $schema } from '@renderer/modules/editor'
import { createApi } from 'effector'

export const projectSchemaSettingsApi = createApi($schema, {
  onDatasourceChange: () => {}
})
