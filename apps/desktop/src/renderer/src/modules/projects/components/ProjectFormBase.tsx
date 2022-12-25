import { Stack, TextInput } from '@mantine/core'
import { invoke } from '@renderer/core/electron'
import {
  GET_FOLDER_DIRECTORY_ENDPOINT,
  GET_PRISMA_SCHEMA_PATH_ENDPOINT
} from '@shared/common/configs/api'
import { IconFile, IconFolder } from '@tabler/icons'

export interface ProjectFormBaseValues {
  name: string
  schema: string
  projectDirectory: string
}

interface ProjectFormBaseProps {
  values: ProjectFormBaseValues
  onChange: (values: ProjectFormBaseValues) => void
}

export const ProjectFormBase: React.FC<ProjectFormBaseProps> = ({ values, onChange }) => {
  const { name, schema, projectDirectory } = values

  const handleProjectNameInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ ...values, name: event.target.value })

  const handleFileInput = (name: string, endpoint: string) => async () => {
    const res = await invoke(endpoint)
    onChange({ ...values, [name]: res ?? '' })
  }

  return (
    <Stack>
      <TextInput
        label="Project name"
        value={name}
        onChange={handleProjectNameInput}
        data-autofocus
        withAsterisk
      />
      <TextInput
        label="Schema file"
        value={schema}
        withAsterisk
        icon={<IconFile size={14} />}
        onClick={handleFileInput('schema', GET_PRISMA_SCHEMA_PATH_ENDPOINT)}
        readOnly
      />
      <TextInput
        label="Project directory"
        value={projectDirectory}
        description="From project directory you will be able to run migrations scripts and launch prisma studio."
        icon={<IconFolder size={14} />}
        onClick={handleFileInput('projectDirectory', GET_FOLDER_DIRECTORY_ENDPOINT)}
        readOnly
      />
    </Stack>
  )
}
