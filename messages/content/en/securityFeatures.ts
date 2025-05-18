export const securityFeaturesContent = {
  authorizationScheme: {
    name: "Authorization Schemes",
    description: "The choice of authorization scheme directly impacts the security and reliability of a blockchain account. The traditional approach with a single key (single-sig) places all responsibility on the private key owner. If it's compromised, attackers instantly gain access to funds, and if the key is lost, the owner permanently loses access. The absence of convenient recovery mechanisms forces many to choose centralized solutions (exchanges, custodial wallets), which creates systemic risks. Therefore, in recent years, new account management schemes have emerged – such as multi-signature, threshold signatures based on multi-party computations, and social recovery – which aim to enhance security without significantly degrading user convenience.",
    singleSig: {
      name: "Single Signature",
      description: "Each account is controlled by a single private key used to sign transactions. For example, standard Ethereum wallets operate on this logic, where the key is generated based on a 12-word seed phrase. The security of such a scheme relies on the full responsibility of the user, meaning that key compromise instantly grants access to assets, and key loss means irreversible loss of funds. This creates a single point of failure, which is the main vulnerability.",
      features: "* Single point of access",
      useful_links: [
        {
          title: "Understanding Private Key Vulnerabilities",
          url: "https://ethereum.org/en/security/"
        },
        {
          title: "Best Practices for Key Security",
          url: "https://metamask.io/security/"
        }
      ]
    },
    multiSig: {
      name: "Multi-Signature",
      description: "A multi-signature scheme operates through a smart contract that requires multiple signatures to execute a transaction, typically in an M-of-N format: for example, for a transaction with three key owners, signatures from at least two of them are required. The security of multi-sig is ensured by the fact that no single key can execute a transaction independently – access to funds requires coordination of multiple participants, which eliminates the risk from losing or stealing a single key.",
      features: "* Distribution of responsibility\n* Ability to delegate signatures to third parties",
      useful_links: [
        {
          title: "Ledger Academy. What Is a Multisig Wallet?",
          url: "https://www.ledger.com/academy/what-is-a-multisig-wallet"
        },
        {
          title: "Krayon Digital. Multisig Wallets: Complete Guide 2024",
          url: "https://www.krayondigital.com/blog/multisig-wallets-complete-guide-2024"
        }
      ]
    },
    multiWeightedSig: {
      title: "Multiple Weighted Signature",
      description: "Try out this interactive example of a weighted multi-signature setup. Different signers can have different weights, and a transaction is executed only when the combined weight of the signers reaches or exceeds the threshold.",
      addAccount: "Add Account",
      enoughWeight: "Enough weight to sign",
      notEnoughWeight: "Not enough weight to sign",
      weightNote: "Adjust the threshold by moving the red line. Add signatures by checking boxes next to accounts.",
      threshold: "Threshold"
    },
    mpcTss: {
      name: "Multi-Party Computation and Threshold Signatures",
      description: "MPC/TSS (Multi-Party Computation/Threshold Signatures) are built on the idea of distributed generation and signing of transactions, where the private key doesn't exist in a complete form, but only as shares belonging to different participants. During a transaction, at least t of n participants compute the signature jointly, without revealing their shares to each other, which provides a standard ECDSA signature, visible in the blockchain as from a single key. The security of such a scheme lies in the fact that an attack requires compromising multiple participants, and an external observer cannot identify the authorization peculiarities, as the signature appears normal.",
      features: "* Distributed generation and signing of transactions\n* No single point of failure\n* Invisibility to external observers",
      useful_links: [
        {
          title: "Screen Protocol. MPC vs Multi-sig — Misconceptions and Valid Arguments",
          url: "https://screenprotocol.medium.com/mpc-vs-multi-sig-misconceptions-and-valid-arguments-95fc92ecf842"
        }
      ]
    },
    socialRecovery: {
      name: "Social Recovery",
      description: "Social recovery works in such a way that a user can recover access to their account through trusted individuals (guardians) who confirm the replacement of lost authorization with a new one. The main control over the account remains with the user, and under normal conditions, they sign transactions independently. Security lies in the fact that guardians do not have permanent access to assets, but only together, in case of loss of the main key, can approve a change to a new one. This eliminates a single point of failure and allows for flexible responses to access loss incidents.",
      features: "* Recovery of access through trusted individuals\n* Reduced risk of asset loss",
      useful_links: [
        {
          title: "Vault12. Expanding on Vitalik Buterin's Vision for Social Recovery Security",
          url: "https://vault12.com/blog/expanding-on-vitalik-buterin-vision-for-social-recovery-security/"
        },
        {
          title: "Safe Global. Introducing Social Recovery Module",
          url: "https://safe.global/blog/introducing-candides-social-recovery"
        },
        {
          title: "Argent. What Is Social Recovery?",
          url: "https://www.argent.xyz/learn/what-is-social-recovery"
        }
      ]
    }
  },
  accountType: {
    name: "Account Type",
    description: "In the Ethereum network, there are different types of accounts, and proper understanding of them is crucial for the security of storing and managing digital assets. Incorrect choice or use of an account can lead to loss of funds or their compromise, as attackers actively exploit weaknesses in access control mechanisms.",
    eoa: {
      name: "Externally Owned Account (EOA)",
      description: "EOA is the basic account type in Ethereum, controlled by a key pair (private and public) but does not contain code on the blockchain. Transactions are sent directly from EOA and signed with a private key, allowing the initiation of asset transfers or smart contract calls.",
      features: "* Access control via private key\n* \"Security in simplicity\" (does not support programmable logic)",
      advantages: "* Simple and straightforward to use\n* Lower transaction fees due to simpler execution\n* Native to the blockchain - supported by all wallets and dApps",
      disadvantages: "* No additional security features beyond key possession\n* Limited functionality - cannot automate transactions or set policies\n* Single point of failure - compromise of key means complete account takeover",
      code: "// No smart contract code, just a private key\n// Address: 0xbAA3384a0681E701F769DfaE81f1fAc06e1f9234\n0xa24df31f43ca025df6f9c07f68155b4594a37381ed196a94cee14fb921c3a738",
      useful_links: [
        {
          title: "Understanding Ethereum Accounts",
          url: "https://ethereum.org/en/developers/docs/accounts/"
        },
        {
          title: "Key Management for Externally Owned Accounts",
          url: "https://docs.metamask.io/wallet/reference/best-practices/"
        }
      ]
    },
    smartContract: {
      name: "Contract Account",
      description: "This is an account in the form of a smart contract with program logic, controlled not by a single key, but by its code, which can, for example, require multi-signature for transactions. Smart wallets do not initiate transactions on their own — they need a call from an EOA.",
      features: "* Control over execution through specific implementation\n* Programmable access control\n* Social recovery - key replacement through guardians in case of access loss\n* Limits and policies — limits, address filters, transaction blocking\n* Possibility of sponsorship or payment of transactions with third-party tokens",
      advantages: "* Enhanced security through programmable business logic\n* More flexible and customizable than EOA",
      disadvantages: "* Higher complexity increases potential for security vulnerabilities\n* Higher gas costs due to more complex execution\n* Potential for code errors that could lock funds permanently\n* No standardization whatsoever",
      code: "// Not standardized, proprietary Solidity code\ncontract NonStandardizedWallet {\n  // ... logic\n}",
      useful_links: [
        {
          title: "What Is Gnosis Safe: It's OK If You Lose a Private Key",
          url: "https://phemex.com/academy/what-is-gnosis-safe"
        },
        {
          title: "Why the Future of Ethereum Is Smart Accounts",
          url: "https://safe.mirror.xyz/vZHodiI1NLJbz4fd0vuil0hyLHNGCBH8oLyMzGTb4sc"
        }
      ]
    },
    erc4337: {
      name: "Abstract Account (ERC-4337)",
      description: "This is a new model where smart wallets can initiate transactions without an EOA. ERC 4337 introduces the concept of a user operation (UserOperation) — special objects that contain multiple blockchain interactions that users can send to a general distributed list of such objects. Special bundler nodes are constantly listening to and processing this list, forming transactions with user operations and sending them to a single common EntryPoint contract, which in turn calls the smart contract account that directly executes user operations interacting with other blockchain contracts.",
      features: "* Control over execution through standardized and verified implementation\n* Programmable access control\n* Social recovery - key replacement through guardians in case of access loss\n* Limits and policies — limits, address filters, transaction blocking\n* Possibility of sponsorship or payment of transactions with third-party tokens",
      advantages: "* Account abstraction allows for much better UX\n* More flexible and customizable than EOA\n* Support for transaction batching and sponsorship\n* Standardized implementation reduces security risks",
      disadvantages: "* Requires specialized infrastructure (bundlers)\n* More complex architecture to understand and debug\n* Limited adoption compared to traditional accounts",
      code: "// ERC-4337 compliant smart contract wallet\ncontract ERC4337Account is IAccount {\n    // ... logic\n}",
      useful_links: [
        {
          title: "EIP-4337: Account Abstraction via Entry Point Contract specification",
          url: "https://eips.ethereum.org/EIPS/eip-4337"
        },
        {
          title: "Account Abstraction: The Ultimate Guide to ERC-4337",
          url: "https://www.alchemy.com/blog/account-abstraction"
        },
        {
          title: "ERC-4337: Ethereum Account Abstraction Explained",
          url: "https://consensys.io/blog/account-abstraction-erc-4337-guide"
        }
      ]
    }
  }
};
