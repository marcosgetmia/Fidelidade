import snowflake from 'snowflake-sdk'

type SnowflakeConnection = snowflake.Connection

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required env var: ${name}`)
  }
  return value
}

export function createSnowflakeConnection(): SnowflakeConnection {
  return snowflake.createConnection({
    account: requireEnv('SNOWFLAKE_ACCOUNT'),
    username: requireEnv('SNOWFLAKE_USERNAME'),
    authenticator: process.env.SNOWFLAKE_AUTHENTICATOR || 'EXTERNALBROWSER',
    clientStoreTemporaryCredential: true,
    clientRequestMFAToken: true,
    browserActionTimeout: Number(process.env.SNOWFLAKE_BROWSER_ACTION_TIMEOUT || '120000'),
    openExternalBrowserCallback: (url: string) => {
      console.info(`[snowflake] Abra esta URL para autenticar no Azure AD: ${url}`)
    },
    warehouse: process.env.SNOWFLAKE_WAREHOUSE,
    role: process.env.SNOWFLAKE_ROLE,
    database: process.env.SNOWFLAKE_DATABASE,
    schema: process.env.SNOWFLAKE_SCHEMA,
  })
}

export async function connectSnowflake(connection: SnowflakeConnection): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        reject(err)
        return
      }
      resolve()
    })
  })
}

export async function executeSnowflake<T = Record<string, unknown>>(
  connection: SnowflakeConnection,
  sqlText: string,
): Promise<T[]> {
  return await new Promise<T[]>((resolve, reject) => {
    connection.execute({
      sqlText,
      complete: (err, _stmt, rows) => {
        if (err) {
          reject(err)
          return
        }
        resolve((rows as T[]) || [])
      },
    })
  })
}

export async function destroySnowflake(connection: SnowflakeConnection): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    connection.destroy((err) => {
      if (err) {
        reject(err)
        return
      }
      resolve()
    })
  })
}
