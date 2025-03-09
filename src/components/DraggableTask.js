// DraggableTask.js
import React from 'react';
import { Button } from "@/components/ui/button";
import { useDrag } from 'react-dnd';
import { Card, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CheckIcon } from "lucide-react";
import { ItemTypes } from './itemTypes';

export const DraggableTask = ({ task, index, completed }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TASK,
    item: { id: index, task }, // Geef het item door
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move',
      }}
    >
      <Card
        data-completed={completed}
        className="w-[392px] h-[75px] bg-orange-100 rounded-[9px] shadow-md flex items-center justify-between px-4 data-[completed='true']:bg-[#4A4A4A] data-[completed=true]:text-white"
      >
        <Input type="hidden" name="id" value={index} />

        <CardDescription className="flex items-center text-xl font-normal font-nunito justify-between w-full">
          <span className={`text-black ${completed ? "line-through text-white" : ""}`}>
            {task}
          </span>
          {completed && (
            <span className="ml-2 text-white font-normal font-nunito text-xl">
              💰 +5
            </span>
          )}
        </CardDescription>

        <div className="flex gap-x-3">
          {!completed && (
            <Button size="icon" variant="link" className="bg-orange-100 border-none">
              <CheckIcon className="!w-11 !h-11 text-[#B6E2D3]" />
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};