# Jekyll Blog Instructions

## How to Write New Blog Posts

### 1. Create a New Post File

Create a new Markdown file in the `_posts/` directory with this naming convention:

```
YYYY-MM-DD-title-of-your-post.md
```

Example: `2025-08-20-my-awesome-post.md`

### 2. Add Front Matter

Every post must start with YAML front matter:

```yaml
---
layout: post
title: "Your Post Title"
date: 2025-08-20 12:00:00 +0000
author: "Thi Vo"
categories: [category1, category2]
tags: [tag1, tag2, tag3]
---
```

### 3. Write Your Content

After the front matter, write your content in Markdown:

````markdown
# Main Heading

Your content here...

## Subheading

More content with **bold** and _italic_ text.

### Code Examples

```javascript
function example() {
  console.log("Hello World!");
}
```
````

### Lists

- Item 1
- Item 2
- Item 3

### Links and Images

[Link text](https://example.com)

![Alt text](/path/to/image.jpg)

```

## File Structure

```

├── \_config.yml # Jekyll configuration
├── \_layouts/ # HTML templates
│ ├── default.html # Base layout
│ └── post.html # Blog post layout
├── \_posts/ # Blog posts (Markdown files)
│ ├── 2025-08-20-welcome-to-my-blog.md
│ └── 2025-08-20-getting-started-with-jekyll.md
├── blog/
│ └── index.html # Blog index page
├── Gemfile # Ruby dependencies
└── README.md # This file

````

## Local Development

To run the blog locally:

1. Install Jekyll and dependencies:
   ```bash
   bundle install
````

2. Start the development server:

   ```bash
   bundle exec jekyll serve
   ```

3. Open http://localhost:4000 in your browser

## GitHub Pages Deployment

This blog is automatically deployed to GitHub Pages when you push to the main branch. No additional configuration needed!

## Useful Markdown Syntax

### Headings

```markdown
# H1

## H2

### H3
```

### Text Formatting

```markdown
**Bold text**
_Italic text_
~~Strikethrough~~
`Inline code`
```

### Code Blocks

````markdown
```language
Your code here
```
````

### Tables

```markdown
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
```

### Blockquotes

```markdown
> This is a blockquote
```

## Categories and Tags

Use categories for broad topics and tags for specific keywords:

```yaml
categories: [web-development, tutorial]
tags: [html, css, javascript, beginners]
```

## Tips

1. **File naming**: Always use the `YYYY-MM-DD-title.md` format
2. **Images**: Store images in `/assets/images/` and reference them as `/assets/images/filename.jpg`
3. **Drafts**: Create draft posts in `_drafts/` folder (without date in filename)
4. **SEO**: Use descriptive titles and include relevant tags and categories

Happy blogging! 🎉
