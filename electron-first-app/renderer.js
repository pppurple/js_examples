document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("comment-form").onsubmit = () => {
    const commentInput = document.getElementById("comment-input");

    if (commentInput.value === "") {
      return false;
    }

    const newComment = document.createElement("li");
    
    newComment.innerText = commentInput.value;
    document.getElementById("comments").appendChild(newComment);

    commentInput.value = "";
    return false;
  }
})