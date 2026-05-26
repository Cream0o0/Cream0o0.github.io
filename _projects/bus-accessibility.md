---
layout: case-study
title: Bus Accessibility in Greater Melbourne
slug: bus-accessibility
summary: A spatial analysis of bus accessibility across residential areas in Greater Melbourne, measuring stop density, catchment coverage, and bus-poor zones using PostGIS and QGIS.
tldr: Loaded PTV GTFS and ABS Mesh Block data into a PostGIS environment, then built four analytical layers covering stop counts, density, 500 m walking catchments, and nearest-stop distances across 46,608 residential mesh blocks. Results confirmed that outer suburban growth corridors are significantly underserved relative to inner suburbs, with 12.7% of residential blocks classified as bus-poor.
year: 2024
order: 3
featured: true
tags: [Data]
stack: [PostgreSQL, PostGIS, Docker, DBeaver, SQL, GDAL, ogr2ogr, QGIS 3.34, PTV GTFS, ABS Mesh Block 2021]
role: Solo
timeline: 2 weeks
context: Monash MDS, FIT5137 Advanced Database
github: https://github.com/Cream0o0
thumbnail: /assets/images/melbourne-bus-heatmap.png
hero_image: /assets/images/melbourne-bus-heatmap.png
hero_caption: "STOP DENSITY HEATMAP · GREATER MELBOURNE RESIDENTIAL MESH BLOCKS · QGIS 3.34"
description: Spatial analysis of bus accessibility across Greater Melbourne using PostGIS, measuring stop density, 500m walking catchments, and bus-poor zones across 46,608 residential mesh blocks.
---

<div class="cs-section fade-in">
  <p class="cs-section__label">01 · APPROACH</p>
  <p class="cs-section__body">
    The PTV GTFS dataset (March 2023) and ABS Mesh Block 2021 shapefile were loaded into PostgreSQL with PostGIS inside a Docker container, managed via DBeaver. GTFS text files were imported using COPY with CSV headers; the shapefile was imported via ogr2ogr with SRID 7844 (GDA2020).
  </p>

  <div class="cs-hero-img fade-in" style="margin: 24px 0 8px;">
    <img src="{{ '/assets/images/gtfs-schema.png' | relative_url }}"
         alt="GTFS schema structure"
         onerror="this.parentElement.classList.add('cs-hero-img--placeholder'); this.remove();">
  </div>
  <p class="cs-hero-caption" style="margin-bottom: 32px;">FIG 02 · GTFS SCHEMA </p>

  <p class="cs-section__body">
    The analysis followed three stages. A Greater Melbourne residential subset was created by filtering mesh blocks on gcc_name21 = 'Greater Melbourne' and mb_cat21 = 'Residential'. Bus stops were extracted by joining stops, stop_times, trips, and routes tables, filtering for route_type = 3 (bus only), then clipped to the Melbourne boundary using ST_Intersects.
  </p>

  <div class="cs-hero-img fade-in" style="margin: 24px 0 8px;">
    <img src="{{ '/assets/images/abs-mesh-block-structure.png' | relative_url }}"
         alt="ABS Mesh Block structure"
         onerror="this.parentElement.classList.add('cs-hero-img--placeholder'); this.remove();">
  </div>
  <p class="cs-hero-caption" style="margin-bottom: 32px;">FIG 03 · ABS MESH BLOCK 2021 </p>

  <p class="cs-section__body">
    Four analytical layers were built: total bus stops within residential mesh blocks using ST_Within; stop density in stops per km² via area-based aggregation; a 500 m walking catchment buffer using ST_Buffer to classify blocks as well-served or bus-poor; and centroid-to-nearest-stop distances using ST_Distance with K-nearest-neighbour queries to identify blocks beyond 500 m. GiST indexes and ANALYZE commands were applied throughout. Results were visualised in QGIS 3.34 as a stop density heatmap and an accessibility coverage choropleth.
  </p>
</div>

<div class="cs-section fade-in">
  <p class="cs-section__label">02 · KEY DECISIONS</p>
  <div class="cs-decisions">
    <div class="cs-decision">
      <p class="cs-decision__title">Filter to bus only early in the pipeline</p>
      <p class="cs-decision__body">Filtering to route_type = 3 before any spatial joins eliminated tram and rail stops upfront, keeping the analysis focused on bus-only accessibility and reducing the working dataset size.</p>
    </div>
    <div class="cs-decision">
      <p class="cs-decision__title">500 m walking buffer threshold</p>
      <p class="cs-decision__body">The 500 m threshold reflects the standard distance used in transport planning to represent a comfortable 5 to 7 minute walk to the nearest stop. Using a recognised benchmark makes the bus-poor classification defensible rather than arbitrary.</p>
    </div>
    <div class="cs-decision">
      <p class="cs-decision__title">KNN ordering on GiST index over brute-force ST_Distance scan</p>
      <p class="cs-decision__body">Using ST_Centroid with CROSS JOIN LATERAL and KNN ordering made the nearest-stop calculation tractable at the scale of 46,608 residential mesh blocks. A brute-force scan across all stops would have been prohibitively slow.</p>
    </div>
    <div class="cs-decision">
      <p class="cs-decision__title">ST_UnaryUnion before spatial joins</p>
      <p class="cs-decision__body">Unifying the Melbourne boundary before spatial joins avoided redundant per-mesh-block intersections and reduced overall query cost across the full dataset.</p>
    </div>
  </div>
</div>

<div class="cs-section fade-in">
  <p class="cs-section__label">03 · OUTCOME</p>
  <div class="cs-metrics">
    <div class="cs-metric">
      <p class="cs-metric__label">BUS STOPS</p>
      <p class="cs-metric__value">20,452</p>
    </div>
    <div class="cs-metric">
      <p class="cs-metric__label">STOP DENSITY</p>
      <p class="cs-metric__value">6.33<span class="cs-metric__unit">/km²</span></p>
    </div>
    <div class="cs-metric">
      <p class="cs-metric__label">BUS-POOR BLOCKS</p>
      <p class="cs-metric__value">12.7<span class="cs-metric__unit">%</span></p>
    </div>
  </div>
  <p class="cs-section__body">
    87.3% of residential mesh blocks fall within 500 m of a bus stop. The remaining 12.7% (5,930 blocks) are classified as bus-poor. Worst-served regions: Melbourne West (962 bus-poor blocks), South East (948), and Mornington Peninsula (941). Best-served: Inner South (316 bus-poor blocks) and Inner East (548). The analysis confirmed that accessibility drops sharply in outer suburban growth corridors where transport infrastructure has not kept pace with population expansion.
  </p>
</div>
