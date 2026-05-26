---
layout: case-study
title: ClassPlanner
slug: classplanner
summary: A college management web app built with Django, letting teachers enter attendance and marks, students view academic records, and administrators manage the full university database across three distinct role-based interfaces.
tldr: Rebuilt a university ERP from scratch after structured stakeholder interviews identified real pain points in the existing system. Three user roles with separate permission scopes, dynamic timetable generation, colour-coded attendance tracking, and a free teachers lookup for leave replacement. All three testing phases passed including acceptance testing with a faculty reviewer.
year: 2022
order: 6
featured: false
tags: [SE]
stack: [Python, Django, SQLite, HTML, CSS, Bootstrap, SCSS, JavaScript]
role: Team of 4, full-stack contribution
timeline: 2 months
context: KMITL, Bachelor of Software Engineering
github: https://github.com/Cream0o0/Kmitl-Planner
thumbnail: /assets/images/planner.png
hero_image: /assets/images/planner.png
hero_caption: "CLASSPLANNER · DJANGO WEB APP · THREE ROLE-BASED INTERFACES"
description: Full-stack Django college management system with role-based access for students, teachers, and administrators, built from stakeholder requirements at KMITL.
---

<div class="cs-section fade-in">
  <p class="cs-section__label">01 · APPROACH</p>
  <p class="cs-section__body">
    Requirements were gathered through structured interviews with three stakeholder groups: teaching staff, students, and the administrator. Conflicting requirements were negotiated and documented in a full software requirements specification before any code was written. For example, students requested an attendance appeal mechanism but teachers opposed it as unworkable in practice, so it was dropped from scope.
  </p>
  <p class="cs-section__body">
    Three distinct user roles were implemented in Django with separate views and permission scopes enforced at the model level. Students see attendance percentages per course colour-coded by threshold (red below 75%, green above), a day-wise calendar attendance detail view, marks across 3 internal assessments and 1 semester end exam, and an auto-generated timetable pulled from the Assign table. Teachers get attendance entry with a radio-button interface, extra class entry, individual attendance editing, marks entry, a free teachers lookup per time slot, and a CIE report. Administrators get a modular interface with search and filter across all database tables.
  </p>
  <p class="cs-section__body">
    Testing covered three methods: Django unit tests for all models and key views, black box test cases for all teacher-facing pages, and acceptance testing with a faculty member who reviewed the full system.
  </p>
</div>

<div class="cs-section fade-in">
  <p class="cs-section__label">02 · KEY DECISIONS</p>
  <div class="cs-decisions">
    <div class="cs-decision">
      <p class="cs-decision__title">Default attendance radio buttons to present, not absent</p>
      <p class="cs-decision__body">In a class of 40 students, a teacher typically marks 2 to 5 absent, not 35 as present. Flipping the default meant teachers only touch the exceptions, which is significantly faster in practice and was identified directly from teacher interviews.</p>
    </div>
    <div class="cs-decision">
      <p class="cs-decision__title">Timetable generated dynamically from the Assign table</p>
      <p class="cs-decision__body">Any change to class or teacher assignments is immediately reflected in every timetable view without a separate update step. Storing timetables as static records would have required manual sync every time an assignment changed.</p>
    </div>
    <div class="cs-decision">
      <p class="cs-decision__title">Free teachers lookup built directly from requirements</p>
      <p class="cs-decision__body">Leave replacement was a specific pain point identified in stakeholder interviews. A teacher on leave opens their timetable, clicks a time slot, and immediately sees which colleagues teach the same class and are free at that time.</p>
    </div>
    <div class="cs-decision">
      <p class="cs-decision__title">Scope negotiation on social features</p>
      <p class="cs-decision__body">Students requested a full social media feed. This was out of scope for a 4-person team within the project timeline, so it was negotiated down to a minimal communication layer and agreed with all stakeholders before development started.</p>
    </div>
  </div>
</div>

<div class="cs-section fade-in">
  <p class="cs-section__label">03 · OUTCOME</p>
  <div class="cs-metrics">
    <div class="cs-metric">
      <p class="cs-metric__label">DB MODELS TESTED</p>
      <p class="cs-metric__value">8</p>
    </div>
    <div class="cs-metric">
      <p class="cs-metric__label">BLACK BOX CASES</p>
      <p class="cs-metric__value">8</p>
    </div>
    <div class="cs-metric">
      <p class="cs-metric__label">ACCEPTANCE</p>
      <p class="cs-metric__value" style="font-size:20px;">Passed</p>
    </div>
  </div>
  <p class="cs-section__body">
    All three testing phases passed. Django unit tests covered model creation for all 8 database models and key view behaviour including role-based access control, attendance display, and marks display. Eight black box test cases covered the full teacher workflow. Acceptance testing was completed with Dr. Trisiladevi C. Nagavi, who reviewed all features and approved the outcome.
  </p>
</div>
