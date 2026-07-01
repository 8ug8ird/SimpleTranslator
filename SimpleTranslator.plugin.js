/**
 * @name SimpleTranslator
 * @author 8ug8ird
 * @version 1.0.0
 * @authorId 698947564459917343
 * @description Translate messages or your own text before sending, directly in Discord.
 * @source https://github.com/8ug8ird
 */

const { ContextMenu, Data, UI } = BdApi;
const PLUGIN_ID = "SimpleTranslator";

const LANGUAGES_LOCALIZED = {
    "en": {
        "ar": "Arabic", "zh": "Chinese (Simplified)", "nl": "Dutch", "en": "English", "fr": "French",
        "de": "German", "he": "Hebrew", "hi": "Hindi", "id": "Indonesian", "it": "Italian",
        "ja": "Japanese", "ko": "Korean", "pl": "Polish", "pt": "Portuguese (BR)", "pt-PT": "Portuguese (PT)",
        "ru": "Russian", "es": "Spanish", "sv": "Swedish", "th": "Thai", "tr": "Turkish", "vi": "Vietnamese",
        "da": "Danish", "no": "Norwegian", "fi": "Finnish", "hr": "Croatian", "lt": "Lithuanian",
        "hu": "Hungarian", "ro": "Romanian", "cs": "Czech", "el": "Greek", "bg": "Bulgarian",
        "uk": "Ukrainian", "zh-TW": "Chinese (Traditional)"
    },
    "pt": {
        "ar": "Árabe", "zh": "Chinês (Simplificado)", "nl": "Holandês", "en": "Inglês", "fr": "Francês",
        "de": "Alemão", "he": "Hebraico", "hi": "Híndi", "id": "Indonésio", "it": "Italiano",
        "ja": "Japonês", "ko": "Coreano", "pl": "Polonês", "pt": "Português (BR)", "pt-PT": "Português (PT)",
        "ru": "Russo", "es": "Espanhol", "sv": "Sueco", "th": "Tailandês", "tr": "Turco", "vi": "Vietnamita",
        "da": "Dinamarquês", "no": "Norueguês", "fi": "Finlandês", "hr": "Croata", "lt": "Lituano",
        "hu": "Húngaro", "ro": "Romeno", "cs": "Tcheco", "el": "Grego", "bg": "Búlgaro",
        "uk": "Ucraniano", "zh-TW": "Chinês (Tradicional)"
    },
    "es": {
        "ar": "Árabe", "zh": "Chino (Simplificado)", "nl": "Holandés", "en": "Inglés", "fr": "Francés",
        "de": "Alemán", "he": "Hebreo", "hi": "Hindi", "id": "Indonesio", "it": "Italiano",
        "ja": "Japonés", "ko": "Coreano", "pl": "Polaco", "pt": "Portugués (BR)", "pt-PT": "Portugués (PT)",
        "ru": "Ruso", "es": "Español", "sv": "Sueco", "th": "Tailandés", "tr": "Turco", "vi": "Vietnamita",
        "da": "Danés", "no": "Noruego", "fi": "Finlandés", "hr": "Croata", "lt": "Lituano",
        "hu": "Húngaro", "ro": "Rumano", "cs": "Checo", "el": "Griego", "bg": "Búlgaro",
        "uk": "Ucraniano", "zh-TW": "Chino (Tradicional)"
    },
    "fr": {
        "ar": "Arabe", "zh": "Chinois (simplifié)", "nl": "Néerlandais", "en": "Anglais", "fr": "Français",
        "de": "Allemand", "he": "Hébreu", "hi": "Hindi", "id": "Indonésien", "it": "Italien",
        "ja": "Japonais", "ko": "Coréen", "pl": "Polonais", "pt": "Portugais (BR)", "pt-PT": "Portugais (PT)",
        "ru": "Russe", "es": "Espagnol", "sv": "Suédois", "th": "Thaï", "tr": "Turc", "vi": "Vietnamien",
        "da": "Danois", "no": "Norvégien", "fi": "Finnois", "hr": "Croate", "lt": "Lituanien",
        "hu": "Hongrois", "ro": "Roumain", "cs": "Tchèque", "el": "Grec", "bg": "Bulgare",
        "uk": "Ukrainien", "zh-TW": "Chinois (traditionnel)"
    },
    "de": {
        "ar": "Arabisch", "zh": "Chinesisch (vereinfacht)", "nl": "Niederländisch", "en": "Englisch", "fr": "Französisch",
        "de": "Deutsch", "he": "Hebräisch", "hi": "Hindi", "id": "Indonesisch", "it": "Italienisch",
        "ja": "Japanisch", "ko": "Koreanisch", "pl": "Polnisch", "pt": "Portugiesisch (BR)", "pt-PT": "Portugiesisch (PT)",
        "ru": "Russisch", "es": "Spanisch", "sv": "Schwedisch", "th": "Thai", "tr": "Türkisch", "vi": "Vietnamesisch",
        "da": "Dänisch", "no": "Norwegisch", "fi": "Finnisch", "hr": "Kroatisch", "lt": "Litauisch",
        "hu": "Ungarisch", "ro": "Rumänisch", "cs": "Tschechisch", "el": "Griechisch", "bg": "Bulgarisch",
        "uk": "Ukrainisch", "zh-TW": "Chinesisch (traditionell)"
    },
    "it": {
        "ar": "Arabo", "zh": "Cinese (semplificato)", "nl": "Olandese", "en": "Inglese", "fr": "Francese",
        "de": "Tedesco", "he": "Ebraico", "hi": "Hindi", "id": "Indonesiano", "it": "Italiano",
        "ja": "Giapponese", "ko": "Coreano", "pl": "Polacco", "pt": "Portoghese (BR)", "pt-PT": "Portoghese (PT)",
        "ru": "Russo", "es": "Spagnolo", "sv": "Svedese", "th": "Thai", "tr": "Turco", "vi": "Vietnamita",
        "da": "Danese", "no": "Norvegese", "fi": "Finlandese", "hr": "Croato", "lt": "Lituano",
        "hu": "Ungherese", "ro": "Rumeno", "cs": "Ceco", "el": "Greco", "bg": "Bulgaro",
        "uk": "Ucraino", "zh-TW": "Cinese (tradizionale)"
    },
    "ru": {
        "ar": "Арабский", "zh": "Китайский (упрощ.)", "nl": "Голландский", "en": "Английский", "fr": "Французский",
        "de": "Немецкий", "he": "Иврит", "hi": "Хинди", "id": "Индонезийский", "it": "Итальянский",
        "ja": "Японский", "ko": "Корейский", "pl": "Польский", "pt": "Португальский (BR)", "pt-PT": "Португальский (PT)",
        "ru": "Русский", "es": "Испанский", "sv": "Шведский", "th": "Тайский", "tr": "Турецкий", "vi": "Вьетнамский",
        "da": "Датский", "no": "Норвежский", "fi": "Финский", "hr": "Хорватский", "lt": "Литовский",
        "hu": "Венгерский", "ro": "Румынский", "cs": "Чешский", "el": "Греческий", "bg": "Болгарский",
        "uk": "Украинский", "zh-TW": "Китайский (традиц.)"
    },
    "ja": {
        "ar": "アラビア語", "zh": "中国語（簡体）", "nl": "オランダ語", "en": "英語", "fr": "フランス語",
        "de": "ドイツ語", "he": "ヘブライ語", "hi": "ヒンディー語", "id": "インドネシア語", "it": "イタリア語",
        "ja": "日本語", "ko": "韓国語", "pl": "ポーランド語", "pt": "ポルトガル語（BR）", "pt-PT": "ポルトガル語（PT）",
        "ru": "ロシア語", "es": "スペイン語", "sv": "スウェーデン語", "th": "タイ語", "tr": "トルコ語", "vi": "ベトナム語",
        "da": "デンマーク語", "no": "ノルウェー語", "fi": "フィンランド語", "hr": "クロアチア語", "lt": "リトアニア語",
        "hu": "ハンガリー語", "ro": "ルーマニア語", "cs": "チェコ語", "el": "ギリシャ語", "bg": "ブルガリア語",
        "uk": "ウクライナ語", "zh-TW": "中国語（繁体）"
    },
    "ko": {
        "ar": "아랍어", "zh": "중국어(간체)", "nl": "네덜란드어", "en": "영어", "fr": "프랑스어",
        "de": "독일어", "he": "히브리어", "hi": "힌디어", "id": "인도네시아어", "it": "이탈리아어",
        "ja": "일본어", "ko": "한국어", "pl": "폴란드어", "pt": "포르투갈어(BR)", "pt-PT": "포르투갈어(PT)",
        "ru": "러시아어", "es": "스페인어", "sv": "스웨덴어", "th": "태국어", "tr": "터키어", "vi": "베트남어",
        "da": "덴마크어", "no": "노르웨이어", "fi": "핀란드어", "hr": "크로아티아어", "lt": "리투아니아어",
        "hu": "헝가리어", "ro": "루마니아어", "cs": "체코어", "el": "그리스어", "bg": "불가리아어",
        "uk": "우크라이나어", "zh-TW": "중국어(번체)"
    },
    "zh": {
        "ar": "阿拉伯语", "zh": "中文（简体）", "nl": "荷兰语", "en": "英语", "fr": "法语",
        "de": "德语", "he": "希伯来语", "hi": "印地语", "id": "印度尼西亚语", "it": "意大利语",
        "ja": "日语", "ko": "韩语", "pl": "波兰语", "pt": "葡萄牙语（巴西）", "pt-PT": "葡萄牙语（葡萄牙）",
        "ru": "俄语", "es": "西班牙语", "sv": "瑞典语", "th": "泰语", "tr": "土耳其语", "vi": "越南语",
        "da": "丹麦语", "no": "挪威语", "fi": "芬兰语", "hr": "克罗地亚语", "lt": "立陶宛语",
        "hu": "匈牙利语", "ro": "罗马尼亚语", "cs": "捷克语", "el": "希腊语", "bg": "保加利亚语",
        "uk": "乌克兰语", "zh-TW": "中文（繁体）"
    },
    "ar": {
        "ar": "العربية", "zh": "الصينية (مبسطة)", "nl": "الهولندية", "en": "الإنجليزية", "fr": "الفرنسية",
        "de": "الألمانية", "he": "العبرية", "hi": "الهندية", "id": "الإندونيسية", "it": "الإيطالية",
        "ja": "اليابانية", "ko": "الكورية", "pl": "البولندية", "pt": "البرتغالية (البرازيل)", "pt-PT": "البرتغالية (البرتغال)",
        "ru": "الروسية", "es": "الإسبانية", "sv": "السويدية", "th": "التايلاندية", "tr": "التركية", "vi": "الفيتنامية",
        "da": "الدانماركية", "no": "النرويجية", "fi": "الفنلندية", "hr": "الكرواتية", "lt": "الليتوانية",
        "hu": "المجرية", "ro": "الرومانية", "cs": "التشيكية", "el": "اليونانية", "bg": "البلغارية",
        "uk": "الأوكرانية", "zh-TW": "الصينية (التقليدية)"
    },
    "tr": {
        "ar": "Arapça", "zh": "Çince (Basit)", "nl": "Felemenkçe", "en": "İngilizce", "fr": "Fransızca",
        "de": "Almanca", "he": "İbranice", "hi": "Hintçe", "id": "Endonezce", "it": "İtalyanca",
        "ja": "Japonca", "ko": "Korece", "pl": "Lehçe", "pt": "Portekizce (BR)", "pt-PT": "Portekizce (PT)",
        "ru": "Rusça", "es": "İspanyolca", "sv": "İsveççe", "th": "Tayca", "tr": "Türkçe", "vi": "Vietnamca",
        "da": "Danca", "no": "Norveççe", "fi": "Fince", "hr": "Hırvatça", "lt": "Litvanca",
        "hu": "Macarca", "ro": "Rumence", "cs": "Çekçe", "el": "Yunanca", "bg": "Bulgarca",
        "uk": "Ukraynaca", "zh-TW": "Çince (Geleneksel)"
    },
    "vi": {
        "ar": "Tiếng Ả Rập", "zh": "Tiếng Trung (Giản thể)", "nl": "Tiếng Hà Lan", "en": "Tiếng Anh", "fr": "Tiếng Pháp",
        "de": "Tiếng Đức", "he": "Tiếng Do Thái", "hi": "Tiếng Hindi", "id": "Tiếng Indonesia", "it": "Tiếng Ý",
        "ja": "Tiếng Nhật", "ko": "Tiếng Hàn", "pl": "Tiếng Ba Lan", "pt": "Tiếng Bồ Đào Nha (BR)", "pt-PT": "Tiếng Bồ Đào Nha (PT)",
        "ru": "Tiếng Nga", "es": "Tiếng Tây Ban Nha", "sv": "Tiếng Thụy Điển", "th": "Tiếng Thái", "tr": "Tiếng Thổ Nhĩ Kỳ", "vi": "Tiếng Việt",
        "da": "Tiếng Đan Mạch", "no": "Tiếng Na Uy", "fi": "Tiếng Phần Lan", "hr": "Tiếng Croatia", "lt": "Tiếng Litva",
        "hu": "Tiếng Hungary", "ro": "Tiếng Romania", "cs": "Tiếng Séc", "el": "Tiếng Hy Lạp", "bg": "Tiếng Bulgaria",
        "uk": "Tiếng Ukraina", "zh-TW": "Tiếng Trung (Phồn thể)"
    },
    "da": {
        "ar": "Arabisk", "zh": "Kinesisk (forenklet)", "nl": "Hollandsk", "en": "Engelsk", "fr": "Fransk",
        "de": "Tysk", "he": "Hebraisk", "hi": "Hindi", "id": "Indonesisk", "it": "Italiensk",
        "ja": "Japansk", "ko": "Koreansk", "pl": "Polsk", "pt": "Portugisisk (BR)", "pt-PT": "Portugisisk (PT)",
        "ru": "Russisk", "es": "Spansk", "sv": "Svensk", "th": "Thai", "tr": "Tyrkisk", "vi": "Vietnamesisk",
        "da": "Dansk", "no": "Norsk", "fi": "Finsk", "hr": "Kroatisk", "lt": "Litauisk",
        "hu": "Ungarsk", "ro": "Rumænsk", "cs": "Tjekkisk", "el": "Græsk", "bg": "Bulgarsk",
        "uk": "Ukrainsk", "zh-TW": "Kinesisk (traditionel)"
    },
    "no": {
        "ar": "Arabisk", "zh": "Kinesisk (forenklet)", "nl": "Nederlandsk", "en": "Engelsk", "fr": "Fransk",
        "de": "Tysk", "he": "Hebraisk", "hi": "Hindi", "id": "Indonesisk", "it": "Italiensk",
        "ja": "Japansk", "ko": "Koreansk", "pl": "Polsk", "pt": "Portugisisk (BR)", "pt-PT": "Portugisisk (PT)",
        "ru": "Russisk", "es": "Spansk", "sv": "Svensk", "th": "Thai", "tr": "Tyrkisk", "vi": "Vietnamesisk",
        "da": "Dansk", "no": "Norsk", "fi": "Finsk", "hr": "Kroatisk", "lt": "Litauisk",
        "hu": "Ungarsk", "ro": "Rumensk", "cs": "Tsjekkisk", "el": "Gresk", "bg": "Bulgarsk",
        "uk": "Ukrainsk", "zh-TW": "Kinesisk (tradisjonell)"
    },
    "fi": {
        "ar": "Arabia", "zh": "Kiina (yksinkertaistettu)", "nl": "Hollanti", "en": "Englanti", "fr": "Ranska",
        "de": "Saksa", "he": "Heprea", "hi": "Hindi", "id": "Indonesia", "it": "Italia",
        "ja": "Japani", "ko": "Korea", "pl": "Puola", "pt": "Portugali (BR)", "pt-PT": "Portugali (PT)",
        "ru": "Venäjä", "es": "Espanja", "sv": "Ruotsi", "th": "Thai", "tr": "Turkki", "vi": "Vietnam",
        "da": "Tanska", "no": "Norja", "fi": "Suomi", "hr": "Kroatia", "lt": "Liettua",
        "hu": "Unkari", "ro": "Romania", "cs": "Tšekki", "el": "Kreikka", "bg": "Bulgaria",
        "uk": "Ukraina", "zh-TW": "Kiina (perinteinen)"
    },
    "hr": {
        "ar": "Arapski", "zh": "Kineski (pojednostavljeni)", "nl": "Nizozemski", "en": "Engleski", "fr": "Francuski",
        "de": "Njemački", "he": "Hebrejski", "hi": "Hindi", "id": "Indonezijski", "it": "Talijanski",
        "ja": "Japanski", "ko": "Korejski", "pl": "Poljski", "pt": "Portugalski (BR)", "pt-PT": "Portugalski (PT)",
        "ru": "Ruski", "es": "Španjolski", "sv": "Švedski", "th": "Tajlandski", "tr": "Turski", "vi": "Vijetnamski",
        "da": "Danski", "no": "Norveški", "fi": "Finski", "hr": "Hrvatski", "lt": "Litavski",
        "hu": "Mađarski", "ro": "Rumunjski", "cs": "Češki", "el": "Grčki", "bg": "Bugarski",
        "uk": "Ukrajinski", "zh-TW": "Kineski (tradicionalni)"
    },
    "lt": {
        "ar": "Arabų", "zh": "Kinų (supaprastinta)", "nl": "Olandų", "en": "Anglų", "fr": "Prancūzų",
        "de": "Vokiečių", "he": "Hebrajų", "hi": "Hindi", "id": "Indoneziečių", "it": "Italų",
        "ja": "Japonų", "ko": "Korėjiečių", "pl": "Lenkų", "pt": "Portugalų (BR)", "pt-PT": "Portugalų (PT)",
        "ru": "Rusų", "es": "Ispanų", "sv": "Švedų", "th": "Tajų", "tr": "Turkų", "vi": "Vietnamiečių",
        "da": "Danų", "no": "Norvegų", "fi": "Suomių", "hr": "Kroatų", "lt": "Lietuvių",
        "hu": "Vengrų", "ro": "Rumunų", "cs": "Čekų", "el": "Graikų", "bg": "Bulgary",
        "uk": "Ukrainiečių", "zh-TW": "Kinų (tradicinė)"
    },
    "hu": {
        "ar": "Arab", "zh": "Kínai (egyszerűsített)", "nl": "Holland", "en": "Angol", "fr": "Francia",
        "de": "Német", "he": "Héber", "hi": "Hindi", "id": "Indonéz", "it": "Olasz",
        "ja": "Japán", "ko": "Koreai", "pl": "Lengyel", "pt": "Portugál (BR)", "pt-PT": "Portugál (PT)",
        "ru": "Orosz", "es": "Spanyol", "sv": "Svéd", "th": "Thai", "tr": "Török", "vi": "Vietnami",
        "da": "Dán", "no": "Norvég", "fi": "Finn", "hr": "Horvát", "lt": "Litván",
        "hu": "Magyar", "ro": "Román", "cs": "Cseh", "el": "Görög", "bg": "Bolgár",
        "uk": "Ukrán", "zh-TW": "Kínai (hagyományos)"
    },
    "ro": {
        "ar": "Arabă", "zh": "Chineză (simplificată)", "nl": "Olandeză", "en": "Engleză", "fr": "Franceză",
        "de": "Germană", "he": "Ebraică", "hi": "Hindi", "id": "Indoneziană", "it": "Italiană",
        "ja": "Japoneză", "ko": "Coreeană", "pl": "Poloneză", "pt": "Portugheză (BR)", "pt-PT": "Portugheză (PT)",
        "ru": "Rusă", "es": "Spaniolă", "sv": "Suedeză", "th": "Thai", "tr": "Turcă", "vi": "Vietnameză",
        "da": "Daneză", "no": "Norvegiană", "fi": "Finlandeză", "hr": "Croată", "lt": "Lituaniană",
        "hu": "Maghiară", "ro": "Română", "cs": "Cehă", "el": "Greacă", "bg": "Bulgară",
        "uk": "Ucraineană", "zh-TW": "Chineză (tradițională)"
    },
    "cs": {
        "ar": "Arabština", "zh": "Čínština (zjednodušená)", "nl": "Nizozemština", "en": "Angličtina", "fr": "Francouzština",
        "de": "Němčina", "he": "Hebrejština", "hi": "Hindština", "id": "Indonéština", "it": "Italština",
        "ja": "Japonština", "ko": "Korejština", "pl": "Polština", "pt": "Portugalština (BR)", "pt-PT": "Portugalština (PT)",
        "ru": "Ruština", "es": "Španělština", "sv": "Švédština", "th": "Thajština", "tr": "Turečtina", "vi": "Vietnamština",
        "da": "Dánština", "no": "Norština", "fi": "Finština", "hr": "Chorvatština", "lt": "Litevština",
        "hu": "Maďarština", "ro": "Rumunština", "cs": "Čeština", "el": "Řečtina", "bg": "Bulharština",
        "uk": "Ukrajinština", "zh-TW": "Čínština (tradiční)"
    },
    "el": {
        "ar": "Αραβικά", "zh": "Κινέζικα (απλοποιημένα)", "nl": "Ολλανδικά", "en": "Αγγλικά", "fr": "Γαλλικά",
        "de": "Γερμανικά", "he": "Εβραϊκά", "hi": "Χίντι", "id": "Ινδονησιακά", "it": "Ιταλικά",
        "ja": "Ιαπωνικά", "ko": "Κορεατικά", "pl": "Πολωνικά", "pt": "Πορτογαλικά (BR)", "pt-PT": "Πορτογαλικά (PT)",
        "ru": "Ρωσικά", "es": "Ισπανικά", "sv": "Σουηδικά", "th": "Ταϊλανδικά", "tr": "Τουρκικά", "vi": "Βιετναμικά",
        "da": "Δανικά", "no": "Νορβηγικά", "fi": "Φινλανδικά", "hr": "Κροατικά", "lt": "Λιθουανικά",
        "hu": "Ουγγρικά", "ro": "Ρουμανικά", "cs": "Τσεχικά", "el": "Ελληνικά", "bg": "Βουλγαρικά",
        "uk": "Ουκρανικά", "zh-TW": "Κινέζικα (παραδοσιακά)"
    },
    "bg": {
        "ar": "Арабски", "zh": "Китайски (опростен)", "nl": "Холандски", "en": "Английски", "fr": "Френски",
        "de": "Немски", "he": "Иврит", "hi": "Хинди", "id": "Индонезийски", "it": "Италиански",
        "ja": "Японски", "ko": "Корейски", "pl": "Полски", "pt": "Португалски (BR)", "pt-PT": "Португалски (PT)",
        "ru": "Руски", "es": "Испански", "sv": "Шведски", "th": "Тайски", "tr": "Турски", "vi": "Виетнамски",
        "da": "Датски", "no": "Норвежки", "fi": "Фински", "hr": "Хърватски", "lt": "Литовски",
        "hu": "Унгарски", "ro": "Румънски", "cs": "Чешки", "el": "Гръцки", "bg": "Български",
        "uk": "Украински", "zh-TW": "Китайски (традиционен)"
    },
    "uk": {
        "ar": "Арабська", "zh": "Китайська (спрощ.)", "nl": "Голландська", "en": "Англійська", "fr": "Французька",
        "de": "Німецька", "he": "Іврит", "hi": "Гінді", "id": "Індонезійська", "it": "Італійська",
        "ja": "Японська", "ko": "Корейська", "pl": "Польська", "pt": "Португальська (BR)", "pt-PT": "Португальська (PT)",
        "ru": "Російська", "es": "Іспанська", "sv": "Шведська", "th": "Тайська", "tr": "Турецька", "vi": "В'єтнамська",
        "da": "Данська", "no": "Норвезька", "fi": "Фінська", "hr": "Хорватська", "lt": "Литовська",
        "hu": "Угорська", "ro": "Румунська", "cs": "Чеська", "el": "Грецька", "bg": "Болгарська",
        "uk": "Українська", "zh-TW": "Китайська (традиц.)"
    },
    "hi": {
        "ar": "अरबी", "zh": "चीनी (सरलीकृत)", "nl": "डच", "en": "अंग्रेज़ी", "fr": "फ़्रेंच",
        "de": "जर्मन", "he": "हिब्रू", "hi": "हिन्दी", "id": "इंडोनेशियाई", "it": "इतालवी",
        "ja": "जापानी", "ko": "कोरियाई", "pl": "पोलिश", "pt": "पुर्तगाली (BR)", "pt-PT": "पुर्तगाली (PT)",
        "ru": "रूसी", "es": "स्पेनिश", "sv": "स्वीडिश", "th": "थाई", "tr": "तुर्की", "vi": "वियतनामी",
        "da": "डेनिश", "no": "नॉर्वेजियन", "fi": "फिनिश", "hr": "क्रोएशियाई", "lt": "लिथुआनियाई",
        "hu": "हंगेरियन", "ro": "रोमानियाई", "cs": "चेक", "el": "ग्रीक", "bg": "बुल्गारियाई",
        "uk": "यूक्रेनी", "zh-TW": "चीनी (पारंपरिक)"
    },
    "th": {
        "ar": "อาหรับ", "zh": "จีน (ตัวย่อ)", "nl": "ดัตช์", "en": "อังกฤษ", "fr": "ฝรั่งเศส",
        "de": "เยอรมัน", "he": "ฮีบรู", "hi": "ฮินดี", "id": "อินโดนีเซีย", "it": "อิตาลี",
        "ja": "ญี่ปุ่น", "ko": "เกาหลี", "pl": "โปแลนด์", "pt": "โปรตุเกส (BR)", "pt-PT": "โปรตุเกส (PT)",
        "ru": "รัสเซีย", "es": "สเปน", "sv": "สวีเดน", "th": "ไทย", "tr": "ตุรกี", "vi": "เวียดนาม",
        "da": "เดนมาร์ก", "no": "นอร์เวย์", "fi": "ฟินแลนด์", "hr": "โครเอเชีย", "lt": "ลิทัวเนีย",
        "hu": "ฮังการี", "ro": "โรมาเนีย", "cs": "เช็ก", "el": "กรีก", "bg": "บัลแกเรีย",
        "uk": "ยูเครน", "zh-TW": "จีน (ตัวเต็ม)"
    },
    "zh-TW": {
        "ar": "阿拉伯文", "zh": "中文（簡體）", "nl": "荷蘭文", "en": "英文", "fr": "法文",
        "de": "德文", "he": "希伯來文", "hi": "印地文", "id": "印尼文", "it": "義大利文",
        "ja": "日文", "ko": "韓文", "pl": "波蘭文", "pt": "葡萄牙文（巴西）", "pt-PT": "葡萄牙文（葡萄牙）",
        "ru": "俄文", "es": "西班牙文", "sv": "瑞典文", "th": "泰文", "tr": "土耳其文", "vi": "越南文",
        "da": "丹麥文", "no": "挪威文", "fi": "芬蘭文", "hr": "克羅埃西亞文", "lt": "立陶宛文",
        "hu": "匈牙利文", "ro": "羅馬尼亞文", "cs": "捷克文", "el": "希臘文", "bg": "保加利亞文",
        "uk": "烏克蘭文", "zh-TW": "中文（繁體）"
    }
};

