import { observe, unobserve } from '../disco.js';

const test = window.tape;
const body = document.body;
const createElement = (type) => document.createElement(type);

test('fires a connected event for single element', t => {
  unobserve();
  t.plan(1);

  const div = createElement('div');
  div.addEventListener('connected', () => t.pass());

  observe(body).append(div);
});

test('fires a disconnected event for single element', t => {
  unobserve();
  t.plan(1);

  const div = createElement('div');
  div.addEventListener('disconnected', () => t.pass());

  observe(body).append(div);
  div.remove();
});

test('fires a connected event for subtree', t => {
  unobserve();
  t.plan(1);

  const div = createElement('div');
  div.append(createElement('span'));
  const strong = createElement('strong');
  div.append(strong);
  strong.addEventListener('connected', () => t.pass());

  observe(body).append(div);
});

test('fires a disconnected event for subtree', t => {
  unobserve();
  t.plan(1);

  const div = createElement('div');
  div.append(createElement('span'));
  const strong = createElement('strong');
  div.append(strong);
  strong.addEventListener('disconnected', () => t.pass());

  observe(body).append(div);
  strong.remove();
});

test('prevents duplicate connected events', t => {
  unobserve();
  t.plan(1);

  const parent = createElement('div');
  const div = createElement('div');
  div.addEventListener('connected', () => t.pass());

  observe(parent);
  parent.append(div);

  observe(body).append(parent);
});

test('prevents events out of observe scope', t => {
  unobserve();
  t.plan(1);

  const parent = createElement('div');
  const div = createElement('div');
  parent.addEventListener('connected', () => t.pass());
  div.addEventListener('connected', () => t.pass());

  observe(div);
  parent.append(div);
  body.append(parent);
});
