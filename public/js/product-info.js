function scrollToSizeChart() {
    let productDescriptionSection = document.getElementById("size-chart-img");
    if (productDescriptionSection) {
        let yOffset = productDescriptionSection.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: yOffset, behavior: "smooth" });
    }
}

function increaseValue(inputId) {
    let value = parseInt(document.getElementById(inputId).value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById(inputId).value = value;
}

function decreaseValue(inputId) {
    let value = parseInt(document.getElementById(inputId).value, 10);
    value = isNaN(value) ? 0 : value;
    value < 1 ? (value = 1) : "";
    value > 1 ? value-- : "";
    document.getElementById(inputId).value = value;
}

function changeMainImage(event) {
    document.querySelector(".main-image img").src = event.target.src.replace(
        /width=\d+/i,
        "width=626&height=626"
    );
}

function Magnifier(magnifierSize = 250, magnification = 4) {
    let magnifyDiv;

    function magnifyElement(element) {
        magnifyDiv.style.display = "block";
        const { width, height, src } = element;
        const magnifyOffset = magnifyDiv.offsetWidth / 2;
        const imagePos = element.getBoundingClientRect();

        magnifyDiv.style.backgroundSize = `${width * magnification}px ${height * magnification}px`;
        magnifyDiv.style.backgroundImage = `url("${src}")`;
        magnifyDiv.style.width = `${magnifierSize}px`;
        magnifyDiv.style.height = `${magnifierSize}px`;

        document.addEventListener("mousemove", function (e) {
            handleMouseMove(e, element, magnifyOffset, imagePos);
        });
    }

    function handleMouseMove(e, element, magnifyOffset, imagePos) {
        if (!magnifyDiv) return;

        const backgroundPos =
            `-${(e.pageX - imagePos.left) * magnification - magnifyOffset}px ` +
            `-${(e.pageY - imagePos.top) * magnification - magnifyOffset}px`;

        magnifyDiv.style.left = `${e.pageX - magnifyOffset}px`;
        magnifyDiv.style.top = `${e.pageY - magnifyOffset}px`;
        magnifyDiv.style.backgroundPosition = backgroundPos;
    }

    this.magnifyImg = function (ptr, customMagnification, customMagnifierSize) {
        const pointer = typeof ptr === "string" ? document.querySelector(ptr) : ptr;

        customMagnification =
            customMagnification !== undefined ? +customMagnification : magnification;

        pointer.addEventListener("mouseenter", function () {
            pointer.style.cursor = "none";
            setTimeout(() => magnifyElement(pointer), 50);
        });

        pointer.addEventListener("mouseleave", function () {
            if (magnifyDiv) {
                magnifyDiv.style.display = "none";
            }
            document.removeEventListener("mousemove", handleMouseMoveRef);
        });
    };

    this.init = function () {
        magnifyDiv = document.createElement("div");
        magnifyDiv.className = "magnify";
        document.body.appendChild(magnifyDiv);
    };

    return this.init();
}

const magnifierSize = 250;
const magnification = 4;
const magnify = new Magnifier();
magnify.magnifyImg("#magnify-img", magnification, magnifierSize);
