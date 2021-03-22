# FamBoo

FamBoo (**Fam**iliy**Boo**k) is a theme for [Daux.io](http://daux.io/Getting_Started.html). It is based on the default Daux themes with some additions.

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
- add author and keywords from front matter to top (not searchable!)
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

## Build

Cofigure the theme in the `config.json` of your `docs` folder:

```json
{
  "html": {
      "theme": "famboo-blue", 
  }
}
```

### Manual

See [Setting the theme for your documentation](http://daux.io/For_Developers/Creating_a_Theme.html).
Basically place the `themes/` folder next to the doc folder of your content and set the path in `config.json` in your content folder.

### Build with docker container

This container contains the theme.

[DockerHub - reimat/daux-famboo](https://hub.docker.com/r/reimat/daux-famboo)

Just generated your site by running the docker command next to you `docs` folder:

`docker run --rm -it -w /build -v ${PWD}:/build reimat/daux-famboo daux generate`

## Development

Official Docker container which is used during development:
[Docker Hub: daux/daux.io](https://hub.docker.com/r/daux/daux.io)

Run the following command in the folder containing your `doc` folder to generate the static site:

`docker run --rm -it -w /build -v ${PWD}:/build  daux/daux.io daux generate`

### Used libs

- [imgzoom](https://github.com/arp242/imgzoom) modified
  - modified to fix behavior
  - WIP add next previous
- [jQuery](https://jquery.com/)

### Todo
- Gallery bug: when selecting a small image first the size is not recalculated on next or prev
- Gallery bug: clicking on a image behind while large view is shown breaks the zoom in
- make keywords and author searchable
- add date from front matter to pages
