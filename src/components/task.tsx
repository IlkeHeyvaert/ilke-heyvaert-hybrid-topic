import { Separator } from "@radix-ui/react-separator";
import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { db } from "@/db/client";
import { tasks } from "@/db/schema";
import React from "react";
import { eq, asc } from "drizzle-orm";
import { CheckIcon} from "lucide-react";
import { revalidatePath } from "next/cache";

export async function Task(){
    const taskList = await db.select().from(tasks).orderBy(asc(tasks.createdAt));

    async function completeTask(formData: FormData) {
      "use server";
  
      const id = formData.get("id")?.toString() ?? "";
  
      await db.update(tasks).set({ completed: true }).where(eq(tasks.id, id));
      revalidatePath("/");
    }

    async function addTask(formData: FormData) {
      "use server";

      const title = formData.get("title")?.toString() ?? "";

      await db.insert(tasks).values({ title, completed: false, time_it_takes: "1 hour" });
      revalidatePath("/");
    }

    return (
      <div className="flex flex-col md:flex-row">
        <div className="flex-1">
          <div className="w-[67px] h-[45px] bg-[#f1d898] rounded-[23px] flex items-center justify-center md:ml-6 md:mt-1">
            <p className="w-[44px] h-8 text-[#4a4a4a] text-xl font-normal font-nunito">💰 0</p>
          </div>
          <div className="flex flex-col items-start space-y-4 ml-12 mt-3">
            <div className="w-[223px] h-[27px] text-black text-xl font-normal font-nunito">Nog {taskList.filter(task => !task.completed).length} taken af te ronden</div>
            {taskList.map(({id, title, completed}) => (
              <form key={id}>
              <Card
                data-completed={completed}
                className="w-[392px] h-[75px] bg-orange-100 rounded-[9px] shadow-md flex items-center justify-between px-4 data-[completed='true']:bg-[#4A4A4A] data-[completed=true]:line-through data-[completed=true]:text-white"
              >
                <Input type="hidden" name="id" value={id} />

                <CardDescription className={`text-xl font-normal font-nunito transition-colors duration-200 
                   ${completed ? "text-white line-through" : "text-black"}`} >{title}</CardDescription>

                <div className="flex gap-x-3">
                  {!completed && (
                    <Button size="icon" variant="link" className="bg-orange-100 border-none" formAction={completeTask}>
                      <CheckIcon className="!w-11 !h-11 text-[#B6E2D3]"/>

                    </Button>
                  )}
                </div>
              </Card>
            </form>
              
            ))}

          <form className="flex items-center" action={addTask}>
          <div className="w-[392px] h-[75px] bg-[#f8afa6] opacity-80 rounded-[9px] shadow-md flex items-center justify-between px-4">
              <div className="text-white text-xl font-normal font-nunito"><Input type="text" name="title" placeholder="Voeg een taak toe..." className="text-white bg-[#f8afa6] placeholder-white border-none text-input-white focus:outline-none focus:border-0" required/></div>
            </div>
        </form>

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