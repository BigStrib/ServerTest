// ==========================================
// 1. SUPABASE INITIALIZATION
// ==========================================
// REPLACE THESE WITH YOUR ACTUAL KEYS FROM PHASE 4
const SUPABASE_URL = 'https://dnwuhpmlnmnhopzwaayl.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_W2QjBZKx2MM9FfhaWPaPfA_eGk_Bwav';

// Initialize the Supabase client
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ==========================================
// 2. DOM ELEMENTS
// ==========================================
const nameInput = document.getElementById('nameInput');
const commentInput = document.getElementById('commentInput');
const submitBtn = document.getElementById('submitBtn');
const commentList = document.getElementById('commentList');

// ==========================================
// 3. FETCH & DISPLAY COMMENTS (READ)
// ==========================================
async function fetchComments() {
    // Clear the loading state or current list
    commentList.innerHTML = '<p>Loading comments...</p>';

    // Query Supabase: Select all columns from 'comments', order by newest first
    const { data, error } = await supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching comments:", error);
        commentList.innerHTML = '<p style="color:red;">Failed to load comments.</p>';
        return;
    }

    // Clear the loading text
    commentList.innerHTML = '';

    // Loop through the data and render it
    if (data.length === 0) {
        commentList.innerHTML = '<p>No comments yet. Be the first!</p>';
        return;
    }

    data.forEach(comment => {
        renderComment(comment);
    });
}

// Helper function to build the HTML for a single comment
function renderComment(commentData) {
    const newComment = document.createElement('div');
    newComment.classList.add('comment-card');
    
    // Format the date to be human-readable
    const dateObj = new Date(commentData.created_at);
    const dateString = dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString();

    // Escape HTML to prevent XSS attacks (security best practice)
    const safeName = escapeHTML(commentData.author_name);
    const safeText = escapeHTML(commentData.comment_text);

    newComment.innerHTML = `
        <strong>${safeName}</strong> <span style="font-size: 0.8em; color: #888;">${dateString}</span>
        <p>${safeText}</p>
    `;

    commentList.appendChild(newComment);
}

// Helper function to sanitize user input
function escapeHTML(str) {
    const div = document.createElement('div');
    div.innerText = str;
    return div.innerHTML;
}

// ==========================================
// 4. SUBMIT A NEW COMMENT (CREATE)
// ==========================================
submitBtn.addEventListener('click', async function() {
    const nameValue = nameInput.value.trim();
    const commentValue = commentInput.value.trim();

    if (nameValue === "" || commentValue === "") {
        alert("Please fill out both your name and comment.");
        return;
    }

    // Temporarily disable the button to prevent double-clicking
    submitBtn.disabled = true;
    submitBtn.innerText = "Posting...";

    // Insert the data into Supabase
    const { data, error } = await supabase
        .from('comments')
        .insert([
            { author_name: nameValue, comment_text: commentValue }
        ]);

    // Re-enable button
    submitBtn.disabled = false;
    submitBtn.innerText = "Post Comment";

    if (error) {
        console.error("Error inserting comment:", error);
        alert("There was an error posting your comment. Check the console.");
    } else {
        // Success! Clear fields and refresh the list to show the new comment
        nameInput.value = '';
        commentInput.value = '';
        fetchComments();
    }
});

// ==========================================
// 5. INITIALIZATION ON LOAD
// ==========================================
// Fetch comments immediately when the page loads
fetchComments();