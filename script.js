const definitionsRegistry = {
    array: {
        title: "Contiguous Array",
        definition: "A linear data structure storing elements in sequential blocks of memory. Features direct access lookup via index addresses.",
        initial: [24, 67, 43, 89]
    },
    stack: {
        title: "LIFO Stack",
        definition: "A controlled linear structure where insertions and deletions happen exclusively at one boundary node called Top.",
        initial: [18, 45, 92]
    },
    queue: {
        title: "FIFO Queue",
        definition: "A sequential line where new entities enter through Rear pointers while removal operations execute from the Front.",
        initial: [31, 74, 56]
    },
    linkedlist: {
        title: "Singly Linked List",
        definition: "A sequence of distinct dynamic node packets. Every node holds isolated data paired with an explicit pointer linking to its successor.",
        initial: [12, 58, 37]
    },
    tree: {
        title: "Binary Search Tree",
        definition: "A hierarchical node design tree where every sub-parent splits values: left paths hold smaller variants, right paths encapsulate larger entities.",
        initial: [50, 30, 70, 20, 40]
    },
    graph: {
        title: "Network Graph",
        definition: "An interconnected mapping blueprint containing structural coordinate nodes (Vertices) joined globally via relational vectors (Edges).",
        initial: []
    }
};

let currentDS = "";
let dsData = [];
let graphVertices = [];
let graphEdges = [];

// Initialize Platform Hooks
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".dsa-button-card").forEach(card => {
        const type = card.getAttribute("data-ds");
        const color = card.getAttribute("data-color");
        card.style.setProperty('--ds-hover-color', color);
        card.addEventListener("click", () => launchLab(type, color));
    });
});

function launchLab(type, color) {
    currentDS = type;
    document.documentElement.style.setProperty('--active-glow', color);
    
    document.getElementById("hub-page").classList.remove("active");
    document.getElementById("lab-page").classList.add("active");
    
    document.getElementById("lab-title").innerText = definitionsRegistry[type].title;
    document.getElementById("lab-definition").innerText = definitionsRegistry[type].definition;
    
    // Deep Clone Data Arrays
    dsData = [...definitionsRegistry[type].initial];
    if (type === 'graph') {
        graphVertices = [
            {id: 0, x: 150, y: 120}, {id: 1, x: 350, y: 100}, 
            {id: 2, x: 200, y: 260}, {id: 3, x: 450, y: 240}
        ];
        graphEdges = [[0,1], [0,2], [1,3], [2,3]];
    }

    buildConsoleControls();
    renderSandbox();
    printLog(`Loaded structural environment for ${definitionsRegistry[type].title}.`);
}

function exitLab() {
    document.getElementById("lab-page").classList.remove("active");
    document.getElementById("hub-page").classList.add("active");
    document.documentElement.style.setProperty('--active-glow', '#3B82F6');
}

function printLog(msg) {
    document.getElementById("console-output").innerText = `> ${msg}`;
}

function genRand() { return Math.floor(Math.random() * 89) + 10; }

