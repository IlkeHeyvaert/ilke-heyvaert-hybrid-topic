import { Input } from "@/components/ui/input";

interface AddTaskFormProps {
  addTask: (formData: FormData) => Promise<void>;
}

export default function AddTaskForm({ addTask }: AddTaskFormProps) {
  return (
    <form className="flex items-center" action={addTask}>
      <div className="w-[392px] h-[75px] bg-[#f8afa6] opacity-80 rounded-[9px] shadow-md flex items-center justify-between px-4">
        <div className="text-white text-xl font-normal font-nunito">
          <Input
            type="text"
            name="title"
            placeholder="Voeg een taak toe..."
            className="text-white bg-[#f8afa6] placeholder-white border-none text-input-white focus:outline-none focus:border-0"
            required
          />
        </div>
      </div>
    </form>
  );
}
