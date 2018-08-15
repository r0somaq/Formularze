// FORMULARZ EDYCJA NIE DZIALA

var data = {
    males: [
        {first_name: 'Adam', last_name: 'Nowak', phone: 123456789, email: 'test1@gmail.com', birthdate: '1987-09-09', is_active: true, tags: ['swiat'] },
        {first_name: 'Krystian', last_name: 'Kowalski', phone: 690626528, email: 'test2@gmail.com', birthdate: '1950-01-07', is_active: false, tags: [] },
        {first_name: 'Daniel', last_name: 'Swoboda', phone: 619873218, email: 'test3@gmail.com', birthdate: '1920-05-03', is_active: true, tags: [] },
        {first_name: 'Wojtek', last_name: 'Hermaszewski', phone: 624433748, email: 'test4@gmail.com', birthdate: '1940-03-01', is_active: false, tags: [] }

    ],
    females: [
        {first_name: 'Kasia', last_name: 'Dabrowska', phone: 764259746, email: 'test5@gmail.com', birthdate: '1985-12-15', is_active: false, tags: ['swiat'] },
        {first_name: 'Basia', last_name: 'Brzozowska', phone: 159753456, email: 'test6@gmail.com', birthdate: '1958-04-12', is_active: true, tags: [] },
        {first_name: 'Renia', last_name: 'Lipowska', phone: 125748356, email: 'test7@gmail.com', birthdate: '1975-09-30', is_active: false, tags: [] },
        {first_name: 'Xenia', last_name: 'Kasztanska', phone: 234867795, email: 'test8@gmail.com', birthdate: '1949-03-16', is_active: true, tags: ['swiat', 'bielsko'] }
    ]
}
//var edit = 0;
var tagi = [
    {tagName: 'swiat', tagDescript: 'tag dotyczacy swiata'},
    {tagName: 'bielsko', tagDescript: 'tag dotyczacy Bielska'}
]

var kolorki = ['#453523', '#978409', '#908734', '#213345', '#516794', '#127948'];

function refreshTags(oldTag, newTag, action) {
    
    if (action == 'edit') {
        //zmieniamy data-name i innerText span'ow ze starym tagiem na nowa wartosc
        var changeTag = document.querySelectorAll('span[data-name="' + oldTag + '"');
        changeTag.forEach(function(el) {
            el.innerText = newTag;
            el.dataset.name = newTag;
        })

    }
    else if (action == 'add') {
        //dodajemy tag do checklisty w formularzu dodawania pracownikow
        var newCheck = document.createElement('label');
        var newInput = document.createElement('input');
        var newSpan = document.createElement('span');

        newInput.setAttribute('name', 'tags');
        newInput.setAttribute('type', 'checkbox');
        
        newSpan.dataset.name = newTag;
        newSpan.innerText = newTag;
        newSpan2 = newSpan.cloneNode(true); //clone elementu dla option w select w formularzu edycji

        newCheck.classList.add('checkbox');
        newCheck.appendChild(newInput);
        newCheck.appendChild(newSpan);
        
        document.getElementById('tagsAddWorker').appendChild(newCheck);
        
        //dodajemy tag do multiselecta w formularzu edycji
        var newOption = document.createElement('option');
        newOption.setAttribute('name', newTag);
        newOption.appendChild(newSpan2);

        document.getElementById('selectTags').appendChild(newOption);
        petlaTagi(0);            

    }

    clear('form3');
}
function clear(formId){

    var form = document.getElementById(formId);
    var inputs = form.querySelectorAll('input[type="text"],textarea, input[name="tags"]:checked');
    form.removeAttribute('data-row');
    
   //if (formId == 'form1' || formId == 'form2') {
   //    document.getElementById('pstrykEdycja').setAttribute('disabled', 'disabled');   
   //}

    var count = inputs.length;
    
    for (var i = 0; i < count; i++) {
        
        if (inputs[i].getAttribute('name') == 'tags') // pobrane do inputs sa tylko checkboxy z checked true
        inputs[i].checked = false;

        inputs[i].value = '';
        inputs[i].classList.remove('error')

    }

}
function validate(formId, exception) {

    var form = document.getElementById(formId);
    var inputs = form.querySelectorAll('input[type="text"],textarea');
    var isValid = true;
    var alertMsg = '';

    var count = inputs.length;
    for(var i = 0; i < count; i++ ) { 
        var input = inputs[i];

        input.classList.remove('error');
        
        if(input.value.trim() == '') {
            input.classList.add('error');
            isValid = false;
            alertMsg = 'Formularz ma puste pola!' 
        }
    } 

    if (formId == 'form1' || formId == 'form2') { // przerobic jesli wystepuje plec/emailfield to wtedy to robic
        
        var emailField = form.querySelector('input[name="email"')
        var formEmail = emailField.value;
        var plec = (form.querySelector('select').value == 'k')? 'females' : 'males';
        
        var count2 = data[plec].length;
        for (var i = 0; i < count2; i++) {
            
            var rowEmail = data[plec][i].email;
            
            if (formEmail == rowEmail && exception != i) {
                
                isValid = false;
                emailField.classList.add('error');
                alertMsg += '\nPodany e-mail juz istnieje w bazie!';
                break;
                
            }
        }
    }

    if( !isValid ) {
        alert(alertMsg);
    }
    
    return isValid;
};

