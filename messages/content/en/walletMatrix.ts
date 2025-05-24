export const walletMatrixContent = {
  criteria: {
    keyHolder: {
      title: "Key Holder",
      description: "Physical medium or environment where the private cryptographic key is stored",
      types: {
        hardware: {
          title: "Hardware Wallet",
          description: "Specialized electronic device for secure key storage and transaction signing.",
          implementations: [],
          useful_links: []
        },
        software: {
          title: "Software Wallet", 
          description: "Software that stores keys in computer or smartphone memory.",
          implementations: [],
          useful_links: []
        },
        paper: {
          title: "Paper Wallet",
          description: "Physical medium with written private key or seed phrase.",
          implementations: [],
          useful_links: []
        },
        brain: {
          title: "Brain Wallet",
          description: "Private key stored in human memory.",
          implementations: [],
          useful_links: []
        }
      }
    },
    networkConnectivity: {
      title: "Network Connectivity",
      description: "Degree of key holder connection to the network",
      types: {
        hot: {
          title: "Hot Wallet",
          description: "Permanently connected to the internet.",
          implementations: [],
          useful_links: []
        },
        cold: {
          title: "Cold Wallet", 
          description: "Isolated from the network most of the time.",
          implementations: [],
          useful_links: []
        },
        deepCold: {
          title: "Deep Cold Storage",
          description: "Never connects to any network or device.",
          implementations: [],
          useful_links: []
        }
      }
    },
    custodyModel: {
      title: "Custody Model",
      description: "Method of distributing responsibility for private key storage",
      types: {
        custodial: {
          title: "Custodial Model",
          description: "Private key stored by a third party.",
          implementations: [],
          useful_links: []
        },
        selfCustody: {
          title: "Self-Custody Model",
          description: "Keys controlled directly by the account owner.",
          implementations: [],
          useful_links: []
        },
        sharedCustody: {
          title: "Shared Custody",
          description: "Control distributed among multiple parties.",
          implementations: [],
          useful_links: []
        }
      }
    },
    accountType: {
      title: "Account Type",
      description: "Type of account in blockchain",
      types: {
        eoa: {
          title: "EOA",
          description: "Standard account type in Ethereum.",
          implementations: [],
          useful_links: []
        },
        smartContract: {
          title: "Smart Wallet",
          description: "Account implemented as a smart contract.",
          implementations: [],
          useful_links: []
        },
        erc4337: {
          title: "Account Abstraction",
          description: "New type with account abstraction features.",
          implementations: [],
          useful_links: []
        }
      }
    },
    authorizationScheme: {
      title: "Authorization Scheme",
      description: "Method of confirming access rights to the account",
      types: {
        singleSig: {
          title: "Single-Signature",
          description: "Requires one signature for authorization.",
          implementations: [],
          useful_links: []
        },
        multiSig: {
          title: "Multi-Signature",
          description: "Requires multiple independent signatures.",
          implementations: [],
          useful_links: []
        },
        mpcTss: {
          title: "MPC/TSS",
          description: "Distributes signature computation among multiple parties.",
          implementations: [],
          useful_links: []
        },
        socialRecovery: {
          title: "Social Recovery",
          description: "Allows recovery through trusted guardians.",
          implementations: [],
          useful_links: []
        }
      }
    }
  }
};