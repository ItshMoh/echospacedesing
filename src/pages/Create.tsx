import { Mic, Send, ScanLine, Plus } from "lucide-react";
import React, { useState } from "react";
import { motion } from "motion/react";

const Create = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! Ready to map your new space? Describe it or start scanning." }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
    
    // Simulate assistant response
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "assistant", content: "I've noted that. What else should I anchor in this space?" }]);
    }, 1000);
  };

  return (
    <div className="flex h-screen w-full bg-black text-[#DEDBC8] overflow-hidden">
      {/* Left Panel: Chat Interface */}
      <div className="w-full md:w-[400px] lg:w-[450px] border-r border-white/10 flex flex-col pt-24 pb-6 px-6 relative z-10 bg-black/50 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-medium tracking-tight">New Space</h1>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Plus className="size-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-6 pr-2">
          {messages.map((msg, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={idx} 
              className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
            >
              <div 
                className={`p-4 rounded-2xl max-w-[85%] text-sm leading-relaxed ${
                  msg.role === "user" 
                    ? "bg-white/10 text-white rounded-br-sm" 
                    : "bg-transparent border border-white/10 text-[#DEDBC8] rounded-bl-sm"
                }`}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="mt-6 relative flex items-center">
          <button 
            type="button"
            className="absolute left-2 p-2.5 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <Mic className="size-5" />
          </button>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe the space..." 
            className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-14 pr-14 text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/30"
          />
          <button 
            type="submit"
            className="absolute right-2 p-2.5 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <Send className="size-5" />
          </button>
        </form>
      </div>

      {/* Right Panel: Scan Space */}
      <div className="hidden md:flex flex-1 items-center justify-center relative">
        <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
        
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group flex flex-col items-center gap-6 p-12 rounded-[2.5rem] border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
        >
          <div className="relative p-6 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
            <div className="absolute inset-0 rounded-full border border-white/20 animate-[spin_4s_linear_infinite] group-hover:border-white/40" />
            <ScanLine className="size-12 text-white/80 group-hover:text-white transition-colors" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-2xl font-medium tracking-tight text-white">Scan space</span>
            <span className="text-sm text-white/40">Initialize 3D memory map</span>
          </div>
        </motion.button>
      </div>
    </div>
  );
};

export default Create;