function petlaTagi(init) {

    var tbody = document.getElementById('tbodyTagi');
    tbody.innerHTML = ""; // musi cos istniec
    var count = tagi.length;
    for (var row =  0; row < count; row++) {

        var tr = document.createElement('tr');
        var lp = document.createElement('td');
        lp.innerHTML = row + 1;
        tr.appendChild(lp);

        for (var column in tagi[row]) {

            var value = tagi[row][column];
            var td = document.createElement('td');

            if (column == 'tagName') // dodajemy data-name aby zidentyfikowac tag przy kasowaniu tagu - jesli jest uzywany to alert
            td.dataset.name = value;

            td.innerHTML = '<span data-name="' + value + '">' + value + '</span>';

            tr.appendChild(td);
            
        }
        
        var deleteBtn = document.createElement('button');
        
        deleteBtn.innerHTML = "Kasuj"; 
        deleteBtn.setAttribute('data-row', row);
        
        deleteBtn.onclick = function(e) {

            // sprawdzamy po elementach spany z nazwa tagu, jesli istnieja to je podswietlamy wszystkie a nastepnie wywalamy alert i przerywamy dzialanie delete buttona
            var tagExist = false;
            var tableWorkers = document.getElementsByClassName('table-workers');
            var tagToCheck = e.target.parentElement.querySelector('td[data-name]').innerText;

            for (var table of tableWorkers) {
                
                table.querySelectorAll('.light').forEach(function (tr) {
                    tr.classList.remove('light');
                })
                table.querySelectorAll('span[data-name="' + tagToCheck + '"').forEach(function(span) {
                    tagExist = true;
                    var tr = span.parentElement.parentElement;
                    tr.classList.add('light');
                    setTimeout(function(){ tr.classList.remove('light'); }, 3000);
                }) 
                
            }
            if (tagExist == true) {
                alert('Nie mozna usunac tagu poniewaz jest on uzywany!')
                return;
                
            }
                        
            //for (var plec in data) {
            //    for (var row in data[plec]) {
            //        for (var key in data[plec][row]) {
            //            if (key == 'tags') {
            //                for (var tag of data[plec][row][key]) {
            //                    if (tag == tagToCheck) {
            //                        alert('Nie mozna usunac tagu poniewaz jest on uzywany!')
            //                        return;
            //                    }
            //                }
            //            }
            //            
            //        }
            //    }
            //}
            
            if (!confirm('Are you sure to delete this record?'))
                return;

            var btn = e.target;
            var row2 = btn.getAttribute('data-row'); 
            //var index = tagi[row2];
            tagi.splice(row2, 1);

            // aktualizacja listy tagow w form1 i form2
            refreshTags();
            document.getElementById('form3').setAttribute('data-btn', 0);
            document.getElementById('tagBtn').value = 'Dodaj nowy rekord';
        } 
        
        tr.appendChild(deleteBtn);
        // EDIT BTN
        var editBtn = document.createElement('button');
        
        editBtn.innerHTML = 'Edytuj';
        editBtn.setAttribute('data-row', row);

        editBtn.onclick = function(e) {

            clear('form3');
            var btn = e.target;
            var row2 = btn.getAttribute('data-row');
            var form = document.getElementById('form3');

            form.setAttribute('data-btn', 1);
            form.setAttribute('data-row', row2);
                        
            for (var column in tagi[row2]) {

                var value = tagi[row2][column];
                form.querySelector('[name="' + column + '"').value = value;
            }
            //edit = 1;
            form.querySelector('input[id="tagBtn"]').value = 'Zapisz edycje';
        }

        tr.appendChild(editBtn);
        tbody.appendChild(tr);
    }
    //dodajemy tagi do formularza 1 i 2
    if (init == 1) {
        
        var tagsAddWorker = document.querySelector('#tagsAddWorker');
        var tags = document.querySelector('select[name="tags"]');
        
        tagi.forEach(function(el) {
            
            var newTag = document.createElement('label');
            newTag.classList.add('checkbox');
            newTag.innerHTML = '<input type="checkbox" name="tags"> <span data-name="' + el.tagName + '">' + el.tagName +'</span>';
            tagsAddWorker.appendChild(newTag);
            
            var newOption = document.createElement('option');
            newOption.setAttribute('name', el.tagName);
            newOption.innerHTML = '<span data-name="' + el.tagName + '">' + el.tagName +'</span>';
            tags.appendChild(newOption);
        })
    } 
}

