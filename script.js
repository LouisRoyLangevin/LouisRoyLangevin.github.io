function gobackhover(){
    document.getElementById("go-back").style.color = "rgb(170,170,170)"
    document.getElementById("go-back-icon").src = "images/go-back-icon-hover.png"
}
function gobacknothover(){
    document.getElementById("go-back").style.color = "rgb(70,70,70)"
    document.getElementById("go-back-icon").src = "images/go-back-icon.png"
}

function linkedinhover(){
    document.getElementById("linked-in-text").style.color = "grey"
}
function linkedinnothover(){
    document.getElementById("linked-in-text").style.color = "black"
}

function githubhover(){
    document.getElementById("github-text").style.color = "grey"
}
function githubnothover(){
    document.getElementById("github-text").style.color = "black"
}

window.addEventListener('pageshow', githubnothover);
window.addEventListener('pageshow', linkedinnothover);