// Build Control Elements Dynamically per DS Matrix
function buildConsoleControls() {
    const container = document.getElementById("dynamic-controls");
    container.innerHTML = "";

    let html = "";
    if (currentDS === 'array') {
        html = `
            <div class="op-group"><input type="number" id="arr-val" value="${genRand()}"><button class="action-btn" onclick="runArrayPush()">Insert End</button></div>
            <div class="op-group"><input type="number" id="arr-find" placeholder="Value"><button class="action-btn" onclick="runArraySearch()">Search</button></div>
            <div class="op-group"><button class="action-btn" style="background:#EF4444; width:100%;" onclick="runArrayPop()">Delete End</button></div>`;
    } else if (currentDS === 'stack') {
        html = `
            <div class="op-group"><input type="number" id="st-val" value="${genRand()}"><button class="action-btn" onclick="runStackPush()">Push Top</button></div>
            <div class="op-group"><button class="action-btn" style="width:100%;" onclick="runStackPeek()">Peek</button></div>
            <div class="op-group"><button class="action-btn" style="background:#EF4444; width:100%;" onclick="runStackPop()">Pop Item</button></div>`;
    } else if (currentDS === 'queue') {
        html = `
            <div class="op-group"><input type="number" id="q-val" value="${genRand()}"><button class="action-btn" onclick="runQueueEnqueue()">Enqueue Rear</button></div>
            <div class="op-group"><button class="action-btn" style="width:100%;" onclick="runQueuePeek()">Front Peek</button></div>
            <div class="op-group"><button class="action-btn" style="background:#EF4444; width:100%;" onclick="runQueueDequeue()">Dequeue Front</button></div>`;
    } else if (currentDS === 'linkedlist') {
        html = `
            <div class="op-group"><input type="number" id="ll-val" value="${genRand()}"><button class="action-btn" onclick="runLLAppend()">Append</button></div>
            <div class="op-group"><input type="number" id="ll-val2" value="${genRand()}"><button class="action-btn" onclick="runLLPrepend()">Prepend</button></div>
            <div class="op-group"><button class="action-btn" style="background:#EF4444; width:100%;" onclick="runLLShift()">Shift Delete</button></div>`;
    } else if (currentDS === 'tree') {
        html = `
            <div class="op-group"><input type="number" id="tr-val" value="${genRand()}"><button class="action-btn" onclick="runTreeInsert()">BST Insert</button></div>
            <div class="op-group" style="gap:5px;">
                <button class="action-btn" style="font-size:0.8rem; padding:8px;" onclick="runTreeTraverse('in')">Inorder</button>
                <button class="action-btn" style="font-size:0.8rem; padding:8px;" onclick="runTreeTraverse('pre')">Preorder</button>
                <button class="action-btn" style="font-size:0.8rem; padding:8px;" onclick="runTreeTraverse('post')">Postorder</button>
            </div>
            <div class="op-group"><button class="action-btn" style="background:#EF4444; width:100%;" onclick="wipeTree()">Wipe Tree</button></div>`;
    } else if (currentDS === 'graph') {
        html = `
            <div class="op-group"><button class="action-btn" style="width:100%;" onclick="runGraphAddVertex()">Add Random Vertex</button></div>
            <div class="op-group"><input type="number" id="gr-v1" placeholder="V1"><input type="number" id="gr-v2" placeholder="V2"><button class="action-btn" onclick="runGraphConnect()">Connect</button></div>
            <div class="op-group" style="gap:5px;">
                <button class="action-btn" style="width:50%;" onclick="runGraphSearch('bfs')">Run BFS</button>
                <button class="action-btn" style="width:50%;" onclick="runGraphSearch('dfs')">Run DFS</button>
            </div>
            <div class="op-group"><button class="action-btn" style="background:#EF4444; width:100%;" onclick="wipeGraph()">Wipe Graph</button></div>`;
    }
    container.innerHTML = html;
}

// Sandbox Core Render Engine
function renderSandbox() {
    const domLayer = document.getElementById("dom-nodes-layer");
    const svgLayer = document.getElementById("canvas-svg");
    
    // Reset Canvas Elements
    domLayer.innerHTML = "";
    domLayer.className = ""; 
    svgLayer.innerHTML = "";

    if (['array', 'stack', 'queue', 'linkedlist'].includes(currentDS)) {
        if (currentDS === 'stack') domLayer.classList.add('mode-stack');
        else domLayer.classList.add(`mode-${currentDS}`);

        dsData.forEach((val, idx) => {
            const capsule = document.createElement("div");
            capsule.className = "v-capsule";
            capsule.id = `node-${idx}`;
            
            if (currentDS === 'array') {
                capsule.innerHTML = `${val} <span class="index-label">idx ${idx}</span>`;
            } else if (currentDS === 'stack') {
                let label = (idx === dsData.length - 1) ? "Top" : "";
                capsule.innerHTML = `${val} <span class="ptr-label">${label}</span>`;
            } else if (currentDS === 'queue') {
                let labels = [];
                if (idx === 0) labels.push("Front");
                if (idx === dsData.length - 1) labels.push("Rear");
                capsule.innerHTML = `${val} <span class="ptr-label">${labels.join('/')}</span>`;
            } else if (currentDS === 'linkedlist') {
                capsule.innerHTML = `${val} <span class="index-label">➔</span>`;
                if (idx === dsData.length - 1) capsule.innerHTML = `${val} <span class="index-label">NULL</span>`;
            }
            domLayer.appendChild(capsule);
        });
    } else if (currentDS === 'tree') {
        renderTreeStructure();
    } else if (currentDS === 'graph') {
        renderGraphStructure();
    }
}

