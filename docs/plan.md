# Website Design Plan
(Multi-page site · Chinese/English bilingual · Strapi headless CMS)

---

## 1. Project Overview

| Item | Description |
|---|---|
| Site type | Multi-page website (Home + 4 dedicated sections) |
| Core sections | Home, Organization, Conference Schedule, Call for Papers, Past Conferences |
| Language support | Chinese / English, switchable |
| Visual tone | Blue, white, gray — clean, professional, academic |
| Frontend | Standalone frontend app, consuming data from Strapi |
| Backend/CMS | Strapi (headless CMS; content and presentation decoupled, non-technical staff can update content independently) |

The reference site is used only for its section structure — its visual design is not reused.

---

## 2. Information Architecture (Sitemap)

```
/ (Home)
├── /about (Organization)
│   ├── Overview
│   ├── Organizational Structure
│   ├── Leadership
│   └── Member Institutions
├── /schedule (Conference Schedule)
│   ├── Current conference info (dates / venue / theme)
│   ├── Agenda (by day / time slot)
│   └── Speakers
├── /call-for-papers (Call for Papers)
│   ├── List of active notices
│   ├── Notice detail (deadline, downloadable attachments)
│   └── Archive of past notices (optional)
└── /past-conferences (Past Conferences)
    ├── List of past conferences (by year)
    └── Individual conference detail (recap, materials, gallery)
```

Language switching does not change the section structure — only the `/zh/...` vs `/en/...` prefix (see Section 5).

---

## 3. Page-by-Page Content Plan

### 1. Home
- **Top nav bar**: Logo + 5 primary menu items + language switch
- **Hero section**: Key visual + title/subtitle + one-line tagline (e.g. current conference promo line)
- **Featured conference banner** (optional): Countdown + "View Schedule / Submit Now" CTA when a conference is upcoming
- **Organization intro card**: 3–4 sentence overview + "Learn more" link to Organization page
- **Organization video**: Embedded video introducing the organization (autoplay-off, with poster/cover image, captions in both languages recommended)
- **Chairman's welcome speech**: Embedded video message from the Chairman, shown with his name/title and a short intro line; can sit right below or beside the organization video as a two-video module
- **Highlights module**: e.g. number of member countries, number of conferences held, attendee count (icon + number + label)
- **Latest updates**: Pull the 3–5 most recent Call for Papers / conference-related items as cards
- **Past conferences preview**: Horizontal scroll of 3–4 past conference thumbnails, linking to Past Conferences page
- **Footer**: Contact info, address, social links, registration/compliance info

> Video hosting note: for mainland China accessibility, host video files directly on Strapi's Media Library (self-hosted) or a China-accessible CDN, rather than YouTube/Vimeo embeds, which may be blocked or slow to load for local visitors.

### 2. Organization
- Organization overview (rich text, bilingual)
- Organizational structure diagram (image or simple hierarchical cards)
- Leadership list: photo + name + title + bio (expandable)
- Member institutions: logo wall + institution name + country/region + short description

### 3. Conference Schedule
- Basic conference info: name, dates, venue, theme
- Agenda table: tabbed by day, timeline view per day (time / session title / speaker / location)
- Speaker list (photo + name + title + bio, optional)
- If no conference is currently being organized, show "Stay tuned" + link to Past Conferences

### 4. Call for Papers
- Notice list: title, publish date, deadline, status tag (active / closed)
- Notice detail page: rich text body + attachment downloads (application form/template, etc.) + related conference info
- Suggested: a "Key Dates" timeline module (submission deadline, review results announcement, etc.)

### 5. Past Conferences
- Reverse-chronological list of conference cards: cover image, edition number, year, location, one-line summary
- Individual conference detail page: recap text, archived agenda, photo gallery, proceedings/materials download link

---

## 4. Visual Design

### Color Palette

