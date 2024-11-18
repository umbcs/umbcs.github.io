---
layout: post
title: "Quantifying and Modeling Contexts for Sequential Recommendation"
---

Speaker: Benjamin Amankwata
Committee Members: Dr. Kenneth Fletcher (Chair), Dr. Duc Tran, Dr. Daniel Haehn, Dr. David Degras-Valabregue
GPD: Prof. Dan Simovici

Date and Time: November 25th, 2024 (Monday) at 11:00 AM ET
Location: Campus Center, 2nd floor, Conference room (2540)

Zoom Link: https://umassboston.zoom.us/j/94485586286
Passcode: 177750

ABSTRACT
Recommender systems help users discover products, content, or actions aligned with their preferences. Traditionally, these systems have used content-based and collaborative filtering approaches: content-based recommenders suggest items similar to those the user has liked, while collaborative filtering identifies patterns of similarity between users or items. Recently, sequential recommendation has introduced time and order into recommendations, recognizing that user interests can shift dynamically. Unlike traditional methods that treat preferences as static, sequential recommendations provide contextually relevant suggestions by incorporating sequential context, making recommendations personalized, timely and contextually relevant. Though recognized as central to sequential recommendation, sequential context itself has rarely been explored in depth. This dissertation focuses on key challenges in quantifying and modeling sequential context in recommendation systems. 

In the first part, we address the dynamic, hierarchical, and cascading nature of sequential context, proposing a novel framework called Higher Order Latent Interactional Context (HOLIC) for modeling sequential context. This approach combines a multi-layer recurrent neural network, an attention mechanism, and a sequence clustering module to capture the underlying dynamical properties of sequential context. 

The second part examines the unique characteristics of training data for sequential recommendations, particularly when using transformer-based masked language models (MLMs) for item representation, a common pretraining approach. We find that applying MLMs naively to sequential recommendation data, without addressing differences between user interaction sequences and natural language, can degrade and distort item relationship signals. We propose a method to recover and amplify these signals by augmenting training data with synthetic permutations that preserve local and global sequential context.

 In the final section, we present pioneering work on multi-modal contexts for sequential recommendation, leveraging the rise of multi-media data—such as images, text, audio, and video in modern applications. We observe that multi-modal interactions add significant complexity, with item relationships potentially unique to each modality, redundant across modalities, or arising from intermodal synergies. We define and systematically categorize these challenges, and propose two models for uncovering dynamic sequential relationships within and across modalities. The first model treats the user interaction sequence as a heterogeneous temporal graph (HTG) and defines meta-relations on the HTG that encode modality types as node types and connections between modalities as edge types. The meta-relations are used to parameterize message passing and attention mechanisms to distill complex dynamic inter-modal and intra-modal signals into rich contextualized item embeddings. The second model is a self-attention based multi-modal fusion framework with a novel sequence compression technique to manage the transformer’s quadratic time complexity, allowing us to effectively model long multi-modal sequences with text and image interactions.
