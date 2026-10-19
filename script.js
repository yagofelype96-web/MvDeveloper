const WHATSAPP_NUMBER = '5544999257735';

document.querySelectorAll('article').forEach(card => {
  card.addEventListener('pointermove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--x', e.clientX - r.left + 'px');
    card.style.setProperty('--y', e.clientY - r.top + 'px');
  });
  card.querySelector('button').addEventListener('click', () => {
    document.getElementById('tipo').value = card.dataset.service;
    navigateTo('orcamento');
  });
});

document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  const value = id => document.getElementById(id).value.trim();
  const message = `SOLICITAÇÃO DE ORÇAMENTO — MvDeveloper

Nome: ${value('nome')}
Contato para retorno: ${value('contato')}
Serviço: ${value('tipo')}
Orçamento previsto: ${value('faixa')}

Projeto:
${value('descricao')}

Gostaria de receber uma proposta de valor e prazo.`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  document.getElementById('mensagem').value = message;
  document.getElementById('abrirWhatsApp').href = url;
  document.getElementById('resultado').hidden = false;
  document.getElementById('status').textContent = '';

  // Abre somente por interação direta com o formulário, respeitando bloqueadores de pop-up.
  // O botão de backup permanece disponível se o navegador impedir a abertura.
  window.open(url, '_blank', 'noopener,noreferrer');
  document.getElementById('resultado').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

document.getElementById('copiar').addEventListener('click', async () => {
  const t = document.getElementById('mensagem');
  try {
    await navigator.clipboard.writeText(t.value);
    document.getElementById('status').textContent = 'Copiado!';
  } catch {
    t.focus();
    t.select();
    document.getElementById('status').textContent = 'Pressione Ctrl+C para copiar.';
  }
});

// Abas independentes: início, serviços e orçamentos.
const PAGE_IDS = ['inicio', 'servicos', 'orcamento'];
function navigateTo(page) {
  const target = PAGE_IDS.includes(page) ? page : 'inicio';
  PAGE_IDS.forEach(id => {
    const section = document.getElementById(id);
    section.hidden = id !== target;
  });
  document.querySelectorAll('header nav a').forEach(link => {
    if (link.getAttribute('href') === '#' + target) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
  if (location.hash !== '#' + target) history.pushState(null, '', '#' + target);
  window.scrollTo({top: 0, behavior: 'instant'});
}
document.querySelectorAll('a[href^="#"]').forEach(link => {
  const target = link.getAttribute('href').slice(1);
  if (!PAGE_IDS.includes(target)) return;
  link.addEventListener('click', event => {
    event.preventDefault();
    navigateTo(target);
  });
});
window.addEventListener('popstate', () => navigateTo(location.hash.slice(1)));
window.addEventListener('hashchange', () => navigateTo(location.hash.slice(1)));
navigateTo(location.hash.slice(1));
