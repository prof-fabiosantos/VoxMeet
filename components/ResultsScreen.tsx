import React from 'react';
import { MeetingResult } from '../types';

interface ResultsScreenProps {
  result: MeetingResult;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ result }) => {
  
  const handleCopy = () => {
    const text = `
RESUMO EXECUTIVO:
${result.summary || ''}

TAREFAS:
${(result.tasks || []).map(t => `- [${t.assigneeName}] ${t.text} (${t.deadline})`).join('\n')}

DECISÕES CHAVE:
${(result.decisions || []).map(d => `- ${d.title}: ${d.description}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(text).then(() => {
      alert('Relatório copiado para a área de transferência!');
    });
  };

  const handleExport = () => {
    window.print();
  };

  const tasks = result.tasks || [];
  const decisions = result.decisions || [];

  return (
    <section className="flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#dbdfe6] dark:border-[#2a3441] gap-4 sm:gap-0">
        <h2 className="text-[#111318] dark:text-white tracking-light text-[28px] font-bold leading-tight">
          Resultados da Reunião
        </h2>
        <div className="flex gap-2 no-print">
          <button 
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 rounded-lg h-9 px-4 bg-white dark:bg-[#1a2230] border border-[#dbdfe6] dark:border-[#2a3441] text-[#111318] dark:text-white text-sm font-bold hover:bg-gray-50 dark:hover:bg-[#2a3441] transition-colors"
          >
            <span className="material-symbols-outlined text-lg">content_copy</span>
            <span>Copiar</span>
          </button>
          <button 
            onClick={handleExport}
            className="flex items-center justify-center gap-2 rounded-lg h-9 px-4 bg-primary text-white text-sm font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
          >
            <span className="material-symbols-outlined text-lg">print</span>
            <span>Imprimir / PDF</span>
          </button>
        </div>
      </div>

      {/* Summary Card */}
      <div className="flex flex-col p-6 rounded-xl bg-white dark:bg-[#1a2230] border border-[#dbdfe6] dark:border-[#2a3441] shadow-sm print:shadow-none print:border-gray-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="size-8 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center print:bg-gray-100 print:text-black">
            <span className="material-symbols-outlined text-lg">summarize</span>
          </div>
          <h3 className="text-lg font-bold text-[#111318] dark:text-white">Resumo Executivo</h3>
        </div>
        <p className="text-[#111318] dark:text-gray-300 text-base leading-relaxed text-justify">
          {result.summary}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:block">
        {/* Tasks Column */}
        <div className="flex flex-col p-6 rounded-xl bg-white dark:bg-[#1a2230] border border-[#dbdfe6] dark:border-[#2a3441] shadow-sm h-full print:shadow-none print:border-gray-300 print:mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center print:bg-gray-100 print:text-black">
                <span className="material-symbols-outlined text-lg">check_circle</span>
              </div>
              <h3 className="text-lg font-bold text-[#111318] dark:text-white">Tarefas</h3>
            </div>
            <span className="bg-background-light dark:bg-background-dark text-[#616f89] dark:text-[#9ca3af] text-xs font-bold px-2 py-1 rounded-md print:border print:border-gray-300">
              {tasks.length} items
            </span>
          </div>
          <div className="flex flex-col gap-3">
            {tasks.length === 0 && (
                <p className="text-sm text-[#616f89] dark:text-[#9ca3af] italic">Nenhuma tarefa identificada.</p>
            )}
            {tasks.map((task, idx) => (
              <div key={task.id || idx} className="group flex items-start gap-3 p-3 rounded-lg hover:bg-background-light dark:hover:bg-background-dark transition-colors cursor-pointer border border-transparent hover:border-[#dbdfe6] dark:hover:border-[#2a3441] print:border-b print:rounded-none print:px-0">
                <div className="pt-1 print:hidden">
                  <input className="size-5 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-800" type="checkbox"/>
                </div>
                <div className="flex flex-col flex-1 gap-1">
                  <p className="text-sm font-medium text-[#111318] dark:text-white">{task.text}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className={`size-5 rounded-full text-[10px] font-bold flex items-center justify-center ${task.assigneeColor || 'bg-gray-100 text-gray-700'} print:bg-gray-200 print:text-black`}>
                      {task.assigneeInitials}
                    </div>
                    <span className="text-xs text-[#616f89] dark:text-[#9ca3af] print:text-black">{task.assigneeName} • {task.deadline}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decisions Column */}
        <div className="flex flex-col p-6 rounded-xl bg-white dark:bg-[#1a2230] border border-[#dbdfe6] dark:border-[#2a3441] shadow-sm h-full print:shadow-none print:border-gray-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="size-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center print:bg-gray-100 print:text-black">
              <span className="material-symbols-outlined text-lg">gavel</span>
            </div>
            <h3 className="text-lg font-bold text-[#111318] dark:text-white">Decisões Chave</h3>
          </div>
          <ul className="flex flex-col gap-4">
            {decisions.length === 0 && (
                <p className="text-sm text-[#616f89] dark:text-[#9ca3af] italic">Nenhuma decisão chave identificada.</p>
            )}
            {decisions.map((decision, idx) => (
              <li key={decision.id || idx} className="flex gap-3 items-start">
                <span className="mt-1.5 size-2 rounded-full bg-primary shrink-0 print:bg-black"></span>
                <p className="text-sm text-[#111318] dark:text-gray-200 leading-normal">
                  <span className="font-bold">{decision.title}:</span> {decision.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ResultsScreen;