# Services

[[toc]]

You will find the list of services available by country below. This page will be updated regularly according to our integration schedule.

## Get service List

```sh
POST https://api.novasend.app/v1.0/services
```

## Payin service List

Retrieve the list of payin services available in your company's country.

```sh
POST https://api.novasend.app/v1.0/services/payin/list
```

## Payout service List

Retrieve the list of payout services available in your company's country.

```sh
POST https://api.novasend.app/v1.0/services/payout/list
```

## Service by identifier

To search for a specific service, simply use the endpoint below and replace *:serviceIdentifier* with the desired identifier, for e.g: PAYIN_ORANGE_CI

```sh
POST https://api.novasend.app/v1.0/services/:serviceIdentifier
```

### Response

```json
{
    "services": {
        "id": "5d76b363-9115-44cc-9f27-628e4218028a",
        "createdAt": "2024-03-04T13:58:00.069Z",
        "updatedAt": "2024-03-04T13:58:00.069Z",
        "name": "Momo",
        "description": null,
        "serviceId": "PAYIN_MOMO_CI",
        "type": "mobile_money",
        "category": "payin",
        "extras": {
            "instruction": "composez la syntaxe *133# suivant pour valider votre paiement",
            "countryCode": "+225",
            "e164Length": "14",
            "e164Mask": "+225##########",
            "nsnLength": "10",
            "twoFirstDigits": "05"
        }
    }
}
```

:::info NOTE
If you wish, you can use the list we provide to display or disable payment methods. In the event of a major problem, we may disable a service entirely, enabling you to avoid unnecessary calls or redirect your flows elsewhere.
:::

## Côte d'Ivoire

| Provider | Payin           | Payout           |
|----------|-----------------|------------------|
| Orange   | PAYIN_ORANGE_CI | PAYOUT_ORANGE_CI |
| MTN      | PAYIN_MOMO_CI   | PAYOUT_MOMO_CI   |
| Moov     | PAYIN_MOOV_CI   | PAYOUT_MOOV_CI   |
| Wave     | PAYIN_WAVE_CI   | PAYOUT_WAVE_CI   |

## Benin

| Provider | Payin         | Payout         |
|----------|---------------|----------------|
| MTN      | PAYIN_MOMO_BJ | PAYOUT_MOMO_BJ |
| Moov     | PAYIN_MOOV_BJ | PAYOUT_MOOV_BJ |

## Togo

| Provider | Payin           | Payout           |
|----------|-----------------|------------------|
| Moov     | PAYIN_MOOV_TG   | PAYOUT_MOOV_TG   |
| TMoney   | PAYIN_TMONEY_TG | PAYOUT_TMONEY_TG |

## Mali

| Provider | Payin           | Payout           |
|----------|-----------------|------------------|
| Orange   | PAYIN_ORANGE_ML | PAYOUT_ORANGE_ML |
| Moov     | PAYIN_MOOV_ML   | PAYOUT_MOOV_ML   |

## Senegal

| Provider | Payin           | Payout           |
|----------|-----------------|------------------|
| Orange   | PAYIN_ORANGE_SN | PAYOUT_ORANGE_SN |
| Free     | PAYIN_FREE_SN   | PAYOUT_FREE_SN   |
| EMoney   | PAYIN_EMONEY_SN | PAYOUT_EMONEY_SN |
| Wave     | PAYIN_WAVE_SN   | PAYOUT_WAVE_SN   |

## Burkina Faso

| Provider | Payin           | Payout           |
|----------|-----------------|------------------|
| Orange   | PAYIN_ORANGE_BF | PAYOUT_ORANGE_BF |
| Moov     | PAYIN_MOOV_BF   | PAYOUT_MOOV_BF   |

## Niger

| Provider | Payin           | Payout           |
|----------|-----------------|------------------|
| Airtel   | PAYIN_AIRTEL_NE | PAYOUT_AIRTEL_NE |


## Cameroon

| Provider | Payin           | Payout           |
|----------|-----------------|------------------|
| Orange   | PAYIN_ORANGE_CM | PAYOUT_ORANGE_CM |
| MTN      | PAYIN_MOMO_CM   | PAYOUT_MOMO_CM   |

## Guinea

| Provider | Payin           | Payout           |
|----------|-----------------|------------------|
| Orange   | PAYIN_ORANGE_GN | PAYOUT_ORANGE_GN |
| MTN      | PAYIN_MOMO_GN   | PAYOUT_MOMO_GN   |