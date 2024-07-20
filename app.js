const username = "nicecraftz";
const token = process.env.GH_TOKEN;

const getRepos = async (username, token) => {
  const url = `https://api.github.com/users/${username}/repos`;
  const response = await fetch(url, {
    headers: {
      Authorization: `token ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

const getEvents = async (username, token) => {
  const url = `https://api.github.com/users/${username}/events`;
  const response = await fetch(url, {
    headers: {
      Authorization: `token ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

const getLastProject = async (username, token) => {
  try {
    const repos = await getRepos(username, token);
    const events = await getEvents(username, token);

    let lastProject = null;
    for (const event of events) {
      if (
        ["PushEvent", "PullRequestEvent", "IssuesEvent"].includes(event.type)
      ) {
        lastProject = event.repo.name;
        break;
      }
    }

    return lastProject;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const lastProjectName = getLastProject(username, token);
const paragaraphElement = document.getElementById("project");
paragaraphElement.textContent = lastProjectName;
