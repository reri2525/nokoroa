import { Controller, Get } from '@nestjs/common';

@Controller('about')
export class AboutController {
  @Get()
  getAbout() {
    return {
      name: 'Nokoroa',
      description: '旅の思い出を記録・共有できるアプリケーション',
      features: [
        {
          title: '旅の記録',
          description: '訪れた場所、感じたこと、写真などを記録できます。',
        },
        {
          title: '思い出の共有',
          description: '友達や家族と旅の思い出を共有できます。',
        },
        {
          title: '旅の計画',
          description: 'これからの旅の計画を立て、管理できます。',
        },
      ],
      version: '1.0.0',
      technologies: [
        {
          name: 'Backend',
          stack: ['NestJS', 'TypeScript', 'PostgreSQL', 'Prisma'],
        },
        {
          name: 'Frontend',
          stack: ['React', 'TypeScript', 'Tailwind CSS'],
        },
      ],
    };
  }
}
