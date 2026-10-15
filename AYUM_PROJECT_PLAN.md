# AYUM — خطة المشروع وحالة التنفيذ (مدمجة من الفروع)

> **Merge date:** 2026-10-14. Consolidated from three supplied files: dev1-ah plan, dev2-ah plan, and the earlier baseline plan. This version additionally reconciles three later supplied copies: preserves the Collection-page follow-ups from one copy and the shared-carousel log and finalized Homepage architecture (§24) from another. This is a documentation merge only. It does not merge Git branches, verify repository state, or deploy theme changes. The current repository is authoritative.

> **مهم:** بعض فقرات التدقيق الأولي والاقتراحات في §§4–21 تصف حالة يوم 2026-10-11 وليست حالة الفرع الحالية. للقرارات المنفذة يُرجع إلى §22 و§23 و§24، مع فحص المستودع قبل أي عمل جديد. سجلات صفحة المجموعة في §23 تصف حالة التحقق الجزئي وقت كتابتها، وليست إثباتًا لحالة التشغيل الحالية. قواعد الـ workflow مصدرها `SKILL.md`، ولا تُستبدل بهذه الخطة.

AYUM — خطة المشروع وحالة التنفيذ
الغرض: تحفظ هذه الوثيقة حالة مشروع AYUM: خريطة Figma، ومن يملك كل منطقة في الثيم، والقرارات، والأسئلة المفتوحة، وتتبّع الحالة (§22)، وسجل التنفيذ (§23). قواعد العمل الدائمة موجودة في .claude/skills/figma-to-sections-workflow/SKILL.md ولا تُكرَّر هنا. عند أي تعارض في قواعد العمل يُرجع إلى الـ skill. أما حالة المستودع الفعلية فتُتحقَّق من الملفات نفسها (انظر §7). تاريخ الإنشاء: 2026-10-11. أُنشئت الوثيقة بعد تدقيق أولي للقراءة فقط، ولم يُنفَّذ أي سكشن.

## 1. نطاق الوثيقة
مسار المشروع الفعلي: D:\Shopify\Ayum.
النطاق الحالي: الصفحة الرئيسية (templates/index.json) والمناطق المشتركة (شريط العرض، الهيدر، قائمة الموبايل، الفوتر، شريط التنقل السفلي).
خارج النطاق حالياً: تنفيذ صفحة المنتج وصفحة المجموعة (§12، §13).
قاعدة التنفيذ: مهمة واحدة لكل سكشن، بروابط Figma دقيقة يقدّمها المستخدم قبل كل مهمة.
## 2. مفتاح تصنيف المعلومات
كل معلومة في هذه الوثيقة تحمل أحد هذه التصنيفات:

الوسم	المعنى
[مستخدم]	حقيقة أكّدها المستخدم صراحة
[مستودع]	ملاحظة من فحص الملفات أثناء التدقيق (فحص ثابت، لم يُشغَّل شيء)
[مقترح]	قرار مقترح لم يُعتمد بعد
[تحقق]	يحتاج تحققاً قبل الاعتماد عليه
[مؤجل]	قرار يخص سكشناً بعينه ويُحسم في مهمته
## 3. حقائق أكّدها المستخدم [مستخدم]
اسم المشروع والمتجر: AYUM. الثيم: Kalles 5.3.0.
عُدِّلت إعدادات الثيم يدوياً، وضُبط خط Almarai عبر إعدادات الثيم.
ذكر المستخدم أنه أنشأ assets/main.css. الملف أصبح موجوداً منذ الـ commit ff5e29e (انظر §4.6).
لغة المتجر: العربية (أكّدها المستخدم في 2026-10-11).
الصفحة الرئيسية تُربط عبر templates/index.json.
Shopify CLI متصل، والمعاينة يديرها المستخدم.
غير مسموح: shopify theme dev وcheck وpush وpull، وأي نشر أو تعديل للمتجر أو git commit أو push، إلا بتفويض صريح.
## 4. ملاحظات المستودع من التدقيق [مستودع]
### 4.1 هوية الثيم
config/settings_schema.json ← theme_info: Kalles، الإصدار 5.3.0، المؤلف The4.
الملف يحتوي تعليقات // من الـ vendor. Shopify يقبلها، لكن محلّل JSON الصارم يرفضها.
### 4.2 مسار الرندر
layout/theme.liquid يحسب الاتجاه، ثم يرندر css-variables وjs-variables وscripts.
بعدها يرندر sections 'header-group' ثم content_for_layout ثم sections 'footer-group' ثم sections 'system-group' ثم system-bottom ثم structured-data.
المجموعات الثلاث تُرندر في كل القوالب. الاستثناء الوحيد product.only_config خارج وضع المحرر.
layout/password.liquid لا يرندر هذه المجموعات.
### 4.3 الخطوط والطباعة
Almarai مضبوط عبر الإعدادات:
في config/settings_data.json: library_font: "shopify" وfont_family_shopify_1: "almarai_n4".
في snippets/css-variables.liquid تُحمَّل كل أوزان الخط عبر font_face داخل حلقة variants، ويُعرَّف --f_family_1.
كلٌّ من font_base وfont_custom_heading وpr_title_font_family يساوي --f_family_1. القيمة الأخيرة أُضيفت في الـ commit 221c45e.
font_family_shopify_2: poppins_n4 وfont_family_shopify_3: libre_baskerville_n4، وfont_custom_sheading: --f_family_3.
[تحقق] hd_fweight: 600، بينما تستخدم أنماط Figma الأوزان 400 و700 و800 فقط.
مقاسات العناوين الحالية: h0_size..h6_size من 64 إلى 16، وheading_lh: 1.5، وbody_lh: 1.7.
لا يُعاد تحميل Almarai، ولا تُكتب قيمة font-family ثابتة في الكود.
### 4.4 الاتجاه واللغة
الإعداد right_to_left غير مُعرَّف في settings_schema.json، فيأخذ دائماً القيمة enable-with-list. النتيجة: الصفحة RTL فقط عندما تكون لغة الواجهة ضمن قائمة لغات RTL، والعربية منها.
ملفات اللغات الموجودة: en.default وde وes وfr وzh-CN (مع ملفات .schema.json لكل منها).
locales/ar.json أُضيف في d81d7dd ثم حُذف في 781b2d9.
[مستخدم] لغة المتجر العربية. الاستنتاج من الكود: إذا كانت request.locale.iso_code تساوي ar، فإن theme.liquid يضبط dir="rtl" والكلاس dir--rtl، ويمرّر is_rtl: true إلى css-variables. أي أن RTL يأتي من مسار الثيم الأصلي دون فرض يدوي.
[تحقق] تأكيد أن <html dir="rtl" lang="ar"> يظهر فعلاً على المتجر. هذا فحص تشغيلي لم يُجرَ بعد.
[تحقق] خطر: لا يوجد locales/ar.json. لذلك نصوص الواجهة الثابتة في الثيم (مثل أزرار "Add to cart" ورسائل السلة) قد تظهر بالإنجليزية ما لم تُترجم عبر Translate & Adapt أو يُضف ملف ترجمة عربي. هذا قرار منفصل ولا يُنفَّذ ضمن مهمة سكشن.
نتيجة لقاعدة الـ skill: قاعدة الـ skill التي تفترض أن الصفحة LTR افتراضياً لأن en.default هي اللغة الافتراضية (§2.6) لا تنطبق كما هي على متجر لغته الأساسية العربية. مع ذلك يُختبر كل سكشن في الاتجاهين، لأن اللغات الأخرى المنشورة (إن وُجدت) ستكون LTR.
### 4.5 نقاط التوقف والحاوية
نقاط التوقف المهيمنة في CSS: 768px و1150px، وما يقابلهما 767px و1149px. توجد أيضاً قيم قليلة من الـ vendor: 1024 و750 و576 و1350.
page_width: 1320 في الإعدادات، وتطابق عرض الحاوية في Figma (1320). القيمة الافتراضية في الـ schema هي 1440.
spacing_grid_horizontal وspacing_grid_vertical قيمتهما 30.
### 4.6 تحميل CSS والتعديلات اليدوية
css-variables.liquid يحمّل في نهايته base.css وtheme.css وproduct-card.css وcollection-products.css.
كل سكشن يحمّل ملف CSS خاصاً به في أعلاه.
Custom CSS على مستوى المنصة في config/settings_data.json ← platform_customizations.custom_css، فيه قاعدتان يدويتان يجب الحفاظ عليهما:
لون أيقونة wishlist داخل .hdt-card-product.
لون خلفية .hdt-badge.hdt-badge__on-sale.
assets/main.css: أُضيف فارغاً في d81d7dd، وحُذف في 781b2d9، ثم أُعيد إنشاؤه في ff5e29e بحجم 14 بايت، لا يحوي إلا التعليق /* main.css */.
[مستودع] لا يحمّله أي ملف حالياً. لا يوجد أي مرجع له في layout/ أو snippets/ أو sections/، لذلك أي قاعدة تُكتب فيه الآن لن تُطبَّق.
[مؤجل] مكان تحميله ودوره يُقرَّران عند أول مهمة تحتاجه فعلاً (انظر §9). المقترح: تحميله مرة واحدة بعد theme.css، ولقواعد عابرة للصفحات مقيّدة بكلاس فقط.
### 4.7 الإعدادات العامة ذات الصلة
show_rating: true، لكن snippets/hdt-pr-card-rating.liquid وhdt-pr-single-rating.liquid ملفان فارغان (0 بايت)، فلا تُعرض نجوم.
[تحقق] show_ultra_btn وshow_vendor لم تُقرأ قيمتاهما الفعليتان. ليستا في settings_data.json، فهما على الأرجح بالقيمة الافتراضية.
يوجد 7 color schemes في settings_data.json.
لا يوجد إعداد custom_class في أي سكشن. يوجد فقط style_class في blocks داخل sections/cart-drawer.liquid.
## 5. خريطة إطارات Figma
اكتُشفت عبر metadata. يلزم تقديم روابط السكاشن الدقيقة وفحص design-context قبل أي تنفيذ. لم يُشغَّل get_design_context ولا get_screenshot في التدقيق الأولي. فحص الـ metadata لا يثبت تطابقاً بصرياً، والمقاسات هنا مأخوذة من صناديق الـ metadata وليست قيم تصميم معتمدة.

ملف Figma: 7cOVp6r92Z3heL1aTMP5N3.
صفحة الديسكتوب (سياق فقط): 2001:3، اسم الإطار homepage، بعرض 1440.
صفحة الموبايل (سياق فقط): 2001:581، اسم الإطار Mobile / Home، بعرض 375 (وليس 390).
قائمة الموبايل: 35:309، اسم الإطار Mobile Menu، بعرض 375، وفيها 10 عناصر.
| # | السكشن (اسم الطبقة) | Desktop | Mobile | ملاحظات من الـ metadata |
| --- | --- | --- | --- | --- |
| 1 | Offer bar (sticky) | 2001:4 | 2001:582 | نص "خصم 10% على أول طلب — كود AYUM10" وزر "انسخ الكود" |
| 2 | Header (sticky) | 2001:8 | 2001:586 | Desktop: سلة، بحث (2001:15)، لوجو (2001:19). Mobile: سلة، لوجو، burger، وبحث في صف ثانٍ (2001:608) |
| 3 | Category nav | 2001:21 | — | 10 روابط (2001:22). على الموبايل تُعرض داخل القائمة 35:309 |
| 4 | Mobile menu | — | 35:309 | 10 روابط بفواصل |
| 5 | Hero slider | 2001:33 | 2001:612 | الشريحة 1 من 3 فقط مصمَّمة. Desktop: زرّان (2001:41)، أسهم (2001:50)، نقاط (2001:46). Mobile: زر واحد، والنص في أعلى الصورة (2001:615). اسم الطبقة يذكر autoplay 6s |
| 6 | Categories | 2001:55 | 2001:626 | 4 بطاقات. نقاط على Desktop (2001:76)، وتمرير أفقي مع snap على Mobile |
| 7 | Best sellers (tabs) | 2001:80 | 2001:647 | 3 تبويبات. 4 بطاقات على Desktop، وعرض بطاقتين على Mobile. شريط تقدّم (2001:154) |
| 8 | Bundles | 2001:156 | 2001:721 | 4 بطاقات عمودية على Desktop. Mobile: بطاقة أفقية (الصورة بجانب النص) في carousel |
| 9 | About the brand | 2001:230 | 2001:749 | صورة، "قصتنا"، عنوان، فقرة، 3 إحصاءات |
| 10 | How we freeze-dry | 2001:250 | 2001:765 | عنوان، عنوان فرعي، شارات ادعاءات (claim chips)، 3 خطوات بأيقونات |
| 11 | Reviews | 2001:316 | 2001:826 | ملخص النجوم، 3 بطاقات على Desktop، 1 على Mobile، شارة "شراء موثّق" |
| 12 | Product videos (shoppable) | 2001:366 | 2001:861 | 5 بطاقات فيديو 9:16 على Desktop. Mobile: بطاقة نشطة في الوسط مع peek |
| 13 | FAQ | 2001:446 | 2001:911 | أكورديون، أول عنصر مفتوح |
| 14 | Newsletter | 2001:472 (مخفي) | — | خارج النطاق ما لم يُطلب |
| 15 | Footer | 2001:483 | 2001:942 | Mobile: مجموعات روابط بأكورديون، أيقونات دفع، روابط قانونية. محوِّل اللغة مخفي |
| 16 | Bottom nav (sticky) | — | 2001:1034 | 4 عناصر: حسابي، السلة، التصنيفات، الرئيسية |
## 6. رموز التصميم (من get_variable_defs على 2001:3) [مستودع]
القيم مقروءة من متغيرات Figma على مستوى الصفحة. يجب التحقق منها لكل عقدة سكشن عند التنفيذ.

ألوان العلامة:
Brand/Primary #26B3D0
Brand/Pink #EA3A79
Brand/Orange #E78333
Brand/Green #B6D561
Brand/Honey #F2B640
Brand/Yellow 40% #EFD678
Colors/Yellow #FFCC00
الألوان المحايدة:
Neutral/Ink #26383A
Neutral/Text #4E6E70
Neutral/Muted #6E8788
Neutral/Surface #E4EDF0
Neutral/Border #D3E3E8
Neutral/White #FFFFFF
الظل: shadow 1 = DROP_SHADOW بلون #00000024، وإزاحة (0, 2)، ونصف قطر 8.
الطباعة: كل الأنماط بخط Almarai، بأوزان 400 و700 و800. أمثلة:
Display/ExtraBold 46 (140%)
Heading/ExtraBold 26
Title/Regular 17 (175%)
Body/Regular 14 (180%)
[تحقق] بعض أسماء أنماط Figma لا تطابق قيمها، مثلاً Body/Regular 13 قيمتها 18px وDisplay/ExtraBold 30 قيمتها 36px. تُعتمد القيم لا الأسماء.
[تحقق] متغيرات الشفافية، مثل Brand/Primary 15% وNeutral/White 60%، تعيد لون hex الأساسي دون نسبة الشفافية. تُقرأ النسبة من design-context.
## 7. تعارضات حالة المستودع مع الـ skill [تحقق]
تبقى قواعد العمل في الـ skill سارية، لكن ادعاءاته عن حالة المستودع التالية لا تطابق الواقع. لا تُعتمد في التنفيذ، ولا تُحمل أعمال سابقة (H5/H7/H8) إلى حالة المشروع الحالية. تصحيح الـ skill قرار يعود للمستخدم.

ادعاء الـ skill	الملاحظة الفعلية
اسم المستودع ayum-store	المسار D:\Shopify\Ayum
AYUM_PROJECT_PLAN.md موجود (§24)	لم يكن موجوداً. هذه الوثيقة أُنشئت بتعليمات المستخدم
locales/ar.json موجود	محذوف في 781b2d9
snippets/ayum-money.liquid مربوط بـ card-price وprice وline-item-price، وformatMoney معدَّل	غير موجود، وassets/utilities.js:191-239 كود أصلي
assets/custom-general.css	غير موجود
.claude/skills/kalles-figma-to-sections-workflow/	غير موجود
أعمال H5 (About) وH7 (Reviews) وH8 (Product Videos)	لا يوجد أي ملف أو أثر لها في المستودع
El Messiri خط عام (§25)	الخط الفعلي Almarai (font_family_shopify_1)
إطارات الموبايل 390	العقدة 2001:581 عرضها 375
<hdt-video-player> الأصلي بدون autoplay	blocks/_product-video.liquid يضع autoplay ثابتاً
hdt-pr-card-rating فارغ، وRyviu معطَّل	مطابق للواقع
ملفات *.min.js مولَّدة، وcustom.js قابل للتعديل	مطابق، ولم يُتحقَّق منه بعمق
## 8. الحفاظ على البيانات والتعديلات اليدوية
القواعد العامة في الـ skill (§7 و§19). هذه العناصر الخاصة بـ AYUM يجب الحفاظ عليها:

إعدادات الثيم المعدَّلة يدوياً في config/settings_data.json: الخطوط، وpr_title_font_family، وpage_width، وplatform_customizations.custom_css. لا تُعدَّل يدوياً.
الـ instances الحالية في templates/index.json والمجموعات الثلاث: لا تُحذف ولا يُعاد ترتيبها دون موافقة صريحة، حتى لو كانت demo.
القالبان المخصصان templates/product.custom-ayum.json وtemplates/collection.custom-ayum.json.
كود ترخيص The4 (purchase_code والكتلة المرتبطة في custom.js): لا يُلمس ولا يُطبع.
[مقترح] تغيير نوع أي سكشن (مثلاً من header-inline-blocks إلى header-menu-bottom-blocks) يفقد إعدادات الـ instance. لا يتم إلا بموافقة صريحة في مهمته.
## 9. استراتيجية التنسيق [مقترح]
قيم تعتمد على Liquid أو إعدادات الـ instance: كتلة {% style %} مقيّدة بـ #shopify-section-{{ section.id }}.
قواعد مشتركة بين كل instances سكشن: ملف CSS الخاص بالسكشن، الذي يُحمَّل في أعلاه.
قواعد خاصة بـ instance من سكشن مشترك: ملف asset يُحمَّل بشرط وجود كلاس مخصص، وكل selector مسبوق بذلك الكلاس.
ملف overrides عام: المرشح هو assets/main.css (موجود لكنه غير محمَّل). أما custom-general.css فغير موجود. ربط main.css بمسار التحميل يُقرَّر ويُفوَّض عند أول حاجة فعلية. [مؤجل]
ممنوع: تعديل base.css أو theme.css أو أي ملف *.min.* أو settings_data.json.
الكلاس المخصص: إضافة إعداد custom_class إضافةً، بقيمة فارغة افتراضياً، في كل سكشن تمسّه مهمة، مع إثبات أنه خامل على الـ instances الحالية.
الألوان: تُستخدم color schemes الموجودة. عند عدم المطابقة يُضاف إعداد لون مقيّد قيمته الافتراضية لون Figma. لا يُعدَّل scheme مشترك.
## 10. الصفحة الرئيسية — ما يملكه templates/index.json
### 10.1 الـ instances الحالية [مستودع]
كلها محتوى demo من Kalles (أزياء)، ولا يوجد فيها سكشن معطَّل:

| الترتيب | Instance ID | النوع | Blocks | ملاحظة |
| --- | --- | --- | --- | --- |
| 1 | slideshow_EVrUzi | slideshow | _slide-item ×3 | صور demo |
| 2 | collections_list_manual_eErqxt | collections-list-manual | _collection_manual-item ×4، وsection-heading معطَّل | مجموعات women/accessories/watch/footwear |
| 3 | featured_collection_PTq36A | featured-collection | _product-grid وsection-heading | المجموعة women، product_des: 1 |
| 4 | banner_VyWanM | banners | _banner-item ×2 | غير موجود في تصميم AYUM |
| 5 | featured_collection_CKUpWw | featured-collection | _product-grid وsection-heading | المجموعة featured |
| 6 | blog_post_DcUjga | blog-post | _article-carousel | غير موجود في التصميم |
| 7 | lookbook_carousel_VeWgrg | lookbook-carousel | _lookbook ×8 | غير موجود في التصميم |
| 8 | shipping_9pXycT | shipping | _shipping ×4 | مرشّح لسكشن "كيف نجفّف" |
| 9 | 1755067183c661e3bf | apps | — | نقطة ربط للتطبيقات، يُحافظ عليها |
[مؤجل] مصير سكاشن الـ demo غير الموجودة في التصميم (4 و6 و7) يُقرَّر بموافقة المستخدم. لا تُحذف تلقائياً.

### 10.2 تحليل سكاشن الصفحة الرئيسية
المرشحون فُحصوا فحصاً ثابتاً (schema وأجزاء من الـ markup). استراتيجيات إعادة الاستخدام مبدئية حتى يُفحص design-context وتُختبر القوالب فعلياً.

| السكشن | الحالي | المرشح الأقرب (فُحص) | استراتيجية مبدئية [مقترح] | المحتوى | قرارات [مؤجل] / [تحقق] |
| --- | --- | --- | --- | --- | --- |
| Hero | slideshow_EVrUzi | sections/slideshow.liquid + blocks/_slide-item.liquid: فيه image_mb (عبر <source> تحت 767)، وautoplay من 0 إلى 7s، وnavUI، وdotUI، وcontent_position[_mb]، وbutton_custom.hide_on_mobile | إعادة استخدام الـ instance كما هو، مع CSS مقيّد لشارة الـ pill والأزرار | blocks + image_picker | الشريحتان 2 و3 غير مصمَّمتين. الإعدادان carousel_center وrounded مستخدمان في الكود وغير موجودين في الـ schema (لا ضرر منهما) |
| Categories | collections_list_manual_eErqxt (masonry/grid، بدون slider) | sections/collections-list.liquid (layout_mode: carousel، <hdt-slider>) + _collection_item + snippets/collection-item.liquid | إعداد إضافي لألوان البطاقة والعنوان على _collection_item، وCSS لشريط العنوان تحت الصورة | collection pickers | استبدال الـ instance أم إضافة جديد؟ col_mb لا يدعم 1.5 للـ peek. [تحقق] العنوان معروض حالياً فوق الصورة (hdt-absolute) |
| Best sellers | لا يطابق | sections/tabs-collection.liquid + _tab-collection ← _product-carousel (col_dk 4، col_mb 2) | كما هو + CSS مقيّد | collections | رقم البطاقة (§14). التقييم محجوب (§19). [تحقق] فاصلة زائدة في نهاية schema الـ _tab-collection |
| Bundles | غير مربوط | _product-carousel، أو featured-collection-2 ← _product-list (لا يعرض السعر المقارن، والزر رابط لا إضافة للسلة)، أو card-product-list.liquid | امتداد آمن لعرض العنوان الفرعي (مثل metafield)، وبطاقة أفقية على Mobile | products | مصدر "6 منتجات · 300 جم". هل الباكتات منتجات فعلية؟ |
| About | غير مربوط | sections/custom-section.liquid ← _multi_column + _media + heading/text + _counter (unit لاحقة فقط) | كما هو + CSS | blocks | البادئة "+" مع RTL [تحقق]. الأرقام التسويقية تحتاج تأكيد المستخدم |
| How we freeze-dry | shipping_9pXycT (demo) | sections/shipping.liquid + _shipping (icon_themes، image_icon، icon SVG)، أو icon-box | CSS مقيّد لمربع الأيقونة الملوّن | blocks | طريقة تنفيذ الشارات (claim chips): blocks نصية أم block صغير جديد |
| Reviews | غير مربوط | sections/testimonial_section.liquid + _testimonial_item (rating، title، pos، image_avata) | إعدادات إضافية: شراء موثّق، منتج | شهادات يدوية | لا محتوى مُختلَق. ملخص "4.8 من 5 · +400" ادعاء يحتاج مصدراً |
| Product videos | غير مربوط | sections/product-video.liquid + blocks/_product-video.liquid (Shoppable Video) | إضافي: btn-ultra، تسمية، col_dk 5، توسيط على Mobile | blocks + products | autoplay ثابت في الكود ويتعارض مع قاعدة عدم التشغيل التلقائي. [تحقق] navUI معرَّف كنص |
| FAQ | غير مربوط | sections/accordion.liquid + _accordion-item (open، أيقونة +/−، FAQ schema) | كما هو | blocks | — |
## 11. المناطق المشتركة — ما تملكه مجموعات السكاشن
كل تغيير هنا يمس كل الصفحات. كل منطقة مهمة مستقلة، ولا تُدرج في index.json لمحاكاة التصميم.

