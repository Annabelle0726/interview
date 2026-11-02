import test from 'node:test';
import assert from 'node:assert/strict';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {Emphasis} from '../src/Emphasis.ts';

test('emphasizes marked phrases while preserving plain text and unmatched markers',()=>{
 assert.equal(renderToStaticMarkup(createElement(Emphasis,{text:'用 **Python** 做后端，**Vibe Coding** 组织交付。'})), '用 <strong>Python</strong> 做后端，<strong>Vibe Coding</strong> 组织交付。');
 assert.equal(renderToStaticMarkup(createElement(Emphasis,{text:'保留未闭合的 **标记'})), '保留未闭合的 **标记');
 assert.equal(renderToStaticMarkup(createElement(Emphasis,{text:'**跨行\n文本**'})), '**跨行\n文本**');
});

test('user-authored answer text is escaped instead of interpreted as HTML',()=>{
 const result=renderToStaticMarkup(createElement(Emphasis,{text:'**<img src=x onerror=alert(1)>** <script>alert(1)</script>'}));
 assert.ok(result.includes('<strong>&lt;img'));
 assert.ok(!result.includes('<img'));
 assert.ok(!result.includes('<script>'));
});
