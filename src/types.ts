export type Priority='P0'|'P1'|'P2';
export type Block={type:'p'|'code'|'table';text?:string;rows?:string[][]};
export type Question={id:string;title:string;category:string;priority:Priority;summary:string;focus:string[];blocks:Block[];followups:string[];boundary:string;source:string;originalRef?:string;tags:string[];links:{title:string;url:string}[]};
export type RecordState={status:'new'|'review'|'mastered';starred:boolean;note:string};
export type Progress={version:1;records:Record<string,RecordState>;signature:string};
export type Filters={query?:string;category?:string;priority?:string;mode?:string};
