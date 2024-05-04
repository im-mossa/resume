//ایجاد املاک 
const property1 = new Selling("1", "ویلایی سرچشمه ۴۰۰ متر ۷۵ متر تجاری", "Residential sales", "personal", "House", "سرچشمه کوچه حسینیه باسم ", "کرمانشاه", "کرمانشاه", "ایران", 400, 0, 1380, 3, "8,000,000,000", "20,000,000", false, true, true, false, "", "", "ملک در سرچشمه کوچه حسینیه باسم قرار دارد. فروش به علت مهاجرت متری یک میلیون تومان زیر قیمتی که مشاهده میکنید. ملک فوق دارای ۷۵ متر تجاری میباشد لطفا مشتری تماس بگیرد همه چیز واضح هست و ملک خیربینی دوماه اینده دوبرار قیمت فعلی هم نمیدم ...", false, "", "./src/img/house1/144d8d8c-5f93-4b94-8b9f-c941959f652d.jpg");

const property2 = new Selling("2", "آپارتمان‌فردوسی( شهرفرنگ) سندتکبرگ دوبرغرق نور", "Residential sales", "personal", "the apartment", "خیابان فردوسی بالاتر ازسه راه برق روبروی سینما آزادی(اولین کوچه نبش خیابان فرح)", "کرمانشاه", "کرمانشاه", "ایران", 72, 2, 1383, 2, "2,322,000,000", "32,250,000", false, true, true, true,"","","باهمکف۳طبقه۶واحد( طبق سندطبقه۲)۳۰۰ رهن میشینم درصورت کمبودنقدینگی( قیمتم منصفانه وزیر فی بازار زدم) تخفبفم درحدمعقول. پارکینگ مشاع بدون مزاحم پشت ساختمان مشرف به رودخانه. تراس وانباری قید درسندبجزپارکینگ بهترین نقطه فردوسی ازلحاظ محل وآب وهوا ) خریدار۱۰۰ ٪ هستی بیا بازدید اگه نیستی وقت خودتو منو نگیر همه گرفتارن ممنون ازدرک شما. آدرس: خیابان فردوسی بالاتر ازسه راه برق روبروی سینما آزادی(اولین کوچه نبش خیابان فرح)", false, "", "./src/img/house2/213fda15-2153-40ee-a9d6-14390590ca2e.jpg", "./src/img/house2/e23f7c04-7cbc-45ad-afdc-87ed3aa7b61e.jpg", "./src/img/house2/45d0788e-e354-492e-956f-7f24ee0f6dba.jpg", "./src/img/house2/18fa6257-3859-4381-8fee-28181aff8c3c.jpg", "./src/img/house2/9b4a4043-bd4c-4b37-b9b9-b1cf44cbe0ec.jpg", "./src/img/house2/7ffaa613-eed3-4fd2-bc5b-eb36839707eb.jpg");

const property3 = new Selling("3", "زمین /آپارتمان/پیش فروش", "Construction projects", "real-estate-business", "the apartment", "آپارتمان دولت آباد رو به روی شهرک آناهیتا شهرک امام خمینی بهارستان 2", "کرمانشاه", "کرمانشاه", "ایران","","","","","پیش 1000,000,000","","","","","","","","فروش اقساط ساختمان از 1 تا 10 اقساط وام 20 ساله با کارمزد 4% آپارتمان دولت آباد روبروی شهرک آناهیتا شهرک امام خمینی بهارستان 2 خانه دار شدن با رهن کم خرید پیامک حواله نیامد یا حتی رد دولت آباد بلوار شهید بهرامی کارشناس املاک من کاوه ذهابی", false, "", "./src/img/house3/1.jpg");

