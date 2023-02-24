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
        const width = targetDiv.getBoundingClientRect().width  - 25;

        const runtime = new Runtime(
            // Override Observable's width property
            Object.assign(new Library, {width})
        );
        const main = runtime.module(notebook, name => {
            
            // Create cell div
            const cellOuter = document.createElement('div');
            cellOuter.classList.add("cell--outer");
            
            // When we encounter a viewof node, hide the next sibling with some css
            if (name && name.startsWith('viewof ')) {
                cellOuter.classList.add("cell--viewof");
            }

            // Add Cell Number
            cellOuter.innerHTML = \`<p class="cell--number">[\${ name ? name : counter}]</p>\`;
            const cellInner = document.createElement('div');
            cellInner.classList.add("cell--inner");


            cellOuter.appendChild(cellInner);
            
            // Add the content to the correct div.
            if (counter < hideAfter || hideAfter === -1 ) {
                targetDiv.appendChild(cellOuter)
            } else {
                appendixDiv.appendChild(cellOuter)
            }
            
            const inspector =  new Inspector(cellInner);
            console.log({inspector});
            counter += 1;
            return inspector;
        });

        
    </script>
    
    <div>
    <p>
        This post was first published as an observable notebook. 
        You can find the <a href="https://observablehq.com/${path}">original, editable, forkable notebook</a> on <a href="https://observablehq.com">observablehq.com</a>.
        It's also the best place to view the code behind each cell.
    </p>
    </div>
    <div id="observable-div"></div>
    `
    if (hideAfter >= 0) {
        notebookHtml += `   
        <hr/>
        <button id="toggleShowAppendix">Show Appendix</button>
        <div class="collapseAppendix" id="observable-div-appendix"></div>
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
