# AYUM — خطة المشروع وحالة التنفيذ

> **الغرض:** تحفظ هذه الوثيقة حالة مشروع AYUM: خريطة Figma، ومن يملك كل منطقة في الثيم، والقرارات، والأسئلة المفتوحة، وتتبّع الحالة (§22)، وسجل التنفيذ (§23).
> **قواعد العمل الدائمة** موجودة في `.claude/skills/figma-to-sections-workflow/SKILL.md` ولا تُكرَّر هنا. عند أي تعارض في قواعد العمل يُرجع إلى الـ skill. أما حالة المستودع الفعلية فتُتحقَّق من الملفات نفسها (انظر §7).
> **تاريخ الإنشاء:** 2026-10-11. أُنشئت الوثيقة بعد تدقيق أولي للقراءة فقط، ولم يُنفَّذ أي سكشن.

---

## 1. نطاق الوثيقة

- **مسار المشروع الفعلي:** `D:\Shopify\Ayum`.
- **النطاق الحالي:** الصفحة الرئيسية (`templates/index.json`) والمناطق المشتركة (شريط العرض، الهيدر، قائمة الموبايل، الفوتر، شريط التنقل السفلي).
- **خارج النطاق حالياً:** تنفيذ صفحة المنتج وصفحة المجموعة (§12، §13).
- **قاعدة التنفيذ:** مهمة واحدة لكل سكشن، بروابط Figma دقيقة يقدّمها المستخدم قبل كل مهمة.

## 2. مفتاح تصنيف المعلومات

كل معلومة في هذه الوثيقة تحمل أحد هذه التصنيفات:

| الوسم | المعنى |
|---|---|
| **[مستخدم]** | حقيقة أكّدها المستخدم صراحة |
| **[مستودع]** | ملاحظة من فحص الملفات أثناء التدقيق (فحص ثابت، لم يُشغَّل شيء) |
| **[مقترح]** | قرار مقترح لم يُعتمد بعد |
| **[تحقق]** | يحتاج تحققاً قبل الاعتماد عليه |
| **[مؤجل]** | قرار يخص سكشناً بعينه ويُحسم في مهمته |

---

## 3. حقائق أكّدها المستخدم [مستخدم]

- اسم المشروع والمتجر: **AYUM**. الثيم: **Kalles 5.3.0**.
- عُدِّلت إعدادات الثيم يدوياً، وضُبط خط **Almarai** عبر إعدادات الثيم.
- ذكر المستخدم أنه أنشأ `assets/main.css`. الملف أصبح موجوداً منذ الـ commit `ff5e29e` (انظر §4.6).
- **لغة المتجر: العربية** (أكّدها المستخدم في 2026-10-11).
- الصفحة الرئيسية تُربط عبر `templates/index.json`.
- Shopify CLI متصل، والمعاينة يديرها المستخدم.
- **غير مسموح:** `shopify theme dev` و`check` و`push` و`pull`، وأي نشر أو تعديل للمتجر أو git commit أو push، إلا بتفويض صريح.

---

## 4. ملاحظات المستودع من التدقيق [مستودع]

### 4.1 هوية الثيم
- `config/settings_schema.json` ← `theme_info`: Kalles، الإصدار `5.3.0`، المؤلف The4.
- الملف يحتوي تعليقات `//` من الـ vendor. Shopify يقبلها، لكن محلّل JSON الصارم يرفضها.

### 4.2 مسار الرندر
- `layout/theme.liquid` يحسب الاتجاه، ثم يرندر `css-variables` و`js-variables` و`scripts`.
- بعدها يرندر `sections 'header-group'` ثم `content_for_layout` ثم `sections 'footer-group'` ثم `sections 'system-group'` ثم `system-bottom` ثم `structured-data`.
- المجموعات الثلاث تُرندر في كل القوالب. الاستثناء الوحيد `product.only_config` خارج وضع المحرر.
- `layout/password.liquid` لا يرندر هذه المجموعات.

### 4.3 الخطوط والطباعة
- **Almarai مضبوط عبر الإعدادات:**
  - في `config/settings_data.json`: `library_font: "shopify"` و`font_family_shopify_1: "almarai_n4"`.
  - في `snippets/css-variables.liquid` تُحمَّل كل أوزان الخط عبر `font_face` داخل حلقة `variants`، ويُعرَّف `--f_family_1`.
- كلٌّ من `font_base` و`font_custom_heading` و`pr_title_font_family` يساوي `--f_family_1`. القيمة الأخيرة أُضيفت في الـ commit `221c45e`.
- `font_family_shopify_2: poppins_n4` و`font_family_shopify_3: libre_baskerville_n4`، و`font_custom_sheading: --f_family_3`.
- **[تحقق]** `hd_fweight: 600`، بينما تستخدم أنماط Figma الأوزان 400 و700 و800 فقط.
- مقاسات العناوين الحالية: `h0_size`..`h6_size` من 64 إلى 16، و`heading_lh: 1.5`، و`body_lh: 1.7`.
- **لا يُعاد تحميل Almarai، ولا تُكتب قيمة `font-family` ثابتة في الكود.**

