import {createElement, Fragment} from 'react';

export function Emphasis({text}:{text:string}) {
 return createElement(Fragment,null,...text.split(/(\*\*[^*\n]+\*\*)/g).map((part,index)=>
  /^\*\*[^*\n]+\*\*$/.test(part)
   ? createElement('strong',{key:index},part.slice(2,-2))
   : part));
}
