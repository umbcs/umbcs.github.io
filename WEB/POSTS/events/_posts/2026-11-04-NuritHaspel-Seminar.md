---
layout: post
title: Using Pre-trained Language Models and Self-Supervised deep learning to determine protein-protein interactions.
---

Seminar by Dr. Nurit Haspel

When: 12:00 PM, Nov 4, 2026 (Wed)

Where: Web Lab (M-3-0721)

Proteins are biological molecules that are essential to nearly every cellular function. Proteins often bind together to perform essential functions. When two proteins bind, the contact is made on a specific part of their surfaces. Locating the contact interface normally requires knowing the 3D structures of the interacting proteins, and for most protein pairs no such knowledge exists. Previous work was done on very small datasets and was limited by computational power. 

In recent years, more experimental data has become available and more importantly, language models have become an important tool in bioinformatcs: a protein sequence is a string over a 20-letter alphabet, and masked-token pre-training capture structural context, since a protein structure is coded in its sequence. The difficulty is that text is one-dimensional and proteins are 3-dimensional: Amino acids far apart in the string can be neighbors in space, so the property we are trying to predict is contiguous in space and scattered along the sequence. 

In this talk I will present my recent work, which pairs an encoder pre-trained on a structural alphabet as well as on sequence with a cross-attention mechanism that conditions each chain’s prediction on its actual binding partner. I will close with my insights about working and collaborating with AI in writing code and analysis, in particular Claude, and what we can learn about the future of research.