### 4.4 الاتجاه واللغة
- الإعداد `right_to_left` **غير مُعرَّف** في `settings_schema.json`، فيأخذ دائماً القيمة `enable-with-list`. النتيجة: الصفحة RTL فقط عندما تكون لغة الواجهة ضمن قائمة لغات RTL، والعربية منها.
- ملفات اللغات الموجودة: `en.default` و`de` و`es` و`fr` و`zh-CN` (مع ملفات `.schema.json` لكل منها).
- `locales/ar.json` أُضيف في `d81d7dd` ثم حُذف في `781b2d9`.
- **[مستخدم]** لغة المتجر العربية. **الاستنتاج من الكود:** إذا كانت `request.locale.iso_code` تساوي `ar`، فإن `theme.liquid` يضبط `dir="rtl"` والكلاس `dir--rtl`، ويمرّر `is_rtl: true` إلى `css-variables`. أي أن RTL يأتي من مسار الثيم الأصلي دون فرض يدوي.
- **[تحقق]** تأكيد أن `<html dir="rtl" lang="ar">` يظهر فعلاً على المتجر. هذا فحص تشغيلي لم يُجرَ بعد.
- **[تحقق] خطر:** لا يوجد `locales/ar.json`. لذلك نصوص الواجهة الثابتة في الثيم (مثل أزرار "Add to cart" ورسائل السلة) قد تظهر بالإنجليزية ما لم تُترجم عبر Translate & Adapt أو يُضف ملف ترجمة عربي. هذا قرار منفصل ولا يُنفَّذ ضمن مهمة سكشن.
- **نتيجة لقاعدة الـ skill:** قاعدة الـ skill التي تفترض أن الصفحة LTR افتراضياً لأن `en.default` هي اللغة الافتراضية (§2.6) لا تنطبق كما هي على متجر لغته الأساسية العربية. مع ذلك يُختبر كل سكشن في الاتجاهين، لأن اللغات الأخرى المنشورة (إن وُجدت) ستكون LTR.

### 4.5 نقاط التوقف والحاوية
- نقاط التوقف المهيمنة في CSS: `768px` و`1150px`، وما يقابلهما `767px` و`1149px`. توجد أيضاً قيم قليلة من الـ vendor: 1024 و750 و576 و1350.
- `page_width: 1320` في الإعدادات، وتطابق عرض الحاوية في Figma (1320). القيمة الافتراضية في الـ schema هي 1440.
- `spacing_grid_horizontal` و`spacing_grid_vertical` قيمتهما 30.

### 4.6 تحميل CSS والتعديلات اليدوية
- `css-variables.liquid` يحمّل في نهايته `base.css` و`theme.css` و`product-card.css` و`collection-products.css`.
- كل سكشن يحمّل ملف CSS خاصاً به في أعلاه.
- **Custom CSS على مستوى المنصة** في `config/settings_data.json` ← `platform_customizations.custom_css`، فيه قاعدتان يدويتان يجب الحفاظ عليهما:
  - لون أيقونة wishlist داخل `.hdt-card-product`.
  - لون خلفية `.hdt-badge.hdt-badge__on-sale`.
- **`assets/main.css`:** أُضيف فارغاً في `d81d7dd`، وحُذف في `781b2d9`، ثم **أُعيد إنشاؤه في `ff5e29e`** بحجم 14 بايت، لا يحوي إلا التعليق `/* main.css */`.
  - **[مستودع]** لا يحمّله أي ملف حالياً. لا يوجد أي مرجع له في `layout/` أو `snippets/` أو `sections/`، لذلك أي قاعدة تُكتب فيه الآن **لن تُطبَّق**.
  - **[مؤجل]** مكان تحميله ودوره يُقرَّران عند أول مهمة تحتاجه فعلاً (انظر §9). المقترح: تحميله مرة واحدة بعد `theme.css`، ولقواعد عابرة للصفحات مقيّدة بكلاس فقط.

### 4.7 الإعدادات العامة ذات الصلة
- `show_rating: true`، لكن `snippets/hdt-pr-card-rating.liquid` و`hdt-pr-single-rating.liquid` ملفان فارغان (0 بايت)، فلا تُعرض نجوم.
- **[تحقق]** `show_ultra_btn` و`show_vendor` لم تُقرأ قيمتاهما الفعليتان. ليستا في `settings_data.json`، فهما على الأرجح بالقيمة الافتراضية.
- يوجد 7 color schemes في `settings_data.json`.
- لا يوجد إعداد `custom_class` في أي سكشن. يوجد فقط `style_class` في blocks داخل `sections/cart-drawer.liquid`.

---

## 5. خريطة إطارات Figma

> **اكتُشفت عبر metadata. يلزم تقديم روابط السكاشن الدقيقة وفحص design-context قبل أي تنفيذ.**
> لم يُشغَّل `get_design_context` ولا `get_screenshot` في التدقيق الأولي. فحص الـ metadata لا يثبت تطابقاً بصرياً، والمقاسات هنا مأخوذة من صناديق الـ metadata وليست قيم تصميم معتمدة.

- **ملف Figma:** `7cOVp6r92Z3heL1aTMP5N3`.
- **صفحة الديسكتوب (سياق فقط):** `2001:3`، اسم الإطار `homepage`، بعرض 1440.
- **صفحة الموبايل (سياق فقط):** `2001:581`، اسم الإطار `Mobile / Home`، بعرض **375** (وليس 390).
- **قائمة الموبايل:** `35:309`، اسم الإطار `Mobile Menu`، بعرض 375، وفيها 10 عناصر.

