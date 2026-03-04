# Changelog

[[toc]]

## [v1.0](https://doc.novasend.app) (2023-10-24)

:::info NOTE
It is now possible to send customer information. This information is mandatory and will enable us to improve our fraud detection service. You must provide the lastname, firstname, email and phone number.

**NB**: The phone number must be in `E164` format.

```json
{
  ...
  "customer": {
    "firstname": "{{ customer firstname }}",
    "lastname": "{{ customer lastname }}",
    "email": "{{ customer email }}",
    "externalId": "{{ customer externalId }}",
    "phoneNumber": "{{ customer phoneNumber }}"
  }
}
```
:::