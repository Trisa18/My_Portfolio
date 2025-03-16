// Three.js Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
const heroCanvas = document.getElementById('hero-canvas');

// Initialize Three.js scene for hero section
function initThreeJS() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x0a0a0a, 1);
    heroCanvas.appendChild(renderer.domElement);
    camera.position.z = 50;

    // Create main group
    const mainGroup = new THREE.Group();
    const shapes = [];
    
    // Materials
    const gradientTexture = new THREE.TextureLoader().load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABhJREFUeNpi+P///3+GBw8e/AcIMAAACQsDAYhWUQAAAABJRU5ErkJggg==');
    
    const materials = [
        new THREE.MeshPhongMaterial({
            color: 0x6c63ff,
            transparent: true,
            opacity: 0.7,
            shininess: 100,
            side: THREE.DoubleSide
        }),
        new THREE.MeshPhongMaterial({
            color: 0x4a90e2,
            transparent: true,
            opacity: 0.7,
            shininess: 100,
            side: THREE.DoubleSide
        }),
        new THREE.MeshPhongMaterial({
            color: 0x8c43ff,
            transparent: true,
            opacity: 0.7,
            shininess: 100,
            side: THREE.DoubleSide
        })
    ];

    // Create shapes
    const geometries = [
        new THREE.IcosahedronGeometry(2, 0),
        new THREE.OctahedronGeometry(2, 0),
        new THREE.TetrahedronGeometry(2, 0)
    ];

    // Create multiple layers of shapes
    for (let layer = 0; layer < 5; layer++) {
        const radius = 20 + layer * 10;
        const count = 10 + layer * 5;
        
        for (let i = 0; i < count; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const material = materials[Math.floor(Math.random() * materials.length)];
            
            const shape = new THREE.Mesh(geometry, material);
            
            // Position in a spherical pattern
            const phi = Math.random() * Math.PI * 2;
            const theta = Math.random() * Math.PI;
            
            shape.position.x = radius * Math.sin(theta) * Math.cos(phi);
            shape.position.y = radius * Math.sin(theta) * Math.sin(phi);
            shape.position.z = radius * Math.cos(theta);
            
            // Random rotation
            shape.rotation.x = Math.random() * Math.PI;
            shape.rotation.y = Math.random() * Math.PI;
            shape.rotation.z = Math.random() * Math.PI;
            
            // Random scale
            const scale = 0.5 + Math.random() * 1.5;
            shape.scale.set(scale, scale, scale);
            
            // Store initial position and custom properties
            shape.userData = {
                originalPosition: shape.position.clone(),
                rotationSpeed: (Math.random() - 0.5) * 0.02,
                floatSpeed: 0.02 + Math.random() * 0.02,
                floatOffset: Math.random() * Math.PI * 2,
                orbitSpeed: (Math.random() - 0.5) * 0.001,
                orbitRadius: radius,
                orbitAngle: Math.random() * Math.PI * 2
            };
            
            shapes.push(shape);
            mainGroup.add(shape);
        }
    }

    scene.add(mainGroup);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const light1 = new THREE.DirectionalLight(0x6c63ff, 1);
    light1.position.set(1, 1, 1);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0x4a90e2, 1);
    light2.position.set(-1, -1, 1);
    scene.add(light2);

    // Add point lights for extra glow
    const pointLight1 = new THREE.PointLight(0x6c63ff, 1, 100);
    pointLight1.position.set(20, 20, 20);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x4a90e2, 1, 100);
    pointLight2.position.set(-20, -20, 20);
    scene.add(pointLight2);

    // Animation
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.005;

        // Animate shapes
        shapes.forEach(shape => {
            const userData = shape.userData;
            
            // Rotation
            shape.rotation.x += userData.rotationSpeed;
            shape.rotation.y += userData.rotationSpeed;
            
            // Floating motion
            const floatY = Math.sin(time * userData.floatSpeed + userData.floatOffset) * 2;
            
            // Orbital motion
            userData.orbitAngle += userData.orbitSpeed;
            const orbitX = Math.cos(userData.orbitAngle) * userData.orbitRadius;
            const orbitZ = Math.sin(userData.orbitAngle) * userData.orbitRadius;
            
            shape.position.x = userData.originalPosition.x + orbitX;
            shape.position.y = userData.originalPosition.y + floatY;
            shape.position.z = userData.originalPosition.z + orbitZ;
        });

        // Rotate entire scene slowly
        mainGroup.rotation.y += 0.001;
        mainGroup.rotation.x += 0.0005;

        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

        gsap.to(mainGroup.rotation, {
            x: mouseY * 0.3,
            y: mouseX * 0.3,
            duration: 1
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initThreeJS();
    
    // Initialize animations for all sections except contact
    const sections = ['about', 'skills', 'projects'];
    sections.forEach(sectionId => {
        initSectionAnimation(sectionId);
    });

    // Handle navbar visibility
    const navbar = document.querySelector('.navbar');
    const heroSection = document.getElementById('home');
    
    function checkNavbarVisibility() {
        const heroHeight = heroSection.getBoundingClientRect().bottom;
        if (heroHeight > 0) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
    }

    // Add scroll event listener
    window.addEventListener('scroll', () => {
        requestAnimationFrame(checkNavbarVisibility);
    });

    // Check initial state
    checkNavbarVisibility();
});
