import { useEffect, useRef, useState } from 'react'
import { useGate, useStore } from 'effector-react'
import { $selectedProject } from '@renderer/modules/projects'
import { DEFAULT_PRISMA_STUDIO_PORT } from '@shared/common/configs/prisma'
import { combine } from 'effector'
import { $isLaunchingPrismaStudio, PrismaStudioGate } from '../stores'
import { Box, LoadingOverlay } from '@mantine/core'

const $store = combine({
  project: $selectedProject,
  isLoading: $isLaunchingPrismaStudio
})

export const PrismaStudioView = () => {
  const [isLoadingWebview, setIsLoadingWebview] = useState(false)

  const webviewRef = useRef<HTMLWebViewElement>(null)

  const { project, isLoading } = useStore($store)

  useGate(PrismaStudioGate, project?.id ?? null)

  useEffect(() => {
    const cleanup = handleInitListeners()

    return () => cleanup()
  }, [project, isLoading])

  const handleInitListeners = () => {
    const webview = webviewRef.current

    let hasFailed = false
    let refreshTimeout: number | null = null

    const onStartLoading = () => setIsLoadingWebview(true)
    const onStopLoading = () => {
      if (hasFailed) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        refreshTimeout = setTimeout(() => {
          hasFailed = false
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          webview!.reload()
        }, 500)
        return
      }
      setIsLoadingWebview(false)
    }
    const onLoadFail = () => {
      hasFailed = true
    }

    if (webview) {
      webview.addEventListener('did-start-loading', onStartLoading)
      webview.addEventListener('did-stop-loading', onStopLoading)
      webview.addEventListener('did-fail-load', onLoadFail)
    }

    const cleanup = () => {
      if (webview) {
        webview.removeEventListener('did-start-loading', onStartLoading)
        webview.removeEventListener('did-stop-loading', onStopLoading)
        webview.removeEventListener('did-fail-load', onLoadFail)
      }

      if (refreshTimeout) clearTimeout(refreshTimeout)
    }

    return cleanup
  }

  if (!project) return null
  if (isLoading) return <>{'Is loading studio...'}</>

  return (
    <Box w="100%" h="100%" pos="relative">
      <LoadingOverlay visible={isLoadingWebview} />
      <webview
        ref={webviewRef}
        src={`http://localhost:${project.prismaStudioPort ?? DEFAULT_PRISMA_STUDIO_PORT}`}
        style={{ width: '100%', height: '100%' }}
      />
    </Box>
  )
}
