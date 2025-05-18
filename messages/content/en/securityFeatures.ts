export const securityFeaturesContent = {
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