| # | السكشن (اسم الطبقة) | Desktop | Mobile | ملاحظات من الـ metadata |
|---|---|---|---|---|
| 1 | Offer bar (sticky) | `2001:4` | `2001:582` | نص "خصم 10% على أول طلب — كود AYUM10" وزر "انسخ الكود" |
| 2 | Header (sticky) | `2001:8` | `2001:586` | Desktop: سلة، بحث (`2001:15`)، لوجو (`2001:19`). Mobile: سلة، لوجو، burger، وبحث في صف ثانٍ (`2001:608`) |
| 3 | Category nav | `2001:21` | — | 10 روابط (`2001:22`). على الموبايل تُعرض داخل القائمة `35:309` |
| 4 | Mobile menu | — | `35:309` | 10 روابط بفواصل |
| 5 | Hero slider | `2001:33` | `2001:612` | الشريحة 1 من 3 فقط مصمَّمة. Desktop: زرّان (`2001:41`)، أسهم (`2001:50`)، نقاط (`2001:46`). Mobile: زر واحد، والنص في أعلى الصورة (`2001:615`). اسم الطبقة يذكر autoplay 6s |
| 6 | Categories | `2001:55` | `2001:626` | 4 بطاقات. نقاط على Desktop (`2001:76`)، وتمرير أفقي مع snap على Mobile |
| 7 | Best sellers (tabs) | `2001:80` | `2001:647` | 3 تبويبات. 4 بطاقات على Desktop، وعرض بطاقتين على Mobile. شريط تقدّم (`2001:154`) |
| 8 | Bundles | `2001:156` | `2001:721` | 4 بطاقات عمودية على Desktop. Mobile: بطاقة أفقية (الصورة بجانب النص) في carousel |
| 9 | About the brand | `2001:230` | `2001:749` | صورة، "قصتنا"، عنوان، فقرة، 3 إحصاءات |
| 10 | How we freeze-dry | `2001:250` | `2001:765` | عنوان، عنوان فرعي، شارات ادعاءات (claim chips)، 3 خطوات بأيقونات |
| 11 | Reviews | `2001:316` | `2001:826` | ملخص النجوم، 3 بطاقات على Desktop، 1 على Mobile، شارة "شراء موثّق" |
| 12 | Product videos (shoppable) | `2001:366` | `2001:861` | 5 بطاقات فيديو 9:16 على Desktop. Mobile: بطاقة نشطة في الوسط مع peek |
| 13 | FAQ | `2001:446` | `2001:911` | أكورديون، أول عنصر مفتوح |
| 14 | Newsletter | `2001:472` (**مخفي**) | — | خارج النطاق ما لم يُطلب |
| 15 | Footer | `2001:483` | `2001:942` | Mobile: مجموعات روابط بأكورديون، أيقونات دفع، روابط قانونية. محوِّل اللغة مخفي |
| 16 | Bottom nav (sticky) | — | `2001:1034` | 4 عناصر: حسابي، السلة، التصنيفات، الرئيسية |

## 6. رموز التصميم (من `get_variable_defs` على `2001:3`) [مستودع]

> القيم مقروءة من متغيرات Figma على مستوى الصفحة. يجب التحقق منها لكل عقدة سكشن عند التنفيذ.

- **ألوان العلامة:**
  - `Brand/Primary` `#26B3D0`
  - `Brand/Pink` `#EA3A79`
  - `Brand/Orange` `#E78333`
  - `Brand/Green` `#B6D561`
  - `Brand/Honey` `#F2B640`
  - `Brand/Yellow 40%` `#EFD678`
  - `Colors/Yellow` `#FFCC00`
- **الألوان المحايدة:**
  - `Neutral/Ink` `#26383A`
  - `Neutral/Text` `#4E6E70`
  - `Neutral/Muted` `#6E8788`
  - `Neutral/Surface` `#E4EDF0`
  - `Neutral/Border` `#D3E3E8`
  - `Neutral/White` `#FFFFFF`
- **الظل:** `shadow 1` = DROP_SHADOW بلون `#00000024`، وإزاحة (0, 2)، ونصف قطر 8.
- **الطباعة:** كل الأنماط بخط Almarai، بأوزان 400 و700 و800. أمثلة:
  - `Display/ExtraBold 46 (140%)`
  - `Heading/ExtraBold 26`
  - `Title/Regular 17 (175%)`
  - `Body/Regular 14 (180%)`
- **[تحقق]** بعض أسماء أنماط Figma لا تطابق قيمها، مثلاً `Body/Regular 13` قيمتها 18px و`Display/ExtraBold 30` قيمتها 36px. **تُعتمد القيم لا الأسماء.**
- **[تحقق]** متغيرات الشفافية، مثل `Brand/Primary 15%` و`Neutral/White 60%`، تعيد لون hex الأساسي دون نسبة الشفافية. تُقرأ النسبة من design-context.

---

## 7. تعارضات حالة المستودع مع الـ skill [تحقق]

> تبقى قواعد العمل في الـ skill سارية، لكن ادعاءاته عن حالة المستودع التالية **لا تطابق الواقع**. لا تُعتمد في التنفيذ، ولا تُحمل أعمال سابقة (H5/H7/H8) إلى حالة المشروع الحالية. تصحيح الـ skill قرار يعود للمستخدم.

