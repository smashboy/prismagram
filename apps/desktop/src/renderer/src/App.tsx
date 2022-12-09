import { Group, Paper, Stack } from '@mantine/core'
import 'reactflow/dist/style.css'
import { Editor, EditorToolbar } from './modules/editor'
import { CreateProjectModal, ProjectSelectorModal } from './modules/projects'
import './transports'

function App() {
  return (
    <>
      <Group w="100%" h="100%" p="xs">
        <div style={{ width: 300 }} />
        <Stack w="100%" h="100%" sx={{ flex: 1 }}>
          <EditorToolbar />
          <Paper w="100%" h="100%" shadow="md">
            <Editor />
          </Paper>
        </Stack>
        <CreateProjectModal />
        <ProjectSelectorModal />
      </Group>
    </>
  )
}

export default App
