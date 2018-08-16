var data = {
    males: [
        {first_name: 'Adam', last_name: 'Nowak', phone: 123456789, email: 'test1@gmail.com', birthdate: '1987-09-09', is_active: true, tags: ['swiat'], avatar: 1 },
        {first_name: 'Krystian', last_name: 'Kowalski', phone: 690626528, email: 'test2@gmail.com', birthdate: '1950-01-07', is_active: false, tags: [], avatar: 1},
        {first_name: 'Daniel', last_name: 'Swoboda', phone: 619873218, email: 'test3@gmail.com', birthdate: '1920-05-03', is_active: true, tags: [], avatar: 1},
        {first_name: 'Wojtek', last_name: 'Hermaszewski', phone: 624433748, email: 'test4@gmail.com', birthdate: '1940-03-01', is_active: false, tags: [], avatar: 1},
        {first_name: 'Wojtek', last_name: 'Hermaszewski', phone: 624433748, email: 'test41@gmail.com', birthdate: '1940-03-01', is_active: false, tags: [], avatar: 1},
        {first_name: 'Wojtek', last_name: 'Hermaszewski', phone: 624433748, email: 'test42@gmail.com', birthdate: '1940-03-01', is_active: false, tags: [], avatar: 3},
        {first_name: 'Wojtek', last_name: 'Hermaszewski', phone: 624433748, email: 'test43@gmail.com', birthdate: '1940-03-01', is_active: false, tags: [], avatar: 2},
        {first_name: 'Wojtek', last_name: 'Hermaszewski', phone: 624433748, email: 'test44@gmail.com', birthdate: '1940-03-01', is_active: false, tags: [], avatar: 2},
        {first_name: 'Wojtek', last_name: 'Hermaszewski', phone: 624433748, email: 'test45@gmail.com', birthdate: '1940-03-01', is_active: false, tags: [], avatar: 3},
        {first_name: 'Wojtek', last_name: 'Hermaszewski', phone: 624433748, email: 'test46@gmail.com', birthdate: '1940-03-01', is_active: false, tags: [], avatar: 1}

    ],
    females: [
        {first_name: 'Kasia', last_name: 'Dabrowska', phone: 764259746, email: 'test5@gmail.com', birthdate: '1985-12-15', is_active: false, tags: ['swiat'], avatar: 1},
        {first_name: 'Basia', last_name: 'Brzozowska', phone: 159753456, email: 'test6@gmail.com', birthdate: '1958-04-12', is_active: true, tags: [], avatar: 1},
        {first_name: 'Renia', last_name: 'Lipowska', phone: 125748356, email: 'test7@gmail.com', birthdate: '1975-09-30', is_active: false, tags: [], avatar: 1},
        {first_name: 'Xenia', last_name: 'Kasztanska', phone: 234867795, email: 'test8@gmail.com', birthdate: '1949-03-16', is_active: true, tags: ['swiat', 'bielsko'], avatar: 1}
    ]
}

var tagi = [
    {tagName: 'swiat', tagDescript: 'tag dotyczacy swiata'},
    {tagName: 'bielsko', tagDescript: 'tag dotyczacy Bielska'}
]

var kolorki = ['#453523', '#978409', '#908734', '#213345', '#516794', '#127948'];

function checkPage(tbody) {

    for (var tr of tbody.children) {

        if (tr.dataset.page != tbody.dataset.page) {
            tr.classList.add('tr-deactive');
        }
        else {
            tr.classList.remove('tr-deactive');
        }
    }
}

function paginationTable(tbodyID, nrPP) { 

    var tbody = document.getElementById(tbodyID); 
    var allTr = tbody.children; 
    var tbodyGender = (tbody.id == 'tbodyMezczyzni')? 'malePage' : 'femalePage';
    var nrPP = nrPP; //liczba tr na strone paginacji

    var allTrLen = allTr.length;
    var page = 0; 

    for ( var i = 0; i < allTrLen; i++) {

        if (i % nrPP == 0)
        page++;
        allTr[i].classList.add(tbodyGender+page); //dodanie tr odpowiednich klas
        allTr[i].dataset.page = page;
    
    }
    var paginatorPage = Math.ceil((allTrLen/nrPP)); //liczba podstron
    
    var nav = tbody.parentElement.parentElement.querySelector('nav');
    var ul = document.createElement('ul');
    ul.classList.add('pagination');
    
    tbody.dataset.page = '1';
    checkPage(tbody);

    for (var i = 0; i < (paginatorPage); i++) {

        var li = document.createElement('li');
        if ( i == 0 )
        li.classList.add('active');
        var ahref = document.createElement('a');
        ahref.setAttribute('href', '.' + ( tbodyGender + (i+1) ) );
        ahref.innerText = i + 1;
        ahref.onclick = function(e) {
            
            e.preventDefault();

            var ul = e.target.parentElement.parentElement.children;
            for (var li of ul) {li.classList.remove('active');}
            //zmieniamy aktywny przycisk
            e.target.parentElement.classList.add('active');

            tbody.dataset.page = e.target.innerText;
            checkPage(tbody);
        };
        li.appendChild(ahref);
        ul.appendChild(li);
    }

    while (nav.firstChild)
    nav.removeChild(nav.firstChild);
    nav.appendChild(ul);

}