const SHOW_ORIGINAL_LABELS = {
    "en": "• show original",
    "pt": "• ver original",
    "pt-PT": "• ver original",
    "es": "• ver original",
    "fr": "• voir l'original",
    "de": "• Original anzeigen",
    "it": "• mostra originale",
    "ru": "• показать оригинал",
    "ja": "• 元のメッセージを表示",
    "ko": "• 원본 보기",
    "zh": "• 显示原文",
    "ar": "• عرض الأصل",
    "tr": "• orijinali göster",
    "pl": "• pokaż oryginał",
    "nl": "• origineel tonen",
    "sv": "• visa original",
    "he": "• הצג מקור",
    "hi": "• मूल दिखाएँ",
    "vi": "• xem bản gốc",
    "th": "• ดูต้นฉบับ",
    "id": "• lihat asli",
    "da": "• vis original",
    "no": "• vis original",
    "fi": "• näytä alkuperäinen",
    "hr": "• prikaži izvornik",
    "lt": "• rodyti originalą",
    "hu": "• eredeti megjelenítése",
    "ro": "• arată originalul",
    "cs": "• zobrazit originál",
    "el": "• εμφανιση πρωτοτύπου",
    "bg": "• покажи оригинала",
    "uk": "• показати оригінал",
    "zh-TW": "• 顯示原文"
};

