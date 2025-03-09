import React, { useState } from "react";
import { DroppablePlannerCell } from './DroppablePlannerCell';

export function Planner() {
  const [droppedItems, setDroppedItems] = useState<{ id: any; task: any; x: any; y: any; completed: boolean }[]>([]);

  const handleDrop = (item: { id: any; task: any; }, x: any, y: any) => {
    console.log(`Item ${item.id} dropped at (${x}, ${y})`);
    // Voeg het gedropte item toe aan de state
    setDroppedItems((prevItems) => [
      ...prevItems,
      { id: item.id, task: item.task, x, y, completed: false }, // Voeg een completed-status toe
    ]);
  };
  

  return (
    <div className="flex-1">
      <div className="mt-6 md:-ml-56">
        <div className="flex items-center justify-between mt-6 mr-12">
          <p className="font-nunito text-2xl">03 Februari - 09 Februari</p>
          <p className="font-inria text-2xl text-[#ff7786]">2025</p>
        </div>
        <div className="flex items-center justify-between mt-6 mr-12">
          <div data-svg-wrapper>
            <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 15.4641C-0.66667 13.9245 -0.666667 10.0755 2 8.5359L15.5 0.741669C18.1667 -0.797932 21.5 1.12657 21.5 4.20577V19.7942C21.5 22.8734 18.1667 24.7979 15.5 23.2583L2 15.4641Z" fill="#F1D898" />
            </svg>
          </div>
          <div data-svg-wrapper>
            <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 8.5359C22.6667 10.0755 22.6667 13.9245 20 15.4641L6.5 23.2583C3.83333 24.7979 0.5 22.8734 0.5 19.7942L0.5 4.20577C0.5 1.12657 3.83333 -0.797931 6.5 0.741669L20 8.5359Z" fill="#F1D898" />
            </svg>
          </div>
        </div>
      </div>

      {/* Grid-container */}
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
                <DroppablePlannerCell
                  key={`cell-${hour}-${day}`}
                  x={day}
                  y={hour}
                  onDrop={handleDrop}
                  droppedItems={droppedItems}
                />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}