| ادعاء الـ skill | الملاحظة الفعلية |
|---|---|
| اسم المستودع `ayum-store` | المسار `D:\Shopify\Ayum` |
| `AYUM_PROJECT_PLAN.md` موجود (§24) | لم يكن موجوداً. هذه الوثيقة أُنشئت بتعليمات المستخدم |
| `locales/ar.json` موجود | محذوف في `781b2d9` |
| `snippets/ayum-money.liquid` مربوط بـ `card-price` و`price` و`line-item-price`، و`formatMoney` معدَّل | **غير موجود**، و`assets/utilities.js:191-239` كود أصلي |
| `assets/custom-general.css` | غير موجود |
| `.claude/skills/kalles-figma-to-sections-workflow/` | غير موجود |
| أعمال H5 (About) وH7 (Reviews) وH8 (Product Videos) | لا يوجد أي ملف أو أثر لها في المستودع |
| El Messiri خط عام (§25) | الخط الفعلي Almarai (`font_family_shopify_1`) |
| إطارات الموبايل 390 | العقدة `2001:581` عرضها 375 |
| `<hdt-video-player>` الأصلي بدون `autoplay` | `blocks/_product-video.liquid` يضع `autoplay` ثابتاً |
| `hdt-pr-card-rating` فارغ، وRyviu معطَّل | **مطابق** للواقع |
| ملفات `*.min.js` مولَّدة، و`custom.js` قابل للتعديل | مطابق، ولم يُتحقَّق منه بعمق |

---

## 8. الحفاظ على البيانات والتعديلات اليدوية

القواعد العامة في الـ skill (§7 و§19). هذه العناصر الخاصة بـ AYUM يجب الحفاظ عليها:

- إعدادات الثيم المعدَّلة يدوياً في `config/settings_data.json`: الخطوط، و`pr_title_font_family`، و`page_width`، و`platform_customizations.custom_css`. **لا تُعدَّل يدوياً.**
- الـ instances الحالية في `templates/index.json` والمجموعات الثلاث: لا تُحذف ولا يُعاد ترتيبها دون موافقة صريحة، حتى لو كانت demo.
- القالبان المخصصان `templates/product.custom-ayum.json` و`templates/collection.custom-ayum.json`.
- كود ترخيص The4 (`purchase_code` والكتلة المرتبطة في `custom.js`): لا يُلمس ولا يُطبع.
- **[مقترح]** تغيير نوع أي سكشن (مثلاً من `header-inline-blocks` إلى `header-menu-bottom-blocks`) يفقد إعدادات الـ instance. لا يتم إلا بموافقة صريحة في مهمته.

## 9. استراتيجية التنسيق [مقترح]

- **قيم تعتمد على Liquid أو إعدادات الـ instance:** كتلة `{% style %}` مقيّدة بـ `#shopify-section-{{ section.id }}`.
- **قواعد مشتركة بين كل instances سكشن:** ملف CSS الخاص بالسكشن، الذي يُحمَّل في أعلاه.
- **قواعد خاصة بـ instance من سكشن مشترك:** ملف asset يُحمَّل بشرط وجود كلاس مخصص، وكل selector مسبوق بذلك الكلاس.
- **ملف overrides عام:** المرشح هو `assets/main.css` (موجود لكنه غير محمَّل). أما `custom-general.css` فغير موجود. ربط `main.css` بمسار التحميل يُقرَّر ويُفوَّض عند أول حاجة فعلية. **[مؤجل]**
- **ممنوع:** تعديل `base.css` أو `theme.css` أو أي ملف `*.min.*` أو `settings_data.json`.
- **الكلاس المخصص:** إضافة إعداد `custom_class` إضافةً، بقيمة فارغة افتراضياً، في كل سكشن تمسّه مهمة، مع إثبات أنه خامل على الـ instances الحالية.
- **الألوان:** تُستخدم color schemes الموجودة. عند عدم المطابقة يُضاف إعداد لون مقيّد قيمته الافتراضية لون Figma. لا يُعدَّل scheme مشترك.

---

## 10. الصفحة الرئيسية — ما يملكه `templates/index.json`

### 10.1 الـ instances الحالية [مستودع]

كلها محتوى **demo** من Kalles (أزياء)، ولا يوجد فيها سكشن معطَّل:

| الترتيب | Instance ID | النوع | Blocks | ملاحظة |
|---|---|---|---|---|
| 1 | `slideshow_EVrUzi` | `slideshow` | `_slide-item` ×3 | صور demo |
| 2 | `collections_list_manual_eErqxt` | `collections-list-manual` | `_collection_manual-item` ×4، و`section-heading` معطَّل | مجموعات women/accessories/watch/footwear |
| 3 | `featured_collection_PTq36A` | `featured-collection` | `_product-grid` و`section-heading` | المجموعة `women`، `product_des: 1` |
| 4 | `banner_VyWanM` | `banners` | `_banner-item` ×2 | **غير موجود في تصميم AYUM** |
| 5 | `featured_collection_CKUpWw` | `featured-collection` | `_product-grid` و`section-heading` | المجموعة `featured` |
| 6 | `blog_post_DcUjga` | `blog-post` | `_article-carousel` | **غير موجود في التصميم** |
| 7 | `lookbook_carousel_VeWgrg` | `lookbook-carousel` | `_lookbook` ×8 | **غير موجود في التصميم** |
| 8 | `shipping_9pXycT` | `shipping` | `_shipping` ×4 | مرشّح لسكشن "كيف نجفّف" |
| 9 | `1755067183c661e3bf` | `apps` | — | نقطة ربط للتطبيقات، يُحافظ عليها |

**[مؤجل]** مصير سكاشن الـ demo غير الموجودة في التصميم (4 و6 و7) يُقرَّر بموافقة المستخدم. لا تُحذف تلقائياً.

### 10.2 تحليل سكاشن الصفحة الرئيسية

> المرشحون فُحصوا فحصاً ثابتاً (schema وأجزاء من الـ markup). استراتيجيات إعادة الاستخدام **مبدئية** حتى يُفحص design-context وتُختبر القوالب فعلياً.

