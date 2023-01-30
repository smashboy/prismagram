import { Alert, Stack, TextInput } from '@mantine/core'
import { invoke } from '@renderer/core/electron'
import { GET_PROJECT_DIRECTORY_ENDPOINT } from '@shared/common/configs/api'
import { defaultSchemaPaths } from '@shared/common/configs/prisma'
import { IconFile, IconFolder, IconInfoCircle } from '@tabler/icons'

export interface ProjectFormBaseValues {
  name: string
  schemaPath: string
  projectDirectory: string
}

interface ProjectFormBaseProps {
  values: ProjectFormBaseValues
  onChange: (values: ProjectFormBaseValues) => void
}

export const ProjectFormBase: React.FC<ProjectFormBaseProps> = ({ values, onChange }) => {
  const { name, projectDirectory, schemaPath } = values

  const handleProjectNameInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ ...values, name: event.target.value })

  const handleFileInput = (name: string, endpoint: string) => async () => {
    const res = await invoke(endpoint)

    if (res) {
      const [directory, schemaPath] = res

      onChange({ ...values, [name]: directory, schemaPath })
    }
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
        label="Project directory"
        value={projectDirectory}
        description="From project directory you will be able to run migrations scripts and launch prisma studio."
        icon={<IconFolder size={14} />}
        onClick={handleFileInput('projectDirectory', GET_PROJECT_DIRECTORY_ENDPOINT)}
        readOnly
        withAsterisk
      />
      <TextInput
        label="Schema path"
        placeholder="Schema not found..."
        value={schemaPath}
        icon={<IconFile size={14} />}
        readOnly
      />
      <Alert icon={<IconInfoCircle />}>
        By default editor will look for schema in <b>{defaultSchemaPaths.root}</b> and{' '}
        <b>{defaultSchemaPaths.prismaRoot}</b> directory. If schema is not present there, it will
        try to load the path from your <b>package.json.</b>
      </Alert>
    </Stack>
  )
}
