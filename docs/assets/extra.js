/* detect click or drag on zoomed images */
var dragged = false;
document.addEventListener("mousedown", () => (dragged = false));
document.addEventListener("mousemove", () => (dragged = true));

/* add actions on images */
const viewer = new ViewBigimg();
function activateBigImg() {
    /* enable zoom-in */
    var figures = document.querySelectorAll(".md-typeset img");
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

/* add class for external links in new tab */
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

/* dynamic styles */
function styleAdmonitions() {
    var admonition_titles = document.querySelectorAll(".admonition-title");
    for (var i = 0; i < admonition_titles.length; i++) {
        if (admonition_titles[i].textContent.trim() === "") {
            admonition_titles[i].nextElementSibling.style.marginTop = "0";
        }
    }
}

/* run all */
function run() {
    activateBigImg();
    activateExternalLinks();
    styleAdmonitions();
}

var other_run = window.onload;
window.onload = function () {
    if(other_run) other_run();
    run();
};  

/* subscribe encrypted content */
var decrypted_content = document.getElementById('mkdocs-decrypted-content');
if (decrypted_content) {
    decrypted_content.onchange = function() {
        setTimeout(() => {
            run();
            MathJax.typesetPromise();
        }, 1000);
    };
}
