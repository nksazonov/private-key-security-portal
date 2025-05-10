"use client"

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

interface AdvantagesListProps {
  content: string;
}

export default function AdvantagesList({ content }: AdvantagesListProps) {
  return (
    <div className="mb-3 bg-green-50 p-4 rounded-md">
      <div className="text-md font-medium text-green-800 prose prose-green max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}