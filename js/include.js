// include.js
async function includeHTML() {
    const elements = document.querySelectorAll('[data-include]');
  
    for (let el of elements) {
      const file = el.getAttribute('data-include');
      try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`Error loading ${file}`);
        const content = await response.text();
        el.innerHTML = content;
      } catch (error) {
        console.error(error);
      }
    }
  }
  
  document.addEventListener('DOMContentLoaded', includeHTML);
  