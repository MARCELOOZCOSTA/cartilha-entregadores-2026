const menuToggle=document.getElementById('menuToggle');
const navMenu=document.getElementById('navMenu');
menuToggle.addEventListener('click',()=>{const open=navMenu.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));});
navMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{navMenu.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');}));
document.getElementById('printBtn').addEventListener('click',()=>window.print());

const faqSearch=document.getElementById('faqSearch');
const faqItems=[...document.querySelectorAll('.faq-item')];
const noResults=document.getElementById('noResults');
faqSearch.addEventListener('input',()=>{
  const q=faqSearch.value.trim().toLocaleLowerCase('pt-BR');let visible=0;
  faqItems.forEach(item=>{const match=item.textContent.toLocaleLowerCase('pt-BR').includes(q);item.hidden=!match;if(match)visible++;});
  noResults.hidden=visible!==0;
});
document.getElementById('expandAll').addEventListener('click',e=>{
  const allOpen=faqItems.filter(x=>!x.hidden).every(x=>x.open);
  faqItems.filter(x=>!x.hidden).forEach(x=>x.open=!allOpen);
  e.currentTarget.textContent=allOpen?'Abrir todas':'Fechar todas';
});

const questions=[
 {q:'A LGPD permite solicitar revisão de uma decisão tomada unicamente por tratamento automatizado?',a:['Não. Decisões de aplicativos nunca podem ser questionadas.','Sim. O artigo 20 permite solicitar revisão de decisões automatizadas que afetem seus interesses.','Sim, mas somente se o trabalhador tiver carteira assinada.'],correct:1,explain:'Isso mesmo! O artigo 20 da LGPD permite solicitar revisão e informações sobre os critérios da decisão.'},
 {q:'Qual é uma das coberturas obrigatórias do seguro previsto na Lei nº 14.297/2022?',a:['Apenas danos à mochila.','Acidentes pessoais, invalidez permanente ou temporária e morte.','Qualquer acidente, em qualquer momento do dia.'],correct:1,explain:'Correto! A lei prevê cobertura durante o período de retirada e entrega. Consulte a apólice para os detalhes.'},
 {q:'Quem pode ter direito ao Auxílio-Acidente, conforme as regras informadas pelo INSS?',a:['Qualquer contribuinte, inclusive MEI.','Somente quem nunca mais puder trabalhar.','Empregado, trabalhador avulso e segurado especial, nas condições legais.'],correct:2,explain:'Certo! O INSS não inclui contribuinte individual e facultativo entre os beneficiários do Auxílio-Acidente.'}
];
let current=0,score=0,answered=false;
const qTitle=document.getElementById('quizQuestion'),qOptions=document.getElementById('quizOptions'),qFeedback=document.getElementById('quizFeedback'),qNext=document.getElementById('quizNext');
function renderQuestion(){
 const q=questions[current];answered=false;
 document.getElementById('quizCount').textContent=`PERGUNTA ${current+1} DE ${questions.length}`;
 document.getElementById('quizScore').textContent=`ACERTOS: ${score}`;
 document.getElementById('quizProgress').style.width=`${((current+1)/questions.length)*100}%`;
 qTitle.textContent=q.q;qOptions.innerHTML='';qFeedback.textContent='';qNext.disabled=true;
 qNext.textContent=current===questions.length-1?'Ver resultado':'Próxima pergunta →';
 q.a.forEach((answer,i)=>{const b=document.createElement('button');b.className='quiz-option';b.textContent=answer;b.addEventListener('click',()=>chooseAnswer(i));qOptions.appendChild(b);});
}
function chooseAnswer(index){
 if(answered)return;answered=true;const q=questions[current];const buttons=[...qOptions.children];
 buttons.forEach((b,i)=>{b.disabled=true;if(i===q.correct)b.classList.add('correct');if(i===index&&i!==q.correct)b.classList.add('wrong');});
 if(index===q.correct)score++;
 qFeedback.textContent=(index===q.correct?'✓ Muito bem! ':'A resposta correta está destacada. ')+q.explain;
 document.getElementById('quizScore').textContent=`ACERTOS: ${score}`;qNext.disabled=false;
}
qNext.addEventListener('click',()=>{
 if(!answered)return;
 if(current<questions.length-1){current++;renderQuestion();}
 else{qTitle.textContent=`Você acertou ${score} de ${questions.length}!`;qOptions.innerHTML='';qFeedback.textContent=score===3?'Excelente! Você está bem informado. Continue compartilhando informação.':'Continue aprendendo! Leia as perguntas frequentes e tente novamente.';qNext.textContent='Refazer quiz';qNext.disabled=false;qNext.onclick=()=>{current=0;score=0;qNext.onclick=null;renderQuestion();};}
});
renderQuestion();

document.getElementById('shareBtn').addEventListener('click',async()=>{
 const shareData={title:document.title,text:'Conheça a cartilha Rota Segura: direitos, proteção e segurança para entregadores por aplicativo.',url:location.href};
 if(navigator.share){try{await navigator.share(shareData);}catch(err){}}
 else if(navigator.clipboard){try{await navigator.clipboard.writeText(location.href);alert('Link copiado! Agora você pode compartilhar a cartilha.');}catch(err){alert('Copie o endereço desta página para compartilhar.');}}
 else{alert('Copie o endereço desta página para compartilhar.');}
});