| السكشن | الحالي | المرشح الأقرب (فُحص) | استراتيجية مبدئية [مقترح] | المحتوى | قرارات [مؤجل] / [تحقق] |
|---|---|---|---|---|---|
| Hero | `slideshow_EVrUzi` | `sections/slideshow.liquid` + `blocks/_slide-item.liquid`: فيه `image_mb` (عبر `<source>` تحت 767)، و`autoplay` من 0 إلى 7s، و`navUI`، و`dotUI`، و`content_position[_mb]`، و`button_custom.hide_on_mobile` | إعادة استخدام الـ instance كما هو، مع CSS مقيّد لشارة الـ pill والأزرار | blocks + `image_picker` | الشريحتان 2 و3 غير مصمَّمتين. الإعدادان `carousel_center` و`rounded` مستخدمان في الكود وغير موجودين في الـ schema (لا ضرر منهما) |
| Categories | `collections_list_manual_eErqxt` (masonry/grid، بدون slider) | `sections/collections-list.liquid` (`layout_mode: carousel`، `<hdt-slider>`) + `_collection_item` + `snippets/collection-item.liquid` | إعداد إضافي لألوان البطاقة والعنوان على `_collection_item`، وCSS لشريط العنوان تحت الصورة | collection pickers | استبدال الـ instance أم إضافة جديد؟ `col_mb` لا يدعم 1.5 للـ peek. [تحقق] العنوان معروض حالياً فوق الصورة (`hdt-absolute`) |
| Best sellers | لا يطابق | `sections/tabs-collection.liquid` + `_tab-collection` ← `_product-carousel` (`col_dk` 4، `col_mb` 2) | كما هو + CSS مقيّد | collections | رقم البطاقة (§14). التقييم محجوب (§19). [تحقق] فاصلة زائدة في نهاية schema الـ `_tab-collection` |
| Bundles | غير مربوط | `_product-carousel`، أو `featured-collection-2` ← `_product-list` (لا يعرض السعر المقارن، والزر رابط لا إضافة للسلة)، أو `card-product-list.liquid` | امتداد آمن لعرض العنوان الفرعي (مثل metafield)، وبطاقة أفقية على Mobile | products | مصدر "6 منتجات · 300 جم". هل الباكتات منتجات فعلية؟ |
| About | غير مربوط | `sections/custom-section.liquid` ← `_multi_column` + `_media` + heading/text + `_counter` (`unit` لاحقة فقط) | كما هو + CSS | blocks | البادئة "+" مع RTL [تحقق]. الأرقام التسويقية تحتاج تأكيد المستخدم |
| How we freeze-dry | `shipping_9pXycT` (demo) | `sections/shipping.liquid` + `_shipping` (`icon_themes`، `image_icon`، `icon` SVG)، أو `icon-box` | CSS مقيّد لمربع الأيقونة الملوّن | blocks | طريقة تنفيذ الشارات (claim chips): blocks نصية أم block صغير جديد |
| Reviews | غير مربوط | `sections/testimonial_section.liquid` + `_testimonial_item` (`rating`، `title`، `pos`، `image_avata`) | إعدادات إضافية: شراء موثّق، منتج | **شهادات يدوية** | لا محتوى مُختلَق. ملخص "4.8 من 5 · +400" ادعاء يحتاج مصدراً |
| Product videos | غير مربوط | `sections/product-video.liquid` + `blocks/_product-video.liquid` (Shoppable Video) | إضافي: `btn-ultra`، تسمية، `col_dk` 5، توسيط على Mobile | blocks + products | **`autoplay` ثابت في الكود** ويتعارض مع قاعدة عدم التشغيل التلقائي. [تحقق] `navUI` معرَّف كنص |
| FAQ | غير مربوط | `sections/accordion.liquid` + `_accordion-item` (`open`، أيقونة +/−، FAQ schema) | كما هو | blocks | — |

## 11. المناطق المشتركة — ما تملكه مجموعات السكاشن

> كل تغيير هنا **يمس كل الصفحات**. كل منطقة مهمة مستقلة، ولا تُدرج في `index.json` لمحاكاة التصميم.

### 11.1 الـ instances الحالية [مستودع]

| المجموعة | Instance | النوع | الحالة |
|---|---|---|---|
| `sections/header-group.json` | `announcement_bar_QKnWCh` | `announcement-bar` | نص demo إنجليزي، `close_btn: "1"` |
| | `header_inline_blocks_xePFbC` | `header-inline-blocks` | `logo_left`، `search_type: icon`، `sticky_type: on_scroll_up`، `_mega_block` ×6، `_menu_mobile` |
| | `custom_liquid_BCTxT9` | `custom-liquid` | مبدّل demo للثيمات (يعتمد على `pages['demos']`) |
| `sections/footer-group.json` | `footer_KwXhWr` | `footer` | 5 أعمدة (منها عمود Newsletter)، `collapse: true` |
| | `footer_ziwVXA` | `footer` | عمودان: حقوق demo، وقائمة `footer-menu-bottom` |
| `sections/system-group.json` | `cart-drawer` | `cart-drawer` | مفعَّل |
| | `toolbar-mobile` | `toolbar-mobile` | **disabled** |
| | `exit_popup_AH3cpU`، `cookies_8EMjkp`، `newsletter_modal_Gxkjz4` | — | **disabled** |

### 11.2 تحليل المناطق المشتركة

