var highScores = JSON.parse(window.localStorage.getItem("newscore")) || [];
console.log(highScores)
var newInput = JSON.parse(window.localStorage.getItem("newscore"));
highScores.push(newInput);
console.log(highScores)

highScores.sort(function(a, b) {
return b.score - a.score;
});

highScores.forEach(function(score) {
    // create li tag for each high score
    var liTag = document.createElement("li");
    liTag.textContent = score.initials + " - " + score.score;

    // display on page
    var ulEl = document.getElementById("scoresA");

    ulEl.appendChild(liTag);

});

document.getElementById("clear").addEventListener("click",function() {
    window.localStorage.removeItem("highScores");
    var list = document.getElementById('scoresA')
    list.remove()


});