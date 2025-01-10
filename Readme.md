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

### Usage
Basic usage in an Obsidian note:
```javascript
await dv.view("spark")

// Or with custom configuration:
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