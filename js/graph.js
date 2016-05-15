var graphIt = {
    colors: ['orange', 'green', 'red'],
    width: 200,
    height: 200,
    legendHeight: 100,
    legendWidth: 60,
    xLabel: '',
    labels: [],
    barWidth: 50,
    offset: 25,
    widthPerRow: 0,
    unitPixelVal: 0,
    data: [],
    init: function (data) {
        var prop = '';
        for (prop in data) {
            this[prop] = data[prop];
        }

        if (this.totalWidth && !isNaN(this.totalWidth) && !isNaN(this.width)) {
            this.legendWidth = this.totalWidth - this.width;
        }

        if (this.totalHeight && !isNaN(this.totalHeight) && !isNaN(this.height)) {
            this.legendHeight = this.totalHeight - this.height;
        }

    },
    setData: function (data) {
        this.data = data;
    },
    setXLabel: function (xLabel) {
        this.xLabel = xLabel;
    },
    setYLabels: function (labels) {
        this.labels = labels;
    },
    graph: function () {

        var gf = document.createElement('div'),
            bar, i, j, row, label, col, len = this.data.length,
            prop;


        gf.style.height = this.width + 'px';
        gf.style.width = this.height + 'px';
        gf.className = 'gfContainer';

        var nCols = this.labels.length;

        this.widthPerRow = this.width / len;

        var pos = this.offset;

        for (i = 0; i < len; i++) {
            row = this.data[i];
            for (j = 0; j < nCols; j++) {
                label = this.labels[j];
                col = row[label];
                if (col) {
                    bar = document.createElement('div');
                    bar.className = 'gfBar';

                    bar.style.width = this.barWidth + 'px';
                    bar.style.backgroundColor = this.colors[j];
                    bar.style.height = Math.floor(col / this.unitPixelVal) + 'px';
                    bar.style.left = pos + 'px';
                    bar.title = label + '=' + col;
                    gf.appendChild(bar);
                }
                pos += this.barWidth;
            }
            pos += this.offset;
        }

        return gf;

    },
    chart: function () {
        var gf, i, len = this.data.length,
            pos = this.offset,
            widthPerRow, prop;

        if (len === 0) {
            return;
        }


        // get all labels which are numbers and not the xaxis label
        if (this.labels.length === 0) {
            col = this.data[0];
            for (prop in col) {
                if (prop !== this.xLabel && typeof col[prop] === 'number') {
                    this.labels.push(prop);
                }
            }

        }


        var nCols = this.labels.length;
        var max = 0;
        for (i = 0; i < len; i++) {
            row = this.data[i];
            for (j = 0; j < nCols; j++) {
                prop = this.labels[j];
                if (max < row[prop]) {
                    max = row[prop];
                }
            }
        }



        max = Math.ceil(max / 10) * 10;

        this.unitPixelVal = max / this.height;

        this.widthPerRow = Math.ceil(this.width / len);
        this.barWidth = Math.ceil(this.widthPerRow / (nCols + 1));

        this.offset = Math.ceil(this.barWidth / 2);

        pos = this.legendWidth + this.offset;
        gf = document.createElement('div');
        gf.style.height = (this.height + this.legendHeight) + 'px';
        gf.style.width = (this.width + this.legendWidth) + 'px';
        gf.style.position = 'relative';
        gf.appendChild(this.graph());

        for (i = 0; i < len; i++) {
            gf.appendChild(this.addLabel(i, pos));
            pos += this.widthPerRow - this.offset;
        }
        gf.appendChild(this.addLegend());
        gf.appendChild(this.addYAxis(max));
        return gf;
    },
    addLabel: function (i, pos) {

        var lbl = document.createElement('div');
        lbl.className = 'gfLabel';

        lbl.style.width = (this.widthPerRow - this.barWidth) + 'px';
        lbl.style.left = pos + 'px';
        lbl.style.bottom = (this.legendHeight - 20) + 'px';
        lbl.innerHTML = this.data[i][this.xLabel];

        return lbl;
    },
    addLegend: function () {

        var lgndBar = document.createElement('div');
        lgndBar.style.height = this.legendHeight + 'px';
        lgndBar.style.width = (this.width + this.legendWidth) + 'px';
        lgndBar.style.bottom = '0px';
        lgndBar.style.position = 'absolute';

        var len = this.labels.length,
            i;

        for (i = 0; i < len; i++) {
            var lgnd = document.createElement('div');
            lgnd.className = 'gfLegendItem';


            var cbox = document.createElement('div');
            cbox.className = 'gfLegendColorBox';
            cbox.style.backgroundColor = this.colors[i];

            lgnd.appendChild(cbox);


            var lbl = document.createElement('div');
            lbl.className = 'gfLegendLabel';

            lbl.innerHTML = this.labels[i];

            lgnd.appendChild(lbl);


            lgndBar.appendChild(lgnd);
        }

        return lgndBar;
    },
    addYAxis: function (max) {
        var div = max / 4,
            i;
        var pixDiv = Math.floor(this.height / 4);

        var gf = document.createElement('div');
        gf.style.height = (this.height) + 'px';
        gf.style.width = (this.legendWidth) + 'px';
        gf.style.position = 'absolute';
        gf.style.left = '0px';

        for (i = 0; i <= 4; i++) {
            var lgndBar = document.createElement('div');


            lgndBar.style.bottom = (pixDiv * i - 1) + 'px';

            lgndBar.className = 'gfYAxisLabel';

            lgndBar.innerHTML = div * i;
            gf.appendChild(lgndBar);
        }

        return gf;
    }

};


