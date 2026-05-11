const GRAPH_CONFIG = {
    zoom: 0.55,
    minZoom: 0.4,
    maxZoom: 5
}
const CREDIT_CATEGORIES = [
    {
        ids: new Set(['CS110','CS210','CS220','CS240','CS285L','CS310',
                      'CS341','CS410','CS420','CS444','CS446','CS449','CS451']),
        max: 41,
        parentId: 'Computer_Science',
        baseName: 'Computer Science'
    },
    {
        ids: new Set(['MATH140','MATH141','Math260','MATH345']),
        max: 14,
        parentId: 'Math',
        baseName: 'Mathematics'
    },
    {
        ids: new Set(['PHYSIC113','PHYSIC114','PHYSIC181','PHYSIC182']),
        max: 12,
        parentId: 'Physics',
        baseName: 'Physics'
    },
    {
        ids: new Set(['CS413','CS415','CS430','CS435','CS436','CS437',
                      'CS438','CS442','CS443','CS450','CS460','CS461','CS470','CS480']),
        max: 6,
        parentId: 'CS_Electives',
        baseName: 'CS Electives'
    }
];

let cy;
let completedCourses = new Set(JSON.parse(localStorage.getItem('completedCourses') || '[]'));
let selectedNodeId = null;
let currentTheme = localStorage.getItem('theme');
if (!currentTheme) {
    currentTheme = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
}

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
const themeToggleBtn = document.getElementById('theme-toggle');

const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (themeToggleBtn) {
        themeToggleBtn.innerHTML = `<i data-lucide="${theme === 'light' ? 'moon' : 'sun'}"></i>`;
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }
};

applyTheme(currentTheme);

const closeSidebar = () => {
    sidebar.classList.remove('active');
    selectedNodeId = null;
    cy.elements().removeClass('selected-path selected-partial');
};

const updateLineStyle = (node, solidClass, dashedClass) => {
    node.outgoers('edge').forEach(edge => {
        const target = edge.target();
        const otherPrereqs = target.incomers('node').difference(node);
        const prereqsMet = otherPrereqs.every(p => completedCourses.has(p.id()));
        edge.addClass(otherPrereqs.length > 0 && !prereqsMet ? dashedClass : solidClass);
    });
};

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

const updateCreditcount = () => {
    CREDIT_CATEGORIES.forEach(cat => {
        let earned = 0;
        cat.ids.forEach(id => {
            if (completedCourses.has(id)) {
                const node = cy.$('#' + id);
                if (node.length > 0) {
                    earned += (node.data('credits') || 0);
                }
            }
        });
        const parentNode = cy.$('#' + cat.parentId);
        if (parentNode.length > 0) {
            parentNode.data('name', `${cat.baseName} - ${earned}/${cat.max} credits taken`);
        }
    });
};

const cyEvents = () => {
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
        fetchCourseSchedule(selectedNodeId);
        sidebar.classList.add('active');
    });

    cy.on('tap', function(e) {
        if (e.target === cy) {
            closeSidebar();
        }
    });
}

const uiEvents = () => {
    closeButton.addEventListener('click', closeSidebar);
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
        updateCreditcount();
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

    document.getElementById('theme-toggle').addEventListener('click', () => {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(currentTheme);
        if (cy && typeof getCyStyle !== 'undefined') {
            cy.style(getCyStyle());
        }
    });


    document.getElementById('cs-electives-button').addEventListener('click', () => {
       const electiveCourse = cy.$('#CS_Electives');
       cy.animate({
            fit: {
                eles: electiveCourse.union(electiveCourse.children()),
                padding: 100,
            },
            duration: 700,
            easing: 'ease-in-out'
       });
    });
}   

const initCy = (data) => {
    cy = cytoscape({
        container: document.getElementById('cy'),
        elements: data,
        style: getCyStyle(),
        layout: { name: 'preset', fit: false },
        ...GRAPH_CONFIG
    });
}

fetch(BASE_URL + '/WEB/academics/planner/prerequisites.json?v=' + new Date().getTime())
    .then(res => res.json())
    .then(data => {
        initCy(data);
        cyEvents();
        uiEvents();
        applyCompletionStyles();
        updateCreditcount();
        cy.center(cy.$('#MATH130'));
        cy.panBy({ x: 0, y: -280 });
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    });