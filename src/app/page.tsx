import { Navigation } from "../components/navigation";
import { Task } from "../components/task";

export default function Home() {
  return (
  <div className="min-h-screen flex flex-col">
    <header className="z-10">
      <Navigation />
    </header>
   <main className="flex-grow">
        
        <Task />
        
      </main>
  </div>
     
        
  );
}
