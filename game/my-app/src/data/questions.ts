import type { Question } from '@/types';

export const QUESTIONS: Question[] = [
  {
    text: 'Qual é a capital do Brasil?',
    options: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador'],
    correctIndex: 2,
    timeLimit: 10000,
  },
  {
    text: 'Quem написа "Dom Casmurro"?',
    options: ['José de Alencar', 'Machado de Assis', 'Clarice Lispector', 'Monteiro Lobato'],
    correctIndex: 1,
    timeLimit: 10000,
  },
  {
    text: 'Qual é o maior planeta do sistema solar?',
    options: ['Terra', 'Saturno', 'Júpiter', 'Netuno'],
    correctIndex: 2,
    timeLimit: 10000,
  },
  {
    text: 'Em que ano occurred a Independência do Brasil?',
    options: ['1808', '1822', '1889', '1500'],
    correctIndex: 1,
    timeLimit: 10000,
  },
  {
    text: 'Qual é o símbolo químico do ouro?',
    options: ['Ag', 'Fe', 'Au', 'Cu'],
    correctIndex: 2,
    timeLimit: 10000,
  },
  {
    text: 'Quantos continents existem?',
    options: ['5', '6', '7', '8'],
    correctIndex: 2,
    timeLimit: 10000,
  },
  {
    text: 'Qual é o maior oceano do mundo?',
    options: ['Atlântico', 'Índico', 'Ártico', 'Pacífico'],
    correctIndex: 3,
    timeLimit: 10000,
  },
  {
    text: 'Quem pintou a Mona Lisa?',
    options: ['Michelangelo', 'Raphael', 'Leonardo da Vinci', 'Donatello'],
    correctIndex: 2,
    timeLimit: 10000,
  },
  {
    text: 'Qual é a língua mais falada no mundo?',
    options: ['Inglês', 'Espanhol', 'Mandarim', 'Hindi'],
    correctIndex: 2,
    timeLimit: 10000,
  },
  {
    text: 'Em que ano termina a Segunda Guerra Mundial?',
    options: ['1943', '1944', '1945', '1946'],
    correctIndex: 2,
    timeLimit: 10000,
  },
];
