import { Box } from '@mantine/core'
import Editor from '@monaco-editor/react'
import { useStore } from 'effector-react'
import { $schema } from '../stores'
import '../monacoImports'

// const path = window.api.path
// const __dirname = window.api.__dirname

// function ensureFirstBackSlash(str) {
//   return str.length > 0 && str.charAt(0) !== '/' ? '/' + str : str
// }

// function uriFromPath(_path) {
//   const pathName = path.resolve(_path).replace(/\\/g, '/')
//   return encodeURI('file://' + ensureFirstBackSlash(pathName))
// }

// loader.config({
//   paths: { vs: uriFromPath(path.join(__dirname, '../../../../node_modules/monaco-editor/min/vs')) }
// })

export const SchemaEditor = () => {
  const schema = useStore($schema)

  return (
    <Box p="xs" w="100%" h="100%">
      <Editor defaultValue={schema} height="100%" options={{ minimap: { enabled: false } }} />
    </Box>
  )
}
