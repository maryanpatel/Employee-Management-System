import { CheckCircle2, AlertCircle } from "lucide-react";

export default function ProfileAlert({ message }) {
  if (!message?.text) return null;

  const isSuccess = message.type === "success";
  return (
    <div
      className={`mb-6 p-4 rounded-2xl flex items-center gap-3 text-sm font-medium border shadow-xs animate-in fade-in slide-in-from-top-2 duration-300 ${
        isSuccess
          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
          : "bg-red-50 text-red-800 border-red-200"
      }`}
    >
      {isSuccess ? (
        <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
      ) : (
        <AlertCircle size={18} className="text-red-600 shrink-0" />
      )}
      <span>{message.text}</span>
    </div>
  );
}
