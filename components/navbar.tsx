import React from 'react'
import { ModeToggle } from './toggle'

export const Navbar = () => {
  return (
    <div className='rounded-full p-2 2xl:p-4 px-8 flex  max-w-7xl   justify-between items-center shadow shadow-sidebar-border backdrop-blur-sm'>
        <div className='flex items-center gap-2'>
            <img src='/freepik_br_0ca48faa-f820-4803-84f0-cfe6383aefb9.png' className='w-8 h-8'></img>
            <h1 className='text-2xl 2xl:text-3xl font-semibold font-inter'>WazirY</h1>
            </div>
        <ModeToggle />
    </div>
  )
}