// LINEAR LOGIC EXECUTION INTERFACES
function runArrayPush() {
    let v = parseInt(document.getElementById("arr-val").value);
    if (isNaN(v)) return;
    if (dsData.length >= 8) return printLog("Error: Maximum array allocation boundary hit.");
    dsData.push(v);
    renderSandbox();
    buildConsoleControls();
    printLog(`Inserted structure item value ${v} at destination index ${dsData.length - 1}.`);
}
function runArrayPop() {
    if (!dsData.length) return printLog("Error: Structure empty underflow.");
    let popped = dsData.pop();
    renderSandbox();
    printLog(`Removed termination index value ${popped}.`);
}
function runArrayUpdate() {
    let idx = parseInt(document.getElementById("arr-idx").value);
    let val = parseInt(document.getElementById("arr-u-val").value);
    if (isNaN(idx) || isNaN(val) || idx < 0 || idx >= dsData.length) return printLog("Invalid index bounds target specified.");
    dsData[idx] = val;
    renderSandbox();
    printLog(`Altered index location ${idx} structural data to value ${val}.`);
}
async function runArraySearch() {
    let target = parseInt(document.getElementById("arr-find").value);
    if (isNaN(target)) return;
    printLog(`Initializing sequential lookup traversal execution for element ${target}...`);
    for (let i = 0; i < dsData.length; i++) {
        let node = document.getElementById(`node-${i}`);
        node.classList.add("highlight");
        await new Promise(r => setTimeout(r, 600));
        if (dsData[i] === target) {
            printLog(`Element matched! Target item located at index point location: ${i}.`);
            return;
        }
        node.classList.remove("highlight");
    }
    printLog("Search loop completed. Specified item element target not found in allocation array.");
}

function runStackPush() {
    let v = parseInt(document.getElementById("st-val").value);
    if (isNaN(v)) return;
    if (dsData.length >= 6) return printLog("Stack Overflow risk threshold reached.");
    dsData.push(v);
    renderSandbox();
    buildConsoleControls();
    printLog(`Pushed element value ${v} onto stack frame limit.`);
}
function runStackPop() {
    if (!dsData.length) return printLog("Stack Underflow occurred. Structure holds no frames.");
    let v = dsData.pop();
    renderSandbox();
    printLog(`Executed structural LIFO Pop sequence. Extracted top frame value: ${v}.`);
}
function runStackPeek() {
    if (!dsData.length) return;
    document.getElementById(`node-${dsData.length - 1}`).classList.add("highlight");
    printLog(`Peek operation return value: ${dsData[dsData.length - 1]} at Top pointer location.`);
}

function runQueueEnqueue() {
    let v = parseInt(document.getElementById("q-val").value);
    if (isNaN(v)) return;
    if (dsData.length >= 8) return printLog("Queue structural line allocation boundary limit reached.");
    dsData.push(v);
    renderSandbox();
    buildConsoleControls();
    printLog(`Enqueued element target value ${v} into Rear sequence address layout.`);
}
function runQueueDequeue() {
    if (!dsData.length) return printLog("Queue structure empty underflow encountered.");
    let v = dsData.shift();
    renderSandbox();
    printLog(`Dequeued Front tracking structural position element node value: ${v}.`);
}
function runQueuePeek() {
    if (!dsData.length) return;
    document.getElementById(`node-0`).classList.add("highlight");
    printLog(`Queue system Front monitor pointer target holds active tracking value: ${dsData[0]}.`);
}

