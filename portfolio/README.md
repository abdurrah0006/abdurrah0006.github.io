# Abdur Rahman: Portfolio

A React + Vite portfolio with three switchable designs (Atelier, Formal, Retro),
light and dark modes, and it respects the system reduced-motion setting.

## Run it

```bash
npm install
npm run dev       # local development
npm run build     # production build into dist/
npm run deploy    # builds and publishes dist/ with gh-pages
```

## Editing content

Everything you read on the site lives in `src/data/`:

| File | What it controls |
| --- | --- |
| `profileData.js` | name, title, about, services, hero and home-page content |
| `pagesData.js` | headings and copy for the inner pages |
| `projectsData.js` | every project and its case study |
| `experienceData.js` | internships, education and certifications |
| `skillsData.js` | skill categories |
| `contactData.js` | email, socials, contact page and form text |
| `themeData.js` | the three designs (colours here must match `styles/themes.css`) |

`profileData.home.selectedProjects` picks the five headline projects on the home
page, and `moreProjectsCount` sets how many more appear under "More explorations".
