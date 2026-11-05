// ── Demo modal ────────────────────────────────────────────────────────────
(function () {
  var LABELS = {
    gcp:  'JOB POSTINGS PIPELINE  ·  GCP / DATAFLOW / BIGQUERY',
    rjld: 'RELIGIOUS JOB LISTINGS  ·  ROBERTA / VERTEX AI',
    roar: 'HEALTHCARE AI CAPSTONE  ·  ROAR HPC / DUCKDB'
  };
  window.rpOpenDemo = function (btn) {
    var tab   = btn.dataset.tab;
    var label = LABELS[tab] || 'RESEARCH DASHBOARD';
    var overlay = document.getElementById('rp-demo-overlay');
    if (!overlay) return;
    document.getElementById('rp-demo-label').textContent = 'D.ENG. RESEARCH DASHBOARD  ·  ' + label;
    document.getElementById('rp-demo-frame').src = 'research-demo.html#' + tab;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  window.rpCloseDemo = function () {
    var overlay = document.getElementById('rp-demo-overlay');
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(function () {
      var frame = document.getElementById('rp-demo-frame');
      if (frame) frame.src = '';
    }, 300);
  };
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') rpCloseDemo(); });
})();

// ── Theme toggle ──────────────────────────────────────────────────────────
(function () {
  var saved = localStorage.getItem('rp-theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);

  function isDark() {
    var t = document.documentElement.getAttribute('data-theme');
    return t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }
  function syncIcon() {
    var moon = document.getElementById('icon-moon');
    var sun  = document.getElementById('icon-sun');
    if (moon) moon.hidden = isDark();
    if (sun)  sun.hidden  = !isDark();
  }
  window.toggleTheme = function () {
    var next = isDark() ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('rp-theme', next);
    syncIcon();
  };
  document.addEventListener('DOMContentLoaded', syncIcon);
})();

// ── Stack tag filtering (home page) ───────────────────────────────────────
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var filterTags = document.querySelectorAll('.stack-tag[data-filter]');
    if (!filterTags.length) return;
    filterTags.forEach(function (tag) {
      tag.addEventListener('click', function () {
        var wasActive = tag.classList.contains('active');
        filterTags.forEach(function (t) { t.classList.remove('active'); });
        document.querySelectorAll('.feat-card').forEach(function (card) { card.style.opacity = '1'; });
        if (!wasActive) {
          tag.classList.add('active');
          var f = tag.dataset.filter;
          document.querySelectorAll('.feat-card').forEach(function (card) {
            var tags = (card.dataset.tags || '').split(',');
            card.style.opacity = tags.indexOf(f) !== -1 ? '1' : '0.22';
          });
        }
      });
    });
  });
})();

// ── Contact form (Netlify Forms) ──────────────────────────────────────────
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var statusEl = document.getElementById('cf-status');
      var btn = form.querySelector('[type=submit]');
      if (btn) btn.disabled = true;
      if (statusEl) { statusEl.textContent = ''; statusEl.className = ''; }
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString()
      })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        if (statusEl) {
          statusEl.textContent = (I18N[_lang] && I18N[_lang]['contact.success']) || 'Message sent — I\'ll be in touch.';
          statusEl.className = 'cf-status-ok';
        }
        form.reset();
      })
      .catch(function () {
        if (statusEl) {
          statusEl.textContent = (I18N[_lang] && I18N[_lang]['contact.error']) || 'Something went wrong — please email rpp5069@gmail.com directly.';
          statusEl.className = 'cf-status-err';
        }
      })
      .finally(function () {
        if (btn) btn.disabled = false;
      });
    });
  });
})();

