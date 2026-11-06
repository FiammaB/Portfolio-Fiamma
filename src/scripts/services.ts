// Servicios: cada tarjeta suma o quita el servicio de la consulta, la barra se
// tiñe con los colores elegidos y los links de email y WhatsApp se arman con lo elegido.
const root = document.querySelector<HTMLElement>('[data-services]');

if (root) {
  const d = root.dataset;
  const buttons = [...root.querySelectorAll<HTMLButtonElement>('[data-service]')];
  const picked = root.querySelector<HTMLElement>('[data-picked]')!;
  const empty = root.querySelector<HTMLElement>('[data-empty]')!;
  const mail = root.querySelector<HTMLAnchorElement>('[data-mail]')!;
  const wa = root.querySelector<HTMLAnchorElement>('[data-wa]')!;
  const request = root.querySelector<HTMLElement>('[data-request]')!;

  function update() {
    const chosen = buttons.filter((b) => b.getAttribute('aria-pressed') === 'true');
    const titles = chosen.map((b) => b.dataset.service!);
    empty.hidden = chosen.length > 0;
    picked.replaceChildren(
      ...chosen.map((b) => {
        const li = document.createElement('li');
        li.textContent = b.dataset.service!;
        li.style.setProperty('--c', b.dataset.color!);
        return li;
      }),
    );
    // Sin nada elegido vuelve a los colores iniciales (registrados en global.css)
    request.style.setProperty('--svc-l', chosen[0]?.dataset.color ?? '');
    request.style.setProperty('--svc-r', chosen[chosen.length - 1]?.dataset.color ?? '');
    const body = `${d.bodyPre} ${titles.length ? titles.join(', ') : d.bodyEmpty}.`;
    mail.href = `mailto:${d.email}?subject=${encodeURIComponent(d.subject ?? '')}&body=${encodeURIComponent(body)}`;
    wa.href = `https://wa.me/${d.whatsapp}?text=${encodeURIComponent(body)}`;
  }

  buttons.forEach((b) =>
    b.addEventListener('click', () => {
      const on = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', String(on));
      b.querySelector('[data-add-label]')!.textContent = on ? d.added! : d.add!;
      update();
    }),
  );
}