| Purpose | Color | Reference Hex |
|---|---|---|
| Primary (emphasis, buttons, links) | Deep blue | `#1B3A6B` |
| Secondary blue (hover, icons, gradients) | Mid blue | `#2C6CB0` |
| Primary background | White | `#FFFFFF` |
| Secondary background (sections, card backgrounds) | Light gray | `#F5F6F8` |
| Body text | Dark gray | `#333B45` |
| Secondary/caption text | Mid gray | `#6B7280` |
| Dividers/borders | Light gray line | `#E2E5EA` |
| Black (deep contrast, headings, video overlays) | Black | `#0A0A0A` |

Style guidance: generous whitespace, blue used as an accent (buttons, title underlines, icons) rather than large color blocks — keeping the restrained, professional look expected of an academic organization. Black is used sparingly, mainly for high-contrast elements: main headline text, the dark overlay/play-button treatment on video thumbnails, and footer background — it should read as a grounding accent, not compete with the blue as primary color.

### Typography
- Chinese: Source Han Sans / PingFang for body text; a slightly heavier weight for headings to build hierarchy
- English: Inter / Roboto, matched in size/line-height with the Chinese type to avoid visual mismatch in mixed-language layouts

### Layout
- Responsive design, breakpoints: Desktop (≥1200px) / Tablet (768–1199px) / Mobile (<768px)
- Horizontal nav on desktop, collapsible hamburger menu on mobile
- Card-based layout throughout (news cards, conference cards, notice cards) with consistent corner radius and shadow rules

---

## 5. Bilingual (Chinese/English) Approach

- **Routing**: `/zh/...` and `/en/...` prefixes distinguish language versions; default language can be set to Chinese, with a 302 redirect to the default when no locale matches
- **Switching UX**: Switching language keeps the user on the same page (e.g. `/zh/schedule` ↔ `/en/schedule`), rather than redirecting to the homepage
- **Content layer**: All editable content (titles, body text, nav labels, etc.) is maintained per locale (`zh-Hans` / `en`) via Strapi's built-in **Internationalization (i18n) plugin**; non-text fields (images, dates) are shared across locales
- **SEO**: Each page includes `hreflang` tags for its language version to help search engines index both languages correctly

---

## 6. Technical Architecture

```
┌──────────────┐        REST/GraphQL API        ┌──────────────┐
│   Frontend    │  ─────────────────────────────▶ │   Strapi CMS │
│ (Next.js rec.) │ ◀───────────────────────────── │  (Node.js)   │
└──────────────┘                                  └──────────────┘
      │                                                  │
      │ Static assets/images                             │ Content storage
      ▼                                                  ▼
   CDN/Hosting                                     Database (PostgreSQL/
                                                     MySQL/SQLite)
```

- **Frontend**: Next.js (React) is recommended, because it:
  - Supports SSR/static generation (SSG/ISR), which is good for SEO and initial load speed
  - Has built-in i18n routing that pairs naturally with Strapi's i18n
  - Has a mature ecosystem, making it easy to add new sections later
- **Backend**: Strapi (self-hosted, Node.js + PostgreSQL recommended for production)
  - Enable the **Internationalization (i18n)** plugin
  - Enable **Users & Permissions**, exposing public read-only endpoints for the frontend
  - Rich text editor (Markdown/rich text) for notices, bios, descriptions, etc.
- **Hosting notes**: If the primary audience is in mainland China:
  - Servers hosted in mainland China require ICP registration (备案) before going live
  - If using overseas hosting (e.g. Vercel + overseas Strapi hosting), test mainland access speed and add a CDN if needed

---

## 7. Strapi Content Model Design

All content types below have i18n enabled. Fields marked "localized" are maintained separately per locale; unmarked fields are shared across both languages.

### 1. Global (Single Type) — Site-wide Settings
| Field | Type | Notes |
|---|---|---|
| siteName | Text (localized) | Site name |
| logo | Media | Site logo |
| navLabels | Component (repeatable, localized) | Nav menu labels and links |
| footerAbout | Rich text (localized) | Footer summary |
| contactEmail / contactPhone | Text | Contact details |
| address | Text (localized) | Address |
| socialLinks | Component (repeatable) | Platform name + URL |

