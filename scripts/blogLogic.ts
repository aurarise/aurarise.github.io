
const posts = ["1.md", "2.md"]; 
const contentPath = "./content/";

const postsListElements = document.getElementById("posts-list");

interface Post {
  date: string;
  title: string;
  file: string;
}

async function parseMarkdown(file: string): Promise<Post> {
    const response = await fetch(contentPath + file);
    const text = await response.text();
    const lines = text.split('\n');

    const dateLine = lines[3] || "";
    const titleLine = lines[1] || "";
    const date = dateLine.trim().replace("date: ", "");
    const title = titleLine.trim().replace("title: ", "");
    return { date, title, file };
}

async function getPosts(): Promise<void> {
    if (!postsListElements) {
        console.error("Posts list element not found");
        return;
    }

    const postsList = [];
    for (const file of posts) {
        const data = await parseMarkdown(file);
        postsList.push(data);
    }
    postsList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    postsList.forEach(post => {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.href = `./currentBlog.html?post=${encodeURIComponent("/content/" + post.file)}`;
        link.textContent = `${post.title} - ${post.date}`;
        link.target = "";
        li.appendChild(link);
        postsListElements.appendChild(li);
    });
}

getPosts();
   