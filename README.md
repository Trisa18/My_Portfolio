# Personal Portfolio Website

[![Deploy to GitHub Pages](https://github.com/Trisa18/Portfolio/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/Trisa18/Portfolio/actions/workflows/pages/pages-build-deployment)

🌐 [View Live Demo](https://trisa18.github.io/My_Portfolio)

A modern, interactive portfolio website showcasing my skills, projects, and experience in AI/ML engineering. Built with HTML, CSS, and JavaScript, featuring dynamic animations and a responsive design.

## 🌟 Features

- **Interactive UI Elements**
  - Particle.js animations in the hero section
  - Three.js powered background animations
  - Smooth scrolling and transitions
  - Responsive design for all devices

- **Sections**
  - Hero section with typewriter effect
  - About section with floating robot animation
  - Projects showcase with hover effects
  - Skills display with interactive icons
  - Contact information with direct email link

- **Visual Effects**
  - Custom animations for section transitions
  - Parallax scrolling effects
  - Glassmorphism UI elements
  - Dynamic particle backgrounds

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- Three.js
- Particles.js
- GSAP (GreenSock Animation Platform)
- Font Awesome Icons
- Vanilla-tilt.js

## 📁 Project Structure

```
portfolio/
│
├── index.html              # Main HTML file
├── css/
│   └── style.css          # Main stylesheet
│
├── js/
│   ├── main.js            # Main JavaScript file
│   ├── script.js          # Animation and interaction scripts
│   └── three-animations.js # Three.js animations
│
└── images/                 # Image assets
```

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Trisa18/Portfolio.git
   ```

2. Open `index.html` in your web browser to view the portfolio.

3. To make changes:
   - Edit `index.html` for content changes
   - Modify `css/style.css` for styling
   - Update `js/` files for functionality changes

## 🌐 Deployment

This portfolio is deployed using GitHub Pages. Here's how you can deploy your own version:

1. Fork this repository
2. Go to your fork's Settings > Pages
3. Under "Source", select "Deploy from a branch"
4. Select "gh-pages" branch and "/ (root)" folder
5. Click Save

Your portfolio will be live at `https://[your-username].github.io/Portfolio`

### Manual Deployment
If you need to deploy manually:
```bash
# Create and switch to gh-pages branch
git checkout -b gh-pages

# Push to GitHub
git push origin gh-pages
```

### Deployment Status
- ✅ Check the badge at the top of this README for current deployment status
- 🔍 View detailed deployment logs in the Actions tab of the repository
- ⚡ The site auto-deploys when changes are pushed to the gh-pages branch

## 💡 Customization

### Changing Colors
The color scheme can be modified in `css/style.css`:
```css
:root {
    --primary-color: #2a2a2a;
    --secondary-color: #4a90e2;
    --accent-color: #6c63ff;
    --text-color: #333;
    --background-color: #ffffff;
}
```

### Adding Projects
Add new projects by copying and modifying the project card template in `index.html`:
```html
<div class="project-card">
    <div class="project-content">
        <h3>Project Title</h3>
        <p>Project Description</p>
        <div class="project-tech">
            <span class="tech-tag">Technology</span>
        </div>
        <div class="project-links">
            <a href="#" class="project-link">View Project</a>
            <a href="#" class="project-link">Source Code</a>
        </div>
    </div>
</div>
```

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- Desktop (1200px and above)
- Tablet (768px to 1199px)
- Mobile (below 768px)

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📧 Contact

For any queries or suggestions, feel free to reach out:
- Email: vvce23cseaiml0037@vvce.ac.in
- Location: Mysuru, Karnataka

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---
Created with ❤️ by Trisa Das 