// ── i18n ──────────────────────────────────────────────────────────────────
var I18N = {
  en: {
    /* Nav */
    'nav.research':    'Research',
    'nav.engineering': 'Engineering',
    'nav.teaching':    'Teaching',
    'nav.contact':     'Contact',
    /* Hero */
    'hero.eyebrow':    'D.Eng. Candidate · Penn State University',
    'hero.tagline':    'Engineering the cloud pipelines and data models that uncover how artificial intelligence is reshaping the global workforce.',
    'hero.bio1':       'I am a D.Eng. Candidate at Penn State University specializing in AI and workforce analytics. My research combines large-scale employer demand data, natural language processing (NLP), and production-grade cloud architectures to identify how machine learning alters required occupational skill sets — and analyze who risks being left behind in the digital economy.',
    'hero.bio2':       'Advised by Dr. Satish M. Srinivasan, my doctoral work focuses on building fully automated, GCP-native ETL pipelines to trace longitudinal skill shifts across sectors ranging from healthcare delivery to digital religious labor platforms. I am passionate about bridging the gap between academic labor economics and enterprise software architecture, developing data solutions that champion equity, explainable AI (XAI), and clinical stewardship.',
    'hero.award':      '2025 NABET Best Paper Award — Impact of Artificial Intelligence in the Healthcare Sector',
    /* Credential ticker */
    'cred.deng':  'D.Eng. Candidate · Penn State',
    'cred.award': '🏆 NABET Best Paper Award 2025',
    'cred.ms':    'M.S. Information Science · GPA 3.73',
    'cred.cert':  'Grad. Cert. Engineering Leadership & Innovation Mgmt',
    /* Home sections */
    'stack.h2':   'Tech Stack',
    'news.h2':    'Recent Activity',
    /* Research page */
    'research.page.eyebrow': 'Academic Research',
    'research.page.h1':      'Research & Publications',
    'research.page.desc':    'Doctoral research on AI-driven labor market transformation — from macro skill-demand shifts to digital equity in spiritual labor platforms.',
    'pillar1.label': 'Research Pillar 1',
    'pillar1.h3':    'Macro Labor Market Shifts',
    'pillar1.p1':    'My core doctoral work examines how AI adoption changes the composition of skills that employers actually demand. Using production ETL pipelines on GCP (BigQuery, Dataflow, Cloud Storage), I collect longitudinal job posting data from USAJobs and Jooble, then apply BERTopic and LDA to extract occupational skill signals across CS, MBA, Data Analytics, and AI domains.',
    'pillar1.p2':    'The central research question: as machine learning capabilities expand, which human competencies become scarcer, which become redundant, and which new hybrid skill clusters emerge? Every role is mapped to O*NET 24.2 competency frameworks to enable cross-sector, longitudinal comparisons.',
    'pillar1.stat':  'Four domains · 12 O*NET competency families · Longitudinal since 2025',
    'pillar2.label': 'Research Pillar 2',
    'pillar2.h3':    'Digital Labor Equity & Spiritual Ecosystems',
    'pillar2.p1':    'A parallel research thread investigates structural inequities in digital labor platform access among spiritual facilitation roles — chaplains, clergy, and pastoral staff. Drawing on IRS, Census, USDA, and SerpAPI data across national, state, and metro architectures, the analysis spans 27 U.S. states.',
    'pillar2.p2':    'Key finding: a significant inverse correlation (r = −0.402, p = 0.038) across 27 states: states with lower median household income show a higher share of digital spiritual-facilitation postings.',
    'pillar2.stat':  'r = −0.402 (p = 0.038) · 27 states · IRS + Census + USDA + SerpAPI',
    'pubindex.h2':   'Publications',
    /* Pub entries */
    'pub1.h3':         'Building Trust in AI: Ethical Deployment and Regulatory Oversight in Healthcare',
    'pub1.p':          'National Association for Business, Economics, and Technology (NABET) Annual Conference · Presenting 2026',
    'pub2.h3':         'Impact and Current State of Artificial Intelligence in the Religious Market',
    'pub2.p':          'National Association for Business, Economics, and Technology (NABET) Annual Conference · Presenting 2026',
    'pub4.h3':         'Architectural Patterns and Orchestration Frameworks in Multi-Agentic AI for Healthcare',
    'pub4.p':          'New Jersey Big Data Alliance (NJBDA) Annual Symposium',
    'pub4.badge':      'Lightning Talk 2026',
    'pub3.h3':         'Impact of Artificial Intelligence in the Healthcare Sector',
    'pub3.p':          'National Association for Business, Economics, and Technology (NABET) Annual Conference · Co-authored with Dr. Satish M. Srinivasan',
    'pub.forthcoming': 'Presenting 2026',
    'pub.award':       '🏆 Best Paper Award',
    /* Engineering page */
    'eng.page.eyebrow': 'Production Engineering',
    'eng.page.h1':      'Pipelines & Engineering',
    'eng.page.desc':    'Production-grade cloud systems for collecting, enriching, and analyzing large-scale job market data — built on GCP, Apache Beam, and Vertex AI.',
    'proj1.meta':  'GCP Pipeline · In Production',
    'proj1.h3':    'Job Postings Intelligence Pipeline',
    'proj1.desc':  'A fully GCP-native pipeline collecting job postings across CS, MBA, Data Analytics, and AI domains from USAJobs and Jooble, scoring relevance, and mapping every role to O*NET 24.2 competency frameworks. Migrated from a Google Colab prototype to Cloud Run, BigQuery, and Cloud Scheduler, with a nine-phase interactive analytics dashboard and GitHub Actions auto-deploy.',
    'proj1.arch':  'USAJobs + Jooble → Cloud Run (collector) → Pub/Sub → Dataflow (Apache Beam) → BigQuery → Vertex AI AutoML → BQ Proxy → Dashboard',
    'proj2.meta':  'Independent Research · 2024 – Present',
    'proj2.h3':    'Religious Job Listings Dataset (RJLD)',
    'proj2.desc':  'A multi-source pipeline integrating IRS, Census, USDA, and SerpAPI data to track digital labor market participation among chaplains, pastors, clergy, and related roles. Features a fine-tuned RoBERTa multi-label classifier (four thematic labels: community_service, campus_ministry, spiritual_care, digital_facilitation) with an inter-annotator agreement gate (Cohen\'s κ ≥ 0.6) before model training.',
    'proj3.meta':  'PSU ROAR HPC · SLURM',
    'proj3.h3':    'Job Pipeline — ROAR HPC Variant',
    'proj3.desc':  'The GCP pipeline adapted for Penn State\'s ROAR supercomputer cluster. Replaces every managed cloud service with a local equivalent: DuckDB for BigQuery, POSIX file queue for Pub/Sub, SLURM sbatch for Cloud Scheduler, scikit-learn RandomForest for Vertex AI AutoML, and a Streamlit dashboard for Cloud Run.',
    /* Teaching page */
    'teach.page.eyebrow': 'Curriculum & Pedagogy',
    'teach.page.h1':      'Teaching & Pedagogy',
    'teach.page.desc':    'Graduate-level course design and ethics framework development at the intersection of AI systems and human-centered engineering.',
    'csc894.label': 'Graduate Course · Penn State Great Valley',
    'csc894.h3':    'CSC 894: Healthcare AI Capstone',
    'csc894.desc':  'A graduate-level Computer Science capstone built around HealthRiskAI — a fictional application that processes healthcare claims data through a GCP pipeline. Students move through the full production arc — data ingestion, model training, deployment, and monitoring — with HIPAA compliance, equity, and clinical stewardship considerations embedded directly in the design rubric.',
    'ethics.label': 'Ethics Framework',
    'ethics.h3':    'Clinical Stewardship & Design Equity Rubric',
    'ethics.desc':  'Developed as part of the CSC 894 capstone, this rubric operationalizes XAI ethics-by-design. It provides structured evaluation criteria for fairness audits, model explainability, and real-time pipeline oversight — translating abstract AI ethics principles into measurable engineering deliverables.',
    'engr.label':   'Certificate Program',
    'engr.h3':      'Engineering Leadership & Innovation Management',
    'engr.desc':    'Currently pursuing this Graduate Certificate alongside the Doctor of Engineering program at Penn State. Focuses on translating advanced engineering execution into strategic organizational leadership — directly informing the design of the Clinical Stewardship Rubric and CSC 894 curriculum.',
    /* Contact page */
    'contact.page.h1':   'Contact & Collaboration',
    'contact.page.desc': 'Open to research collaboration, speaking engagements, and conversations about AI, labor markets, and data engineering.',
    'contact.form.h2':   'Send a Message',
    'contact.direct.h2': 'Direct',
    'contact.h2':      'Contact',
    'contact.intro':   'I\'m happy to talk about AI and labor markets, research collaboration, or graduate coursework in applied AI. Say hi.',
    'contact.email':       'Email',
    'contact.location':    'Location',
    'contact.credentials': 'Credentials',
    'contact.affiliation': 'Affiliation',
    'contact.affiliation.val': 'The Pennsylvania State University · D.Eng. Program',
    'contact.form.name':   'Name',
    'contact.form.email':  'Email',
    'contact.form.submit': 'Send Message',
    'contact.success':     'Message sent — I\'ll be in touch.',
    'contact.error':       'Something went wrong — please email rpp5069@gmail.com directly.',
    /* Timeline */
    'timeline.h2': 'Timeline',
    'tl1.h3': 'Two Papers Accepted · NABET 2026',
    'tl1.p':  'Presenting "Building Trust in AI: Ethical Deployment and Regulatory Oversight in Healthcare" and "Impact and Current State of Artificial Intelligence in the Religious Market"',
    'tl2.h3': 'NABET Best Paper Award',
    'tl2.p':  '"Impact of Artificial Intelligence in the Healthcare Sector" · co-authored with Dr. Satish M. Srinivasan',
    'tl3.h3': 'Graduate Certificate · Business Process Integration · Penn State Great Valley',
    'tl3.p':  'IT system analysis, architecture, design, and implementation for business process needs',
    'tl4.h3': 'Graduate Certificate · Cyber Threat Analytics & Prevention · Penn State Great Valley',
    'tl4.p':  'Cyberattack analysis, cyber law, vulnerability assessment, threat detection and mitigation',
    'tl5.h3': 'M.S., Information Science · Penn State',
    'tl5.p':  'GPA 3.73 · Capstone: Real-time clinical decision support using Kafka, Flink, Spark, and Deep Learning',
    'tl6.h3': 'Research Assistant to Dr. Satish M. Srinivasan · The Pennsylvania State University',
    'tl6.p':  'AI in the workforce and labor markets · D.Eng. dissertation research',
    'tl7.h3': 'D.Eng. Candidate · The Pennsylvania State University',
    'tl7.p':  'AI & Workforce Analytics · Graduate Certificate in Engineering Leadership & Innovation Management (in progress)',
    'tl8.h3': 'Patient Services Associate / Care Coordinator · Asembia · ASPN Pharmacies',
    'tl8.p':  'Specialty medication access coordination in full HIPAA compliance; reduced prescription processing time 30% and prior authorization turnaround 25%',
    'tl9.h3': 'B.S., Information Sciences & Technology · Penn State Abington',
    'tl9.p':  'GPA 3.89 · Concentration: Human Physiology & Biology'
  },

  gu: {
    'nav.research':    'સંશોધન',
    'nav.engineering': 'એન્જિનિયરિંગ',
    'nav.teaching':    'શિક્ષણ',
    'nav.contact':     'સંપર્ક',
    'hero.eyebrow':    'D.Eng. ઉમેદવાર · Penn State University',
    'hero.tagline':    'cloud pipelines અને data models engineer કરીને વૈશ્વિક workforce ને AI કઈ રીતે બદલી રહ્યું છે — તે ઉઘાડ.',
    'hero.bio1':       'હું Penn State University ખાતે AI અને workforce analytics માં વિશેષ D.Eng. ઉમેદવાર છું. મારું સંશોધન large-scale employer demand data, NLP, અને production-grade cloud architectures ને જોડીને ઓળખે છે કે machine learning occupational skill sets ને કઈ રીતે બદલે છે — અને ડિજિટલ અર્થવ્યવસ્થામાં કોણ પાછળ રહી જઈ શકે.',
    'hero.bio2':       'Dr. Satish M. Srinivasan ના માર્ગદર્શન હેઠળ, મારું doctoral work GCP-native ETL pipelines બનાવવા પર ધ્યાન આપે છે. Equity, XAI, અને clinical stewardship ને champion કરતા data solutions develop કરવો મારો ઉત્સાહ છે.',
    'hero.award':      '૨૦૨૫ NABET શ્રેષ્ઠ સંશોધન-પત્ર — આરોગ્ય ક્ષેત્રમાં કૃત્રિમ બુદ્ધિની અસર',
    'cred.deng':  'D.Eng. ઉમેદવાર · Penn State',
    'cred.award': '🏆 NABET Best Paper Award 2025',
    'cred.ms':    'M.S. Information Science · GPA 3.73',
    'cred.cert':  'Graduate Certificate · Engineering Leadership & Innovation Mgmt',
    'stack.h2':   'Tech Stack',
    'news.h2':    'તાજેતરની પ્રવૃત્તિ',
    'pub1.h3': 'AI માં વિશ્વાસ બાંધવો: આરોગ્ય સેવામાં નૈતિક ઉપયોગ અને નિયમનકારી દેખરેખ',
    'pub1.p':  'National Association for Business, Economics, and Technology (NABET) Annual Conference · ૨૦૨૬ માં રજૂ',
    'pub2.h3': 'ધાર્મિક બજારમાં AI ની વર્તમાન સ્થિતિ અને અસર',
    'pub2.p':  'National Association for Business, Economics, and Technology (NABET) Annual Conference · ૨૦૨૬ માં રજૂ',
    'pub4.h3': 'હેલ્થકેરમાં Multi-Agentic AI ના આર્કિટેક્ચરલ પેટર્ન અને ઓર્કેસ્ટ્રેશન ફ્રેમવર્ક',
    'pub4.p':  'New Jersey Big Data Alliance (NJBDA) Annual Symposium',
    'pub4.badge':      'Lightning Talk 2026',
    'pub3.h3': 'આરોગ્ય ક્ષેત્રમાં કૃત્રિમ બુદ્ધિની અસર',
    'pub3.p':  'National Association for Business, Economics, and Technology (NABET) Annual Conference · Dr. Satish M. Srinivasan સાથે સહ-લેખન',
    'pub.forthcoming': '૨૦૨૬ માં રજૂ',
    'pub.award':       '🏆 શ્રેષ્ઠ સંશોધન-પત્ર',
    'tl1.h3': 'બે સંશોધન-પત્ર સ્વીકૃત · NABET 2026',
    'tl1.p':  '"AI માં વિશ્વાસ બાંધવો..." અને "ધાર્મિક બજારમાં AI..." ૨૦૨૬ NABET Conference માં રજૂ',
    'tl2.h3': 'NABET શ્રેષ્ઠ સંશોધન-પત્ર',
    'tl2.p':  '"Impact of Artificial Intelligence in the Healthcare Sector" · Dr. Satish M. Srinivasan સાથે સહ-લેખન',
    'tl7.h3': 'D.Eng. Candidate · The Pennsylvania State University',
    'tl7.p':  'AI & Workforce Analytics · Graduate Certificate in Engineering Leadership & Innovation Management (ચાલુ)',
    'contact.email':    'ઈ-મેઈલ',
    'contact.location': 'સ્થાન',
    'contact.credentials': 'પ્રમાણ-પત્ર',
    'contact.affiliation': 'સંસ્થા',
    'contact.affiliation.val': 'The Pennsylvania State University · D.Eng. કાર્યક્રમ',
    'pillar2.p2':    'Key finding: 27 રાજ્યોમાં મહત્વની inverse correlation (r = −0.402, p = 0.038): ઓછી median household income ધરાવતા રાજ્યોમાં digital spiritual-facilitation postings નો ઊંચો હિસ્સો જોવા મળ્યો.',
    'csc894.desc':   'GCP pipeline પર healthcare claims data process કરતી fictional HealthRiskAI application ની આસપાસ બનેલ graduate-level Computer Science capstone. Students data ingestion, model training, deployment, અને monitoring — HIPAA compliance, equity, અને clinical stewardship સાથે — ના full production arc માંથી પસાર થાય છે.',
    'contact.form.name':   'નામ',
    'contact.form.email':  'ઈ-મેઈલ',
    'contact.form.submit': 'સંદેશ મોકલો',
    'contact.success':     'સંદેશ મળ્યો — હું ટૂંક સમયમાં સંપર્ક કરીશ.',
    'contact.error':       'કંઈક ખોટું ગયું — કૃપા કરીને rpp5069@gmail.com પર સીધો સંપર્ક કરો.',
    'research.page.eyebrow': 'શૈક્ષણિક સંશોધન',
    'eng.page.eyebrow': 'પ્રોડક્શન એન્જિનિયરિંગ',
    'teach.page.eyebrow': 'અભ્યાસક્રમ અને શિક્ષણ શાસ્ત્ર',
    'pillar1.label': 'સંશોધન સ્તંભ 1',
    'pillar1.p1': 'મારું મૂળ doctoral work તપાસે છે કે AI અપનાવવાથી employers ખરેખર જે skills ની માંગ કરે છે તેની રચના કઈ રીતે બદલાય છે. GCP (BigQuery, Dataflow, Cloud Storage) પર production ETL pipelines ઉપયોગ કરીને, હું USAJobs અને Jooble માંથી longitudinal job posting data એકત્ર કરું છું, પછી CS, MBA, Data Analytics, અને AI domains માં occupational skill signals extract કરવા BERTopic અને LDA apply કરું છું.',
    'pillar1.p2': 'કેન્દ્રીય સંશોધન પ્રશ્ન: machine learning capabilities વિસ્તરે ત્યારે, કઈ human competencies દુર્લભ બને, કઈ નકામી બને, અને કઈ નવી hybrid skill clusters ઉભરી આવે? Cross-sector, longitudinal comparisons સક્ષમ કરવા દરેક role ને O*NET 24.2 competency frameworks સાથે mapped કરવામાં આવે છે.',
    'pillar1.stat': 'ચાર domains · 12 O*NET competency families · 2025 થી longitudinal',
    'pillar2.label': 'સંશોધન સ્તંભ 2',
    'pillar2.p1': 'સમાંતર સંશોધન thread digital labor platform access માં structural inequities ની તપાસ કરે છે — chaplains, clergy, અને pastoral staff ના spiritual facilitation roles માં. National, state, અને metro architectures માં IRS, Census, USDA, અને SerpAPI data ના આધારે, 27 U.S. states ને આવરી લઈ.',
    'pillar2.stat': 'r = −0.402 (p = 0.038) · 27 states · IRS + Census + USDA + SerpAPI',
    'proj1.meta': 'GCP Pipeline · Production માં',
    'proj1.desc': 'USAJobs અને Jooble માંથી CS, MBA, Data Analytics, અને AI domains માં job postings એકત્ર કરવા, relevance score કરવા, અને દરેક role ને O*NET 24.2 competency frameworks સાથે map કરવા fully GCP-native pipeline. Google Colab prototype માંથી Cloud Run, BigQuery, અને Cloud Scheduler પર migrate; nine-phase interactive analytics dashboard અને GitHub Actions auto-deploy સાથે.',
    'proj2.meta': 'સ્વતંત્ર સંશોધન · 2024 – વર્તમાન',
    'proj2.desc': 'Chaplains, pastors, clergy, અને સંબંધિત roles ના digital labor market participation ટ્રૅક કરવા IRS, Census, USDA, અને SerpAPI data ને integrate કરતો multi-source pipeline. Model training પહેલા inter-annotator agreement gate (Cohen\'s κ ≥ 0.6) સાથે fine-tuned RoBERTa multi-label classifier (ચાર thematic labels) ધરાવે.',
    'proj3.meta': 'PSU ROAR HPC · SLURM',
    'proj3.desc': 'Penn State\'s ROAR supercomputer cluster માટે adapted GCP pipeline. દરેક managed cloud service ને local equivalent સાથે replace: BigQuery માટે DuckDB, Pub/Sub માટે POSIX file queue, Cloud Scheduler માટે SLURM sbatch, Vertex AI AutoML માટે scikit-learn RandomForest, Cloud Run ને Streamlit dashboard.',
    'ethics.desc': 'CSC 894 capstone ના ભાગ રૂપે develop, આ rubric XAI ethics-by-design ને operationalize કરે. Fairness audits, model explainability, અને real-time pipeline oversight ના structured evaluation criteria provide — abstract AI ethics principles ને measurable engineering deliverables માં translate.',
    'engr.desc': 'Penn State ના Doctor of Engineering program સાથે સાથે આ Graduate Certificate pursue કરી રહ્યો છું. Advanced engineering execution ને strategic organizational leadership માં translate કરવા પર ધ્યાન — Clinical Stewardship Rubric અને CSC 894 curriculum ડિઝાઇનને directly inform.',
        'research.page.h1': 'સંશોધન અને પ્રકાશનો',
        'research.page.desc': 'AI-સંચાલિત શ્રમ બજાર પરિવર્તન પર ડૉક્ટરલ સંશોધન — મેક્રો કૌશલ્ય-માંગ ફેરફારોથી ડિજિટલ ઈક્વિટી સુધી',
        'pillar1.h3': 'મેક્રો શ્રમ બજાર ફેરફારો',
        'pillar2.h3': 'ડિજિટલ શ્રમ ઈક્વિટી અને આધ્યાત્મિક ઇકોસિસ્ટમ',
        'pubindex.h2': 'પ્રકાશનો',
        'eng.page.h1': 'પાઇપલાઇન્સ અને એન્જિનિયરિંગ',
        'eng.page.desc': 'મોટા પ્રમાણના જોબ માર્કેટ ડેટા એકત્ર કરવા, સમૃદ્ધ કરવા અને વિશ્લેષણ કરવા માટે પ્રોડક્શન-ગ્રેડ ક્લાઉડ સિસ્ટમ',
        'proj1.h3': 'જોબ પોસ્ટિંગ્સ ઇન્ટેલિજન્સ પાઇપલાઇન',
        'proj2.h3': 'ધાર્મિક જોબ લિસ્ટિંગ ડેટાસેટ (RJLD)',
        'proj3.h3': 'જોબ પાઇપલાઇન — ROAR HPC વેરિઅન્ટ',
        'teach.page.h1': 'અધ્યાપન અને શિક્ષણ શાસ્ત્ર',
        'teach.page.desc': 'AI સિસ્ટમ અને ડેટા ઇન્ફ્રાસ્ટ્રક્ચર ના છેદ પર ગ્રેજ્યુએટ-સ્તર કોર્સ ડિઝાઇન અને નૈતિક ફ્રેમવર્ક',
        'ethics.label': 'નૈતિકતા ફ્રેમવર્ક',
        'ethics.h3': 'ક્લિનિકલ સ્ટ્યૂઅર્ડશિપ અને ડિઝાઇન ઇક્વિટી રૂબ્રિક',
        'engr.label': 'પ્રમાણ પત્ર કાર્યક્રમ',
        'engr.h3': 'એન્જિનિયરિંગ નેતૃત્વ અને નવીનતા વ્યવસ્થાપન',
        'contact.page.h1': 'સંપર્ક અને સહયોગ',
        'contact.page.desc': 'AI, શ્રમ બજારો અને ડેટા એન્જિનિયરિંગ વિશે સંશોધન સહયોગ, ભાષણ જોડાણ અને વાર્તાલાપ માટે ખુલ્લા.',
        'contact.form.h2': 'સંદેશ મોકલો',
        'contact.direct.h2': 'સીધો સંપર્ક',
        'contact.h2': 'સંપર્ક',
        'contact.intro': 'AI અને શ્રમ બજારો, સંશોધન સહયોગ, અથવા ઉપયોગી AI માં ગ્રેજ્યુએટ અભ્યાસ વિશે વાત કરવામાં ખુશ છું. નમસ્તે.',
        'timeline.h2': 'સમયરેખા',
        'tl3.h3': 'ગ્રેજ્યુએટ સર્ટિફિકેટ · બિઝનેસ પ્રોસેસ ઇન્ટિગ્રેશન · Penn State Great Valley',
        'tl3.p': 'વ્યવસાય પ્રક્રિયા જરૂરિયાતો માટે IT સિસ્ટમ વિશ્લેષણ, આર્કિટેક્ચર, ડિઝાઇન અને અમલ',
        'tl4.h3': 'ગ્રેજ્યુએટ સર્ટિફિકેટ · સાઇબર થ્રેટ એનાલિટિક્સ અને નિવારણ · Penn State Great Valley',
        'tl4.p': 'સાઇબરઅટૅક વિશ્લેષણ, સાઇબર કાયદો, નબળાઈ મૂલ્યાંકન, ધ્રૂજ detection અને ઉપાય',
        'tl5.h3': 'M.S., ઇન્ફોર્મેશન સાયન્સ · Penn State',
        'tl5.p': 'GPA 3.73 · કૅપ્સ્ટોન: Kafka, Flink, Spark અને Deep Learning ઉપયોગ કરીને Real-time ક્લિનિકલ ડિસિઝ Support',
        'tl6.h3': 'ડૉ. Satish M. Srinivasan ને સંશોધન સહાયક · The Pennsylvania State University',
        'tl6.p': 'AI ના કર્મચારી ક્ષેત્ર અને શ્રમ બજારો · D.Eng. dissertation research',
        'tl8.h3': 'દર્દી સેવા સહયોગી / સ્વાસ્થ્ય સંકલનકાર · Asembia · ASPN Pharmacies',
        'tl8.p': 'HIPAA ના સંપૂર્ણ અનુપાલનમાં specialty medication access coordination; prescription processing time 30% ઘટ',
        'tl9.h3': 'B.S., Information Sciences & Technology · Penn State Abington',
        'tl9.p': 'GPA 3.89 · Concentration: Human Physiology & Biology',
  },

  hi: {
    'nav.research':    'शोध',
    'nav.engineering': 'इंजीनियरिंग',
    'nav.teaching':    'शिक्षण',
    'nav.contact':     'संपर्क',
    'hero.eyebrow':    'D.Eng. उम्मीदवार · Penn State University',
    'hero.tagline':    'cloud pipelines और data models engineer करके विश्वव्यापी workforce को AI कैसे बदल रहा है — यह उजागर करना।',
    'hero.bio1':       'मैं Penn State University में AI और workforce analytics में विशेषज्ञ D.Eng. उम्मीदवार हूँ। मेरा शोध large-scale employer demand data, NLP, और production-grade cloud architectures को जोड़कर पहचानता है कि machine learning occupational skill sets को कैसे बदलती है।',
    'hero.bio2':       'Dr. Satish M. Srinivasan के मार्गदर्शन में, मेरा doctoral work GCP-native ETL pipelines बनाने पर केंद्रित है। Equity, XAI, और clinical stewardship को champion करने वाले data solutions develop करना मेरा जुनून है।',
    'hero.award':      '2025 NABET सर्वश्रेष्ठ शोध-पत्र — स्वास्थ्य क्षेत्र में कृत्रिम बुद्धिमत्ता का प्रभाव',
    'cred.deng':  'D.Eng. उम्मीदवार · Penn State',
    'cred.award': '🏆 NABET Best Paper Award 2025',
    'cred.ms':    'M.S. Information Science · GPA 3.73',
    'cred.cert':  'Graduate Certificate · Engineering Leadership & Innovation Mgmt',
    'stack.h2':   'Tech Stack',
    'news.h2':    'हालिया गतिविधि',
    'pub1.h3': 'AI में विश्वास बनाना: स्वास्थ्य सेवा में नैतिक तैनाती और नियामक देखरेख',
    'pub1.p':  'National Association for Business, Economics, and Technology (NABET) Annual Conference · 2026 में प्रस्तुत',
    'pub2.h3': 'धार्मिक बाजार में कृत्रिम बुद्धि की वर्तमान स्थिति और प्रभाव',
    'pub2.p':  'National Association for Business, Economics, and Technology (NABET) Annual Conference · 2026 में प्रस्तुत',
    'pub4.h3': 'स्वास्थ्य सेवा में Multi-Agentic AI के आर्किटेक्चरल पैटर्न और ऑर्केस्ट्रेशन फ्रेमवर्क',
    'pub4.p':  'New Jersey Big Data Alliance (NJBDA) Annual Symposium',
    'pub4.badge':      'Lightning Talk 2026',
    'pub3.h3': 'स्वास्थ्य क्षेत्र में कृत्रिम बुद्धिमत्ता का प्रभाव',
    'pub3.p':  'National Association for Business, Economics, and Technology (NABET) Annual Conference · Dr. Satish M. Srinivasan के साथ सह-लेखन',
    'pub.forthcoming': '2026 में प्रस्तुत',
    'pub.award':       '🏆 सर्वश्रेष्ठ शोध-पत्र',
    'tl1.h3': 'दो शोध-पत्र स्वीकृत · NABET 2026',
    'tl1.p':  '"AI में विश्वास बनाना..." और "धार्मिक बाजार में AI..." 2026 NABET Conference में प्रस्तुत',
    'tl2.h3': 'NABET सर्वश्रेष्ठ शोध-पत्र पुरस्कार',
    'tl2.p':  '"Impact of Artificial Intelligence in the Healthcare Sector" · Dr. Satish M. Srinivasan के साथ सह-लेखन',
    'tl7.h3': 'D.Eng. Candidate · The Pennsylvania State University',
    'tl7.p':  'AI & Workforce Analytics · Graduate Certificate in Engineering Leadership & Innovation Management (प्रगति में)',
    'contact.email':    'ईमेल',
    'contact.location': 'स्थान',
    'contact.credentials': 'प्रमाण-पत्र',
    'contact.affiliation': 'संस्था',
    'contact.affiliation.val': 'The Pennsylvania State University · D.Eng. कार्यक्रम',
    'pillar2.p2':    'Key finding: 27 राज्यों में महत्वपूर्ण inverse correlation (r = −0.402, p = 0.038): कम median household income वाले राज्यों में digital spiritual-facilitation postings का उच्च अनुपात देखा गया।',
    'csc894.desc':   'GCP pipeline पर healthcare claims data process करने वाले काल्पनिक HealthRiskAI application के इर्द-गिर्द बना graduate-level Computer Science capstone। Students HIPAA compliance, equity, और clinical stewardship के साथ — data ingestion, model training, deployment, और monitoring के पूरे production arc से गुज़रते हैं।',
    'contact.form.name':   'नाम',
    'contact.form.email':  'ईमेल',
    'contact.form.submit': 'संदेश भेजें',
    'contact.success':     'संदेश मिला — मैं जल्द ही संपर्क करूँगा।',
    'contact.error':       'कुछ गलत हो गया — कृपया rpp5069@gmail.com पर सीधे ईमेल करें।',
    'research.page.eyebrow': 'शैक्षणिक शोध',
    'eng.page.eyebrow': 'उत्पादन इंजीनियरिंग',
    'teach.page.eyebrow': 'पाठ्यक्रम और शिक्षाशास्त्र',
    'pillar1.label': 'शोध स्तंभ 1',
    'pillar1.p1': 'मेरा मूल doctoral work जाँचता है कि AI अपनाने से employers वास्तव में जिन skills की माँग करते हैं उनकी संरचना कैसे बदलती है। GCP (BigQuery, Dataflow, Cloud Storage) पर production ETL pipelines का उपयोग करके, मैं USAJobs और Jooble से longitudinal job posting data एकत्र करता हूँ, फिर CS, MBA, Data Analytics, और AI domains में occupational skill signals निकालने के लिए BERTopic और LDA apply करता हूँ।',
    'pillar1.p2': 'केंद्रीय शोध प्रश्न: जैसे-जैसे machine learning capabilities विस्तरित होती हैं, कौन सी human competencies दुर्लभ होती हैं, कौन सी अनावश्यक, और कौन से नए hybrid skill clusters उभरते हैं? Cross-sector, longitudinal comparisons सक्षम करने के लिए हर role को O*NET 24.2 competency frameworks से map किया जाता है।',
    'pillar1.stat': 'चार domains · 12 O*NET competency families · 2025 से longitudinal',
    'pillar2.label': 'शोध स्तंभ 2',
    'pillar2.p1': 'समानांतर शोध thread spiritual facilitation roles — chaplains, clergy, और pastoral staff — के बीच digital labor platform access में structural inequities की जाँच करता है। National, state, और metro architectures में IRS, Census, USDA, और SerpAPI data पर आधारित, विश्लेषण 27 U.S. states को कवर करता है।',
    'pillar2.stat': 'r = −0.402 (p = 0.038) · 27 states · IRS + Census + USDA + SerpAPI',
    'proj1.meta': 'GCP Pipeline · उत्पादन में',
    'proj1.desc': 'USAJobs और Jooble से CS, MBA, Data Analytics, और AI domains में job postings एकत्र करने, relevance score करने, और हर role को O*NET 24.2 competency frameworks से map करने के लिए fully GCP-native pipeline। Google Colab prototype से Cloud Run, BigQuery, और Cloud Scheduler पर migrate; nine-phase interactive analytics dashboard और GitHub Actions auto-deploy के साथ।',
    'proj2.meta': 'स्वतंत्र शोध · 2024 – वर्तमान',
    'proj2.desc': 'Chaplains, pastors, clergy, और संबंधित roles की digital labor market participation track करने के लिए IRS, Census, USDA, और SerpAPI data को integrate करने वाला multi-source pipeline। Model training से पहले inter-annotator agreement gate (Cohen\'s κ ≥ 0.6) के साथ fine-tuned RoBERTa multi-label classifier (चार thematic labels) शामिल।',
    'proj3.meta': 'PSU ROAR HPC · SLURM',
    'proj3.desc': 'Penn State\'s ROAR supercomputer cluster के लिए adapted GCP pipeline। हर managed cloud service को local equivalent से replace: BigQuery के लिए DuckDB, Pub/Sub के लिए POSIX file queue, Cloud Scheduler के लिए SLURM sbatch, Vertex AI AutoML के लिए scikit-learn RandomForest, Cloud Run के लिए Streamlit dashboard।',
    'ethics.desc': 'CSC 894 capstone के हिस्से के रूप में developed, यह rubric XAI ethics-by-design को operationalize करता है। Fairness audits, model explainability, और real-time pipeline oversight के लिए structured evaluation criteria — abstract AI ethics principles को measurable engineering deliverables में translate करता है।',
    'engr.desc': 'Penn State के Doctor of Engineering program के साथ-साथ यह Graduate Certificate pursue कर रहा हूँ। Advanced engineering execution को strategic organizational leadership में translate करने पर focus — Clinical Stewardship Rubric और CSC 894 curriculum design को directly inform करता है।',
        'research.page.h1': 'शोध और प्रकाशन',
        'research.page.desc': 'AI-संचालित श्रम बाज़ार परिवर्तन पर डॉक्टरल शोध — मैक्रो कौशल-मांग बदलावों से डिजिटल इक्विटी तक',
        'pillar1.h3': 'मैक्रो श्रम बाज़ार बदलाव',
        'pillar2.h3': 'डिजिटल श्रम इक्विटी और आध्यात्मिक पारिस्थितिकी तंत्र',
        'pubindex.h2': 'प्रकाशन',
        'eng.page.h1': 'पाइपलाइन और इंजीनियरिंग',
        'eng.page.desc': 'बड़े पैमाने पर जॉब मार्केट डेटा एकत्र करने, समृद्ध करने और विश्लेषण करने के लिए उत्पादन-ग्रेड क्लाउड सिस्टम',
        'proj1.h3': 'जॉब पोस्टिंग्स इंटेलिजेंस पाइपलाइन',
        'proj2.h3': 'धार्मिक जॉब लिस्टिंग डेटासेट (RJLD)',
        'proj3.h3': 'जॉब पाइपलाइन — ROAR HPC वेरिएंट',
        'teach.page.h1': 'शिक्षण और शिक्षाशास्त्र',
        'teach.page.desc': 'AI सिस्टम और डेटा इन्फ्रास्ट्रक्चर के संगम पर स्नातक-स्तरीय पाठ्यक्रम डिज़ाइन और नैतिक ढांचा',
        'ethics.label': 'नैतिकता ढांचा',
        'ethics.h3': 'क्लिनिकल स्टीवर्डशिप और डिज़ाइन इक्विटी रूब्रिक',
        'engr.label': 'प्रमाणपत्र कार्यक्रम',
        'engr.h3': 'इंजीनियरिंग नेतृत्व और नवाचार प्रबंधन',
        'contact.page.h1': 'संपर्क और सहयोग',
        'contact.page.desc': 'AI, श्रम बाज़ारों और डेटा इंजीनियरिंग के बारे में शोध सहयोग, वक्तव्य और बातचीत के लिए खुला हूँ।',
        'contact.form.h2': 'संदेश भेजें',
        'contact.direct.h2': 'प्रत्यक्ष',
        'contact.h2': 'संपर्क',
        'contact.intro': 'AI और श्रम बाज़ारों, शोध सहयोग, या एप्लाइड AI में स्नातक पाठ्यक्रम के बारे में बात करने में खुशी होगी। नमस्ते।',
        'timeline.h2': 'समयरेखा',
        'tl3.h3': 'स्नातक प्रमाणपत्र · व्यवसाय प्रक्रिया एकीकरण · Penn State Great Valley',
        'tl3.p': 'व्यवसाय प्रक्रिया आवश्यकताओं के लिए IT सिस्टम विश्लेषण, आर्किटेक्चर, डिज़ाइन और कार्यान्वयन',
        'tl4.h3': 'स्नातक प्रमाणपत्र · साइबर थ्रेट एनालिटिक्स और रोकथाम · Penn State Great Valley',
        'tl4.p': 'साइबरअटैक विश्लेषण, साइबर कानून, भेद्यता मूल्यांकन, खतरे का पता लगाना और शमन',
        'tl5.h3': 'M.S., सूचना विज्ञान · Penn State',
        'tl5.p': 'GPA 3.73 · कैपस्टोन: Kafka, Flink, Spark और Deep Learning का उपयोग करके रियल-टाइम क्लिनिकल निर्णय समर्थन',
        'tl6.h3': 'डॉ. Satish M. Srinivasan के शोध सहायक · The Pennsylvania State University',
        'tl6.p': 'कार्यबल और श्रम बाज़ारों में AI · D.Eng. शोध प्रबंध',
        'tl8.h3': 'रोगी सेवा सहयोगी / देखभाल समन्वयक · Asembia · ASPN Pharmacies',
        'tl8.p': 'HIPAA के पूर्ण अनुपालन में विशेषता दवा पहुँच समन्वय; नुस्खा प्रसंस्करण समय 30% कम किया',
        'tl9.h3': 'B.S., Information Sciences & Technology · Penn State Abington',
        'tl9.p': 'GPA 3.89 · एकाग्रता: Human Physiology & Biology',
  }
};

// ── Language switching ────────────────────────────────────────────────────
var _lang = localStorage.getItem('rp-lang') || 'en';

window.setLang = function (lang) {
  _lang = lang;
  localStorage.setItem('rp-lang', lang);
  document.documentElement.lang = lang;
  ['en','gu','hi'].forEach(function (l) {
    var btn = document.getElementById('lang-' + l);
    if (!btn) return;
    btn.classList.toggle('active', l === lang);
    btn.setAttribute('aria-pressed', l === lang ? 'true' : 'false');
  });
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    var key = el.getAttribute('data-i18n');
    var val = I18N[lang] && I18N[lang][key];
    if (val !== undefined) el.textContent = val;
  });
};

document.addEventListener('DOMContentLoaded', function () {
  setLang(_lang);
  ['en','gu','hi'].forEach(function (l) {
    var btn = document.getElementById('lang-' + l);
    if (btn) btn.classList.toggle('active', l === _lang);
  });
});
