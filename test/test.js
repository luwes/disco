import { observe, unobserve } from '../disco.js';

const test = window.tape;
const body = document.body;
const createElement = (type) => document.createElement(type);

test('fires a connected event for single element', t => {
  unobserve();
  t.plan(1);

  const div = createElement('div');
  div.addEventListener('connected', () => t.pass());

  observe('div');
  body.append(div);
});

test('fires a disconnected event for single element', t => {
  unobserve();
  t.plan(1);

  const div = createElement('div');
  div.addEventListener('disconnected', () => t.pass());

  observe(div);
  body.append(div);
  div.remove();
});

test('fires a connected event for subtree', t => {
  unobserve();
  t.plan(2);

  const div = createElement('div');
  div.append(createElement('span'));

  const strong = createElement('strong');
  div.append(strong);

  strong.addEventListener('connected', () => t.pass());
  div.addEventListener('connected', () => t.pass());

  observe(strong, 'div');
  body.append(div);
});

test('fires a disconnected event for subtree', t => {
  unobserve();
  t.plan(1);

  const div = createElement('div');
  div.append(createElement('span'));
  const strong = createElement('strong');
  div.append(strong);
  strong.addEventListener('disconnected', () => t.pass());

  observe(strong);
  body.append(div);
  strong.remove();
});

test('prevents duplicate connected events', t => {
  unobserve();
  t.plan(1);

  const parent = createElement('div');
  const div = createElement('div');
  div.addEventListener('connected', () => t.pass());

  observe('div > div');
  parent.append(div);
  body.append(parent);
});

test('prevents events out of observe scope for connected', t => {
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

test('prevents events out of observe scope for disconnected', t => {
  unobserve();
  t.plan(1);

  const parent = createElement('div');
  const div = createElement('div');
  parent.addEventListener('disconnected', () => t.pass());
  div.addEventListener('disconnected', () => t.pass());

  observe(div);
  parent.append(div);
  body.append(parent);

  parent.remove();
});

test('fires a disconnected event for subtree observing NodeList', t => {
  unobserve();
  t.plan(2);

  const div = createElement('div');
  const div2 = createElement('div');
  div.append(div2);

  div.addEventListener('disconnected', () => t.pass());
  div2.addEventListener('disconnected', () => t.pass());

  body.append(div);
  observe(...document.querySelectorAll('div'));
  div.remove();
});
