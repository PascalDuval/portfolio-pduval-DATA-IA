async function loadProjects() {
  const res = await fetch('./projects.json');
  return await res.json();
}

const lang = document.documentElement.lang === 'en' ? 'en' : 'fr';

const uiText = {
  fr: {
    github: 'Github',
    details: 'Voir la fiche projet et les compétences mise en oeuvre',
    loadError: 'Erreur de chargement des projets.'
  },
  en: {
    github: 'GitHub',
    details: 'View project sheet and implemented skills',
    loadError: 'Failed to load projects.'
  }
};

function cardTemplate(project) {
  const tags = project.technologies.slice(0, 5).map(t => `<span class="tag">${t}</span>`).join('');
  const image = project.image
    ? `<img src="${project.image}" alt="Illustration ${project.title}">`
    : '';

  return `
    <article class="card">
      <div class="thumb">${image}</div>
      <div class="card-body">
        <div class="meta">${project.category}</div>
        <h3>${project.title}</h3>
        <p>${project.summary}</p>
        <div class="tags">${tags}</div>
        <div class="actions">
          <a class="btn btn-primary" href="${project.github}" target="_blank" rel="noreferrer">${uiText[lang].github}</a>
          <a class="btn btn-secondary" href="./projects/${project.slug}.html">${uiText[lang].details}</a>
        </div>
      </div>
    </article>
  `;
}

function renderProjects(projects) {
  const featured = projects.filter(p => p.featured);
  const others = projects.filter(p => !p.featured);

  document.getElementById('featured-grid').innerHTML = featured.map(cardTemplate).join('');
  document.getElementById('others-grid').innerHTML = others.map(cardTemplate).join('');
}

loadProjects().then(renderProjects).catch(err => {
  console.error(err);
  document.getElementById('featured-grid').innerHTML = `<p>${uiText[lang].loadError}</p>`;
});
