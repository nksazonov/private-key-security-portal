import { privateKeysContent } from './content/en/privateKeys';

export default {
  "Error": {
    "description": "<p>We've unfortunately encountered an error.</p><p>You can try to <retry>reload the page</retry> you were visiting.</p>",
    "title": "Something went wrong!"
  },
  "IndexPage": {
    "importance": "Securing your blockchain account is crucial because, unlike traditional financial systems, cryptocurrency transactions are irreversible and there's no central authority to recover lost or stolen funds. A security breach could mean permanent loss of your assets, as hacked accounts or compromised private keys cannot be restored by any bank or support service.",
    "description": "Cryptocurrency security is not as complex as it might seem. With proper knowledge and a few essential practices, anyone can safeguard their digital assets effectively. This portal provides straightforward guidance to help you understand and implement robust security measures for your crypto holdings.",
    "title": "Educational Portal on Cryptocurrency Wallet Security",
    "features": "Topics in detail",
    "PrivateKeysPage": {
      "description": "Learn about the process of generating private keys in blockchain"
    },
    "KeyManagementPage": {
      "description": "Explore methods for secure storage and management of private keys"
    },
    "SecurityFeaturesPage": {
      "description": "Learn about advanced methods for protecting cryptocurrency accounts"
    },
    "WalletMatrixPage": {
      "description": "Compare different types of wallets and their functionality"
    }
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
    "title": "Private Key Generation",
    // Import the description from the content file
    "description": privateKeysContent.description,
    // Import only the entropy sources section
    "entropySources": privateKeysContent.entropySources
  },
  "KeyManagementPage": {
    "title": "Key Management",
    "description": "This page will present information about methods for ensuring security when storing and processing private keys."
  },
  "SecurityFeaturesPage": {
    "title": "Additional Security Features",
    "description": "Learn about advanced methods for protecting cryptocurrency accounts"
  },
  "WalletMatrixPage": {
    "title": "Wallet Feature Matrix",
    "description": "Compare different types of wallets and their functionality"
  },
  "FeatureCards": {
    "learnMore": "Learn more"
  },
  "Common": {
    "useful_links": "Useful Links"
  }
}