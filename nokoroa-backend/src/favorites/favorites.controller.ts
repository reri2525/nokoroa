import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post(':postId')
  @UseGuards(JwtAuthGuard)
  async addFavorite(
    @Param('postId', ParseIntPipe) postId: number,
    @Request() req: { user: { userId: number } },
  ) {
    return this.favoritesService.addFavorite(req.user.userId, postId);
  }

  @Delete(':postId')
  @UseGuards(JwtAuthGuard)
  async removeFavorite(
    @Param('postId', ParseIntPipe) postId: number,
    @Request() req: { user: { userId: number } },
  ) {
    return this.favoritesService.removeFavorite(req.user.userId, postId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUserFavorites(
    @Request() req: { user: { userId: number } },
    @Query('limit', ParseIntPipe) limit: number = 10,
    @Query('offset', ParseIntPipe) offset: number = 0,
  ) {
    return this.favoritesService.getUserFavorites(
      req.user.userId,
      limit,
      offset,
    );
  }

  @Get('check/:postId')
  @UseGuards(JwtAuthGuard)
  async checkFavoriteStatus(
    @Param('postId', ParseIntPipe) postId: number,
    @Request() req: { user: { userId: number } },
  ) {
    return this.favoritesService.checkFavoriteStatus(req.user.userId, postId);
  }

  @Get('stats/:postId')
  async getFavoriteStats(@Param('postId', ParseIntPipe) postId: number) {
    return this.favoritesService.getFavoriteStats(postId);
  }
}
