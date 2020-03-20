let observedSelector;
const observer = new MutationObserver(onChanges);
const options = { subtree: true, childList: true };
observer.observe(document, options);

export function observe(selector) {
  observer.observe(document, options);
  observedSelector = selector;
  return observedSelector;
}

function onChanges(mutationList) {
  mutationList.forEach((mutation) => {
    dispatchAll('disconnected', mutation.target, mutation.removedNodes);
    dispatchAll('connected', mutation.target, mutation.addedNodes);
  });
}

function dispatchAll(type, parent, nodes) {
  nodes.forEach(node => {
    if (node.nodeType === 1) {
      dispatchTarget(type, parent, node);
    }
  });
}

function dispatchTarget(type, parent, node) {
  const observed = qs(observedSelector);
  // Prevent firing out of the observe scope.
  if (observed && (observed.contains(parent) || observed.contains(node))) {
    node.dispatchEvent(new Event(type));
  }

  node = node.firstChild;
  while (node) {
    dispatchTarget(type, parent, node);
    node = node.nextSibling;
  }
}

export function unobserve() {
  if (observer) {
    observer.disconnect();
    observedSelector = null;
  }
}

function qs(selector) {
  return selector instanceof Node ? selector : document.querySelector(selector);
}
