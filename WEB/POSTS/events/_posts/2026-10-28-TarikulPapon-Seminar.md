---
layout: post
title: Thirty years after the LSM-Tree
---

Seminar by Dr. Tarikul Papon

When: 12:00 PM, Oct 28, 2026 (Wed)

Where: Web Lab (M-3-0721)

Since Pat and Betty O’Neil introduced the Log-Structured Merge-tree (LSM-tree) in 1996, it has become the backbone of modern NoSQL systems, powering data storage at Meta, Google, Apple, and many others. Thirty years later, as LSM-trees evolve with modern hardware, open questions remain about how to use memory well and how to manage slow background operations like compaction in a workload-aware manner. In this talk, I will present my current research on LSM-trees along two fronts. On the memory front, we study how to allocate limited memory across caches and filters, and how filter design can adapt to the workload. On the storage front, we use reinforcement learning to make compaction and the tree’s shape respond to changing workloads.
