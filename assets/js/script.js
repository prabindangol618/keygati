document.addEventListener("DOMContentLoaded", function () {

    console.log("KEYGATI STARTED");

    document.addEventListener("click", (event) => {

        const button = event.target.closest("button");

        if (button) {
            button.blur();
        }

    });

    const typingText =
        document.getElementById("typing-text");

    const isMobileDevice =
        /Android|iPhone|iPad|iPod|Mobile/i.test(
            navigator.userAgent
        );

    const wpmValue =
        document.getElementById("wpm-value");

    const timeValue =
        document.getElementById("time-value");

    const accuracyValue =
        document.getElementById("accuracy-value");

    const restartButton =
        document.getElementById("restart-button");

    const charStatsValue =
        document.getElementById("char-stats-value");

    const charStatsTotal =
        document.getElementById("char-stats-total");

    const typingInput =
        document.getElementById("typing-input");

    const duration15Button =
        document.getElementById("duration-15");

    const duration30Button =
        document.getElementById("duration-30");

    const duration60Button =
        document.getElementById("duration-60");

    const duration120Button =
        document.getElementById("duration-120");

    const resultsModal =
        document.getElementById("results-modal");

    const resultWpm =
        document.getElementById("result-wpm");

    const resultAccuracy =
        document.getElementById("result-accuracy");

    const resultCharacters =
        document.getElementById("result-characters");

    const resultRestartButton =
        document.getElementById("result-restart-button");

    const passages = [

        "Rain began falling just before midnight, turning the quiet streets into mirrors of yellow streetlights and glowing shop signs. Most people had already gone home, but one small tea shop remained open at the corner of the road.",

        "The old house stood at the end of a narrow road, surrounded by tall trees and wild grass. Nobody had lived there for years, yet every evening a warm light appeared behind one of the upstairs windows.",

        "At sunrise, the mountain looked completely different from the night before. Thin clouds moved slowly across the valley while the first rays of sunlight touched the snowy peaks one by one.",

        "A small wooden boat drifted across the lake without making much noise. The water was so calm that the reflection of the mountains looked almost identical to the mountains themselves.",

        "The train left the station at exactly six in the morning. Inside the nearly empty carriage, a few passengers watched the city disappear behind them as the landscape slowly changed from buildings to fields.",

        "The smell of freshly baked bread filled the narrow street before most of the shops had opened. A baker stood outside his store carrying a tray of warm pastries while curious customers waited nearby.",

        "The village became unusually quiet after the storm passed. Leaves covered the roads, small streams ran beside the houses, and the air smelled fresh after hours of heavy rain.",

        "A fisherman noticed something unusual floating near the shore. At first he thought it was a piece of wood, but when he moved closer, he realized that a small wooden box was drifting toward him.",

        "The night sky was unusually clear, and thousands of stars were visible above the dark hills. Far away, a dog barked occasionally while the sound of a river could be heard below the campsite.",

        "A young traveler arrived in the city with one backpack, a paper map, and no real plan. He spent the afternoon walking through unfamiliar streets, trying local food and taking photographs of buildings he had never seen before.",

        "The market was already crowded when Maya arrived. Vendors shouted prices from every direction, motorbikes carefully moved through the narrow streets, and the smell of spices filled the air.",

        "A sudden power cut turned the busy restaurant completely dark. For a few seconds nobody spoke. Then someone started laughing, and soon the entire room was filled with conversations and the sound of people trying to find their phones.",

        "The library had a strange atmosphere after sunset. The building was almost empty, the old wooden floors creaked occasionally, and the sound of pages turning seemed unusually loud in the quiet room.",

        "A package arrived without a return address. It was wrapped in brown paper and tied with a thin piece of string. There was only one word written on the front: Tomorrow.",

        "The lighthouse had been standing on the rocky island for more than a hundred years. Every night its bright beam crossed the dark ocean, warning ships about the dangerous cliffs below.",

        "The smell of rain reached the city before the first drops appeared. People hurried along the sidewalks, shopkeepers moved their signs indoors, and umbrellas suddenly appeared everywhere.",

        "A fox appeared near the edge of the forest just before dawn. It stopped for a moment, looked toward the distant road, and then quietly disappeared between the trees.",

        "Deep inside the forest, there was a lake that did not appear on most maps. The water was perfectly clear, and according to local stories, nobody knew how deep it really was.",

        "The museum displayed hundreds of objects from different centuries. Among them was a small metal key that looked ordinary, although the description beside it claimed that it had once opened the door of a royal library.",

        "A tiny café opened on a street where almost every other building had been there for decades. Its owner painted the walls bright yellow and placed three small tables outside beneath a flowering tree.",

        "The first snow of winter covered the rooftops during the night. By morning, children were already running through the streets, leaving footprints across the untouched white ground.",

        "A group of hikers reached the top of the hill just before sunset. The city below slowly began to light up, with thousands of windows glowing as the sky changed from orange to deep blue.",

        "The ocean looked peaceful from the beach, but far beyond the horizon a powerful storm was moving across the water. Dark clouds covered the sky while distant lightning briefly illuminated the clouds.",

        "An empty suitcase was found beside an old railway platform. There was no name attached to it, but inside someone had carefully packed a blue jacket, a notebook, and a photograph of a family standing beside a small house.",

        "The street musician played the same melody every evening. Nobody knew where he came from, but people often stopped for a few minutes to listen before continuing their journey.",

        "The little bookstore was hidden between a bakery and a hardware shop. Its shelves were crowded with old novels, travel guides, maps, and books that smelled as though they had been printed decades ago.",

        "A strange sound came from the attic just after everyone had gone to sleep. It sounded like something moving slowly across the wooden floor, followed by three quiet knocks against the wall.",

        "The village celebrated the beginning of spring with music, food, and colorful decorations. Families gathered in the main square while children ran between the stalls carrying paper flags.",

        "At the edge of the desert stood a single abandoned house. Its windows were broken, its walls were covered with dust, and an old bicycle still rested against the front door.",

        "The road disappeared into the clouds as the bus climbed higher into the mountains. Outside the window, waterfalls appeared between the cliffs and disappeared again behind thick mist.",

        "A curious cat discovered an open window and decided to explore the apartment next door. It walked across the kitchen, knocked over a spoon, and immediately hid beneath a chair when someone entered the room.",

        "The restaurant was famous for serving only seven dishes. Every morning the chef visited the local market personally, choosing vegetables, herbs, fish, and spices before deciding what would appear on the menu that evening.",

        "An astronaut looked down through the spacecraft window and saw Earth slowly turning beneath him. The blue oceans, white clouds, and enormous continents looked strangely peaceful from hundreds of kilometers above the surface.",

        "Scientists discovered a deep cave beneath the mountain while studying underground water systems. Inside, they found unusual rock formations that had taken thousands of years to develop.",

        "A tiny island appeared on an old map but was missing from modern navigation systems. Nobody was sure whether the island had disappeared beneath the ocean or whether the original map simply contained a mistake.",

        "The robot stood quietly in the corner of the laboratory while engineers watched the screen. After several seconds, it suddenly raised one hand and pointed toward a locked door.",

        "The city looked completely different from the rooftop. Cars moved like tiny streams of light through the streets, buildings stretched toward the horizon, and distant airplanes crossed the dark sky.",

        "A message appeared on the computer screen at exactly 2:17 in the morning. It contained only six words: I know where you are.",

        "The old camera had been sitting inside a drawer for decades. When someone finally developed the film, every photograph showed the same empty street, taken from exactly the same position.",

        "A young scientist placed a small glass container under the microscope. What appeared on the screen looked like a simple collection of cells, but the pattern slowly began to move in an unexpected direction.",

        "The moon was unusually bright that evening. Families sat outside their houses, travelers walked along the quiet roads, and the mountains appeared almost silver beneath the night sky.",

        "A storm forced the airplane to change its route and land at a small airport in the middle of nowhere. The passengers expected to wait for an hour, but nobody could explain why the airport staff seemed so nervous.",

        "The fisherman pulled his net from the water and found a bottle trapped inside it. There was a message rolled tightly within the glass, written in faded ink and dated more than fifty years earlier.",

        "A narrow staircase led beneath the old theater. Nobody used it anymore, but a faint light could sometimes be seen under the door at the bottom.",

        "The mountain village had no traffic lights, shopping malls, or tall buildings. Instead, it had stone paths, wooden houses, quiet streams, and a bakery that opened before sunrise every morning.",

        "Every Sunday, the old man sat on the same bench beside the river and fed the birds. One morning, however, he noticed a small envelope waiting beneath the bench.",

        "A colorful kite became trapped in the branches of a tall tree. Two children spent nearly an hour trying different ideas to get it down before finally discovering that a long bamboo stick was enough.",

        "The chef placed the final dish on the table and stepped back. It contained roasted vegetables, fresh herbs, crispy potatoes, and a bright red sauce that had taken three hours to prepare.",

        "A small wooden door stood alone in the middle of a stone wall. There was no building behind it, no path leading toward it, and no explanation for why someone had built it there.",

        "The first explorers entered the abandoned station carefully. Dust covered the floor, old signs hung from the ceiling, and a broken clock had stopped at exactly eleven minutes past four.",

        "A warm wind moved through the trees as the hikers walked along the narrow trail. Somewhere nearby, water rushed over rocks, and the distant sound of birds echoed between the hills.",

        "The city never seemed to sleep. Even after midnight, restaurants remained open, taxis moved through the streets, and small shops continued serving customers beneath bright signs.",

        "A mysterious package appeared on the doorstep every Friday. Nobody in the neighborhood knew who delivered it, and each package contained something completely different: a key, a photograph, a coin, a letter, and once, a tiny compass.",

        "The village clock had stopped working years ago, yet everyone still looked at it whenever they wanted to know the time. Somehow, the broken clock had become part of the identity of the village.",

        "The old bridge crossed a river surrounded by enormous trees. During the day it was used by farmers and travelers, but at night the entire area became silent except for the sound of water below.",

        "A group of friends decided to spend the weekend in a cabin beside the lake. They brought food, sleeping bags, a guitar, and enough firewood to stay warm through the cold mountain night.",

        "The bakery owner knew most of his customers by name. Every morning he prepared the same familiar selection of bread, but occasionally he experimented with unusual combinations of fruit, chocolate, herbs, and spices.",

        "A sudden flash appeared beyond the mountains. It was too bright to be lightning and too slow to be an airplane. For several minutes, everyone in the village stood outside watching the strange light move across the sky.",

        "The abandoned cinema still had hundreds of seats inside. The screen was covered with dust, the curtains were faded, and an old poster near the entrance advertised a movie that had premiered more than thirty years ago.",

        "The traveler reached the top of the mountain just before sunrise. As the first light appeared, the clouds below began to glow, creating the strange impression that the entire valley was floating above the sky.",

        "A small radio in the corner suddenly turned itself on. Static filled the room, followed by a quiet voice reading numbers slowly one after another. Nobody recognized the voice.",

        "The farmer discovered an unusual pattern in the field after a storm. Hundreds of plants had been bent in exactly the same direction, forming a shape that could only be seen from above.",

        "The rain continued throughout the afternoon, so the family decided to stay inside. They cooked dinner together, played cards at the kitchen table, and listened to the sound of water hitting the windows.",

        "A photographer traveled to a remote village hoping to capture the perfect sunrise. Instead, he discovered a small festival taking place in the main square and spent the morning photographing musicians, dancers, food stalls, and laughing children.",

        "The ancient library contained thousands of books, but one shelf was completely empty. According to the librarian, nobody had ever been allowed to place a book there.",

        "A boat appeared on the horizon just before sunset. It moved slowly toward the harbor, but there was something unusual about it: every window was dark, and nobody could be seen on the deck.",

        "The desert seemed endless beneath the afternoon sun. Sand stretched in every direction, interrupted only by a few rocks and a distant line of mountains that looked almost unreal through the heat.",

        "A small red umbrella was left beside the train station every rainy morning. Nobody knew who owned it, but anyone who needed it was welcome to take it.",

        "The mountain guide stopped suddenly and pointed toward the snow. A series of fresh footprints crossed the trail and disappeared behind a large rock. They did not belong to any of the hikers.",

        "The first cup of coffee tasted unusually good that morning. Outside, the city was still quiet, the windows were covered with tiny drops of rain, and soft music played from the kitchen.",

        "An old photograph showed a street that looked familiar, but nobody could identify the exact location. Years later, someone recognized the building in the background and discovered that the entire neighborhood had been demolished long ago.",

        "The small boat moved gently across the river while the sun disappeared behind the hills. Birds flew between the trees, fishermen prepared their nets, and smoke rose slowly from houses along the shore.",

        "A traveler entered a restaurant without knowing that it was famous. The menu was handwritten, the tables were simple, and the owner recommended a dish that turned out to be the best meal of the entire trip.",

        "The museum guard noticed that one painting looked slightly different every morning. At first he thought the changing light was responsible, but eventually he began writing down everything he saw.",

        "A group of students built a small weather station on the roof of their school. They measured temperature, wind speed, rainfall, and air pressure, then compared their results every afternoon.",

        "The village festival continued until late at night. Strings of lights crossed the streets, musicians played near the square, and the smell of grilled food followed people wherever they walked.",

        "A package containing an old watch arrived at the apartment with no explanation. The watch did not work, but when the owner opened the back, he found a tiny piece of paper hidden inside.",

        "The forest looked ordinary during the day, but after sunset it became completely different. Strange sounds came from the trees, insects filled the air with quiet noises, and the path seemed much narrower than before.",

        "The ocean is home to creatures that seem almost impossible to imagine. Some live near the surface beneath sunlight, while others survive thousands of meters below where pressure is enormous and almost no light exists.",

        "A volcano can remain quiet for decades before becoming active again. Scientists carefully monitor changes in temperature, gases, earthquakes, and ground movement to understand what may be happening beneath the surface.",

        "The northern lights appear when charged particles from the Sun interact with gases in Earth's atmosphere. The result can be a spectacular display of green, purple, pink, and red light across the night sky.",

        "Deep beneath the ocean, strange ecosystems exist around hydrothermal vents. These environments receive little or no sunlight, yet they support communities of organisms adapted to extreme temperatures and unusual chemical conditions.",

        "The first photographs of Earth from space changed the way many people imagined the planet. From above, national borders disappear, and the atmosphere appears as a thin layer surrounding the entire world.",

        "A giant telescope on a remote mountain spends each night collecting tiny amounts of light from distant objects. Some of the stars it observes are so far away that their light began traveling toward Earth before humans existed.",

        "The human body is capable of remarkable adaptation. Muscles become stronger with regular use, the brain can form new connections, and the senses constantly adjust to changes in the surrounding environment.",

        "A single tree can provide shelter for insects, birds, mammals, fungi, and countless microscopic organisms. Forests are not simply collections of trees; they are complex communities connected in many different ways.",

        "The world beneath the surface of a forest can be just as active as the world above it. Roots, fungi, insects, worms, and microorganisms interact constantly in the soil, breaking down material and returning nutrients to the ecosystem.",

        "Some animals travel enormous distances during migration. Birds may cross oceans, whales can travel between feeding and breeding grounds, and certain insects complete journeys that seem impossible for creatures so small.",

        "The Sahara is one of the largest hot deserts on Earth, but it is not completely empty. Plants, insects, reptiles, birds, and mammals have developed remarkable ways to survive extreme heat and limited water.",

        "Mountains can create their own weather. Air rises along steep slopes, temperatures change with altitude, and clouds can form quickly around high peaks, sometimes producing snow even when the valleys below are warm.",

        "The night sky contains more stars than most people can see from a city. Artificial light makes many of them invisible, which is why remote areas with dark skies are popular places for astronomy and stargazing.",

        "A coral reef may look like a collection of colorful rocks, but it is actually a living ecosystem built by tiny organisms. Thousands of species can depend on reefs for food, shelter, and protection.",

        "Some caves contain underground rivers, enormous chambers, and crystals that have formed over thousands of years. Exploring them can be difficult because darkness, water, narrow passages, and unstable rocks create constant challenges.",

        "The Amazon rainforest receives enormous amounts of rainfall each year. Its rivers, forests, wetlands, and countless species form one of the most complex ecosystems on the planet.",

        "A single drop of seawater contains thousands of microscopic organisms. Although they are invisible to the naked eye, these tiny forms of life play an important role in marine ecosystems and the global carbon cycle.",

        "The Himalayas are still changing. Massive geological forces continue to push the mountains upward while wind, rain, snow, ice, and rivers slowly wear the rock away.",

        "Pokhara looks especially beautiful in the early morning when the mountains are reflected in the calm surface of the lake. As the day becomes warmer, clouds often gather around the surrounding hills.",

        "Kathmandu becomes especially lively during festival seasons. Streets fill with decorations, families visit temples and relatives, markets become crowded, and the smell of traditional food travels through the neighborhoods.",

        "A quiet trail through the hills can reveal something new around every corner. One moment you may see a waterfall between the trees, and the next you may find a small village surrounded by fields.",

        "The streets of an old city often reveal its history without requiring a museum. Buildings, temples, courtyards, markets, stone paths, and faded signs can tell stories about the people who lived there generations ago.",

        "A warm bowl of momo can make a cold evening feel much better. Steam rises from the plate while the spicy sauce sits nearby, waiting for someone brave enough to add a little extra.",

        "The smell of freshly prepared sel roti filled the kitchen while everyone waited for the first batch to finish cooking. Outside, neighbors were already preparing decorations for the festival.",

        "A road trip through Nepal can take you through several completely different landscapes in a single day. The journey may begin among busy streets and end beside quiet rivers, forests, or snow covered mountains.",

        "The monsoon changes the appearance of the hills almost overnight. Green vegetation covers the slopes, waterfalls become more powerful, and small streams appear beside roads that were dry only a few weeks earlier.",

        "At a busy market, every sound seems to compete for attention. Sellers call out to customers, motorcycles pass through narrow gaps, metal shutters move up and down, and conversations continue from every direction.",

        "A traveler sitting beside a mountain road may notice how quickly the weather changes. Bright sunshine can disappear behind clouds within minutes, followed by cold wind and a sudden burst of rain.",

        "The best part of a long journey is sometimes an unexpected stop. A small roadside restaurant, an unfamiliar trail, or a quiet viewpoint can become the place you remember long after the trip is over.",

        "A mysterious island, an abandoned house, a forgotten letter, and a locked door may seem unrelated at first. But sometimes a good story begins when someone becomes curious enough to ask a simple question.",

        "The detective looked at the three objects on the table: a broken watch, a muddy key, and a photograph with one corner missing. None of them seemed important by itself, but together they told a very different story.",

        "The door opened slowly as the wind pushed against it. Inside was a narrow hallway covered with old photographs, each showing the same house at a different point in history.",

        "At exactly midnight, every clock in the town stopped for three seconds. Nobody noticed immediately, but the next morning people began sharing the same strange story about what they had seen during those three seconds.",

        "The traveler followed the handwritten instructions until the road became little more than a dirt path. At the end stood a wooden cabin surrounded by pine trees, with smoke rising quietly from the chimney.",

        "A young engineer found an unusual signal while testing a new radio receiver. It appeared for only a few seconds each night, always at the same time, and always from the same direction.",

        "The rain had washed away the dust from the old sign, revealing a name that nobody in the village recognized. Curious about its history, a group of friends decided to follow the road indicated by the faded arrow.",

        "The final train of the evening was almost empty. A woman sat near the window reading a book, an old man slept across two seats, and a mysterious suitcase remained unattended near the door.",

        "The sun disappeared behind the mountains as the hikers hurried toward the campsite. They could already see the warm glow of a small fire between the trees, which was a welcome sight after several hours on the trail."

    ];

    let passage = "";

    let typedText = "";

    let totalTypedCharacters = 0;

    let totalCorrectCharacters = 0;

    let testDuration = 30;

    let timeLeft = testDuration;

    let started = false;

    let timer = null;

    let testFinished = false;

    /* ================================
       RESTART
    ================================ */

    function restartTest() {

        console.log("RESTART CLICKED");

        /* Stop current timer */

        clearInterval(timer);

        timer = null;

        /* Reset test */

        typedText = "";

        typingInput.value = "";

        totalTypedCharacters = 0;

        totalCorrectCharacters = 0;

        timeLeft = testDuration;

        started = false;

        testFinished = false;

        /* Reset display */

        timeValue.textContent =
            testDuration;

        wpmValue.textContent =
            "0";

        accuracyValue.textContent =
            "100";

        charStatsValue.textContent =
            "0";

        charStatsTotal.textContent =
            "0";

        /* Show fresh passage */

        selectRandomPassage();

        renderPassage();

    }

    function selectRandomPassage() {

        const randomIndex =
            Math.floor(Math.random() * passages.length);

        passage =
            passages[randomIndex];

    }

    function setDuration(duration) {

        clearInterval(timer);

        timer = null;

        testDuration = duration;

        timeLeft = testDuration;

        typedText = "";

        typingInput.value = "";

        totalTypedCharacters = 0;

        totalCorrectCharacters = 0;

        started = false;

        testFinished = false;

        timeValue.textContent =
            testDuration;

        wpmValue.textContent =
            "0";

        accuracyValue.textContent =
            "100";

        charStatsValue.textContent =
            "0";

        charStatsTotal.textContent =
            "0";

        /* Select a new random passage */

        selectRandomPassage();

        /* Show the new passage */

        renderPassage();

        /* ================================
           UPDATE ACTIVE DURATION BUTTON
        ================================ */

        duration15Button.classList.remove(
            "bg-keygati-teal",
            "text-white"
        );

        duration30Button.classList.remove(
            "bg-keygati-teal",
            "text-white"
        );

        duration60Button.classList.remove(
            "bg-keygati-teal",
            "text-white"
        );

        duration120Button.classList.remove(
            "bg-keygati-teal",
            "text-white"
        );

        if (duration === 15) {

            duration15Button.classList.add(
                "bg-keygati-teal",
                "text-white"
            );

        }

        if (duration === 30) {

            duration30Button.classList.add(
                "bg-keygati-teal",
                "text-white"
            );

        }

        if (duration === 60) {

            duration60Button.classList.add(
                "bg-keygati-teal",
                "text-white"
            );

        }

        if (duration === 120) {

            duration120Button.classList.add(
                "bg-keygati-teal",
                "text-white"
            );

        }

    }

    /* ================================
       BUTTON LISTENERS
    ================================ */

    restartButton.addEventListener("click", function () {

        restartTest();

    });

    duration15Button.addEventListener("click", function () {

        setDuration(15);

    });

    duration30Button.addEventListener("click", function () {

        setDuration(30);

    });

    duration60Button.addEventListener("click", function () {

        setDuration(60);

    });

    duration120Button.addEventListener("click", function () {

        setDuration(120);

    });

    resultRestartButton.addEventListener("click", function () {

        resultsModal.classList.add("hidden");

        resultsModal.classList.remove("flex");

        restartTest();

    });

    /* ================================
       RENDER PASSAGE
    ================================ */

    function renderPassage() {

        let html = "";

        for (let i = 0; i < passage.length; i++) {

            // Cursor at current typing position

            if (i === typedText.length) {

                html +=
                    `<span class="typing-cursor"></span>`;

            }

            const character = passage[i];

            if (i >= typedText.length) {

                html +=
                    `<span class="text-keygati-dark/70">${character}</span>`;

            }

            else if (typedText[i] === character) {

                html +=
                    `<span class="text-keygati-teal">${character}</span>`;

            }

            else {

                html +=
                    `<span class="text-keygati-coral">${character}</span>`;

            }

        }

        // Cursor at the very end when passage is completed

        if (typedText.length >= passage.length) {

            html +=
                `<span class="typing-cursor"></span>`;

        }

        typingText.innerHTML = html;

    }

    /* ================================
       START TIMER
    ================================ */

    function startTimer() {

        if (started) {
            return;
        }

        started = true;

        console.log("TIMER STARTED");

        timer = setInterval(function () {

            timeLeft--;

            timeValue.textContent =
                timeLeft;

            if (timeLeft <= 0) {

                clearInterval(timer);

                timer = null;

                started = false;

                testFinished = true;

                console.log("TEST FINISHED");

                showResults();

            }

        }, 1000);

    }

    /* ================================
       UPDATE WPM
    ================================ */

    function updateWPM() {

        const elapsedSeconds =
            testDuration - timeLeft;

        if (elapsedSeconds <= 0) {
            return;
        }

        const correctCharacters =
            getCorrectCharacters();

        const minutes =
            elapsedSeconds / 60;

        const words =
            correctCharacters / 5;

        const wpm =
            Math.round(words / minutes);

        wpmValue.textContent =
            wpm;

    }

    /* ================================
       COUNT CORRECT CHARACTERS
    ================================ */

    function getCorrectCharacters() {

        return totalCorrectCharacters;

    }

    /* ================================
       UPDATE ACCURACY
    ================================ */

    function updateAccuracy() {

        const totalCharacters =
            totalTypedCharacters;

        if (totalCharacters === 0) {

            accuracyValue.textContent =
                "100";

            return;

        }

        const correctCharacters =
            getCorrectCharacters();

        const accuracy =
            Math.round(
                (correctCharacters / totalCharacters) * 100
            );

        accuracyValue.textContent =
            accuracy;

    }

    /* ================================
       UPDATE CHARACTER STATS
    ================================ */

    function updateCharacterStats() {

        const totalCharacters =
            totalTypedCharacters;

        const correctCharacters =
            getCorrectCharacters();

        charStatsValue.textContent =
            correctCharacters;

        charStatsTotal.textContent =
            totalCharacters;

    }

    /* ================================
       SHOW RESULTS
    ================================ */

    function showResults() {

        const correctCharacters =
            getCorrectCharacters();

        const totalCharacters =
            totalTypedCharacters;

        /* Calculate accuracy */

        let accuracy = 100;

        if (totalCharacters > 0) {

            accuracy =
                Math.round(
                    (correctCharacters / totalCharacters) * 100
                );

        }

        /* Calculate WPM */

        const words =
            correctCharacters / 5;

        const minutes =
            testDuration / 60;

        const wpm =
            Math.round(words / minutes);

        /* Put results into popup */

        resultWpm.textContent =
            wpm;

        resultAccuracy.textContent =
            accuracy + "%";

        resultCharacters.textContent =
            correctCharacters +
            " / " +
            totalCharacters;

        /* Show popup */

        resultsModal.classList.remove("hidden");

        resultsModal.classList.add("flex");

    }

    /* ================================
       TEXT INPUT
    ================================ */

    /*
     * Process a character typed by the user.
     *
     * This is the single source of truth
     * for both desktop and mobile input.
     */
    function processCharacter(character) {

        if (testFinished) {
            return;
        }

        if (!character || character.length !== 1) {
            return;
        }

        typedText += character;

        totalTypedCharacters++;

        /*
         * Check whether the character
         * matches the current passage.
         */

        const currentIndex =
            typedText.length - 1;

        if (character === passage[currentIndex]) {

            totalCorrectCharacters++;

        }

        /*
         * Start timer on first character.
         */

        if (!started) {

            startTimer();

        }

        /*
         * Update statistics.
         */

        renderPassage();

        updateAccuracy();

        updateCharacterStats();

        updateWPM();

        /*
         * If the passage is complete,
         * load another passage while
         * keeping the timer running.
         */

        if (typedText.length === passage.length) {

            selectRandomPassage();

            typedText = "";

            renderPassage();

        }

    }

    /*
     * MOBILE / TOUCH INPUT
     *
     * The hidden textarea acts as a bridge
     * between the mobile keyboard and KeyGati.
     */

    typingInput.addEventListener("input", function (event) {

        if (!isMobileDevice) {
            return;
        }

        if (testFinished) {
            return;
        }

        const newCharacters =
            event.data;

        if (!newCharacters) {
            return;
        }

        for (const character of newCharacters) {

            processCharacter(character);

        }

        /*
         * Clear the textarea after processing.
         */

        typingInput.value = "";

    });

    /*
     * DESKTOP KEYBOARD INPUT
     *
     * On PC, listen directly for keyboard input.
     */

    document.addEventListener("keydown", function (event) {

        if (isMobileDevice) {
            return;
        }

        if (testFinished) {
            return;
        }

        /*
         * Ignore control keys.
         */

        if (
            event.ctrlKey ||
            event.altKey ||
            event.metaKey
        ) {
            return;
        }

        /*
         * Only process single-character keys.
         */

        if (event.key.length !== 1) {
            return;
        }

        event.preventDefault();

        processCharacter(event.key);

    });

    /*
     * Focus the hidden input on touch devices.
     *
     * This allows the mobile keyboard to appear
     * when the user taps the typing area.
     */

    function focusTypingInput() {

        if (!testFinished && isMobileDevice) {

            typingInput.focus();

        }

    }

    /*
     * Mobile typing area activation.
     */

    document.addEventListener("click", function (event) {

        if (!isMobileDevice) {
            return;
        }

        if (event.target.closest("button")) {
            return;
        }

        focusTypingInput();

    });

    /*
     * Initial focus for mobile devices.
     */

    focusTypingInput();

    /* ================================
       INITIAL STATE
    ================================ */

    timeValue.textContent =
        testDuration;

    wpmValue.textContent =
        "0";

    selectRandomPassage();

    renderPassage();

});
