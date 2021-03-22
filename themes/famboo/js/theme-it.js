$(document).ready(onPageLoad);
function onPageLoad() {
    TransformListsToGallerys();
    replaceVideoLinks();
    replaceAudioLinks();
    addMetaData();
    $('img').on('click', imgzoom);
}
function addMetaData() {
    addAuthor();
    addKeywords();
}
function addAuthor() {
    let author = document.querySelector('meta[name="author"]');
    if (!author || !author.content)
        return;
    var content = $("div.Page__header");
    content.append(`<span class="author">${author.content}</span>`);
}
function addKeywords() {
    let keywords = document.querySelector('meta[name="keywords"]');
    if (!keywords || !keywords.content)
        return;
    let keywordslist = keywords.content.split(",");
    let keywordElements = "";
    keywordslist.forEach(function (keyword) {
        keywordElements += `<span class="keyword">${keyword}</span>`;
    });
    var content = $("div.Page__header");
    content.append(`<div class=".keywords-container">${keywordElements}</div>`);
}
function replaceVideoLinks() {
    // get all a tags
    let links = document.querySelectorAll('a');
    // loop over links variable to get href for each
    for (const link of links) {
        if (isVideo(link.href)) {
            console.log(link.href);
            $(link).replaceWith(function () {
                var newElement = `
				    <div playerContainer>
						<video class="mdvideo player" controls>
						<source src="${link.href}" type="${videoMediaType(link.href)}">
						</video>
						<figcaption class="playerCaption">${link.textContent}</figcaption>
					</div>
				`;
                return $(newElement, { html: $(this).html() });
            });
        }
    }
}
function replaceAudioLinks() {
    // get all a tags
    let links = document.querySelectorAll('a');
    // loop over links variable to get href for each
    for (const link of links) {
        if (isAudio(link.href)) {
            console.log(link.href);
            $(link).replaceWith(function () {
                var newElement = `
					<div playerContainer>
						<audio  class="mdaudio player" controls>
						<source src="${link.href}" type="${audioMediaType(link.href)}">
						</audio>
						<figcaption class="playerCaption">${link.textContent}</figcaption>
					</div>
				`;
                return $(newElement, { html: $(this).html() });
            });
        }
    }
}
function isVideo(s) {
    if (!s)
        return false;
    var lowercase = s.toLowerCase();
    return lowercase.endsWith('.mp4') ||
        lowercase.endsWith('.ogg') ||
        lowercase.endsWith('.webm') ||
        lowercase.endsWith('.mpg') ||
        lowercase.endsWith('.mpeg');
}
function isAudio(s) {
    if (!s)
        return false;
    var lowercase = s.toLowerCase();
    return lowercase.endsWith('.mp3') ||
        lowercase.endsWith('.wav') ||
        lowercase.endsWith('.OGG');
}
function videoMediaType(s) {
    if (!s)
        return null;
    var lowercase = s.toLowerCase();
    if (lowercase.endsWith('.mp4') || lowercase.endsWith('.mpg') || lowercase.endsWith('.mpeg')) {
        return "video/mp4";
    }
    else if (lowercase.endsWith('.ogg')) {
        return "video/ogg";
    }
    else if (lowercase.endsWith('.webm')) {
        return "video/webm";
    }
    return null;
}
function audioMediaType(s) {
    if (!s)
        return null;
    var lowercase = s.toLowerCase();
    if (lowercase.endsWith('.mp3')) {
        return "audio/mpeg";
    }
    else if (lowercase.endsWith('.ogg')) {
        return "audio/ogg";
    }
    else if (lowercase.endsWith('.wav')) {
        return "audio/wav";
    }
    return null;
}
//# sourceMappingURL=theme-it.js.map