const property4 = new Selling("4", "آپارتمان ۱۵۰ متر.فول بازسازی.برق", "Residential sales", "personal", "the apartment", "خیابان برق", "کرمانشاه", "کرمانشاه", "ایران", 150, 3, 1391, 3, "7,000,000,000", "46,666,000", true, true, true, true, "", "", "آپارتمان ۱۵۰ متر کوچه نهم برق. ویوپارک کوهستان. شیک و بازسازی شده.بدون هزینه. بسیار خوش نقشه و بدون پرتی. فول امکانات.سه خواب ، یک مستر.جکوزی. کمد دیواری فراوان. کاغذ دیواری ایتالیایی و قابل شستشو.", false, "", "./src/img/house4/8ed60c0d-c19a-44ff-b28d-fff7e49bc743.jpg", "./src/img/house4/402b2400-f6f8-4b62-a0e7-c15458f969ce.jpg", "./src/img/house4/dca25aae-bba8-46a0-8394-88debcff0e05.jpg", "./src/img/house4/4f5a6c32-da86-41ed-9726-0dbe83ce6d2b.jpg", "./src/img/house4/4f5a6c32-da86-41ed-9726-0dbe83ce6d2b.jpg", "./src/img/house4/4ee3f4a5-9045-4319-932e-50a575294a0d.jpg");

const property5 = new Selling("5", "آپارتمان شخصی ساز با سازه اسکلت.آدرس خیابان سیروس", "Residential sales", "personal", "the apartment", "بلوار مطهری", "کرمانشاه", "کرمانشاه", "ایران", 77, 1, 1389, 2, "2,000,000,000", "25,974,000", false, true, true, false, "", "", "فاصله تا خیابان اصلی بیست متر.دسترسی آسان به مراکز خرید و درمانی.کل ساختمان ۶ واحد با همسایگان محترم.طبقه اول سمت کوچه.قابلیت رهن تا ۴۵۰.پرداختی ۱۵۵۰.داری دو خواب ۱۵ و ۱۲ متری", false, "", "./src/img/house5/9f139a1d-739b-42a9-b925-22a0452f4a2a.jpg", "./src/img/house5/57bb5cda-3f87-48a3-b5fa-b7913f6fed8f.jpg", "./src/img/house5/88f0685b-0eed-41b3-a0c9-242e543a2e10.jpg", "./src/img/house5/461cb2f7-b595-4962-91b2-eecaf79eeba1.jpg", "./src/img/house5/97092902-f23e-48b7-915e-2712a38e2200.jpg", "./src/img/house5/ddeec128-93fc-41ab-a128-dbb8564c42a2.jpg", "./src/img/house5/fd7011a5-5074-42da-89ef-c08bbdffed03.jpg", "./src/img/house5/06d5d701-4975-4be3-93b8-507b352819b7.jpg", "./src/img/house5/4cc3a59c-60ad-4ecc-8456-5b0076f7a2e3.jpg", "./src/img/house5/2c0f93d7-17bd-41fa-9b73-53f12f152064.jpg",);

const property6 = new Selling("6", "خانه مسکن مهر سجادیه،۷۵متر", "Residential sales", "personal", "the apartment", "مسکن مهرسجادیه بلوک43", "کرمانشاه", "کرمانشاه", "ایران", 75, 3, 1392, 2, "900,000,000", "12,000,000", true, true, true, true, "", "", "خانه تمیز ۷۵ متری در مسکن مهرسجادیه بلوک۴۳ طبقه سه از پنج. ۲خوابه هرکدام ۱۲متر. دارای دو بالکن،انباری بزرگ, کف سرامیک,  پکیج،شوفاژ،کولر, کابینت بالا و پایین, درب ضدسرقت, همسایه های خوب و آرام. زیرقیمت گذاشتم زودتر فروش بره", false, "", "./src/img/house6/e17a7075-7f3c-4e4b-a677-f674c2259e98.jpg", "./src/img/house6/af553f24-6dfb-4ede-9107-f73779ef5d19.jpg", "./src/img/house6/a4350ddb-dc75-4719-986f-a7c85654628d.jpg", "./src/img/house6/2315a2bb-e10f-426e-b820-8b449174d9c6.jpg", "./src/img/house6/722ab469-8dfd-4c04-8700-7f4424e0b01e.jpg", "./src/img/house6/42c02a82-e278-4555-8caf-7cd033dbe467.jpg",  "./src/img/house6/23e8fa75-85c2-4acf-a9b6-a1d267f37e70.jpg", "./src/img/house6/6fc9f546-cc87-4f9f-90f5-b5a24f9f3e65.jpg");

