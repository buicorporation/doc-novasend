# Transaction

[[toc]]

## Services

To find out the list of service_ids available in your company's country, we have provided an endpoint.

```sh
GET https://api.novasend.app/v1.0/services
```

```http request
GET /v1.0/services HTTP/1.1
Host: api.novasend.app
Accept: application/json
Content-Type: application/json
Accept-Encoding: gzip
Accept-Language: fr
Authorization: Bearer bui_sandbox_ACLw58qXqjMMI2ukkBnuCh4XXXXXXXXX
```

### Service list

```json
{
    "services": [
        {
            ...
            "name": "Momo",
            "serviceId": "PAYIN_MOMO_CI",
            ...
        },
        {
            ...
            "name": "Moov money",
            "description": null,
            "serviceId": "PAYIN_MOOV_CI",
            "type": "mobile_money",
            ...
        },
        {
            ...
            "name": "Orange money",
            "serviceId": "PAYIN_ORANGE_CI",
            ...
        },
        {
            ...
            "name": "Wave",
            "serviceId": "PAYIN_WAVE_CI",
            ...
        },
        {
            ...
            "name": "Momo",
            "description": null,
            "serviceId": "PAYOUT_MOMO_CI",
            ...
        },
        {
            ...
            "name": "Moov money",
            "serviceId": "PAYOUT_MOOV_CI",
            ...
        },
        {
            ...
            "name": "Orange money",
            "serviceId": "PAYOUT_ORANGE_CI",
            ...
            "extras": {
                "instruction": "composez la syntaxe #144*82# suivant pour valider votre paiement"
            }
        },
        {
            ...
            "name": "Wave",
            "serviceId": "PAYOUT_WAVE_CI",
            ...
        }
    ]
}
```

## Mobile Money

:::warning NOTE
For mobile money payments, the recipient must be in `E164` format.
:::

### Payment

```json
{
    "paymentMethod": "mobile_money",
    "mobile_money": {
      ...
    }
}
```

### Transfer

```json
{
    "transferMethod": "mobile_money",
    "mobile_money": {
      ...
    }
}
```

## Card

```json
{
    "paymentMethod": "card",
    "card": {
      ...
    }
}
```

## Wallet

```json
{
    "paymentMethod": "wallet",
    "wallet": {
      ...
    }
}
```
