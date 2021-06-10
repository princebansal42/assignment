let currentSelected = document.querySelector(".sidebar-item");
const listItemNodes = document.querySelectorAll(".sidebar-item");

listItemNodes.forEach((listItemNode) => {
  listItemNode.addEventListener("click", function () {
    if (this !== currentSelected.node) {
      currentSelected.classList.toggle("selected");
      this.classList.toggle("selected");

      const contentImageNode = document.querySelector(".content-image");
      const contentTitleNode = document.querySelector(".content-title");
      contentImageNode.src = this.children[0].src;
      contentTitleNode.innerText = this.children[1].innerText;
      currentSelected = this;
    }
  });
});