const property7 = new Selling("7", "آپارتمان ۱۸۰متری الهیه شهرک معراج", "Residential sales", "real-estate-business", "the apartment", "بلوار گلها", "کرمانشاه", "کرمانشاه", "ایران", 180, 4, 1402, 3, "4,680,000,000", "26,000,000", true, true, true, true, "", "", "فروش ۳واحد از ۶واحد یک دستگاه آپارتمان ۱۸۰متری نوساز خشک واقع در الهیه شهرک معراج", true, "", "./src/img/house7/b7116045-448b-4ac2-bb2f-46e7dfe85bce.jpg", "./src/img/house7/537eb304-2c9c-4819-8bed-f72c71c350a2.jpg", "./src/img/house7/81f5f6c9-cbec-46fe-98ae-7784d7b7eab9.jpg", "./src/img/house7/026e4105-b932-4e2b-83e6-3124da697704.jpg", "./src/img/house7/9d39409c-b20a-41bb-b058-2d9a7a01b9de.jpg");

const property8 = new DailyRent("8", "اپارتمان یه خوابه شیک و نوساز پارکینگدار", "Short term rental", "personal", "the apartment", "طاقبستان", "کرمانشاه", "کرمانشاه", "ایران", 80, 0, 1, "350,000", "400,000", "400,000", 2, "50,000", false, true, false, "", "", "فقط تماس پاسخگو هستم به هیچ عنوان جواب پیام نمیدم قیمت شب تا صبح(500هزار)ساعت-9-شب تا-10-صبح به هیچ عنوان تخفیف نداره لطفا تخفیف نخاین هر دو سویت ویلایی هستن دربست سویت شهرک تعاون پارکینگ دارد ماشین رو سویت شهرک معلم پارکینگ نداره ولی جا پارک سه تا ماشین داره محله امن بی سر صدا تسویه هنگام تحویل کلید", false, "", "./src/img/house8/67ef2660-5bce-4317-bc79-c86bf902bc30.jpg", "./src/img/house8/432ab0a8-01b9-47b0-a82f-6f440cdebf85.jpg", "./src/img/house8/ab3629bd-8457-4ee8-ac0e-c7e1a7d8bb5b.jpg", "./src/img/house8/6b58d6ae-9ff3-4198-8b12-388ec5a3279f.jpg", "./src/img/house8/4da0df8a-a98d-4532-b8e9-77a5c330a42d.jpg");

const property9 = new Monthlyrent("9", "مغازه ۴۴م در خیابان دولت اباد تازه ساز", "Office and commercial rent", "personal", "shop", "خ حشمتی مابین درب دوم مسکن مهر و دکه های دولت اباد", "کرمانشاه", "کرمانشاه", "ایران", 44, 0, 1, "", "", "مغازه ۴۴ متری تازه ساز. در بهترین نقطه دولت اباد خ حشمتی(مابین درب دوم مسکن مهر و دکه های دولت اباد ارتفاع مغازه ۴ متر تا سقف کاشی. سرویس بهداشتی اب برق گاز اختصاصی مناسب برای تمام شغل ها فقط مصرف کننده تماس بگیره تخیله و اماده تحویل ادرس نوشتم خیابان حشمتی تبدیل شه. ۲۰۰ رهن کامل", true, "100,000,000", "4,000,000", false, "", "./src/img/shop1/1.jpg", "./src/img/shop1/2.jpg", "./src/img/shop1/3.jpg",);

