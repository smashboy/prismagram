import { DEFAULT_PRISMA_STUDIO_PORT } from '@shared/common/configs/prisma'
import child_process, { ChildProcess } from 'child_process'
import { randomUUID } from 'crypto'
import { killPortProcess } from 'kill-port-process'

const PRISMA_STUDIO_PROCESS_ID = 'prisma-studio-process'

type CommandOptions = Record<string, boolean | string | number>

interface RunCommandOptions {
  execDirectory?: string
  id?: string
}

export default class CommandsManager {
  private readonly processes = new Map<string, ChildProcess>()
  private currentPrismaStudioPort: number | null = null

  private buildCommandOptionsString(options: CommandOptions) {
    return Object.entries(options).reduce((acc, [cmd, value]) => {
      if (!value) return acc

      if (typeof value === 'boolean') return (acc += `--${cmd} `)
      return (acc += `--${cmd} ${value} `)
    }, '')
  }

  runCommand(command: string, options: CommandOptions, settings: RunCommandOptions) {
    return new Promise((resolve) => {
      const commandString = `${command} ${this.buildCommandOptionsString(options)}`

      console.log('EXECUTING COMMAND:', commandString)

      const proc = child_process.exec(
        commandString,
        { cwd: settings.execDirectory },
        (error, stdout, stderr) => {
          console.log('EXECUTING COMMAND RESULT:', commandString, { error, stdout, stderr })
        }
      )

      this.processes.set(settings.id ?? randomUUID(), proc)
      resolve(void 0)
    })
  }

  async launchPrismaStudio(port?: number, directory?: string) {
    if (this.currentPrismaStudioPort) return

    port = port ?? DEFAULT_PRISMA_STUDIO_PORT

    await this.runCommand(
      'npx prisma studio',
      { port: port ?? DEFAULT_PRISMA_STUDIO_PORT, browser: 'none' },
      {
        execDirectory: directory,
        id: PRISMA_STUDIO_PROCESS_ID
      }
    )

    this.currentPrismaStudioPort = port
  }

  async killPrismaStudio() {
    if (this.currentPrismaStudioPort) {
      await killPortProcess(this.currentPrismaStudioPort, { signal: 'SIGTERM' })
      this.killProcess(PRISMA_STUDIO_PROCESS_ID)
      this.currentPrismaStudioPort = null
    }
  }

  hasProcess(id: string) {
    return this.processes.has(id)
  }

  killProcess(id: string) {
    const process = this.processes.get(id)
    if (process) {
      process.kill('SIGINT')
      this.processes.delete(id)
    }
  }

  async killAllProcesses() {
    await this.killPrismaStudio()
    for (const process of [...this.processes.values()]) {
      process.kill('SIGINT')
    }

    this.processes.clear()
  }
}
