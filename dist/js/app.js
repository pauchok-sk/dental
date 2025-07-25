(() => {
    "use strict";
    function burger() {
        const burgerOpen = document.querySelector("#burger-open");
        const burgerClose = document.querySelector("#burger-close");
        const burger = document.querySelector("#burger");
        const burgerOverlay = document.querySelector("#burger-overlay");
        if (burger) {
            burger.addEventListener("click", e => e.stopPropagation());
            burgerOverlay.addEventListener("click", handlerBurgerClose);
            burgerOpen.addEventListener("click", e => {
                e.stopPropagation();
                handlerBurgerOpen();
            });
            burgerClose.addEventListener("click", e => {
                e.stopPropagation();
                handlerBurgerClose();
            });
            function handlerBurgerOpen() {
                burger.classList.add("_open");
                burgerOverlay.classList.add("_active");
                document.body.classList.add("body-hidden");
            }
            function updateHeightBurger() {
                burger.style.maxHeight = `${window.visualViewport.height}px`;
            }
            window.visualViewport.addEventListener("resize", updateHeightBurger);
            window.visualViewport.addEventListener("scroll", updateHeightBurger);
            updateHeightBurger();
        }
    }
    function handlerBurgerClose() {
        const burger = document.querySelector("#burger");
        const burgerOverlay = document.querySelector("#burger-overlay");
        burger.classList.remove("_open");
        burgerOverlay.classList.remove("_active");
        document.body.classList.remove("body-hidden");
    }
    function anchors_anchors() {
        document.querySelectorAll("[data-anchor]").forEach(link => {
            link.addEventListener("click", function(e) {
                e.preventDefault();
                let href = this.getAttribute("href").substring(1);
                const scrollTarget = document.getElementById(href);
                if (scrollTarget) {
                    window.scrollBy({
                        top: scrollTarget.getBoundingClientRect().top,
                        behavior: "smooth"
                    });
                    handlerBurgerClose();
                }
            });
        });
    }
    function beforeAfter() {
        const containers = document.querySelectorAll(".s-res__slide-gallery");
        if (containers.length) containers.forEach(container => {
            const range = container.querySelector(".s-res__slide-range");
            const imgBefore = container.querySelector(".s-res__slide-before");
            const toggle = container.querySelector(".s-res__slide-toggle");
            range.addEventListener("input", e => {
                const value = +e.target.value;
                imgBefore.style.width = `${value}%`;
                toggle.style.left = `${value}%`;
            });
            range.addEventListener("mousedown", () => {
                range.style.cursor = "grabbing";
            });
            range.addEventListener("mouseup", () => {
                range.style.cursor = "grab";
            });
        });
    }
    function headerScroll() {
        const header = document.querySelector(".header");
        if (header) {
            let lastScrollTop = 0;
            window.addEventListener("scroll", () => {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                if (scrollTop > header.clientHeight && scrollTop > lastScrollTop) header.classList.add("_scroll"); else header.classList.remove("_scroll");
                lastScrollTop = scrollTop;
            });
        }
    }
    function map() {
        const contactsMap = document.querySelector("#map");
        if (contactsMap) {
            function init() {
                const center = JSON.parse(contactsMap.dataset.center);
                const zoom = Number(contactsMap.dataset.zoom);
                const map = new ymaps.Map("map", {
                    center,
                    zoom
                });
                const placemark = new ymaps.Placemark(center, {}, {
                    iconLayout: "default#image",
                    iconImageHref: "./img/icon-map.svg",
                    iconImageSize: [ 45, 45 ],
                    iconImageOffset: [ -20, -40 ]
                });
                map.controls.remove("geolocationControl");
                map.controls.remove("searchControl");
                map.controls.remove("trafficControl");
                map.controls.remove("typeSelector");
                map.controls.remove("fullscreenControl");
                map.controls.remove("zoomControl");
                map.controls.remove("rulerControl");
                map.behaviors.disable([ "scrollZoom" ]);
                map.geoObjects.add(placemark);
            }
            ymaps.ready(init);
        }
    }
    function maskTel() {
        const inputs = document.querySelectorAll('input[type="tel"]');
        const im = new Inputmask("+7 (999) 999-99-99");
        im.mask(inputs);
        inputs.forEach(input => {
            input.addEventListener("keydown", e => {
                const value = e.target.value;
                value.split("");
                if (value.length === 0 && (e.key === "8" || e.key === "7")) e.preventDefault();
            });
        });
    }
    function more() {
        const containers = document.querySelectorAll(".container-more");
        if (containers.length) containers.forEach(container => {
            const btn = container.querySelector("[data-more-btn]");
            const count = +container.dataset.countShow;
            const lengthItems = container.querySelectorAll("[data-more-item]").length;
            if (count >= lengthItems && btn) btn.remove();
            btn.addEventListener("click", () => {
                const items = container.querySelectorAll("[data-more-item]");
                const hideItems = Array.from(items).filter(item => window.getComputedStyle(item).display === "none");
                hideItems.splice(0, count).forEach(item => {
                    item.style.display = "block";
                    setTimeout(() => {
                        item.style.opacity = 1;
                        item.style.transform = "translateY(0)";
                    });
                });
                if (hideItems.length <= 0) btn.remove();
            });
        });
    }
    function quiz() {
        const form = document.querySelector("#quiz-form");
        if (form) {
            const btnGet = document.querySelector("#quiz-get");
            const startSlide = document.querySelector("#quiz-start");
            const slides = form.querySelectorAll(".s-quiz__slide");
            const navigation = document.querySelector("#quiz-nav");
            const pagination = document.querySelector("#quiz-pagination");
            const quizEnd = document.querySelector("#quiz-end");
            const btnPrev = document.querySelector("#quiz-prev");
            const btnNext = document.querySelector("#quiz-next");
            let index = 0;
            btnGet.addEventListener("click", () => {
                hide(startSlide);
                show(slides[index]);
                show(navigation);
                show(form, "flex");
            });
            btnPrev.addEventListener("click", () => {
                if (index === 0) {
                    show(startSlide);
                    hide(slides[index]);
                    hide(navigation);
                    hide(form);
                } else {
                    show(slides[index - 1]);
                    hide(slides[index]);
                    index -= 1;
                }
                changePagination();
            });
            btnNext.addEventListener("click", () => {
                if (index + 1 === slides.length) {
                    hide(navigation);
                    hide(slides[index]);
                    show(quizEnd);
                } else {
                    hide(slides[index]);
                    show(slides[index + 1]);
                    index += 1;
                }
                changePagination();
            });
            for (let i = 0; i < slides.length; i++) {
                const div = document.createElement("div");
                if (i === 0) div.classList.add("_active");
                div.addEventListener("click", () => {
                    hide(slides[index]);
                    show(slides[i]);
                    index = i;
                    changePagination();
                });
                pagination.appendChild(div);
            }
            function changePagination() {
                const items = pagination.querySelectorAll("div");
                items.forEach(d => d.classList.remove("_active"));
                items[index].classList.add("_active");
            }
            function hide(el) {
                if (!el) return;
                el.style.opacity = 0;
                el.style.display = "none";
            }
            function show(el, showStyle) {
                if (!el) return;
                el.style.display = showStyle || "block";
                setTimeout(() => {
                    el.style.opacity = 1;
                }, 10);
            }
        }
    }
    function sliders() {
        const servicesNavSlider = document.querySelector(".s-services__nav-slider");
        if (servicesNavSlider) {
            new Swiper(servicesNavSlider, {
                spaceBetween: 20,
                slidesPerView: "auto",
                navigation: {
                    prevEl: ".s-services .slider-btn._prev",
                    nextEl: ".s-services .slider-btn._next"
                },
                breakpoints: {
                    768: {
                        spaceBetween: 30,
                        slidesPerView: "auto"
                    }
                }
            });
        }
        const resSlider = document.querySelector(".s-res__slider");
        if (resSlider) {
            new Swiper(resSlider, {
                speed: 800,
                spaceBetween: 20,
                slidesPerView: 1,
                navigation: {
                    prevEl: ".s-res .slider-btn._prev",
                    nextEl: ".s-res .slider-btn._next"
                },
                autoplay: {
                    delay: 3500,
                    disableOnInteraction: true
                },
                allowTouchMove: false,
                breakpoints: {
                    1100: {
                        spaceBetween: 35,
                        slidesPerView: 4,
                        allowTouchMove: true
                    },
                    768: {
                        spaceBetween: 25,
                        slidesPerView: 3,
                        allowTouchMove: true
                    },
                    480: {
                        spaceBetween: 20,
                        slidesPerView: 2,
                        allowTouchMove: true
                    }
                }
            });
        }
        const gallerySlider = document.querySelector(".s-gallery__slider");
        if (gallerySlider) {
            new Swiper(gallerySlider, {
                speed: 800,
                slidesPerView: "auto",
                spaceBetween: 20,
                navigation: {
                    prevEl: ".s-gallery .slider-btn._prev",
                    nextEl: ".s-gallery .slider-btn._next"
                },
                autoplay: {
                    delay: 3500
                }
            });
        }
        const teamSlider = document.querySelector(".s-team__slider");
        if (teamSlider) {
            new Swiper(teamSlider, {
                speed: 800,
                slidesPerView: "auto",
                spaceBetween: 15,
                navigation: {
                    prevEl: ".s-team .slider-btn._prev",
                    nextEl: ".s-team .slider-btn._next"
                },
                autoplay: {
                    delay: 3200
                },
                breakpoints: {
                    992: {
                        slidesPerView: 4,
                        spaceBetween: 15
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 15
                    },
                    480: {
                        slidesPerView: 2,
                        spaceBetween: 15
                    }
                }
            });
        }
        const socialSlider = document.querySelector(".s-social__slider");
        if (socialSlider) {
            new Swiper(socialSlider, {
                speed: 800,
                slidesPerView: 1,
                spaceBetween: 20,
                navigation: {
                    prevEl: ".s-social .slider-btn._prev",
                    nextEl: ".s-social .slider-btn._next"
                },
                autoplay: {
                    delay: 3200
                },
                breakpoints: {
                    992: {
                        slidesPerView: 4,
                        spaceBetween: 20
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    },
                    480: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    }
                }
            });
        }
    }
    function spoller() {
        const spollersArray = document.querySelectorAll("[data-spollers]");
        if (spollersArray.length > 0) {
            const spollersRegular = Array.from(spollersArray).filter(function(item, index, self) {
                return !item.dataset.spollers.split(",")[0];
            });
            if (spollersRegular.length) initSpollers(spollersRegular);
            let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
            if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach(mdQueriesItem => {
                mdQueriesItem.matchMedia.addEventListener("change", function() {
                    initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                });
                initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            });
            function initSpollers(spollersArray, matchMedia = false) {
                spollersArray.forEach(spollersBlock => {
                    spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                    if (matchMedia.matches || !matchMedia) {
                        spollersBlock.classList.add("_spoller-init");
                        initSpollerBody(spollersBlock);
                        spollersBlock.addEventListener("click", setSpollerAction);
                    } else {
                        spollersBlock.classList.remove("_spoller-init");
                        initSpollerBody(spollersBlock, false);
                        spollersBlock.removeEventListener("click", setSpollerAction);
                    }
                });
            }
            function initSpollerBody(spollersBlock, hideSpollerBody = true) {
                let spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
                if (spollerTitles.length) {
                    spollerTitles = Array.from(spollerTitles).filter(item => item.closest("[data-spollers]") === spollersBlock);
                    spollerTitles.forEach(spollerTitle => {
                        if (hideSpollerBody) {
                            spollerTitle.removeAttribute("tabindex");
                            if (!spollerTitle.classList.contains("_spoller-active")) spollerTitle.nextElementSibling.hidden = true;
                        } else {
                            spollerTitle.setAttribute("tabindex", "-1");
                            spollerTitle.nextElementSibling.hidden = false;
                        }
                    });
                }
            }
            function setSpollerAction(e) {
                const el = e.target;
                if (el.closest("[data-spoller]")) {
                    const spollerTitle = el.closest("[data-spoller]");
                    const spollersBlock = spollerTitle.closest("[data-spollers]");
                    const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    if (!spollersBlock.querySelectorAll("._slide").length) {
                        if (oneSpoller && !spollerTitle.classList.contains("_spoller-active")) hideSpollersBody(spollersBlock);
                        spollerTitle.classList.toggle("_spoller-active");
                        _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
                    }
                    e.preventDefault();
                }
            }
            function hideSpollersBody(spollersBlock) {
                const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._spoller-active");
                const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                if (spollerActiveTitle && !spollersBlock.querySelectorAll("._slide").length) {
                    spollerActiveTitle.classList.remove("_spoller-active");
                    _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
                }
            }
            const spollersClose = document.querySelectorAll("[data-spoller-close]");
            if (spollersClose.length) document.addEventListener("click", function(e) {
                const el = e.target;
                if (!el.closest("[data-spollers]")) spollersClose.forEach(spollerClose => {
                    const spollersBlock = spollerClose.closest("[data-spollers]");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    spollerClose.classList.remove("_spoller-active");
                    _slideUp(spollerClose.nextElementSibling, spollerSpeed);
                });
            });
        }
        function dataMediaQueries(array, dataSetValue) {
            const media = Array.from(array).filter(function(item, index, self) {
                if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
            });
            if (media.length) {
                const breakpointsArray = [];
                media.forEach(item => {
                    const params = item.dataset[dataSetValue];
                    const breakpoint = {};
                    const paramsArray = params.split(",");
                    breakpoint.value = paramsArray[0];
                    breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                    breakpoint.item = item;
                    breakpointsArray.push(breakpoint);
                });
                let mdQueries = breakpointsArray.map(function(item) {
                    return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
                });
                mdQueries = uniqArray(mdQueries);
                const mdQueriesArray = [];
                if (mdQueries.length) {
                    mdQueries.forEach(breakpoint => {
                        const paramsArray = breakpoint.split(",");
                        const mediaBreakpoint = paramsArray[1];
                        const mediaType = paramsArray[2];
                        const matchMedia = window.matchMedia(paramsArray[0]);
                        const itemsArray = breakpointsArray.filter(function(item) {
                            if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                        });
                        mdQueriesArray.push({
                            itemsArray,
                            matchMedia
                        });
                    });
                    return mdQueriesArray;
                }
            }
        }
        let _slideUp = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = `${target.offsetHeight}px`;
                target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                window.setTimeout(() => {
                    target.hidden = !showmore ? true : false;
                    !showmore ? target.style.removeProperty("height") : null;
                    target.style.removeProperty("padding-top");
                    target.style.removeProperty("padding-bottom");
                    target.style.removeProperty("margin-top");
                    target.style.removeProperty("margin-bottom");
                    !showmore ? target.style.removeProperty("overflow") : null;
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideUpDone", {
                        detail: {
                            target
                        }
                    }));
                }, duration);
            }
        };
        let _slideDown = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.hidden = target.hidden ? false : null;
                showmore ? target.style.removeProperty("height") : null;
                let height = target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                target.offsetHeight;
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = height + "px";
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                window.setTimeout(() => {
                    target.style.removeProperty("height");
                    target.style.removeProperty("overflow");
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideDownDone", {
                        detail: {
                            target
                        }
                    }));
                }, duration);
            }
        };
        let _slideToggle = (target, duration = 500) => {
            if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
        };
        function uniqArray(array) {
            return array.filter(function(item, index, self) {
                return self.indexOf(item) === index;
            });
        }
    }
    function tabs() {
        const buttons = document.querySelectorAll("[data-tab-btn]");
        if (buttons.length) buttons.forEach(btn => {
            btn.addEventListener("click", () => {
                const container = btn.closest(".tabs");
                const tabId = btn.dataset.tabBtn;
                const allButtons = container.querySelectorAll("[data-tab-btn]");
                const allTabs = container.querySelectorAll("[data-tab]");
                const currentTab = container.querySelector(`[data-tab="${tabId}"]`);
                allTabs.forEach(t => {
                    t.classList.remove("_active");
                    t.style.opacity = 0;
                });
                currentTab.classList.add("_active");
                setTimeout(() => {
                    currentTab.style.opacity = 1;
                }, 10);
                allButtons.forEach(b => b.classList.remove("_active"));
                btn.classList.add("_active");
            });
        });
    }
    spoller();
    burger();
    headerScroll();
    sliders();
    more();
    tabs();
    quiz();
    beforeAfter();
    maskTel();
    anchors_anchors();
    map();
    Fancybox.bind("[data-fancybox]", {});
})();