function runLLAppend() {
    let v = parseInt(document.getElementById("ll-val").value);
    if (isNaN(v) || dsData.length >= 6) return;
    dsData.push(v);
    renderSandbox(); buildConsoleControls();
}
function runLLPrepend() {
    let v = parseInt(document.getElementById("ll-val2").value);
    if (isNaN(v) || dsData.length >= 6) return;
    dsData.unshift(v);
    renderSandbox(); buildConsoleControls();
}
function runLLShift() {
    if (!dsData.length) return;
    dsData.shift();
    renderSandbox();
}

// COMPACT TREE LAYER ENGINE LOGIC
function buildBSTObject() {
    let root = null;
    function insertNode(node, val, id, depth, x, y) {
        if (!node) return { val, id, left: null, right: null, depth, x, y };
        if (val < node.val) {
            node.left = insertNode(node.left, val, id * 2 + 1, depth + 1, x - (120 / (depth + 1)), y + 75);
        } else {
            node.right = insertNode(node.right, val, id * 2 + 2, depth + 1, x + (120 / (depth + 1)), y + 75);
        }
        return node;
    }
    dsData.forEach((val, i) => { root = insertNode(root, val, 0, 0, 350, 50); });
    return root;
}

function renderTreeStructure() {
    const domLayer = document.getElementById("dom-nodes-layer");
    const svgLayer = document.getElementById("canvas-svg");
    const root = buildBSTObject();
    if (!root) return;

    function traverseRender(node) {
        if (!node) return;
        
        // Render Node Unit Capsule
        const div = document.createElement("div");
        div.className = "absolute-node";
        div.id = `tree-node-${node.val}`;
        div.style.left = `${node.x}px`;
        div.style.top = `${node.y}px`;
        div.innerText = node.val;
        domLayer.appendChild(div);

        // Draw Links
        if (node.left) drawLine(node.x, node.y, node.left.x, node.left.y, svgLayer);
        if (node.right) drawLine(node.x, node.y, node.right.x, node.right.y, svgLayer);
        
        traverseRender(node.left);
        traverseRender(node.right);
    }
    traverseRender(root);
}

function runTreeInsert() {
    let v = parseInt(document.getElementById("tr-val").value);
    if (isNaN(v) || dsData.includes(v)) return printLog("Value exists or input is invalid.");
    if (dsData.length >= 11) return printLog("Binary Search Tree depth layer visualization cutoff.");
    dsData.push(v);
    renderSandbox(); buildConsoleControls();
    printLog(`Inserted node entry path ${v} into sorting tree positions hierarchy.`);
}

function wipeTree() { dsData = []; renderSandbox(); buildConsoleControls(); printLog("Cleared BST."); }

async function runTreeTraverse(mode) {
    let order = [];
    function walkIn(n) { if(!n)return; walkIn(n.left); order.push(n.val); walkIn(n.right); }
    function walkPre(n) { if(!n)return; order.push(n.val); walkPre(n.left); walkPre(n.right); }
    function walkPost(n) { if(!n)return; walkPost(n.left); walkPost(n.right); order.push(n.val); }
    
    let root = buildBSTObject();
    if (mode === 'in') walkIn(root);
    if (mode === 'pre') walkPre(root);
    if (mode === 'post') walkPost(root);

    printLog(`Visualizing ${mode.toUpperCase()}order sequence traversal trajectory...`);
    for (let val of order) {
        let el = document.getElementById(`tree-node-${val}`);
        if(el) el.classList.add("highlight");
        await new Promise(r => setTimeout(r, 600));
        if(el) el.classList.remove("highlight");
    }
}

// COMPACT GRAPH LAYER ENGINE LOGIC
function renderGraphStructure() {
    const domLayer = document.getElementById("dom-nodes-layer");
    const svgLayer = document.getElementById("canvas-svg");

    graphEdges.forEach(edge => {
        let v1 = graphVertices.find(v => v.id === edge[0]);
        let v2 = graphVertices.find(v => v.id === edge[1]);
        if (v1 && v2) drawLine(v1.x, v1.y, v2.x, v2.y, svgLayer);
    });

    graphVertices.forEach(v => {
        const div = document.createElement("div");
        div.className = "absolute-node";
        div.id = `graph-v-${v.id}`;
        div.style.left = `${v.x}px`;
        div.style.top = `${v.y}px`;
        div.innerText = v.id;
        domLayer.appendChild(div);
    });
}

