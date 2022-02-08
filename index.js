const rootDiv = document.querySelector("#root");

const BASE_URL = "https://jsonplaceholder.typicode.com";

const getPosts = async () => {
  try {
    const postsUrl = `${BASE_URL}/posts`;

    return await fetch(postsUrl).then((response) => response.json());
  } catch (error) {}
};

const getComments = async () => {
  try {
    const commentsUrl = `${BASE_URL}/comments`;

    return await fetch(commentsUrl).then((response) => response.json());
  } catch (error) {}
};

const renderingPostsList = async () => {
  try {
    const posts = await getPosts();
    const comments = await getComments();

    const newPostsList = posts.slice(0, 20);

    const updatedPostsList = newPostsList.map(({ id, title, body }) => {
      return {
        id,
        title,
        body,
        commentsList: [],
      };
    });

    updatedPostsList.map(({ id, title, body, commentsList }, index) => {
      const postsRender = document.createElement("div");

      postsRender.innerHTML = `
		<h2>${index + 1}. ${title}</h2>
		<p>${body}</p>
		`;

      postsRender.classList.add("post-wrapper");

      rootDiv.append(postsRender);

      const filteredCommentsList = comments.filter((el) => el.postId === id);

      filteredCommentsList.map((el) => {
        if (el.postId === id) {
          commentsList.push(el);
        }
      });

      commentsList.map(({ name, body }) => {
        const commentsRender = document.createElement("div");

        commentsRender.innerHTML = `
		  <h3>${name}:</h3>
		  <p>${body}</p>
		  `;

        commentsRender.classList.add("comment");

        rootDiv.append(commentsRender);
      });
    });
  } catch (error) {}
};

renderingPostsList();
