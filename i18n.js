/* ============================================================
   Bodega Bar ATL — bilingual toggle (EN ⇄ ES)
   Hand-written Spanish. No third-party service, no monthly fee.
   Adds an EN/ES button to the nav. Remembers the choice.
   To add/edit a translation: find the English string below and
   change the Spanish on the right. To add another language later,
   duplicate the dictionary and add a third button.
   ============================================================ */
(function () {
  'use strict';

  var STORE = 'bb_lang';

  /* ---------- normalizers (so spacing/entities don't break matches) ---------- */
  function nt(s) { return (s || '').replace(/ /g, ' ').replace(/\s+/g, ' ').trim(); }
  function nh(s) {
    return (s || '')
      .replace(/ /g, ' ')
      .replace(/&nbsp;/gi, ' ')
      .replace(/&amp;/gi, '&')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
  }

  /* =================== DICTIONARIES (English : Spanish) =================== */

  /* Plain text strings (no inline markup). */
  var TEXT = {
    /* nav + footer + shared */
    "Menu": "Menú",
    "About": "Nosotros",
    "On the Wall": "En la Pared",
    "Contact": "Contacto",
    "Get on the List": "Únete a la Lista",
    "Home": "Inicio",
    "Menu ＋": "Menú ＋",
    "Close ✕": "Cerrar ✕",
    "Visit": "Visítanos",
    "Follow": "Síguenos",
    "Street outside, gallery light inside.": "Calle afuera, luz de galería adentro.",
    "OPEN LATE · SOON": "ABIERTO HASTA TARDE · PRONTO",

    /* ---------- index ---------- */
    "Coming soon — Sylvan Hills, Atlanta": "Próximamente — Sylvan Hills, Atlanta",
    "A taste of": "Un sabor de",
    "New York,": "Nueva York,",
    "corner of": "esquina de",
    "Atlanta.": "Atlanta.",
    "NYC-inspired cuisine & art, cutting-edge cocktails, and the kind of hospitality that remembers your order.": "Cocina y arte inspirados en NYC, cócteles de vanguardia y el tipo de hospitalidad que recuerda tu pedido.",
    "Peep the Menu": "Mira el Menú",
    "№ 01 — CUISINE": "№ 01 — COCINA",
    "HUNG FRESH DAILY": "COLGADO FRESCO A DIARIO",
    "HANDHELDS": "DE MANO",
    "SMALL PLATES": "PLATOS PEQUEÑOS",
    "MAINS": "PRINCIPALES",
    "Grass-fed beef, fontina chz sauce, spicy mayo, LTO, italian bread": "Carne de res de pastura, salsa de queso fontina, mayonesa picante, LTO, pan italiano",
    "Cold smoked salmon, cream cheese, red onion, tomato caper jam, fresh dill": "Salmón ahumado en frío, queso crema, cebolla roja, mermelada de tomate y alcaparras, eneldo fresco",
    "Marinated grilled chicken thigh, yellow rice, LTO, tzatziki, hot sauce": "Muslo de pollo marinado a la parrilla, arroz amarillo, LTO, tzatziki, salsa picante",
    "See the Full Menu →": "Ver el Menú Completo →",
    "№ 02 — LIBATIONS": "№ 02 — LIBACIONES",
    "Cutting-edge is not a figure of speech. Clarified milk punch with Fruity Pebble cereal milk. Taro-milk gin with yuzu and ginger tea. Apple-infused clairin under a cinnamon mezcal foam. Cocktails built like dishes, named like New York.": "Vanguardia no es una forma de hablar. Ponche de leche clarificado con leche de cereal Fruity Pebble. Ginebra de leche de taro con yuzu y té de jengibre. Clairin infusionado con manzana bajo una espuma de mezcal y canela. Cócteles construidos como platos, nombrados como Nueva York.",
    "clarified milk punch · Cazadores Reposado · Fruity Pebble cereal milk": "ponche de leche clarificado · Cazadores Reposado · leche de cereal Fruity Pebble",
    "Tulsi gin · taro milk · yuzu · ginger tea · bitters": "ginebra Tulsi · leche de taro · yuzu · té de jengibre · amargos",
    "Taconic bourbon · port · Cappalletti · orange bitters": "bourbon Taconic · oporto · Cappelletti · amargo de naranja",
    "21 Blanco · carrot · lime · grape soda": "21 Blanco · zanahoria · limón · refresco de uva",
    "№ 03 — SCENES": "№ 03 — ESCENAS",
    "TAPED UP BEHIND THE COUNTER": "PEGADO DETRÁS DEL MOSTRADOR",
    "CLICK ANY SHOT TO BLOW IT UP": "HAZ CLIC EN CUALQUIER FOTO PARA AMPLIARLA",
    "CLICK ANYWHERE OR PRESS ESC TO CLOSE": "HAZ CLIC EN CUALQUIER LUGAR O PRESIONA ESC PARA CERRAR",
    "№ 04 — ART": "№ 04 — ARTE",
    "Every few months, a local artist takes over the bar — murals, prints, photography. Atlanta has one of the strongest street-art lineages in the country, and this corner intends to hang it. Cuisine & art, intertwined — not a tagline, a rotation.": "Cada pocos meses, un artista local toma el bar — murales, grabados, fotografía. Atlanta tiene uno de los linajes de arte callejero más fuertes del país, y esta esquina pretende colgarlo. Cocina y arte, entrelazados — no un eslogan, una rotación.",
    "Call for Artists — Submit Work": "Convocatoria de Artistas — Envía tu Obra",
    "First look at the opening date, the soft-open guest list, and what the kitchen's been testing. No spam — bodega rules: we only holler when it matters.": "Primer vistazo a la fecha de apertura, la lista de invitados del soft-open y lo que la cocina ha estado probando. Nada de spam — reglas de bodega: solo avisamos cuando importa.",
    "ITEM": "ARTÍCULO",
    "QTY": "CANT",
    "SOFT-OPEN GUEST LIST": "LISTA DE INVITADOS SOFT-OPEN",
    "OPENING DATE NEWS": "NOTICIAS DE APERTURA",
    "REGRETS": "ARREPENTIMIENTOS",
    "YOUR EMAIL": "TU CORREO",
    "CELL (OPTIONAL — SMS DROPS)": "CELULAR (OPCIONAL — AVISOS SMS)",
    "PRINT MY RECEIPT →": "IMPRIME MI RECIBO →",
    "THANK YOU THANK YOU THANK YOU": "GRACIAS GRACIAS GRACIAS",
    "YOU'RE ON THE LIST · № 0000": "ESTÁS EN LA LISTA · № 0000",
    "HAVE A NICE DAY · COME BACK SOON": "QUE TENGAS BUEN DÍA · VUELVE PRONTO",

    /* ---------- about ---------- */
    "About Bodega Bar ATL": "Sobre Bodega Bar ATL",
    "№ 01 — THE STORY": "№ 01 — LA HISTORIA",
    "The kitchen reads like a New York block — Jewish deli next to Chinese-American next to Puerto Rican next to Middle Eastern. The bar pours like a lab with a sense of humor. The walls belong to the artists. And the door is open to the whole neighborhood.": "La cocina se lee como una cuadra de Nueva York — deli judío junto a chino-americano junto a puertorriqueño junto a medio-oriental. El bar sirve como un laboratorio con sentido del humor. Las paredes son de los artistas. Y la puerta está abierta a todo el barrio.",
    "№ 02 — THE CONCEPT": "№ 02 — EL CONCEPTO",
    "THREE PILLARS": "TRES PILARES",
    "PILLAR — 01": "PILAR — 01",
    "PILLAR — 02": "PILAR — 02",
    "PILLAR — 03": "PILAR — 03",
    "Cuisine & art": "Cocina y arte",
    "Cutting-edge cocktails": "Cócteles de vanguardia",
    "Exceptional hospitality": "Hospitalidad excepcional",
    "NYC-inspired plates built with intention, and walls that rotate like a gallery — local artists hung where the chips used to be.": "Platos inspirados en NYC hechos con intención, y paredes que rotan como una galería — artistas locales colgados donde antes estaban las papitas.",
    "Clarified milk punch with cereal milk. Taro-milk gin. Cocktails built like dishes and named like New York.": "Ponche de leche clarificado con leche de cereal. Ginebra de leche de taro. Cócteles construidos como platos y nombrados como Nueva York.",
    "The bodega rule: remember the order, remember the name. A neighborhood bar that acts like it.": "La regla de la bodega: recuerda el pedido, recuerda el nombre. Un bar de barrio que actúa como tal.",
    "№ 03 — THE CREW": "№ 03 — EL EQUIPO",
    "FACES OF THE CORNER": "LOS ROSTROS DE LA ESQUINA",
    "Owner + Operator": "Propietario + Operador",
    "Runs the room.": "Dirige el salón.",
    "Runs the pass.": "Dirige el pase.",
    "Runs the prep.": "Dirige la preparación.",
    "№ 04 — THE PROMISE": "№ 04 — LA PROMESA",
    "BODEGA RULES": "REGLAS DE BODEGA",
    "Cutting-edge is the cocktail program. Exceptional is the welcome. The plan is simple: know the regulars by their order, treat first-timers like regulars, and keep the lights warm.": "La vanguardia es el programa de cócteles. Lo excepcional es la bienvenida. El plan es simple: conocer a los clientes habituales por su pedido, tratar a los primerizos como habituales y mantener las luces cálidas.",
    "Get on the List →": "Únete a la Lista →",

    /* ---------- menu ---------- */
    "The full lineup — hung fresh daily": "La lista completa — colgada fresca a diario",
    "Small Plates": "Platos Pequeños",
    "Mains": "Principales",
    "Handhelds": "De Mano",
    "Sides": "Acompañantes",
    "Family Style": "Estilo Familiar",
    "Dessert": "Postre",
    "Citrusy": "Cítricos",
    "Spirit Forward": "Con Carácter",
    "Wine & Beer": "Vino y Cerveza",
    "For Sharing": "Para Compartir",
    "Dessert Cocktails": "Cócteles de Postre",
    "DINNER — № 01": "CENA — № 01",
    "DINNER — № 02": "CENA — № 02",
    "DINNER — № 03": "CENA — № 03",
    "DINNER — № 04": "CENA — № 04",
    "DINNER — № 05": "CENA — № 05",
    "DINNER — № 06": "CENA — № 06",
    "SIDES": "ACOMPAÑANTES",
    "FAMILY STYLE": "ESTILO FAMILIAR",
    "DESSERT": "POSTRE",
    "LIBATIONS — № 01": "LIBACIONES — № 01",
    "LIBATIONS — № 02": "LIBACIONES — № 02",
    "LIBATIONS — № 03": "LIBACIONES — № 03",
    "LIBATIONS — № 04": "LIBACIONES — № 04",
    "LIBATIONS — № 05": "LIBACIONES — № 05",
    "CITRUSY": "CÍTRICOS",
    "SPIRIT FORWARD": "CON CARÁCTER",
    "WINE & BEER": "VINO Y CERVEZA",
    "FOR SHARING": "PARA COMPARTIR",
    "DESSERT COCKTAILS": "CÓCTELES DE POSTRE",
    "Housemade fried chickpea balls served with tzatziki & hot sauce": "Bolas de garbanzo fritas caseras servidas con tzatziki y salsa picante",
    "Daily vegetable assortment, pita points, olives, fresh herbs": "Surtido de vegetales del día, triángulos de pita, aceitunas, hierbas frescas",
    "Marinated, smoked, and fried chicken wings served with veg & bleu chz (6)": "Alitas de pollo marinadas, ahumadas y fritas servidas con vegetales y queso azul (6)",
    "Ground beef & pork mix served with house marinara and fresh herbs": "Mezcla de res y cerdo molidos servida con marinara de la casa y hierbas frescas",
    "Marinated and fried chicken breast, spaghetti, marinara, fresh mozz, basil": "Pechuga de pollo marinada y frita, espagueti, marinara, mozzarella fresca, albahaca",
    "Local mushrooms or chicken thigh, breaded and fried, served with white rice": "Hongos locales o muslo de pollo, empanizados y fritos, servidos con arroz blanco",
    "Grass-fed flank steak, chinese broccoli, white rice, sesame, green onion": "Falda de res de pastura, brócoli chino, arroz blanco, ajonjolí, cebollín",
    "Marinated and grilled chicken thigh, yellow rice, LTO, tzatziki, hot sauce": "Muslo de pollo marinado y a la parrilla, arroz amarillo, LTO, tzatziki, salsa picante",
    "Grass-fed ground beef, fontina chz sauce, spicy mayo, LTO, italian bread": "Carne de res molida de pastura, salsa de queso fontina, mayonesa picante, LTO, pan italiano",
    "Smoked pork, white american, onions, pickles, avocado-dijonnaise, ciabatta": "Cerdo ahumado, queso americano blanco, cebollas, pepinillos, dijonesa de aguacate, ciabatta",
    "Nathan's jumbo all-beef frank, kraut, spicy relish, brown mustard, brioche": "Salchicha jumbo de res Nathan's, chucrut, relish picante, mostaza oscura, brioche",
    "Marinated, breaded and fried chicken thigh, broccoli slaw, soy-cured egg yolk": "Muslo de pollo marinado, empanizado y frito, ensalada de brócoli, yema de huevo curada en soya",
    "Organic housemade egg patty, thick-cut bacon, spicy mayo, green onion": "Tortilla de huevo orgánica casera, tocino grueso, mayonesa picante, cebollín",
    "Pastrami, swiss american, 1000 island, Jewish rye, sauerkraut": "Pastrami, queso suizo americano, aderezo mil islas, pan de centeno judío, chucrut",
    "Scallion pancakes, hoisin, green onion, sugar, crispy ½ duck. Feeds 2–3 — bring people you like.": "Panqueques de cebollín, hoisin, cebolla verde, azúcar, ½ pato crujiente. Para 2–3 — trae gente que te caiga bien.",
    "Seasonal compote": "Compota de temporada",
    "Served with milk": "Servida con leche",
    "Ilegal Joven mezcal, celery, apple, lime, lemon-lime soda": "Mezcal Ilegal Joven, apio, manzana, limón, refresco de lima-limón",
    "Don Q rum, orange/berry oleo, soy sauce, lime": "Ron Don Q, oleo de naranja/frutos rojos, salsa de soya, limón",
    "21 Blanco, carrot, lime, grape soda": "21 Blanco, zanahoria, limón, refresco de uva",
    "Murrel's Row Tulsi gin, taro milk, yuzu, ginger tea, bitters": "Ginebra Murrel's Row Tulsi, leche de taro, yuzu, té de jengibre, amargos",
    "Ketel One vodka, strawberry Snapple reduction, lemon, bubbles": "Vodka Ketel One, reducción de Snapple de fresa, limón, burbujas",
    "Taconic Straight bourbon, port wine, Cappalletti, orange bitters": "Bourbon Taconic Straight, vino oporto, Cappelletti, amargo de naranja",
    "A clarified milk punch with Cazadores Reposado and Fruity Pebble cereal milk": "Un ponche de leche clarificado con Cazadores Reposado y leche de cereal Fruity Pebble",
    "Apple-infused clairin, ginger, honey, cinnamon mezcal foam": "Clairin infusionado con manzana, jengibre, miel, espuma de mezcal y canela",
    "Rye & rum blend, plum wine cordial, sassafras bitters, sage oil": "Mezcla de rye y ron, cordial de vino de ciruela, amargo de sasafrás, aceite de salvia",
    "POIRE METHODE RURALE – SPARKLING – GERMANY": "POIRE MÉTHODE RURALE – ESPUMOSO – ALEMANIA",
    "KHIKHVI – WHITE BLEND – GEORGIA": "KHIKHVI – MEZCLA BLANCA – GEORGIA",
    "WEST SAUMER RIPAILLE – CAB FRANC – FRANCE": "WEST SAUMER RIPAILLE – CAB FRANC – FRANCIA",
    "BULLETS B4 CANNONBALL – RED – AUSTRALIA": "BULLETS B4 CANNONBALL – TINTO – AUSTRALIA",
    "LAMBRUSCO DI SORBARA TRADIZIONE – ITALY": "LAMBRUSCO DI SORBARA TRADIZIONE – ITALIA",
    "HWAJU – SAKE – NEW YORK": "HWAJU – SAKE – NUEVA YORK",
    "BLACK WIDOW – CIDER – NY": "BLACK WIDOW – SIDRA – NY",
    "SPECIAL EFFECTS – N/A IPA": "SPECIAL EFFECTS – IPA SIN ALCOHOL",
    "Rotating House Punch": "Ponche Rotativo de la Casa",
    "Ask your bartender or server for this week's punch. Serves 4–6 — the table that shares, stays.": "Pregunta a tu bartender o mesero por el ponche de esta semana. Para 4–6 — la mesa que comparte, se queda.",
    "21 Reposado, vanilla orange oleo, fresh espresso, Borghetti, lemon peel": "21 Reposado, oleo de vainilla y naranja, espresso fresco, Borghetti, cáscara de limón",
    "Ron Zacapa 23, cream, snap pea": "Ron Zacapa 23, crema, guisante",
    "Print My Receipt →": "Imprime Mi Recibo →",

    /* ---------- contact ---------- */
    "Contact — Bodega Bar ATL": "Contacto — Bodega Bar ATL",
    "№ 01 — THE PANEL": "№ 01 — EL PANEL",
    "PRESS THE RIGHT BUZZER": "PRESIONA EL TIMBRE CORRECTO",
    "NO MENUS · NO FLYERS · NO SOLICITING (UNLESS IT'S GOOD)": "SIN MENÚS · SIN VOLANTES · SIN VENTAS (A MENOS QUE SEA BUENO)",
    "ORDER TICKET": "TICKET DE PEDIDO",
    "BODEGA BAR ATL — INBOX · COPY 1 OF 1": "BODEGA BAR ATL — BANDEJA · COPIA 1 DE 1",
    "FRONT OF HOUSE": "RECEPCIÓN",
    "PRESS": "PRENSA",
    "PRIVATE EVENTS": "EVENTOS PRIVADOS",
    "ON THE WALL — ARTIST": "EN LA PARED — ARTISTA",
    "VENDORS": "PROVEEDORES",
    "UNIT 1A": "UNIDAD 1A",
    "UNIT 2B": "UNIDAD 2B",
    "UNIT 3C": "UNIDAD 3C",
    "UNIT 4D": "UNIDAD 4D",
    "UNIT 5E": "UNIDAD 5E",
    "Name": "Nombre",
    "Email": "Correo",
    "The message": "El mensaje",
    "SEND IT UP →": "ENVÍALO →",
    "TICKETS ANSWERED IN ORDER · USUALLY FAST": "TICKETS RESPONDIDOS EN ORDEN · USUALMENTE RÁPIDO",
    "Outlet / publication": "Medio / publicación",
    "Date you're eyeing": "Fecha que tienes en mente",
    "Headcount": "Número de personas",
    "Portfolio / IG link": "Portafolio / enlace de IG",
    "Company": "Empresa",
    "№ 02 — THE CORNER": "№ 02 — LA ESQUINA",
    "BODEGA BAR — RIGHT HERE": "BODEGA BAR — AQUÍ MISMO",
    "Pull up.": "Acércate.",
    "Address": "Dirección",
    "Hood": "Barrio",
    "Phone": "Teléfono",
    "Hours": "Horario",
    "Sylvan Hills — SW Atlanta": "Sylvan Hills — SO de Atlanta",
    "Opening 2026 — watch the gate.": "Apertura 2026 — atento a la reja.",
    "GET DIRECTIONS →": "CÓMO LLEGAR →",
    "TELL YOUR DRIVER: THE CORNER WITH THE GATE": "DILE A TU CONDUCTOR: LA ESQUINA CON LA REJA"
  };

  /* Rich blocks: element innerHTML (decoded, single-spaced) : Spanish innerHTML.
     Used where emphasis/markup needs whole-element control. */
  var BLOCK = {
    /* index */
    "Now showing: <em>the kitchen.</em>": "En exhibición: <em>la cocina.</em>",
    "After dark, <em>the bar glows.</em>": "Al caer la noche, <em>el bar brilla.</em>",
    "Scenes from <em>the corner.</em>": "Escenas de <em>la esquina.</em>",
    "The concept of Bodega Bar intertwines <em>NYC-inspired cuisine & art</em>, <em>cutting-edge cocktails</em>, and <em>exceptional hospitality</em> — translated to Atlanta with intention.": "El concepto de Bodega Bar entrelaza <em>cocina y arte inspirados en NYC</em>, <em>cócteles de vanguardia</em> y <em>hospitalidad excepcional</em> — traducido a Atlanta con intención.",
    "<b>NYC</b> LEADS": "<b>NYC</b> LIDERA",
    "<b>ATL</b> GROUNDS IT": "<b>ATL</b> LO ATERRIZA",
    "<b>SYLVAN HILLS</b> HOSTS IT": "<b>SYLVAN HILLS</b> LO RECIBE",
    "<b>ON THE WALL — № 001</b> Now booking the first show.<br>Rotating works by Atlanta artists,<br>hung where the chips used to be.": "<b>EN LA PARED — № 001</b> Reservando la primera exposición.<br>Obras rotativas de artistas de Atlanta,<br>colgadas donde antes estaban las papitas.",
    "The walls are <em>part of the menu.</em>": "Las paredes son <em>parte del menú.</em>",
    "The gate goes up <em>soon.</em>": "La reja sube <em>pronto.</em>",
    "1085 KATHERWOOD DR SW · ATLANTA GA<br>★ CUSTOMER COPY ★": "1085 KATHERWOOD DR SW · ATLANTA GA<br>★ COPIA DEL CLIENTE ★",

    /* about */
    "Two cities, <em>one corner.</em>": "Dos ciudades, <em>una esquina.</em>",
    "A bodega walks <em>into a bar.</em>": "Una bodega entra <em>a un bar.</em>",
    "The concept of Bodega Bar intertwines <em>NYC-inspired cuisine & art</em>, <em>cutting-edge cocktails</em>, and <em>exceptional hospitality.</em>": "El concepto de Bodega Bar entrelaza <em>cocina y arte inspirados en NYC</em>, <em>cócteles de vanguardia</em> y <em>hospitalidad excepcional.</em>",
    "In New York, the bodega is the neighborhood's living room — open late, lit warm, everybody welcome. The chopped cheese, the bacon egg & chz, the cat on the counter. It's not a store. It's <strong>hospitality infrastructure.</strong>": "En Nueva York, la bodega es la sala del barrio — abierta hasta tarde, de luz cálida, todos bienvenidos. El chopped cheese, el bacon egg &amp; chz, el gato en el mostrador. No es una tienda. Es <strong>infraestructura de hospitalidad.</strong>",
    "Atlanta speaks corner-store too — it just has its own accent. The wing spot, the plate from next door, porch hospitality. Bodega Bar is where those two corner cultures recognize each other: <strong>New York leads, Atlanta grounds it, Sylvan Hills hosts it.</strong>": "Atlanta también habla el idioma de la tienda de la esquina — solo que con su propio acento. El local de alitas, el plato de al lado, la hospitalidad del porche. Bodega Bar es donde esas dos culturas de esquina se reconocen: <strong>Nueva York lidera, Atlanta lo aterriza, Sylvan Hills lo recibe.</strong>",
    "What we're <em>made of.</em>": "De qué <em>estamos&nbsp;hechos.</em>",
    "The faces behind <em>the counter.</em>": "Los rostros detrás <em>del mostrador.</em>",
    "Hospitality is <em>the house style.</em>": "La hospitalidad es <em>el estilo de la casa.</em>",
    "<b>RULE 01</b><span>Everybody eats. The menu runs from a $6 hot dog to a duck for the table — both get the same care.</span>": "<b>REGLA 01</b><span>Todos comen. El menú va desde un hot dog de $6 hasta un pato para la mesa — ambos reciben el mismo cuidado.</span>",
    "<b>RULE 02</b><span>The corner remembers. Your order, your name, your usual seat.</span>": "<b>REGLA 02</b><span>La esquina recuerda. Tu pedido, tu nombre, tu asiento de siempre.</span>",
    "<b>RULE 03</b><span>Neighborhood first. Sylvan Hills isn't the location — it's the host.</span>": "<b>REGLA 03</b><span>El barrio primero. Sylvan Hills no es la ubicación — es el anfitrión.</span>",
    "Pull up a stool <em>early.</em>": "Agarra un banco <em>temprano.</em>",

    /* menu */
    "The <em>menu.</em>": "El <em>menú.</em>",
    "Small <em>plates.</em>": "Platos <em>pequeños.</em>",
    "The <em>mains.</em>": "Los <em>principales.</em>",
    "Hand<em>helds.</em>": "De <em>mano.</em>",
    "On the <em>side.</em>": "Al <em>lado.</em>",
    "For the <em>table.</em>": "Para la <em>mesa.</em>",
    "Sweet <em>finish.</em>": "Final <em>dulce.</em>",
    "Bright & <em>citrusy.</em>": "Brillante y <em>cítrico.</em>",
    "Spirit <em>forward.</em>": "Con <em>carácter.</em>",
    "The <em>cellar & the cooler.</em>": "La <em>cava y la nevera.</em>",
    "One more, <em>for the road.</em>": "Uno más, <em>para el camino.</em>",
    "HAND CUT FRIES<b>5</b>": "PAPAS CORTADAS A MANO<b>5</b>",
    "TOSTONES<b>4</b>": "TOSTONES<b>4</b>",
    "ROTATING WOK VEG<b>7</b>": "VEGETALES AL WOK ROTATIVOS<b>7</b>",
    "GREEK SALAD<b>5 / 12</b>": "ENSALADA GRIEGA<b>5 / 12</b>",
    "BROCCOLI SLAW<b>4</b>": "ENSALADA DE BRÓCOLI<b>4</b>",
    "The sun goes down.<br><em>The neon comes on.</em>": "El sol se pone.<br><em>El neón se&nbsp;enciende.</em>",
    "Taste it first — <em>get on the list.</em>": "Pruébalo primero — <em>únete a la lista.</em>",

    /* contact */
    "Ring <em>the bell.</em>": "Toca <em>el timbre.</em>",
    "Who you <em>buzzing?</em>": "¿A quién <em>llamas?</em>",
    "<b>BODEGA BAR ATL</b>1085 KATHERWOOD DR SW · WALK-UP": "<b>BODEGA BAR ATL</b>1085 KATHERWOOD DR SW · ENTRADA A PIE",
    "Front of House<small>General questions, say hi</small>": "Recepción<small>Preguntas generales, saluda</small>",
    "Press<small>Media, interviews, photography</small>": "Prensa<small>Medios, entrevistas, fotografía</small>",
    "Private Events<small>Buyouts, parties, the back room</small>": "Eventos Privados<small>Alquiler total, fiestas, el cuarto trasero</small>",
    "Artists<small>On the Wall submissions</small>": "Artistas<small>Propuestas para En la Pared</small>",
    "Vendors<small>Reps & purveyors — ring once, be nice</small>": "Proveedores<small>Representantes y proveedores — toca una vez, sé amable</small>",
    "☝ RING A BELL TO START A TICKET<br> WE ANSWER EVERY BUZZ": "☝ TOCA UN TIMBRE PARA INICIAR UN TICKET<br> RESPONDEMOS CADA LLAMADA",
    "RECEIVED ✔<br>WE'LL HOLLER BACK": "RECIBIDO ✔<br>TE RESPONDEMOS",
    "Come see <em>about us.</em>": "Ven a ver <em>de qué se trata.</em>",
    "Don't wanna wait by the door? <em>Get on the list.</em>": "¿No quieres esperar en la puerta? <em>Únete a la lista.</em>"
  };

  /* Translatable attribute values (placeholders, aria-labels). */
  var ATTR = {
    "Open menu": "Abrir menú",
    "Who's buzzing?": "¿Quién llama?",
    "Talk to us…": "Cuéntanos…",
    "How many mouths?": "¿Cuántas bocas?",
    "@yourhandle or URL": "@tuusuario o URL",
    "Who you with?": "¿Con quién estás?"
  };

  /* Hero headings: fx.js splits every <header h1> into per-letter spans on
     desktop, which defeats normal matching. These are matched by the heading's
     text content (works whether or not it's been split) and the whole innerHTML
     is rebuilt in Spanish, preserving each page's structure. */
  var HERO = {
    "A taste of New York, corner of Atlanta.":
      '<span class="line"><span>Un sabor de</span></span>' +
      '<span class="line"><span><em>Nueva York,</em></span></span>' +
      '<span class="line"><span>esquina de</span></span>' +
      '<span class="line"><span><em>Atlanta.</em></span></span>',
    "Two cities, one corner.": 'Dos ciudades, <em>una esquina.</em>',
    "The menu.": 'El <em>menú.</em>',
    "Ring the bell.": 'Toca <em>el timbre.</em>'
  };

  /* ---------- build fast lookup maps ---------- */
  var textMap = {}, blockMap = {}, attrMap = {}, heroMap = {};
  Object.keys(TEXT).forEach(function (k) { textMap[nt(k)] = TEXT[k]; });
  Object.keys(BLOCK).forEach(function (k) { blockMap[nh(k)] = BLOCK[k]; });
  Object.keys(ATTR).forEach(function (k) { attrMap[nt(k)] = ATTR[k]; });
  Object.keys(HERO).forEach(function (k) { heroMap[nt(k)] = HERO[k]; });

  /* ---------- state ---------- */
  var lang = 'en';
  var observer = null;
  var toggles = [];
  var blockOrig = new WeakMap();
  var textOrig = new WeakMap();
  var blockReg = [], textReg = [], attrReg = [];
  var TR_ATTRS = ['placeholder', 'aria-label'];

  function isSkippable(el) {
    while (el) {
      if (el.nodeType === 1) {
        var t = el.tagName;
        if (t === 'SCRIPT' || t === 'STYLE' || t === 'NOSCRIPT') return true;
        if (el.classList && el.classList.contains('bb-lang')) return true;
        if (el.__bbBlock) return true;
      }
      el = el.parentNode;
    }
    return false;
  }
  function hasDoneAncestor(el) {
    for (var p = el.parentNode; p; p = p.parentNode) { if (p.__bbBlock) return true; }
    return false;
  }

  function translateHero() {
    var h1 = document.querySelector('header h1');
    if (!h1 || h1.__bbBlock) return;
    var es = heroMap[nt(h1.textContent)];
    if (es !== undefined) {
      blockOrig.set(h1, h1.innerHTML);
      h1.__bbBlock = true;
      h1.innerHTML = es;
      blockReg.push(h1);
    }
  }

  function translateBlocks() {
    var els = document.body.querySelectorAll('*');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (!el.isConnected || el.__bbBlock || !el.firstChild) continue;
      var tag = el.tagName;
      if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') continue;
      if (el.classList && el.classList.contains('bb-lang')) continue;
      if (hasDoneAncestor(el)) continue;
      var es = blockMap[nh(el.innerHTML)];
      if (es !== undefined) {
        blockOrig.set(el, el.innerHTML);
        el.__bbBlock = true;
        el.innerHTML = es;
        blockReg.push(el);
      }
    }
  }

  function translateText() {
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    var nodes = [], n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(function (node) {
      if (textOrig.has(node) || !node.parentNode) return;
      var key = nt(node.nodeValue);
      if (!key) return;
      if (isSkippable(node.parentNode)) return;
      var es = textMap[key];
      if (es !== undefined) {
        var m = node.nodeValue.match(/^(\s*)[\s\S]*?(\s*)$/);
        textOrig.set(node, node.nodeValue);
        node.nodeValue = (m ? m[1] : '') + es + (m ? m[2] : '');
        textReg.push(node);
      }
    });
  }

  function translateAttrs() {
    TR_ATTRS.forEach(function (a) {
      var els = document.body.querySelectorAll('[' + a + ']');
      for (var i = 0; i < els.length; i++) {
        var el = els[i];
        if (el.classList && el.classList.contains('bb-lang')) continue;
        var es = attrMap[nt(el.getAttribute(a))];
        if (es === undefined) continue;
        if (!el.__bbAttr) el.__bbAttr = {};
        if (el.__bbAttr[a] !== undefined) continue;
        el.__bbAttr[a] = el.getAttribute(a);
        el.setAttribute(a, es);
        attrReg.push({ el: el, a: a });
      }
    });
  }

  function restoreEN() {
    blockReg.forEach(function (el) {
      if (blockOrig.has(el)) el.innerHTML = blockOrig.get(el);
      el.__bbBlock = false; blockOrig.delete(el);
    });
    blockReg = [];
    textReg.forEach(function (node) {
      if (textOrig.has(node)) node.nodeValue = textOrig.get(node);
      textOrig.delete(node);
    });
    textReg = [];
    attrReg.forEach(function (o) {
      if (o.el.__bbAttr && o.el.__bbAttr[o.a] !== undefined) {
        o.el.setAttribute(o.a, o.el.__bbAttr[o.a]);
        delete o.el.__bbAttr[o.a];
      }
    });
    attrReg = [];
  }

  function render() {
    toggles.forEach(function (b) {
      b.textContent = (lang === 'es') ? 'EN' : 'ES';
      b.setAttribute('aria-label', lang === 'es' ? 'Switch to English' : 'Cambiar a español');
      b.setAttribute('aria-pressed', lang === 'es' ? 'true' : 'false');
    });
  }

  function apply(l) {
    if (observer) observer.disconnect();
    if (l === 'es') { translateHero(); translateBlocks(); translateText(); translateAttrs(); }
    else { restoreEN(); }
    lang = l;
    document.documentElement.lang = l;
    render();
    if (observer) observer.observe(document.body, { childList: true, subtree: true });
  }

  /* ---------- toggle button ---------- */
  function makeBtn(extra) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'bb-lang' + (extra ? ' ' + extra : '');
    b.addEventListener('click', function () {
      var nl = (lang === 'es') ? 'en' : 'es';
      try { localStorage.setItem(STORE, nl); } catch (e) {}
      apply(nl);
    });
    toggles.push(b);
    return b;
  }

  function injectUI() {
    var navLinks = document.querySelector('nav .nav-links');
    if (navLinks) {
      var li = document.createElement('li');
      li.className = 'bb-lang-li';
      li.appendChild(makeBtn());
      navLinks.appendChild(li);
    }
    var mob = document.getElementById('mobileNav');
    if (mob) mob.appendChild(makeBtn('bb-lang-mobile'));

    /* always-visible toggle in the top bar for mobile (sits next to the hamburger,
       so it's reachable without opening the menu) */
    var navEl = document.querySelector('nav');
    var ham = document.getElementById('hamburger');
    if (navEl && ham) navEl.insertBefore(makeBtn('bb-lang-bar'), ham);

    var css =
      /* lift the whole nav (and our toggle) above the full-screen grain overlay (z-index:9999) */
      '#nav{z-index:10000 !important}' +
      '.bb-lang{font:700 12px/1 "IBM Plex Mono",ui-monospace,monospace;letter-spacing:.12em;' +
      'color:#1A1A1A;background:#FFB73D;border:1.6px solid #1A1A1A;border-radius:999px;' +
      'padding:7px 13px;cursor:pointer;text-transform:uppercase;position:relative;z-index:10001;' +
      'box-shadow:2px 2px 0 #1A1A1A;transition:transform .15s ease,box-shadow .15s ease,background .2s ease}' +
      '.bb-lang:hover{background:#F58524;transform:translate(-1px,-1px);box-shadow:3px 3px 0 #1A1A1A}' +
      '.bb-lang:active{transform:translate(1px,1px);box-shadow:1px 1px 0 #1A1A1A}' +
      '.nav-links .bb-lang-li{display:flex;align-items:center;margin-left:4px}' +
      '.bb-lang-mobile{margin-top:30px;align-self:center;font-size:16px;padding:11px 24px;box-shadow:3px 3px 0 #1A1A1A}' +
      /* the top-bar toggle is mobile-only; desktop uses the nav-links one */
      '.bb-lang-bar{display:none}' +
      '@media(max-width:640px){.bb-lang-bar{display:inline-flex;margin-left:auto;margin-right:14px;font-size:13px;padding:8px 14px}}';
    var st = document.createElement('style');
    st.appendChild(document.createTextNode(css));
    document.head.appendChild(st);
  }

  function init() {
    injectUI();
    observer = new MutationObserver(function () {
      if (lang !== 'es') return;
      observer.disconnect();
      translateHero(); translateBlocks(); translateText(); translateAttrs();
      observer.observe(document.body, { childList: true, subtree: true });
    });
    var saved = null;
    try { saved = localStorage.getItem(STORE); } catch (e) {}
    var start = saved || (((navigator.language || '').toLowerCase().indexOf('es') === 0) ? 'es' : 'en');
    apply(start === 'es' ? 'es' : 'en');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
