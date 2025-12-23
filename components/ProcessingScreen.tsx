import React, { useEffect, useState } from 'react';

const ProcessingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('Preparando...');

  useEffect(() => {
    // Simulate progress for visual feedback matching the user experience
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev; // Hold at 95 until complete
        
        const next = prev + 1;
        
        // Update stage text based on progress
        if (next < 30) {
            setStage('Enviando áudio...');
        } else if (next < 60) {
            setStage('Transcrevendo áudio...');
        } else {
            setStage('Gerando lista de tarefas e decisões...');
        }
        
        return next;
      });
    }, 150); // Slower progress to match realistic wait times (approx 15s)

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex flex-col gap-4 animate-fade-in items-center justify-center py-20">
      <div className="flex flex-col items-center gap-6 w-full max-w-md">
        <div className="relative size-20 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-5xl animate-spin">autorenew</span>
        </div>
        
        <div className="flex flex-col gap-2 items-center text-center">
            <h2 className="text-[#111318] dark:text-white tracking-light text-[24px] font-bold leading-tight">
            Processando Reunião
            </h2>
            <p className="text-[#616f89] dark:text-[#9ca3af] text-base font-normal">
             Isso pode levar alguns instantes.
            </p>
        </div>

        <div className="flex flex-col gap-2 w-full p-6 rounded-xl bg-white dark:bg-[#1a2230] border border-[#dbdfe6] dark:border-[#2a3441] shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-[#111318] dark:text-white text-sm font-bold transition-all duration-300">
              {stage}
            </span>
            <span className="text-primary font-bold text-sm">{progress}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-background-light dark:bg-background-dark overflow-hidden">
            <div 
              className="h-full rounded-full bg-primary transition-all duration-300 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessingScreen;