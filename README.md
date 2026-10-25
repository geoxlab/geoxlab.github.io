# GeoX Lab

A responsive website for GeoX Lab at The Hong Kong Polytechnic University, presenting the lab’s research, people, teaching, news, and opportunities.

Built with HTML, CSS, and vanilla JavaScript. No framework, build step, database, or package installation is required.

## Pages

| Page | Content |
| --- | --- |
| [Home](index.html) | Principal investigator introduction, lab overview, five research directions, latest news, activity photographs, and opportunities |
| [About](about.html) | Xintao Liu’s biography, research interests, contact details, and geographic journey |
| [People](people.html) | Faculty, postdoctoral fellows, PhD students, and past students |
| [Research](research.html) | Funded projects, research descriptions, related publications, and demonstration videos |
| [Teaching](teaching.html) | Teaching areas and courses |
| [News](news.html) | Conference updates and lab announcements |
| [Openings](openings.html) | Research and doctoral opportunities |
| [Publications](publications.html) | Publication links and a section reserved for the complete publication list |

## Features

- Responsive layouts with mobile navigation.
- Blue and gold visual identity with white and warm grey backgrounds.
- Five illustrated research directions arranged in alternating image and text layouts.
- Scroll-triggered fade-in animations, with support for reduced motion preferences.
- Activity slideshow with automatic playback, pause controls, keyboard navigation, and swipe gestures.
- Research image enlargement and locally stored demonstration videos.
- Core page content remains readable without JavaScript.

## Project structure

```text
.
├── index.html
├── about.html
├── people.html
├── research.html
├── teaching.html
├── news.html
├── openings.html
├── publications.html
├── css/
│   ├── style.css              # Base styles and responsive layouts
│   └── people-home.css        # Custom layouts and visual refinements
├── js/
│   └── script.js              # Navigation, reveal animations, image viewer, slideshow
├── assets/
│   ├── research-dimensions/   # SVG concept illustrations
│   └── …                     # Photographs, icons, and research media
└── README.md
```

## Local preview

Download or clone the repository and open `index.html` in a modern browser. Keep the directory structure intact so that images, stylesheets, scripts, and videos can load.

A static web server can also serve this directory directly. The site uses relative asset paths and does not require a build command. External conference, publication, profile, and download links require an internet connection.

## Editing the website

### Text and page content

Edit the relevant HTML file. Content is written directly in the pages; there is no CMS or content generation step.

The header and navigation appear in each page. When changing a shared navigation item, update the other pages as well and keep the current-page state consistent.

### Styles

`css/style.css` defines the base layout and shared colour variables. `css/people-home.css` contains custom component styles and responsive refinements.

| Role | Colour |
| --- | --- |
| Navy text and dark panels | `#203B55` |
| Gold headings and accents | `#C6A75E` |
| Header and light section backgrounds | `#E5E1DD` |
| Main background | `#FFFFFF` |

### Photographs and illustrations

Store media in `assets/` and update the corresponding `src` attributes and descriptive alternative text in the HTML.

The homepage slideshow is defined in `index.html` using `.activity-slide` elements. When adding or removing slides, also update the slide indicators and accessible slide labels. Playback and controls are managed by `js/script.js`.

The illustrations in `assets/research-dimensions/` are conceptual diagrams of the lab’s research themes, rather than measured data or research results.

### Research media

Research images and videos are referenced from `research.html`. Preserve their relative file paths when reorganising media.

## Repository contents

This directory is the standalone website. Its contents can be placed directly at the repository root, with `index.html`, `css/`, `js/`, and `assets/` at the same level.

Development archives, intermediate files, dependency folders, and distribution ZIP files are not needed to run the website and are not part of this site directory.

## Content and credits

Lab information is based on the GeoX Lab source website and materials supplied for this project. Activity photographs and the updated lab overview were supplied by the project owner. The geographic journey map uses Natural Earth geographic data.

The complete publication list remains a content item to be supplied and maintained by the lab.
