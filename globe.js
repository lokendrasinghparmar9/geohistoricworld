// Geo Historic World - Interactive 3D Canvas Globe Engine

class GeoGlobe {
  constructor(canvasId, hotspots, onPinClick) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.hotspots = hotspots || [];
    this.onPinClick = onPinClick;

    this.width = this.canvas.width = 440;
    this.height = this.canvas.height = 440;
    this.radius = 170;
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;

    this.rotationY = 0.5;
    this.rotationX = 0.2;
    this.isDragging = false;
    this.lastMouseX = 0;
    this.lastMouseY = 0;

    this.hoveredPin = null;

    // Generate simplified land dots
    this.landDots = this.generateLandDots();

    this.initEvents();
    this.animate();
  }

  generateLandDots() {
    const dots = [];
    // Generate ~600 distributed dots representing world continents roughly
    const density = 650;
    for (let i = 0; i < density; i++) {
      const phi = Math.acos(-1 + (2 * i) / density);
      const theta = Math.sqrt(density * Math.PI) * phi;

      const lat = (phi - Math.PI / 2) * (180 / Math.PI);
      const lng = ((theta % (2 * Math.PI)) - Math.PI) * (180 / Math.PI);

      // Rough landmass filtering simulation
      let isLand = false;
      if (lat > -35 && lat < 70 && lng > -25 && lng < 55) isLand = true; // Europe & Africa
      else if (lat > 10 && lat < 75 && lng > 55 && lng < 140) isLand = true; // Asia
      else if (lat > 15 && lat < 70 && lng > -160 && lng < -50) isLand = true; // North America
      else if (lat > -55 && lat < 15 && lng > -85 && lng < -35) isLand = true; // South America
      else if (lat > -42 && lat < -10 && lng > 110 && lng < 155) isLand = true; // Australia

      if (isLand) {
        dots.push({ lat, lng });
      }
    }
    return dots;
  }

  initEvents() {
    this.canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;
    });

    window.addEventListener('mousemove', (e) => {
      if (this.isDragging) {
        const deltaX = e.clientX - this.lastMouseX;
        const deltaY = e.clientY - this.lastMouseY;
        this.rotationY += deltaX * 0.005;
        this.rotationX = Math.max(-0.8, Math.min(0.8, this.rotationX + deltaY * 0.005));
        this.lastMouseX = e.clientX;
        this.lastMouseY = e.clientY;
      }

      // Check pin hover
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      this.checkPinHover(mouseX, mouseY);
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    this.canvas.addEventListener('click', (e) => {
      if (this.hoveredPin && this.onPinClick) {
        this.onPinClick(this.hoveredPin);
      }
    });
  }

  latLngTo3D(lat, lng) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);

    let x = -(this.radius * Math.sin(phi) * Math.cos(theta));
    let z = this.radius * Math.sin(phi) * Math.sin(theta);
    let y = this.radius * Math.cos(phi);

    // Apply rotation X & Y
    const cosY = Math.cos(this.rotationY);
    const sinY = Math.sin(this.rotationY);
    const x1 = x * cosY - z * sinY;
    const z1 = z * cosY + x * sinY;

    const cosX = Math.cos(this.rotationX);
    const sinX = Math.sin(this.rotationX);
    const y2 = y * cosX - z1 * sinX;
    const z2 = z1 * cosX + y * sinX;

    return { x: x1, y: y2, z: z2 };
  }

  checkPinHover(mouseX, mouseY) {
    this.hoveredPin = null;
    this.canvas.style.cursor = this.isDragging ? 'grabbing' : 'grab';

    for (const pin of this.hotspots) {
      const pos = this.latLngTo3D(pin.lat, pin.lng);
      if (pos.z > 0) { // Visible front hemisphere
        const screenX = this.centerX + pos.x;
        const screenY = this.centerY - pos.y;
        const dist = Math.hypot(mouseX - screenX, mouseY - screenY);
        if (dist < 15) {
          this.hoveredPin = pin;
          this.canvas.style.cursor = 'pointer';
          break;
        }
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Outer Atmosphere Glow
    const gradient = this.ctx.createRadialGradient(
      this.centerX, this.centerY, this.radius * 0.85,
      this.centerX, this.centerY, this.radius * 1.25
    );
    gradient.addColorStop(0, 'rgba(6, 182, 212, 0.25)');
    gradient.addColorStop(0.5, 'rgba(245, 158, 11, 0.1)');
    gradient.addColorStop(1, 'rgba(7, 10, 17, 0)');

    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(this.centerX, this.centerY, this.radius * 1.25, 0, Math.PI * 2);
    this.ctx.fill();

    // Globe Base Circle
    this.ctx.fillStyle = '#0B132B';
    this.ctx.strokeStyle = 'rgba(245, 158, 11, 0.3)';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.stroke();

    // Graticule Lines (Latitude / Longitude)
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    this.ctx.lineWidth = 1;
    for (let lat = -60; lat <= 60; lat += 30) {
      this.ctx.beginPath();
      let first = true;
      for (let lng = -180; lng <= 180; lng += 10) {
        const pt = this.latLngTo3D(lat, lng);
        if (pt.z > 0) {
          const sx = this.centerX + pt.x;
          const sy = this.centerY - pt.y;
          if (first) { this.ctx.moveTo(sx, sy); first = false; }
          else { this.ctx.lineTo(sx, sy); }
        } else {
          first = true;
        }
      }
      this.ctx.stroke();
    }

    // Render Land Dots
    for (const dot of this.landDots) {
      const pt = this.latLngTo3D(dot.lat, dot.lng);
      if (pt.z > 0) {
        const alpha = Math.max(0.1, pt.z / this.radius);
        this.ctx.fillStyle = `rgba(245, 158, 11, ${alpha * 0.85})`;
        const sx = this.centerX + pt.x;
        const sy = this.centerY - pt.y;
        this.ctx.beginPath();
        this.ctx.arc(sx, sy, 1.8, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }

    // Render Hotspot Pins
    for (const pin of this.hotspots) {
      const pt = this.latLngTo3D(pin.lat, pin.lng);
      if (pt.z > 0) {
        const sx = this.centerX + pt.x;
        const sy = this.centerY - pt.y;
        const isHovered = this.hoveredPin === pin;

        // Pulse Ring
        const pulse = (Date.now() % 1500) / 1500;
        this.ctx.strokeStyle = isHovered ? '#06B6D4' : 'rgba(245, 158, 11, ' + (1 - pulse) + ')';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(sx, sy, 6 + pulse * 10, 0, Math.PI * 2);
        this.ctx.stroke();

        // Solid Pin Center
        this.ctx.fillStyle = isHovered ? '#06B6D4' : '#F59E0B';
        this.ctx.beginPath();
        this.ctx.arc(sx, sy, isHovered ? 7 : 5, 0, Math.PI * 2);
        this.ctx.fill();

        // Pin Label
        this.ctx.font = '600 11px Inter, sans-serif';
        this.ctx.fillStyle = isHovered ? '#FFF' : 'rgba(255, 255, 255, 0.8)';
        this.ctx.fillText(pin.name, sx + 10, sy + 4);
      }
    }
  }

  animate() {
    if (!this.isDragging) {
      this.rotationY += 0.002; // Slow auto-rotation
    }
    this.draw();
    requestAnimationFrame(() => this.animate());
  }
}
