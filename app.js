(() => {
  'use strict';

  const STORAGE_KEY = 'algebra-unidad4-vectores-progress-v1';
  const MODULE_KEYS = ['concepto','operaciones','espacio','norma','componentes','escalar','vectorial','mixto','practica','autoevaluacion'];
  const completed = new Set(loadProgress());
  const SVG_NS = 'http://www.w3.org/2000/svg';

  const colors = {
    blue: '#2f6fed', teal: '#168a7a', orange: '#b85d05', red: '#b42318',
    purple: '#7a4ac8', navy: '#173d7a', green: '#157347', gray: '#7b899d'
  };

  const steppers = {
    vectorEquation: {
      tag: 'TP recursado · ejercicio 3.b',
      title: 'Despejar un vector en una igualdad vectorial',
      intro: String.raw`Determinar \(\vec u\) si \(\vec v-2\vec u+\vec z=2\vec w-4\vec u\), con \(\vec v=(3,-6,2)\), \(\vec w=(\tfrac15,0,-2)\) y \(\vec z=(-2,4,1)\).`,
      complete: 'operaciones',
      steps: [
        String.raw`<strong>Paso 1. Agrupar los términos con \(\vec u\).</strong><p>Sumamos \(4\vec u\) en ambos miembros:</p>\[\vec v+2\vec u+\vec z=2\vec w.\]`,
        String.raw`<strong>Paso 2. Aislar el múltiplo de \(\vec u\).</strong><p>Restamos \(\vec v\) y \(\vec z\):</p>\[2\vec u=2\vec w-\vec v-\vec z.\]`,
        String.raw`<strong>Paso 3. Dividir por el escalar.</strong>\[\vec u=\vec w-\frac12\vec v-\frac12\vec z.\]`,
        String.raw`<strong>Paso 4. Sustituir las componentes.</strong>\[\vec u=\left(\frac15,0,-2\right)-\left(\frac32,-3,1\right)-\left(-1,2,\frac12\right).\]`,
        String.raw`<strong>Resultado.</strong>\[\boxed{\vec u=\left(-\frac3{10},1,-\frac72\right)}.\]`
      ]
    },
    cubeAngle: {
      tag: 'TP recursado · ejercicio 18',
      title: 'Diagonal principal y ángulo con la diagonal de la base',
      intro: 'Un cubo tiene arista de 2 m.',
      complete: 'escalar',
      steps: [
        String.raw`<strong>Paso 1. Modelizar con vectores.</strong><p>Una diagonal principal puede representarse por \(\vec d=(2,2,2)\) y una diagonal de la base por \(\vec b=(2,2,0)\).</p>`,
        String.raw`<strong>Paso 2. Calcular la longitud.</strong>\[\|\vec d\|=\sqrt{2^2+2^2+2^2}=2\sqrt3\text{ m}.\]`,
        String.raw`<strong>Paso 3. Usar el producto escalar.</strong>\[\cos\theta=\frac{\vec d\cdot\vec b}{\|\vec d\|\|\vec b\|}=\frac8{(2\sqrt3)(2\sqrt2)}=\frac{\sqrt6}{3}.\]`,
        String.raw`<strong>Resultado.</strong>\[\theta=\arccos\left(\frac{\sqrt6}{3}\right)\approx35.26^\circ.\]`
      ]
    },
    guidedEquivalent: {
      tag: 'Ejemplo guiado',
      title: 'Vector equivalente desde otro punto',
      intro: String.raw`Dados \(A=(2,1,-1)\), \(B=(3,-2,0)\) y \(C=(-1,4,2)\), hallar \(D\) tal que \(\overrightarrow{AD}=\overrightarrow{BC}\).`,
      complete: 'practica',
      steps: [
        String.raw`<strong>Paso 1. Calcular el vector conocido.</strong>\[\overrightarrow{BC}=C-B=(-4,6,2).\]`,
        String.raw`<strong>Paso 2. Plantear la condición.</strong><p>Como \(\overrightarrow{AD}=D-A\), debe cumplirse:</p>\[D-A=(-4,6,2).\]`,
        String.raw`<strong>Paso 3. Despejar el punto.</strong>\[D=A+(-4,6,2).\]`,
        String.raw`<strong>Resultado.</strong>\[D=(2,1,-1)+(-4,6,2)=\boxed{(-2,7,1)}.\]`
      ]
    },
    guidedProjection: {
      tag: 'TP recursado · ejercicio 19.a',
      title: 'Ángulo y proyección',
      intro: String.raw`Sean \(\vec r=(2,0)\) y \(\vec s=(1,\sqrt3)\). Hallar el ángulo y \(\operatorname{Proy}_{\vec s}\vec r\).`,
      complete: 'practica',
      steps: [
        String.raw`<strong>Paso 1. Producto escalar y normas.</strong>\[\vec r\cdot\vec s=2,\qquad \|\vec r\|=2,\qquad \|\vec s\|=2.\]`,
        String.raw`<strong>Paso 2. Ángulo.</strong>\[\cos\theta=\frac2{2\cdot2}=\frac12\Rightarrow \theta=\frac\pi3.\]`,
        String.raw`<strong>Paso 3. Proyección.</strong>\[\operatorname{Proy}_{\vec s}\vec r=\frac{2}{\|\vec s\|^2}\vec s=\frac24(1,\sqrt3).\]`,
        String.raw`<strong>Resultado.</strong>\[\boxed{\operatorname{Proy}_{\vec s}\vec r=\left(\frac12,\frac{\sqrt3}{2}\right)}.\]`
      ]
    },
    guidedCross: {
      tag: 'TP recursado · ejercicio 22',
      title: 'Todos los vectores perpendiculares a dos vectores',
      intro: String.raw`Sean \(\vec u=(1,0,2)\) y \(\vec v=(2,-1,1)\).`,
      complete: 'practica',
      steps: [
        String.raw`<strong>Paso 1. Calcular un vector normal.</strong>\[\vec u\times\vec v=(2,3,-1).\]`,
        String.raw`<strong>Paso 2. Describir toda la familia.</strong><p>Todo vector paralelo al producto vectorial también es perpendicular a \(\vec u\) y \(\vec v\):</p>\[\vec n=\lambda(2,3,-1),\quad \lambda\ne0.\]`,
        String.raw`<strong>Paso 3. Imponer módulo siete.</strong>\[|\lambda|\sqrt{14}=7\Rightarrow |\lambda|=\frac{\sqrt{14}}2.\]`,
        String.raw`<strong>Resultado.</strong><p>Existen dos vectores de módulo siete, uno opuesto al otro:</p>\[\pm\frac{\sqrt{14}}2(2,3,-1).\]`
      ]
    },
    guidedVolume: {
      tag: 'TP recursado · ejercicio 28.i',
      title: 'Volumen, área de base y altura',
      intro: String.raw`\(\vec u=(1,2,3)\), \(\vec v=(2,0,1)\), \(\vec w=(1,3,0)\).`,
      complete: 'practica',
      steps: [
        String.raw`<strong>Paso 1. Vector normal a la base.</strong>\[\vec v\times\vec w=(-3,1,6).\]`,
        String.raw`<strong>Paso 2. Área de la base.</strong>\[A=\|\vec v\times\vec w\|=\sqrt{46}.\]`,
        String.raw`<strong>Paso 3. Volumen.</strong>\[V=|\vec u\cdot(\vec v\times\vec w)|=|-3+2+18|=17.\]`,
        String.raw`<strong>Paso 4. Altura.</strong>\[h=\frac{17}{\sqrt{46}}.\]`,
        String.raw`<strong>Vector altura.</strong>\[\vec h=\frac{17}{46}(-3,1,6)=\left(-\frac{51}{46},\frac{17}{46},\frac{51}{23}\right).\]`
      ]
    }
  };

  const operationData = {
    w2v: {label:String.raw`\vec w+2\vec v`, result:[-8,7], color:colors.red, steps:String.raw`\[(-4,-1)+2(-2,4)=(-4,-1)+(-4,8)=(-8,7).\]`},
    halfu: {label:String.raw`-\frac12\vec u+\vec v`, result:[-4.5,2.5], color:colors.purple, steps:String.raw`\[-\tfrac12(5,3)+(-2,4)=\left(-\tfrac52,-\tfrac32\right)+(-2,4)=\left(-\tfrac92,\tfrac52\right).\]`},
    halfSum: {label:String.raw`\frac12(\vec v+\vec u)`, result:[1.5,3.5], color:colors.green, steps:String.raw`\[\tfrac12((-2,4)+(5,3))=\tfrac12(3,7)=\left(\tfrac32,\tfrac72\right).\]`},
    minusv: {label:String.raw`-\vec v+\vec w`, result:[-2,-5], color:colors.orange, steps:String.raw`\[-(-2,4)+(-4,-1)=(2,-4)+(-4,-1)=(-2,-5).\]`},
    distributed: {label:String.raw`\frac12\vec v+\frac12\vec u`, result:[1.5,3.5], color:colors.teal, steps:String.raw`\[(-1,2)+\left(\tfrac52,\tfrac32\right)=\left(\tfrac32,\tfrac72\right).\]`},
    combined: {label:String.raw`\vec u+3\vec v-\vec w`, result:[3,16], color:colors.blue, steps:String.raw`\[(5,3)+3(-2,4)-(-4,-1)=(3,16).\]`}
  };

  const applicationCases = {
    fluid: {
      title: 'Fluido a 8 m/s hacia el noroeste', vectors:[{end:[-5.657,5.657],color:colors.teal,label:'v⃗'}],
      formula:String.raw`<article><strong>Elegir ejes.</strong><p>Este positivo: \(x\). Norte positivo: \(y\).</p></article><article><strong>Descomponer.</strong>\[\vec v=8(\cos135^\circ,\sen135^\circ)=(-4\sqrt2,4\sqrt2).\]</article><article><strong>Interpretar.</strong><p>Componente este: \(-4\sqrt2\) m/s, es decir, \(4\sqrt2\) m/s hacia el oeste. Componente norte: \(4\sqrt2\) m/s.</p></article>`
    },
    force: {
      title: 'Fuerzas de 400 N al oeste y 300 N al norte', vectors:[{end:[-4,0],color:colors.red,label:'F⃗₁'},{end:[0,3],color:colors.blue,label:'F⃗₂'},{end:[-4,3],color:colors.green,label:'R⃗'}],
      formula:String.raw`<article><strong>Sumar componentes.</strong>\[\vec R=(-400,0)+(0,300)=(-400,300).\]</article><article><strong>Módulo.</strong>\[\|\vec R\|=500\text{ N}.\]</article><article><strong>Dirección.</strong><p>\(36.87^\circ\) al norte del oeste.</p></article>`
    },
    ship: {
      title: 'Buque a 12 m/s al este y corriente a 5 m/s al norte', vectors:[{end:[6,0],color:colors.blue,label:'v⃗_b'},{end:[0,2.5],color:colors.teal,label:'v⃗_c'},{end:[6,2.5],color:colors.orange,label:'v⃗_R'}],
      formula:String.raw`<article><strong>Resultante.</strong>\[\vec v_R=(12,0)+(0,5)=(12,5).\]</article><article><strong>Módulo.</strong>\[\|\vec v_R\|=13\text{ m/s}.\]</article><article><strong>Dirección.</strong><p>\(22.62^\circ\) al norte del este.</p></article>`
    }
  };

  const errorCases = [
    {statement:String.raw`“\(\vec u\cdot\vec v=0\), entonces siempre ambos vectores son perpendiculares.”`, options:['Correcto','Falta exigir que ambos sean no nulos','Sólo es cierto en el plano'], answer:1, explanation:'El vector nulo tiene producto escalar cero con todos los vectores, pero no se le asigna una dirección perpendicular.'},
    {statement:String.raw`“\(\|k\vec v\|=k\|\vec v\|\) para todo \(k\in\mathbb R\).”`, options:['Correcto',String.raw`Debe usarse \(|k|\)`,String.raw`Debe usarse \(k^2\)`], answer:1, explanation:'La norma nunca es negativa; por eso aparece el valor absoluto del escalar.'},
    {statement:String.raw`“\(\overrightarrow{PQ}=P-Q\).”`, options:['Correcto',String.raw`Debe ser extremo final menos extremo inicial: \(Q-P\)`,'Depende del cuadrante'], answer:1, explanation:'El orden de los puntos determina el sentido del vector.'},
    {statement:String.raw`“\(\vec u\times\vec v=\vec v\times\vec u\).”`, options:['Correcto','Es anticonmutativo: cambia el signo','Sólo cambia el módulo'], answer:1, explanation:'Al invertir el orden se invierte el sentido del vector normal.'},
    {statement:String.raw`“\([\vec u,\vec v,\vec w]=0\), los tres vectores son coplanares.”`, options:['Correcto','Incorrecto: deben ser ortogonales','Sólo vale si sus normas son uno'], answer:0, explanation:'El producto mixto cero indica volumen nulo, equivalente a coplanaridad.'},
    {statement:String.raw`“La proyección de \(\vec r\) sobre \(\vec s\) siempre tiene el mismo sentido que \(\vec s\).”`, options:['Correcto',String.raw`Puede tener sentido opuesto si \(\vec r\cdot\vec s<0\)`,'La proyección siempre es nula'], answer:1, explanation:'El coeficiente de la proyección puede ser negativo.'}
  ];
  let errorIndex = 0;

  const quizBank = [
    q(String.raw`Si \(P=(4,2)\) y \(Q=(7,4)\), ¿cuál es \(\overrightarrow{PQ}\)?`,[String.raw`\((3,2)\)`,String.raw`\((-3,-2)\)`,String.raw`\((11,6)\)`,String.raw`\((3,1)\)`],0,'Extremo final menos extremo inicial.'),
    q(String.raw`El vector opuesto de \((3,-5)\) es:`,[String.raw`\((-3,5)\)`,String.raw`\((5,-3)\)`,String.raw`\((-3,-5)\)`,String.raw`\((3,5)\)`],0,'Se cambia el signo de cada componente.'),
    q(String.raw`¿Cuánto vale \(\|(3,4)\|\)?`,[String.raw`\(5\)`,String.raw`\(7\)`,String.raw`\(25\)`,String.raw`\(\sqrt7\)`],0,'Por Pitágoras: √(9+16)=5.'),
    q('Un vector no nulo y su versor asociado:',['Tienen igual dirección y sentido','Tienen sentido opuesto','Tienen la misma norma','Son ortogonales'],0,'El versor se obtiene dividiendo por una cantidad positiva.'),
    q(String.raw`Si \(\vec u=(1,2,2)\), entonces \(\|\vec u\|\) es:`,[String.raw`\(3\)`,String.raw`\(5\)`,String.raw`\(\sqrt5\)`,String.raw`\(9\)`],0,'√(1+4+4)=3.'),
    q(String.raw`Si \(\vec u\cdot\vec v<0\), el ángulo entre dos vectores no nulos es:`,['Obtuso','Agudo','Recto','Nulo'],0,'El coseno es negativo.'),
    q(String.raw`¿Qué representa \(\|\vec u\times\vec v\|\)?`,['Área del paralelogramo','Volumen del paralelepípedo',String.raw`Longitud de \(\vec u+\vec v\)`,'Proyección escalar'],0,'La norma del producto vectorial es base por altura.'),
    q(String.raw`Si \(\vec u\times\vec v=(2,-4,1)\), entonces \(\vec v\times\vec u\) es:`,[String.raw`\((-2,4,-1)\)`,String.raw`\((2,-4,1)\)`,String.raw`\((4,-8,2)\)`,String.raw`\((0,0,0)\)`],0,'El producto vectorial es anticonmutativo.'),
    q('¿Cuál es el trabajo si fuerza y desplazamiento son perpendiculares y no nulos?',[String.raw`\(0\)`,String.raw`\(1\)`,'El producto de sus normas','No está definido'],0,'cos 90°=0.'),
    q('Si el producto mixto de tres vectores es distinto de cero:',['No son coplanares','Son coplanares','Son todos ortogonales','Alguno es nulo'],0,'El volumen del paralelepípedo es positivo.'),
    q('La regla de la poligonal para sumar vectores consiste en:',['Colocar el origen de uno en el extremo del anterior','Hacer coincidir todos los extremos','Multiplicar las normas','Calcular sólo los ángulos'],0,'La resultante une el origen del primero con el extremo del último.'),
    q('Dos vectores no nulos son paralelos si:',['Uno es múltiplo escalar del otro','Su producto escalar es cero','Tienen igual norma','Su suma es nula siempre'],0,'El múltiplo puede ser positivo o negativo.'),
    q('¿Cuál es la proyección de un vector ortogonal sobre otro no nulo?',['El vector nulo','El mismo vector','El vector opuesto','Un versor'],0,'El producto escalar del numerador es cero.'),
    q(String.raw`El vector \((0,0,0)\):`,['No tiene versor asociado','Tiene infinitos versores asociados','Es unitario','Tiene norma uno'],0,'No puede dividirse por su norma porque es cero.'),
    q(String.raw`Para \(\vec v=k(1,2,2)\), se cumple:`,[String.raw`\(\|\vec v\|=3|k|\)`,String.raw`\(\|\vec v\|=3k\)`,String.raw`\(\|\vec v\|=9|k|\)`,String.raw`\(\|\vec v\|=|k|\)`],0,'La norma de (1,2,2) es 3.'),
    q(String.raw`Si \(\vec u=(2,0)\) y \(\vec s=(1,\sqrt3)\), su producto escalar es:`,[String.raw`\(2\)`,String.raw`\(2\sqrt3\)`,String.raw`\(0\)`,String.raw`\(4\)`],0,'2·1+0·√3=2.'),
    q(String.raw`La distancia entre \(P\) y \(Q\) es:`,[String.raw`\(\|\overrightarrow{PQ}\|\)`,String.raw`\(P+Q\)`,String.raw`\(\overrightarrow{PQ}\cdot Q\)`,'Siempre 1'],0,'La distancia es la longitud del vector que une los puntos.'),
    q('Un escalar negativo multiplicado por un vector:',['Conserva dirección e invierte el sentido','Cambia la dirección y conserva el sentido','Siempre da el vector nulo','No cambia nada'],0,'La recta de acción se conserva y la orientación se invierte.'),
    q(String.raw`El vector altura respecto de la base generada por \(\vec v\) y \(\vec w\) es paralelo a:`,[String.raw`\(\vec v\times\vec w\)`,String.raw`\(\vec v+\vec w\)`,String.raw`\(\vec v-\vec w\)`,String.raw`\(\vec v\cdot\vec w\)`],0,'La altura es perpendicular al plano de la base.'),
    q('Para hallar componentes desde módulo y ángulo principal se usa:',[String.raw`\(\left(\|\vec v\|\cos\theta,\|\vec v\|\sen\theta\right)\)`,String.raw`\((\cos\theta,\sen\theta)\)`,String.raw`\(\left(\|\vec v\|\sen\theta,\|\vec v\|\cos\theta\right)\)`,String.raw`\((\theta,\|\vec v\|)\)`],0,'Las componentes son las proyecciones sobre los ejes.'),
    q('Si dos vectores son equivalentes:',['Tienen igual módulo, dirección y sentido','Tienen el mismo origen','Tienen componentes opuestas','Deben estar en el primer cuadrante'],0,'Pueden estar ubicados en distintos lugares.'),
    q(String.raw`El producto escalar de \((4,-3)\) y \((-2,5)\) vale:`,[String.raw`\(-23\)`,String.raw`\(23\)`,String.raw`\(-8\)`,String.raw`\(7\)`],0,'4(-2)+(-3)5=-23.'),
    q(String.raw`Si \(\vec u\times\vec v=\vec 0\) y ambos son no nulos:`,['Son paralelos','Son ortogonales',String.raw`Forman \(45^\circ\)`,'Sus normas son iguales'],0,'El seno del ángulo vale cero.'),
    q('El volumen del paralelepípedo se calcula con:',[String.raw`\(|\vec u\cdot(\vec v\times\vec w)|\)`,String.raw`\(\|\vec u+\vec v+\vec w\|\)`,String.raw`\(\vec u\cdot\vec v\)`,String.raw`\(\|\vec u\times\vec v\|\)`],0,'Es el valor absoluto del producto mixto.')
  ];

  function q(text, options, answer, explanation){ return {text,options,answer,explanation}; }

  document.addEventListener('DOMContentLoaded', init);

  function init(){
    setupNavigation();
    setupProgress();
    renderSteppers();
    setupEquivalentBoard();
    setupFreeVectorApplet();
    setupPointVectorCalculator();
    setupOperationLab();
    setupScalarLab();
    setupVector3dControls();
    setupCombinationLab();
    setupNormLab();
    setupKNormLab();
    setupPolarLab();
    setupApplications();
    setupDotLab();
    setupWorkLab();
    setupCrossLab();
    setupVolumeReadout();
    setupCoplanarity();
    setupErrorDetective();
    setupQuiz();
    setupVideos();
    setupGlobalActions();
  }

  function setupNavigation(){
    const nav = document.getElementById('moduleNav');
    const sidebar = document.getElementById('sidebar');
    const menu = document.getElementById('menuButton');
    const overlay = document.getElementById('mobileOverlay');
    nav?.addEventListener('click', e => {
      const button = e.target.closest('[data-target]');
      if(!button) return;
      showModule(button.dataset.target);
      closeSidebar();
    });
    document.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click',()=>showModule(b.dataset.go)));
    menu?.addEventListener('click',()=>{
      const open = sidebar.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
      overlay.hidden = !open;
    });
    overlay?.addEventListener('click', closeSidebar);
    function closeSidebar(){ sidebar?.classList.remove('open'); if(menu) menu.setAttribute('aria-expanded','false'); if(overlay) overlay.hidden=true; }
  }

  function showModule(id){
    document.querySelectorAll('.module').forEach(m => { m.hidden = m.id !== id; m.classList.toggle('active',m.id===id); });
    document.querySelectorAll('.nav-item').forEach(b => b.classList.toggle('active',b.dataset.target===id));
    window.scrollTo({top:0,behavior:'smooth'});
    setTimeout(()=>window.dispatchEvent(new Event('resize')),80);
  }

  function setupProgress(){
    document.querySelectorAll('[data-complete]').forEach(button => {
      const key=button.dataset.complete;
      setCompleteButtonState(button,completed.has(key));
      button.addEventListener('click',()=>{ completed.has(key)?completed.delete(key):completed.add(key); saveProgress(); setCompleteButtonState(button,completed.has(key)); updateProgressUI(); });
    });
    updateProgressUI();
  }
  function setCompleteButtonState(button,done){ button.classList.toggle('done',done); button.textContent=done?'✓ Módulo revisado':'Marcar módulo como revisado'; }
  function markComplete(key){ if(!MODULE_KEYS.includes(key)) return; completed.add(key); saveProgress(); const b=document.querySelector(`[data-complete="${key}"]`); if(b) setCompleteButtonState(b,true); updateProgressUI(); }
  function loadProgress(){ try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]');}catch{return [];} }
  function saveProgress(){ try{localStorage.setItem(STORAGE_KEY,JSON.stringify([...completed]));}catch{} }
  function updateProgressUI(){
    const pct=Math.round(100*completed.size/MODULE_KEYS.length);
    const bar=document.getElementById('progressBar'),text=document.getElementById('progressText'),detail=document.getElementById('progressDetail');
    if(bar) bar.style.width=`${pct}%`; if(text) text.textContent=`${pct}%`; if(detail) detail.textContent=`${completed.size} de ${MODULE_KEYS.length} módulos revisados.`;
  }

  function renderSteppers(){
    document.querySelectorAll('.stepper-mount').forEach(mount=>{
      const data=steppers[mount.dataset.stepper]; if(!data) return;
      mount.innerHTML=`<article class="guided-card"><div class="stepper-header"><div><p class="tag">${data.tag}</p><h3>${data.title}</h3></div><span class="step-count">0 / ${data.steps.length}</span></div><div class="stepper-statement">${data.intro}</div><div class="step-stage"><div class="step-placeholder">Pensá el próximo paso antes de habilitarlo.</div><div class="step-content"></div></div><div class="step-controls"><button class="button primary next-step" type="button">Mostrar primer paso</button><button class="button ghost reset-step" type="button">Reiniciar</button></div></article>`;
      let visible=0;
      const content=mount.querySelector('.step-content'),placeholder=mount.querySelector('.step-placeholder'),count=mount.querySelector('.step-count'),next=mount.querySelector('.next-step');
      function render(){
        content.innerHTML=data.steps.slice(0,visible).map((s,i)=>`<article><span class="step-number">${i+1}</span><div>${s}</div></article>`).join('');
        placeholder.hidden=visible>0; count.textContent=`${visible} / ${data.steps.length}`;
        next.disabled=visible>=data.steps.length; next.textContent=visible===0?'Mostrar primer paso':visible>=data.steps.length?'Resolución completa':'Mostrar siguiente paso';
        typeset(mount);
      }
      next.addEventListener('click',()=>{ if(visible<data.steps.length){visible++;render(); if(visible===data.steps.length) markComplete(data.complete);} });
      mount.querySelector('.reset-step').addEventListener('click',()=>{visible=0;render();});
      render();
    });
  }

  function setupFreeVectorApplet(){
    const svg=document.getElementById('freeVectorSvg');
    if(!svg) return;

    const formula=document.getElementById('freeVectorFormula');
    const feedback=document.getElementById('freeVectorFeedback');
    const inputs={
      px:document.getElementById('freePx'), py:document.getElementById('freePy'),
      qx:document.getElementById('freeQx'), qy:document.getElementById('freeQy')
    };
    const toggles={
      equivalents:document.getElementById('showFreeEquivalents'),
      representative:document.getElementById('showFreeRepresentative'),
      components:document.getElementById('showFreeComponents')
    };

    const bounds={xmin:-8,xmax:9,ymin:-6,ymax:6};
    const state={
      p:[4,2], q:[7,4], dragging:null,
      anchors:[[.08,.78],[.12,.14],[.58,.12],[.68,.72]]
    };
    let typesetTimer=0;

    function pointFromInputs(){
      state.p=[clamp(Number(inputs.px.value),bounds.xmin,bounds.xmax),clamp(Number(inputs.py.value),bounds.ymin,bounds.ymax)];
      state.q=[clamp(Number(inputs.qx.value),bounds.xmin,bounds.xmax),clamp(Number(inputs.qy.value),bounds.ymin,bounds.ymax)];
      syncInputs();
      render();
    }

    function syncInputs(){
      inputs.px.value=format(state.p[0]); inputs.py.value=format(state.p[1]);
      inputs.qx.value=format(state.q[0]); inputs.qy.value=format(state.q[1]);
    }

    function worldToSvg(point,width,height,margin){
      const sx=(width-2*margin)/(bounds.xmax-bounds.xmin);
      const sy=(height-2*margin)/(bounds.ymax-bounds.ymin);
      return [margin+(point[0]-bounds.xmin)*sx,height-margin-(point[1]-bounds.ymin)*sy];
    }

    function svgToWorld(clientX,clientY){
      const vb=svg.viewBox.baseVal,width=vb.width||760,height=vb.height||560,margin=52;
      const pt=svg.createSVGPoint(); pt.x=clientX; pt.y=clientY;
      const ctm=svg.getScreenCTM();
      if(!ctm) return null;
      const local=pt.matrixTransform(ctm.inverse());
      const x=bounds.xmin+(local.x-margin)*(bounds.xmax-bounds.xmin)/(width-2*margin);
      const y=bounds.ymax-(local.y-margin)*(bounds.ymax-bounds.ymin)/(height-2*margin);
      return [clamp(Math.round(x),bounds.xmin,bounds.xmax),clamp(Math.round(y),bounds.ymin,bounds.ymax)];
    }

    function makeArrow(defs,id,color){
      const marker=el('marker',{id,markerWidth:'8',markerHeight:'8',refX:'7.4',refY:'4',orient:'auto',markerUnits:'userSpaceOnUse'});
      marker.appendChild(el('path',{d:'M0,0 L8,4 L0,8 Z',fill:color}));
      defs.appendChild(marker);
    }

    function validCopyOrigins(dx,dy){
      const minX=Math.max(bounds.xmin,bounds.xmin-dx),maxX=Math.min(bounds.xmax,bounds.xmax-dx);
      const minY=Math.max(bounds.ymin,bounds.ymin-dy),maxY=Math.min(bounds.ymax,bounds.ymax-dy);
      const origins=[];
      state.anchors.forEach(([ax,ay])=>{
        const x=Math.round(minX+(maxX-minX)*ax),y=Math.round(minY+(maxY-minY)*ay);
        const duplicate=origins.some(o=>near(o[0],x)&&near(o[1],y));
        const overlapsBase=Math.hypot(x-state.p[0],y-state.p[1])<1.4;
        const overlapsOrigin=Math.hypot(x,y)<1.4;
        if(!duplicate&&!overlapsBase&&!overlapsOrigin) origins.push([x,y]);
      });
      return origins.slice(0,4);
    }

    function addVector(svgNode,defs,start,end,color,label,width=5,dash='',className=''){
      const index=defs.childNodes.length;
      const markerId=`free-arrow-${index}`;
      makeArrow(defs,markerId,color);
      const vb=svgNode.viewBox.baseVal,w=vb.width||760,h=vb.height||560,margin=52;
      const [x1,y1]=worldToSvg(start,w,h,margin),[x2,y2]=worldToSvg(end,w,h,margin);
      const l=line(x1,y1,x2,y2,`svg-vector ${className}`.trim());
      l.style.stroke=color; l.style.strokeWidth=width;
      if(dash) l.style.strokeDasharray=dash;
      l.setAttribute('marker-end',`url(#${markerId})`); svgNode.appendChild(l);
      if(label){
        const mx=x2+(end[0]>=start[0]?10:-34),my=y2-10;
        text(svgNode,mx,my,label,'svg-vector-label',color);
      }
    }

    function render(){
      svg.innerHTML='';
      const vb=svg.viewBox.baseVal,width=vb.width||760,height=vb.height||560,margin=52;
      const X=x=>margin+(x-bounds.xmin)*(width-2*margin)/(bounds.xmax-bounds.xmin);
      const Y=y=>height-margin-(y-bounds.ymin)*(height-2*margin)/(bounds.ymax-bounds.ymin);
      const defs=el('defs'); svg.appendChild(defs);

      for(let x=Math.ceil(bounds.xmin);x<=Math.floor(bounds.xmax);x++) svg.appendChild(line(X(x),Y(bounds.ymin),X(x),Y(bounds.ymax),'svg-grid-line'));
      for(let y=Math.ceil(bounds.ymin);y<=Math.floor(bounds.ymax);y++) svg.appendChild(line(X(bounds.xmin),Y(y),X(bounds.xmax),Y(y),'svg-grid-line'));
      svg.appendChild(line(X(bounds.xmin),Y(0),X(bounds.xmax),Y(0),'svg-axis'));
      svg.appendChild(line(X(0),Y(bounds.ymin),X(0),Y(bounds.ymax),'svg-axis'));
      text(svg,X(bounds.xmax)-4,Y(0)-10,'x','svg-axis-label');
      text(svg,X(0)+10,Y(bounds.ymax)+17,'y','svg-axis-label');
      for(let x=-8;x<=8;x+=2){if(x!==0)text(svg,X(x)-5,Y(0)+19,String(x),'svg-tick-label');}
      for(let y=-6;y<=6;y+=2){if(y!==0)text(svg,X(0)+8,Y(y)+5,String(y),'svg-tick-label');}

      const dx=state.q[0]-state.p[0],dy=state.q[1]-state.p[1];

      if(toggles.components.checked){
        const corner=[state.q[0],state.p[1]];
        const guide1=line(X(state.p[0]),Y(state.p[1]),X(corner[0]),Y(corner[1]),'svg-component-guide');
        const guide2=line(X(corner[0]),Y(corner[1]),X(state.q[0]),Y(state.q[1]),'svg-component-guide');
        svg.appendChild(guide1); svg.appendChild(guide2);
        if(dx!==0)text(svg,(X(state.p[0])+X(corner[0]))/2,Y(state.p[1])+22,`Δx=${format(dx)}`,'svg-component-label');
        if(dy!==0)text(svg,X(state.q[0])+9,(Y(corner[1])+Y(state.q[1]))/2,`Δy=${format(dy)}`,'svg-component-label');
      }

      if(toggles.equivalents.checked && (dx!==0||dy!==0)){
        validCopyOrigins(dx,dy).forEach((origin,i)=>{
          const palette=[colors.purple,colors.teal,colors.orange,colors.gray];
          addVector(svg,defs,origin,[origin[0]+dx,origin[1]+dy],palette[i%palette.length],`v⃗${i+1}`,4,'8 6','free-equivalent-vector');
        });
      }

      if(toggles.representative.checked && (dx!==0||dy!==0)){
        addVector(svg,defs,[0,0],[dx,dy],colors.green,'v⃗',7,'','free-representative-vector');
      }

      if(dx!==0||dy!==0) addVector(svg,defs,state.p,state.q,colors.blue,'PQ⃗',7,'','free-bound-vector');

      [['P',state.p,colors.blue],['Q',state.q,colors.red]].forEach(([name,p,color])=>{
        const hit=el('circle',{cx:X(p[0]),cy:Y(p[1]),r:'18',class:'free-vector-hit','data-drag-point':name});
        const visible=el('circle',{cx:X(p[0]),cy:Y(p[1]),r:'8',class:`free-vector-point free-vector-point-${name.toLowerCase()}`,'data-drag-point':name});
        visible.style.fill=color;
        svg.appendChild(hit); svg.appendChild(visible);
        text(svg,X(p[0])+11,Y(p[1])-12,`${name}=(${format(p[0])},${format(p[1])})`,'free-vector-point-label',color);
      });

      if(dx===0&&dy===0){
        text(svg,X(state.p[0])+12,Y(state.p[1])+28,'Vector nulo','free-vector-zero-label',colors.red);
      }
      updateFormula(dx,dy);
    }

    function updateFormula(dx,dy){
      clearTimeout(typesetTimer);
      const norm=Math.hypot(dx,dy);
      const extra=norm===0
        ? '<p><strong>Vector nulo:</strong> los extremos coinciden. Sus componentes y su módulo son cero.</p>'
        : '<p>Todos los vectores dibujados como copias tienen estas mismas componentes, módulo, dirección y sentido.</p>';
      formula.innerHTML=String.raw`\[\overrightarrow{PQ}=(${format(state.q[0])}-${format(state.p[0])},${format(state.q[1])}-${format(state.p[1])})=${tuple([dx,dy])}.\]\[\vec v=${tuple([dx,dy])},\qquad \|\vec v\|=${format(norm)}.\]${extra}`;
      typesetTimer=setTimeout(()=>typeset(formula),70);
    }

    svg.addEventListener('pointerdown',e=>{
      const target=e.target.closest('[data-drag-point]');
      if(!target) return;
      state.dragging=target.getAttribute('data-drag-point');
      svg.setPointerCapture?.(e.pointerId);
      svg.classList.add('dragging');
      e.preventDefault();
    });
    svg.addEventListener('pointermove',e=>{
      if(!state.dragging) return;
      const world=svgToWorld(e.clientX,e.clientY); if(!world) return;
      if(state.dragging==='P') state.p=world; else state.q=world;
      syncInputs(); render(); e.preventDefault();
    });
    const endDrag=e=>{
      if(!state.dragging) return;
      state.dragging=null; svg.classList.remove('dragging');
      try{svg.releasePointerCapture?.(e.pointerId);}catch{}
    };
    svg.addEventListener('pointerup',endDrag);
    svg.addEventListener('pointercancel',endDrag);

    Object.values(inputs).forEach(input=>input.addEventListener('change',pointFromInputs));
    Object.values(toggles).forEach(input=>input.addEventListener('change',render));

    document.getElementById('randomizeFreeCopies').addEventListener('click',()=>{
      state.anchors=Array.from({length:4},()=>[.05+Math.random()*.85,.05+Math.random()*.85]);
      render();
    });
    document.getElementById('resetFreeVector').addEventListener('click',()=>{
      state.p=[4,2]; state.q=[7,4];
      state.anchors=[[.08,.78],[.12,.14],[.58,.12],[.68,.72]];
      toggles.equivalents.checked=true; toggles.representative.checked=true; toggles.components.checked=true;
      syncInputs(); feedback.className='feedback'; feedback.textContent='';
      document.querySelectorAll('[data-free-vector-answer]').forEach(b=>b.classList.remove('active'));
      render();
    });

    document.getElementById('freeVectorQuestion').addEventListener('click',e=>{
      const button=e.target.closest('[data-free-vector-answer]'); if(!button) return;
      document.querySelectorAll('[data-free-vector-answer]').forEach(b=>b.classList.toggle('active',b===button));
      const ok=button.dataset.freeVectorAnswer==='position';
      feedback.className=`feedback ${ok?'success':'danger'}`;
      feedback.innerHTML=ok
        ? '<strong>Correcto.</strong> Cambian los puntos donde se dibuja la flecha, pero se conservan las componentes, el módulo, la dirección y el sentido.'
        : '<strong>Revisá el gráfico.</strong> En vectores equivalentes se conservan las componentes, el módulo, la dirección y el sentido; sólo cambia su ubicación.';
      if(ok) markComplete('concepto');
    });

    syncInputs(); render();
  }

  function setupEquivalentBoard(){
    const svg=document.getElementById('equivalentVectorSvg'); if(!svg) return;
    const feedback=document.getElementById('equivalentVectorFeedback');
    const shown=new Set();
    function render(){
      const vectors=[{start:[4,2],end:[7,4],color:colors.blue,label:'PQ⃗'}];
      if(shown.has('free')) vectors.push({start:[0,0],end:[3,2],color:colors.green,label:'v⃗'});
      if(shown.has('double')) vectors.push({start:[6,-2],end:[12,2],color:colors.red,label:'2v⃗'});
      if(shown.has('half')) vectors.push({start:[2,4],end:[0.5,3],color:colors.teal,label:'z⃗'});
      if(shown.has('reflections')) vectors.push({start:[0,0],end:[3,-2],color:colors.orange,label:'v⃗ₓ'},{start:[0,0],end:[-3,2],color:colors.purple,label:'v⃗ᵧ'});
      drawPlane(svg,{xmin:-5,xmax:13,ymin:-4,ymax:7,vectors,points:[{p:[4,2],label:'P'},{p:[7,4],label:'Q'},{p:[6,-2],label:'A'},{p:[2,4],label:'B'}]});
    }
    document.querySelectorAll('.vector-action').forEach(b=>b.addEventListener('click',()=>{
      const action=b.dataset.vectorAction; shown.add(action); b.classList.add('active'); render();
      const messages={
        free:String.raw`\(\overrightarrow{PQ}=(7-4,4-2)=(3,2)\), por lo tanto \(\vec v=(3,2)\).`,
        double:String.raw`Tomando el mismo sentido, \(2\vec v=(6,4)\) y el extremo desde \(A=(6,-2)\) es \((12,2)\).`,
        half:String.raw`\(-\tfrac12\vec v=(-\tfrac32,-1)\) y el extremo desde \(B=(2,4)\) es \((\tfrac12,3)\).`,
        reflections:String.raw`Respecto del eje \(x\): \((3,-2)\). Respecto del eje \(y\): \((-3,2)\).`
      };
      setFeedback(feedback,'success',messages[action]); typeset(feedback); if(shown.size===4) markComplete('concepto');
    }));
    document.getElementById('resetEquivalentBoard').addEventListener('click',()=>{shown.clear(); document.querySelectorAll('.vector-action').forEach(b=>b.classList.remove('active')); feedback.className='feedback';feedback.textContent='';render();});
    render();
  }

  function setupPointVectorCalculator(){
    let is3d=false;
    const pz=document.getElementById('pointPz'),qz=document.getElementById('pointQz'),out=document.getElementById('pointVectorSteps');
    function updateDimension(){ pz.closest('label').hidden=!is3d; qz.closest('label').hidden=!is3d; out.innerHTML=''; }
    document.getElementById('togglePointDimension').addEventListener('click',()=>{is3d=!is3d;updateDimension();});
    document.getElementById('calculatePQ').addEventListener('click',()=>{
      const p=[num('pointPx'),num('pointPy')],q=[num('pointQx'),num('pointQy')]; if(is3d){p.push(num('pointPz'));q.push(num('pointQz'));}
      const d=q.map((v,i)=>v-p[i]);
      out.innerHTML=String.raw`<div class="step-content"><article><span class="step-number">1</span><div><strong>Identificar el orden.</strong><p>Extremo final menos extremo inicial.</p></div></article><article><span class="step-number">2</span><div>\[\overrightarrow{PQ}=${tuple(q)}-${tuple(p)}.\]</div></article><article><span class="step-number">3</span><div>\[\boxed{\overrightarrow{PQ}=${tuple(d)}}.\]</div></article></div>`;
      typeset(out); markComplete('concepto');
    });
    updateDimension();
  }

  function setupOperationLab(){
    const svg=document.getElementById('operationSvg'),select=document.getElementById('operationSelect'),result=document.getElementById('operationResult'),feedback=document.getElementById('operationFeedback'); if(!svg) return;
    function baseDraw(extra=[]){drawPlane(svg,{xmin:-10,xmax:7,ymin:-7,ymax:17,vectors:[{start:[0,0],end:[5,3],color:colors.blue,label:'u⃗'},{start:[0,0],end:[-2,4],color:colors.red,label:'v⃗'},{start:[0,0],end:[-4,-1],color:colors.teal,label:'w⃗'},...extra]});}
    document.getElementById('calculateOperation').addEventListener('click',()=>{const item=operationData[select.value];baseDraw([{start:[0,0],end:item.result,color:item.color,label:'R⃗',width:7}]);result.innerHTML=item.steps; setFeedback(feedback,'success',`El vector resultante es (${format(item.result[0])}, ${format(item.result[1])}).`);typeset(result);markComplete('operaciones');});
    select.addEventListener('change',()=>{result.innerHTML='';feedback.className='feedback';feedback.textContent='';baseDraw();}); baseDraw();
  }

  function setupScalarLab(){
    const slider=document.getElementById('scalarSlider'),label=document.getElementById('scalarLabel'),svg=document.getElementById('scalarSvg'),exp=document.getElementById('scalarExplanation'); if(!slider) return;
    function update(){const k=Number(slider.value),base=[3,2],end=[k*3,k*2];label.innerHTML=`\\(k=${format(k)}\\)`;drawPlane(svg,{xmin:-10,xmax:10,ymin:-7,ymax:7,vectors:[{start:[0,0],end:base,color:colors.navy,label:'v⃗'},{start:[0,0],end,color:k<0?colors.red:k===0?colors.gray:colors.green,label:'kv⃗',width:7}]});let desc=k>0?'misma dirección y mismo sentido':k<0?'misma dirección y sentido opuesto':'vector nulo';exp.innerHTML=String.raw`\[k\vec v=${format(k)}(3,2)=${tuple(end)},\qquad \|k\vec v\|=${format(Math.abs(k)*Math.sqrt(13))}.\]<p>Geométricamente: ${desc}. El módulo se multiplica por \(|k|=${format(Math.abs(k))}\).</p>`;typeset(exp);}
    slider.addEventListener('input',update);update();
  }

  function setupVector3dControls(){
    const inputs=['v3x','v3y','v3z'].map(id=>document.getElementById(id)), readout=document.getElementById('vector3dReadout'),show=document.getElementById('show3dProjections'); if(!inputs[0]) return;
    function update(){const value=inputs.map(i=>Number(i.value));['v3xLabel','v3yLabel','v3zLabel'].forEach((id,i)=>document.getElementById(id).textContent=format(value[i]));const norm=Math.hypot(...value);readout.innerHTML=String.raw`\[\vec v=${tuple(value)},\qquad \|\vec v\|=\sqrt{${value.map(x=>`(${format(x)})^2`).join('+')}}=${format(norm)}.\]`;typeset(readout);window.dispatchEvent(new CustomEvent('vector3d:update',{detail:{vector:value,showProjections:show.checked}}));}
    inputs.forEach(i=>i.addEventListener('input',update));show.addEventListener('change',update);document.getElementById('resetVector3dCamera').addEventListener('click',()=>window.dispatchEvent(new CustomEvent('vector3d:reset')));update();
  }

  function setupCombinationLab(){
    const feedback=document.getElementById('combinationFeedback');
    document.getElementById('checkCombination').addEventListener('click',()=>{const a=num('comboAlpha'),b=num('comboBeta'),x=4*a+6*b,y=a-4*b,ok=near(x,5)&&near(y,4);setFeedback(feedback,ok?'success':'danger',`${ok?'Correcto.':'Todavía no.'} Con esos valores, αa⃗+βb⃗=(${format(x)},${format(y)}).`);if(ok)markComplete('espacio');});
    document.getElementById('showCombination').addEventListener('click',()=>{feedback.className='feedback success';feedback.innerHTML=String.raw`La igualdad de componentes produce \[\begin{cases}4\alpha+6\beta=5\\\alpha-4\beta=4\end{cases}\] cuya solución es \(\alpha=2\), \(\beta=-\tfrac12\).`;typeset(feedback);});
  }

  function setupNormLab(){
    const out=document.getElementById('normOutput'); let opposite=false;
    function calculate(){const v=[num('normX'),num('normY'),num('normZ')],n=Math.hypot(...v);if(n===0){out.innerHTML='<div class="feedback danger">El vector nulo tiene norma cero y no posee versor asociado.</div>';return;}const unit=v.map(x=>(opposite?-1:1)*x/n);out.innerHTML=String.raw`<div class="step-content"><article><span class="step-number">1</span><div>\[\|\vec v\|=\sqrt{${v.map(x=>`(${format(x)})^2`).join('+')}}=${format(n)}.\]</div></article><article><span class="step-number">2</span><div>\[${opposite?'-\widehat v':'\widehat v'}=${tuple(unit)}.\]</div></article><article><span class="step-number">3</span><div>Comprobación: \(\|${opposite?'-\widehat v':'\widehat v'}\|=1\).</div></article></div>`;typeset(out);markComplete('norma');}
    document.getElementById('calculateNorm').addEventListener('click',()=>{opposite=false;calculate();});document.getElementById('oppositeUnit').addEventListener('click',()=>{opposite=true;calculate();});calculate();
  }

  function setupKNormLab(){
    const slider=document.getElementById('kNormSlider'),label=document.getElementById('kNormLabel'),out=document.getElementById('kNormOutput');function update(){const k=Number(slider.value),n=Math.sqrt(5+k*k);label.textContent=format(k);out.innerHTML=String.raw`\[\|(2,${format(k)},1)\|=\sqrt{5+(${format(k)})^2}=${format(n)}.\]${near(n,3)?'<p><strong>Se cumple la condición del TP: la norma vale 3.</strong></p>':''}`;typeset(out);}slider.addEventListener('input',update);update();
    document.getElementById('revealDistance3d').addEventListener('click',()=>{const el=document.getElementById('distance3dOutput');el.className='feedback success';el.innerHTML=String.raw`\[\overrightarrow{PQ}=(-1,3,2)-(2,-1,0)=(-3,4,2),\] \[d(P,Q)=\sqrt{9+16+4}=\sqrt{29}.\]`;typeset(el);markComplete('norma');});
  }

  function setupPolarLab(){
    const mag=document.getElementById('polarMagnitude'),angle=document.getElementById('polarAngle'),status=document.getElementById('polarStatus'),out=document.getElementById('polarOutput'),svg=document.getElementById('polarSvg');
    function update(){const m=Number(mag.value),deg=Number(angle.value),rad=deg*Math.PI/180,x=m*Math.cos(rad),y=m*Math.sin(rad);status.innerHTML=`\\(${format(m)}\\) unidades · \\(${deg}^\\circ\\)`;drawPlane(svg,{xmin:-13,xmax:13,ymin:-13,ymax:13,vectors:[{start:[0,0],end:[x,y],color:colors.blue,label:'v⃗',width:7},{start:[0,0],end:[x,0],color:colors.orange,label:'vₓ⃗'},{start:[x,0],end:[x,y],color:colors.teal,label:'vᵧ⃗'}],guides:[{start:[x,0],end:[0,0]},{start:[x,0],end:[x,y]}]});out.innerHTML=String.raw`\[v_x=${format(m)}\cos(${deg}^\circ)=${format(x)},\qquad v_y=${format(m)}\sen(${deg}^\circ)=${format(y)}.\]\[\vec v=${tuple([x,y])}.\]`;typeset(out);}
    mag.addEventListener('input',update);angle.addEventListener('input',update);update();
  }

  function setupApplications(){
    const svg=document.getElementById('applicationSvg'),exp=document.getElementById('applicationExplanation');let key='fluid';
    function render(){const item=applicationCases[key];drawPlane(svg,{xmin:-7,xmax:7,ymin:-6,ymax:7,vectors:item.vectors.map(v=>({start:[0,0],...v,width:7})),title:item.title});exp.innerHTML=`<div class="application-explanation">${item.formula}</div>`;typeset(exp);}
    document.getElementById('applicationTabs').addEventListener('click',e=>{const b=e.target.closest('[data-app-case]');if(!b)return;key=b.dataset.appCase;document.querySelectorAll('[data-app-case]').forEach(x=>x.classList.toggle('active',x===b));render();markComplete('componentes');});render();
  }

  function setupDotLab(){
    const svg=document.getElementById('dotSvg'),out=document.getElementById('dotOutput');
    function calculate(){const r=[num('dotRx'),num('dotRy')],s=[num('dotSx'),num('dotSy')],nr=Math.hypot(...r),ns=Math.hypot(...s);if(nr===0||ns===0){out.innerHTML='<p>No se define un ángulo si alguno de los vectores es nulo.</p>';return;}const dot=dotProduct(r,s),cos=clamp(dot/(nr*ns),-1,1),deg=Math.acos(cos)*180/Math.PI,factor=dot/(ns*ns),proj=s.map(x=>factor*x);drawPlane(svg,{xmin:-5,xmax:5,ymin:-5,ymax:5,vectors:[{start:[0,0],end:r,color:colors.blue,label:'r⃗',width:7},{start:[0,0],end:s,color:colors.red,label:'s⃗',width:7},{start:[0,0],end:proj,color:colors.green,label:'Proy',width:8}],guides:[{start:proj,end:r}]});out.innerHTML=String.raw`\[\vec r\cdot\vec s=${format(dot)},\qquad \theta=${format(deg)}^\circ.\]\[\operatorname{Proy}_{\vec s}\vec r=${tuple(proj)}.\]${near(dot,0)?'<p><strong>Los vectores son ortogonales.</strong></p>':''}`;typeset(out);markComplete('escalar');}
    document.getElementById('calculateDot').addEventListener('click',calculate);calculate();
  }

  function setupWorkLab(){
    const angle=document.getElementById('workAngle'),force=document.getElementById('workForce'),distance=document.getElementById('workDistance'),out=document.getElementById('workOutput');
    function update(){const a=Number(angle.value),f=Number(force.value),d=Number(distance.value),w=f*d*Math.cos(a*Math.PI/180);document.getElementById('workAngleLabel').textContent=`${a}°`;document.getElementById('workForceLabel').textContent=`${f} N`;document.getElementById('workDistanceLabel').textContent=`${d} m`;const sign=w>1e-9?'positivo':w<-1e-9?'negativo':'nulo';out.innerHTML=`<div><span>Producto de módulos</span><strong>${f*d} N·m</strong></div><div><span>cos(${a}°)</span><strong>${format(Math.cos(a*Math.PI/180))}</strong></div><div><span>Trabajo</span><strong>${format(w)} J</strong></div><div><span>Interpretación</span><strong>${sign}</strong></div>`;}
    [angle,force,distance].forEach(i=>i.addEventListener('input',update));update();
  }

  let currentCross=[2,3,-1];
  function setupCrossLab(){
    const out=document.getElementById('crossOutput'),lambda=document.getElementById('normalLambda'),family=document.getElementById('normalFamilyOutput');
    function readVectors(){return {u:[num('crossUx'),num('crossUy'),num('crossUz')],v:[num('crossVx'),num('crossVy'),num('crossVz')]};}
    function calculate(){const {u,v}=readVectors();currentCross=crossProduct(u,v);const area=Math.hypot(...currentCross);out.innerHTML=String.raw`\[\vec u\times\vec v=${tuple(currentCross)},\qquad \|\vec u\times\vec v\|=${format(area)}.\]${area===0?'<p>Los vectores son paralelos o alguno es nulo.</p>':'<p>El resultado es perpendicular a ambos y su norma es el área del paralelogramo.</p>'}`;typeset(out);window.dispatchEvent(new CustomEvent('cross3d:update',{detail:{u,v,cross:currentCross}}));updateFamily();markComplete('vectorial');}
    function updateFamily(){const l=Number(lambda.value),n=currentCross.map(x=>l*x);document.getElementById('normalLambdaLabel').textContent=format(l);family.className='feedback success';family.innerHTML=String.raw`\[\lambda(\vec u\times\vec v)=${format(l)}${tuple(currentCross)}=${tuple(n)},\qquad \|\cdot\|=${format(Math.hypot(...n))}.\]`;typeset(family);}
    document.getElementById('calculateCross').addEventListener('click',calculate);document.getElementById('swapCross').addEventListener('click',()=>{['x','y','z'].forEach(c=>{const u=document.getElementById(`crossU${c}`),v=document.getElementById(`crossV${c}`),tmp=u.value;u.value=v.value;v.value=tmp;});calculate();});document.getElementById('resetCrossCamera').addEventListener('click',()=>window.dispatchEvent(new CustomEvent('cross3d:reset')));lambda.addEventListener('input',updateFamily);calculate();
  }

  function setupVolumeReadout(){
    const u=[1,2,3],v=[2,0,1],w=[1,3,0];
    const normal=crossProduct(v,w),triple=dotProduct(u,normal),area=Math.hypot(...normal),volume=Math.abs(triple),height=volume/area;
    const hvec=normal.map(x=>triple*x/(area*area));
    const out=document.getElementById('volumeReadout');
    out.innerHTML=String.raw`
      <div><span>\(\vec v\times\vec w\)</span><strong>\(${tuple(normal)}\)</strong></div>
      <div><span>Área base</span><strong>\(${format(area)}\)</strong></div>
      <div><span>Volumen</span><strong>\(${format(volume)}\)</strong></div>
      <div><span>Altura</span><strong>\(${format(height)}\)</strong></div>
      <div class="metric-wide"><span>Vector altura</span><strong>\(${tuple(hvec)}\)</strong></div>`;
    typeset(out);
    document.getElementById('showHeightVector').addEventListener('change',e=>window.dispatchEvent(new CustomEvent('volume3d:update',{detail:{showHeight:e.target.checked}})));
    document.getElementById('resetVolumeCamera').addEventListener('click',()=>window.dispatchEvent(new CustomEvent('volume3d:reset')));
    setTimeout(()=>window.dispatchEvent(new CustomEvent('volume3d:update',{detail:{showHeight:true}})),50);
  }

  function setupCoplanarity(){
    const slider=document.getElementById('coplanarAlpha'),label=document.getElementById('coplanarAlphaLabel'),out=document.getElementById('coplanarOutput'),feedback=document.getElementById('coplanarFeedback');function update(){const a=Number(slider.value),triple=2*a-1;label.textContent=format(a);out.innerHTML=String.raw`\[[\vec u,\vec v,\vec w]=2\alpha-1=${format(triple)}.\]${near(triple,0)?'<p><strong>Los vectores son coplanares.</strong></p>':'<p>El volumen no es cero: no son coplanares.</p>'}`;typeset(out);}slider.addEventListener('input',update);document.getElementById('showCoplanarValue').addEventListener('click',()=>{feedback.className='feedback success';feedback.innerHTML=String.raw`Pedimos \(2\alpha-1=0\), por lo tanto \(\boxed{\alpha=\tfrac12}\).`;typeset(feedback);markComplete('mixto');});update();
  }

  function setupErrorDetective(){
    const statement=document.getElementById('errorStatement'),options=document.getElementById('errorOptions'),feedback=document.getElementById('errorFeedback'),counter=document.getElementById('errorCaseCounter');
    function render(){const item=errorCases[errorIndex];counter.textContent=`Caso ${errorIndex+1}`;statement.innerHTML=item.statement;options.innerHTML='';item.options.forEach((text,i)=>{const b=document.createElement('button');b.type='button';b.className='choice-button';b.innerHTML=text;b.addEventListener('click',()=>{const ok=i===item.answer;setFeedback(feedback,ok?'success':'danger',`${ok?'Correcto.':'Revisá la afirmación.'} ${item.explanation}`);if(ok)markComplete('practica');});options.appendChild(b);});feedback.className='feedback';feedback.textContent='';typeset(statement);typeset(options);}
    document.getElementById('nextErrorCase').addEventListener('click',()=>{errorIndex=(errorIndex+1)%errorCases.length;render();});render();
  }

  function setupQuiz(){
    const container=document.getElementById('quizQuestions'),form=document.getElementById('quizForm'),result=document.getElementById('quizResult');let current=[];
    function build(){current=shuffle([...quizBank]).slice(0,10).map(item=>({...item,displayOptions:shuffle(item.options.map((text,i)=>({text,original:i})))}));container.innerHTML=current.map((item,i)=>`<fieldset class="quiz-question"><legend><span class="quiz-number">${i+1}</span><span class="quiz-question-text">${item.text}</span></legend>${item.displayOptions.map(o=>`<label><input type="radio" name="q${i}" value="${o.original}"><span class="quiz-option-text">${o.text}</span></label>`).join('')}<div class="question-feedback" id="qFeedback${i}"></div></fieldset>`).join('');result.className='quiz-result';result.innerHTML='';typeset(container);}
    form.addEventListener('submit',e=>{e.preventDefault();let score=0,answered=0;current.forEach((item,i)=>{const selected=form.querySelector(`input[name="q${i}"]:checked`),fb=document.getElementById(`qFeedback${i}`);if(selected){answered++;const ok=Number(selected.value)===item.answer;if(ok)score++;fb.className=`question-feedback ${ok?'correct':'incorrect'}`;fb.textContent=`${ok?'Correcto.':'Respuesta incorrecta.'} ${item.explanation}`;}else{fb.className='question-feedback incorrect';fb.textContent=`Sin responder. ${item.explanation}`;}});const pct=Math.round(score/current.length*100);result.className=`quiz-result ${pct>=70?'success':'warning'}`;result.innerHTML=`<strong>${score}/${current.length} · ${pct}%</strong><p>Respondiste ${answered} preguntas. ${pct>=70?'Buen dominio general de la unidad.':'Revisá los módulos vinculados con los errores y generá otro intento.'}</p>`;if(pct>=70)markComplete('autoevaluacion');});
    document.getElementById('newQuiz').addEventListener('click',build);build();
  }

  function setupVideos(){
    document.querySelectorAll('.video-card').forEach(card=>{const button=card.querySelector('.load-video'),holder=card.querySelector('.video-placeholder'),id=card.dataset.videoId;button?.addEventListener('click',()=>{holder.innerHTML=`<iframe src="https://www.youtube-nocookie.com/embed/${id}?rel=0" title="Video educativo" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;button.disabled=true;button.textContent='Video cargado';});});
  }

  function setupGlobalActions(){
    document.getElementById('printButton').addEventListener('click',()=>{const states=[...document.querySelectorAll('.module')].map(m=>({m,hidden:m.hidden}));states.forEach(x=>x.m.hidden=false);setTimeout(()=>{window.print();states.forEach(x=>x.m.hidden=x.hidden);},150);});
    document.getElementById('resetProgressButton').addEventListener('click',()=>{if(!confirm('¿Reiniciar todo el progreso guardado de la Unidad 4?'))return;completed.clear();saveProgress();document.querySelectorAll('[data-complete]').forEach(b=>setCompleteButtonState(b,false));updateProgressUI();});
  }

  function drawPlane(svg,opts={}){
    if(!svg) return; svg.innerHTML='';
    const {xmin=-6,xmax=6,ymin=-6,ymax=6,vectors=[],points=[],guides=[],title=''}=opts;
    const vb=svg.viewBox.baseVal,width=vb.width||700,height=vb.height||500,margin=48;
    const sx=(width-2*margin)/(xmax-xmin),sy=(height-2*margin)/(ymax-ymin);
    const X=x=>margin+(x-xmin)*sx,Y=y=>height-margin-(y-ymin)*sy;
    const defs=el('defs');svg.appendChild(defs);
    for(let x=Math.ceil(xmin);x<=Math.floor(xmax);x++){const l=line(X(x),Y(ymin),X(x),Y(ymax),'svg-grid-line');svg.appendChild(l);}
    for(let y=Math.ceil(ymin);y<=Math.floor(ymax);y++){const l=line(X(xmin),Y(y),X(xmax),Y(y),'svg-grid-line');svg.appendChild(l);}
    if(ymin<=0&&ymax>=0){svg.appendChild(line(X(xmin),Y(0),X(xmax),Y(0),'svg-axis'));text(svg,X(xmax)-7,Y(0)-9,'x','svg-axis-label');}
    if(xmin<=0&&xmax>=0){svg.appendChild(line(X(0),Y(ymin),X(0),Y(ymax),'svg-axis'));text(svg,X(0)+9,Y(ymax)+16,'y','svg-axis-label');}
    if(title) text(svg,margin,24,title,'svg-point-label');
    guides.forEach(g=>{const l=line(X(g.start[0]),Y(g.start[1]),X(g.end[0]),Y(g.end[1]),'svg-guide');svg.appendChild(l);});
    vectors.forEach((v,i)=>{const markerId=`arrow-${svg.id}-${i}`;const marker=el('marker',{id:markerId,markerWidth:'8',markerHeight:'8',refX:'7.4',refY:'4',orient:'auto',markerUnits:'userSpaceOnUse'});marker.appendChild(el('path',{d:'M0,0 L8,4 L0,8 Z',fill:v.color||colors.blue}));defs.appendChild(marker);const l=line(X(v.start[0]),Y(v.start[1]),X(v.end[0]),Y(v.end[1]),'svg-vector');l.style.stroke=v.color||colors.blue;l.style.strokeWidth=v.width||5;if(v.dash)l.style.strokeDasharray='8 6';l.setAttribute('marker-end',`url(#${markerId})`);svg.appendChild(l);if(v.label){const mx=X(v.end[0])+(v.end[0]>=v.start[0]?10:-32),my=Y(v.end[1])-8;text(svg,mx,my,v.label,'svg-vector-label',v.color||colors.blue);}});
    points.forEach(o=>{svg.appendChild(el('circle',{cx:X(o.p[0]),cy:Y(o.p[1]),r:'5',class:'svg-point'}));text(svg,X(o.p[0])+8,Y(o.p[1])-8,o.label,'svg-point-label');});
  }

  function el(name,attrs={}){const node=document.createElementNS(SVG_NS,name);Object.entries(attrs).forEach(([k,v])=>node.setAttribute(k,v));return node;}
  function line(x1,y1,x2,y2,cls){return el('line',{x1,y1,x2,y2,class:cls});}
  function text(svg,x,y,value,cls,fill){const t=el('text',{x,y,class:cls});if(fill)t.setAttribute('fill',fill);t.textContent=value;svg.appendChild(t);return t;}
  function num(id){return Number(document.getElementById(id).value);}
  function tuple(v){return `\\left(${v.map(format).join(',')}\\right)`;}
  function dotProduct(a,b){return a.reduce((s,x,i)=>s+x*b[i],0);}
  function crossProduct(a,b){return [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];}
  function format(n){if(!Number.isFinite(n))return '—';if(Math.abs(n)<1e-10)n=0;return Number.isInteger(n)?String(n):String(Math.round(n*1000)/1000);}
  function near(a,b,eps=1e-6){return Math.abs(a-b)<eps;}
  function clamp(x,a,b){return Math.max(a,Math.min(b,x));}
  function shuffle(arr){for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}return arr;}
  function setFeedback(element,type,textValue){element.className=`feedback ${type}`;element.textContent=textValue;}
  function typeset(root){
    if(!window.MathJax?.typesetPromise) return;
    const targets=root?[root]:undefined;
    if(root && window.MathJax.typesetClear) window.MathJax.typesetClear(targets);
    window.MathJax.typesetPromise(targets).catch(()=>{});
  }
})();
