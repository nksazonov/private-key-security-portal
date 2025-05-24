import { privateKeysContent } from './content/en/privateKeys';
import { keyManagementContent } from './content/en/keyManagement';
import { securityFeaturesContent } from './content/en/securityFeatures';
import { walletMatrixContent } from './content/en/walletMatrix';
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
    "networkConnectivity": keyManagementContent.networkConnectivity,
    "custodyModel": keyManagementContent.custodyModel,
  },
  "SecurityFeaturesPage": {
    "title": "Security Through Additional Functionality",
    "description": "In modern blockchain systems, mechanisms that provide an additional layer of security through specialized cryptocurrency wallets are becoming increasingly popular. This approach involves creating flexible and programmable rules for access, fund usage control, and authorization procedures that go beyond basic key protection.",
    "accountType": securityFeaturesContent.accountType,
    "authorizationScheme": securityFeaturesContent.authorizationScheme
  },
  "WalletMatrixPage": {
    "title": "Wallet Feature Matrix",
    "description": "Previously, aspects of blockchain account protection through private key protection and through add-ons in the form of additional functionality were defined. Combining these two concepts, we get a cryptographic wallet that provides security to a cryptographic account thanks to both of these aspects. In modern blockchain ecosystems, different types of wallets demonstrate significant differences in security and ease of use. Proper classification of blockchain accounts allows taking these differences into account when choosing solutions for protection and improving user experience. Key storage security, access recovery capabilities, and custody model directly affect asset loss risks and system usage complexity. To systematize approaches to account protection, five independent (orthogonal) classification axes have been identified:",
    "criteria": walletMatrixContent.criteria,
    "modal": {
      "popularImplementations": "Popular Implementations",
      "usefulLinks": "Useful Links",
      "noImplementations": "No implementations listed",
      "noLinks": "No useful links available"
    }
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
