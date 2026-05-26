---
layout: case-study
title: MonEquip Revenue Insights
slug: monequip
summary: "A data warehouse built in Oracle SQL that cleans transactional equipment sales and hire data, models it into a star schema, and surfaces revenue insights by season, branch, product category, and customer segment."
tldr: "Audited and cleaned eight dirty OLTP source tables, removing duplicate keys, orphaned foreign keys, impossible dates, and zero-quantity records, then recalculated miscalculated totals using documented business rules. Built a star schema with two separate fact tables at transaction-line grain and ran analytical queries surfacing $11.9M in total revenue with Spring as the peak season and Clayton as the top-performing branch."
year: 2025
order: 7
featured: false
tags: [Data, Business]
stack: [Oracle SQL, Oracle SQL Developer, Excel]
role: Solo
timeline: 2 weeks
context: Monash MDS, FIT5137 Advanced Database
github: https://github.com/Cream0o0/equip
thumbnail: /assets/images/monequip1.png
hero_image: /assets/images/monequip1.png
description: "Oracle SQL data warehouse with star schema design, systematic data cleaning pipeline, and revenue analytics across season, branch, product category, and customer segment."
---

<div class="cs-section fade-in">
  <p class="cs-section__label">01 · APPROACH</p>
  <p class="cs-section__body">
    The raw OLTP database contained dirty transactional data across eight source tables: duplicate primary keys, orphaned foreign keys, impossible date orders, zero-quantity records, and miscalculated price totals. These issues made reliable business reporting impossible. The work followed a structured pipeline across two phases: data cleaning and warehouse construction.
  </p>

  <div class="cs-hero-img fade-in" style="margin: 24px 0 8px;">
    <img src="{{ '/assets/images/monequip2.png' | relative_url }}"
         alt="Data wrangling pipeline"
         onerror="this.parentElement.classList.add('cs-hero-img--placeholder'); this.remove();">
  </div>
  <p class="cs-hero-caption" style="margin-bottom: 32px;">FIG 02 · DATA CLEANING PIPELINE </p>

  <p class="cs-section__body">
    The cleaning phase began with a full audit of row counts across all eight tables. Each issue was addressed in sequence. Duplicate primary keys were removed using ROWID-based deduplication. Orphaned foreign keys in the HIRE table were deleted to ensure every fact row could join correctly to its dimensions. Zero and negative quantity rows in SALES were removed as logically impossible. HIRE records where END_DATE preceded START_DATE were deleted because reversing or guessing at dates would introduce fabricated data. TOTAL_SALES_PRICE and TOTAL_HIRE_PRICE values that did not match their components were corrected via UPDATE rather than deleted, since the underlying data was valid and the mismatch was a calculation error.
  </p>

  <div class="cs-hero-img fade-in" style="margin: 24px 0 8px;">
    <img src="{{ '/assets/images/monequip3.png' | relative_url }}"
         alt="Star schema design"
         onerror="this.parentElement.classList.add('cs-hero-img--placeholder'); this.remove();">
  </div>
  <p class="cs-hero-caption" style="margin-bottom: 32px;">FIG 03 · STAR SCHEMA S</p>

  <p class="cs-section__body">
    The warehouse was designed as a star schema with two fact tables at transaction-line grain: SalesFACT and HireFACT. Both connect to six conformed dimensions: DateDIM (including a Season attribute), CustomerDIM, EquipmentDIM, CategoryDIM, BranchDIM, and a Sales-only PriceBandDIM. Dimension and fact tables were populated using INSERT...SELECT from the cleaned source. Analytical queries were run across the schema and findings were visualised in charts.
  </p>
</div>

<div class="cs-section fade-in">
  <p class="cs-section__label">02 · KEY DECISIONS</p>
  <div class="cs-decisions">
    <div class="cs-decision">
      <p class="cs-decision__title">Two separate fact tables over one combined table</p>
      <p class="cs-decision__body">Sales and hire transactions follow different business rules, carry different measures, and use different pricing logic. Combining them would have produced a wide, null-heavy table with unclear grain. Keeping them separate preserves analytical clarity.</p>
    </div>
    <div class="cs-decision">
      <p class="cs-decision__title">Delete when impossible, update when recalculable</p>
      <p class="cs-decision__body">The cleaning decision rule was consistent throughout: delete records only when the core facts cannot be safely corrected, but update when the business logic provides a clear recalculation path. Zero-quantity sales and reversed hire dates were deleted; miscalculated totals were updated.</p>
    </div>
    <div class="cs-decision">
      <p class="cs-decision__title">Season stored as a dimension attribute, not derived at query time</p>
      <p class="cs-decision__body">Storing Season directly in DateDIM avoids repeating a CASE expression across every seasonal analysis query and makes the dimension self-contained for business users running reports.</p>
    </div>
    <div class="cs-decision">
      <p class="cs-decision__title">PriceBandDIM attached to SalesFACT only</p>
      <p class="cs-decision__body">Hire transactions have no equivalent price banding concept in the source data. Adding PriceBandDIM to HireFACT would have been structurally misleading and inflated the schema unnecessarily.</p>
    </div>
  </div>
</div>

<div class="cs-section fade-in">
  <p class="cs-section__label">03 · OUTCOME</p>
  <div class="cs-metrics">
    <div class="cs-metric">
      <p class="cs-metric__label">TOTAL REVENUE</p>
      <p class="cs-metric__value">$11.9<span class="cs-metric__unit">M</span></p>
    </div>
    <div class="cs-metric">
      <p class="cs-metric__label">PEAK SEASON</p>
      <p class="cs-metric__value" style="font-size:20px;">Spring</p>
    </div>
    <div class="cs-metric">
      <p class="cs-metric__label">TOP BRANCH</p>
      <p class="cs-metric__value" style="font-size:20px;">Clayton</p>
    </div>
  </div>
  <p class="cs-section__body">
    The cleaned warehouse contained 151 rows in SalesFACT and 300 rows in HireFACT across 983 date dimension rows. Spring was the peak season at $3.75M, followed by Winter at $3.55M. The Clayton branch led at $2.82M, nearly double the second-ranked Parkville branch at $1.46M. Earthmoving was the leading product category at $2.07M. Sales contributed 97% of total revenue against 3% from hire, indicating hire services are significantly underutilised. Business customers generated approximately 58% of revenue.
  </p>
</div>
