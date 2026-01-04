import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsArray,
  IsNumber,
  Min,
  Max,
} from 'class-validator';

export class SearchPostsDto {
  @ApiPropertyOptional({
    description: '検索クエリ（タイトル、コンテンツ、著者名で検索）',
    example: '京都',
  })
  @IsOptional()
  @IsString()
  q?: string;

  @ApiPropertyOptional({
    description: 'タグでフィルタリング（カンマ区切り）',
    example: '京都,紅葉',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }): string[] => {
    if (typeof value === 'string') {
      return value.split(',').map((tag) => tag.trim());
    }
    return value as string[];
  })
  tags?: string[];

  @ApiPropertyOptional({
    description: '場所でフィルタリング',
    example: '清水寺',
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({
    description: '著者IDでフィルタリング',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  authorId?: number;

  @ApiPropertyOptional({
    description: '取得件数（1〜50）',
    example: 10,
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(50)
  @Type(() => Number)
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'オフセット',
    example: 0,
    minimum: 0,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  offset?: number = 0;
}
