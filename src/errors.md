# Errors

[[toc]]

When an API request cannot be completed successfully, the response body describes the failure and the HTTP status code tells you how to handle it.

Every error response includes a `correlationId`. Send this value to NovaSend support when you need help with a failed request. If the request contains `request-id`, `x-request-id`, or `x-idempotence-key`, that value is reused as the `correlationId`; otherwise the API generates one.

Business errors can also include a `causationId`, which identifies the exact internal error occurrence.

## Error response

```json
{
  "error": "Conflict",
  "statusCode": 409,
  "correlationId": "d84caf0f-0941-4998-8376-68c7c9ab7913",
  "causationId": "de0c0e48-b9bb-46d6-9b6e-341b7b687473",
  "message": "payment can not processed, recipient not match with selected service PAYIN_ORANGE_CI"
}
```

| Field | Description |
| --- | --- |
| `statusCode` | HTTP status code returned by the API. |
| `error` | Short HTTP error label, for example `Unauthorized`, `Forbidden`, `Not Found`, `Conflict`, or `Unprocessable Entity`. |
| `message` | Human-readable explanation. The language can change with the `Accept-Language` header when translation is available. |
| `correlationId` | Request tracking identifier. Keep it in your logs. |
| `causationId` | Business error tracking identifier. It is present only on domain/business errors. |
| `subErrors` | Validation details. It is present only on validation errors. |

## HTTP status codes

| Status | Error | When it can happen |
| --- | --- | --- |
| `400` | `Bad Request` | The request is syntactically valid JSON but cannot be accepted for the requested action. |
| `401` | `Unauthorized` | Missing token, invalid token format, expired/unknown token, invalid internal API key, or environment mismatch. |
| `403` | `Forbidden` | The company, wallet, payment intent, payment, transfer, or transaction state does not authorize the operation. |
| `404` | `Not Found` | The requested resource or referenced business object does not exist. |
| `409` | `Conflict` | Duplicate reference/idempotence key, amount outside allowed limits, already existing subscription, or payment/transfer that cannot be processed. |
| `422` | `Unprocessable Entity` | Request body validation failed. |
| `429` | `Too Many Requests` | Too many requests were sent in a short period of time. Retry later. |
| `500` | `Internal Server Error` | Unexpected internal failure. Retry only if the operation is safe to repeat, and contact support with the `correlationId` if it persists. |

## Authentication errors

Requests protected with Bearer authentication return `401` when the `Authorization` header is missing, not using `Bearer`, using an invalid token prefix, or when the token does not match an active company.

```json
{
  "statusCode": 401,
  "message": "unauthenticated",
  "error": "Unauthorized",
  "correlationId": "dd2d2d17-4ea3-4e45-bd3e-994b949ccb5c"
}
```

## Validation errors

Validation errors return `422` with `subErrors`. These errors are usually caused by missing required fields, invalid service identifiers, invalid URLs, invalid phone numbers, non-positive amounts, or invalid enum values such as `paymentMethod` or `transferMethod`.

```json
{
  "statusCode": 422,
  "message": "Validation error",
  "error": "Unprocessable Entity",
  "subErrors": [
    "mobileMoney.amount must be a positive number",
    "mobileMoney.recipient must be a valid phone number"
  ],
  "correlationId": "7a00d969-c5dd-4d80-a445-5939ed13c03d"
}
```

## Business error catalogue

The table below lists the business error codes currently mapped by the public API error handler. Some API responses expose only the HTTP `statusCode`, `error`, `message`, `correlationId`, and `causationId`; keep the `correlationId` and the request payload in your logs so support can match the response to the internal code.

| HTTP status | Reference code | Meaning |
| --- | --- | --- |
| `400` | `PAYMENT.NOT_MATCH` | The payment does not match the expected transaction or provider context. |
| `401` | `GENERIC.UNAUTHENTICATED` | The request is not authenticated. |
| `403` | `WALLET.BALANCE_REACH_LIMIT` | The wallet balance limit has been reached. |
| `403` | `WALLET.NOT_ENOUGH_FUND` | The wallet does not have enough available funds. |
| `403` | `TRANSACTION.NOT_PENDING` | The transaction is no longer pending, so the operation is not allowed. |
| `403` | `TRANSACTION.NOT_MATCH` | The transaction does not match the expected payment or transfer. |
| `403` | `PAYMENT.INVALID_STATUS` | The payment is not in the status required for the operation. |
| `403` | `PAYMENT_INTENT.NOT_INITIATED` | The payment intent has not been initiated. |
| `403` | `PAYMENT_INTENT.EXPIRED` | The payment intent has expired. |
| `404` | `SERVICE.NOT_EXIST` | The selected service does not exist or is not available. |
| `404` | `WALLET.NOT_EXIST` | The wallet does not exist. |
| `404` | `TRANSFER.NOT_EXIST` | The transfer does not exist. |
| `404` | `PAYMENT.NOT_EXIST` | The payment does not exist. |
| `404` | `TRANSACTION.NOT_EXIST` | The transaction does not exist. |
| `404` | `WEBHOOK_SUBSCRIPTION.NOT_EXIST` | The webhook subscription does not exist. |
| `404` | `PAYMENT_INTENT.NOT_EXIST` | The payment intent does not exist. |
| `409` | `TRANSFER.DUPLICATE` | A transfer already exists for the same idempotence key or reference. |
| `409` | `PAYMENT.DUPLICATE` | A payment already exists for the same idempotence key or reference. |
| `409` | `TRANSFER.AMOUNT_NOT_CORRECT` | The transfer amount is outside the allowed service limits. |
| `409` | `PAYMENT.AMOUNT_NOT_CORRECT` | The payment amount is outside the allowed service limits. |
| `409` | `WEBHOOK_SUBSCRIPTION.ALREADY_EXIST` | A webhook subscription already exists for the same company and environment. |
| `409` | `PAYMENT_INTENT.EXIST` | A payment intent already exists for the same reference. |
| `409` | `PAYMENT.CAN_NOT_PROCESS` | The payment cannot be processed with the selected service, provider, market, phone number, or payment method. |
| `409` | `TRANSFER.CAN_NOT_PROCESS` | The transfer cannot be processed with the selected service, provider, market, phone number, wallet, or transfer method. |
| `409` | `GENERIC.CONFLICT` | The request conflicts with the current state of the resource. |

## Integration guidance

Use the HTTP status code first when deciding how to react:

| Status family | Recommended handling |
| --- | --- |
| `400` / `422` | Fix the request payload before retrying. |
| `401` | Regenerate or correct the API token, then retry. |
| `403` | Do not retry automatically. The account, wallet, transaction, payment, or payment intent state must change first. |
| `404` | Verify the identifier, environment, service, or resource ownership. |
| `409` | Check idempotency, duplicate references, service limits, selected provider, and current transaction state before retrying. |
| `429` | Retry after a delay with backoff. |
| `500` | Retry only when the operation is idempotent, then contact support with the `correlationId` if the error continues. |
