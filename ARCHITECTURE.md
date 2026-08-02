# Node.js Load Balancer

## Overview

This project is a production-inspired Layer 7 HTTP Load Balancer built using Node.js.

The objective is to understand how real load balancers like NGINX, HAProxy and AWS ALB work internally by implementing each feature from scratch.

Current Features

- Reverse Proxy
- Round Robin Load Balancing
- Passive Health Checks
- Active Health Checks
- Winston Logging

---

# Project Structure

loadbalancer/
│
├── nodeBalancer.js
├── serverList.js
├── healthChecker.js
├── logger.js
├── logs/
└── README.md

---

# File Responsibilities

## nodeBalancer.js

Purpose

Acts as the entry point of the application.

Responsibilities

- Accept incoming HTTP requests.
- Select an appropriate backend server.
- Skip unhealthy servers.
- Forward the request using Axios.
- Return the backend response to the client.

This file is intentionally responsible only for routing requests.
Health monitoring is delegated to healthChecker.js.

---

## serverList.js

Purpose

Stores runtime information about backend servers.

Example

{
    id,
    url,
    healthy,
    activeConnections,
    weight
}

Field Description

id
Unique identifier.

url
Backend server URL.

healthy
Maintained by Active Health Checker.

activeConnections
Used by Least Connections Algorithm.

weight
Used by Weighted Round Robin.

serverList.js acts as the shared state of the application.

Every module imports this same object.

---

## healthChecker.js

Purpose

Continuously monitors backend health.

Algorithm

Every 5 seconds

↓

Iterate through every backend server

↓

Call

GET /health

↓

If request succeeds

healthy = true

↓

Else

healthy = false

This algorithm allows failed servers to automatically rejoin the load balancer after recovery.

---

## logger.js

Purpose

Centralized logging.

Uses Winston.

Responsibilities

- Timestamp every log
- Store logs in logs/app.log
- Maintain consistent log format

Future Improvements

- Daily log rotation
- JSON logs
- Console transport
- Cloud logging

---

# Algorithms

## Reverse Proxy

Problem

Clients should communicate with only one endpoint.

Solution

The load balancer receives every request and forwards it to a backend server.

Client

↓

Load Balancer

↓

Backend

Benefits

- Hide backend servers
- Centralized routing
- Security
- Scaling

---

## Round Robin

Problem

Distribute requests evenly.

Algorithm

Maintain currentServer index.

Request arrives

↓

Send request to currentServer

↓

currentServer++

↓

currentServer %= servers.length

Time Complexity

O(1)

Advantages

Simple

Distributes traffic evenly.

Limitations

Does not consider server load.

---

## Passive Health Checks

Problem

Avoid repeatedly sending requests to dead servers.

Algorithm

Backend request fails

↓

Catch exception

↓

healthy = false

Limitation

Requires a user request before detecting failure.

---

## Active Health Checks

Problem

Detect failures before users experience them.

Algorithm

Every 5 seconds

↓

Call

GET /health

↓

Success

healthy = true

Failure

healthy = false

Advantages

Automatic recovery

No user request required

Improved availability

---

# Logging

Current Format

YYYY-MM-DD HH:mm:ss.SSS [INFO] Message

Example

2026-08-02 19:15:11.532
[INFO]
Server 2 recovered

---

# Current Architecture

                Client
                   │
                   ▼
          nodeBalancer.js
                   │
                   ▼
            serverList.js
           ▲             ▲
           │             │
           │             │
healthChecker.js     logger.js
           │
           ▼
     Backend Servers

---

# Version History

v1.0.0

- Reverse Proxy
- Round Robin

v1.1.0

- Passive Health Checks

v1.2.0

- Active Health Checks
- Winston Logging

Upcoming

v1.3.0

Least Connections

v1.4.0

Weighted Round Robin

v1.5.0

Sticky Sessions

v2.0.0

Docker
Metrics
Prometheus
Grafana
Redis