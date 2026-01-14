(async () => {
  const el = document.getElementById('visit-count');
  if (!el) return;

  const container = document.getElementById('visitor-counter');
  if (container) container.style.visibility = 'hidden';

  el.textContent = '—';

  try {
    const url = 'https://abacus.jasoncameron.dev/hit/gokuchan.space/home';
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(url, {
      cache: 'no-store',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Counter request failed: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    if (!data || typeof data.value !== 'number') {
      throw new Error('Counter response missing numeric value');
    }
    el.textContent = String(data.value);
    if (container) container.style.visibility = 'visible';
  } catch (err) {
    console.error('Visitor counter failed:', err);
    el.textContent = '—';
    if (container) container.style.visibility = 'visible';
  }
})();
