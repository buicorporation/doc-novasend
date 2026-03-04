# Payment

[[toc]]

You have a single endpoint for your various payment methods. Our API is for direct use without a payment page, except for wave payments.

```sh
POST https://api.novasend.app/v1.0/payments
```

## Mobile Money

To carry out mobile money transactions, you need to specify your transaction method on **mobile_money**.
Below is an example. Please note that all places containing **braces** must be replaced with your information.

### Header

| Value             | description                                                                                               | Optional   |
|-------------------|-----------------------------------------------------------------------------------------------------------|------------|
| Accept-Encoding   | Use this header if you want to use a specific compression method, possible value `gzip`, `deflate`, `br`. | YES        |
| Accept-Language   | If you would like a translation of the error messages, possible value `fr`or `en`                         | YES        |
| X-Idempotence-Key | This header guarantees the uniqueness of your transactions. The value must be a uuid.                     | YES        |

### MobileMoney object

| Value             | description                                                                                                                         | Optional |
|-------------------|-------------------------------------------------------------------------------------------------------------------------------------|----------|
| service           | service name to use e.g: PAYIN_ORANGE_CI                                                                                            | NO       |
| amount            | amount of transaction, only integer                                                                                                 | NO       |
| recipient         | your customer phone number, valid format is **e164**                                                                                | NO       |
| reference         | (string) The transaction reference, the value must be unique in your system, so that your data can be cross-referenced with ours.   | NO       |
| otp               | OTP is required for any orange transaction                                                                                          | YES      |
| note              | any description of the transaction                                                                                                  | YES      |
| action.successUrl | Only required for transactions with wave                                                                                            | YES      |
| action.failedUrl  | Only required for transactions with wave                                                                                            | YES      |

### Customer object

:::info Customer
You must enter the customer's information, this information allows us to improve our fraud system.
:::

| Value        | description                | Optional |
|--------------|----------------------------|----------|
| firstname    | customer firstname         | YES      |
| lastname     | customer lastname          | YES      |
| email        | customer email             | YES      |
| externalId   | customer id in your system | YES      |
| phoneNumber  | customer phone number      | NO       |

### Request

:::danger NOTE
All orange payments require you to provide the **OTP code**. For other providers this is not necessary, but even if you send us the **OTP code**, the customer may have to re-enter the code.
:::

```json
{
  "paymentMethod": "mobile_money",
  "mobileMoney": {
    "service": "PAYIN_ORANGE_CI",
    "reference": "{{ your reference }}",
    "amount": 200,
    "otpCode": "{{ OTP }}",
    "recipient": "+225XXXXXXXXXX",
    "note": "{{ my note }}",
    "action": {
      "successUrl": "{{ successUrl }}",
      "errorUrl": "{{ errorUrl }}"
    }
  },
  "customer": {
    "firstname": "{{ customer firstname }}",
    "lastname": "{{ customer lastname }}",
    "email": "{{ customer email }}",
    "externalId": "{{ customer externalId }}",
    "phoneNumber": "{{ customer phoneNumber }}"
  }
}
```

:::warning NOTE
`successUrl` and `failedUrl` are required for wave transactions. Transactions with wave are carried out in two stages: after the `POST`, you need to do a `GET to retrieve the payment link.
:::

### Response

The des response of a transfer transaction contains a `payments` object, as in the example below.

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

### Payments Object

| Value       | description                                                         |
|-------------|---------------------------------------------------------------------|
| id          | The transaction id in our system                                    |
| createdAt   | The date the transaction was created                                |
| updatedAt   | The date the transaction was updated                                |
| status      | The status of the transaction, **eg: pending, failed or succeeded** |
| reference   | The reference you provided                                          |
| paymentUrl  | only available for transactions requiring additional actions        |
| destination | Information about the recipient                                     |
| fees        | Billing information                                                 |


## Payment status

```sh
GET https://api.novasend.app/v1.0/payments/{paymentId}
```