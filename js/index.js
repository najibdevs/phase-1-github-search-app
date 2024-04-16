document.getElementById('github-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
  
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search');
  
    if (searchTerm) {
      try {
        // Search for users
        const response = await fetch(`https://api.github.com/search/users?q=${searchTerm}`, {
          headers: {
            'Accept': 'application/vnd.github.v3+json'
          }
        });
        const data = await response.json();
        displayUsers(data.items);
      } catch (error) {
        console.error('Error searching for users:', error);
      }
    }
  });
  
  async function displayUsers(users) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = ''; // Clear previous results
  
    users.forEach(user => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <img src="${user.avatar_url}" alt="Avatar" width="50">
        <a href="${user.html_url}" target="_blank">${user.login}</a>
        <button onclick="showUserRepos('${user.login}')">Show Repos</button>
      `;
      userList.appendChild(listItem);
    });
  }
  
  async function showUserRepos(username) {
    try {
      // Fetch user's repositories
      const response = await fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      const repos = await response.json();
      displayRepos(repos);
    } catch (error) {
      console.error('Error fetching user repositories:', error);
    }
  }
  
  function displayRepos(repos) {
    const reposList = document.getElementById('repos-list');
    reposList.innerHTML = ''; // Clear previous results
  
    repos.forEach(repo => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <strong>${repo.name}</strong>: ${repo.description || 'No description'}
        <br>
        Language: ${repo.language || 'Unknown'}
        <br>
        Stars: ${repo.stargazers_count}
        <hr>
      `;
      reposList.appendChild(listItem);
    });
  }
  