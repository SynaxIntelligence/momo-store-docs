---
title: Требования (SRS)
weight: 10
prev: /docs/getting-started
sidebar:
open: true
headless: true
---




Services:
1. User can load stock data in files (file loader (xlsx) service)
    - validation against a set of rules (defined in persistence or passed as an xlsx file)
    - enrichment with directory info
    - load into the central stock data DB
2. User can search stock by parameters (via UI)
   The result is displayed in a grid with search / sort / filter
3. User can search similar stock positions (analogues) - the search is done by certain algorithms
   The result is displayed in a grid with search / sort / filter

Suggested architecture: Microservice
Stack: React + Go (UI + backend)
Persistence: PG + CH
Cache: Redis / Redis Streams
Broker: Kafka
