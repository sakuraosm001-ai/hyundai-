(function () {
  const params = new URLSearchParams(window.location.search);
  const allowedKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid'];
  const utmData = {};

  allowedKeys.forEach((key) => {
    const value = params.get(key);
    if (value) {
      utmData[key] = value;
    }
  });

  if (Object.keys(utmData).length > 0) {
    localStorage.setItem('hyundai_utm', JSON.stringify(utmData));
  }

  window.getStoredUTM = function () {
    try {
      return JSON.parse(localStorage.getItem('hyundai_utm') || '{}');
    } catch (error) {
      return {};
    }
  };
})();
