# Disco 🕺

[![Version](https://img.shields.io/npm/v/disco.svg?color=success&style=flat-square)](https://www.npmjs.com/package/disco)
![Badge size](https://img.badgesize.io/https://unpkg.com/disco/dist/disco.min.js?v=1&compression=gzip&label=gzip&style=flat-square&v=1)


**npm**: `npm i disco`  
**cdn**: https://unpkg.com/disco  

Easy and universal way to react to elements being `disconnected` and `connected` via native DOM events.

Observe via a direct node reference, an array of nodes or a string selector that internally makes use of `Element.matches(selectorString)`. It's recommended to keep the observed scope as small as possible for the best performance. 


## Example

```js
import { observe } from 'disco';

/**
 * Observe one specific div element
 */
const div = document.createElement('div');
observe(div);

div.addEventListener('connected', () => console.log('connected!'));
document.body.append(div);

/******************************************************************/

/**
 * Observe all (future) h1 elements.
 */
observe('h1');
const firstH1 = document.createElement('h1');
const lastH1 = document.createElement('h1');

firstH1.addEventListener('connected', () => console.log('connected!'));
lastH1.addEventListener('connected', () => console.log('connected!'));

document.body.append(firstH1, lastH1);

/******************************************************************/

/**
 * Observe all section elements in the document for removal.
 */
const sections = document.querySelectorAll('section');
observe(...sections);
[...sections].forEach(section =>
  section.addEventListener('disconnected', () => console.log('🕺')))
```

## API

<dl>
<dt><a href="#observe">observe(...nodesOrSelectors)</a></dt>
<dd><p>Observe a node, array of nodes or an element selector for dis-connected events.</p>
</dd>
<dt><a href="#unobserve">unobserve([...nodesOrSelectors])</a></dt>
<dd><p>Unobserve for dis-connected events.</p>
</dd>
</dl>

<a name="observe"></a>

## observe(...nodesOrSelectors)
Observe a node, array of nodes or an element selector for dis-connected events.

**Kind**: global function

| Param | Type |
| --- | --- |
| ...nodesOrSelectors | <code>Node</code> \| <code>String</code> |

<a name="unobserve"></a>

## unobserve([...nodesOrSelectors])
Unobserve for dis-connected events.

**Kind**: global function

| Param | Type |
| --- | --- |
| [...nodesOrSelectors] | <code>Node</code> \| <code>String</code> |
