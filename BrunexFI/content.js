const IMAGES = ['bruno0.jpeg', 'bruno022.jpeg', 'bruno0000.jpeg'].map(f => chrome.runtime.getURL(`images/${f}`));

function maybeReplace(img) {
  chrome.storage.sync.get({ chance: 10 }, ({ chance }) => {
    if (Math.random() * 100 < chance) {
      img.src = IMAGES[Math.floor(Math.random() * IMAGES.length)];
    }
  });
}

document.querySelectorAll('img').forEach(maybeReplace);

new MutationObserver(mutations => {
  for (const { addedNodes } of mutations) {
    for (const node of addedNodes) {
      if (node.tagName === 'IMG') maybeReplace(node);
      else node.querySelectorAll?.('img').forEach(maybeReplace);
    }
  }
}).observe(document.body, { childList: true, subtree: true });
