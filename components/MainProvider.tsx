'use client'
import ChildrenInterface from '@/interface/children.interface'
import { SessionProvider } from 'next-auth/react'
import React, { FC } from 'react'
import Layout from './Layout'

const MainProvider: FC<ChildrenInterface> = ({children}) => {
  return (
    <SessionProvider>
        <Layout>
            {children}
        </Layout>
    </SessionProvider>
  )
}

export default MainProvider