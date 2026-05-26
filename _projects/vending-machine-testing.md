---
layout: case-study
title: Model-Based Testing for a Vending Machine
slug: vending-machine-testing
summary: A model-based automated test suite for a web-based vending machine system, using GraphWalker to generate test paths from a finite state machine and Selenium WebDriver to execute them against a live browser.
tldr: Modelled the vending machine as a finite state machine in GraphWalker with explicit error states as first-class coverage targets, then generated test paths automatically using EdgeCoverage(100) as the stopping condition. All tests passed against the live system with 100% edge coverage across both model versions, including payment errors, order limits, and collection timeouts.
year: 2023
order: 5
featured: false
tags: [SE]
stack: [Java, GraphWalker 4.3.1, Selenium WebDriver, ChromeDriver, WebDriverManager, JUnit 5, Maven, GitHub Actions]
role: Solo
timeline: 2 weeks
context: KMITL, Bachelor of Software Engineering
github: https://github.com/Cream0o0/Model-Based-Automated-Testing-for-Vending-Machine-System-Selenium-GraphWalker
thumbnail: /assets/images/vending.png
hero_image: /assets/images/vending.png
hero_caption: "FINITE STATE MACHINE MODEL · GRAPHWALKER STUDIO · VENDING MACHINE V2"
description: Model-based automated test suite for a vending machine system using GraphWalker state machine modelling and Selenium WebDriver execution with 100% edge coverage.
---

<div class="cs-section fade-in">
  <p class="cs-section__label">01 · APPROACH</p>
  <p class="cs-section__body">
    Writing test cases manually for a stateful UI like a vending machine is both tedious and incomplete. Human testers tend to miss edge cases: payment errors, order limits, collection timeouts. Model-based testing solves this by defining the system's states and transitions as a graph, then letting GraphWalker automatically generate paths that achieve full edge coverage, including paths no human would think to write manually.
  </p>
  <p class="cs-section__body">
    The vending machine's behaviour was modelled as a finite state machine with states including WELCOME, ORDERING, CONFIRMING, PAYING, COLLECTING, and three explicit error states: ERROR_ORDER, ERROR_PAY, and ERROR_COLLECT. This model was defined in JSON and visualised in GraphWalker Studio.
  </p>
  <p class="cs-section__body">
    The VendingMachineAdapter class implements each state and transition as annotated Java methods. Vertices contain assertions that verify the UI is in the correct state; edges contain Selenium actions: clicks, form inputs, and explicit waits. The payError edge submits blank credit card fields to simulate a payment failure. The test runner uses GraphWalker's RandomPath generator with EdgeCoverage(100) as the stopping condition, walking the model until every transition has been exercised at least once. Two model versions were produced: V1 covering the happy path and V2 extending it with additional error handling paths.
  </p>
</div>

<div class="cs-section fade-in">
  <p class="cs-section__label">02 · KEY DECISIONS</p>
  <div class="cs-decisions">
    <div class="cs-decision">
      <p class="cs-decision__title">EdgeCoverage(100) as the stopping condition</p>
      <p class="cs-decision__body">Every transition in the model is exercised at least once, including error paths that are easy to skip in manual testing. The RandomPath generator also means test paths vary between runs, making the suite more likely to catch ordering-dependent bugs over time.</p>
    </div>
    <div class="cs-decision">
      <p class="cs-decision__title">Error states as explicit vertices, not inline checks</p>
      <p class="cs-decision__body">Modelling ERROR_ORDER, ERROR_PAY, and ERROR_COLLECT as first-class vertices meant GraphWalker planned paths through them as required coverage targets rather than treating them as optional branches.</p>
    </div>
    <div class="cs-decision">
      <p class="cs-decision__title">Two model versions built incrementally</p>
      <p class="cs-decision__body">V1 established the basic happy path and V2 extended it with error branches. Building incrementally allowed the model itself to be validated before the full test suite ran, catching modelling errors early.</p>
    </div>
  </div>
</div>

<div class="cs-section fade-in">
  <p class="cs-section__label">03 · OUTCOME</p>
  <div class="cs-metrics">
    <div class="cs-metric">
      <p class="cs-metric__label">EDGE COVERAGE</p>
      <p class="cs-metric__value">100<span class="cs-metric__unit">%</span></p>
    </div>
    <div class="cs-metric">
      <p class="cs-metric__label">MODEL VERSIONS</p>
      <p class="cs-metric__value">2</p>
    </div>
    <div class="cs-metric">
      <p class="cs-metric__label">TEST RESULT</p>
      <p class="cs-metric__value" style="font-size:20px;">All pass</p>
    </div>
  </div>
  <p class="cs-section__body">
    All tests passed against the live vending machine deployed at fekmitl.pythonanywhere.com, with 100% edge coverage achieved across both model versions including all three error state paths.
  </p>
</div>
