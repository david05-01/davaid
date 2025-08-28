// Acessibilidade: menu toggle, ano no footer, validação simples de formulário e alternância de contraste
const expanded = this.getAttribute('aria-expanded') === 'true';
this.setAttribute('aria-expanded', String(!expanded));
nav.classList.toggle('open');
// coloca foco no primeiro link quando abre
if(!expanded){
const firstLink = nav.querySelector('a');
if(firstLink) firstLink.focus();
}
});
}


// Alternar contraste alto (usa classe no <html>)
if(contrastToggle){
contrastToggle.addEventListener('click', function(e){
e.preventDefault();
const htmlEl = document.documentElement;
htmlEl.classList.toggle('html-high-contrast');
const isOn = htmlEl.classList.contains('html-high-contrast');
this.setAttribute('aria-pressed', String(isOn));
});
}


// Validação simples do formulário com anúncio de erro via aria-live
if(form){
const liveRegion = document.createElement('div');
liveRegion.setAttribute('aria-live','polite');
liveRegion.className = 'visually-hidden';
form.appendChild(liveRegion);


form.addEventListener('submit', function(e){
e.preventDefault();
let valid = true;
const name = form.querySelector('#name');
const email = form.querySelector('#email');
const message = form.querySelector('#message');


[name,email,message].forEach(input=>{
input.classList.remove('input-error');
if(!input.value.trim()){
input.classList.add('input-error');
valid = false;
}
});


if(!valid){
liveRegion.textContent = 'Há campos inválidos. Por favor, verifique e tente novamente.';
const firstError = form.querySelector('.input-error');
if(firstError) firstError.focus();
return;
}


// Simula envio bem sucedido
liveRegion.textContent = 'Mensagem enviada com sucesso.';
form.reset();
});
}
});
