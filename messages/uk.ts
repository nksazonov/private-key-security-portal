import { privateKeysContent } from './content/uk/privateKeys';
import { keyManagementContent } from './content/uk/keyManagement';
import { securityFeaturesContent } from './content/uk/securityFeatures';
import { walletMatrixContent } from './content/uk/walletMatrix';
import { ui } from './ui';

export default {
  UI: ui.uk,
  "Error": {
    "description": "<p>На жаль, сталася помилка.</p><p>Ви можете спробувати <retry>перезавантажити сторінку</retry>, яку ви відвідували.</p>",
    "title": "Щось пішло не так!"
  },
  "IndexPage": {
    "importance": "Захист вашого блокчейн-акаунту є критично важливим, оскільки, на відміну від традиційних фінансових систем, транзакції криптовалют є незворотними, і не існує централізованого органу для відновлення втрачених або вкрадених коштів. Порушення безпеки може означати безповоротну втрату ваших активів, оскільки зламані акаунти або скомпрометовані приватні ключі не можуть бути відновлені жодним банком чи службою підтримки.",
    "description": "Безпека криптовалют не така складна, як може здаватися. З належними знаннями та кількома основними практиками, кожен може ефективно захистити свої цифрові активи. Цей портал надає просте керівництво, яке допоможе вам зрозуміти та впровадити надійні заходи безпеки для ваших криптовалютних заощаджень.",
    "title": "Освітній портал з безпеки криптовалютних гаманців",
    "features": "Теми в деталях",
    "privateKeysCardDescription": "Дізнайтеся про процес генерації приватних ключів у блокчейні",
    "keyManagementCardDescription": "Вивчіть методи безпечного зберігання та управління ключами",
    "securityFeaturesCardDescription": "Ознайомтеся з просунутими методами захисту криптовалютних акаунтів",
    "walletMatrixCardDescription": "Порівняйте різні типи гаманців та їх функціональні можливості"
  },
  "LocaleLayout": {
    "title": "Безпека криптовалютних гаманців"
  },
  "LocaleSwitcher": {
    "label": "Змінити мову",
    "locale": "{locale, select, en {🇺🇸 English} uk {🇺🇦 Українська} other {Невідома}}"
  },
  "Navigation": {
    "home": "Головна",
    "privateKeys": "Приватні ключі",
    "keyManagement": "Управління ключами",
    "securityFeatures": "Функції безпеки",
    "walletMatrix": "Матриця гаманців",
    "portalName": "Освітній портал"
  },
  "NotFoundPage": {
    "description": "Будь ласка, перевірте адресний рядок браузера або скористайтеся навігацією, щоб перейти на відому сторінку.",
    "title": "Сторінку не знайдено"
  },
  "Footer": {
    "text": "Освітній портал з безпеки криптовалютних гаманців",
    "previousArticle": "Попередня стаття",
    "nextArticle": "Наступна стаття"
  },
  "PrivateKeysPage": {
    "title": "Операції з приватними ключами",
    "description": privateKeysContent.description,
    "entropySources": privateKeysContent.entropySources,
    "privateKeyGeneration": privateKeysContent.privateKeyGeneration,
    "privateToPublic": privateKeysContent.privateToPublic
  },
  "KeyManagementPage": {
    "title": "Управління ключами",
    "description": keyManagementContent.description,
    "keyHolder": keyManagementContent.keyHolder,
    "networkConnectivity": keyManagementContent.networkConnectivity,
    "custodyModel": keyManagementContent.custodyModel,
  },
  "SecurityFeaturesPage": {
    "title": "Безпека завдяки додатковому функціоналу",
    "description": "У сучасних блокчейн-системах все більшої популярності набувають механізми, що забезпечують додатковий рівень безпеки завдяки надбудові у формі спеціалізованих криптовалютних гаманців. Такий підхід передбачає створення гнучких та програмованих правил доступу, контролю використання коштів і процедур авторизації, які виходять за межі базового захисту ключа.",
    "accountType": securityFeaturesContent.accountType,
    "authorizationScheme": securityFeaturesContent.authorizationScheme
  },
  "WalletMatrixPage": {
    "title": "Матриця характеристик гаманців",
    "description": `Вже визначено, що основні аспекти захисту блокчейн-акаунту - це через захист приватного ключа, а також через надбудови у вигляді додаткового функціоналу. Обʼєднавши ці два поняття, отримуємо **криптографічний гаманець**, що надає безпеку криптографічному акаунту завдяки обом цим аспектам.

  У сучасних блокчейн-екосистемах різні типи гаманців демонструють суттєві відмінності в безпеці та зручності використання. Правильна класифікація блокчейн-акаунтів дозволяє врахувати ці відмінності під час вибору рішень для захисту і покращення користувальницького досвіду. Безпека зберігання ключів, можливість відновлення доступу та модель опіки безпосередньо впливають на ризики втрати активів і складність користування системою.

  Для систематизації підходів до захисту акаунтів виділено п'ять незалежних (ортогональних) осей класифікації:`,
    "criteria": walletMatrixContent.criteria,
    "modal": {
      "popularImplementations": "Популярні реалізації",
      "usefulLinks": "Корисні посилання",
    }
  },
  "Common": {
    "useful_links": "Корисні посилання",
    "learnMore": "Дізнатися більше",
    "copyHover": "Скопіювати",
    "copied": "Скопійовано",
    "entropyLevel": "Рівень ентропії:",
    "moveMouseForEntropy": "Рухайте мишею в цьому прямокутнику для генерації ентропії!"
  }
}
