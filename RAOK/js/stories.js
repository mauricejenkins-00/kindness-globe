class StoryManager {
    constructor() {
        this.stories = [];
        this.currentFilter = {
            region: '',
            category: ''
        };
        
        this.initializeEventListeners();
        this.loadSampleStories();
    }

    initializeEventListeners() {
        // Story submission form
        document.querySelector('.submit-story').addEventListener('click', () => this.showSubmissionForm());
        
        // Filter listeners
        document.getElementById('region-filter').addEventListener('change', (e) => {
            this.currentFilter.region = e.target.value;
            this.applyFilters();
        });
        
        document.getElementById('category-filter').addEventListener('change', (e) => {
            this.currentFilter.category = e.target.value;
            this.applyFilters();
        });
    }

    showSubmissionForm() {
        const formHTML = `
            <div class="submission-overlay">
                <div class="submission-form">
                    <h2>Share Your Act of Kindness</h2>
                    <form id="story-form">
                        <input type="text" placeholder="Title" required>
                        <textarea placeholder="Tell your story..." required></textarea>
                        <select name="category" required>
                            <option value="">Select Category</option>
                            <option value="environmental">Environmental</option>
                            <option value="community">Community</option>
                            <option value="personal">Personal</option>
                        </select>
                        <input type="text" placeholder="Location" required>
                        <button type="submit">Share Story</button>
                        <button type="button" class="close-form">Cancel</button>
                    </form>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', formHTML);
        this.initializeFormListeners();
    }

    initializeFormListeners() {
        const form = document.getElementById('story-form');
        const overlay = document.querySelector('.submission-overlay');
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitStory(form);
        });
        
        document.querySelector('.close-form').addEventListener('click', () => {
            overlay.remove();
        });
    }

    submitStory(form) {
        const story = {
            id: Date.now(),
            title: form.querySelector('input[type="text"]').value,
            content: form.querySelector('textarea').value,
            category: form.querySelector('select').value,
            location: form.querySelector('input[placeholder="Location"]').value,
            timestamp: new Date(),
            ratings: [],
            coordinates: this.geocodeLocation(form.querySelector('input[placeholder="Location"]').value)
        };
        
        this.stories.push(story);
        this.addStoryToGlobe(story);
        this.updateCounter();
        
        document.querySelector('.submission-overlay').remove();
    }

    geocodeLocation(location) {
        // In a real application, you would use a geocoding service
        // This is a simplified version that returns random coordinates
        return {
            latitude: (Math.random() * 180) - 90,
            longitude: (Math.random() * 360) - 180
        };
    }

    addStoryToGlobe(story) {
        globe.addStoryTile(
            story.coordinates.latitude,
            story.coordinates.longitude,
            story
        );
    }

    updateCounter() {
        const counter = document.getElementById('acts-counter');
        counter.textContent = this.stories.length;
        counter.classList.add('counter-updated');
        setTimeout(() => counter.classList.remove('counter-updated'), 1000);
    }

    loadSampleStories() {
        const sampleStories = [
            {
                title: "Community Garden Creation",
                content: "Started a community garden that provides fresh vegetables to local food banks.",
                category: "environmental",
                location: "Portland, OR",
                coordinates: { latitude: 45.5155, longitude: -122.6789 }
            },
            {
                title: "Elder Support Network",
                content: "Organized a volunteer network to help elderly neighbors with groceries.",
                category: "community",
                location: "London, UK",
                coordinates: { latitude: 51.5074, longitude: -0.1278 }
            }
        ];

        sampleStories.forEach(story => {
            this.stories.push({...story, id: Date.now(), timestamp: new Date(), ratings: []});
            this.addStoryToGlobe(story);
        });

        this.updateCounter();
    }
}

const storyManager = new StoryManager(); 