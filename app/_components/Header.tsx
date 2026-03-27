import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

const menuOptions = [
  {
    name: "Home",
    path: '/'
  },
  {
    name: 'Pricing',
    path: '/pricing'
  },
  {
    name: 'Contact Us',
    path: '/contact-us'
  }
]

function Header() {
  return (
    <div className="flex justify-between items-center p-4">
      <div className="flex gap-2 items-center">
        <Image src={'/logo.svg'} alt='logo' width={30} height={30} />
        <h2 className='font-bold text-2xl'>TripSphere</h2>
      </div>

      <div className='flex gap-8 items-center'>
        {menuOptions.map((menu, index) => (
          <Link href={menu.path} key={menu.path ?? index}>
            <h2 className='text-lg hover:scale-105 transition-all hover:text-primary'>{menu.name}</h2>
          </Link>
        ))}
      </div>

      <div className='flex gap-4 items-center'>
        <SignedOut>
          <SignInButton mode="modal">
            <Button>Get Started</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <Link href="/dashboard">
            <Button variant="outline">My Trips</Button>
          </Link>
          <UserButton />
        </SignedIn>
      </div>

    </div>
  )
}

export default Header