var petla = function(plecTabela, plec) {
   
    var tbody = document.getElementById(plecTabela);
    tbody.innerHTML = "";
    
    var count = data[plec].length
    for (var wiersz = 0; wiersz < count; wiersz++) {
        
        var tr = document.createElement("tr");
        var lp = document.createElement("td");
        lp.innerHTML = wiersz + 1;
        tr.appendChild(lp);
        
        for (var kolumna in data[plec][wiersz]) {
            
            var wartosc = data[plec][wiersz][kolumna];
            var td = document.createElement("td");             
            
            if(kolumna == 'is_active') {
                td.className = 'text-center';
                var span = document.createElement("span");
                var cls = 'badge';
           
                
                if(wartosc == true) {
                    cls += ' badge-zielony';
                    var txt = 'TAK';
                }
                else {
                    cls += ' badge-czerwony';
                    var txt = 'NIE';
                }
                
                span.className = cls;
                span.innerHTML = txt;
                td.appendChild(span);
            }
            else if (kolumna == 'tags') {
                //dla kazdego taga tworzymy element span dzieki ktoremu latwiej bedzie go znalezc
                var wsad = '';
                data[plec][wiersz][kolumna].forEach(function(tag) {

                    tag = '<span data-name="' + tag + '">' + tag + '</span>';
                    wsad += (tag + ' ');

                })

                td.innerHTML = wsad;

            }
            //else if (kolumna == 'tags') {
            //    console.log(wartosc);
//
            //    td.innerHTML = wartosc;//.toString();
            //}
            else {
                    td.innerHTML = wartosc;
            }
                
            tr.appendChild(td);
                
        }

        var deleteBtn = document.createElement('button');
    
        deleteBtn.innerHTML = "Kasuj"; 
        deleteBtn.setAttribute('data-row', wiersz);

        deleteBtn.onclick = function(e) {

            if (!confirm('Are you sure to delete this record?'))
            return
            var btn = e.target;
            var row = btn.getAttribute('data-row'); 
            //var index = data[plec][row];
            var form = document.getElementById('form2');
            
            form.dataset.deleted = row;
            
            if (form.dataset.deleted === form.dataset.row) {
                
                $('#slideForm').slideUp('slow');
                clear('form2');
                //form.removeAttribute('data-deleted');

            }
            else if (form.dataset.deleted < form.dataset.row && form.dataset.sex == e.target.parentElement.parentElement.getAttribute('id')) {

                form.dataset.row -= 1;
                //form.removeAttribute('data-deleted');
                
            }
            form.removeAttribute('data-deleted');

            data[plec].splice(row, 1);
            //form.removeAttribute('data-row');
            petla(plecTabela, plec);
            clear('form1');

            // jesli skasujemy edytowany rekord to czyscimy formularz edycji
        } 
        
        tr.appendChild(deleteBtn);
        
        var editBtn = document.createElement('button');
        
        editBtn.innerHTML = 'Edytuj';
        editBtn.setAttribute('data-row', wiersz);

        editBtn.onclick = function(e) {
            $('#slideForm').slideDown('slow');
            var btn = e.target;
            var row = btn.getAttribute('data-row');
            var form = document.getElementById('form2');
            
            form.querySelector('input[id="pstrykEdycja"]').removeAttribute('disabled');
            form.dataset.row = row;
            
            form.dataset.sex = e.target.parentElement.parentElement.getAttribute('id');
            
            var plecValue = (plec == 'males')? 'm' : 'k';
            form.querySelector('select').value = plecValue;
            
            if (form.hasAttribute('data-deleted'))
            form.removeAttribute('data-deleted');

            for (var kolumna in data[plec][row]) {

                var value = data[plec][row][kolumna];
               
                if (typeof(value) == 'boolean') {
                    
                    //////////////form.querySelector('input[name="'+ kolumna +'"][checked]').removeAttribute('checked');
                    ///////////////////var checkedOption = (value)? '1' : '0';
                    ///////////////////form.querySelector('input[name="' + kolumna + '"][value="' + checkedOption + '"]').setAttribute('checked', true);

                    if (value == true) {
                        form.querySelector('input[name="' + kolumna + '"][value="1"]').checked = true;
                        form.querySelector('input[name="' + kolumna + '"][value="0"]').checked = false;
                    }
                    else {
                        form.querySelector('input[name="' + kolumna + '"][value="1"]').checked = false;
                        form.querySelector('input[name="' + kolumna + '"][value="0"]').checked = true;
                    }
                    
                }
                else if (typeof(value) == 'object') {

                    form.querySelector('select:not([name="gender"])').querySelectorAll('option').forEach(function(option) {
                        option.selected = false;
                    });

                    if (value !== 0) {
                        
                        value.forEach(function(elem) {

                            form.querySelector('option[name="'+ elem +'"]').selected = true;
                        })
                    }
                    
                }
                else {

                    form.querySelector('input[name="' + kolumna + '"').value = value;

                }
                
            }

        }

        tr.appendChild(editBtn);

        tbody.appendChild(tr);

    }

};

