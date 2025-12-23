import React, { useRef } from 'react';

interface UploadScreenProps {
  onFileSelect: (file: File) => void;
}

const UploadScreen: React.FC<UploadScreenProps> = ({ onFileSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <section className="flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-[#111318] dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
          Upload de Áudio
        </h1>
        <p className="text-[#616f89] dark:text-[#9ca3af] text-base font-normal leading-normal max-w-2xl">
          Transforme suas reuniões em listas de tarefas acionáveis e resumos inteligentes. Suporta arquivos MP3, WAV (Max 2 min).
        </p>
      </div>
      <div className="w-full">
        <div 
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="group relative flex flex-col items-center justify-center gap-6 rounded-xl border-2 border-dashed border-[#dbdfe6] dark:border-[#2a3441] bg-white dark:bg-[#1a2230] px-6 py-16 hover:border-primary/50 transition-colors cursor-pointer"
        >
          <div className="size-16 rounded-full bg-background-light dark:bg-background-dark flex items-center justify-center text-primary mb-2">
            <span className="material-symbols-outlined text-3xl">cloud_upload</span>
          </div>
          <div className="flex max-w-[480px] flex-col items-center gap-2 z-10">
            <p className="text-[#111318] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] text-center">
              Arraste e solte seu áudio aqui
            </p>
            <p className="text-[#616f89] dark:text-[#9ca3af] text-sm font-normal leading-normal text-center">
              ou clique para selecionar do seu computador
            </p>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleInputChange} 
            className="hidden" 
            accept="audio/*"
          />
          <button 
            onClick={handleClick}
            className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] shadow-lg shadow-blue-500/20 z-10 hover:bg-blue-700 transition-colors"
          >
            <span className="truncate">Selecionar Arquivo</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default UploadScreen;