function avatar(form) { //funkcja do wyswietlania avatarow przy edycji/dodawaniu

    var avaDiv = form.querySelector('.avatarWorker');
    var options = form.querySelectorAll('select[name="gender"] option');
    var plec;

    options.forEach(function(option) {

        if (option.selected)
        plec = (option.value == 'k')? 'females' : 'males';

    })
    
    while (avaDiv.firstChild)
    avaDiv.removeChild(avaDiv.firstChild);

    for (var i = 1; i < 4; i++) {
        
        var input = document.createElement('input');
        input.type = 'radio';

        if (i == 1) //defaultowy check
        input.checked = true;

        input.name = 'avatar';
        input.value = i;
        avaDiv.appendChild(input);

        var img = document.createElement('img');
        img.src = 'img/' + plec + '/' + i + '.png';
        //img.dataset.sex = plec; nie wiem czy potrzebne
        //img.dataset.avatar = i;
        img.alt = 'avatar nr : ' + i;
        avaDiv.appendChild(img);
        
        avaDiv.appendChild(document.createElement('br'));
        avaDiv.appendChild(document.createElement('br'));
        
    }
};

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
};

function clear(formId){

    var form = document.getElementById(formId);
    var inputs = form.querySelectorAll('input[type="text"],textarea, input[name="tags"]:checked');
    form.removeAttribute('data-row');
    
    var count = inputs.length;
    
    for (var i = 0; i < count; i++) {
        
        if (inputs[i].getAttribute('name') == 'tags' && !(inputs[i].hasAttribute('hidden'))) {
            
            inputs[i].checked = false;

        }
        else {

            inputs[i].value = '';
            inputs[i].classList.remove('error')
        
        }
    }

    form.querySelector('input[name="avatar"][value="1"]').checked = true;

};

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

    if (formId == 'form1' || formId == 'form2') {
        
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
    tbody.innerHTML = ""; 
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

            // sprawdzamy po elementach spany z nazwa tagu, jesli istnieja to podswietlamy wszystkie tr'y z tagiem, a nastepnie wywalamy alert i przerywamy dzialanie delete buttona
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
            
            if (!confirm('Are you sure to delete this record?'))
                return;

            var btn = e.target;
            var row2 = btn.getAttribute('data-row'); 
            tagi.splice(row2, 1);

            // aktualizacja listy tagow w form1 i form2
            refreshTags();
            document.getElementById('form3').setAttribute('data-btn', 0);
            document.getElementById('tagBtn').value = 'Dodaj nowy rekord';
        } 
        
        tr.appendChild(deleteBtn);

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
};

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
            else if (kolumna == 'avatar') {
                
                //pobieramy avatar i wsadzamy do tabeli
                var img = document.createElement('img');
                img.src = 'img/' + plec + '/' + wartosc + '.png';
                img.alt = 'avatar nr: ' + wartosc;
                td.appendChild(img);
                
            }
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
            var form = document.getElementById('form2');
            
            form.dataset.deleted = row;
            
            if (form.dataset.deleted === form.dataset.row) {
                
                $('#slideForm').slideUp('slow');
                clear('form2');

            }
            else if (form.dataset.deleted < form.dataset.row && form.dataset.sex == e.target.parentElement.parentElement.getAttribute('id')) {

                form.dataset.row -= 1;
                
            }
            form.removeAttribute('data-deleted');

            data[plec].splice(row, 1);
            petla(plecTabela, plec);
            clear('form1');
            tbody.dataset.page = 1;
            
            paginationTable(tbody.id, 3); 
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
            
            avatar(form);

            if (form.hasAttribute('data-deleted'))
            form.removeAttribute('data-deleted');

            for (var kolumna in data[plec][row]) {

                var value = data[plec][row][kolumna];
                if (typeof(value) == 'boolean') {
                    
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
                else if (kolumna == 'avatar') {

                    console.log(kolumna, value);
                    form.querySelector('input[name="' + kolumna + '"][value="' + value + '"]').checked = true;

                }
                else {
                    
                    form.querySelector('input[name="' + kolumna + '"]').value = value;

                }
                
            }

        }

        tr.appendChild(editBtn);
        tbody.appendChild(tr);

    }

    paginationTable(tbody.id, 3);
    console.log('run', plecTabela, tbody.id);
};

var addEvents = function() {  

    $('.gender').change(function(e) {
        avatar(e.target.form);
    });

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

                if (inputs[i].nextElementSibling.innerText != '') // zapobiega przed nieutworzeniem kolumny dla rekordu bez tagow
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
        
        counter = parseInt(counter, 10);
        
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

        var lastIteration = inputs.length; 
        
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
                
                if (validate('form3') == false)
                    return;

                tagi[row][keyName] = inputs[i].value;
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