var addEvents = function() {  
    
    $('.pstryczek').click(function() {
        
        var cls = $(this).attr('data-class');
        var target = $(this).attr('data-target');
        var element = $("#"+target);
        
        if(element.hasClass(cls) ) 
        element.removeClass(cls);
        else
        element.addClass(cls);
        
    });

    $('#pstrykKolor').click(function(e){
        e.preventDefault();
        var nowyKolor = document.querySelector('input[name="colorName"]').value; 
        kolorki.push(nowyKolor);
    })
    

    $('#pstrykDane').click(function(e){
        e.preventDefault();
  
        var form = document.getElementById('form1');
        var inputs = form.querySelectorAll('input[type="text"], input[type="radio"]:checked, select:not([name="gender"]), input[type="checkbox"]:checked'); //dwa radia// wszystkie selecty poza tymi ktore maja name -> gender
       
        var plec = (form.querySelector('select').value == 'k')? 'females' : 'males';
        var targetTable = ( plec == 'females')? 'tbodyKobiety' : 'tbodyMezczyzni';

        var dataToPush = {};
        var lastIteration = inputs.length; // bo  przy kazdej iteracji sprawdza dlugosc obiektu/tabeli co wplywa na szybkosc dzialania. Zapisujac gotowa wartosc po prostu ja podajemy i petla nie sprawdza za kazda iteracja jaka jest dlugosc
        
        var tagsTab = [];

        for (var i = 0; i < lastIteration; i++) {
            
            var keyName = inputs[i].name;

            if (keyName == 'is_active') {
                
                dataToPush[keyName] = (form.querySelector('input[name="'+ keyName +'"]:checked').value == '1')? true : false;

            } 
            else if (keyName == 'tags') {

                //console.log(inputs[i].nextElementSibling.innerText);
                tagsTab.push(inputs[i].nextElementSibling.innerText); // dodajemy zawartosc spana przy checkboxie
                dataToPush[keyName] = tagsTab; 

            }
            else {
                
                dataToPush[keyName] = inputs[i].value;

            }
        }
        
        var sprawdzony = validate('form1', -1);
        if (sprawdzony == false)
            return;

        data[plec].push(dataToPush);
        petla(targetTable, plec);
        clear('form1');
        
    });

    $('.pstryczek2').click(function() {
    
        var counter = $(this).attr('data-counter');
        var target = $(this).attr('data-target');                      
        
        counter = parseInt(counter, 10); // niezdefiniowany jest counter, a nie data-counter, tak jakby var counter; -> tez jest undefined
        
        if (isNaN(counter)) {
            counter = 0;
        }
        
        var kolorek = kolorki[counter];
        $(this).css({background: kolorek});
        $('#'+target).css({backgroundColor: kolorek});
        
        counter++;

        if (counter == kolorki.length) {
            counter = 0;
        }
        $(this).attr('data-counter', counter);
    });
    
    
    $('#pstrykEdycja').click(function(e) {

        e.preventDefault();
        
        var form = document.getElementById('form2');

        var inputs = form.querySelectorAll('input[type="text"], input[type="radio"]:checked, select:not([name="gender"])');

        var row = form.getAttribute('data-row');
        var plec = (form.querySelector('select').value == 'k')? 'females' : 'males';
        var targetTable = ( plec == 'females')? 'tbodyKobiety' : 'tbodyMezczyzni';
        
        var sprawdzony = validate('form2', row);
        if (sprawdzony == false)
            return;

        var lastIteration = inputs.length; // w for mial juz liczbe calkowita inputow i na podstawie tego tworzyl kolejne kolumny

        
        for (var i = 0; i < lastIteration; i++) {
            
            var keyName = inputs[i].name;
            
            if (keyName == 'is_active') {
                data[plec][row][keyName] = (form.querySelector('input[name="'+ keyName +'"]:checked').value == '1')? true : false;
            }
            else if (keyName == 'tags') {

                // kopiujemy zaznaczone optiony do nowej tablicy i zastepujemy wartosc wlasciwosci tags nowa tablica
                var newTags = [];
                form.querySelectorAll('select[name="tags"] option').forEach(function(option) {
                    if (option.selected == true) {
                        newTags.push(option.innerText);
                    }
                })
                data[plec][row][keyName] = newTags;

            }
            else {
                data[plec][row][keyName] = inputs[i].value;
            }
        }
        
        //form.removeAttribute('data-row');
        petla(targetTable, plec);
        $('#slideForm').slideUp('slow');
        clear('form2');
        
    });
        
    $('#tagBtn').click(function (e) {

        e.preventDefault();

        var form = document.getElementById('form3');
        var inputs = form.querySelectorAll('input[type="text"], textarea');


        var row = form.getAttribute('data-row');
        var dataEdit = form.getAttribute('data-btn')

        var dataToPush = {};

        var lengthInputs = inputs.length;
        var newTag = '';
        var oldTag = '';
        if (dataEdit == 1) {

            for (var i = 0; i < lengthInputs; i++) {

                var keyName = inputs[i].name;
                
                //var sprawdzony = validate('form3');
                //if (sprawdzony == false)
                //    return;
                if (validate('form3') == false)
                    return;

                tagi[row][keyName] = inputs[i].value;
                console.log(keyName);
                if (keyName == 'tagName') {
                    newTag = inputs[i].value;
                    oldTag = document.querySelector('#tbodyTagi').children[form.dataset.row].children[1].innerText;
                }

            }
            form.querySelector('input[id="tagBtn"]').value = 'Dodaj nowy rekord';
            form.setAttribute('data-btn', 0);

            refreshTags(oldTag, newTag, 'edit');
        }
        else {
            for (var i = 0; i < lengthInputs; i++) {
                
                var keyName = inputs[i].name;
                dataToPush[keyName] = inputs[i].value;
                if(keyName == 'tagName')
                newTag = inputs[i].value;
                
            }
            if (validate('form3') == false)
            return;
            
            tagi.push(dataToPush);

            refreshTags(oldTag, newTag, 'add');
            
        }

    });

    
}