const LOCALE = {
    "en": {
        translate: "Translate",
        remove: "Remove translation",
        changeTarget: "Change target language",
        translated: "Translated!",
        translating: "Translating...",
        typeFirst: "Type something first!",
        error: "Error",
        started: "SimpleTranslator started!",
        stopped: "SimpleTranslator stopped.",
        langChanged: "Language changed to:",
        to: "to",
        contentNotFound: "Message content not found.",
        langGroup1: "A–E",
        langGroup2: "F–K",
        langGroup3: "L–Q",
        langGroup4: "R–Z",
        interfaceLanguageOverride: "Interface language (override):",
        autoDetected: "Automatic (detected)",
        rightClickToDisable: "right click to disable",
        clickToEnable: "click to enable",
        clickToChange: "click to change",
        translatorEnabled: "Translator enabled",
        translatorDisabled: "Translator disabled",
        translateInput: "Translate input text",
        inputLangChanged: "Input language changed to:",
        chatLangChanged: "Chat translation language changed to:",
        chatLanguage: "Chat Language",
        inputLanguage: "Input Language",
        changeChatLang: "Change chat language by right-clicking a message.",
        changeInputLang: "Change input language by clicking the language button (e.g. EN) next to the translator.",
        detectedInterfaceLanguage: "Detected interface language:",
        interfaceUpdated: "Interface language updated. Reload the plugin (Ctrl+R) to apply."
    },
    "pt": {
        translate: "Traduzir",
        remove: "Remover tradução",
        changeTarget: "Trocar idioma alvo",
        translated: "Traduzido!",
        translating: "Traduzindo...",
        typeFirst: "Digite algo primeiro!",
        error: "Erro",
        started: "SimpleTranslator iniciado!",
        stopped: "SimpleTranslator parado.",
        langChanged: "Idioma alterado para:",
        to: "para",
        contentNotFound: "Conteúdo da mensagem não encontrado.",
        langGroup1: "A–E",
        langGroup2: "F–K",
        langGroup3: "L–Q",
        langGroup4: "R–Z",
        interfaceLanguageOverride: "Idioma da interface (substituir):",
        autoDetected: "Automático (detectado)",
        rightClickToDisable: "clique direito para desativar",
        clickToEnable: "clique para ativar",
        clickToChange: "clique para alterar",
        translatorEnabled: "Tradutor ativado",
        translatorDisabled: "Tradutor desativado",
        translateInput: "Traduzir texto digitado",
        inputLangChanged: "Idioma do input alterado para:",
        chatLangChanged: "Idioma de tradução do chat alterado para:",
        chatLanguage: "Idioma do Chat",
        inputLanguage: "Idioma do Input",
        changeChatLang: "Altere o idioma do chat clicando com o botão direito em uma mensagem.",
        changeInputLang: "Altere o idioma do input clicando no botão de idioma (ex: PT) ao lado do tradutor.",
        detectedInterfaceLanguage: "Idioma da interface detectado:",
        interfaceUpdated: "Idioma da interface atualizado. Recarregue o plugin (Ctrl+R) para aplicar."
    },
    "es": {
        translate: "Traducir",
        remove: "Eliminar traducción",
        changeTarget: "Cambiar idioma destino",
        translated: "¡Traducido!",
        translating: "Traduciendo...",
        typeFirst: "¡Escribe algo primero!",
        error: "Error",
        started: "¡SimpleTranslator iniciado!",
        stopped: "SimpleTranslator detenido.",
        langChanged: "Idioma cambiado a:",
        to: "a",
        contentNotFound: "Contenido de mensaje no encontrado.",
        langGroup1: "A–E",
        langGroup2: "F–K",
        langGroup3: "L–Q",
        langGroup4: "R–Z",
        interfaceLanguageOverride: "Idioma de la interfaz (anular):",
        autoDetected: "Automático (detectado)",
        rightClickToDisable: "clic derecho para desactivar",
        clickToEnable: "clic para activar",
        clickToChange: "clic para cambiar",
        translatorEnabled: "Traductor activado",
        translatorDisabled: "Traductor desactivado",
        translateInput: "Traducir texto escrito",
        inputLangChanged: "Idioma del input cambiado a:",
        chatLangChanged: "Idioma de traducción del chat cambiado a:",
        chatLanguage: "Idioma del Chat",
        inputLanguage: "Idioma del Input",
        changeChatLang: "Cambie el idioma del chat haciendo clic derecho en un mensaje.",
        changeInputLang: "Cambie el idioma del input haciendo clic en el botón de idioma (ej. EN) junto al traductor.",
        detectedInterfaceLanguage: "Idioma de la interfaz detectado:",
        interfaceUpdated: "Idioma de la interfaz actualizado. Recargue el plugin (Ctrl+R) para aplicar."
    },
    "fr": {
        translate: "Traduire",
        remove: "Supprimer la traduction",
        changeTarget: "Changer la langue cible",
        translated: "Traduit !",
        translating: "Traduction en cours...",
        typeFirst: "Écrivez d'abord quelque chose !",
        error: "Erreur",
        started: "SimpleTranslator démarré !",
        stopped: "SimpleTranslator arrêté.",
        langChanged: "Langue changée en :",
        to: "vers",
        contentNotFound: "Contenu du message introuvable.",
        langGroup1: "A–E",
        langGroup2: "F–K",
        langGroup3: "L–Q",
        langGroup4: "R–Z",
        interfaceLanguageOverride: "Langue de l'interface (remplacement) :",
        autoDetected: "Automatique (détecté)",
        rightClickToDisable: "clic droit pour désactiver",
        clickToEnable: "cliquer pour activer",
        clickToChange: "cliquer pour changer",
        translatorEnabled: "Traducteur activé",
        translatorDisabled: "Traducteur désactivé",
        translateInput: "Traduire le texte saisi",
        inputLangChanged: "Langue de saisie changée en :",
        chatLangChanged: "Langue de traduction du chat changée en :",
        chatLanguage: "Langue du Chat",
        inputLanguage: "Langue de Saisie",
        changeChatLang: "Changez la langue du chat en cliquant droit sur un message.",
        changeInputLang: "Changez la langue de saisie en cliquant sur le bouton de langue (ex: EN) à côté du traducteur.",
        detectedInterfaceLanguage: "Langue de l'interface détectée :",
        interfaceUpdated: "Langue de l'interface mise à jour. Rechargez le plugin (Ctrl+R) pour appliquer."
    },
    "de": {
        translate: "Übersetzen",
        remove: "Übersetzung entfernen",
        changeTarget: "Zielsprache ändern",
        translated: "Übersetzt!",
        translating: "Übersetzung läuft...",
        typeFirst: "Gib zuerst etwas ein!",
        error: "Fehler",
        started: "SimpleTranslator gestartet!",
        stopped: "SimpleTranslator gestoppt.",
        langChanged: "Sprache geändert zu:",
        to: "zu",
        contentNotFound: "Nachrichteninhalt nicht gefunden.",
        langGroup1: "A–E",
        langGroup2: "F–K",
        langGroup3: "L–Q",
        langGroup4: "R–Z",
        interfaceLanguageOverride: "Oberflächensprache (überschreiben):",
        autoDetected: "Automatisch (erkannt)",
        rightClickToDisable: "Rechtsklick zum Deaktivieren",
        clickToEnable: "Klicken zum Aktivieren",
        clickToChange: "klicken zum Ändern",
        translatorEnabled: "Übersetzer aktiviert",
        translatorDisabled: "Übersetzer deaktiviert",
        translateInput: "Eingabetext übersetzen",
        inputLangChanged: "Eingabesprache geändert zu:",
        chatLangChanged: "Chat-Übersetzungssprache geändert zu:",
        chatLanguage: "Chat-Sprache",
        inputLanguage: "Eingabe-Sprache",
        changeChatLang: "Ändern Sie die Chat-Sprache durch Rechtsklick auf eine Nachricht.",
        changeInputLang: "Ändern Sie die Eingabesprache durch Klick auf den Sprachbutton (z.B. EN) neben dem Übersetzer.",
        detectedInterfaceLanguage: "Erkannte Oberflächensprache:",
        interfaceUpdated: "Oberflächensprache aktualisiert. Laden Sie das Plugin neu (Ctrl+R), um es zu übernehmen."
    },
    "it": {
        translate: "Traduci",
        remove: "Rimuovi traduzione",
        changeTarget: "Cambia lingua di destinazione",
        translated: "Tradotto!",
        translating: "Traduzione in corso...",
        typeFirst: "Scrivi qualcosa prima!",
        error: "Errore",
        started: "SimpleTranslator avviato!",
        stopped: "SimpleTranslator arrestato.",
        langChanged: "Lingua cambiata in:",
        to: "a",
        contentNotFound: "Contenuto del messaggio non trovato.",
        langGroup1: "A–E",
        langGroup2: "F–K",
        langGroup3: "L–Q",
        langGroup4: "R–Z",
        interfaceLanguageOverride: "Lingua dell'interfaccia (override):",
        autoDetected: "Automatico (rilevato)",
        rightClickToDisable: "clic destro per disattivare",
        clickToEnable: "clicca per attivare",
        clickToChange: "clicca per cambiare",
        translatorEnabled: "Traduttore attivato",
        translatorDisabled: "Traduttore disattivato",
        translateInput: "Traduci testo inserito",
        inputLangChanged: "Lingua di input cambiata in:",
        chatLangChanged: "Lingua di traduzione chat cambiata in:",
        chatLanguage: "Lingua Chat",
        inputLanguage: "Lingua Input",
        changeChatLang: "Cambia la lingua della chat facendo clic destro su un messaggio.",
        changeInputLang: "Cambia la lingua di input facendo clic sul pulsante lingua (es. EN) accanto al traduttore.",
        detectedInterfaceLanguage: "Lingua dell'interfaccia rilevata:",
        interfaceUpdated: "Lingua dell'interfaccia aggiornata. Ricarica il plugin (Ctrl+R) per applicare."
    },
    "ru": {
        translate: "Перевести",
        remove: "Удалить перевод",
        changeTarget: "Изменить целевой язык",
        translated: "Переведено!",
        translating: "Перевод...",
        typeFirst: "Сначала что-нибудь напишите!",
        error: "Ошибка",
        started: "SimpleTranslator запущен!",
        stopped: "SimpleTranslator остановлен.",
        langChanged: "Язык изменён на:",
        to: "на",
        contentNotFound: "Содержимое сообщения не найдено.",
        langGroup1: "А–Е",
        langGroup2: "Ё–К",
        langGroup3: "Л–П",
        langGroup4: "Р–Я",
        interfaceLanguageOverride: "Язык интерфейса (переопределить):",
        autoDetected: "Автоматически (определено)",
        rightClickToDisable: "щелчок правой кнопкой для отключения",
        clickToEnable: "нажмите, чтобы включить",
        clickToChange: "нажмите, чтобы изменить",
        translatorEnabled: "Переводчик включён",
        translatorDisabled: "Переводчик отключён",
        translateInput: "Перевести введённый текст",
        inputLangChanged: "Язык ввода изменён на:",
        chatLangChanged: "Язык перевода чата изменён на:",
        chatLanguage: "Язык чата",
        inputLanguage: "Язык ввода",
        changeChatLang: "Измените язык чата, щёлкнув правой кнопкой по сообщению.",
        changeInputLang: "Измените язык ввода, нажав на кнопку языка (например, EN) рядом с переводчиком.",
        detectedInterfaceLanguage: "Определённый язык интерфейса:",
        interfaceUpdated: "Язык интерфейса обновлён. Перезагрузите плагин (Ctrl+R) для применения."
    },
    "ja": {
        translate: "翻訳",
        remove: "翻訳を削除",
        changeTarget: "ターゲット言語を変更",
        translated: "翻訳完了！",
        translating: "翻訳中...",
        typeFirst: "最初に何かを入力してください！",
        error: "エラー",
        started: "SimpleTranslator を起動しました！",
        stopped: "SimpleTranslator を停止しました。",
        langChanged: "言語を変更しました：",
        to: "へ",
        contentNotFound: "メッセージの内容が見つかりません。",
        langGroup1: "A–E",
        langGroup2: "F–K",
        langGroup3: "L–Q",
        langGroup4: "R–Z",
        interfaceLanguageOverride: "インターフェース言語（上書き）:",
        autoDetected: "自動（検出）",
        rightClickToDisable: "右クリックで無効化",
        clickToEnable: "クリックで有効化",
        clickToChange: "クリックして変更",
        translatorEnabled: "翻訳機能を有効にしました",
        translatorDisabled: "翻訳機能を無効にしました",
        translateInput: "入力テキストを翻訳",
        inputLangChanged: "入力言語を変更しました：",
        chatLangChanged: "チャット翻訳言語を変更しました：",
        chatLanguage: "チャット言語",
        inputLanguage: "入力言語",
        changeChatLang: "メッセージを右クリックしてチャット言語を変更します。",
        changeInputLang: "翻訳者の隣の言語ボタン（例：EN）をクリックして入力言語を変更します。",
        detectedInterfaceLanguage: "検出されたインターフェース言語：",
        interfaceUpdated: "インターフェース言語を更新しました。プラグインを再読み込み（Ctrl+R）して適用します。"
    },
    "ko": {
        translate: "번역",
        remove: "번역 제거",
        changeTarget: "대상 언어 변경",
        translated: "번역 완료!",
        translating: "번역 중...",
        typeFirst: "먼저 입력하세요!",
        error: "오류",
        started: "SimpleTranslator 시작됨!",
        stopped: "SimpleTranslator 중지됨.",
        langChanged: "언어가 변경됨:",
        to: "으로",
        contentNotFound: "메시지 내용을 찾을 수 없음.",
        langGroup1: "A–E",
        langGroup2: "F–K",
        langGroup3: "L–Q",
        langGroup4: "R–Z",
        interfaceLanguageOverride: "인터페이스 언어 (재정의):",
        autoDetected: "자동 (감지됨)",
        rightClickToDisable: "마우스 오른쪽 클릭으로 비활성화",
        clickToEnable: "클릭하여 활성화",
        clickToChange: "클릭하여 변경",
        translatorEnabled: "번역기 활성화됨",
        translatorDisabled: "번역기 비활성화됨",
        translateInput: "입력 텍스트 번역",
        inputLangChanged: "입력 언어가 변경됨:",
        chatLangChanged: "채팅 번역 언어가 변경됨:",
        chatLanguage: "채팅 언어",
        inputLanguage: "입력 언어",
        changeChatLang: "메시지를 마우스 오른쪽 클릭하여 채팅 언어를 변경하세요.",
        changeInputLang: "번역기 옆의 언어 버튼(예: EN)을 클릭하여 입력 언어를 변경하세요.",
        detectedInterfaceLanguage: "감지된 인터페이스 언어:",
        interfaceUpdated: "인터페이스 언어가 업데이트되었습니다. 플러그인을 다시 로드(Ctrl+R)하여 적용하세요."
    },
    "zh": {
        translate: "翻译",
        remove: "删除翻译",
        changeTarget: "更改目标语言",
        translated: "翻译成功！",
        translating: "翻译中...",
        typeFirst: "请先输入一些内容！",
        error: "错误",
        started: "SimpleTranslator 已启动！",
        stopped: "SimpleTranslator 已停止。",
        langChanged: "语言已更改为：",
        to: "到",
        contentNotFound: "未找到消息内容。",
        langGroup1: "A–E",
        langGroup2: "F–K",
        langGroup3: "L–Q",
        langGroup4: "R–Z",
        interfaceLanguageOverride: "界面语言（覆盖）：",
        autoDetected: "自动（检测）",
        rightClickToDisable: "右键单击以禁用",
        clickToEnable: "单击以启用",
        clickToChange: "单击更改",
        translatorEnabled: "翻译器已启用",
        translatorDisabled: "翻译器已禁用",
        translateInput: "翻译输入文本",
        inputLangChanged: "输入语言已更改为：",
        chatLangChanged: "聊天翻译语言已更改为：",
        chatLanguage: "聊天语言",
        inputLanguage: "输入语言",
        changeChatLang: "右键单击消息更改聊天语言。",
        changeInputLang: "单击翻译器旁边的语言按钮（例如 EN）更改输入语言。",
        detectedInterfaceLanguage: "检测到的界面语言：",
        interfaceUpdated: "界面语言已更新。重新加载插件（Ctrl+R）以应用。"
    },
    "ar": {
        translate: "ترجمة",
        remove: "إزالة الترجمة",
        changeTarget: "تغيير اللغة الهدف",
        translated: "تمت الترجمة!",
        translating: "جارٍ الترجمة...",
        typeFirst: "اكتب شيئًا أولاً!",
        error: "خطأ",
        started: "تم تشغيل SimpleTranslator!",
        stopped: "تم إيقاف SimpleTranslator.",
        langChanged: "تم تغيير اللغة إلى:",
        to: "إلى",
        contentNotFound: "لم يتم العثور على محتوى الرسالة.",
        langGroup1: "أ–د",
        langGroup2: "ذ–ع",
        langGroup3: "ف–ل",
        langGroup4: "م–ي",
        interfaceLanguageOverride: "لغة الواجهة (تجاوز):",
        autoDetected: "تلقائي (تم الكشف)",
        rightClickToDisable: "انقر بزر الماوس الأيمن لتعطيل",
        clickToEnable: "انقر لتفعيل",
        clickToChange: "انقر للتغيير",
        translatorEnabled: "تم تفعيل المترجم",
        translatorDisabled: "تم تعطيل المترجم",
        translateInput: "ترجمة النص المدخل",
        inputLangChanged: "تم تغيير لغة الإدخال إلى:",
        chatLangChanged: "تم تغيير لغة ترجمة الدردشة إلى:",
        chatLanguage: "لغة الدردشة",
        inputLanguage: "لغة الإدخال",
        changeChatLang: "قم بتغيير لغة الدردشة بالنقر بزر الماوس الأيمن على رسالة.",
        changeInputLang: "قم بتغيير لغة الإدخال بالنقر على زر اللغة (مثل EN) بجانب المترجم.",
        detectedInterfaceLanguage: "لغة الواجهة المكتشفة:",
        interfaceUpdated: "تم تحديث لغة الواجهة. أعد تحميل المكون الإضافي (Ctrl+R) للتطبيق."
    },
    "tr": {
        translate: "Çevir",
        remove: "Çeviriyi kaldır",
        changeTarget: "Hedef dili değiştir",
        translated: "Çevrildi!",
        translating: "Çevriliyor...",
        typeFirst: "Önce bir şey yazın!",
        error: "Hata",
        started: "SimpleTranslator başlatıldı!",
        stopped: "SimpleTranslator durduruldu.",
        langChanged: "Dil değiştirildi:",
        to: "olarak",
        contentNotFound: "Mesaj içeriği bulunamadı.",
        langGroup1: "A–E",
        langGroup2: "F–K",
        langGroup3: "L–Q",
        langGroup4: "R–Z",
        interfaceLanguageOverride: "Arayüz dili (geçersiz kıl):",
        autoDetected: "Otomatik (algılandı)",
        rightClickToDisable: "devre dışı bırakmak için sağ tıklayın",
        clickToEnable: "etkinleştirmek için tıklayın",
        clickToChange: "değiştirmek için tıklayın",
        translatorEnabled: "Çevirmen etkinleştirildi",
        translatorDisabled: "Çevirmen devre dışı bırakıldı",
        translateInput: "Yazılan metni çevir",
        inputLangChanged: "Giriş dili değiştirildi:",
        chatLangChanged: "Sohbet çeviri dili değiştirildi:",
        chatLanguage: "Sohbet Dili",
        inputLanguage: "Giriş Dili",
        changeChatLang: "Bir mesaja sağ tıklayarak sohbet dilini değiştirin.",
        changeInputLang: "Çevirmenin yanındaki dil düğmesine (ör. EN) tıklayarak giriş dilini değiştirin.",
        detectedInterfaceLanguage: "Algılanan arayüz dili:",
        interfaceUpdated: "Arayüz dili güncellendi. Uygulamak için eklentiyi yeniden yükleyin (Ctrl+R)."
    },
    "pl": {
        translate: "Tłumacz",
        remove: "Usuń tłumaczenie",
        changeTarget: "Zmień język docelowy",
        translated: "Przetłumaczono!",
        translating: "Tłumaczenie...",
        typeFirst: "Najpierw coś napisz!",
        error: "Błąd",
        started: "SimpleTranslator uruchomiony!",
        stopped: "SimpleTranslator zatrzymany.",
        langChanged: "Zmieniono język na:",
        to: "na",
        contentNotFound: "Nie znaleziono treści wiadomości.",
        langGroup1: "A–E",
        langGroup2: "F–K",
        langGroup3: "L–Q",
        langGroup4: "R–Z",
        interfaceLanguageOverride: "Język interfejsu (nadpisz):",
        autoDetected: "Automatycznie (wykryto)",
        rightClickToDisable: "kliknij prawym przyciskiem, aby wyłączyć",
        clickToEnable: "kliknij, aby włączyć",
        clickToChange: "kliknij, aby zmienić",
        translatorEnabled: "Tłumacz włączony",
        translatorDisabled: "Tłumacz wyłączony",
        translateInput: "Przetłumacz wprowadzony tekst",
        inputLangChanged: "Zmieniono język wprowadzania na:",
        chatLangChanged: "Zmieniono język tłumaczenia czatu na:",
        chatLanguage: "Język czatu",
        inputLanguage: "Język wprowadzania",
        changeChatLang: "Zmień język czatu, klikając prawym przyciskiem na wiadomość.",
        changeInputLang: "Zmień język wprowadzania, klikając przycisk języka (np. EN) obok tłumacza.",
        detectedInterfaceLanguage: "Wykryty język interfejsu:",
        interfaceUpdated: "Zaktualizowano język interfejsu. Przeładuj wtyczkę (Ctrl+R), aby zastosować."
    },
    "nl": {
        translate: "Vertalen",
        remove: "Vertaling verwijderen",
        changeTarget: "Doeltaal wijzigen",
        translated: "Vertaald!",
        translating: "Bezig met vertalen...",
        typeFirst: "Typ eerst iets!",
        error: "Fout",
        started: "SimpleTranslator gestart!",
        stopped: "SimpleTranslator gestopt.",
        langChanged: "Taal gewijzigd naar:",
        to: "naar",
        contentNotFound: "Berichtinhoud niet gevonden.",
        langGroup1: "A–E",
        langGroup2: "F–K",
        langGroup3: "L–Q",
        langGroup4: "R–Z",
        interfaceLanguageOverride: "Interface-taal (overschrijven):",
        autoDetected: "Automatisch (gedetecteerd)",
        rightClickToDisable: "rechtsklik om uit te schakelen",
        clickToEnable: "klik om in te schakelen",
        clickToChange: "klik om te wijzigen",
        translatorEnabled: "Vertaler ingeschakeld",
        translatorDisabled: "Vertaler uitgeschakeld",
        translateInput: "Invoertekst vertalen",
        inputLangChanged: "Invoertaal gewijzigd naar:",
        chatLangChanged: "Chatvertaaltaal gewijzigd naar:",
        chatLanguage: "Chattaal",
        inputLanguage: "Invoertaal",
        changeChatLang: "Wijzig de chattaal door met de rechtermuisknop op een bericht te klikken.",
        changeInputLang: "Wijzig de invoertaal door op de taalknop (bijv. EN) naast de vertaler te klikken.",
        detectedInterfaceLanguage: "Gedetecteerde interfacetaal:",
        interfaceUpdated: "Interfacetaal bijgewerkt. Herlaad de plugin (Ctrl+R) om toe te passen."
    },
    "sv": {
        translate: "Översätt",
        remove: "Ta bort översättning",
        changeTarget: "Ändra målspråk",
        translated: "Översatt!",
        translating: "Översätter...",
        typeFirst: "Skriv något först!",
        error: "Fel",
        started: "SimpleTranslator startad!",
        stopped: "SimpleTranslator stoppad.",
        langChanged: "Språk ändrat till:",
        to: "till",
        contentNotFound: "Meddelandeinnehåll hittades inte.",
        langGroup1: "A–E",
        langGroup2: "F–K",
        langGroup3: "L–Q",
        langGroup4: "R–Z",
        interfaceLanguageOverride: "Gränssnittsspråk (åsidosätt):",
        autoDetected: "Automatisk (upptäckt)",
        rightClickToDisable: "högerklicka för att inaktivera",
        clickToEnable: "klicka för att aktivera",
        clickToChange: "klicka för att ändra",
        translatorEnabled: "Översättare aktiverad",
        translatorDisabled: "Översättare inaktiverad",
        translateInput: "Översätt inmatad text",
        inputLangChanged: "Inmatningsspråk ändrat till:",
        chatLangChanged: "Chattöversättningsspråk ändrat till:",
        chatLanguage: "Chattspråk",
        inputLanguage: "Inmatningsspråk",
        changeChatLang: "Ändra chattspråk genom att högerklicka på ett meddelande.",
        changeInputLang: "Ändra inmatningsspråk genom att klicka på språkknappen (t.ex. EN) bredvid översättaren.",
        detectedInterfaceLanguage: "Upptäckt gränssnittsspråk:",
        interfaceUpdated: "Gränssnittsspråk uppdaterat. Ladda om plugin (Ctrl+R) för att tillämpa."
    },
    "vi": {
        translate: "Dịch",
        remove: "Xóa bản dịch",
        changeTarget: "Thay đổi ngôn ngữ đích",
        translated: "Đã dịch!",
        translating: "Đang dịch...",
        typeFirst: "Hãy nhập gì đó trước!",
        error: "Lỗi",
        started: "SimpleTranslator đã khởi động!",
        stopped: "SimpleTranslator đã dừng.",
        langChanged: "Ngôn ngữ đã đổi thành:",
        to: "sang",
        contentNotFound: "Không tìm thấy nội dung tin nhắn.",
        langGroup1: "A–E",
        langGroup2: "F–K",
        langGroup3: "L–Q",
        langGroup4: "R–Z",
        interfaceLanguageOverride: "Ngôn ngữ giao diện (ghi đè):",
        autoDetected: "Tự động (đã phát hiện)",
        rightClickToDisable: "nhấp chuột phải để tắt",
        clickToEnable: "nhấp để bật",
        clickToChange: "nhấp để thay đổi",
        translatorEnabled: "Trình dịch đã được bật",
        translatorDisabled: "Trình dịch đã bị tắt",
        translateInput: "Dịch văn bản nhập",
        inputLangChanged: "Ngôn ngữ nhập đã đổi thành:",
        chatLangChanged: "Ngôn ngữ dịch chat đã đổi thành:",
        chatLanguage: "Ngôn ngữ Chat",
        inputLanguage: "Ngôn ngữ Nhập",
        changeChatLang: "Thay đổi ngôn ngữ chat bằng cách nhấp chuột phải vào tin nhắn.",
        changeInputLang: "Thay đổi ngôn ngữ nhập bằng cách nhấp vào nút ngôn ngữ (vd: EN) bên cạnh trình dịch.",
        detectedInterfaceLanguage: "Ngôn ngữ giao diện được phát hiện:",
        interfaceUpdated: "Ngôn ngữ giao diện đã được cập nhật. Tải lại plugin (Ctrl+R) để áp dụng."
    },
    "da": {
        translate: "Oversæt",
        remove: "Fjern oversættelse",
        changeTarget: "Skift målsprog",
        translated: "Oversat!",
        translating: "Oversætter...",
        typeFirst: "Skriv noget først!",
        error: "Fejl",
        started: "SimpleTranslator startet!",
        stopped: "SimpleTranslator stoppet.",
        langChanged: "Sprog ændret til:",
        to: "til",
        contentNotFound: "Beskedindhold ikke fundet.",
        langGroup1: "A–E",
        langGroup2: "F–K",
        langGroup3: "L–Q",
        langGroup4: "R–Z",
        interfaceLanguageOverride: "Grænsefladesprog (tilsidesæt):",
        autoDetected: "Automatisk (registreret)",
        rightClickToDisable: "højreklik for at deaktivere",
        clickToEnable: "klik for at aktivere",
        clickToChange: "klik for at ændre",
        translatorEnabled: "Oversætter aktiveret",
        translatorDisabled: "Oversætter deaktiveret",
        translateInput: "Oversæt inputtekst",
        inputLangChanged: "Inputsprog ændret til:",
        chatLangChanged: "Chatoversættelsessprog ændret til:",
        chatLanguage: "Chatsprog",
        inputLanguage: "Inputsprog",
        changeChatLang: "Skift chatsprog ved at højreklikke på en besked.",
        changeInputLang: "Skift inputsprog ved at klikke på sprogknappen (f.eks. EN) ved siden af oversætteren.",
        detectedInterfaceLanguage: "Registreret grænsefladesprog:",
        interfaceUpdated: "Grænsefladesprog opdateret. Genindlæs plugin (Ctrl+R) for at anvende."
    },
    "no": {
        translate: "Oversett",
        remove: "Fjern oversettelse",
        changeTarget: "Endre målspråk",
        translated: "Oversatt!",
        translating: "Oversetter...",
        typeFirst: "Skriv noe først!",
        error: "Feil",
        started: "SimpleTranslator startet!",
        stopped: "SimpleTranslator stoppet.",
        langChanged: "Språk endret til:",
        to: "til",
        contentNotFound: "Meldingens innhold ikke funnet.",
        langGroup1: "A–E",
        langGroup2: "F–K",
        langGroup3: "L–Q",
        langGroup4: "R–Z",
        interfaceLanguageOverride: "Grensesnittspråk (overstyring):",
        autoDetected: "Automatisk (oppdaget)",
        rightClickToDisable: "høyreklikk for å deaktivere",
        clickToEnable: "klikk for å aktivere",
        clickToChange: "klikk for å endre",
        translatorEnabled: "Oversetter aktivert",
        translatorDisabled: "Oversetter deaktivert",
        translateInput: "Oversett inntekst",
        inputLangChanged: "Innspråk endret til:",
        chatLangChanged: "Chatoversettelsesspråk endret til:",
        chatLanguage: "Chatspråk",
        inputLanguage: "Innspråk",
        changeChatLang: "Endre chatspråk ved å høyreklikke på en melding.",
        changeInputLang: "Endre innspråk ved å klikke på språkknappen (f.eks. EN) ved siden av oversetteren.",
        detectedInterfaceLanguage: "Oppdaget grensesnittspråk:",
        interfaceUpdated: "Grensesnittspråk oppdatert. Last inn plugin på nytt (Ctrl+R) for å bruke."
    },
    "fi": {
        translate: "Käännä",
        remove: "Poista käännös",
        changeTarget: "Vaihda kohdekieli",
        translated: "Käännetty!",
        translating: "Käännetään...",
        typeFirst: "Kirjoita jotain ensin!",
        error: "Virhe",
        started: "SimpleTranslator käynnistetty!",
        stopped: "SimpleTranslator pysäytetty.",
        langChanged: "Kieli vaihdettu:",
        to: "kohteeseen",
        contentNotFound: "Viestin sisältöä ei löytynyt.",
        langGroup1: "A–E",
        langGroup2: "F–K",
        langGroup3: "L–Q",
        langGroup4: "R–Z",
        interfaceLanguageOverride: "Käyttöliittymän kieli (ohitus):",
        autoDetected: "Automaattinen (havaittu)",
        rightClickToDisable: "poista käytöstä hiiren kakkospainikkeella",
        clickToEnable: "ota käyttöön napsauttamalla",
        clickToChange: "napsauta muuttaaksesi",
        translatorEnabled: "Kääntäjä otettu käyttöön",
        translatorDisabled: "Kääntäjä poistettu käytöstä",
        translateInput: "Käännä syötetty teksti",
        inputLangChanged: "Syöttökieli vaihdettu:",
        chatLangChanged: "Chatin käännöskieli vaihdettu:",
        chatLanguage: "Chatin kieli",
        inputLanguage: "Syöttökieli",
        changeChatLang: "Vaihda chatin kieli napsauttamalla viestiä hiiren oikealla painikkeella.",
        changeInputLang: "Vaihda syöttökieli napsauttamalla kielipainiketta (esim. EN) kääntäjän vieressä.",
        detectedInterfaceLanguage: "Havaittu käyttöliittymän kieli:",
        interfaceUpdated: "Käyttöliittymän kieli päivitetty. Lataa plugin uudelleen (Ctrl+R) ottaaksesi käyttöön."
    },
    "hr": {
        translate: "Prevedi",
        remove: "Ukloni prijevod",
        changeTarget: "Promijeni ciljni jezik",
        translated: "Prevedeno!",
        translating: "Prevođenje...",
        typeFirst: "Prvo nešto napišite!",
        error: "Greška",
        started: "SimpleTranslator pokrenut!",
        stopped: "SimpleTranslator zaustavljen.",
        langChanged: "Jezik promijenjen u:",
        to: "u",
        contentNotFound: "Sadržaj poruke nije pronađen.",
        langGroup1: "A–E",
        langGroup2: "F–K",
        langGroup3: "L–Q",
        langGroup4: "R–Z",
        interfaceLanguageOverride: "Jezik sučelja (nadjačaj):",
        autoDetected: "Automatski (otkriveno)",
        rightClickToDisable: "desni klik za isključivanje",
        clickToEnable: "kliknite za uključivanje",
        clickToChange: "kliknite za promjenu",
        translatorEnabled: "Prevoditelj omogućen",
        translatorDisabled: "Prevoditelj onemogućen",
        translateInput: "Prevedi uneseni tekst",
        inputLangChanged: "Jezik unosa promijenjen u:",
        chatLangChanged: "Jezik prijevoda chata promijenjen u:",
        chatLanguage: "Jezik chata",
        inputLanguage: "Jezik unosa",
        changeChatLang: "Promijenite jezik chata desnim klikom na poruku.",
        changeInputLang: "Promijenite jezik unosa klikom na gumb za jezik (npr. EN) pored prevoditelja.",
        detectedInterfaceLanguage: "Otkriveni jezik sučelja:",
        interfaceUpdated: "Jezik sučelja ažuriran. Ponovno učitajte plugin (Ctrl+R) za primjenu."
    },
    "lt": {
        translate: "Versti",
        remove: "Pašalinti vertimą",
        changeTarget: "Pakeisti tikslinę kalbą",
        translated: "Išversta!",
        translating: "Verčiama...",
        typeFirst: "Pirmiausia ką nors įveskite!",
        error: "Klaida",
        started: "SimpleTranslator paleistas!",
        stopped: "SimpleTranslator sustabdytas.",
        langChanged: "Kalba pakeista į:",
        to: "į",
        contentNotFound: "Pranešimo turinys nerastas.",
        langGroup1: "A–E",
        langGroup2: "F–K",
        langGroup3: "L–Q",
        langGroup4: "R–Z",
        interfaceLanguageOverride: "Sąsajos kalba (perrašyti):",
        autoDetected: "Automatinis (aptiktas)",
        rightClickToDisable: "dešiniuoju spustelėkite, kad išjungtumėte",
        clickToEnable: "spustelėkite, kad įjungtumėte",
        clickToChange: "spustelėkite, kad pakeistumėte",
        translatorEnabled: "Vertėjas įjungtas",
        translatorDisabled: "Vertėjas išjungtas",
        translateInput: "Išversti įvestą tekstą",
        inputLangChanged: "Įvesties kalba pakeista į:",
        chatLangChanged: "Pokalbio vertimo kalba pakeista į:",
        chatLanguage: "Pokalbio kalba",
        inputLanguage: "Įvesties kalba",
        changeChatLang: "Pakeiskite pokalbio kalbą dešiniuoju pelės klavišu spustelėję pranešimą.",
        changeInputLang: "Pakeiskite įvesties kalbą spustelėdami kalbos mygtuką (pvz., EN) šalia vertėjo.",
        detectedInterfaceLanguage: "Aptikta sąsajos kalba:",
        interfaceUpdated: "Sąsajos kalba atnaujinta. Iš naujo įkelkite įskiepį (Ctrl+R), kad pritaikytumėte."
    },
    "hu": {
        translate: "Fordítás",
        remove: "Fordítás eltávolítása",
        changeTarget: "Célnyelv módosítása",
        translated: "Lefordítva!",
        translating: "Fordítás folyamatban...",
        typeFirst: "Először írj valamit!",
        error: "Hiba",
        started: "SimpleTranslator elindult!",
        stopped: "SimpleTranslator leállítva.",
        langChanged: "Nyelv módosítva:",
        to: "erre",
        contentNotFound: "Üzenet tartalma nem található.",
        langGroup1: "A–E",
        langGroup2: "F–K",
        langGroup3: "L–Q",
        langGroup4: "R–Z",
        interfaceLanguageOverride: "Felület nyelve (felülbírálás):",
        autoDetected: "Automatikus (észlelt)",
        rightClickToDisable: "jobb klikk a kikapcsoláshoz",
        clickToEnable: "kattints a bekapcsoláshoz",
        clickToChange: "kattints a módosításhoz",
        translatorEnabled: "Fordító bekapcsolva",
        translatorDisabled: "Fordító kikapcsolva",
        translateInput: "Bemeneti szöveg fordítása",
        inputLangChanged: "Bemeneti nyelv módosítva:",
        chatLangChanged: "Csevegés fordítási nyelve módosítva:",
        chatLanguage: "Csevegés nyelve",
        inputLanguage: "Bemeneti nyelv",
        changeChatLang: "Módosítsa a csevegés nyelvét az üzenet jobb gombbal történő kattintásával.",
        changeInputLang: "Módosítsa a bemeneti nyelvet a fordító melletti nyelvgombra (pl. EN) kattintva.",
        detectedInterfaceLanguage: "Észlelt felületi nyelv:",
        interfaceUpdated: "A felületi nyelv frissítve. Töltse be újra a bővítményt (Ctrl+R) az alkalmazáshoz."
    },
    "ro": {
        translate: "Tradu",
        remove: "Elimină traducerea",
        changeTarget: "Schimbă limba țintă",
        translated: "Tradus!",
        translating: "Se traduce...",
        typeFirst: "Scrie ceva mai întâi!",
        error: "Eroare",
        started: "SimpleTranslator pornit!",
        stopped: "SimpleTranslator oprit.",
        langChanged: "Limba schimbată în:",
        to: "în",
        contentNotFound: "Conținutul mesajului nu a fost găsit.",
        langGroup1: "A–E",
        langGroup2: "F–K",
        langGroup3: "L–Q",
        langGroup4: "R–Z",
        interfaceLanguageOverride: "Limba interfeței (suprascriere):",
        autoDetected: "Automat (detectat)",
        rightClickToDisable: "clic dreapta pentru a dezactiva",
        clickToEnable: "clic pentru a activa",
        clickToChange: "clic pentru a schimba",
        translatorEnabled: "Traducător activat",
        translatorDisabled: "Traducător dezactivat",
        translateInput: "Tradu textul introdus",
        inputLangChanged: "Limba de intrare schimbată în:",
        chatLangChanged: "Limba de traducere a chat-ului schimbată în:",
        chatLanguage: "Limba Chat",
        inputLanguage: "Limba de Intrare",
        changeChatLang: "Schimbați limba chat-ului făcând clic dreapta pe un mesaj.",
        changeInputLang: "Schimbați limba de intrare făcând clic pe butonul de limbă (ex: EN) de lângă traducător.",
        detectedInterfaceLanguage: "Limba interfeței detectată:",
        interfaceUpdated: "Limba interfeței actualizată. Reîncărcați plugin-ul (Ctrl+R) pentru a aplica."
    },
    "cs": {
        translate: "Přeložit",
        remove: "Odebrat překlad",
        changeTarget: "Změnit cílový jazyk",
        translated: "Přeloženo!",
        translating: "Překládání...",
        typeFirst: "Nejprve něco napište!",
        error: "Chyba",
        started: "SimpleTranslator spuštěn!",
        stopped: "SimpleTranslator zastaven.",
        langChanged: "Jazyk změněn na:",
        to: "do",
        contentNotFound: "Obsah zprávy nenalezen.",
        langGroup1: "A–E",
        langGroup2: "F–K",
        langGroup3: "L–Q",
        langGroup4: "R–Z",
        interfaceLanguageOverride: "Jazyk rozhraní (přepsat):",
        autoDetected: "Automaticky (zjištěno)",
        rightClickToDisable: "klikněte pravým tlačítkem pro deaktivaci",
        clickToEnable: "kliknutím aktivujete",
        clickToChange: "kliknutím změníte",
        translatorEnabled: "Překladač aktivován",
        translatorDisabled: "Překladač deaktivován",
        translateInput: "Přeložit vstupní text",
        inputLangChanged: "Vstupní jazyk změněn na:",
        chatLangChanged: "Jazyk překladu chatu změněn na:",
        chatLanguage: "Jazyk chatu",
        inputLanguage: "Vstupní jazyk",
        changeChatLang: "Změňte jazyk chatu kliknutím pravým tlačítkem na zprávu.",
        changeInputLang: "Změňte vstupní jazyk kliknutím na tlačítko jazyka (např. EN) vedle překladače.",
        detectedInterfaceLanguage: "Zjištěný jazyk rozhraní:",
        interfaceUpdated: "Jazyk rozhraní aktualizován. Znovu načtěte plugin (Ctrl+R) pro použití."
    },
    "el": {
        translate: "Μετάφραση",
        remove: "Αφαίρεση μετάφρασης",
        changeTarget: "Αλλαγή γλώσσας-στόχου",
        translated: "Μεταφράστηκε!",
        translating: "Μετάφραση σε εξέλιξη...",
        typeFirst: "Πληκτρολογήστε κάτι πρώτα!",
        error: "Σφάλμα",
        started: "Το SimpleTranslator ξεκίνησε!",
        stopped: "Το SimpleTranslator σταμάτησε.",
        langChanged: "Η γλώσσα άλλαξε σε:",
        to: "σε",
        contentNotFound: "Το περιεχόμενο του μηνύματος δεν βρέθηκε.",
        langGroup1: "Α–Ε",
        langGroup2: "Ζ–Κ",
        langGroup3: "Λ–Ο",
        langGroup4: "Π–Ω",
        interfaceLanguageOverride: "Γλώσσα διεπαφής (παράκαμψη):",
        autoDetected: "Αυτόματο (εντοπίστηκε)",
        rightClickToDisable: "δεξί κλικ για απενεργοποίηση",
        clickToEnable: "κλικ για ενεργοποίηση",
        clickToChange: "κλικ για αλλαγή",
        translatorEnabled: "Ο μεταφραστής ενεργοποιήθηκε",
        translatorDisabled: "Ο μεταφραστής απενεργοποιήθηκε",
        translateInput: "Μετάφραση κειμένου εισαγωγής",
        inputLangChanged: "Η γλώσσα εισόδου άλλαξε σε:",
        chatLangChanged: "Η γλώσσα μετάφρασης συνομιλίας άλλαξε σε:",
        chatLanguage: "Γλώσσα Συνομιλίας",
        inputLanguage: "Γλώσσα Εισαγωγής",
        changeChatLang: "Αλλάξτε τη γλώσσα συνομιλίας κάνοντας δεξί κλικ σε ένα μήνυμα.",
        changeInputLang: "Αλλάξτε τη γλώσσα εισαγωγής κάνοντας κλικ στο κουμπί γλώσσας (π.χ. EN) δίπλα στον μεταφραστή.",
        detectedInterfaceLanguage: "Εντοπισμένη γλώσσα διεπαφής:",
        interfaceUpdated: "Η γλώσσα διεπαφής ενημερώθηκε. Φορτώστε ξανά το πρόσθετο (Ctrl+R) για εφαρμογή."
    },
    "bg": {
        translate: "Превод",
        remove: "Премахване на превода",
        changeTarget: "Промяна на целевия език",
        translated: "Преведено!",
        translating: "Превежда се...",
        typeFirst: "Първо въведете нещо!",
        error: "Грешка",
        started: "SimpleTranslator стартира!",
        stopped: "SimpleTranslator спря.",
        langChanged: "Езикът е променен на:",
        to: "на",
        contentNotFound: "Съдържанието на съобщението не е намерено.",
        langGroup1: "А–Е",
        langGroup2: "Ж–К",
        langGroup3: "Л–П",
        langGroup4: "Р–Я",
        interfaceLanguageOverride: "Език на интерфейса (заместване):",
        autoDetected: "Автоматично (открит)",
        rightClickToDisable: "щракнете с десен бутон за деактивиране",
        clickToEnable: "щракнете, за да активирате",
        clickToChange: "щракнете, за да промените",
        translatorEnabled: "Преводачът е активиран",
        translatorDisabled: "Преводачът е деактивиран",
        translateInput: "Превод на въведения текст",
        inputLangChanged: "Езикът на въвеждане е променен на:",
        chatLangChanged: "Езикът за превод на чата е променен на:",
        chatLanguage: "Език на чата",
        inputLanguage: "Език на въвеждане",
        changeChatLang: "Променете езика на чата, като щракнете с десен бутон върху съобщение.",
        changeInputLang: "Променете езика на въвеждане, като щракнете върху бутона за език (напр. EN) до преводача.",
        detectedInterfaceLanguage: "Открит език на интерфейса:",
        interfaceUpdated: "Езикът на интерфейса е актуализиран. Презаредете добавката (Ctrl+R), за да се приложи."
    },
    "uk": {
        translate: "Перекласти",
        remove: "Видалити переклад",
        changeTarget: "Змінити цільову мову",
        translated: "Перекладено!",
        translating: "Переклад...",
        typeFirst: "Спочатку введіть щось!",
        error: "Помилка",
        started: "SimpleTranslator запущено!",
        stopped: "SimpleTranslator зупинено.",
        langChanged: "Мову змінено на:",
        to: "на",
        contentNotFound: "Вміст повідомлення не знайдено.",
        langGroup1: "А–Е",
        langGroup2: "Ж–К",
        langGroup3: "Л–П",
        langGroup4: "Р–Я",
        interfaceLanguageOverride: "Мова інтерфейсу (перевизначення):",
        autoDetected: "Автоматично (виявлено)",
        rightClickToDisable: "клацніть правою кнопкою, щоб вимкнути",
        clickToEnable: "натисніть, щоб увімкнути",
        clickToChange: "натисніть, щоб змінити",
        translatorEnabled: "Перекладач увімкнено",
        translatorDisabled: "Перекладач вимкнено",
        translateInput: "Перекласти введений текст",
        inputLangChanged: "Мову введення змінено на:",
        chatLangChanged: "Мову перекладу чату змінено на:",
        chatLanguage: "Мова чату",
        inputLanguage: "Мова введення",
        changeChatLang: "Змініть мову чату, клацнувши правою кнопкою миші на повідомленні.",
        changeInputLang: "Змініть мову введення, клацнувши на кнопці мови (напр. EN) поруч із перекладачем.",
        detectedInterfaceLanguage: "Виявлена мова інтерфейсу:",
        interfaceUpdated: "Мову інтерфейсу оновлено. Перезавантажте плагін (Ctrl+R), щоб застосувати."
    },
    "hi": {
        translate: "अनुवाद करें",
        remove: "अनुवाद हटाएं",
        changeTarget: "लक्ष्य भाषा बदलें",
        translated: "अनुवादित!",
        translating: "अनुवाद हो रहा है...",
        typeFirst: "पहले कुछ टाइप करें!",
        error: "त्रुटि",
        started: "SimpleTranslator शुरू हो गया!",
        stopped: "SimpleTranslator बंद हो गया।",
        langChanged: "भाषा बदली गई:",
        to: "से",
        contentNotFound: "संदेश सामग्री नहीं मिली।",
        langGroup1: "A–E",
        langGroup2: "F–K",
        langGroup3: "L–Q",
        langGroup4: "R–Z",
        interfaceLanguageOverride: "इंटरफ़ेस भाषा (ओवरराइड):",
        autoDetected: "स्वचालित (पता लगाया गया)",
        rightClickToDisable: "बंद करने के लिए राइट-क्लिक करें",
        clickToEnable: "चालू करने के लिए क्लिक करें",
        clickToChange: "बदलने के लिए क्लिक करें",
        translatorEnabled: "अनुवादक चालू है",
        translatorDisabled: "अनुवादक बंद है",
        translateInput: "इनपुट टेक्स्ट का अनुवाद करें",
        inputLangChanged: "इनपुट भाषा बदली गई:",
        chatLangChanged: "चैट अनुवाद भाषा बदली गई:",
        chatLanguage: "चैट भाषा",
        inputLanguage: "इनपुट भाषा",
        changeChatLang: "किसी संदेश पर राइट-क्लिक करके चैट भाषा बदलें।",
        changeInputLang: "अनुवादक के पास भाषा बटन (जैसे EN) पर क्लिक करके इनपुट भाषा बदलें।",
        detectedInterfaceLanguage: "पता लगाई गई इंटरफ़ेस भाषा:",
        interfaceUpdated: "इंटरफ़ेस भाषा अपडेट हो गई। लागू करने के लिए प्लगइन रीलोड करें (Ctrl+R)।"
    },
    "th": {
        translate: "แปล",
        remove: "ลบคำแปล",
        changeTarget: "เปลี่ยนภาษาเป้าหมาย",
        translated: "แปลแล้ว!",
        translating: "กำลังแปล...",
        typeFirst: "พิมพ์ข้อความก่อน!",
        error: "ข้อผิดพลาด",
        started: "SimpleTranslator เริ่มทำงานแล้ว!",
        stopped: "SimpleTranslator หยุดทำงานแล้ว",
        langChanged: "เปลี่ยนภาษาเป็น:",
        to: "เป็น",
        contentNotFound: "ไม่พบเนื้อหาข้อความ",
        langGroup1: "A–E",
        langGroup2: "F–K",
        langGroup3: "L–Q",
        langGroup4: "R–Z",
        interfaceLanguageOverride: "ภาษาอินเทอร์เฟซ (กำหนดเอง):",
        autoDetected: "อัตโนมัติ (ตรวจพบ)",
        rightClickToDisable: "คลิกขวาเพื่อปิดใช้งาน",
        clickToEnable: "คลิกเพื่อเปิดใช้งาน",
        clickToChange: "คลิกเพื่อเปลี่ยน",
        translatorEnabled: "เปิดใช้งานตัวแปลแล้ว",
        translatorDisabled: "ปิดใช้งานตัวแปลแล้ว",
        translateInput: "แปลข้อความที่ป้อน",
        inputLangChanged: "เปลี่ยนภาษาที่ป้อนเป็น:",
        chatLangChanged: "เปลี่ยนภาษาแปลแชทเป็น:",
        chatLanguage: "ภาษาแชท",
        inputLanguage: "ภาษาที่ป้อน",
        changeChatLang: "เปลี่ยนภาษาแชทโดยคลิกขวาที่ข้อความ",
        changeInputLang: "เปลี่ยนภาษาที่ป้อนโดยคลิกปุ่มภาษา (เช่น EN) ข้างตัวแปล",
        detectedInterfaceLanguage: "ภาษาอินเทอร์เฟซที่ตรวจพบ:",
        interfaceUpdated: "อัปเดตภาษาอินเทอร์เฟซแล้ว รีโหลดปลั๊กอิน (Ctrl+R) เพื่อใช้งาน"
    },
    "zh-TW": {
        translate: "翻譯",
        remove: "移除翻譯",
        changeTarget: "變更目標語言",
        translated: "已翻譯！",
        translating: "翻譯中...",
        typeFirst: "請先輸入內容！",
        error: "錯誤",
        started: "SimpleTranslator 已啟動！",
        stopped: "SimpleTranslator 已停止。",
        langChanged: "語言已變更為：",
        to: "為",
        contentNotFound: "找不到訊息內容。",
        langGroup1: "A–E",
        langGroup2: "F–K",
        langGroup3: "L–Q",
        langGroup4: "R–Z",
        interfaceLanguageOverride: "介面語言（覆寫）：",
        autoDetected: "自動（已偵測）",
        rightClickToDisable: "右鍵點擊以停用",
        clickToEnable: "點擊以啟用",
        clickToChange: "點擊以變更",
        translatorEnabled: "翻譯器已啟用",
        translatorDisabled: "翻譯器已停用",
        translateInput: "翻譯輸入文字",
        inputLangChanged: "輸入語言已變更為：",
        chatLangChanged: "聊天翻譯語言已變更為：",
        chatLanguage: "聊天語言",
        inputLanguage: "輸入語言",
        changeChatLang: "在訊息上按右鍵以變更聊天語言。",
        changeInputLang: "點擊翻譯器旁的語言按鈕（例如 EN）以變更輸入語言。",
        detectedInterfaceLanguage: "偵測到的介面語言：",
        interfaceUpdated: "介面語言已更新。請重新載入外掛（Ctrl+R）以套用。"
    }
};