const property10 = new Monthlyrent("10", "سه دهنه مغازه دولت آباد", "Office and commercial rent", "personal", "shop", "بلوار مسکن مهر", "کرمانشاه", "کرمانشاه", "ایران", 50, 0, 1, "", "", "سه دهنه مغازه ۱۰ متر بر خیابان.دو بر.دارای حمام و سرویس بهداشتی", true, "300,000,000", "28,000,000", false, "", "./src/img/shop2/e6b22bbe-b0e1-4a41-a4d9-8fc1e9e32c62.jpg");

const property11 = new Selling("11", "مغازه،۲۳ متر، پاساژ گلستان", "Administrative and commercial sales", "real-estate-business", "shop", "الهیه میدان رسالت", "کرمانشاه", "کرمانشاه", "ایران", 23.5, 0, 1397, 0, "3,680,000,000", "160,000,000", false, false, false, false, "", "", "با سلام, متراژ ۲۳/۵, بَر ۶/۷۰, سند در دست اقدام, تنها پاساژ کرمانشاه که سند تک برگ دارد, آبنمای موزیکال, شهر بازی و رستوران, پله برقی دو ردیف رفت و برگشت, سه مسیر آسانسور, آسانسور شیشه‌ای, سرمایش و گرمایش مرکزی و خارجی, لوکیشن مناسب, جهت بازدید به املاک کاسیان در الهیه میدان رسالت ابتدای بلوار جانبازان آپارتمان کاسیان املاک کاسیان مراجعه بفرمایید. املاک کاسیان", true, "", "./src/img/shop3/f2b317dc-597e-403d-a5ac-d8480872fbbe.jpg", "./src/img/shop3/d8d9e75a-1428-422b-be9e-3d2c09035367.jpg", "./src/img/shop3/954e7392-da3d-408e-a468-2770aad1e2b6.jpg", "./src/img/shop3/8b4559bc-b0a5-4e7d-820b-57c4f09df2bd.jpg");

const property12 = new Selling("12", "میدان شهرداری معلم شرقی, 16 متری", "Administrative and commercial sales", "personal", "shop", "میدان شهرداری معلم شرقی", "کرمانشاه", "کرمانشاه", "ایران", 16, 0, 1390, 1, "5,700,000,000", "356,250,000", false, false, false, false, "", "", "سرقفلی یک باب مغازه واقع در میدان شهرداری سابق خیابان معلم شرقی طبقه همکف پاساژ صدف. بمتراژ 16 متر کف و 16 متر بالکن فول امکانات کولر گازی دکوراسیون کامل واگزارمیگردد.", false, "", "./src/img/shop4/40b322e3-f2fa-4c02-8015-f7770c8c0f2c.jpg", "./src/img/shop4/a8613be6-9cd9-41bf-814c-6e40a1275eb9.jpg", "./src/img/shop4/ef5f1b95-46a1-4868-9358-834bfc8047a1.jpg", "", "", "");

const property13 = new DailyRent("13", "اجاره روزانه باغ ویلا(استخر سرپوشیده)جاده بیستون", "Short term rental", "real-estate-business", "House", "جاده بیستون", "کرمانشاه", "کرمانشاه", "ایران", 3000, 0, 2, "3,000,000", "4,000,000", "6,000,000", 12, "150,000", false, true, false, "", "", "اجاره باغ روزانه(جاده بیستون) مناسب دورهمی،تولد، جشن های خانوادی و عکسبرداری, محیطی کاملا امن, فول امکانات, فضایی سبز و پاییزی, خوش آب و هوا دارای استخر سرپوشیده (همراه دستگاه تسویه آب) فوتبال دستی،تاب ،سیستم کامل صوتی سالن بزرگ نورپردازی شده و مجهز ب TV, میز و صندلی مناسب جهت دورهمی،تولد و... , آشپز خانه (کابینت،گاز ،یخچال،کتری و قوری و تمامی ظرف و ظروف) پارکینگ اختصاصی. آدرس: کرمانشاه، جاده بیستون، بعد از رخش،ابتدای جاده سرارود, دسترسی اسان به مراکز خرید. با ما ب روز باشید.", true, "", "./src/img/house9/17dd0db7-7751-40dd-a63d-705de156faad.jpg", "./src/img/house9/1c2c665b-9944-4bbc-9b84-3318f82ac955.jpg", "./src/img/house9/2c9e7677-73f6-498a-a642-5653fbf190f0.jpg", "./src/img/house9/2f8d69ca-9c8c-4f6a-93a3-6410b5831830.jpg", "./src/img/house9/44eb876a-b7b2-4da4-8979-44f98b6758cc.jpg", "./src/img/house9/6903d31b-4ca6-4fda-aa13-c7540f4d17b6.jpg", "./src/img/house9/915bdb8d-58a2-4312-97e3-c1a8a43b44d9.jpg", "./src/img/house9/c37cb51d-2571-4b92-8195-23516b72775d.jpg", "./src/img/house9/cbd0338a-9e7d-4553-81f3-a1f4aeaedd07.jpg", "./src/img/house9/d4b407ea-3598-43e2-851c-27c8e5392299.jpg", "./src/img/house9/eea03889-8fe6-4693-ba21-98f657f05500.jpg");

