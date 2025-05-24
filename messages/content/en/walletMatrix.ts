export const walletMatrixContent = {
  criteria: {
    keyHolder: {
      title: "Key Holder",
      description: "Physical medium or environment where the private cryptographic key is stored",
      types: {
        hardware: {
          title: "Hardware Wallet",
          description: "A hardware carrier is a **physical device** specifically designed for storing private keys in a secure hardware environment, such as a Secure Element. Such a carrier isolates the key and does not allow it to be exported, making theft impossible even in the presence of malicious software on the main computer.\n\nAll cryptographic operations — transaction signing, key generation — are performed inside the device without exposing the key to external applications. This provides **maximum security** for storing cryptocurrency assets, especially for long-term investments or large amounts.",
          implementations: [
            {
              title: "Ledger Nano S/X/S Plus",
              url: "https://www.ledger.com/"
            },
            {
              title: "Trezor One/Model T",
              url: "https://trezor.io/"
            },
            {
              title: "KeepKey",
              url: "https://keepkey.com/"
            }
          ],
          useful_links: [
            {
              title: "Hardware Wallet Security",
              url: "https://www.ledger.com/academy/hardwarewallet/best-practices-when-using-a-hardware-wallet"
            },
            {
              title: "How Hardware Wallets Work",
              url: "https://wiki.trezor.io/Hardware_wallet"
            }
          ]
        },
        software: {
          title: "Software Wallet",
          description: "A software carrier is a **software environment or application** (mobile or desktop wallet) that stores the private key in the memory of a general-purpose device. This provides the user with **easy access to the key** and maximum convenience for daily transactions.\n\nHowever, this approach means that the key is on a device connected to the internet, and therefore potentially **vulnerable to remote attacks**. A software carrier lacks hardware isolation, so its security level largely depends on the security of the device's operating system and user caution.",
          implementations: [
            {
              title: "MetaMask",
              url: "https://metamask.io/"
            },
            {
              title: "Trust Wallet",
              url: "https://trustwallet.com/"
            },
            {
              title: "Phantom",
              url: "https://phantom.app/"
            },
            {
              title: "Rainbow",
              url: "https://rainbow.me/"
            }
          ],
          useful_links: [
            {
              title: "What is a Software Wallet?",
              url: "https://www.ledger.com/academy/what-is-a-software-wallet"
            },
            {
              title: "How to Choose a Software Wallet",
              url: "https://ethereum.org/en/wallets/find-wallet/"
            }
          ]
        },
        paper: {
          title: "Paper Wallet",
          description: "A paper carrier is a **physical medium** on which the private key or seed phrase is written or printed. Such a carrier **completely isolates the key from digital devices**, making it immune to hacker attacks and malicious software.\n\nHowever, paper wallets require **careful physical protection** from destruction, loss, or unauthorized access. They are suitable for long-term storage of large amounts but **inconvenient for frequent transactions** due to the need to import the key each time for use.",
          implementations: [
            {
              title: "BitAddress",
              url: "https://www.bitaddress.org/"
            },
            {
              title: "MyEtherWallet Paper Wallet",
              url: "https://www.myetherwallet.com/"
            }
          ],
          useful_links: [
            {
              title: "What is a Paper Wallet?",
              url: "https://www.gemini.com/cryptopedia/paper-wallet-crypto-cold-storage"
            },
            {
              title: "How to Create a Paper Wallet",
              url: "https://www.investopedia.com/terms/p/paper-wallet.asp"
            },
            {
              title: "Paper Wallet Security Considerations",
              url: "https://bitcoin.org/en/secure-your-wallet"
            }
          ]
        },
        brain: {
          title: "Brain Wallet",
          description: "A brain carrier is a method of **storing the private key or seed phrase in human memory**. This approach provides **absolute physical security** since the key exists only in the owner's mind and cannot be stolen by digital means.\n\nHowever, brain wallets carry **extremely high risks** associated with the possibility of forgetting the key or making errors when reproducing it. They require the user to have **excellent memory** and are generally **not recommended** for storing significant amounts due to the risk of irreversible loss.",
          implementations: [],
          useful_links: [
            {
              title: "Why Brain Wallets Are Insecure",
              url: "https://en.bitcoin.it/wiki/Brainwallet"
            },
            {
              title: "Memory Techniques for Seed Phrases",
              url: "https://blog.lopp.net/metal-bitcoin-seed-storage-stress-test-round-iii/"
            }
          ]
        }
      }
    },
    networkConnectivity: {
      title: "Network Connectivity",
      description: "Degree of connection between the key holder and network infrastructure during operation",
      types: {
        hot: {
          title: "Hot Wallet",
          description: "A hot state means **constant connection to the internet** and readiness for immediate transactions. This provides **maximum convenience** for daily use — users can instantly send and receive cryptocurrencies, interact with decentralized applications, and monitor their balance in real-time.\n\nHowever, constant network connection creates **security risks**. Hot wallets are vulnerable to remote attacks, phishing, and malicious software. They are suitable for small amounts intended for frequent transactions but **not recommended** for storing large amounts or long-term savings.",
          implementations: [
            {
              title: "Binance",
              url: "https://www.binance.com/"
            },
            {
              title: "Coinbase",
              url: "https://www.coinbase.com/"
            },
            {
              title: "Kraken",
              url: "https://www.kraken.com/"
            }
          ],
          useful_links: [
            {
              title: "Hot Wallet Security Tips",
              url: "https://academy.binance.com/en/articles/how-to-secure-your-cryptocurrency"
            },
            {
              title: "Hot vs Cold Wallet Comparison",
              url: "https://www.investopedia.com/hot-wallet-vs-cold-wallet-7098461"
            }
          ]
        },
        cold: {
          title: "Cold Wallet",
          description: "A cold state means the key holder is **disconnected from the network most of the time** and connects only when necessary for transactions. This approach **significantly reduces attack vectors** while maintaining the ability to perform operations when needed.\n\nCold wallets require **manual connection** for each transaction, which reduces convenience but **significantly increases security**. They are suitable for storing medium and large amounts, providing a reasonable balance between security and usability.",
          implementations: [
            {
              title: "Ledger Nano S/X/S Plus",
              url: "https://shop.ledger.com/pages/hardware-wallet"
            },
            {
              title: "Trezor Safe 5 / Safe 3 / Model One",
              url: "https://trezor.io/compare"
            }
          ],
          useful_links: [
            {
              title: "What is Cold Storage?",
              url: "https://www.investopedia.com/terms/c/cold-storage.asp"
            },
            {
              title: "Cold Storage Wallets",
              url: "https://blog.chainport.io/cold-storage-wallets"
            },
            {
              title: "Cold Storage Best Practices",
              url: "https://bitcoin.org/en/secure-your-wallet"
            },
            {
              title: "Setting Up Cold Storage",
              url: "https://github.com/BlockchainCommons/SmartCustody"
            }
          ]
        },
        deepCold: {
          title: "Deep Cold Storage",
          description: "Deep cold state means **complete isolation from any networks and digital devices**. The key is stored on physical media (paper, metal plates) or in memory and **never comes into contact with connected devices**.\n\nThis approach provides **maximum security** against all types of digital attacks but makes transactions **extremely inconvenient**. Deep cold storage is suitable only for long-term storage of large amounts that do not require frequent access.",
          implementations: [],
          useful_links: [
            {
              title: "Deep Cold Storage Detailed Guide",
              url: "https://blog.keyst.one/deep-cold-storage-how-beginners-can-swim-in-the-deep-end-430af49d03bd"
            },
            {
              title: "Deep Cold Storage Guide",
              url: "https://blog.lopp.net/metal-bitcoin-seed-storage-stress-test/"
            },
            {
              title: "Physical Security for Crypto",
              url: "https://bitcoin.org/en/secure-your-wallet"
            }
          ]
        }
      }
    },
    custodyModel: {
      title: "Custody Model",
      description: "Method of distributing responsibility and control over private key storage and usage",
      types: {
        custodial: {
          title: "Custodial",
          description: "In the custodial model, **private keys are stored and managed by a third party** (exchange, service provider), and the user does not have direct access to them. This provides **maximum convenience** — users don't need to worry about key security and can easily recover access through traditional methods.\n\nHowever, this approach means **losing control** over assets and **depending on the service provider's reliability**. The user cannot guarantee the security of their funds and may lose access if the service is compromised or ceases operations.",
          implementations: [
            {
              title: "Coinbase",
              url: "https://www.coinbase.com/"
            },
            {
              title: "Binance",
              url: "https://www.binance.com/"
            }
          ],
          useful_links: [
            {
              title: "Custodial vs Non-Custodial Wallets",
              url: "https://academy.binance.com/en/articles/custodial-vs-non-custodial-wallets-what-s-the-difference"
            }
          ]
        },
        selfCustody: {
          title: "Self-Custody",
          description: "In the self-custody model, **the user independently controls all private keys** and has full responsibility for asset security. This provides **complete control** over funds and independence from third parties.\n\nHowever, self-custody requires **high responsibility and technical knowledge** from the user. Loss or compromise of keys means irreversible loss of assets, so this model demands careful security planning and backup storage.",
          implementations: [
            {
              title: "MetaMask",
              url: "https://metamask.io/"
            },
            {
              title: "Ledger",
              url: "https://www.ledger.com/"
            }
          ],
          useful_links: [
            {
              title: "Self-Custody Best Practices",
              url: "https://bitcoin.org/en/secure-your-wallet"
            },
            {
              title: "Key Management for Self-Custody",
              url: "https://github.com/BlockchainCommons/SmartCustody"
            }
          ]
        },
        sharedCustody: {
          title: "Shared Custody",
          description: "Shared custody **distributes control among multiple parties**, each holding part of the key or authorization. This can be multisig schemes, threshold signatures, or institutional custody solutions where multiple parties must agree on transactions.\n\nThis approach **combines security and convenience** — no single party can control funds alone, but legitimate transactions remain possible through cooperation. It's suitable for organizations, families, or users who want additional security without full responsibility.",
          implementations: [
            {
              title: "Fireblocks",
              url: "https://www.fireblocks.com/platforms/treasury-management/"
            },
            {
              title: "Argent",
              url: "https://www.argent.xyz/"
            },
            {
              title: "BitGo",
              url: "https://www.bitgo.com/"
            },
            {
              title: "Casa",
              url: "https://keys.casa/"
            }
          ],
          useful_links: [
            {
              title: "What is Shared Custody",
              url: "https://web3.okx.com/learn/what-is-crypto-custody"
            }
          ]
        }
      }
    },
    accountType: {
      title: "Account Type",
      description: "Technical implementation type of the blockchain account and its capabilities",
      types: {
        eoa: {
          title: "EOA (Externally Owned Account)",
          description: "**Standard account type** in Ethereum and most blockchains, directly controlled by a private key. EOA provides **simple and direct** interaction with the blockchain — the user signs transactions with their private key, and the account can send transactions and hold assets.\n\nEOA accounts have **limited functionality** — they can only perform basic operations like transferring tokens and interacting with smart contracts. They do not support **advanced features** like transaction automation, access recovery, or custom authorization logic.",
          implementations: [
            {
              title: "MetaMask",
              url: "https://metamask.io/"
            },
            {
              title: "Trust Wallet",
              url: "https://trustwallet.com/"
            }
          ],
          useful_links: [
            {
              title: "Understanding EOA Accounts",
              url: "https://ethereum.org/en/developers/docs/accounts/"
            }
          ]
        },
        smartContract: {
          title: "Smart Contract Wallet",
          description: "Account **implemented as a smart contract** with programmable logic. Unlike EOA, such accounts can have **custom rules** for transaction authorization, access recovery, spending limits, and other advanced features.\n\nSmart contract wallets provide **much greater flexibility** and security options but require **more complex setup** and **higher transaction costs** due to the need to execute contract code for each operation.",
          implementations: [
            {
              title: "Gnosis Safe",
              url: "https://safe.global/"
            },
            {
              title: "Argent",
              url: "https://www.argent.xyz/"
            }
          ],
          useful_links: [
            {
              title: "Future of Ethereum - Smart Accounts",
              url: "https://safe.mirror.xyz/vZHodiI1NLJbz4fd0vuil0hyLHNGCBH8oLyMzGTb4sc"
            }
          ]
        },
        erc4337: {
          title: "Account Abstraction (ERC-4337)",
          description: "**New account type** that implements account abstraction, allowing users to interact with the blockchain **without owning ETH for gas** and with **flexible authorization rules**. Such accounts can use any tokens for transaction fees and support **social recovery, multisig, and other advanced features**.\n\nERC-4337 **combines the benefits** of EOA (simplicity) and smart contract wallets (flexibility) while providing **better user experience** through features like gasless transactions and simplified onboarding.",
          implementations: [
            {
              title: "Biconomy",
              url: "https://www.biconomy.io/"
            },
            {
              title: "Stackup",
              url: "https://www.stackup.sh/"
            }
          ],
          useful_links: [
            {
              title: "EIP-4337: Account Abstraction",
              url: "https://eips.ethereum.org/EIPS/eip-4337"
            },
            {
              title: "Account Abstraction Explained",
              url: "https://ethereum.org/en/roadmap/account-abstraction/"
            }
          ]
        }
      }
    },
    authorizationScheme: {
      title: "Authorization Scheme",
      description: "Method and algorithm for confirming the right to perform operations with the account",
      types: {
        singleSig: {
          title: "Single Signature",
          description: "**Classic authorization scheme** where access to the account requires only one digital signature from the owner. This is the **simplest and most common** approach — the user signs transactions with their private key, and the network accepts this as sufficient proof of authorization.\n\nSingle signature provides **maximum convenience** for daily use but creates **single point of failure** — if the key is lost or compromised, access to the account is irreversibly lost.",
          implementations: [
            {
              title: "Standard EOA Accounts",
              url: "https://ethereum.org/en/developers/docs/accounts/"
            }
          ],
          useful_links: [
            {
              title: "Single Signature Security",
              url: "https://bitcoin.org/en/secure-your-wallet"
            }
          ]
        },
        multiSig: {
          title: "Multi-Signature",
          description: "Authorization scheme that **requires multiple independent signatures** to confirm transactions. For example, in a \"2 of 3\" scheme, any 2 out of 3 key holders can authorize a transaction. This **significantly increases security** since compromise of one key doesn't lead to asset loss.\n\nMultisig provides **excellent balance** between security and usability — it protects against single key loss while allowing legitimate operations through cooperation of multiple parties.",
          implementations: [
            {
              title: "Gnosis Safe",
              url: "https://safe.global/"
            },
            {
              title: "BitGo",
              url: "https://www.bitgo.com/"
            }
          ],
          useful_links: [
            {
              title: "What is a Multisig Wallet?",
              url: "https://www.ledger.com/academy/what-is-a-multisig-wallet"
            },
            {
              title: "Gnosis Safe - Concept",
              url: "https://docs.chainargos.com/documentation/concept-glossary/address-types/multi-sig/gnosis-safe"
            }
          ]
        },
        mpcTss: {
          title: "MPC/TSS",
          description: "**Multi-Party Computation** and **Threshold Signature Schemes** **distribute the signing process** among multiple parties without any single party knowing the complete private key. Each participant holds only a **fragment of the key**, and transaction signing occurs through **cryptographic protocols** that combine these fragments.\n\nMPC/TSS provides **highest level of security** while maintaining **convenience of use** — transactions appear as regular single signatures to the network, but no single party can compromise the account.",
          implementations: [
            {
              title: "Fireblocks",
              url: "https://www.fireblocks.com/"
            },
            {
              title: "ZenGo",
              url: "https://zengo.com/"
            }
          ],
          useful_links: [
            {
              title: "MPC vs Multi-sig",
              url: "https://screenprotocol.medium.com/mpc-vs-multi-sig-misconceptions-and-valid-arguments-95fc92ecf842"
            },
            {
              title: "Fireblocks MPC-CMP Whitepaper",
              url: "https://www.fireblocks.com/a-guide-to-digital-asset-wallets-and-service-providers/"
            }
          ]
        },
        socialRecovery: {
          title: "Social Recovery",
          description: "Social recovery **works by allowing the user to restore access to their account through trusted persons (guardians)** who confirm the replacement of lost authorization with a new one. The main control over the account remains with the user, and under normal circumstances, they independently sign transactions.\n\nSecurity lies in the fact that **guardians do not have permanent access to assets**, but can only jointly, in case of loss of the main key, approve the change to a new one. The convenience of this approach is that in everyday use, the wallet functions as single-sig, but with the possibility of simple access recovery through guardian persons, which brings the user experience closer to traditional 'reset password' mechanisms.",
          implementations: [
            {
              title: "Argent",
              url: "https://www.argent.xyz/"
            },
            {
              title: "Candide Labs",
              url: "https://candidelabs.com/"
            }
          ],
          useful_links: [
            {
              title: "Why Social Recovery Wallets Are Needed",
              url: "https://vitalik.eth.limo/general/2021/01/11/recovery.html"
            },
            {
              title: "What is Social Recovery?",
              url: "https://www.argent.xyz/learn/what-is-social-recovery"
            },
            {
              title: "Gnosis Safe - Social Recovery Module",
              url: "https://safe.global/blog/introducing-candides-social-recovery"
            }
          ]
        }
      }
    }
  },
  modes: {
    mode: "Mode",
    description: "Description",
    compatibility: "Compatibility",
    descriptionHint: "Click to see full description and examples",
    noSelection: "Select wallet types to check compatibility",
    selectionActive: "criteria selected"
  },
  modal: {
    popularImplementations: "Popular Implementations",
    usefulLinks: "Useful Links"
  },
  popularScenarios: {
    title: "Popular Usage Scenarios",
    description: "Different users have different needs regarding the balance between convenience and security. Several most common scenarios for using crypto wallets can be identified:",
    applyScenario: "Apply Scenario",
    scenarios: {
      daily: {
        title: "Daily Payments",
        subtitle: "(small amounts)",
        description: "For everyday transactions, users value convenience and speed, so wallets should be mobile and simple, even at the expense of reduced security. It's recommended to use a hot non-custodial wallet on smartphone or PC that provides full control."
      },
      regular: {
        title: "Regular Payments",
        subtitle: "(moderate amounts)",
        description: "For regular payments of medium amounts, a higher level of security is needed. The optimal choice is smart wallets with recovery functions or two-factor authentication. Smart wallets with multisig are also used (e.g., 2 of 2: smartphone + hardware key)."
      },
      rare: {
        title: "Rare Payments",
        subtitle: "(large amounts)",
        description: "For storing large assets, security takes priority over convenience. A common approach is storing funds on a hardware wallet that is disconnected from the network most of the time. For maximum protection, cold storage with multisig is used."
      }
    }
  }
};
