let observer;
let observed = new Set();
let observedSelectors;

/**
 * Observe a node, array of nodes or an element selector for dis-connected events.
 * @param  {...(Node|String)} nodesOrSelectors
 */
export function observe(...nodesOrSelectors) {
  if (!observer) {
    observer = new MutationObserver(onChanges);
    observer.observe(document, { subtree: true, childList: true });
  }
  nodesOrSelectors.forEach(s => observed.add(s));
}

function onChanges(mutationList) {
  observedSelectors = [...observed].filter(s => typeof s === 'string');

  mutationList.forEach(({ removedNodes, addedNodes }) => {
    dispatchAll('disconnected', removedNodes);
    dispatchAll('connected', addedNodes);
  });
}

function dispatchAll(type, nodes) {
  nodes.forEach(node => dispatchTarget(type, node));
}

function dispatchTarget(type, node) {
  if (node.nodeType !== 1) return;

  // Prevent firing out of the observe scope.
  if (observed.has(node) || observedSelectors.some(s => node.matches(s))) {
    node.dispatchEvent(new Event(type));
  }

  node = node.firstChild;
  while (node) {
    dispatchTarget(type, node);
    node = node.nextSibling;
  }
}

/**
 * Unobserve for dis-connected events.
 * Passing no argument will unobserve all previously observed scopes.
 *
 * @param  {...(Node|String)} [nodesOrSelectors]
 */
export function unobserve(...nodesOrSelectors) {
  if (nodesOrSelectors.length) {
    nodesOrSelectors.forEach(s => observed.delete(s));
  } else {
    observed.clear();
  }
  if (observer && !observed.size) {
    observer.disconnect();
    observer = null;
  }
}
