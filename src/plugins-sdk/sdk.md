# SDK NovaSend PHP

## Prérequis
- PHP >= 7.4
- Composer

## Installation

Pour installer le SDK NovaSend PHP, utilisez Composer. Vous pouvez ajouter la dépendance directement dans votre fichier `composer.json` :

```json
{
  "require": {
    "novasend/novasend-php": "dev-main"
  }
}
```

Puis, exécutez la commande suivante pour installer les dépendances :

```bash
composer install
```

Alternativement, vous pouvez installer le SDK directement via la ligne de commande :

```bash
composer require novasend/novasend-php
```

## Dépendances

Le SDK NovaSend PHP dépend de plusieurs bibliothèques :

- `guzzlehttp/guzzle`: Utilisé pour les requêtes HTTP.
- `phpunit/phpunit`: Utilisé pour les tests unitaires.
- `friendsofphp/php-cs-fixer`: Utilisé pour le formatage du code.
- `phpstan/phpstan`: Utilisé pour l'analyse statique du code.

## Démarrage rapide

Pour commencer à utiliser le SDK NovaSend PHP, suivez ces étapes :

1. Configuration Initiale:

```php
require_once 'vendor/autoload.php';
use NovaSend\NovaSend;
use NovaSend\Http\HttpClient;

// Configuration des clés API
NovaSend::setApiKey("CI", "votre-cle-api-pour-cote-d-ivoire");
NovaSend::setApiKey("SN", "votre-cle-api-pour-senegal");

// Initialisation du client HTTP
$httpClient = new HttpClient('https://api.novasend.app');

// Configuration du client pour les différentes classes de service
NovaSend\Payment::setHttpClient($httpClient);
NovaSend\Transfer::setHttpClient($httpClient);
NovaSend\Wallet::setHttpClient($httpClient);
NovaSend\Service::setHttpClient($httpClient);
NovaSend\Webhook::setHttpClient($httpClient);
```

2. Création d'un paiement:

```php
$paymentData = [
    'paymentMethod' => 'mobile_money',
    'mobileMoney' => [
        'service' => 'PAYIN_ORANGE_CI',
        'reference' => 'ref_123456',
        'amount' => 1000,
        'recipient' => '+2250700000000',
        'otpCode' => '1234',
        'note' => 'Test payment',
        'action' => [
            'successUrl' => 'https://example.com/success',
            'errorUrl' => 'https://example.com/error'
        ]
    ],
    'customer' => [
        'firstname' => 'John',
        'lastname' => 'Doe',
        'email' => 'john.doe@example.com',
        'phoneNumber' => '+2250700000000'
    ]
];

try {
    $response = NovaSend\Payment::create($paymentData, "CI");
    print_r($response);
} catch (NovaSend\Exception\ApiException $e) {
    echo 'Request failed with message: ' . $e->getMessage();
}
```

Exemple de réponse pour la création d'un paiement réussi:

```json
{
    "payments": {
        "id": "pt_18b38c1e9e0804bed3398dbb",
        "createdAt": "2023-10-16T13:51:54.394Z",
        "updatedAt": "2023-10-16T13:51:54.394Z",
        "status": "pending",
        "service": "PAYIN_ORANGE_CI",
        "reference": "e0e3f0a3-2e37-4719-b9c2-091864c4afbd",
        "destination": {
            "country": "CI",
            "provider": "ORANGE",
            "recipient": "+225XXXXXXXXXX"
        },
        "fees": {
            "currency": "XOF",
            "fee": 4,
            "amount": 200,
            "chargedAmount": 196
        }
    }
}
```

Exemple de réponse pour un paiement échoué:

```json
{
    "error": {
        "message": "Invalid payment method",
        "type": "invalid_request_error"
    }
}
```

## Documentation complète

La documentation complète du SDK NovaSend PHP est disponible sur notre [site de documentation](https://docs.novasend.app/starting.html). Vous y trouverez des informations détaillées sur toutes les fonctionnalités, les méthodes disponibles et les exemples d'utilisation.

## Support des versions antérieures

Si vous utilisez une version antérieure du SDK NovaSend PHP, veuillez vous référer à la documentation de la version héritée. Nous fournissons des instructions spécifiques pour la migration vers la dernière version ainsi que des guides de compatibilité pour les anciennes versions.