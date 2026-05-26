---
layout: case-study
title: "ML Classification Comparison: Tic-Tac-Toe"
slug: ml-classification
summary: "A machine learning comparison project training and evaluating three classifiers on a tic-tac-toe dataset to predict whether the first player wins, using WEKA for implementation and analysis."
tldr: "Trained Decision Tree, Naive Bayes, and k-NN classifiers using 10-fold cross-validation on the tic-tac-toe dataset. k-NN achieved 98.96% accuracy across all tested k values. Naive Bayes underperformed at 69.62% due to its independence assumption conflicting with the spatial dependencies between board squares. J48 sat in the middle at 84.55% but offered the added benefit of interpretability."
year: 2025
order: 9
featured: false
tags: [ML, Data]
stack: [Python, WEKA, J48/C4.5, Naive Bayes, k-NN, Jaccard Similarity, Information Gain, 10-fold Cross-Validation]
role: Solo
timeline: 2 weeks
context: Monash MDS, FIT5047 Intelligent Systems
github: https://github.com/Cream0o0/bayesian-fraud
thumbnail: /assets/images/ml-classification.png
hero_image: /assets/images/ml-classification.png
description: "ML classification comparison using Decision Tree, Naive Bayes, and k-NN on tic-tac-toe data with WEKA, covering information gain, confusion matrices, and by-hand probability derivations."
---

<div class="cs-section fade-in">
  <p class="cs-section__label">01 · APPROACH</p>
  <p class="cs-section__body">
    The task explored how different classification algorithms perform on the same structured dataset and why their results diverge. The tic-tac-toe dataset is interesting because board squares are spatially dependent, which means some classifiers handle the problem naturally while others struggle due to their underlying assumptions.
  </p>
  <p class="cs-section__body">
    Exploratory data analysis in WEKA identified the most predictive attribute before any model was trained. The centre square showed the highest class variation, which makes intuitive sense since controlling the centre allows the most winning lines simultaneously.
  </p>
  <p class="cs-section__body">
    Three models were trained using 10-fold cross-validation. For J48, two values of minNumObj were tested. The more detailed tree (minNumObj=2, size 142, 95 leaves) outperformed the pruned version (minNumObj=5, size 73, 49 leaves) at 84.55% versus 82.67% accuracy. The root split was confirmed as the centre square with a manually calculated information gain of 0.045 bits. Naive Bayes produced 69.62% accuracy, its independence assumption proving problematic since adjacent squares are inherently correlated. For k-NN, three values of k were tested (1, 3, and 5) and all produced identical results at 98.96% accuracy. A by-hand Jaccard coefficient calculation was also performed to manually identify the three nearest neighbours for a given board state, confirming the WEKA prediction.
  </p>
</div>

<div class="cs-section fade-in">
  <p class="cs-section__label">02 · KEY DECISIONS</p>
  <div class="cs-decisions">
    <div class="cs-decision">
      <p class="cs-decision__title">J48 tuned by comparing two minNumObj values</p>
      <p class="cs-decision__body">Rather than accepting the default, two values were compared. The smaller value captured more specific board patterns and delivered higher accuracy, though the larger value produced a more interpretable tree. The trade-off between complexity and readability was a deliberate consideration.</p>
    </div>
    <div class="cs-decision">
      <p class="cs-decision__title">Naive Bayes included as an explainable baseline</p>
      <p class="cs-decision__body">Its underperformance on this dataset has a clear cause: board squares are positionally dependent, which violates the independence assumption and inflates false positives. Including it made the comparison more informative than running only high-performing models.</p>
    </div>
    <div class="cs-decision">
      <p class="cs-decision__title">Jaccard similarity over Euclidean distance for k-NN</p>
      <p class="cs-decision__body">All attributes in the dataset are categorical. Jaccard is the appropriate similarity measure for categorical data; Euclidean distance would have been technically incorrect here.</p>
    </div>
  </div>
</div>

<div class="cs-section fade-in">
  <p class="cs-section__label">03 · OUTCOME</p>
  <div class="cs-metrics">
    <div class="cs-metric">
      <p class="cs-metric__label">K-NN ACCURACY</p>
      <p class="cs-metric__value">98.96<span class="cs-metric__unit">%</span></p>
    </div>
    <div class="cs-metric">
      <p class="cs-metric__label">J48 ACCURACY</p>
      <p class="cs-metric__value">84.55<span class="cs-metric__unit">%</span></p>
    </div>
    <div class="cs-metric">
      <p class="cs-metric__label">NAIVE BAYES</p>
      <p class="cs-metric__value">69.62<span class="cs-metric__unit">%</span></p>
    </div>
  </div>
  <p class="cs-section__body">
    k-NN was the clear winner across all metrics, with near-perfect recall of 0.998 meaning it almost never missed an actual win. Naive Bayes had the weakest precision, confirming that its independence assumption caused it to overpredict wins. J48 sat in the middle and offered the added benefit of interpretability through its tree structure. Testing k values of 1, 3, and 5 confirmed the performance plateau was genuine rather than a single-run artefact.
  </p>
</div>
