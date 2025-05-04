export const privateKeysContent = {
  // Main page description - moved from main messages file
  description: "Private keys are the foundation of security in blockchain technology. They allow users to prove ownership and sign transactions. This article explains how private keys are generated and the importance of randomness in the process.",

  // Only keeping entropy sources and removing other sections
  entropySources: {
    title: "Entropy Sources and CSPRNG",
    description: `Ensuring a cryptographically secure level of entropy is a prerequisite for generating a reliable private key. According to the recommendations in **RFC 4086** and **NIST SP 800-90B**, a randomness source must have properties of unpredictability and resistance to reconstruction of previous and future outputs.

In web environments, it's advisable to combine pointer movements, timing microdiscrepancies, and WebRTC noise as the primary entropy pool. This pool, after post-processing (for example, through the cryptographic hash function SHA-256), initializes a deterministic CSPRNG – achieving both high speed and strong guarantees of randomness.`,
    // Added links array to be rendered dynamically
    links: [
      {
        href: "https://tools.ietf.org/html/rfc4086",
        text: "RFC 4086: Randomness Requirements for Security"
      },
      {
        href: "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-90B.pdf",
        text: "NIST SP 800-90B: Recommendation for the Entropy Sources"
      }
    ]
  },
  privateKeyGeneration: {
    title: "Private Key Generation Methods",
    fromCsprng: {
      title: "Generation with cryptographically secure PRNG",
      description: `The most common and secure method for generating private keys is to use a cryptographically secure pseudorandom number generator (CSPRNG). Modern operating systems and browsers provide built-in CSPRNGs that draw from various system entropy sources to produce high-quality random numbers.

When using a CSPRNG, the generated random bytes can either be used directly as a private key (if they're in the proper range) or be processed through a cryptographic hash function to ensure proper formatting and distribution.

Most cryptocurrency wallets and libraries use this approach to generate private keys, as it combines security with convenience.`
    },
    fromEntropy: {
      title: "Generation from entropy",
      description: `Another approach to private key generation is to collect entropy directly from user actions or environmental sources and transform it into a private key. This method provides transparency and user control over the randomness source.

Below is an example of generating a private key and address using entropy collected from your mouse movements. Move your mouse within the box below until sufficient entropy is collected, then click the button to generate a key.

The collected entropy bytes are displayed, allowing you to see the exact random input used to create your key. This approach ensures that the key is generated from entropy that you directly influenced.`,
      generateKeyButton: "Generate Key",
      generateKeyNotEnoughEntropy: "Not enough mouse movements for entropy, please try again.",
    },
    fromSeed: {
      title: "Generation from seed-phrase. BIP-39",
      description: `BIP-39 (Bitcoin Improvement Proposal 39) defines a mechanism for generating a mnemonic phrase and its subsequent conversion into a seed, which is then directly used to derive private keys. Its main components are:`,

      mnemonicPhrase: {
        title: "1. Generating the mnemonic phrase",
        description: `A **mnemonic phrase**, according to BIP-39, consists of a predetermined number of words from a special vocabulary. Typically, a set of **2048 words** is used, available in the public domain (for English, Japanese, Korean, and other languages). The phrase length can be **12, 15, 18, 21, or 24 words**. The most common formats are 12 or 24 words.

Using a **cryptographically secure random number generator (CSPRNG)**, an initial bit sequence called **entropy** (e.g., 128 or 256 bits) is first obtained. Then, \`SHA-256(entropy)\` is calculated, from which only the first \`entropy/32\` bits are taken (e.g., for entropy of 256 bits, 8 bits are taken). These bits are called the **checksum**. Then the resulting checksum is added (concatenated) to the original random bits.

After adding the checksum, the total bit length becomes convenient to split into **groups of 11 bits**, which are interpreted as a number from 0 to 2047 (i.e., 2¹¹ = 2048 possible values). This number is the word number in the corresponding dictionary.

Thanks to this mechanism, on one hand, we get a mnemonic that is easy to read and write, and on the other hand, we have built-in correctness verification. If a user accidentally confuses one of the words or the order of words, the checksum won't match, and during verification, the mnemonic will be recognized as incorrect.

Below is an interactive example demonstrating the mnemonic generation process. Click "Generate" to create a new mnemonic phrase and see all the steps involved.`,
        generateButtonText: "Generate Entropy"
      },

      seedGeneration: {
        title: "2. Converting the mnemonic phrase to a seed",
        description: `After obtaining the sequence of words (mnemonic), a transition to a **512-bit seed** is performed using the **PBKDF2-HMAC-SHA512** function.

The PBKDF2 input includes:
- The **mnemonic phrase** (word combination)
- A so-called **"salt"**, which is the string "mnemonic" (as per BIP-39)
- An additional **passphrase**, if the user chooses one

The resulting 512-bit seed is the main secret from which further (deterministic) derivation of private keys is performed.

Below is an interactive example that shows how a mnemonic phrase is converted to a seed and then to a private key. Enter your own mnemonic or click "Random" to generate one.`,
        randomButtonText: "Random",
      },

      advantages: {
        title: "Advantages and security of mnemonics",
        description: `- **Ease of memorization**: It is much easier to remember or store a mnemonic series of words than a cumbersome bit sequence.
- **Recoverability**: From the stored set of words, the user can at any time re-obtain their seed and restore access to all corresponding private keys.
- **Additional security layer**: Adding a passphrase increases security, as it makes it more difficult for an attacker to guess the seed even if they have the basic 12 or 24 words.
- **Built-in verification**: Mnemonics contain a built-in checksum, which serves as a validity check. If a user makes a typo or replaces a word with another one, the checksum will fail and the mnemonic will be identified as incorrect.`
      },

      mnemonicValidator: {
        title: "Mnemonics validator",
        description: `This interactive tool allows you to validate any BIP-39 mnemonic phrase. Enter a mnemonic or generate a random one, and the tool will show all the intermediate values in the validation process.

If the mnemonic is invalid (due to incorrect words, wrong length, or a checksum mismatch), the relevant fields will be highlighted in red.`,
        randomButton: "Random"
      },

      hdWallets: {
        title: "HD-generation. BIP-32, BIP-44",
        description: `After obtaining a seed from a mnemonic phrase, the next crucial step is generating the actual private keys. This is typically done using the **Hierarchical Deterministic (HD) wallet** protocol described in [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki).

**BIP-32** (Hierarchical Deterministic Wallets) defines a standard for creating a tree-like structure of keys from a single master key. This technology provides several advantages:

- **Deterministic**: All keys are generated from a single master key or seed
- **Hierarchical structure**: Ability to form a tree structure with parent and child keys
- **Cryptographic security**: Not knowing a private key at a higher level prevents computing private keys at lower levels
- **Enhanced privacy**: Ability to generate a new address for each transaction
- **Backup simplicity**: Only the master key or seed phrase needs to be backed up to recover all keys

Technical Details of HD Wallets:

1. **Master key**: Created from entropy or a seed phrase using the HMAC-SHA512 function
2. **Extended keys**: Each key in the tree consists of a private key and a chain code
3. **Key paths**: Uses a special format for specifying the path to a key in the hierarchy (e.g., m/0/1/2)
4. **Hardened derivation**: Ability to create public keys for child elements without knowing the corresponding private keys

#### Standardization of Wallet Structure (BIP-44)

Building on BIP-32, [BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) establishes a clear standard for HD wallet structure with a five-level hierarchy:

\`m / purpose' / coin_type' / account' / change / address_index\`

where:
- **purpose**: Fixed value of 44' (indicates BIP-44 is being used)
- **coin_type**: Cryptocurrency type (0' for Bitcoin, 60' for Ethereum, etc.)
- **account**: Account index (0', 1', 2'...) for logical separation of funds
- **change**: External chain (0) for regular addresses or internal chain (1) for change addresses
- **address_index**: Sequential address number (0, 1, 2...)

> **Note**: The apostrophe (') denotes hardened derivation, providing an additional layer of security.

This structuring allows wallets to support different cryptocurrencies, have multiple accounts, and generate unique addresses for each transaction, significantly enhancing user privacy while maintaining ease of use.`
      },

      links: [
        {
          href: "https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki",
          text: "BIP-39: Mnemonic code for generating deterministic keys"
        },
        {
          href: "https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt",
          text: "BIP-39 English wordlist (2048 words)"
        },
        {
          href: "https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki",
          text: "BIP-32: Hierarchical Deterministic Wallets"
        },
        {
          href: "https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki",
          text: "BIP-44: Multi-Account Hierarchy for Deterministic Wallets"
        }
      ]
    }
  },
  privateToPublic: {
    title: "Private to Public Key, Address",
    description: `A public key is an open key that can be freely distributed among other network participants. With it, anyone can verify the authenticity of a signature created by the private key without receiving any information about the private key itself.

The public key is generated from the private key using a special cryptographic algorithm based on mathematical operations on elliptic curve points. In simplified form, the generation of a public key looks like this:

1. A private key — a random 256-bit number — is provided as input.
2. Based on the private key, using multiplication by the base point of the elliptic curve, a public key is generated, which represents the coordinates of a specific point on this curve.
3. The resulting public key has a length of 512 bits (64 bytes) and is typically encoded in hexadecimal representation.

**Converting a public key to an account address.** The public key is quite long and inconvenient for practical use in everyday interaction with the blockchain, so for convenience, an additional step is used — an account address is generated from the public key. For example, in Ethereum, this address is obtained through the following algorithm:

1. The public key of the account (512 bits, 64 bytes) is provided as input.
2. The cryptographic hash KECCAK-256 is calculated from this key.
3. The first 12 bytes of the resulting hash (256 bits, 32 bytes) are discarded, and the last 20 bytes become the account address.
4. The resulting address (160-bit, 20 bytes) is used as a unique identifier for the account in the Ethereum network.`,
    generatorPoint: {
      title: "Generator Point G in secp256k1",
      description: `The generator point G is a fixed point on the secp256k1 elliptic curve that serves as the basis for all public key operations. It is a predefined constant that everyone using the secp256k1 curve shares.

When we perform elliptic curve multiplication to generate a public key, we're essentially computing the formula:

**Public Key = Private Key × G**

This operation involves adding the generator point G to itself as many times as specified by the private key (using elliptic curve point addition). Due to the mathematical properties of elliptic curves, even though G is known to everyone, it's computationally infeasible to reverse the process and determine the private key from the public key.

The exact coordinates of the generator point G on the secp256k1 curve are:

\`\`\`
x: 79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798
y: 483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8
\`\`\`

Below you can try generating your own key pair by performing elliptic curve multiplication. Enter your own private key or generate a random one to see the resulting public key and address.`
    },
    links: [
      {
        href: "https://en.bitcoin.it/wiki/Elliptic_Curve_Digital_Signature_Algorithm",
        text: "Elliptic Curve Digital Signature Algorithm (ECDSA)"
      },
      {
        href: "https://ethereum.org/en/developers/docs/accounts/",
        text: "Ethereum Accounts Explained"
      }
    ]
  },
};
