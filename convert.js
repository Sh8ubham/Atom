const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '.stitch', 'designs');
const outputDir = path.join(__dirname, 'components');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.html'));

function htmlToReact(html) {
    // Basic replacements
    let reactCode = html
        .replace(/class=/g, 'className=')
        .replace(/for=/g, 'htmlFor=')
        .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
        .replace(/<img(.*?)>/g, (match) => {
            if (match.endsWith('/>')) return match;
            return match.replace(/>$/, ' />');
        })
        .replace(/<input(.*?)>/g, (match) => {
            if (match.endsWith('/>')) return match;
            return match.replace(/>$/, ' />');
        });

    // Handle style attributes
    reactCode = reactCode.replace(/style="([^"]*)"/g, (match, styles) => {
        const styleObj = {};
        styles.split(';').forEach(rule => {
            if (!rule.trim()) return;
            const [key, value] = rule.split(':');
            if (key && value) {
                const camelKey = key.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                styleObj[camelKey] = value.trim();
            }
        });
        return `style={${JSON.stringify(styleObj)}}`;
    });
    
    // Handle specific svg/path tags if any, though Material Symbols are usually span tags
    
    return reactCode;
}

function convertFile(filename) {
    const htmlContent = fs.readFileSync(path.join(inputDir, filename), 'utf8');
    
    // Extract everything inside body
    const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    let bodyContent = bodyMatch ? bodyMatch[1] : '';
    
    // Convert to React
    let jsxContent = htmlToReact(bodyContent);
    
    const componentName = filename
        .replace('.html', '')
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
        
    const componentCode = `import React from 'react';

export default function ${componentName}() {
    return (
        <>
            ${jsxContent}
        </>
    );
}
`;
    
    fs.writeFileSync(path.join(outputDir, `${componentName}.tsx`), componentCode);
    console.log(`Created ${componentName}.tsx`);
}

files.forEach(convertFile);
console.log('Conversion complete!');
