"use client"
import { Button } from '@/components/ui/button'
import { HeroVideoDialog } from '@/components/ui/hero-video-dialog'
import { Textarea } from '@/components/ui/textarea'
import { useUser } from '@clerk/nextjs'
import { Globe2, Landmark, Plane, Send } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const suggestions=[
    {
    title:'Create New Trip',
    icon:<Globe2 className='text-blue-400 h-5 w-5' />
    },

    {
    title:'Inspire me where to go',
    icon:<Plane className='text-green-500 h-5 w-5' />
    },

    {
    title:'Discover hidden gems',
    icon:<Landmark className='text-orange-500 h-5 w-5' />
    },

    {
    title:'Adventure Destination',
    icon:<Globe2 className='text-yellow-500 h-5 w-5' />
    },


]
 function Hero() {

  const {user} = useUser();
const router=useRouter();
  const onSend=()=>{
    if(!user){
      router.push('/sign-in');
      return ;
    }
    //router.push('/dashboard');
  }
  return (
    <div className='mt-24 flex justify-center'>
      <div className='max-w-3xl w-full text-center space-y-6'>
        
        <h1 className='text-xl md:text-5xl font-bold'>
          Hey, I'm your personal <span className='text-primary'>Trip Planner</span>
        </h1>

        <p className="text-lg">
          Tell me what you want, and I'll handle the rest : Flights, Hotels, Trip planning - all in seconds
        </p>

        {/* INPUT BOX */}
        <div className='border rounded-2xl p-4 relative'>
          <Textarea
            placeholder='Create a trip for Paris from New York'
            className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none"
          />
          <Button size="icon" className="absolute bottom-6 right-6" onClick={()=>onSend()}>
            <Send className='h-4 w-4' />
          </Button>
        </div>

        {/* SUGGESTIONS BELOW INPUT */}
        <div className='flex flex-wrap justify-center gap-4'>
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className='flex items-center gap-2 border rounded-full p-2 cursor-pointer hover:bg-primary hover:text-white'
            >
              {suggestion.icon}
              <h2 className='text-sm'>{suggestion.title}</h2>
            </div>
          ))}
        </div>

        {/* <HeroVideoDialog
  className="block dark:hidden"
  animationStyle="from-center"
  videoSrc="https://www.example.com/dummy-video"
  thumbnailSrc="https:"
  thumbnailAlt="Dummy Video Thumbnail"
/> */}


      </div>
    </div>
  )
}

  

export default Hero


