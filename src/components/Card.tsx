"use client"

import { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import Carousel from './Carousel';

interface CardProps {
  icon: ReactNode;
  title: string;
  description: string;
  carouselImages?: string[];
  children?: ReactNode;
}

export default function Card({ icon, title, description, carouselImages, children }: CardProps) {
  const hasCarousel = carouselImages && carouselImages.length > 0;

  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 h-full hover:border-blue-300 transition-colors shadow-sm">
      <div className={`flex flex-col md:flex-row gap-8`}>
        <div className={`${hasCarousel ? 'md:flex-1' : 'w-full'}`}>
          <div className="flex items-center mb-6">
            <div className="text-blue-600 flex-shrink-0 w-8 h-8 flex items-center justify-center">
              {icon}
            </div>
            <h3 className="text-2xl font-semibold text-blue-700 ml-4">{title}</h3>
          </div>
          
          <div className="prose prose-blue max-w-none mb-6">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {description}
            </ReactMarkdown>
          </div>
          
          <div>
            {children}
          </div>
        </div>
        
        {hasCarousel && (
          <div className="flex-shrink-0 md:w-80">
            <Carousel images={carouselImages} height={320} width={320} />
          </div>
        )}
      </div>
    </div>
  );
}