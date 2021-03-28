function TransformListsToGallerys(config = new ExtractGalleryConfig()) {
    let extractedLists = ExtractListsToTransform(config.ContentRootSelector, config.LstType);
    let gallerysToCreate = MapListElementsToGalleryModel(extractedLists);
    gallerysToCreate.Gallerys.forEach((galleryToCreate) => ReplaceListWithGallery(galleryToCreate, config));
}
function ExtractListsToTransform(ContentRootSelector, listType) {
    let potentialImageLists = document.querySelectorAll(`${ContentRootSelector} ${listType}`);
    let galleryLists = [];
    for (let potentialImageList of potentialImageLists) {
        let allItemsAreImageLinks = true;
        for (let child of potentialImageList.children) {
            if (HasTextContent(child.textContent) || !IsFirstChildAorIMG(child)
            //&& (!child.firstElementChild.firstChild || (child.firstElementChild.firstChild && child.firstElementChild.firstChild.tagName == 'IMG'))
            ) {
                allItemsAreImageLinks = false;
            }
        }
        if (allItemsAreImageLinks) {
            galleryLists.push(potentialImageList);
        }
    }
    return galleryLists;
}
function IsFirstChildAorIMG(element) {
    if (element === null
        || element.firstElementChild === null
        || element.firstElementChild.tagName === null) {
        return false;
    }
    return element.firstElementChild.tagName == 'A' || element.firstElementChild.tagName == 'IMG';
}
function HasTextContent(str) {
    return !str || str.match(/^ *$/) !== null;
}
function ReplaceListWithGallery(galleryToCreate, config) {
    let newGalleryRoot = document.createElement("div");
    newGalleryRoot.classList.add(config.GeneratedGalleryRootClasses);
    for (const galleryImage of galleryToCreate.Images) {
        let figure = document.createElement("figure");
        let img = document.createElement("img");
        img.src = galleryImage.src;
        img.alt = galleryImage.caption;
        img.classList.add(config.GeneratedGalleryImageClasses);
        figure.appendChild(img);
        let caption = document.createElement("figcaption");
        caption.textContent = galleryImage.caption;
        caption.classList.add(config.GeneratedGalleryImageCaptionClasses);
        figure.appendChild(caption);
        newGalleryRoot.appendChild(figure);
    }
    galleryToCreate.ListRootElement.replaceWith(newGalleryRoot);
}
class ExtractGalleryConfig {
    constructor() {
        this.ContentRootSelector = ".s-content";
        this.LstType = 'ul';
        this.GeneratedGalleryRootClasses = 'gallery';
        this.GeneratedGalleryImageClasses = 'gallery-image';
        this.GeneratedGalleryImageCaptionClasses = 'gallery-image-caption';
    }
}
class ExtractedInfoForGallerys {
    constructor() {
        this.Gallerys = [];
    }
}
class InfoForGallery {
    constructor() {
        this.Images = [];
    }
}
class GalleryImage {
}
function MapListElementsToGalleryModel(extractedLists) {
    let extractedInfoForGallerys = new ExtractedInfoForGallerys();
    for (const list of extractedLists) {
        let infoForGallery = new InfoForGallery;
        infoForGallery.ListRootElement = list;
        for (const listItem of list.children) {
            var imgOrLink = listItem.firstElementChild;
            if (imgOrLink.tagName === "IMG") {
                let img = imgOrLink;
                infoForGallery.Images.push({
                    src: img.src,
                    caption: img.alt ? img.alt : null
                });
                continue;
            }
            if (imgOrLink.tagName === "A") {
                let a = imgOrLink;
                infoForGallery.Images.push({
                    src: a.href,
                    caption: null
                });
                continue;
            }
        }
        extractedInfoForGallerys.Gallerys.push(infoForGallery);
    }
    return extractedInfoForGallerys;
}
//# sourceMappingURL=transform-lists-to-gallerys.js.map