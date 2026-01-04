import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsArray,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class UpdatePostDto {
  @ApiPropertyOptional({
    description: '投稿のタイトル',
    example: '京都旅行の思い出（更新版）',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: '投稿の本文',
    example: '先週末、京都に行ってきました。紅葉がとても綺麗でした！',
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({
    description: '投稿画像のURL',
    example: 'https://example.com/images/kyoto.jpg',
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({
    description: '場所の名前',
    example: '清水寺',
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({
    description: '都道府県',
    example: '京都府',
  })
  @IsOptional()
  @IsString()
  prefecture?: string;

  @ApiPropertyOptional({
    description: '緯度',
    example: 34.9949,
  })
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiPropertyOptional({
    description: '経度',
    example: 135.785,
  })
  @IsOptional()
  @IsNumber()
  longitude?: number;

  @ApiPropertyOptional({
    description: 'タグの配列',
    example: ['京都', '紅葉', '寺社仏閣'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({
    description: '公開設定（true: 公開, false: 非公開）',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;
}
