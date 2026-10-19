const WHATSAPP_NUMBER = '5544999257735';

document.querySelectorAll('article').forEach(card => {
  card.addEventListener('pointermove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--x', e.clientX - r.left + 'px');
    card.style.setProperty('--y', e.clientY - r.top + 'px');
  });
  card.querySelector('button').addEventListener('click', () => {
    document.getElementById('tipo').value = card.dataset.service;
    document.getElementById('orcamento').scrollIntoView({ behavior: 'smooth' });
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
