'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

interface Quote {
  id: number;
  text: string;
  category: string;
  timestamp: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
}

// 使用Canvas替代DOM操作的高性能樱花系统
class SakuraParticleSystem {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationId: number = 0;
  private width: number = 0;
  private height: number = 0;
  private particleIdCounter = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas context not available');
    this.ctx = ctx;
    this.resize();
    this.init();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  private createParticle(): Particle {
    const colors = [
      'oklch(0.9 0.2 350 / 0.8)',   // 樱花粉
      'oklch(0.85 0.15 10 / 0.7)',  // 淡红
      'oklch(0.95 0.1 40 / 0.6)',   // 米白
      'oklch(0.88 0.18 320 / 0.75)' // 桃色
    ];
    
    return {
      id: this.particleIdCounter++,
      x: Math.random() * this.width,
      y: -20,
      size: Math.random() * 6 + 4,
      speedY: Math.random() * 1.5 + 0.5,
      speedX: Math.random() * 1 - 0.5,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 2 - 1,
      opacity: Math.random() * 0.4 + 0.4,
      color: colors[Math.floor(Math.random() * colors.length)]
    };
  }

  private init() {
    // 初始化50个花瓣
    for (let i = 0; i < 50; i++) {
      const p = this.createParticle();
      p.y = Math.random() * this.height;
      this.particles.push(p);
    }
  }

  private drawPetal(p: Particle) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.globalAlpha = p.opacity;
    
    // 绘制樱花花瓣形状
    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.moveTo(0, -p.size);
    ctx.bezierCurveTo(p.size, -p.size/2, p.size, p.size/2, 0, p.size);
    ctx.bezierCurveTo(-p.size, p.size/2, -p.size, -p.size/2, 0, -p.size);
    ctx.fill();
    
    // 花瓣纹理
    ctx.strokeStyle = 'oklch(0.95 0.05 350 / 0.3)';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(0, -p.size * 0.7);
    ctx.lineTo(0, p.size * 0.7);
    ctx.stroke();
    
    ctx.restore();
  }

  update() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.particles.forEach((p, index) => {
      // 更新位置
      p.y += p.speedY;
      p.x += p.speedX + Math.sin(p.y * 0.01) * 0.5; // 飘动效果
      p.rotation += p.rotationSpeed;

      // 边界检查 - 回收花瓣
      if (p.y > this.height + 20) {
        this.particles[index] = this.createParticle();
      }
      if (p.x < -20) p.x = this.width + 20;
      if (p.x > this.width + 20) p.x = -20;

      this.drawPetal(p);
    });

    this.animationId = requestAnimationFrame(() => this.update());
  }

  start() {
    this.update();
  }

  stop() {
    cancelAnimationFrame(this.animationId);
  }
}