| المنطقة | المرشح (فُحص) | استراتيجية مبدئية [مقترح] | فجوات / [تحقق] |
|---|---|---|---|
| شريط العرض | `sections/announcement-bar.liquid`، وعنصر النسخ `<wrapp-hdt-copy-btn>` (مستخدم في `snippets/share-buttons.liquid`) | إعداد إضافي (كود الخصم + زر نسخ) + CSS مقيّد | الشريط غير sticky (فقط `.hdt-section-header` sticky). [تحقق] سلوك تبديل النص في `CopyButton` |
| الهيدر + شريط الفئات | `sections/header-menu-bottom-blocks.liquid` (`logo_left` + `big_form` + صف `.hdt-bottom-header` للديسكتوب) | تبديل نوع السكشن (**يفقد الإعدادات**) + CSS مقيّد. صف البحث على الموبايل يحتاج امتداداً | لا يوجد صف بحث على الموبايل في أي هيدر. [تحقق] ترتيب العناصر في RTL. [مؤجل] مصير `custom_liquid_BCTxT9` |
| قائمة الموبايل | `blocks/_menu_mobile.liquid` (`snippets/menu_mobile.liquid` غير مستخدم) | قائمة مسطّحة عبر `main_menu_mobile`، وCSS مقيّد لإخفاء التبويب والبحث وما في الأسفل، والرابط الأول وردي | رابط Search لا يُخفى بإعداد. إخفاء الحساب أو wishlist يخفي أيقونات الهيدر أيضاً |
| الفوتر | `sections/footer.liquid` + `blocks/_footer-column.liquid` (`_payment_icons`، `socials`، `_footer-image`، `_linklist`، أكورديون الموبايل `only_mobile`) | إعدادات + محتوى + CSS مقيّد | إزالة عمود النشرة، وإضافة صف أيقونات الدفع. [تحقق] رندر `_payment_icons` |
| التنقل السفلي | `sections/toolbar-mobile.liquid` (blocks: `home`، `account`، `cart`، `nav`، `link`، وغيرها، ولكلٍّ `title`) | تفعيل + blocks + CSS مقيّد | "التصنيفات": `nav` أم `link`؟ [تحقق] ترتيب RTL وتداخله مع `--sticky-atc` |

## 12. صفحة المنتج — خارج النطاق حالياً

- القالب المخصص الموجود: `templates/product.custom-ayum.json` (`main-product` مع blocks `_product-*`).
- لا تنفيذ حتى تُقدَّم عقد Figma خاصة بصفحة المنتج ويُفوَّض العمل صراحة.

## 13. صفحة المجموعة — خارج النطاق حالياً

- القالب المخصص الموجود: `templates/collection.custom-ayum.json`.
- لا تنفيذ حتى تُقدَّم عقد Figma خاصة ويُفوَّض العمل صراحة.

---

## 14. استراتيجية بطاقات المنتج [مقترح / تحقق]

**ملاحظات المستودع:**
- البطاقات الموجودة: `card-product1..12`، و`card-product-list`، و`card-product-discount1..3`.
- خيارات `product_des` في schema كلٍّ من `_product-carousel` و`_product-grid` من 1 إلى 11. الكود في `_product-carousel` يحتوي فرعاً لـ `12`، لكن الـ schema لا يعرضه.
- المكوّنات المشتركة: `card-product-media`، و`card-price` (← `price`)، و`badges`، و`hdt-pr-card-rating` (فارغ)، و`btn-ultra` (مشروط بـ `settings.show_ultra_btn`).

**المقترح:**
- المرشحون المبدئيون لتصميم "زر إضافة للسلة بعرض كامل أسفل المعلومات" هم البطاقات **6 و7 و9**، لأن `btn-ultra` فيها داخل منطقة المعلومات.
- يُختار رقم واحد في مهمة Best sellers بعد فحص الـ markup الكامل، ويُعاد استخدامه في Bundles وفي البطاقات المرتبطة بالفيديو.
- لا يُخترع رقم بطاقة جديد، ولا يُستولى على خيار موجود.

## 15. استراتيجية الـ Sliders [مقترح]

- الاعتماد حصراً على `<hdt-slider>` الأصلي ومكوّناته. لا مكتبة جديدة.
- أعداد الشرائح تأتي من `col_dk` و`col_tb` و`col_mb`.
- الـ peek والتوسيط يكونان عبر إعدادات Embla في سمة `config`، أو CSS مقيّد بالسكشن. **[تحقق]** في كل مهمة.
- شريط التقدّم في التصميم: أقرب خيار أصلي هو `pag_style: full`، وهو مقاطع بسُمك 3px. شريط تقدّم حقيقي يتطلب JS جديداً. **[مؤجل]**
- لا يُحوَّل grid إلى slider ولا العكس إلا كما في التصميم.

## 16. استراتيجية المحتوى والبيانات [مقترح]

- **الصور:** عبر `image_picker`، مع `image_mb` يرجع إلى صورة الديسكتوب عند غيابه، و`placeholder_svg_tag` للحقول الفارغة. لا تُضمَّن صور Figma ولا روابط أصولها في أي ملف.
- **المنتجات والمجموعات والقوائم:** عبر pickers وقوائم المتجر. أسماء المنتجات وأسعارها وعملة "د.ك" وتقييماتها في Figma **ليست بيانات حقيقية**.
- **الشهادات اليدوية** (testimonials) منفصلة عن **تقييمات المنتجات من تطبيق**. لا تُختلق مراجعات ولا ادعاءات تسويقية: "+400"، و"4.8"، و"100% تصنيع كويتي"، و"أول مصنع في الكويت" كلها تحتاج تأكيد المستخدم.
- **نصوص الواجهة:** نصوص التاجر عبر إعدادات الـ schema، ونصوص الثيم الثابتة عبر مفاتيح ترجمة، مع مطابقة أسلوب الملف المعدَّل (`t:` أو نص صريح).

