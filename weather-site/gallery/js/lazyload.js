const images = document.querySelectorAll('[data-src]');

function preloadImage(img) {
  const source = img.getAttribute('data-src');
  if (!source) {
    return;
  }

  img.onload = () => {
    img.removeAttribute('data-src')
  }

  img.src = source;
}

const options = {
  threshold: 1
}

const callback = (entries, io) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else {
      preloadImage(entry.target); //target means which image you are intersecting
      io.unobserve(entry.target); //stop observing
    }
  });

}

const io = new IntersectionObserver(callback, options)

images.forEach(image => {
  io.observe(image);
})