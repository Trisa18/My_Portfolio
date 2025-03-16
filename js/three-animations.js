// Three.js Animations for Portfolio Sections
class SectionAnimations {
    constructor() {
        this.animations = new Map();
        this.scenes = new Map();
        this.cameras = new Map();
        this.renderers = new Map();
        this.particles = new Map();
        
        // Initialize animations for each section
        ['about', 'skills', 'projects', 'contact'].forEach(sectionId => {
            this.initSection(sectionId);
        });

        // Start animation loop
        this.animate();

        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());
    }

    initSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;

        // Create scene
        const scene = new THREE.Scene();
        this.scenes.set(sectionId, scene);

        // Create camera
        const camera = new THREE.PerspectiveCamera(75, section.clientWidth / section.clientHeight, 0.1, 1000);
        camera.position.z = 5;
        this.cameras.set(sectionId, camera);

        // Create renderer
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(section.clientWidth, section.clientHeight);
        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(window.devicePixelRatio);
        this.renderers.set(sectionId, renderer);

        // Add renderer to section
        const canvas = renderer.domElement;
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '1';
        canvas.style.opacity = '0.7';
        canvas.style.pointerEvents = 'none';
        section.insertBefore(canvas, section.firstChild);

        // Setup particle animation
        this.setupParticleAnimation(sectionId, scene);
    }

    setupParticleAnimation(sectionId, scene) {
        const particleCount = 100;
        const positions = new Float32Array(particleCount * 3);
        const velocities = [];

        // Create particles
        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

            velocities.push({
                x: (Math.random() - 0.5) * 0.02,
                y: (Math.random() - 0.5) * 0.02,
                z: (Math.random() - 0.5) * 0.02
            });
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        // Set different colors for different sections
        let particleColor;
        switch(sectionId) {
            case 'about':
                particleColor = 0x6c63ff;
                break;
            case 'skills':
                particleColor = 0x4a90e2;
                break;
            case 'projects':
                particleColor = 0x8c43ff;
                break;
            case 'contact':
                particleColor = 0x4a90e2; // Same color as skills section
                break;
            default:
                particleColor = 0x6c63ff;
        }

        const material = new THREE.PointsMaterial({
            color: particleColor,
            size: 0.05,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);
        this.particles.set(sectionId, { points: particles, velocities: velocities });

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        // Set up animation for this section
        this.animations.set(sectionId, () => {
            const positions = particles.geometry.attributes.position.array;
            for(let i = 0; i < particleCount; i++) {
                positions[i * 3] += velocities[i].x;
                positions[i * 3 + 1] += velocities[i].y;
                positions[i * 3 + 2] += velocities[i].z;

                // Bounce off boundaries
                if(Math.abs(positions[i * 3]) > 5) velocities[i].x *= -1;
                if(Math.abs(positions[i * 3 + 1]) > 5) velocities[i].y *= -1;
                if(Math.abs(positions[i * 3 + 2]) > 5) velocities[i].z *= -1;
            }
            particles.geometry.attributes.position.needsUpdate = true;
            particles.rotation.y += 0.001;
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Run animations for each section
        for (const [sectionId, animation] of this.animations) {
            const scene = this.scenes.get(sectionId);
            const camera = this.cameras.get(sectionId);
            const renderer = this.renderers.get(sectionId);

            if (scene && camera && renderer) {
                animation();
                renderer.render(scene, camera);
            }
        }
    }

    handleResize() {
        for (const [sectionId, camera] of this.cameras) {
            const section = document.getElementById(sectionId);
            const renderer = this.renderers.get(sectionId);
            
            if (section && renderer && camera) {
                const width = section.clientWidth;
                const height = section.clientHeight;

                camera.aspect = width / height;
                camera.updateProjectionMatrix();
                renderer.setSize(width, height);
            }
        }
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SectionAnimations();
}); 
