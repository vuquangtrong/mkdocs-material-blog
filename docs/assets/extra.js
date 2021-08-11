/* detect click or drag on zoomed images */
var dragged = false;
document.addEventListener("mousedown", () => (dragged = false));
document.addEventListener("mousemove", () => (dragged = true));
/* init view_bigimg */
const viewer = new ViewBigimg();
function activateBigImg() {
    /* enable zoom-in */
    var figures = document.querySelectorAll("img");
    for (var i = 0; i < figures.length; i++) {
        figures[i].onclick = (e) => {
            if (e.target.nodeName === "IMG") {
                viewer.show(e.target.src);
            }
        };
    }
    /* click to close zoomed image */
    var containers = document.querySelectorAll("#iv-container .iv-image-view");
    for (var i = 0; i < containers.length; i++) {
        containers[i].onclick = () => {
            if (!dragged) {
                viewer.hide();
            }
        };
    }
}
/* open external links in new tab */
function activateExternalLinks() {
    var links = document.links;
    for (var i = 0, linksLength = links.length; i < linksLength; i++) {
        if (links[i].hostname != window.location.hostname) {
            links[i].target = "_blank";
            links[i].setAttribute("rel", "noopener noreferrer");
            links[i].className += " externalLink";
        } else {
            links[i].className += " localLink";
        }
    }
}
/* scroll to top */
function scrollToTop() {
    // delay a little for css to calculate windows size
    setTimeout(function () {
        window.scrollTo(0, 0);
    }, 100);
}
/* pagination links */
function activatePaginationLinks() {
    var pagination = document.getElementById("pagination");
    if (pagination) {
    var links = pagination.getElementsByClassName("page-number");
    if (links.length) {
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener("click", function() {
                var current = pagination.getElementsByClassName("active");
                console.log(current);
                if (current.length) {
                    current[0].className = current[0].className.replace(
                        " active",
                        ""
                    );
                }
                this.className += " active";
                scrollToTop();
            });
        }
        links[0].click();
        scrollToTop();
    }
    }
}
/* send changed url, read more at 
   https://help.disqus.com/en/articles/1717163-using-disqus-on-ajax-sites */
function resetDisqusPlugin() {
    var page_url = document.getElementById("page_url");
    var page_identifier = document.getElementById("page_identifier");
    if (page_url && page_identifier) {
        page_url = page_url.dataset.value + "#!newthread";
        page_identifier = page_identifier.dataset.value;
        try {
            DISQUS_RECOMMENDATIONS.reset();
            DISQUS.reset({
                reload: true,
                config: function () {
                    this.page.identifier = page_identifier;
                    this.page.url = page_url;
                },
            });
            console.log(page_url);
            console.log(page_identifier);
        } catch (e) {
            // console.log(e);
        }
    }
}
function reactivateElements() {
    activateBigImg();
    activateExternalLinks();
    activatePaginationLinks();
    resetDisqusPlugin();
    scrollToTop();
}
window.addEventListener("load", () => {
    reactivateElements();
});
// capture the location at page load
var currentLocation = document.location.href;
const observer = new MutationObserver(() => {
    if (currentLocation !== document.location.href) {
        console.log("URL changed!");
        currentLocation = document.location.href;
        reactivateElements();
    }
});
observer.observe(document.getElementsByTagName("HEAD")[0], { childList: true });
