const data = [
  {
    previewImage:
      "https://images.unsplash.com/photo-1561948955-570b270e7c36?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title: "cat.jpeg",
  },
  {
    previewImage:
      "https://images.unsplash.com/photo-1606787620819-8bdf0c44c293?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title: "cooking couple shoot portofilio(1).jpg",
  },
  {
    previewImage:
      "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title: "bali-kelingking-beach-plastic-removal-drive.key",
  },
  {
    previewImage:
      "https://images.unsplash.com/photo-1623206837956-07dab21608f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title: "NextByk Investor Pitch 2021.ppt",
  },
  {
    previewImage:
      "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    title: "interns-performance-report-june-2021.key",
  },
];

function resizeTitles() {
  let listDescriptionNodes = document.querySelectorAll(".sidebar-description");
  for (let i = 0; i < listDescriptionNodes.length; i++) {
    listDescriptionNodes[i].innerText = data[i].title;
    let totalWidth = listDescriptionNodes[i].scrollWidth;
    let availableWidth = listDescriptionNodes[i].clientWidth;
    if (totalWidth <= availableWidth) continue;

    let description = data[i].title;
    let charWidthRatio = parseInt(totalWidth / description.length);

    let allowedLength = parseInt(availableWidth / charWidthRatio);
    let difference = allowedLength - 3;
    if (description.length - allowedLength < 3) difference -= 3;
    let halfLength = parseInt(difference / 2) - 2;
    listDescriptionNodes[i].innerText =
      description.substr(0, halfLength) +
      "..." +
      description.substr(description.length - halfLength, halfLength);
  }
}
window.addEventListener("resize", resizeTitles);
function createListElement(item, index) {
  const { previewImage, title } = item;
  const listElement = document.createElement("li");
  listElement.classList.add("sidebar-item");
  listElement.setAttribute("data-index", index);
  const imageElement = document.createElement("img");
  imageElement.classList.add("sidebar-image");
  imageElement.setAttribute("src", previewImage);
  const divElement = document.createElement("div");
  divElement.classList.add("sidebar-description");
  divElement.innerText = title;
  listElement.appendChild(imageElement);
  listElement.appendChild(divElement);
  return listElement;
}
function setup() {
  const listNode = document.querySelector(".sidebar-list");
  data.forEach((item, index) => {
    const listElement = createListElement(item, index);
    listNode.appendChild(listElement);
  });
  changeState(0);
  resizeTitles();
}

function removeSelected() {
  const selectedListItem = document.querySelector(".sidebar-item.selected");
  selectedListItem.classList.toggle("selected");
  return parseInt(selectedListItem.getAttribute("data-index"));
}

function changeState(index) {
  const contentImageNode = document.querySelector(".content-image");
  const contentTitleNode = document.querySelector(".content-title");
  contentImageNode.src = data[index].previewImage;
  contentTitleNode.innerText = data[index].title;
  const listItem = document.querySelector(`li[data-index="${index}"`);
  listItem.classList.toggle("selected");
}

setup();

const listItemNodes = document.querySelectorAll(".sidebar-item");
listItemNodes.forEach((listItemNode) => {
  listItemNode.addEventListener("click", function () {
    const selectedListItem = document.querySelector(".sidebar-item.selected");
    if (
      this.getAttribute("data-index") !==
      selectedListItem.getAttribute("data-index")
    ) {
      selectedListItem.classList.toggle("selected");
      changeState(this.getAttribute("data-index"));
    }
  });
});

document.addEventListener("keydown", function (event) {
  if (event.code === "ArrowDown") {
    let index = removeSelected();
    index = (index + 1) % data.length;
    changeState(index);
  } else if (event.code === "ArrowUp") {
    let index = removeSelected();
    index = (index - 1 + data.length) % data.length;
    changeState(index);
  }
});
