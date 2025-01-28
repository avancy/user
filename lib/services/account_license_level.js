const hasAccess = (required = '', current = '[]', type) => {
  if (type == 'light') {
    return false;
  }

  if (!current) {
    return false;
  }

  if (current === 'full') {
    return true;
  }

  try {
    const currentArray = JSON.parse(current);
    return required.some((level) => currentArray.includes(level));
  } catch (err) {
    return false;
  }
};

export { hasAccess };
