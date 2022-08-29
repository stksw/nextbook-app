import type { ApiContext } from 'types'
import { fetcher } from 'utils'

/**
 * 認証API（サインアウト）
 * @param context APIコンテキスト
 * @returns サインアウトメッセージ
 */
const signout = async (context: ApiContext): Promise<{ message: string }> => {
  const apiContext = context.apiRootUrl.replace(/\/$/g, '')

  return await fetcher(`${apiContext}/auth/signout`, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  })
}

export default signout
