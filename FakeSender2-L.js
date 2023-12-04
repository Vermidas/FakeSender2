
// ==UserScript==
// @name           Fake Sender 2.0
// @author         Sakrileg
// @version        2
// @grant        window.close
// @match        https://*.die-staemme.de/*

// ==/UserScript==


var urlgithub = 'https://raw.githubusercontent.com/Vermidas/FakeSender2/main/Lizenz.txt';
var userName = game_data.player.name;

fetch(urlgithub)
  .then(response => response.text())
  .then(data => {
    var lines = data.split('\n');
    var found = false;
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      if (line.trim() === '') {
        continue; // Skip empty lines
      }
      var parts = line.split(',');
      var user = parts[0].trim();
      var dateString = parts[1] ? parts[1].trim() : '';
      var userDate = dateString ? new Date(dateString) : null;
      if (user === userName && userDate && isSameDayOrFuture(userDate, new Date())) {
        found = true;
        break;
      }
    }

    if (found) {

if (typeof DEBUG !== 'boolean') DEBUG = false;


const RELOAD_CHECK_INTERVAL = 250;

function checkAndReload() {
    if (document.body.innerText.includes("Blockierte Anfrage") || 
        document.body.innerText.includes("405 Not Allowed")){
      location.reload();
    }
  }
  setInterval(checkAndReload, RELOAD_CHECK_INTERVAL); 


// Script Config
var scriptConfig = {
    scriptData: {
        prefix: 'fakeScriptGenerator',
        name: 'Fake Sender',
        version: 'v2',
        author: 'Sakri',
        authorUrl: '',
        helpLink:
            '',
    },
    translations: {
        en_DK: {
            'Find Frontline Villages': 'Find Frontline Villages',
            'Redirecting...': 'Redirecting...',
            'There was an error!': 'There was an error!',
            Player: 'Player',
            Tribe: 'Tribe',
            'Excluded Players': 'Excluded Players',
            'Start typing and suggestions will show ...':
                'Start typing and suggestions will show ...',
            'You must select at least one player or one tribe!':
                'You must select at least one player or one tribe!',
            'You have no frontline villages!':
                'You have no frontline villages!',
            Coordinates: 'Coordinates',
            'Import to Group': 'Import to Group',
            'Add to Group': 'Add to Group',
            'Choose Group': 'Choose Group',
            'Travel Times': 'Travel Times',
            'No groups found!': 'No groups found!',
            'This functionality requires Premium Account!':
                'This functionality requires Premium Account!',
            Automatic: 'Automatic',
            Manually: 'Manually',
            'Input Coordinates': 'Input Coordinates',
            'Coordinates Input': 'Coordinates Input',
        },
        de_DE: {
            'Ankunft beliebig': 'Ankunft beliebig',
            'Angriffe Senden': 'Angriffe Senden',
            'Abschickzeitraum': 'Abschickzeitraum',
            'Sofort Schicken': 'Sofort Schicken',
            'GanzTags': 'GanzTags',
            'Berechnung': 'Berechnung',
            'Zeitraum': 'Zeitraum',
            'Anrgiff pro Dorf': 'Anrgiff pro Dorf',
            'Einstellungen': 'Einstellungen',
            'Hinzufügen': 'Hinzufügen',
            'Löschen': 'Löschen',
            'Abgleichen': 'Abgleichen',
            'Senden': 'Senden',
            'Redirecting...': 'Redirecting...',
            'There was an error!': 'There was an error!',
            Player: 'Spieler',
            Tribe: 'Stamm',
            'Excluded Players': 'Spieler ausschließen',
            'Start typing and suggestions will show ...':
                '...',
            'You must select at least one player or one tribe!':
                'You must select at least one player or one tribe!',
            'You have no frontline villages!':
                'You have no frontline villages!',
            Coordinates: 'Coordinates',
            'Import to Group': 'Import to Group',
            'Add to Group': 'Add to Group',
            'Choose Group': 'Choose Group',
            'Travel Times': 'Travel Times',
            'No groups found!': 'No groups found!',
            'This functionality requires Premium Account!':
                'This functionality requires Premium Account!',
            Automatic: 'Automatisch',
            Manually: 'Manuell',
            'Input Coordinates': 'Input Coordinates',
            'Coordinates Input': 'Koodinaten',
            Vorlage: 'Vorlage',
        },
    },
    allowedMarkets: [],
    allowedScreens: [],
    allowedModes: [],
    isDebug: DEBUG,
    enableCountApi: false,
};


$.getScript(
    `https://raw.githack.com/Sakrixxxx/sdk/main/twsdk.js`,
    async function () {
        await twSDK.init(scriptConfig);
        const scriptInfo = twSDK.scriptInfo();
        twSDK.getWorldConfig();


if (window.location.href.includes('screen=memo')) {

    const { villages, players, tribes } = await fetchWorldData();




    function buildUI() {

        function buildUnitsChoserTable() {
            const units = game_data.units;

            let unitsTable = ``;
            let thUnits = ``;
            let tableRow = ``;

            units.forEach((unit) => {
                if (
                    unit !== 'militia' &&
                    unit !== 'knight' &&
                    unit !== 'snob'
                ) {
                    thUnits += `

                        <th class="ra-text-center ">
                            <label for="unit_${unit}" class="ra-unit-type">
                                <img src="/graphic/unit/unit_${unit}.png">
                            </label>
                        </th>
                    `;

                    tableRow += `
                        <td class="ra-text-center">
                            <input name="ra_unit_amounts" type="text" id="unit_${unit}" data-unit="${unit}" class="ra-unit-amount" value="0" />
                        </td>
                    `;
                }
            });

            unitsTable = `

                <table class="ra-table vis" width="100%" id="raUnitSelector">
                    <thead>
                        <tr>
                            ${thUnits}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            ${tableRow}
                        </tr>
                    </tbody>
                </table>
                <br>
                <div>
                <a href="javascript:void(0);" class="btn" id="tempHinzufügen" style="width: 5rem;">
                ${twSDK.tt('Hinzufügen')}
                <a href="javascript:void(0);" class="btn" id="tempLöschen" style="width: 5rem;">
                ${twSDK.tt('Löschen')}
            </a>
                </div>
            `;

            return unitsTable;
        }

        const sortedPlayersByRanking = players.sort((a, b) => a[5] - b[5]);
        const sortedTribesByRanking = tribes.sort((a, b) => a[7] - b[7]);
        const unitsTableChoser = buildUnitsChoserTable();

        const playersDropdown = buildDropDown(
            sortedPlayersByRanking,
            'Players'
        );

        const tribesDropdown = buildDropDown(
            sortedTribesByRanking,
            'Tribes'
        );

        const excludedPlayersDropdown = buildDropDown(
            sortedPlayersByRanking,
            'ExcludedPlayers'
        );


        const customStyle = `
        .ra-grid { display: grid; grid-template-columns: 1fr 1fr; grid-gap: 15px; }
        .ra-grid-3 { grid-template-columns: 1fr 1fr 1fr; }
        .ra-grid-5 { grid-template-columns: 1fr 1fr 1fr 1fr 1fr; }

        .ra-fieldset { border-color: #c1a264; border-width: 1px; }
        .ra-fieldset legend { font-weight: 600; padding: 0 10px; font-size: 13px; margin-bottom: 5px; }
        .ra-fieldset select { width: 100%; padding: 2px 5px; font-size: 14px; line-height: 1; }
        .ra-fieldset input[type="text"] { width: 60px; margin: 0 auto; padding: 1px 5px; font-size: 14px; line-height: 1; text-align: center; }
        .ra-fieldset2 input[type="text"] { width: auto; margin: 0 auto; padding: 1px 5px; font-size: 14px; line-height: 1; text-align: center; }
        .ra-input { width: auto; !important; padding: 2px 5px; font-size: 14px; line-height: 1; text-align: left !important; }

        .ra-dflex { display: flex; }

        .ra-unit-type { display: block; cursor: pointer; }

        .ra-btn-set-units { min-height: 60px; align-items: flex-start; justify-content: flex-start; width: auto; }
        .ra-btn-set-units span { width: auto; margin: 6px 15px; line-height: 1; display: flex; justify-content: center; align-items: center; }
        .ra-btn-set-units span img { margin-left: 5px; }

        .ra-table { border-spacing: 2px !important; border-collapse: separate !important; }
        .ra-table th { padding: 4px 5px; }

        .ra-label { font-weight: normal; display: inline-block; margin-bottom: 8px; }

        .ra-info { display: block; margin-top: 5px; }


        .ra-grid { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr; grid-gap: 15px; }
        .ra-grid .ra-fieldset { border-color: #c1a264; border-width: 1px; }
        .ra-grid .ra-fieldsetnoborder2 { border-color: #c1a264; border-width: 0px; }
        .ra-fieldsetnoborder {
            border: none; /* Entferne die Border-Stildefinitionen */
            padding: 0; /* Entferne den Padding-Stil, falls vorhanden */
            margin: 0; /* Entferne den Margin-Stil, falls vorhanden */
        }
        .ra-grid .ra-fieldset legend { font-weight: 600; padding: 0 10px; font-size: 13px; margin-bottom: 5px; }
        .ra-grid .ra-fieldset select { width: 100%; padding: 3px 5px; font-size: 14px; line-height: 1; }

        .ra-popup-content { width: 100% !important; }
        .ra-popup-content label { display: inline-block !important; }
        .ra-mh-310 { max-height: 310px; overflow-y: auto; overflow-x: hidden; }
        .ra-table { border-spacing: 2px !important; border-collapse: separate !important; width: 100% !important; font-size: 10px; }
        .ra-table tr:nth-of-type(2n) td { background-color: #f0e2be }
        .ra-table tr:nth-of-type(2n+1) td { background-color: #fff5da; }
        .rattm-box .title {
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-weight: bold;
            background-color: rgb(195,177,136);
            background-image: linear-gradient(to right, rgb(136,122,90), rgb(195,177,136), rgb(136,122,90));
            border: 1px solid rgb(106,96,74);
            height: 28px;
            line-height: 28px;
            padding: 2px 3px;
        }
        .rattm-flex {
            position: relative;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
            grid-gap: 15px;
            margin-bottom: 15px;
        }
        .rattm-box {
            position: relative;
            cursor: pointer;
        }

        .rattm-box .ra-table-container {
            margin-bottom: 40px;
        }

        .rattm-box .ra-table td {
            text-align: left;
        }

        .rattm-box .template-farm-space {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
        }
        #raCoordinatesFillMethod {
            box-sizing: border-box;
            width: 100%;
            padding: 3px 5px;
            font-size: 14px;
            line-height: 1;
            text-align: left;
        }


        #raInputCoordinates {
            width: auto;
            height: auto;
            font-size: 14px;
            box-sizing: border-box;
        }
        /* Stil für den Container des Diagramms */

        .rattm-box .template-farm-space {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
        }
        #progressbar-container {
            width: 80%;
            margin: 15px auto;
            border: 1px solid #ccc;
            overflow: hidden;
        }

        #progressbar {
            width: 0;
            height: 10px;
            background-color: #4CAF50;
            text-align: center;
            line-height: 10px; /* Ändere diesen Wert auf die Höhe der Fortschrittsleiste */
            color: white;
            font-size: 9px; /* Ändere diesen Wert auf die gewünschte Schriftgröße */
            white-space: nowrap; /* Verhindert, dass der Text umgebrochen wird */
            overflow: hidden; /* Verhindert, dass der Text über den Fortschrittsbalken hinausragt */
        }
        #zeitraum label, #zeitraum input {

            margin-bottom: 10px; 
            margin-top: 10px;
        }

        #anzahlInput {
        margin-top: 10px;
        margin-bottom: 10px; 
        }
        .template-size {
            width: 4.5rem;  /* oder eine andere feste Breite */
            height: 6.5rem;  /* oder eine andere feste Höhe */

        }
        #zeitraumEingabe {
            display: none;
        }

                   


        `;

        const tabs = [{
            tabTitle: "Fake Sender",
            tableHTML: `

            <style>${customStyle}</style>
            <div class="ra-mb15">
                <div class="ra-grid ra-mb15 ra-grid-4">
                    <div class="rattm-box border-frame-gold-red btn-set-troops-template">
                        <div class="title">
                            <legend>${twSDK.tt('Coordinates Input')}</legend>
                        </div>
                        <fieldset class="ra-fieldsetnoborder">
                            <select id="raCoordinatesFillMethod">
                                <option value="manually">${twSDK.tt('Manually')}</option>
                                <option value="automatic">${twSDK.tt('Automatic')}</option>
                            </select>
                        </fieldset>
                        <fieldset class="ra-fieldsetnoborder" id="playerFieldset" >
                            <div class="title">
                                <legend>${twSDK.tt('Player')}</legend>
                            </div>
                            ${playersDropdown}
                        </fieldset>
                    </div>
                    <div class="rattm-box border-frame-gold-red btn-set-troops-template" id="tableContainerPlayer" style="display: none;">
                    <div style="display: flex;">
                    <div  style="box-shadow: none; border: 0; width: auto; border-spacing: 2px; border-collapse: separate; margin: 10px;"></div>
                    </div>
                </div>
                </div>
                <br>
                <div class="rattm-box border-frame-gold-red btn-set-troops-template" id="raInputCoordinatesBox2">
                    <div class="ra-mb15 ra-grid" id="raInputCoordinatesBox" style="display: none; box-shadow: none; border: 0;">
                        <span id="raInputCoordinatesCount"></span>
                        <textarea id="raInputCoordinates" class="ra-textarea" name="raInputCoordinates" style="width: 100%; padding: 3px 5px; font-size: 14px; line-height: 1; border: 1px solid #c1a264;"></textarea>
                    </div>
                </div>
                <br>
                <div class="ra-mb15">
                    <div class="ra-grid ra-mb15 ra-grid-4" style="width: auto;">
                        <div class="rattm-box border-frame-gold-red btn-set-troops-template">
                            <fieldset class="ra-fieldsetnoborder" id="vorlage">
                                <div class="title">
                                    <legend>${twSDK.tt('Vorlage')}</legend>
                                </div>
                            </fieldset>
                            <div id="progressbar-container">
                                <div id="progressbar">Truppen prüfen</div>
                            </div>
                            <div class="ra-mb15" id="raUnitAmountsConfigurator" style="width: auto;">
                                <fieldset class="ra-fieldsetnoborder">
                                    <div class="ra-mb10 ra-dflex">
                                        <a href="javascript:void(0);" class="btn ra-btn-set-units template-size" data-units-amounts='{"spy": 5, "catapult": 13}'>
                                            <span>10 <img src="/graphic/unit/unit_spy.png"></span>
                                            <span>13 <img src="/graphic/unit/unit_catapult.png"></span>
                                        </a>        
                                        <a href="javascript:void(0);" class="btn ra-btn-set-units template-size" data-units-amounts='{"spy": 5, "catapult": 50}'>
                                            <span>5 <img src="/graphic/unit/unit_spy.png"></span>
                                            <span>50 <img src="/graphic/unit/unit_catapult.png"></span>
                                        </a>
                                        <a href="javascript:void(0);" class="btn ra-btn-set-units template-size" data-units-amounts='{"spy": 2, "light": 996, "ram": 1}'>
                                            <span>2 <img src="/graphic/unit/unit_spy.png"></span>
                                            <span>996 <img src="/graphic/unit/unit_light.png"></span>
                                            <span>1 <img src="/graphic/unit/unit_ram.png"></span>
                                        </a>
                                        <a href="javascript:void(0);" class="btn ra-btn-set-units template-size" data-units-amounts='{"spy": 2, "heavy": 996, "ram": 1}'>
                                            <span>2 <img src="/graphic/unit/unit_spy.png"></span>
                                            <span>996 <img src="/graphic/unit/unit_heavy.png"></span>
                                            <span>1 <img src="/graphic/unit/unit_ram.png"></span>
                                        </a>
                                        <a href="javascript:void(0);" class="btn ra-btn-set-units template-size" data-units-amounts='{"spy": 2, "light": 767, "ram": 220, "catapult": 10}'>
                                            <span>2 <img src="/graphic/unit/unit_spy.png"></span>
                                            <span>767 <img src="/graphic/unit/unit_light.png"></span>
                                            <span>220 <img src="/graphic/unit/unit_ram.png"></span>
                                            <span>10 <img src="/graphic/unit/unit_catapult.png"></span>
                                        </a>
                                        <a href="javascript:void(0);" class="btn ra-btn-set-units template-size" data-units-amounts='{"spy": 2, "heavy": 767, "ram": 220, "catapult": 10}'>
                                            <span>2 <img src="/graphic/unit/unit_spy.png"></span>
                                            <span>767 <img src="/graphic/unit/unit_heavy.png"></span>
                                            <span>220 <img src="/graphic/unit/unit_ram.png"></span>
                                            <span>10 <img src="/graphic/unit/unit_catapult.png"></span>
                                        </a>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                        <div class="rattm-box border-frame-gold-red btn-set-troops-template" style="width: auto;">
                            <fieldset class="ra-fieldsetnoborder" id="vorlage">
                                <div class="title">
                                    <legend>${twSDK.tt('Einstellungen')}</legend>
                                </div>

                                <br>

                                <fieldset class="ra-fieldsetnoborder" id="angriffsanzahl">
                                <div class="title">
                                    <legend>${twSDK.tt('Anrgiff pro Dorf')}</legend>
                                </div>
                                <input type="number" id="anzahlInput" value="0">
                                </fieldset>
                                
                                <fieldset class="ra-fieldsetnoborder" id="anzahlSenden">
                                <div class="title">
                                    <legend>${twSDK.tt('Angriffe Senden')}</legend>
                                </div>
                                <input type="number" id="anzahlSendenInput" value="0">
                                </fieldset>

                            </fieldset>     
                        </div>
                        <div class="rattm-box border-frame-gold-red btn-set-troops-template" style="width: auto;">
                        <fieldset class="ra-fieldsetnoborder" id="berechnung">
                            <div class="title">
                                <legend>${twSDK.tt('Berechnung')}</legend>
                            </div>
                            <div id="berechnungen">
                            <input type="checkbox" id="sofortSchickenCheckbox" name="sofortSchickenCheckbox">
                            <label for="sofortSchickenCheckbox">${twSDK.tt('Sofort Schicken')}</label>
                            <br>
                            <input type="checkbox" id="AbschickzeitraumCheckbox" name="AbschickzeitraumCheckbox">
                            <label for="AbschickzeitraumCheckbox">${twSDK.tt('Abschickzeitraum')}</label>
                            <div id="zeitraumEingabe" style="display: none;">
                            <label for="abschickVonZeit">Von:</label>
                            <input type="time" id="abschickVonZeit" name="abschickVonZeit">
                            <label for="abschickBisZeit">Bis:</label>
                            <input type="time" id="abschickBisZeit" name="abschickBisZeit">
                            </div>
                            </div>
                            </fieldset>
                            <br>


                            <fieldset class="ra-fieldsetnoborder" id="zeitraum"style="width: 15rem;" >
                            <div class="title">
                            <legend>${twSDK.tt('Zeitraum')}</legend>
                            <input type="checkbox" id="zeitraumCheckbox" name="zeitraumCheckbox">
                            </div>
                        
                            <label for="datum"></label>
                            <input type="date" id="datum" name="datum">
                            <br>
                            <label for="vonZeit">Von:</label>
                            <input type="time" id="vonZeit" name="vonZeit">
                            <label for="bisZeit">Bis:</label>
                            <input type="time" id="bisZeit" name="bisZeit">
                            </fieldset>

                            <fieldset class="ra-fieldsetnoborder" id="zeitraum"style="width: 15rem;" >
                            <div class="title">
                                <legend>${twSDK.tt('GanzTags')}</legend>
                                <input type="checkbox" id="ganztagsCheckbox" name="ganztagsCheckbox">
                            </div>
                            <label for="datumGanzTags"></label>
                            <input type="date" id="datumGanzTags" name="datum">
                            </fieldset>

                            
                            <fieldset class="ra-fieldsetnoborder" id="Ankunftbeliebig"style="width: 15rem;" >
                            <div class="title">
                                <legend>${twSDK.tt('Ankunft beliebig')}</legend>
                                <input type="checkbox" id="Ankunftbeliebig1" name="Ankunft beliebig">
                            </div>
                            </fieldset>

                        </fieldset>
                    </div>
                </div>
                <br>
                <div class="ra-mb15" id="raUnitAmountsConfigurator">
                    <fieldset class="ra-fieldset">
                        ${unitsTableChoser}
                    </fieldset>
                </div>
            </div>
            <br>
            <div>
                <a href="javascript:void(0);" class="btn btn-confirm-yes" id="Abgleichen">
                    ${twSDK.tt('Abgleichen')}
                </a>
                <a href="javascript:void(0);" class="btn btn-confirm-yes" id="senden">
                ${twSDK.tt('Senden')}
                </a>
            </div>
            </div>

        `
        }];


    let checkLastNote;

    function createNewTab(tabTitle, tableHTML) {
        let ownNotesLength = $(".ownNotes").length;
        let tabHTML = `<div id="ownNote-${ownNotesLength}" class="memo-tab ownNotes"><span class="memo-tab-label"><strong>${tabTitle}</strong></span></div>`;
        let tableContainerHTML = `<div id="ownNoteTableContainer-${ownNotesLength}" class="ownNoteTableContainer center">${tableHTML}</div>`;
        $("#tab-bar").append(tabHTML);
        $(".memo_container").last().after(tableContainerHTML);

        $(`#ownNoteTableContainer-${ownNotesLength}`).hide();
    }

    $(document).on('click', '.ownNotes', function () {
        if ($(this).hasClass("memo-tab-selected")) return;

        $(".memo-tab").removeClass("memo-tab-selected");
        $(this).addClass("memo-tab-selected");

        let getID = $(this).attr("id").replace("ownNote-", "");
        checkLastNote = getID;
        $(".memo_script").hide();
        $(".ownNoteTableContainer").hide();
        $(`#ownNoteTableContainer-${getID}`).show();
    });

    $(document).on('click', '.memo-tab-label', function () {
        if (checkLastNote) {
            $("#ownNote-" + checkLastNote).removeClass("memo-tab-selected");
            checkLastNote = false;
        }
        $(".memo_script").show();
        $(".ownNoteTableContainer").hide();
    });

    if(tabs.length){
        tabs.forEach((element)=>{
            createNewTab(element.tabTitle, element.tableHTML);
        });
    }

    function buildDropDown(array, entity) {
        let dropdown = `<input type="text" class="ra-input" style="width: 200px" multiple list="raSelect${entity}" placeholder="${twSDK.tt(
            'Start typing and suggestions will show ...'
        )}" id="ra${entity}"><datalist id="raSelect${entity}">`;
        array.forEach((item) => {
            if (item[0].length !== 0) {
                if (entity === 'Tribes') {
                    const [id, _, tag] = item;
                    const cleanTribeTag = twSDK.cleanString(tag);
                    dropdown += `<option value="${cleanTribeTag}">`;
                }
                if (entity === 'Players' || entity === 'ExcludedPlayers') {
                    const [id, name] = item;
                    const cleanPlayerName = twSDK.cleanString(name);
                    dropdown += `<option value="${cleanPlayerName}">`;
                }
            }
        });
        dropdown += '</datalist>';
        return dropdown;
    }

    function setupCoordinatesFillMethod() {
        const coordinatesFillMethodDropdown = document.getElementById('raCoordinatesFillMethod');
        const playerFieldset = document.getElementById('playerFieldset');
        const importBox = document.getElementById('raInputCoordinatesBox');
        const importBox2 = document.getElementById('raInputCoordinatesBox2');

        function toggleFieldsVisibility() {
            const isAutomatic = coordinatesFillMethodDropdown.value === 'automatic';
            playerFieldset.style.display = isAutomatic ? 'block' : 'none';
            importBox.style.display = isAutomatic ? 'none' : 'block';
            importBox2.style.display = isAutomatic ? 'none' : 'block';
        }

        // Initialisiere die Sichtbarkeit basierend auf dem initialen Dropdown-Wert
        toggleFieldsVisibility();

        // Füge einen Event-Listener zum Ändern des Dropdown-Werts hinzu
        coordinatesFillMethodDropdown.addEventListener('change', toggleFieldsVisibility);
    } setupCoordinatesFillMethod();

    } buildUI();
    }


if (window.location.href.includes('screen=memo')) {

    function initAbschickzeitraumCheckbox() {
        var checkbox = document.getElementById('AbschickzeitraumCheckbox');
        var zeitraumEingabe = document.getElementById('zeitraumEingabe');

        if (!checkbox || !zeitraumEingabe) {
            console.warn('Elemente nicht gefunden');
            return;
        }

        checkbox.addEventListener('change', function() {
            zeitraumEingabe.style.display = this.checked ? 'block' : 'none';
        });
    }initAbschickzeitraumCheckbox();

    function getStartTime() {
        var selectedVonZeit = $('#abschickVonZeit').val();
        var selectedBisZeit = $('#abschickBisZeit').val();

        // Setze das heutige Datum, wenn keines ausgewählt wurde
        var today = new Date();
        var selectedDate = today.toISOString().split('T')[0]; // Format: yyyy-mm-dd

        // Stelle sicher, dass Zeiten im korrekten Format sind
        selectedVonZeit = selectedVonZeit ? selectedVonZeit + ":00" : "00:00:00";
        selectedBisZeit = selectedBisZeit ? selectedBisZeit + ":00" : "23:59:00";

        var startDateTime = new Date(selectedDate + "T" + selectedVonZeit);
        var endDateTime = new Date(selectedDate + "T" + selectedBisZeit);

        return {
            startTime: startDateTime,
            endTime: endDateTime
        };
    }$('#abschickVonZeit, #abschickBisZeit').on('change', getStartTime);


    function getDayWithNightHours() {
        var selectedDate = $('#datumGanzTags').val();
        var dateObj = new Date(selectedDate);

        var worldConfigStr = localStorage.getItem("world_config");

        if (worldConfigStr) {
            var worldConfig = JSON.parse(worldConfigStr);

            var startHour = worldConfig.config.night.start_hour;
            var endHour = worldConfig.config.night.end_hour;

            return {
                date: selectedDate,
                start_hour: startHour,
                end_hour: endHour
            };
        } else {
            console.error("Weltkonfiguration nicht im Local Storage gefunden.");
            return null;
        }
    } $('#datumGanzTags').on('change', function() {
        var result = getDayWithNightHours();
        if (result) {
            console.log(result);
        }
    });

    function ankunftBeliebig() {
        var selectedDate = $('#datumGanzTags').val();


        var worldConfigStr = localStorage.getItem("world_config");

        if (worldConfigStr) {
            var worldConfig = JSON.parse(worldConfigStr);

            var startHour = worldConfig.config.night.start_hour;
            var endHour = worldConfig.config.night.end_hour;

            return {
                start_hour: startHour,
                end_hour: endHour
            };
        } else {
            console.error("Weltkonfiguration nicht im Local Storage gefunden.");
            return null;
        }
    } $('#Ankunftbeliebig1').on('change', function() {
        var result = ankunftBeliebig();
        if (result) {
            console.log(result);
        }
    });


    function getLandingTime() {
        var selectedDate = $('#datum').val();
        var selectedVonZeit = $('#vonZeit').val();
        var selectedBisZeit = $('#bisZeit').val();

        if (!selectedDate || !selectedVonZeit || !selectedBisZeit) {
            UI.ErrorMessage("Keinen Ankunftszeitraum gewählt.", 2000);
            return null;
        }

        // Konvertiere die ausgewählte Zeit von "hh:mm" zu "hh:mm:ss"
        selectedVonZeit += ":00";
        selectedBisZeit += ":00";

        // Erstelle Date-Objekte für das Datum und die Zeiten
        var dateObj = new Date(selectedDate);
        var vonZeitObj = new Date('2000-01-01T' + selectedVonZeit);
        var bisZeitObj = new Date('2000-01-01T' + selectedBisZeit);

        // Formatieren der Zeiten mit Intl.DateTimeFormat
        const formatter = new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false,


        });

        const formattedVonZeit = formatter.format(vonZeitObj);
        const formattedBisZeit = formatter.format(bisZeitObj);

        //console.log('Ausgewähltes Datum:', selectedDate);
        //console.log('Ausgewählte Von-Zeit:', formattedVonZeit);
        //console.log('Ausgewählte Bis-Zeit:', formattedBisZeit);
        var selectedDate = $('#datum').val();
        var selectedVonZeit = $('#vonZeit').val() + ":00";
        var selectedBisZeit = $('#bisZeit').val() + ":00";

        return {
            date: selectedDate,
            startTime: selectedVonZeit,
            endTime: selectedBisZeit
        };
    } $('#datum, #vonZeit, #bisZeit').on('change', getLandingTime);

    function angriffsanzahl() {
        return parseInt($('#anzahlInput').val(), 10);
    }
    $(document).ready(function() {
        $('#anzahlInput').on('change', angriffsanzahl);
    });

    function angriffeSenden() {
        return parseInt($('#anzahlSendenInput').val(), 10);
    } 
    $(document).ready(function() {
        $('#anzahlSendenInput').on('change', angriffeSenden);
    });

    function getUnitAmounts() {
        const unitAmountInputs = document.querySelectorAll('.ra-unit-amount');
        const unitAmounts = {};

        unitAmountInputs.forEach((input) => {
            const unitName = input.getAttribute('data-unit');
            const unitValue = parseInt(input.value, 10);

            // Ignoriere Einheiten mit dem Wert 0
            if (unitValue !== 0) {
                unitAmounts[unitName] = unitValue;
            }
        });

        return unitAmounts;
    }
    function addTemplate(unitAmounts, saveToLocalStorage = true) {
        const newTemplate = `
        <a href="javascript:void(0);" class="btn ra-btn-set-units template-size" data-units-amounts='${JSON.stringify(unitAmounts)}'>
            ${Object.entries(unitAmounts).map(([unit, amount]) => `<span>${amount} <img src="/graphic/unit/unit_${unit}.png"></span>`).join('')}
        </a>
        `;

        const raUnitAmountsConfigurator = document.getElementById('raUnitAmountsConfigurator');
        let newFlexContainer = raUnitAmountsConfigurator.querySelector('.new-flex-container');

        if (!newFlexContainer) {
            newFlexContainer = document.createElement('div');
            newFlexContainer.className = 'ra-mb10 ra-dflex new-flex-container';
            newFlexContainer.style.marginTop = '10px';  
            newFlexContainer.style.marginBottom = '10px';  
            raUnitAmountsConfigurator.appendChild(newFlexContainer);
        }

        newFlexContainer.insertAdjacentHTML('beforeend', newTemplate);

        if (saveToLocalStorage) {
            saveTemplateToLocalStorage(unitAmounts);
        }
    }
    function saveTemplateToLocalStorage(unitAmounts) {
        let savedTemplates = localStorage.getItem('savedTemplates');
        savedTemplates = savedTemplates ? JSON.parse(savedTemplates) : [];
        savedTemplates.push(unitAmounts);
        localStorage.setItem('savedTemplates', JSON.stringify(savedTemplates));
    }
    $(document).ready(function() {
        restoreTemplatesFromLocalStorage();
    });
    function restoreTemplatesFromLocalStorage() {
        const savedTemplates = localStorage.getItem('savedTemplates');
        if (savedTemplates) {
            JSON.parse(savedTemplates).forEach(unitAmounts => {
                addTemplate(unitAmounts, false); // false bedeutet, nicht erneut im LocalStorage speichern
            });
        }
    }


    let currentChosenUnits = {};
    function handleVorlageHinzufuegenClick(event) {
        if (event.target.id === 'tempHinzufügen') {
            // Rufe die Funktion getUnitAmounts auf, um die Werte der Input-Felder zu erhalten
            const unitAmounts = getUnitAmounts();

            // Führe den Vorgang nur aus, wenn mindestens eine Einheit mit einem Wert größer als 0 vorhanden ist
            if (Object.keys(unitAmounts).length > 0) {
                // Füge eine neue Vorlage hinzu
                addTemplate(unitAmounts);
            } else {
                // Wenn keine Einheiten mit einem Wert größer als 0 vorhanden sind, kannst du hier eine entsprechende Meldung ausgeben oder den Vorgang anders behandeln.
                console.log('Keine Einheiten ausgewählt.');
            }
        }
    }document.addEventListener('click', handleVorlageHinzufuegenClick);

    document.getElementById('tempLöschen').addEventListener('click', function() {
        localStorage.removeItem('savedTemplates');
    });


    async function tempClick(event) {
        const target = event.target;
        const raBtnSetUnits = target.closest('.ra-btn-set-units');

        if (raBtnSetUnits) {
            event.preventDefault();
            currentChosenUnits = JSON.parse(raBtnSetUnits.getAttribute('data-units-amounts'));

            console.log('Current Chosen Units:', currentChosenUnits);

            document.querySelectorAll('.ra-btn-set-units').forEach(element => {
                element.classList.remove('btn-confirm-yes');
            });
            raBtnSetUnits.classList.add('btn-confirm-yes');

            // Übergebe eine Funktion als Callback an trpabgleichen

            await trpabgleichen(async () => {
                console.log('After trpabgleichen2');

                //calculateAttacks(currentChosenUnits);
            });
        }
    } document.addEventListener('click', function(event) {
        // Hier überprüfen Sie, ob das geklickte Element (oder eines seiner Elternelemente)
        // die Klasse 'ra-btn-set-units' hat.
        const raBtnSetUnits = event.target.closest('.ra-btn-set-units');
        
        if (raBtnSetUnits) {
            tempClick(event); // Führen Sie Ihre ursprüngliche Logik hier aus
        }
    });

    let villageDataArray = [];

    async function trpabgleichen(callback) {
        try {
            updateProgressBar(0);

            const maxPages = await getMaxPages();

            if (maxPages === 0) {
                processVillageData(data);
                printVillageData();
                // Rufe das Callback auf, um zu signalisieren, dass alles abgeschlossen ist
                callback();
            } else {
                progressBarInterval = startProgressBar();

                for (let a = 0; a < maxPages; a++) {
                    await delay(200);
                    const data = await getPageData(a);
                    processVillageData(data);

                    const progress = ((a + 1) / maxPages) * 100;
                    updateProgressBar(progress);

                    if (a === maxPages - 1) {
                        stopProgressBar(progressBarInterval);
                        printVillageData();

                        callback();
                    }
                }
            }
        } catch (error) {
            console.error("Fehler beim Laden der Daten:", error);
            // Fehlerbehandlung hier
            callback(); // Rufe das Callback auch im Fehlerfall auf, um sicherzustellen, dass es immer aufgerufen wird
        }
    }
    function updateProgressBar(progress) {
        $("#progressbar").css("width", progress + "%");
    }
    function getMaxPages() {
        return new Promise((resolve, reject) => {
            $.get(`game.php?screen=overview_villages&mode=units&type=there&group=0`, function (data) {
                const pagedNavItems = $(".paged-nav-item", data);
                const maxPages = pagedNavItems.length > 0 ? pagedNavItems.length : 1;
                resolve(maxPages);
            }).fail(reject);
        });
    }

    function getPageData(page) {
        return new Promise((resolve, reject) => {
            $.get(`game.php?screen=overview_villages&mode=units&type=there&group=0&page=${page}`, function (data) {
                resolve(data);
            }).fail(reject);
        });
    }
    function startProgressBar() {
        return setInterval(function () {
            console.log("Ladebalken wird aktualisiert...");
        }, 100);
    }
    function stopProgressBar(interval) {
        clearInterval(interval);
        console.log("Ladebalken gestoppt.");
    }
    function processVillageData(data) {
        $(".quickedit-vn", data).each(function (i) {
            let villageData = {
                id: $(this).attr("data-id"),
                units: {},
                coordinates: ""
            };

            const unitNames = ["spear", "sword", "axe", "archer", "spy", "light", "marcher", "heavy", "ram", "catapult", "knight", "snob", "miliz"];

            $(".unit-item", $(this).closest('tr')).each(function (j) {
                let unitName = unitNames[j];
                let unitValue = $(this).text();
                villageData.units[unitName] = unitValue;
            });

            // Extract coordinates from the additional text
            let additionalText = $("span.quickedit-label", this).text();
            let coordsRegex = /\d{1,3}\|\d{1,3}/g;
            let coordinatesMatch = coordsRegex.exec(additionalText);
            villageData.coordinates = coordinatesMatch ? coordinatesMatch[0] : "";

            villageDataArray.push(villageData);

            if (i === $(".quickedit-vn", data).length - 1) {
                console.log("Processing data for page complete.");
            }
        });
    }
    function printVillageData() {
        console.log(villageDataArray);
    }
    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    async function sourceVillages(selectedUnits) {
        console.log('Ausgewählte Einheiten:', selectedUnits);
        let matchingVillages = []; // Ein Array, um die passenden Dörfer zu speichern

        villageDataArray.forEach((villageData) => {
            let matchCount = Infinity; // Setze den Ausgangswert auf unendlich

            Object.entries(selectedUnits).forEach(([unit, amount]) => {
                if (villageData.units.hasOwnProperty(unit)) {
                    const unitAmountInVillage = parseInt(villageData.units[unit], 10);
                    const fitsInVillage = Math.floor(unitAmountInVillage / amount);
                    matchCount = Math.min(matchCount, fitsInVillage);
                } else {
                    matchCount = 0; // Wenn eine Einheit fehlt, passt das Set nicht ins Dorf
                }
            });
            
            if (matchCount > 0) {
                // Füge ein neues Objekt mit Dorf-ID, Koordinaten und MatchCount zum Array hinzu
                matchingVillages.push({
                    VillageID: villageData.id,
                    VillagCoord: villageData.coordinates,
                    MatchCount: matchCount
                
                });
            }
        });

        console.debug(matchingVillages);
        return matchingVillages;
    }

    function onBlurInputCoordinatesField() {
        jQuery('#raInputCoordinates').blur(function () {
            const coordinates = this.value.match(twSDK.coordsRegex);
            if (coordinates) {
                this.value = coordinates.join(' ');
                jQuery('#raInputCoordinates').text(coordinates.length);
            } else {
                this.value = '';
                jQuery('#raInputCoordinates').text(0);
            }
        });
    } onBlurInputCoordinatesField();
    
    let foundVillages = []
    async function getTargetVilligesAndCoords() {
        const coordinatesInput = document.getElementById("raInputCoordinates").value;
        const coordinatesArray = coordinatesInput.split(/\s*,\s*|\s+/);
        const villages = await twSDK.worldDataAPI('village');

        coordinatesArray.forEach(coordinate => {
            const [x, y] = coordinate.trim().split('|');
            const village = villages.find(village => village[2] === x && village[3] === y);
            if (village) {
                const villageId = village[0];
                foundVillages.push({ id: villageId, coordinates: x + '|' + y }); // Füge das Dorfobjekt hinzu
                //console.log("Village ID:", villageId, " coordinates:", x, y);
            } else {
            // console.log("No village found at coordinates:", x, y);
            }
        });
        console.debug(foundVillages);
        return foundVillages; // Gib das Array der gefundenen Dörfer zurück
    }


    async function calculateAttacks(selectedUnits) {
        try {
            let sofortSchickenCheckbox = document.getElementById('sofortSchickenCheckbox'); 
            let zeitraumCheckbox = document.getElementById('zeitraumCheckbox');
            let AbschickzeitraumCheckbox = document.getElementById('AbschickzeitraumCheckbox');
            let ganztagsCheckbox = document.getElementById('ganztagsCheckbox');
            let ankunftBeliebig = document.getElementById('Ankunftbeliebig1');
            
            let sourceVillagesAndUnits = await sourceVillages(selectedUnits);
            let targetVillages = await getTargetVilligesAndCoords();
            if (targetVillages.length === 0) {
                targetVillages = playerVillages.map(village => ({
                    id: village[0],
                    coordinates: village[2] + '|' + village[3]
                }));
            }
            let attackCount = angriffsanzahl();
            let slowestUnitSpeed = await getSlowestUnitSpeed(selectedUnits);
            let currentServerTime = twSDK.getServerDateTimeObject();


            let allPossibleAttacks = [];
            for (let sourceVillage of sourceVillagesAndUnits) {
                for (let targetVillage of targetVillages) {
                    let distance = calculateDistance(sourceVillage.VillagCoord, targetVillage.coordinates);
                    let travelTime = await calculateTimeBySpeed(distance, slowestUnitSpeed);

                    allPossibleAttacks.push({
                        sourceVillage: sourceVillage,
                        targetVillage: targetVillage,
                        distance: distance,
                        travelTime: travelTime
                    });
                }
            }
            
            ////RANDOM FÜR SOFORT + GANZTAGS////
            if (sofortSchickenCheckbox.checked && ganztagsCheckbox.checked) {
                let DayWithNightHours = getDayWithNightHours();
                let attacksData = planRandomizedAttacksGANZTAGS(allPossibleAttacks, attackCount, currentServerTime, DayWithNightHours);
                createAttackTable(attacksData);
                sendAttacks(attacksData)
            ////RANDOM FÜR ABSCHICKZEITRAUM + GANZTAGS////
            } else if (AbschickzeitraumCheckbox.checked && ganztagsCheckbox.checked) {
                let DayWithNightHours = getDayWithNightHours();
                let attackTime = getStartTime();
                let attacksData = planRandomizedAttacksWithStartTimeGANZTAGS(allPossibleAttacks, attackCount, currentServerTime, DayWithNightHours, attackTime);
                createAttackTable(attacksData);
                sendAttacks(attacksData)
            ////RANDOM FÜR SOFORT + ANKUNFTSZEITRAUM////    
            } else if (sofortSchickenCheckbox.checked && zeitraumCheckbox.checked) {
                let landingTime = getLandingTime();
                let attacksData = planRandomizedAttacksZEITRAUM(allPossibleAttacks, attackCount, currentServerTime, landingTime);
                createAttackTable(attacksData);
                sendAttacks(attacksData)
            ////RANDOM FÜR ABSCHICKZEITRAUM + ANKUNFTSZEITRAUM////    
            } else if (AbschickzeitraumCheckbox.checked && zeitraumCheckbox.checked) {
                let landingTime = getLandingTime();
                let attackTime = getStartTime();
                let attacksData = planRandomizedAttacksZEITRAUMTwo(allPossibleAttacks, attackCount, currentServerTime, landingTime, attackTime);
                createAttackTable(attacksData);
                sendAttacks(attacksData)
            } else if (sofortSchickenCheckbox.checked && ankunftBeliebig.checked) {
                let DayWithNightHours = getDayWithNightHours();
                let attacksData = planRandomizedAttacksBeliebig(allPossibleAttacks, attackCount, currentServerTime, DayWithNightHours);
                createAttackTable(attacksData);
                sendAttacks(attacksData)
            ////RANDOM FÜR ABSCHICKZEITRAUM + GANZTAGS////
            } else if (AbschickzeitraumCheckbox.checked && ankunftBeliebig.checked) {
                let DayWithNightHours = getDayWithNightHours();
                let attackTime = getStartTime();
                let attacksData = planRandomizedAttacksWithStartTimeBeliebig(allPossibleAttacks, attackCount, currentServerTime, DayWithNightHours, attackTime);
                createAttackTable(attacksData);
                sendAttacks(attacksData) 
            } else {
                // Implementierung für andere Fälle oder eine Fehlermeldung
                console.log("Mindestens eine Checkbox muss ausgewählt sein.");
                return;
            }
        } catch (error) {
            console.error('Fehler bei der Angriffsplanung:', error);
        }
    }

    ////RANDOM FÜR SOFORT + ANKUNFTSZEITRAUM////
    function planAttacksForVariationZEITRAUM(randomizedAttacks, attackCount, currentServerTime, landingTime) {
        let sourceVillageUsageCount = new Map();
        let targetVillageAttackCounter = new Map();
        let attackPairs = new Set();  // Set um Kombinationen von Herkunfts- und Zielort zu speichern
        let plannedAttacks = [];

        for (let attack of randomizedAttacks) {
            let travelTimeMs = hmsToMilliseconds(attack.travelTime);
            let sendTime = calculateSendTime(attack.travelTime, landingTime, currentServerTime);

            if (sendTime !== 'Jetzt senden') {
                continue;
            }

            let sourceVillageId = attack.sourceVillage.VillagCoord;
            let targetVillageId = attack.targetVillage.coordinates;
            let pairKey = `${sourceVillageId}-${targetVillageId}`;

            // Überprüfen, ob diese Kombination von Herkunfts- und Zielort bereits existiert
            if (attackPairs.has(pairKey)) {
                continue; // Kombination bereits vorhanden, Angriff überspringen
            }

            let sourceUsage = sourceVillageUsageCount.get(sourceVillageId) || 0;
            let targetCount = targetVillageAttackCounter.get(targetVillageId) || 0;

            if (sourceUsage < attack.sourceVillage.MatchCount && targetCount < attackCount) {
                plannedAttacks.push(attack);
                sourceVillageUsageCount.set(sourceVillageId, sourceUsage + 1);
                targetVillageAttackCounter.set(targetVillageId, targetCount + 1);
                attackPairs.add(pairKey); // Füge die neue Kombination hinzu
            }
        }

        return plannedAttacks;
    }
    function getRandomizedAttacksZEITRAUM(allPossibleAttacks) {
        let shuffledAttacks = [...allPossibleAttacks];
        for (let i = shuffledAttacks.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [shuffledAttacks[i], shuffledAttacks[j]] = [shuffledAttacks[j], shuffledAttacks[i]];
        }
        return shuffledAttacks;
    }
    function planRandomizedAttacksZEITRAUM(allPossibleAttacks, attackCount, currentServerTime, landingTime) {
        const NUM_VARIATIONS = 250;
        let bestAttackPlan = [];
        let maxUniqueStartVillages = 0;

        for (let i = 0; i < NUM_VARIATIONS; i++) {
            let randomizedAttacks = getRandomizedAttacksZEITRAUM(allPossibleAttacks);
            let plannedAttacks = planAttacksForVariationZEITRAUM(randomizedAttacks, attackCount, currentServerTime, landingTime);

            let uniqueStartVillages = new Set(plannedAttacks.map(a => a.sourceVillage.VillagCoord)).size;
            if (uniqueStartVillages > maxUniqueStartVillages) {
                maxUniqueStartVillages = uniqueStartVillages;
                bestAttackPlan = plannedAttacks;
            } else if (uniqueStartVillages === maxUniqueStartVillages && plannedAttacks.length > bestAttackPlan.length) {
                bestAttackPlan = plannedAttacks;
            }
        }

        return bestAttackPlan.map(attack => {
            let travelTimeMs = hmsToMilliseconds(attack.travelTime);
            let arrivalTime = new Date(currentServerTime.getTime() + travelTimeMs);

            return {
                StartDorf: attack.sourceVillage.VillagCoord,
                ZielDorf: attack.targetVillage.coordinates,
                Entfernung: attack.distance,
                Reisezeit: attack.travelTime,
                Ankunftszeit: arrivalTime.toLocaleString(),
                SendeZeit: 'Jetzt senden'
            };
        });
    }
    ////////////////////////////////////
    ////RANDOM FÜR SOFORT + GANZTAGS////
    function planAttacksForVariationGANZTAGS(randomizedAttacks, attackCount, currentServerTime, DayWithNightHours) {
        let sourceVillageUsageCount = new Map();
        let targetVillageAttackCounter = new Map();
        let attackPairs = new Set(); 
        let plannedAttacks = [];

        for (let attack of randomizedAttacks) {
            let travelTimeMs = hmsToMilliseconds(attack.travelTime);
            let potentialArrivalTime = new Date(currentServerTime.getTime() + travelTimeMs);

            // Überprüfung der Ankunftszeit im definierten Zeitfenster
            if (!isWithinTimeWindow(potentialArrivalTime, DayWithNightHours)) {
                continue;
            }

            let sourceVillageId = attack.sourceVillage.VillagCoord;
            let targetVillageId = attack.targetVillage.coordinates;
            let pairKey = `${sourceVillageId}-${targetVillageId}`;

            if (attackPairs.has(pairKey)) {
                continue;
            }

            let sourceUsage = sourceVillageUsageCount.get(sourceVillageId) || 0;
            let targetCount = targetVillageAttackCounter.get(targetVillageId) || 0;

            if (sourceUsage < attack.sourceVillage.MatchCount && targetCount < attackCount) {
                plannedAttacks.push(attack);
                sourceVillageUsageCount.set(sourceVillageId, sourceUsage + 1);
                targetVillageAttackCounter.set(targetVillageId, targetCount + 1);
                attackPairs.add(pairKey);
            }
        }

        return plannedAttacks;
    }
    function getRandomizedAttacksGANZTAGS(allPossibleAttacks) {
        let shuffledAttacks = [...allPossibleAttacks];
        for (let i = shuffledAttacks.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [shuffledAttacks[i], shuffledAttacks[j]] = [shuffledAttacks[j], shuffledAttacks[i]];
        }
        return shuffledAttacks;
    }
    function planRandomizedAttacksGANZTAGS(allPossibleAttacks, attackCount, currentServerTime, DayWithNightHours) {
        const NUM_VARIATIONS = 250;
        let bestAttackPlan = [];
        let maxUniqueStartVillages = 0;

        for (let i = 0; i < NUM_VARIATIONS; i++) {
            let randomizedAttacks = getRandomizedAttacksGANZTAGS(allPossibleAttacks);
            let plannedAttacks = planAttacksForVariationGANZTAGS(randomizedAttacks, attackCount, currentServerTime, DayWithNightHours);

            let uniqueStartVillages = new Set(plannedAttacks.map(a => a.sourceVillage.VillagCoord)).size;
            if (uniqueStartVillages > maxUniqueStartVillages) {
                maxUniqueStartVillages = uniqueStartVillages;
                bestAttackPlan = plannedAttacks;
            } else if (uniqueStartVillages === maxUniqueStartVillages && plannedAttacks.length > bestAttackPlan.length) {
                bestAttackPlan = plannedAttacks;
            }
        }

        return bestAttackPlan.map(attack => {
            let travelTimeMs = hmsToMilliseconds(attack.travelTime);
            let arrivalTime = new Date(currentServerTime.getTime() + travelTimeMs);

            return {
                StartDorf: attack.sourceVillage.VillagCoord,
                ZielDorf: attack.targetVillage.coordinates,
                Entfernung: attack.distance,
                Reisezeit: attack.travelTime,
                Ankunftszeit: arrivalTime.toLocaleString(),
                SendeZeit: 'Jetzt senden'
            };
        });
    }
    function isWithinTimeWindow(arrivalTime, DayWithNightHours) {
        let arrivalDate = arrivalTime.toISOString().split('T')[0];
        if (arrivalDate !== DayWithNightHours.date) {
            return false;
        }

        let arrivalHour = arrivalTime.getHours();
        let startHour = parseInt(DayWithNightHours.start_hour);
        let endHour = parseInt(DayWithNightHours.end_hour);

        if (endHour <= startHour) {
            return arrivalHour >= endHour && arrivalHour < startHour;
        } else {
            return arrivalHour >= endHour || arrivalHour < startHour;
        }
    }
    ////////////////////////////////////
    ////RANDOM FÜR ABSCHICKZEITRAUM + GANZTAGS////
    function planRandomizedAttacksWithStartTimeGANZTAGS(allPossibleAttacks, attackCount, currentServerTime, DayWithNightHours, attackTime) {
        const NUM_VARIATIONS = 250;
        let bestAttackPlan = [];
        let maxUniqueStartVillages = 0;

        for (let i = 0; i < NUM_VARIATIONS; i++) {
            let randomizedAttacks = getRandomizedAttacksGANZTAGS(allPossibleAttacks);
            let plannedAttacks = planAttacksForVariationGANZTAGS(randomizedAttacks, attackCount, currentServerTime, DayWithNightHours);

            let uniqueStartVillages = new Set(plannedAttacks.map(a => a.sourceVillage.VillagCoord)).size;
            if (uniqueStartVillages > maxUniqueStartVillages) {
                maxUniqueStartVillages = uniqueStartVillages;
                bestAttackPlan = plannedAttacks;
            } else if (uniqueStartVillages === maxUniqueStartVillages && plannedAttacks.length > bestAttackPlan.length) {
                bestAttackPlan = plannedAttacks;
            }
        }

        return bestAttackPlan.map(attack => {
            let travelTimeMs = hmsToMilliseconds(attack.travelTime);
            let arrivalTime = new Date(currentServerTime.getTime() + travelTimeMs);

            let sendTime = calculateSendTimeWithinWindow(attackTime, currentServerTime, travelTimeMs);

            return {
                StartDorf: attack.sourceVillage.VillagCoord,
                ZielDorf: attack.targetVillage.coordinates,
                Entfernung: attack.distance,
                Reisezeit: attack.travelTime,
                Ankunftszeit: arrivalTime.toLocaleString(),
                SendeZeit: sendTime.toLocaleString()
            };
        });
    }
    function calculateSendTimeWithinWindow(attackTime, currentServerTime, travelTimeMs) {
        if (!attackTime || !attackTime.startTime || !attackTime.endTime) {
            throw new Error('Attack time window is not defined properly.');
        }

        // Verwenden Sie die startTime und endTime direkt, da sie bereits Date-Objekte sind
        let windowStart = attackTime.startTime;
        let windowEnd = attackTime.endTime;

        // Berechnen Sie die Sendezeit innerhalb des Fensters
        let sendTime = new Date(windowStart.getTime() + Math.random() * (windowEnd.getTime() - windowStart.getTime()));

        // Stellen Sie sicher, dass die berechnete Sendezeit nach der aktuellen Serverzeit liegt
        if (sendTime.getTime() < currentServerTime.getTime()) {
            throw new Error('Calculated send time is before the current server time.');
        }

        return sendTime;
    }
    ////////////////////////////////////
    ////RANDOM FÜR ABSCHICKZEITRAUM + ANKUNFTSZEITRAUM////
    function planAttacksForVariationWithStartTimeZEITRAUM(randomizedAttacks, attackCount, currentServerTime, landingTime, attackTime) {
        let sourceVillageUsageCount = new Map();
        let targetVillageAttackCounter = new Map();
        let attackPairs = new Set();
        let plannedAttacks = [];

        // Konvertiere das Datum und die Zeiten in Date-Objekte
        let landingStartTime = new Date(landingTime.date + 'T' + landingTime.startTime);
        let landingEndTime = new Date(landingTime.date + 'T' + landingTime.endTime);

        for (let attack of randomizedAttacks) {
            let travelTimeMs = hmsToMilliseconds(attack.travelTime);

            // Bestimme den frühestmöglichen und spätestmöglichen Sendezeitpunkt
            let earliestSendTime = new Date(landingStartTime.getTime() - travelTimeMs);
            let latestSendTime = new Date(landingEndTime.getTime() - travelTimeMs);

            // Berechne die tatsächliche Sendezeit innerhalb des Zeitfensters
            let actualSendTime = calculateSendTimeWithinWindowTwo(attackTime, earliestSendTime, latestSendTime);

            // Überprüfe, ob die Sendezeit innerhalb des Absendefensters liegt
            if (actualSendTime < attackTime.startTime || actualSendTime > attackTime.endTime) {
                continue;
            }

            let sourceVillageId = attack.sourceVillage.VillagCoord;
            let targetVillageId = attack.targetVillage.coordinates;
            let pairKey = `${sourceVillageId}-${targetVillageId}`;

            if (attackPairs.has(pairKey)) {
                continue;
            }

            let sourceUsage = sourceVillageUsageCount.get(sourceVillageId) || 0;
            let targetCount = targetVillageAttackCounter.get(targetVillageId) || 0;

            if (sourceUsage < attack.sourceVillage.MatchCount && targetCount < attackCount) {
                let arrivalTime = new Date(actualSendTime.getTime() + travelTimeMs);
                plannedAttacks.push({
                    StartDorf: sourceVillageId,
                    ZielDorf: targetVillageId,
                    Entfernung: attack.distance,
                    Reisezeit: attack.travelTime,
                    Ankunftszeit: arrivalTime.toLocaleString(),
                    SendeZeit: actualSendTime.toLocaleString()
                });
                sourceVillageUsageCount.set(sourceVillageId, sourceUsage + 1);
                targetVillageAttackCounter.set(targetVillageId, targetCount + 1);
                attackPairs.add(pairKey);
            }
        }

        return plannedAttacks;
    }
    function planRandomizedAttacksZEITRAUMTwo(allPossibleAttacks, attackCount, currentServerTime, landingTime, attackTime) {
        const NUM_VARIATIONS = 250;
        let bestAttackPlan = [];
        let maxUniqueStartVillages = 0;

        for (let i = 0; i < NUM_VARIATIONS; i++) {
            let randomizedAttacks = getRandomizedAttacksZEITRAUM(allPossibleAttacks);
            let plannedAttacks = planAttacksForVariationWithStartTimeZEITRAUM(randomizedAttacks, attackCount, currentServerTime, landingTime, attackTime);

            let uniqueStartVillages = new Set(plannedAttacks.map(a => a.StartDorf)).size;
            if (uniqueStartVillages > maxUniqueStartVillages) {
                maxUniqueStartVillages = uniqueStartVillages;
                bestAttackPlan = plannedAttacks;
            } else if (uniqueStartVillages === maxUniqueStartVillages && plannedAttacks.length > bestAttackPlan.length) {
                bestAttackPlan = plannedAttacks;
            }
        }

        return bestAttackPlan;
    }
    function calculateSendTimeWithinWindowTwo(attackTime, earliestSendTime, latestSendTime) {
        let windowStart = attackTime.startTime > earliestSendTime ? attackTime.startTime : earliestSendTime;
        let windowEnd = attackTime.endTime < latestSendTime ? attackTime.endTime : latestSendTime;

        // Wähle eine zufällige Zeit innerhalb des möglichen Fensters
        return new Date(windowStart.getTime() + Math.random() * (windowEnd.getTime() - windowStart.getTime()));
    }
    ////////////////////////////////////
    ////RANDOM FÜR SOFORT + BELIEBIG////
    function planAttacksForVariationBeliebig(randomizedAttacks, attackCount, currentServerTime, DayWithNightHours) {
        let sourceVillageUsageCount = new Map();
        let targetVillageAttackCounter = new Map();
        let attackPairs = new Set(); 
        let plannedAttacks = [];

        for (let attack of randomizedAttacks) {
            let travelTimeMs = hmsToMilliseconds(attack.travelTime);
            let potentialArrivalTime = new Date(currentServerTime.getTime() + travelTimeMs);

            // Überprüfung der Ankunftszeit im definierten Zeitfenster
            if (!isWithinTimeWindowBeliebig(potentialArrivalTime, DayWithNightHours)) {
                continue;
            }

            let sourceVillageId = attack.sourceVillage.VillagCoord;
            let targetVillageId = attack.targetVillage.coordinates;
            let pairKey = `${sourceVillageId}-${targetVillageId}`;

            if (attackPairs.has(pairKey)) {
                continue;
            }

            let sourceUsage = sourceVillageUsageCount.get(sourceVillageId) || 0;
            let targetCount = targetVillageAttackCounter.get(targetVillageId) || 0;

            if (sourceUsage < attack.sourceVillage.MatchCount && targetCount < attackCount) {
                plannedAttacks.push(attack);
                sourceVillageUsageCount.set(sourceVillageId, sourceUsage + 1);
                targetVillageAttackCounter.set(targetVillageId, targetCount + 1);
                attackPairs.add(pairKey);
            }
        }

        return plannedAttacks;
    }
    function planRandomizedAttacksBeliebig(allPossibleAttacks, attackCount, currentServerTime, DayWithNightHours) {
        const NUM_VARIATIONS = 250;
        let bestAttackPlan = [];
        let maxUniqueStartVillages = 0;

        for (let i = 0; i < NUM_VARIATIONS; i++) {
            let randomizedAttacks = getRandomizedAttacksGANZTAGS(allPossibleAttacks);
            let plannedAttacks = planAttacksForVariationBeliebig(randomizedAttacks, attackCount, currentServerTime, DayWithNightHours);

            let uniqueStartVillages = new Set(plannedAttacks.map(a => a.sourceVillage.VillagCoord)).size;
            if (uniqueStartVillages > maxUniqueStartVillages) {
                maxUniqueStartVillages = uniqueStartVillages;
                bestAttackPlan = plannedAttacks;
            } else if (uniqueStartVillages === maxUniqueStartVillages && plannedAttacks.length > bestAttackPlan.length) {
                bestAttackPlan = plannedAttacks;
            }
        }

        return bestAttackPlan.map(attack => {
            let travelTimeMs = hmsToMilliseconds(attack.travelTime);
            let arrivalTime = new Date(currentServerTime.getTime() + travelTimeMs);

            return {
                StartDorf: attack.sourceVillage.VillagCoord,
                ZielDorf: attack.targetVillage.coordinates,
                Entfernung: attack.distance,
                Reisezeit: attack.travelTime,
                Ankunftszeit: arrivalTime.toLocaleString(),
                SendeZeit: 'Jetzt senden'
            };
        });
    }
    function isWithinTimeWindowBeliebig(arrivalTime, DayWithNightHours) {
        let arrivalHour = arrivalTime.getHours();
        let startHour = parseInt(DayWithNightHours.start_hour);
        let endHour = parseInt(DayWithNightHours.end_hour);
    
        if (endHour <= startHour) {
            return arrivalHour >= endHour && arrivalHour < startHour;
        } else {
            return arrivalHour >= endHour || arrivalHour < startHour;
        }
    }
    ////////////////////////////////////
    ////RANDOM FÜR ABSCHICKZEITRAUM + BELIEBIG//// 
    function planRandomizedAttacksWithStartTimeBeliebig(allPossibleAttacks, attackCount, currentServerTime, DayWithNightHours, attackTime) {
        const NUM_VARIATIONS = 250;
        let bestAttackPlan = [];
        let maxUniqueStartVillages = 0;

        for (let i = 0; i < NUM_VARIATIONS; i++) {
            let randomizedAttacks = getRandomizedAttacksGANZTAGS(allPossibleAttacks);
            let plannedAttacks = planAttacksForVariationBeliebig(randomizedAttacks, attackCount, currentServerTime, DayWithNightHours);

            let uniqueStartVillages = new Set(plannedAttacks.map(a => a.sourceVillage.VillagCoord)).size;
            if (uniqueStartVillages > maxUniqueStartVillages) {
                maxUniqueStartVillages = uniqueStartVillages;
                bestAttackPlan = plannedAttacks;
            } else if (uniqueStartVillages === maxUniqueStartVillages && plannedAttacks.length > bestAttackPlan.length) {
                bestAttackPlan = plannedAttacks;
            }
        }

        return bestAttackPlan.map(attack => {
            let travelTimeMs = hmsToMilliseconds(attack.travelTime);
            let arrivalTime = new Date(currentServerTime.getTime() + travelTimeMs);

            let sendTime = calculateSendTimeWithinWindowBeliebig(attackTime, currentServerTime, travelTimeMs);

            return {
                StartDorf: attack.sourceVillage.VillagCoord,
                ZielDorf: attack.targetVillage.coordinates,
                Entfernung: attack.distance,
                Reisezeit: attack.travelTime,
                Ankunftszeit: arrivalTime.toLocaleString(),
                SendeZeit: sendTime.toLocaleString()
            };
        });
    }
    function calculateSendTimeWithinWindowBeliebig(attackTime, currentServerTime, travelTimeMs) {
        if (!attackTime || !attackTime.startTime || !attackTime.endTime) {
            throw new Error('Attack time window is not defined properly.');
        }
    
        // Extrahiere nur die Uhrzeiten, ignoriere das Datum
        let windowStart = new Date();
        windowStart.setHours(attackTime.startTime.getHours(), attackTime.startTime.getMinutes(), attackTime.startTime.getSeconds());
        
        let windowEnd = new Date();
        windowEnd.setHours(attackTime.endTime.getHours(), attackTime.endTime.getMinutes(), attackTime.endTime.getSeconds());
    
        if (windowEnd.getTime() <= windowStart.getTime()) {
            windowEnd.setDate(windowEnd.getDate() + 1); // Füge einen Tag hinzu, wenn das Zeitfenster Mitternacht überschreitet
        }
    
        // Berechnen Sie die Sendezeit innerhalb des Fensters
        let sendTime = new Date(windowStart.getTime() + Math.random() * (windowEnd.getTime() - windowStart.getTime()));
    
        // Stellen Sie sicher, dass die berechnete Sendezeit nach der aktuellen Serverzeit liegt
        if (sendTime.getTime() < currentServerTime.getTime()) {
            throw new Error('Calculated send time is before the current server time.');
        }
    
        // Rückgabewert ist das berechnete Sendefenster, berücksichtigt das aktuelle Datum
        return sendTime;
    }

    async function getSlowestUnitSpeed(selectedUnits) {
        const unitInfo = await twSDK.getWorldUnitInfo();
        let slowestSpeed = 30; // Langsamste Geschwindigkeit auf 30 festgelegt

        for (let unit in selectedUnits) {
            if (selectedUnits[unit] > 0 && unitInfo[unit] && unitInfo[unit].speed) {
                let unitSpeed = parseFloat(unitInfo[unit].speed);
                if (unitSpeed > slowestSpeed) {
                    slowestSpeed = unitSpeed; // Aktualisiere auf die langsamste Geschwindigkeit
                }
            }
        }

        return slowestSpeed;
    }

    async function calculateTimeBySpeed(distance, speed) {
        // Implementiere die Zeitberechnung basierend auf der Entfernung und der Geschwindigkeit
        // Beispiel-Logik (muss an das tatsächliche Setup angepasst werden):
        const worldConfig = await twSDK.getWorldConfig();
        const { speed: worldSpeed, unit_speed: worldUnitSpeed } = worldConfig.config;

        let travelTimeInSeconds = Math.round(
            (distance * speed * 60) / worldSpeed / worldUnitSpeed
        );

        return twSDK.secondsToHms(travelTimeInSeconds);
    }

    function calculateDistance(from, to) {
        const [x1, y1] = from.split('|');
        const [x2, y2] = to.split('|');
        const deltaX = Math.abs(x1 - x2);
        const deltaY = Math.abs(y1 - y2);
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    }

    function calculateSendTime(travelTime, landingTime, currentServerTime) {
        // Umwandeln der Reisezeit in Millisekunden
        let travelTimeMs = hmsToMilliseconds(travelTime);

        // Umwandeln der Landezeiten in Date-Objekte
        let landingStartTime = new Date(`${landingTime.date} ${landingTime.startTime}`);
        let landingEndTime = new Date(`${landingTime.date} ${landingTime.endTime}`);

        // Berechne die früheste und späteste Absendezeit
        let earliestSendTime = new Date(landingStartTime.getTime() - travelTimeMs);
        let latestSendTime = new Date(landingEndTime.getTime() - travelTimeMs);

        // Überprüfen, ob die aktuelle Zeit innerhalb des Sendefensters liegt
        if (currentServerTime > earliestSendTime && currentServerTime < latestSendTime) {
            return 'Jetzt senden';
        } else if (currentServerTime <= earliestSendTime) {
            return `Senden um ${earliestSendTime.toISOString()}`;
        } else {
            return 'Sendefenster verpasst';
        }
    }

    function hmsToMilliseconds(hms) {
        let [hours, minutes, seconds] = hms.split(':');
        return (parseInt(hours) * 60 * 60 + parseInt(minutes) * 60 + parseInt(seconds)) * 1000;
    }

    $(document).ready(function() {
        $('#Abgleichen').on('click', function() {
            calculateAttacks(currentChosenUnits); // Stellen Sie sicher, dass `currentChosenUnits` hier verfügbar ist
        });
    });

    function createAttackTable(attacksData) {

        // Überprüfen, ob bereits eine Tabelle existiert und diese entfernen
        let existingTable = document.getElementById('attacksTable');
        if (existingTable) {
            existingTable.remove();
        }

        // Neue Tabelle erstellen
        let table = document.createElement('table');
        table.id = 'attacksTable'; // Setze eine eindeutige ID für die Tabelle
        table.style.width = '100%';
        table.setAttribute('border', '1');

        // Kopfzeile für die Anzahl der geplanten Angriffe hinzufügen
        let caption = table.createCaption();
        caption.textContent = `Geplante Angriffe: ${attacksData.length}`;
        caption.style.fontWeight = 'bold';
        caption.style.fontSize = 'large';

        let thead = table.createTHead();
        let row = thead.insertRow();

        let headers = ["StartDorf", "ZielDorf", "Entfernung", "Reisezeit", "Ankunftszeit", "Sende Zeit"];
        headers.forEach(headerText => {
            let header = document.createElement('th');
            header.textContent = headerText;
            row.appendChild(header);
        });

        attacksData.forEach((attack, index) => {
            let row = table.insertRow();
            row.id = 'attackRow-' + index; // Eindeutige ID für die Zeile
            Object.values(attack).forEach(text => {
                let cell = row.insertCell();
                cell.textContent = text;
            });
        });
        

        let buttonContainer = document.getElementById('Abgleichen').parentNode;
        buttonContainer.parentNode.insertBefore(table, buttonContainer.nextSibling);
    }

    let attacksDataTable

    async function sendAttacks(attacksData) {
        const world = game_data.world;
        attacksDataTable = attacksData
        console.debug(currentChosenUnits);

        const unitQueryStringSegments = Object.entries(currentChosenUnits).map(([unit, count]) => `&${unit}=${count}`).join('');

        const villages = await twSDK.worldDataAPI('village');
        const getVillageId = (x, y) => {
            const village = villages.find(village => village[2] === x && village[3] === y);
            return village ? village[0] : null;
        };

        const urls = attacksData.map(attack => {
            const startVillageCoords = attack.StartDorf.split('|');
            const targetVillageCoords = attack.ZielDorf.split('|');
            const startVillageId = getVillageId(startVillageCoords[0], startVillageCoords[1]);
            const targetVillageId = getVillageId(targetVillageCoords[0], targetVillageCoords[1]);

            return `https://${world}.die-staemme.de/game.php?village=${startVillageId}&screen=place&target=${targetVillageId}${unitQueryStringSegments}`;
        });

        return urls;
    }

    let currentAttackIndex = 0;

    const TAB_OPEN_DELAY = 200; // Verzögerung zwischen dem Öffnen von Tabs in Millisekunden

    async function sendAttackTabs() {
        try {

            for (let i = localStorage.length - 1; i >= 0; i--) {
                const key = localStorage.key(i);
                if (key && key.startsWith('FakeSender')) {
                    localStorage.removeItem(key);
                }
            }
            
            const attackInterval = angriffeSenden();
            const urls = await sendAttacks(attacksDataTable);
            const endIndex = Math.min(currentAttackIndex + attackInterval, urls.length);
            console.debug("test", attacksDataTable)

            const foundVillages = await findVillages();

            foundVillages.forEach(village => {
                localStorage.setItem('FakeSender_' + village.id, village.id);
            });

            for (let i = currentAttackIndex; i < endIndex; i++) {
                // Verzögert das Öffnen jedes Tabs
                setTimeout(() => openTab(i, urls), TAB_OPEN_DELAY * (i - currentAttackIndex));
            }

            // Aktualisiert den currentAttackIndex nachdem alle Tabs geöffnet wurden
            await new Promise(resolve => setTimeout(resolve, TAB_OPEN_DELAY * (endIndex - currentAttackIndex)));
            currentAttackIndex = endIndex;
        } catch (error) {
            console.error('Fehler beim Verarbeiten der Angriffe:', error);
        }
        async function findVillages() {
            const villages = await twSDK.worldDataAPI('village');
            const foundVillages = [];
            attacksDataTable.forEach(attack => {
                if (attack.StartDorf) {
                    const [x, y] = attack.StartDorf.trim().split('|');
                    const village = villages.find(village => village[2] === x && village[3] === y);
                    if (village) {
                        const villageId = village[0];
                        foundVillages.push({ id: villageId, coordinates: `${x}|${y}` });
                    }
                }
            });
            return foundVillages;
        }

        function openTab(index, urls) {
            const newTab = window.open(urls[index], '_blank');
        
            const row = document.getElementById('attackRow-' + index);
            if (row) {
                row.style.backgroundColor = 'green';
            }
        }
    }

    if (window.location.href.includes('screen=memo')) {
        document.getElementById('senden').addEventListener('click', sendAttackTabs);
    }
}



const ACTION_DELAY_MIN = 100;
const ACTION_DELAY_MAX = 600;

function performAction(selectorId) {
  const element = document.getElementById(selectorId);
  if (element) {
    element.click();
  }
}

function abschicken() {
    
        const gesuchterSchluessel = game_data.village.id;
        const url = window.location.href;
  
        const key = "FakeSender_" + gesuchterSchluessel;
        if (localStorage.getItem(key) != null) {
            
        document.title = `FakeSender_${game_data.village.id}`;
        var tabName = document.title;
        if (tabName === `FakeSender_${game_data.village.id}`) {

            const hasScreenPlace = url.includes("screen=place&target")
            const hasScreenPlace2 = url.includes("screen=place&village");
            const hasScreenPlaceConfirm = url.includes("screen=place&try=confirm");



        if (hasScreenPlace) {
            setTimeout(() => {
                performAction("target_attack");
            }, Math.floor(Math.random() * (ACTION_DELAY_MAX - ACTION_DELAY_MIN)) + ACTION_DELAY_MIN);
            } else if (hasScreenPlaceConfirm) {
            setTimeout(() => {
                performAction("troop_confirm_submit");
            }, Math.floor(Math.random() * (ACTION_DELAY_MAX - ACTION_DELAY_MIN)) + ACTION_DELAY_MIN);
            }

            const errorBox = document.querySelector(".error_box");
            if (errorBox && errorBox.textContent.includes("Angriffstrupp") || hasScreenPlace2) {      
            localStorage.removeItem(key); 
            window.close();
            }
        }
    }
} 
abschicken();

//

    const selectedPlayers = [];

    let playerVillages = []; 

if (window.location.href.includes('screen=memo')) {     
    document.getElementById('raPlayers').onchange = async function() {
        // Code zum Auswählen von Spielern
        const selectedPlayer = document.getElementById('raPlayers').value;
        console.log('Ausgewählter Spieler:', selectedPlayer);
    
        if (selectedPlayer !== '') {
            const selectedPlayerObject = players.find(([id, name]) => twSDK.cleanString(name) === selectedPlayer);
            if (selectedPlayerObject) {
                selectedPlayers.push(selectedPlayerObject);
                console.log('Ausgewählte Spieler:', selectedPlayers);
    
                // Erhalte die Dorfdaten aus der worldDataAPI
                const villagesData = await twSDK.worldDataAPI('village');
                const newPlayerVillages = villagesData.filter(village => village[4] === parseInt(selectedPlayerObject[0]));
    
                // Hinzufügen der neuen Dörfer zu playerVillages
                playerVillages = [...playerVillages, ...newPlayerVillages];
    
                // Extrahiere die Koordinaten und Dorf-IDs
                newPlayerVillages.forEach(village => {
                    const villageId = village[0];
                    const coords = village[2] + '|' + village[3];
                    console.log(`Dorf-ID: ${villageId}, Koordinaten: ${coords}`);
                });
    
                createTable(selectedPlayers, 'Players');
                return;
            }
        }
    
        // Falls kein Spieler ausgewählt wurde, leere die Tabelle für Spieler
        createTable([], 'Players');
    };
    
    function createTable(selectedArray, entity) {
        const tableContainer = document.getElementById('tableContainerPlayer');
    
        tableContainer.innerHTML = ''; // Lösche den vorherigen Inhalt des Containers
        tableContainer.style.display = selectedArray.length > 0 ? 'block' : 'none';
    
        if (selectedArray.length > 0) {
            const table = document.createElement('table');
            table.style.width = '100%';
            table.setAttribute('border', '1');
    
            // Erstelle die Kopfzeile für die Tabelle
            const headerRow = table.createTHead().insertRow();
            const headerCell = document.createElement('th');
            headerCell.textContent = 'Spieler';
            headerRow.appendChild(headerCell);
            const headerRemoveCell = document.createElement('th');
            headerRemoveCell.textContent = 'Aktionen';
            headerRow.appendChild(headerRemoveCell);
    
            // Iteriere durch die ausgewählten Elemente und füge sie zur Tabelle hinzu
            selectedArray.forEach((item, index) => {
                const row = table.insertRow();
    
                const cell = row.insertCell(0);
                // Füge das Bild vor dem Spieler ein
                const playerImage = document.createElement('img');
                playerImage.src = 'https://dsde.innogamescdn.com/asset/c38e8d7e/graphic/welcome/player_points.png';
                playerImage.style.marginRight = '10px';
                cell.appendChild(playerImage);
    
                cell.innerHTML += item[1];
    
                // Füge Schaltfläche zum Entfernen hinzu
                const removeCell = row.insertCell(1);
                const removeButton = document.createElement('button');
                removeButton.textContent = 'Entfernen';
                removeButton.classList.add('btn');
    
                removeButton.onclick = function() {
                    const playerIdToRemove = item[0]; // oder item.id
                
                    // Entferne den Spieler aus selectedPlayers
                    const indexInSelectedPlayers = selectedPlayers.findIndex(player => player[0] === playerIdToRemove);
                    if (indexInSelectedPlayers > -1) {
                        selectedPlayers.splice(indexInSelectedPlayers, 1);
                    }
                
                    // Entferne die Dörfer des Spielers aus playerVillages
                    // Stellen Sie sicher, dass Sie die richtige Eigenschaft zur Überprüfung der Spieler-ID verwenden
                    playerVillages = playerVillages.filter(village => village[4] !== playerIdToRemove);
                
                    createTable(selectedPlayers, 'Players');
                };
                
                
                removeCell.appendChild(removeButton);
            });
    
            tableContainer.appendChild(table);
        } else {
            // Wenn kein Spieler ausgewählt wurde, zeige eine Meldung
            tableContainer.textContent = 'Kein Spieler ausgewählt.';
        }
    }
}  
    


    async function fetchWorldData() {
        try {
            const villages = await twSDK.worldDataAPI('village');
            const players = await twSDK.worldDataAPI('player');
            const tribes = await twSDK.worldDataAPI('ally');
            return { villages, players, tribes };
        } catch (error) {
            UI.ErrorMessage(error);
            console.error(`${scriptInfo} Error:`, error);
        }
    }


    }
);





} else {
    console.log('negativ');
    UI.ErrorMessage("Deine Laufzeit für den Fake Sender ist abgelaufen.", 2000);
  }
})
.catch(error => {
  console.error('Ein Fehler ist aufgetreten:', error);
});

function isSameDayOrFuture(date1, date2) {
var currentDate = new Date();
currentDate.setHours(0, 0, 0, 0);
date1.setHours(0, 0, 0, 0);
return date1 >= currentDate;
}
