---
layout: case-study
title: Meekor
slug: meekor
summary: A LINE chatbot-integrated bill splitting app for groups of friends in Thailand, with item-level cost assignment, PromptPay QR payment, and automated daily reminders pushed to LINE group chats.
tldr: Built a full-stack bill splitting system where groups create shared bills, assign individual line items to specific members, generate PromptPay QR codes for payment, and receive automated daily reminders in their LINE group chat. The entire pipeline from bill creation through to payment confirmation works end to end without leaving LINE.
year: 2023
order: 4
featured: true
tags: [SE, Data]
stack: [TypeScript, Node.js, Express, Prisma ORM, PostgreSQL, LINE Bot SDK, PromptPay QR, Azure Blob Storage, Docker, Docker Compose, GitHub Actions, node-cron, React]
role: Team of 4
timeline: 3 months
context: Personal project, built for everyday use in Thailand
github: https://github.com/Cream0o0/Meekor
thumbnail: /assets/images/line.png
hero_image: /assets/images/line.png
hero_caption: "MEEKOR · LINE FLEX MESSAGE CARD · BILL REMINDER PUSHED TO GROUP CHAT"
description: LINE chatbot bill splitting app with PromptPay QR payment, item-level debt tracking, and automated daily reminders for groups in Thailand.
---

<div class="cs-section fade-in">
  <p class="cs-section__label">01 · APPROACH</p>
  <p class="cs-section__body">
    Splitting bills among friends in Thailand typically happens over LINE chat: someone posts a total, people reply with amounts, and follow-ups get lost in the conversation. Meekor automates the entire flow inside LINE itself, so groups never need to open a separate app.
  </p>
  <p class="cs-section__body">
    The backend is a TypeScript and Express REST API with Prisma ORM connected to PostgreSQL. The data model was built around six core entities: Groups (mapped to LINE group chats), Users, Bills, Items (individual line items assignable to specific members), Debts (per-user amounts owed per bill), and Payments (PromptPay QR code and bank account details). A Monthly model was also built to support recurring bills.
  </p>
  <p class="cs-section__body">
    The LINE Bot SDK handles inbound events from LINE and outbound Flex Message cards pushed to group chats. A node-cron job scans all open bills daily at noon, groups unpaid debts by LINE group, and pushes a formatted reminder card in Thai to each affected group with a payment button linking directly to the payment flow. PromptPay QR codes are generated server-side and stored against each Payment record. Azure Blob Storage handles payment slip image uploads as proof of transfer. The backend is containerised with Docker and Docker Compose, with GitHub Actions handling CI/CD.
  </p>
</div>

<div class="cs-section fade-in">
  <p class="cs-section__label">02 · KEY DECISIONS</p>
  <div class="cs-decisions">
    <div class="cs-decision">
      <p class="cs-decision__title">LINE as the delivery channel, not a standalone app</p>
      <p class="cs-decision__body">LINE has near-universal adoption in Thailand, so groups needed to download nothing new. The bot pushes reminders directly into existing group chats where the original bill conversation happened, keeping friction at zero.</p>
    </div>
    <div class="cs-decision">
      <p class="cs-decision__title">Server-side PromptPay QR generation</p>
      <p class="cs-decision__body">Generating QR codes server-side kept payment details consistent and auditable. Each Payment record stores the account number, account name, and pre-generated QR, so every group member scans the same code rather than manually entering bank details.</p>
    </div>
    <div class="cs-decision">
      <p class="cs-decision__title">Item-level debt assignment over total bill splitting</p>
      <p class="cs-decision__body">Tracking debts at the item level meant the app handles unequal splits naturally, for example where only some people ordered a particular dish. Splitting the total evenly would have been simpler to build but less useful in practice.</p>
    </div>
    <div class="cs-decision">
      <p class="cs-decision__title">One reminder per group per day</p>
      <p class="cs-decision__body">The cron job pushes one consolidated reminder per group rather than one per outstanding debt. This avoids flooding group chats with multiple notifications when several members have unpaid items on the same bill.</p>
    </div>
  </div>
</div>

<div class="cs-section fade-in">
  <p class="cs-section__label">03 · OUTCOME</p>
  <div class="cs-metrics">
    <div class="cs-metric">
      <p class="cs-metric__label">PIPELINE</p>
      <p class="cs-metric__value" style="font-size:20px;">End to end</p>
    </div>
    <div class="cs-metric">
      <p class="cs-metric__label">TIMELINE</p>
      <p class="cs-metric__value">3<span class="cs-metric__unit">mo</span></p>
    </div>
    <div class="cs-metric">
      <p class="cs-metric__label">STATUS</p>
      <p class="cs-metric__value" style="font-size:20px;">Completed</p>
    </div>
  </div>
  <p class="cs-section__body">
    The full bill creation, item splitting, PromptPay payment, slip upload, and LINE reminder pipeline reached a working state end to end. Built as a practical tool for everyday use among friends in Thailand. The project is no longer live.
  </p>
</div>
