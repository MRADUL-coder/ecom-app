'use client'
import ChildrenInterface from '@/interface/children.interface'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import React, { FC } from 'react'
import 'animate.css'
import Logo from './shared/Logo'
import Link from 'next/link'
import { LoginOutlined, SettingOutlined, ShoppingCartOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons'
import { usePathname } from 'next/navigation'
import { Avatar, Badge, Dropdown, Tooltip } from 'antd'
import {  signOut, useSession } from 'next-auth/react'
import useSWR from 'swr'
import fetcher from '@/lib/fetcher'

const menus = [
  {
    label: 'Home',
    href: '/'
  },
  {
    label: 'Products',
    href: '/products'
  }
]

const Layout: FC<ChildrenInterface> = ({children}) => {
  const {data} = useSWR('/api/cart?count=true', fetcher)
  const pathname = usePathname()
  const session = useSession()

  const blacklists = [
    "/admin",
    "/login",
    "/signup",
    "/user",
    "/auth-failed"
  ]

  const userMenu = {
    items: [
      {
        icon: <UserOutlined />,
        label: <Link href="/user/orders" className='capitalize'>{session.data?.user.name}</Link>,
        key: 'fullname'
      },
      {
        icon: <SettingOutlined />,
        label: <Link href="/user/settings">Settings</Link>,
        key: 'settings'
      },
      {
        icon: <LoginOutlined />,
        label: <a onClick={()=>signOut()}>Logout</a>,
        key: 'logout'
      },
    ]
  }

  const adminMenu = {
    items: [
      {
        icon: <UserOutlined />,
        label: <Link href="/user/orders" className='capitalize'>{session.data?.user.name}</Link>,
        key: 'fullname'
      },
      {
        icon: <SettingOutlined />,
        label: <Link href="/user/settings">Settings</Link>,
        key: 'settings'
      },
      {
        icon: <LoginOutlined />,
        label: <a onClick={()=>signOut()}>Logout</a>,
        key: 'logout'
      },
    ]
  }

  const getMenu = (role: string)=>{
    if(role === "user")
      return userMenu

    if(role === "admin")
      return adminMenu

    signOut()
  }

  const isBlacklist = blacklists.some((path)=>pathname.startsWith(path))

  if(isBlacklist)
  return (
    <AntdRegistry>
        <div>{children}</div>
    </AntdRegistry>
  )

  return (
    <AntdRegistry>
        <nav className='bg-white shadow-lg px-12 sticky top-0 left-0 flex justify-between items-center z-10'>
            <Logo />
            <div className='flex items-center gap-8'>
                {
                  menus.map((item, index)=>(
                    <Link key={index} href={item.href} className='py-6 px-12 hover:bg-blue-500 hover:text-white'>
                      {item.label}
                    </Link>
                  ))
                }

              {
                !session.data &&
                <div className='animate__animated animate__fadeIn flex gap-8'>
                  <Link href="/login" className='py-6 px-12 hover:bg-blue-500 hover:text-white'>Login</Link>

                  <Link href="/signup" className='py-6 px-12 hover:bg-blue-500 hover:text-white bg-rose-500 text-white font-medium flex gap-2'>
                    <UserAddOutlined />
                    Sign up
                  </Link>
                </div>
              }
            </div>
            {
              session.data &&
              <div className='flex items-center gap-8 animate__animated animate__fadeIn'>
                {
                  session.data.user.role === "user" &&
                  <Tooltip title="Your carts">
                    <Link href="/user/carts">
                      <Badge count={data && data.count}>
                        <ShoppingCartOutlined className='text-3xl !text-slate-400' />
                      </Badge>
                    </Link>
                  </Tooltip>
                }
                <Dropdown menu={getMenu(session.data.user.role)}>
                  <Avatar 
                    size="large" 
                    src="/images/avt.avif"  
                  />
                </Dropdown>
              </div>
            }
        </nav>
        <div className='w-9/12 mx-auto py-24'>{children}</div>
        <footer className='bg-zinc-900 h-[450px] flex items-center justify-center text-white text-4xl '>
            <h1>My Footer !</h1>
        </footer>
    </AntdRegistry>
  )
}

export default Layout