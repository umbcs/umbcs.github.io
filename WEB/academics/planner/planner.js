fetch(BASE_URL + '/WEB/academics/planner/prerequisites.json?v=' + new Date().getTime())
    .then(res => res.json())
    .then(data => {
        const cy = cytoscape({
            container: document.getElementById('cy'),
            elements: {
                nodes: data.nodes,
                edges: data.edges
            },
            layout: { name: 'preset', fit: false },
            zoom: 0.669,
            pan: { x: 800, y: 300 },

            style: [
                {
                    selector: 'node:childless',
                    style: {
                        'shape': 'round-rectangle',
                        'background-color': '#1e1e1e',
                        'border-width': 1,
                        'border-color': '#3a3a3a',
                        'color': '#ffffff',
                        'label': function(ele) {
                            var id = ele.data('id');
                            var name = ele.data('name');
                            return name ? id + '\n' + name : id;
                        },
                        'text-wrap': 'wrap',
                        'text-valign': 'center',
                        'text-halign': 'center',
                        'width': 'label',
                        'height': 'label',
                        'padding': '14px',
                        'text-max-width': '140px',
                        'font-family': 'Inter, sans-serif',
                        'font-size': '15px',
                        'line-height': 1.4,
                        'transition-property': 'background-color, border-color, opacity',
                        'transition-duration': '0.2s'
                    }
                },
                {
                    selector: 'node:parent',
                    style: {
                        'background-opacity': 0,
                        'background-color': 'transparent',
                        'border-width': 1,
                        'border-color': '#2a2a2a',
                        'shape': 'rectangle',
                        'label': 'data(name)',
                        'font-family': 'Inter, sans-serif',
                        'color': '#999999',
                        'text-valign': 'top',
                        'text-halign': 'center',
                        'font-size': '14px',
                        'padding': '20px',
                        'text-margin-y': -8
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'width': 1.5,
                        'line-color': '#404040',
                        'target-arrow-color': '#404040',
                        'target-arrow-shape': 'triangle',
                        'curve-style': 'bezier',
                        'transition-property': 'line-color, target-arrow-color, opacity, width',
                        'transition-duration': '0.2s'
                    }
                },
                {
                    selector: 'edge.coreq',
                    style: {
                        'line-style': 'dashed',
                        'line-dash-pattern': [6, 4],
                        'label': 'Pre/Co Req',
                        'font-family': 'Inter, sans-serif',
                        'font-size': '10px',
                        'color': '#8b949e',
                        'text-background-color': '#0d1117',
                        'text-background-opacity': 1,
                        'text-background-padding': '2px'
                    }
                },
                {
                    selector: 'edge.bend-left',
                    style: { 'curve-style': 'unbundled-bezier', 'control-point-distances': -90, 'control-point-weights': 0.5 }
                },
                {
                    selector: 'edge.bend-right',
                    style: { 'curve-style': 'unbundled-bezier', 'control-point-distances': 90, 'control-point-weights': 0.5 }
                },
                {
                    selector: 'node.hover-node',
                    style: {
                        'border-color': '#ffffff',
                        'border-width': 1
                    }
                },
                {
                    selector: 'node.selected-path',
                    style: {
                        'border-color': '#ffffff',
                        'border-width': 1.5
                    }
                },
                {
                    selector: 'edge.selected-path, edge.completed-path',
                    style: {
                        'line-color': '#ffffff',
                        'target-arrow-color': '#ffffff',
                        'width': 2.5,
                        'z-index': 99
                    }
                },
                {
                    selector: 'edge.selected-partial',
                    style: {
                        'line-color': '#ffffff',
                        'target-arrow-color': '#ffffff',
                        'width': 2.5,
                        'line-style': 'dashed',
                        'line-dash-pattern': [6, 4],
                        'z-index': 99
                    }
                },
                {
                    selector: 'edge.completed-partial',
                    style: {
                        'line-color': '#ffffff',
                        'target-arrow-color': '#ffffff',
                        'width': 2.5,
                        'line-style': 'dashed',
                        'line-dash-pattern': [6, 4],
                        'z-index': 99
                    }
                },
                {
                    selector: 'node.completed',
                    style: {
                        'border-color': '#2ea043',
                        'border-width': 2
                    }
                }
            ],
            minZoom: 0.4,
            maxZoom: 5
        });

        let completedCourses = new Set(JSON.parse(localStorage.getItem('completedCourses') || '[]'));
        let selectedNodeId = null;
        const courseCache = {};

        const sidebar = document.getElementById('info');
        const closeButton = document.getElementById('close-info');
        const courseId = document.getElementById('courseId');
        const courseName = document.getElementById('courseName');
        const descriptionSection = document.getElementById('description-section');
        const description = document.getElementById('side-description');
        const prereqSection = document.getElementById('prereq-section');
        const prereq = document.getElementById('side-prereq');
        const unlocksSection = document.getElementById('unlocks-section');
        const unlocksList = document.getElementById('side-unlocks');
        const completeButton = document.getElementById('button-complete');

        const updateLineStyle = (node, solidClass, dashedClass) => {
            node.outgoers('edge').forEach(edge => {
                const target = edge.target();
                const otherPrereqs = target.incomers('node').difference(node);
                const prereqsMet = otherPrereqs.every(p => completedCourses.has(p.id()));
                edge.addClass(otherPrereqs.length > 0 && !prereqsMet ? dashedClass : solidClass);
            });
        };

        function closeSidebar() {
            sidebar.classList.remove('active');
            selectedNodeId = null;
            cy.elements().removeClass('selected-path selected-partial');
        }

        const applyCompletionStyles = () => {
            cy.nodes().removeClass('completed');
            cy.edges().removeClass('completed-path completed-partial');
            cy.nodes().forEach(node => {
                if (completedCourses.has(node.id())) {
                    node.addClass('completed');
                    updateLineStyle(node, 'completed-path', 'completed-partial');
                }
            });
        };
        applyCompletionStyles();

        cy.on('mouseover', 'node', function(e) {
            let node = e.target;
            if (node.isParent()) return;
            node.addClass('hover-node');
        });

        cy.on('mouseout', 'node', function(e) {
            cy.elements().removeClass('hover-node');
        });

        cy.on('tap', 'node', function(e) {
            let node = e.target;
            if (node.isParent()) return;

            selectedNodeId = node.id();

            cy.elements().removeClass('selected-path selected-partial');

            node.addClass('selected-path');
            node.outgoers('node').addClass('selected-path');

            updateLineStyle(node, 'selected-path', 'selected-partial');

            courseId.innerHTML = node.data('name') || node.id();
            courseName.innerHTML = node.id();

            if (node.data('description')) {
                description.innerHTML = node.data('description');
                descriptionSection.style.display = 'block';
            } else {
                descriptionSection.style.display = 'none';
            }

            if (node.data('prereq_text')) {
                prereq.innerHTML = node.data('prereq_text').replace('Pre-requisite: ', '');
                prereqSection.style.display = 'block';
            } else {
                prereqSection.style.display = 'none';
            }

            const immediateTargets = node.outgoers('node').filter(t => !t.isParent());
            unlocksList.innerHTML = '';
            if (immediateTargets.length > 0) {
                unlocksSection.style.display = 'block';
                immediateTargets.forEach(target => {
                    const tag = document.createElement('div');
                    tag.className = 'course-tag';
                    tag.textContent = target.id();
                    unlocksList.appendChild(tag);
                });
            } else {
                unlocksSection.style.display = 'none';
            }

            if (completedCourses.has(selectedNodeId)) {
                completeButton.classList.add('is-completed');
                completeButton.innerHTML = 'Completed';
            } else {
                completeButton.classList.remove('is-completed');
                completeButton.innerHTML = 'Mark as Completed';
            }

            fetchLiveCourseData(selectedNodeId);

            sidebar.classList.add('active');
        });

        closeButton.addEventListener('click', closeSidebar);

        cy.on('tap', function(e) {
            if (e.target === cy) {
                closeSidebar();
            }
        });

        completeButton.addEventListener('click', () => {
            if (!selectedNodeId) return;
            if (completedCourses.has(selectedNodeId)) {
                completedCourses.delete(selectedNodeId);
                completeButton.classList.remove('is-completed');
                completeButton.innerHTML = 'Mark as Completed';
            } else {
                completedCourses.add(selectedNodeId);
                completeButton.classList.add('is-completed');
                completeButton.innerHTML = 'Completed';
            }
            localStorage.setItem('completedCourses', JSON.stringify([...completedCourses]));
            applyCompletionStyles();
        });

        document.getElementById('zoom-in-button').addEventListener('click', () => {
            cy.zoom({
                level: cy.zoom() * 1.2,
                renderedPosition: { x: cy.width() / 2, y: cy.height() / 2 }
            });
        });

        document.getElementById('zoom-out-button').addEventListener('click', () => {
            cy.zoom({
                level: cy.zoom() * 0.8,
                renderedPosition: { x: cy.width() / 2, y: cy.height() / 2 }
            });
        });

        document.getElementById('center-button').addEventListener('click', () => {
            cy.fit(null, 50);
        });

        // --- This function helps get course scheules data from the UMB website course catalog ---
        function fetchLiveCourseData(courseId) {
            const offeredSection = document.getElementById('offered-section');
            const offeredContainer = document.getElementById('side-offered');

            offeredSection.style.display = 'none';
            offeredContainer.innerHTML = '';

            let match = courseId.match(/^([A-Za-z]+)\s*(\d+[A-Za-z]?)$/);
            if (!match) return;

            offeredSection.style.display = 'block';

            if (courseCache[courseId]) {
                offeredContainer.innerHTML = courseCache[courseId];
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
        }
});