const property14 = new Selling("14", "تک واحدی۳خوابه", "Construction projects", "personal", "the apartment", "چهاراه مطهری به طرف کارمندان", "کرمانشاه", "کرمانشاه", "ایران", 145, 5, 1403, 3, "پیش 2,000,000,000", "", true, true,true, true, "", "", "۵طبقه تک واحدی شمالی حدود ۱۴۵ متری ۳ خوابه مالک و سازنده یک نفر شخصی ساز پارکینگ و انباری اختصاصی و جادار با مجوز احداث بنا و ساخت در زیربنا و طبقات ذکر شده طبق رای نهایی کمیسیون ماده صد،آسانسور۶ نفره،دارای سیستم آبرسانی ۲اسب پرفشار درب برقی ریموت دار گرمایش کف طبقه اول آیفون تصویری درب ضد سرقت ۳خواب نورگیر فضای کمد دیواری برای خوابها سرویس و حمام بزرگ حال و پذیرایی بزرگ و پرنور درب و پنجره های دو جداره کف سرامیک آشپزخانه و بالکن بزرگ نمای سنگ، ۷۰ درصد ساخت انجام شده مابقی مراحل ساخت به سرعت آغاز میشود پیش فروش تک واحدی در بهترین لوکیشن منطقه اولین کوچه بعد از چهاراه و بلوار اصلی پشت بانک سینا با قابلیت دسترسی به همه جا و همه بازار و مراکزخرید و درمانی ادارات و بانکها برای روییت ساختمان به آدرس لوکیشن رجوع شود متراژ حدود ۱۵۰ متر مربع برابر سند دارای وام ۴۰۰ م ۱۷ ساله ۱۸ درصد بانک ملی که در صورت نیاز خریدار و واجدشرایط بودن در هنگام سند منتقل میشود", true, "", "./src/img/house10/02bd327f-d887-4824-a444-4a3172408cb1.jpg", "./src/img/house10/0dcc362a-7b54-4924-80d0-119573170e9d.jpg", "./src/img/house10/102ea1c8-a5cd-4596-b8c1-a03575e6e8c1.jpg", "./src/img/house10/4051cb4a-ebc3-412a-9a8d-48e86c572460.jpg", "./src/img/house10/6e573296-4f76-4229-b643-705ca069040b.jpg", "./src/img/house10/6ef1c0e2-29eb-48bf-86d1-4c4c7ff7af24.jpg", "./src/img/house10/7a445204-d824-4c05-b5be-cde187eed04d.jpg", "./src/img/house10/a2e85833-d086-4341-b6e5-98a326ed3e7b.jpg");

