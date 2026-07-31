# Memory

Eine kleine, browserbasierte Memory-Anwendung mit mehreren Themes, einer eigenen Settings-Seite und einem klassischen Spielablauf aus Karten aufdecken, vergleichen und paaren.

## Überblick

Dieses Projekt ist ein einfaches, aber optisch ansprechendes Memory-Spiel, das mit Vite, TypeScript und SCSS umgesetzt wurde. Ziel ist es, die Spielmechanik klar zu strukturieren und die Darstellung über verschiedene Themes flexibel zu gestalten.

## Funktionen

- Kartenpaare erraten und vergleichen
- Wechselnde Themes zur individuellen Gestaltung
- eigene Settings-Seite für Spielkonfiguration
- responsive Oberfläche für Desktop und mobile Ansichten
- klare Trennung zwischen Spiel-Logik, UI und Styles

## Projektstruktur

- src/main.ts: Einstiegspunkt für die Startseite
- src/game.ts: Initialisierung der Spielseite
- src/settings.ts: Initialisierung der Settings-Seite
- src/models/: zentrale Spiel-Logik und Modelle wie Karten, Deck, Spieler und Spielzustand
- src/styles/: SCSS-Dateien für Layout, Komponenten und Themes
- public/: statische Assets wie Icons und Favicons

## Entwicklung

### Voraussetzungen

- Node.js und npm

### Installation

```bash
npm install
```

### Starten des Dev-Servers

```bash
npm run dev
```

### Build erzeugen

```bash
npm run build
```

### Vorschau lokal testen

```bash
npm run preview
```

## Technik

- Vite
- TypeScript
- SCSS
- HTML
