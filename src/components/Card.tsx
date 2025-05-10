"use client"

import { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

interface CardProps {
  icon: ReactNode;
  title: string;
  description: string;
  children?: ReactNode;
}

export default function Card({ icon, title, description, children }: CardProps) {
  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 h-full hover:border-blue-300 transition-colors shadow-sm">
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
  );
}