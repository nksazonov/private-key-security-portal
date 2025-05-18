export const ui = {
  en: {
    labels: {
      privateKey: "Private Key:",
      publicAddress: "Public Address:",
      publicKey: "Public Key:",
      publicKeyX: "P = k * G, x coordinate:",
      publicKeyY: "P = k * G, y coordinate:",
      keccakHash: "keccak256(publicKey):",
      ethereumAddress: "Address:",
      mnemonicPhrase: "BIP-39 Mnemonic Phrase:",
      salt: "Salt:",
      passphrase: "Passphrase:",
      reliability: "Reliability",
      comfort: "Comfort",
      security: "Security",
      examples: "Examples",
      implementationInsight: "Implementation Insight",
      finalSeed: "Final seed (512 bits):",
      currentEntropy: "Current Entropy:",
      initialBitSequenceHex: "Initial bit sequence (hex, 128 bits):",
      initialBitSequenceBinary: "Initial bit sequence (bin, 128 bits):",
      checksumHex: "Checksum (hex):",
      checksumBinary: "Checksum (bin):",
      entropyChecksum: "Entropy + Checksum (bin):",
      splitBitGroups: "Split in 11-bit groups (bin):",
      decimalIndices: "Decimal indices (0-2047):",
      sha256Hash: "SHA-256(Initial bit sequence):",
      suppliedChecksum: "Supplied checksum:",
      calculatedChecksum: "Calculated checksum:",
      sign: "Sign",
      account: "Account Address",
      weight: "Weight",
      threshold: "Threshold",
    },
    placeholders: {
      dashNoValue: "—",
      noMnemonicPhrase: "Enter mnemonic phrase (12 words separated by spaces)",
      enterSalt: "Enter salt",
      enterPassphrase: "Enter passphrase (optional)"
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
      publicKey: "Публічний ключ:",
      publicKeyX: "P = k * G, x координата:",
      publicKeyY: "P = k * G, y координата:",
      keccakHash: "keccak256(публічний ключ):",
      ethereumAddress: "Адреса:",
      mnemonicPhrase: "BIP-39 мнемонічна фраза:",
      salt: "Сіль:",
      passphrase: "Парольна фраза:",
      reliability: "Надійність",
      comfort: "Зручність",
      security: "Безпека",
      examples: "Приклади",
      implementationInsight: "Деталі реалізації",
      finalSeed: "Фінальний seed (512 біт):",
      currentEntropy: "Поточна ентропія:",
      initialBitSequenceHex: "Початкова бітова послідовність (hex, 128 біт):",
      initialBitSequenceBinary: "Початкова бітова послідовність (bin, 128 біт):",
      checksumHex: "Контр. сума (hex):",
      checksumBinary: "Контр. сума (bin):",
      entropyChecksum: "Ентропія + контрольна сума (bin):",
      splitBitGroups: "Розбиття на 11-бітові групи (bin):",
      decimalIndices: "Десяткові індекси (0-2047):",
      sha256Hash: "SHA-256(Початкова бітова послідовність):",
      suppliedChecksum: "Надана контр. сума:",
      calculatedChecksum: "Обчислена к. сума:",
      sign: "Підпис",
      account: "Адреса акаунту",
      weight: "Вага",
      threshold: "Поріг",
    },
    placeholders: {
      dashNoValue: "—",
      noMnemonicPhrase: "Введіть мнемонічну фразу (12 слів, розділених пробілами)",
      enterSalt: "Введіть сіль",
      enterPassphrase: "Введіть парольну фразу (опціонально)"
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