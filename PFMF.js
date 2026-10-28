(function () {
    var card = document.querySelector(".proposal-card");
    var heart = document.querySelector(".heart");
    var finalPage = document.getElementById("finalPage");
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!card || reducedMotion) {
        return;
    }

    document.addEventListener("pointermove", function (event) {
        var x = event.clientX / window.innerWidth;
        var y = event.clientY / window.innerHeight;
        var rotateY = (x - 0.5) * 5;
        var rotateX = (0.5 - y) * 5;

        document.documentElement.style.setProperty("--pointer-x", (x * 100).toFixed(1) + "%");
        document.documentElement.style.setProperty("--pointer-y", (y * 100).toFixed(1) + "%");

        if (!finalPage.classList.contains("show")) {
            card.style.transform = "translateY(0) perspective(900px) rotateX(" + rotateX.toFixed(2) + "deg) rotateY(" + rotateY.toFixed(2) + "deg)";
        }
    });

    document.addEventListener("pointerleave", function () {
        card.style.transform = "";
    });

    document.addEventListener("click", function (event) {
        createBurst(event.clientX, event.clientY);
    });

    heart.addEventListener("pointerdown", function () {
        heart.style.setProperty("animation-duration", "0.55s");
        setTimeout(function () {
            heart.style.removeProperty("animation-duration");
        }, 700);
    });

    function createBurst(x, y) {
        for (var index = 0; index < 12; index += 1) {
            var spark = document.createElement("span");
            var angle = (Math.PI * 2 * index) / 12;
            var distance = 35 + Math.random() * 55;

            spark.className = "spark";
            spark.style.left = x + "px";
            spark.style.top = y + "px";
            spark.style.setProperty("--spark-x", Math.cos(angle) * distance + "px");
            spark.style.setProperty("--spark-y", Math.sin(angle) * distance + "px");
            document.body.appendChild(spark);
            setTimeout(function (particle) {
                particle.remove();
            }, 850, spark);
        }
    }
})();
