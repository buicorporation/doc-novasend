# Transfer

[[toc]]

You have a single endpoint for your various transfer methods

```sh
POST https://api.novasend.app/v1.0/transfers
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

### MobileMoney Object

| Value     | description                                                                                                                       | Optional |
|-----------|-----------------------------------------------------------------------------------------------------------------------------------|----------|
| service   | service name to use e.g: PAYIN_ORANGE_CI                                                                                          | NO       |
| amount    | amount of transaction, only integer                                                                                               | NO       |
| recipient | your customer phone number, valid format is **e164**                                                                              | NO       |
| reference | (string) The transaction reference, the value must be unique in your system, so that your data can be cross-referenced with ours. | NO       |
| note      | any description of the transaction                                                                                                | YES      |

### Customer Object

:::danger Customer
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

```json
{
  "transferMethod": "mobile_money",
  "mobileMoney": {
    "service": "PAYOUT_ORANGE_CI",
    "amount": 200,
    "reference": "{{ your reference }}",
    "recipient": "+225XXXXXXXXXX",
    "note": "{{ my note }}"
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

### Response

The response of a transfer transaction contains a `transfers` object, as in the example below.

```json
{
    "transfers": {
        "id": "tr_18b38c287e14cb29312f1597",
        "createdAt": "2023-10-16T13:52:34.829Z",
        "updatedAt": "2023-10-16T13:52:34.829Z",
        "status": "pending",
        "service": "PAYOUT_ORANGE_CI",
        "reference": "21eefddb-2175-4ffd-9b5b-552b980ab7f7",
        "destination": {
            "country": "CI",
            "recipient": "+225XXXXXXXXXX",
            "provider": "ORANGE"
        },
        "fees": {
            "currency": "XOF",
            "fee": 3,
            "amount": 200,
            "chargedAmount": 203
        }
    }
}
```

### Transfers Object

| Value       | description                                                         |
|-------------|---------------------------------------------------------------------|
| id          | The transaction id in our system                                    |
| createdAt   | The date the transaction was created                                |
| updatedAt   | The date the transaction was updated                                |
| status      | The status of the transaction, **eg: pending, failed or succeeded** |
| reference   | The reference you provided                                          |
| destination | Information about the recipient                                     |
| fees        | Billing information                                                 |

## Transfer status

```sh
GET https://api.novasend.app/v1.0/transfers/{transferId}
```
