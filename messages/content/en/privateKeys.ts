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
    fromRandomSeed: {
      description: `The most common and straightforward method for generating private keys is to use a cryptographically secure pseudorandom number generator (CSPRNG), the output of which either directly becomes the private key or is transformed into one using a hash function.

Below is an example of generating a private key and address using a CSPRNG that uses mouse movements as entropy. Try moving your mouse, generate the key again, and check if it has changed.`,
      generateKeyButton: "Generate Key",
      generateKeyNotEnoughEntropy: "Not enough mouse movements for entropy, please try again.",
    },
  }
};
