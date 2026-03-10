# Cloudflare Secure Worker Project

## Overview
This project demonstrates a secure web architecture using Cloudflare services and AWS infrastructure.

The system integrates:
- AWS EC2 Web Server
- Nginx Reverse Proxy
- Cloudflare DNS & WAF
- Cloudflare Zero Trust Access
- Cloudflare Workers
- Cloudflare R2 Storage

The Worker endpoint returns authenticated user identity information.

---

## Architecture

User → Cloudflare DNS → Cloudflare WAF → Zero Trust Access → Worker → R2 Bucket → Response

---

## Secure Endpoint

/secure

Example response:

kahkhee2202@gmail.com authenticated at 2026-03-08 from MY

The country code links to:

/secure/MY

which returns the country flag stored in an R2 bucket.

---

## Technologies Used

- AWS EC2
- Nginx
- Cloudflare DNS
- Cloudflare Workers
- Cloudflare R2
- Cloudflare Zero Trust
- Wrangler CLI

---

## Security Features

- Cloudflare WAF protection
- Cloudflare Zero Trust authentication
- HTTPS encryption
- Identity headers verification
- Private R2 storage access

---

## Cloudflare Headers Used

The Worker reads identity information from request headers:

- cf-access-authenticated-user-email
- cf-ipcountry
- cf-ray
- cf-connecting-ip

---

## Deployment

Worker deployed using Wrangler CLI:

