hexo.extend.helper.register('observable_notebook', function(path){
    return `
    <script type="module">
        // Load the Observable runtime and inspector.
        import {Runtime, Inspector} from "/notebooks/${path}/runtime.js";

        // Your notebook, compiled as an ES module.
        import notebook from "/notebooks/${path}/index.js";
        const target_div = document.getElementById("observable-div")
        const runtime = new Runtime();
        const main = runtime.module(notebook, Inspector.into(target_div));
    </script>
    <div id="observable-div"></div>
    `
  });