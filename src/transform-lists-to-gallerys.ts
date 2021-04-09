function TransformListsToGallerys(config: ExtractGalleryConfig = new ExtractGalleryConfig()) {
    let extractedLists = ExtractListsToTransform(config.ContentRootSelector, config.LstType);
    let gallerysToCreate = MapListElementsToGalleryModel(extractedLists);
    gallerysToCreate.Gallerys.forEach((galleryToCreate: InfoForGallery) => ReplaceListWithGallery(galleryToCreate, config))
}

function ExtractListsToTransform(ContentRootSelector: string, listType: string): Element[] {
    let potentialImageLists = document.querySelectorAll(`${ContentRootSelector} ${listType}`);
    let galleryLists: Element[] = [];

    for (let potentialImageList of potentialImageLists) {
        let allItemsAreImageLinks = true;

        for (let child of potentialImageList.children) {
            if (HasTextContent(child.textContent) || !IsFirstChildIMG(child)
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

function IsFirstChildIMG(element: Element) {
    if (element === null
        || element.firstElementChild === null
        || element.firstElementChild.tagName === null) {
        return false;
    }

    return  element.firstElementChild.tagName == 'IMG'
}

function HasTextContent(str: string) {
    return !str || str.match(/^ *$/) !== null;
}

function ReplaceListWithGallery(galleryToCreate: InfoForGallery, config: ExtractGalleryConfig) {
    let newGalleryRoot = document.createElement("div") as HTMLDivElement;
    newGalleryRoot.classList.add(config.GeneratedGalleryRootClasses);

    for (const galleryImage of galleryToCreate.Images) {
        let figure = document.createElement("figure");

        let img = document.createElement("img") as HTMLImageElement;
        img.src = galleryImage.src;
        img.alt = galleryImage.caption;
        img.classList.add(config.GeneratedGalleryImageClasses);
        figure.appendChild(img);

        let caption = document.createElement("figcaption") as HTMLElement;
        caption.textContent = galleryImage.caption;
        caption.classList.add(config.GeneratedGalleryImageCaptionClasses);
        figure.appendChild(caption);

        newGalleryRoot.appendChild(figure);
    }

    galleryToCreate.ListRootElement.replaceWith(newGalleryRoot);
}

class ExtractGalleryConfig {
    ContentRootSelector: string = ".s-content";
    LstType: string = 'ul';
    GeneratedGalleryRootClasses: string = 'gallery';
    GeneratedGalleryImageClasses: string = 'gallery-image';
    GeneratedGalleryImageCaptionClasses: string = 'gallery-image-caption';
}

class ExtractedInfoForGallerys {
    Gallerys: InfoForGallery[] = [];
}

class InfoForGallery {
    ListRootElement: Element;
    Images: GalleryImage[] = [];
}

class GalleryImage {
    src: string;
    caption: string;
}

function MapListElementsToGalleryModel(extractedLists: Element[]): ExtractedInfoForGallerys {
    let extractedInfoForGallerys = new ExtractedInfoForGallerys();
    for (const list of extractedLists) {
        let infoForGallery = new InfoForGallery;
        infoForGallery.ListRootElement = list;

        for (const listItem of list.children) {
            var imgLink = listItem.firstElementChild;

            if (imgLink.tagName === "IMG") {
                let img = imgLink as HTMLImageElement;
                infoForGallery.Images.push({
                    src: img.src,
                    caption: img.alt ? img.alt : null
                });
            }
        }

        extractedInfoForGallerys.Gallerys.push(infoForGallery);
    }

    return extractedInfoForGallerys;
}
