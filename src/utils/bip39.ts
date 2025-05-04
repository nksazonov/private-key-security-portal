import { sha256 } from '@noble/hashes/sha2';

/**
 * Validates a BIP-39 mnemonic phrase
 * @param phrase The mnemonic phrase to validate
 * @param wordlist The BIP-39 wordlist to use for validation
 * @returns An object with isValid and reason properties
 */
export function validateMnemonic(phrase: string, wordlist: string[]): { isValid: boolean; reason?: string } {
  if (!phrase) {
    return { isValid: false, reason: 'emptyMnemonic' };
  }

  // Split by spaces and filter out empty strings
  const words = phrase.trim().split(/\s+/);
  
  // Check if all words are in the wordlist
  const invalidWords = words.filter(word => !wordlist.includes(word));
  if (invalidWords.length > 0) {
    return { 
      isValid: false, 
      reason: `invalidWords:${invalidWords.join(', ')}` 
    };
  }

  // Check supported lengths: 12, 15, 18, 21, or 24 words
  const validLengths = [12, 15, 18, 21, 24];
  if (!validLengths.includes(words.length)) {
    return { 
      isValid: false, 
      reason: 'invalidLength' 
    };
  }

  // Convert words to indices and then to binary
  const indices = words.map(word => wordlist.indexOf(word));
  const bits = indices.map(index => index.toString(2).padStart(11, '0')).join('');
  
  // Calculate entropy length based on mnemonic length
  // (ENT + ENT/32 = TOTAL where TOTAL is the bit length of the mnemonic)
  const totalBits = bits.length;
  const checksumLengthBits = Math.floor(totalBits / 33); // ENT/32 = CS
  const entropyLengthBits = totalBits - checksumLengthBits;
  
  // Extract entropy and checksum
  const entropyBits = bits.slice(0, entropyLengthBits);
  const checksumBits = bits.slice(entropyLengthBits);
  
  // Convert entropy bits to bytes for SHA-256
  const entropyBytes = new Uint8Array(entropyLengthBits / 8);
  for (let i = 0; i < entropyLengthBits; i += 8) {
    entropyBytes[i / 8] = parseInt(entropyBits.slice(i, i + 8), 2);
  }
  
  // Calculate SHA-256 hash of entropy
  const entropyHash = sha256(entropyBytes);
  
  // Convert first byte of hash to binary and take first N bits as checksum
  // where N = entropy length in bits / 32
  const hashBinary = Array.from(entropyHash)
    .map(b => b.toString(2).padStart(8, '0'))
    .join('')
    .slice(0, checksumLengthBits);
  
  // Compare calculated checksum with the one from the mnemonic
  if (hashBinary !== checksumBits) {
    return { 
      isValid: false, 
      reason: 'invalidChecksum' 
    };
  }
  
  return { isValid: true };
}

/**
 * Converts a list of BIP-39 words to entropy bytes
 * @param words The list of BIP-39 words
 * @param wordlist The BIP-39 wordlist to use
 * @returns The entropy bytes
 */
export function mnemonicToEntropy(words: string[], wordlist: string[]): Uint8Array {
  // Convert words to indices and then to binary
  const indices = words.map(word => wordlist.indexOf(word));
  const bits = indices.map(index => index.toString(2).padStart(11, '0')).join('');
  
  // Calculate entropy length based on mnemonic length
  const totalBits = bits.length;
  const checksumLengthBits = Math.floor(totalBits / 33); // ENT/32 = CS
  const entropyLengthBits = totalBits - checksumLengthBits;
  
  // Extract entropy
  const entropyBits = bits.slice(0, entropyLengthBits);
  
  // Convert entropy bits to bytes
  const entropyBytes = new Uint8Array(entropyLengthBits / 8);
  for (let i = 0; i < entropyLengthBits; i += 8) {
    entropyBytes[i / 8] = parseInt(entropyBits.slice(i, i + 8), 2);
  }
  
  return entropyBytes;
}

/**
 * Converts entropy bytes to a BIP-39 mnemonic phrase
 * @param entropy The entropy bytes
 * @param wordlist The BIP-39 wordlist to use
 * @returns The mnemonic phrase
 */
export function entropyToMnemonic(entropy: Uint8Array, wordlist: string[]): string {
  // Calculate SHA-256 hash of the entropy
  const entropyHash = sha256(entropy);
  
  // For ENT bits of entropy, we need ENT/32 bits of checksum
  const checksumLength = Math.floor(entropy.length * 8 / 32);
  
  // Convert the first byte of the hash to binary and take the first checksumLength bits
  const hashBinary = entropyHash[0].toString(2).padStart(8, '0');
  const checksumBits = hashBinary.slice(0, checksumLength);
  
  // Convert entropy to binary string
  const entropyBits = Array.from(entropy)
    .map(b => b.toString(2).padStart(8, '0'))
    .join('');
  
  // Combine entropy bits with checksum bits
  const allBits = entropyBits + checksumBits;
  
  // Split into 11-bit groups
  const groups: string[] = [];
  for (let i = 0; i < allBits.length; i += 11) {
    groups.push(allBits.slice(i, i + 11));
  }
  
  // Convert groups to wordlist indices
  const indices = groups.map(group => parseInt(group, 2));
  
  // Convert indices to words
  const words = indices.map(index => wordlist[index]);
  
  return words.join(' ');
}