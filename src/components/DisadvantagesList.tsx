"use client"

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

interface DisadvantagesListProps {
  content: string;
}

export default function DisadvantagesList({ content }: DisadvantagesListProps) {
  return (
    <div className="mb-3 bg-red-50 p-4 rounded-md">
      <div className="text-md font-medium text-red-800 prose prose-red max-w-none">
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