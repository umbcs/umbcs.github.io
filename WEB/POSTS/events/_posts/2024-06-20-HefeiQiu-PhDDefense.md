---
layout: post
title: "PhD Defense: Semantic Representation Learning in Natural Language Processing"
---

Speaker: Hefei Qiu
Committee Members: Prof. Ping Chen (Chair), Prof. Dan Simovici, Prof. Marc Pomplun,
Prof. Wei Ding
GDP: Prof. Dan Simovici

Date and Time: June 20th, 2024 (Thursday) at 11:00 AM ET

In Person Location: M-3-0732
Zoom Link: https://umassboston.zoom.us/j/97985957572
Passcode: 056017


ABSTRACT
Recent developments in machine learning, especially deep learning, have significantly advanced the progress in Natural Language Processing (NLP). In order to train machines to understand natural languages, learning informative semantic representations from them is a fundamental and crucial step. Although there has been impressive development in semantic representation learning, key challenges still remain. In this dissertation, we address some of these challenges by proposing novel approaches to learning representations at word and sentence levels and developing an automatic short answer grading system that applies the techniques in NLP 
in the education field.

The first section of this dissertation explores semantic representation learning at the word level, which is treated as an undividable atomic information unit. Word embeddings which are dense vectors have been popularly applied in current machine learning in NLP. We propose a novel modular neuro-symbolic approach to learn richer semantic information such as connotation information. It designs a small neural network for each word, treats such representation of a word as a module, utilizes the symbolic information of the dependency parsing tree, and connects word modules to construct a neural network for a sentence which will be trained on some sentence-level NLP tasks. Experiments on a Linguistic Acceptability task show this approach has great potential in learning informative semantic representations with much less training data and a much smaller model size.

The second section shows our work on representation learning at the sentence level. We develop a framework that applies contrastive learning and utilizes publicly labeled Natural Language Inference corpora to improve the learning of sentence representations. This framework is model agnostic which can be applied on top of any existing encoders. By using BERT as the encoder, experiments on the series of Text Similarity tasks prove the effectiveness of this approach.

In the last section, we present an automatic short-answer grading system that can provide structured grades and feedback. This system is built based on Large Language Models and other NLP techniques such as question generation and answering. We experiment with it on a real-world dataset from college-level Biology course exams and show that our grading system can achieve substantial agreement with human graders.
