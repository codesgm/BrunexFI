const slider = document.getElementById('chance');
const label = document.getElementById('value');

chrome.storage.sync.get({ chance: 10 }, ({ chance }) => {
  slider.value = chance;
  label.textContent = chance;
});

slider.addEventListener('input', () => {
  label.textContent = slider.value;
  chrome.storage.sync.set({ chance: Number(slider.value) });
});
