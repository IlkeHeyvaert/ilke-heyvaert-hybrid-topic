import { LogoutButton } from "@/components/auth/logout-button";

export function Navigation(){
    return (
       <div className="from-[#F7BDC4] to-[#F1D898] w-full h-20 bg-gradient-to-r flex items-center pl-36">
              <h1 className="text-gray-500 text-[40px] font-poppins">QuestPlanner</h1>
              <div className="fixed top-0 right-0 p-4">
        <LogoutButton />
      </div>
       </div>   )
}