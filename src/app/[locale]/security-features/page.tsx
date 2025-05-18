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

export default function SecurityFeaturesPage({ params }: { params: { locale: Locale } }) {
  const t = useTranslations('SecurityFeaturesPage');

  // Sample code snippets for each account type
  const eoaCode = `// No smart contract code, just a private key
// Address: 0x742d35Cc6634C0532925a3b844Bc454e4438f44e
// Private key: 0x123...abc (stored only client-side)

// Example usage: sign a transaction via Web3.js
const tx = await web3.eth.accounts.signTransaction({
  to: '0x...',
  value: '1000000000000000000', // 1 ETH
  gas: 21000
}, privateKey);`;

  const smartContractCode = `// Smart Contract Wallet Example
contract SmartContractWallet {
    address public owner;
    address[] public guardians;
    uint256 public threshold;

    // Additional security features
    uint256 public dailyLimit;
    mapping(address => bool) public whitelisted;

    function executeTransaction(address to, uint256 value, bytes calldata data, bytes[] calldata signatures) external {
        // Verify multiple signatures
        // Execute if threshold met
    }

    function recoverWallet(address newOwner) external {
        // Social recovery logic
    }
}`;

  const erc4337Code = `// ERC-4337 Account Example
contract ERC4337Account is IAccount {
    address public owner;
    IEntryPoint private immutable _entryPoint;

    function validateUserOp(UserOperation calldata userOp, bytes32 userOpHash, uint256 missingAccountFunds)
        external returns (uint256 validationData) {
        // Verify signature or other authentication method
        // Check limits and restrictions
        // Return validation status
    }

    function execute(address target, uint256 value, bytes calldata data) external {
        // Execute transaction after validation
    }
}`;

  // Account types to render
  const accountTypes = ['eoa', 'smartContract', 'erc4337'];
  const codeSnippets = {
    'eoa': eoaCode,
    'smartContract': smartContractCode,
    'erc4337': erc4337Code
  };
  
  const ui = useTranslations('UI.labels');

  return (
    <main className="py-8 w-full">
      <div className="bg-white p-8 rounded-lg">
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
        {accountTypes.map((type, index) => (
          <div key={type} className="mb-12">
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

            {/* Features, Code, Advantages, Disadvantages in a 2x2 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Features - As a list with black text */}
              <div>
                <h4 className="text-lg font-semibold text-blue-600 mb-2">Features</h4>
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

              {/* Code Example with Implementation Insight label */}
              <div>
                <CodeBlock 
                  code={codeSnippets[type as keyof typeof codeSnippets]} 
                  label={ui('implementationInsight')}
                />
              </div>

              {/* Advantages - Using AdvantagesList component */}
              <div>
                <AdvantagesList content={`**Advantages:**\n\n${t.raw(`accountType.${type}.advantages`) || ''}`.replace(/^\*\*Advantages:\*\*\n\n\*\*Advantages:\*\*\n\n/g, '**Advantages:**\n\n')} />
              </div>

              {/* Disadvantages - Using DisadvantagesList component */}
              <div>
                <DisadvantagesList content={`**Disadvantages:**\n\n${t.raw(`accountType.${type}.disadvantages`) || ''}`.replace(/^\*\*Disadvantages:\*\*\n\n\*\*Disadvantages:\*\*\n\n/g, '**Disadvantages:**\n\n')} />
              </div>
            </div>

            {/* Add divider between account types except after the last one */}
            {index < accountTypes.length - 1 && (
              <SectionDivider />
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
