import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class SearchPostsByLocationDto {
  @ApiPropertyOptional({
    description: '中心点の緯度',
    example: 35.6812,
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value as string))
  centerLat?: number;

  @ApiPropertyOptional({
    description: '中心点の経度',
    example: 139.7671,
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value as string))
  centerLng?: number;

  @ApiPropertyOptional({
    description: '検索半径（キロメートル単位）',
    example: 10,
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value as string))
  radius?: number;

  @ApiPropertyOptional({
    description: '取得件数',
    example: 10,
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value as string))
  limit?: number;

  @ApiPropertyOptional({
    description: 'オフセット',
    example: 0,
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value as string))
  offset?: number;

  @ApiPropertyOptional({
    description: '検索クエリ',
    example: '東京',
  })
  @IsOptional()
  @IsString()
  q?: string;
}
