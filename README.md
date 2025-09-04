# 📝 PreviewMD
*See your Markdown like never before*

PreviewMD is the Markdown previewer tool from the [***ClearDrafts***](https://github.com/shubhamranswal/ClearDrafts) suite — offering a live, GitHub-style Markdown rendering experience with syntax highlighting, keyboard shortcuts, export options, and more.

PreviewMD is designed for writers and developers who want a clean, fast way to edit and preview Markdown documents.

---

## 🚀 Features

- **Live preview** of GitHub-flavored Markdown
- **Toolbar** with formatting shortcuts (headers, bold, italic, lists, links, tables, etc.)
- **Keyboard shortcuts** (e.g. Ctrl+B for bold, Ctrl+I for italic)
- **Syntax highlighting** for code blocks (powered by Highlight.js)
- **Sanitized preview** using DOMPurify
- **Table and task list support**
- **Image drag & drop** inserts Markdown image link
- **Export to**:
  - Markdown (`.md`)
  - Clean HTML (`.html`) with syntax highlighting

---

## 📁 Project Structure

```markdown
(root)/
├── index.html       # Main layout and structure
├── utils
├──── style.css      # App styles and layout
├──── script.js      # App logic (editor, preview, toolbar, export)
├── LICENSE.md       # LICENSE file
└── README.md        # Project info

````

---

## 🧠 Keyboard Shortcuts

| Shortcut       | Action         |
|----------------|----------------|
| `Ctrl + B`     | Bold (**`text`**) |
| `Ctrl + I`     | Italic (*`text`*) |
| `Ctrl + E`     | Inline Code (\``code`\`) |
| `Ctrl + L`     | Insert link |
| `Ctrl + H`     | Insert Heading 1 |
| `Ctrl + T`     | Insert Table |

---

## 🖼️ Image Drag and Drop

- Drag an image into the editor
- A Markdown image link is inserted with a placeholder URL  
  Example:
  `![image.png](https://example.com/image.png)`

> *Note: This project does not upload or host images. Add your real URL manually or extend with a backend uploader.*

---

## 📦 Exporting

* **Export MD** — downloads current content as a `.md` file
* **Export HTML** — downloads clean HTML file with rendered output and highlight.js included

---

## 📚 Dependencies (via CDN)

* [marked.js](https://marked.js.org/) – Markdown parser
* [DOMPurify](https://github.com/cure53/DOMPurify) – Sanitizer for safe HTML
* [highlight.js](https://highlightjs.org/) – Syntax highlighting for code blocks

---

## 📜 License

MIT — feel free to modify, extend, and use this freely.
[Read here](https://github.com/shubhamranswal/PreviewMD/blob/main/LICENSE.md)

---

## 🙋‍♂️ Author

Built with ❤️ by ***Shubham Singh Ranswal*** [(know more)](https://shubham-ranswal.web.app/)


---

