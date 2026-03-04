# Redirect Payment

[[toc]]

If you want to use our payment page, simply use this endpoint to generate a payment intent.

```sh
POST https://api.novasend.app/v1.0/payment-intent
```

### Header

| Value             | description                                                                                               | Optional   |
|-------------------|-----------------------------------------------------------------------------------------------------------|------------|
| Accept-Encoding   | Use this header if you want to use a specific compression method, possible value `gzip`, `deflate`, `br`. | YES        |
| Accept-Language   | If you would like a translation of the error messages, possible value `fr`or `en`                         | YES        |

### Body

| Value        | description                                                                                                                       | Optional |
|--------------|-----------------------------------------------------------------------------------------------------------------------------------|----------|
| amount       | amount of transaction, only integer                                                                                               | NO       |
| reference    | (string) The transaction reference, the value must be unique in your system, so that your data can be cross-referenced with ours. | NO       |
| note         | any description of the transaction                                                                                                | YES      |
| successUrl   | redirect success url use only for wave                                                                                            | YES      |
| failedUrl    | redirect failed url use only for wave                                                                                             | YES      |
| redirectUrl  | redirect to merchant website                                                                                                      | YES      |

### Request

```json
{
  "reference": "{{ your reference }}",
  "amount": 300,
  "note": "{{ my note }}",
  "redirectUrl": "{{ merchant website url }}",
  "successUrl": "{{ successUrl }}",
  "failedUrl": "{{ errorUrl }}"
}
```

### Response

The response of a payment intent transaction contains a `paymentIntent` object, as in the example below.

```json
{
  "paymentIntent": {
    "id": "pi_191138a7a09d42698cfb64dc",
    "paymentUrl": "https://pay.novasend.app/699169cd406ad56eb3244acdf722c934463839605501062a191b9b85343f4c1e",
    "token": "699169cd406ad56eb3244acdf722c934463839605501062a191b9b85343f4c1e"
  }
}
```

## Payment intent status

```sh
GET https://api.novasend.app/v1.0/payment-intent/{paymentIntentId}
```