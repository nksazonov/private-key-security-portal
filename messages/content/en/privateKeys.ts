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
      description: `BIP-39 (Bitcoin Improvement Proposal 39) defines a mechanism for generating a mnemonic phrase and its subsequent conversion into a seed, which is then directly used to derive private keys. Its main components are:

1. **Generating the mnemonic phrase**

  A mnemonic phrase, according to BIP-39, consists of a predetermined number of words from a special vocabulary. Typically, a set of 2048 words is used, available in the public domain (for English, Japanese, Korean, and other languages). The phrase length can be 12, 15, 18, 21, or 24 words. The most common formats are 12 or 24 words.

  Using a cryptographically secure random number generator, an initial bit sequence called entropy (e.g., 128 or 256 bits) is first obtained. Then, \`SHA-256(entropy)\` is calculated, from which only the first \`entropy/32\` bits are taken (e.g., for entropy of 256 bits, 8 bits are taken), which are called the checksum. Then the resulting checksum is added (concatenated) to the original random bits.

  After adding the checksum, the total bit length becomes convenient to split into groups of 11 bits, which are interpreted as a number from 0 to 2047 (i.e., 2^11 = 2048 possible values). This number is the word number in the corresponding BIP-39 dictionary.

  Thanks to this mechanism, on one hand, we get a mnemonic that is easy to read and write, and on the other hand, we have built-in correctness verification. If a user accidentally confuses one of the words or the order of words, the checksum won't match, and during verification, the mnemonic will be recognized as incorrect.

2. **Converting the mnemonic phrase to a seed**

  After obtaining the sequence of words (mnemonic), a transition to a 512-bit seed is performed using the PBKDF2-HMAC-SHA512 function. The PBKDF2 input includes: the mnemonic phrase (word combination), a so-called "salt", which is the string "mnemonic" (as per BIP-39), and an additional passphrase, if the user chooses one. The resulting 512-bit seed is the main secret from which further (deterministic) derivation of private keys is performed.

**Advantages and security of mnemonics:**
- It is much easier to remember or store a mnemonic series of words than a cumbersome bit sequence.
- From the stored set of words, the user can at any time re-obtain their seed and restore access to all corresponding private keys.
- Adding a passphrase increases security, as it makes it more difficult for an attacker to guess the seed even if they have the basic 12 or 24 words.

Below is an interactive example demonstrating the BIP-39 process. Click "Generate" to create a new mnemonic seed phrase and see all the steps involved in creating a private key from it.`,
      generateButtonText: "Generate BIP-39 Mnemonic",
      links: [
        {
          href: "https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki",
          text: "BIP-39: Mnemonic code for generating deterministic keys"
        },
        {
          href: "https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt",
          text: "BIP-39 English wordlist (2048 words)"
        }
      ]
    }
  }
};