function getUserLanguage() {
    const force = Data.load(PLUGIN_ID, "forceLang");
    if (force && force !== "auto" && LOCALE[force]) return force;

    let lang = document.documentElement.lang || document.documentElement.getAttribute('lang') || '';
    let base = lang.split('-')[0].toLowerCase();

    if (lang.toLowerCase() === 'pt-pt') return 'pt-PT';
    if (lang.startsWith('es-419') || lang.startsWith('es-LA') || lang === 'es-AR' || lang === 'es-MX') base = 'es';
    if (lang === 'zh-TW' || lang === 'zh-HK') return 'zh-TW';
    if (lang === 'zh-CN' || lang === 'zh') return 'zh';

    if (base) {
        return LOCALE[base] ? base : 'en';
    }

    lang = navigator.language || navigator.languages?.[0] || 'en';
    base = lang.split('-')[0].toLowerCase();
    if (lang.toLowerCase() === 'pt-pt') return 'pt-PT';
    return LOCALE[base] ? base : 'en';
}

function getLocaleString(key) {
    const lang = getUserLanguage();
    return LOCALE[lang]?.[key] || LOCALE['en'][key] || key;
}

function getLanguagesList() {
    const lang = getUserLanguage();
    return LANGUAGES_LOCALIZED[lang] || LANGUAGES_LOCALIZED['en'];
}

