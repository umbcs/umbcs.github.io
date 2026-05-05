const cyStyle = [
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
];