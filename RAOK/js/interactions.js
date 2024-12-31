class InteractionManager {
    constructor() {
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.selectedTile = null;
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const canvas = document.getElementById('globe-canvas');
        
        canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
        canvas.addEventListener('click', (e) => this.onMouseClick(e));
        window.addEventListener('resize', () => this.onWindowResize());
        
        // Social sharing
        document.querySelectorAll('.share-buttons button').forEach(button => {
            button.addEventListener('click', (e) => this.handleShare(e));
        });
    }

    onMouseMove(event) {
        const canvas = document.getElementById('globe-canvas');
        const rect = canvas.getBoundingClientRect();
        
        this.mouse.x = ((event.clientX - rect.left) / canvas.clientWidth) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / canvas.clientHeight) * 2 + 1;
        
        this.checkIntersection();
    }

    onMouseClick(event) {
        if (this.selectedTile) {
            this.showStoryPopup(this.selectedTile.userData.story);
        }
    }

    checkIntersection() {
        this.raycaster.setFromCamera(this.mouse, globe.camera);
        const intersects = this.raycaster.intersectObjects(globe.scene.children);
        
        if (intersects.length > 0) {
            const intersectedObject = intersects[0].object;
            if (intersectedObject.userData.story) {
                this.highlightTile(intersectedObject);
                this.selectedTile = intersectedObject;
            }
        } else {
            this.unhighlightTile();
            this.selectedTile = null;
        }
    }

    highlightTile(tile) {
        tile.material.emissive.setHex(0xff0000);
        document.body.style.cursor = 'pointer';
    }

    unhighlightTile() {
        if (this.selectedTile) {
            this.selectedTile.material.emissive.setHex(0x000000);
            document.body.style.cursor = 'default';
        }
    }

    showStoryPopup(story) {
        const popup = document.getElementById('story-popup');
        popup.querySelector('h3').textContent = story.title;
        popup.querySelector('p').textContent = story.content;
        
        // Update rating display
        const rating = this.calculateAverageRating(story.ratings);
        this.updateRatingDisplay(popup.querySelector('.rating'), rating);
        
        popup.classList.remove('hidden');
    }

    calculateAverageRating(ratings) {
        if (!ratings.length) return 0;
        return ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
    }

    updateRatingDisplay(container, rating) {
        container.innerHTML = '';
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('span');
            star.classList.add('star');
            star.innerHTML = i <= rating ? '★' : '☆';
            container.appendChild(star);
        }
    }

    handleShare(event) {
        const story = this.selectedTile.userData.story;
        const shareText = `Check out this act of kindness: ${story.title}`;
        const shareUrl = window.location.href;
        
        if (event.target.closest('.share-fb')) {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
        } else if (event.target.closest('.share-twitter')) {
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`);
        }
    }

    onWindowResize() {
        globe.camera.aspect = window.innerWidth / window.innerHeight;
        globe.camera.updateProjectionMatrix();
        globe.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

const interactionManager = new InteractionManager(); 