export default function SantaChainsHomepageEnhanced() {
  const [quotes] = useState<Quote[]>([
    {
      id: 1,
      text: "雪国的夜，像被月光浸透的宣纸，每一笔都是未完成的思念。",
      category: "雪国",
      timestamp: "2024-12-01"
    },
    {
      id: 2,
      text: "她的睫毛上沾着晨露，像是昨夜星辰遗落的碎片，在黎明前微微颤动。",
      category: "古都",
      timestamp: "2024-12-02"
    },
    {
      id: 3,
      text: "温泉的雾气升腾，模糊了现实的边界，仿佛连时间都在这氤氲中溶解。",
      category: "千纸鹤",
      timestamp: "2024-12-03"
    },
    {
      id: 4,
      text: "樱花飘落的轨迹，是春天写给大地的情书，每一瓣都是无法投递的温柔。",
      category: "山音",
      timestamp: "2024-12-04"
    },
    {
      id: 5,
      text: "茶室的纸门透进微光，像是从另一个世界渗入的记忆，带着榻榻米的温度。",
      category: "睡美人",
      timestamp: "2024-12-05"
    },
    {
      id: 6,
      text: "她的和服下摆扫过木质走廊，发出细微的沙沙声，像是时间在低声诉说。",
      category: "湖",
      timestamp: "2024-12-06"
    }
  ]);

  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particleSystemRef = useRef<SakuraParticleSystem | null>(null);

  useEffect(() => {
    setMounted(true);

    // 初始化Canvas粒子系统
    if (canvasRef.current) {
      particleSystemRef.current = new SakuraParticleSystem(canvasRef.current);
      particleSystemRef.current.start();
    }

    // 窗口大小改变时重新调整
    const handleResize = () => {
      particleSystemRef.current?.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      particleSystemRef.current?.stop();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 鼠标视差效果
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({
      x: (e.clientX / window.innerWidth - 0.5) * 20,
      y: (e.clientY / window.innerHeight - 0.5) * 20
    });
  }, []);

  if (!mounted) return null;

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Canvas樱花层 - 高性能渲染 */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-20"
        style={{ opacity: 0.9 }}
      />

      {/* 多层雾气效果 - 恢复3层并增强 */}
      <div className="mist-layer mist-layer-1" />
      <div className="mist-layer mist-layer-2" />
      <div className="mist-layer mist-layer-3" />

      {/* 主内容区域 */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* 头部区域 */}
        <header className="text-center mb-16">
          <div 
            className="avatar-container"
            style={{
              transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`
            }}
          >
            <Avatar className="w-32 h-32 mx-auto mb-6 ring-4 ring-primary/30 avatar-glow">
              <AvatarImage src="/api/placeholder/128/128" alt="SantaChains" />
              <AvatarFallback className="text-4xl bg-gradient-to-br from-pink-200 to-blue-200">
                聖
              </AvatarFallback>
            </Avatar>
          </div>
          
          <h1 className="text-5xl font-bold mb-4 text-gradient-enhanced">
            SantaChains
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed typewriter-effect">
            在川端康成的雪国里，每一粒雪晶都是未完成的诗篇，
            而我的文字，不过是这些雪花在时光中的倒影。
          </p>
        </header>

        <Separator className="my-12 bg-gradient-to-r from-transparent via-primary/30 to-transparent separator-shimmer" />

        {/* 语录网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {quotes.map((quote, index) => (
            <HoverCard key={quote.id}>
              <HoverCardTrigger asChild>
                <Card 
                  className="group cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 border-0 bg-card/80 backdrop-blur-sm card-float"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <CardTitle className="text-lg text-gradient-enhanced">
                      {quote.category}
                    </CardTitle>
                    <CardDescription className="text-xs text-muted-foreground">
                      {quote.timestamp}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-foreground/80 group-hover:text-foreground transition-colors">
                      {quote.text}
                    </p>
                  </CardContent>
                </Card>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 bg-card/90 backdrop-blur-md border-0 hover-card-glow">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    这个瞬间，像是从川端康成的笔下流淌出来的
                  </p>
                  <Separator className="bg-primary/20" />
                  <p className="text-xs text-foreground/60">
                    &ldquo;美在于发现，在于邂逅，是机缘。&rdquo;
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>

        {/* 底部区域 */}
        <footer className="text-center mt-20">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground footer-fade">
              这些文字，不过是雪国中的一场梦
            </p>
            <div className="flex justify-center space-x-4">
              <Button 
                variant="ghost" 
                className="text-xs hover:bg-primary/10 hover:text-primary transition-colors btn-shine"
              >
                更多雪国记忆
              </Button>
              <Button 
                variant="ghost" 
                className="text-xs hover:bg-secondary/10 hover:text-secondary transition-colors btn-shine"
              >
                时间之河
              </Button>
            </div>
          </div>
        </footer>
      </div>

      {/* 增强版动态背景元素 - 3层光晕 */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl glow-orb glow-orb-1"
          style={{ 
            transform: `translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px)`,
          }} 
        />
        <div 
          className="absolute top-3/4 right-1/4 w-72 h-72 bg-secondary/5 rounded-full blur-3xl glow-orb glow-orb-2"
          style={{ 
            transform: `translate(${mousePos.x * -0.2}px, ${mousePos.y * -0.2}px)`,
          }} 
        />
        <div 
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-accent/5 rounded-full blur-3xl glow-orb glow-orb-3"
          style={{ 
            transform: `translate(${mousePos.x * -0.4}px, ${mousePos.y * -0.4}px)`,
          }} 
        />
      </div>
    </div>
  );
}
