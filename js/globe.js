class Globe {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('globe-canvas'),
            antialias: true
        });
        
        this.init();
    }

    init() {
        // Set up renderer
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        // Create globe geometry
        const geometry = new THREE.SphereGeometry(5, 32, 32);
        const material = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load('https://media.istockphoto.com/id/1389937723/vector/cartoon-planet-earth-3d-vector-icon-on-white-background.jpg?s=612x612&w=0&k=20&c=hntEYVS5xepGQi1AIpRipUTYnH2Tp_S1TXS5M-pQe3A='),
            bumpMap: new THREE.TextureLoader().load('https://media.istockphoto.com/id/1389937723/vector/cartoon-planet-earth-3d-vector-icon-on-white-background.jpg?s=612x612&w=0&k=20&c=hntEYVS5xepGQi1AIpRipUTYnH2Tp_S1TXS5M-pQe3A='),
            bumpScale: 0.05,
            specularMap: new THREE.TextureLoader().load('https://media.istockphoto.com/id/1389937723/vector/cartoon-planet-earth-3d-vector-icon-on-white-background.jpg?s=612x612&w=0&k=20&c=hntEYVS5xepGQi1AIpRipUTYnH2Tp_S1TXS5M-pQe3A='),
            specular: new THREE.Color('grey')
        });

        this.globe = new THREE.Mesh(geometry, material);
        this.scene.add(this.globe);

        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(5, 3, 5);
        this.scene.add(pointLight);

        // Position camera
        this.camera.position.z = 10;

        // Start animation
        this.animate();
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.globe.rotation.y += 0.001;
        this.renderer.render(this.scene, this.camera);
    }

    addStoryTile(latitude, longitude, story) {
        // Convert lat/long to 3D coordinates
        const phi = (90 - latitude) * (Math.PI / 180);
        const theta = (longitude + 180) * (Math.PI / 180);

        const tileGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.1);
        const tileMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
        const tile = new THREE.Mesh(tileGeometry, tileMaterial);

        // Position tile on globe
        tile.position.x = 5 * Math.sin(phi) * Math.cos(theta);
        tile.position.y = 5 * Math.cos(phi);
        tile.position.z = 5 * Math.sin(phi) * Math.sin(theta);

        // Store story data
        tile.userData.story = story;

        this.scene.add(tile);
    }
}

// Initialize globe
const globe = new Globe(); 
