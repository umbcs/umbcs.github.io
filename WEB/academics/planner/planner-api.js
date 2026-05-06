const courseCache = {};

// --- This function helps get course schedules from the UMB website course catalog ---
const fetchCourseSchedule = (courseId) => {
    const offeredSection = document.getElementById('offered-section');
    const offeredContainer = document.getElementById('side-offered');

    offeredSection.style.display = 'none';
    offeredContainer.innerHTML = '';

    let match = courseId.match(/^([A-Za-z]+)\s*(\d+[A-Za-z]?)$/);
    if (!match) return;

    offeredSection.style.display = 'block';

    if (courseCache[courseId]) {
        offeredContainer.innerHTML = courseCache[courseId];
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        return;
    }

    let subject = match[1].toLowerCase();
    let number = match[2];
    let url = `https://courses.umb.edu/course_catalog/course_info/ugrd_${subject}_all_${number}`;

    offeredContainer.innerHTML = '<div style="color:#8b949e; font-size: 13px;">Loading live schedule...</div>';

    fetch(url)
        .then(res => res.text())
        .then(htmlStr => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlStr, 'text/html');
            let htmlOut = '';
            let h3Tags = doc.querySelectorAll('h3');
            let foundAny = false;

            h3Tags.forEach(h3 => {
                let termText = h3.innerText.trim();
                if (termText.startsWith('Course #')) return;

                let table = h3.nextElementSibling;
                if (table && table.tagName.toLowerCase() === 'table') {
                    let rows = table.querySelectorAll('tr.class-info-rows');
                    if (rows.length > 0) {
                        foundAny = true;
                        let mt = foundAny && htmlOut !== '' ? '16px' : '0';
                        htmlOut += `<div style="font-weight: 600; font-size: 16px; color: #ffffff; margin-bottom: 12px; margin-top: ${mt}; border-bottom: 1px solid #2a2a2a; padding-bottom: 8px;">${termText}</div>`;

                        rows.forEach(row => {
                            const sec = row.querySelector('td[data-label="Section"]')?.innerText.trim() || 'N/A';
                            const cnum = row.querySelector('td[data-label="Class Number"]')?.innerText.trim() || 'N/A';
                            const timeHtml = row.querySelector('td[data-label="Schedule/Time"]')?.innerHTML.trim() || 'TBA';
                            const inst = row.querySelector('td[data-label="Instructor"]')?.innerText.trim() || 'Staff';
                            const loc = row.querySelector('td[data-label="Location"]')?.innerText.trim() || 'TBA';

                            htmlOut += `
                                    <div class="class-card">
                                        <div class="class-header">
                                            <div class="class-section">Section ${sec}</div>
                                            <div class="class-number">#${cnum}</div>
                                        </div>
                                        <div class="class-detail">
                                            <i data-lucide="clock"></i>
                                            <div class="class-detail-text">${timeHtml}</div>
                                        </div>
                                        <div class="class-detail">
                                            <i data-lucide="user"></i>
                                            <div class="class-detail-text">${inst}</div>
                                        </div>
                                        <div class="class-detail">
                                            <i data-lucide="map-pin"></i>
                                            <div class="class-detail-text">${loc}</div>
                                        </div>
                                    </div>`;
                        });
                    }
                }
            });

            if (!foundAny) {
                let errorHtml = '<div style="color:#8b949e; font-size: 13px;">Not offered this semester.</div>';
                offeredContainer.innerHTML = errorHtml;
                courseCache[courseId] = errorHtml;
                return;
            }
            offeredContainer.innerHTML = htmlOut;
            courseCache[courseId] = htmlOut;
            lucide.createIcons();
        })
        .catch(err => {
            offeredContainer.innerHTML = '<div style="color:#ff7b72; font-size: 13px;">Error loading schedule.</div>';
        });
};
