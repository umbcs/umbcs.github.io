const GRAPH_CONFIG = {
    zoom: 0.669,
    pan: { x: 800, y: 300 },
    minZoom: 0.4,
    maxZoom: 5
}   

let cy;
let completedCourses = new Set(JSON.parse(localStorage.getItem('completedCourses') || '[]'));
let selectedNodeId = null;

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
}   

const initCy = (data) => {
    cy = cytoscape({
        container: document.getElementById('cy'),
        elements: data,
        style: cyStyle,
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
    });