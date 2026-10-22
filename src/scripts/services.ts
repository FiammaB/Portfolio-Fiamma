// Servicios: cada botón agrega o quita el servicio de la consulta, y los
// links de email y WhatsApp se arman con lo elegido.
const root = document.querySelector<HTMLElement>('[data-services]');

if (root) {
  const d = root.dataset;
  const buttons = [...root.querySelectorAll<HTMLButtonElement>('[data-service]')];
  const picked = root.querySelector<HTMLElement>('[data-picked]')!;
  const empty = root.querySelector<HTMLElement>('[data-empty]')!;
  const mail = root.querySelector<HTMLAnchorElement>('[data-mail]')!;
  const wa = root.querySelector<HTMLAnchorElement>('[data-wa]')!;

  function update() {
    const chosen = buttons.filter((b) => b.getAttribute('aria-pressed') === 'true').map((b) => b.dataset.service!);
    empty.hidden = chosen.length > 0;
    picked.replaceChildren(
      ...chosen.map((title) => {
        const li = document.createElement('li');
        li.textContent = `✓ ${title}`;
        return li;
      }),
    );
    const body = `${d.bodyPre} ${chosen.length ? chosen.join(', ') : d.bodyEmpty}.`;
    mail.href = `mailto:${d.email}?subject=${encodeURIComponent(d.subject ?? '')}&body=${encodeURIComponent(body)}`;
    wa.href = `https://wa.me/${d.whatsapp}?text=${encodeURIComponent(body)}`;
  }

  buttons.forEach((b) =>
    b.addEventListener('click', () => {
      const on = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', String(on));
      b.closest('li')?.classList.toggle('is-on', on);
      b.querySelector('span')!.textContent = on ? d.added! : d.add!;
      update();
    }),
  );
}