const property15 = new Monthlyrent("15", "اجاره اداری", "Office and commercial rent", "real-estate-business", "Office", "متخصصین", "کرمانشاه", "کرمانشاه", "ایران", 400, 0, 3, "", "", "مالکین محترم میتوانید ملک خودرابرای فروش یا اجاره به مابسپارید. برای اطلاع از فایل های مشابه تماس بگیرید مشاور شما:[نازنین محمدی] کلیدنخورده, 220متر کف, 180طبقه اول, 3سرویس بهداشتی, لوستر, نورپردازی شده, مناسب برای مطب. دفترکار. رستوران.کافه. برای اطلاعات بیشترتماس بگیرید (10صبح تا10شب)", false, "500,000,000", "65,000,000", false, "", "./src/img/office1/085a25ff-881c-4795-a166-5c699c7c92b4.jpg", "./src/img/office1/db3c3006-cc7f-4401-a7fb-442e7ea2691b.jpg");

const property16 = new Selling("16", "78 متر اداری", "Administrative and commercial sales", "personal", "office", "رشیدی بسمت شهناز", "کرمانشاه", "کرمانشاه", "ایران", 78, 1, 1402, 1, "5,500,000,000", "70,512,000", false, false, false, false, "", "", "رشیدی بسمت شهناز سمت راست بعد از چاپ لک مغازه ۳۴متر اپارتمان ۴۳متر جمعا متراژ اپارتمان و مغازه حدودا ۷۸ متر میباشد حدودا بر مغازه ۶.۵متر اپارتمان یک اتاق حال و سرویس حمام عالی پر نور معاوضه هم دارم", true, "", "./src/img/office2/6c0c03e5-94fb-4a1f-abc3-b6cac7231038.jpg", "./src/img/office2/ed78d24f-86e9-4440-908c-ec365f851842.jpg");

const property17 = new Monthlyrent("17", "اجاره آپارتمان ۹۲ متری", "Residential rent", "real-estate-business", "the apartment", "بلوار شاهد الهیه", "کرمانشاه", "کرمانشاه", "ایران", 92, 4, 2, "", "", "مشاورین املاک ستاره گلستان. سلیقه شما اولویت کارماست اجاره آپارتمان ۹۲ متری دلنشین /الهیه بلوارشاهد.  پذیرایی باکس نورگیر, دوخواب, لوستر, کف سرامیک, کمددیواری, آشپزخانه باکس فول, کابینت mdf, هود لمسی, گاز صفحه ای, کولرآبی, شوفاژ, آسانسور, انباری, بالکن, پارکینگ اختصاصی خوش پارک. پاسخگویی ۲۴, کارشناس امور ملکی : شاه محمدی. جهت موارد مشابه با توجه به بودجه و سلیقه خود تماس بگیرید. آدرس : گلستان روبروی اداره شیلات نبش کوچه مهدی باقری", false, "370,000,000", "3,000,000", false, "", "./src/img/house11/ba7062de-a28c-4545-a37e-d65218f3e1f1.jpg");

const property18 = new Monthlyrent("18", "اجاره آپارتمان ۱۵۰ متری گلستان بر خیابان اصلی", "Residential rent", "real-estate-business", "the apartment", "بلوار گل سرخ'", "کرمانشاه", "کرمانشاه", "ایران", 150, 3, 3, "", "", "سه خواب استاندارد با کمد دیواری فراوان، نشیمن بزرگ با پرده های منحصر به فرد، نشیمن بزرگ مناسب برای هر نوع چیدمان، واحد کوچک و شخصی سازی، مناسب برای افراد خواستار، در بالای موقعیت گلستان، دسترسی عالی به تمامی امکانات، قابل تبدیل ، در خیابان گلستان . واحدی با قیمت کمتر هم داریم. لطفا به دفتر املاک زنگنه مراجعه فرمایید", false, "800,000,000", "100,000", true, "", "");

