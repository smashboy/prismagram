import { Progress } from '@mantine/core'
import { APP_UPDATE_DOWNLOADING } from '@shared/common/configs/api'
import { useEffect, useState } from 'react'
import { ipcRenderer } from '../electron'

export const AppUpdateProgress = () => {
  const [progress, setProgress] = useState(0)

  const handleSetDownloadProgress = (_: unknown, progress: number) => setProgress(progress)

  useEffect(() => {
    // const interval = setInterval(() => {
    //   setProgress((prev) => {
    //     if (prev === 100) {
    //       clearInterval(interval)
    //       return 0
    //     }

    //     return (prev += 10)
    //   })
    // }, 3000)

    ipcRenderer.on(APP_UPDATE_DOWNLOADING, handleSetDownloadProgress)

    return () => {
      ipcRenderer.removeListener(APP_UPDATE_DOWNLOADING, handleSetDownloadProgress)
      // clearInterval(interval)
    }
  }, [])

  return <Progress value={progress} />
}
