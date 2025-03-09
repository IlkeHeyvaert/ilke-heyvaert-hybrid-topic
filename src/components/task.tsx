import React from 'react';

import { DraggableTask } from './DraggableTask';

export function Task() {
  const tasks = [
    "Voorstel Eindopdracht",
    "Drink een glas water",
    "Lees een boek",
    "Ga een halfuur wandelen",
    "Kamer opruimen",
    "Doe een powernap",
    "Schrijf een blogpost",
  ];

  const completed = false;

  return (
    <div className="flex-1">
      <div className="inline-flex h-[45px] bg-[#f1d898] rounded-[23px] items-center justify-center md:ml-6 md:mt-1">
        <p className="text-[#4a4a4a] text-xl font-normal font-nunito px-3 whitespace-nowrap">
          💰 0
        </p>
      </div>

      <div className="flex flex-col items-start space-y-4 ml-12 mt-3">
        <div className="w-[223px] h-[27px] text-black text-xl font-normal font-nunito">Nog 5 taken af te ronden</div>
        <div className="overflow-y-auto max-h-[500px] scrollbar-hide space-y-4">
          {tasks.map((task, index) => (
            <DraggableTask key={index} task={task} index={index} completed={completed} />
          ))}
        </div>

        <div className="w-[392px] h-[75px] bg-[#f8afa6] opacity-80 rounded-[9px] shadow-md flex items-center justify-between px-4">
          <div className="text-white text-xl font-normal font-nunito">Voeg een taak toe...</div>
        </div>
      </div>
    </div>
  );
}