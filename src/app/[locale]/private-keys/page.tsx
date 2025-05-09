import { AppLocale } from '@/i18n/types';
import { Locale, useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import AnchorHeading from '@/components/AnchorHeading';
import ExternalLink from '@/components/ExternalLink';
import SectionDivider from '@/components/SectionDivider';
import ClientKeyGeneratorWrapper from '@/components/ClientKeyGeneratorWrapper';
import ClientMnemonicGeneratorWrapper from '@/components/ClientMnemonicGeneratorWrapper';
import ClientKeyFromMnemonicGeneratorWrapper from '@/components/ClientKeyFromMnemonicGeneratorWrapper';
import ClientMnemonicValidatorWrapper from '@/components/ClientMnemonicValidatorWrapper';
import ClientECPointGeneratorWrapper from '@/components/ClientECPointGeneratorWrapper';
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
  const common = useTranslations('Common');

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
            {common('useful_links')}
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

        <SectionDivider />

        <AnchorHeading
          as="h2"
          id="key-generation"
          className="text-2xl font-semibold mt-8 mb-4 text-blue-800"
        >
          {t('privateKeyGeneration.title')}
        </AnchorHeading>

        {/* CSPRNG Section */}
        <AnchorHeading
          as="h3"
          id="key-generation-csprng"
          className="text-xl font-semibold mt-6 mb-3 text-blue-700"
        >
          {t('privateKeyGeneration.fromCsprng.title')}
        </AnchorHeading>
        <div className="text-lg text-gray-700 mb-6 prose prose-blue max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {t.raw('privateKeyGeneration.fromCsprng.description')}
          </ReactMarkdown>
        </div>

        {/* Entropy Section */}
        <AnchorHeading
          as="h3"
          id="key-generation-entropy"
          className="text-xl font-semibold mt-8 mb-3 text-blue-700"
        >
          {t('privateKeyGeneration.fromEntropy.title')}
        </AnchorHeading>
        <div className="text-lg text-gray-700 mb-6 prose prose-blue max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {t.raw('privateKeyGeneration.fromEntropy.description')}
          </ReactMarkdown>
        </div>

        <div className="mt-6 mb-8 bg-gray-50 p-6 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
          <ClientKeyGeneratorWrapper
            generateButtonText={t.raw('privateKeyGeneration.fromEntropy.generateKeyButton')}
            notEnoughEntropyText={t.raw('privateKeyGeneration.fromEntropy.generateKeyNotEnoughEntropy')}
            copyHoverText={common('copyHover')}
            copiedText={common('copied')}
            entropyLevelText={common('entropyLevel')}
            moveMouseText={common('moveMouseForEntropy')}
          />
        </div>

        {/* Seed Section - Main Heading */}
        <AnchorHeading
          as="h3"
          id="key-generation-seed"
          className="text-xl font-semibold mt-8 mb-3 text-blue-700"
        >
          {t('privateKeyGeneration.fromSeed.title')}
        </AnchorHeading>
        <div className="text-lg text-gray-700 mb-6 prose prose-blue max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {t.raw('privateKeyGeneration.fromSeed.description')}
          </ReactMarkdown>
        </div>

        {/* Mnemonic Generation Section */}
        <AnchorHeading
          as="h4"
          id="mnemonic-generation"
          className="text-lg font-semibold mt-6 mb-3 text-blue-700"
        >
          {t('privateKeyGeneration.fromSeed.mnemonicPhrase.title')}
        </AnchorHeading>
        <div className="text-lg text-gray-700 mb-6 prose prose-blue max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {t.raw('privateKeyGeneration.fromSeed.mnemonicPhrase.description')}
          </ReactMarkdown>
        </div>

        {/* Mnemonic Generator Component */}
        <div className="mt-6 mb-8 bg-gray-50 p-6 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
          <ClientMnemonicGeneratorWrapper
            generateButtonText={t.raw('privateKeyGeneration.fromSeed.mnemonicPhrase.generateButtonText')}
            copyHoverText={common('copyHover')}
            copiedText={common('copied')}
          />
        </div>

        {/* Seed Generation Section */}
        <AnchorHeading
          as="h4"
          id="seed-generation"
          className="text-lg font-semibold mt-6 mb-3 text-blue-700"
        >
          {t('privateKeyGeneration.fromSeed.seedGeneration.title')}
        </AnchorHeading>
        <div className="text-lg text-gray-700 mb-6 prose prose-blue max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {t.raw('privateKeyGeneration.fromSeed.seedGeneration.description')}
          </ReactMarkdown>
        </div>

        {/* Key From Mnemonic Generator Component */}
        <div className="mt-6 mb-8 bg-gray-50 p-6 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
          <ClientKeyFromMnemonicGeneratorWrapper
            generateButtonText={t.raw('privateKeyGeneration.fromSeed.seedGeneration.randomButtonText')}
            copyHoverText={common('copyHover')}
            copiedText={common('copied')}
          />
        </div>

        {/* Advantages Section */}
        <AnchorHeading
          as="h4"
          id="mnemonic-advantages"
          className="text-lg font-semibold mt-6 mb-3 text-blue-700"
        >
          {t('privateKeyGeneration.fromSeed.advantages.title')}
        </AnchorHeading>
        <div className="text-lg text-gray-700 mb-6 prose prose-blue max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {t.raw('privateKeyGeneration.fromSeed.advantages.description')}
          </ReactMarkdown>
        </div>
        
        {/* Mnemonic Validator Section */}
        <AnchorHeading
          as="h4"
          id="mnemonic-validator"
          className="text-lg font-semibold mt-6 mb-3 text-blue-700"
        >
          {t('privateKeyGeneration.fromSeed.mnemonicValidator.title')}
        </AnchorHeading>
        <div className="text-lg text-gray-700 mb-6 prose prose-blue max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {t.raw('privateKeyGeneration.fromSeed.mnemonicValidator.description')}
          </ReactMarkdown>
        </div>

        {/* Mnemonic Validator Component */}
        <div className="mt-6 mb-8 bg-gray-50 p-6 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
          <ClientMnemonicValidatorWrapper
            generateButtonText={t.raw('privateKeyGeneration.fromSeed.mnemonicValidator.randomButton')}
            copyHoverText={common('copyHover')}
            copiedText={common('copied')}
          />
        </div>

        {/* HD Wallets Section */}
        <AnchorHeading
          as="h4"
          id="hd-wallets"
          className="text-lg font-semibold mt-6 mb-3 text-blue-700"
        >
          {t('privateKeyGeneration.fromSeed.hdWallets.title')}
        </AnchorHeading>
        <div className="text-lg text-gray-700 mb-6 prose prose-blue max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {t.raw('privateKeyGeneration.fromSeed.hdWallets.description')}
          </ReactMarkdown>
        </div>

        {/* Links Section */}
        <div className="mt-6 mb-6">
          <h3 className="text-xl font-medium mt-6 mb-3 text-blue-700">
            {common('useful_links')}
          </h3>
          <ul className="space-y-2 pl-4">
            {/* Render links dynamically from the content */}
            {t.raw('privateKeyGeneration.fromSeed.links').map((link: {href: string, text: string}, index: number) => (
              <li key={index}>
                <ExternalLink href={link.href}>
                  {link.text}
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>

        <SectionDivider />

        {/* New section: Private to Public Key, Address */}
        <AnchorHeading
          as="h2"
          id="private-to-public"
          className="text-2xl font-semibold mt-8 mb-4 text-blue-800"
        >
          {t('privateToPublic.title')}
        </AnchorHeading>
        <div className="text-lg text-gray-700 mb-6 prose prose-blue max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {t.raw('privateToPublic.description')}
          </ReactMarkdown>
        </div>

        {/* Generator Point G section */}
        <AnchorHeading
          as="h3"
          id="generator-point"
          className="text-xl font-semibold mt-8 mb-3 text-blue-700"
        >
          {t('privateToPublic.generatorPoint.title')}
        </AnchorHeading>
        <div className="text-lg text-gray-700 mb-6 prose prose-blue max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {t.raw('privateToPublic.generatorPoint.description')}
          </ReactMarkdown>
        </div>

        {/* EC Point Calculator Component */}
        <div className="mt-6 mb-8 bg-gray-50 p-6 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
          <ClientECPointGeneratorWrapper
            generateButtonText={t.raw('privateKeyGeneration.fromEntropy.generateKeyButton')}
            copyHoverText={common('copyHover')}
            copiedText={common('copied')}
          />
        </div>

        {/* Links for Private to Public Key section */}
        <div className="mt-6 mb-6">
          <h3 className="text-xl font-medium mt-6 mb-3 text-blue-700">
            {common('useful_links')}
          </h3>
          <ul className="space-y-2 pl-4">
            {/* Render links dynamically from the content */}
            {Array.isArray(t.raw('privateToPublic.links')) && 
              t.raw('privateToPublic.links').map((link: {href: string, text: string}, index: number) => (
                <li key={index}>
                  <ExternalLink href={link.href}>
                    {link.text}
                  </ExternalLink>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </main>
  );
}
