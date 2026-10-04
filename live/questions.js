/**
 * بنك أسئلة وتجميعات اختبار كفايات اللغة الإنجليزية (STEP) — القياس
 * الصيغة: [المستوى/المهارة, الجملة مع ___, الترجمة, [الإجابة الصحيحة, خيار خطأ 1, خيار خطأ 2, خيار خطأ 3], سر قياس والشرح]
 * ⚠️ اكتب الإجابة الصحيحة دائماً أولاً في المصفوفة — النظام يخلط ترتيب الخيارات تلقائياً (A, B, C, D).
 * 
 * المهارات الأربعة الأساسية في STEP:
 * 1. grammar: قواعد وتراكيب الجمل (Grammar & Syntax)
 * 2. vocab: مفردات وسياق ومعاني (Vocabulary & Context)
 * 3. trap: فخاخ قياس والكلمات المربكة (Common Exam Traps)
 * 4. structure: التحليل الكتابي وعلامات الترقيم (Punctuation & Structure)
 */
window.QUIZ_QUESTIONS = [
  /* ==========================================================================
     1. GRAMMAR: قواعد وتراكيب الجمل (الأزمنة، الشرط، المجهول، التطابق، المودلز)
     ========================================================================== */
  // الأزمنة (Tenses)
  ['grammar', 'By the time the ambulance arrived, the patient ___.', 'بحلول وقت وصول الإسعاف، كان المريض قد غادر/توفي', ['had died', 'died', 'has died', 'was dying'], '💡 سر قياس: مع (By the time + ماضي بسيط) الحدث الأقدم يأخذ دائماً ماضي تام (had + V3).'],
  ['grammar', 'While I was studying for the STEP exam, the lights ___ out.', 'بينما كنت أذاكر لاختبار ستيب، انطفأت الأنوار', ['went', 'was going', 'have gone', 'had gone'], '💡 سر قياس: بعد While ماضي مستمر (was studying)، والحدث القاطع المفاجئ ماضي بسيط (went).'],
  ['grammar', 'I have lived in Riyadh ___ 2018.', 'أعيش في الرياض منذ عام 2018', ['since', 'for', 'from', 'in'], '💡 سر قياس: مع نقطة بداية زمنية محددة في المضارع التام نستخدم since، بينما for للمدة المحسوبة.'],
  ['grammar', 'He has been waiting at the airport ___ three hours.', 'هو ينتظر في المطار منذ ثلاث ساعات', ['for', 'since', 'during', 'at'], '💡 سر قياس: three hours مدة زمنية محسوبة تأخذ for مع زمن المضارع التام المستمر.'],
  ['grammar', 'Look at those dark clouds! It ___ rain.', 'انظر لتلك الغيوم الداكنة! إنها ستمطر', ['is going to', 'will', 'was going to', 'shall'], '💡 سر قياس: التنبؤ بوجود دليل ملموس ومرئي في الحاضر نستخدم معه (is/are going to) وليس will.'],
  ['grammar', 'Water ___ at 100 degrees Celsius.', 'يغلي الماء عند 100 درجة مئوية', ['boils', 'boiled', 'is boiling', 'boil'], '💡 سر قياس: الحقائق العلمية الثابتة تأخذ دائماً المضارع البسيط (Present Simple) بإضافة s للمفرد.'],
  ['grammar', 'By next year, the government ___ the new metro line.', 'بحلول العام القادم، ستكون الحكومة قد أنهت خط المترو الجديد', ['will have completed', 'completed', 'will complete', 'has completed'], '💡 سر قياس: قاعدة المستقبل التام (By + زمن مستقبلي) يأخذ دائماً will have + V3.'],
  ['grammar', 'Listen! Someone ___ the piano upstairs.', 'استمع! أحدهم يعزف على البيانو في الطابق العلوي', ['is playing', 'plays', 'played', 'was playing'], '💡 سر قياس: كلمات التنبيه اللحظية مثل Listen! و Look! تدل على المضارع المستمر (is/are + ing).'],
  ['grammar', 'She usually ___ coffee, but today she is drinking tea.', 'عادة تشرب القهوة لكنها اليوم تشرب الشاي', ['drinks', 'is drinking', 'drank', 'drink'], '💡 سر قياس: usually تدل على العادة والروتين -> مضارع بسيط (drinks).'],
  ['grammar', 'They ___ each other since they were children.', 'يعرفون بعضهم البعض منذ أن كانوا أطفالاً', ['have known', 'are knowing', 'knew', 'had known'], '💡 سر قياس: أفعال الحالة والشعور (stative verbs مثل know) لا تقبل ing، فنستخدم المضارع التام.'],

  // الجمل الشرطية والتمني (Conditionals & Wish)
  ['grammar', 'If you heat ice, it ___.', 'إذا قمت بتسخين الجليد فإنه يذوب', ['melts', 'melted', 'will melt', 'is melting'], '💡 سر قياس: الشرط الصفري (Zero Conditional) للحقائق العلمية: كلا الطرفين مضارع بسيط (melts).'],
  ['grammar', 'If it rains tomorrow, we ___ the outdoor match.', 'إذا أمطرت غداً سنلغي المباراة الخارجية', ['will cancel', 'cancelled', 'would cancel', 'cancel'], '💡 سر قياس: الشرط الأول (First Conditional): If + مضارع بسيط -> جواب الشرط will + المصدر.'],
  ['grammar', 'If I ___ enough money, I would buy that luxury car.', 'لو كان لدي مال كافٍ لاشتريت تلك السيارة الفارهة', ['had', 'have', 'had had', 'will have'], '💡 سر قياس: الشرط الثاني (Second Conditional): If + ماضي بسيط (had) -> جواب الشرط would + المصدر.'],
  ['grammar', 'If she had studied harder, she ___ the exam with high scores.', 'لو أنها اجتهدت أكثر لكانت اجتازت الاختبار بدرجة عالية', ['would have passed', 'passed', 'will pass', 'would pass'], '💡 سر قياس: الشرط الثالث (Third Conditional): If + had + V3 -> جواب الشرط would have + V3.'],
  ['grammar', 'If I ___ you, I would consult an expert immediately.', 'لو كنت مكانك لاستشرت خبيراً فوراً', ['were', 'was', 'am', 'had been'], '💡 سر قياس: في الحالة الشرطية الثانية للتمني والنصيحة نستخدم were مع جميع الضمائر (If I were you).'],
  ['grammar', 'I wish I ___ more time to finish the test yesterday.', 'أتمنى لو كان لدي وقت أكثر لإنهاء الاختبار أمس', ['had had', 'had', 'have', 'would have'], '💡 سر قياس: التمني (wish) عن حدث في الماضي يتحول خطوة للوراء إلى الماضي التام (had + V3 -> had had).'],

  // المبني للمجهول (Passive Voice)
  ['grammar', 'The Holy Mosque in Makkah ___ by millions of pilgrims annually.', 'يزور المسجد الحرام بمكة ملايين الحجاج سنوياً', ['is visited', 'visited', 'visits', 'was visited'], '💡 سر قياس: مبني للمجهول في المضارع البسيط (نائب الفاعل مفرد): is + التصريف الثالث (is visited).'],
  ['grammar', 'The official report ___ by the minister yesterday.', 'تم توقيع التقرير الرسمي من قبل الوزير أمس', ['was signed', 'signed', 'is signed', 'has signed'], '💡 سر قياس: مبني للمجهول في الماضي البسيط لوجود yesterday: was/were + V3 (was signed).'],
  ['grammar', 'English ___ in many international companies.', 'يُتحدث بالإنجليزية في الكثير من الشركات الدولية', ['is spoken', 'speaks', 'is speaking', 'spoke'], '💡 سر قياس: اللغة لا تتحدث بنفسها بل يُتحدث بها -> مبني للمجهول (is spoken).'],
  ['grammar', 'The new airport ___ next year by the King.', 'سيتم افتتاح المطار الجديد العام القادم', ['will be opened', 'will open', 'opened', 'is opening'], '💡 سر قياس: المبني للمجهول في المستقبل مع next year: will be + V3.'],
  ['grammar', 'All the tickets ___ before we reached the counter.', 'كانت كل التذاكر قد بيعت قبل وصولنا للشباك', ['had been sold', 'sold', 'have been sold', 'were selling'], '💡 سر قياس: مبني للمجهول في الماضي التام (حدث أول قبل وصولنا): had been + V3.'],

  // الأفعال المساعدة والمودلز (Modals & Semi-Modals)
  ['grammar', 'Drivers ___ stop when the traffic light is red.', 'يجب على السائقين التوقف عندما تكون الإشارة حمراء', ['must', 'might', 'could', 'may'], '💡 سر قياس: must تعبر عن الإلزام القانوني الصارم والإجباري (Obligation).'],
  ['grammar', 'You look very pale and exhausted; you ___ see a doctor.', 'تبدو شاحباً ومرهقاً جداً؛ ينبغي عليك مراجعة الطبيب', ['should', 'might', 'would', 'shall'], '💡 سر قياس: should تستخدم لتقديم النصيحة والتوجيه (Advice).'],
  ['grammar', 'His car is parked outside; he ___ be inside the house.', 'سيارته متوقفة بالخارج، لا بد أنه داخل المنزل', ['must', 'can\'t', 'should', 'would'], '💡 سر قياس: must هنا تفيد الاستنتاج المؤكد الإيجابي بوجود دليل قوي (Logical Deduction).'],
  ['grammar', 'He didn\'t answer the phone yesterday. He ___ sleeping.', 'لم يرد على الهاتف أمس، لا بد أنه كان نائماً', ['must have been', 'should be', 'can be', 'will have been'], '💡 سر قياس: الاستنتاج المؤكد في الماضي: must have been + V-ing/Adj.'],
  ['grammar', 'You had better ___ warm clothes; it is freezing outside.', 'من الأفضل لك ارتداء ملابس دافئة فالجو قارس', ['wear', 'to wear', 'wearing', 'wore'], '💡 سر قياس: بعد had better يأتي دائماً الفعل مجرداً بدون to (Bare Infinitive).'],
  ['grammar', 'I would rather ___ at home tonight than go out.', 'أفضل البقاء في المنزل الليلة على الخروج', ['stay', 'to stay', 'staying', 'stayed'], '💡 سر قياس: بعد would rather يأتي الفعل مجرداً دائماً بدون to.'],

  // توافق الفاعل مع الفعل (Subject-Verb Agreement)
  ['grammar', 'Neither the teacher nor the students ___ present yesterday.', 'لا المعلم ولا الطلاب كانوا حاضرين أمس', ['were', 'was', 'is', 'are'], '💡 سر قياس: مع Neither...nor يتبع الفعل الفاعل الأقرب له مباشرة (students جمع -> were).'],
  ['grammar', 'Either Ahmed or his brother ___ responsible for the mistake.', 'إما أحمد أو أخوه مسؤول عن هذا الخطأ', ['is', 'are', 'were', 'have been'], '💡 سر قياس: مع Either...or يتبع الفعل الفاعل الأقرب (brother مفرد -> is).'],
  ['grammar', 'The number of cars in the city ___ increasing rapidly.', 'عدد السيارات في المدينة يتزايد بسرعة', ['is', 'are', 'were', 'have been'], '💡 سر قياس: (The number of) تأخذ دائماً فعلاً مفرداً (is)، عكس (A number of) التي تأخذ جمعاً.'],
  ['grammar', 'A number of participants ___ already registered for the course.', 'عدد من المشاركين سجلوا بالفعل في الدورة', ['have', 'has', 'is', 'was'], '💡 سر قياس: (A number of) تعامل معاملة الجمع وتأخذ have.'],
  ['grammar', 'Everyone in the office ___ to attend the morning meeting.', 'على الجميع في المكتب الحضور للاجتماع الصباحي', ['has', 'have', 'are', 'were'], '💡 سر قياس: الضمائر غير المحددة (Everyone, Someone, Nobody) تعامل دائماً كمفرد وتأخذ has.'],
  ['grammar', 'Physics ___ considered one of the hardest subjects by students.', 'تعتبر الفيزياء إحدى أصعب المواد بالنسبة للطلاب', ['is', 'are', 'were', 'have been'], '💡 سر قياس: أسماء المواد المنتهية بـ s مثل Physics و Mathematics تعامل دائماً كمفرد (is).'],

  // ضمائر الوصل (Relative Clauses)
  ['grammar', 'The surgeon ___ performed the difficult operation is very skilled.', 'الجراح الذي أجرى العملية الصعبة ماهر جداً', ['who', 'which', 'whose', 'whom'], '💡 سر قياس: who تستخدم للإشارة للفاعل العاقل (The surgeon).'],
  ['grammar', 'The new laptop ___ I bought last week is very fast.', 'الحاسوب الجديد الذي اشتريته الأسبوع الماضي سريع جداً', ['which', 'who', 'whose', 'whom'], '💡 سر قياس: which تستخدم للإشارة لغير العاقل والأشياء (laptop).'],
  ['grammar', 'This is the student ___ essay won first place in the competition.', 'هذا هو الطالب الذي فاز مقاله بالمركز الأول في المسابقة', ['whose', 'who', 'which', 'whom'], '💡 سر قياس: whose للملكية وتأتي دائماً بين اسمين (student / essay).'],
  ['grammar', 'The hotel ___ we stayed during our vacation was luxurious.', 'الفندق الذي أقمنا فيه خلال عطلتنا كان فخماً', ['where', 'which', 'who', 'that'], '💡 سر قياس: where تشير إلى المكان الذي حدث فيه فعل الإقامة (stayed).'],

  // المقارنة والتفضيل (Comparatives & Superlatives)
  ['grammar', 'This smartphone is much ___ than the old one.', 'هذا الهاتف الذكي أكثر عملية واعتمادية من القديم', ['more practical', 'most practical', 'practical', 'as practical'], '💡 سر قياس: عند المقارنة بوجود than للصفات الطويلة نستخدم more + الصفة.'],
  ['grammar', 'Mount Everest is the ___ mountain peak on Earth.', 'قمة إيفرست هي أعلى قمة جبلية على كوكب الأرض', ['highest', 'higher', 'high', 'most highest'], '💡 سر قياس: صيغة التفضيل القصوى للصفات القصيرة مسبوقة بـ the: the + الصفة + est.'],
  ['grammar', 'The more you practice English, the ___ you become.', 'كلما مارست اللغة الإنجليزية أكثر، أصبحت أكثر طلاقة', ['more fluent', 'most fluent', 'fluent', 'fluently'], '💡 سر قياس: قاعدة التناسب الطردي: The + comparative ..., the + comparative (كلما... كلما).'],
  ['grammar', 'My new apartment is not as ___ as my previous one.', 'شقتي الجديدة ليست واسعة مثل شقتي السابقة', ['spacious', 'more spacious', 'most spacious', 'as spacious'], '💡 سر قياس: بين (as ... as) نضع الصفة دائماً في صورتها المجردة الأساسية دون أي إضافات.'],

  // المصادر والأفعال (Gerund vs Infinitive)
  ['grammar', 'He avoided ___ any direct answer during the press conference.', 'تجنب إعطاء أي إجابة مباشرة خلال المؤتمر الصحفي', ['giving', 'to give', 'give', 'given'], '💡 سر قياس: الفعل avoid يتبعه دائماً اسم الفاعل Gerund (فعل + ing).'],
  ['grammar', 'She decided ___ abroad to complete her master\'s degree.', 'قررت السفر إلى الخارج لإكمال دراسة الماجستير', ['to study', 'studying', 'study', 'studied'], '💡 سر قياس: الفعل decide يتبعه دائماً to + المصدر (to study).'],
  ['grammar', 'I stopped ___ soda because it was bad for my health.', 'توقفت عن شرب المشروبات الغازية نهائياً لأنها مضرة', ['drinking', 'to drink', 'drink', 'drank'], '💡 سر قياس: stop + ing = الإقلاع عن عادة نهائياً، بينما stop to = التوقف المؤقت لفعل شيء.'],
  ['grammar', 'Would you mind ___ the window, please?', 'هل تمانع في إغلاق النافذة من فضلك؟', ['closing', 'to close', 'close', 'closed'], '💡 سر قياس: التركيب (Would/Do you mind) يتبعه دائماً الفعل مضافاً إليه ing.'],
  ['grammar', 'She is looking forward to ___ her old classmates.', 'إنها تتطلع إلى لقاء زملائها القدامى في الدراسة', ['meeting', 'meet', 'met', 'to meet'], '💡 سر قياس: look forward to تنتهي بـ to كحرف جر ويتبعها دائماً فعل + ing.'],

  // الانعكاس والتقديم (Inversion & Advanced Structures)
  ['grammar', 'Hardly ___ entered the room when the phone started ringing.', 'ما كاد يدخل الغرفة حتى بدأ الهاتف بالرنين', ['had he', 'he had', 'did he', 'he has'], '💡 سر قياس: عند بدء الجملة بظرف نفي مثل Hardly / Scarcely نقلب الفاعل والفعل المساعد: had he.'],
  ['grammar', 'Seldom ___ such dedication and hard work in a young employee.', 'نادراً ما نرى مثل هذا الإخلاص والعمل الجاد في موظف شاب', ['do we see', 'we see', 'we do see', 'saw we'], '💡 سر قياس: عند البدء بـ Seldom (نادراً) نستخدم صيغة تقديم السؤال: Do/Does + الفاعل + الفعل.'],
  ['grammar', 'No sooner ___ the station than the train departed.', 'ما إن وصل إلى المحطة حتى غادر القطار', ['had he reached', 'he reached', 'did he reach', 'he had reached'], '💡 سر قياس: التركيب (No sooner had + الفاعل + V3 ... than).'],

  /* ==========================================================================
     2. VOCABULARY: مفردات وسياق ومعاني نصوص STEP المتكررة في قياس
     ========================================================================== */
  ['vocab', 'The ministry decided to ___ a new digital transformation plan.', 'قررت الوزارة تطبيق وتجهيز خطة جديدة للتحول الرقمي', ['implement', 'eliminate', 'neglect', 'distort'], '💡 سر قياس: implement = يُطبّق أو ينفّذ، وهي من أشهر الكلمات الأكاديمية في اختبارات قياس.'],
  ['vocab', 'Fresh water is extremely ___ in desert regions, so it must be saved.', 'الماء العذب شحيح ونادر جداً في المناطق الصحراوية', ['scarce', 'abundant', 'plentiful', 'sufficient'], '💡 سر قياس: scarce = شحيح / نادر، وتتكرر بكثرة في نصوص البيئة والعلوم في STEP.'],
  ['vocab', 'The instructions given by the supervisor were too ___ to understand.', 'كانت التعليمات التي قدمها المشرف غامضة جداً لدرجة يصعب فهمها', ['vague', 'explicit', 'lucid', 'transparent'], '💡 سر قياس: vague = غامض وغير واضح، وعكسها كلمة clear أو explicit.'],
  ['vocab', 'The synonym of the word "ENORMOUS" is ___.', 'مرادف كلمة "ENORMOUS" (ضخم) هو...', ['huge', 'tiny', 'narrow', 'feeble'], '💡 سر قياس: enormous = ضخم جداً، والمرادف الدقيق لها huge أو massive.'],
  ['vocab', 'The antonym (opposite) of the word "MANDATORY" is ___.', 'عكس كلمة "MANDATORY" (إلزامي/إجباري) هو...', ['optional', 'compulsory', 'essential', 'required'], '💡 سر قياس: mandatory = إجباري، وعكسها تماماً optional = اختياري.'],
  ['vocab', 'The opposite of the word "ARTIFICIAL" is ___.', 'عكس كلمة "ARTIFICIAL" (صناعي/مصطنع) هو...', ['natural', 'synthetic', 'plastic', 'fake'], '💡 سر قياس: artificial = صناعي، وعكسها الطبيعي natural.'],
  ['vocab', 'Smoking is ___ prohibited in all public transport facilities.', 'التدخين ممنوع منعاً باتاً في جميع مرافق النقل العام', ['strictly', 'scarcely', 'vaguely', 'rarely'], '💡 سر قياس: strictly prohibited = ممنوع منعاً باتاً (متلازمة لفظية Collocation شائعة).'],
  ['vocab', 'The research findings provided ___ evidence supporting the theory.', 'قدمت نتائج البحث أدلة تجريبية وملموسة تدعم النظرية', ['empirical', 'fictional', 'random', 'fragile'], '💡 سر قياس: empirical evidence = أدلة تجريبية وواقعية من الملاحظة.'],
  ['vocab', 'He showed remarkable ___ in recovering after the serious injury.', 'أظهر مرونة وقدرة تعافٍ مذهلة في الشفاء بعد الإصابة البالغة', ['resilience', 'reluctance', 'negligence', 'ignorance'], '💡 سر قياس: resilience = المرونة والقدرة على تجاوز الأزمات والتعافي.'],
  ['vocab', 'The committee agreed to ___ the final decision until next Monday.', 'وافق أعضاء اللجنة على تأجيل القرار النهائي حتى الاثنين القادم', ['postpone', 'initiate', 'accelerate', 'expand'], '💡 سر قياس: postpone = يؤجل، وهي مرادف التعبير الاصطلاحي (put off).'],
  ['vocab', 'Can you please ___ on this point with more detailed examples?', 'هل يمكنك الاستطراد والتوضيح أكثر في هذه النقطة بأمثلة مفصلة؟', ['elaborate', 'diminish', 'hesitate', 'vanish'], '💡 سر قياس: elaborate on = يستطرد أو يوضح بمزيد من التفصيل والتوسع.'],
  ['vocab', 'The word "COMPREHENSIVE" most nearly means ___.', 'كلمة "COMPREHENSIVE" (شامل) تعني في أقرب معنى لها...', ['complete and thorough', 'shallow and brief', 'complicated', 'useless'], '💡 سر قياس: comprehensive = شامل ومتكامل يغطي جميع الجوانب.'],
  ['vocab', 'The antique vase is extremely ___; handle it with extreme care.', 'المزهرية الأثرية هشة وسريعة الكسر جداً، تعامل معها بحذر بالغ', ['fragile', 'durable', 'sturdy', 'rigid'], '💡 سر قياس: fragile = هش وسريع العطب/الكسر.'],
  ['vocab', 'Due to technological advances, cassette tapes have become ___.', 'بسبب التطور التكنولوجي، أصبحت أشرطة الكاسيت قديمة وبائدة', ['obsolete', 'modern', 'prevalent', 'vital'], '💡 سر قياس: obsolete = قديم ومهجور لم يعد مستخدماً.'],
  ['vocab', 'The donor wished to remain ___, so his name was not announced.', 'فضل المتبرع أن يبقى مجهول الهوية لذلك لم يُعلن اسمه', ['anonymous', 'notorious', 'prominent', 'illustrious'], '💡 سر قياس: anonymous = مجهول الاسم والهوية.'],
  ['vocab', 'The project seems economically ___ and will generate great profits.', 'يبدو المشروع مجدياً وقابلاً للتطبيق اقتصادياً وسيحقق أرباحاً', ['feasible', 'impossible', 'fatal', 'hostile'], '💡 سر قياس: feasible = مجدٍ وقابل للتطبيق والتنفيذ (viable/practical).'],
  ['vocab', 'Temperatures in this region ___ greatly between summer and winter.', 'تتقلب درجات الحرارة في هذه المنطقة بشدة بين الصيف والشتاء', ['fluctuate', 'stabilize', 'freeze', 'persist'], '💡 سر قياس: fluctuate = يتقلب ويتغير صعوداً وهبوطاً.'],
  ['vocab', 'The opposite of "EXPAND" is ___.', 'عكس كلمة "EXPAND" (يتمدد/يتوسع) هو...', ['contract', 'extend', 'broaden', 'enlarge'], '💡 سر قياس: expand = يتوسع، وعكسها الفيزيائي واللغوي contract = ينكمش أو يتقلص.'],
  ['vocab', 'The company made an ___ effort to resolve customer complaints.', 'بذلت الشركة جهداً جباراً ومضنياً لحل شكاوى العملاء', ['immense', 'insignificant', 'scanty', 'trivial'], '💡 سر قياس: immense = هائل وضخم جداً (huge / tremendous).'],
  ['vocab', 'A person who studies past human cultures through artifacts is an ___.', 'الشخص الذي يدرس الحضارات البشرية القديمة عبر الآثار هو...', ['archaeologist', 'astronomer', 'architect', 'accountant'], '💡 سر قياس: archaeologist = عالم آثار.'],

  // الأفعال المركبة (Phrasal Verbs)
  ['vocab', 'He finally decided to ___ smoking for the sake of his children.', 'قرر أخيراً الإقلاع عن التدخين من أجل أطفاله', ['give up', 'give away', 'give in', 'give off'], '💡 سر قياس: give up = يقلع عن أو يتوقف نهائياً عن ممارسة عادة.'],
  ['vocab', 'The airplane couldn\'t ___ on schedule due to dense fog.', 'لم تتمكن الطائرة من الإقلاع في موعدها بسبب الضباب الكثيف', ['take off', 'take on', 'take in', 'take over'], '💡 سر قياس: take off = تقلع الطائرة (وللملابس: يخلع).'],
  ['vocab', 'She had to ___ her younger siblings while her parents were away.', 'كان عليها رعاية والاعتناء بإخوانها الصغار أثناء غياب والديها', ['look after', 'look for', 'look into', 'look down on'], '💡 سر قياس: look after = يعتني بـ / يرعى (take care of).'],
  ['vocab', 'We have completely ___ fuel; pull over at the next station.', 'لقد نفد منا الوقود تماماً؛ توقف عند المحطة التالية', ['run out of', 'run into', 'run away from', 'run over'], '💡 سر قياس: run out of = ينفد منه شيء (وقود، مال، وقت).'],
  ['vocab', 'The football match was ___ due to heavy thunderstorms.', 'تم إلغاء مباراة كرة القدم نهائياً بسبب العواصف الرعدية', ['called off', 'called out', 'called in', 'called for'], '💡 سر قياس: call off = يُلغي حدثاً نهائياً (cancel)، بينما put off = يؤجل.'],
  ['vocab', 'I unexpectedly ___ my high school teacher at the supermarket.', 'قابلت أستاذي في الثانوية بالصدفة دون موعد مسبق في السوبرماركت', ['ran into', 'ran off', 'ran away', 'ran through'], '💡 سر قياس: run into someone = يقابل شخصاً مصادفة (meet by chance).'],
  ['vocab', 'The detectives are trying to ___ who committed the crime.', 'يحاول المحققون اكتشاف ومعرفة من ارتكب الجريمة', ['figure out', 'figure on', 'look out', 'watch out'], '💡 سر قياس: figure out = يكتشف أو يحل ويفهم لغزاً.'],
  ['vocab', 'He ___ the job offer because the salary was too low.', 'رفض العرض الوظيفي لأن الراتب كان منخفضاً للغاية', ['turned down', 'turned on', 'turned up', 'turned in'], '💡 سر قياس: turn down = يرفض عرضاً أو طلباً (reject).'],
  ['vocab', 'Our car suddenly ___ in the middle of the highway.', 'تعطلت سيارتنا فجأة في منتصف الطريق السريع', ['broke down', 'broke into', 'broke out', 'broke off'], '💡 سر قياس: break down = يتعطل (للآلات والسيارات والأجهزة).'],

  /* ==========================================================================
     3. TRAPS: فخاخ قياس والكلمات المربكة المتكررة (Uncountable, Pairs, Prepositions)
     ========================================================================== */
  ['trap', 'Could you give me some ___ about the admission requirements?', 'هل يمكن أن تعطيني بعض المعلومات عن متطلبات القبول؟', ['information', 'informations', 'an information', 'inform'], '💡 سر قياس: information اسم غير معدود، لا يُجمع بـ s أبداً ولا يسبق بـ an.'],
  ['trap', 'My father gave me a great piece of ___ before my job interview.', 'أعطاني والدي نصيحة ثمينة وممتازة قبل المقابلة الوظيفية', ['advice', 'advices', 'an advice', 'advise'], '💡 سر قياس: advice (بالـ c) اسم غير معدود لا يُجمع، بينما advise (بالـ s) فعل بمعنى ينصح.'],
  ['trap', 'The high interest rate will negatively ___ small businesses.', 'سوف يؤثر ارتفاع سعر الفائدة سلباً على المشاريع الصغيرة', ['affect', 'effect', 'effective', 'affection'], '💡 سر قياس: affect فعل (يؤثر)، و effect اسم (تأثير). بعد will نحتاج فعلاً مجرداً -> affect.'],
  ['trap', 'Smoking has a disastrous ___ on heart health.', 'للتدخين تأثير كارثي على صحة القلب', ['effect', 'affect', 'effective', 'affecting'], '💡 سر قياس: بعد الصفة (disastrous) مسبوقة بـ a نحتاج اسماً (Noun) -> effect.'],
  ['trap', 'She graduated from ___ university with top honors in law.', 'تخرجت من جامعة متميزة بمرتبة الشرف الأولى في القانون', ['a', 'an', 'the', 'no article'], '💡 سر قياس: كلمة university تبدأ بصوت شبه ساكن /j/ (يو)، لذلك تأخذ a وليس an!'],
  ['trap', 'Dr. Faisal is ___ honest and trustworthy physician.', 'الدكتور فيصل طبيب أمين وجدير بالثقة', ['an', 'a', 'the', 'no article'], '💡 سر قياس: حرف h في honest صامت ويُنطق كصوت متحرك، لذلك نستخدم an honest.'],
  ['trap', 'The passengers left ___ luggage at the baggage reclaim area.', 'ترك المسافرون حقائبهم في منطقة استلام الأمتعة', ['their', 'there', 'they\'re', 'theirs'], '💡 سر قياس: their ضمير ملكية للجمع (حقائبهم). there تعني هناك، و they\'re اختصار they are.'],
  ['trap', 'The cat was licking ___ paw after finishing its meal.', 'كانت القطة تلعق كفها بعد إنهاء وجبتها', ['its', 'it\'s', 'its\'', 'it is'], '💡 سر قياس: its للملكية لغير العاقل بدون فاصلة. أما it\'s فهي اختصار (it is).'],
  ['trap', 'She has been married ___ a software engineer for seven years.', 'هي متزوجة من مهندس برمجيات منذ سبع سنوات', ['to', 'with', 'from', 'of'], '💡 سر قياس: فخ قياس الشهير! نقول married TO وليس married with (ترجمة حرفية خاطئة).'],
  ['trap', 'We have very ___ time left; hurry up or we will miss the train!', 'لدينا وقت قليل جداً متبقٍ؛ أسرع وإلا فاتنا القطار!', ['little', 'few', 'many', 'a few'], '💡 سر قياس: time غير معدود فنستخدم معه little بمعنى قليل جداً وغير كافٍ.'],
  ['trap', 'There were ___ students in class today compared to yesterday.', 'كان هناك عدد أقل من الطلاب في الفصل اليوم مقارنة بأمس', ['fewer', 'less', 'little', 'much'], '💡 سر قياس: مع الأسماء المعدودة بالجمع (students) نستخدم fewer للمقارنة، وless لغير المعدود.'],
  ['trap', 'He is not accustomed to ___ in such hot humid weather.', 'هو ليس معتاداً على العيش والعمل في مثل هذا الطقس الحار الرطب', ['living', 'live', 'lived', 'lives'], '💡 سر قياس: التعبير (be accustomed to) يتبعه دائماً Gerund (فعل + ing).'],
  ['trap', 'The principal congratulated the student ___ his outstanding achievement.', 'هنأ مدير المدرسة الطالب على إنجازه المتميز', ['on', 'for', 'about', 'with'], '💡 سر قياس: نقول دائماً congratulate someone ON something (حرف الجر on).'],
  ['trap', 'My brother is extremely good ___ solving complex mathematical problems.', 'أخي ماهر جداً في حل المسائل الرياضية المعقدة', ['at', 'in', 'with', 'on'], '💡 سر قياس: للمهارات والقدرات نقول good AT وليس good in.'],
  ['trap', 'The local police ___ searching the area for the missing child.', 'تبحث الشرطة المحلية في المنطقة عن الطفل المفقود', ['are', 'is', 'was', 'has been'], '💡 سر قياس: كلمة police تعامل دائماً كاسم جمع وتأخذ فعل جمع (are / were).'],
  ['trap', 'She insisted ___ paying the full restaurant bill herself.', 'أصرت على دفع فاتورة المطعم كاملة بنفسها', ['on', 'to', 'for', 'at'], '💡 سر قياس: الفعل insist يأخذ حرف الجر ON ويتبعه دائماً فعل + ing.'],
  ['trap', 'We travelled to the old historic district ___ foot.', 'سافرنا وذهبنا إلى الحي التاريخي القديم مشياً على الأقدام', ['on', 'by', 'with', 'in'], '💡 سر قياس: مشياً على الأقدام نقول on foot، بينما وسائل النقل الأخرى by car, by bus.'],
  ['trap', 'Could you please borrow me your car? -> The correct word is ___.', 'التصحيح السليم للجملة عند طلب إعارة السيارة هو استخدام كلمة...', ['lend', 'borrow', 'rent', 'hire'], '💡 سر قياس: lend = يُقرض/يُعير شخصاً، بينما borrow = يستعير/يستلف من شخص.'],
  ['trap', 'The price of oil has ___ significantly over the past month.', 'ارتفعت أسعار النفط بشكل ملحوظ خلال الشهر الماضي', ['risen', 'raised', 'aroused', 'lifted'], '💡 سر قياس: rise/risen فعل لازم (يرتفع بنفسه)، بينما raise فعل متعدٍ يحتاج مفعولاً به.'],
  ['trap', 'I am really interested ___ learning data analysis and AI.', 'أنا مهتم جداً بتعلم تحليل البيانات والذكاء الاصطناعي', ['in', 'on', 'at', 'with'], '💡 سر قياس: نقول دائماً interested IN (مهتم بـ).'],
  ['trap', 'He apologized sincerely ___ being late to the interview.', 'اعتذر بصدق عن التأخر عن موعد المقابلة', ['for', 'on', 'about', 'to'], '💡 سر قياس: apologize FOR something (يعتذر عن شيء).'],
  ['trap', 'The news ___ broadcast live on all national channels.', 'تم بث الأخبار مباشرة على جميع القنوات الوطنية', ['was', 'were', 'are', 'have been'], '💡 سر قياس: كلمة news مفردة دائماً باللغة الإنجليزية وتأخذ was/is.'],
  ['trap', 'The airline lost all my ___ during the transit flight.', 'فقدت شركة الطيران جميع أمتعتي أثناء رحلة الترانزيت', ['baggage', 'baggages', 'a baggage', 'bags of baggage'], '💡 سر قياس: كلمة baggage (أمتعة) اسم غير معدود لا يُجمع بـ s ولا يأخذ a.'],
  ['trap', 'The newly renovated villa was furnished with luxurious ___.', 'تم تأثيث الفيلا المجددة حديثاً بأثاث فاخر وعصري', ['furniture', 'furnitures', 'a furniture', 'piece of furnitures'], '💡 سر قياس: كلمة furniture اسم غير معدود، لا يُجمع بـ s أبداً.'],
  ['trap', 'I prefer drinking green tea ___ drinking coffee.', 'أفضل شرب الشاي الأخضر على شرب القهوة', ['to', 'than', 'from', 'over than'], '💡 سر قياس: الفعل prefer يأخذ حرف الجر TO في التفضيل (prefer X to Y) وليس than.'],
  ['trap', 'The two business models are completely different ___ each other.', 'النموذجان التجاريان مختلفان تماماً عن بعضهما البعض', ['from', 'with', 'of', 'at'], '💡 سر قياس: نقول دائماً different FROM (مختلف عن).'],
  ['trap', 'He finally succeeded ___ passing the difficult licensing exam.', 'نجح أخيراً في اجتياز اختبار الترخيص المهني الصعب', ['in', 'on', 'at', 'with'], '💡 سر قياس: التركيب (succeed IN + فعل ing / اسم).'],
  ['trap', 'The little child is afraid ___ darkness and loud noises.', 'الطفل الصغير يخاف من الظلام والأصوات العالية', ['of', 'from', 'with', 'about'], '💡 سر قياس: نقول afraid OF وليس afraid from (ترجمة حرفية من العربية).'],

  /* ==========================================================================
     4. STRUCTURE: التحليل الكتابي وعلامات الترقيم وتكنيك الربط (Writing Analysis)
     ========================================================================== */
  ['structure', 'Choose the sentence with the CORRECT punctuation for a list:', 'اختر الجملة التي تحتوي على علامات ترقيم صحيحة لتعداد القائمة:', ['I bought apples, bananas, and oranges.', 'I bought, apples bananas, and oranges.', 'I bought apples bananas and, oranges.', 'I bought apples, bananas and oranges,'], '💡 سر قياس: استخدام الفواصل بين عناصر القائمة ووضع فاصلة قبل and في القائمة (Oxford Comma).'],
  ['structure', 'Choose the correctly punctuated compound sentence:', 'اختر الجملة المركبة المرقمة بشكل صحيح باستخدام الفاصلة المنقوطة:', ['He was exhausted; however, he finished the report.', 'He was exhausted however; he finished the report.', 'He was exhausted, however; he finished the report.', 'He was exhausted; however he finished, the report.'], '💡 سر قياس: عند استخدام however للربط بين جملتين مستقلتين نضع قبلها فاصلة منقوطة (;) وبعدها فاصلة (,).'],
  ['structure', 'Which word in this sentence MUST be capitalized: "we visited london last tuesday."?', 'أي كلمة في الجملة يجب أن تبدأ بحرف كبير (Capital letter)؟', ['London', 'visited', 'last', 'visited and last'], '💡 سر قياس: أسماء المدن والدول (Proper Nouns) وأيام الأسبوع تبدأ دائماً بحرف كبير.'],
  ['structure', 'Choose the correct word form: The team celebrated their great ___.', 'اختر الصيغة الصحيحة من الكلمة: احتفل الفريق بنجاحهم العظيم', ['success', 'succeed', 'successful', 'successfully'], '💡 سر قياس: بعد صفة الملكية (their) والصفة (great) نحتاج اسماً (Noun) -> success.'],
  ['structure', 'The surgeon performed the delicate operation very ___.', 'أجرى الجراح العملية الدقيقة بمهارة فائقة واحترافية', ['skillfully', 'skillful', 'skill', 'skilled'], '💡 سر قياس: لوصف كيفية أداء الفعل (performed) نحتاج إلى ظرف حال (Adverb) ينتهي بـ ly -> skillfully.'],
  ['structure', 'Identify the sentence FRAGMENT (الجملة الناقصة غير المكتملة):', 'حدد الجملة غير المكتملة الأركان (Sentence Fragment):', ['Because he arrived late to the conference.', 'He arrived late to the conference yesterday.', 'The conference started exactly on time.', 'They arrived early for the morning meeting.'], '💡 سر قياس: الجملة التي تبدأ برابط سببي (Because) دون وجود جملة جواب رئيسية تعتبر Fragment ناقصة المعنى.'],
  ['structure', 'Which transitional connector expresses CONTRAST (التناقض) between ideas?', 'أي من الروابط الانتقالية التالية يعبر عن التباين والتناقض بين الأفكار؟', ['On the other hand', 'Furthermore', 'Consequently', 'For instance'], '💡 سر قياس: On the other hand و However تعبر عن التناقض (Contrast).'],
  ['structure', 'Which transition word expresses CAUSE AND EFFECT (السبب والنتيجة)?', 'أي من الكلمات الانتقالية التالية تعبر عن السبب والنتيجة؟', ['Therefore', 'Moreover', 'Similarly', 'Nevertheless'], '💡 سر قياس: Therefore و Consequently تعبر عن النتيجة والسبب (Cause & Effect).'],
  ['structure', 'Select the sentence with the CORRECT apostrophe for plural possession:', 'اختر الجملة التي تحتوي على الفاصلة العليا الصحيحة لملكية الجمع:', ['The students\' projects were displayed in the hall.', 'The student\'s projects were thirty boys.', 'The students project\'s were on display.', 'The students projects\' were ready.'], '💡 سر قياس: ملكية الجمع المنتهي بـ s نضع الفاصلة العليا بعد حرف الـ s مباشرة (students\').'],
  ['structure', 'Choose the correctly SPELLED word from the following options:', 'اختر الكلمة ذات الإملاء الإنجليزي الصحيح:', ['Accommodation', 'Acommodation', 'Accomodation', 'Acomodation'], '💡 سر قياس: كلمة Accommodation تُكتب بمضاعفة حرفي c و m معاً (cc + mm).'],
  ['structure', 'Which word correctly completes: "___ it was raining, they played the match."', 'اختر أداة الربط المناسبة: بالرغم من أنها كانت تمطر، فقد لعبوا المباراة', ['Although', 'Despite', 'In spite of', 'Because of'], '💡 سر قياس: Although يتبعها جملة كاملة (فاعل + فعل)، بينما Despite يأتي بعدها اسم أو ing.'],
  ['structure', 'Choose the correct connector: He failed the driving test ___ his nervousness.', 'رسب في اختبار القيادة بسبب توتره وقلقه الشديد', ['because of', 'because', 'although', 'even though'], '💡 سر قياس: because of يتبعها اسم (noun phrase)، بينما because تتبعها جملة كاملة (فاعل وفعل).'],
  ['structure', 'Which of the following is a RUN-ON sentence (جملتان ملتصقتان بلا رابط)?', 'أي من التالي تعتبر جملة ملتصقة بلا ترقيم أو ربط صحيح (Run-on sentence)؟', ['I love reading novels I visit the library often.', 'I love reading novels, so I visit the library.', 'I love reading novels; I visit the library.', 'Because I love novels, I visit the library.'], '💡 سر قياس: الجملة المستقلة الموصولة بأخرى دون فاصلة ورابط أو فاصلة منقوطة تسمى Run-on sentence.'],
  ['structure', 'Identify the correct adjective order: "She bought a ___ car."', 'حدد الترتيب الصحيح للصفات قبل الاسم في الإنجليزية:', ['beautiful new red', 'red new beautiful', 'new red beautiful', 'red beautiful new'], '💡 سر قياس: قاعدة ترتيب الصفات (OSASCOMP): الرأي (beautiful) ثم العمر (new) ثم اللون (red).'],
  ['structure', 'What part of speech is the underlined word: "He ran VERY quickly"?', 'ما هو نوع الكلمة (Part of Speech) لكلمة "VERY" في الجملة؟', ['Adverb (ظرف)', 'Adjective (صفة)', 'Noun (اسم)', 'Preposition (حرف جر)'], '💡 سر قياس: كلمة very هي Adverb يُستخدم لتحديد درجة ظرف آخر (quickly) أو صفة.'],
  ['structure', 'Which sentence uses the correct word order in an INDIRECT QUESTION?', 'أي جملة تستخدم الترتيب الصحيح للسؤال غير المباشر (Indirect Question)؟', ['Can you tell me where the bank is?', 'Can you tell me where is the bank?', 'Can you tell me where does the bank be?', 'Can you tell me where was the bank?'], '💡 سر قياس: في السؤال غير المباشر يعود ترتيب الجملة إلى جملة خبرية (أداة الربط + الفاعل + الفعل).'],
  ['structure', 'Choose the correct question tag: "You haven\'t seen my passport, ___?"', 'اختر السؤال المذيل (Question Tag) الصحيح:', ['have you', 'haven\'t you', 'did you', 'do you'], '💡 سر قياس: إذا كانت الجملة الأساسية منفية بـ haven\'t، يكون السؤال المذيل مثبتاً (have you).'],
  ['structure', 'Choose the correct question tag: "She speaks English fluently, ___?"', 'اختر السؤال المذيل الصحيح للجملة:', ['doesn\'t she', 'does she', 'isn\'t she', 'hasn\'t she'], '💡 سر قياس: الجملة مثبتة في المضارع البسيط مع She، فننفي بـ doesn\'t she.']
];
