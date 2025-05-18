export const keyManagementContent = {
  description: `In modern blockchain account protection practices, two main security strategies have emerged. The first strategy involves directly protecting the user's private key - taking measures that prevent unauthorized access to the key itself or its loss. The second strategy involves applying an additional layer of security on top of the basic account level, particularly through specialized mechanisms of cryptocurrency wallets or smart contracts.

  Loss or compromise of a private key inevitably leads to loss of access to assets, making reliable key storage one of the central issues in cryptocurrency system security. Users must ensure not only protection of the key from unauthorized access but also guarantee the possibility of its recovery in case of accidental loss or damage to the storage medium.`,
  keyHolder: {
    name: "Key Holder",
    description: "One aspect of preserving a private key from loss or unauthorized access is an effective and secure key holder.",
    hardware: {
      name: "Hardware Device",
      description: "A physical device specifically designed for storing private keys, which isolates them in a secure hardware environment (for example, in a Secure Element) and does not allow them to be exported.",
      advantages: `**Advantages:**

* High level of security due to hardware isolation.
* The key never leaves the device, making it impossible to steal.`,
      disadvantages: `**Disadvantages:**

* Inconvenient to use: to sign transactions, the user needs to connect the device and physically press buttons.
* Need to use special software tools to work with the device.
* High cost of hardware.
* Possibility of loss or physical damage to the device.`,
      examples: [
        "Ledger Nano S/X/S Plus",
        "Trezor Model One/T/Safe",
        "Keystone Pro",
        "GridPlus Lattice1"
      ],
      useful_links: [
        {
          title: "Hardware Wallet Security Explained",
          url: "https://www.ledger.com/academy/security/hack-of-hardware-wallets"
        },
        {
          title: "How Hardware Wallets Work",
          url: "https://wiki.trezor.io/Hardware_wallet"
        },
        {
          title: "Hardware Wallet Comparison",
          url: "https://www.buybitcoinworldwide.com/hardware-wallets/"
        }
      ]
    },
    software: {
      name: "Software Wallet",
      description: "A software environment or application (for example, a mobile or desktop wallet) that stores the private key in the memory of a general-purpose device.",
      advantages: `**Advantages:**

* Ease of use: the user can easily sign a transaction without leaving the wallet.`,
      disadvantages: `**Disadvantages:**

* Risk of key loss or compromise, since the key is in the general memory of the device, which is accessible to viruses.`,
      examples: [
        "MetaMask (browser extension)",
        "Trust Wallet (mobile)",
        "Exodus (desktop)",
        "Rainbow Wallet (mobile)"
      ],
      useful_links: [
        {
          title: "Securing Your Software Wallet",
          url: "https://metamask.zendesk.com/hc/en-us/articles/360015489591-Basic-Safety-Tips"
        },
        {
          title: "Best Practices for Software Wallets",
          url: "https://ethereum.org/en/wallets/find-wallet/"
        },
        {
          title: "Types of Software Wallets",
          url: "https://blog.trezor.io/hot-wallets-vs-cold-wallets-c3ae853ed08b"
        }
      ]
    },
    paper: {
      name: "Paper Wallet",
      description: "A physical paper or medium on which a private key or seed phrase is printed or written. It is completely isolated from the network and effectively serves as a material backup medium for the key, with risks related to physical security (loss, damage) and lack of a backup copy.",
      advantages: `**Advantages:**

* High level of security, as the key always remains on paper.`,
      disadvantages: `**Disadvantages:**

* Higher risk of damage or loss.
* Inconvenience of use: to sign transactions, the user needs to physically scan a QR code or enter the key manually.`,
      examples: [
        "Bitcoin Paper Wallet",
        "Ethereum Paper Wallet",
        "Safe Seed (metal backup)",
        "Cryptosteel/Billfodl (metal storage)"
      ],
      useful_links: [
        {
          title: "How to Create a Paper Wallet",
          url: "https://en.bitcoin.it/wiki/Paper_wallet"
        },
        {
          title: "Paper Wallet Security Considerations",
          url: "https://www.coindesk.com/learn/bitcoin-101-how-to-store-your-bitcoins/"
        },
        {
          title: "Metal Seed Storage Options",
          url: "https://jlopp.github.io/metal-bitcoin-storage-reviews/"
        }
      ]
    },
    memory: {
      name: "Memory (Mnemonic carrier)",
      description: "A private key stored in human memory in the form of a mnemonic or password phrase. Due to drawbacks, this method is rarely used in responsible scenarios today, giving way to other key carriers.",
      advantages: `**Advantages:**

* High level of security, as the key always remains in human memory.`,
      disadvantages: `**Disadvantages:**

* Very high unreliability due to the possibility of forgetting
* Inconvenience of use: to sign transactions, the user needs to enter the mnemonic phrase manually`,
      useful_links: [
        {
          title: "Mnemonic Phrase Security",
          url: "https://en.bitcoin.it/wiki/Mnemonic_phrase"
        },
        {
          title: "Memory Techniques for Seed Phrases",
          url: "https://blog.trezor.io/seed-phrase-memorization-techniques-2b56fdf03371"
        },
        {
          title: "Risks of Brain Wallets",
          url: "https://www.coindesk.com/tech/2021/01/13/the-problem-with-bragging-about-keeping-bitcoin-in-your-head/"
        }
      ]
    }
  },
  networkConnectivity: {
    name: "Network Connectivity",
    description: "A possible attack vector for private keys is the Internet, as the key carrier itself may be infected with malicious software that can gain access to the key and transfer it to third parties. Therefore, network connectivity describes the degree of connection of the carrier to the Internet.",
    chooseConnectivity: "Choose network connectivity for your private key:",
    advantages: "Advantages",
    disadvantages: "Disadvantages",
    safeDeposit: "Deep-cold connectivity",
    paperHardware: "Cold connectivity",
    yourPC: "Hot connectivity",
    internet: "Internet",
    useful_links: [
      {
        title: "Cold Storage for Cryptocurrencies Explained",
        url: "https://river.com/learn/terms/c/cold-storage-crypto/"
      },
      {
        title: "Hot Wallet vs. Cold Wallet: Understanding the Differences",
        url: "https://www.coinbase.com/learn/crypto-basics/hot-wallet-vs-cold-wallet"
      },
      {
        title: "Securing Your Crypto: Hot vs Cold Wallet Guide",
        url: "https://blog.trezor.io/hot-wallets-vs-cold-wallets-c3ae853ed08b"
      }
    ],
    hot: {
      name: "Hot Storage",
      description: "Private keys are stored and used in an environment with a constant network connection (online). An example is a wallet on a computer or smartphone with internet access.",
      advantages: "**Advantages:**\n\n* Instant access to funds and transaction convenience.",
      disadvantages: "**Disadvantages:**\n\n* Significantly increases the risk of unauthorized access through online threats.\n* If such a connected device or application is compromised, the private key can be stolen by attackers."
    },
    cold: {
      name: "Cold Storage",
      description: "The key is stored offline, without a direct connection to the internet. Transactions in this mode are signed in an isolated environment (on a separate device or computer that has no network access), and then transmitted to the online network for confirmation.",
      advantages: "**Advantages:**\n\n* Significantly increases security as the key is physically isolated from network attacks.\n* Even if the transaction is intercepted online, an attacker cannot access the key itself.",
      disadvantages: "**Disadvantages:**\n\n* Access to assets becomes less immediate and requires additional actions."
    },
    deepCold: {
      name: "Deep Cold Storage",
      description: "The key is stored offline with additional barriers to access. This involves maximally isolated long-term storage, where accessing the key is deliberately difficult and requires significant time. For example, the private key may be placed in a bank vault or other secure repository.",
      advantages: "**Advantages:**\n\n* Minimizes the likelihood of compromise as the key is almost inaccessible to network attacks. \n* Provides the highest level of security in the physical world.",
      disadvantages: "**Disadvantages:**\n\n* Impractical for frequent use, as access to funds can take hours or days."
    }
  },
  custodyModel: {
    name: "Custody Model",
    description: "The custody model determines who owns and manages the private keys of a blockchain account, thereby affecting risk distribution and user experience. On one hand, fully centralized custody by a third party can simplify interaction for the user, but requires trust in that party and creates a single point of failure. On the other hand, full self-custody eliminates the need to trust someone else, but places the entire burden of security responsibility on the user. Accordingly, the choice of custody model significantly impacts the balance between security and convenience.",
    chooseCustody: "Choose a custody model for your private keys:",
    self: {
      name: "Self-Custody",
      description: "The self-custody model gives the user complete control over private keys without involving third parties. This approach solves the problem of trust and confidentiality, providing autonomy and cryptographic security.",
      advantages: "**Advantages:**\n\n* Complete control over your private keys (full cryptographic security)\n* No need to trust third parties (enhanced privacy and confidentiality)",
      disadvantages: "**Disadvantages:**\n\n* Responsibility for key security falls entirely on the user\n* Requires technical skills and discipline\n* Irreversible loss of assets if keys are lost"
    },
    thirdParty: {
      name: "Custodial Model",
      description: "The custodial model involves managing the user's keys by a third-party service (for example, a cryptocurrency exchange or custodian) that creates and stores private keys instead of the user.",
      advantages: "**Advantages:**\n\n* Ease of use and simplified experience\n* Password recovery option usually available",
      disadvantages: "**Disadvantages:**\n\n* Complete dependence on third-party security\n* Risk of asset loss if provider goes bankrupt (e.g., FTX incident)"
    },
    combined: {
      name: "Shared Custody",
      description: "The shared model is a compromise solution that distributes control over keys between the user and service provider using cryptographic threshold schemes (MPC and TSS).\n\n_Social providers_ form a separate subclass of the shared model, in which the management of encrypted shard fragments of the private key is integrated with popular authentication services - Google, Apple, Discord, WhatsApp, etc. After passing OAuth login, the backend of such a provider (for example, Privy, Web3Auth, Magic) sends the user an encrypted shard, which, together with the local shard backup, is assembled into a complete key directly in the browser or mobile application.",
      advantages: "**Advantages:**\n\n* Eliminates single point of failure (requires both parties to authorize transactions)\n* Simplifies access recovery (biometrics, social logins)",
      disadvantages: "**Disadvantages:**\n\n* Partial dependence on service reliability\n* Potential privacy risks (service sees operations)"
    },
    useful_links: [
      {
        title: "Understanding Wallet Custody Models",
        url: "https://help.coinbase.com/en/wallet/managing-account/self-custody-wallet"
      },
      {
        title: "Pros and Cons of Custodial vs Non-Custodial Wallets",
        url: "https://www.ledger.com/academy/custodial-vs-non-custodial-wallets"
      },
      {
        title: "MPC Wallets: Shared Security for Digital Assets",
        url: "https://medium.com/coinmonks/understanding-mpc-wallets-multiparty-computation-explained-52cee1957269"
      }
    ]
  }
};
