
import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { db } from "@/db/client";
import { tasks } from "@/db/schema";
import React from "react";
import { eq, asc } from "drizzle-orm";
import { CheckIcon} from "lucide-react";
import { revalidatePath } from "next/cache";
import AddTaskForm from "@/components/AddTaskForm";


export async function Task(){
    const taskList = await db.select().from(tasks).orderBy(asc(tasks.completed), asc(tasks.createdAt));
    const totalPoints = taskList.filter(task => task.completed).length * 5;

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
        <div className="flex-1">
        <div className="inline-flex h-[45px] bg-[#f1d898] rounded-[23px] items-center justify-center md:ml-6 md:mt-1">
  <p className="text-[#4a4a4a] text-xl font-normal font-nunito px-3 whitespace-nowrap">
    💰 {totalPoints}
  </p>
</div>

          <div className="flex flex-col items-start space-y-4 ml-12 mt-3">
            <div className="w-[223px] h-[27px] text-black text-xl font-normal font-nunito">Nog {taskList.filter(task => !task.completed).length} taken af te ronden</div>
            <div className="overflow-y-auto max-h-[500px] scrollbar-hide space-y-4">
    {taskList.map(({ id, title, completed }) => (
      <form key={id}>
        <Card
          data-completed={completed}
          className="w-[392px] h-[75px] bg-orange-100 rounded-[9px] shadow-md flex items-center justify-between px-4 data-[completed='true']:bg-[#4A4A4A] data-[completed=true]:text-white"
        >
          <Input type="hidden" name="id" value={id} />

          <CardDescription className="flex items-center text-xl font-normal font-nunito justify-between w-full">
            <span className={`text-black ${completed ? "line-through text-white" : ""}`}>
              {title}
            </span>
            {completed && (
              <span className="ml-2 text-white font-normal font-nunito text-xl">
                💰 +5
              </span>
            )}
          </CardDescription>

          <div className="flex gap-x-3">
            {!completed && (
              <Button size="icon" variant="link" className="bg-orange-100 border-none" formAction={completeTask}>
                <CheckIcon className="!w-11 !h-11 text-[#B6E2D3]" />
              </Button>
            )}
          </div>
        </Card>
      </form>
    ))}
  </div>

  <AddTaskForm addTask={addTask} />

          </div>
        </div>
    ) 
}