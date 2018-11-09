document.getElementById("choixRole-avantMatch-goToMatch").addEventListener("click", function () {
    document.getElementById("pendantMatch-overlay").style.display = "flex";
    var cssSelector = anime({
        targets: '#pendantMatch-overlay',
        translateY: 0
    });
});

function onbodyLoad() {
    var overanimStart = anime({
        targets: '#pendantMatch-overlay',
        translateY: -1000
    });
}