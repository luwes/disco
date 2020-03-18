
const observing = [];

export function observe(selector) {
  const element = qs(selector);
  if (observing.some(o => o.contains(element))) return element;

  observing.push(element);

  const observer = new MutationObserver(onChanges);
  observer.observe(element, { subtree: true, childList: true });

  function onChanges(mutationList) {
    mutationList.forEach((mutation) => {
      dispatchAll('disconnected', mutation.removedNodes);
      dispatchAll('connected', mutation.addedNodes);
    });
  }

  return element;
}

function dispatchAll(type, nodes) {
  nodes.forEach(node => node.nodeType === 1 && dispatchTarget(type, node));
}

function dispatchTarget(type, node) {
  node.dispatchEvent(new Event(type));

  node = node.firstChild;
  while (node) {
    dispatchTarget(type, node);
    node = node.nextSibling;
  }
}

export const connected = conn('');
export const disconnected = conn('dis');

function conn(dis) {
  return function(selector, fn) {
    const element = qs(selector);
    if (element && (element.isConnected || dis)) {
      fn(element);
    } else {
      document.addEventListener(`${dis}connected`, e => {
        if (e.target === element) fn(e.target);
      }, true);
    }
  };
}

function qs(selector) {
  return selector instanceof Node ? selector : document.querySelector(selector);
}
