/*
* SPARK ✨ (Summoning Paragraphs As Random Knowledge)
* A DataviewJS script for Obsidian
* Version 1.0.2
* 
* This script summons random paragraphs of knowledge from your vault,
* creating sparks of inspiration when you need them.
* 
* Features:
* - Randomly selects paragraphs from specified folders
* - Configurable button appearance and behavior
* - Tag-based filtering (exclude/require tags)
* - Support for multiple paragraphs
* - Customizable styling
* 
* Usage:
* ```dataviewjs
* await dv.view("spark", {
*     sourceFolder: "path/to/your/folder",
*     buttonText: "✨ Spark Knowledge",
*     linkEmoji: "📖"
* })
* ```
*/

// Define default configuration
const defaultConfig = {
    sourceFolder: 'demofolder/tao te ching',
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
};

// Helper function to format folder path for Dataview query
function formatFolderPath(path) {
    // Remove any existing quotes
    path = path.replace(/["']/g, '');
    // Add quotes for Dataview
    return `"${path}"`;
}

// Helper function to normalize tags (handle with/without #)
function normalizeTag(tag) {
    return tag.startsWith('#') ? tag : '#' + tag;
}

// Merge default config with input arguments, ensuring defaults aren't lost
const CONFIG = {
    ...defaultConfig,
    ...(input || {}),
    // Preserve nested default values if not provided in input
    buttonStyle: (input && input.buttonStyle) || defaultConfig.buttonStyle,
    excludeTags: (input && input.excludeTags) || defaultConfig.excludeTags,
    requireTags: (input && input.requireTags) || defaultConfig.requireTags,
    excludePatterns: (input && input.excludePatterns) || defaultConfig.excludePatterns,
};

CONFIG.sourceFolder = formatFolderPath(CONFIG.sourceFolder);

// Create button element and container for output
const container = dv.container;
const refreshButton = document.createElement('button');
refreshButton.textContent = CONFIG.buttonText;
refreshButton.style = CONFIG.buttonStyle;
container.appendChild(refreshButton);

// Create a div to hold the sparked knowledge
const sparkContainer = document.createElement('div');
container.appendChild(sparkContainer);

// Main SPARK function
async function sparkKnowledge() {
    // Clear previous sparks
    sparkContainer.innerHTML = '';

    // Get pages and filter based on tags
    let pages = dv.pages(CONFIG.sourceFolder)
        .filter(page => {
            // Check for excluded tags
            const hasExcludedTag = CONFIG.excludeTags.some(tag =>
                page.file.tags && page.file.tags.includes(normalizeTag(tag))
            );

            // Check for required tags
            const hasRequiredTags = CONFIG.requireTags.length === 0 ||
                CONFIG.requireTags.every(tag =>
                    page.file.tags && page.file.tags.includes(normalizeTag(tag))
                );

            return !hasExcludedTag && hasRequiredTags;
        });

    if (pages.length > 0) {
        let randomPage = pages[Math.floor(Math.random() * pages.length)];
        let content = await dv.io.load(randomPage.file.path);

        if (content) {
            // Remove YAML frontmatter
            content = content.replace(/---[\s\S]*?---/g, '');

            // Split into paragraphs and clean them
            let paragraphs = content
                .split('\n\n')
                .map(p => p.trim())
                .filter(p =>
                    p !== '' &&
                    !CONFIG.excludePatterns.some(pattern => p.startsWith(pattern))
                );

            if (paragraphs.length > 0) {
                // Select random paragraphs based on maxParagraphs setting
                let selectedParagraphs = [];
                for (let i = 0; i < Math.min(CONFIG.maxParagraphs, paragraphs.length); i++) {
                    let randomIndex = Math.floor(Math.random() * paragraphs.length);
                    selectedParagraphs.push(paragraphs[randomIndex]);
                    paragraphs.splice(randomIndex, 1); // Remove selected paragraph to avoid duplicates
                }

                // Show title if configured
                if (CONFIG.showTitle) {
                    const titleElement = dv.header(3, randomPage.file.name);
                    sparkContainer.appendChild(titleElement);
                }

                // Display sparked paragraphs
                selectedParagraphs.forEach((paragraph, index) => {
                    const sparkText = dv.paragraph("*" + paragraph + "*");
                    sparkContainer.appendChild(sparkText);

                    // Add divider if configured and not the last paragraph
                    if (CONFIG.addDividers && index < selectedParagraphs.length - 1) {
                        const divider = dv.paragraph("---");
                        sparkContainer.appendChild(divider);
                    }
                });

                // Add source link with configured emoji
                const sparkSource = dv.paragraph(`${CONFIG.linkEmoji} [[${randomPage.file.name}]]`);
                sparkContainer.appendChild(sparkSource);
            } else {
                const errorMsg = dv.paragraph("No sparks of knowledge found in the selected file");
                sparkContainer.appendChild(errorMsg);
            }
        } else {
            const errorMsg = dv.paragraph("Could not access the knowledge source");
            sparkContainer.appendChild(errorMsg);
        }
    } else {
        const errorMsg = dv.paragraph("No knowledge sources found in the specified directory");
        sparkContainer.appendChild(errorMsg);
    }
}

// Add click event listener to the spark button
refreshButton.addEventListener('click', sparkKnowledge);

// Initial spark of knowledge
await sparkKnowledge();