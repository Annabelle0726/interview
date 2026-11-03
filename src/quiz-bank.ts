import methods from './data/engineering-quiz.json' with {type:'json'};
import p0 from './data/p0-quiz.json' with {type:'json'};
import p1 from './data/p1-quiz.json' with {type:'json'};
import p2 from './data/p2-quiz.json' with {type:'json'};
import type {QuizQuestion} from './quiz';

export const methodQuestions:QuizQuestion[]=methods;
export const coreQuestions:QuizQuestion[]=[...p0,...p1,...p2];
export const allQuizQuestions:QuizQuestion[]=[...methodQuestions,...coreQuestions];
