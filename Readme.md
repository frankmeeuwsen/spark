# SPARK ✨ Summary
> Summoning Paragraphs As Random Knowledge

![How SPARK works](https://frankmeeuwsen.com/uploads/2024/20241116150645-obsidian-homefrankopediaobsidian-v1.7.601.gif)


## Project Overview
SPARK is a DataviewJS script for Obsidian that randomly displays paragraphs from specified notes in your vault. The name SPARK stands for:
- **S**ummoning
- **P**aragraphs
- **A**s
- **R**andom
- **K**nowledge

## Current State
The project is currently in development with version 1.0.2. The main functionality works.

### Core Features
- Random paragraph selection from specified folders
- Configurable button appearance
- Tag-based filtering (exclude/require tags)
- Support for multiple paragraphs
- Customizable styling

### How to install
Download/fork the repository to a directory within your Obsidian vault. It should be available immediately. In the repo I also included 3 subfolders with demo-texts you can use to test the script
- /alice: Full text of Alice in Wonderland, in separate chapters. Courtesy of [Project Gutenberg](https://github.com/GITenberg/Alice-s-Adventures-in-Wonderland_19033/tree/master)
- /tao te ching: The translation of this important book is by Ursula K. Le Guin. Downloaded from [The Way and it's Virtue](https://github.com/seancswanson/the-way-and-its-virtue/blob/main/source-text/reformatted/leguin-translation-reformatted.txt) and reformatted for personal use.
- /bloghelden: My own book from 2010 on the history of the Dutch blogosphere. Free to use from [my github repo](https://bloghelden.nl) as well.


### Usage

Open [Demo script.md](Demo script.md) to see the basic use of the script and the various configuration options. 

Basic usage in an Obsidian note:
```javascript
await dv.view("spark")
```

Or with custom configuration:

```javascript
await dv.view("spark", {
    sourceFolder: "your/folder/path",
    buttonText: "✨ Custom Text",
    requireTags: ["showthis"]
})
```

### Configuration Options

```javascript
const defaultConfig = {
    sourceFolder: '"demofolder/tao te ching"',
    buttonText: '✨ Spark Knowledge',
    buttonStyle: `
       background-color: var(--interactive-accent);
       color: var(--text-on-accent);
       padding: 8px 16px;
       border: none;
       border-radius: var(--radius-s);
       margin-bottom: 1em;
       cursor: pointer;
       font-size: var(--font-ui-small);
       transition: all 0.2s ease;
       `, 
    linkEmoji: '✨',
    showTitle: false,
    maxParagraphs: 1,
    addDividers: false,
    excludeTags: ['exclude', 'private'],
    requireTags: [],
    excludePatterns: [
        '> **Note**',
        '> **note**'
    ]
}
```

## Future improvements

- Include Dataview queries as a source
- Make CSS portable
- Use as a plugin
- Whatever the community comes up with...