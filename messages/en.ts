import { privateKeysContent } from './content/en/privateKeys';
import { keyManagementContent } from './content/en/keyManagement';
import { ui } from './ui';

export default {
  UI: ui.en,
  "Error": {
    "description": "<p>We've unfortunately encountered an error.</p><p>You can try to <retry>reload the page</retry> you were visiting.</p>",
    "title": "Something went wrong!"
  },
  "IndexPage": {
    "importance": "Securing your blockchain account is crucial because, unlike traditional financial systems, cryptocurrency transactions are irreversible and there's no central authority to recover lost or stolen funds. A security breach could mean permanent loss of your assets, as hacked accounts or compromised private keys cannot be restored by any bank or support service.",
    "description": "Cryptocurrency security is not as complex as it might seem. With proper knowledge and a few essential practices, anyone can safeguard their digital assets effectively. This portal provides straightforward guidance to help you understand and implement robust security measures for your crypto holdings.",
    "title": "Educational Portal on Cryptocurrency Wallet Security",
    "features": "Topics in detail",
    "privateKeysCardDescription": "Learn about the process of generating private keys in blockchain",
    "keyManagementCardDescription": "Explore methods for secure storage and management of private keys",
    "securityFeaturesCardDescription": "Learn about advanced methods for protecting cryptocurrency accounts",
    "walletMatrixCardDescription": "Compare different types of wallets and their functionality"
  },
  "LocaleLayout": {
    "title": "Cryptocurrency Wallet Security"
  },
  "LocaleSwitcher": {
    "label": "Change language",
    "locale": "{locale, select, en {🇺🇸 English} uk {🇺🇦 Ukrainian} other {Unknown}}"
  },
  "Navigation": {
    "home": "Home",
    "privateKeys": "Private Keys",
    "keyManagement": "Key Management",
    "securityFeatures": "Security Features",
    "walletMatrix": "Wallet Matrix",
    "portalName": "Educational Portal"
  },
  "NotFoundPage": {
    "description": "Please double-check the browser address bar or use the navigation to go to a known page.",
    "title": "Page not found"
  },
  "Footer": {
    "text": "Educational Portal on Cryptocurrency Wallet Security",
    "previousArticle": "Previous article",
    "nextArticle": "Next article"
  },
  "PrivateKeysPage": {
    "title": "Private Key Operations",
    "description": privateKeysContent.description,
    "entropySources": privateKeysContent.entropySources,
    "privateKeyGeneration": privateKeysContent.privateKeyGeneration,
    "privateToPublic": privateKeysContent.privateToPublic
  },
  "KeyManagementPage": {
    "title": "Key Management",
    "description": keyManagementContent.description,
    "keyHolder": keyManagementContent.keyHolder,
    "hardware": keyManagementContent.hardware,
    "software": keyManagementContent.software,
    "paper": keyManagementContent.paper,
    "memory": keyManagementContent.memory
  },
  "SecurityFeaturesPage": {
    "title": "Additional Security Features",
    "description": "Learn about advanced methods for protecting cryptocurrency accounts"
  },
  "WalletMatrixPage": {
    "title": "Wallet Feature Matrix",
    "description": "Compare different types of wallets and their functionality"
  },
  "Common": {
    "useful_links": "Useful Links",
    "learnMore": "Learn more",
    "copyHover": "Copy",
    "copied": "Copied",
    "entropyLevel": "Entropy level:",
    "moveMouseForEntropy": "Move your mouse in this rectangle to generate entropy!"
  }
}
