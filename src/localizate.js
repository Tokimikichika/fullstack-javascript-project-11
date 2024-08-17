const setLocalizedTexts = (elements, i18n) => {
  elements.modal.title.textContent = i18n.t('modal.title');
  elements.modal.footer.querySelector('.btn-secondary').textContent = i18n.t('modal.closeButton');
  elements.modal.footer.querySelector('.full-article').textContent = i18n.t('modal.fullArticleButton');

  elements.form.querySelector('button[type="submit"]').textContent = i18n.t('form.submitButton');
  elements.form.querySelector('label[for="url-input"]').textContent = i18n.t('form.urlLabel');

  if (elements.rssTitle) elements.rssTitle.textContent = i18n.t('rss.title');
  if (elements.rssDescription) elements.rssDescription.textContent = i18n.t('rss.description');
  if (elements.example) elements.example.textContent = i18n.t('rss.example');

  if (elements.feedsTitle) elements.feedsTitle.textContent = i18n.t('feeds.title');
  if (elements.postsTitle) elements.postsTitle.textContent = i18n.t('posts.title');
};

export default setLocalizedTexts;
