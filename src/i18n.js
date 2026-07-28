import { useSettings } from '@/lib/SettingsContext';

const STRINGS = {
  // Language
  'lang.title': { en: 'Language', ar: 'اللغة' },
  'lang.english': { en: 'English', ar: 'English' },
  'lang.arabic': { en: 'العربية', ar: 'العربية' },

  // Welcome
  'welcome.title': { en: 'Welcome to Wasl', ar: 'مرحباً بك في وصل' },
  'welcome.subtitle': { en: 'Understand each other. Grow closer together.', ar: 'نفهم بعض، ونقرب أكثر' },
  'welcome.signIn': { en: 'Sign in', ar: 'تسجيل الدخول' },
  'welcome.createAccount': { en: 'Create account', ar: 'إنشاء حساب' },
  'welcome.guest': { en: 'Continue as guest', ar: 'المتابعة كضيف' },
  'welcome.privacy': { en: 'Private by design · Respectful by default', ar: 'خصوصية بالتصميم · احترام افتراضيًا' },

  // Login
  'login.title': { en: 'Welcome back', ar: 'أهلاً بعودتك' },
  'login.subtitle': { en: 'Log in to your account', ar: 'سجّل الدخول إلى حسابك' },
  'login.google': { en: 'Continue with Google', ar: 'المتابعة عبر Google' },
  'login.facebook': { en: 'Continue with Facebook', ar: 'المتابعة عبر Facebook' },
  'login.or': { en: 'or', ar: 'أو' },
  'login.email': { en: 'Email', ar: 'البريد الإلكتروني' },
  'login.password': { en: 'Password', ar: 'كلمة المرور' },
  'login.forgot': { en: 'Forgot password?', ar: 'نسيت كلمة المرور؟' },
  'login.submit': { en: 'Log in', ar: 'تسجيل الدخول' },
  'login.loggingIn': { en: 'Logging in...', ar: 'جارٍ تسجيل الدخول...' },
  'login.noAccount': { en: "Don't have an account?", ar: 'ليس لديك حساب؟' },
  'login.createOne': { en: 'Create one', ar: 'أنشئ حسابًا' },
  'login.error': { en: 'Invalid email or password', ar: 'بريد إلكتروني أو كلمة مرور غير صحيحة' },

  // Register
  'register.title': { en: 'Create your account', ar: 'أنشئ حسابك' },
  'register.subtitle': { en: 'Sign up to get started', ar: 'سجّل للبدء' },
  'register.google': { en: 'Continue with Google', ar: 'المتابعة عبر Google' },
  'register.facebook': { en: 'Continue with Facebook', ar: 'المتابعة عبر Facebook' },
  'register.or': { en: 'or', ar: 'أو' },
  'register.email': { en: 'Email', ar: 'البريد الإلكتروني' },
  'register.password': { en: 'Password', ar: 'كلمة المرور' },
  'register.confirm': { en: 'Confirm Password', ar: 'تأكيد كلمة المرور' },
  'register.submit': { en: 'Create account', ar: 'إنشاء حساب' },
  'register.creating': { en: 'Creating account...', ar: 'جارٍ إنشاء الحساب...' },
  'register.haveAccount': { en: 'Already have an account?', ar: 'لديك حساب بالفعل؟' },
  'register.login': { en: 'Log in', ar: 'تسجيل الدخول' },
  'register.pwMismatch': { en: 'Passwords do not match', ar: 'كلمتا المرور غير متطابقتين' },
  'register.failed': { en: 'Registration failed', ar: 'فشل التسجيل' },
  'register.verify.title': { en: 'Verify your email', ar: 'تحقق من بريدك الإلكتروني' },
  'register.verify.subheading': { en: 'We sent a code to {email}', ar: 'أرسلنا رمزًا إلى {email}' },
  'register.verify.submit': { en: 'Verify', ar: 'تحقق' },
  'register.verify.verifying': { en: 'Verifying...', ar: 'جارٍ التحقق...' },
  'register.verify.invalid': { en: 'Invalid verification code', ar: 'رمز التحقق غير صحيح' },
  'register.verify.resendPrompt': { en: "Didn't receive the code?", ar: 'لم يصلك الرمز؟' },
  'register.verify.resend': { en: 'Resend', ar: 'إعادة الإرسال' },
  'register.verify.codeSentTitle': { en: 'Code sent', ar: 'تم إرسال الرمز' },
  'register.verify.codeSentDesc': { en: 'Check your email for the new code.', ar: 'تحقق من بريدك الإلكتروني للحصول على الرمز الجديد.' },

  // Nav
  'nav.home': { en: 'Home', ar: 'الرئيسية' },
  'nav.insights': { en: 'Insights', ar: 'رؤى' },
  'nav.agreements': { en: 'Agreements', ar: 'الاتفاقات' },
  'nav.settings': { en: 'Settings', ar: 'الإعدادات' },

  // Common
  'common.cancel': { en: 'Cancel', ar: 'إلغاء' },
  'common.delete': { en: 'Delete', ar: 'حذف' },
  'common.save': { en: 'Save', ar: 'حفظ' },
  'common.back': { en: 'Back', ar: 'رجوع' },

  // Home
  'home.greetingMorning': { en: 'Good morning', ar: 'صباح الخير' },
  'home.greetingAfternoon': { en: 'Good afternoon', ar: 'مساء الخير' },
  'home.greetingEvening': { en: 'Good evening', ar: 'مساء الخير' },
  'home.heading': { en: 'How can Wasl help your family today?', ar: 'كيف يمكن لـ«وصل» مساعدة عائلتك اليوم؟' },
  'home.recent': { en: 'Recent agreement', ar: 'أحدث اتفاق' },
  'home.startTitle': { en: 'Start a new conversation', ar: 'بدء حوار جديد' },
  'home.startDesc': { en: 'Share two perspectives and discover a respectful way forward.', ar: 'شارك وجهتي نظر واكتشف طريقًا محترمًا للمضي قدمًا.' },
  'home.joinTitle': { en: 'Enter a session code', ar: 'إدخال رمز الجلسة' },
  'home.joinDesc': { en: 'Join a private conversation created by a family member.', ar: 'انضم إلى حوار خاص أنشأه أحد أفراد العائلة.' },
  'home.todayInsight': { en: "Today's insight", ar: 'رؤية اليوم' },
  'home.todayInsightText': { en: 'Ask one question before giving your opinion.', ar: 'اطرح سؤالًا واحدًا قبل إبداء رأيك.' },
  'home.viewInsights': { en: 'View insights', ar: 'عرض الرؤى' },
  'home.active': { en: 'Active', ar: 'ساري' },
  'home.completed': { en: 'Completed', ar: 'مكتمل' },
  'home.agreementDate': { en: 'Agreement date', ar: 'تاريخ الاتفاق' },
  'home.viewAgreement': { en: 'View agreement', ar: 'عرض الاتفاق' },

  // Insights
  'insights.title': { en: 'Family insights', ar: 'رؤى العائلة' },
  'insights.subtitle': { en: 'Reflect on how you feel and discover small ways to communicate better.', ar: 'تأمل في مشاعرك واكتشف طرقًا بسيطة للتواصل بشكل أفضل.' },
  'insights.feelingTitle': { en: 'How are you feeling today?', ar: 'كيف تشعر اليوم؟' },
  'insights.feelingSubtitle': { en: 'Choose up to two feelings.', ar: 'اختر حتى شعورين.' },
  'insights.feelings': { en: ['Calm', 'Stressed', 'Unheard', 'Frustrated', 'Hopeful', 'Tired', 'Appreciated', 'Worried', 'Connected', 'Overwhelmed'], ar: ['هادئ', 'متوتر', 'غير مسموع', 'محبط', 'متفائل', 'متعب', 'مقدّر', 'قلق', 'متواصل', 'منهَك'] },
  'insights.saveCheckIn': { en: 'Save check-in', ar: 'حفظ تسجيل المشاعر' },
  'insights.savingCheckIn': { en: 'Saving...', ar: 'جارٍ الحفظ...' },
  'insights.checkInResponse': { en: 'You selected {feelings}. A calm conversation may help when you feel ready.', ar: 'اخترت {feelings}. قد يساعد حوار هادئ عندما تشعر بالاستعداد.' },
  'insights.todayInsight': { en: "Today's insight", ar: 'رؤية اليوم' },
  'insights.showAnother': { en: 'Show another insight', ar: 'اعرض رؤية أخرى' },
  'insights.insights': { en: [{ main: 'People often listen better when they feel understood first.', secondary: "Try summarizing the other person's point before sharing your own." }, { main: 'Ask one question before giving your opinion.', secondary: 'A small question creates space for the other person to feel heard.' }, { main: 'Calm tone matters more than perfect words.', secondary: 'How you say something often lands before what you say.' }, { main: 'Small acknowledgements build trust over time.', secondary: 'Notice and name something you appreciate about a family member today.' }], ar: [{ main: 'يستمع الناس غالبًا بشكل أفضل عندما يشعرون بالتفهم أولًا.', secondary: 'حاول تلخيص وجهة نظر الطرف الآخر قبل مشاركة وجهة نظرك.' }, { main: 'اطرح سؤالًا واحدًا قبل إبداء رأيك.', secondary: 'سؤال صغير يفسح مجالًا للطرف الآخر ليشعر بأنه مسموع.' }, { main: 'النبرة الهادئة أهم من الكلمات المثالية.', secondary: 'كيف تقول شيئًا يصل غالبًا قبل ما تقوله.' }, { main: 'الاعترافات الصغيرة تبني الثقة مع الوقت.', secondary: 'لاحظ واذكر شيئًا تقدّره في أحد أفراد العائلة اليوم.' }] },
  'insights.tipsTitle': { en: 'Tips for you', ar: 'نصائح لك' },
  'insights.tips': { en: [{ title: 'Pause before replying', tip: 'Take one slow breath before responding during a tense conversation.', category: 'Staying calm' }, { title: 'Ask before assuming', tip: 'Use a question such as: “Can you help me understand what you meant?”', category: 'Listening' }, { title: 'Focus on one issue', tip: 'Avoid bringing several old disagreements into one conversation.', category: 'Communication' }], ar: [{ title: 'توقف قبل الرد', tip: 'خذ نفسًا بطيئًا واحدًا قبل الرد خلال حوار متوتر.', category: 'البقاء هادئًا' }, { title: 'اسأل قبل الافتراض', tip: 'استخدم سؤالًا مثل: «هل يمكنك مساعدتي في فهم ما قصدته؟»', category: 'الإصغاء' }, { title: 'ركّز على قضية واحدة', tip: 'تجنب إدخال عدة خلافات قديمة في حوار واحد.', category: 'التواصل' }] },
  'insights.customize': { en: 'Customize', ar: 'تخصيص' },
  'insights.customizeTitle': { en: 'Customize your tips', ar: 'خصص نصائحك' },
  'insights.customizeDesc': { en: 'Choose what kind of guidance you would like to receive.', ar: 'اختر نوع الإرشاد الذي تود تلقيه.' },
  'insights.focusArea': { en: 'Focus area', ar: 'مجال التركيز' },
  'insights.frequency': { en: 'Tip frequency', ar: 'تكرار النصائح' },
  'insights.style': { en: 'Tip style', ar: 'أسلوب النصائح' },
  'insights.placeholderTopic': { en: 'Select a topic', ar: 'اختر موضوعًا' },
  'insights.placeholderFreq': { en: 'Select frequency', ar: 'اختر التكرار' },
  'insights.placeholderStyle': { en: 'Select style', ar: 'اختر الأسلوب' },
  'insights.topics': { en: ['Listening', 'Expressing feelings', 'Parent-teen communication', 'Sibling disagreements', 'Boundaries', 'Family time', 'Screen time', 'Responsibilities', 'Staying calm', 'Showing appreciation'], ar: ['الإصغاء', 'التعبير عن المشاعر', 'تواصل الوالدين والمراهقين', 'خلافات الإخوة', 'الحدود', 'وقت العائلة', 'وقت الشاشات', 'المسؤوليات', 'البقاء هادئًا', 'إظهار التقدير'] },
  'insights.frequencies': { en: ['Daily', 'Three times a week', 'Weekly'], ar: ['يوميًا', 'ثلاث مرات أسبوعيًا', 'أسبوعيًا'] },
  'insights.styles': { en: ['Quick and practical', 'Gentle and supportive', 'Detailed guidance'], ar: ['سريع وعملي', 'لطيف وداعم', 'إرشاد مفصل'] },
  'insights.countLabel': { en: 'selected', ar: 'محدد' },
  'insights.savePreferences': { en: 'Save preferences', ar: 'حفظ التفضيلات' },
  'insights.prefsUpdated': { en: 'Tip preferences updated', ar: 'تم تحديث تفضيلات النصائح' },
  'insights.unableSave': { en: 'Unable to save', ar: 'تعذر الحفظ' },
  'insights.reflectionTitle': { en: 'Private reflection', ar: 'تأمل خاص' },
  'insights.reflectionPrompt': { en: 'What do you wish your family understood about you today?', ar: 'ما الذي تتمنى أن تفهمه عائلتك عنك اليوم؟' },
  'insights.reflectionPlaceholder': { en: 'Write your thoughts here...', ar: 'اكتب أفكارك هنا...' },
  'insights.savePrivately': { en: 'Save privately', ar: 'احفظ بشكل خاص' },
  'insights.reflectionPrivacy': { en: 'Only you can view your private reflections.', ar: 'أنت وحدك تستطيع عرض تأملاتك الخاصة.' },
  'insights.viewReflections': { en: 'View private reflections', ar: 'عرض التأملات الخاصة' },
  'insights.reflectionSaved': { en: 'Private reflection saved', ar: 'تم حفظ التأمل الخاص' },

  // Agreements
  'agreements.title': { en: 'Family agreements', ar: 'اتفاقات العائلة' },
  'agreements.active': { en: 'Active', ar: 'السارية' },
  'agreements.completed': { en: 'Completed', ar: 'المكتملة' },
  'agreements.emptyActiveHeading': { en: 'No active agreements yet', ar: 'لا توجد اتفاقيات سارية بعد' },
  'agreements.emptyActiveSupport': { en: 'Agreements created after a conversation will appear here.', ar: 'ستظهر هنا الاتفاقيات التي تُنشأ بعد حوار.' },
  'agreements.emptyCompletedHeading': { en: 'No completed agreements yet', ar: 'لا توجد اتفاقيات مكتملة بعد' },
  'agreements.emptyCompletedSupport': { en: 'Finished agreements will appear here for future reference.', ar: 'ستظهر هنا الاتفاقيات المكتملة للرجوع إليها لاحقًا.' },
  'agreements.startConversation': { en: 'Start a conversation', ar: 'بدء حوار' },
  'agreement.active': { en: 'Active', ar: 'ساري' },
  'agreement.completed': { en: 'Completed', ar: 'مكتمل' },
  'agreement.agreementDate': { en: 'Agreement date', ar: 'تاريخ الاتفاق' },
  'agreement.viewAgreement': { en: 'View agreement', ar: 'عرض الاتفاق' },
  'agreement.viewDetails': { en: 'View details', ar: 'عرض التفاصيل' },
  'agreement.moveBack': { en: 'Move back', ar: 'إرجاع' },
  'agreement.markCompletedTitle': { en: 'Mark this agreement as completed?', ar: 'وضع علامة مكتمل على هذا الاتفاق؟' },
  'agreement.markCompletedDesc': { en: 'You can still view it later in the Completed tab.', ar: 'لا يزال بإمكانك عرضه لاحقًا في تبويب المكتملة.' },
  'agreement.markCompleted': { en: 'Mark completed', ar: 'وضع علامة مكتمل' },
  'agreement.markCompletedToast': { en: 'Agreement marked as completed', ar: 'تم وضع علامة مكتمل على الاتفاق' },
  'agreement.moveBackTitle': { en: 'Move this agreement back to active?', ar: 'إرجاع هذا الاتفاق إلى السارية؟' },
  'agreement.moveBackDesc': { en: 'It will reappear in your Active agreements.', ar: 'سيظهر مجددًا في اتفاقياتك السارية.' },
  'agreement.moveToActive': { en: 'Move to active', ar: 'إرجاع إلى السارية' },
  'agreement.movedBackToast': { en: 'Agreement moved back to active', ar: 'تم إرجاع الاتفاق إلى السارية' },
  'agreement.unableUpdate': { en: 'Unable to update', ar: 'تعذر التحديث' },
  'agreement.participantA': { en: 'Participant A', ar: 'المشارك أ' },
  'agreement.participantB': { en: 'Participant B', ar: 'المشارك ب' },

  // Settings
  'settings.title': { en: 'Settings', ar: 'الإعدادات' },
  'settings.sectionAccount': { en: 'Account', ar: 'الحساب' },
  'settings.profile': { en: 'Profile', ar: 'الملف الشخصي' },
  'settings.familyRole': { en: 'Family role', ar: 'دور العائلة' },
  'settings.language': { en: 'Language', ar: 'اللغة' },
  'settings.sectionNotifications': { en: 'Notifications', ar: 'الإشعارات' },
  'settings.enableNotifications': { en: 'Enable notifications', ar: 'تفعيل الإشعارات' },
  'settings.conversationUpdates': { en: 'Conversation updates', ar: 'تحديثات الحوار' },
  'settings.insightsReminders': { en: 'Insights reminders', ar: 'تذكيرات الرؤى' },
  'settings.insightsRemindersDesc': { en: 'Personalized tips and check-ins.', ar: 'نصائح وتسجيلات مشاعر مخصصة.' },
  'settings.agreementUpdates': { en: 'Agreement updates', ar: 'تحديثات الاتفاق' },
  'settings.agreementUpdatesDesc': { en: 'New or changed agreements.', ar: 'اتفاقات جديدة أو معدّلة.' },
  'settings.reminderTime': { en: 'Reminder time', ar: 'وقت التذكير' },
  'settings.sectionPrivacy': { en: 'Privacy and data', ar: 'الخصوصية والبيانات' },
  'settings.privacySettings': { en: 'Privacy settings', ar: 'إعدادات الخصوصية' },
  'settings.privacySafety': { en: 'Privacy and safety', ar: 'الخصوصية والأمان' },
  'settings.autoLockReflections': { en: 'Auto-lock private reflections', ar: 'قفل تلقائي للتأملات الخاصة' },
  'settings.myData': { en: 'My data', ar: 'بياناتي' },
  'settings.deleteConvHistory': { en: 'Delete conversation history', ar: 'حذف سجل المحادثات' },
  'settings.deleteAccount': { en: 'Delete account', ar: 'حذف الحساب' },
  'settings.sectionAccessibility': { en: 'Accessibility', ar: 'إمكانية الوصول' },
  'settings.textSize': { en: 'Text size', ar: 'حجم النص' },
  'settings.highContrast': { en: 'High contrast', ar: 'تباين عالٍ' },
  'settings.reduceMotion': { en: 'Reduce motion', ar: 'تقليل الحركة' },
  'settings.reduceMotionDesc': { en: 'Disables nonessential animations.', ar: 'يعطّل الرسوم المتحركة غير الأساسية.' },
  'settings.sectionInsights': { en: 'Insights preferences', ar: 'تفضيلات الرؤى' },
  'settings.customizeTips': { en: 'Customize tips', ar: 'تخصيص النصائح' },
  'settings.tipFrequency': { en: 'Tip frequency', ar: 'تكرار النصائح' },
  'settings.tipStyle': { en: 'Tip style', ar: 'أسلوب النصائح' },
  'settings.sectionAppearance': { en: 'Appearance', ar: 'المظهر' },
  'settings.theme': { en: 'Theme', ar: 'المظهر' },
  'settings.sectionAbout': { en: 'About', ar: 'حول' },
  'settings.howWaslWorks': { en: 'How Wasl works', ar: 'كيف يعمل وصل' },
  'settings.responsibleAI': { en: 'Responsible AI', ar: 'الذكاء الاصطناعي المسؤول' },
  'settings.privacyPolicy': { en: 'Privacy policy', ar: 'سياسة الخصوصية' },
  'settings.terms': { en: 'Terms of use', ar: 'شروط الاستخدام' },
  'settings.appVersion': { en: 'Version 0.1.0', ar: 'الإصدار 0.1.0' },
  'settings.versionLabel': { en: 'App version', ar: 'إصدار التطبيق' },
  'settings.signOut': { en: 'Sign out', ar: 'تسجيل الخروج' },
  'settings.invitationReceived': { en: 'Invitation received', ar: 'تم استلام دعوة' },
  'settings.participantJoined': { en: 'Participant joined', ar: 'انضم مشارك' },
  'settings.perspectiveSubmitted': { en: 'Perspective submitted', ar: 'تم إرسال وجهة النظر' },
  'settings.analysisReady': { en: 'Analysis ready', ar: 'التحليل جاهز' },
  'settings.conversationUpdatesTitle': { en: 'Conversation updates', ar: 'تحديثات الحوار' },
  'settings.reminderTitle': { en: 'Reminder time', ar: 'وقت التذكير' },
  'settings.themeUpdated': { en: 'Theme updated', ar: 'تم تحديث المظهر' },
  'settings.roleUpdated': { en: 'Family role updated', ar: 'تم تحديث دور العائلة' },
  'settings.langChanged': { en: 'Language changed to {lang}', ar: 'تم تغيير اللغة إلى {lang}' },
  'settings.textSizeUpdated': { en: 'Text size updated', ar: 'تم تحديث حجم النص' },
  'settings.insightPrefsUpdated': { en: 'Insight preferences updated', ar: 'تم تحديث تفضيلات الرؤى' },
  'settings.autolockUpdated': { en: 'Auto-lock updated', ar: 'تم تحديث القفل التلقائي' },
  'settings.reminderUpdated': { en: 'Reminder time updated', ar: 'تم تحديث وقت التذكير' },
  'settings.notifEnabled': { en: 'Notifications enabled', ar: 'تم تفعيل الإشعارات' },
  'settings.notifDisabled': { en: 'Notifications disabled', ar: 'تم تعطيل الإشعارات' },
  'settings.toggleOn': { en: '{label} enabled', ar: 'تم تفعيل {label}' },
  'settings.toggleOff': { en: '{label} disabled', ar: 'تم تعطيل {label}' },
  'settings.roles': { en: ['Parent', 'Teenager', 'Sibling', 'Grandparent', 'Guardian', 'Other family member'], ar: ['والد/والدة', 'مراهق', 'شقيق/شقيقة', 'جد/جدة', 'ولي أمر', 'فرد آخر من العائلة'] },
  'settings.languages': { en: ['English', 'العربية'], ar: ['English', 'العربية'] },
  'settings.textSizes': { en: ['Small', 'Default', 'Large', 'Extra large'], ar: ['صغير', 'افتراضي', 'كبير', 'كبير جدًا'] },
  'settings.themes': { en: ['Light', 'Dark', 'System default'], ar: ['فاتح', 'داكن', 'افتراضي النظام'] },
  'settings.autolocking': { en: ['Immediately', 'After 1 minute', 'After 5 minutes'], ar: ['فورًا', 'بعد دقيقة', 'بعد 5 دقائق'] },
  'settings.deleteConvTitle': { en: 'Delete conversation history?', ar: 'حذف سجل المحادثات؟' },
  'settings.deleteConvDesc': { en: 'This will permanently delete your conversation history from this device.', ar: 'سيؤدي هذا إلى حذف سجل محادثاتك نهائيًا من هذا الجهاز.' },
  'settings.convDeleted': { en: 'Conversation history deleted', ar: 'تم حذف سجل المحادثات' },
  'settings.deleteAccTitle': { en: 'Delete your account?', ar: 'حذف حسابك؟' },
  'settings.deleteAccDesc': { en: 'This permanently removes your conversations, agreements, reflections, and saved tips. This cannot be undone.', ar: 'يؤدي هذا إلى إزالة محادثاتك واتفاقياتك وتأملاتك ونصائحك المحفوظة نهائيًا. لا يمكن التراجع عن ذلك.' },
  'settings.deleteAccTypeDelete': { en: 'DELETE', ar: 'DELETE' },
  'settings.deleteAccConfirmLabel': { en: 'Type {word} to confirm', ar: 'اكتب {word} للتأكيد' },
  'settings.accRemoved': { en: 'Your account data has been removed', ar: 'تمت إزالة بيانات حسابك' },
  'settings.deleteFail': { en: 'Unable to delete', ar: 'تعذر الحذف' },
  'settings.deleteAccFail': { en: 'Unable to delete account', ar: 'تعذر حذف الحساب' },
  'settings.checkConn': { en: 'Check your connection and try again.', ar: 'تحقق من اتصالك وحاول مرة أخرى.' },

  // NotificationsBell
  'notif.title': { en: 'Notifications', ar: 'الإشعارات' },
  'notif.enableDesc': { en: 'Get reminders for invitations, submitted perspectives, new agreements, and personalized insights.', ar: 'احصل على تذكيرات للدعوات ووجهات النظر المُرسلة والاتفاقيات الجديدة والرؤى المخصصة.' },
  'notif.enabling': { en: 'Enabling...', ar: 'جارٍ التفعيل...' },
  'notif.enable': { en: 'Enable notifications', ar: 'تفعيل الإشعارات' },
  'notif.notNow': { en: 'Not now', ar: 'ليس الآن' },
  'notif.markAllRead': { en: 'Mark all as read', ar: 'تعليم الكل كمقروء' },
  'notif.notifSettings': { en: 'Notification settings', ar: 'إعدادات الإشعارات' },
  'notif.noNotifications': { en: 'No new notifications', ar: 'لا توجد إشعارات جديدة' },
  'notif.enabledDesc': { en: 'You can manage this anytime in Settings.', ar: 'يمكنك إدارة هذا في أي وقت من الإعدادات.' },
  'notif.unableEnable': { en: 'Unable to enable notifications', ar: 'تعذر تفعيل الإشعارات' },
  'notif.tryAgain': { en: 'Please try again.', ar: 'يرجى المحاولة مرة أخرى.' },
  'notif.samples': { en: ['A participant joined your conversation', 'Both perspectives have been submitted', 'Your agreement was saved', 'Your personalized insight is ready'], ar: ['انضم أحد المشاركين إلى حوارك', 'تم إرسال كلتا وجهتي النظر', 'تم حفظ اتفاقك', 'رؤيتك المخصصة جاهزة'] },

  // Private Reflections
  'reflections.createTitle': { en: 'Create a private-reflection passcode', ar: 'إنشاء رمز سري للتأملات الخاصة' },
  'reflections.createDesc': { en: 'Choose a 4-digit passcode to protect your reflections. Only you can view them.', ar: 'اختر رمزًا مكوّنًا من 4 أرقام لحماية تأملاتك. أنت وحدك تستطيع عرضها.' },
  'reflections.enterTitle': { en: 'Enter your passcode', ar: 'أدخل رمزك السري' },
  'reflections.enterDesc': { en: 'Enter your 4-digit passcode to unlock your private reflections.', ar: 'أدخل رمزك السري المكوّن من 4 أرقام لفتح تأملاتك الخاصة.' },
  'reflections.pinPlaceholder': { en: 'Enter 4-digit passcode', ar: 'أدخل رمزًا من 4 أرقام' },
  'reflections.confirmPlaceholder': { en: 'Confirm passcode', ar: 'تأكيد الرمز السري' },
  'reflections.createBtn': { en: 'Create passcode', ar: 'إنشاء رمز سري' },
  'reflections.unlockBtn': { en: 'Unlock reflections', ar: 'فتح التأملات' },
  'reflections.forgot': { en: 'Forgot passcode?', ar: 'نسيت الرمز السري؟' },
  'reflections.pinMust4': { en: 'Passcode must be 4 digits', ar: 'يجب أن يكون الرمز 4 أرقام' },
  'reflections.pwNoMatch': { en: 'Passcodes do not match', ar: 'الرمزان غير متطابقين' },
  'reflections.created': { en: 'Passcode created', ar: 'تم إنشاء الرمز السري' },
  'reflections.enter4': { en: 'Enter a 4-digit passcode', ar: 'أدخل رمزًا من 4 أرقام' },
  'reflections.incorrect': { en: 'Incorrect passcode', ar: 'رمز سري غير صحيح' },
  'reflections.unableCreate': { en: 'Unable to create passcode', ar: 'تعذر إنشاء الرمز السري' },
  'reflections.unableUnlock': { en: 'Unable to unlock', ar: 'تعذر الفتح' },
  'reflections.historyTitle': { en: 'Private reflections', ar: 'التأملات الخاصة' },
  'reflections.searchPlaceholder': { en: 'Search reflections', ar: 'ابحث في التأملات' },
  'reflections.clearDate': { en: 'Clear date filter', ar: 'مسح فلتر التاريخ' },
  'reflections.emptyTitle': { en: 'No private reflections yet', ar: 'لا توجد تأملات خاصة بعد' },
  'reflections.emptyDesc': { en: 'Reflections you save will appear here with their date and time.', ar: 'ستظهر هنا التأملات التي تحفظها مع تاريخها ووقتها.' },
  'reflections.lockedToast': { en: 'Reflections locked', ar: 'تم قفل التأملات' },
  'reflections.deleteOneTitle': { en: 'Delete this reflection?', ar: 'حذف هذا التأمل؟' },
  'reflections.deleteOneDesc': { en: 'This reflection will be permanently removed.', ar: 'سيتم حذف هذا التأمل نهائيًا.' },
  'reflections.deleteAllTitle': { en: 'Delete all reflections?', ar: 'حذف كل التأملات؟' },
  'reflections.deleteAllDesc': { en: 'All your private reflections will be permanently removed. This cannot be undone.', ar: 'سيتم حذف جميع تأملاتك الخاصة نهائيًا. لا يمكن التراجع عن ذلك.' },
  'reflections.deleteAllBtn': { en: 'Delete all reflections', ar: 'حذف كل التأملات' },
  'reflections.reflectionDeleted': { en: 'Reflection deleted', ar: 'تم حذف التأمل' },
  'reflections.allDeleted': { en: 'All reflections deleted', ar: 'تم حذف كل التأملات' },
  'reflections.unableDelete': { en: 'Unable to delete', ar: 'تعذر الحذف' },
  'reflections.resetTitle': { en: 'Reset the reflections vault?', ar: 'إعادة ضبط خزنة التأملات؟' },
  'reflections.resetDesc': { en: 'For your privacy, the passcode cannot be recovered. Resetting will permanently delete all saved reflections and let you create a new passcode.', ar: 'لخصوصيتك، لا يمكن استعادة الرمز السري. ستؤدي إعادة الضبط إلى حذف كل التأملات المحفوظة نهائيًا ويتيح لك إنشاء رمز سري جديد.' },
  'reflections.resetBtn': { en: 'Reset vault', ar: 'إعادة ضبط الخزنة' },
  'reflections.vaultReset': { en: 'Reflections vault reset', ar: 'تمت إعادة ضبط خزنة التأملات' },
  'reflections.unableReset': { en: 'Unable to reset vault', ar: 'تعذر إعادة ضبط الخزنة' },
  'reflections.uaeTime': { en: 'UAE time', ar: 'توقيت الإمارات' },

  // Privacy and Safety
  'privacySafety.title': { en: 'Privacy and safety', ar: 'الخصوصية والأمان' },
  'privacySafety.intro': { en: 'Your trust comes first. Everything you share on Wasl stays private, secure, and completely under your control.', ar: 'ثقتك أولًا. كل ما تشاركه في «وصل» يبقى خاصًا وآمنًا وتحت سيطرتك بالكامل.' },
  'privacySafety.privateTitle': { en: 'Your information is private', ar: 'معلوماتك خاصة' },
  'privacySafety.privateBody': { en: 'Your conversations, perspectives, reflections, and agreements are visible only to you and the participants you invite. No one else can read them.', ar: 'محادثاتك ووجهات نظرك وتأملاتك واتفاقياتك تظهر لك وللمشاركين الذين تدعوهم فقط. لا أحد غيرهم يستطيع الاطلاع عليها.' },
  'privacySafety.secureTitle': { en: 'Your data is secure', ar: 'بياناتك آمنة' },
  'privacySafety.secureBody': { en: 'All information is encrypted and stored securely. Private reflections are protected by an additional passcode that only you know.', ar: 'تُشفّر جميع المعلومات وتُخزّن بأمان. تُحمى التأملات الخاصة برمز سري إضافي لا يعرفه سواك.' },
  'privacySafety.noSharingTitle': { en: 'Never shared or sold', ar: 'لا تتم مشاركتها أو بيعها' },
  'privacySafety.noSharingBody': { en: 'Wasl never shares your personal information with third parties, and never uses your content to train external models or for advertising. Your data is not used by anyone other than you and your invited participants.', ar: 'لا تشارك «وصل» معلوماتك الشخصية مع أي طرف ثالث، ولا تستخدم محتواك لتدريب نماذج خارجية أو للإعلان. لا يستخدم بياناتك أحد سواك ومن تدعوهم من المشاركين.' },
  'privacySafety.respectTitle': { en: 'Respectful by default', ar: 'احترام افتراضيًا' },
  'privacySafety.respectBody': { en: 'You can edit or delete your data at any time, and you decide who takes part in each conversation. You are always in control of your information.', ar: 'يمكنك تعديل بياناتك أو حذفها في أي وقت، وأنت من يقرر من يشارك في كل حوار. أنت دائمًا المتحكم في معلوماتك.' },


  'editProfile.title': { en: 'Edit profile', ar: 'تعديل الملف الشخصي' },
  'editProfile.displayName': { en: 'Display name', ar: 'الاسم الظاهر' },
  'editProfile.namePlaceholder': { en: 'Your name', ar: 'اسمك' },
  'editProfile.nickname': { en: 'Nickname (optional)', ar: 'الاسم المفضل (اختياري)' },
  'editProfile.nicknamePlaceholder': { en: 'What your family calls you', ar: 'الاسم الذي تناديك به عائلتك' },
  'editProfile.selectRole': { en: 'Select a role', ar: 'اختر دورًا' },
  'editProfile.saving': { en: 'Saving your changes', ar: 'جارٍ حفظ التغييرات' },
  'editProfile.updated': { en: 'Profile updated', ar: 'تم تحديث الملف الشخصي' },
  'editProfile.updateFail': { en: 'Unable to update profile', ar: 'تعذر تحديث الملف الشخصي' },
  'editProfile.discardTitle': { en: 'Discard unsaved changes?', ar: 'تجاهل التغييرات غير المحفوظة؟' },
  'editProfile.discardDesc': { en: 'Your edits will not be saved.', ar: 'لن يتم حفظ تعديلاتك.' },
  'editProfile.keepEditing': { en: 'Keep editing', ar: 'متابعة التعديل' },
  'editProfile.discard': { en: 'Discard changes', ar: 'تجاهل التغييرات' },

  'privacySettings.title': { en: 'Privacy settings', ar: 'إعدادات الخصوصية' },
  'privacySettings.updated': { en: 'Privacy preference updated', ar: 'تم تحديث تفضيل الخصوصية' },
  'privacySettings.saveDrafts': { en: 'Save unfinished responses locally', ar: 'حفظ الردود غير المكتملة على الجهاز' },
  'privacySettings.saveDraftsDesc': { en: 'Drafts stay on this device until you submit.', ar: 'تبقى المسودات على هذا الجهاز حتى تقوم بإرسالها.' },
  'privacySettings.analytics': { en: 'Allow anonymous usage analytics', ar: 'السماح بتحليلات الاستخدام المجهولة' },
  'privacySettings.analyticsDesc': { en: 'Helps us improve Wasl without identifying you.', ar: 'يساعدنا على تحسين وصل دون التعرف على هويتك.' },
  'privacySettings.hidePreviews': { en: 'Hide notification previews', ar: 'إخفاء معاينات الإشعارات' },
  'privacySettings.hidePreviewsDesc': { en: 'Only show the app name on lock-screen alerts.', ar: 'إظهار اسم التطبيق فقط في تنبيهات شاشة القفل.' },
  'privacySettings.footer': { en: 'These choices apply across Wasl and update immediately.', ar: 'تنطبق هذه الخيارات في جميع أجزاء وصل ويتم تحديثها فورًا.' },

  'myData.title': { en: 'My data', ar: 'بياناتي' },
  'myData.savedAgreements': { en: 'Saved agreements', ar: 'الاتفاقات المحفوظة' },
  'myData.privateReflections': { en: 'Private reflections', ar: 'التأملات الخاصة' },
  'myData.activeSessions': { en: 'Active sessions', ar: 'الجلسات النشطة' },
  'myData.export': { en: 'Export my data', ar: 'تصدير بياناتي' },
  'myData.deleteSelected': { en: 'Delete selected data', ar: 'حذف البيانات المحددة' },
  'myData.deleteHistory': { en: 'Delete conversation history', ar: 'حذف سجل المحادثات' },
  'myData.exported': { en: 'Your data has been exported', ar: 'تم تصدير بياناتك' },
  'myData.exportFailed': { en: 'Export failed', ar: 'فشل التصدير' },
  'myData.historyDeleted': { en: 'Conversation history deleted', ar: 'تم حذف سجل المحادثات' },
  'myData.selectedDeleted': { en: 'Selected data deleted', ar: 'تم حذف البيانات المحددة' },
  'myData.unableDelete': { en: 'Unable to delete', ar: 'تعذر الحذف' },
  'myData.deleteHistoryTitle': { en: 'Delete conversation history?', ar: 'حذف سجل المحادثات؟' },
  'myData.deleteHistoryDesc': { en: 'This will permanently delete your conversation history from this device.', ar: 'سيؤدي هذا إلى حذف سجل المحادثات نهائيًا من هذا الجهاز.' },
  'myData.deleteReflectionsTitle': { en: 'Delete private reflections?', ar: 'حذف التأملات الخاصة؟' },
  'myData.deleteReflectionsDesc': { en: 'This removes your private reflections. Agreements will remain.', ar: 'سيؤدي هذا إلى إزالة تأملاتك الخاصة، وستبقى الاتفاقات.' },
  // Account and profile
  'account.title': { en: 'My account', ar: 'حسابي' },
  'account.userFallback': { en: 'User', ar: 'مستخدم' },
  'account.editProfile': { en: 'Edit profile', ar: 'تعديل الملف الشخصي' },
  'account.changePhoto': { en: 'Change profile photo', ar: 'تغيير صورة الملف الشخصي' },
  'account.familyRole': { en: 'Family role', ar: 'الدور العائلي' },
  'account.language': { en: 'Language', ar: 'اللغة' },
  'account.privacyData': { en: 'Privacy and data', ar: 'الخصوصية والبيانات' },
  'account.signOut': { en: 'Sign out', ar: 'تسجيل الخروج' },
  'account.signOutTitle': { en: 'Sign out of Wasl?', ar: 'تسجيل الخروج من وصل؟' },
  'account.signOutDesc': { en: 'You can sign back in anytime with your account.', ar: 'يمكنك تسجيل الدخول مرة أخرى في أي وقت باستخدام حسابك.' },
  'account.uploading': { en: 'Uploading...', ar: 'جارٍ الرفع...' },
  'account.takePhoto': { en: 'Take a photo', ar: 'التقاط صورة' },
  'account.chooseGallery': { en: 'Choose from gallery', ar: 'اختيار من معرض الصور' },
  'account.removePhoto': { en: 'Remove photo', ar: 'إزالة الصورة' },
  'account.photoUpdated': { en: 'Profile photo updated', ar: 'تم تحديث صورة الملف الشخصي' },
  'account.photoRemoved': { en: 'Profile photo removed', ar: 'تمت إزالة صورة الملف الشخصي' },
  'account.photoUploadFail': { en: 'Unable to upload photo', ar: 'تعذر رفع الصورة' },
  'account.tryAgain': { en: 'Please try again.', ar: 'يرجى المحاولة مرة أخرى.' },
  'account.roleUpdated': { en: 'Family role updated', ar: 'تم تحديث الدور العائلي' },
  'account.langChanged': { en: 'Language changed to {language}', ar: 'تم تغيير اللغة إلى {language}' },
  'account.roles': { en: ['Parent', 'Teenager', 'Sibling', 'Grandparent', 'Guardian', 'Other family member'], ar: ['والد أو والدة', 'مراهق', 'أخ أو أخت', 'جد أو جدة', 'ولي أمر', 'فرد آخر من العائلة'] },
  'account.languages': { en: ['English', 'العربية'], ar: ['English', 'العربية'] },

  // Agreement flow
  'agreement.chooseStep': { en: 'Choose one step forward', ar: 'اختارا خطوة واحدة للأمام' },
  'agreement.whyHelp': { en: 'Why this may help', ar: 'لماذا قد يساعد هذا؟' },
  'agreement.custom': { en: 'Create our own agreement', ar: 'إنشاء اتفاقنا الخاص' },
  'agreement.titlePlaceholder': { en: 'Agreement title', ar: 'عنوان الاتفاق' },
  'agreement.descriptionPlaceholder': { en: 'What will each person do?', ar: 'ماذا سيفعل كل شخص؟' },
  'agreement.date': { en: 'Agreement date', ar: 'تاريخ الاتفاق' },
  'agreement.saving': { en: 'Saving...', ar: 'جارٍ الحفظ...' },
  'agreement.save': { en: 'Save our agreement', ar: 'حفظ اتفاقنا' },
  'agreement.createdTitle': { en: 'You created a shared agreement', ar: 'لقد أنشأتم اتفاقًا مشتركًا' },
  'agreement.quote': { en: 'Progress does not require perfect agreement—only a respectful first step.', ar: 'التقدم لا يتطلب اتفاقًا مثاليًا، بل خطوة أولى قائمة على الاحترام.' },
  'agreement.returnHome': { en: 'Return home', ar: 'العودة إلى الرئيسية' },

  // Analysis and perspective input
  'analysis.findingCommonGround': { en: 'Finding common ground', ar: 'البحث عن نقطة مشتركة' },
  'analysis.messages': { en: ['Reading both perspectives respectfully', 'Identifying the main topic', 'Checking for shared concerns', 'Removing blaming language', 'Preparing practical next steps'], ar: ['قراءة وجهتي النظر باحترام', 'تحديد الموضوع الأساسي', 'البحث عن الاهتمام المشترك', 'إزالة لغة اللوم', 'إعداد خطوات عملية'] },
  'perspective.participantA': { en: 'Participant A', ar: 'المشارك الأول' },
  'perspective.participantB': { en: 'Participant B', ar: 'المشارك الثاني' },
  'perspective.title': { en: "{name}'s perspective", ar: 'وجهة نظر {name}' },
  'perspective.private': { en: 'Private until analysis begins', ar: 'تبقى خاصة حتى يبدأ التحليل' },
  'perspective.type': { en: 'Type', ar: 'كتابة' },
  'perspective.speak': { en: 'Speak', ar: 'تحدث' },
  'perspective.transcriptPlaceholder': { en: 'Your transcript will appear here for editing…', ar: 'سيظهر النص هنا ويمكنك تعديله…' },
  'perspective.typingPlaceholder': { en: 'Describe what happened and what you want the other person to understand…', ar: 'اشرح ما حدث وما الذي تريد أن يفهمه الطرف الآخر…' },
  'perspective.optionalPrompts': { en: 'Optional prompts', ar: 'أسئلة اختيارية' },
  'perspective.prompts': { en: ['What I need others to understand…', 'What I may have misunderstood…', 'One change I would appreciate…'], ar: ['ما أحتاج أن يفهمه الآخرون…', 'ما الذي ربما أسأت فهمه…', 'تغيير واحد سأقدّره…'] },
  'perspective.savePrivate': { en: 'Save privately', ar: 'حفظ بشكل خاص' },
  'perspective.saving': { en: 'Saving...', ar: 'جارٍ الحفظ...' },
  'perspective.loadError': { en: 'Unable to load this conversation.', ar: 'تعذر تحميل هذا الحوار.' },
  'perspective.saveError': { en: 'Unable to save your perspective. Please try again.', ar: 'تعذر حفظ وجهة النظر. حاول مرة أخرى.' },

  // Speech to text
  'speech.unsupported': { en: 'Speech-to-text is not supported in this browser. Try Chrome or Safari.', ar: 'تحويل الكلام إلى نص غير مدعوم في هذا المتصفح. جرّب Chrome أو Safari.' },
  'speech.permission': { en: 'Microphone permission is required.', ar: 'يجب السماح باستخدام الميكروفون.' },
  'speech.stopped': { en: 'Speech recognition stopped. Please try again.', ar: 'توقف التعرف على الكلام. حاول مرة أخرى.' },
  'speech.listening': { en: 'Listening... tap to stop', ar: 'جارٍ الاستماع... اضغط للإيقاف' },
  'speech.tap': { en: 'Tap and start speaking', ar: 'اضغط وابدأ بالكلام' },
  'speech.start': { en: 'Start speech to text', ar: 'بدء تحويل الكلام إلى نص' },
  'speech.stop': { en: 'Stop listening', ar: 'إيقاف الاستماع' },
};

