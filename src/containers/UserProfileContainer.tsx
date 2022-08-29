import React from 'react'
import UserProfile from 'components/organisms/UserProfile'
import useUser from 'services/users/useUser'
import { ApiContext, User } from 'types'

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH || '/api/proxy',
}

type UserProfileContainerProps = {
  userId: number
  user?: User // 初期で表示するユーザー
}

const UserProfileContainer = ({ userId, user }: UserProfileContainerProps) => {
  const { user: u } = useUser(context, { id: userId, initial: user })

  if (!u) return <div>Loading...</div>

  return (
    <UserProfile
      username={`${u.username} (${u.displayName})`}
      profileImageUrl={u.profileImageUrl}
      numberOfProducts={100}
      description={u.description}
    />
  )
}

export default UserProfileContainer