### 11.1 الـ instances الحالية [مستودع]
| المجموعة | Instance | النوع | الحالة |
| --- | --- | --- | --- |
| sections/header-group.json | announcement_bar_QKnWCh | announcement-bar | نص demo إنجليزي، close_btn: "1" |
| header_inline_blocks_xePFbC | header-inline-blocks | logo_left، search_type: icon، sticky_type: on_scroll_up، _mega_block ×6، _menu_mobile |
| custom_liquid_BCTxT9 | custom-liquid | مبدّل demo للثيمات (يعتمد على pages['demos']) |
| sections/footer-group.json | footer_KwXhWr | footer | 5 أعمدة (منها عمود Newsletter)، collapse: true |
| footer_ziwVXA | footer | عمودان: حقوق demo، وقائمة footer-menu-bottom |
| sections/system-group.json | cart-drawer | cart-drawer | مفعَّل |
| toolbar-mobile | toolbar-mobile | disabled |
| exit_popup_AH3cpU، cookies_8EMjkp، newsletter_modal_Gxkjz4 | — | disabled |
### 11.2 تحليل المناطق المشتركة
| المنطقة | المرشح (فُحص) | استراتيجية مبدئية [مقترح] | فجوات / [تحقق] |
| --- | --- | --- | --- |
| شريط العرض | sections/announcement-bar.liquid، وعنصر النسخ <wrapp-hdt-copy-btn> (مستخدم في snippets/share-buttons.liquid) | إعداد إضافي (كود الخصم + زر نسخ) + CSS مقيّد | الشريط غير sticky (فقط .hdt-section-header sticky). [تحقق] سلوك تبديل النص في CopyButton |
| الهيدر + شريط الفئات | sections/header-menu-bottom-blocks.liquid (logo_left + big_form + صف .hdt-bottom-header للديسكتوب) | تبديل نوع السكشن (يفقد الإعدادات) + CSS مقيّد. صف البحث على الموبايل يحتاج امتداداً | لا يوجد صف بحث على الموبايل في أي هيدر. [تحقق] ترتيب العناصر في RTL. [مؤجل] مصير custom_liquid_BCTxT9 |
| قائمة الموبايل | blocks/_menu_mobile.liquid (snippets/menu_mobile.liquid غير مستخدم) | قائمة مسطّحة عبر main_menu_mobile، وCSS مقيّد لإخفاء التبويب والبحث وما في الأسفل، والرابط الأول وردي | رابط Search لا يُخفى بإعداد. إخفاء الحساب أو wishlist يخفي أيقونات الهيدر أيضاً |
| الفوتر | sections/footer.liquid + blocks/_footer-column.liquid (_payment_icons، socials، _footer-image، _linklist، أكورديون الموبايل only_mobile) | إعدادات + محتوى + CSS مقيّد | إزالة عمود النشرة، وإضافة صف أيقونات الدفع. [تحقق] رندر _payment_icons |
| التنقل السفلي | sections/toolbar-mobile.liquid (blocks: home، account، cart، nav، link، وغيرها، ولكلٍّ title) | تفعيل + blocks + CSS مقيّد | "التصنيفات": nav أم link؟ [تحقق] ترتيب RTL وتداخله مع --sticky-atc |
## 12. صفحة المنتج — خارج النطاق حالياً
القالب المخصص الموجود: templates/product.custom-ayum.json (main-product مع blocks _product-*).
لا تنفيذ حتى تُقدَّم عقد Figma خاصة بصفحة المنتج ويُفوَّض العمل صراحة.
## 13. صفحة المجموعة — خارج النطاق حالياً
القالب المخصص الموجود: templates/collection.custom-ayum.json.
لا تنفيذ حتى تُقدَّم عقد Figma خاصة ويُفوَّض العمل صراحة.
## 14. استراتيجية بطاقات المنتج [مقترح / تحقق]
ملاحظات المستودع:

البطاقات الموجودة: card-product1..12، وcard-product-list، وcard-product-discount1..3.
خيارات product_des في schema كلٍّ من _product-carousel و_product-grid من 1 إلى 11. الكود في _product-carousel يحتوي فرعاً لـ 12، لكن الـ schema لا يعرضه.
المكوّنات المشتركة: card-product-media، وcard-price (← price)، وbadges، وhdt-pr-card-rating (فارغ)، وbtn-ultra (مشروط بـ settings.show_ultra_btn).
المقترح:

المرشحون المبدئيون لتصميم "زر إضافة للسلة بعرض كامل أسفل المعلومات" هم البطاقات 6 و7 و9، لأن btn-ultra فيها داخل منطقة المعلومات.
يُختار رقم واحد في مهمة Best sellers بعد فحص الـ markup الكامل، ويُعاد استخدامه في Bundles وفي البطاقات المرتبطة بالفيديو.
لا يُخترع رقم بطاقة جديد، ولا يُستولى على خيار موجود.
## 15. استراتيجية الـ Sliders [مقترح]
الاعتماد حصراً على <hdt-slider> الأصلي ومكوّناته. لا مكتبة جديدة.
أعداد الشرائح تأتي من col_dk وcol_tb وcol_mb.
الـ peek والتوسيط يكونان عبر إعدادات Embla في سمة config، أو CSS مقيّد بالسكشن. [تحقق] في كل مهمة.
شريط التقدّم في التصميم: أقرب خيار أصلي هو pag_style: full، وهو مقاطع بسُمك 3px. شريط تقدّم حقيقي يتطلب JS جديداً. [مؤجل]
لا يُحوَّل grid إلى slider ولا العكس إلا كما في التصميم.
## 16. استراتيجية المحتوى والبيانات [مقترح]
الصور: عبر image_picker، مع image_mb يرجع إلى صورة الديسكتوب عند غيابه، وplaceholder_svg_tag للحقول الفارغة. لا تُضمَّن صور Figma ولا روابط أصولها في أي ملف.
المنتجات والمجموعات والقوائم: عبر pickers وقوائم المتجر. أسماء المنتجات وأسعارها وعملة "د.ك" وتقييماتها في Figma ليست بيانات حقيقية.
الشهادات اليدوية (testimonials) منفصلة عن تقييمات المنتجات من تطبيق. لا تُختلق مراجعات ولا ادعاءات تسويقية: "+400"، و"4.8"، و"100% تصنيع كويتي"، و"أول مصنع في الكويت" كلها تحتاج تأكيد المستخدم.
نصوص الواجهة: نصوص التاجر عبر إعدادات الـ schema، ونصوص الثيم الثابتة عبر مفاتيح ترجمة، مع مطابقة أسلوب الملف المعدَّل (t: أو نص صريح).
## 17. ترتيب التنفيذ المقترح [مقترح]
أولاً: قرارات مشتركة تُحسم مبكراً. الاتجاه واللغة (§20)، وأوزان الخط، ومكان ملف التنسيق عند أول حاجة.

المرحلة A: سكاشن index.json، وهي الأقل خطراً.

Hero
Categories
Best sellers (يُحسم فيها رقم البطاقة)
Bundles
About
How we freeze-dry
Reviews
Product videos
FAQ
المرحلة B: المناطق المشتركة، كل منها مهمة مستقلة لأنها تمس كل الصفحات: 10. شريط العرض 11. الهيدر وشريط الفئات (الأعلى خطراً) 12. قائمة الموبايل 13. الفوتر 14. التنقل السفلي

## 18. المهمة الأولى المقترحة [مقترح]
Hero Slideshow:

النطاق: الـ instance slideshow_EVrUzi فقط.
الأساس: sections/slideshow.liquid + blocks/_slide-item.liquid كما هما، مع ضبط الإعدادات وCSS مقيّد.
الملفات المحتملة: sections/slideshow.liquid (إضافة custom_class وتحميل مشروط)، وإعدادات الـ instance في index.json. ملف CSS جديد فقط إن لم تكفِ كتلة {% style %}.
المطلوب قبل البدء: روابط دقيقة للعقدتين 2001:33 (Desktop) و2001:612 (Mobile) وعقد الشريحتين 2 و3 إن وُجدتا، وجواب سؤال الاتجاه (§20).
## 19. التكاملات [مستودع / تحقق]
التقييمات:
snippets/hdt-pr-card-rating.liquid وhdt-pr-single-rating.liquid فارغان.
Ryviu معلَّق في snippets/hdt-pr-single-review.liquid.
لم يُعثر على أي تطبيق تقييمات نشط في كود الثيم. نجوم بطاقات المنتج محجوبة حتى يُحدَّد التطبيق.
snippets/rating_star.liquid موجود، وتستخدمه الشهادات.
Wishlist/Compare: مسارات ecomrise في assets/custom.js (/apps/ecomrise/...) مع بديل localStorage. لا يُعاد ربطها.
سكشن التطبيقات 1755067183c661e3bf (apps) في index.json: يُحافظ عليه.
العملة: عرضها فقط (assets/hdt-currencies.js). Shopify هو مصدر المبالغ المدفوعة.
[تحقق] وجود الـ metafields وتطبيقات الاشتراكات لم يُفحص في هذا التدقيق.
## 20. الأسئلة المفتوحة والعوائق
### 20.1 أسئلة أساسية
لغة المتجر حُسم في 2026-10-11: العربية [مستخدم]. يبقى للتحقق: ظهور dir="rtl" فعلاً على المتجر، وغياب ar.json الذي يؤثر على نصوص الواجهة الثابتة (§4.4).
[مؤجل] assets/main.css: الملف موجود (ff5e29e) لكنه غير محمَّل. يُقرَّر مكان تحميله عند أول حاجة (§4.6، §9). ليس عائقاً.
[مؤجل] ترجمة نصوص الواجهة العربية: هل تتم عبر Translate & Adapt أم بملف locales/ar.json؟ ليس عائقاً لأول مهمة.
### 20.2 قرارات مؤجلة إلى سكاشنها
رقم بطاقة المنتج (Best sellers).
تطبيق التقييمات (Best sellers، Bundles).
مصدر العنوان الفرعي للباكتات (Bundles).
التشغيل التلقائي للفيديو (Product videos).
تبديل نوع الهيدر ومصير custom_liquid_BCTxT9 (Header).
مصير سكاشن الـ demo غير الموجودة في التصميم (§10.1).
كود الخصم الفعلي وسلوك sticky (شريط العرض).
صحة الأرقام التسويقية (About، Reviews).
معالجة hd_fweight: 600 (الطباعة).
layout/password.liquid: هل يطابق التصميم؟
### 20.3 مخاطر معروفة
تبديل نوع سكشن يفقد إعدادات الـ instance.
shopify theme pull قد يستبدل الـ JSON المعدَّل محلياً.
ادعاءات الـ skill غير المطابقة للواقع (§7) قد تُضلّل المهام القادمة إن لم تُتحقَّق.
## 21. أدلة التدقيق وحدوده
ملفات فُحصت:
layout/theme.liquid
templates/index.json
sections/header-group.json وfooter-group.json وsystem-group.json
config/settings_schema.json (theme_info، page_width)
config/settings_data.json (الخطوط، platform_customizations، show_rating)
snippets/css-variables.liquid وscripts.liquid
قيم @media في ملفات CSS
schemas السكاشن المرشحة
blocks/_product-grid.liquid و_product-carousel.liquid و_product-video.liquid
snippets/hdt-pr-*rating*.liquid
سجل git لـ assets/main.css وlocales/ar.json
إضافة إلى ذلك، تقريرا وكيلين للقراءة فقط عن المناطق المشتركة وسكاشن المحتوى، مع أدلة بأرقام الأسطر. تحقّقتُ مباشرة من بعض ادعاءاتهما: autoplay، وفرع البطاقة 12، وshow_rating.
Figma:
get_metadata على 2001:3 و2001:581 و35:309.
get_variable_defs على 2001:3.
لم يُشغَّل get_design_context ولا get_screenshot. صور المستخدم المرفقة سياق بصري فقط.
فحوص شُغِّلت: grep، وgit log/status، وتحليل JSON للقراءة فقط عبر node.
Not run: shopify theme check وshopify theme dev، وأي QA تشغيلي أو بصري أو responsive أو RTL/LTR أو للسلة أو الفيديو أو دورة حياة محرر الثيم.
لا يُدّعى تطابق بصري أو جاهزية للإنتاج بناءً على هذا التدقيق.
## 22. متتبّع الحالة
قيم الحالة:

فحص Figma: Metadata only ← Design-context inspected
التنفيذ: Not started ← In progress ← Implemented
QA: Not run ← Partial ← Verified. يتطلب Verified فحصاً فعلياً للديسكتوب والموبايل وRTL.
| # | المهمة | النطاق | Figma (D / M) | فحص Figma | التنفيذ | QA | ملاحظات |
| --- | --- | --- | --- | --- | --- | --- | --- |
| H1 | Hero | index | 2001:33 / 2001:612 | Design-context inspected | Implemented | Partial | sections/ayum-slideshow.liquid + assets/dev1.css؛ الصور يرفعها التاجر. QA في harness محلي فقط، لا على المتجر |
| H2 | Categories | index | 2001:55 / 2001:626 | Design-context inspected | Implemented | Partial | sections/ayum-collections-list.liquid + blocks/_ayum-collection-item.liquid + dev1.css؛ المجموعات والصور يختارها التاجر |
| H3 | Best sellers (tabs) — اسم المحرر: Featured Collection | index | 2001:80 / 2001:647 | Design-context inspected | Implemented (+ متابعة 2026-10-13) | Partial (harness محلي فقط) | ayum-tabs-collection (فرع dev2-ah)؛ انظر §23 ؛ 2026-10-14: جسم الكاروسيل في snippets/ayum-product-carousel.liquid |
| H4 | Bundles — اسم المحرر: Featured Coll. — Bundles | index | 2001:156 / 2001:721 | Design-context inspected | Implemented | Partial (harness محلي فقط) | ayum-featured-collection (فرع dev2-ah)؛ انظر §23 |
| H5 | About the brand | index | 2001:230 / 2001:749 | Design-context inspected | Implemented | Partial | sections/ayum-image-text.liquid (نسخة Image with text) + blocks/_ayum-image-text-col و_ayum-stats و_ayum-stat + dev1.css؛ Color Scheme 4؛ الصورة يرفعها التاجر. QA على الـ preview الحي (theme dev) |
| H6 | How we freeze-dry | index | 2001:250 / 2001:765 | Design-context inspected | Implemented | Partial | sections/ayum-icon-box.liquid (نسخة Icon box) + _ayum-icon-box و_ayum-claims و_ayum-claim + snippets/ayum-icons.liquid + dev1.css؛ Color Scheme 2 + Background opacity 0 + Subheading color؛ QA على صفحة ملتقطة، لا preview حي لهذا الـ worktree |
| H7 | Reviews — اسم المحرر: Testimonials (اسم Kalles الأصلي) | index | 2001:316 / 2001:826 | Design-context inspected | Implemented | Partial (harness محلي فقط) | ayum-testimonial_section (فرع dev2-ah)؛ انظر §23 |
| H8 | Product videos — اسم المحرر: Shoppable Video (اسم Kalles الأصلي) | index | 2001:366 / 2001:861 | Design-context inspected | Implemented | Partial (harness محلي فقط) | ayum-product-video (فرع dev2-ah)، بلا تشغيل تلقائي؛ انظر §23 |
| H9 | FAQ | index | 2001:446 / 2001:911 | Design-context inspected | Implemented | Partial | sections/ayum-accordion.liquid (نسخة Accordion) + blocks/_ayum-accordion-item.liquid + dev1.css؛ Color Scheme 7؛ أجوبة 2–5 يضيفها التاجر. QA على صفحة ملتقطة، لا preview حي لهذا الـ worktree |
| S1 | Offer / announcement bar | مشترك: كل الصفحات | 2001:4 / 2001:582 | Design-context inspected | Implemented (زر نسخ الكود) | Partial | sections/ayum-announcement-bar.liquid + assets/ayum-copy-code.js + dev1.css؛ QA على HTML الـ preview الحقيقي + أصول حية، لا على المتجر الحي |
| S2 | Header + category nav | مشترك: كل الصفحات | 2001:8 + 2001:21 / 2001:586 | Design-context inspected | Implemented | Not run | sections/ayum-header.liquid (نسخة Header menu bottom) + snippets/ayum-main-menu و ayum-header-icons + assets/main.css؛ instance ayum_header في header-group.json. يحتاج Color Scheme مخصص للهيدر (انظر §23) |
| S3 | Mobile menu | مشترك: كل الصفحات | — / 35:309 | Design-context inspected | Implemented (مع S2) | Not run | blocks/_ayum-menu-mobile.liquid (نسخة _menu_mobile) + main.css |
| S4 | Footer | مشترك: كل الصفحات | 2001:483 / 2001:942 | Metadata only | Not started | Not run | footer-group |
| S5 | Mobile bottom nav | مشترك: كل الصفحات | — / 2001:1034 | Metadata only | Not started | Not run | system-group |
| — | Newsletter | خارج النطاق | 2001:472 (مخفي) / — | Metadata only | — | — | مخفي في Figma |
## 23. سجل التنفيذ
ملاحظة الدمج (2026-10-14): جُمعت هذه الوثيقة من خطتي dev1-ah وdev2-ah ونسخة الخطة الأساسية. حالات التنفيذ التالية مستخلصة من تقارير الفرعين وليست تأكيداً بأن التغييرات مدموجة بالفعل في فرع Git واحد أو منشورة على Shopify. يجب التحقق من ملفات الفرع النشط وgit status قبل أي تنفيذ. لا يُفسَّر غياب سكشن من إحدى خطتي الفرعين على أنه حذف أو تراجع.
المنفذ وفق سجلات dev1-ah: H1، H2، H5، H6، H9، S1. وفق سجلات dev2-ah: H3، H4، H7، H8. المهام المشتركة S2–S5 لم تُسجَّل كمنفذة. جميع حالات QA الجزئية تحتفظ بقيودها الأصلية.