export function tr(lang, key, params) {
  const e = STRINGS[key];
  if (!e) return key;
  let s = e[lang] !== undefined ? e[lang] : e.en;
  if (params && typeof s === 'string') {
    Object.keys(params).forEach((p) => {
      s = s.split(`{${p}}`).join(params[p]);
    });
  }
  return s;
}

function buildOptions(lang, key) {
  const e = STRINGS[key];
  if (!e) return [];
  const en = e.en || [];
  const cur = e[lang] || en;
  return en.map((value, i) => ({ value, label: cur[i] || value }));
}

function displayValue(lang, key, value) {
  const e = STRINGS[key];
  if (!e) return value;
  const en = e.en || [];
  const cur = e[lang] || en;
  const i = en.indexOf(value);
  return i >= 0 ? cur[i] : value;
}

export function useT() {
  const { settings, setLanguage } = useSettings();
  const lang = settings.language || 'en';
  const t = (key, params) => tr(lang, key, params);
  const isRTL = lang === 'ar';

  // Ensure stored timestamps are interpreted as UTC before converting to UAE time.
  // which would cause browsers to parse them as local time and shift the displayed time.
  const toUTC = (d) => {
    const s = (d instanceof Date) ? d.toISOString() : String(d);
    if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(s) && !/[zZ]$|[+-]\d{2}:?\d{2}$/.test(s)) return s + 'Z';
    return s;
  };

  const fmtDate = (d) =>
    new Date(toUTC(d)).toLocaleDateString(lang === 'ar' ? 'ar' : 'en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Asia/Dubai',
      ...(lang === 'ar' ? { numberingSystem: 'latn' } : {}),
    });

  const fmtTime = (d) =>
    new Date(toUTC(d)).toLocaleTimeString(lang === 'ar' ? 'ar' : 'en-US', {
      hour: 'numeric',
      minute: '2-digit',
      timeZone: 'Asia/Dubai',
      ...(lang === 'ar' ? { numberingSystem: 'latn' } : {}),
    });

  return {
    t,
    lang,
    isRTL,
    setLanguage,
    fmtDate,
    fmtTime,
    options: (key) => buildOptions(lang, key),
    displayValue: (key, value) => displayValue(lang, key, value),
  };
}
