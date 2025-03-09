import React from "react";
import { useDrop } from 'react-dnd';
import { ItemTypes } from './itemTypes';
import { Card, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";

interface DroppablePlannerCellProps {
  x: number;
  y: number;
  onDrop: (item: any, x: number, y: number) => void;
  droppedItems: { id: React.Key; x: number; y: number; completed: boolean; task: React.ReactNode }[];
}

export function DroppablePlannerCell({ x, y, onDrop, droppedItems }: DroppablePlannerCellProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.TASK,
    drop: (item) => {
      onDrop(item, x, y); // Roep de onDrop callback aan
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }), [x, y]);

  return (
    <div
      ref={drop as unknown as React.Ref<HTMLDivElement>}
      style={{
        border: isOver ? '2px dashed #000' : '1px solid #ccc',
        backgroundColor: isOver ? '#f0f0f0' : 'transparent',
        height: '100px',
      }}
    >
      {/* Toon gedropte items in deze cel */}
      {droppedItems
        .filter((item: { x: any; y: any; }) => item.x === x && item.y === y)
        .map((item: { id: React.Key | null | undefined; completed: any; task: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, index: string | number | readonly string[] | undefined) => (
          <Card
            key={item.id}
            data-completed={item.completed}
            className="w-29 h-[75px] bg-orange-100 rounded-[9px] shadow-md flex flex-col items-center justify-between px-4 data-[completed='true']:bg-[#4A4A4A] data-[completed=true]:text-white"
          >
            <Input type="hidden" name="id" value={index} />

            <CardDescription className="flex items-center text-sm font-normal font-nunito justify-between w-full">
              <span className={`text-black ${item.completed ? "line-through text-white" : ""}`}>
                {item.task}
              </span>
              {item.completed && (
                <span className="ml-2 text-white font-normal font-nunito text-xl">
                  💰 +5
                </span>
              )}
            </CardDescription>

            <div className="flex gap-x-3">
              {!item.completed && (
                <Button size="icon" variant="link" className="bg-orange-100 border-none w-0">
                  <CheckIcon className="!w-11 !h-11 text-[#B6E2D3]" />
                </Button>
              )}
            </div>
          </Card>
        ))}
    </div>
  );
}