---
layout: post
title: "Optimizing Data Systems for Modern Storage and Memory Technology"
---
<p><b>CS Faculty Candidate Talk: Dr. Tarikul Islam Papon</b></p>
<p><b>Title: Optimizing Data Systems for Modern Storage and Memory Technology</b></p>

<p></p>
<p><b>Time:</b> February 19, 2025 at 10:00 AM Eastern Time (US and Canada)</p>
<p><b>Location:</b> M03-732/Web lab. Refreshments will be served.</p>
<a href="https://umassboston.zoom.us/j/92791577581">Click Here to Join Zoom Meeting  </a>


<p></p>
<p><b>Abstract: </b> Data-intensive applications stress the memory hierarchy with unnecessary data movement and the need to integrate new storage technologies. My research addresses these challenges through two main approaches: unlocking the potential of modern storage devices via faithful modeling and minimizing data movement through hardware specialization. 
</p>

<p>Solid-state drives (SSDs), now dominant in secondary storage, exhibit read/write asymmetry and access concurrency. Most storage-intensive applications overlook these characteristics, leading to suboptimal performance. I propose a new storage modeling approach capturing these properties. Using this model, I have developed (i) an asymmetry & concurrency-aware DBMS bufferpool management (that uses the device's write concurrency to amortize the asymmetric write cost), (ii) a concurrency-aware graph manager, and (iii) a reinforcement learning based data placement policy for tiered storage architecture. This research paves the way for SSD-aware designs, allowing more systems and components to benefit from this approach. 
 </p>

<p>Moving up the memory hierarchy, data movement is a key bottleneck exacerbated by static layout decisions. To address this, we leverage hardware specialization by developing a custom FPGA-based hardware through software/hardware co-design. Our proposed hardware performs fast on-the-fly data transformation closer to data in memory based on the query access pattern to minimize cache pollution. This design brings a lot of opportunities for simplicity and innovation in the entire data system software stack.
</p>

<p>In this talk, I will present some of my research on (i) SSD-aware data system design and (ii) hardware/software co-design for database operations. 
</p>

<p></p>
<p><b>Bio: </b> Tarikul Islam Papon is a final-year PhD candidate in Computer Science at Boston University (BU), advised by Manos Athanassoulis. His research focuses on hardware-aware data management challenges stemming from the evolution of storage and memory devices. Papon's work has been published in top-tier database conferences (SIGMOD, VLDB, ICDE, EDBT) and journals (ACM TODS, IEEE TKDE). He has received several awards, including the Best Demo Award (VLDB '23), the Best Vision Paper Award (ICDE '23), and BU’s CS Research Excellence Award. He has also served as a graduate-level course instructor at BU and interned at Microsoft Research and Intel Labs during his PhD. Before joining BU, Papon served as a Lecturer for four years at the CSE Department at Bangladesh University of Engineering and Technology (BUET), working on machine learning and embedded systems.
</p>
