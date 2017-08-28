    var medicamentos = [{
        fabricante: 'Roche',
        nome: 'Roacutan 20mg, Cápsula (30un)',
        precoMax: 22.10,
        precoMin: 20.99,
        principioAtivo: 'Isotretinoína 20mg',
        titularidade: 'Referência'
    }, {
        fabricante: 'Sundown Vitaminas',
        nome: 'Vitamina C, comprimido (100un)',
        precoMax: 45.15,
        precoMin: 31.99,
        principioAtivo: 'Ácido Ascórbico',
        titularidade: 'Referência'
    }, {
        fabricante: 'Sundown Vitaminas',
        nome: 'Vitamina C, comprimido (180un)',
        precoMax: 10.00,
        precoMin: 10.00,
        principioAtivo: 'Ácido Ascórbico',
        titularidade: 'Genérico'
    }, {
        fabricante: 'EMS Sigma Pharma',
        nome: 'Itraspor 100mg, Cápsula (15un)',
        precoMax: 209.00,
        precoMin: 100.00,
        principioAtivo: 'Itraconazol 100mg',
        titularidade: 'Genérico'
    }, {
        fabricante: 'EMS Sigma Pharma',
        nome: 'Itraspor 100mg, Cápsula (28un)',
        precoMax: 15.00,
        precoMin: 9.99,
        principioAtivo: 'Itraconazol 100mg',
        titularidade: 'Referência'
    }, {
        fabricante: 'Abbott',
        nome: 'Cloridrato de sibutramina 15mg, Cápsula (30un)',
        precoMax: 40.00,
        precoMin: 40.00,
        principioAtivo: 'Cloridrato de sibutramina 15mg',
        titularidade: 'Genérico'
    }, {
        fabricante: 'Abbott',
        nome: 'Cloridrato de sibutramina 15mg, Cápsula (100un)',
        precoMax: 200.00,
        precoMin: 100.00,
        principioAtivo: 'Cloridrato de sibutramina 15mg',
        titularidade: 'Referência'
    }]

    function hasClass(element, className) {
        return element.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(element.className);
    }

    var medTextarea = document.getElementById('getMed');

    function autocomplete(val) {
        var medArray = [];

        for (var item in medicamentos) {
            if (medicamentos.hasOwnProperty(item)) {
                var medicamento = medicamentos[item];

                if (val.search('\n')) {
                    var splitValTextarea = val.split('\n');
                    val = splitValTextarea[splitValTextarea.length - 1];
                }
                if (val === medicamento.nome.toLowerCase().slice(0, val.length)) {
                    medArray.push(medicamento.nome);
                }

            }
        }

        return medArray;
    }


    medTextarea.onkeyup = function(e) {
        var medSearch = this.value;
        var medShow = [];
        var autocompleteModal = document.querySelector('.get-med__modal'),
            autocompleteResults = document.querySelector('.get-med__results');
        medShow = autocomplete(medSearch);
        if (medShow.length > 0 && medShow != '') {

            autocompleteResults.innerHTML = '';

            for (var i = 0; i < medShow.length; i++) {
                for (var x = 0; x < medicamentos.length; x++) {
                    var product = medicamentos[x],
                        manufacturer = product.fabricante,
                        name = product.nome,
                        minPrice = product.precoMin.toFixed(2).replace('.', ','),
                        maxPrice = product.precoMax.toFixed(2).replace('.', ','),
                        activeMain = product.principioAtivo,
                        entitlement = product.titularidade;

                    if (medShow[i] == name) {

                        var genericMed = entitlement == 'Genérico' ? '<div class="package__top package__top--generic"></div><div class="package__middle package__middle--generic"><p class="package__generic">G</p></div><div class="package__bottom package__bottom--generic"></div>' :
                            '<div class="package__top"></div><div class="package__middle"></div><div class="package__bottom"> </div>';

                        var priceMed = minPrice == maxPrice ? '<p class="price__equal">R$' + minPrice + '</p>' : '<p class="price__min">de R$' + minPrice + '</p><p class="price__max">até R$' + maxPrice + '</p>';

                        autocompleteResults.innerHTML += '<div class="get-med__product" data-product="' + name + ', ' + manufacturer + '">' +
                            '<div class="product__box product__box--label">' +
                            '<div class="label__package">' + genericMed + '</div>' +
                            '</div>' +
                            '<div class="product__box product__box--components">' +
                            '<p class="components__name">' + name + '</p>' +
                            '<p class="components__composite">' + activeMain + '</p>' +
                            '</div>' +
                            '<div class="product__box product__box--brand">' +
                            '<p class="brand__med">' + manufacturer + '</p>' +
                            '<p class="brand__type">' + entitlement + '</p>' +
                            '</div>' +
                            '<div class="product__box product__box--price">' +
                            priceMed +
                            '<p class="price__sintese">Síntese</p>' +
                            '</div>' +
                            '</div>';


                    }
                }
            }

            var getCoord = function(e) {
                var carPos = medTextarea.selectionEnd,
                    div = document.createElement('div'),
                    span = document.createElement('span'),
                    copyStyle = getComputedStyle(medTextarea),
                    coords = {};
                [].forEach.call(copyStyle, function(prop) {
                    div.style[prop] = copyStyle[prop];
                });
                div.style.position = 'absolute';
                document.body.appendChild(div);
                div.textContent = medTextarea.value.substr(0, carPos);
                span.textContent = medTextarea.value.substr(carPos) || '.';
                div.appendChild(span);
                coords = {
                    'TOP': span.offsetTop
                };
                autocompleteModal.style.top = (coords.TOP + 140) + 'px';
                document.querySelector('.product__box--icon').style.top = (coords.TOP + 105) + 'px';
                autocompleteModal.style.display = 'block';
                autocompleteModal.classList.add('active');
                document.body.removeChild(div);

            };
            medTextarea.addEventListener('input', getCoord);

            var autocompleteProduct = document.querySelectorAll('.get-med__product');

            document.querySelector('.load__on').style.display = 'block';
            document.querySelector('.load__done').style.display = 'none';

            setTimeout(function() {
                document.querySelector('.load__on').style.display = 'none';
                document.querySelector('.load__done').style.display = 'block';
                autocompleteProduct[0].classList.add('active');

            }, 1000);

            var clickProduct = function(e) {

                var countProduct = [];

                var getMedData = this.dataset.product;

                if (countProduct.indexOf(getMedData) == -1) {
                    countProduct.push(getMedData);
                }

                var valueToTextarea = countProduct.join('\n');

                medTextarea.value += valueToTextarea;

                getCoord();
                document.querySelector('.product__box--icon').classList.remove('product__box--search');
                medTextarea.focus();
                autocompleteModal.style.display = 'none';
                autocompleteResults.innerHTML = '';

            }

            for (var c = 0; c < autocompleteProduct.length; c++) {
                autocompleteProduct[c].addEventListener('click', clickProduct);
                autocompleteProduct[c].addEventListener('mouseover', function() {
                    autocompleteProduct[0].classList.remove('active');

                });

            }
        } else {
            autocompleteModal.style.display = 'none';
        }
    }
    medTextarea.onkeypress = function(e) {
        switch (e.which) {
            case 13:
                document.querySelector('.product__box--icon').classList.add('product__box--search');

        }
    };