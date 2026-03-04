# Wallet

[[toc]]

To make transactions, you need to create wallets. We have two types of **wallet**, one for `transfers` and one for `payments`.

In principle, wallets are created by default, but this may not be the case for your account. There is a button to do this when you log in to your merchant interface.

![Create Wallet](./img/create_wallet.png)

All you have to do is fill the form and you're all set.

![Create Wallet Form](./img/create_wallet_form.png)

### List

You have an endpoint that allows to return a list of y'all wallets

```sh
GET https://api.novasend.app/v1.0/wallets
```

```http request
GET /v1.0/wallets HTTP/1.1
Host: api.novasend.app
Accept: application/json
Content-Type: application/json
Accept-Encoding: gzip
Accept-Language: fr
Authorization: Bearer bui_sandbox_ACLw58qXqjMMI2ukkBnuCh4XXXXXXXXX
```

```json
[
  {
    "id": "wt_8601300d5198ac0a",
    "createdAt": "2023-10-24T17:03:20.454Z",
    "updatedAt": "2023-10-24T17:03:20.454Z",
    "balance": "300",
    "status": "activated",
    "type": "payment"
  },
  {
    "id": "wt_8601300d5198acf8",
    "createdAt": "2023-10-24T17:03:20.454Z",
    "updatedAt": "2023-10-24T17:03:20.454Z",
    "balance": "84900",
    "status": "activated",
    "type": "transfer"
  }
]
```

## Payin

```sh
GET https://api.novasend.app/v1.0/wallets/payin
```

```http request
GET /v1.0/wallets/payin HTTP/1.1
Host: api.novasend.app
Accept: application/json
Content-Type: application/json
Accept-Encoding: gzip
Accept-Language: fr
Authorization: Bearer bui_sandbox_ACLw58qXqjMMI2ukkBnuCh4XXXXXXXXX
```

```json
{
  "id": "wt_8601300d5198ac0a",
  "createdAt": "2023-10-24T17:03:20.454Z",
  "updatedAt": "2023-10-24T17:03:20.454Z",
  "balance": "300",
  "status": "activated",
  "type": "payment"
}
```

## Payout

```sh
GET https://api.novasend.app/v1.0/wallets/payout
```

```http request
GET /v1.0/wallets/payout HTTP/1.1
Host: api.novasend.app
Accept: application/json
Content-Type: application/json
Accept-Encoding: gzip
Accept-Language: fr
Authorization: Bearer bui_sandbox_ACLw58qXqjMMI2ukkBnuCh4XXXXXXXXX
```

```json
{
  "id": "wt_8601300d5198acf8",
  "createdAt": "2023-10-24T17:03:20.454Z",
  "updatedAt": "2023-10-24T17:03:20.454Z",
  "balance": "84900",
  "status": "activated",
  "type": "transfer"
}
```