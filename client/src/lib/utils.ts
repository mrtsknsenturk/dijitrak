import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateGradientBackground(strength: number = 0.1): string {
  return `radial-gradient(circle, rgba(15, 241, 200, ${strength}) 0%, rgba(138, 63, 252, ${
    strength / 2
  }) 30%, rgba(15, 17, 24, 0) 70%)`;
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Mouse parallax effect helper
export function applyParallaxEffect(
  e: React.MouseEvent,
  element: HTMLElement | null,
  intensity: number = 0.05
) {
  if (!element) return;
  
  const x = (window.innerWidth - e.pageX * intensity) / 100;
  const y = (window.innerHeight - e.pageY * intensity) / 100;
  
  element.style.transform = `translateX(${x}px) translateY(${y}px)`;
}
