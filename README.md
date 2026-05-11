# UMass Boston CS Website Update (CS410 Project)

This repository contains changes we made as a group to update the CS website for our long project.

The live site can be viewed at: **[https://tseer.github.io/cs-website/](https://tseer.github.io/cs-website/)**

## Delivered Features & Team Contributions

### 1. Site Architecture, AI Readiness & Search (Austin)
- **Modernized Jekyll Architecture:** Modernized Jekyll site structure using layouts, includes, SCSS, YAML data, and collection content.
- **Course & Metadata Standardization:** Standardized course pages with structured front matter for course code, name, credits, prerequisites, and descriptions. Structured people, group, program, and resource metadata for consistent rendering and discovery.
- **Search & JSON-LD:** Added JSON-LD metadata for pages, courses, and people to ensure better search accuracy and more reliable AI responses. Implemented a static client-side search interface (`/search`) with a local in-browser index.
- **Course Offerings Generator:** Built an automated Python pipeline (`scripts/build_course_offerings.py`) to generate course-offering data from schedule spreadsheets.
- **Faculty Profiles:** Faculty cards intenttionally link to generated internal profile pages to keep navigation consistent while supporting structured data.
- **Chimera HPC:** Added a dedicated page for the Chimera HPC.

### 2. Interactive Prerequisite Chart & Decap CMS (Tsering)
- **Interactive Prerequisite Chart ([Live](https://tseer.github.io/cs-website/planner)):** Built a dynamic, interactive visual chart (`/planner`) using Cytoscape.js to easily visualize course requirements. Students can click on a course node to open an info panel with the full course descrisption, and live schedule that is fetch from umb catalog. Also, selecting a course highlkights the connecting edges (arrows) to show what course it unlock.
- Branch: tse/interactive-prereq-chart

- **Decap CMS Admin Dashboard:** Created early in the project to add a user-friendly admin dashboard. Configured `admin/config.yml` to map Jekyll collections and enabled GitHub authentication, allowing non-technical users to update content safely. *Note: This feature is currently on a separate branch (`tse-add-cms`) and has not yet been merged to `main`.*

### 3. Office Map Improvements (Calvin)
- **Interactive Map Updates:** Updated the CS department map to be more interactive, allowing students to easily locate exactly what building and room professor offices are in directly from the map.
- Branch: calvin/interactive-map
  
### 4. CS Server Guide (Krina)
- **Dedicated Server Guide ([Live](https://tseer.github.io/cs-website/cs-server-guide)):** Created a beginner-friendly guide covering basic terminal commands, programming examples, and step-by-step instructions for utilizing the CS servers.

### 5. Homepage Redesign (Apurva)
- **Homepage UI:** Modernized the homepage UI, improving the overall layout, visual design.
- Branch: homepage-update1
---

## Technical Details

### Course Offerings Maintenance(Austin feature)

**Important maintenance note:** Adding or updating schedule spreadsheet files does not automatically update the website. After any course-offering spreadsheet is added, removed, renamed, or edited, you must rerun the generator before rebuilding/deploying the site:

```bash
python3 scripts/build_course_offerings.py
```
This is a major design point of the catalog system: future maintainers can keep the catalog current by dropping in new schedule XLSX files, rerunning the generator, and then rebuilding the static Jekyll site. If this script is not rerun, `_data/course_offerings.yml` will remain stale.

### Local Build Instructions

Serve locally:
```bash
bundle exec jekyll serve
```
## Contributors

**Current Team (CS410 Project):**
- Apurva (Homepage UI)
- Austin Ashworth (Search, Structured Data, Course Generator)
- Calvin (Interactive Map)
- Krina (CS Server Guide)
- Tsering (Decap CMS, Prerequisite Chart)

*Original Spring 2021 CS410.net team:* John Kilfeather, Jeffrey Handorff, Yiming Jin, Dennis Popovs, Duyanh Nguyen, Ritesh Shah, Ananya Jude, Sinan Liu, Jonathan Ohop.

*Spring 2024 modernization team:* Branden Favre, Riley Choquette, Khushbu Kapadia, Mehya N. Tambi, Bhavana Manneni, Jacob Jashwanth Patoju.

See `WEB/about/thankyou.markdown` for the full in-site attribution page.

## License

No repository license file is currently present.
