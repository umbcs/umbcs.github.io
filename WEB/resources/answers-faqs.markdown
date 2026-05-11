---
layout: default
title: FAQ
permalink: /answers-to-faqs/
---

<div class="faq-container">
  {% for group in site.data.faq %}
    <h2 class="faq-category-title">{{ group.category }}</h2>
    
    <div class="faq-accordion">
      {% for item in group.questions %}
        <div class="faq-item">
          
          <button class="faq-question">
            {{ item.question }}
            <span class="icon">+</span>
          </button>
          
          <div class="faq-answer">
            <p>{{ item.answer | strip_html | strip }}</p>
          </div>
          
        </div>
      {% endfor %}
    </div>
    
  {% endfor %}
</div>

<script>
// Clean JS to ensure only the clicked item opens
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const item = button.parentElement;
    
    // Toggle active class
    item.classList.toggle('active');
  });
});
</script>

