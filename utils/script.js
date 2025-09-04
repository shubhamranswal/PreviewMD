const textarea = document.getElementById('markdown');
const preview = document.getElementById('preview');

marked.setOptions({
    gfm: true,
    tables: true,
    breaks: true,
    smartLists: true,
    smartypants: true,
    highlight: (code, lang) => {
        return lang && hljs.getLanguage(lang)
            ? hljs.highlight(code, { language: lang }).value
            : hljs.highlightAuto(code).value;
    }
});

textarea.addEventListener('input', updatePreview);

// Initialize with example Markdown (including table and task list)
textarea.value = `# Welcome to Markdown Previewer!

## Features

- **Bold**, *Italic*, \`Code\`
- Headings H1, H2, H3
- Blockquotes
- Ordered and unordered lists
- Task lists:
  - [x] Write code
  - [ ] Write tests
  - [ ] Document project

## Table example:

| Name   | Age | Role         |
|--------|-----|--------------|
| Alice  | 30  | Developer    |
| Bob    | 25  | Designer     |
| Carol  | 35  | Project Lead |

## Code example:

\`\`\`js
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}
greet('World');
\`\`\`
`;
updatePreview();

function updatePreview() {
    const rawHtml = marked.parse(textarea.value);
    preview.innerHTML = DOMPurify.sanitize(rawHtml);
    preview.querySelectorAll('pre code').forEach(block => hljs.highlightElement(block));
}

function wrapSelection(wrapper) {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = textarea.value.slice(start, end);
    const before = textarea.value.slice(0, start);
    const after = textarea.value.slice(end);

    const isWrapped = selected.startsWith(wrapper) && selected.endsWith(wrapper);
    const wrapped = isWrapped
        ? selected.slice(wrapper.length, selected.length - wrapper.length)
        : wrapper + selected + wrapper;

    textarea.value = before + wrapped + after;
    textarea.selectionStart = start;
    textarea.selectionEnd = end + (isWrapped ? -2 * wrapper.length : 2 * wrapper.length);
    textarea.focus();
    updatePreview();
}

function insertAtCursor(text) {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = textarea.value.slice(0, start);
    const after = textarea.value.slice(end);
    textarea.value = before + text + after;
    textarea.selectionStart = textarea.selectionEnd = start + text.length;
    textarea.focus();
    updatePreview();
}

function insertTable() {
    insertAtCursor(
        `| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

`);
}

function insertLink() {
    const url = prompt("Enter URL:", "https://");
    if (!url) return;
    const text = prompt("Link text:", "Link text");
    insertAtCursor(`[${text}](${url})`);
}

function insertImage() {
    const url = prompt("Enter image URL:", "https://");
    if (!url) return;
    const alt = prompt("Alt text:", "Image description");
    insertAtCursor(`![${alt}](${url})`);
}

// Drag & drop image inserts markdown image placeholder
textarea.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
});
textarea.addEventListener('drop', (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file?.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = function (event) {
        const imageUrl = event.target.result; // base64 data URL
        const markdown = `![${file.name}](${imageUrl})\n`;
        insertAtCursor(markdown);
    };
    reader.readAsDataURL(file);
});


// Keyboard shortcuts
textarea.addEventListener('keydown', (e) => {
    if (e.ctrlKey) {
        switch (e.key.toLowerCase()) {
            case 'b': e.preventDefault(); wrapSelection('**'); break;
            case 'i': e.preventDefault(); wrapSelection('*'); break;
            case 'e': e.preventDefault(); wrapSelection('`'); break;
            case 'l': e.preventDefault(); insertLink(); break;
            case 't': e.preventDefault(); insertTable(); break;
            case 'h': e.preventDefault(); insertAtCursor('# '); break;
        }
    }
});

// Export buttons
document.getElementById('export-md').addEventListener('click', () => {
    const blob = new Blob([textarea.value], { type: 'text/markdown' });
    downloadFile(blob, 'markdown.md');
});

document.getElementById('export-html').addEventListener('click', () => {
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>PreviewMD - Exported Markdown</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github.min.css">
<style>
body { font-family: sans-serif; max-width: 800px; margin: auto; padding: 1rem; }
pre { background: #f6f8fa; padding: 1rem; border-radius: 6px; overflow-x: auto; }
code { background: #f6f8fa; padding: 0.2em 0.4em; border-radius: 4px; }
table { border-collapse: collapse; width: 100%; margin: 1em 0; border: 1px solid #dfe2e5; }
th, td { border: 1px solid #dfe2e5; padding: 0.5em 1em; }
</style>
</head>
<body>
${preview.innerHTML}
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js"></script>
<script>document.querySelectorAll('pre code').forEach(block => hljs.highlightElement(block));<\/script>
</body>
</html>
  `;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    downloadFile(blob, 'preview.html');
});

function downloadFile(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

// Initial render
updatePreview();
