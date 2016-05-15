#Simple Bar Graph from JSON array

#Usage
Include the css and js files in your HTML.
<pre>
&lt;link href="css/graph.css" rel="stylesheet"&gt;
&lt;script src="js/graph.js"&gt;&lt;/script&gt;
</pre>

Now the javascript stuff.
```javascript

//Init chart properties
graphIt.init({
    width: 200, // width of the graph
    height: 200, // height of the graph
    totalWidth: 220, // total width and height including
    totalHeight: 250, // legends and axes
    colors : ['green','black'] // colors of bars
});

// Set the data
graphIt.setData([{
    id: 1991,
    score: 100,
    percent: 150
}, {
    id: 1995,
    score: 239,
    percent: 120
}, {
    id: 1999,
    score: 200,
    percent: 120
}]);


// What field is to be shown along x
graphIt.setXLabel('id');

document.body.appendChild(graphIt.chart());

```
