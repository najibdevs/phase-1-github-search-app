document.getElementById('search-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const searchTerm = document.getElementById('search-input').value.trim();
    if (searchTerm === '') return;
  
    try {
      const users = await searchUsers(searchTerm);
      displayUsers(users);
    } catch (error) {
      console.error('Error searching for users:', error);
    }
  });
  
  async function searchUsers(username) {
    const response = await fetch(`https://api.github.com/search/users?q=${username}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    const data = await response.json();
    return data.items;
  }
  
  async function displayUsers(users) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';
  
    users.forEach(user => {
      const userDiv = document.createElement('div');
      userDiv.innerHTML = `
        <img src="${user.avatar_url}" alt="Avatar" width="50">
        <a href="${user.html_url}" target="_blank">${user.login}</a>
        <button onclick="showRepos('${user.login}')">Show Repos</button>
      `;
      userList.appendChild(userDiv);
    });
  }
  
  async function showRepos(username) {
    try {
      const repos = await fetchUserRepos(username);
      displayRepos(repos);
    } catch (error) {
      console.error('Error fetching user repositories:', error);
    }
  }
  
  async function fetchUserRepos(username) {
    const response = await fetch(`https://api.github.com/users/${username}/repos`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    return response.json();
  }
  
  function displayRepos(repos) {
    const repoList = document.getElementById('repo-list');
    repoList.innerHTML = '';
  
    repos.forEach(repo => {
      const repoDiv = document.createElement('div');
      repoDiv.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || 'No description'}</p>
        <p>Language: ${repo.language || 'Unknown'}</p>
        <p>Stars: ${repo.stargazers_count}</p>
      `;
      repoList.appendChild(repoDiv)
    });
  }
  