function getShowOriginalLabel(targetLang) {
    const base = targetLang.split('-')[0];
    if (targetLang === 'zh-TW') return SHOW_ORIGINAL_LABELS['zh-TW'];
    return SHOW_ORIGINAL_LABELS[base] || SHOW_ORIGINAL_LABELS['en'];
}

function findChildrenArray(element) {
    if (!element?.props) return null;
    if (Array.isArray(element.props.children)) return element.props.children;
    if (element.props.children?.props) return findChildrenArray(element.props.children);
    return null;
}

function getContentElement(messageId) {
    return document.getElementById(`message-content-${messageId}`) ||
           document.querySelector(`[id="message-content-${messageId}"]`) ||
           document.querySelector(`li[id*="${messageId}"] [class*="messageContent"]`);
}

function getReplyContentElement(messageId) {
    const row = document.querySelector(`li[id*="${messageId}"]`);
    if (!row) return null;
    const replyContainer = row.querySelector('[class*="repliedMessage"]');
    if (!replyContainer) return null;
    return replyContainer.querySelector('[class*="replyContent"]') ||
           replyContainer.querySelector('[class*="messageContent"]') ||
           replyContainer;
}

const REPLY_STRUCTURAL_CLASS_PATTERN = /username|botTag|badge|edited|timestamp|Timestamp|icon|avatar|mention/i;

