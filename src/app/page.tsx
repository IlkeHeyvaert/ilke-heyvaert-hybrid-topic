import { Navigation } from "../components/navigation";
import { Task } from "../components/task";

export default function Home() {
  return (
  <div className="min-h-screen flex flex-col">
    <header>
      <Navigation />
    </header>
   <main className="flex-grow">
        
        <Task />
        
      </main>
      <footer className="bg-gray-100 p-5 flex justify-center ">
          <h1 className="text-xl font-nunito">Ilke Heyvaert</h1>
        </footer>
  </div>
     
        
  );
}
