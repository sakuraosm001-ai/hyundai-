window.GA_MEASUREMENT_ID = 'GA_MEASUREMENT_ID';
window.META_PIXEL_ID = 'META_PIXEL_ID';
window.GOOGLE_ADS_ID = 'GOOGLE_ADS_ID';

window.trackAnalyticsEvent = function (eventName, payload = {}) {
  if (typeof window !== 'undefined') {
    console.info('[analytics]', eventName, payload);
  }
};

window.trackFormConsultation = function () {
  window.trackAnalyticsEvent('form_consultation');
};

window.trackCommercialOffer = function () {
  window.trackAnalyticsEvent('commercial_offer');
};

window.trackTestDrive = function () {
  window.trackAnalyticsEvent('test_drive');
};

window.trackLeasing = function () {
  window.trackAnalyticsEvent('leasing');
};

window.trackPhoneClick = function () {
  window.trackAnalyticsEvent('phone_click');
};

window.trackWhatsAppClick = function () {
  window.trackAnalyticsEvent('whatsapp_click');
};

window.trackTelegramClick = function () {
  window.trackAnalyticsEvent('telegram_click');
};

window.trackInstagramClick = function () {
  window.trackAnalyticsEvent('instagram_click');
};

window.trackEmailClick = function () {
  window.trackAnalyticsEvent('email_click');
};

window.trackModelView = function (modelName) {
  window.trackAnalyticsEvent('model_view', { model: modelName });
};

window.trackBodyBuilderView = function (builderName) {
  window.trackAnalyticsEvent('body_builder_view', { builder: builderName });
};

window.trackPDFDownload = function (fileName) {
  window.trackAnalyticsEvent('pdf_download', { file: fileName });
};
