'use client';

import { useEffect, useState } from 'react';
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

export default function SantaChainsHomepage() {
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

  useEffect(() => {
    setMounted(true);
    
    // 优化樱花飘落效果 - 减少DOM操作频率
    const createSakuraPetal = () => {
      const petal = document.createElement('div');
      petal.className = 'sakura-petal';
      petal.style.left = Math.random() * 100 + 'vw';
      petal.style.animationDuration = (Math.random() * 4 + 3) + 's'; // 增加动画时长
      petal.style.animationDelay = Math.random() * 1 + 's';
      petal.style.willChange = 'transform, opacity'; // 启用硬件加速
      document.body.appendChild(petal);

      setTimeout(() => {
        petal.remove();
      }, 7000);
    };

    // 降低创建频率，使用指数衰减
    const createPetalWithDelay = () => {
      createSakuraPetal();
      const nextDelay = 800 + Math.random() * 1200; // 800-2000ms随机间隔
      setTimeout(createPetalWithDelay, nextDelay);
    };

    createPetalWithDelay();
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 优化后的雾气层 - 减少数量提升性能 */}
      <div className="mist-layer" />
      <div className="mist-layer" style={{ animationDelay: '4s', opacity: 0.7 }} />

      {/* 主内容区域 */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* 头部区域 */}
        <header className="text-center mb-16">
          <Avatar className="w-32 h-32 mx-auto mb-6 ring-4 ring-primary/20">
            <AvatarImage src="/api/placeholder/128/128" alt="SantaChains" />
            <AvatarFallback className="text-4xl bg-gradient-to-br from-pink-200 to-blue-200">
              聖
            </AvatarFallback>
          </Avatar>
          
          <h1 className="text-5xl font-bold mb-4 text-gradient">
            SantaChains
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            在川端康成的雪国里，每一粒雪晶都是未完成的诗篇，
            而我的文字，不过是这些雪花在时光中的倒影。
          </p>
        </header>

        <Separator className="my-12 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        {/* 语录网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {quotes.map((quote) => (
            <HoverCard key={quote.id}>
              <HoverCardTrigger asChild>
                <Card className="group cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 border-0 bg-card/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg text-gradient">
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
              <HoverCardContent className="w-80 bg-card/90 backdrop-blur-md border-0">
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
            <p className="text-sm text-muted-foreground">
              这些文字，不过是雪国中的一场梦
            </p>
            <div className="flex justify-center space-x-4">
              <Button 
                variant="ghost" 
                className="text-xs hover:bg-primary/10 hover:text-primary transition-colors"
              >
                更多雪国记忆
              </Button>
              <Button 
                variant="ghost" 
                className="text-xs hover:bg-secondary/10 hover:text-secondary transition-colors"
              >
                时间之河
              </Button>
            </div>
          </div>
        </footer>
      </div>

      {/* 优化后的动态背景元素 - 减少重绘 */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute top-3/4 right-1/4 w-60 h-60 bg-secondary/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '8s' }} />
      </div>
    </div>
  );
}
