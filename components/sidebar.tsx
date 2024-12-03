"use client";
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import {Montserrat} from "next/font/google"
import { cn } from '@/lib/utils';
import { Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon } from 'lucide-react';

const montserrat = Montserrat ({weight: "600",subsets:["latin"]});
const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href:"/dashboard",
        color:"text-sky-500"
    },
    {
        label: "Conversation",
        icon: MessageSquare,
        href:"/conversation",
        color:"text-violet-500"
    },
    {
        label: "Image generation",
        icon: ImageIcon,
        href:"/image",
        color:"text-pink-700"
    },
    {
        label: "Video generation",
        icon: VideoIcon,
        href:"/video",
        color:"text-orange-700"
    },
    {
        label: "Music generation",
        icon: Music,
        href:"/music",
        color:"text-emerald-500"
    },
    {
        label: "Code generation",
        icon: Code,
        href:"/code",
        color:"text-green-700"
    },
    {
        label: "Settings",
        icon: Settings,
        href:"/settings",
        
    },
]

const Sidebar = () => {
  return (
    <div className='space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white'>
      <div className='px-3 py-2 flex-1'>
        <Link href='/dashboard' className='flex items-center pl-3 mb-14'>
          <div className='relative w-8 h-8 mr-4'>
            <Image 
              src="/path/to/your/image.png" 
              alt="Dashboard Icon" 
              layout="fill" 
              className="object-contain" 
            />
          </div>
          <h1 className={cn('text-2xl font-bold',montserrat.className)}>
          genius

          </h1>
        </Link>
        <div className='space-y-1'>
            {routes.map((route)=>(
                <Link
                href={route.href}
                key={route.href}
                className='text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition'
                >
                    <div className='flex items-center flex-1'>
                        <route.icon className={cn('h-5 w-5 mr-3',route.color)}/>
                        {route.label}

                    </div>
                </Link>
            ))}

        </div>
      </div>
    </div>
  );
};

export default Sidebar;