function runGraphAddVertex() {
    if (graphVertices.length >= 7) return printLog("Vertex threshold cap reached.");
    let newId = graphVertices.length ? Math.max(...graphVertices.map(v => v.id)) + 1 : 0;
    let rx = Math.floor(Math.random() * 450) + 100;
    let ry = Math.floor(Math.random() * 200) + 100;
    graphVertices.push({ id: newId, x: rx, y: ry });
    renderSandbox();
    
    if (graphVertices.length >= 2) {
        document.getElementById("gr-v1").value = graphVertices[graphVertices.length - 2].id;
        document.getElementById("gr-v2").value = graphVertices[graphVertices.length - 1].id;
    }
    printLog(`Spawned random workspace graph node Vertex [${newId}].`);
}

function runGraphConnect() {
    let v1 = parseInt(document.getElementById("gr-v1").value);
    let v2 = parseInt(document.getElementById("gr-v2").value);
    if (isNaN(v1) || isNaN(v2) || v1 === v2) return;
    
    let exists = graphEdges.some(e => (e[0]===v1 && e[1]===v2) || (e[0]===v2 && e[1]===v1));
    if (exists) return printLog("Connection map link already tracked between targets.");

    graphEdges.push([v1, v2]);
    renderSandbox();
    printLog(`Established structural undirected network edge link map between node ${v1} and node ${v2}.`);
}

async function runGraphSearch(mode) {
    if (!graphVertices.length) return printLog("Error: No vertices exist to traverse.");
    
    // 1. Build an accurate Adjacency List from existing graph links
    let adj = {};
    graphVertices.forEach(v => adj[v.id] = []);
    graphEdges.forEach(e => { 
        // Ensure both directional pathways exist for undirected logic
        if(adj[e[0]] !== undefined) adj[e[0]].push(e[1]); 
        if(adj[e[1]] !== undefined) adj[e[1]].push(e[0]); 
    });

    let visited = [];
    let processingOrder = [];
    let startNode = graphVertices[0].id; // Always begin traversal at the first node

    // 2. Compute Traversal Array Path
    if (mode === 'bfs') {
        let queue = [startNode];
        visited.push(startNode);
        
        while (queue.length) {
            let curr = queue.shift();
            processingOrder.push(curr);
            
            adj[curr].forEach(neighbor => {
                if (!visited.includes(neighbor)) { 
                    visited.push(neighbor); 
                    queue.push(neighbor); 
                }
            });
        }
    } else { // DFS Execution Matrix
        function dfsCore(node) {
            visited.push(node);
            processingOrder.push(node);
            adj[node].forEach(neighbor => { 
                if (!visited.includes(neighbor)) dfsCore(neighbor); 
            });
        }
        dfsCore(startNode);
    }

    // 3. Trigger Sequential Micro-Task Animation Lookups
    printLog(`Graph Matrix Engine: Running ${mode.toUpperCase()} starting from Vertex [${startNode}]...`);
    
    for (let id of processingOrder) {
        let el = document.getElementById(`graph-v-${id}`);
        if (el) {
            // Flash node with custom vivid color depending on search type
            el.style.backgroundColor = mode === 'bfs' ? '#06B6D4' : '#EC4899';
            el.classList.add("highlight");
            
            // Wait 700ms before shifting to the next step
            await new Promise(resolve => setTimeout(resolve, 700));
            
            el.classList.remove("highlight");
            // Leave a subtle permanent trail so you can see the completed path
            el.style.borderColor = '#FFF'; 
        }
    }
    
    printLog(`${mode.toUpperCase()} Traversal Complete. Visited order sequence: [${processingOrder.join(' ➔ ')}]`);
}
function wipeGraph() { graphVertices = []; graphEdges = []; renderSandbox(); printLog("Graph swept."); }

// Vector Draw Support Utility Function
function drawLine(x1, y1, x2, y2, canvas) {
    const ns = "http://www.w3.org/2000/svg";
    const line = document.createElementNS(ns, "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", "rgba(167, 139, 250, 0.25)");
    line.setAttribute("stroke-width", "2");
    canvas.appendChild(line);
}