var tops={'dest': {'other': {0: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'Аэропорт "Внуково"', 'ст. м. "Каширская"', 'ст. м. "ВДНХ"', 'Курский вокзал', 'ул. Адмирала Корнилова, вл. 1', 'ул. Садовники', 'Стрелка (остров Балчуг)', 'Пролетарский просп.'], 1: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'Аэропорт "Внуково"', 'ст. м. "Каширская"', 'Комсомольская пл. ("Три вокзала")', 'Белорусский вокзал', 'Курский вокзал', 'Киевский вокзал', 'ст. м. "ВДНХ"', 'Павелецкий вокзал'], 2: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'Комсомольская пл. ("Три вокзала")', 'Аэропорт "Внуково"', 'Курский вокзал', 'Павелецкий вокзал', 'Белорусский вокзал', 'ст. м. "Каширская"', 'Киевский вокзал', 'ТК "Садовод"'], 3: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'Аэропорт "Внуково"', 'Комсомольская пл. ("Три вокзала")', 'Павелецкий вокзал', 'Курский вокзал', 'Белорусский вокзал', 'Киевский вокзал', 'ст. м. "Каширская"', 'ул. Садовники'], 4: ['Аэропорт "Домодедово"', 'Аэропорт "Внуково"', 'Аэропорт "Шереметьево"', 'МГИМО', 'ст. м. "Речной вокзал"', 'Павелецкий вокзал', 'Белорусский вокзал', 'Комсомольская пл. ("Три вокзала")', 'Лобненская ул.', 'Курский вокзал'], 5: ['Аэропорт "Домодедово"', 'Аэропорт "Внуково"', 'Аэропорт "Шереметьево"', 'Москва-Сити', 'МГИМО', 'ст. м. "Ленинский проспект"', 'ст. м. "Беговая"', 'Центр Международной Торговли', 'Павелецкий вокзал', 'ст. м. "Планерная"'], 6: ['Аэропорт "Домодедово"', 'Аэропорт "Внуково"', 'Москва-Сити', 'Аэропорт "Шереметьево"', 'Экспоцентр', 'Большая Никитская ул.', 'ст. м. "Ленинский проспект"', 'Павелецкий вокзал', 'МГИМО', 'Центр Международной Торговли'], 7: ['Аэропорт "Домодедово"', 'Аэропорт "Внуково"', 'Аэропорт "Шереметьево"', 'Экспоцентр', 'Москва-Сити', 'ст. м. "Каширская"', 'Павелецкий вокзал', 'Центр Международной Торговли', 'Большая Никитская ул.', 'Белорусский вокзал'], 8: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'Аэропорт "Внуково"', 'Белорусский вокзал', 'Комсомольская пл. ("Три вокзала")', 'ст. м. "Каширская"', 'Павелецкий вокзал', 'Экспоцентр', 'ст. м. "ВДНХ"', 'ул. Льва Толстого'], 9: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'Аэропорт "Внуково"', 'Комсомольская пл. ("Три вокзала")', 'Павелецкий вокзал', 'ст. м. "Каширская"', 'Белорусский вокзал', 'Киевский вокзал', 'ст. м. "ВДНХ"', 'Курский вокзал'], 10: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'Аэропорт "Внуково"', 'Комсомольская пл. ("Три вокзала")', 'Павелецкий вокзал', 'Белорусский вокзал', 'ст. м. "Каширская"', 'Киевский вокзал', 'Курский вокзал', 'Москва-Сити'], 11: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'Аэропорт "Внуково"', 'Павелецкий вокзал', 'Комсомольская пл. ("Три вокзала")', 'ст. м. "Каширская"', 'Киевский вокзал', 'Белорусский вокзал', 'Курский вокзал', 'Москва-Сити'], 12: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'Комсомольская пл. ("Три вокзала")', 'Аэропорт "Внуково"', 'Киевский вокзал', 'Павелецкий вокзал', 'ст. м. "Каширская"', 'Белорусский вокзал', 'Москва-Сити', 'ст. м. "ВДНХ"'], 13: ['Аэропорт "Домодедово"', 'Аэропорт "Внуково"', 'Аэропорт "Шереметьево"', 'Киевский вокзал', 'Павелецкий вокзал', 'Комсомольская пл. ("Три вокзала")', 'Белорусский вокзал', 'ст. м. "Каширская"', 'Москва-Сити', 'ст. м. "ВДНХ"'], 14: ['Аэропорт "Домодедово"', 'Аэропорт "Внуково"', 'Аэропорт "Шереметьево"', 'Комсомольская пл. ("Три вокзала")', 'Белорусский вокзал', 'Павелецкий вокзал', 'Киевский вокзал', 'ст. м. "Каширская"', 'Курский вокзал', 'Москва-Сити'], 15: ['Аэропорт "Домодедово"', 'Комсомольская пл. ("Три вокзала")', 'Аэропорт "Шереметьево"', 'Аэропорт "Внуково"', 'Павелецкий вокзал', 'Белорусский вокзал', 'Киевский вокзал', 'Москва-Сити', 'Рэдиссон Ройал Москва', 'Театральная пл.'], 16: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'Аэропорт "Внуково"', 'Комсомольская пл. ("Три вокзала")', 'Павелецкий вокзал', 'Курский вокзал', 'Белорусский вокзал', 'Киевский вокзал', 'Рэдиссон Ройал Москва', 'Москва-Сити'], 17: ['Аэропорт "Домодедово"', 'Аэропорт "Внуково"', 'Аэропорт "Шереметьево"', 'Павелецкий вокзал', 'Курский вокзал', 'Комсомольская пл. ("Три вокзала")', 'Белорусский вокзал', 'ст. м. "Каширская"', 'Киевский вокзал', 'ст. м. "Беговая"'], 18: ['Аэропорт "Домодедово"', 'Аэропорт "Внуково"', 'Аэропорт "Шереметьево"', 'Комсомольская пл. ("Три вокзала")', 'Белорусский вокзал', 'Курский вокзал', 'ст. м. "Каширская"', 'Павелецкий вокзал', 'ст. м. "Беговая"', 'ст. м. "ВДНХ"'], 19: ['Аэропорт "Домодедово"', 'Комсомольская пл. ("Три вокзала")', 'Аэропорт "Шереметьево"', 'Аэропорт "Внуково"', 'ст. м. "Каширская"', 'Курский вокзал', 'ст. м. "Беговая"', 'Белорусский вокзал', 'Павелецкий вокзал', 'ст. м. "ВДНХ"'], 20: ['Аэропорт "Домодедово"', 'Комсомольская пл. ("Три вокзала")', 'Аэропорт "Шереметьево"', 'Аэропорт "Внуково"', 'ст. м. "Каширская"', 'Курский вокзал', 'ст. м. "ВДНХ"', 'ст. м. "Беговая"', 'Павелецкий вокзал', 'Белорусский вокзал'], 21: ['Аэропорт "Домодедово"', 'Комсомольская пл. ("Три вокзала")', 'Аэропорт "Шереметьево"', 'Аэропорт "Внуково"', 'ст. м. "Каширская"', 'Курский вокзал', 'ст. м. "Беговая"', 'ст. м. "ВДНХ"', 'Пролетарский просп.', 'Белорусский вокзал'], 22: ['Аэропорт "Домодедово"', 'Аэропорт "Внуково"', 'ст. м. "Каширская"', 'Аэропорт "Шереметьево"', 'ст. м. "ВДНХ"', 'Комсомольская пл. ("Три вокзала")', 'Курский вокзал', 'Пролетарский просп.', 'ул. Садовники', 'ст. м. "Беговая"'], 23: ['Аэропорт "Домодедово"', 'ст. м. "Каширская"', 'Аэропорт "Шереметьево"', 'Аэропорт "Внуково"', 'Курский вокзал', 'Пролетарский просп.', 'ст. м. "ВДНХ"', 'ул. Садовники', 'ст. м. "Беговая"', 'Белорусский вокзал']}, 'frisat': {0: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'Аэропорт "Внуково"', 'ст. м. "Каширская"', 'Пролетарский просп.', 'Курский вокзал', 'наб. Тараса Шевченко', 'ст. м. Каширская', 'ст. м. "Беговая"', 'Пересечение ул. Сретенки и Сретенского бул.'], 1: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'Аэропорт "Внуково"', 'ст. м. "Каширская"', 'Комсомольская пл. ("Три вокзала")', 'Пролетарский просп.', 'Курский вокзал', 'Белорусский вокзал', 'Киевский вокзал', 'Большая Филёвская ул.'], 2: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'Комсомольская пл. ("Три вокзала")', 'Аэропорт "Внуково"', 'Курский вокзал', 'Киевский вокзал', 'Белорусский вокзал', 'Павелецкий вокзал', 'ст. м. "Каширская"', 'наб. Тараса Шевченко'], 3: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'Аэропорт "Внуково"', 'Комсомольская пл. ("Три вокзала")', 'Курский вокзал', 'Белорусский вокзал', 'Павелецкий вокзал', 'Киевский вокзал', 'ст. м. "Каширская"', 'Пролетарский просп.'], 4: ['Аэропорт "Домодедово"', 'Аэропорт "Внуково"', 'Аэропорт "Шереметьево"', 'Комсомольская пл. ("Три вокзала")', 'МГИМО', 'Павелецкий вокзал', 'Курский вокзал', 'Белорусский вокзал', 'Киевский вокзал', 'ст. м. "Речной вокзал"'], 5: ['Аэропорт "Домодедово"', 'Аэропорт "Внуково"', 'Аэропорт "Шереметьево"', 'МГИМО', 'Павелецкий вокзал', 'Комсомольская пл. ("Три вокзала")', 'Курский вокзал', 'Москва-Сити', 'Центр Международной Торговли', 'Белорусский вокзал'], 6: ['Аэропорт "Домодедово"', 'Аэропорт "Внуково"', 'Аэропорт "Шереметьево"', 'Москва-Сити', 'Павелецкий вокзал', 'МГИМО', 'ст. м. "Ленинский проспект"', 'ст. м. "Каширская"', 'ст. м. "Юго-Западная"', 'Центр Международной Торговли'], 7: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'Аэропорт "Внуково"', 'Павелецкий вокзал', 'Москва-Сити', 'Белорусский вокзал', 'Сколково', 'ст. м. "Каширская"', 'Курский вокзал', 'Центр Международной Торговли'], 8: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'Аэропорт "Внуково"', 'Павелецкий вокзал', 'Белорусский вокзал', 'Комсомольская пл. ("Три вокзала")', 'ст. м. "ВДНХ"', 'Киевский вокзал', 'МГИМО', 'ст. м. "Каширская"'], 9: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'Комсомольская пл. ("Три вокзала")', 'Аэропорт "Внуково"', 'Павелецкий вокзал', 'Белорусский вокзал', 'Киевский вокзал', 'ст. м. "ВДНХ"', 'ст. м. "Каширская"', 'стадион Арена Химки'], 10: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'Аэропорт "Внуково"', 'Павелецкий вокзал', 'Белорусский вокзал', 'Комсомольская пл. ("Три вокзала")', 'ст. м. "Каширская"', 'Курский вокзал', 'Киевский вокзал', 'ст. м. "ВДНХ"'], 11: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'Аэропорт "Внуково"', 'Белорусский вокзал', 'Павелецкий вокзал', 'Комсомольская пл. ("Три вокзала")', 'Киевский вокзал', 'Курский вокзал', 'ст. м. "Каширская"', 'ст. м. "ВДНХ"'], 12: ['Аэропорт "Домодедово"', 'Аэропорт "Внуково"', 'Комсомольская пл. ("Три вокзала")', 'Аэропорт "Шереметьево"', 'Павелецкий вокзал', 'Белорусский вокзал', 'Курский вокзал', 'Киевский вокзал', 'ст. м. "Каширская"', 'ст. м. "ВДНХ"'], 13: ['Аэропорт "Домодедово"', 'Аэропорт "Внуково"', 'Аэропорт "Шереметьево"', 'Киевский вокзал', 'Павелецкий вокзал', 'ст. м. "Каширская"', 'Белорусский вокзал', 'Комсомольская пл. ("Три вокзала")', 'Москва-Сити', 'ст. м. "ВДНХ"'], 14: ['Аэропорт "Домодедово"', 'Аэропорт "Внуково"', 'Аэропорт "Шереметьево"', 'Комсомольская пл. ("Три вокзала")', 'Театральная пл.', 'Павелецкий вокзал', 'г. Щёлково', 'ст. м. "Каширская"', 'Киевский вокзал', 'Белорусский вокзал'], 15: ['Аэропорт "Домодедово"', 'Комсомольская пл. ("Три вокзала")', 'Аэропорт "Внуково"', 'Аэропорт "Шереметьево"', 'Павелецкий вокзал', 'ст. м. "Каширская"', 'Киевский вокзал', 'Театральная пл.', 'Белорусский вокзал', 'Москва-Сити'], 16: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'Аэропорт "Внуково"', 'Павелецкий вокзал', 'Комсомольская пл. ("Три вокзала")', 'Киевский вокзал', 'Курский вокзал', 'Белорусский вокзал', 'ст. м. "Каширская"', 'Парк Горького'], 17: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'Аэропорт "Внуково"', 'Белорусский вокзал', 'Курский вокзал', 'Павелецкий вокзал', 'Комсомольская пл. ("Три вокзала")', 'ст. м. "Каширская"', 'Киевский вокзал', 'ул. Новый Арбат'], 18: ['Аэропорт "Домодедово"', 'Аэропорт "Внуково"', 'Аэропорт "Шереметьево"', 'Комсомольская пл. ("Три вокзала")', 'Белорусский вокзал', 'ст. м. "Каширская"', 'Курский вокзал', 'Павелецкий вокзал', 'Цветной бул.', 'ст. м. "Юго-Западная"'], 19: ['Аэропорт "Домодедово"', 'Комсомольская пл. ("Три вокзала")', 'Аэропорт "Шереметьево"', 'Аэропорт "Внуково"', 'Курский вокзал', 'ст. м. "Каширская"', 'Клуб Space Moscow', 'Рочдельская ул.', 'ст. м. "ВДНХ"', 'Малая Никитская ул.'], 20: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'Комсомольская пл. ("Три вокзала")', 'Рочдельская ул.', 'Стрелка (остров Балчуг)', 'Аэропорт "Внуково"', 'Курский вокзал', 'Пушкинская пл.', '1-й пр-д Подбельского', 'ст. м. "Каширская"'], 21: ['Аэропорт "Домодедово"', '1-й пр-д Подбельского', 'Рочдельская ул.', 'Комсомольская пл. ("Три вокзала")', 'Стрелка (остров Балчуг)', 'Аэропорт "Шереметьево"', 'ст. м. "Каширская"', 'Аэропорт "Внуково"', 'Пушкинская пл.', 'Клуб Space Moscow'], 22: ['Аэропорт "Домодедово"', 'Стрелка (остров Балчуг)', 'Рочдельская ул.', '1-й пр-д Подбельского', 'ст. м. "Каширская"', 'Аэропорт "Внуково"', 'Аэропорт "Шереметьево"', 'Пушкинская пл.', 'Курский вокзал', 'Покровский бул.'], 23: ['Аэропорт "Домодедово"', 'Аэропорт "Внуково"', 'Аэропорт "Шереметьево"', 'ст. м. "Каширская"', '1-й пр-д Подбельского', 'Стрелка (остров Балчуг)', 'Рочдельская ул.', 'Большая Филёвская ул.', 'ст. м. "Беговая"', 'Покровский бул.']}}, 'start': {'other': {0: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'ст. м. "Каширская"', 'Аэропорт "Внуково"', 'Курский вокзал', 'Пересечение ул. Сретенки и Сретенского бул.', 'Саввинская набережная', 'ст. м. "ВДНХ"', 'ул. Новый Арбат', 'Рочдельская ул.'], 1: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'ст. м. "Каширская"', 'Аэропорт "Внуково"', 'Курский вокзал', 'Комсомольская пл. ("Три вокзала")', 'Рочдельская ул.', 'ст. м. "ВДНХ"', 'Стрелка (остров Балчуг)', 'Покровский бул.'], 2: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'Комсомольская пл. ("Три вокзала")', 'ст. м. "Каширская"', 'Белорусский вокзал', 'Курский вокзал', 'Аэропорт "Внуково"', 'Стрелка (остров Балчуг)', 'ст. м. "ВДНХ"', 'Рочдельская ул.'], 3: ['Аэропорт "Домодедово"', 'Комсомольская пл. ("Три вокзала")', 'Аэропорт "Шереметьево"', 'ст. м. "Каширская"', 'Аэропорт "Внуково"', 'Курский вокзал', 'Павелецкий вокзал', 'ул. 1905 года', 'Саввинская набережная', 'Белорусский вокзал'], 4: ['Аэропорт "Домодедово"', 'Комсомольская пл. ("Три вокзала")', 'Аэропорт "Шереметьево"', 'Аэропорт "Внуково"', 'Белорусский вокзал', 'Павелецкий вокзал', 'ЖК "Аэробус"', 'ст. м. "Каширская"', 'Курский вокзал', 'Можайское ш.'], 5: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'Комсомольская пл. ("Три вокзала")', 'Аэропорт "Внуково"', 'Павелецкий вокзал', 'ст. м. "Каширская"', 'Белорусский вокзал', '1-й Нагатинский проезд', 'ЖК "Аэробус"', 'ст. м. "Беговая"'], 6: ['Аэропорт "Домодедово"', 'Аэропорт "Внуково"', 'Комсомольская пл. ("Три вокзала")', 'ст. м. "Каширская"', 'Аэропорт "Шереметьево"', 'Белорусский вокзал', 'Павелецкий вокзал', 'ст. м. "Беговая"', 'ЖК "Аэробус"', 'Курский вокзал'], 7: ['Аэропорт "Домодедово"', 'ст. м. "Каширская"', 'Аэропорт "Внуково"', 'Комсомольская пл. ("Три вокзала")', 'Павелецкий вокзал', 'Аэропорт "Шереметьево"', 'Курский вокзал', 'Киевский вокзал', 'Белорусский вокзал', 'ст. м. "Беговая"'], 8: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'Комсомольская пл. ("Три вокзала")', 'ст. м. "Каширская"', 'Аэропорт "Внуково"', 'Курский вокзал', 'Киевский вокзал', 'Павелецкий вокзал', 'ст. м. "Беговая"', 'Белорусский вокзал'], 9: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'ст. м. "Каширская"', 'Аэропорт "Внуково"', 'Комсомольская пл. ("Три вокзала")', 'Павелецкий вокзал', 'Курский вокзал', 'ст. м. "Беговая"', 'Белорусский вокзал', 'ст. м. "ВДНХ"'], 10: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'ст. м. "Каширская"', 'Аэропорт "Внуково"', 'Киевский вокзал', 'Белорусский вокзал', 'ст. м. "Беговая"', 'Москва-Сити', 'Курский вокзал', 'ст. м. "ВДНХ"'], 11: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'ст. м. "Каширская"', 'Аэропорт "Внуково"', 'Павелецкий вокзал', 'Комсомольская пл. ("Три вокзала")', 'Киевский вокзал', 'Курский вокзал', 'ст. м. "Беговая"', 'Белорусский вокзал'], 12: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'Аэропорт "Внуково"', 'ст. м. "Каширская"', 'Павелецкий вокзал', 'Киевский вокзал', 'Москва-Сити', 'Комсомольская пл. ("Три вокзала")', 'ст. м. "Беговая"', 'ТВК "АвиаПарк"'], 13: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'Аэропорт "Внуково"', 'ст. м. "Каширская"', 'Киевский вокзал', 'Павелецкий вокзал', 'Москва-Сити', 'ТВК "АвиаПарк"', 'Манежная площадь', 'Центр Международной Торговли'], 14: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'Аэропорт "Внуково"', 'ст. м. "Каширская"', 'Киевский вокзал', 'Москва-Сити', 'Павелецкий вокзал', 'Комсомольская пл. ("Три вокзала")', 'ТВК "АвиаПарк"', 'Белорусский вокзал'], 15: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'Аэропорт "Внуково"', 'Комсомольская пл. ("Три вокзала")', 'ст. м. "Каширская"', 'Киевский вокзал', 'Москва-Сити', 'ст. м. "Беговая"', 'ст. м. "Ленинский проспект"', 'ТВК "АвиаПарк"'], 16: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'Аэропорт "Внуково"', 'Комсомольская пл. ("Три вокзала")', 'Киевский вокзал', 'ст. м. "Ленинский проспект"', 'Москва-Сити', 'Павелецкий вокзал', 'ст. м. "Каширская"', 'ст. м. "Беговая"'], 17: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'Аэропорт "Внуково"', 'Киевский вокзал', 'ст. м. "Каширская"', 'Москва-Сити', 'ТВК "АвиаПарк"', 'Павелецкий вокзал', 'Белорусский вокзал', 'ст. м. "Ленинский проспект"'], 18: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'Аэропорт "Внуково"', 'Киевский вокзал', 'ст. м. "Каширская"', 'Москва-Сити', 'Белорусский вокзал', 'Павелецкий вокзал', 'Манежная площадь', 'ТВК "АвиаПарк"'], 19: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'Киевский вокзал', 'Аэропорт "Внуково"', 'Курский вокзал', 'ст. м. "Каширская"', 'Манежная площадь', 'Москва-Сити', 'ТВК "АвиаПарк"', 'Павелецкий вокзал'], 20: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'Комсомольская пл. ("Три вокзала")', 'Аэропорт "Внуково"', 'ст. м. "Каширская"', 'Павелецкий вокзал', 'Курский вокзал', 'Киевский вокзал', 'Манежная площадь', 'Москва-Сити'], 21: ['Аэропорт "Домодедово"', 'Аэропорт "Внуково"', 'Аэропорт "Шереметьево"', 'Комсомольская пл. ("Три вокзала")', 'ст. м. "Каширская"', 'Курский вокзал', 'Павелецкий вокзал', 'Ул. Новый Арбат', 'Киевский вокзал', 'Москва-Сити'], 22: ['Аэропорт "Домодедово"', 'Аэропорт "Внуково"', 'Аэропорт "Шереметьево"', 'ст. м. "Каширская"', 'Белорусский вокзал', 'Киевский вокзал', 'ст. м. "ВДНХ"', 'Пересечение ул. Покровки и Покровского бул.', 'ул. Новый Арбат', 'Комсомольская пл. ("Три вокзала")'], 23: ['Аэропорт "Домодедово"', 'Аэропорт "Внуково"', 'ст. м. "Каширская"', 'Аэропорт "Шереметьево"', 'Курский вокзал', 'Большой Златоустинский пер.', 'ул. Новый Арбат', 'ст. м. "ВДНХ"', 'Москва-Сити', 'Страстной бул.']}, 'frisat': {0: ['Аэропорт "Домодедово"', 'ст. м. "Каширская"', 'Аэропорт "Шереметьево"', 'Саввинская набережная', 'Галерея "Времена Года"', 'Страстной бул.', 'Рочдельская ул.', 'Пересечение ул. Сретенки и Сретенского бул.', 'Цветной бул.', 'Покровский бул.'], 1: ['Аэропорт "Домодедово"', 'ст. м. "Каширская"', 'Аэропорт "Шереметьево"', 'Саввинская набережная', 'Рочдельская ул.', 'Галерея "Времена Года"', '1-й пр-д Подбельского', 'Покровский бул.', 'Пересечение ул. Сретенки и Сретенского бул.', 'Стрелка (остров Балчуг)'], 2: ['Аэропорт "Шереметьево"', 'Аэропорт "Домодедово"', 'Комсомольская пл. ("Три вокзала")', 'ст. м. "Каширская"', 'наб. Тараса Шевченко', 'Белорусский вокзал', 'Рочдельская ул.', 'Аэропорт "Внуково"', 'Галерея "Времена Года"', 'Пересечение ул. Сретенки и Сретенского бул.'], 3: ['Аэропорт "Шереметьево"', 'Комсомольская пл. ("Три вокзала")', 'Аэропорт "Домодедово"', 'ст. м. "Каширская"', 'наб. Тараса Шевченко', 'Курский вокзал', 'Аэропорт "Внуково"', 'Большая Сухаревская пл.', 'ул. 1905 года', 'Павелецкий вокзал'], 4: ['Аэропорт "Шереметьево"', 'Аэропорт "Домодедово"', 'Комсомольская пл. ("Три вокзала")', 'Аэропорт "Внуково"', 'наб. Тараса Шевченко', 'Павелецкий вокзал', 'Белорусский вокзал', 'Курский вокзал', 'Садовая-Черногрязская улица', 'пл. Тверская Застава'], 5: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'Комсомольская пл. ("Три вокзала")', 'Аэропорт "Внуково"', 'ст. м. "Каширская"', 'Павелецкий вокзал', '1-й Нагатинский проезд', 'ЖК "Аэробус"', 'ст. м. "ВДНХ"', 'Белорусский вокзал'], 6: ['Аэропорт "Домодедово"', 'Аэропорт "Внуково"', 'ст. м. "Каширская"', 'Аэропорт "Шереметьево"', 'Комсомольская пл. ("Три вокзала")', 'Белорусский вокзал', 'Павелецкий вокзал', 'ЖК "Аэробус"', 'Курский вокзал', 'ст. м. "ВДНХ"'], 7: ['Аэропорт "Домодедово"', 'Аэропорт "Внуково"', 'Комсомольская пл. ("Три вокзала")', 'ст. м. "Каширская"', 'Аэропорт "Шереметьево"', 'Павелецкий вокзал', 'Курский вокзал', 'Киевский вокзал', 'Белорусский вокзал', 'ст. м. "Беговая"'], 8: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'Комсомольская пл. ("Три вокзала")', 'Аэропорт "Внуково"', 'ст. м. "Каширская"', 'Курский вокзал', 'Киевский вокзал', 'ст. м. "Беговая"', 'ЖК "Аэробус"', 'Белорусский вокзал'], 9: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'ст. м. "Каширская"', 'Аэропорт "Внуково"', 'ст. м. "Беговая"', 'Комсомольская пл. ("Три вокзала")', 'Курский вокзал', 'Павелецкий вокзал', 'ст. м. "ВДНХ"', 'Киевский вокзал'], 10: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'ст. м. "Каширская"', 'Киевский вокзал', 'Аэропорт "Внуково"', 'ст. м. "Беговая"', 'Москва-Сити', 'Большая Филёвская ул.', 'Белорусский вокзал', 'ст. м. "ВДНХ"'], 11: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'ст. м. "Каширская"', 'Аэропорт "Внуково"', 'МГИМО', 'Павелецкий вокзал', 'Курский вокзал', 'Киевский вокзал', 'Комсомольская пл. ("Три вокзала")', 'Белорусский вокзал'], 12: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'Аэропорт "Внуково"', 'ст. м. "Каширская"', 'Киевский вокзал', 'ст. м. "Беговая"', 'Комсомольская пл. ("Три вокзала")', 'Москва-Сити', 'Павелецкий вокзал', 'ТВК "АвиаПарк"'], 13: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'Аэропорт "Внуково"', 'ст. м. "Каширская"', 'Киевский вокзал', 'ст. м. "Беговая"', 'Павелецкий вокзал', 'ТВК "АвиаПарк"', 'Центр Международной Торговли', 'МГИМО'], 14: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'Аэропорт "Внуково"', 'Киевский вокзал', 'ст. м. "Каширская"', 'ТВК "АвиаПарк"', 'Павелецкий вокзал', 'Москва-Сити', 'ст. м. "Беговая"', 'Центр Международной Торговли'], 15: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'Аэропорт "Внуково"', 'Комсомольская пл. ("Три вокзала")', 'Киевский вокзал', 'ст. м. "Каширская"', 'ТВК "АвиаПарк"', 'Сколково', 'Москва-Сити', 'Крокус Сити Молл'], 16: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'Аэропорт "Внуково"', 'Комсомольская пл. ("Три вокзала")', 'Киевский вокзал', 'ст. м. "Каширская"', 'Москва-Сити', 'ТВК "АвиаПарк"', 'Павелецкий вокзал', 'Курский вокзал'], 17: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'Аэропорт "Внуково"', 'Киевский вокзал', 'ст. м. "Каширская"', 'Москва-Сити', 'ТВК "АвиаПарк"', 'Комсомольская пл. ("Три вокзала")', 'ст. м. "Беговая"', 'Цветной бул.'], 18: ['Аэропорт "Домодедово"', 'Аэропорт "Внуково"', 'Аэропорт "Шереметьево"', 'Киевский вокзал', 'ст. м. "Каширская"', 'ТВК "АвиаПарк"', 'Москва-Сити', 'Курский вокзал', 'Манежная площадь', 'Павелецкий вокзал'], 19: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'Аэропорт "Внуково"', 'Киевский вокзал', 'Курский вокзал', 'ст. м. "Каширская"', 'ТВК "АвиаПарк"', 'Москва-Сити', 'ст. м. "Беговая"', 'Кудринская пл.'], 20: ['Аэропорт "Домодедово"', 'Аэропорт "Шереметьево"', 'Комсомольская пл. ("Три вокзала")', 'Аэропорт "Внуково"', 'Киевский вокзал', 'Цветной бул.', 'ТВК "АвиаПарк"', 'ст. м. "Каширская"', 'Пересечение ул. Покровки и Покровского бул.', 'Кудринская пл.'], 21: ['Аэропорт "Домодедово"', 'Аэропорт "Внуково"', 'Аэропорт "Шереметьево"', 'Комсомольская пл. ("Три вокзала")', 'ст. м. "Каширская"', 'Пересечение ул. Покровки и Покровского бул.', 'Курский вокзал', 'Цветной бул.', 'Киевский вокзал', 'ул. Петровка'], 22: ['Аэропорт "Домодедово"', 'Аэропорт "Внуково"', 'ст. м. "Каширская"', 'Цветной бул.', 'Пересечение ул. Покровки и Покровского бул.', 'Аэропорт "Шереметьево"', 'Бол. Николоворобинский пер.', 'ул. Петровка', 'Неглинная ул.', 'Страстной бул.'], 23: ['Аэропорт "Домодедово"', 'Рочдельская ул.', 'ст. м. "Каширская"', 'Пересечение ул. Покровки и Покровского бул.', 'Неглинная ул.', 'Бол. Николоворобинский пер.', 'Аэропорт "Шереметьево"', 'Цветной бул.', 'Пересечение ул. Сретенки и Сретенского бул.', 'Малая Никитская ул.']}}}