## 17. ترتيب التنفيذ المقترح [مقترح]

**أولاً: قرارات مشتركة تُحسم مبكراً.** الاتجاه واللغة (§20)، وأوزان الخط، ومكان ملف التنسيق عند أول حاجة.

**المرحلة A: سكاشن `index.json`، وهي الأقل خطراً.**
1. Hero
2. Categories
3. Best sellers (يُحسم فيها رقم البطاقة)
4. Bundles
5. About
6. How we freeze-dry
7. Reviews
8. Product videos
9. FAQ

**المرحلة B: المناطق المشتركة**، كل منها مهمة مستقلة لأنها تمس كل الصفحات:
10. شريط العرض
11. الهيدر وشريط الفئات (الأعلى خطراً)
12. قائمة الموبايل
13. الفوتر
14. التنقل السفلي

## 18. المهمة الأولى المقترحة [مقترح]

**Hero Slideshow:**
- **النطاق:** الـ instance `slideshow_EVrUzi` فقط.
- **الأساس:** `sections/slideshow.liquid` + `blocks/_slide-item.liquid` كما هما، مع ضبط الإعدادات وCSS مقيّد.
- **الملفات المحتملة:** `sections/slideshow.liquid` (إضافة `custom_class` وتحميل مشروط)، وإعدادات الـ instance في `index.json`. ملف CSS جديد **فقط** إن لم تكفِ كتلة `{% style %}`.
- **المطلوب قبل البدء:** روابط دقيقة للعقدتين `2001:33` (Desktop) و`2001:612` (Mobile) وعقد الشريحتين 2 و3 إن وُجدتا، وجواب سؤال الاتجاه (§20).

---

## 19. التكاملات [مستودع / تحقق]

- **التقييمات:**
  - `snippets/hdt-pr-card-rating.liquid` و`hdt-pr-single-rating.liquid` فارغان.
  - Ryviu معلَّق في `snippets/hdt-pr-single-review.liquid`.
  - لم يُعثر على أي تطبيق تقييمات نشط في كود الثيم. نجوم بطاقات المنتج **محجوبة** حتى يُحدَّد التطبيق.
  - `snippets/rating_star.liquid` موجود، وتستخدمه الشهادات.
- **Wishlist/Compare:** مسارات ecomrise في `assets/custom.js` (`/apps/ecomrise/...`) مع بديل `localStorage`. لا يُعاد ربطها.
- **سكشن التطبيقات** `1755067183c661e3bf` (`apps`) في `index.json`: يُحافظ عليه.
- **العملة:** عرضها فقط (`assets/hdt-currencies.js`). Shopify هو مصدر المبالغ المدفوعة.
- **[تحقق]** وجود الـ metafields وتطبيقات الاشتراكات لم يُفحص في هذا التدقيق.

## 20. الأسئلة المفتوحة والعوائق

### 20.1 أسئلة أساسية
1. ~~لغة المتجر~~ **حُسم في 2026-10-11:** العربية [مستخدم]. يبقى للتحقق: ظهور `dir="rtl"` فعلاً على المتجر، وغياب `ar.json` الذي يؤثر على نصوص الواجهة الثابتة (§4.4).
2. **[مؤجل] `assets/main.css`:** الملف موجود (`ff5e29e`) لكنه غير محمَّل. يُقرَّر مكان تحميله عند أول حاجة (§4.6، §9). ليس عائقاً.
3. **[مؤجل] ترجمة نصوص الواجهة العربية:** هل تتم عبر Translate & Adapt أم بملف `locales/ar.json`؟ ليس عائقاً لأول مهمة.

### 20.2 قرارات مؤجلة إلى سكاشنها
- رقم بطاقة المنتج (Best sellers).
- تطبيق التقييمات (Best sellers، Bundles).
- مصدر العنوان الفرعي للباكتات (Bundles).
- التشغيل التلقائي للفيديو (Product videos).
- تبديل نوع الهيدر ومصير `custom_liquid_BCTxT9` (Header).
- مصير سكاشن الـ demo غير الموجودة في التصميم (§10.1).
- كود الخصم الفعلي وسلوك sticky (شريط العرض).
- صحة الأرقام التسويقية (About، Reviews).
- معالجة `hd_fweight: 600` (الطباعة).
- `layout/password.liquid`: هل يطابق التصميم؟

### 20.3 مخاطر معروفة
- تبديل نوع سكشن يفقد إعدادات الـ instance.
- `shopify theme pull` قد يستبدل الـ JSON المعدَّل محلياً.
- ادعاءات الـ skill غير المطابقة للواقع (§7) قد تُضلّل المهام القادمة إن لم تُتحقَّق.

## 21. أدلة التدقيق وحدوده

- **ملفات فُحصت:**
  - `layout/theme.liquid`
  - `templates/index.json`
  - `sections/header-group.json` و`footer-group.json` و`system-group.json`
  - `config/settings_schema.json` (`theme_info`، `page_width`)
  - `config/settings_data.json` (الخطوط، `platform_customizations`، `show_rating`)
  - `snippets/css-variables.liquid` و`scripts.liquid`
  - قيم `@media` في ملفات CSS
  - schemas السكاشن المرشحة
  - `blocks/_product-grid.liquid` و`_product-carousel.liquid` و`_product-video.liquid`
  - `snippets/hdt-pr-*rating*.liquid`
  - سجل git لـ `assets/main.css` و`locales/ar.json`
  - إضافة إلى ذلك، تقريرا وكيلين للقراءة فقط عن المناطق المشتركة وسكاشن المحتوى، مع أدلة بأرقام الأسطر. تحقّقتُ مباشرة من بعض ادعاءاتهما: `autoplay`، وفرع البطاقة 12، و`show_rating`.
