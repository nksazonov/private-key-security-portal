export const ui = {
  en: {
    labels: {
      privateKey: "Private Key:",
      publicAddress: "Public Address:",
      mnemonicPhrase: "BIP-39 Mnemonic Phrase:",
      salt: "Salt:",
      passphrase: "Passphrase:",
      finalSeed: "Final seed (512 bits):",
      currentEntropy: "Current Entropy:",
      initialBitSequenceHex: "Initial bit sequence (HEX, 128 bits):",
      initialBitSequenceBinary: "Initial bit sequence (Binary, 128 bits):",
      checksumHex: "Checksum (HEX):",
      checksumBinary: "Checksum (Binary):",
      entropyChecksum: "Entropy + Checksum (Binary):",
      splitBitGroups: "Split in 11-bit groups (Binary):",
      decimalValues: "Decimal values (0-2047):",
      bip39Words: "BIP-39 Mnemonic Words:",
      sha256Hash: "SHA-256(Initial bit sequence):"
    },
    placeholders: {
      noPrivateKey: "No private key generated yet",
      noPublicAddress: "No public address generated yet",
      noMnemonicPhrase: "Enter mnemonic phrase (12 words separated by spaces)",
      enterSalt: "Enter salt",
      enterPassphrase: "Enter passphrase (optional)",
      noSeed: "No seed generated yet",
      noEntropy: "No entropy collected yet",
      noEntropyGenerated: "No entropy generated yet",
      noChecksumGenerated: "No checksum generated yet",
      noEntropyChecksumGenerated: "No entropy+checksum generated yet",
      noBitGroups: "No 11-bit groups generated yet",
      noDecimalValues: "No decimal values generated yet",
      noMnemonicWords: "No mnemonic words generated yet",
      noSha256: "No SHA-256 hash generated yet"
    },
    tooltips: {
      clickToCopy: "Click to copy",
      copied: "Copied!"
    },
    validationErrors: {
      emptyMnemonic: "Mnemonic phrase is empty",
      invalidWords: "Invalid word(s) in mnemonic:",
      invalidLength: "Invalid mnemonic length. Valid lengths are: 12, 15, 18, 21, 24 words.",
      invalidChecksum: "Invalid checksum",
      failedGeneration: "Failed to generate mnemonic"
    }
  },
  uk: {
    labels: {
      privateKey: "Приватний ключ:",
      publicAddress: "Публічна адреса:",
      mnemonicPhrase: "BIP-39 мнемонічна фраза:",
      salt: "Сіль:",
      passphrase: "Парольна фраза:",
      finalSeed: "Фінальний seed (512 біт):",
      currentEntropy: "Поточна ентропія:",
      initialBitSequenceHex: "Початкова бітова послідовність (HEX, 128 біт):",
      initialBitSequenceBinary: "Початкова бітова послідовність (Binary, 128 біт):",
      checksumHex: "Контрольна сума (HEX):",
      checksumBinary: "Контрольна сума (Binary):",
      entropyChecksum: "Ентропія + контрольна сума (Binary):",
      splitBitGroups: "Розбиття на 11-бітові групи (Binary):",
      decimalValues: "Десяткові значення (0-2047):",
      bip39Words: "BIP-39 мнемонічні слова:",
      sha256Hash: "SHA-256(Початкова бітова послідовність):"
    },
    placeholders: {
      noPrivateKey: "Приватний ключ ще не згенеровано",
      noPublicAddress: "Публічну адресу ще не згенеровано",
      noMnemonicPhrase: "Введіть мнемонічну фразу (12 слів, розділених пробілами)",
      enterSalt: "Введіть сіль",
      enterPassphrase: "Введіть парольну фразу (опціонально)",
      noSeed: "Seed ще не згенеровано",
      noEntropy: "Ентропія ще не зібрана",
      noEntropyGenerated: "Ентропія ще не згенерована",
      noChecksumGenerated: "Контрольна сума ще не згенерована",
      noEntropyChecksumGenerated: "Ентропія+контрольна сума ще не згенеровані",
      noBitGroups: "11-бітові групи ще не згенеровані",
      noDecimalValues: "Десяткові значення ще не згенеровані",
      noMnemonicWords: "Мнемонічні слова ще не згенеровані",
      noSha256: "SHA-256 хеш ще не згенеровано"
    },
    tooltips: {
      clickToCopy: "Натисніть, щоб скопіювати",
      copied: "Скопійовано!"
    },
    validationErrors: {
      emptyMnemonic: "Мнемонічна фраза порожня",
      invalidWords: "Недійсні слова в мнемоніці:",
      invalidLength: "Недійсна довжина мнемоніки. Допустимі довжини: 12, 15, 18, 21, 24 слова.",
      invalidChecksum: "Недійсна контрольна сума",
      failedGeneration: "Не вдалося згенерувати мнемоніку"
    }
  }
};