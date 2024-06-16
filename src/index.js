import 'bootstrap';
import './styles.scss';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('rss-form');
    const urlInput = document.getElementById('rss-url');
    const errorMessage = document.getElementById('error-message');
    const postsContainer = document.getElementById('posts');
    const feedsContainer = document.getElementById('feeds');
  
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        errorMessage.textContent = '';
    
        const url = urlInput.value.trim();
        if (!isValidUrl(url)) {
            errorMessage.textContent = 'Ресурс не содержит валидный RSS';
            return;
        }
    
        try {
            await addFeed(url);
        } catch (error) {
            errorMessage.textContent = 'Не удалось загрузить RSS';
        }
    });
  
    function isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }
  
    async function addFeed(url) {
        const response = await axios.get(`https://api.rss2json.com/v1/api.json?rss_url=${url}`);
        const feed = response.data.feed;
        const items = response.data.items;
    
        const feedElement = document.createElement('li');
        feedElement.innerHTML = `<strong>${feed.title}</strong> - ${feed.description}`;
        const viewButton = document.createElement('button');
        viewButton.className = 'btn btn-primary btn-sm ml-2';
        viewButton.textContent = 'Просмотр';
        viewButton.addEventListener('click', () => showPosts(items));
        feedElement.appendChild(viewButton);
        feedsContainer.appendChild(feedElement);
    }
  
    function showPosts(items) {
        postsContainer.innerHTML = '';
        items.forEach(item => {
            const postElement = document.createElement('li');
            postElement.innerHTML = `<a href="${item.link}" target="_blank">${item.title}</a> - ${item.pubDate}`;
            postsContainer.appendChild(postElement);
        });
    }
});
