-- Fix localhost image URLs that were incorrectly saved in production
-- These images don't exist in S3, so set them to NULL to use default image

UPDATE "post"
SET "imageUrl" = NULL
WHERE "imageUrl" LIKE 'http://localhost%';
