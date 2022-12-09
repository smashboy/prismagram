import { Group, Paper, Stack } from '@mantine/core'
import 'reactflow/dist/style.css'
import { Editor, EditorToolbar, Sidebar } from './modules/editor'
import { CreateProjectModal, ProjectSelectorModal } from './modules/projects'
import './transports'

function App() {
  return (
    <>
      <Group w="100%" h="100%" p="xs" noWrap>
        <Sidebar />
        <Stack w="calc(100% - 300px)" h="100%" sx={{ flex: 1 }}>
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
