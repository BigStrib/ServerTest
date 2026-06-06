// ==========================================
// 1. SUPABASE INITIALIZATION
// ==========================================
// REPLACE THESE WITH YOUR ACTUAL KEYS FROM THE SUPABASE DASHBOARD
const PROJECT_URL = 'https://dnwuhpmlnmnhopzwaayl.supabase.co';
const ANON_PUBLIC_KEY = 'sb_publishable_W2QjBZKx2MM9FfhaWPaPfA_eGk_Bwav';

// Initialize the client using the exact dashboard names
const supabaseClient = supabase.createClient(PROJECT_URL, ANON_PUBLIC_KEY);

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
    commentList.innerHTML = '<p>Loading comments...</p>';

    const { data, error } = await supabaseClient
        .from('comments')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching comments:", error);
        commentList.innerHTML = '<p style="color:red;">Failed to load comments.</p>';
        return;
    }

    commentList.innerHTML = '';

    if (data.length === 0) {
        commentList.innerHTML = '<p>No comments yet. Be the first!</p>';
        return;
    }

    data.forEach(comment => {
        renderComment(comment);
    });
}

function renderComment(commentData) {
    const newComment = document.createElement('div');
    newComment.classList.add('comment-card');
    
    const dateObj = new Date(commentData.created_at);
    const dateString = dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString();

    const safeName = escapeHTML(commentData.author_name);
    const safeText = escapeHTML(commentData.comment_text);

    newComment.innerHTML = `
        <strong>${safeName}</strong> <span style="font-size: 0.8em; color: #888;">${dateString}</span>
        <p>${safeText}</p>
    `;

    commentList.appendChild(newComment);
}

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

    submitBtn.disabled = true;
    submitBtn.innerText = "Posting...";

    const { data, error } = await supabaseClient
        .from('comments')
        .insert([
            { author_name: nameValue, comment_text: commentValue }
        ]);

    submitBtn.disabled = false;
    submitBtn.innerText = "Post Comment";

    if (error) {
        console.error("Error inserting comment:", error);
        alert("There was an error posting your comment. Check the console.");
    } else {
        nameInput.value = '';
        commentInput.value = '';
        fetchComments();
    }
});

// ==========================================
// 5. INITIALIZATION ON LOAD
// ==========================================
fetchComments();