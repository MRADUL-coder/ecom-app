'use client'

import ChildrenInterface from '@/interface/children.interface'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import React, { FC, useState } from 'react'
import 'animate.css'
import Logo from './shared/Logo'
import Link from 'next/link'
import {
  LoginOutlined,
  MenuOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  UserAddOutlined,
  UserOutlined
} from '@ant-design/icons'
import { usePathname } from 'next/navigation'
import {
  Avatar,
  Badge,
  Button,
  Drawer,
  Dropdown,
  Tooltip
} from 'antd'
import { signOut, useSession } from 'next-auth/react'
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

const Layout: FC<ChildrenInterface> = ({ children }) => {
  const { data } = useSWR('/api/cart?count=true', fetcher)
  const pathname = usePathname()
  const session = useSession()

  const [open, setOpen] = useState(false)

  const blacklists = [
    '/admin',
    '/login',
    '/signup',
    '/user',
    '/auth-failed'
  ]

  const userMenu = {
    items: [
      {
        icon: <UserOutlined />,
        label: (
          <Link href="/user/orders" className="capitalize">
            {session.data?.user.name}
          </Link>
        ),
        key: 'fullname'
      },
      {
        icon: <SettingOutlined />,
        label: <Link href="/user/settings">Settings</Link>,
        key: 'settings'
      },
      {
        icon: <LoginOutlined />,
        label: <a onClick={() => signOut()}>Logout</a>,
        key: 'logout'
      }
    ]
  }

  const adminMenu = {
    items: [
      {
        icon: <UserOutlined />,
        label: (
          <Link href="/user/orders" className="capitalize">
            {session.data?.user.name}
          </Link>
        ),
        key: 'fullname'
      },
      {
        icon: <SettingOutlined />,
        label: <Link href="/user/settings">Settings</Link>,
        key: 'settings'
      },
      {
        icon: <LoginOutlined />,
        label: <a onClick={() => signOut()}>Logout</a>,
        key: 'logout'
      }
    ]
  }

  const getMenu = (role: string) => {
    if (role === 'user') return userMenu
    if (role === 'admin') return adminMenu

    signOut()
    return userMenu
  }

  const isBlacklist = blacklists.some((path) =>
    pathname.startsWith(path)
  )

  if (isBlacklist) {
    return (
      <AntdRegistry>
        <div>{children}</div>
      </AntdRegistry>
    )
  }

  return (
    <AntdRegistry>
      <nav className="bg-white shadow-lg sticky top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <Logo />

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-4 lg:gap-8">
              {menus.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="py-2 px-4 hover:bg-blue-500 hover:text-white rounded transition"
                >
                  {item.label}
                </Link>
              ))}

              {!session.data && (
                <>
                  <Link
                    href="/login"
                    className="py-2 px-4 hover:bg-blue-500 hover:text-white rounded transition"
                  >
                    Login
                  </Link>

                  <Link
                    href="/signup"
                    className="py-2 px-4 bg-rose-500 text-white rounded flex items-center gap-2"
                  >
                    <UserAddOutlined />
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {session.data && (
                <>
                  {session.data.user.role === 'user' && (
                    <Tooltip title="Your carts">
                      <Link href="/user/carts">
                        <Badge count={data?.count}>
                          <ShoppingCartOutlined className="text-2xl text-slate-400" />
                        </Badge>
                      </Link>
                    </Tooltip>
                  )}

                  <Dropdown menu={getMenu(session.data.user.role)}>
                    <Avatar
                      size="large"
                      src="/images/avt.avif"
                      className="cursor-pointer"
                    />
                  </Dropdown>
                </>
              )}

              {/* Mobile Menu Button */}
              <Button
                type="text"
                icon={<MenuOutlined />}
                className="md:hidden"
                onClick={() => setOpen(true)}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className="flex flex-col gap-4">
          {menus.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-lg"
            >
              {item.label}
            </Link>
          ))}

          {!session.data && (
            <>
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="text-lg"
              >
                Login
              </Link>

              <Link
                href="/signup"
                onClick={() => setOpen(false)}
                className="text-lg"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </Drawer>

      {/* Main Content */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-16 lg:py-24">
        {children}
      </div>

      {/* Footer */}
      <footer className="bg-zinc-900 min-h-[250px] md:min-h-[450px] flex items-center justify-center text-white text-2xl md:text-4xl">
        <h1>My Footer !</h1>
      </footer>
    </AntdRegistry>
  )
}

export default Layout