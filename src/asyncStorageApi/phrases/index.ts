import AsyncStorage from '@react-native-async-storage/async-storage';
import {Language} from '../language';
import {Topic} from '../topic';

const PHRASES = 'PHRASES';

export type Phrase = string;

export type Phrases =
  | 'Hello'
  | 'Goodbye'
  | 'Yes'
  | 'No'
  | 'Thank you'
  | 'Please'
  | 'Sorry'
  | 'Excuse me'
  | 'I love you'
  | 'I hate you'
  | 'I am hungry';

export const PHRASES_BY_TOPIC: Record<Language, Record<Topic, Phrase[]>> = {
  English: {
    General: [
      'Hello', 'Goodbye', 'How are you?', 'Thank you', 'Please',
      'Sorry', 'Yes', 'No', 'Good morning', 'Good night'
    ],
    Technology: [
      'Please turn on the computer', 'I need to charge my phone', 'How does this gadget work?', 'My screen is broken',
      'Do you have a USB cable?', 'My battery is low', 'Can you reboot the server?', 'We need to update the software',
      'The system is down', 'I forgot my password'
    ],
    Science: [
      'What is the formula?', 'This is a microscope', 'Science explains the universe', 'We study the cells',
      'Genetics is the future', 'What does this chemical do?', 'We need more data', 'This is a scientific method',
      'Who discovered this?', 'What are the implications?'
    ],
    Business: [
      'We need to improve sales', 'Our profits are down', 'We should invest in marketing', 'This is our business plan',
      'Our company is growing', 'We have a meeting today', 'What is the market trend?', 'Who are our competitors?',
      'We need a new strategy', 'How do we increase revenue?'
    ],
    Health: [
      'I am sick', 'I need a doctor', 'I have a headache', 'I have a fever',
      'I am tired', 'I need to rest', 'I need medicine', 'I need a prescription',
      'I need to go to the hospital', 'I need to see a specialist'
    ],
    Sports: [
      'I like sports', 'I play football', 'I watch basketball', 'I run every day',
      'I swim in the pool', 'I ride a bike', 'I go to the gym', 'I do yoga',
      'I play tennis', 'I watch the Olympics'
    ],
    Entertainment: [
      'I like movies', 'I watch TV shows', 'I listen to music', 'I read books',
      'I play video games', 'I go to the theater', 'I watch concerts', 'I go to museums',
      'I like art', 'I like to dance'
    ],
    Education: [
      'I go to school', 'I study math', 'I learn history', 'I speak English',
      'I write essays', 'I read books', 'I take exams', 'I do homework',
      'I have a teacher', 'I have classmates'
    ],
    Travel: [
      'I like to travel', 'I go on vacation', 'I visit new places', 'I take photos',
      'I meet new people', 'I try new food', 'I learn about cultures', 'I see landmarks',
      'I go on adventures', 'I explore the world'
    ],
    Food: [
      'I like to eat', 'I cook at home', 'I go to restaurants', 'I try new recipes',
      'I eat healthy food', 'I drink coffee', 'I eat dessert', 'I have breakfast',
      'I have lunch', 'I have dinner'
    ],
  },
  Spanish: {
    General: [
      'Hola', 'Adiós', '¿Cómo estás?', 'Gracias', 'Por favor',
      'Perdón', 'Sí', 'No', 'Buenos días', 'Buenas noches'
    ],
    Technology: [
      'Por favor, enciende el ordenador', 'Necesito cargar mi teléfono', '¿Cómo funciona este gadget?', 'Mi pantalla está rota',
      '¿Tienes un cable USB?', 'Mi batería está baja', '¿Puedes reiniciar el servidor?', 'Necesitamos actualizar el software',
      'El sistema está caído', 'Olvidé mi contraseña'
    ],
    Science: [
      '¿Cuál es la fórmula?', 'Esto es un microscopio', 'La ciencia explica el universo', 'Estudiamos las células',
      'La genética es el futuro', '¿Qué hace este químico?', 'Necesitamos más datos', 'Este es un método científico',
      '¿Quién descubrió esto?', '¿Cuáles son las implicaciones?'
    ],
    Business: [
      'Necesitamos mejorar las ventas', 'Nuestros beneficios están bajando', 'Deberíamos invertir en marketing', 'Este es nuestro plan de negocios',
      'Nuestra empresa está creciendo', 'Tenemos una reunión hoy', '¿Cuál es la tendencia del mercado?', '¿Quiénes son nuestros competidores?',
      'Necesitamos una nueva estrategia', '¿Cómo aumentamos los ingresos?'
    ],
    Health: [
      'Estoy enfermo', 'Necesito un médico', 'Tengo dolor de cabeza', 'Tengo fiebre',
      'Estoy cansado', 'Necesito descansar', 'Necesito medicina', 'Necesito una receta',
      'Necesito ir al hospital', 'Necesito ver a un especialista'
    ],
    Sports: [
      'Me gustan los deportes', 'Juego al fútbol', 'Veo baloncesto', 'Corro todos los días',
      'Nado en la piscina', 'Monto en bicicleta', 'Voy al gimnasio', 'Hago yoga',
      'Juego al tenis', 'Veo los Juegos Olímpicos'
    ],
    Entertainment: [
      'Me gustan las películas', 'Veo series de televisión', 'Escucho música', 'Leo libros',
      'Juego videojuegos', 'Voy al teatro', 'Veo conciertos', 'Voy a museos',
      'Me gusta el arte', 'Me gusta bailar'
    ],
    Education: [
      'Voy a la escuela', 'Estudio matemáticas', 'Aprendo historia', 'Hablo inglés',
      'Escribo ensayos', 'Leo libros', 'Hago exámenes', 'Hago la tarea',
      'Tengo un profesor', 'Tengo compañeros de clase'
    ],
    Travel: [
      'Me gusta viajar', 'Voy de vacaciones', 'Visito lugares nuevos', 'Hago fotos',
      'Conozco gente nueva', 'Pruebo comida nueva', 'Aprendo sobre culturas', 'Veo monumentos',
      'Vivo aventuras', 'Exploro el mundo'
    ],
    Food: [
      'Me gusta comer', 'Cocino en casa', 'Voy a restaurantes', 'Pruebo recetas nuevas',
      'Como comida saludable', 'Bebo café', 'Como postre', 'Desayuno',
      'Almuerzo', 'Ceno'
    ],
  },
  French: {
    General: [
      'Bonjour', 'Au revoir', 'Comment ça va?', 'Merci', 'S\'il vous plaît',
      'Pardon', 'Oui', 'Non', 'Bonjour', 'Bonne nuit'
    ],
    Technology: [
      'Veuillez allumer l\'ordinateur', 'J\'ai besoin de charger mon téléphone', 'Comment fonctionne ce gadget?', 'Mon écran est cassé',
      'Avez-vous un câble USB?', 'Ma batterie est faible', 'Pouvez-vous redémarrer le serveur?', 'Nous devons mettre à jour le logiciel',
      'Le système est en panne', 'J\'ai oublié mon mot de passe'
    ],
    Science: [
      'Quelle est la formule?', 'Ceci est un microscope', 'La science explique l\'univers', 'Nous étudions les cellules',
      'La génétique est l\'avenir', 'Que fait ce produit chimique?', 'Nous avons besoin de plus de données', 'Ceci est une méthode scientifique',
      'Qui a découvert cela?', 'Quelles sont les implications?'
    ],
    Business: [
      'Nous devons améliorer les ventes', 'Nos bénéfices sont en baisse', 'Nous devrions investir dans le marketing', 'Voici notre plan d\'affaires',
      'Notre entreprise est en croissance', 'Nous avons une réunion aujourd\'hui', 'Quelle est la tendance du marché?', 'Qui sont nos concurrents?',
      'Nous avons besoin d\'une nouvelle stratégie', 'Comment augmentons-nous les revenus?'
    ],
    Health: [
      'Je suis malade', 'J\'ai besoin d\'un médecin', 'J\'ai mal à la tête', 'J\'ai de la fièvre',
      'Je suis fatigué', 'J\'ai besoin de me reposer', 'J\'ai besoin de médicaments', 'J\'ai besoin d\'une ordonnance',
      'Je dois aller à l\'hôpital', 'Je dois voir un spécialiste'
    ],
    Sports: [
      'J\'aime le sport', 'Je joue au football', 'Je regarde le basket',
      'Je cours tous les jours', 'Je nage dans la piscine', 'Je fais du vélo',
      'Je vais à la salle de sport', 'Je fais du yoga', 'Je joue au tennis',
      'Je regarde les Jeux olympiques'
    ],
    Entertainment: [
      'J\'aime les films', 'Je regarde des séries télévisées', 'J\'écoute de la musique', 'Je lis des livres',
      'Je joue à des jeux vidéo', 'Je vais au théâtre', 'Je regarde des concerts', 'Je vais au musée',
      'J\'aime l\'art', 'J\'aime danser'
    ],
    Education: [
      'Je vais à l\'école', 'J\'étudie les mathématiques', 'J\'apprends l\'histoire', 'Je parle anglais',
      'J\'écris des essais', 'Je lis des livres', 'Je passe des examens', 'Je fais mes devoirs',
      'J\'ai un professeur', 'J\'ai des camarades de classe'
    ],
    Travel: [
      'J\'aime voyager', 'Je pars en vacances', 'Je visite de nouveaux endroits', 'Je prends des photos',
      'Je rencontre de nouvelles personnes', 'J\'essaie de nouvelles recettes', 'J\'apprends sur les cultures', 'Je vois des monuments',
      'Je vis des aventures', 'J\'explore le monde'
    ],
    Food: [
      'J\'aime manger', 'Je cuisine à la maison', 'Je vais au restaurant', 'J\'essaie de nouvelles recettes',
      'Je mange sainement', 'Je bois du café', 'Je mange du dessert', 'Je prends le petit déjeuner',
      'Je déjeune', 'Je dîne'
    ],
  },
  German: {
    General: [
      'Hallo', 'Auf Wiedersehen', 'Wie geht es dir?', 'Danke', 'Bitte',
      'Entschuldigung', 'Ja', 'Nein', 'Guten Morgen', 'Gute Nacht'
    ],
    Technology: [
      'Bitte schalten Sie den Computer ein', 'Ich muss mein Telefon aufladen', 'Wie funktioniert dieses Gadget?', 'Mein Bildschirm ist kaputt',
      'Haben Sie ein USB-Kabel?', 'Mein Akku ist leer', 'Können Sie den Server neu starten?', 'Wir müssen die Software aktualisieren',
      'Das System ist ausgefallen', 'Ich habe mein Passwort vergessen'
    ],
    Science: [
      'Was ist die Formel?', 'Dies ist ein Mikroskop', 'Die Wissenschaft erklärt das Universum', 'Wir studieren die Zellen',
      'Genetik ist die Zukunft', 'Was macht dieses Chemikalie?', 'Wir brauchen mehr Daten', 'Dies ist eine wissenschaftliche Methode',
      'Wer hat das entdeckt?', 'Was sind die Auswirkungen?'
    ],
    Business: [
      'Wir müssen die Verkäufe steigern', 'Unsere Gewinne gehen zurück', 'Wir sollten in Marketing investieren', 'Das ist unser Geschäftsplan',
      'Unser Unternehmen wächst', 'Wir haben heute ein Meeting', 'Was ist der Markttrend?', 'Wer sind unsere Konkurrenten?',
      'Wir brauchen eine neue Strategie', 'Wie steigern wir den Umsatz?'
    ],
    Health: [
      'Ich bin krank', 'Ich brauche einen Arzt', 'Ich habe Kopfschmerzen', 'Ich habe Fieber',
      'Ich bin müde', 'Ich muss mich ausruhen', 'Ich brauche Medizin', 'Ich brauche ein Rezept',
      'Ich muss ins Krankenhaus', 'Ich muss einen Spezialisten sehen'
    ],
    Sports: [
      'Ich mag Sport', 'Ich spiele Fußball', 'Ich schaue Basketball', 'Ich laufe jeden Tag',
      'Ich schwimme im Pool', 'Ich fahre Fahrrad', 'Ich gehe ins Fitnessstudio', 'Ich mache Yoga',
      'Ich spiele Tennis', 'Ich schaue die Olympischen Spiele',
    ],
    Entertainment: [
      'Ich mag Filme', 'Ich schaue Fernsehsendungen', 'Ich höre Musik', 'Ich lese Bücher',
      'Ich spiele Videospiele', 'Ich gehe ins Theater', 'Ich schaue Konzerte', 'Ich gehe ins Museum',
      'Ich mag Kunst', 'Ich tanze gerne'
    ],
    Education: [
      'Ich gehe zur Schule', 'Ich lerne Mathematik', 'Ich lerne Geschichte', 'Ich spreche Englisch',
      'Ich schreibe Aufsätze', 'Ich lese Bücher', 'Ich mache Prüfungen', 'Ich mache Hausaufgaben',
      'Ich habe einen Lehrer', 'Ich habe Klassenkameraden'
    ],
    Travel: [
      'Ich reise gerne', 'Ich mache Urlaub', 'Ich besuche neue Orte', 'Ich mache Fotos',
      'Ich treffe neue Leute', 'Ich probiere neues Essen', 'Ich lerne über Kulturen', 'Ich sehe Sehenswürdigkeiten',
      'Ich gehe auf Abenteuer', 'Ich erkunde die Welt'
    ],
    Food: [
      'Ich esse gerne', 'Ich koche zu Hause', 'Ich gehe ins Restaurant', 'Ich probiere neue Rezepte',
      'Ich esse gesundes Essen', 'Ich trinke Kaffee', 'Ich esse Dessert', 'Ich frühstücke',
      'Ich esse zu Mittag', 'Ich esse zu Abend'
    ],
  },
  Italian: {
    General: [
      'Ciao', 'Arrivederci', 'Come stai?', 'Grazie', 'Per favore',
      'Scusa', 'Sì', 'No', 'Buongiorno', 'Buonanotte',
    ],
    Technology: [
      'Per favore accendi il computer', 'Devo caricare il mio telefono', 'Come funziona questo gadget?', 'Il mio schermo è rotto',
      'Hai un cavo USB?', 'La mia batteria è scarica', 'Puoi riavviare il server?', 'Dobbiamo aggiornare il software',
      'Il sistema è inattivo', 'Ho dimenticato la mia password',
    ],
    Science: [
      'Qual è la formula?', 'Questo è un microscopio', 'La scienza spiega l\'universo', 'Studiamo le cellule',
      'La genetica è il futuro', 'Cosa fa questo prodotto chimico?', 'Abbiamo bisogno di più dati', 'Questa è un metodo scientifico',
      'Chi ha scoperto questo?', 'Quali sono le implicazioni?',
    ],
    Business: [
      'Dobbiamo migliorare le vendite', 'I nostri profitti sono in calo', 'Dovremmo investire nel marketing', 'Questo è il nostro piano aziendale',
      'La nostra azienda sta crescendo', 'Abbiamo una riunione oggi', 'Qual è la tendenza del mercato?', 'Chi sono i nostri concorrenti?',
      'Abbiamo bisogno di una nuova strategia', 'Come aumentiamo i ricavi?',
    ],
    Health: [
      'Sono malato', 'Ho bisogno di un medico', 'Ho mal di testa', 'Ho la febbre',
      'Sono stanco', 'Ho bisogno di riposare', 'Ho bisogno di medicine', 'Ho bisogno di una prescrizione',
      'Devo andare in ospedale', 'Devo vedere uno specialista',
    ],
    Sports: [
      'Mi piace lo sport', 'Gioco a calcio', 'Guardo il basket', 'Corro tutti i giorni',
      'Nuoto in piscina', 'Vado in bicicletta', 'Vado in palestra', 'Faccio yoga',
      'Gioco a tennis', 'Guardo le Olimpiadi',
    ],
    Entertainment: [
      'Mi piacciono i film', 'Guardo serie TV', 'Ascolto musica', 'Leggo libri',
      'Gioco ai videogiochi', 'Vado a teatro', 'Guardo concerti', 'Vado ai musei',
      'Mi piace l\'arte', 'Mi piace ballare',
    ],
    Education: [
      'Vado a scuola', 'Studio matematica', 'Sto imparando la storia', 'Parlo inglese',
      'Scrivo saggi', 'Leggo libri', 'Faccio esami', 'Faccio i compiti',
      'Ho un insegnante', 'Ho compagni di classe',
    ],
    Travel: [
      'Mi piace viaggiare', 'Vado in vacanza', 'Visito posti nuovi', 'Faccio foto',
      'Incontro nuove persone', 'Provo cibo nuovo', 'Imparo sulle culture', 'Vedo monumenti',
      'Vivo avventure', 'Esploro il mondo',
    ],
    Food: [
      'Mi piace mangiare', 'Cucino a casa', 'Vado al ristorante', 'Provo nuove ricette',
      'Mangio cibo sano', 'Bevo caffè', 'Mangio dolci', 'Faccio colazione',
      'Faccio pranzo', 'Faccio cena',
    ],
  },
  Portuguese: {
    General: [
      'Olá', 'Adeus', 'Como você está?', 'Obrigado', 'Por favor',
      'Desculpe', 'Sim', 'Não', 'Bom dia', 'Boa noite',
    ],
    Technology: [
      'Por favor, ligue o computador', 'Preciso carregar meu telefone', 'Como funciona esse gadget?', 'Minha tela está quebrada',
      'Você tem um cabo USB?', 'Minha bateria está fraca', 'Você pode reiniciar o servidor?', 'Precisamos atualizar o software',
      'O sistema está fora do ar', 'Esqueci minha senha',
    ],
    Science: [
      'Qual é a fórmula?', 'Isso é um microscópio', 'A ciência explica o universo', 'Estudamos as células',
      'A genética é o futuro', 'O que esse produto químico faz?', 'Precisamos de mais dados', 'Este é um método científico',
      'Quem descobriu isso?', 'Quais são as implicações?',
    ],
    Business: [
      'Precisamos melhorar as vendas', 'Nossos lucros estão em baixa', 'Devemos investir em marketing', 'Este é o nosso plano de negócios',
      'Nossa empresa está crescendo', 'Temos uma reunião hoje', 'Qual é a tendência do mercado?', 'Quem são nossos concorrentes?',
      'Precisamos de uma nova estratégia', 'Como aumentamos a receita?',
    ],
    Health: [
      'Estou doente', 'Preciso de um médico', 'Estou com dor de cabeça', 'Estou com febre',
      'Estou cansado', 'Preciso descansar', 'Preciso de remédio', 'Preciso de uma receita',
      'Preciso ir ao hospital', 'Preciso ver um especialista',
    ],
    Sports: [
      'Eu gosto de esportes', 'Eu jogo futebol', 'Eu assisto basquete', 'Eu corro todos os dias',
      'Eu nado na piscina', 'Eu ando de bicicleta', 'Eu vou à academia', 'Eu faço yoga',
      'Eu jogo tênis', 'Eu assisto as Olimpíadas',
    ],
    Entertainment: [
      'Eu gosto de filmes', 'Eu assisto séries de TV', 'Eu ouço música', 'Eu leio livros',
      'Eu jogo videogame', 'Eu vou ao teatro', 'Eu assisto a shows', 'Eu vou a museus',
      'Eu gosto de arte', 'Eu gosto de dançar',
    ],
    Education: [
      'Eu vou à escola', 'Eu estudo matemática', 'Eu aprendo história', 'Eu falo inglês',
      'Eu escrevo ensaios', 'Eu leio livros', 'Eu faço provas', 'Eu faço lição de casa',
      'Eu tenho um professor', 'Eu tenho colegas de classe',
    ],
    Travel: [
      'Eu gosto de viajar', 'Eu vou de férias', 'Eu visito lugares novos', 'Eu tiro fotos',
      'Eu conheço pessoas novas', 'Eu experimento comidas novas', 'Eu aprendo sobre culturas', 'Eu vejo pontos turísticos',
      'Eu vivo aventuras', 'Eu exploro o mundo',
    ],
    Food: [
      'Eu gosto de comer', 'Eu cozinho em casa', 'Eu vou a restaurantes', 'Eu experimento novas receitas',
      'Eu como comida saudável', 'Eu bebo café', 'Eu como sobremesa ', 'Eu tomo café da manhã',
      'Eu almoço', 'Eu janto',
    ],
  },
  Russian: {
    General: [
      'Привет', 'Пока', 'Как дела?', 'Спасибо', 'Пожалуйста',
      'Извините', 'Да', 'Нет', 'Доброе утро', 'Спокойной ночи',
    ],
    Technology: [
      'Пожалуйста, включите компьютер', 'Мне нужно зарядить телефон', 'Как работает это устройство?', 'Мой экран сломан',
      'У вас есть USB-кабель?', 'Мой аккумулятор разряжен', 'Можете перезагрузить сервер?', 'Нам нужно обновить программное обеспечение',
      'Система не работает', 'Я забыл свой пароль',
    ],
    Science: [
      'Какая формула?', 'Это микроскоп', 'Наука объясняет вселенную', 'Мы изучаем клетки',
      'Генетика - это будущее', 'Что делает этот химикат?', 'Нам нужно больше данных', 'Это научный метод',
      'Кто это открыл?', 'Каковы последствия?',
    ],
    Business: [
      'Нам нужно увеличить продажи', 'Наши прибыли снижаются', 'Мы должны инвестировать в маркетинг', 'Это наш бизнес-план',
      'Наша компания растет', 'У нас сегодня встреча', 'Каковы тенденции рынка?', 'Кто наши конкуренты?',
      'Нам нужна новая стратегия', 'Как увеличить доход?',
    ],
    Health: [
      'Я болен', 'Мне нужен врач', 'У меня болит голова', 'У меня температура',
      'Я устал', 'Мне нужен отдых', 'Мне нужно лекарство', 'Мне нужен рецепт',
      'Мне нужно пойти в больницу', 'Мне нужно посетить специалиста',
    ],
    Sports: [
      'Мне нравится спорт', 'Я играю в футбол', 'Я смотрю баскетбол', 'Я бегаю каждый день',
      'Я плаваю в бассейне', 'Я катаюсь на велосипеде', 'Я хожу в спор��зал', 'Я занимаюсь йогой',
      'Я играю в теннис', 'Я смотрю Олимпийские игры',
    ],
    Entertainment: [
      'Мне нравятся фильмы', 'Я смотрю телешоу', 'Я слушаю музыку', 'Я читаю книги',
      'Я играю в видеоигры', 'Я хожу в театр', 'Я смотрю концерты', 'Я хожу в музеи',
      'Мне нравится искусство', 'Мне нравится танцевать',
    ],
    Education: [
      'Я хожу в школу', 'Я учу математику', 'Я изучаю историю', 'Я говорю по-английски',
      'Я пишу эссе', 'Я читаю книги', 'Я сдаю экзамены', 'Я делаю домашнее задание',
      'У меня есть учитель', 'У меня есть одноклассники',
    ],
    Travel: [
      'Мне нравится путешествовать', 'Я еду в отпуск', 'Я посещаю новые места', 'Я фотографирую',
      'Я знакомлюсь с новыми людьми', 'Я пробую новую еду', 'Я узнаю о культурах', 'Я вижу достопримечательности',
      'Я отправляюсь в приключения', 'Я исследую мир',
    ],
    Food: [
      'Мне нравится есть', 'Я готовлю дома', 'Я хожу в рестораны', 'Я пробую новые рецепты',
      'Я ем здоровую пищ��', 'Я пью кофе', 'Я ем десерт', 'Я завтракаю',
      'Я обедаю', 'Я ужинаю',
    ],
  },
  Japanese: {
    General: [
      'こんにちは', 'さようなら', 'お元気ですか？', 'ありがとう', 'お願いします',
      'ごめんなさい', 'はい', 'いいえ', 'おはようございます', 'おやすみなさい',
    ],
    Technology: [
      'コンピューターをオンにしてください', '私は私の電話を充電する必要があります', 'このガジェットはどのように動作しますか？', '私の画面が壊れています',
      'USBケーブルはありますか？', '私のバッテリーが切れています', 'サーバーを再起動できますか？', 'ソフトウェアを更新する必要があります',
      'システムがダウンしています', 'パスワードを忘れました',
    ],
    Science: [
      '式は何ですか？', 'これは顕微鏡です', '科学は宇宙を説明します', '私たちは細胞を研究しています',
      '遺伝子は未来です', 'この化学物質は何をしますか？', 'より多くのデータが必要です', 'これは科学的方法です',
      '誰がこれを発見しましたか？', '何が影響を与えますか？',
    ],
    Business: [
      '売上を改善する必要があります', '利益が減少しています', 'マーケティングに投資する必要があります', 'これが私たちのビジネスプランです',
      '当社は成長しています', '今日は会議があります', '市場のトレンドは何ですか？', '競合他社は誰ですか？',
      '新しい戦略が必要です', '収益 をどのように増やしますか？',
    ],
    Health: [
      '私は病気です', '医者が必要です', '頭痛がします', '熱があります',
      '疲れています', '休む必要があります', '薬が必要です', '処方箋が必要です',
      '病院に行く必要があります', '専門家に相談する必要があります',
    ],
    Sports: [
      'スポーツが好きです', 'サッカーをします', 'バスケットボールを見ます', '毎日走ります',
      'プールで泳ぎます', '自転車に乗ります', 'ジムに行きます', 'ヨガをします',
      'テニスをします', 'オリンピックを見ます',
    ],
    Entertainment: [
      '映画が好きです', 'テレビ番組を見ます', '音楽を聴きます', '本を読みます',
      'ビデオゲームをします', '劇場に行きます', 'コンサートを見ます', '博物館に行きます',
      'アートが好きです', 'ダンスが好きです',
    ],
    Education: [
      '学校に行きます', '数学を勉強します', '歴史を学びます', '英語を話します',
      'エッセイを書きます', '本を読みます', '試験を受けます', '宿題をします',
      '先生がいます', 'クラスメートがいます',
    ],
    Travel: [
      '旅行が好��です', '休暇に行きます', '新しい場所を訪れます', '写真を撮ります',
      '新しい人に会います', '新しい食べ物を試します', '文化について学びます', '名所を見ます',
      '冒険に出ます', '世界を探検します',
    ],
    Food: [
      '食べるのが好きです', '家で料理します', 'レストランに行きます', '新しいレシピを試します',
      '健康的な食事をします', 'コーヒーを飲みます', 'デザートを食べます', '朝食をとります',
      '昼食をとります', '夕食をとります',
    ],
  },
};

const getPhrasesByTopic = (language: Language, topic: Topic): Phrase[] => {
  return PHRASES_BY_TOPIC[language][topic];
};

const savePhrases = async (phrases: string[], Topic: Topic | undefined, Language: Language | undefined) => {
  const phraseKey = `${PHRASES}_${Topic}_${Language}`;
  const serializedPhrases = JSON.stringify(phrases);
  await AsyncStorage.setItem(phraseKey, serializedPhrases);
};

const getPhrases = async (topic: Topic, language: Language): Promise<string[] | null> => {
  const phraseKey = `${PHRASES}_${topic}_${language}`;
  const phrases = await AsyncStorage.getItem(phraseKey);
  return phrases ? JSON.parse(phrases) : null;
};

export {getPhrases, savePhrases, getPhrasesByTopic};
