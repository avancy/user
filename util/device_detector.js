const getDeviceType = () => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    // Retorna 'desktop' como padrão no servidor
    return 'desktop';
  }

  let hasTouchScreen = false;

  if ('maxTouchPoints' in navigator) {
    hasTouchScreen = navigator.maxTouchPoints > 0;
  } else if ('msMaxTouchPoints' in navigator) {
    hasTouchScreen = navigator.msMaxTouchPoints > 0;
  } else {
    const mQ = window.matchMedia && matchMedia('(pointer:coarse)');
    if (mQ && mQ.media === '(pointer:coarse)') {
      hasTouchScreen = !!mQ.matches;
    } else if ('orientation' in window) {
      hasTouchScreen = true;
    } else {
      const UA = navigator.userAgent;
      hasTouchScreen =
        /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
        /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
    }
  }

  const width = window.innerWidth;
  const height = window.innerHeight;

  if (hasTouchScreen) {
    if (width <= 576) {
      return 'mobile';
    } else if (width <= 928) {
      return 'tablet';
    } else if (width < 1800 && height < 1080) {
      return 'laptop';
    }
  } else {
    if (width < 1800 && height < 1080) {
      return 'laptop';
    }
  }

  return 'desktop';
};

export default getDeviceType;
