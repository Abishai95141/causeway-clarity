import { useEffect, useRef } from 'react';

export function StarburstBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener('resize', resize);

    // Floating nodes for causal connection lines
    const nodes: { x: number; y: number; vx: number; vy: number }[] = [];
    const nodeCount = 8;
    
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      });
    }

    const draw = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      
      ctx.clearRect(0, 0, width, height);

      // Breathing scale for starburst (15 second cycle)
      const breathe = Math.sin(time * 0.0004) * 0.05 + 1;
      const centerX = width * 0.75;
      const centerY = height * 0.4;
      const maxRadius = Math.min(width, height) * 0.6 * breathe;

      // Draw starburst radial gradient
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, maxRadius
      );
      
      // Crimson to transparent (very subtle)
      gradient.addColorStop(0, 'hsla(0, 84%, 50%, 0.08)');
      gradient.addColorStop(0.3, 'hsla(0, 84%, 50%, 0.05)');
      gradient.addColorStop(0.6, 'hsla(0, 84%, 50%, 0.02)');
      gradient.addColorStop(1, 'hsla(0, 84%, 50%, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius, 0, Math.PI * 2);
      ctx.fill();

      // Draw causal connection lines
      nodes.forEach((node, i) => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Keep in bounds
        node.x = Math.max(0, Math.min(width, node.x));
        node.y = Math.max(0, Math.min(height, node.y));

        // Draw connections to nearby nodes
        nodes.forEach((other, j) => {
          if (i >= j) return;
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 200;

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.15;
            ctx.strokeStyle = `hsla(0, 84%, 50%, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        });

        // Draw nodes
        const nodeAlpha = 0.1 + Math.sin(time * 0.002 + i) * 0.05;
        ctx.fillStyle = `hsla(0, 84%, 50%, ${nodeAlpha})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      time++;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
}