### 2026-10-11 — التدقيق الأولي والتخطيط (للقراءة فقط)
النوع: تدقيق وتخطيط، وليس تنفيذاً.
ما تم:
تدقيق ثابت للمستودع.
فحص metadata لعقد Figma 2001:3 و2001:581 و35:309، وفحص المتغيرات على 2001:3.
إنشاء هذه الوثيقة بتعليمات صريحة من المستخدم.
الملفات المعدَّلة: AYUM_PROJECT_PLAN.md فقط (إنشاء). لم يُعدَّل أي ملف ثيم.
فحوص مُشغَّلة: grep، وgit log/status، وتحليل JSON للقراءة فقط.
Not run: shopify theme check وdev، والفحص البصري، وفحوص runtime وresponsive وRTL/LTR، ومحرر الثيم.
الخطوة التالية: بانتظار اختيار المستخدم للمهمة الأولى وتقديم روابط العقد الدقيقة.
### 2026-10-11 — تحديث الخطة (توثيق فقط)
أكّد المستخدم أن لغة المتجر العربية. حُدِّثت §3 و§4.4 و§20.
رُصد أن assets/main.css أُعيد إنشاؤه في ff5e29e (تعليق فقط، غير محمَّل). حُدِّثت §4.6 و§9.
لم يُعدَّل أي ملف ثيم، ولم يُنفَّذ أي سكشن.
### سجل فرع dev1-ah (من النسخة الثانية؛ محفوظ دون اختصار):
### 2026-10-13 — H1 Hero slideshow (تنفيذ)
Figma: get_design_context + screenshot للعقدتين 2001:33 (1440×540) و2001:612 (390، البانر 501)، وget_metadata للعقدة 2001:33.
القرار المعماري (بتعليمات المستخدم): نسخة معزولة من sections/slideshow.liquid باسم sections/ayum-slideshow.liquid، مع إبقاء اسم الـ schema t:sections.slideshow.name ("Slideshow") والـ preset الأصلي. الأصل غير معدَّل.
إعادة الاستخدام: _slide-item والبلوكات الأصلية (text_custom للشارة، وheading، وtext، و_button_group + button_custom ×2)، و<hdt-slideshow> من global.min.js، وslideshow.css. لم يُنسخ أي block، ولا يوجد JS جديد.
الملفات:
جديد: sections/ayum-slideshow.liquid. الإضافات على النسخة فقط: تحميل dev1.css، والكلاس ayum-slideshow، وإعداد custom_class، و4 إعدادات ألوان AYUM (accent #EA3A79، heading #26383A، text #4E6E70، dots #D3E3E8).
جديد: assets/dev1.css، وكل قواعده تحت .ayum-slideshow. نقاط الكسر 768 فقط (لا 1150 ولا غيرها).
معدَّل: templates/index.json. أُضيف ayum_slideshow_hero أولاً في order، و"disabled": true على slideshow_EVrUzi (بياناته محفوظة). بقية السكاشن متطابقة بايت ببايت (تحقق آلي).
المحتوى: 3 شرائح بنص الشريحة 1. الصور فارغة (placeholder) إلى أن يرفعها التاجر (image + image_mb). الجزء الوردي من العنوان هو <strong> في الـ richtext، ويكون وردياً على الديسكتوب فقط.
الإعدادات: fixed 540 / 500 (الموبايل 500 لأن الـ range يتدرج بـ 10، وFigma = 501)، وautoplay 6s، وloop، وpause on hover، وأسهم rounded/large (52px عبر CSS) مخفية على الموبايل، ونقاط pag_mgt 35 (الموبايل 35×0.6 = 21)، وpag_space 9 (Figma 9.25).
انحرافات موثّقة:
وصف الموبايل في Figma نصه مختلف قليلاً. استُخدم نص الديسكتوب في البريكبوينتين لأن بلوك text لا يدعم الإخفاء على الديسكتوب.
حجم وصف الموبايل 13px مطبَّق عبر CSS، لأن الـ range الأصلي يتدرج بـ 2.
وزن 800 للعنوان مطبَّق عبر CSS، لأن خيارات البلوك تنتهي عند bold.
حالة hover للأسهم والأزرار غير مصمَّمة في Figma، فاختيرت قيم من ألوان الهوية.
ترتيب النقاط يتبع اتجاه الـ slider الأصلي: Figma الديسكتوب يضع النقطة النشطة يميناً، وFigma الموبايل يضعها يساراً.
RTL/LTR: حاوية الموضع (.hdt-content-type-container) مثبّتة LTR حتى يبقى المحتوى يميناً في كل لغة. .hdt-content-inner = direction: rtl; unicode-bidi: isolate. محاذاة الأزرار والعمود مربوطة بإعداد المحاذاة الأصلي.
فحوص مُشغَّلة (Passed):
تحليل JSON لـ schema النسخة (41 إعداداً = 35 أصلياً + 6).
تحليل index.json ومطابقة كل السكاشن السابقة.
diff النسخة مع الأصل (إضافات فقط).
توازن وسوم style/schema.
لا روابط figma.com/api/mcp.
كل محددات dev1.css تحت .ayum-slideshow.
git status: لا تعديل على slideshow.liquid أو _slide-item.liquid أو slideshow.css أو أي .min.js أو settings_data.json أو page.women.json.
Not run: shopify theme dev/check، والفحص البصري، وresponsive (320/375/390/767/768/1149/1150/1440)، وRTL في ar وen.default، والـ autoplay/swipe/النقاط/الأسهم في runtime، وprefers-reduced-motion (الـ autoplay من JS الأصلي ولا يمكن إيقافه من CSS)، ومحرر الثيم.
### 2026-10-13 — متابعة (bugfix): محاذاة الديسكتوب، والتفاف العنوان، ونقاط الموبايل
Figma: أُعيد فحص 2001:36 (design context) و2001:612 (metadata). إطار الموبايل عرضه 375، وعمود النص 311.
السبب الجذري 1 (محاذاة الديسكتوب):
Kalles يعرّف .hdt-text-right و.md:hdt-text-right كـ text-align: end (قيمة منطقية).
بعد إعلان direction: rtl على .hdt-content-inner، صارت end تعني اليسار.
النتيجة: الصناديق في مكانها الصحيح، لكن السطور داخل الصندوق (520px) ملتصقة باليسار.
الإصلاح: داخل الحدود RTL، المحاذاة "right" ⇒ text-align: start، و"left" ⇒ end، و"center" ⇒ center، بجانب قيم align-items الموجودة.
التفاف العنوان:
Figma نفسه يكسر قبل "في الفم" بفقرة منفصلة، فالسطر الثالث كسر صريح وليس نتيجة العرض.
الإصلاح: <br/> قابل للتحرير في الـ richtext، مع تفعيل hidden_br_mobile في بلوك العنوان الأصلي.
أُضيفت قاعدة scoped تمدّ إخفاء الـ <br> حتى 767px، لأن الأصل يتوقف عند 750.
على الموبايل يلتف العنوان طبيعياً على سطرين مطابقين لـ Figma.
السبب الجذري 2 (نقاط الموبايل يساراً):
قاعدة slideshow.css المتداخلة &.hdt-position-right (خصوصية 0,4,0) تغلب justify-content: center في dev1.css (0,3,0).
في صفحة RTL، القيمة flex-end تعني اليسار.
الإصلاح: محدد يشمل كلاسات الموضع :is(.hdt-position-left, .hdt-position-center, .hdt-position-right)، وتمديد شريط النقاط على كامل البانر (left/right: 0; width: auto; margin: 0). أُزيل التكرار من قاعدة الديسكتوب.
تعديل بيانات (instance الهيرو فقط): نص العنوان للشرائح 3 (<br/> + hidden_br_mobile: true)، وline_height_mobile للشارة من 14 إلى 13 (الشارة 23px مثل Figma). بقية السكاشن متطابقة (تحقق آلي).
QA مُشغَّل (Passed، في harness محلي):
صفحة تحاكي مخرجات Liquid للسكشن، مع base.css وtheme.css وslideshow.css وdev1.css الحقيقية، وJS السلايدر الحقيقي (global.min.js)، وAlmarai من Google Fonts.
العروض: 1440، 1150، 768، 390، 375، 320، في dir=rtl وdir=ltr.
1440: الصندوق x=800 وinset 120 وy=81، والعنوان y=126 بثلاثة أسطر، والوصف y=337، والأزرار y=414، والنقاط تبعد 126 عن اليمين و35 عن الأسفل.
375: الشارة 83×23، والعنوان y=49 بسطرين، والوصف y=130، والزر 142×31، والنقاط في المنتصف (163/162) و21 عن الأسفل.
التفاعل: النقر على النقطة، والسهم التالي، والـ autoplay (6s)، والسحب على الموبايل، كلها تحدّث النقطة النشطة. لا أخطاء في الـ console.
Not run: المتجر الحقيقي، ومحرر الثيم، والصور الحقيقية (الـ harness يستخدم placeholder)، وshopify theme check، ولمس حقيقي على جهاز، ونطاق 751–767 بعرض محدد.
### 2026-10-13 — متابعة (تحقيق): عرض خط Almarai
Figma (get_variable_defs على 2001:33 و2001:612): Almarai، ExtraBold 800 للعنوان والشارة والزر الأساسي، وBold 700 للزر الثانوي، وRegular 400 للوصف. letter-spacing = 0.
إعداد الثيم الحالي (settings_data.json):
library_font: shopify، وfont_family_shopify_1: almarai_n4، وfont_base = font_custom_heading = --f_family_1.
hd_fweight: 600. أما bd_fweight فغير محفوظ، فيُستخدم الافتراضي 400.
تحميل الخط في Kalles: css-variables.liquid يمرّ على settings.font_family_shopify_1.variants ويُخرج font_face لكل variant. مكتبة خطوط Shopify تُدرج Almarai بـ almarai_n3 n4 n7 n8 (من توثيق shopify.dev). إذن وجه 800 حقيقي يجب أن يُعلَن على المتجر.
قواعد Kalles: لا يوجد font-smoothing ولا font-synthesis ولا font-feature-settings ولا text-rendering. الـ letter-spacing يساوي 0. وزن hdt-font-bold (700) و--font-heading-weight (600) يُغلَبان بقاعدة dev1.css (800) على العنوان وh2 وstrong.
قياس فعلي (harness محلي):
CSS الثيم الحقيقي، مع Almarai من Google Fonts (نفس مصدر مكتبة Shopify، لكنه ليس ملف CDN الخاص بـ Shopify).
CDP CSS.getPlatformFontsForNode + مقارنة حبر بالبكسل مع renders من Figma.
مع وجه 800 محمَّل: العنوان مرسوم بـ Almarai-ExtraBold، والوصف بـ Almarai-Regular، والزر الثانوي بـ Almarai-Bold. الحبر مطابق لـ Figma ضمن ~1%: عنوان الديسكتوب 466×179 مقابل 465×183، والموبايل 303×64 مقابل 303×66، والوصف 497×52 مقابل 497×51.
مع وجه 400 فقط: الـ CSS يبقى font-weight: 800، لكن Chrome يرسم Almarai-Regular. الحبر أقل بـ ~17%، والكلمات أضيق، والتفاف العنوان يتغيّر. هذا يطابق وصف المشكلة. document.fonts.check() أعاد true في الحالتين، فلا يصلح دليلاً.
الاستنتاج: لا خطأ في الـ CSS أو الوراثة داخل السكشن. الفرق المرئي على المتجر سببه على الأرجح أن وجه 800 لا يُحمَّل في البيئة التي تمت فيها المقارنة. غير مؤكَّد على المتجر، لأن الـ harness لا يستطيع إعادة إنتاج ملفات fonts.shopifycdn.com الموقّعة.
لم يُعدَّل أي ملف ثيم في هذه المتابعة.
الخطوة التالية: فحص "Rendered Fonts" في DevTools على صفحة المتجر الفعلية (انظر التقرير). إن ظهر Almarai-Regular للعنوان أو غاب طلب almarai_n8، فالحل الأصغر هو إعلان font_modify: 'weight', '800' داخل {% style %} السكشن.
### 2026-10-13 — متابعة (bugfix): عنوان الهيرو يُرسم بـ Times New Roman على المتجر
دليل المستخدم (DevTools على المتجر الحقيقي): <h2> = TimesNewRomanPS-BoldMT (ملف محلي، 39 glyph) + OTS derived font (6 glyphs).
السبب الجذري:
المشكلة في العائلة وليست في وزن مفقود. :where(h1…h6) في base.css يأخذ العائلة من --font-heading-family، أي إعداد "Heading font" في الثيم.
على المتجر الحي، هذا الـ slot يشير إلى خط لاتيني فقط. على الأرجح --f_family_3 = Libre Baskerville (font_family_shopify_3) مع fallback serif.
النتيجة: الحروف العربية تسقط إلى Times New Roman (Bold بسبب 800)، والمسافات فقط تُرسم من الـ webfont.
في settings_data.json بالمستودع font_custom_heading = --f_family_1، فإعداد المتجر الحي مختلف عن المستودع (drift).
الوصف والشارة والأزرار لم تتأثر، لأنها ترث خط الـ body (--font-body-family = Almarai).
إعادة إنتاج مطابقة (harness، heading slot ← Libre Baskerville): TimesNewRomanPS-BoldMT ×39 + Libre-Baskerville-Bold (webfont) ×6 عند 375. البصمة نفسها التي أبلغ عنها المستخدم.
الإصلاح (assets/dev1.css فقط): font-family: var(--font-body-family) على .ayum-slideshow .hdt-h_custom :is(h1…h6, p, strong, b). لم يُضف أي @font-face، لأن أوجه Almarai 300/400/700/800 يُعلنها css-variables.liquid أصلاً. لا روابط Google Fonts في الثيم.
تحقق (harness، Passed):
Heading slot مكسور وسليم: العنوان والـ strong = Almarai-ExtraBold، والوصف = Almarai-Regular، والشارة والزر الأساسي = Almarai-ExtraBold، والزر الثانوي = Almarai-Bold.
الحبر مطابق لـ Figma (466×179 مقابل 465×183، و303×64 مقابل 303×66).
الهندسة عند 1440 و390 و375 لم تتغير.
Not run: المتجر الحقيقي (لا وصول)، وملفات fonts.shopifycdn.com الفعلية، ومحرر الثيم.
توصية للتاجر (اختيارية، خارج نطاق هذا السكشن): مراجعة Theme settings ← Typography ← "Heading font". إن كانت Font 3 (Libre Baskerville)، فكل عناوين h1–h6 العربية في المتجر تُرسم بـ Times New Roman.
تصحيح لاحق: أكّد المستخدم من theme dev أن Font 1/2/3 كلها Almarai، وأن قاعدة dev1.css:122 مطبَّقة، وأن الـ computed هو Almarai, sans-serif. فرضية "drift الإعداد" أعلاه غير صحيحة (انظر الإدخال التالي).
### 2026-10-13 — تحقيق: Almarai يُحمَّل (200) لكن الحروف العربية تسقط إلى Times New Roman
دليل المستخدم (theme dev):
almarai_n4/n7/n8 كلها 200. الـ computed = Almarai, sans-serif.
Rendered Fonts للـ <h2>: TimesNewRomanPS-BoldMT ×39 + OTS derived font ×6.
السبب (مُعاد إنتاجه بدقة، وغير مُتحقَّق منه على ملفات Shopify نفسها):
ملفات Almarai التي يقدّمها Shopify على الأرجح لا تحتوي إلا subset لاتيني.
Google نفسه يوزّع Almarai كملفين منفصلين لكل وزن: arabic وlatin، لكل منهما unicode-range.
صفحة تعلن @font-face بأسلوب font_face في Shopify (ملف لكل وزن، بلا unicode-range) بملف Latin فقط أعطت بالضبط: [webfont] Almarai-ExtraBold ×6 | TimesNewRomanPS-BoldMT ×39.
الـ 6 هي المسافات (موجودة في الـ subset اللاتيني).
بملف Arabic: Almarai-ExtraBold ×45.
النطاق: ليس الهيرو فقط. في نفس الاختبار رُسم نص الوزن 400 (الوصف) بـ SegoeUI ×84، فكل نص عربي بخط Almarai في المتجر غالباً ليس Almarai.
حجم 34.5px: ليس خطأ. base.css يعطي .hdt-h_custom قيمة max(46×0.75, 25) = 34.5 في نطاق 768–1149، و46 فقط من 1150. الـ viewport أثناء الفحص أقل من 1150 (DevTools مفتوح بجانب الصفحة).
لم يُعدَّل أي ملف ثيم.
الحل المقترح (بانتظار موافقة المستخدم بعد تشغيل probe التغطية على ملفات Shopify):
رفع ملفات Almarai العربية (OFL) مرة واحدة إلى assets/: ~31–33KB لكل وزن، للأوزان 400/700/800.
إعلانها بـ @font-face { font-family: Almarai; unicode-range: <arabic> }، فيبقى Shopify للاتيني وتتكفّل الملفات المحلية بالعربي، بلا تغيير في أي selector أو إعداد.
مكان التحميل يُقرَّر مع المستخدم: dev1.css (الهيرو/الهوم فقط) أو تحميل عام (كل الصفحات = تغيير عام).
### 2026-10-13 — تأكيد ثم إصلاح عام: دعم Almarai العربي على كل المتجر
تأكيد السبب (CONFIRMED): فحص جدول cmap لملفات Shopify الحقيقية almarai_n4/n7/n8 (من الـ preview، HTTP 200، WOFF2 صالح، أوزان OS/2 = 400/700/800، 212 glyph):
0 نقطة عربية (U+0600–06FF، وPresentation Forms A/B). Basic Latin كامل (95).
من نص الهيرو: 1/30 فقط (النقطة).
جدول الأسماء بلا سجلات family، وهذا يفسّر "OTS derived font" في DevTools.
الملفات المضافة:
assets/almarai-arabic-400.woff2 (31,672 B)، و-700 (32,912 B)، و-800 (33,328 B).
المصدر: Google Fonts Almarai v19، subset عربي (fonts.gstatic.com).
التحقق: WOFF2 صالح، والأسماء الداخلية "Almarai" Regular/Bold/ExtraBold، وأوزان OS/2 = 400/700/800، و290 glyph. التغطية: 104 (U+0600–06FF) + 59 (FB50–FDFF) + 91 (FE70–FEFF)، و29/30 من نص الهيرو (النقطة من ملف Shopify).
licenses/Almarai-OFL.txt: من google/fonts/ofl/almarai. SIL OFL 1.1، بلا Reserved Font Name، فاسم Almarai مسموح.
snippets/ayum-arabic-font-face.liquid: 3 قواعد @font-face باسم Almarai، وأوزان 400/700/800، وfont-style: normal، وfont-display: swap، وasset_url، وunicode-range: U+0600-06FF, U+FB50-FDFF, U+FE70-FEFF. لا preload.
التعديل الوحيد على ملف أصلي: layout/theme.liquid، سطر واحد render 'ayum-arabic-font-face' بعد render 'css-variables' داخل {%- liquid %}.
لم يُعدَّل: css-variables.liquid، وإعدادات Typography، وsettings_data.json، والسكاشن والبلوكات الأصلية، وdev1.css، وpassword.liquid.
تحقق (harness يحاكي المتجر بملفات Shopify الحقيقية + نص الـ snippet الفعلي، Passed):
بدون الـ snippet: OTS-derived-font ×6 | TimesNewRomanPS-BoldMT ×39، وهي بصمة المتجر حرفياً.
مع الـ snippet (بعد أو قبل قواعد Shopify، والنتيجة نفسها):
العنوان والجزء الوردي والشارة والزر الأساسي = Almarai-ExtraBold، والوصف = Almarai-Regular، والزر الثانوي = Almarai-Bold.
h3 بوزن 600 والكلاس bold = Almarai-Bold، والنص العادي خارج الهيرو = Almarai-Regular.
النص اللاتيني = ملف Shopify فقط (×46).
الحبر مقابل Figma: 466×179/465×183، و303×64/303×66، و497×52/497×51.
هندسة الهيرو عند 1440/390/375 لم تتغير، والـ console نظيف.
Not run: الـ preview الحقيقي بعد الإصلاح (يتطلب مزامنة الملفات الجديدة)، وSafari/Firefox، وtheme check.
### 2026-10-13 — متابعة (تحسين): التفاف العنوان، ووصف الموبايل، والمسافات
Figma: أُعيد استخدام قياسات عقد 2001:33 و2001:612 (metadata/design context).
السبب 1، التفاف السطر الأول على الديسكتوب:
السطر الأول كان يعتمد على أن "يكبر" لا تتسع بعد العبارة الوردية داخل 520px. الهامش بضع بكسلات فقط، فيختلف بين البيئات (لقطة المتجر: "يكبر" على السطر الأول).
في Figma نفسه السطر الثالث فقرة منفصلة، والتوزيع مقصود.
الحل: <br/> قابل للتحرير بعد العبارة الوردية أيضاً، مع hidden_br_mobile (موجود) والقاعدة الممتدة حتى 767px.
السبب 2، وصف الموبايل: Figma يستخدم نصاً مختلفاً على الموبايل. بلوك text الأصلي لا يملك "إخفاء على الديسكتوب".
الحل: بلوك _liquid الأصلي ("Liquid - HTML"، مسموح أصلاً في _slide-item) يحمل النص داخل عنصر بكلاس ayum-mobile-only، وبلوك الوصف الحالي يُفعَّل له "Hide on mobile".
dev1.css:
إخفاء .hdt-hide-mobile داخل محتوى الهيرو حتى 767px (Kalles يتوقف عند 750).
إخفاء غلاف :has(.ayum-mobile-only) من 768px.
تنسيق وصف الموبايل (13px / 400 / 1.7 / --ayum-hero-text) على الغلاف، فلا يعتمد على خيارات حجم البلوك.
لا تعديل على أي بلوك أصلي.
templates/index.json لم يُعدَّل عمداً: نسخة المتجر فيها صور مرفوعة من محرر الثيم، والنسخة المحلية حقول صورها فارغة. رفع الملف المحلي (مثلاً عبر theme dev) سيمسح الصور. تعديلات المحتوى تُنفَّذ من محرر الثيم (انظر التقرير)، أو بعد سحب القالب من المتجر.
تحقق (harness يحاكي المتجر: ملفات Shopify اللاتينية الحقيقية + snippet العربي + المحتوى المقترح، Passed):
التفاف الأسطر: الديسكتوب (1440 و1290) = "سكيتلز مجفف بالتجميد" (وردي) / "يكبر ويقرمش ويذوب" / "في الفم". الموبايل (375 و390) = "سكيتلز مجفف بالتجميد يكبر" / "ويقرمش ويذوب في الفم". وصف الموبايل سطران مطابقان لـ Figma.
الهندسة عند 1440 (موقع / Figma): الصندوق x800/y81 وارتفاع 379/378؛ الشارة y81 و92×27 = مطابق؛ العنوان y126 بارتفاع 193/192؛ الوصف y337/336؛ الأزرار y414 = مطابق.
الهندسة عند 375: الشارة y18 و83×23 = مطابق؛ العنوان y49 بارتفاع 73/72؛ الوصف y130/129 بارتفاع 44 = مطابق؛ الزر y182/181 و142×31 مقابل 141×31.
320 و768 و1150 سليمة.
الخطوط المرسومة: ExtraBold للعنوان والشارة والزر الأساسي، وRegular للوصفين، وBold للزر الثانوي. الحبر مطابق ~1%.
تكوين صورة الموبايل: يحدده الملف المرفوع في "Mobile image" + نقطة التركيز (focal point)، مع object-fit: cover في بانر 500px. للمطابقة: رفع تصدير Figma للبانر 375×501 (يُفضَّل @2x). لم يُغيَّر CSS للصورة.
Not run: الـ preview الحقيقي بعد تطبيق خطوات المحرر.
### 2026-10-13 — تنفيذ: وصف موبايل قابل للتحرير + فحص الـ preview الحقيقي
الـ preview الحقيقي: shopify theme dev يعمل على 127.0.0.1:9292، والثيم "Development (517928-Aya-Helal)" id 193876328629 (role development).
يُزامن ملفات الكود من هذا الـ worktree لحظياً: dev1.css المنشور مطابق بايت ببايت للمحلي.
لا يُزامن القالب من المحرر: index.json في المتجر = أول نسخة مزروعة + صور التاجر (desktop 4fc1c5eb…png، وmobile 5142c0d2…png): بلا <br/>، وhidden_br_mobile غير مفعّل، وارتفاع سطر الشارة على الموبايل 14.
خطر: أي تعديل محلي على templates/index.json أثناء تشغيل theme dev يُرفع فوراً ويمسح الصور، فلم يُعدَّل.
الخطوط على الـ preview الحقيقي (HTML شوبيفاي الحقيقي + أصول الـ preview، عبر proxy محلي للقراءة فقط):
قواعد @font-face العربية الثلاث موجودة، والملفات الست كلها 200.
العنوان والشارة والزر الأساسي = Almarai-ExtraBold، والوصف = Almarai-Regular، والزر الثانوي = Almarai-Bold. ملف Shopify اللاتيني للمسافات والنقطة فقط.
ما رآه التاجر سابقاً على الأرجح كاش.
الـ preview صار يحوّل كل الطلبات إلى /password بعد ذلك، فالقياسات من HTML المتجر الحقيقي الملتقَط قبلها مع الأصول الحية.
الملفات المضافة/المعدلة (كود، مُزامَن للـ preview):
blocks/_ayum-slide-item.liquid: نسخة من _slide-item بنفس الـ markup والإعدادات حرفياً. الاسم "Slide (AYUM)"، ويضيف _ayum-description للبلوكات المسموحة، مع preset بمحتوى Figma. أُزيلت فيه فقط فاصلة زائدة موروثة في الـ schema.
blocks/_ayum-description.liquid ("Description (AYUM)"): text (richtext)، وtext_mobile (richtext اختياري، fallback للوصف)، وحجم desktop/mobile (17/13، خطوة 1).
sections/ayum-slideshow.liquid: blocks = _slide-item + _ayum-slide-item (الشرائح الحالية تبقى صالحة).
assets/dev1.css: قواعد .ayum-desc، وإزالة قواعد ayum-mobile-only و.hdt-hide-mobile من الجولة السابقة.
ترحيل القالب (جاهز، بانتظار سحب القالب من المتجر): سكربت يستبدل نص قسم ayum_slideshow_hero فقط:
الشرائح ← _ayum-slide-item (نفس الـ ids والصور).
العنوان ← <br/> بعد العبارة الوردية وبعد "ويذوب"، مع hidden_br_mobile.
text الوصف ← _ayum-description (نص الديسكتوب محفوظ + نص Figma للموبايل).
الشارة: ارتفاع السطر على الموبايل 14 ← 13.
اختُبر على ملف محاكٍ بصور المتجر: بقية الملف بايت ببايت، والصور وorder بلا تغيير.
تحقق (HTML المتجر الحقيقي + markup ما بعد الترحيل + أصول الـ preview الحية):
375: الشارة y18 و83×23؛ العنوان y49 بارتفاع 73 (Figma 72)؛ الوصف y130 (129) بارتفاع 44؛ الزر y182 (181) و142×31.
1440: الصندوق x800/y81؛ العنوان y126؛ الوصف y337؛ الأزرار y414.
الأسطر مطابقة لـ Figma عند 375 و390 و1290 و1440، والخطوط كلها Almarai الصحيح.
Not run: الـ preview الحي بعد الترحيل (يحتاج سحب القالب + كلمة مرور المتجر في المتصفح).
### 2026-10-13 — S1 Announcement bar: زر "انسخ الكود"
Figma: get_design_context + get_metadata للعقدتين 2001:4 و2001:582.
ديسكتوب: بار 1440×49، زر 94×25 (padding 6/16، radius 16، 12px/800)، نص 241×16 (14px/700)، gap 14.
موبايل: بار 375×40، زر 80×22 (padding 5/12، radius 14، 11px/800)، نص 206×13 (12px/700)، gap 10.
الأصل: sections/announcement-bar.liquid (Kalles)، والـ instance announcement_bar_QKnWCh في sections/header-group.json. لم تكن هناك نسخة AYUM.
الملفات:
جديد sections/ayum-announcement-bar.liquid: نسخة من الأصل. نفس اسم الـ schema (t:sections.announcement-bar.name)، ونفس class/limit/groups/presets، وكل الإعدادات الأصلية الـ21. أُزيلت فقط فاصلتان زائدتان موروثتان.
الإضافات: كلاس ayum-announcement-bar + custom_class؛ إعدادات القسم ayum_height_mb (40)، وayum_copy_enable، وayum_copy_label (انسخ الكود)، وayum_copy_code (AYUM10)، وayum_copy_success (تم نسخ الكود)، وayum_copy_error (تعذّر النسخ)، وayum_copy_bg (#EA3A79)، وayum_copy_color (#FFFFFF)؛ وإعداد البلوك ayum_show_copy.
الزر في تصميم slider فقط.
جديد assets/ayum-copy-code.js: custom element <ayum-copy-code> (define محمي، ربط واحد، تنظيف في disconnected). Clipboard API في سياق آمن، ثم fallback execCommand، ثم حالة فشل. aria-live للإعلان.
assets/dev1.css: قسم منفصل تحت .ayum-announcement-bar. الملصق والرسائل في نفس خلية grid، والملصق وحده يحدد العرض، فلا تغيير في الحجم عند النسخ.
sections/header-group.json: أُضيف ayum_announcement_bar أولاً (نفس إعدادات ونص الأصل)، و"disabled": true على announcement_bar_QKnWCh. بياناته محفوظة، وcustom_liquid_BCTxT9 بلا تغيير. النسخة المحلية كانت مسحوبة من المتجر في bfdcf3e ومطابقة لما يرسمه الـ preview.
إصلاح عرضي: bfdcf3e حذف assets/almarai-arabic-800.woff2 (الـ preview أعاد 404، فعاد العنوان 800 إلى Times New Roman). استُعيد من 96f6daa (SHA-256 مطابق 7acac6ae…)، والـ preview يعيده 200 (33,328B). ملف فارغ دخيل assets/dev1.css.tmp.21456.70728f719e45 من نفس الـ commit لم يُحذف (بانتظار قرار المستخدم).
تحقق (HTML الـ preview الحقيقي مع markup القسم الجديد + أصول الـ preview الحية؛ الصفحة الحية خلف كلمة المرور):
1440 (موقع / Figma): بار 49/49؛ الزر 93.1×25 عند x546.4 (94×25 عند 545.5)؛ النص 240.2×16 عند x653.4 (241×16 عند 653.5)؛ gap 14.
375: بار 40/40؛ الزر 80×22 عند x39.6 (39.5)؛ النص 205.9×13 عند x129.5؛ gap 10.
320 و768 و1150 في المنتصف، بلا overflow.
الخطوط: الزر Almarai-ExtraBold، والنص Almarai-Bold.
السلوك: النقر ينسخ AYUM10 (قراءة فعلية من الحافظة)؛ تغيير الكود ← يُنسخ الجديد؛ Enter وSpace؛ إطار التركيز 2px عند Tab؛ لا تغيّر في عرض الزر ولا scroll ولا URL؛ مسار الفشل ← "تعذّر النسخ" + إعلان.
الهيرو لم يتأثر.
Not run: المتجر الحي (كلمة المرور)، وإعادة تحميل القسم في محرر الثيم، وSafari/Firefox، ولمس فعلي.
معلّق من مهمة الهيرو: templates/index.json المسحوب في bfdcf3e فيه صور التاجر، والشرائح ما زالت _slide-item. سكربت الترحيل جاهز عند الطلب.
### 2026-10-13 — H2 Shop by category (تسوّق حسب الفئة)
Figma: get_design_context + get_metadata للعقدتين 2001:55 و2001:626.
ديسكتوب: py48، العنوان 36/800 #26383A (ارتفاعه 40)، gap 32، 4 بطاقات 305×271 (صورة 220 + شريط 51، 17/800)، gap 20، radius 16، المحتوى 1280، النقاط 12/40×12 gap 6 بعد 32.
موبايل: py24، العنوان 21 (23)، gap 24، بطاقات 150×147 (صورة 110 + شريط 37، 13/800)، gap 12، radius 14، بداية 16 من اليمين، peek 35.
الخلفية rgb(228 237 240 / .6) + حدود rgb(38 179 208 / .15). ألوان الأشرطة: #26B3D0 و#EA3A79 و#B6D561 و#E78333.
الأساس: sections/collections-list.liquid (carousel = <hdt-slider> الأصلي، نقاط/أسهم أصلية، أعمدة لكل breakpoint، section-heading ثابت). بلوك _collection_item يرسم snippets/collection-item.liquid. الستايل 5 يضع العنوان تحت الصورة أصلاً.
الملفات:
جديد sections/ayum-collections-list.liquid: نسخة بنفس الاسم (t:sections.collections-list.name) وكل الإعدادات.
يضيف: تحميل dev1.css، والكلاس ayum-collections-list + custom_class، والبلوك _ayum-collection-item بجانب الأصلي.
أُزيل hdt-reveal من عنصر النقاط فقط، لأن الـ observer (rootMargin -50px) لا يفعّله قرب نهاية صفحة قصيرة، فتبقى النقاط بشفافية 0.01.
جديد blocks/_ayum-collection-item.liquid ("Collection (AYUM)"): نسخة من _collection_item.
يضيف ayum_label_color (Blue/Pink/Green/Orange) كـ class عبر بارامتر class الموجود في الـ snippet الأصلي غير المعدَّل.
العنوان بلا قيمة افتراضية: عند تركه فارغاً يُستخدم عنوان المجموعة.
assets/dev1.css: قسم .ayum-collections-list.
الحاوية 16/20px.
الموبايل: --slide-spacing و--slide-size: 43.67% على الـ viewport (بدل قاعدة الـ #id) + bleed للحافة.
crop الصورة عبر hdt-ratio--landscape (73.33% / 72.13%)، وألوان الأشرطة، والنقاط.
templates/index.json: أُضيف ayum_collections_list بعد الهيرو. القالب المسحوب لم يكن فيه غير الهيرو، والهيرو بقي بايت ببايت كما هو.
4 بطاقات بعناوين وألوان Figma بلا مجموعة/صورة.
الإعدادات: style 5، وlandscape، وcol 4/3/2، وspace 20، وcarousel، وdots مع hide on mobile، وpag 6/32، وpd 48/24، والعنوان h_custom 36/21، وdesign_heading "1".
تحقق (HTML المتجر الحقيقي الملتقَط من الـ preview + أصول حية؛ الـ preview يتنقّل بين 200 و/password):
Shopify يرسم القسم: 4 بطاقات ayum-cat--orange/green/pink/blue، والعنوان، وlg:hdt-slides-4 md:hdt-slides-3 hdt-slides-2.
1440: بطاقات 305×271 عند x 80/405/730/1055 (= Figma)، والعنوان 36/800 عند y49.
375: بطاقات 150×147 عند x 209/47، وpeek 35 (= Figma)، والعنوان 21/800، وارتفاع القسم 244 (Figma 242 بدون الحدود).
320/390/768/1150 بلا overflow. الخطوط Almarai-ExtraBold.
النقاط (صفحة اختبار بـ 6 بطاقات): 40×12 #26B3D0 نشطة + 12×12 #D3E3E8، gap 6، تبعد 32 عن البطاقات، في المنتصف، النشطة يميناً (RTL)، والنقر ينقل. مخفية على الموبايل، والسحب على الموبايل يعمل.
ملاحظات:
مع 4 مجموعات و4 لكل عرض لا توجد صفحات، فـ Kalles لا يعرض نقاطاً على الديسكتوب (سلوك أصلي)، وتظهر عند 5+ مجموعات. Figma يرسم 3 نقاط، أي 6 فئات.
لون النقطة النشطة في Figma أزرق #26B3D0 (ليس الوردي المذكور في الطلب)، وطُبّق Figma.
تعديل design_heading ← "1" وإزالة reveal من النقاط تحقّقا على الصفحة الملتقطة بعد تطبيق نفس المخرجات، لأن الـ preview كان خلف كلمة المرور.
Not run: المتجر الحي بعد آخر تعديلين، والروابط (لا مجموعات مختارة بعد)، ومحرر الثيم، وSafari/Firefox، ولمس فعلي.
### 2026-10-13 — ترحيل H1 وS1 وH2 إلى Color-Scheme-First / Theme-Editor-First (SKILL §2.8 و§5.2)
Figma (get_variable_defs):
2001:612: Ink #26383A، وText #4E6E70، وPink #EA3A79، وBorder #D3E3E8، وWhite.
2001:55: Surface #E4EDF0 (و60%)، وPrimary #26B3D0 (و15%)، وInk، وWhite، وPink، وGreen #B6D561، وOrange #E78333.
2001:4: Primary، وPink، وWhite.
المخططات (قراءة فقط):
الـ body = scheme-1 (خلفية #ffffff، ونص #222، وoverlay #000000).
scheme-6707… (خلفية #26b3d0 / نص #fff) هو مخطط شريط الإعلانات.
لا يوجد مخطط فيه Ink أو Surface أو ألوان البطاقات.
عدّ الألوان الحرفية في assets/dev1.css: 19 قبل ← 0 بعد. ملفات AYUM Liquid/JS: 0 خارج default/presets في الـ schema.
H1 (الهيرو):
مُعاد استخدامه: إعدادات AYUM الموجودة (accent، وheading، وtext، وborder)، وألوان البلوكات الأصلية (text_custom للشارة، وbutton_custom للأزرار).
متغيرات المخطط: --color-background / --color-base-background للأسطح البيضاء (الأسهم، ونقاط الموبايل، ولون أيقونة السهم عند hover)، و--color-overlay لظل الأسهم.
color-mix من heading للون الأيقونة الخافت، وأُزيل الـ fallback الحرفي.
جديد: ayum_shade_color (#666666، "Mobile image shade") لتدرّج الموبايل (30%).
S1 (شريط الإعلانات): لا ألوان حرفية أصلاً. الخلفية والنص من المخطط الأصلي (colors_by_section + color_scheme)، والزر من ayum_copy_bg/ayum_copy_color، والـ focus يستخدم ayum_copy_color. بلا تعديل.
H2 (الفئات):
إعدادات قسم جديدة: ayum_surface_color، وayum_heading_color، وayum_accent_color، وayum_dot_color، وayum_label_text_color، ولوحة ayum_label_blue/pink/green/orange.
إعداد بلوك جديد: ayum_label_bg ("Custom label color"، بلا قيمة افتراضية)، تصدره القسم كقاعدة مربوطة بـ block id عبر section.blocks. لا يوجد <style> داخل مسار السلايدر.
اختيار ayum_label_color الموجود صار يشير لألوان اللوحة.
الخلفية من AYUM فقط عند :not([color-scheme])، فإن فُعّل المخطط الأصلي فخلفيته هي المعتمدة.
لون العنوان من AYUM فقط عند hdt-s-text، فخيارات اللون الأصلية الأخرى تعمل.
الملفات: assets/dev1.css، وsections/ayum-slideshow.liquid، وsections/ayum-collections-list.liquid، وblocks/_ayum-collection-item.liquid.
لم يُعدَّل templates/index.json: كل الإعدادات الجديدة تعمل بالـ defaults.
لم يُعدَّل أي ملف Kalles أصلي، ولا settings_data.json، ولا css-variables.liquid.
تحقق:
صفحة المتجر الحقيقية الملتقطة (200) + dev1.css الجديد حيّاً + مخرجات Liquid الجديدة بالقيم الافتراضية: 42/42 لوناً محسوباً مطابقاً للأساس. سهم الهيرو بصيغة color(srgb …) = rgba(38,56,58,.75) نفسه.
محاكاة تغيير الإعدادات (القيم التي يصدرها كل إعداد): لون اللوحة يغيّر بطاقته فقط، واللون المخصص يغيّر بطاقته فقط ويتبعها بعد إعادة الترتيب، والمخطط الأصلي يغلب، وخيار لون العنوان الأصلي يعمل، والـ accent والنقاط والإطار تتغير، والظل وسطح الأسهم يتبعان المخطط، وزر النسخ يتبع إعداداته.
Not run: إخراج Shopify الحي لملفات Liquid المعدّلة (الـ preview خلف كلمة المرور بعد التعديل)، وفتح الإعدادات فعلياً في محرر الثيم.
تصحيح ترحيل الألوان: المخططات الأصلية أولاً (2026-10-13)
السبب: الترحيل السابق أزال الألوان الحرفية، لكنه استبدلها بـ color pickers جديدة لأدوار يغطيها مخطط Kalles. هذا يمنع تبديل المخطط من التحكم في الألوان.
القاعدة: إذا كان المخطط يحوي الدور (خلفية، نص، accent، أزرار، حدود، overlay) نستخدم متغيّره حتى لو اختلفت قيمته الحالية عن Figma. الإعداد الجديد فقط حين يعجز المخطط بنيوياً عن تمثيل الدور.
S0 (الهيرو):
النص من مخطط الشريحة الأصلي (color_scheme لكل شريحة)، ثم مخطط القسم، ثم مخطط body.
العنوان والوصف من select text_color الأصلي. العنوان على الديسكتوب = --color-foreground بنسبة 75%.
الجزء المميّز (strong) والشارة والنقطة النشطة وhover الأسهم = --color-accent.
النقاط غير النشطة = --color-line-border. الأسهم = --color-background.
ظل الموبايل = --color-overlay بنسبة 18%.
أُزيلت: ayum_accent_color، وayum_heading_color، وayum_text_color، وayum_border_color، وayum_shade_color.
أُضيف إلى _ayum-description select text_color بنفس الخيارات الأصلية، والقيمة الافتراضية Secondary (= Text 2).
أزرار CTA باقية على إعدادات button_custom الأصلية.
S1 (شريط الإعلانات):
الخلفية والنص من المخطط (بلا تغيير).
زر النسخ صار من --hdt-btn-bg / --hdt-btn-color، وhover من --hdt-btn-hover-*، وحلقة التركيز --color-foreground.
أُزيلت: ayum_copy_bg وayum_copy_color.
S2 (التصنيفات):
خلفية القسم من .hdt-s-gradient + "Background opacity" الأصلي (Figma: 60%).
العنوان = hdt-s-text. الإطار = accent بنسبة 15%.
خلفية البطاقة = --color-background. النقاط = line-border / accent. نص الملصق = --hdt-btn-color.
أُزيلت: ayum_surface_color، وayum_heading_color، وayum_accent_color، وayum_dot_color، وayum_label_text_color، وayum_label_bg (بلوك)، وقواعد per-card.
باقٍ (ضروري بنيوياً): لوحة ayum_label_blue/pink/green/orange + اختيار ayum_label_color لكل بطاقة (البيانات المخزّنة فيه محفوظة).
بيانات التاجر:
templates/index.json يخزّن قيم الهيرو #ea3a79 / #26383a / #4e6e70 / #d3e3e8.
sections/header-group.json يخزّن ayum_copy_bg #ea3a79 وayum_copy_color #ffffff.
لم تُعدَّل هذه الملفات. القيم غير المعروفة يتجاهلها Shopify (متوقّع، لم يُتحقق منه).
القيم موثّقة هنا لإدخالها في مخطط.
لم يُعدَّل settings_data.json ولا أي مخطط.
مطلوب من التاجر لاستعادة مظهر Figma: إنشاء مخطط "AYUM" وتعيينه للشرائح/الأقسام، بدلاً من تعديل scheme-1 المشترك.
الهيرو: Text #26383A، Text 2 #4E6E70، Accent #EA3A79، Line border #D3E3E8. ووصف الشريحة = Secondary.
الشريط: مخطط بخلفية #26B3D0، ونص #FFFFFF، وButton #EA3A79، وButton label #FFFFFF. المخطط 6707 مستخدم أيضاً في page.women.json.
التصنيفات: تفعيل "Display colors by section" + مخطط Background #E4EDF0، وText #26383A، وAccent #26B3D0، وLine border #D3E3E8، وButton label #FFFFFF، مع Background opacity 0.6.
حتى ذلك، تظهر الأقسام بألوان المخططات الحالية (accent سماوي، نص #222، زر نسخ أبيض).
تحقق:
الـ preview الحي عاد لكلمة المرور، فاستُخدمت لقطة الصفحة الحقيقية مع حذف ما حذفه Liquid الجديد بالضبط، وdev1.css الجديد حيّاً.
إيقاف المخطط: الألوان من body.
تفعيل المخطط والتبديل بين مخططين: الخلفية والنقاط والأسهم تتبع القسم، والعنوان والوصف والشارة تتبع الشريحة.
تعديل لون داخل المخطط: تتغير كل الأدوار.
الأزرار: زر النسخ و hover يتبعان المخطط، والنسخ يعمل (AYUM10).
التصنيفات: بقيم Figma في المخطط تطابق Figma تماماً. لون الملصق مستقل لكل بطاقة.
الأقسام الأخرى: 0 من 318 عنصراً تغيّر.
ألوان حرفية في dev1.css: 0.
Not run: إخراج Shopify الحي للـ Liquid الجديد، ومحرر الثيم الفعلي.
### 2026-10-14 — H5 About the brand (تنفيذ)
Figma: 2001:230 (ديسكتوب) و2001:749 (موبايل)، عبر get_design_context مع لقطة. صورة Figma محفوظة خارج المستودع ليرفعها التاجر. لم تُضَف للثيم.
الأساس الأصلي: sections/image_text.liquid ("Image with text"). فيه بلوك Media (_image-text-column ← image) وبلوك Content (_image-text-col ← heading/text/button/…).
custom-section + _counter (اقتراح التدقيق) لا يكفي: _counter رقمي فقط، بلا عنوان ولا نص موبايل ولا بادئة "+".
النسخة المعزولة: sections/ayum-image-text.liquid. الاسم في المحرر t:sections.image_text.name = "Image with text" (نفس الأصل).
الإضافات: dev1.css، والكلاس ayum-image-text، وcustom_class، وإعدادات "Image": ارتفاع 380/220 ونصف قطر 20/16.
الـ preset صار محتوى About.
الأصل وبلوكاته بلا تعديل.
البلوكات:
مُعاد استخدامها بلا تعديل:
_image-text-column + image.
heading للعنوان الفرعي (Accent، h_custom 17/12) وللعنوان (<h2>، Default، h_custom 34/24).
_ayum-description: للوصف، مع نص موبايل منفصل، و18/14، وSecondary. عُدِّل تعليقه فقط.
_ayum-image-text-col ("Content"): نسخة من _image-text-col تقبل أيضاً _ayum-description و_ayum-stats.
جديدة:
_ayum-stats ("Statistics"): صف قابل للإضافة والحذف وإعادة الترتيب، مع أحجام 26/23 و18/11.
_ayum-stat ("Statistic"): رقم، وعنوان، وعنوان موبايل اختياري يرجع للعنوان عند الفراغ.
Color Scheme 4 = scheme-23cf8966-8e57-4acd-9bb3-bb85f222fbb9: الرابع في ترتيب color_schemes.
مستخدم أيضاً في main-product-tabs في 11 قالب منتج تجريبي من Kalles، وليس في قوالب AYUM.
ربط الألوان (المخطط فقط، بلا أي إعداد لون جديد):
الخلفية = Background (.hdt-s-gradient + Background opacity 1).
العنوان = Text.
العنوان الفرعي والأرقام = Accent.
الوصف = Text 2.
عناوين الإحصاءات = Text 2 بنسبة 80% (Figma Muted #6E8788 ≈ #4E6E70 بنسبة 80% على الخلفية).
قيم مطلوبة من التاجر في Scheme 4 (لم تُعدَّل تلقائياً):
Background #ffffff ← #FBECE0. هذا هو اللون المعتم المكافئ لـ #E78333 بنسبة 15% فوق الأبيض؛ مدى Background opacity خطوته 0.1 ولا يقبل 0.15.
Text #222222 ← #26383A.
Text 2 #878787 ← #4E6E70.
Accent #56cfe1 ← #E78333.
أثر جانبي: يغيّر أيضاً تبويبات المنتج في قوالب Kalles التجريبية.
التخطيط:
الشبكة مثبتة direction: ltr (هندسة فقط)، فالصورة يساراً في كل لغة. النص rtl على عمود المحتوى.
المسافات: 56 ديسكتوب، و32 تابلت، و14/24 بين عناصر المحتوى، و8 بين العنوان الفرعي والعنوان على الموبايل.
Bold الأصلي = 800 داخل السكشن.
القالب:
أُضيف ayum_image_text_about في آخر order بعد ayum_collections_list، لأن Best sellers وBundles لم تُبنيا بعد.
السكاشن الأخرى مطابقة بايتاً ببايت؛ السطر الوحيد المتغير فاصلة في order.
لم يُلاحظ انحراف: الـ preview يعرض نفس السكاشن والصور، و21/21 نصاً عربياً من القالب.
الصورة فارغة (placeholder) حتى يرفعها التاجر.
تحقق (الـ preview الحي عبر theme dev):
1440: صورة 612×380 يساراً، ونصف قطر 20، وفجوة 56، وحشوة 48/48، وحاوية 1320/20.
العنوان: سطر واحد بارتفاع 49.
الوصف: 1+2 أسطر بارتفاع 103 (Figma 102). المحتوى 303 ومتوسّط عمودياً.
الإحصاءات: يميناً بفجوة 32، و26/18، وفجوة 2.
375: صورة 343×220 ونصف قطر 16، والنص في الوسط، والعنوان سطران، ووصف الموبايل 4 أسطر، والإحصاءات صف واحد بثلاثة أعمدة 108 وفجوة 10، والحشوة 24/18.
1150 و1149 و768 و767 و390 و320: لا overflow أفقي، والإحصاءات صف واحد على الموبايل.
المخطط: تعديل متغيرات Scheme 4 إلى قيم Figma غيّر كل الأدوار، والتبديل إلى مخطط آخر غيّرها.
أول قياس: فجوة العنوان الفرعي/العنوان على الموبايل كانت 14 لا 8، لأن بلوك heading يطبع <style> بعد الـ div. صُحِّح المحدِّد إلى + style +. بعد التصحيح صارت 8 عند 375 و320، و24 على الديسكتوب. القياس على HTML الصفحة الحقيقية الملتقطة مع dev1.css الحي، لأن الـ preview عاد لكلمة المرور.
LTR (محاكاة dir=ltr على الصفحة الملتقطة): نفس التخطيط؛ الصورة يساراً، والنص العربي يميناً، والإحصاءات تبدأ بـ +400 من اليمين. صفحة /en الحقيقية لم تُفحص بسبب كلمة المرور.
Not run: محرر الثيم الفعلي، والمتجر المنشور.
### 2026-10-14 — H6 How we freeze-dry (تنفيذ)
Figma: 2001:250 (ديسكتوب) و2001:765 (موبايل)، عبر get_design_context مع لقطة، ولقطة مكبّرة لـ 2001:772.
ترتيب الشارات الفعلي:
ديسكتوب (من اليمين): حافظة، ألوان، أعمار، كويتي.
موبايل: صف 1 ألوان ثم أعمار، وصف 2 حافظة ثم كويتي.
نصا "أعمار" و"كويتي" أقصر على الموبايل.
أيقونات Figma: SVG بخط أبيض على شبكة 30. الثلج 6 أذرع مدوّرة بزاوية 60°.
الأساس الأصلي: sections/icon-box.liquid ("Icon box"). فيه:
section-heading مثبَّت.
شبكة col_dk/col_tb/col_mb ومسافات.
بلوكات _icon_box: أيقونة من صورة أو SVG أو icons، وعنوان، ووصف.
النسخة المعزولة: sections/ayum-icon-box.liquid، الاسم "Icon box".
التغييرات:
بلوك _ayum-claims مثبَّت بعد العنوان.
خيار 23px في space_horizontal.
إعدادات "Heading": حجم العنوان الفرعي للموبايل 13. السبب: مدى البلوك الأصلي خطوته 2px.
إعدادات "Step cards": العنوان 20/17، والوصف 14/13، والزوايا 16/14، وحشوة الموبايل.
custom_class.
أُسقطت 7 منتقيات ألوان من النسخة فقط: heading/icon/description/box/border/hover. المخطط يحمل هذه الأدوار، ومتغيراتها الأصلية تُغذّى من المخطط في dev1.css.
الأصل وكل بلوكاته بلا تعديل.
البلوكات:
_ayum-icon-box: نسخة من _icon_box بكل إعداداته، مع إضافة:
رقم الخطوة.
وصف موبايل اختياري يرجع للوصف.
"AYUM icon" (ثلج/قطرة/عبوة من snippets/ayum-icons.liquid).
"Icon background".
أُبقيت صورة/SVG الأصليان وتسبقان أيقونة AYUM. لم يُخزَّن SVG في القالب.
_ayum-claims + _ayum-claim: نص، ونص موبايل، و"Accent color" (الحد، والخلفية بنسبة 15%)، و"Mobile position" (1–2 صف أول، 3–4 صف ثانٍ، 5–6 ثالث).
الألوان:
من المخطط: الخلفية، والعنوان والعنوان الفرعي (Text / Secondary = Text 2)، والبطاقة (Background 2 بنسبة 60%)، وعنوان الخطوة (Text)، والوصف (Text 2)، ولون الأيقونة (Button label)، ونص الشارات (Text).
إعدادات بلوك (ألوان مستقلة متعددة): دوائر الأيقونات، والشارات.
مخطط القالب: Scheme 1 (scheme-1)، الخلفية البيضاء الوحيدة.
قيم مطلوبة من التاجر (لم تُعدَّل تلقائياً):
Text #222222 ← #26383A.
Text 2 #878787 ← #4E6E70.
Background 2 #f2f2f2 ← #E4EDF0.
Scheme 1 هو مخطط الموقع كله، فالأفضل نسخة منه تُعيَّن لهذا السكشن.
فرق متبقٍّ: العنوان الفرعي في Figma #6E8788 و"Secondary" = Text 2 = #4E6E70.
حشوة البطاقة: الحشوة الأصلية 28px,28px,42px,12px. حافة النهاية 12 كما في بطاقة Figma الثالثة، حتى يبقى وصفها سطراً واحداً.
القالب:
أُضيف ayum_icon_box_freeze_dry بعد ayum_image_text_about (ترتيب Figma).
السكاشن الثلاث الأخرى مطابقة بايتاً ببايت.
انحراف مُلاحظ: commit "create section 5 in theme editor" بدّل محتوى الإحصاءين 1 و3 في About، ورفع صورة About. حُفظ كما هو.
تحقق:
مكان الاختبار: الـ theme dev الوحيد على 9292 كان يخدم ayum-dev2-ah، فلم يُستخدم.
طريقة الاختبار:
أُعيد إنتاج مخرجات Liquid لهذا السكشن بالضبط داخل صفحة المتجر الحقيقية الملتقطة (ix2.html)، مع dev1.css من هذا الـ worktree والأصول الأصلية المطابقة.
رسوم hdt-reveal حُيِّدت للقياس فقط.
1440:
الفجوات 16/16/32 والحشوة 48.
4 شارات في صف من اليمين (13px/700، 8×16، نصف قطر 18).
3 بطاقات 411×193 متساوية، والخطوة 1 يميناً، والأيقونة 52 أعلى اليمين، والعناوين 20/800، والأوصاف 14/1.8 سطراً واحداً.
375:
الحشوة 24، والفجوات 8/8/16.
الشارات صفّان بترتيب Figma، بفجوة 8.
البطاقات مكدّسة 343×70 بفجوة 8، والأيقونة 40 يميناً، والنص بجانبها، و3px بين العنوان والوصف، ونصوص الموبايل ظاهرة.
1150/1149/768/767/390/320: لا overflow، والبطاقات متساوية الارتفاع.
LTR (محاكاة): نفس المواضع.
المخطط: تعديل Scheme 1 إلى قيم Figma غيّر كل الأدوار، والتبديل لمخطط آخر غيّرها.
إعادة الترتيب: الأيقونة واللون يتبعان البلوك.
ملاحظة خط: Almarai Bold ارتفاع سطره normal ≈ 1.56، وهو مطابق لـ Figma (24.9px على 16px).
Not run: Liquid على Shopify (لا preview لهذا الـ worktree)، ومحرر الثيم، وإضافة/حذف البلوكات فعلياً في المحرر.
### 2026-10-14 — متابعة (ألوان فقط): Color Scheme 2 + لون العنوان الفرعي
Color Scheme 2 = scheme-77e4ef58-56a9-4631-876a-12098ba7d57d: الثاني في ترتيب color_schemes. قيمه: Text #26383A، وText 2 #878787، وBackground #E4EDF0، وBackground 2 #FFFFFF، وButton label #FFFFFF.
القالب: في ayum_icon_box_freeze_dry تغيّر سطران فقط:
color_scheme: scheme-1 ← Scheme 2.
background_opacity: 1 ← 0. السكشن شفاف فوق خلفية الصفحة البيضاء، كما في Figma.
باقي السكاشن مطابقة بايتاً ببايت.
الـ preset: background_opacity 0.
ربط الألوان:
البطاقة: صارت من scheme Background بنسبة 60% (كانت Background 2). في Scheme 2 هي #E4EDF0، أي "Surface 60%" في Figma بالضبط.
باقٍ كما هو: العنوان وعنوان البطاقة ونص الشارات = Text، والوصف = Text 2، والأيقونة = Button label، والشارات ودوائر الأيقونات = إعدادات البلوكات.
إعداد جديد ayum_subheading_color ("Subheading color"، #6E8788):
السبب: Figma يحتاج 3 ألوان نص مستقلة (#26383A و#4E6E70 و#6E8788)، والمخطط فيه Text وText 2 فقط.
عند مسحه يعود لون "Text color" الأصلي لبلوك العنوان الفرعي، بواسطة كلاس ayum-icon-box--sub-color.
فرق متبقٍّ: وصف البطاقات #878787 (Text 2 في Scheme 2) بدل #4E6E70. الدور موجود في المخطط والقيمة فقط مختلفة، فلم يُضَف منتقٍ (SKILL §2.8).
يصلحه التاجر: Scheme 2 → Text 2 = #4E6E70.
أثر جانبي: Scheme 2 مستخدم أيضاً في Categories على الرئيسية (لا تستخدم Text 2)، وفي collection.custom-ayum.json وقوالب Kalles تجريبية.
تحقق (محاكاة على الصفحة الملتقطة؛ لا preview حي لهذا الـ worktree):
1440 و375: كل الألوان أعلاه مطابقة لـ Figma ما عدا الوصف. الهندسة مطابقة بالبكسل لما قبل التعديل، ولا overflow.
تعديل Scheme 2: غيّر العنوان والبطاقة والوصف والأيقونة ونص الشارات. لم يتأثر العنوان الفرعي ولا الشارات ودوائر الأيقونات.
إعداد العنوان الفرعي: يغيّره، وعند مسحه يعود للأصلي.
Not run: Shopify Preview ومحرر الثيم.
### 2026-10-14 — H9 FAQ (تنفيذ)
Figma: 2001:446 (ديسكتوب) و2001:911 (موبايل) عبر get_design_context مع لقطة.
الموبايل مقصوص عند 4 أسئلة. نُفِّذت الخمسة.
سؤال 3 على الموبايل أقصر: "كم مدة التوصيل داخل الكويت؟".
جواب 1 على الموبايل مختلف.
الأساس الأصلي: sections/accordion.liquid ("Accordion"). فيه:
section-heading مثبَّت.
بلوكات _accordion-item: <hdt-accordion> + <details>/<summary>، وaria-expanded، وحركة فتح/إغلاق من global.min.js.
لا يوجد وضع "عنصر واحد مفتوح".
النسخة المعزولة: sections/ayum-accordion.liquid. الاسم "Accordion" عبر t:sections.accordion.name.
الإضافات:
dev1.css.
كلاس ayum-faq وcustom_class.
إعدادات "FAQ items": المسافة بين العناصر 12/8، وحجم السؤال 19/13، وحجم الجواب 15/12. تحل محل الفجوة الثابتة 10px في الأصل.
الـ preset: محتوى FAQ.
الأصل وبلوكه بلا تعديل.
البلوك _ayum-accordion-item: نسخة من _accordion-item بنفس السلوك والإعدادات، مع إضافة:
"Mobile title" و"Mobile content" اختياريان، يرجعان للنص الأصلي عند الفراغ.
سؤال بلا جواب: يظهر في المتجر صفاً ثابتاً بلا زر وبلا +. السبب: الـ JS الأصلي يحرّك عنصر الجواب، فغيابه يكسر الفتح. في المحرر يظهر تلميح.
الأسئلة 2–5 بلا أجوبة (Figma لا يعطيها، ولم تُختلق). تظهر + بعد أن يضيف التاجر الجواب.
Color Scheme 7 = scheme-c9476b69-abc7-454f-a946-2d5a9f5f3a37: السابع في ترتيب color_schemes.
الربط:
القسم = Background (.hdt-s-gradient، opacity 1).
البطاقة = Background 2.
الحد = Line border.
العنوان والأسئلة = Text.
الأجوبة = Text 2.
+/− = Accent.
لم يُضَف أي منتقي لون.
قيم مطلوبة من التاجر في Scheme 7 (لم تُعدَّل تلقائياً):
Background #f6f6f8 ← #DEF4F8. هذا هو اللون المعتم المكافئ لـ #26B3D0 بنسبة 15% فوق الأبيض؛ خطوة "Background opacity" هي 0.1.
Background 2 #f2f2f2 ← #FFFFFF.
Text #222222 ← #26383A.
Text 2 #878787 ← #4E6E70.
Accent #56cfe1 ← #26B3D0.
Line border #e6e6e6 ← #D3E3E8.
أثر جانبي: Scheme 7 مستخدم أيضاً في breadcrumb وtabs في product.custom-ayum.json، و17 قالباً تجريبياً.
CSS:
البطاقة هي غلاف <hdt-accordion> لا <details>، لأن الـ JS يحرّك ارتفاع <details>.
الحشوة على summary والجواب، والجواب يتداخل مع حشوة السؤال: 10px ديسكتوب و8px موبايل.
الأيقونات الأصلية بلون Accent وبلا صندوق، بحجم 11/12px مع stroke أعرض لتقارب +/− الثقيلة في Figma.
القالب:
أُضيف ayum_accordion_faq في آخر order بعد freeze-dry. Reviews وVideos في Figma قبله، وليستا في هذا الـ worktree.
السكاشن الأربع الأخرى مطابقة بايتاً ببايت.
انحراف مُلاحظ: commit "create section 6 in theme editor" عكس ترتيب شارات freeze-dry وبدّل مواضعها على الموبايل. حُفظ كما هو.
تحقق:
مكان الاختبار: الـ theme dev الوحيد (9292) يخدم ayum-dev2-ah.
طريقة الاختبار:
أُعيد إنتاج مخرجات Liquid للمتجر داخل الصفحة الملتقطة الحقيقية مع global.min.js وtheme.css الأصليين (مطابقين بين الـ worktrees).
التفاعل اختُبر على <hdt-accordion> الحقيقي.
1440:
الحشوة 48، والحاوية 20، والعنوان 36/800، و32 حتى القائمة.
القائمة 922 في الوسط، والفجوة 12.
البطاقة: حد 1px، ونصف قطر 12، وحشوة 18×24، والسؤال 19/700 يميناً، والأيقونة يساراً.
الجواب 15/1.85 على بعد 10. البطاقة 1 بارتفاع 106.
375:
الحشوة 24، والحاوية 16، والعنوان 21، و16 حتى القائمة، والفجوة 8.
حشوة 14، والسؤال 13، والجواب 12/1.8 على بعد 8، سطران. البطاقة 1 بارتفاع 101.
نصوص الموبايل ظاهرة.
1150/1149/768/767/390/320: لا overflow.
التفاعل: النقر وEnter وSpace تبدّل aria-expanded و+/− والارتفاع (106↔68).
LTR (محاكاة): نفس المواضع.
Scheme 7 مُعدَّل لقيم Figma: كل الأدوار مطابقة.
إصلاح أثناء التحقق: تباعد .hdt-rte * + * دفع جواب الموبايل 15px. صُفِّر داخل الجواب.
Not run: Shopify Preview لهذا الـ worktree، ومحرر الثيم (إعادة تحميل السكشن، والتلميح، وإضافة/حذف البلوكات).

### سجل فرع dev2-ah (من النسخة الأولى؛ محفوظ دون اختصار):
### 2026-10-13 — H3 Best sellers (tabs) — تنفيذ أول (فرع dev2-ah)
Figma: فُحصت 2001:80 و2001:647 عبر get_metadata وget_design_context وget_variable_defs ولقطات الشاشة. ترتيب البطاقة المعتمد: الصورة والشارة ← (الوصف + التقييم في صف واحد) ← العنوان ← السعر ← زر الإضافة.
الأساس الأصلي (لم يُعدَّل): sections/tabs-collection.liquid وblocks/_tab-collection.liquid وblocks/_product-carousel.liquid وsnippets/card-product7.liquid.
ملفات جديدة:
sections/ayum-tabs-collection.liquid: نسخة من tabs-collection. أُضيف خيار تصميم تبويبات ayum_pill، و7 ألوان AYUM، وcustom_class. التسمية تُعرض كنص فعلي بدل حقن content: في CSS.
blocks/_ayum-tab-collection.liquid: نسخة من _tab-collection تسمح بـ _ayum-product-carousel إلى جانب _product-grid.
blocks/_ayum-product-carousel.liquid: نسخة من _product-carousel. أُضيف خيار بطاقة ayum في الـ dispatcher الخاص بها (البطاقات 1–12 كما هي)، وشريط تقدّم السلايدر، و4 إعدادات AYUM.
snippets/card-product-ayum.liquid: نسخة من card-product7 بترتيب Figma.
snippets/ayum-card-rating.liquid: تقييم "4.8 ★★★★★" من metafields التقييم القياسية (reviews.rating / reviews.rating_count)، وهو المصدر نفسه الذي يقرؤه تكامل Judge.me في hdt-pr-card-rating.liquid. لا يُعرض شيء بدون تقييم فعلي.
assets/dev2.css: كل القواعد تحت .ayum-tabs-collection. يُحمَّل من السكشن فقط.
assets/ayum-slider-progress.js: عنصر <ayum-slider-progress> يقرأ Embla API الخاص بـ <hdt-slider> الأصلي عبر حدثَي init:slide وselect:slide. لا مكتبة جديدة.
ملفات معدَّلة: templates/index.json. أُضيف ayum_tabs_collection_best_sellers بعد collections_list_manual_eErqxt، وبقية الملف مطابقة بايتاً ببايت (تحقق آلي).
الألوان: من الـ scheme الخلفية، والعنوان (hdt-s-text)، ونص البطاقة الثانوي (--color-foreground2)، وحد البطاقة (--color-line-border)، وخلفية الشارة. ألوان AYUM (قيم Figma افتراضية): ayum_primary_color #26B3D0، ayum_on_primary_color #FFFFFF، ayum_surface_color #E4EDF0، ayum_tab_text_color #4E6E70، ayum_price_color #EA3A79، ayum_badge_text_color #EA3A79، ayum_star_color #F2B640.
الوصف: مقتطف نصي من product.description (strip_html ثم truncate)، معزول في سطر واحد داخل card-product-ayum ليُستبدل بـ metafield لاحقاً.
الشارات: snippets/badges.liquid الأصلي كما هو (خصم %، جديد، theme.custom_badges عند تفعيل use_custom_badge)، بتنسيق Figma داخل بطاقة AYUM فقط.
فحوص مُشغَّلة: تحليل JSON صارم لكل schema ولـ index.json، وتوازن الوسوم، وnode --check للـ JS، وgrep لألوان حرفية (0)، ونطاق المحددات، ونقاط التوقف (767/1150 فقط)، وروابط Figma (0)، وgit diff للأصول الأصلية (بدون تغيير).
Not run: shopify theme dev/check، والعرض في المتصفح، وresponsive وRTL/LTR، ومحرر الثيم، وبيانات المتجر الفعلية (Judge.me metafields وcustom_badges). موصل Shopify متصل بمتجر آخر، فلم يُستعلم عنه.
متابعة 2026-10-13 (التسمية، الحد، الوسم، التبويبات، شارة الخصم):
التسمية: name والـ preset أصبحا "Featured Collection". اسم الملف ayum-tabs-collection ونوع السكشن ومعرّف الـ instance بلا تغيير. ملاحظة: سكشن Kalles الأصلي featured-collection يحمل اسماً مشابهاً في قائمة "Add section".
الحد: السبب أن الحد كان من style 7 الأصلي (--color-line-border بشفافية 50%، وهو لون عام من body scheme ولا يُتحكَّم به لكل سكشن). أُضيف ayum_card_border_color (#D3E3E8)، والحد 1px. نصف القطر من --radius-product-card (16).
صف الوسم والتقييم: الوصف أُزيل نهائياً. الإعدادان ayum_show_description وayum_description_length حُذفا من الـ schema ومن الـ instance، وأُضيف ayum_show_tag (true) وayum_tag_prefix (فارغ). المصدر وسم واحد من product.tags. تُتخطّى وسوم Kalles الداخلية (t4_ وbadge_، نفس قاعدة _product-meta-tags). مع البادئة: فقط الوسوم التي تبدأ بها، وتُعرض بدونها. بدون وسم مناسب لا يظهر شيء، وارتفاع الصف ثابت.
التبويبات: لم يُعثر على سبب اختفاء النص في كود هذا الفرع. harness محلي بملفات CSS الحقيقية وglobal.min.js والخطوط العربية أظهر النصوص بالألوان الصحيحة على 375/768/1440. السبب يحتاج HTML/لقطة من المتجر الفعلي. أُضيفت ألوان مستقلة: ayum_tab_bg_color وayum_tab_active_bg_color وayum_tab_active_text_color، ويُعاد استخدام ayum_tab_text_color للنص غير النشط.
شارة الخصم: مفتاح products.product.ayum_save_percent في 6 لغات (ar: "وفّر {{ percent }}%"). يُمرَّر لـ badges.liquid الأصلي عبر المعامل الموثّق sale_percent_t، والنسبة محسوبة من السعر الفعلي. الشارة display:block داخل بطاقة AYUM فقط، لأن display:flex الأصلي يفصل النص عن الرقم.
فحوص: JSON صارم لكل schema، وlocale tolerant parse مع تحقق أن المحتوى الآخر لم يتغير، و0 ألوان حرفية، وnode --check. harness (Playwright): حد البطاقة 1px #D3E3E8 بنصف قطر 16، والبطاقة على الموبايل 158×261 (Figma 158×259)، والتقدّم مخفي على الموبايل، ولا overflow أفقي. تغيير كل متغير لون غيّر العنصر المقصود.
متابعة 2026-10-13 (2) — نجوم Judge.me، موضع الصف، التبويبات:
Judge.me: التكامل الفعلي في الثيم هو snippets/hdt-pr-card-rating.liquid المعدَّل من التاجر (غير committed). لا يوجد أي markup لـ jdgm في الثيم. يقرأ product.metafields.reviews.rating ويرسم fill_star_rating.svg وunfill_star_rating.svg، ويُعرض دائماً حتى عند 0 تقييم (5 نجوم فارغة "(0)").
فرقان في نسخة AYUM السابقة: (1) كانت تشترط reviews.rating_count.value > 0 بينما الأصل لا يشترطه؛ (2) كانت ترسم ★ Unicode عبر CSS.
التعديل: أُعيدت كتابة snippets/ayum-card-rating.liquid بنفس المصدر ونفس ملفات النجوم ونفس منطق التقريب (0.3–0.7 = نصف نجمة تُرسم ممتلئة). تُعرض القيمة "4.8" بدل "(العدد)". بدون تقييم لا يُعرض شيء (لا نجوم وهمية).
أُزيل ayum_star_color من الـ schema والـ CSS والـ instance، لأن لون النجوم أصبح من ملفات SVG الخاصة بالتكامل.
الصف: التقييم يميناً والوسم يساراً (Figma 2001:94: الوسم x=0 والتقييم x=194–277). ترتيب المصدر: التقييم ثم الوسم داخل غلاف البطاقة المثبَّت RTL، والوسم يُدفع إلى inline-end بـ margin-inline-start:auto. كل عنصر يحتفظ بجهته عند غياب الآخر.
harness: على 375 و1440 التقييم ملاصق لليمين والوسم لليسار، والمسافة صف↔صورة وصف↔عنوان 6/10px (= Figma)، وارتفاع الصف 13/17px، ونجوم SVG محمَّلة، و3.5 تظهر ****o. الوسم الطويل على الموبايل يُقطع بـ "…" داخل البطاقة.
التبويبات: لم يُحدَّد السبب في هذه المتابعة. حُلَّت لاحقاً في متابعة (3) أدناه.
متابعة 2026-10-13 (3) — حلّ التبويبات واستعادة التقييم الأصلي:
سبب التبويبات الفارغة (مؤكَّد): كتل التبويب هي theme blocks، وإعداداتها لا تُقرأ من حلقة section.blocks في السكشن الأب (القيمة فارغة).
الدليل من الكود: كل سكشن Kalles يقرأ block.settings داخل هذه الحلقة يستخدم section-local blocks (announcement-bar وmarquee وcollections-list-tabs وmain-product-tabs وtoolbar-mobile وغيرها). السكشن الوحيد ذو theme blocks (tabs-collection + _tab-collection) يحقن العنوان من داخل الكتلة عبر CSS ::before content.
الخطأ: نسخة AYUM حذفت هذا الحقن واعتمدت {{ block.settings.title }} في السكشن، فظهرت الحبوب بالـ padding فقط.
سبب فشل الاختبار المحلي السابق: الـ harness كان يكتب النص مباشرة في الـ markup.
التحقق: نسخة harness بنفس المخرجات الفعلية (span فارغ) أعادت إنتاج الخطأ (حبوب 40×18 بلا نص).
إصلاح التبويبات: أُعيدت آلية الحقن الأصلية إلى _ayum-tab-collection مع escaping أأمن (\ و' و<)، ويشمل ذلك أيقونة التبويب. أُزيل الـ <img> والنص غير القابلَين للقراءة من السكشن، وحُذفت قاعدة .ayum-tabs-collection__tab-icon. بعد الإصلاح: الحبوب 104×34 (Figma 106×34) على الديسكتوب و86×30 على الموبايل، والألوان من إعدادات Tabs.
التقييم: البطاقة ترندر hdt-pr-card-rating الأصلي مباشرة بلا تعديل (نفس المصدر ونفس ملفات SVG ونفس التقريب، و5 نجوم فارغة للمنتج بلا تقييم)، داخل غلاف .ayum-card-rating في يمين الصف. تُضاف القيمة "4.8" فقط عندما reviews.rating > 0. يُخفى "(العدد)" الأصلي بـ CSS مقيّد (غير موجود في Figma)، وتُضبط مقاسات النجوم على Figma.
حُذف snippets/ayum-card-rating.liquid (منطق مكرر لم يعد مستخدماً).
التحقق: harness فقط. التحقق في محرر الثيم الفعلي لم يُجرَ.
قيود معروفة: المسافات من الإعدادات الأصلية مضبوطة على قيم الديسكتوب. على الموبايل تكون المسافة بين العنوان والتبويبات 8px (Figma 16px)، وبين التبويبات والبطاقات 30px (Figma 24px)، بسبب منطق الإعدادات الأصلية. ألوان العنوان والنص الثانوي والحد تتبع الـ scheme الحالي (Kalles demo) حتى يُنشأ scheme خاص بـ AYUM. التبويبات بلا مجموعات مختارة حتى يحددها التاجر.
### 2026-10-13 — H4 Bundles & Trial Packs — تنفيذ أول (فرع dev2-ah)
Figma: فُحصت 2001:156 (desktop) و2001:721 (mobile) عبر get_metadata وget_design_context وget_variable_defs ولقطات الشاشة.

الأساس الأصلي (لم يُعدَّل): sections/featured-collection.liquid (static section-heading + كتلة منتجات واحدة + colors_by_section وcolor_scheme وbackground_opacity)، وblocks/_product-carousel.liquid، وsnippets/card-product7.liquid، وsnippets/btn-ultra.liquid.

أُعيد استخدامها بلا تغيير: section-heading و_heading_section و_sub_heading_section (بما فيه hidden_on_mobile)، وcard-price وbadges وcard-product-media، وassets/ayum-slider-progress.js.

ملفات جديدة:

sections/ayum-featured-collection.liquid باسم المحرر "Featured Collection — Bundles".
blocks/_ayum-bundle-product-carousel.liquid: خيار بطاقة ayum_bundle؛ البطاقات 1–12 كما هي.
snippets/card-product-ayum-bundle.liquid.
snippets/ayum-btn-ultra.liquid: نسخة من btn-ultra الأصلي مع add_label اختياري فقط.
ملفات معدَّلة:

assets/dev2.css: إضافات فقط تحت .ayum-featured-collection.
مفتاح products.product.ayum_add_bundle في 6 لغات (ar: "أضف الباكت").
templates/index.json: أُضيف ayum_featured_collection_bundles بعد ayum_tabs_collection_best_sellers، وبقية الملف مطابقة بايتاً ببايت.
Scheme 2: المعرّف الفعلي scheme-77e4ef58-56a9-4631-876a-12098ba7d57d، مع colors_by_section وbackground_opacity 0.6.

[تحقق] Scheme 2 في settings_data.json على هذا الفرع داكن (#222222 خلفية ونص أبيض). على dev1-ah هو سطح AYUM (#E4EDF0 خلفية و#26383A نص و#D3E3E8 حد).
السكشن يتبع الـ scheme: مُتحقَّق في harness بالقيمتين. يجب ضبط Scheme 2 في Theme settings لهذا الثيم.
إعدادات AYUM (Figma افتراضياً): ayum_primary_color #26B3D0 (الزر وشريط التقدّم، والمسار نفسه بشفافية 12%)، وayum_on_primary_color #FFFFFF، وayum_card_border_color #D3E3E8، وayum_sale_color #EA3A79 (السعر ونص الشارة)، وcustom_class.

على الكتلة: ayum_show_description، وayum_description_length (40)، وayum_atc_label، وayum_show_progress.
الوصف: metafield الأصلي theme.description_excerpt أولاً (نفس منطق _product-description)، ثم نص مجرد مقتطع من product.description. العنصر يُعرض حتى وهو فارغ لثبات المحاذاة.

السعر: card-price الأصلي، والحالي يميناً عبر order: -1 داخل البطاقة RTL. القديم يساراً بخط الشطب الأصلي. قاعدة اللون بخصوصية (0,5,0) لتغلب قاعدة السعر الأحمر الأصلية (0,4,0).

الموبايل: بطاقة أفقية (grid RTL: الصورة 110×130 يميناً والمحتوى يساراً)، و--slide-size: 93% مع ظهور جزء من البطاقة التالية. العنوان الفرعي مخفي بإعداد hidden_on_mobile الأصلي، وشريط التقدّم مخفي تحت 1150px.

فحوص:

JSON صارم للـ schemas، وتوازن الوسوم، و0 ألوان حرفية، وتحقق أن الـ locales وindex.json إضافات فقط.
harness (Playwright، CSS/JS الحقيقية) على 1440 و768 و375: البطاقة 307×463 desktop (Figma 305×459) و333×156 mobile (Figma 334.5×154)، والسعر الحالي يمين القديم، والتقدّم 510×3، ولا overflow.
Not run: محرر الثيم، والمتجر الفعلي، والإضافة الفعلية إلى السلة.
قيود:

شفافية الخلفية إعداد واحد (0.6)، بينما Figma mobile 50%.
Figma mobile يعرض السعر القديم بلا عملة، والتنفيذ يستخدم تنسيق Shopify الكامل.
عنوان المنتج سطر واحد.
المجموعة فارغة في الـ instance (حالة placeholder الأصلية) حتى يختارها التاجر.
ملاحظة على H3 (لم يُعدَّل): قاعدة السعر في .ayum-tabs-collection (0,3,0) أضعف من قاعدة السعر الأحمر الأصلية (0,4,0)، فالمنتجات المخفَّضة في H3 ستظهر بالأحمر الأصلي بدل ayum_price_color. يحتاج متابعة لـ H3.

متابعة 2026-10-14 — خط العنوان الفرعي، سعر الموبايل، اسم السكشن:

العنوان الفرعي:
السبب: theme.css يطبّق على .hdt-section-heading_block .hdt-subheading-block الخط --font-sheading-family = --f_family_3 = Libre Baskerville، وهو بلا حروف عربية، فظهر النص بخط نظام رفيع وبوزن 400.
الإصلاح (dev2.css فقط): font-family: var(--font-body-family) (Almarai من الإعدادات)، وfont-weight: var(--font-bold)، وline-height: 1.556 (24.9/16).
harness: قبل: Libre Baskerville 400 16/24. بعد: Almarai 700 16/24.896، توسيط، والمسافة عن العنوان 16px، ومخفي على الموبايل.
سعر الموبايل:
السبب: عنصرا السعر flex items بـ flex-shrink:1 وبلا white-space:nowrap. حين يضيق العمود يتقلّص كل سعر إلى أطول كلمة فيه، فتنكسر العملة إلى سطر ثانٍ.
الإصلاح: flex: 0 0 auto وnowrap على السعرين. على الموبايل container-type:inline-size على عمود المحتوى، والأحجام بنسب Figma (11cqi و6.5cqi والمسافة 4.25cqi) بحد أدنى 14 و10px.
harness بخط Almarai الحقيقي: سطر واحد على 320 و375 و390 و425، والحالي يميناً والقديم يساره، بلا overflow. الديسكتوب بلا تغيير (23px، مسافة 10px).
ملاحظة: Figma يعرض السعر القديم بلا عملة. لا يوجد إعداد Kalles لذلك، فبقي التنسيق الأصلي.
الاسم:
"Featured Collection — Bundles" (29 حرفاً) يتجاوز حد Shopify (25)، وكان سبب رفض الرفع سابقاً.
اختار المستخدم "Featured Coll. — Bundles" (24) للـ name والـ preset.
سكشن Kalles الأصلي بلا تغيير ("Featured collection" عبر t:sections.collection_products.name).
الملفات: assets/dev2.css، وsections/ayum-featured-collection.liquid (الاسم)، وblocks/_ayum-bundle-product-carousel.liquid (تعليق).
Not run: محرر الثيم.
متابعة 2026-10-13 — السكشن لا يظهر في Dev Preview:

البيئة: shopify theme dev الوحيد يعمل (node PID 20084، بدأ 17:48)، ومجلد العمل الفعلي له D:Shopifyayum-dev2-ah (قُرئ من PEB العملية). إذن المعاينة تخدم الـ worktree والفرع الصحيحين.
السبب (مستنتج من قاعدة Theme Check الرسمية ValidSchemaName، الحد 25 حرفاً): اسم السكشن والـ preset كان "Featured Collection — Bundles" (29 حرفاً).
Shopify يرفض رفع ملف السكشن.
ثم يرفض templates/index.json لأنه يشير إلى نوع سكشن غير موجود.
فتبقى المعاينة على القالب السابق.
الإصلاح: الاسم أصبح "Featured Bundles" (16 حرفاً) في name والـ preset. نوع السكشن واسم الملف ومعرّف الـ instance بلا تغيير.
فحوص: كل قيم الـ instance صالحة مقابل الـ schemas، وكل ملفات render موجودة، وdev2.css يُحمَّل من السكشن.
مطلوب من المستخدم: حفظ templates/index.json مرة واحدة ليُعاد رفعه (الملف لم يتغير محلياً فلن يُرفع تلقائياً)، ثم مراجعة طرفية theme dev. لم يُتحقق في Dev Preview.
متابعة 2026-10-14 — عدد أسطر عنوان المنتج:

الإعداد: ayum_product_title_lines ("Product title lines"، select 1–4، افتراضياً "1") في البلوك _ayum-bundle-product-carousel، بجانب إعدادات البطاقة الأخرى.
التمرير: style="--ayum-product-title-lines: …" على أغلفة .ayum-bundle-carousel الثلاثة.
CSS (dev2.css):
العنوان: line-clamp عبر --ayum-product-title-lines (-webkit-line-clamp + line-clamp) مع ellipsis، والاسم الكامل باقٍ في الرابط. ارتفاع محجوز بعدد الأسطر حتى تبقى البطاقات متساوية.
overflow-wrap: anywhere للكلمات الطويلة، وunicode-bidi: plaintext حتى تظهر ellipsis الاسم الإنجليزي في نهايته الصحيحة.
على الموبايل text-align: right (حافة بداية البطاقة RTL). على desktop يبقى الوسط عبر match-parent.
إعادة الاستخدام: نمط ayum_title_lines في _ayum-product-carousel (Best sellers)، وآلية -webkit-line-clamp في .hdt-line-clamp الأصلية. لا إعداد Kalles أصلي لعدد الأسطر.
الارتفاع: بطاقة الموبايل min-height: 15.4rem (ليست ثابتة)، فتكبر مع 3–4 أسطر (156 / 164 / 181px على 375). لم يُغيَّر أي قيد.
harness: الأسطر 1–4 × 1440/375/320 مع عناوين عربية وإنجليزية طويلة وكلمة بلا مسافات: 12/12 بلا تداخل مع الوصف/السعر/الزر، والزر داخل البطاقة، ولا overflow.
ملاحظة اختبار: العنوان الأصلي .hdt-card-product__title عليه transition: all .25s، فالقياس بعد تغيير المتغير في نفس الإطار يعطي قيماً وسطية. في المتجر القيمة تأتي من Liquid عند الرسم.
Not run: محرر الثيم.
### 2026-10-14 — H7 Reviews / Testimonials — تنفيذ أول (فرع dev2-ah)
Figma: فُحصت 2001:316 (desktop) و2001:826 (mobile) عبر get_metadata وget_design_context وget_variable_defs ولقطات الشاشة. لون نقطة "شراء موثّق" (#2D7A4F) = لون نص الشارة، فتُرسم بـ currentColor.
الأساس الأصلي (لم يُعدَّل): sections/testimonial_section.liquid (اسمه "Testimonials")، وblocks/_testimonial_item.liquid، وsnippets/quote_1.liquid، وsnippets/rating_star.liquid، وassets/testimonials.css.
لماذا هذا الأساس: carousel متعدد الأعمدة (<hdt-slider>، وcol_dk/tb/mb)، وإعدادات البطاقة (cl_bg_item وcl_content وcl_name وbdr والمسافات)، وheading ثابت. testimonials_2 تخطيط صورة مزامَن، فهو أبعد.
ملفات جديدة:
sections/ayum-testimonial_section.liquid: الاسم الظاهر بقي t:sections.testimonials_section.name = "Testimonials" (للسكشن والـ preset). يضيف تصميم ter_des = ayum، ونجوم الملخّص، وشريط التقدّم.
blocks/_ayum-testimonial-item.liquid: الاسم "Testimonial"، وكل إعداداته الأصلية باقية، مع إضافة ayum_product وayum_verified (افتراضياً false).
snippets/ayum-quote.liquid: مقتبس من quote_1، ويستخدم rating_star الأصلي.
ملفات معدَّلة:
assets/dev2.css: إضافات فقط تحت .ayum-testimonial-section.
مفتاح products.product.ayum_verified_purchase في 6 لغات (ar: "شراء موثّق").
templates/index.json: أُضيف ayum_testimonials بعد ayum_featured_collection_bundles، وبقية الملف مطابقة بايتاً ببايت.
Scheme 5: scheme-fe88a2ec-47a1-478d-8953-54da0178e18c مع background_opacity 0.4.
يتحكم في الخلفية والعنوان (hdt-s-text) والعنوان الفرعي (hdt-text-secondary)، ونجوم الملخّص وتعبئة التقدّم (--color-accent).
[تحقق] قيم Scheme 5 الحالية على هذا الفرع داكنة (#383838)؛ سيضبطها التاجر.
إعدادات أصلية مُعاد استخدامها: cl_bg_item #E78333، وcl_content/cl_name #FFFFFF، وbdr 16، وcontent_align right، وcol_dk/tb/mb 3/2/1، وspace_horizontal 20، وspace_horizontal_mb 4، وlayout carousel. والعنوان والعنوان الفرعي عبر section-heading الأصلي.
إعدادات AYUM جديدة (Figma افتراضياً): ayum_show_header_stars، وayum_header_rating (يدوي، مع ملاحظة صريحة)، وayum_star_color #FFCC00، وayum_badge_bg_color #FFFFFF، وayum_badge_text_color #2D7A4F (حد الشارة مشتق بنسبة 30%)، وayum_progress_track_color #26B3D0 (بنسبة 12%)، وayum_show_progress، وcustom_class.
المحتوى المبدئي: نصوص Figma (الملخّص "4.8 من 5 · أكثر من 400 تقييم" و3 مراجعات) كمحتوى قابل للتعديل، وكل المراجعات ayum_verified = false.
يجب استبدالها بمراجعات وإحصاءات حقيقية قبل النشر.
قيود:
حجم العنوان الفرعي على الموبايل 14px (Figma 13px)، لأن نطاق الإعداد الأصلي خطوته 2.
نجوم التقييم بهندسة LTR الأصلية، فنصف النجمة في أقصى اليسار.
لون النصف الفارغ من نصف النجمة #dedede موروث من <style> عام في السكشن الأصلي، تُرك كما هو كي لا يتغير سلوك Kalles في الصفحة.
فحوص:
JSON صارم، وأسماء ≤25، وكل قيم الـ instance صالحة (صُحّح 13 إلى 14)، وملفات render موجودة، و0 ألوان حرفية جديدة، والـ locales وindex.json إضافات فقط.
harness (Playwright، CSS/JS والخطوط الحقيقية) على 1440 و768 و375 و320: البطاقة 417×244 desktop و343 mobile، والنجوم ونصف النجمة في مكانها، والشارة اختيارية، والصورة الاختيارية يمين الاسم، والتقدّم 510×3 desktop فقط، ولا overflow.
Not run: محرر الثيم والمتجر.
متابعة 2026-10-14 — المسافات، الخطوط، صيغة الموبايل:
أسباب ضغط المسافات:
نجوم الملخّص بـ line-height: 0 في rating_star، فكان صندوقها 28px بدل 36 (موبايل 26).
العنوان بـ hdt-lh-1 من الـ instance، فكان سطره 36px بدل 40.
صف نجوم البطاقة 14px بدل 25 (موبايل 16).
هامش الـ heading الأصلي على الموبايل 16px بدل 14.
الإصلاح (dev2.css، كتلة Testimonials فقط):
min-height لصندوقي النجوم (36/26 و25/16)، وline-height: 1.11 للعنوان.
direction: rtl لمنطقة العنوان (محتوى عربي).
margin-block-start: -0.2rem للـ carousel على الموبايل.
النتيجة في harness:
desktop: 48 / 36 / 16 / 40 / 16 / 25 / 32.
mobile: 24 / 26 / 8 / 23 / 8 / 23 / 14.
مطابقة لـ Figma.
الخط الثانوي:
القياس: عرض "سكيتلز مجفف بالتجميد" بوزن 700 = 126.3px (Figma 127)، و800 = 132.7، فالوزن المحلي مطابق.
السبب المرجّح في المتجر: استخدام --font-bold/--font-extrabold النسبيين (وزن body + 300/400).
الإصلاح: أوزان Almarai مطلقة (400/700/800) لنصوص هذا السكشن. الشارة لم تُلمس.
صيغة الموبايل:
إعداد جديد ayum_mobile_summary، افتراضياً "4.8 من 5 · +400 تقييم".
يُعرض كـ h3 تحت 768px ويُخفى العنوان الأصلي هناك. بـ display:none يبقى عنوان واحد فقط مكشوفاً لقارئ الشاشة.
فارغ = العنوان الأصلي على الموبايل أيضاً.
حجم العنوان الفرعي على الموبايل:
إعداد جديد ayum_subtitle_size_mobile (10–24، خطوة 1، افتراضياً 13)، لأن نطاق الإعداد الأصلي خطوته 2.
القيمة 14 المحفوظة في الإعداد الأصلي لم تُغيَّر، لكنها لا تؤثر على الموبايل في هذا السكشن.
ملاحظة: شارة "شراء موثّق" ارتفاعها المرسوم 21px مقابل 18 في Figma، فالبطاقة أطول بـ 3px (226 مقابل 223). تُركت بطلب المستخدم.
الملفات: sections/ayum-testimonial_section.liquid وassets/dev2.css فقط. لم يتغير index.json ولا الملفات الأصلية ولا Scheme 5.
Not run: محرر الثيم.
متابعة 2026-10-14 (2) — أحجام النجوم الفعلية ووزن السطر الثانوي:
السبب: المتابعة السابقة طابقت صناديق الأسطر لا النجوم المرئية. SVG النجمة الأصلي يملأ صندوقه، فالحجم المرئي = حجم الـ SVG.
كان: 28px للملخّص و14px للبطاقة، والمسافة 2.8 و1.4px.
المسافة كانت عبر هامش لكل نجمة، فتُضيف نصف مسافة عند طرفي الصف.
القياس من Figma (عدّ البكسلات الملوّنة في صور العقد):
الملخّص: 25×25 والمسافات 6/6/5/6 والصف 148 (موبايل: 18، ~4.75، والصف 108).
البطاقة: ~12.5 والمسافة ~2.75 والصف 74 (موبايل: 11، والمسافات 3/3/2/3، والصف 65).
الإصلاح (dev2.css، Testimonials فقط):
.rating أصبح inline-flex مع gap: var(--ayum-star-gap)، وmargin: 0 للنجوم. إزاحات نصف النجمة ما زالت بنفس خطوة الحجم + المسافة.
الأحجام: ملخّص 2.5rem / 0.58rem (موبايل 1.8 / 0.47)، وبطاقة 1.25rem / 0.28rem (موبايل 1.1 / 0.27).
دُمجت قاعدتا .ayum-quote__rating على الموبايل في قاعدة واحدة.
التحقق بقياس البكسلات لما رسمناه نحن:
الملخّص desktop: 25، والمسافات 6/6/5/6، والصف 148 (مطابق لـ Figma). موبايل: 18، والصف 108–109.
البطاقة desktop: 12، والصف 74. موبايل: 11، والمسافات 3/3/2/3، والصف 66.
المسافة تحت حبر النجوم: البطاقة 18px (Figma 19)، والموبايل 15px (Figma 15)، والملخّص إلى العنوان 22px (Figma 23).
السطر الثانوي (المنتج): font-weight: 400 بنفس وزن نص المراجعة (طلب التاجر)، والاسم باقٍ 800.
المقاس: body 400، product 400، name 800 على 1440 و375 و320.
شارة "شراء موثّق" لم تُلمس (تحقق آلي).
الملفات: assets/dev2.css فقط.
Not run: محرر الثيم. الملف المحلي يُرفع عبر جلسة theme dev القائمة.
### 2026-10-14 — H8 Product videos / Shoppable Video — تنفيذ أول (فرع dev2-ah)
Figma: فُحصت 2001:366 (desktop) و2001:861 (mobile) عبر get_metadata وget_design_context وget_variable_defs ولقطات الشاشة، وفُحص SVG زر التشغيل (2040:141): دائرة 60px بلون Ink 35% ومثلث أبيض.
[تحقق] تعارض: Figma Desktop فيه 5 بطاقات (225×400 + لوحة 127، بمسافة 38px)، لا 4. طُبِّق Figma: col_dk = 5.
[تحقق] تعارض: مؤشر التقدّم في Figma جزئي (≈67%) رغم أن البطاقات الخمس كلها ظاهرة. طُبِّق السلوك الحقيقي: الشريط يظهر فقط عندما تتحرك البطاقات فعلاً (أكثر من snap).
الأساس الأصلي (لم يُعدَّل): sections/product-video.liquid (اسمه "Shoppable Video") وblocks/_product-video.liquid، مع <hdt-video-player> و<hdt-slider> من global.min.js.
لماذا يحتاج نسخة: الأصل يضع autoplay ثابتاً، ولا يدعم 5 أعمدة ولا التوسيط على الموبايل، وبطاقته مختلفة.
ملفات جديدة:
sections/ayum-product-video.liquid: الاسم الظاهر "Shoppable Video" (للسكشن والـ preset). كل إعدادات الأصل باقية، و Style 1/2 يعملان كما في الأصل. أُضيف خيار Style = "AYUM" وخيار col_dk = 5.
blocks/_ayum-product-video.liquid: كل إعدادات الأصل باقية، مع إضافة ayum_poster وayum_views. أُزيلت القيمة الافتراضية لرابط YouTube التجريبي في النسخة فقط.
assets/ayum-shoppable-video.js: عنصر <ayum-shoppable-video> يستدعي play()/pause() الأصليين وgoToTarget() الأصلي.
ملفات معدَّلة:
assets/dev2.css: إضافات فقط تحت .ayum-product-video (362 سطراً، بلا حذف).
assets/ayum-slider-progress.js: سطر واحد. scrollable أصبح api.scrollSnapList().length > 1 بدل size < 1 (التقريب بالبكسل أظهر الشريط مع 5 بطاقات ظاهرة). لا يقرأ هذه السمة إلا هذا السكشن.
templates/index.json: أُضيف ayum_shoppable_video بعد ayum_testimonials. التغيير الوحيد في الموجود هو فاصلة بعد "ayum_testimonials" في order (تحقق آلي: حذف الإضافة يعيد الملف الأصلي حرفياً).
إعادة استخدام:
التشغيل: <hdt-video-player> بدون autoplay + سمة group الأصلية للتشغيل الحصري، وأحداث media:play/media:pause الأصلية.
الـ slider: <hdt-slider> مع خيارات Embla عبر config، و.is-selected الأصلي للبطاقة النشطة.
العنوان: section-heading الأصلي. السعر: card-price (مع ayum-money). الإضافة للسلة: ayum-btn-ultra الموجود مع add_label، أي نفس مسارات المتغيرات وquick add ونفاد المخزون.
Scheme 3: scheme-e0b73555-c767-4eda-aa6d-4e44e10aefce.
يتحكم في الخلفية والعنوان والعنوان الفرعي، وسطح البطاقة، والتسمية على الموبايل، وطبقات الفيديو (شارة المدة Ink 75%، ودائرة التشغيل Ink 35%، وشارة المشاهدات White 90%).
إعدادات AYUM جديدة (Figma افتراضياً):
المسافات: ayum_gap 38 وayum_gap_mb 12، لأن space_items الأصلي لا يتجاوز 20.
ayum_subtitle_size_mobile 13، لأن خطوة الإعداد الأصلي 2.
السلوك: ayum_video_muted (true)، وayum_show_duration، وayum_show_progress.
النصوص: ayum_product_label ("المنتج في الفيديو")، وayum_atc_label ("اطلب المنتج"؛ فارغ = ترجمة الثيم).
الألوان: ayum_primary_color #26B3D0، وayum_on_primary_color #FFFFFF، وayum_card_border_color #D3E3E8، وayum_price_color #EA3A79، وayum_views_text_color #4E6E70.
custom_class.
المحتوى:
5 بلوكات فارغة. الفيديو والمنتج يختارهما التاجر.
المدة تُقرأ من video.duration (ملّي ثانية). المشاهدات نص يدوي اختياري (فارغ = مخفي)، ولا أرقام مختلَقة.
بلا فيديو: placeholder في المحرر، ولا شيء في المتجر. بلا منتج: لا لوحة منتج.
فحوص ثابتة: JSON صارم، والأسماء ≤25، وكل قيم الـ instance والـ preset صالحة، وملفات render موجودة، وتوازن الوسوم، و0 ألوان حرفية، و0 روابط Figma، ونقاط التوقف 767/768 فقط، وnode --check للـ JS.
harness (Playwright، CSS/JS والخطوط الحقيقية، فيديو WebM حقيقي) على 1440 و1150 و1149 و768 و767 و375 و320، RTL وLTR:
Desktop 1440:
الحشو 64/40، والعنوان 40، والعنوان الفرعي 24.9، والمسافات 16 و32.
5 بطاقات 227.6 (حاوية 1290 من إعداد الثيم مقابل 1280 في Figma)، والمسافة 38، والوسائط 9:16، واللوحة 127، والصورة 48، والزر 41.
التقدّم 510×3 على بعد 32.
Mobile 375:
العنوان 23، والعنوان الفرعي 23.4، والمسافات 8 و14.
البطاقة 172.1×436 في الوسط تماماً، والجارتان بشفافية 0.5، واللوحة 130، والزر 33، ولا صورة ولا تقدّم.
وظيفياً:
التشغيل والإيقاف بالزر وبـ Enter. تشغيل بطاقة يوقف الأخرى.
السحب يغيّر البطاقة النشطة ويوقف الفيديو السابق. الضغط على بطاقة جانبية يوسّطها ثم يشغّلها.
التمرير على desktop يوقف البطاقات الخارجة. زر الإضافة يرسل الفورم الأصلي.
لا overflow أفقي، و0 أخطاء console.
أُصلح أثناء الاختبار:
جهة شارة المدة: direction: ltr كان يعكس الإزاحة المنطقية.
ارتفاع سطر السعر: القائمة الأصلية بـ line-height: 1.
البداية على الموبايل بالبطاقة الثانية (عند 3 بطاقات أو أكثر) لتظهر جارتان كما في Figma.
Not run: محرر الثيم والمتجر.
رفع فيديو Shopify حقيقي، وvideo_tag الفعلي، وقيمة video.duration، والصوت عند ayum_video_muted = false.
ربط منتج حقيقي، والسلة/الـ drawer، وquick add للمنتجات متعددة الخيارات، وإعادة تحميل السكشن في المحرر، وsection.blocks.size مع البلوك الثابت.
متابعة 2026-10-14 — شفافية البطاقة النشطة، شارة المشاهدات، أدوات التحكم الأصلية:
Figma (أُعيد فحص 2001:366 و2001:861):
البطاقة النشطة على الموبايل opacity 1، والجارتان opacity-50 على البطاقة كاملة، ولا blur.
شارة المشاهدات أعلى يمين الفيديو: desktop 15/13 و4px 10px وradius 10 و11px Bold؛ mobile 15/12 و3px 9px وradius 9 و10px.
الشفافية — السبب الجذري: القاعدة كانت مشروطة بـ .is--enabled، والـ slider الأصلي يحذف هذه الكلاس عند كل حدث resize من Embla (إخفاء/إظهار شريط عنوان المتصفح على الموبايل، وتغيير حجم معاينة المحرر).
النتيجة: كل البطاقات بشفافية 1.
تأكيد في harness بعد resize: القاعدة القديمة تطابق 0 شرائح والجديدة 5.
الإصلاح: الشرط أصبح .ayum-pv__slider:has(.is-selected) (كلاس Embla الأصلي). desktop لم يتغير (كل البطاقات 1).
شارة المشاهدات:
الكود والـ CSS سليمان: تُعرض متى كان الحقل غير فارغ، z-index: 2 فوق الفيديو، ولا شيء يخفيها.
السبب المرجّح: حقل ayum_views (Views label) فارغ افتراضياً وفي كل البلوكات المزروعة. قيم المتجر غير متاحة محلياً (لم يُنفَّذ pull).
الإصلاح (نفس الـ id، بلا تكرار):
التسمية أصبحت "Views count badge"، مع placeholder "124 ألف مشاهدة" وشرح.
أُزيل visible_if عن الحقل وعن صورة الـ poster ليظهرا دائماً في المحرر.
لا أرقام مختلَقة.
أدوات التحكم الأصلية:
Kalles فيه show_video_controls فقط في blocks/video.liquid (بلوك آخر، افتراضياً false). أُضيف نفس الـ id للسكشن AYUM: "Show video controls"، checkbox، افتراضياً true.
video_tag: controls: section.settings.show_video_controls + data-controls على الوسائط.
JS يخفي الأدوات حتى أول تشغيل (مظهر Figma: دائرة + شارات)، ثم يظهرها. زر التشغيل في هذا الوضع هو الدائرة 60px فقط، فلا يغطي الأدوات.
بعد البدء تختفي الدائرة وشارة المدة، لأن الأدوات تعرض الوقت وشريطها يغطي مكان الشارة. تعود كلها عندما تغادر البطاقة الشريحة النشطة.
الضغط في أسفل 56px من الفيديو (شريط الأدوات) لا يصل للـ slider، فالسحب على شريط الوقت لا يحرّك الـ carousel. السحب على باقي الفيديو وعلى اللوحة يعمل.
النقر على فيديو بطاقة جانبية يوسّطها دون تشغيل.
عند إيقاف الإعداد يبقى سلوك الزر السابق (تشغيل/إيقاف بالضغط على الفيديو كله). YouTube/Vimeo بلا تغيير.
harness (فيديو WebM حقيقي، خادم بـ HTTP range):
mobile:
1/0.5/0.5 قبل resize وبعده وبعد السحب وبعد goToIndex، وfilter: none.
التشغيل يُظهر الأدوات. السحب على شريط الأدوات أبقى الشريحة نفسها. السحب على اللوحة وعلى أعلى الفيديو غيّر الشريحة.
الفيديو السابق توقف وعاد لمظهر Figma. النقر على الجارة وسّطها. لا overflow.
desktop: كل البطاقات 1. التشغيل الحصري يعمل. النقر على سطح الفيديو يشغّله أصلياً، والتقديم إلى 10.4s من 22s يعمل.
الوضع بدون أدوات: نفس نتائج الاختبار الأول (تشغيل/إيقاف، Enter، حصري، إرسال فورم السلة).
0 أخطاء console.
الملفات: blocks/_ayum-product-video.liquid، وsections/ayum-product-video.liquid (إعداد واحد)، وassets/ayum-shoppable-video.js، وassets/dev2.css. لم يتغير index.json ولا الملفات الأصلية ولا Scheme 3.
Not run: محرر الثيم والمتجر.
فيديوهات Shopify الحقيقية: أدوات iOS Safari/Android، ومنطقة 56px على أجهزة حقيقية، وملء الشاشة.
قيم المشاهدات في بلوكات التاجر، وإعادة تحميل السكشن.
متابعة 2026-10-14 — عدد أسطر اسم المنتج:
الإعداد: ayum_product_title_lines ("Product title lines"، select 1–4، افتراضياً "1") في schema السكشن ayum-product-video. إعداد واحد لكل البطاقات، ومستقل عن Bundles.
التمرير: --ayum-product-title-lines في {% style %} السكشن.
CSS:
العنوان: line-clamp عبر --ayum-product-title-lines (-webkit-line-clamp + line-clamp) مع ellipsis، والاسم الكامل باقٍ في الرابط. ارتفاع محجوز بعدد الأسطر حتى تبقى البطاقات متساوية.
overflow-wrap: anywhere للكلمات الطويلة، وunicode-bidi: plaintext حتى تظهر ellipsis الاسم الإنجليزي في نهايته الصحيحة.
text-align: right. --ayum-pv-title-lh (1.133 desktop / 1.12 mobile) يربط الارتفاع المحجوز بارتفاع السطر.
الافتراضي يحافظ على Figma: اللوحة 127 desktop و130 mobile.
harness: الأسطر 1–4 × 1440/375/320: 12/12. الشفافية والأدوات والتقديم بلا تغيير.
Not run: محرر الثيم.

### 2026-10-14 — S2 Header + category nav وS3 Mobile menu (تنفيذ)
Figma (get_design_context + get_metadata على العقد الأربع، كلها قُرئت بنجاح): الهيدر ديسكتوب 2001:8، شريط الفئات 2001:21، هيدر الموبايل 2001:586، قائمة الموبايل 35:309. أيقونتا السلة والبحث من Figma (مقلوبتان رأسياً في التصميم) نُقلتا كمسارات SVG بـ currentColor.
الحالة قبل التنفيذ: header-group.json بلا أي سكشن هيدر؛ instance الـ demo (header_inline_blocks_xePFbC) حُذف من محرر الثيم في الكومِت 96bc08e. لا ترحيل ولا حذف لبيانات.
الأساس: sections/header-menu-bottom-blocks.liquid (صف هيدر + صف .hdt-bottom-header للديسكتوب). لم يُعدَّل أي ملف أصلي.
الملفات الجديدة: sections/ayum-header.liquid (نسخة)، blocks/_ayum-menu-mobile.liquid (نسخة _menu_mobile)، snippets/ayum-main-menu.liquid (نسخة main-menu + كلاس التمييز)، snippets/ayum-header-icons.liquid (نسخة header_group_icons + مجموعة أيقونات "AYUM").
الملفات المعدلة: assets/main.css (كان تعليقاً فقط وغير محمَّل؛ يُحمَّل الآن من ayum-header فقط)، sections/header-group.json (إضافة ayum_header بعد شريط العرض؛ باقي المدخلات بلا تغيير).
التخطيط: صف "Logo left" صار CSS grid. ديسكتوب ≥1150: لوجو | بحث (max 520، في الوسط) | سلة، وشريط القائمة صف مستقل تحته (67px). أقل من 1150: زر القائمة | لوجو في الوسط | سلة، والبحث صف ثانٍ (12/60/12/33/12 = 129). التابلت يأخذ تخطيط الموبايل مع حد أقصى لعرض البحث.
البحث: نموذج hdt-predictive-search أصلي واحد للصفين. placeholder الموبايل الأقصر طبقة CSS (aria-hidden) تظهر فقط والحقل فارغ؛ الـ placeholder والـ aria-label الحقيقيان نص الديسكتوب. ملاحظة: custom.js يحوّل البحث إلى صفحة النتائج الكاملة عندما dir=rtl (سلوك موجود مسبقاً، لم يُغيَّر).
القائمة: من link_list main_menu (Shopify). التمييز بإعداد "Highlighted menu item" (عنوان أو handle أو URL)، يضيف كلاساً للعنصر المطابق على الديسكتوب والموبايل، فلا يعتمد على الترتيب. المسافة 32px على كل الديسكتوب (أُلغي ضرب 0.7 في النسخة فقط).
الدرج: hdt-drawer/dialog الأصلي (فتح، إغلاق، Escape، overlay، قفل التمرير، accordions). زر الإغلاق مرسوم كأيقونة القائمة من Figma مع aria-label "Close". شريط التبويب يُخفى عند وجود تبويب واحد. روابط wishlist/search/account والملاحظة اختيارية (مطفأة).
الألوان: header_colors وheader_bottom_colors وheader_mobile_colors = scheme-1 (خلفية بيضاء، accent #EA3A79 للتمييز). إعدادات AYUM فقط للأدوار غير الموجودة لكل scheme: ayum_border_color (#D3E3E8)، ayum_search_bg (#E4EDF0)، ayum_separator_color في البلوك (rgba(20,92,112,.18)). الشارة تستخدم --hdt-btn-* الأصلية.
[مطلوب من التاجر] لمطابقة Figma تماماً: إنشاء Color Scheme مخصص للهيدر (text #26383A، background #FFFFFF، button #E78333، button label #FFFFFF، accent #EA3A79) وتعيينه في الحقول الثلاثة. مع scheme-1 تبقى الشارة سوداء (#222222) والنص #222222.
[مطلوب من التاجر] اختيار صورة اللوجو (لا لوجو محفوظ؛ يظهر اسم المتجر)، والتأكد أن قائمة main-menu تحتوي الروابط العشرة.
عناصر "العنوان/الوصف تحت العنوان/المسافة": لا يوجد عنوان في هذه العقد، فلم تُضف.
Validated (ثابت): JSON للـ schema (بعد إزالة تعليق /* */ والفاصلة الزائدة الموروثة من الأصل) وheader-group.json؛ لا ids مكررة؛ قيم الـ instance ضمن الـ schema والـ ranges؛ توازن وسوم Liquid؛ لا ألوان حرفية خارج defaults؛ لا left/right فيزيائية؛ breakpoints 768/1150 فقط؛ لا روابط Figma؛ الملفات الأصلية بلا تغيير.
Not run: shopify theme dev/check، أي فحص في المتصفح (العرض، responsive 320–1440، RTL/LTR، فتح/إغلاق الدرج، البحث التنبؤي، السلة، sticky، إعادة تحميل السكشن في المحرر).
متابعة 2026-10-14 (bugfix) — EGP، "جميع الفئات"، وحشوة الموبايل:
Figma: أُعيدت قراءة العقد الأربع (get_metadata) بنجاح، والقيم مطابقة للتنفيذ الأول.
EGP — السبب: بلوك _ayum-menu-mobile ورث من _menu_mobile صف العملة/اللغة (slot="footer")، ويُرسم عندما يكون للمتجر أكثر من دولة حتى مع currency_type = "1". الإصلاح: الصف كله (مع غلافه) لا يُرسم إلا عند تفعيل إعداد جديد في البلوك ayum_show_localization ("Show currency & language selectors"، افتراضياً false). نظام العملة العام وباقي أماكن المحدِّد بلا تغيير.
"جميع الفئات" — السبب: نموذج البحث في ayum-header نسخ فرع {% if settings.search_form_by_type %} من الأصل، والإعداد العام مفعَّل. الإصلاح: حُذف الفرع من نموذج AYUM فقط (لا CSS إخفاء)، والإعداد العام بقي كما هو لنماذج البحث الأخرى. JS البحث يتعامل مع غياب الـ select (this.select اختياري)، والحقل يأخذ كل العرض المتاح (flex: 1).
حشوة الموبايل — السبب: (1) قاعدة .hdt-menu-bar الأصلية (justify-content: flex-start) تغلب على hdt-justify-center، فالأيقونة كانت أصلاً على حافة الزر، وهامش -10px الذي أضفته سحبها إلى ~5px من حافة الشاشة. (2) .hdt-site-top_nav الأصلي يضيف padding-inline-end: 10px فكانت السلة على 25px بدلاً من 16. (3) .hdt-container على الموبايل 15px وFigma 16px (2028:2).
الإصلاح: حُذف الهامش السالب. أُضيف ayum_padding_x_mb ("Mobile side padding"، افتراضياً 16) مطبَّقاً على .ayum-header__main > .hdt-container تحت 768px. padding-inline-end: 0 لمجموعة الأيقونات داخل ayum-header (Figma: زر السلة على حافة الحاوية في الديسكتوب والموبايل). النتيجة المحسوبة: أيقونة القائمة على 16px من اليمين، زر السلة على 16px من اليسار، والبحث 16px من الجهتين. اللوجو في الوسط (grid 1fr auto 1fr بحشوتين متساويتين).
باقي المراجعة (الارتفاعات 12/60/12/33/12، أحجام السلة والشارة، صفوف الدرج 72/60/24، شريط الفئات): مطابقة، بلا تغيير.
ملاحظة غير مُصلحة (خارج النطاق): عرض محتوى الديسكتوب يأتي من إعداد page_width العام المشترك بين كل السكاشن، وقد يختلف عن 1280px في Figma.
الملفات: sections/ayum-header.liquid، blocks/_ayum-menu-mobile.liquid، assets/main.css، sections/header-group.json (قيمتان جديدتان في ayum_header فقط). شريط العرض والملفات الأصلية بلا تغيير.
Validated (ثابت): JSON للـ schema والمجموعة، لا ids مكررة، قيم الـ instance معرّفة، توازن الوسوم، لا ألوان حرفية، breakpoints 767/768/1150 فقط.
Not run: أي فحص في المتصفح (320/375/390/767/768/1150/1440، الدرج، البحث، sticky).

### 2026-10-14 — S4 Footer: تحسين التصميم على مثيلي Kalles الأصليين (CSS + إعداد واحد)
Figma: 2001:483 (desktop) و2001:942 (mobile)، get_design_context قُرئ بنجاح.
المثيلان: footer_KwXhWr (الرئيسي) وfooter_ziwVXA (السفلي)، النوع footer الأصلي. لم يُنشأ قسم أو نسخة.
تنبيه بيانات: إعدادات التاجر الحالية للفوتر موجودة على المتجر فقط؛ footer-group.json المحلي ما زال نسخة الاستعادة (بيانات demo) وغير مُلتزَم. لم يُعدَّل. موصّل Shopify متصل بمتجر آخر (Peace Lily) فلم تُقرأ البيانات الحية. لا ترفع footer-group.json المحلي (استخدم push --only للملفين المعدلين) حتى لا تُستبدل إعدادات المحرر.
الملفات: assets/main.css (قسم Footer جديد)، blocks/_footer-column.liquid (تعديل أصلي مصرَّح به: إعداد ayum_open_mobile "Open on mobile by default"، افتراضياً false، يضيف .open لعمود الأكورديون).
CSS (مقيّد بـ [id$="__footer_KwXhWr"] و[id$="__footer_ziwVXA"]، الأدوار حسب المحتوى لا الترتيب):
ديسكتوب ≥1150: عمود البراند (الذي فيه صورة) 375px في البداية + 56px، وأعمدة الروابط موزعة حتى النهاية (justify-between). عنوان ← روابط 10px (الأصل 20px ثابت).
موبايل <768: لوجو في الوسط عند محاذاة الموبايل "Center"؛ صفوف الأكورديون padding 16 وفاصل 15%؛ +/− بلون 70% وخط 2px؛ 12px بين العنوان والروابط عند الفتح.
السفلي ≥768: فاصل 15% + 24px، صف الدفع (label + أيقونات) في جهة النهاية، الروابط القانونية أفقية في جهة البداية (18px)، الحقوق في جهة النهاية، 36px بين الصفين. موبايل: الدفع في الوسط (عمودي، 10px) ← الروابط أفقية ملتفة في الوسط (14px) ← الحقوق في الوسط.
الألوان: درجات من --color-foreground للـ scheme (روابط 70%، قانونية 65%، خلفية الأيقونات الاجتماعية 18%). لا ألوان حرفية.
[مطلوب من التاجر — إعدادات أصلية] Section padding: الرئيسي 56px,,36px, / موبايل 32px,,22px,؛ السفلي 0px,,32px, / موبايل 0px,,28px,. هوامش الأعمدة (mg/mg_mb) فارغة. السفلي: Use colors by section + نفس scheme الرئيسي (Scheme 10). صورة اللوجو: Custom width 153 / تابلت 153 / موبايل 64. عمود البراند: محاذاة الموبايل Center. النص: حجم مخصص 13، line height 1.8. Socials: style Default، size Medium، radius 20، spacing 20. عناوين الأعمدة: Custom 15، وزن ExtraBold. روابط القوائم: Custom 18 (القانونية 13). عمود "تواصل معنا": Width (mobile) = 0 لإخفائه على الموبايل. أعمدة الأكورديون: Only mobile (collapse) مفعّل، و"Open on mobile by default" لعمود المتجر. أيقونات الدفع: height 27.
Validated (ثابت): JSON للـ schema، لا ids مكررة، توازن الوسوم، أقواس CSS، لا ألوان حرفية، breakpoints 767/768/1150 فقط.
Not run: أي فحص في المتصفح أو المحرر.

متابعة 2026-10-14 — S4 Footer: custom_class + مطابقة Figma أدق:
Figma: 2001:483 و2001:942 (design context + screenshots من نفس الجلسة، get_variable_defs وget_metadata أُعيدا الآن).
أسباب الفروق المتبقية: (1) CSS السابق كان مقيداً بمعرّف المثيل وترك القيم المحسوبة لإعدادات أصلية لم تُضبط (padding 75px، هامش 50px للأعمدة، spacers، أحجام الخطوط). (2) الفوتر السفلي كان مبنياً على أعمدة، بينما مكان كتل الدفع/الحقوق/الروابط داخل الأعمدة غير معروف (البيانات الحية على المتجر فقط). (3) الأكورديون الأصلي بلا حالة فتح افتراضية ولا ترتيب للموبايل. (4) لا يوجد عنوان لأيقونات الدفع.
custom_class: إعداد text جديد "Custom CSS class" في sections/footer.liquid يُضاف إلى غلاف .hdt-section-inner. القيم المطلوبة: footer_KwXhWr = ayum-footer-main، footer_ziwVXA = ayum-footer-bottom. [مطلوب من التاجر] ضبطهما في المحرر؛ لم يُكتبا في footer-group.json المحلي لأنه نسخة demo قديمة وغير مُلتزَمة.
CSS (assets/main.css): حُذف قسم الفوتر السابق (المقيد بالمعرّف والقاعدة غير المقيدة) واستُبدل بقسم مقيد بالكلاسين فقط (66 selector، تدقيق: صفر غير مقيد). الحاوية 1320/20px (موبايل 16px). المسافات عبر متغيرات --pd-*/--mg-* الأصلية: الرئيسي 56/36 (موبايل 32/22)، السفلي 0/32 (موبايل 0/28)، هوامش الأعمدة 0. البراند: لوجو 153 (64 موبايل)، فجوة 14 (موبايل 10 + 22 قبل الأيقونات)، وصف 13/1.8 بنسبة 75%، أيقونات 40px بخلفية 18% وفجوة 10، spacers داخل عمود البراند مخفية. الأعمدة: عناوين 15/800، روابط 18/400 بنسبة 70%، فجوة 10، ومن العنوان للروابط 10. ديسكتوب: البراند 375 + 56 ثم توزيع الأعمدة. موبايل: صفوف 16px وفاصل 15% وعلامات +/− 12px بخط 2px بنسبة 70%.
الفوتر السفلي: الأعمدة مسطّحة (display: contents، مع احترام أصناف width 0 لكل breakpoint) وتُرتّب الكتل حسب النوع. ≥768: فاصل داخل الحاوية + 24px، صف الدفع (العنوان بجانب الأيقونات) في جهة النهاية، ثم الروابط القانونية في البداية والحقوق في النهاية بفارق 36px. موبايل: الدفع (العنوان فوق، 10px) ← الروابط القانونية (13/700، فجوة 14) ← الحقوق (11/400) بفارق 6px.
Liquid: blocks/_footer-column.liquid — "Open on mobile by default" صار يرسم الحالة الأصلية نفسها (.open + height: auto inline كما يفعل سكربت custom.js) بدل CSS، وإعداد جديد "Order on mobile" (0–10) يُقرأ فقط تحت ayum-footer-main. blocks/_payment_icons.liquid — إعداد "Label" (افتراضي "طرق الدفع") يُرسم <p class="hdt-payments-label">.
[مطلوب من التاجر] Custom CSS class للمثيلين؛ "Open on mobile by default" لعمود المتجر؛ "Order on mobile" = 1 لعمود عن أيم؛ Width (mobile) = 0 لعمود تواصل معنا؛ تفعيل colors by section للسفلي بنفس scheme الرئيسي؛ حذف أي كتلة نصية منفصلة لعنوان الدفع إن وُجدت (لتفادي التكرار).
Validated (ثابت): JSON للـ schema في الملفات الثلاثة، لا ids مكررة، توازن الوسوم والأقواس، تدقيق selectors، لا ألوان حرفية ولا !important، CSS الهيدر بلا تغيير.
Not run: المتصفح والمحرر (كل العروض، الأكورديون، الترتيب، الدفع).

متابعة 2026-10-14 — S4 Footer: ترتيب الأكورديون وإظهاره وحالته الافتراضية على الموبايل:
Figma: 2001:942 (3 مجموعات: المتجر مفتوحة، خدمة العملاء، عن أيم مغلقتان) و2001:483 (4 أعمدة على الديسكتوب منها تواصل معنا).
السبب: الكود جاهز منذ المتابعة السابقة ("Order on mobile"، و"Open on mobile by default" الذي يرسم الحالة الأصلية .open + height، وإعداد Width (mobile) = 0 الأصلي للإخفاء على الموبايل)، لكن القيم لم تُضبط على كتل المتجر الحية؛ footer-group.json المحلي نسخة demo قديمة. اختار التاجر ضبطها من المحرر.
إصلاح كود واحد: assets/custom.js — ربط عناوين الأكورديون داخل الفوتر بعد shopify:section:load (كان السكربت الأصلي يربطها مرة واحدة عند التحميل، فتتوقف بعد إعادة تحميل السكشن في المحرر).
[مطلوب من التاجر في المحرر] footer_KwXhWr: Custom CSS class = ayum-footer-main. footer_ziwVXA: Custom CSS class = ayum-footer-bottom. عمود المتجر: Open on mobile by default = on. عمود عن أيم: Order on mobile = 1. عمود تواصل معنا: Width (mobile) = 0. (المتجر وخدمة العملاء يبقيان 0 فيحافظان على ترتيبهما.)
Validated: node --check لـ custom.js. Not run: المتصفح والمحرر.
إضافة 2026-10-14: إعداد جديد في blocks/_footer-column.liquid — "Hide whole column on mobile" (ayum_hide_column_mb، افتراضياً false) يضيف صنف hdt-hidden الأصلي نفسه (مثل Width (mobile) = 0)، فيُخفي العمود كله تحت 768px ويبقى ظاهراً على التابلت والديسكتوب. الخيار الأصلي "Hide on mobile" يخفي العنوان فقط. للاستخدام على عمود تواصل معنا.

### 2026-10-14 — صفحة المجموعة: المرحلة B (سكاشن Kalles الأصلية + CSS فقط) — بانتظار التحقق الحي

- **Figma:** `1:787` (ديسكتوب)، و`1:1081` (موبايل)، و`1:1287` (bottom sheet) عبر metadata + `get_design_context`.
  - الأجزاء: الشريط، والهيدر، والشرائح، والكارت، والفلاتر، والترتيب، وتحميل المزيد، وشريط الموبايل، والـ sheet.
- **القالب:** `templates/collection.json` (و`collection.custom-ayum.json` بنفس المفاتيح). فيه السكاشن الأصلية:
  - `top-list-collections`.
  - `main-heading` (`_heading_liquid` + `_heading_brc`).
  - `main-collection` (بلوك `filter`).
  - **لم يُنسخ أي سكشن أو بلوك أو كارت.**
- **انحراف:** تعديلات غير مُلتزَمة من محرر الثيم (17:09) على `collection.json`، وهي إزالة صورة الهيدر وقيم parallax. حُفظت.
- **النطاق (لا `custom_class` في السكاشن الأصلية):**
  - التثبيت على مفتاح الهيدر `main_heading_PHNGje`، الفريد لقالبي AYUM.
  - المفاتيح `collections_list_simple_4yRUED` و`main-collection` مشتركة مع كل قوالب Kalles التجريبية.
  - **المحدِّدات:**
    - الهيدر `[id$="__main_heading_PHNGje"]`.
    - الشريط `…_4yRUED:has(+ heading)`.
    - المنتجات `heading ~ [id$="__main-collection"]`.
  - `dev1.css` يُحمَّل في صفحة المجموعة عبر شريط الإعلانات (`ayum-announcement-bar` في header-group).
- **إعدادات أصلية غُيِّرت في `collection.json` (تعديل قيم فقط، بعد قراءة الملف مباشرة):**
  - **main-collection:**
    - تفعيل بلوك `filter` (sidebar دائم على الديسكتوب).
    - `col_dk` 4→3.
    - `product_des` 1→7: كارت Kalles الأصلي رقم 7 فيه زر الإضافة الأصلي `btn-ultra` بعرض كامل تحت السعر.
    - `pagination_type` links→load_more.
  - **main-heading:**
    - نص `_heading_liquid` صار `{{ collection.title }}` + `<span class="ayum-collection-count">{{ collection.products_count }} منتج</span>`.
    - `text_size` custom 36/22. مدى الموبايل خطوته 2، فلا يقبل 23.
    - `pd` 48/24 و`pd_mb` 16/16.
- **CSS (`dev1.css`، بلا ألوان حرفية):**
  - الهيدر وشارة العدد.
  - بطاقات الشريط + الحالة النشطة الأصلية `hdt-current-active` + الأسهم.
  - أزرار الترتيب/التصفية وتحميل المزيد.
  - كارت النمط 7: حشوة، وصورة داخلية، ومحاذاة وسط، وزر ممتلئ من ألوان زر المخطط.
  - فلاتر الـ sidebar.
  - drawer الفلاتر على الموبايل كـ bottom sheet: أسفل الشاشة، وزوايا 22، ومقبض.
- **محجوب (يحتاج تعديل مصدر أصلي أو قرار — بانتظار الموافقة):**
  1. **صور ولون مختلف لكل بطاقة في الشريط:** `top-list-collections` يطبع رابطاً نصياً فقط.
  2. **شرائح الأقسام الفرعية:** لا مصدر أصلي. الخيارات: روابط فلتر نوع المنتج، أو collections فرعية، أو قائمة. يحتاج قرار.
  3. **سطر الميتا "مجفف بالتجميد":** لا مصدر أصلي في الكارت.
  4. **العدّ "24 منتج" وشرائح الفلاتر السريعة والفلاتر النشطة على الموبايل.**
  5. **تذييل الـ sheet ("عرض N نتيجة"، "مسح الكل") وحركة الصعود:** `pos="bottom"` يحتاج تعديلاً في `main-collection`.
  6. **عنوان drawer "تصفية النتائج":** نص اللغة `products.sidebar.label` مشترك.
  7. **العدّ بين أقواس "(12)" في الفلاتر.**
  8. **فجوة الشبكة:** خيارات `space_items` لا تعطي 20/12.
  9. **"ليش تختار أيم" و"عن المجموعة" (SEO):** غير موجودين في قالب المجموعة. يلزم إضافة سكاشن.
- **قيم مخطط يضبطها التاجر (body scheme / Scheme 1، و Scheme 2 للهيدر):**
  - Button `#26B3D0` / Button label `#FFFFFF` (زر الإضافة).
  - Price `#EA3A79`.
  - Rating `#F2B640`.
  - Line border `#D3E3E8`.
  - Text 2 `#4E6E70`.
- **تحقق:** بانتظار الـ preview الحي (كلمة المرور مغلقة). Not run حتى الآن.

#### 2026-10-14 — متابعة: تدقيق الفجوات على DOM حقيقي (الصفحة غير مقبولة بعد — Partial)

- **بيئة الاختبار:**
  - الـ preview على 9292 يخدم الآن `ayum-dev2-ah`. بصمة `dev1.css` المخدوم = نسخة dev2.
  - **الأساس المستخدم:** render حقيقي لهذا الـ worktree التُقط 17:57 (كارت 7، والـ sidebar)، مع `dev1.css` المحلي. الأصول الأصلية متطابقة بين الـ worktrees.
  - لم يُختبر على Shopify Preview لهذا الـ worktree بعد التعديلات.
- **محرر الثيم (commit e67c454):**
  - **أعاد قيمتين من تعديلاتي:** span العنوان، و`image_ratio` square ← custom-pr (يرجَّح أنها جلسة محرر قديمة).
  - **عطّل:** breadcrumb، وoverlay، والوصف، ومحدد الأعمدة.
  - **غيّر:** layout وpd للشريط.
  - حُفظت كلها، ولم تُكتب قيمي فوقها.
- **إصلاحات CSS (`dev1.css`):**
  - **وزن العنوان 800:** `!important` مبرَّر؛ البلوك يطبع `#block-id {font-weight:500}` بلا إعداد.
  - **زر الإضافة:** إخفاء أيقونة السلة والنص في الوسط.
  - **التقييم الصفري:** إخفاء صف "0 out of 5 / (0)".
  - **عناوين الفلاتر:** إزالة خط التسطير.
  - **شريط أدوات الموبايل:** الترتيب بعرض كامل أولاً، والفلتر تحته، وإخفاء زر الشريط الجانبي العائم المكرر.
- **custom_class:**
  - السكاشن الأصلية الثلاث بلا إعداد. النطاق الحالي = hooks مستقرة: مفتاح الـ instance في id الغلاف، ومُتحقق منه في DOM.
  - إضافة `custom_class` = تعديل أصلي، بانتظار الموافقة.
- **على التاجر (Theme Editor):**
  - مخطط main-collection: Button `#26B3D0` / Label `#FFFFFF`، وPrice `#EA3A79`، وRating `#F2B640`، وLine border `#D3E3E8`، وText 2 `#4E6E70`.
  - مخطط Heading page بخلفية بيضاء.
  - Image ratio = Square.
  - "Show description" + position after (نص SEO ديناميكي).
- **بانتظار الموافقة (تعديل مصدر أصلي):**
  1. `custom_class` في `top-list-collections` و`main-heading` و`main-collection`.
  2. صورة ولون لكل بطاقة في الشريط.
  3. bottom sheet: `pos="bottom"` + تذييل "مسح الكل" / "عرض N نتيجة".
  4. عنوان "تصفية النتائج" (sidebar وsheet).
  5. شرائح الأقسام الفرعية (قرار المصدر).
  6. سطر الميتا في الكارت.
  7. عدّ المنتجات في شريط الأدوات.
  8. سكشن "ليش تختار أيم": غير موجود؛ إضافته = تغيير بنيوي في القالب.

### 2026-10-14 — H3/H4 متابعة: دمج كود الكاروسيل المكرر (refactor بلا تغيير مرئي)
القرار: من تدقيق البنية — blocks/_ayum-product-carousel.liquid وblocks/_ayum-bundle-product-carousel.liquid كانا نسختين كاملتين من _product-carousel الأصلي، والفرق بينهما 7 أسطر كود فقط.
التنفيذ: جسم الكتلة المشترك نُقل إلى snippets/ayum-product-carousel.liquid (489 سطراً). الكتلتان صارتا غلافين رفيعين: نفس النوع والملف والـ schema حرفياً، وتمرّر كل منهما block وcarousel_collection (يُحسب داخل الكتلة حتى تبقى مصادر {{ closest.collection }} في سياقها) وcarousel_class وcarousel_style. الـ snippet يحمل فرعي البطاقة ayum وayum_bundle، وخيار البطاقة في schema كل كتلة يحدد أيهما يُرسم.
السبب في أن التوفير ~413 سطراً لا ~1400: الـ schema (~995 سطراً لكل كتلة) يجب أن يبقى في ملف الكتلة نفسه.
التحقق الثابت: القالب الفعلي لكل كتلة (الـ snippet مع معاملاتها ومن دون فرع البطاقة الأخرى) مطابق حرفياً للجسم السابق؛ الـ schema مطابق بايت ببايت؛ JSON صالح، لا ids مكررة، الوسوم متوازنة. نطاق Liquid: لا content_for ولا shopify_attributes في الجسم؛ section عام داخل الـ snippets ونمط block: block مستخدم أصلاً (snippets/collection-item.liquid من _collection_item، و_product-list → _product_list_carousel).
لم يتغير: templates/index.json، بطاقات المنتج، CSS، JS، الملفات الأصلية. نسخ احتياطية للملفين القديمين خارج المستودع (scratchpad)؛ الاسترجاع: git checkout للملفين وحذف الـ snippet.
Not run: المتصفح (الكاروسيلان، البطاقات، الإضافة للسلة، شريط التقدم، السحب، RTL، المحرر).

## 24. البنية النهائية للصفحة الرئيسية (معتمدة 2026-10-14)

القرار: تبقى أقسام الصفحة الرئيسية التسعة كنسخ AYUM معزولة بأنواع كتلها الحالية، ولا تُرحَّل إلى Kalles الأصلي. أساس القرار تدقيقا البنية (2026-10-14): كل نسخة مبنية فعلاً على أصلها في Kalles (61–95% من markup القسم أصلي، ولا يزيد المحذوف من الأصل عن 5 أسطر)، وكلها تحمل بيانات محفوظة في كتل أو إعدادات AYUM لا يستوعبها الأصل.
القواعد الدائمة (Native Kalles first، ونسخة AYUM واحدة فقط عند الحاجة لتعديل المصدر، وعدم تكرار نسخة AYUM موجودة، وبوابة الترحيل بلا تراجع) مكانها SKILL.md §0.0 و§5 و§5.3، ولا تُكرَّر هنا.

### 24.1 الأقسام
| instance في templates/index.json | نوع AYUM | الأصل في Kalles (لم يُعدَّل) | كتل/snippets AYUM | تبعيات أصلية مستخدمة كما هي | CSS / JS |
| --- | --- | --- | --- | --- | --- |
| ayum_slideshow_hero | ayum-slideshow | slideshow | — (_ayum-slide-item مسجَّل وغير مستخدم) | _slide-item، text_custom، heading، text، _button_group، button_custom، slideshow.css | dev1.css |
| ayum_collections_list | ayum-collections-list | collections-list | _ayum-collection-item | section-heading، _heading_section، snippets/collection-item، hdt-collection-items.css | dev1.css |
| ayum_tabs_collection_best_sellers | ayum-tabs-collection | tabs-collection | _ayum-tab-collection، _ayum-product-carousel، card-product-ayum | section-heading، _heading_section، hdt-tabs-collections.css، hdt-pagination.css، card-price، badges، card-product-media، btn-ultra | dev2.css، ayum-slider-progress.js |
| ayum_featured_collection_bundles | ayum-featured-collection | featured-collection | _ayum-bundle-product-carousel، card-product-ayum-bundle، ayum-btn-ultra | section-heading، _heading_section، _sub_heading_section، card-price، badges، card-product-media | dev2.css، ayum-slider-progress.js |
| ayum_image_text_about | ayum-image-text | image_text | _ayum-image-text-col، _ayum-description، _ayum-stats، _ayum-stat | _image-text-column، image، heading، hdt-image-with-text.css | dev1.css |
| ayum_icon_box_freeze_dry | ayum-icon-box | icon-box | _ayum-icon-box، _ayum-claims، _ayum-claim، ayum-icons | section-heading، _heading_section، _sub_heading_section، hdt-icon-box.css | dev1.css |
| ayum_testimonials | ayum-testimonial_section | testimonial_section | _ayum-testimonial-item، ayum-quote | section-heading، _heading_section، _sub_heading_section، testimonials.css | dev2.css، ayum-slider-progress.js |
| ayum_shoppable_video | ayum-product-video | product-video | _ayum-product-video، ayum-btn-ultra | section-heading، _heading_section، _sub_heading_section، <hdt-video-player>، <hdt-slider> | dev2.css، ayum-shoppable-video.js، ayum-slider-progress.js |
| ayum_accordion_faq | ayum-accordion | accordion | _ayum-accordion-item | section-heading، _heading_section، <hdt-accordion> | dev1.css |

مشترك لكل الأقسام: <hdt-slider> الأصلي (لا مكتبة سلايدر ثانية)، ونظام color schemes الأصلي، وأدوات hdt- الأصلية. لكل قسم إعداد custom_class في نسخة AYUM.

### 24.2 الكاروسيل المشترك
- snippets/ayum-product-carousel.liquid: الجسم الوحيد للكاروسيل (نسخة _product-carousel الأصلية: البطاقات الأصلية 1–12، <hdt-slider>، زر عرض الكل) مع فرعي البطاقة 'ayum' و'ayum_bundle' وشريط <ayum-slider-progress> الاختياري.
- blocks/_ayum-product-carousel.liquid (Best sellers) وblocks/_ayum-bundle-product-carousel.liquid (Bundles): غلافان رفيعان بنفس الأنواع والـ schema الكاملة (الـ schema يجب أن يبقى في ملف الكتلة). يمرّر كل منهما block وcarousel_collection (يُحسب داخل الكتلة لتبقى مصادر {{ closest.collection }} في سياقها) وcarousel_class وcarousel_style.
- خيار البطاقة في schema كل كتلة يحدد الفرع المرسوم؛ card-product-ayum وcard-product-ayum-bundle يركّبان الـ snippets الأصلية (card-price، badges، card-product-media، btn-ultra، quick view، compare).
- أي تعديل لاحق على الكاروسيل يكون في الـ snippet مرة واحدة، لا في الكتلتين.

### 24.3 الملفات المشتركة خارج الصفحة الرئيسية (للعلم)
- مجموعة الهيدر: ayum-announcement-bar، ayum-header (+ _ayum-menu-mobile، ayum-main-menu، ayum-header-icons)، وCSS في assets/main.css.
- مجموعة الفوتر: sections/footer.liquid الأصلي مع تعديلات مصرَّح بها صراحةً لتلك المهمة فقط (custom_class، وفي _footer-column: ayum_open_mobile وayum_order_mb وayum_hide_column_mb، وفي _payment_icons: ayum_label)، وCSS مقيّد بـ .ayum-footer-main / .ayum-footer-bottom في main.css. هذا استثناء موثَّق من قاعدة عدم تعديل الأصل.
- ملفات أصلية أخرى معدَّلة من مهام سابقة: layout/theme.liquid (ayum-arabic-font-face)، assets/custom.js (ربط أكورديون الفوتر بعد إعادة تحميل السكشن)، snippets/hdt-pr-card-rating.liquid (+ assets/fill_star_rating.svg وunfill_star_rating.svg).

### 24.4 حالة الكود غير المستخدم (تدقيق 2026-10-14)
- حُذف: assets/sedWCy1az وassets/sedxYrMsG (فارغان، بلا أي مرجع).
- فارغة وبلا مرجع، بانتظار موافقة منفصلة: assets/dev1.css.tmp.* (3)، assets/dev2.css.tmp.* (2)، assets/ayum-shoppable-video.js.tmp.* (1).
- غير مستخدم في البيانات المحفوظة ولا يُحذف دون موافقة منفصلة: blocks/_ayum-slide-item.liquid (مسجَّل في schema ayum-slideshow فقط).
- بلا مرجع في الكود لكنه ليس ميتاً: templates/product.custom-ayum.json وtemplates/collection.custom-ayum.json (تُعيَّن من لوحة Shopify).
- كل ملفات AYUM الأخرى مستخدمة.

#### 2026-10-14 — متابعة 3: تدقيق على render حقيقي لهذا الـ worktree (In Progress — غير مكتملة)

- **الـ preview:** خدم هذا الـ worktree لفترة؛ بصمة `dev1.css` مطابقة. التُقط render حقيقي (`live4`). بعدها أُغلق بكلمة المرور، فاستمر القياس على هذا الـ render مع `dev1.css` المحلي.
- **انحراف قالب/إعدادات بين المحلي وثيم Shopify (بانتظار مزامنة آمنة):**
  - الشريط على Shopify يعرض 5 شرائح كلها `/collections/الأكثر-مبيعا`. القالب المحلي `show_type: all` بلا بلوكات (كان يعرض 20 مجموعة مختلفة).
  - **السبب المرجَّح:** أُضيفت في المحرر 5 بلوكات collection تشير لنفس المجموعة، ولم تصل للملف المحلي.
  - الأزرار فيروزية على Shopify، و`settings_data.json` المحلي يقول `#222`. أي أن تعديلات المخطط أيضاً غير مُزامَنة.
  - **لم يُعدَّل `collection.json`:** theme dev سيرفع النسخة القديمة ويمحو البلوكات.
- **CSS (مُتحقق على الـ render الحقيقي):**
  - **شارة العدد:** صارت من scheme Background (`#E4EDF0`). الهيدر لا يرسم خلفية المخطط، فكانت بيضاء على أبيض.
  - **ألوان السعر:** أُعيد المعنى الأصلي داخل الكارت. السعر الحالي = Price، وسعر التخفيض = Sale price، والسعر قبل التخفيض = Price بنسبة 55% مشطوب.
  - **زر الإضافة:** 43px ديسكتوب و33px موبايل (Figma).
  - **الأعرض 320–1440:** لا overflow، و3/2 أعمدة، والصورة مربعة (إعداد التاجر).
  - الـ sheet أسفل الشاشة بزوايا 22 ومقبض، وEscape يغلق.
- **حالة البنود:**
  - **صحيح:** الكارت (هيكل، زر، أعمدة)، والـ sidebar يميناً، و"تحميل المزيد" الأصلي يعمل ("لقد شاهدت 12 من 52 منتج")، والتقييم الحقيقي (metafields `reviews.rating`) مع إخفاء الصفري، والشارات الأصلية الديناميكية (خصم من compare-at، وجديد، والأكثر مبيعاً).
  - **إعداد التاجر:** Sale price `#EA3A79`؛ وبلوكات الشريط (مجموعة مختلفة لكل بلوك)؛ و"Show description" (SEO).
  - **مصدر أصلي (بانتظار الموافقة):**
    - صورة ولون لكل بطاقة في الشريط.
    - الشرائح الفرعية.
    - عنوان "تصفية النتائج".
    - تذييل الـ sheet + `pos=bottom`.
    - متوسط التقييم بدل العدد.
    - سطر الميتا.
    - العدّ في شريط الأدوات.
    - شرائح الفلاتر السريعة.
    - `custom_class`.
  - **إضافة بنيوية للقالب (بعد المزامنة):** "ليش تختار أيم" بإعادة استخدام `ayum-icon-box`.

#### 2026-10-14 — متابعة 4: إضافات أصلية اختيارية + Custom classes + إعدادات المحرر (In Progress)

- **الموافقة:** إضافات صغيرة متوافقة مع السابق في ملفات Kalles الأصلية. كل إعداد جديد افتراضيه "مُطفأ" أو فارغ، فتطبع السكاشن نفس المخرجات السابقة عند عدم الاستخدام. لا نسخ لسكشن أو بلوك أو كارت. لا تعديل على `settings_data.json` أو المخططات العامة أو JS المشترك.
- **Custom classes (مُتحقق في DOM حقيقي):**
  - `ayum-collection-top-list` (Top list collections).
  - `ayum-collection-heading` (Heading page).
  - `ayum-collection-products` (Collection page، على عنصر `[main-content]` الذي يبقى بعد تحديثات الفلاتر AJAX).
  - `ayum-collection-benefits` (AYUM Icon box).
  - `ayum-collection-seo` (Custom Liquid الأصلي).
  - المحدِّدات القديمة المبنية على مفاتيح القالب (`main_heading_PHNGje`…) أُزيلت من `dev1.css`.
- **ملفات أصلية مُوسَّعة:**
  - `sections/top-list-collections.liquid`:
    - "AYUM cards" (checkbox) و`custom_class`.
    - لكل بلوك `cat`: `ayum_image` و`ayum_color`.
    - ترتيب الصورة: صورة البلوك ← صورة المجموعة ← placeholder.
  - `sections/main-heading.liquid`: `custom_class`.
  - `sections/main-collection.liquid`:
    - `custom_class`.
    - Filter tabs (`ayum_tabs_filter`، `ayum_tabs_all_label`).
    - `ayum_count_label`.
    - Quick filters (`ayum_quick_filters`، `ayum_quick_all_label`).
    - `ayum_sidebar_title`.
    - Bottom sheet (`ayum_bottom_sheet`، `ayum_sheet_clear_label`، `ayum_sheet_results_label`).
    - `ayum_card_tag`، `ayum_card_tag_prefix`.
  - `sections/custom-liquid.liquid`: `custom_class`.
  - `snippets/card-product7.liquid`: وسيطان اختياريان `ayum_show_tag` و`ayum_tag_prefix`، لا يمررهما إلا Collection page. بقية المستدعين بلا تغيير.
  - `snippets/hdt-pr-card-rating.liquid`: `<span class="star-rating__average">`، مخفي افتراضياً بـ CSS داخل الـ snippet، ويظهر في نطاق الصفحة فقط.
- **ملفات AYUM مُوسَّعة:**
  - `sections/ayum-icon-box.liquid`:
    - لون خلفية السكشن: Background / Accent.
    - لون الكارت: Background / Background 2، مع شفافية الكارت.
    - حجم دائرة الأيقونة (ديسكتوب وموبايل).
    - تخطيط الموبايل (جانبي / مكدّس).
    - لون الوصف: Text 2 / Text 80%.
    - خيار مسافة 12px.
    - الافتراضيات = سلوك الصفحة الرئيسية الحالي.
  - `blocks/_ayum-icon-box.liquid`: 4 أيقونات (factory، noheat، shield، truck)، وحد أدنى 16px للأيقونة.
  - `snippets/ayum-icons.liquid`: رسومات Figma للأيقونات الأربع (26×26، خط 1.84).
- **القالب `templates/collection.json`:**
  - قُرئ مباشرة قبل الكتابة، وكان مطابقاً لـ HEAD (لا تعارض مزامنة). القيم فقط، والترتيب: الشريط ← الهيدر ← المنتجات ← "ليش تختار أيم" ← SEO.
  - **الشريط:** `ayum_cards` مفعّل، وألوان البلوكات: Pink، Primary، Orange، Green، Purple (Figma 1:812).
  - **المنتجات:**
    - التبويبات `filter.p.product_type`.
    - العدّ `[count] منتج`.
    - الفلاتر السريعة و"كل الفلاتر".
    - العنوان "تصفية النتائج".
    - الـ bottom sheet.
    - وسم الكارت.
    - مخطط الـ sidebar = Scheme 3 (نفس مخطط المنتجات).
  - **سكشن `ayum_why` (ayum-icon-box):**
    - Scheme 7 + Accent بنسبة 35% (= Figma rgba(38,179,208,.35)).
    - الكروت Background 2 بنسبة 50%، و4/2 أعمدة.
    - الأيقونات 48/32 والـ SVG 26/18.
    - النصوص 17/12 و13/11 من Figma 1:1007 و55:730.
  - **سكشن `ayum_seo` (custom-liquid):**
    - يطبع `collection.description` بعنوان "عن {{ collection.title }}".
    - Scheme 5 بنسبة 30% (= Figma rgba(239,214,120,.3)).
    - شريط بلون Accent (برتقالي).
    - `show_description` في Collection page بقي false (لا تكرار).
- **التحقق (theme dev لهذا الـ worktree، بصمة `dev1.css` مطابقة؛ الـ preview يُغلق بكلمة المرور على فترات):**
  - **DOM حقيقي:** الـ 5 classes موجودة وبالترتيب الصحيح.
  - **البطاقات:**
    - الشريط 258×84 والصورة 61 (ديسكتوب)، و54 بزوايا 10 (موبايل).
    - البطاقة النشطة 22% + حد بلون البلوك.
  - **الهيدر:** 36/22 ExtraBold، مع الشارة.
  - **التبويبات:**
    - روابط facets أصلية (`?filter.p.product_type=…`).
    - "الكل" = `url_to_remove`.
    - الفعّال بألوان زر المخطط.
  - **كارت المنتج:** الزر 43/33px، والوسم يظهر (أول وسم للمنتج)، والتقييم الصفري مخفي (لا تقييمات في البيانات حالياً).
  - **Why Ayum:** 4 كروت 305×186 ديسكتوب، و2×2 موبايل مكدّس.
  - **SEO:** 23/17 مع الشريط البرتقالي.
  - **الـ sheet (375px):**
    - ملتصق بالأسفل بزوايا 22 ومقبض.
    - العنوان "تصفية النتائج".
    - التذييل "مسح الكل / عرض 10 نتيجة".
    - "عرض" وEscape يغلقان.
  - **الظهور حسب العرض:** الفلاتر السريعة والتذييل مخفيان على الديسكتوب.
  - **بلا overflow:** 320 و375 و414 و768 و1024 و1150 و1440.
- **ملاحظات / إعداد التاجر:**
  - بلوكات الشريط الخمسة كلها تشير إلى `الأكثر-مبيعا`، فيظهر نفس الاسم 5 مرات. على التاجر اختيار مجموعة لكل بلوك.
  - الوسم يأخذ أول وسم للمنتج (مثلاً "best-seller"). لعرض "مجفف بالتجميد" فقط: بادئة وسوم (`ayum_card_tag_prefix`) أو ترتيب الوسوم.
  - `collection.custom-ayum.json` لم يُعدَّل. لم يعد يأخذ تنسيق AYUM لأن النطاق صار بالـ classes، وتلزمه نفس قيم `custom_class` إن كان مستخدماً.
  - Text 2 في Scheme 5 = `#6E8788`، وFigma SEO = `#4E6E70`. هذا فرق مخطط، لم يُعدَّل.

#### 2026-10-14 — متابعة 5: تنقيح نهائي (الشريط، التقييم، شريط الأدوات، الـ sheet، تحميل المزيد) — In Progress

- **Figma (من بيانات العُقد):**
  - `1:787`، `1:1081`، `1:1287`.
  - الأجزاء: `1:812`/`1:1095` (الشريط)، `1:859` (شريط النتائج والترتيب)، `1:865`/`1:1172` (الكارت)، `1:942` (الـ sidebar)، `1:938`/`1:941`/`1:1222`/`1:1224` (تحميل المزيد)، `1:844`/`1:839` (التبويبات والشارة).
  - Figma لا يحتوي شريط تقدّم في تحميل المزيد: زر ثم نص "عرض X من Y منتج" تحته.
- **الشريط — حشوة البطاقة:**
  - **السبب:** قاعدة Kalles في `theme.css` `.hdt-top-list-collections .hdt-slider .hdt-slider__slide a { padding: 10px 0; gap: 5px }` (0,3,1) تغلب `.ayum-collection-top-list .ayum-tl-card` (0,2,0)، فكانت الصورة ملاصقة لحافة البطاقة.
  - **الإصلاح:** محدِّد أقوى + `--slide-spacing` 8/10 + إخفاء الأسهم على الموبايل (Figma).
  - **المقاس (DOM):** 258×84، حشوة 12/12/20، صورة 61؛ موبايل حشوة 8/8/14، صورة 54. `pd_mb` 14 (إعداد أصلي).
- **التقييم — السبب الحقيقي (بيانات لا كود):**
  - الـ snippet الأصلي يقرأ `product.metafields.reviews.rating` ويعمل.
  - **في المتجر كله منتجان فقط لهما بيانات تقييم:** `c45برواني-بيكان-جوكليت` (5.0، مراجعة 1) و`c45…-sm` (4.0، مراجعة 1). منتجات "الأكثر مبيعا" كلها بلا تقييم، فقاعدة إخفاء الصفر تخفي صفّها.
  - **مُتحقق على render حقيقي:** النجوم + "5.0"/"4.0" تظهر في `/collections/all`، والمنتجات بلا تقييم بلا نجوم رمادية.
  - **التنسيق (Figma):** الرقم + النجوم في بداية الصف، بلا عدد المراجعات، نجوم 11px.
- **سطر المعلومات:**
  - "most order" وسم إنجليزي حقيقي (5 منتجات)، و"مجفف بالتجميد" وسم على 6 منتجات.
  - **أُضيف:** `ayum_card_tag_allow` (قائمة وسوم مسموحة) و`ayum_card_tag_metafield` (metafield نصي قابل للترجمة، أولوية).
  - **القالب:** allow = "مجفف بالتجميد".
- **شريط الأدوات (ديسكتوب ≥1150):**
  - CSS grid على `.hdt-container`، والصف الأصلي `display: contents`، بلا نقل markup.
  - الـ sidebar 280 في العمود الأول (يمين RTL)، وشريط الأدوات فوق الشبكة فقط: الترتيب يسار، والعدّ يمين.
  - 48 تحت التبويبات، و20 فوق الشبكة؛ فجوة الشبكة 20/16/12.
  - **الترتيب في كل العروض:** "ترتيب: <الخيار المختار>" من الـ spans الأصلية + نقطتان.
  - **عدّ الهيدر = `all_products_count`** (ثابت؛ الهيدر لا يُعاد رسمه بالـ AJAX). **عدّ شريط الأدوات = `products_count`** (يتبع الفلاتر).
- **الفلاتر:**
  - عنوان 20، ومجموعة 15/800، وخيار 14/400، وعدد 13/700، ومسافة 12 بين الخيارات.
  - مربع الاختيار 18 (ديسكتوب) و20/5 (الـ sheet).
  - فاصل تحت كل مجموعة: Kalles كان يزيله عن غير الأخيرة. أُزيل `margin 1rem` الأصلي بين الخيارات.
- **ارتفاعات Figma:** line-height 1.15 (= "normal" في Figma لـ Almarai) على الأزرار والشرائح. الترتيب 33، وتحميل المزيد 44/41، وأزرار الـ sheet 45، والتبويبات 31.
- **تذييل الـ sheet:**
  - زران متساويان بفاصل 12، والحشوة 14/16/20.
  - "عرض N نتيجة" ممتلئ (17/800) يميناً، و"مسح الكل" إطار 1.5 (14/700).
  - "مسح الكل" يحتفظ بالترتيب.
- **تحميل المزيد:**
  - الزر ثم النص الأصلي (المُحمَّل / الإجمالي المفلتر) تحته، وأُخفي مسار الشريط (غير موجود في Figma).
  - أُزيلت `padding-top: 4rem` والحد العلوي الأصليان لصفحات المجموعة.
  - المسافة = `dis_pagination` (36) على الديسكتوب، وثلثها على الموبايل.
  - `pd` 48 و`pd_mb` 16 (إعدادات أصلية).
- **مقاسات (render ملتقط + `dev1.css` المحلي، 1440/375):**
  - الترتيب 33، والشريط 258×84.
  - التبويبات 48 فوق شريط الأدوات، وشريط الأدوات 20 فوق الشبكة.
  - الـ sidebar 280، وصفوف الفلاتر كل 30px.
  - أزرار الـ sheet 45 متساوية.
  - بلا overflow: 320، 375، 390، 767، 768، 1149، 1150، 1440.
- **غير مُتحقق حياً بعد (الـ preview مغلق بكلمة المرور):**
  - تحديثات الـ Liquid (allow-list، ورابط "مسح الكل" مع الترتيب، وعدّ الهيدر).
  - تدفقات AJAX (التبويبات والترتيب معاً، وتحميل المزيد، والـ sheet بفلتر واحد/فلترين، و"عرض" و"مسح الكل").
- **إعداد التاجر:**
  - بلوكات الشريط الخمسة (`cat_mXq6Mi`، `cat_ULRjDy`، `cat_xA8DAA`، `cat_WGpmpR`، `cat_Fc3DNG`) كلها `الأكثر-مبيعا`.
  - لون زر Scheme 3 (`#56CFE1`) مقابل Figma `#26B3D0`.
  - عدد المراجعات الحقيقية.
- **غير مُنفَّذ:**
  - الشريط اللاصق (sticky) للموبايل: يتداخل مع الهيدر اللاصق الأصلي، ولا خيار أصلي له.
  - أقواس عدد الفلاتر "(12)": نص في snippet الـ facets المشترك.
  - تسمية زر "حمّل 12 منتج إضافي": نص مترجَم أصلي / `btn_label`.

#### 2026-10-15 — متابعة 6 (موبايل): عرض شريط المجموعات + فاصل الفوتر

- **Figma:**
  - `1:1095`: شريط موبايل بحشوة 16 وفاصل 10، والبطاقات بعرض محتواها.
  - `50:555`: الفوتر.
- **الشريط — السبب:**
  - قاعدة Kalles `.hdt-top-list-collections .hdt-content { width: calc(100vw - 80px) }`، مع حشوة الـ slider والـ container، تحجز مكاناً لأسهم مخفية على الموبايل.
  - النتيجة: المسار المرئي 50–325 من 375، والبطاقات مقصوصة من الجانبين.
- **الشريط — الإصلاح (`dev1.css`، أقل من 768 فقط):**
  - الـ container والـ slider بلا حشوة، و`.hdt-content` بعرض 100%.
  - حشوة بداية 16 على `.hdt-slider__container`.
  - الـ slider الأصلي (Embla، RTL، السحب) بلا تغيير.
- **الشريط — المقاس (render حقيقي ملتقط + CSS محلي):**
  - **375:** بطاقة 201–359 (16 من الحافة)، وبطاقة كاملة 40–191، و30px من الثالثة.
  - **390:** بطاقتان + 45px.
  - **320:** بطاقة + 136 من 151 من الثانية.
  - صورة 54×54، والسحب يعمل، وبلا overflow.
  - الديسكتوب بلا تغيير (slider 75–1365).
- **الفوتر — السبب:**
  - `assets/main.css` يرسم فاصلاً تحت كل صف أكورديون على الموبايل (`.ayum-footer-main .hdt-footer-col-block:has(.hdt-footer-heading)`).
  - الصفوف مرتبة بالمتغير `--ayum-order-mb`، فالصف الأخير لا يُستهدف بالموضع ولا بالـ id.
- **الفوتر — الإصلاح (`dev1.css`، أقل من 768):**
  - `body:has(.ayum-collection-products) .ayum-footer-main .hdt-row:has(> .hdt-footer-col-block) { clip-path: inset(0 0 1px 0) }`.
  - يزيل فاصل الصف الأخير فقط، مغلقاً أو مفتوحاً، وتبقى الفواصل بين الصفوف.
  - صفحة المجموعة فقط.
- **ملاحظة نطاق:**
  - الفوتر مشترك؛ الصفحة الرئيسية وبقية الصفحات ما زالت تعرض الفاصل.
  - Figma (`50:587`) يرسم هذا الفاصل؛ الإزالة طلب التاجر.
  - تطبيقه على الموقع كله يحتاج تعديلاً في `main.css` (ملف الفوتر).
- **التحقق:** على render حقيقي من الـ preview ملتقط في 2026-10-15 مع `dev1.css` المحلي. الـ preview الحي مغلق بكلمة المرور وقت الفحص.

#### 2026-10-15 — متابعة 7: شارات الكارت + نجوم التقييم دائماً (صفحة المجموعة)

- **Figma:**
  - الشارات من كروت الرئيسية `2001:105` (الأكثر طلباً)، و`2001:135` (جديد)، و`2001:152` (وفّر 15%)، لأن عقد كارت المجموعة (`1:866`/`1:1173`) بلا شارات.
  - الشكل: كبسولة بيضاء، ونص وردي 11px ExtraBold، وحشوة 5×12، وارتفاع 22، و12px من أعلى الصورة وبدايتها.
  - لم تصل لقطة الشاشة المرجعية المذكورة في الطلب؛ اعتُمد Figma.
- **النجوم — السبب:**
  - قاعدتي في `dev1.css` كانت تخفي صف التقييم عند `aria-label` = "0 out of 5" (سياسة سابقة: لا نجوم رمادية مضللة).
  - الـ snippet الأصلي (`hdt-pr-card-rating`، `product.metafields.reviews.rating`) يطبع دائماً 5 نجوم.
- **النجوم — الإصلاح:**
  - إعداد اختياري جديد في Collection page: `ayum_empty_stars` (افتراضي مُطفأ، ومُفعَّل في `collection.json`) يضيف class `ayum-empty-stars`.
  - معه تظهر 5 نجوم فارغة بلا "0" ولا "(0)".
  - المنتج المُقيَّم يعرض النجوم الحقيقية + المتوسط. أول مراجعة حقيقية تملأ النجوم تلقائياً (نفس الـ snippet ونفس الـ metafield).
  - **لون النجمة الفارغة:** Text 2 من المخطط بنسبة 35%، عبر mask بصورة النجمة الأصلية نفسها، بدل الرمادي الثابت داخل الصورة.
  - **ارتفاع الصف:** 17px ثابت للمُقيَّم وغير المُقيَّم.
- **الشارات — الإصلاح:**
  - المنطق الأصلي بلا تغيير (خصم من compare-at، وجديد بعدد الأيام، وشارات مخصصة من metafield `theme.custom_badges`).
  - **CSS:** كبسولة 11/800، وحشوة 5×12، وفاصل 6، وأعلى/بداية 12؛ موبايل 10px، وحشوة 4×9، و8px.
  - **ألوان اختيارية جديدة:** `ayum_badge_bg` و`ayum_badge_text`. فارغة = ألوان الثيم العامة. القالب: `#FFFFFF` و`#EA3A79` (Figma).
  - **ملاحظة:** Custom CSS في إعدادات الثيم (`.hdt-badge.hdt-badge__on-sale { background-color: #f54e05 }`) يلوّن شارة الخصم برتقالياً في كل الموقع. داخل هذا السكشن تتقدم ألوان AYUM عليه عند ضبطها، ويبقى خارجه كما هو.
- **التحقق:**
  - **حي:** على الـ preview عبر proxy (بصمة `dev1.css` مطابقة).
  - **بعد إصلاحَي خلفية شارة الخصم وارتفاع الصف:** على render حي ملتقط + CSS محلي (الـ preview أُغلق).
  - **1440:** الشارات بيضاء/وردية بارتفاع 23، و12 من الحافة.
  - **5.0:** 5 نجوم ممتلئة + "5.0". **4.0:** 4 ممتلئة + فارغة + "4.0".
  - **غير المقيَّم:** 5 فارغة بلا رقم.
  - العنوان والسعر والزر بنفس الإزاحة في كل صف (1440، 390، 375، 320). بلا overflow.
- **الملفات:**
  - `sections/main-collection.liquid` (3 إعدادات + class/style على `[main-content]`).
  - `templates/collection.json` (القيم فقط).
  - `assets/dev1.css`.
  - لا تعديل على كارت الرئيسية أو snippets الشارات والتقييم.

#### 2026-10-15 — متابعة 8: أيقونة فتح/إغلاق مجموعات الفلاتر (+ / −)

- **الديسكتوب (1150px فأكثر، الـ sidebar):**
  - السهم الأصلي (`svg.hdt-facet-title_icon`) مخفي داخل هذا السكشن.
  - غلافه يرسم SVG (mask) بمقاس 12px: "+" للمجموعة المغلقة و"−" للمفتوحة.
  - الحالة من سمة `open` الأصلية على `<details>`.
  - اللون Text 2 من المخطط (Figma "−").
- **أقل من 1150px (الـ drawer / bottom sheet):** لا أيقونة. الضغط على عنوان المجموعة يفتح ويغلق كالمعتاد، وزر الإغلاق وأزرار التذييل باقية.
- **النطاق:** CSS فقط في `dev1.css`، تحت `.ayum-collection-products`. بلا تعديل markup، ولا إعداد جديد، ولا JS.
- **التحقق (render حي ملتقط + CSS محلي):**
  - **1440:** "−" للمفتوحة، و"+" بعد الإغلاق، و"−" بعد إعادة الفتح.
  - **1149 / 768 / 375:** بلا أيقونة.
  - الـ sheet: الضغط على "النوع" يغلقها.
