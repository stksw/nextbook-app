import useSWR from 'swr'
import type { ApiContext, User } from 'types'

export type UseUserProps = {
  id: number
  initial?: User
}

export type UseUser = {
  user?: User // 取得するユーザー
  isLoading: boolean // ロードフラグ
  isError: boolean // エラーフラグ
}

const useUser = (context: ApiContext, { id, initial }: UseUserProps): UseUser => {
  const { data, error } = useSWR<User>(`${context.apiRootUrl.replace(/\/$/g, '')}/users/${id}`)

  return {
    user: data ?? initial,
    isLoading: !error && !data,
    isError: !!error,
  }
}

export default useUser
