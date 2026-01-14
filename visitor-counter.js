(async () => {
  const el = document.getElementById('visit-count');
  if (!el) return;

  el.textContent = 'loading…';

  try {
    const url = 'https://abacus.jasoncameron.dev/hit/gokuchan.space/home';
    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) {
      throw new Error(`Counter request failed: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    if (!data || typeof data.value !== 'number') {
      throw new Error('Counter response missing numeric value');
    }
    el.textContent = String(data.value);
  } catch (err) {
    console.error('Visitor counter failed:', err);
    el.textContent = 'error';
  }
})();
