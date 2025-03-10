"use client";
import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { Navigation } from "../components/navigation";
import {Task} from "../components/task";
import { Separator } from "@radix-ui/react-separator";
import { Planner } from "@/components/Planner";

export default  function Home() {

  return (
    <DndProvider backend={HTML5Backend}>
  <div className="min-h-screen flex flex-col">
    <header className="z-10">
      <Navigation />
    </header>
      <main className="flex flex-col md:flex-row">
        <Task />
        <Separator orientation="vertical" className="hidden md:block w-px bg-black/25 h-full absolute left-1/3 top-0 transform translate-x-1/2"/>
        <Planner/>
      </main>
  </div>
     </DndProvider>
        
  );
}
