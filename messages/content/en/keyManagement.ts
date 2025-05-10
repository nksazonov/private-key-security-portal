export const keyManagementContent = {
  description: `In modern blockchain account protection practices, two main security strategies have emerged. The first strategy involves directly protecting the user's private key - taking measures that prevent unauthorized access to the key itself or its loss. The second strategy involves applying an additional layer of security on top of the basic account level, particularly through specialized mechanisms of cryptocurrency wallets or smart contracts.

  Loss or compromise of a private key inevitably leads to loss of access to assets, making reliable key storage one of the central issues in cryptocurrency system security. Users must ensure not only protection of the key from unauthorized access but also guarantee the possibility of its recovery in case of accidental loss or damage to the storage medium.`,
  keyHolder: {
    name: "Key Holder",
    description: "One aspect of preserving a private key from loss or unauthorized access is an effective and secure key holder."
  },
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
  },
  software: {
    name: "Software Wallet",
    description: "A software environment or application (for example, a mobile or desktop wallet) that stores the private key in the memory of a general-purpose device.",
    advantages: `**Advantages:**

* Ease of use: the user can easily sign a transaction without leaving the wallet.`,
    disadvantages: `**Disadvantages:**

* Risk of key loss or compromise, since the key is in the general memory of the device, which is accessible to viruses.`,
  },
  paper: {
    name: "Paper Wallet",
    description: "A physical paper or medium on which a private key or seed phrase is printed or written. It is completely isolated from the network and effectively serves as a material backup medium for the key, with risks related to physical security (loss, damage) and lack of a backup copy.",
    advantages: `**Advantages:**

* High level of security, as the key always remains on paper.`,
    disadvantages: `**Disadvantages:**

* Higher risk of damage or loss.
* Inconvenience of use: to sign transactions, the user needs to physically scan a QR code or enter the key manually.`,
  },
  memory: {
    name: "Memory (Mnemonic carrier)",
    description: "A private key stored in human memory in the form of a mnemonic or password phrase. Due to drawbacks, this method is rarely used in responsible scenarios today, giving way to other key carriers.",
    advantages: `**Advantages:**

* High level of security, as the key always remains in human memory.`,
    disadvantages: `**Disadvantages:**

* Very high unreliability due to the possibility of forgetting
* Inconvenience of use: to sign transactions, the user needs to enter the mnemonic phrase manually`,
  }
};
