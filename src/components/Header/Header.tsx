import { path } from '@/constants/path'
import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import classnames from 'classnames'
import { useContext, useState } from 'react'
import { AppContext } from '@/contexts/app.context'
import { useLogoutMutation } from '@/apis/auth.api'
import { useTranslation } from 'react-i18next'
import {
  ListItem,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '../ui/navigation-menu'
import { logo } from '@/assets/images'
import LinkHoverAnimate from '../LinkHoverAnimate'
import { menuV2 } from '@/assets/icons'
import IconAnimateClick from '../IconAnimateClick'
import { clearLS, getRefreshTokenFromLS } from '@/utils/storage'
import LoginNowDialog from '@/pages/Login/LoginNowDialog'

export default function Header() {
  const { isAuthenticated, profile } = useContext(AppContext)
  const { t } = useTranslation()
  const [isShow, setIsShow] = useState<boolean>(false)
  console.log(profile)

  const logoutMutation = useLogoutMutation()
  const handleLogout = () => {
    const refresh_token = getRefreshTokenFromLS()
    if (refresh_token) {
      logoutMutation.mutate(refresh_token)
    } else {
      clearLS()
    }
  }

  return (
    <header className='w-full h-20 md:h-24 z-50'>
      <div className='z-90 h-full'>
        <div className=' md:max-w-10/12 mx-auto px-4 h-full flex justify-end items-center'>
          <div className='flex justify-between  w-full h-full'>
            <div className='col-span-8 md:col-span-3 '>
              <div className='flex justify-center items-center h-full'>
                <Link to={path.home} className='flex justify-between items-center '>
                  <img className='w-auto h-18' src={logo} alt='logo' />
                </Link>
              </div>
            </div>
            <div className='flex gap-4'>
              <div className=' hidden md:block'>
                <div className='flex h-full items-center justify-center gap-4 lg:gap-6 '>
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                          <Link to={path.scan_qr}>{t('scan_qr')}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                          <Link to={path.shorten_link}>{t('shorten_link')}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        {isAuthenticated ? (
                          <NavigationMenuLink asChild>
                            <Link to={path.my_url}>{t('my_url')}</Link>
                          </NavigationMenuLink>
                        ) : (
                          <LoginNowDialog
                            trigger={
                              <NavigationMenuLink asChild>
                                <p>{t('my_url')}</p>
                              </NavigationMenuLink>
                            }
                          />
                        )}
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        {isAuthenticated ? (
                          <NavigationMenuLink asChild>
                            <Link to={path.history}>{t('history')}</Link>
                          </NavigationMenuLink>
                        ) : (
                          <LoginNowDialog
                            trigger={
                              <NavigationMenuLink asChild>
                                <p>{t('history')}</p>
                              </NavigationMenuLink>
                            }
                          />
                        )}
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </div>
              </div>
              <div className=''>
                <div className=' h-full justify-end items-center hidden md:flex'>
                  {isAuthenticated && profile ? (
                    <NavigationMenu>
                      <NavigationMenuList>
                        <NavigationMenuItem>
                          <NavigationMenuTrigger className='!bg-transparent hover:!bg-transparent text-sm !text-tmain hover:!text-main duration-300 flex h-full justify-start md:justify-end items-center group cursor-pointer  w-full !p-0 !pl-0 md:!ml-4 md:!pr-0 '>
                            <div className='shrink-0 flex justify-center items-center  w-10 h-10  '>
                              <Avatar>
                                <AvatarImage src={profile.avatar_url} alt='@shadcn' />
                                <AvatarFallback>SL</AvatarFallback>
                              </Avatar>
                            </div>
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className='w-[150px] min-h-10 py-2 flex flex-col justify-center items-center gap-1 '>
                              <p className='hover:bg-main/10 w-full rounded-[2px] py-1 text-center text-white hover:!text-main text-sm cursor-pointer truncate'>
                                {profile.email}
                              </p>

                              <ListItem to={path.login}>
                                <button onClick={handleLogout} className='cursor-pointer font-semibold'>
                                  {t('logout')}
                                </button>
                              </ListItem>
                            </ul>
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                      </NavigationMenuList>
                    </NavigationMenu>
                  ) : (
                    <div className=' justify-end h-full items-center hidden md:flex'>
                      <LinkHoverAnimate text={t('login')} to={path.login} />
                    </div>
                  )}
                  {/* Đăng nhập */}
                </div>
              </div>
            </div>

            <div className='col-span-2 order-3 md:hidden h-full flex items-center'>
              <button
                onClick={() => {
                  setIsShow((prev) => !prev)
                }}
                className=' flex justify-end items-center p-4 '
              >
                <IconAnimateClick loop={false} play={true} animationData={menuV2} className='size-10 ' speed={2} />
              </button>
            </div>
          </div>
        </div>
        {/* popover */}
        <div
          style={{
            background: 'radial-gradient(circle,rgba(18, 3, 41, 1) 0%, rgba(14, 2, 26, 1) 100%)'
          }}
          className={classnames(
            'top-[-100%] right-0 left-0 shadow h-80px] translate-y-[-80px] opacity-0 invisible duration-500 -z-1',
            { 'translate-y-[0px] opacity-100 visible ': isShow }
          )}
        >
          <ul className='flex w-full flex-col justify-center items-center '>
            <ListItem to={path.home}>
              <p className='text-md text-tmain  py-2  text-center line-clamp-2 group-hover:text-main duration-300'>
                {t('home')}
              </p>
            </ListItem>
            <ListItem to={path.scan_qr}>
              <p className='text-md text-tmain  py-2  text-center line-clamp-2 group-hover:text-main duration-300'>
                {t('scan_qr')}
              </p>
            </ListItem>
            <ListItem to={path.shorten_link}>
              <p className='text-md text-tmain  py-2  text-center line-clamp-2 group-hover:text-main duration-300'>
                {t('shorten_link')}
              </p>
            </ListItem>
            <ListItem to={path.my_url}>
              <p className='text-md text-tmain  py-2  text-center line-clamp-2 group-hover:text-main duration-300'>
                {t('my_url')}
              </p>
            </ListItem>
            <ListItem to={path.history}>
              <p className='text-md text-tmain  py-2  text-center line-clamp-2 group-hover:text-main duration-300'>
                {t('history')}
              </p>
            </ListItem>

            {isAuthenticated && profile ? (
              <ListItem to={path.login}>
                <button
                  onClick={handleLogout}
                  className='w-full text-md text-tmain  py-2  text-center line-clamp-2 group-hover:text-main duration-300'
                >
                  {profile.email + ' | ' + t('logout')}
                </button>
              </ListItem>
            ) : (
              <ListItem to={path.login}>
                <p className='text-md text-tmain  py-2  text-center line-clamp-2 group-hover:text-main duration-300'>
                  {t('login')}
                </p>
              </ListItem>
            )}
          </ul>
        </div>
      </div>
    </header>
  )
}
