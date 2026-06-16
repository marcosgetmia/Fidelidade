import { NextResponse } from 'next/server'
import {
  connectSnowflake,
  createSnowflakeConnection,
  destroySnowflake,
  executeSnowflake,
} from '@/lib/snowflake'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  let connection: ReturnType<typeof createSnowflakeConnection> | null = null

  try {
    connection = createSnowflakeConnection()
    await connectSnowflake(connection)

    const rows = await executeSnowflake<Record<string, unknown>>(
      connection,
      `
      select
        current_user() as current_user,
        current_role() as current_role,
        current_warehouse() as current_warehouse,
        current_database() as current_database,
        current_schema() as current_schema,
        current_timestamp() as connected_at
      `,
    )

    return NextResponse.json({
      ok: true,
      authMode: process.env.SNOWFLAKE_AUTHENTICATOR || 'EXTERNALBROWSER',
      rows,
      note:
        'EXTERNALBROWSER abre login interativo no ambiente onde o servidor esta rodando. Para deploy sem interacao, use OAUTH ou chave privada.',
    })
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: 'Falha ao conectar no Snowflake.',
        details: error instanceof Error ? error.message : String(error),
        hint:
          'Use um arquivo .env.local (nao .env.example) com SNOWFLAKE_ACCOUNT e SNOWFLAKE_USERNAME definidos.',
      },
      { status: 500 },
    )
  } finally {
    if (connection) {
      try {
        await destroySnowflake(connection)
      } catch {
        // noop
      }
    }
  }
}
