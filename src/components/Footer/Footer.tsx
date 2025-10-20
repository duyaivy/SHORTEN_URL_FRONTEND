import { Facebook, Github, Linkedin, Mail } from 'lucide-react'

import I18NextLanguage from '../I18NextLanguage'

export default function Footer() {
  return (
    <footer className='md:max-w-10/12 mx-auto w-full min-h-16  '>
      <div className='flex gap-2 flex-col md:flex-row justify-between items-start md:items-center px-6 py-2'>
        <p className=''>
          &copy;{new Date().getFullYear()} ShorkLink. All rights reserved.
          <br />
          This project was made by{' '}
          <b>
            <i>duyaivy</i>
          </b>{' '}
          with love💖
        </p>
        <div className='flex justify-between flex-1 w-full gap-2 '>
          <ul className='flex-1 flex gap-2.5 justify-start md:justify-center'>
            <li className='group'>
              <a href='mailto:quocduy0322@gmail.com' aria-label='Email'>
                <Mail className='size-10 group-hover:text-main duration-300 group-hover:-translate-y-1 p-1' />
              </a>
            </li>
            <li className='group'>
              <a href='https://github.com/duyaivy' aria-label='GitHub'>
                <Github className='size-10 group-hover:text-main duration-300 group-hover:-translate-y-1 p-1' />
              </a>
            </li>
            <li className='group'>
              <a href='https://www.facebook.com/quoc.duy.51065' aria-label='Facebook'>
                <Facebook className='size-10 group-hover:text-main duration-300 group-hover:-translate-y-1 p-1' />
              </a>
            </li>
            <li className='group'>
              <a href='https://www.linkedin.com/in/qu%E1%BB%91c-duy-78444b346' aria-label='LinkedIn'>
                <Linkedin className='size-10 group-hover:text-main duration-300 group-hover:-translate-y-1 p-1' />
              </a>
            </li>
          </ul>
          <I18NextLanguage />
        </div>
      </div>
    </footer>
  )
}
