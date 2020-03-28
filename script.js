'use strict';

window.onload = function() {
  disableAnimationsOnLoading();
  addScrollHandler();
  addModalHandlers();
  addPortfolioImageHandler();
  addPhonesHandler();
  addFilterHandler();
  addSliderHandler();
  addFormHandler();
  addBurgerHandler();
  addMenuHandler();
  addResizeHandler();
}

const addScrollHandler = () => {
  document.addEventListener("scroll", onScroll);
}

const updateHeaderHeight = () => {
  const style = getComputedStyle(document.body);

  const big = style.getPropertyValue("--header-height-default-big");
  const small = style.getPropertyValue("--header-height-default-small");

  const root = document.querySelector(":root");
  root.style.setProperty("--header-height", window.scrollY > 30 ? small : big);
}

const updateActiveLink = () => {
  const menuItems = document.querySelectorAll('.site-header__nav-link');
  const curPos = window.scrollY + 80;
  
  const sectionStarts = document.querySelectorAll('.section-start');
  const sectionContent = document.querySelectorAll('.section-start ~ section');

  sectionStarts.forEach((el, index) => {
    if(sectionContent[index].offsetTop <= curPos && sectionContent[index].offsetTop + sectionContent[index].offsetHeight > curPos) {
      menuItems.forEach((a) => {
        a.classList.remove('site-header__nav-link--active');
        if(el.getAttribute('id') === a.getAttribute('href').substring(1)) {
          a.classList.add('site-header__nav-link--active');
        }
      });
    }
  });
};

const onScroll = () => {
  updateActiveLink();
  updateHeaderHeight();
}

const makeActive = (targetClass, container, target, callback, toggle) => {
  const activeClass = targetClass + '--active';

  let runCallback = true;
  container.forEach((el) => {
    if(el.classList.contains(activeClass)) {
      if(target === el) {
        runCallback = false;
      }
    }
    
    if(target !== el) {
      el.classList.remove(activeClass);
    }
  });
  
  if(target.classList.contains(targetClass)) {
    if(toggle) {
      target.classList.toggle(activeClass);
    } else {
      target.classList.add(activeClass);
    }
  }

  if(callback && runCallback) {
    callback();
  }
}

const disableAnimationsOnLoading = () => {
  document.querySelector('body').classList.remove('preload');
  document.querySelector('.slide__wrapper').classList.remove('visually-hidden');
}

const shuffleImages = (images) => {
  for(let i = images.length - 1; i >= 1; --i) {
    const newPosition = rand(0, i);
    swapNodes(images, i, newPosition);
  }
}

const swapNodes = (childs, a, b) => {
  const parent = childs[a].parentNode;
  const replaced = parent.replaceChild(childs[b], childs[a]);
  parent.insertBefore(replaced, childs[b]);
}

const slider = document.querySelector(".slider");
  const slides = slider.querySelectorAll(".slide");

  function sliderReset() {
    let index = 0;

    slides.forEach((it, ind) => {
      if(it.classList.contains("slide--active")) {
        index = ind;
        it.classList.remove("slide--active");
      }
    });

    return index;
  }

const changeSliderBg = (slideNumber) => {
  slider.classList.toggle("slider--red", slideNumber === 0);
  slider.classList.toggle("slider--blue", slideNumber === 1);
}

const animate = (target, from, to, duration, timingFunction) => {
  target.animate([
    {...from},
    {...to},
  ], {
    duration: duration,
    easing: timingFunction
  });
}

const nextSlide = () => {
  let prevIndex = sliderReset();
  let newIndex = (prevIndex + 1) % slides.length;

  animate(slides[newIndex], {transform: 'translate(100%)'}, {transform: 'translate(0)'}, 500, 'ease-in-out');
  animate(slides[prevIndex], {transform: 'translate(0)'}, {transform: 'translate(-100%)'}, 500, 'ease-in-out');

  slides[newIndex].classList.add('slide--active');
  changeSliderBg(newIndex);
}

const prevSlide = () => {
  let prevIndex = sliderReset()
  let newIndex = prevIndex - 1;

  if(newIndex < 0) newIndex = slides.length - 1;

  animate(slides[newIndex], {transform: 'translate(-100%)'}, {transform: 'translate(0)'}, 500, 'ease-in-out');
  animate(slides[prevIndex], {transform: 'translate(0)'}, {transform: 'translate(100%)'}, 500, 'ease-in-out');

  slides[newIndex].classList.add('slide--active');
  changeSliderBg(newIndex);
}

const rand = (a, b) => Math.floor(Math.random() * (b - a) + a);

const addField = (name, str, def) => {
  return !str.length ? def : name + str;
}

const form = document.querySelector(".form");