function getReplyRawText(replyEl) {
    if (!replyEl) return "";
    const clone = replyEl.cloneNode(true);
    clone.querySelectorAll('a, time, [aria-label*="editado" i], [aria-label*="edited" i]')
        .forEach(el => el.remove());
    clone.querySelectorAll('[class]').forEach(el => {
        if (REPLY_STRUCTURAL_CLASS_PATTERN.test(el.className || "")) el.remove();
    });

    let text = clone.textContent || "";

    text = text.replace(/\(editado\)[\s\S]*$/i, "").replace(/\(edited\)[\s\S]*$/i, "");

    return text.trim();
}

const TRANSLATION_CACHE = new Map();
const TRANSLATION_CACHE_MAX = 500;

function getCacheKey(text, targetLang) {
    return `${targetLang}::${text}`;
}

function cacheSet(key, value) {
    if (TRANSLATION_CACHE.size >= TRANSLATION_CACHE_MAX) {
        const oldestKey = TRANSLATION_CACHE.keys().next().value;
        TRANSLATION_CACHE.delete(oldestKey);
    }
    TRANSLATION_CACHE.set(key, value);
}

async function fetchTranslation(text, targetLang) {
    const cacheKey = getCacheKey(text, targetLang);
    if (TRANSLATION_CACHE.has(cacheKey)) {
        return TRANSLATION_CACHE.get(cacheKey);
    }

    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await BdApi.Net.fetch(url);
    if (!res.ok) throw new Error("Network error");
    const data = await res.json();
    if (!data?.[0]?.[0]?.[0]) throw new Error("Invalid response");
    const translated = data[0].map(chunk => chunk[0]).join('');

    cacheSet(cacheKey, translated);
    return translated;
}

const LANG_ABBR = {
    "ar": "AR", "zh": "ZH", "nl": "NL", "en": "EN", "fr": "FR",
    "de": "DE", "he": "HE", "hi": "HI", "id": "ID", "it": "IT",
    "ja": "JA", "ko": "KO", "pl": "PL", "pt": "PT", "pt-PT": "PT-PT", "ru": "RU",
    "es": "ES", "sv": "SV", "th": "TH", "tr": "TR", "vi": "VI",
    "da": "DA", "no": "NO", "fi": "FI", "hr": "HR", "lt": "LT",
    "hu": "HU", "ro": "RO", "cs": "CS", "el": "EL", "bg": "BG",
    "uk": "UA", "zh-TW": "ZH-TW"
};