- **Figma:**
  - `get_metadata` على `2001:3` و`2001:581` و`35:309`.
  - `get_variable_defs` على `2001:3`.
  - **لم يُشغَّل** `get_design_context` ولا `get_screenshot`. صور المستخدم المرفقة سياق بصري فقط.
- **فحوص شُغِّلت:** grep، و`git log/status`، وتحليل JSON للقراءة فقط عبر node.
- **Not run:** `shopify theme check` و`shopify theme dev`، وأي QA تشغيلي أو بصري أو responsive أو RTL/LTR أو للسلة أو الفيديو أو دورة حياة محرر الثيم.
- **لا يُدّعى تطابق بصري أو جاهزية للإنتاج** بناءً على هذا التدقيق.

---

## 22. متتبّع الحالة

**قيم الحالة:**
- فحص Figma: `Metadata only` ← `Design-context inspected`
- التنفيذ: `Not started` ← `In progress` ← `Implemented`
- QA: `Not run` ← `Partial` ← `Verified`. يتطلب `Verified` فحصاً فعلياً للديسكتوب والموبايل وRTL.

| # | المهمة | النطاق | Figma (D / M) | فحص Figma | التنفيذ | QA | ملاحظات |
|---|---|---|---|---|---|---|---|
| H1 | Hero | index | `2001:33` / `2001:612` | Metadata only | Not started | Not run | المهمة الأولى المقترحة |
| H2 | Categories | index | `2001:55` / `2001:626` | Metadata only | Not started | Not run | — |
| H3 | Best sellers (tabs) | index | `2001:80` / `2001:647` | Metadata only | Not started | Not run | قرار البطاقة؛ التقييم محجوب |
| H4 | Bundles | index | `2001:156` / `2001:721` | Metadata only | Not started | Not run | يعتمد على H3 |
| H5 | About the brand | index | `2001:230` / `2001:749` | Metadata only | Not started | Not run | لا علاقة له بـ "H5" المذكور في الـ skill |
| H6 | How we freeze-dry | index | `2001:250` / `2001:765` | Metadata only | Not started | Not run | — |
| H7 | Reviews | index | `2001:316` / `2001:826` | Metadata only | Not started | Not run | محتوى حقيقي فقط |
| H8 | Product videos | index | `2001:366` / `2001:861` | Metadata only | Not started | Not run | قرار التشغيل التلقائي |
| H9 | FAQ | index | `2001:446` / `2001:911` | Metadata only | Not started | Not run | — |
| S1 | Offer / announcement bar | **مشترك: كل الصفحات** | `2001:4` / `2001:582` | Metadata only | Not started | Not run | header-group |
| S2 | Header + category nav | **مشترك: كل الصفحات** | `2001:8` + `2001:21` / `2001:586` | Metadata only | Not started | Not run | الأعلى خطراً |
| S3 | Mobile menu | **مشترك: كل الصفحات** | — / `35:309` | Metadata only | Not started | Not run | يعتمد على S2 |
| S4 | Footer | **مشترك: كل الصفحات** | `2001:483` / `2001:942` | Metadata only | Not started | Not run | footer-group |
| S5 | Mobile bottom nav | **مشترك: كل الصفحات** | — / `2001:1034` | Metadata only | Not started | Not run | system-group |
| — | Newsletter | خارج النطاق | `2001:472` (مخفي) / — | Metadata only | — | — | مخفي في Figma |

## 23. سجل التنفيذ

> **لم يُنفَّذ أي سكشن حتى الآن.** لا توجد إدخالات تنفيذ.

### 2026-10-11 — التدقيق الأولي والتخطيط (للقراءة فقط)
- **النوع:** تدقيق وتخطيط، وليس تنفيذاً.
- **ما تم:**
  - تدقيق ثابت للمستودع.
  - فحص metadata لعقد Figma `2001:3` و`2001:581` و`35:309`، وفحص المتغيرات على `2001:3`.
  - إنشاء هذه الوثيقة بتعليمات صريحة من المستخدم.
- **الملفات المعدَّلة:** `AYUM_PROJECT_PLAN.md` فقط (إنشاء). لم يُعدَّل أي ملف ثيم.
- **فحوص مُشغَّلة:** grep، وgit log/status، وتحليل JSON للقراءة فقط.
- **Not run:** `shopify theme check` و`dev`، والفحص البصري، وفحوص runtime وresponsive وRTL/LTR، ومحرر الثيم.
- **الخطوة التالية:** بانتظار اختيار المستخدم للمهمة الأولى وتقديم روابط العقد الدقيقة.

### 2026-10-11 — تحديث الخطة (توثيق فقط)
- أكّد المستخدم أن لغة المتجر العربية. حُدِّثت §3 و§4.4 و§20.
- رُصد أن `assets/main.css` أُعيد إنشاؤه في `ff5e29e` (تعليق فقط، غير محمَّل). حُدِّثت §4.6 و§9.
- لم يُعدَّل أي ملف ثيم، ولم يُنفَّذ أي سكشن.
