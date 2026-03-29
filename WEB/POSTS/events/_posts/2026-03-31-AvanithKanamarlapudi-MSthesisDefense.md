---
layout: post
title: "MS Thesis Defense: Avanith Kanamarlapudi"
---

OMAMA-DB: The Oregon–Massachusetts Mammography Database

When: 11:00 AM, March 31, 2026 (Tuesday)

Where: Pomplun Lab

Speaker: Avanith Kanamarlapudi

Committee Members: Prof. Daniel Haehn (Chair), Prof. Dan Simovici, Prof. Nurit Haspel

GDP: Prof. Dan Simovici

Abstract

**Purpose:** Public datasets for training AI models in breast cancer screening are limited in size and quality, making it difficult to develop reliable systems. We introduce OMAMA-DB, an extensive publicly available collection of 2D mammograms and 3D tomosynthesis volumes.

**Approach:** Starting from 967,991 images, we created a curated set of 231,080 images using a multi-stage filtering process that removes missing labels, uncommon dimensions, rare scanner types, duplicate studies, and invalid DICOM files. All 2D images then undergo additional outlier detection using histogram filtering and a variational autoencoder to remove low-quality outliers. OMAMA-DB includes pathology-based cancer labels and automated lesion annotations generated using DeepSight. We also provide a web-based annotation tool for expert validation. To demonstrate usability, we fine-tuned MedGemma on a balanced subset of OMAMA-DB. We conducted a preliminary user study comparing human and automated classification of real and synthetic mammograms.

**Results:** OMAMA-DB contains 231,080 images, including 7,351 2D and 374 3D cancer cases. Fine-tuned MedGemma achieved 0.989 accuracy, 0.997 sensitivity, and a F1 score of 0.989 on a balanced validation set of 2,942 images. In real-versus-synthetic classification, humans achieved 0.485 accuracy, while Logistic Regression and CNN achieved 0.972 and 0.997.

**Conclusions:** OMAMA-DB provides a large mammography dataset with pathology-based labels and automated lesion annotations to support medical imaging research. Fine-tuned foundation models demonstrate strong cancer classification performance, while the gap between human and automated detection of synthetic images highlights the importance of real clinical data. All data, models, and parameters are openly available for research use.

Description

Zoom link: https://umassboston.zoom.us/j/94251400964

Meeting ID: 942 5140 0964

Passcode: 432711
