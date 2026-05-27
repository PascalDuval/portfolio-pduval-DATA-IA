async function loadProjects() {
  const res = await fetch('./projects.json');
  return await res.json();
}

const lang = document.documentElement.lang === 'en' ? 'en' : 'fr';

const uiText = {
  fr: {
    github: 'GitHub',
    details: 'Voir la fiche projet et les compétences mises en oeuvre',
    loadError: 'Erreur de chargement des projets.'
  },
  en: {
    github: 'GitHub',
    details: 'View project sheet and implemented skills',
    loadError: 'Failed to load projects.'
  }
};

const enCardTextBySlug = {
  academy: {
    category: 'Data Engineering',
    summary: "Identify the countries with the highest potential for international expansion of an education offer."
  },
  immoprojets: {
    category: 'Databases',
    summary: 'Build a normalized real-estate relational database to analyze property transactions and produce actionable SQL indicators.'
  },
  supersmartmarket: {
    category: 'Data Engineering',
    summary: "Audit revenue instability between OLTP and the OLAP cube, identify root causes, and propose robust corrective actions."
  },
  'migration-mongodb': {
    title: 'Migration MongoDB',
    category: 'Databases',
    summary: 'Migrate a medical CSV dataset to MongoDB with cleaning, integrity checks, tests, and analysis routines.'
  },
  seattle: {
    category: 'MLOps / API / Deployment',
    summary: 'Predict building energy consumption and emissions in Seattle from structural data, then expose the model through an API.'
  },
  nosql: {
    category: 'Databases',
    summary: 'Design and analyze a MongoDB database to study Airbnb supply in Paris in the context of the 2024 Olympic Games impact on housing.'
  },
  'forecast2-0': {
    category: 'Databases',
    summary: 'Migrate and industrialize weather data to MongoDB Time Series with automated tests, Docker replica set, and cloud deployment preparation.'
  },
  indutech: {
    category: 'Data Engineering',
    summary: 'Build an industrial support-ticket data pipeline with Kafka/Redpanda streaming and PySpark batch processing, including exploitable analytical exports.'
  },
  bottleneck: {
    title: 'Bottleneck',
    category: 'Quality & Orchestration',
    summary: 'Automate and industrialize ERP, WEB, and linkage data reconciliation to improve business analysis reliability and product segmentation.'
  },
  culture: {
    category: 'RAG / Generative AI',
    summary: 'Design a cultural chatbot based on a RAG pipeline to recommend events in the Paris region from OpenAgenda data.'
  },
  avantagesportif: {
    category: 'Quality & Orchestration',
    summary: 'Design a data POC to manage employee sports benefits, from HR/sports ingestion to entitlement calculation and operational monitoring.'
  }
};

function cardTemplate(project) {
  const translated = lang === 'en' ? (enCardTextBySlug[project.slug] || {}) : {};
  const displayProject = {
    ...project,
    title: translated.title || project.title,
    category: translated.category || project.category,
    summary: translated.summary || project.summary
  };

  const projectDetailsHref = lang === 'en'
    ? `./projects/${project.slug}-en.html`
    : `./projects/${project.slug}.html`;
  const tags = project.technologies.slice(0, 5).map(t => `<span class="tag">${t}</span>`).join('');
  const image = displayProject.image
    ? `<img src="${displayProject.image}" alt="Illustration ${displayProject.title}">`
    : '';

  return `
    <article class="card">
      <div class="thumb">${image}</div>
      <div class="card-body">
        <div class="meta">${displayProject.category}</div>
        <h3>${displayProject.title}</h3>
        <p>${displayProject.summary}</p>
        <div class="tags">${tags}</div>
        <div class="actions">
          <a class="btn btn-primary" href="${project.github}" target="_blank" rel="noreferrer">${uiText[lang].github}</a>
          <a class="btn btn-secondary" href="${projectDetailsHref}">${uiText[lang].details}</a>
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
