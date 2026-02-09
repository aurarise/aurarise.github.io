"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const posts = ["1.md", "2.md"];
const contentPath = "./content/";
const postsListElements = document.getElementById("posts-list");
function parseMarkdown(file) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(contentPath + file);
        const text = yield response.text();
        const lines = text.split('\n');
        const dateLine = lines[3] || "";
        const titleLine = lines[1] || "";
        const date = dateLine.trim().replace("date: ", "");
        const title = titleLine.trim().replace("title: ", "");
        return { date, title, file };
    });
}
function getPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!postsListElements) {
            console.error("Posts list element not found");
            return;
        }
        const postsList = [];
        for (const file of posts) {
            const data = yield parseMarkdown(file);
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
    });
}
getPosts();
