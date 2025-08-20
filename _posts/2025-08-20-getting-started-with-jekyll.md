---
layout: post
title: "Getting Started with Jekyll on GitHub Pages"
date: 2025-08-20 09:00:00 -0700
author: "Thi Vo"
categories: [tutorial, jekyll]
tags: [jekyll, github-pages, static-site, tutorial]
---

# Getting Started with Jekyll on GitHub Pages

Jekyll is a fantastic static site generator that's perfect for blogs, documentation, and personal websites. The best part? GitHub Pages supports Jekyll natively, making deployment seamless.

## Why Jekyll?

Jekyll offers several advantages for bloggers and developers:

- **Markdown support**: Write posts in simple Markdown format
- **Version control**: Your entire site is stored in Git
- **No database**: Fast, secure static files
- **Customizable**: Full control over design and functionality
- **Free hosting**: GitHub Pages hosts Jekyll sites for free

## Basic Structure

A typical Jekyll site has this structure:

```
your-site/
├── _config.yml          # Site configuration
├── _layouts/            # HTML templates
│   ├── default.html
│   └── post.html
├── _posts/              # Blog posts
│   └── YYYY-MM-DD-title.md
├── _includes/           # Reusable components
├── _sass/              # Sass stylesheets
├── assets/             # Images, CSS, JS
└── index.html          # Homepage
```

## Writing Posts

Creating a new blog post is as simple as adding a Markdown file to the `_posts` directory. The filename must follow this pattern:

```
YYYY-MM-DD-title-of-post.md
```

Each post starts with YAML front matter:

```yaml
---
layout: post
title: "Your Amazing Post Title"
date: 2025-08-20 12:00:00 +0000
author: "Your Name"
categories: [web-development, tutorial]
tags: [jekyll, markdown, blogging]
---
```

## Useful Features

### Code Highlighting

Jekyll supports syntax highlighting out of the box:

```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
```

### Math Expressions

You can include mathematical expressions using MathJax:

$$E = mc^2$$

### Tables

| Feature  | Jekyll    | WordPress     |
| -------- | --------- | ------------- |
| Speed    | ⚡ Fast   | 🐌 Slower     |
| Security | 🔒 Secure | ⚠️ Vulnerable |
| Cost     | 💰 Free   | 💸 Expensive  |

## Deployment

Deploying to GitHub Pages is automatic:

1. Push your Jekyll site to a GitHub repository
2. Enable GitHub Pages in repository settings
3. Your site is live at `https://username.github.io/repository-name`

## Tips for Success

1. **Keep it simple**: Start with a basic theme and customize gradually
2. **Write regularly**: Consistency is key for building an audience
3. **Optimize images**: Compress images to keep your site fast
4. **Use meaningful URLs**: Jekyll's permalink feature helps with SEO
5. **Test locally**: Use `bundle exec jekyll serve` to preview changes

## Conclusion

Jekyll combined with GitHub Pages provides a powerful, free platform for blogging and content creation. It's perfect for developers who want full control over their site while keeping things simple and maintainable.

Happy blogging! 🚀
