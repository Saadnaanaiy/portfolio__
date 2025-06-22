import { useRef, useEffect, useCallback, useState } from 'react';

const ClickSpark = ({
  sparkColor = '#6366f1',
  sparkSize = 12,
  sparkRadius = 20,
  sparkCount = 12,
  duration = 600,
  easing = 'ease-out',
  extraScale = 1.2,
  particleSize = 2,
  enableGlow = true,
  autoClick = false,
  autoClickInterval = 5000,
  customEffects = [],
  pulseEffect = true,
}) => {
  const canvasRef = useRef(null);
  const sparksRef = useRef([]); // Stores spark data
  const startTimeRef = useRef(null); // Tracks initial timestamp for animation
  const autoClickTimerRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let resizeTimeout;

    const resizeCanvas = () => {
      const { width, height } = parent.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 100); // Debounce by 100ms
    };

    // Observe size changes
    const ro = new ResizeObserver(handleResize);
    ro.observe(parent);

    // Initial sizing
    resizeCanvas();

    // Cleanup
    return () => {
      ro.disconnect();
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Auto-click effect
  useEffect(() => {
    if (!autoClick || !canvasRef.current || !isMounted) return;

    const triggerAutoClick = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Random position within the canvas
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;

      createSparks(x, y);
    };

    // Start auto-click timer
    autoClickTimerRef.current = setInterval(
      triggerAutoClick,
      autoClickInterval,
    );

    // Cleanup
    return () => {
      if (autoClickTimerRef.current) {
        clearInterval(autoClickTimerRef.current);
      }
    };
  }, [autoClick, autoClickInterval, isMounted]);

  const easeFunc = useCallback(
    (t) => {
      switch (easing) {
        case 'linear':
          return t;
        case 'ease-in':
          return t * t;
        case 'ease-in-out':
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        case 'elastic':
          return t === 0
            ? 0
            : t === 1
            ? 1
            : -Math.pow(2, 10 * t - 10) *
              Math.sin((t * 10 - 10.75) * ((2 * Math.PI) / 3));
        case 'bounce':
          const n1 = 7.5625;
          const d1 = 2.75;
          if (t < 1 / d1) {
            return n1 * t * t;
          } else if (t < 2 / d1) {
            return n1 * (t -= 1.5 / d1) * t + 0.75;
          } else if (t < 2.5 / d1) {
            return n1 * (t -= 2.25 / d1) * t + 0.9375;
          } else {
            return n1 * (t -= 2.625 / d1) * t + 0.984375;
          }
        default:
          return t * (2 - t);
      }
    },
    [easing],
  );

  useEffect(() => {
    if (!isMounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationId;

    const draw = (timestamp) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp; // store initial time
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) {
          // Spark finished its animation
          return false;
        }

        const progress = elapsed / duration;
        const eased = easeFunc(progress);

        const distance = eased * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - eased);

        // Calculate opacity based on progress
        const opacity = 1 - eased;
        const color =
          typeof sparkColor === 'function'
            ? sparkColor(progress, spark.index)
            : sparkColor;

        // Support for color arrays
        const finalColor = Array.isArray(color)
          ? color[spark.index % color.length]
          : color;

        // Points for the spark line
        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        // Draw the spark line with glow effect
        ctx.save();
        if (enableGlow) {
          ctx.shadowBlur = 10 * opacity;
          ctx.shadowColor = finalColor;
        }

        // Set opacity
        ctx.globalAlpha = opacity;

        // Draw main line
        ctx.strokeStyle = finalColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        // Draw particle at the end of the line
        ctx.beginPath();
        ctx.arc(x2, y2, particleSize * (1 - eased * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = finalColor;
        ctx.fill();

        // Add pulse effect if enabled
        if (pulseEffect && progress < 0.3) {
          const pulseSize = sparkRadius * (0.3 - progress) * 2;
          ctx.beginPath();
          ctx.arc(spark.x, spark.y, pulseSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${parseInt(
            finalColor.slice(1, 3),
            16,
          )}, ${parseInt(finalColor.slice(3, 5), 16)}, ${parseInt(
            finalColor.slice(5, 7),
            16,
          )}, ${0.1 * (1 - progress / 0.3)})`;
          ctx.fill();
        }

        // Apply any custom effects
        customEffects.forEach((effect) => {
          if (typeof effect === 'function') {
            effect(ctx, spark, progress, eased);
          }
        });

        ctx.restore();

        return true;
      });

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [
    sparkColor,
    sparkSize,
    sparkRadius,
    sparkCount,
    duration,
    easeFunc,
    extraScale,
    particleSize,
    enableGlow,
    pulseEffect,
    customEffects,
    isMounted,
  ]);

  const createSparks = useCallback(
    (x, y) => {
      const now = performance.now();
      const colorArray = Array.isArray(sparkColor) ? sparkColor : [sparkColor];

      const newSparks = Array.from({ length: sparkCount }, (_, i) => ({
        x,
        y,
        angle: (2 * Math.PI * i) / sparkCount + (Math.random() * 0.2 - 0.1), // Add slight randomness
        startTime: now,
        index: i,
        color: colorArray[i % colorArray.length],
        speed: 1 + Math.random() * 0.3, // Random speed variation
      }));

      sparksRef.current.push(...newSparks);
    },
    [sparkColor, sparkCount],
  );

  const handleClick = useCallback(
    (e) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      createSparks(x, y);
    },
    [createSparks],
  );

  // Prevent hydration error by not rendering on server
  if (!isMounted) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        userSelect: 'none',
        position: 'absolute', // Ensure the canvas doesn't affect parent size
        top: 0,
        left: 0,
        pointerEvents: 'none', // Allow clicks to pass through
      }}
      onClick={handleClick}
    />
  );
};

export default ClickSpark;
