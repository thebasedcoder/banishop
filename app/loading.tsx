import { Loader2 } from "lucide-react"; // A nice spinner icon from lucide

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
      <Loader2 className="h-8 w-8 animate-spin text-[#E11D48]" />
    </div>
  );
}