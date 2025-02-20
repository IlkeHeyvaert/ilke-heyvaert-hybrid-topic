import { Separator } from "@radix-ui/react-separator";
import { Input } from "@/components/ui/input"
import { db } from "@/db/client";
import { tasks } from "@/db/schema";
import React from "react";

export async function Task(){
    const taskList = await db.select().from(tasks);

    return (
      <div className="flex flex-col md:flex-row">
        <div className="flex-1">
          <div className="w-[67px] h-[45px] bg-[#f1d898] rounded-[23px] flex items-center justify-center md:ml-6 md:mt-1">
            <p className="w-[44px] h-8 text-[#4a4a4a] text-xl font-normal font-nunito">💰 0</p>
          </div>
          <div className="flex flex-col items-start space-y-4 ml-12 mt-3">
            <div className="w-[223px] h-[27px] text-black text-xl font-normal font-nunito">Nog {taskList.length} taken af te ronden</div>
            {taskList.map(({id, title}) => (
              <div key={id} className="w-[392px] h-[75px] bg-orange-100 rounded-[9px] shadow-md flex items-center justify-between px-4">
                <div className="text-black text-xl font-normal font-nunito">{title}</div>
                <div data-svg-wrapper>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.0999 30.3L36.0499 13.35C36.4499 12.95 36.9165 12.75 37.4499 12.75C37.9832 12.75 38.4499 12.95 38.8499 13.35C39.2499 13.75 39.4499 14.2253 39.4499 14.776C39.4499 15.3267 39.2499 15.8013 38.8499 16.2L20.4999 34.6C20.0999 35 19.6332 35.2 19.0999 35.2C18.5665 35.2 18.0999 35 17.6999 34.6L9.09987 26C8.69987 25.6 8.50787 25.1253 8.52387 24.576C8.53987 24.0267 8.74854 23.5513 9.14987 23.15C9.55121 22.7487 10.0265 22.5487 10.5759 22.55C11.1252 22.5513 11.5999 22.7513 11.9999 23.15L19.0999 30.3Z" fill="#B6E2D3"/>
                  </svg>
                </div>
              </div>
            ))}
            <div className="w-[392px] h-[75px] bg-[#f8afa6] opacity-80 rounded-[9px] shadow-md flex items-center justify-between px-4">
              <div className="text-white text-xl font-normal font-nunito"><Input type="text" placeholder="Voeg een taak toe..." className="text-white bg-[#f8afa6] placeholder-white border-none text-input-white focus:outline-none focus:border-0"/></div>
            </div>
          </div>
        </div>
    
        <Separator orientation="vertical" className="hidden md:block w-px bg-black/25 h-full absolute left-1/3 top-0 transform translate-x-1/2"/>
 
        <div className="flex-1">
          <div className="mt-6 md:-ml-56">
            <div className="flex items-center justify-between mt-6 mr-12">
              <p className="font-nunito text-2xl">03 Februari - 09 Februari</p>
              <p className="font-inria text-2xl text-[#ff7786]">2025</p>
            </div>
            <div className="flex items-center justify-between mt-6 mr-12">
              <div data-svg-wrapper>
                <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 15.4641C-0.66667 13.9245 -0.666667 10.0755 2 8.5359L15.5 0.741669C18.1667 -0.797932 21.5 1.12657 21.5 4.20577V19.7942C21.5 22.8734 18.1667 24.7979 15.5 23.2583L2 15.4641Z" fill="#F1D898"/>
                </svg>
              </div>
              <div data-svg-wrapper>
                <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 8.5359C22.6667 10.0755 22.6667 13.9245 20 15.4641L6.5 23.2583C3.83333 24.7979 0.5 22.8734 0.5 19.7942L0.5 4.20577C0.5 1.12657 3.83333 -0.797931 6.5 0.741669L20 8.5359Z" fill="#F1D898"/>
                </svg>
              </div>
            </div>

            
            
          </div>
          

          <div className="absolute left-1/3 w-2/3 h-[590px] overflow-y-auto border border-gray-300 rounded-lg mt-3">
  <div className="grid grid-cols-8 grid-rows-25 h-[2500px] relative">
    
    {/* Header: 7 dagen bovenaan */}
    <div className="bg-white border-b border-gray-300"></div>
    {["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"].map((day, index) => (
      <div key={`day-${index}`} className="text-center font-nunito text-xl p-2 bg-white border-b border-l border-gray-300">
        {day}
      </div>
    ))}
    
    {/* 24 Uur kolommen */}
    {[...Array(24)].map((_, hour) => (
      <React.Fragment key={`hour-${hour}`}>
        {/* Uur-label aan de rechterkant */}
        <div className="text-right pr-2 border-r border-black/25 text-gray-600 font-nunito">
          {hour}:00
        </div>

        {/* 7 Kolommen voor de dagen */}
        {[...Array(7)].map((_, day) => (
          <div key={`cell-${hour}-${day}`} className="border border-black/25 h-[100px]"></div>
        ))}
      </React.Fragment>
    ))}
  </div>
</div>



           
        </div>
      </div> 
        

    ) 
}