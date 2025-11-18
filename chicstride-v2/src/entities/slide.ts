// src/entities/slide.ts

export type SlideTargetType = 'product' | 'category' | 'url' | null;

export type Slide = {
  id: string;
  title?: string | null;
  subtitle?: string | null;
  image?: string | null;
  targetType?: SlideTargetType;
  targetValue?: string | null;
  productId?: string | null;
  position?: string | null;
  sortOrder?: number | null;
  weight?: number | null;
  metadata?: Record<string, unknown>;
};
