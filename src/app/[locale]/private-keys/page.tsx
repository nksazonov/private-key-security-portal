import { AppLocale } from '@/i18n/types';
import { Locale, useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import AnchorHeading from '@/components/AnchorHeading';
import ExternalLink from '@/components/ExternalLink';
import SectionDivider from '@/components/SectionDivider';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // Cast locale to allowed types for getTranslations
  const t = await getTranslations({
    locale: locale as AppLocale,
    namespace: 'PrivateKeysPage'
  });

  return {
    title: t('title')
  };
}

export default function PrivateKeysPage({ params }: { params: { locale: Locale } }) {
  const t = useTranslations('PrivateKeysPage');

  return (
    <main className="py-8 w-full">
      <div className="bg-white p-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-blue-900">
          {t('title')}
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          {t('description')}
        </p>

        <AnchorHeading
          as="h2"
          id="entropy-sources"
          className="text-2xl font-semibold mt-8 mb-4 text-blue-800"
        >
          {t('entropySources.title')}
        </AnchorHeading>
        <div className="text-lg text-gray-700 mb-6 prose prose-blue max-w-none">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]} 
            rehypePlugins={[rehypeHighlight]}
          >
            {t('entropySources.description')}
          </ReactMarkdown>
        </div>

        <div className="mt-8 mb-6">
          <h3 className="text-xl font-medium mt-6 mb-3 text-blue-700">
            {useTranslations('Common')('useful_links')}
          </h3>
          <ul className="space-y-2 pl-4">
            {/* Render links dynamically from the content */}
            {t.raw('entropySources.links').map((link: {href: string, text: string}, index: number) => (
              <li key={index}>
                <ExternalLink href={link.href}>
                  {link.text}
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
