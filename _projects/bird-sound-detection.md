---
layout: case-study
title: BirdTag
slug: bird-sound-detection
summary: A serverless platform that automatically detects and tags bird species from uploaded images, video, and audio, then lets users search their entire media library by those tags.
tldr: Built three independent detection pipelines on AWS Lambda, one for images and video using a custom YOLO model, one for audio using BirdNET v2.4 from the Cornell Lab, and one for reverse tag search via DynamoDB. All pipelines return results in under 3 seconds for visual media and around 7 seconds for audio, with no standing infrastructure and near-zero idle cost.
year: 2024
order: 1
featured: true
tags: [ML, Cloud, SE]
stack: [Python, React, AWS Lambda, AWS S3, AWS DynamoDB, API Gateway, AWS Cognito, AWS SNS, CloudWatch, YOLO, BirdNET v2.4, OpenCV, TFLite, Docker, scipy, librosa, boto3]
role: Full frontend and backend implementation within a team of 4
timeline: 3 to 4 weeks
context: Monash MDS, FIT5225 Cloud computing and security
github: https://github.com/Cream0o0/Cloud-Based-Bird-Sound-Detection-Platform-
thumbnail: /assets/images/bird-sound-hero.png
hero_image: /assets/images/bird-sound-hero.png
hero_caption: 
description: Serverless bird species detection platform using YOLO and BirdNET on AWS Lambda, with DynamoDB tag search and a React frontend.
---

<div class="cs-section fade-in">
  <p class="cs-section__label">01 &middot; APPROACH</p>
  <p class="cs-section__body">
    The platform is split into four Lambda functions, each handling a distinct concern: visual detection, thumbnail generation, audio detection, and reverse tag search. All four sit behind API Gateway and share a DynamoDB table for tags and file metadata.
  </p>
  <p class="cs-section__body">
    Visual detection downloads the uploaded file from S3 and runs it through a custom-trained YOLO model. Images are processed in a single pass. Video files are sampled at every 60th frame with a 15-frame cap, keeping execution time and cost manageable without sacrificing detection quality. Any species detected above a 0.5 confidence threshold is written as a tag to DynamoDB.
  </p>
  <p class="cs-section__body">
    Audio detection is triggered via SNS when a .wav file lands in S3. The pipeline loads the file with soundfile and scipy, converts to mono, resamples to 48kHz, then slices into 3-second non-overlapping windows. Each window passes through BirdNET v2.4, a pretrained TFLite model from the Cornell Lab of Ornithology covering over 6,000 species globally. Scores are averaged across all segments and the top 5 species above a 0.1 confidence threshold are returned as tags.
  </p>

  <div class="cs-diagram">
    <svg width="100%" height="200" viewBox="0 0 720 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="78" width="90" height="44" rx="6" fill="#FAFAF7" stroke="#1D9E75" stroke-width="0.8"/>
      <text x="55" y="97" font-family="Inter, sans-serif" font-size="11" font-weight="500" fill="#1A1A18" text-anchor="middle">React</text>
      <text x="55" y="112" font-family="JetBrains Mono, monospace" font-size="9" fill="#5F5E5A" text-anchor="middle">frontend</text>

      <line x1="100" y1="100" x2="130" y2="100" stroke="#888780" stroke-width="1"/>
      <polygon points="130,96 136,100 130,104" fill="#888780"/>

      <rect x="136" y="78" width="100" height="44" rx="6" fill="#FAFAF7" stroke="#1D9E75" stroke-width="0.8"/>
      <text x="186" y="97" font-family="Inter, sans-serif" font-size="11" font-weight="500" fill="#1A1A18" text-anchor="middle">API Gateway</text>
      <text x="186" y="112" font-family="JetBrains Mono, monospace" font-size="9" fill="#5F5E5A" text-anchor="middle">+ Cognito</text>

      <line x1="236" y1="100" x2="266" y2="100" stroke="#888780" stroke-width="1"/>
      <polygon points="266,96 272,100 266,104" fill="#888780"/>

      <rect x="272" y="78" width="80" height="44" rx="6" fill="#FAFAF7" stroke="#1D9E75" stroke-width="0.8"/>
      <text x="312" y="97" font-family="Inter, sans-serif" font-size="11" font-weight="500" fill="#1A1A18" text-anchor="middle">S3</text>
      <text x="312" y="112" font-family="JetBrains Mono, monospace" font-size="9" fill="#5F5E5A" text-anchor="middle">upload</text>

      <line x1="352" y1="80" x2="390" y2="45" stroke="#888780" stroke-width="0.8" stroke-dasharray="3 3"/>
      <line x1="352" y1="100" x2="390" y2="100" stroke="#888780" stroke-width="0.8" stroke-dasharray="3 3"/>
      <line x1="352" y1="120" x2="390" y2="155" stroke="#888780" stroke-width="0.8" stroke-dasharray="3 3"/>
      <text x="366" y="73" font-family="JetBrains Mono, monospace" font-size="8" fill="#888780" text-anchor="middle">trigger</text>

      <rect x="390" y="24" width="90" height="36" rx="6" fill="#E1F5EE" stroke="#1D9E75" stroke-width="1"/>
      <text x="435" y="40" font-family="Inter, sans-serif" font-size="10" font-weight="500" fill="#085041" text-anchor="middle">Lambda</text>
      <text x="435" y="53" font-family="JetBrains Mono, monospace" font-size="8" fill="#085041" text-anchor="middle">YOLO visual</text>

      <rect x="390" y="82" width="90" height="36" rx="6" fill="#E1F5EE" stroke="#1D9E75" stroke-width="1"/>
      <text x="435" y="98" font-family="Inter, sans-serif" font-size="10" font-weight="500" fill="#085041" text-anchor="middle">Lambda</text>
      <text x="435" y="111" font-family="JetBrains Mono, monospace" font-size="8" fill="#085041" text-anchor="middle">thumbnail</text>

      <rect x="390" y="140" width="90" height="36" rx="6" fill="#E1F5EE" stroke="#1D9E75" stroke-width="1"/>
      <text x="435" y="156" font-family="Inter, sans-serif" font-size="10" font-weight="500" fill="#085041" text-anchor="middle">Lambda</text>
      <text x="435" y="169" font-family="JetBrains Mono, monospace" font-size="8" fill="#085041" text-anchor="middle">BirdNET audio</text>

      <line x1="480" y1="42" x2="520" y2="100" stroke="#888780" stroke-width="0.8"/>
      <line x1="480" y1="100" x2="520" y2="100" stroke="#888780" stroke-width="0.8"/>
      <line x1="480" y1="158" x2="520" y2="100" stroke="#888780" stroke-width="0.8"/>
      <polygon points="520,96 526,100 520,104" fill="#888780"/>

      <rect x="526" y="78" width="90" height="44" rx="6" fill="#FAFAF7" stroke="#1D9E75" stroke-width="0.8"/>
      <text x="571" y="97" font-family="Inter, sans-serif" font-size="11" font-weight="500" fill="#1A1A18" text-anchor="middle">DynamoDB</text>
      <text x="571" y="112" font-family="JetBrains Mono, monospace" font-size="9" fill="#5F5E5A" text-anchor="middle">tags + metadata</text>
    </svg>
    <p class="cs-diagram__caption">FIG 02 &middot; SERVERLESS ARCHITECTURE </p>
  </div>