const property19 = new Monthlyrent("19", "آپارتمان ، 165 متر، محدوده کوچه ثبت", "Residential rent", "personal", "the apartment", "خیابان دانشجو کوچه ثبت", "کرمانشاه", "کرمانشاه", "ایران", 165, 1, 3, "", "", "آپارتمان فول امکانات: 165 متر, 3 خوابه, دوبر بسیار دلنشین و نورگیر, پرده نو, کف سرامیک, کابینت مدرن, پکیج, 2 عددکولر آبی, آیفون تصویری, آسانسور, پارکینگ اختصاصی و مهمان, 2 عدد تراس, کناف کاری شده, تازه ساز سال ساخت 1402. املاک پدری: پارکینگ شهرداری، خ اجلالیه، روبروی مرکز مخابرات. آدرس و مشخصات دقیق فقط حضوری.", true, "700,000,000", "مجانی", false, "./src/img/house13/a4830b05-d934-497c-aa26-3bc4f67086db.mp4", "./src/img/house13/19a6c576-f5b7-43e7-ba44-c8496f708d10.jpg");

const property20 = new Monthlyrent("20", "۱۸۰متر تکواحدی ،کلید نخورده، محدوده فرهنگیان فاز ۱", "Residential rent", "personal", "the apartment", "فرهنگیان فاز 1", "کرمانشاه", "کرمانشاه", "ایران", 180, 7, 3, "", "", "180 متر تک واحدی ساخت 1403 بدون کلید، دو چراغ، نور مستقیم در تمام اتاق خواب ها، دو بالکن جادار، 3 خواب، هر سه خواب دارای کمد دیواری، 1 خواب مستر، کناف کار و نورپردازی، دیوار تلویزیون، کولر آبی و کولر، پکیج و رادیاتور، کابینت هایگلاس، صفحه گاز و هود ایتالیایی، بدون اشراف به واحد، دید بی نظیر، دسترسی آسان و سریع، محیطی آرام، امکان تمدید", true, "1,200,000,000", "مجانی", true, "./src/img/house14/0c54a2b0-5ba2-4cdd-a84a-c60e2f4727bc.mp4");

//لیست املاک ثبت شده
const properties = [
    property1,
    property2,
    property3,
    property4,
    property5,
    property6,
    property7,
    property8,
    property9,
    property10,
    property11,
    property12,
    property13,
    property14,
    property15,
    property16,
    property17,
    property18,
    property19,
    property20,
];

//لیست بر اساس نوع آگهی
const PropertyAdTypes = [];

//حلقه برای انتقال املاک به لیست جدید بر اساس نوع آگهی
for (const property of properties) {
    PropertyAdTypes.push({ adType: property.propertyAdType });
}

// نمایش اطلاعات خانه و مغازه
for (let i = 0; i < properties.length; i++) {
    const show = properties[i];
    const itemPropertyAdType = PropertyAdTypes[i].adType;

    showInfo(show,itemPropertyAdType);
}

// function toggleSidebar() {
//     document.querySelector('.sidebar').classList.toggle('closed');
// }

function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('closed');
}



// اقلام را بر اساس نوع آگهی و بر اساس نوع ملک فیلتر می کند
function filterItemsByAdTypeAndByPropertyType(propertyType, PropertyAdType) {
    const items = document.querySelectorAll(".item");
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const itemPropertyType = properties[i].proType;
        const itemPropertyAdType = PropertyAdTypes[i].adType;
        
        if ((propertyType.includes(itemPropertyType) || propertyType.length === 0) &&
            (PropertyAdType.includes(itemPropertyAdType) || PropertyAdType.length === 0)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    }
}

//لینک املاک برای نمایش همه ی املاک
document.getElementById("all-property").addEventListener("click", function(event) {
    event.preventDefault();
    filterItemsByAdTypeAndByPropertyType([], []);
});

//لینک برای نمایش املاک فروشی مسکونی
document.getElementById("selling-residential-items").addEventListener("click", function(event) {
    event.preventDefault();
    filterItemsByAdTypeAndByPropertyType(["House", "the apartment"], ["Residential sales"]);
});

//لینک برای نمایش املاک اجاره ی مسکونی 
document.getElementById("rental-residential-items").addEventListener("click", function(event) {
    event.preventDefault();
    filterItemsByAdTypeAndByPropertyType(["House", "the apartment"], ["Residential rent"]);
});

