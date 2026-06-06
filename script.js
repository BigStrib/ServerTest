// Grab the elements from the HTML
const nameInput = document.getElementById('nameInput');
const commentInput = document.getElementById('commentInput');
const submitBtn = document.getElementById('submitBtn');
const commentList = document.getElementById('commentList');

// Add a click event to the submit button
submitBtn.addEventListener('click', function() {
    
    // Get the text the user typed
    const nameValue = nameInput.value.trim();
    const commentValue = commentInput.value.trim();

    // Make sure they didn't leave it blank
    if (nameValue === "" || commentValue === "") {
        alert("Please fill out both your name and comment.");
        return;
    }

    // Create a new div to hold the comment
    const newComment = document.createElement('div');
    newComment.classList.add('comment-card');

    // Add the HTML for the name and comment text inside the div
    newComment.innerHTML = `
        <strong>${nameValue}</strong>
        <p>${commentValue}</p>
    `;

    // Add the new comment to the top of the list
    commentList.prepend(newComment);

    // Clear the input fields for the next comment
    nameInput.value = '';
    commentInput.value = '';
});