import { MeetingResult } from '../types';

export const MOCK_RESULT: MeetingResult = {
  summary: "A reunião focou no planejamento do terceiro trimestre (Q3). A equipe discutiu o lançamento do novo recurso de exportação, que foi priorizado em detrimento da integração com o calendário. O orçamento para a campanha de marketing digital foi aprovado com um aumento de 15%.",
  tasks: [
    {
      id: '1',
      text: "Criar mockups da tela de exportação",
      assigneeName: "Ana Silva",
      assigneeInitials: "AS",
      assigneeColor: "bg-purple-100 text-purple-700",
      deadline: "Até Sexta-feira"
    },
    {
      id: '2',
      text: "Atualizar roadmap no Jira",
      assigneeName: "Roberto Costa",
      assigneeInitials: "RC",
      assigneeColor: "bg-blue-100 text-blue-700",
      deadline: "Hoje"
    },
    {
      id: '3',
      text: "Investigar API de geração de PDF",
      assigneeName: "João Pereira",
      assigneeInitials: "JP",
      assigneeColor: "bg-yellow-100 text-yellow-700",
      deadline: "Em progresso"
    }
  ],
  decisions: [
    {
      id: 'd1',
      title: "Prioridade Q3",
      description: "Recurso de exportação PDF deve ser entregue antes do final do trimestre."
    },
    {
      id: 'd2',
      title: "Orçamento",
      description: "Aprovado aumento de 15% para ads no LinkedIn."
    },
    {
      id: 'd3',
      title: "Integração",
      description: "Google Calendar movido para o backlog do Q4."
    }
  ]
};