//لینک برای نمایش املاک فروشی اداری و تجاری 
document.getElementById("Administrative-and-commercial-sales").addEventListener("click", function(event) {
    event.preventDefault();
    filterItemsByAdTypeAndByPropertyType(["shop", "office"], ["Administrative and commercial sales"]);
});

//لینک برای نمایش املاک اجاره اداری و تجاری
document.getElementById("Office-and-commercial-rent").addEventListener("click", function(event) {
    event.preventDefault();
    filterItemsByAdTypeAndByPropertyType(["shop", "office"], ["Office and commercial rent"]);
});

//لینک برای نمایش املاک اجاره ی کوتاه مدت
document.getElementById("Residential-short-rental").addEventListener("click", function(event) {
    event.preventDefault();
    filterItemsByAdTypeAndByPropertyType(["House", "the apartment"], ["Short term rental"]);
});

//لینک برای نمایش پروژه های ساخت و ساز
document.getElementById("Construction-projects").addEventListener("click", function(event) {
    event.preventDefault();
    filterItemsByAdTypeAndByPropertyType([], ["Construction projects"]);
});

 //موارد را بر اساس چک باکس های امکانات تصویری آگهی فیلتر می کند
function filterItemsByCheckboxes() {
    const hasImageCheckbox = document.getElementById("has-image");
    const hasVideoCheckbox = document.getElementById("has-video");

    const hasImageChecked = hasImageCheckbox.checked;
    const hasVideoChecked = hasVideoCheckbox.checked;

    const items = document.querySelectorAll(".item");
    items.forEach(function(item) {
        const itemId = item.getAttribute("id");
        const property = properties.find(prop => prop.id === itemId);

        const hasImage = property.image !== null && property.image !== undefined && property.image !== "";
        const hasVideo = property.video !== null && property.video !== undefined && property.video !== "";

        if ((hasImageChecked && !hasImage) || (hasVideoChecked && !hasVideo)) {
            item.style.display = "none";
        } else {
            item.style.display = "block";
        }
    });
}

//چک باکس برای نمایش املاک دارای تصویر
document.getElementById("has-video").addEventListener("change", filterItemsByCheckboxes);

//چک باکس برای نمایش املاک دارای ویدیو
document.getElementById("has-image").addEventListener("change", filterItemsByCheckboxes);

 //فیلتر اقلام بر اساس انواع آگهی دهنده
function filterItemsBySegmentTypes(segmentTypes) {
    const items = document.querySelectorAll(".item");
    items.forEach(function(item) {
        const itemId = item.getAttribute("id");
        const property = properties.find(prop => prop.id === itemId);
        const itemSegmentTypes = property.segmentTypes;

        if (segmentTypes.includes(itemSegmentTypes) || segmentTypes.length === 0) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}

//چک باکس برای نمایش همه ی املاک
document.getElementById("all").addEventListener("click", function() {
    filterItemsBySegmentTypes([]);
});

//چک باکس برای نمایش املاک با آگهی شخصی
document.getElementById("personal").addEventListener("click", function() {
    filterItemsBySegmentTypes(["personal"]);
});

//چک باکس برای نمایش املاک با آگهی مشاور املاک
document.getElementById("real-estate").addEventListener("click", function() {
    filterItemsBySegmentTypes(["real-estate-business"]);
});

//فیلتر موارد بر اساس چک باکس فوری
function filterItemsByUrgentCheckbox() {
    const urgentCheckbox = document.getElementById("urgent");
    const isUrgentChecked = urgentCheckbox.checked;
    const items = document.querySelectorAll(".item");

    items.forEach(function(item) {
        const itemId = item.getAttribute("id");
        const property = properties.find(prop => prop.id === itemId);

        const isUrgent = property.urgent;

        if (isUrgentChecked && !isUrgent) {
            item.style.display = "none";
        } else {
            item.style.display = "block";
        }
    });
}

//چک باکس برای نمایش املاک با آگهی فوری
document.getElementById("urgent").addEventListener("change", filterItemsByUrgentCheckbox);