// Intersection Observer for robot animation
document.addEventListener('DOMContentLoaded', () => {
    const robotElement = document.querySelector('.about-robot');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const robotObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class when robot comes into view
                robotElement.classList.add('animate');
            } else {
                // Remove animation class when robot is out of view
                // This ensures the animation plays again when coming back into view
                robotElement.classList.remove('animate');
            }
        });
    }, observerOptions);

    if (robotElement) {
        robotObserver.observe(robotElement);
    }

    // Mobile Menu Toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const body = document.body;

    // Toggle mobile menu
    burger.addEventListener('click', () => {
        // Toggle nav
        nav.classList.toggle('active');
        
        // Toggle burger animation
        burger.classList.toggle('active');
        
        // Prevent background scrolling when menu is open
        body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        
        // Animate links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // Close menu when clicking links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            burger.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !burger.contains(e.target) && nav.classList.contains('active')) {
            nav.classList.remove('active');
            burger.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // Handle orientation change
    window.addEventListener('orientationchange', () => {
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
            burger.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // Add this new typewriter functionality
    function setupTypewriter() {
        const text = "AI/ML Engineering Student | Tech Enthusiast";
        const typewriterElement = document.querySelector('.typewriter');
        let isDeleting = false;
        let charIndex = 0;
        const typingSpeed = 100; // Speed of typing
        const deletingSpeed = 50; // Speed of deleting
        const pauseTime = 2000; // Time to pause at full text

        function type() {
            // Current text
            const currentText = text.substring(0, charIndex);
            typewriterElement.textContent = currentText;

            // Add typing class when animation is happening
            typewriterElement.classList.add('typing');

            if (!isDeleting) {
                // Typing
                if (charIndex < text.length) {
                    charIndex++;
                    setTimeout(type, typingSpeed);
                } else {
                    // Pause at the end of typing
                    isDeleting = true;
                    setTimeout(type, pauseTime);
                }
            } else {
                // Deleting
                if (charIndex > 0) {
                    charIndex--;
                    setTimeout(type, deletingSpeed);
                } else {
                    // Reset for next iteration
                    isDeleting = false;
                    // Pause before starting again
                    typewriterElement.classList.remove('typing');
                    setTimeout(type, 1000);
                }
            }
        }

        // Start the animation
        type();
    }

    // Initialize typewriter
    setupTypewriter();
});

// EmailJS Configuration
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace this with the public key from your EmailJS account
})();

function sendEmail(e) {
    e.preventDefault();

    // Show loading state
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Get the form data
    const form = document.getElementById('contact-form');
    
    const templateParams = {
        from_name: form.from_name.value,
        reply_to: form.reply_to.value,
        subject: form.subject.value,
        message: form.message.value,
        to_name: "Trisa Das",
        to_email: "vvce23cseaiml0037@vvce.ac.in"
    };
    
    // Send the email using EmailJS
    emailjs.send(
        'YOUR_SERVICE_ID',  // Replace with your Gmail service ID (e.g., 'service_abc123')
        'YOUR_TEMPLATE_ID', // Replace with your template ID (e.g., 'template_xyz789')
        templateParams
    )
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        // Show success message
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.backgroundColor = '#4CAF50';
        form.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.backgroundColor = '';
        }, 3000);
    }, function(error) {
        console.error('FAILED...', error);
        // Show error message
        submitBtn.innerHTML = '<i class="fas fa-times"></i> Failed to Send';
        submitBtn.style.backgroundColor = '#f44336';
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.backgroundColor = '';
        }, 3000);
    });

    return false;
}

// Add loading animation to submit button
document.querySelector('.submit-btn').addEventListener('mouseover', function() {
    this.querySelector('i').style.transform = 'translateX(5px)';
});

document.querySelector('.submit-btn').addEventListener('mouseout', function() {
    this.querySelector('i').style.transform = 'translateX(0)';
}); 