### 2. HomePage (Single Type)
| Field | Type | Notes |
|---|---|---|
| heroTitle / heroSubtitle | Text (localized) | Home hero title/subtitle |
| heroImage | Media | Hero image |
| introText | Rich text (localized) | Organization intro |
| orgVideo | Media (video) | Organization introduction video (shared across locales) |
| orgVideoCaption | Text (localized) | Caption/label shown under the organization video |
| chairmanVideo | Media (video) | Chairman's welcome speech video (shared across locales) |
| chairmanVideoCaption | Text (localized) | Caption, e.g. Chairman's name/title + short intro line |
| highlights | Component (repeatable, localized) | Icon + number + label |
| featuredConference | Relation → Conference | Powers the home banner/countdown |

### 3. OrgOverview (Single Type)
| Field | Type | Notes |
|---|---|---|
| introText | Rich text (localized) | Organization overview |
| structureImage | Media | Org structure diagram |

### 4. Leader (Collection Type)
| Field | Type | Notes |
|---|---|---|
| name | Text (localized) | Full name (note surname order for EN) |
| title | Text (localized) | Position/title |
| photo | Media | Headshot |
| bio | Rich text (localized) | Bio |
| order | Number | Sort order |

### 5. MemberInstitution (Collection Type)
| Field | Type | Notes |
|---|---|---|
| name | Text (localized) | Institution name |
| country | Text | Country/region |
| logo | Media | Institution logo |
| description | Rich text (localized) | Description |
| website | Text | Institution website URL |
| order | Number | Sort order |

### 6. Conference (Collection Type) — powers both "Conference Schedule" and "Past Conferences"
| Field | Type | Notes |
|---|---|---|
| title | Text (localized) | Conference name |
| year | Number | Year/edition number |
| startDate / endDate | Date | Dates |
| location | Text (localized) | Venue |
| status | Enum (upcoming / current / past) | Distinguishes Schedule vs Past Conferences display |
| description | Rich text (localized) | Overview/recap |
| coverImage | Media | Cover image |
| gallery | Media (multiple) | Photo gallery |
| agendaItems | Component (repeatable, localized) | date / time / session title / speaker / location |
| speakers | Component (repeatable, localized) | name / title / photo / bio |
| attachments | Media (multiple) | Conference materials/proceedings download |

> **Conference Schedule** page = query `status = current/upcoming`, latest matching Conference entry.
> **Past Conferences** page = query `status = past`, list all entries sorted by year descending.

### 7. Notice (Collection Type) — Call for Papers
| Field | Type | Notes |
|---|---|---|
| title | Text (localized) | Notice title |
| publishDate | Date | Publish date |
| deadline | Date | Submission deadline |
| body | Rich text (localized) | Body content |
| attachments | Media (multiple) | Attachments (application form, etc.) |
| relatedConference | Relation → Conference | Related conference |
| status | Enum (active / closed) | Whether the call is still open |

---

## 8. Frontend–Backend Integration

- Data fetching: Frontend calls Strapi's REST API (e.g. `/api/conferences?filters[status]=past&sort=year:desc&populate=*`), passing `locale=zh-Hans` or `locale=en` for the language version
- Media: Image URLs from Strapi's Media Library are consumed directly by the frontend, or served via CDN
- Permissions: Only "read-only" public access is granted to the frontend; all content entry/editing happens through the Strapi admin panel, no developer involvement needed for content updates

---

## 9. Recommended Implementation Order

1. Finalize the Strapi content model (Section 7) and build it out in Strapi
2. Enter initial content (organization info, first/past conference materials, etc.)
3. Build frontend pages per the information architecture (Section 2) — Chinese first, then enable English locale after integration testing
4. Refine visuals: build a component library (nav, cards, buttons) per the color/typography spec in Section 4
5. Test bilingual switching and mobile responsiveness
6. Confirm hosting plan before launch (ICP registration/CDN — see Section 6)

---

Happy to go deeper on any section — wireframes for a specific page, step-by-step Strapi content-type setup, or visual mockups for frontend components.