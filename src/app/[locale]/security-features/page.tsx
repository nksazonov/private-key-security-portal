import { AppLocale } from '@/i18n/types';
import { Locale, useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import AnchorHeading from '@/components/AnchorHeading';
import AdvantagesList from '@/components/AdvantagesList';
import DisadvantagesList from '@/components/DisadvantagesList';
import CodeBlock from '@/components/CodeBlock';
import SectionDivider from '@/components/SectionDivider';
import UsefulLinks from '@/components/UsefulLinks';
import Card from '@/components/Card';
import MultipleWeightedSignatureWrapper from '@/components/MultipleWeightedSignatureWrapper';
import SocialRecoveryWrapper from '@/components/SocialRecoveryWrapper';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // Cast locale to allowed types for getTranslations
  const t = await getTranslations({
    locale: locale as AppLocale,
    namespace: 'SecurityFeaturesPage'
  });

  return {
    title: t('title')
  };
}

export default function SecurityFeaturesPage() {
  const t = useTranslations('SecurityFeaturesPage');

  // Account types to render
  const accountTypes = ['eoa', 'smartContract', 'erc4337'];

  // Authorization scheme types to render
  const authSchemeTypes = ['singleSig', 'multiSig', 'mpcTss', 'socialRecovery'];

  const ui = useTranslations('UI.labels');

  return (
    <main className="pt-8 w-full">
      <div className="bg-white p-8 pb-0 rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-blue-900">
          {t('title')}
        </h1>
        <p className="text-lg text-gray-700 mb-10">
          {t('description')}
        </p>

        {/* Account Type Section */}
        <AnchorHeading as="h2" id="account-type" className="text-2xl font-semibold text-blue-800 mb-4">
          {t('accountType.name')}
        </AnchorHeading>
        <p className="text-lg text-gray-700 mb-8">
          {t('accountType.description')}
        </p>

        {/* Individual Account Types */}
        <div className="space-y-10 mb-10">
          {accountTypes.map((type, index) => (
            <Card key={type} className="mb-10">
              <AnchorHeading
                as="h3"
                id={`account-type-${type}`}
                className="text-xl font-semibold text-blue-700 mb-3"
              >
                {t(`accountType.${type}.name`)}
              </AnchorHeading>

              <div className="text-gray-700 mb-6 text-lg">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                >
                  {t.raw(`accountType.${type}.description`) || ''}
                </ReactMarkdown>
              </div>

              {/* Grid layout with rows and separators */}
              <div className="mt-6">
                {/* Row 1: Features and Code */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Features */}
                  <div>
                    <h4 className="text-lg font-semibold text-blue-600 mb-2">{ui('features')}</h4>
                    <div className="ml-2 text-gray-900">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight]}
                        components={{
                          ul: ({node, ...props}) => <ul className="list-disc ml-4" {...props} />,
                          li: ({node, ...props}) => <li className="mb-1" {...props} />
                        }}
                      >
                        {t.raw(`accountType.${type}.features`) || ''}
                      </ReactMarkdown>
                    </div>
                  </div>

                  {/* Code Example */}
                  <div>
                    <CodeBlock
                      code={t.raw(`accountType.${type}.code`) || ''}
                      label={ui('implementationInsight')}
                    />
                  </div>
                </div>

                {/* Separator */}
                <hr className="border-t border-gray-200 my-6" />

                {/* Row 2: Advantages and Disadvantages */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Advantages */}
                  <div>
                    <h4 className="text-lg font-semibold text-green-600 mb-2">{ui('advantages')}</h4>
                    <AdvantagesList content={t.raw(`accountType.${type}.advantages`) || ''} />
                  </div>

                  {/* Disadvantages */}
                  <div>
                    <h4 className="text-lg font-semibold text-red-600 mb-2">{ui('disadvantages')}</h4>
                    <DisadvantagesList content={t.raw(`accountType.${type}.disadvantages`) || ''} />
                  </div>
                </div>

                {/* Separator */}
                <hr className="border-t border-gray-200 my-6" />

                {/* Row 3: Useful Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Useful Links */}
                  <div>
                    <UsefulLinks links={t.raw(`accountType.${type}.useful_links`) || []} />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <SectionDivider />

        <AnchorHeading as="h2" id="authorization-scheme" className="text-2xl font-semibold text-blue-800 mb-4">
          {t('authorizationScheme.name')}
        </AnchorHeading>
        <p className="text-lg text-gray-700 mb-8">
          {t('authorizationScheme.description')}
        </p>

        <div className="space-y-10">
          {authSchemeTypes.map((type, index) => (
            <div key={type} className="mb-10">
              <AnchorHeading
                as="h3"
                id={`auth-scheme-${type}`}
                className="text-xl font-semibold text-blue-700 mb-3"
              >
                {t(`authorizationScheme.${type}.name`)}
              </AnchorHeading>

              <div className="text-gray-700 mb-6 text-lg">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                >
                  {t.raw(`authorizationScheme.${type}.description`) || ''}
                </ReactMarkdown>
              </div>

              {/* Features and Useful Links in a 2-column layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Features */}
                <div>
                  <h4 className="text-lg font-semibold text-blue-600 mb-2">{ui('features')}</h4>
                  <div className="ml-2 text-gray-900">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight]}
                      components={{
                        ul: ({node, ...props}) => <ul className="list-disc ml-4" {...props} />,
                        li: ({node, ...props}) => <li className="mb-1" {...props} />
                      }}
                    >
                      {t.raw(`authorizationScheme.${type}.features`) || ''}
                    </ReactMarkdown>
                  </div>
                </div>

                {/* Useful Links for each item */}
                <div>
                  <UsefulLinks links={t.raw(`authorizationScheme.${type}.useful_links`) || []} />
                </div>
              </div>

              {/* Add interactive components after their respective sections */}
              {type === 'multiSig' && <MultipleWeightedSignatureWrapper />}
              {type === 'socialRecovery' && <SocialRecoveryWrapper />}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
