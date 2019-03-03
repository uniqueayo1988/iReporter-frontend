function getURLSlug(words) {
  return words
    .replace(/\s+/g, '-')
    .toLowerCase();
}

function getInitials() {
  return name.split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('');
}

function getInitials() {
  return name.split('')
    .map(word => word.charAt(0).toUpperCase())
    .join(' ');
}

function square(x) {
  const y = x * x;
  return y;
}