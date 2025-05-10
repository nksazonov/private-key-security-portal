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
  }
};