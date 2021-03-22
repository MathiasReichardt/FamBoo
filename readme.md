# FamBoo

FamBoo (**Fam**iliy**Boo**k) is a theme for [Daux.io](http://daux.io/Getting_Started.html). It is based on the default Daux blue theme with some additions.

## Why?

This theme was built to produce a easy to maintain and use personal wiki and family blog. 

- No cloud
- No vendor lock-in
- No fancy environment
- Easy to backup (git will do this)
- Works local (from a NAS or even a (synced) local folder)
- Easy to migrate if needed. So only markdown syntax for the content.
- Generates folder structure so no toc files need to be maintained

## What was added to Daux.io

- images are reduced in size but have zoom on click
- transform list of images to gallery with zoom on click
- add keywords to top (not searchable!)
- transform links to audio player (if link ends with):
  - `.mp3`
  - `.ogg`
  - `.wav`

- transform links to video player (if link ends with):
  - `.mp4`
  - `.ogg`
  - `.webm`
  - `.mpg`
  - `.mpeg`

## Installation

See [Setting the theme for your documentation](http://daux.io/For_Developers/Creating_a_Theme.html).
Basically place the `themes/FamBoo` folders next to the doc folder of your content and set the path in `config.json` in your content folder.

## Execute Daux

Official Docker container which is used during development:
[Docker Hub: daux/daux.io](https://hub.docker.com/r/daux/daux.io)

Run the following command in the folder containing your `doc` folder to generate the static site:

`docker run --rm -it -w /build -p 8085:8085 -v ${PWD}:/build  daux/daux.io daux generate`

## Used libs

- [imgzoom](https://github.com/arp242/imgzoom) modified
  - modified to fix behavior
  - WIP add next previous
- [jQuery](https://jquery.com/)

## Todo

- redesign folder structure, we now have TS and need to move scr and demo doc
- Gallery bug: when selecting a small image first the size is not recalculated on next or prev
- Gallery bug: clicking on a image behind while large view is shown breaks the zoom in
- make keywords and author searchable
- add date from front matter to pages
- build docker image with theme inside (and use path to style and js of official theme not a copy)
- make it work with all theme variants
