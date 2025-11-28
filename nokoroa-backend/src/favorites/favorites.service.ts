import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async addFavorite(userId: number, postId: number) {
    // 投稿が存在するかチェック
    const post = await this.prisma.post.findUnique({
      where: { id: postId, isPublic: true },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    // 既にお気に入りに追加されているかチェック
    const existingFavorite = await this.prisma.bookmark.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (existingFavorite) {
      throw new ConflictException('Post is already in favorites');
    }

    return this.prisma.bookmark.create({
      data: {
        userId,
        postId,
      },
      include: {
        post: {
          include: {
            author: {
              select: { id: true, name: true, email: true, avatar: true },
            },
          },
        },
      },
    });
  }

  async removeFavorite(userId: number, postId: number) {
    const favorite = await this.prisma.bookmark.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (!favorite) {
      throw new NotFoundException('Favorite not found');
    }

    await this.prisma.bookmark.delete({
      where: { id: favorite.id },
    });

    return { message: 'Favorite removed successfully' };
  }

  async getUserFavorites(
    userId: number,
    limit: number = 10,
    offset: number = 0,
  ) {
    const [favorites, total] = await Promise.all([
      this.prisma.bookmark.findMany({
        where: { userId },
        include: {
          post: {
            include: {
              author: {
                select: { id: true, name: true, email: true, avatar: true },
              },
              _count: {
                select: { bookmarks: true },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit,
      }),
      this.prisma.bookmark.count({ where: { userId } }),
    ]);

    return {
      favorites: favorites.map((fav) => ({
        id: fav.id,
        createdAt: fav.createdAt,
        post: {
          ...fav.post,
          favoritesCount: fav.post._count.bookmarks,
        },
      })),
      total,
      hasMore: offset + limit < total,
    };
  }

  async checkFavoriteStatus(userId: number, postId: number) {
    const favorite = await this.prisma.bookmark.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    return { isFavorited: !!favorite };
  }

  async getFavoriteStats(postId: number) {
    const count = await this.prisma.bookmark.count({
      where: { postId },
    });

    return { favoritesCount: count };
  }
}