module.exports = class SimpleTranslator {
    constructor(meta) {
        this.meta = meta;
        this.targetLang = Data.load(PLUGIN_ID, "targetLang") || "en";
        this.inputTargetLang = Data.load(PLUGIN_ID, "inputTargetLang") || "en";
        this._translationEnabled = Data.load(PLUGIN_ID, "translationEnabled") !== false;
        this._menuPatch = null;
        this._inputButton = null;
        this._langButton = null;
        this._dropdownCloseTimer = null;
        this._styleElement = null;
        this._observer = null;
        this._langObserver = null;
        this._navDispatcher = null;
        this._navHandler = null;
        this._navEvents = null;
        this._navDebounce = null;
        this._obsDebounce = null;
        this._inputButtonsInterval = null;
        this._translatedMessages = new Map();
        this._messageObservers = new Map();
        this._replyOriginalTextNodes = new Map();
    }

    start() {
        this._injectStyles();
        this._setupLanguageObserver();

        this._menuPatch = ContextMenu.patch("message", (tree, props) => {
            const message = props?.message;
            if (!message?.content) return;

            const contentEl = getContentElement(message.id);
            const replyEl = getReplyContentElement(message.id);

            const currentElLang = contentEl?.querySelector("[data-st-translated]")?.getAttribute("data-st-translated") ||
                                 replyEl?.getAttribute("data-st-translated");

            const isTargetTranslated = currentElLang === this.targetLang;

            const separator = ContextMenu.buildItem({ type: "separator" });

            const mainItem = ContextMenu.buildItem({
                label: isTargetTranslated ? getLocaleString("remove") : getLocaleString("translate"),
                action: () => {
                    if (isTargetTranslated) {
                        this._removeTranslation(message.id);
                    } else {
                        if (currentElLang) {
                            this._removeTranslation(message.id);
                        }
                        this._translateMessage(message);
                    }
                }
            });

            const currentLanguages = getLanguagesList();
            const sortedCodes = Object.keys(currentLanguages).sort((a, b) =>
                currentLanguages[a].localeCompare(currentLanguages[b])
            );

            const groups = { "A-E": [], "F-K": [], "L-Q": [], "R-Z": [] };
            const englishNames = {
                "ar": "Arabic", "zh": "Chinese", "nl": "Dutch", "en": "English", "fr": "French",
                "de": "German", "he": "Hebrew", "hi": "Hindi", "id": "Indonesian", "it": "Italian",
                "ja": "Japanese", "ko": "Korean", "pl": "Polish", "pt": "Portuguese", "pt-PT": "Portuguese",
                "ru": "Russian", "es": "Spanish", "sv": "Swedish", "th": "Thai", "tr": "Turkish", "vi": "Vietnamese",
                "da": "Danish", "no": "Norwegian", "fi": "Finnish", "hr": "Croatian", "lt": "Lithuanian",
                "hu": "Hungarian", "ro": "Romanian", "cs": "Czech", "el": "Greek", "bg": "Bulgarian",
                "uk": "Ukrainian", "zh-TW": "Chinese"
            };

            for (const code of sortedCodes) {
                const name = englishNames[code] || currentLanguages[code];
                const firstLetter = name.charAt(0).toUpperCase();
                if (firstLetter <= 'E') groups["A-E"].push(code);
                else if (firstLetter <= 'K') groups["F-K"].push(code);
                else if (firstLetter <= 'Q') groups["L-Q"].push(code);
                else groups["R-Z"].push(code);
            }

            const buildLangItems = (codes) => {
                return codes.map(code => {
                    const name = currentLanguages[code];
                    return ContextMenu.buildItem({
                        label: `${code === this.targetLang ? "✅ " : ""}${name}`,
                        action: () => {
                            this.targetLang = code;
                            Data.save(PLUGIN_ID, "targetLang", this.targetLang);
                            UI.showToast(`${getLocaleString("chatLangChanged")} ${name}`, { type: "success" });
                        }
                    });
                });
            };

            const submenu1 = ContextMenu.buildItem({
                label: getLocaleString("langGroup1"),
                children: buildLangItems(groups["A-E"])
            });
            const submenu2 = ContextMenu.buildItem({
                label: getLocaleString("langGroup2"),
                children: buildLangItems(groups["F-K"])
            });
            const submenu3 = ContextMenu.buildItem({
                label: getLocaleString("langGroup3"),
                children: buildLangItems(groups["L-Q"])
            });
            const submenu4 = ContextMenu.buildItem({
                label: getLocaleString("langGroup4"),
                children: buildLangItems(groups["R-Z"])
            });

            const langSubmenu = ContextMenu.buildItem({
                label: getLocaleString("changeTarget"),
                children: [submenu1, submenu2, submenu3, submenu4]
            });

            const topChildren = tree?.props?.children;
            if (Array.isArray(topChildren)) {
                topChildren.push(separator, mainItem, langSubmenu);
                return;
            }
            const found = findChildrenArray(tree);
            if (found) found.push(separator, mainItem, langSubmenu);
        });

        this._injectInputButtons();
        this._setupNavigationListener();
        UI.showToast(getLocaleString("started"), { type: "success" });
    }

    stop() {
        if (this._menuPatch) {
            this._menuPatch();
            this._menuPatch = null;
        }
        this._removeInputButtons();
        this._removeStyles();
        this._removeNavigationListener();
        this._removeLanguageObserver();
        this._messageObservers.forEach(observer => observer.disconnect());
        this._messageObservers.clear();
        this._translatedMessages.clear();
        this._replyOriginalTextNodes.clear();
        document.querySelectorAll("[data-st-original]").forEach(el => {
            el.innerHTML = el.dataset.stOriginal;
            delete el.dataset.stOriginal;
        });
        UI.showToast(getLocaleString("stopped"), { type: "info" });
    }

    _setupLanguageObserver() {
        if (this._langObserver) return;
        const target = document.documentElement;
        this._langObserver = new MutationObserver(() => {
            this._updateInputButtons();
        });
        this._langObserver.observe(target, { attributes: true, attributeFilter: ['lang'] });
    }

    _removeLanguageObserver() {
        if (this._langObserver) {
            this._langObserver.disconnect();
            this._langObserver = null;
        }
    }

    _setupNavigationListener() {
        this._navDispatcher = null;
        this._navHandler = null;

        try {
            const Dispatcher = BdApi.Webpack.getModule(
                m => m?.dispatch && m?.subscribe && m?.unsubscribe,
                { searchExports: false }
            );
            if (Dispatcher?.subscribe) {
                this._navHandler = () => {
                    clearTimeout(this._navDebounce);
                    this._navDebounce = setTimeout(() => this._injectInputButtons(), 50);
                };
                const NAV_EVENTS = [
                    "CHANNEL_SELECT",
                    "VOICE_CHANNEL_SELECT",
                    "GUILD_SELECT"
                ];
                NAV_EVENTS.forEach(evt => {
                    try { Dispatcher.subscribe(evt, this._navHandler); } catch (_) {}
                });
                this._navEvents = NAV_EVENTS;
                this._navDispatcher = Dispatcher;
            }
        } catch (e) {
            console.warn("[SimpleTranslator] Dispatcher não encontrado, usando fallback de observer.", e);
        }

        this._setupScopedFallbackObserver();

        if (!this._inputButtonsInterval) {
            this._inputButtonsInterval = setInterval(() => {
                if (!this._inputButton || !document.contains(this._inputButton) ||
                    !this._langButton || !document.contains(this._langButton)) {
                    this._injectInputButtons();
                }
            }, 800);
        }
    }

    _removeNavigationListener() {
        try {
            if (this._navDispatcher && this._navHandler) {
                (this._navEvents || ["CHANNEL_SELECT", "VOICE_CHANNEL_SELECT"]).forEach(evt => {
                    try { this._navDispatcher.unsubscribe(evt, this._navHandler); } catch (_) {}
                });
            }
        } catch (_) {}
        clearTimeout(this._navDebounce);
        this._navDispatcher = null;
        this._navHandler = null;
        this._navEvents = null;
        this._removeScopedFallbackObserver();
        if (this._inputButtonsInterval) {
            clearInterval(this._inputButtonsInterval);
            this._inputButtonsInterval = null;
        }
    }

    _setupScopedFallbackObserver() {
        if (this._observer) return;

        const scopedTarget = document.getElementById("app-mount") || document.body;

        this._observer = new MutationObserver(() => {
            clearTimeout(this._obsDebounce);
            this._obsDebounce = setTimeout(() => {
                if (!this._inputButton || !document.contains(this._inputButton) ||
                    !this._langButton || !document.contains(this._langButton)) {
                    this._injectInputButtons();
                }
            }, 200);
        });
        this._observer.observe(scopedTarget, { childList: true, subtree: true, attributes: false });
    }

    _removeScopedFallbackObserver() {
        clearTimeout(this._obsDebounce);
        if (this._observer) {
            this._observer.disconnect();
            this._observer = null;
        }
    }

    _injectStyles() {
        if (this._styleElement) return;
        const style = document.createElement("style");
        style.id = "st-styles";
        style.textContent = `
            [class*="contextMenu"] [class*="submenu"],
            [class*="submenu"] {
                background: #2f3136 !important;
                border: 1px solid #202225 !important;
            }
            [class*="contextMenu"] [class*="submenu"] [class*="item"],
            [class*="submenu"] [class*="item"] {
                color: #dcddde !important;
            }
            [class*="contextMenu"] [class*="submenu"] [class*="item"]:hover,
            [class*="submenu"] [class*="item"]:hover {
                background: #3a3c42 !important;
            }
            #st-settings-panel select,
            #st-settings-panel select option {
                background: #2f3136 !important;
                color: #dcddde !important;
                border-color: #202225 !important;
            }
            #st-settings-panel select:focus {
                border-color: #5865f2 !important;
            }
            #st-lang-dropdown {
                background: #2f3136 !important;
                border-color: #202225 !important;
            }
            #st-lang-dropdown [style*="background"] {
                background: transparent !important;
            }
            #st-lang-dropdown [style*="color"] {
                color: #dcddde !important;
            }
            .st-translate-btn {
                background: transparent !important;
                border: none !important;
                cursor: pointer !important;
                padding: 4px 5px !important;
                margin-right: 2px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                border-radius: 4px !important;
                color: var(--text-muted, #949ba4) !important;
                transition: all 0.15s !important;
            }
            .st-translate-btn:hover {
                background: var(--background-modifier-hover, rgba(255,255,255,0.08)) !important;
                color: var(--text-normal, #dbdee1) !important;
            }
            .st-lang-btn {
                background: transparent !important;
                border: none !important;
                cursor: pointer !important;
                padding: 4px 6px !important;
                margin-right: 2px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                border-radius: 4px !important;
                font-size: 11px !important;
                font-weight: 700 !important;
                font-family: monospace !important;
                color: var(--brand-500, #5865f2) !important;
                transition: all 0.15s !important;
                letter-spacing: 0.5px !important;
                min-width: 28px !important;
            }
            .st-lang-btn:hover {
                background: var(--background-modifier-hover, rgba(255,255,255,0.08)) !important;
            }
            .st-lang-btn.disabled {
                color: var(--text-muted, #949ba4) !important;
            }
        `;
        document.head.appendChild(style);
        this._styleElement = style;
    }

    _removeStyles() {
        if (this._styleElement) {
            this._styleElement.remove();
            this._styleElement = null;
        }
    }

    getSettingsPanel() {
        try {
            const wrapper = document.createElement("div");
            wrapper.id = "st-settings-panel";
            wrapper.style.cssText = "padding:20px; color:var(--text-normal, #dbdee1); font-family:var(--font-primary); min-height:300px;";

            const detectedLang = getUserLanguage();
            const detectedName = LOCALE[detectedLang] ? detectedLang : 'en';
            const detectedLabel = LANGUAGES_LOCALIZED['en'][detectedName] || detectedName;

            const infoBox = document.createElement("div");
            infoBox.style.cssText = "margin-bottom:16px; padding:10px; background:#2f3136; border-radius:4px; border-left:3px solid #5865f2; font-size:13px;";
            infoBox.innerHTML = `
                <div style="display:flex; gap:8px; align-items:center;">
                    <span>🌐</span>
                    <span><strong>${getLocaleString("detectedInterfaceLanguage")}</strong> ${detectedLabel} (${detectedName})</span>
                </div>
            `;
            wrapper.appendChild(infoBox);

            const label = document.createElement("label");
            label.textContent = getLocaleString("interfaceLanguageOverride");
            label.style.cssText = "display:block; margin-bottom:8px; font-size:14px; font-weight:600;";
            wrapper.appendChild(label);

            const select = document.createElement("select");
            select.style.cssText = `
                background: #2f3136;
                border: 1px solid #202225;
                border-radius: 4px;
                color: #dcddde;
                padding: 8px;
                font-size: 14px;
                width: 260px;
                cursor: pointer;
                outline: none;
            `;

            const autoOpt = document.createElement("option");
            autoOpt.value = "auto";
            autoOpt.textContent = getLocaleString("autoDetected");
            select.appendChild(autoOpt);

            const allCodes = Object.keys(LANGUAGES_LOCALIZED["en"]).sort();
            const userLangs = getLanguagesList();
            for (const code of allCodes) {
                const opt = document.createElement("option");
                opt.value = code;
                opt.textContent = userLangs[code] || LANGUAGES_LOCALIZED["en"][code];
                select.appendChild(opt);
            }

            const savedForce = Data.load(PLUGIN_ID, "forceLang") || "auto";
            select.value = savedForce;

            select.addEventListener("change", (e) => {
                Data.save(PLUGIN_ID, "forceLang", e.target.value);
                UI.showToast(getLocaleString("interfaceUpdated"), { type: "info" });
            });
            wrapper.appendChild(select);

            const chatLangName = getLanguagesList()[this.targetLang] || this.targetLang;
            const inputLangName = getLanguagesList()[this.inputTargetLang] || this.inputTargetLang;

            const info = document.createElement("div");
            info.style.cssText = "margin-top:20px; padding:12px; background:#2f3136; border-radius:4px; border:1px solid #202225; font-size:13px;";
            info.innerHTML = `
                <div style="margin-bottom:4px;">📝 <strong>${getLocaleString("chatLanguage")}:</strong> ${chatLangName}</div>
                <div>⌨️ <strong>${getLocaleString("inputLanguage")}:</strong> ${inputLangName}</div>
                <div style="margin-top:8px; font-size:11px; color:var(--text-muted, #949ba4);">
                    💡 ${getLocaleString("changeChatLang")}<br>
                    💡 ${getLocaleString("changeInputLang")}
                </div>
            `;
            wrapper.appendChild(info);

            return wrapper;
        } catch (err) {
            console.error("[SimpleTranslator] Erro no painel de configurações:", err);
            const fallback = document.createElement("div");
            fallback.textContent = "Erro ao carregar configurações. Verifique o console.";
            fallback.style.cssText = "padding:20px; color:var(--text-danger);";
            return fallback;
        }
    }

    _insertTextIntoSlate(textbox, text) {
        const fiberKey = Object.keys(textbox).find(k =>
            k.startsWith("__reactFiber") || k.startsWith("__reactInternalInstance")
        );
        if (!fiberKey) return false;

        let fiber = textbox[fiberKey];
        let editor = null;
        for (let i = 0; i < 50 && fiber; i++) {
            const props = fiber.memoizedProps || fiber.pendingProps;
            if (props?.editor?.apply && props?.editor?.onChange) {
                editor = props.editor;
                break;
            }
            fiber = fiber.return;
        }

        if (!editor) return false;

        try {
            const children = editor.children;
            if (!children || children.length === 0) return false;

            const lastNode = children[children.length - 1];
            const lastText = lastNode.children?.[lastNode.children.length - 1];
            const endOffset = lastText?.text?.length ?? 0;

            editor.apply({
                type: "set_selection",
                properties: editor.selection,
                newProperties: {
                    anchor: { path: [0, 0], offset: 0 },
                    focus: {
                        path: [children.length - 1, (lastNode.children?.length ?? 1) - 1],
                        offset: endOffset
                    }
                }
            });

            editor.insertText(text);
            textbox.focus();
            return true;
        } catch (e) {
            console.warn("[SimpleTranslator] Transforms falhou:", e);
            return false;
        }
    }

    _getInputLangAbbr() {
        return LANG_ABBR[this.inputTargetLang] || this.inputTargetLang.toUpperCase().slice(0, 5);
    }

    _updateInputButtons() {
        if (!this._inputButton || !this._langButton) return;
        const enabled = this._translationEnabled;
        
        const icon = this._inputButton.querySelector(".st-icon");
        if (icon) icon.style.opacity = enabled ? "1" : "0.35";
        
        this._langButton.textContent = this._getInputLangAbbr();
        this._langButton.classList.toggle("disabled", !enabled);
        const langName = getLanguagesList()[this.inputTargetLang] || this.inputTargetLang;
        this._langButton.title = enabled ? 
            `${getLocaleString("inputLangChanged")} ${langName} (${getLocaleString("clickToChange")})` :
            `${getLocaleString("translatorDisabled")} (${getLocaleString("clickToEnable")})`;
        
        this._inputButton.title = enabled ? 
            `${getLocaleString("translateInput")} → ${langName}` :
            `${getLocaleString("translatorDisabled")} (${getLocaleString("clickToEnable")})`;
    }

    _openLangDropdown(btn) {
        if (this._dropdownCloseTimer) {
            clearTimeout(this._dropdownCloseTimer);
            this._dropdownCloseTimer = null;
        }
        if (document.getElementById("st-lang-dropdown")) return;

        const dropdown = document.createElement("div");
        dropdown.id = "st-lang-dropdown";

        const rect = btn.getBoundingClientRect();
        const dropW = 320;
        const left = Math.max(4, rect.right - dropW);
        const bottom = window.innerHeight - rect.top + 4;

        Object.assign(dropdown.style, {
            position: "fixed",
            left: left + "px",
            bottom: bottom + "px",
            width: dropW + "px",
            maxHeight: "360px",
            overflowY: "auto",
            overflowX: "hidden",
            background: "#2f3136",
            border: "1px solid #202225",
            borderRadius: "8px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
            zIndex: "10000",
            padding: "6px 0",
            boxSizing: "border-box",
            fontFamily: "var(--font-primary)",
        });

        const langs = getLanguagesList();
        const sortedCodes = Object.keys(langs).sort((a, b) => langs[a].localeCompare(langs[b]));

        const header = document.createElement("div");
        header.textContent = getLocaleString("changeTarget") + " (input)";
        Object.assign(header.style, {
            padding: "4px 12px 8px",
            fontSize: "10px",
            fontWeight: "700",
            letterSpacing: "0.8px",
            textTransform: "uppercase",
            color: "#949ba4",
            borderBottom: "1px solid #35373c",
            marginBottom: "4px",
        });
        dropdown.appendChild(header);

        for (const code of sortedCodes) {
            const isActive = code === this.inputTargetLang;
            const item = document.createElement("div");

            Object.assign(item.style, {
                padding: "6px 10px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                borderRadius: "4px",
                margin: "2px 6px",
                background: isActive ? "#5865f2" : "transparent",
                color: isActive ? "#fff" : "#dcddde",
                transition: "background 0.08s",
                boxSizing: "border-box",
                width: "calc(100% - 12px)",
                minWidth: "0",
                overflow: "hidden"
            });

            const abbr = document.createElement("span");
            abbr.textContent = LANG_ABBR[code] || code.toUpperCase();
            Object.assign(abbr.style, {
                fontSize: "10px",
                fontWeight: "700",
                fontFamily: "monospace",
                width: "44px",
                minWidth: "44px",
                padding: "2px 0",
                borderRadius: "3px",
                textAlign: "center",
                flexShrink: "0",
                background: isActive ? "rgba(255,255,255,0.2)" : "#35373c",
                color: isActive ? "#fff" : "#949ba4",
                letterSpacing: "0.5px",
            });

            const name = document.createElement("span");
            name.textContent = langs[code];
            Object.assign(name.style, {
                fontSize: "13px",
                flex: "1",
                minWidth: "0",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                color: isActive ? "#fff" : "#dcddde"
            });

            item.appendChild(abbr);
            item.appendChild(name);

            item.addEventListener("mouseenter", () => {
                if (!isActive) {
                    item.style.background = "#3a3c42";
                }
            });
            item.addEventListener("mouseleave", () => {
                if (!isActive) {
                    item.style.background = "transparent";
                }
            });

            item.addEventListener("mousedown", (e) => {
                e.preventDefault();
                this.inputTargetLang = code;
                Data.save(PLUGIN_ID, "inputTargetLang", this.inputTargetLang);
                this._updateInputButtons();
                UI.showToast(`${getLocaleString("inputLangChanged")} ${langs[code]}`, { type: "success" });
                this._closeLangDropdown();
            });

            dropdown.appendChild(item);
        }

        const appMount = document.getElementById("app-mount") || document.body;
        appMount.appendChild(dropdown);

        const scheduleClose = () => {
            this._dropdownCloseTimer = setTimeout(() => this._closeLangDropdown(), 150);
        };
        const cancelClose = () => {
            if (this._dropdownCloseTimer) {
                clearTimeout(this._dropdownCloseTimer);
                this._dropdownCloseTimer = null;
            }
        };
        btn.addEventListener("mouseleave", scheduleClose);
        btn.addEventListener("mouseenter", cancelClose);
        dropdown.addEventListener("mouseenter", cancelClose);
        dropdown.addEventListener("mouseleave", scheduleClose);

        dropdown._scheduleClose = scheduleClose;
        dropdown._cancelClose = cancelClose;
        dropdown._btnRef = btn;
    }

    _closeLangDropdown() {
        if (this._dropdownCloseTimer) {
            clearTimeout(this._dropdownCloseTimer);
            this._dropdownCloseTimer = null;
        }
        const existing = document.getElementById("st-lang-dropdown");
        if (existing) {
            if (existing._btnRef) {
                existing._btnRef.removeEventListener("mouseleave", existing._scheduleClose);
                existing._btnRef.removeEventListener("mouseenter", existing._cancelClose);
            }
            existing.remove();
        }
    }

    _injectInputButtons(_retryCount = 0) {
        if (this._inputButton && document.contains(this._inputButton) &&
            this._langButton && document.contains(this._langButton)) {
            return;
        }

        this._removeInputButtons();

        const textbox = document.querySelector('[role="textbox"]');
        if (!textbox) {
            const delay = _retryCount < 5 ? 150 : 1000;
            setTimeout(() => this._injectInputButtons(_retryCount + 1), delay);
            return;
        }

        const channelArea = textbox.closest('[class*="channelTextArea"]');
        if (!channelArea) return;
        const buttonContainer = channelArea.querySelector('[class*="buttons"]');
        if (!buttonContainer) return;

        const orphanTranslate = buttonContainer.querySelector('.st-translate-btn');
        const orphanLang = buttonContainer.querySelector('.st-lang-btn');
        if (orphanTranslate) orphanTranslate.remove();
        if (orphanLang) orphanLang.remove();

        const isEnabled = this._translationEnabled;
        const langName = getLanguagesList()[this.inputTargetLang] || this.inputTargetLang;

        const langBtn = document.createElement("button");
        langBtn.className = `st-lang-btn${isEnabled ? "" : " disabled"}`;
        langBtn.textContent = this._getInputLangAbbr();
        langBtn.title = isEnabled ? 
            `${getLocaleString("inputLangChanged")} ${langName} (${getLocaleString("clickToChange")})` :
            `${getLocaleString("translatorDisabled")} (${getLocaleString("clickToEnable")})`;

        langBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (!this._translationEnabled) {
                this._translationEnabled = true;
                Data.save(PLUGIN_ID, "translationEnabled", true);
                this._updateInputButtons();
                UI.showToast(getLocaleString("translatorEnabled"), { type: "success" });
                return;
            }
            this._openLangDropdown(langBtn);
        });

        langBtn.addEventListener("mouseenter", () => {
            if (this._translationEnabled) {
                this._openLangDropdown(langBtn);
            }
        });

        const translateBtn = document.createElement("button");
        translateBtn.className = "st-translate-btn";
        translateBtn.title = isEnabled ? 
            `${getLocaleString("translateInput")} → ${langName}` :
            `${getLocaleString("translatorDisabled")} (${getLocaleString("clickToEnable")})`;
        translateBtn.innerHTML = `
            <span class="st-icon" style="font-size:20px; opacity:${isEnabled ? "1" : "0.35"}; transition:opacity 0.15s;">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style="vertical-align:middle;">
                    <path d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0014.07 6H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
                </svg>
            </span>
        `;

        translateBtn.addEventListener("click", async (e) => {
            e.stopPropagation();
            this._closeLangDropdown();

            if (!this._translationEnabled) {
                this._translationEnabled = true;
                Data.save(PLUGIN_ID, "translationEnabled", true);
                this._updateInputButtons();
                UI.showToast(getLocaleString("translatorEnabled"), { type: "success" });
                return;
            }

            const currentTextbox = document.querySelector('[role="textbox"]');
            if (!currentTextbox) return;
            const text = currentTextbox.innerText || currentTextbox.textContent || "";
            if (!text.trim()) {
                UI.showToast(getLocaleString("typeFirst"), { type: "info" });
                return;
            }
            try {
                const translated = await fetchTranslation(text, this.inputTargetLang);
                this._insertTextIntoSlate(currentTextbox, translated);
                UI.showToast(getLocaleString("translated"), { type: "success" });
            } catch (err) {
                UI.showToast(`${getLocaleString("error")}: ${err.message}`, { type: "error" });
            }
        });

        translateBtn.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            e.stopPropagation();
            this._closeLangDropdown();
            this._translationEnabled = false;
            Data.save(PLUGIN_ID, "translationEnabled", false);
            this._updateInputButtons();
            UI.showToast(getLocaleString("translatorDisabled"), { type: "info" });
        });

        buttonContainer.prepend(langBtn);
        buttonContainer.prepend(translateBtn);
        this._langButton = langBtn;
        this._inputButton = translateBtn;
    }

    _removeInputButtons() {
        if (this._inputButton) {
            if (this._inputButton.parentNode) this._inputButton.remove();
            this._inputButton = null;
        }
        if (this._langButton) {
            if (this._langButton.parentNode) this._langButton.remove();
            this._langButton = null;
        }
        this._closeLangDropdown();
    }

    _watchTranslatedMessage(messageId, targetLang) {
        this._stopWatchingMessage(messageId);

        const row = document.querySelector(`li[id*="${messageId}"]`);
        if (!row) return;

        const observer = new MutationObserver(() => {
            if (!document.contains(row)) {
                this._stopWatchingMessage(messageId);
                return;
            }
            const contentEl = getContentElement(messageId);
            const stillTranslated = !!contentEl?.querySelector(`[data-st-translated="${targetLang}"]`);
            if (!stillTranslated) {
                this._reapplyTranslation(messageId);
            }
        });

        observer.observe(row, { childList: true, subtree: true });
        this._messageObservers.set(messageId, observer);
    }

    _stopWatchingMessage(messageId) {
        const existing = this._messageObservers.get(messageId);
        if (existing) {
            existing.disconnect();
            this._messageObservers.delete(messageId);
        }
    }

    _reapplyTranslation(messageId) {
        const cached = this._translatedMessages.get(messageId);
        if (!cached) return;

        const contentEl = getContentElement(messageId);
        if (!contentEl) return;
        if (contentEl.querySelector(`[data-st-translated="${cached.targetLang}"]`)) return;

        contentEl.dataset.stOriginal = contentEl.innerHTML;

        const translatedSpan = document.createElement("span");
        translatedSpan.textContent = cached.translatedText;
        translatedSpan.setAttribute("data-st-translated", cached.targetLang);

        const btn = document.createElement("span");
        btn.textContent = getShowOriginalLabel(getUserLanguage());
        btn.style.cssText = "margin-left:6px;font-size:11px;opacity:0.55;cursor:pointer;color:var(--text-link);user-select:none;vertical-align:middle;";
        btn.onclick = () => this._removeTranslation(messageId);

        contentEl.innerHTML = "";
        contentEl.appendChild(translatedSpan);
        contentEl.appendChild(btn);
    }

    async _translateMessage(message) {
        const contentEl = getContentElement(message.id);
        const replyEl = getReplyContentElement(message.id);

        if (!contentEl && !replyEl) {
            UI.showToast(getLocaleString("contentNotFound"), { type: "error" });
            return;
        }

        UI.showToast(getLocaleString("translating"), { type: "info" });

        try {
            if (contentEl && message.content?.trim()) {
                const translated = await fetchTranslation(message.content, this.targetLang);
                contentEl.dataset.stOriginal = contentEl.innerHTML;

                const translatedSpan = document.createElement("span");
                translatedSpan.textContent = translated;
                translatedSpan.setAttribute("data-st-translated", this.targetLang);

                const btn = document.createElement("span");
                btn.textContent = getShowOriginalLabel(getUserLanguage());
                btn.style.cssText = "margin-left:6px;font-size:11px;opacity:0.55;cursor:pointer;color:var(--text-link);user-select:none;vertical-align:middle;";
                btn.onclick = () => this._removeTranslation(message.id);

                contentEl.innerHTML = "";
                contentEl.appendChild(translatedSpan);
                contentEl.appendChild(btn);

                this._translatedMessages.set(message.id, {
                    targetLang: this.targetLang,
                    translatedText: translated
                });
                this._watchTranslatedMessage(message.id, this.targetLang);
            }

            if (replyEl) {
                let replyRawText = message.referencedMessage?.content || getReplyRawText(replyEl);
                if (replyRawText && replyRawText.trim()) {
                    const translatedReply = await fetchTranslation(replyRawText, this.targetLang);

                    if (!replyEl.dataset.stOriginal) {
                        const textNodes = [];
                        const collectTextNodes = (node) => {
                            if (node.nodeType === 3) {
                                if (node.textContent.trim()) textNodes.push(node);
                                return;
                            }
                            if (node.nodeType !== 1) return;
                            const cls = node.className || "";
                            if (node.tagName === "A" ||
                                (typeof cls === "string" && REPLY_STRUCTURAL_CLASS_PATTERN.test(cls))) {
                                return;
                            }
                            Array.from(node.childNodes).forEach(collectTextNodes);
                        };
                        Array.from(replyEl.childNodes).forEach(collectTextNodes);

                        if (textNodes.length > 0) {
                            this._replyOriginalTextNodes.set(
                                message.id,
                                textNodes.map(n => ({ node: n, value: n.nodeValue }))
                            );
                            textNodes.forEach((n, i) => {
                                n.nodeValue = i === 0 ? translatedReply : "";
                            });
                        } else {
                            const translatedSpan = document.createElement("span");
                            translatedSpan.textContent = translatedReply;
                            translatedSpan.setAttribute("data-st-injected", "1");
                            replyEl.appendChild(translatedSpan);
                        }

                        replyEl.dataset.stOriginal = "applied";
                        replyEl.setAttribute("data-st-translated", this.targetLang);
                    }
                }
            }

        } catch (err) {
            UI.showToast(`${getLocaleString("error")}: ${err.message}`, { type: "error" });
        }
    }

    _removeTranslation(messageId) {
        this._stopWatchingMessage(messageId);
        this._translatedMessages.delete(messageId);

        const contentEl = getContentElement(messageId);
        if (contentEl && contentEl.dataset.stOriginal) {
            contentEl.innerHTML = contentEl.dataset.stOriginal;
            delete contentEl.dataset.stOriginal;
            contentEl.removeAttribute('data-st-translated');
            contentEl.querySelectorAll('[data-st-translated]').forEach(el => el.removeAttribute('data-st-translated'));
        }

        const replyEl = getReplyContentElement(messageId);
        if (replyEl && replyEl.dataset.stOriginal) {
            const originalEntries = this._replyOriginalTextNodes.get(messageId);
            if (originalEntries) {
                originalEntries.forEach(({ node, value }) => {
                    if (node.isConnected) node.nodeValue = value;
                });
                this._replyOriginalTextNodes.delete(messageId);
            }
            replyEl.querySelectorAll('[data-st-injected]').forEach(el => el.remove());
            delete replyEl.dataset.stOriginal;
            replyEl.removeAttribute('data-st-translated');
        }
    }
};
