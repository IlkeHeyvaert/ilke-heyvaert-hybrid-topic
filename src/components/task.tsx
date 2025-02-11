export function Task(){
    const tasks = [
        "Voorstel Eindopdracht",
        "Drink een glas water",
        "Lees een boek",
        "Ga een halfuur wandelen",
        "Kamer opruimen",
      ];
    return (
        <div>
            <div className="w-[67px] h-[45px] bg-[#f1d898] rounded-[23px] flex items-center justify-center ml-6 mt-1">
            <p className="w-[44px] h-8 text-[#4a4a4a] text-xl font-normal font-nunito">💰 0</p>
            </div>
        <div className="flex flex-col items-start space-y-4 ml-12 mt-3">
            <div className="w-[223px] h-[27px] text-black text-xl font-normal font-nunito">Nog 5 taken af te ronden</div>
      {tasks.map((task, index) => (
        <div key={index} className="w-[392px] h-[75px] bg-orange-100 rounded-[9px] shadow-md flex items-center justify-between px-4">
          <div className="text-black text-xl font-normal font-nunito">{task}</div>
          <div data-svg-wrapper>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.0999 30.3L36.0499 13.35C36.4499 12.95 36.9165 12.75 37.4499 12.75C37.9832 12.75 38.4499 12.95 38.8499 13.35C39.2499 13.75 39.4499 14.2253 39.4499 14.776C39.4499 15.3267 39.2499 15.8013 38.8499 16.2L20.4999 34.6C20.0999 35 19.6332 35.2 19.0999 35.2C18.5665 35.2 18.0999 35 17.6999 34.6L9.09987 26C8.69987 25.6 8.50787 25.1253 8.52387 24.576C8.53987 24.0267 8.74854 23.5513 9.14987 23.15C9.55121 22.7487 10.0265 22.5487 10.5759 22.55C11.1252 22.5513 11.5999 22.7513 11.9999 23.15L19.0999 30.3Z" fill="#B6E2D3"/>
            </svg>
          </div>
        </div>
      ))}
      <div className="w-[392px] h-[75px] bg-[#f8afa6] opacity-80 rounded-[9px] shadow-md flex items-center justify-between px-4">
          <div className="text-white text-xl font-normal font-nunito">Voeg een taak toe...</div>
        </div>
    </div>

    <div className="w-[645px] h-[0px] origin-top-left rotate-90 border border-black/25 ml-[500px] -mt-[635px]"></div>
 
        </div> 
        

    ) 
}