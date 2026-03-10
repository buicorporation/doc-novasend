# Webhook

[[toc]]

## Events

### Payment

- `payment.succeeded`
- `payment.failed`

### Transfer

- `transfer.succeeded`
- `transfer.failed`

## Subscribe

```sh
POST https://business-api.novasend.app/v1.0/webhooks/subscriptions
```

### Request

```json
{
    "subscription": {
        "description": "subscription",
        "url": "{{ my url }}",
        "events": [
            "transfer.succeeded",
            "transfer.failed",
            "payment.succeeded",
            "payment.failed"
        ],
        "metadata": {
            "environment": "development"
        }
    }
}
```

```http request
POST /v1.0/webhooks/subscriptions HTTP/1.1
Host: business-api.novasend.app
Accept: application/json
Content-Type: application/json
Accept-Encoding: application/gzip
Accept-Language: fr
X-Idempotence-Key: 3aefba51-0554-46a1-bb2b-a2255f15bacf
Authorization: Bearer bui_sandbox_ACLw58qXqjMMI2ukkBnuCh4XXXXXXXXX

{
    "subscription": {
        "description": "subscription",
        "url": "https://webhook.site/cd394996-24ca-4013-9bbe-eb2d82a932c2",
        "events": [
            "transfer.succeeded",
            "transfer.failed",
            "payment.succeeded",
            "payment.failed"
        ],
        "metadata": {
            "environment": "development"
        }
    }
}
```

### Response

```json
{
    "subscriptions": {
        "id": "wh_18b3e44a28574e5d8d8d7b8b",
        "createdAt": "2023-10-17T15:32:47.376Z",
        "updatedAt": "2023-10-17T15:32:47.376Z",
        "url": "https://webhook.site/cd394996-24ca-4013-9bbe-eb2d82a932c2",
        "events": [
            "transfer.succeeded",
            "transfer.failed",
            "payment.succeeded",
            "payment.failed"
        ],
        "description": "subscription",
        "metadata": {
            "environment": "development"
        },
        "secret": "ws_lnuhgwp1pur9o99z3s",
        "mode": "sandbox"
    }
}
```

:::warning NOTE
Note that you can create only one subscription per environment, whether your account is in **sandbox** or **live**.
:::

## Update

```sh
PUT https://business-api.novasend.app/v1.0/webhooks/subscriptions/{webhookId}
```

```
{
    "subscription": {
        "description": "subscription",
        "url": "https://webhook.site/2ebedfa6-dac2-4433-81a2-d777c247882a",
        "events": [
            "transfer.failed",
            "transfer.succeeded",
            "payment.failed",
            "payment.succeeded"
        ],
        "metadata": {
            "environment": "development"
        }
    }
}
```

## Unsubscribe

```sh
DELETE https://business-api.novasend.app/v1.0/webhooks/subscriptions/{webhookId}
```

## Signature

The header contains a signature for each secret on your webhook. Usually you would only have one active secret, but for a time after you change secrets, you may have more than one that is active. The signature is a hash-based message authentication code **(HMAC)** generated from the payload using a `SHA256` hash function.

To verify the webhook signature, you compute the expected HMAC value based on the body of the webhook and the webhook secret and make sure that the result is provided as one of the signatures in the header.

[For testing hmac online](https://www.devglan.com/online-tools/hmac-sha256-online)

### Validation
The following is a full example for webhook signature validation. The 3 things you need are

* The webhook secret (given to you by api when your webhook URL is registered)

```text
wh_1hej7kt7pp2poavdi3ro
```

* The `x-novasend-signature` header sent in every webhook request. This is a POST request by NovaSend, to your server.

```text
b5a2f2ebd011640d3afd9fd22b3295ed880ed94ecb638e03c292eeeb5d551bc9
```

* The body of the POST request.

```text
{"payments":{"id":"pt_18bf2f42576f9849c42c133f","createdAt":"2023-11-21T17:36:08.594Z","updatedAt":"2023-11-21T17:36:08.594Z","status":"failed","service":"PAYIN_WAVE_CI","reference":"bb7ecc79-aedb-42d7-974c-6220f87c26cc","destination":{"country":"CI","provider":"WAVE","recipient":"+22507XXXXXXXX"},"fees":{"currency":"XOF","fee":0,"amount":200,"chargedAmount":200}}}
```
  
### Validation fails

The most common reason for this is that some frameworks automatically parse the body of the webhook you receive. This gives the wrong result when you calculate the hash. The reason for this is that the signature is only unique if the key order in the JSON hasn't changed, there are no additional or missing spaces, and there are no additional line breaks.

The solution is to not parse the body, but instead do the signature validation against the raw string you received.

Here are some common examples that indicate this problem.

- Example 1: This is a correct payload:
  
```text
 {"payments":{"id":"pt_18bf2f42576f9849c42c133f","createdAt":"2023-11-21T17:36:08.594Z","updatedAt":"2023-11-21T17:36:08.594Z","status":"failed","service":"PAYIN_WAVE_CI","reference":"bb7ecc79-aedb-42d7-974c-6220f87c26cc","destination":{"country":"CI","provider":"WAVE","recipient":"+22507XXXXXXXX"},"fees":{"currency":"XOF","fee":0,"amount":200,"chargedAmount":200}}}
```

- Example 2: String content:

```text
 '{"payments":{"id":"pt_18bf2f42576f9849c42c133f","createdAt":"2023-11-21T17:36:08.594Z","updatedAt":"2023-11-21T17:36:08.594Z","status":"failed","service":"PAYIN_WAVE_CI","reference":"bb7ecc79-aedb-42d7-974c-6220f87c26cc","destination":{"country":"CI","provider":"WAVE","recipient":"+22507XXXXXXXX"},"fees":{"currency":"XOF","fee":0,"amount":200,"chargedAmount":200}}}''
```
  
- Example 3: we don't send line breaks in the body, so the JSON below is not the exact body string content:

```txt
{
  "payments": {
    "id": "pt_18bf2f42576f9849c42c133f",
    "createdAt": "2023-11-21T17:36:08.594Z",
    "updatedAt": "2023-11-21T17:36:08.594Z",
    "status": "failed",
    "service": "PAYIN_WAVE_CI",
    "reference": "bb7ecc79-aedb-42d7-974c-6220f87c26cc",
    "destination": {
      "country": "CI",
      "provider": "WAVE",
      "recipient": "+22507XXXXXXXX"
    },
    "fees": {
      "currency": "XOF",
      "fee": 0,
      "amount": 200,
      "chargedAmount": 200
    }
  }
}
```
