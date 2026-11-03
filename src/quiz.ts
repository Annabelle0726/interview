export type QuizQuestion={id:string;topic:string;prompt:string;options:{text:string;explanation:string}[];correct:number};
export type QuizAnswers=Record<string,number>;

export function readQuizAnswers(raw:string|null,questions:QuizQuestion[]):QuizAnswers {
 try {
  const data:unknown=JSON.parse(raw||'{}');
  if (!data || typeof data!=='object' || Array.isArray(data)) return {};
  return Object.fromEntries(questions.flatMap(q=>{
   const value=(data as Record<string,unknown>)[q.id];
   return typeof value==='number' && Number.isInteger(value) && value>=0 && value<q.options.length ? [[q.id,value]] : [];
  }));
 } catch { return {}; }
}

export function quizScore(questions:QuizQuestion[],answers:QuizAnswers) {
 const attempted=questions.filter(q=>Object.hasOwn(answers,q.id));
 return {attempted:attempted.length,correct:attempted.filter(q=>answers[q.id]===q.correct).length,total:questions.length};
}
