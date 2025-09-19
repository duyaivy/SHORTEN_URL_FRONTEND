import { Facebook, Github, Linkedin, Mail } from 'lucide-react'
import { Button } from '../ui/button'

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
        <ul className='flex-1 flex gap-2.5 justify-center'>
          <li className='group'>
            <a href='https://github.com/duyaivy' className=''>
              <Mail className='size-10 group-hover:text-main duration-300 group-hover:-translate-y-1 p-1' />
            </a>
          </li>
          <li className='group'>
            <a href='https://github.com/duyaivy' className=''>
              <Github className='size-10 group-hover:text-main duration-300 group-hover:-translate-y-1 p-1' />
            </a>
          </li>
          <li className='group'>
            <a href='https://github.com/duyaivy' className=''>
              <Facebook className='size-10 group-hover:text-main duration-300 group-hover:-translate-y-1 p-1' />
            </a>
          </li>
          <li className='group'>
            <a href='https://github.com/duyaivy' className=''>
              <Linkedin className='size-10 group-hover:text-main duration-300 group-hover:-translate-y-1 p-1' />
            </a>
          </li>
        </ul>
        <Button>English</Button>
      </div>
    </footer>
  )
}
