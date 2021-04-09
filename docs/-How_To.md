# How to

See the official documentation [daux.io](http://daux.io/Getting_Started.html).

## Recommended for writing

VS Code with extensions:

- `Spell Right` 
- `Markdown All in One`
- `markdownlint`
- `Path Autocomplete`
  - enable it  for all files (md+txt): set `path-autocomplete.triggerOutsideStrings`
- `Markdown Link Updater` (updates links on file rename and move in open folder)

## File and folder names

Starting with a number and `_` will sort the folders and files. e.g. `01_03_2020` will be displayed as `03 2020` at first position. Others will be sorted alphanumeric.

Prefix with `-` and `+` for relative sorting

See: [Navigation and Sorting](http://daux.io/Features/Navigation_and_Sorting.html)

## Gallery

Unordererd lists which only contain Images will be put in a gallery:

```markdown
- ![Flower 1](flower.jpg)
- ![Flower 2](flower.jpg)
```

## Video/Audio

Makrdonw links with the following endings will be transformed to a audio/video player
- transform links to audio player
  - `mp3`
  - `ogg`
  - `wav` 
- transform links to video player
  - `.mp4`
  - `.ogg`
  - `.webm`
  - `.mpg`
  - `.mpeg`

media files must have a relative path from the markdown file which are using them or a absolute pathor a ULR.
```markdown
[A sound](sound.mp3)
[A video](video.mp4)
```

## TOC

Add `[TOC]` in the document for a table of content for the current page.

## Front matter

Keywords separated by `,` will be put in the site header.

**WIP**
Keywords are not found by the search so far.

```YAML
---
title: I have a front matter title
keywords: "Coding, #hashtag, findme, 16.03.2020"
author: Me as Iam
---
```

- date (by Daux) is not shown
