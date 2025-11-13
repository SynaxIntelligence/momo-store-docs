document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.zoom-img').forEach(function (img) {
        img.addEventListener('click', function (e) {
            if (e.button === 0) { // Left mouse button
                const overlay = document.getElementById('zoom-overlay');
                const zoomedImage = document.getElementById('zoomed-image');
                zoomedImage.src = this.src;
                overlay.classList.remove('hidden');
            }
        });
    });

    document.querySelector('.close-btn').addEventListener('click', function () {
    document.getElementById('zoom-overlay').classList.add('hidden');
});

    document.getElementById('zoom-overlay').addEventListener('click', function (e) {
    if (e.target === this) {
    this.classList.add('hidden');
}
});
});
