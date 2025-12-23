import React, { useState } from 'react';
import UploadScreen from './components/UploadScreen';
import ProcessingScreen from './components/ProcessingScreen';
import ResultsScreen from './components/ResultsScreen';
import { analyzeAudio } from './services/geminiService';
import { MeetingResult, AppState } from './types';
import { MOCK_RESULT } from './utils/mockData';

const App: React.FC = () => {
  const [view, setView] = useState<AppState>(AppState.UPLOAD);
  const [result, setResult] = useState<MeetingResult | null>(null);

  const handleFileSelect = async (file: File) => {
    setView(AppState.PROCESSING);
    
    // Process audio with Gemini (or fallback to mock if no key/error)
    try {
      const analysisResult = await analyzeAudio(file);
      setResult(analysisResult);
      setView(AppState.RESULTS);
    } catch (error) {
      console.error("Failed to process:", error);
      // Fallback to mock data on error so UI is still visible for demo
      setResult(MOCK_RESULT);
      setView(AppState.RESULTS);
    }
  };

  const handleReset = () => {
    setView(AppState.UPLOAD);
    setResult(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-[#dbdfe6] dark:border-[#2a3441] bg-white dark:bg-[#1a2230] px-4 py-3 lg:px-10">
        <div className="flex items-center gap-3 text-[#111318] dark:text-white">
          <div className="size-8 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
            <span className="material-symbols-outlined text-2xl">graphic_eq</span>
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] cursor-pointer" onClick={handleReset}>
            Reunião para Tarefas
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <button className="hidden sm:flex text-sm font-medium text-[#616f89] dark:text-[#9ca3af] hover:text-primary transition-colors">
            Histórico
          </button>
          <div className="h-8 w-[1px] bg-[#dbdfe6] dark:bg-[#2a3441] hidden sm:block"></div>
          <button 
            onClick={handleReset}
            className="flex items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-blue-700 transition-colors"
          >
            <span className="truncate">Nova Reunião</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 justify-center py-8 lg:py-12 px-4">
          <div className="layout-content-container flex flex-col w-full max-w-[960px] flex-1 gap-12">
            
            {view === AppState.UPLOAD && (
              <UploadScreen onFileSelect={handleFileSelect} />
            )}

            {view === AppState.PROCESSING && (
              <ProcessingScreen />
            )}

            {view === AppState.RESULTS && result && (
              <ResultsScreen result={result} />
            )}
            
            <div className="h-20"></div> {/* Spacer */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;