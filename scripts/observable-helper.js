hexo.extend.helper.register('observable_notebook', function(path, hideAfter=-1){
    
    var notebookHtml = `
    <script type="module">
        import {Runtime, Inspector, Library} from "/notebooks/${path}/runtime.js";
        import notebook from "/notebooks/${path}/index.js";

        const targetDiv = document.getElementById("observable-div")
        const appendixDiv = document.getElementById("observable-div-appendix")
        const hideAfter = ${hideAfter};
        var counter = 0;

        // Get width to use for observable components
        const width = targetDiv.getBoundingClientRect().width;

        const runtime = new Runtime(
            // Override Observable's width property
            Object.assign(new Library, {width})
        );
        console.log(notebook)
        const main = runtime.module(notebook, name => {
            const cellOuter = document.createElement('div');
            cellOuter.classList.add("cellOuter");
            cellOuter.innerHTML = \`<p class="cellNumber">[\${ name ? name : counter}]</p>\`;
            const cellInner = document.createElement('div');
            cellInner.classList.add("cellInner");
            cellOuter.appendChild(cellInner);
            if (counter < hideAfter || hideAfter === -1 ) {
                targetDiv.appendChild(cellOuter)
            } else {
                appendixDiv.appendChild(cellOuter)
            }
            const inspector =  new Inspector(cellInner);
            console.log(inspector);
            counter += 1;
            return inspector;
        });

        
    </script>
    <style>
        .collapseAppendix {
            display: none;
        }
        .cellOuter {
            position: relative;
            padding: -1px;
            border-right: 1px solid;
            border-radius: 4px;
            border-color: rgba(200, 200, 200, 0);
            transition: border-color 1.2s;
            text-align: right;
        }
        .cellOuter:hover {
            border-color: rgba(200, 200, 200, 1.0);
        }
        .cellNumber {
            position: absolute;
            top: 0px;
            left: calc(100% + 5px);
            opacity: 0.0;
            font-size: 0.75em;
            color: rgba(200, 200, 200, 1.0);
            transition: opacity 1.2s;
        }
        .cellOuter:hover .cellNumber {
            opacity: 1.0;
        }
        .cellInner {
            text-align: left;
        }
    </style>
    <div>
    <p>
        This post was first published as an observable notebook. 
        You can find the <a href="https://observablehq.com/${path}">original, editable, forkable notebook</a> on <a href="https://observablehq.com">observablehq.com</a>.
        It's also the best place to view the code behind each cell.
    </p>
    </div>
    <div id="observable-div" style="max-width: 760px;"></div>
    `
    if (hideAfter >= 0) {
        notebookHtml += `   
        <hr/>
        <button id="toggleShowAppendix">Show Appendix</button>
        <div class="collapseAppendix" id="observable-div-appendix" style="max-width: 760px;"></div>
        <script>
            const button = document.getElementById("toggleShowAppendix")
            function handleToggleCollapse() {
                document.getElementById("observable-div-appendix").classList.toggle("collapseAppendix");
                button.textContent = button.textContent === 'Show Appendix' ? 'Hide Appendix' : 'Show Appendix';
            }
            button.addEventListener("click", handleToggleCollapse);
        </script>
        `
    }
    return notebookHtml;

  });
