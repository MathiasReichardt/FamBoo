// imgzoom is an image zoomer. It will animate images to the maximum allowable
// size by the viewport, but will never make them larger than the image's actual
// size.
//
// This is a good alternative to "lightbox" and such as it's snappy and looks
// nice.
//
// The URL for the large version is either 'data-large', or the image's src.
//
// https://github.com/arp242/imgzoom | MIT license applies, see LICENSE.
(function (global, factory) {
	'use strict';

	if (!global.document)
		throw new Error('imgzoom requires a window with a document')

	if (typeof module === 'object' && typeof module.exports === 'object')
		module.exports = factory(global, false)
	else
		factory(global, true)

	// Pass this if window is not defined yet
})((typeof window !== 'undefined' ? window : this), function (window, expose_global) {
	'use strict';

	var padding = 25,  // Padding from the window edge.
		min_size = 1.2  // The larger image must be 20% larger to do anything.
	var previousImg = null;
	var nextImg = null;
	var wasNavigating = false;
	var previousButton;
	var nextButton;
	var large = new Image()
	var currentSelectedImg;
	var html = document.getElementsByTagName('html')[0]

	// The imgzoom() function zooms the image on click. img_or_ev can either be
	// a reference to an image as a HTMLElement or a ClickEvent on the image.
	var imgzoom = function (img_or_ev) {
		if (img_or_ev instanceof Event) {
			currentSelectedImg = img_or_ev.Target
		} else if (img_or_ev.currentTarget) {
			currentSelectedImg = img_or_ev.currentTarget;
		} else if (img_or_ev.nodeName.toLowerCase() === 'img') {
			currentSelectedImg = img_or_ev;
		}
		var src = currentSelectedImg.src;
		var existing = document.getElementsByClassName('imgzoom-large');

		if (!wasNavigating && existing && existing.length > 0 && existing[0].src === src) {
			return
		}

		currentSelectedImg.className += 'imgzoom-loading'
		
		addnavigationButtons();
		setNavigationButtonState(currentSelectedImg);

		// We use the load event (rather than just displaying it) to make sure
		// the image is fully loaded.
		large.onload = function () {
			currentSelectedImg.className = currentSelectedImg.className.replace(/\s?imgzoom-loading\s?/g, '')

			// Make the new image as large as possible but not larger than the viewport.
			var width = large.width * (1 / window.devicePixelRatio),
				height = large.height * (1 / window.devicePixelRatio),
				padding = 25,
				window_width = document.documentElement.clientWidth - padding,
				window_height = document.documentElement.clientHeight - padding
			if (width > window_width) {
				height = height / (width / window_width)
				width = window_width
			}
			if (height > window_height) {
				width = width / (height / window_height)
				height = window_height
			}

			// The large image isn't going to be much larger than the original.
			if (currentSelectedImg.width * min_size >= width - padding / 2 && currentSelectedImg.height * min_size >= height - padding / 2)
				return

			large.className = 'imgzoom-large'
			large.style.position = 'absolute'
			large.style.zIndex = '5000'

			// Set the position to the same as the original.
			var offset = get_offset(currentSelectedImg)
			set_geometry(large, {
				width: currentSelectedImg.width,
				height: currentSelectedImg.height,
				top: offset.top,
				left: offset.left,
			})
			document.body.appendChild(large)

			// Animate it to the new size.
			set_geometry(large, {
				width: width,
				height: height,
				left: (window_width - width + padding) / 2,
				top: (window_height - height + padding) / 2 +
					(document.documentElement.scrollTop || document.body.scrollTop),
			})

			html.addEventListener('click', close)
			html.addEventListener('keydown', close_key)
		}
		large.src = src
	}

	var close_key = function (e) {
		if (e.keyCode === 27)
			close()
	}

	var setNavigationButtonState = function (selectedImg) {
		var containerFigure = $(selectedImg).parent();
		var previous = containerFigure.prev()
		var next = containerFigure.next()

		var hasNext = next.prop("tagName") === "FIGURE";
		var hasPrevious = previous.prop("tagName") === "FIGURE";

		// single image, show no navigation
		if (!hasNext && !hasPrevious) {
			nextButton.hidden = true;
			previousButton.hidden = true;
			return;
		}

		if (hasNext) {
			nextButton.disabled = false;
			nextImg = next.find("img").get(0);
		} else {
			nextButton.disabled = true;
			nextImg = null;
		}

		if (hasPrevious) {
			previousButton.hidden = false;
			previousImg = previous.find("img").get(0);
			previousButton.disabled = false;
		}
		else {
			previousButton.disabled = true;
			previousImg = null;
		}
	}

	var close = function () {
				
		html.removeEventListener('click', close)
		html.removeEventListener('click', close_key)

		var offset = get_offset(currentSelectedImg)
		set_geometry(large, {
			width: currentSelectedImg.width,
			height: currentSelectedImg.height,
			top: offset.top,
			left: offset.left,
		})

		previousImg = null;
		nextImg = null;
		wasNavigating = false;

		// Remove the class after a brief timeout, so that the animation
		// appears fairly smooth in case of added padding and such.
		// TODO: Detect position instead of using a timeout?
		setTimeout(function () {
			if (large.parentNode) {
				large.parentNode.removeChild(large)
			}

			if (nextButton && nextButton.parentNode) {
				nextButton.parentNode.removeChild(nextButton);
				nextButton = null;
			}

			if (previousButton && previousButton.parentNode) {
				previousButton.parentNode.removeChild(previousButton);
				previousButton = null;
			}
		}, 300)
	}

	var onNextClicked = function (event) {
		event.stopPropagation();
		currentSelectedImg = nextImg;
		large.src = nextImg.src;
		setNavigationButtonState(nextImg);
	}
	var onPreviousClicked = function (event) {
		event.stopPropagation()
		currentSelectedImg = previousImg;
		large.src = previousImg.src;
		setNavigationButtonState(previousImg);
	}

	var addnavigationButtons = function () {
		var padding = 25;
		var window_width = document.documentElement.clientWidth - padding;
		var window_height = document.documentElement.clientHeight - padding;
		var buttonHeigth = 50;
		var buttonWidth = 50;

		if (!nextButton) {
			nextButton = createNavigationButton(createArrowSvg("rigth"))
			set_geometry(nextButton, {
				width: buttonWidth,
				height: buttonHeigth,
				top: window_height - buttonHeigth / 2 - padding,
				left: window_width / 2 + buttonWidth + padding,
			})
			nextButton.onclick = onNextClicked;
			document.body.appendChild(nextButton);
		}

		if (!previousButton) {
			previousButton = createNavigationButton(createArrowSvg("left"))
			set_geometry(previousButton, {
				width: buttonWidth,
				height: buttonHeigth,
				top: window_height - buttonHeigth / 2 - padding,
				left: window_width / 2 - buttonWidth - padding,
			})
			previousButton.onclick = onPreviousClicked;
			document.body.appendChild(previousButton);
		}
	}

	var createNavigationButton = function (arrowSvgElement) {
		var button = document.createElement("input");
		button.type = "button";
		button.value = "";
		button.setAttribute("type", "image");
		button.className = 'gallery-button';
		button.style.position = 'absolute';
		button.style.zIndex = '5001';
		button.appendChild(arrowSvgElement);
		return button;
	}

	var createArrowSvg = function (direction) {
		var svgURI = 'http://www.w3.org/2000/svg';
		var svg = document.createElementNS(svgURI, 'svg');
		svg.setAttribute('viewBox', '0 0 100 100');
		var path = document.createElementNS(svgURI, 'path');
		path.setAttribute('d', 'M 50,0 L 60,10 L 20,50 L 60,90 L 50,100 L 0,50 Z');
		if (direction === "left") {
			path.setAttribute('transform', 'translate(15,0)');
		} else if (direction === "rigth") {
			path.setAttribute('transform', 'translate(85,100) rotate(180)');
		}
		
		path.setAttribute('class', 'arrow');
		svg.appendChild(path);
		return svg;
	}

	var set_geometry = function (elem, geom) {
		if (geom.width != null) {
			elem.style.width = geom.width + 'px'

			// Reset as they'll interfere with the width we want to set.
			elem.style.maxWidth = 'none'
			elem.style.minWidth = 'none'
		}
		if (geom.height != null) {
			elem.style.height = geom.height + 'px'
			elem.style.maxHeight = 'none'
			elem.style.minHeight = 'none'
		}
		if (geom.left != null)
			elem.style.left = geom.left + 'px'
		if (geom.top != null)
			elem.style.top = geom.top + 'px'
	}

	var get_offset = function (elem) {
		var rect = elem.getBoundingClientRect(),
			doc = elem.ownerDocument,
			docElem = doc.documentElement,
			win = doc.defaultView
		return {
			top: rect.top + win.pageYOffset - docElem.clientTop,
			left: rect.left + win.pageXOffset - docElem.clientLeft
		}
	}

	if (expose_global)
		window.imgzoom = imgzoom

	return imgzoom
});