</div>

<div class="cs-section fade-in">
  <p class="cs-section__label">02 &middot; KEY DECISIONS</p>
  <div class="cs-decisions">
    <div class="cs-decision">
      <p class="cs-decision__title">YOLO over a standard image classifier</p>
      <p class="cs-decision__body">YOLO detects multiple species within a single frame and returns bounding boxes. A classifier returns one label per image and would miss flocks or mixed-species scenes entirely.</p>
    </div>
    <div class="cs-decision">
      <p class="cs-decision__title">BirdNET over training from scratch</p>
      <p class="cs-decision__body">The Cornell Lab model covers over 6,000 species globally and was purpose-built for bioacoustics. Training an audio classifier from scratch in a 3-week window was not realistic. Its TFLite format also meant it ran inside a Lambda container without a heavy TensorFlow installation.</p>
    </div>
    <div class="cs-decision">
      <p class="cs-decision__title">Frame sampling for video</p>
      <p class="cs-decision__body">Processing every frame would have exceeded Lambda execution limits. Sampling every 60th frame with a 15-frame cap kept response time under 3 seconds while producing consistent tag results.</p>
    </div>
    <div class="cs-decision">
      <p class="cs-decision__title">Separate confidence thresholds for visual and audio</p>
      <p class="cs-decision__body">Visual detection uses 0.5 confidence. Audio uses 0.1. Bird calls overlap with background noise, so a lower audio threshold catches more species without sacrificing too many false negatives in a library-search context.</p>
    </div>
    <div class="cs-decision">
      <p class="cs-decision__title">SNS trigger for audio instead of direct S3 polling</p>
      <p class="cs-decision__body">Decouples the upload path from the detection path. The audio Lambda subscribes to an SNS topic that fires on new audio uploads, making the pipeline easier to extend without touching the upload logic.</p>
    </div>
  </div>
</div>

<div class="cs-section fade-in">
  <p class="cs-section__label">03 &middot; OUTCOME</p>
  <div class="cs-metrics">
    <div class="cs-metric">
      <p class="cs-metric__label">VISUAL LATENCY</p>
      <p class="cs-metric__value">&lt;3<span class="cs-metric__unit">s</span></p>
    </div>
    <div class="cs-metric">
      <p class="cs-metric__label">AUDIO LATENCY</p>
      <p class="cs-metric__value">~7<span class="cs-metric__unit">s</span></p>
    </div>
    <div class="cs-metric">
      <p class="cs-metric__label">SPECIES COVERAGE</p>
      <p class="cs-metric__value">6k<span class="cs-metric__unit">+</span></p>
    </div>
  </div>
  <p class="cs-section__body">
    All three detection pipelines passed functional testing. Manual tests against sample images covering crows, kingfisher, myna, owl, peacock, pigeon, and sparrow, as well as two bird audio recordings, all returned correct top-species results. Audio latency reflects the additional preprocessing steps: resampling, 3-second segmentation, and per-segment TFLite inference before a result is returned.
  </p>
</div>
