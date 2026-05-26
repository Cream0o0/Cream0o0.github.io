---
layout: case-study
title: Bayesian Fraud Detection
slug: fraud-detection
summary: A probabilistic network that estimates credit card fraud likelihood from indirect signals and recommends whether to block or process a transaction based on expected financial utility.
tldr: Designed a six-node Bayesian Decision Network in Netica from scratch, calculating conditional probabilities and asymmetric utility values by hand. Prior fraud probability of 0.43% rises to 1.50% after observing a foreign purchase with no internet purchase, flipping the optimal decision from process to block. Value of Perfect Information analysis confirmed that calling the customer to verify travel status is worth doing.
year: 2024
order: 2
featured: true
tags: [ML, Data]
stack: [Netica, Bayesian Networks, Probability Theory, Decision Theory, Expected Utility]
role: Solo
timeline: 2 weeks
context: Monash MDS, FIT5047 Fundamentals of artificial intelligence
github: https://github.com/Cream0o0
thumbnail: /assets/images/fraud-detection-hero.png
hero_image: /assets/images/fraud-detection-hero.png
hero_caption: "BAYESIAN DECISION NETWORK · SIX-NODE STRUCTURE · NETICA"
description: Bayesian Decision Network for credit card fraud detection using conditional probability, asymmetric utility values, and Value of Perfect Information analysis.
---

<div class="cs-section fade-in">
  <p class="cs-section__label">01 · APPROACH</p>
  <p class="cs-section__body">
    Fraud cannot be directly observed in real time. The system reasons backwards from indirect signals: whether a purchase was foreign, made online, or accompanied by computer-related accessory purchases. Each signal updates the fraud estimate, and the network recommends whether to block or process the transaction accordingly.
  </p>
  <p class="cs-section__body">
    The network was built in Netica with six binary chance nodes: Trav (travelling), OC (owns computer), Fraud, FP (foreign purchase), IP (internet purchase), and CRP (computer-related purchase). Conditional probability tables were specified manually from the problem domain. The prior probability of fraud was derived using the law of total probability across Trav states, giving P(Fraud) = 0.43%.
  </p>
  <p class="cs-section__body">
    The network was then extended into a decision network by adding a decision node B (block or process) and a utility node encoding asymmetric payoffs: processing a fraudulent transaction costs $1,000, blocking a legitimate one costs $10, and processing a legitimate one earns $5. Expected utilities were calculated by hand for both actions under different evidence states.
  </p>
</div>

<div class="cs-section fade-in">
  <p class="cs-section__label">02 · KEY DECISIONS</p>
  <div class="cs-decisions">
    <div class="cs-decision">
      <p class="cs-decision__title">Transparent probability updates over a black-box classifier</p>
      <p class="cs-decision__body">Computing P(Fraud) before any evidence and tracking how each observation updates it makes the network's reasoning auditable. In a financial context, decisions need to be explainable, not just accurate.</p>
    </div>
    <div class="cs-decision">
      <p class="cs-decision__title">Asymmetric utility values</p>
      <p class="cs-decision__body">Setting a $1,000 loss for missed fraud against a $10 cost for a blocked legitimate transaction reflects the real cost imbalance in fraud detection. This drives the decision node to be conservative even at low fraud probabilities.</p>
    </div>
    <div class="cs-decision">
      <p class="cs-decision__title">Value of Perfect Information to justify calling the customer</p>
      <p class="cs-decision__body">Rather than deciding intuitively whether to call the customer to verify travel status, VPI was calculated formally. A positive result of 4.07 confirms it is financially worth doing before making a final block or process decision.</p>
    </div>
  </div>
</div>

<div class="cs-section fade-in">
  <p class="cs-section__label">03 · OUTCOME</p>
  <div class="cs-metrics">
    <div class="cs-metric">
      <p class="cs-metric__label">PRIOR P(FRAUD)</p>
      <p class="cs-metric__value">0.43<span class="cs-metric__unit">%</span></p>
    </div>
    <div class="cs-metric">
      <p class="cs-metric__label">POSTERIOR P(FRAUD)</p>
      <p class="cs-metric__value">1.50<span class="cs-metric__unit">%</span></p>
    </div>
    <div class="cs-metric">
      <p class="cs-metric__label">VPI (TRAVEL)</p>
      <p class="cs-metric__value">4.07</p>
    </div>
  </div>
  <p class="cs-section__body">
    After observing a foreign purchase with no internet purchase and a computer-related accessory purchase, fraud probability rises from 0.43% to 1.50% and the optimal decision flips from process to block. The Value of Perfect Information for travelling status confirms that contacting the customer before making a final decision is justified on financial grounds alone.
  </p>
</div>