const modal = document.querySelector(".modal");
const modalShadow = document.querySelector(".modal__shadow");
const modalHeader = modal.querySelector(".modal__header");
const modalSubject = modal.querySelector(".modal__subject");
const modalDescription = modal.querySelector(".modal__description");
const modalClose = modal.querySelector(".modal__close");

const inputName = form.querySelector("#input-name");
const inputEmail = form.querySelector("#input-email");
const inputSubject = form.querySelector("#input-subject");
const inputDetails = form.querySelector("#input-details");

const content = document.querySelector(".content");

const toggleScreen = (value) => {
  content.classList.toggle("content--modal", value);
}

const openModal = () => {
  modal.classList.add("modal--active");
  toggleScreen(true);
}

const clearForm = () => {
  inputName.value = "";
  inputEmail.value = "";
  inputSubject.value = "";
  inputDetails.value = "";
}

const closeModal = () => {
  modal.classList.remove("modal--active");
  toggleScreen(false);
  clearForm();
}

const addModalHandlers = () => {
  modalClose.addEventListener("click", () => {
    closeModal()
  });

  document.addEventListener("click", (e) => {
    if(e.target === modalShadow) {
      closeModal()
    }
  });

  document.addEventListener("keydown", (e) => {
    if(e.code === "Escape") {
      closeModal()
    }
  });
}

const setModal = () => {
  modalHeader.innerText = "The letter was sent";
  modalSubject.innerText = addField("Subject: ", inputSubject.value, "No subject");
  modalDescription.innerText = addField("Description: ", inputDetails.value, "No description");

  openModal();
}

const portfolio = document.querySelector('.portfolio__works');

const addPortfolioImageHandler = () => {
  const portfolioItemClass = "portfolio__work-image";
  const portfolioImages = portfolio.querySelectorAll('.' + portfolioItemClass);

  portfolio.addEventListener("click", (e) => {
    makeActive(portfolioItemClass, portfolioImages, e.target, undefined, true);
  });
}

const addFilterHandler = () => {
  const filter = document.querySelector('.filter');
  const filterItemClass = "filter__item";
  const filterItems = filter.querySelectorAll('.' + filterItemClass);

  filter.addEventListener("click", (e) => {
    makeActive(filterItemClass, filterItems, e.target, () => {
      if(e.target.classList.contains("filter__item")) {
        const portfolioItems = portfolio.querySelectorAll(".portfolio__work-item");
        shuffleImages(portfolioItems);
      }
    });
  });
}

const addPhonesHandler = () => {
  const phones = document.querySelectorAll('.phone');

  phones.forEach((el) => {
    el.addEventListener("click", (e) => {
      if(!e.target.classList.contains('phone__shadow')) {
        el.classList.toggle("phone--off");
      }
    });
  });
}

const addSliderHandler = () => {
  const sliderPrevButton = document.querySelector(".slider__arrow--left");
  const sliderNextButton = document.querySelector(".slider__arrow--right");

  sliderPrevButton.addEventListener("click", () => {
    prevSlide();
  });

  sliderNextButton.addEventListener("click", () => {
    nextSlide();
  });
}

const addFormHandler = () => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    setModal();
  });
}

const addBurgerHandler = () => {
  const burgerButton = document.querySelector(".site-header__burger");
  
  burgerButton.addEventListener("click", (e) => {
    toggleMenu();
    e.stopPropagation();
  });
}

const toggleMenu = (open) => {
  const navMenu = document.querySelector(".site-header__nav");
  const burgerButton = document.querySelector(".site-header__burger");
  const headerLogo = document.querySelector(".site-header__logo");
  const navShadow = document.querySelector(".site-header__nav-shadow");
  
  toggle(navMenu, "site-header__nav--active", open);
  toggle(burgerButton, "site-header__burger--active", open);
  toggle(headerLogo, "site-header__logo--menu-active", open);
  toggle(navShadow, "site-header__nav-shadow--active", open);
}

const toggle = (selector, className, value) => {
  if(value !== undefined) {
    selector.classList.toggle(className, value);
  } else {
    selector.classList.toggle(className);
  }
}

const opennedMenu = () => {
  return document.querySelector(".site-header__nav").classList.contains("site-header__nav--active");
}

const addMenuHandler = () => {
  const navMenu = document.querySelector(".site-header__nav");

  navMenu.addEventListener("click", (e) => {
    if(e.target.classList.contains("site-header__nav-link")) {
      toggleMenu(false);
    }
  });
  
  const navShadow = document.querySelector(".site-header__nav-shadow");

  navShadow.addEventListener("click", (e) => {
    toggleMenu(false);
  });

  document.addEventListener("keydown", (e) => {
    if(e.code === "Escape" && opennedMenu()) {
      toggleMenu(false);
    }
  })
}

const addResizeHandler = () => {
  window.addEventListener("resize", () => {
    updateHeaderHeight();
  });
}