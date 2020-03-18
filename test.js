import test from 'tape';
import { connected, disconnected, observe } from './disco.js';

import browser from 'browser-env';
browser();

test('fires a connected event for single element', t => {
  t.plan(1);

  const div = document.createElement('div');
  div.addEventListener('connected', t.pass.bind(t));

  observe(document.body).appendChild(div);
});

test('fires a connected event for subtree', t => {
  t.plan(1);

  const div = document.createElement('div');
  div.appendChild(document.createElement('span'));
  const strong = div.appendChild(document.createElement('strong'));
  strong.addEventListener('connected', t.pass.bind(t));

  observe(document.body).appendChild(div);
});
