import { renderStart } from "./startPage";

const pageContent = document.getElementById("page-content");

localStorage.setItem("user_page", "start"); //default to start page

const user_page = localStorage.getItem("user_page");

let page = "";
switch (user_page) {
    case "start":
        console.log(renderStart())
        page = renderStart();

}

pageContent.innerHTML() = page;
