import UserLayout from '@/components/user/UserLayout'
import ChildrenInterface from '@/interface/children.interface'
import React, { FC } from 'react'

const UserLayoutRouter: FC<ChildrenInterface> = ({children}) => {
  return (
    <UserLayout>
        {children}
    </UserLayout>
  )
}

export default UserLayoutRouter