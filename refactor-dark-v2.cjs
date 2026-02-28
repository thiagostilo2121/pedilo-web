const fs = require('fs');
const path = require('path');

const DIRS = [
    'src/pages/dashboard',
    'src/components/dashboard',
    'src/components/configuracion',
    'src/components',
    'src/layout',
    'src/pages/admin'
];

// PHASE 1: Cleanup duplicated dark classes from previous script
const CLEANUP_RULES = [
    // Remove duplicate dark:bg-white/5
    { regex: /dark:bg-white\/5\s+dark:bg-white\/5/g, replacement: 'dark:bg-white/5' },
    // Remove triple dark:bg-white/5
    { regex: /dark:bg-white\/5\s+dark:bg-white\/5\s+dark:bg-white\/5/g, replacement: 'dark:bg-white/5' },
    // Remove duplicate dark:border-white/10
    { regex: /dark:border-white\/10\s+dark:border-white\/10/g, replacement: 'dark:border-white/10' },
];

// PHASE 2: Add dark: variants where missing
// These rules ONLY match classes that do NOT already have a dark: counterpart nearby
// We use negative lookahead to avoid adding dark: where it already exists

const ADD_RULES = [
    // === BACKGROUNDS ===
    // bg-white without dark: → add dark:bg-zinc-900 (for cards, panels, modals)
    {
        regex: /\bbg-white(?!\/)(?!\s+dark:bg-)/g,
        replacement: 'bg-white dark:bg-zinc-900'
    },
    // bg-gray-50 without dark: 
    {
        regex: /\bbg-gray-50(?!\/| dark:bg-)(?!\s+dark:bg-)/g,
        replacement: 'bg-gray-50 dark:bg-zinc-800/50'
    },
    // bg-gray-100 without dark:
    {
        regex: /\bbg-gray-100(?!\/)(?!\s+dark:bg-)/g,
        replacement: 'bg-gray-100 dark:bg-white/5'
    },
    // bg-gray-200 without dark:
    {
        regex: /\bbg-gray-200(?!\/)(?!\s+dark:bg-)/g,
        replacement: 'bg-gray-200 dark:bg-white/10'
    },

    // === TEXT COLORS ===
    // text-gray-900 without dark:
    {
        regex: /\btext-gray-900(?!\s+dark:text-)/g,
        replacement: 'text-gray-900 dark:text-zinc-100'
    },
    // text-gray-800 without dark:
    {
        regex: /\btext-gray-800(?!\s+dark:text-)/g,
        replacement: 'text-gray-800 dark:text-zinc-200'
    },
    // text-gray-700 without dark:
    {
        regex: /\btext-gray-700(?!\s+dark:text-)/g,
        replacement: 'text-gray-700 dark:text-zinc-300'
    },
    // text-gray-600 without dark:
    {
        regex: /\btext-gray-600(?!\s+dark:text-)/g,
        replacement: 'text-gray-600 dark:text-zinc-400'
    },
    // text-gray-500 without dark:
    {
        regex: /\btext-gray-500(?!\s+dark:text-)/g,
        replacement: 'text-gray-500 dark:text-zinc-400'
    },
    // text-gray-400 without dark:
    {
        regex: /\btext-gray-400(?!\s+dark:text-)/g,
        replacement: 'text-gray-400 dark:text-zinc-500'
    },

    // === BORDERS ===
    // border-gray-100 without dark:
    {
        regex: /\bborder-gray-100(?!\/)(?!\s+dark:border-)/g,
        replacement: 'border-gray-100 dark:border-white/10'
    },
    // border-gray-200 without dark:
    {
        regex: /\bborder-gray-200(?!\/)(?!\s+dark:border-)/g,
        replacement: 'border-gray-200 dark:border-white/10'
    },
    // border-gray-300 without dark:
    {
        regex: /\bborder-gray-300(?!\/)(?!\s+dark:border-)/g,
        replacement: 'border-gray-300 dark:border-white/15'
    },
    // border-gray-50 without dark:
    {
        regex: /\bborder-gray-50(?!\s+dark:border-)/g,
        replacement: 'border-gray-50 dark:border-white/5'
    },

    // === HOVER STATES ===
    // hover:bg-gray-50 without dark:hover:
    {
        regex: /\bhover:bg-gray-50(?!\s+dark:hover:bg-)/g,
        replacement: 'hover:bg-gray-50 dark:hover:bg-white/5'
    },
    // hover:bg-gray-100 without dark:hover:
    {
        regex: /\bhover:bg-gray-100(?!\s+dark:hover:bg-)/g,
        replacement: 'hover:bg-gray-100 dark:hover:bg-white/10'
    },
    // hover:bg-gray-200 without dark:hover:
    {
        regex: /\bhover:bg-gray-200(?!\s+dark:hover:bg-)/g,
        replacement: 'hover:bg-gray-200 dark:hover:bg-white/15'
    },
    // hover:text-gray-900 without dark:hover:text-
    {
        regex: /\bhover:text-gray-900(?!\s+dark:hover:text-)/g,
        replacement: 'hover:text-gray-900 dark:hover:text-zinc-100'
    },

    // === SHADOWS ===
    // shadow-gray-200 → remove in dark
    {
        regex: /\bshadow-gray-200(?!\s+dark:shadow-)/g,
        replacement: 'shadow-gray-200 dark:shadow-black/20'
    },
    // shadow-gray-100 → remove in dark
    {
        regex: /\bshadow-gray-100(?!\s+dark:shadow-)/g,
        replacement: 'shadow-gray-100 dark:shadow-black/20'
    },

    // === DIVIDERS ===
    // divide-gray-50 without dark:
    {
        regex: /\bdivide-gray-50(?!\s+dark:divide-)/g,
        replacement: 'divide-gray-50 dark:divide-white/5'
    },

    // === FOCUS STATES ===
    // focus:bg-white without dark:
    {
        regex: /\bfocus:bg-white(?!\s+dark:focus:bg-)/g,
        replacement: 'focus:bg-white dark:focus:bg-zinc-800'
    },

    // === FOCUS-WITHIN STATES ===
    {
        regex: /\bfocus-within:bg-white(?!\s+dark:focus-within:bg-)/g,
        replacement: 'focus-within:bg-white dark:focus-within:bg-zinc-800'
    },
];

let totalChanges = 0;
let filesChanged = 0;

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Phase 1: Cleanup
    for (const rule of CLEANUP_RULES) {
        content = content.replace(rule.regex, rule.replacement);
    }

    // Phase 2: Add missing dark variants
    for (const rule of ADD_RULES) {
        content = content.replace(rule.regex, rule.replacement);
    }

    // Phase 3: Run cleanup again (script may have created new duplicates)
    for (const rule of CLEANUP_RULES) {
        content = content.replace(rule.regex, rule.replacement);
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        filesChanged++;
        console.log(`✓ Updated: ${filePath}`);
        return true;
    }
    return false;
}

function processDirectory(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            processDirectory(fullPath);
        } else if (entry.isFile() && (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) && !fullPath.includes('refactor-dark')) {
            processFile(fullPath);
        }
    }
}

console.log('🎨 Dark Mode Refactor v2 — Starting...\n');

for (const dir of DIRS) {
    const absDir = path.resolve(process.cwd(), dir);
    console.log(`📁 Processing: ${dir}`);
    processDirectory(absDir);
}

console.log(`\n✅ Done! ${filesChanged} files updated.`);
