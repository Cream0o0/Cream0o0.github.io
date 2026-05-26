---
layout: case-study
title: Pac-Man Search Strategies
slug: pacman
summary: "Two AI search agents implemented in a simulated Pac-Man environment, a greedy BFS agent for multi-food collection and an alpha-beta pruning adversarial agent for playing against ghost opponents."
tldr: "Built and compared three versions of a food collection agent and three versions of an adversarial agent. The final BFS agent scored 6.97 out of 10 across evaluation instances. The final adversarial agent scored 16.75, a 38.9% improvement over the baseline, driven primarily by a custom evaluation function with separate weights for active and scared ghosts."
year: 2025
order: 8
featured: false
tags: [ML]
stack: [Python, NumPy, SciPy, BFS, Alpha-Beta Pruning, Minimax Search, Git]
role: Solo
timeline: 2 to 3 weeks
context: Monash MDS, FIT5047 Intelligent Systems
github: https://github.com/Cream0o0/pacman
thumbnail: /assets/images/pacman.png
hero_image: /assets/images/pacman.png
description: AI search agents for Pac-Man using greedy BFS for food collection and alpha-beta pruning minimax for adversarial ghost play, with custom evaluation function design.
---

<div class="cs-section fade-in">
  <p class="cs-section__label">01 · APPROACH</p>
  <p class="cs-section__body">
    The assignment covered two distinct problems. The first was single-agent planning: collect as many food dots as possible before the clock runs out. The second was adversarial game-playing: balance food collection with ghost avoidance in a live multi-agent environment.
  </p>
  <p class="cs-section__body">
    For food collection, three versions were developed and compared. Version 1 used greedy nearest-food BFS: at each step, Pac-Man ran BFS to find the closest remaining dot, followed that path, and replanned once it was eaten. Version 2 attempted cluster-aware targeting, scoring candidate positions by distance and local food density to favour groups over isolated dots. Version 3 refined the cluster approach with BFS expansion caps and a minimum score gap before switching targets. After testing across multiple layouts, Version 1 was selected as the final submission because it outperformed both cluster variants in average score and was the most stable under the 10-second timeout.
  </p>
  <p class="cs-section__body">
    For adversarial play, Pac-Man was modelled as a MAX player and each ghost as a MIN player within a minimax tree, with alpha-beta pruning applied to reduce evaluated nodes. Three versions were developed. Version 1 used the default evaluation function and produced weak play. Version 2 introduced a custom evaluation function with weighted features: proximity to the nearest food, a penalty for remaining food count, capsule proximity with a heavy penalty for uncollected capsules, and separate ghost handling terms for active and scared states. Version 3 refined the weights, removed in-search logging that was causing grader penalties, excluded the STOP action, and added configurable depth defaulting to 3 but dropping to 2 on larger maps to avoid timeouts.
  </p>
</div>

<div class="cs-section fade-in">
  <p class="cs-section__label">02 · KEY DECISIONS</p>
  <div class="cs-decisions">
    <div class="cs-decision">
      <p class="cs-decision__title">Nearest-food BFS over cluster heuristics</p>
      <p class="cs-decision__body">Empirical testing showed that scoring and ranking candidate clusters consistently hurt performance under the 10-second limit. Simplicity and reliability outperformed theoretical elegance when computation time was the binding constraint.</p>
    </div>
    <div class="cs-decision">
      <p class="cs-decision__title">Evaluation function as the primary lever, not search depth</p>
      <p class="cs-decision__body">Increasing depth added runtime overhead without proportional gains. A well-shaped evaluation function changed agent behaviour immediately. The ghost penalty used a hard cutoff of -250 when an active ghost was within one cell, because smooth distance penalties were too weak to reliably trigger evasion.</p>
    </div>
    <div class="cs-decision">
      <p class="cs-decision__title">Separate weights for scared and active ghosts</p>
      <p class="cs-decision__body">An active ghost is a threat to avoid; a scared ghost is a target to chase. Treating them with a single undifferentiated distance term would have produced contradictory behaviour. Capsule proximity was weighted heavily to encourage opportunistic aggression when ghosts were scared.</p>
    </div>
    <div class="cs-decision">
      <p class="cs-decision__title">STOP action removed entirely</p>
      <p class="cs-decision__body">Allowing Pac-Man to stand still wasted turns without any strategic benefit. Removing STOP from the action space forced the agent to always move toward a meaningful objective.</p>
    </div>
  </div>
</div>

<div class="cs-section fade-in">
  <p class="cs-section__label">03 · OUTCOME</p>
  <div class="cs-metrics">
    <div class="cs-metric">
      <p class="cs-metric__label">BFS SCORE</p>
      <p class="cs-metric__value">6.97<span class="cs-metric__unit">/10</span></p>
    </div>
    <div class="cs-metric">
      <p class="cs-metric__label">ADVERSARIAL SCORE</p>
      <p class="cs-metric__value">16.75</p>
    </div>
    <div class="cs-metric">
      <p class="cs-metric__label">IMPROVEMENT</p>
      <p class="cs-metric__value">+38.9<span class="cs-metric__unit">%</span></p>
    </div>
  </div>
  <p class="cs-section__body">
    The nearest-food BFS agent scored 6.97 out of 10, outperforming the cluster-based variants at 6.27 and 6.44. The adversarial agent scored 16.75 against a baseline of 12.06, a 38.9% improvement. The custom evaluation function accounted for the majority of that gain, with Version 2 reaching 14.42 and Version 3 adding a further improvement through cleaner implementation and weight refinement.
  </p>
</div>
