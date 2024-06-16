import 'bootstrap';
import './styles.scss';

import * as yup from 'yup';
import onChange from 'on-change';

const state = {
  rssLinks: [],
  form: {
    url: '',
    error: null,
  },
};

const watchedState = onChange(state, (path, value) => {
  if (path === 'form.error') {
    const input = document.getElementById('url-input');
    const feedback = document.querySelector('.feedback');

    if (input) {
      if (value) {
        input.classList.add('is-invalid');
      } else {
        input.classList.remove('is-invalid');
      }
    }

    if (feedback) {
      feedback.textContent = value || '';
    }
  }
});

const schema = yup.string().url('Ссылка должна быть валидным URL').required('Ссылка обязательна');

const form = document.querySelector('.rss-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const url = formData.get('url').trim();

  schema.validate(url)
    .then((validUrl) => {
      if (state.rssLinks.includes(validUrl)) {
        throw new Error('RSS уже существует');
      }
      watchedState.form.error = null;
      watchedState.rssLinks.push(validUrl);

      form.reset();
      document.getElementById('url-input').focus();
    })
    .catch((err) => {
      watchedState.form.error = err.message;
    });
});
