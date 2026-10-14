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
| H1 | Hero | index | `2001:33` / `2001:612` | Design-context inspected | Implemented | Partial | `sections/ayum-slideshow.liquid` + `assets/dev1.css`؛ الصور يرفعها التاجر. QA في harness محلي فقط، لا على المتجر |
| H2 | Categories | index | `2001:55` / `2001:626` | Design-context inspected | Implemented | Partial | `sections/ayum-collections-list.liquid` + `blocks/_ayum-collection-item.liquid` + `dev1.css`؛ المجموعات والصور يختارها التاجر |
| H3 | Best sellers (tabs) | index | `2001:80` / `2001:647` | Metadata only | Not started | Not run | قرار البطاقة؛ التقييم محجوب |
| H4 | Bundles | index | `2001:156` / `2001:721` | Metadata only | Not started | Not run | يعتمد على H3 |
| H5 | About the brand | index | `2001:230` / `2001:749` | Design-context inspected | Implemented | Partial | `sections/ayum-image-text.liquid` (نسخة Image with text) + `blocks/_ayum-image-text-col` و`_ayum-stats` و`_ayum-stat` + `dev1.css`؛ Color Scheme 4؛ الصورة يرفعها التاجر. QA على الـ preview الحي (theme dev) |
| H6 | How we freeze-dry | index | `2001:250` / `2001:765` | Design-context inspected | Implemented | Partial | `sections/ayum-icon-box.liquid` (نسخة Icon box) + `_ayum-icon-box` و`_ayum-claims` و`_ayum-claim` + `snippets/ayum-icons.liquid` + `dev1.css`؛ Color Scheme 2 + Background opacity 0 + Subheading color؛ QA على صفحة ملتقطة، لا preview حي لهذا الـ worktree |
| H7 | Reviews | index | `2001:316` / `2001:826` | Metadata only | Not started | Not run | محتوى حقيقي فقط |
| H8 | Product videos | index | `2001:366` / `2001:861` | Metadata only | Not started | Not run | قرار التشغيل التلقائي |
| H9 | FAQ | index | `2001:446` / `2001:911` | Metadata only | Not started | Not run | — |
| S1 | Offer / announcement bar | **مشترك: كل الصفحات** | `2001:4` / `2001:582` | Design-context inspected | Implemented (زر نسخ الكود) | Partial | `sections/ayum-announcement-bar.liquid` + `assets/ayum-copy-code.js` + `dev1.css`؛ QA على HTML الـ preview الحقيقي + أصول حية، لا على المتجر الحي |
| S2 | Header + category nav | **مشترك: كل الصفحات** | `2001:8` + `2001:21` / `2001:586` | Metadata only | Not started | Not run | الأعلى خطراً |
| S3 | Mobile menu | **مشترك: كل الصفحات** | — / `35:309` | Metadata only | Not started | Not run | يعتمد على S2 |
| S4 | Footer | **مشترك: كل الصفحات** | `2001:483` / `2001:942` | Metadata only | Not started | Not run | footer-group |
| S5 | Mobile bottom nav | **مشترك: كل الصفحات** | — / `2001:1034` | Metadata only | Not started | Not run | system-group |
| — | Newsletter | خارج النطاق | `2001:472` (مخفي) / — | Metadata only | — | — | مخفي في Figma |

## 23. سجل التنفيذ

> السكاشن المنفَّذة: H1 (انظر الإدخال أدناه).

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

### 2026-10-13 — H1 Hero slideshow (تنفيذ)
- **Figma:** `get_design_context` + screenshot للعقدتين `2001:33` (1440×540) و`2001:612` (390، البانر 501)، و`get_metadata` للعقدة `2001:33`.
- **القرار المعماري (بتعليمات المستخدم):** نسخة معزولة من `sections/slideshow.liquid` باسم `sections/ayum-slideshow.liquid`، مع إبقاء اسم الـ schema `t:sections.slideshow.name` ("Slideshow") والـ preset الأصلي. الأصل غير معدَّل.
- **إعادة الاستخدام:** `_slide-item` والبلوكات الأصلية (`text_custom` للشارة، و`heading`، و`text`، و`_button_group` + `button_custom` ×2)، و`<hdt-slideshow>` من `global.min.js`، و`slideshow.css`. لم يُنسخ أي block، ولا يوجد JS جديد.
- **الملفات:**
  - جديد: `sections/ayum-slideshow.liquid`. الإضافات على النسخة فقط: تحميل `dev1.css`، والكلاس `ayum-slideshow`، وإعداد `custom_class`، و4 إعدادات ألوان AYUM (accent `#EA3A79`، heading `#26383A`، text `#4E6E70`، dots `#D3E3E8`).
  - جديد: `assets/dev1.css`، وكل قواعده تحت `.ayum-slideshow`. نقاط الكسر 768 فقط (لا 1150 ولا غيرها).
  - معدَّل: `templates/index.json`. أُضيف `ayum_slideshow_hero` أولاً في `order`، و`"disabled": true` على `slideshow_EVrUzi` (بياناته محفوظة). بقية السكاشن متطابقة بايت ببايت (تحقق آلي).
- **المحتوى:** 3 شرائح بنص الشريحة 1. الصور فارغة (placeholder) إلى أن يرفعها التاجر (`image` + `image_mb`). الجزء الوردي من العنوان هو `<strong>` في الـ richtext، ويكون وردياً على الديسكتوب فقط.
- **الإعدادات:** fixed 540 / 500 (الموبايل 500 لأن الـ range يتدرج بـ 10، وFigma = 501)، وautoplay 6s، وloop، وpause on hover، وأسهم rounded/large (52px عبر CSS) مخفية على الموبايل، ونقاط `pag_mgt` 35 (الموبايل 35×0.6 = 21)، و`pag_space` 9 (Figma 9.25).
- **انحرافات موثّقة:**
  - وصف الموبايل في Figma نصه مختلف قليلاً. استُخدم نص الديسكتوب في البريكبوينتين لأن بلوك `text` لا يدعم الإخفاء على الديسكتوب.
  - حجم وصف الموبايل 13px مطبَّق عبر CSS، لأن الـ range الأصلي يتدرج بـ 2.
  - وزن 800 للعنوان مطبَّق عبر CSS، لأن خيارات البلوك تنتهي عند bold.
  - حالة hover للأسهم والأزرار غير مصمَّمة في Figma، فاختيرت قيم من ألوان الهوية.
  - ترتيب النقاط يتبع اتجاه الـ slider الأصلي: Figma الديسكتوب يضع النقطة النشطة يميناً، وFigma الموبايل يضعها يساراً.
- **RTL/LTR:** حاوية الموضع (`.hdt-content-type-container`) مثبّتة LTR حتى يبقى المحتوى يميناً في كل لغة. `.hdt-content-inner` = `direction: rtl; unicode-bidi: isolate`. محاذاة الأزرار والعمود مربوطة بإعداد المحاذاة الأصلي.
- **فحوص مُشغَّلة (Passed):**
  - تحليل JSON لـ schema النسخة (41 إعداداً = 35 أصلياً + 6).
  - تحليل `index.json` ومطابقة كل السكاشن السابقة.
  - `diff` النسخة مع الأصل (إضافات فقط).
  - توازن وسوم `style`/`schema`.
  - لا روابط `figma.com`/`api/mcp`.
  - كل محددات `dev1.css` تحت `.ayum-slideshow`.
  - `git status`: لا تعديل على `slideshow.liquid` أو `_slide-item.liquid` أو `slideshow.css` أو أي `.min.js` أو `settings_data.json` أو `page.women.json`.
- **Not run:** `shopify theme dev/check`، والفحص البصري، وresponsive (320/375/390/767/768/1149/1150/1440)، وRTL في `ar` و`en.default`، والـ autoplay/swipe/النقاط/الأسهم في runtime، و`prefers-reduced-motion` (الـ autoplay من JS الأصلي ولا يمكن إيقافه من CSS)، ومحرر الثيم.

#### 2026-10-13 — متابعة (bugfix): محاذاة الديسكتوب، والتفاف العنوان، ونقاط الموبايل
- **Figma:** أُعيد فحص `2001:36` (design context) و`2001:612` (metadata). إطار الموبايل عرضه 375، وعمود النص 311.
- **السبب الجذري 1 (محاذاة الديسكتوب):**
  - Kalles يعرّف `.hdt-text-right` و`.md:hdt-text-right` كـ `text-align: end` (قيمة منطقية).
  - بعد إعلان `direction: rtl` على `.hdt-content-inner`، صارت `end` تعني اليسار.
  - النتيجة: الصناديق في مكانها الصحيح، لكن السطور داخل الصندوق (520px) ملتصقة باليسار.
  - **الإصلاح:** داخل الحدود RTL، المحاذاة "right" ⇒ `text-align: start`، و"left" ⇒ `end`، و"center" ⇒ `center`، بجانب قيم `align-items` الموجودة.
- **التفاف العنوان:**
  - Figma نفسه يكسر قبل "في الفم" بفقرة منفصلة، فالسطر الثالث كسر صريح وليس نتيجة العرض.
  - **الإصلاح:** `<br/>` قابل للتحرير في الـ richtext، مع تفعيل `hidden_br_mobile` في بلوك العنوان الأصلي.
  - أُضيفت قاعدة scoped تمدّ إخفاء الـ `<br>` حتى 767px، لأن الأصل يتوقف عند 750.
  - على الموبايل يلتف العنوان طبيعياً على سطرين مطابقين لـ Figma.
- **السبب الجذري 2 (نقاط الموبايل يساراً):**
  - قاعدة `slideshow.css` المتداخلة `&.hdt-position-right` (خصوصية 0,4,0) تغلب `justify-content: center` في `dev1.css` (0,3,0).
  - في صفحة RTL، القيمة `flex-end` تعني اليسار.
  - **الإصلاح:** محدد يشمل كلاسات الموضع `:is(.hdt-position-left, .hdt-position-center, .hdt-position-right)`، وتمديد شريط النقاط على كامل البانر (`left/right: 0; width: auto; margin: 0`). أُزيل التكرار من قاعدة الديسكتوب.
- **تعديل بيانات (instance الهيرو فقط):** نص العنوان للشرائح 3 (`<br/>` + `hidden_br_mobile: true`)، و`line_height_mobile` للشارة من 14 إلى 13 (الشارة 23px مثل Figma). بقية السكاشن متطابقة (تحقق آلي).
- **QA مُشغَّل (Passed، في harness محلي):**
  - صفحة تحاكي مخرجات Liquid للسكشن، مع `base.css` و`theme.css` و`slideshow.css` و`dev1.css` الحقيقية، وJS السلايدر الحقيقي (`global.min.js`)، وAlmarai من Google Fonts.
  - العروض: 1440، 1150، 768، 390، 375، 320، في `dir=rtl` و`dir=ltr`.
  - 1440: الصندوق x=800 وinset 120 وy=81، والعنوان y=126 بثلاثة أسطر، والوصف y=337، والأزرار y=414، والنقاط تبعد 126 عن اليمين و35 عن الأسفل.
  - 375: الشارة 83×23، والعنوان y=49 بسطرين، والوصف y=130، والزر 142×31، والنقاط في المنتصف (163/162) و21 عن الأسفل.
  - التفاعل: النقر على النقطة، والسهم التالي، والـ autoplay (6s)، والسحب على الموبايل، كلها تحدّث النقطة النشطة. لا أخطاء في الـ console.
- **Not run:** المتجر الحقيقي، ومحرر الثيم، والصور الحقيقية (الـ harness يستخدم placeholder)، و`shopify theme check`، ولمس حقيقي على جهاز، ونطاق 751–767 بعرض محدد.

#### 2026-10-13 — متابعة (تحقيق): عرض خط Almarai
- **Figma (`get_variable_defs` على `2001:33` و`2001:612`):** Almarai، ExtraBold 800 للعنوان والشارة والزر الأساسي، وBold 700 للزر الثانوي، وRegular 400 للوصف. letter-spacing = 0.
- **إعداد الثيم الحالي (`settings_data.json`):**
  - `library_font: shopify`، و`font_family_shopify_1: almarai_n4`، و`font_base` = `font_custom_heading` = `--f_family_1`.
  - `hd_fweight: 600`. أما `bd_fweight` فغير محفوظ، فيُستخدم الافتراضي 400.
- **تحميل الخط في Kalles:** `css-variables.liquid` يمرّ على `settings.font_family_shopify_1.variants` ويُخرج `font_face` لكل variant. مكتبة خطوط Shopify تُدرج Almarai بـ `almarai_n3 n4 n7 n8` (من توثيق shopify.dev). إذن وجه 800 حقيقي **يجب** أن يُعلَن على المتجر.
- **قواعد Kalles:** لا يوجد `font-smoothing` ولا `font-synthesis` ولا `font-feature-settings` ولا `text-rendering`. الـ letter-spacing يساوي 0. وزن `hdt-font-bold` (700) و`--font-heading-weight` (600) يُغلَبان بقاعدة `dev1.css` (800) على العنوان و`h2` و`strong`.
- **قياس فعلي (harness محلي):**
  - CSS الثيم الحقيقي، مع Almarai من Google Fonts (نفس مصدر مكتبة Shopify، لكنه ليس ملف CDN الخاص بـ Shopify).
  - CDP `CSS.getPlatformFontsForNode` + مقارنة حبر بالبكسل مع renders من Figma.
  - **مع وجه 800 محمَّل:** العنوان مرسوم بـ `Almarai-ExtraBold`، والوصف بـ `Almarai-Regular`، والزر الثانوي بـ `Almarai-Bold`. الحبر مطابق لـ Figma ضمن ~1%: عنوان الديسكتوب 466×179 مقابل 465×183، والموبايل 303×64 مقابل 303×66، والوصف 497×52 مقابل 497×51.
  - **مع وجه 400 فقط:** الـ CSS يبقى `font-weight: 800`، لكن Chrome يرسم `Almarai-Regular`. الحبر أقل بـ ~17%، والكلمات أضيق، والتفاف العنوان يتغيّر. هذا يطابق وصف المشكلة. `document.fonts.check()` أعاد `true` في الحالتين، فلا يصلح دليلاً.
- **الاستنتاج:** لا خطأ في الـ CSS أو الوراثة داخل السكشن. الفرق المرئي على المتجر سببه على الأرجح أن وجه 800 لا يُحمَّل في البيئة التي تمت فيها المقارنة. **غير مؤكَّد على المتجر**، لأن الـ harness لا يستطيع إعادة إنتاج ملفات `fonts.shopifycdn.com` الموقّعة.
- **لم يُعدَّل أي ملف ثيم في هذه المتابعة.**
- **الخطوة التالية:** فحص "Rendered Fonts" في DevTools على صفحة المتجر الفعلية (انظر التقرير). إن ظهر `Almarai-Regular` للعنوان أو غاب طلب `almarai_n8`، فالحل الأصغر هو إعلان `font_modify: 'weight', '800'` داخل `{% style %}` السكشن.

#### 2026-10-13 — متابعة (bugfix): عنوان الهيرو يُرسم بـ Times New Roman على المتجر
- **دليل المستخدم (DevTools على المتجر الحقيقي):** `<h2>` = `TimesNewRomanPS-BoldMT` (ملف محلي، 39 glyph) + `OTS derived font` (6 glyphs).
- **السبب الجذري:**
  - المشكلة في **العائلة** وليست في وزن مفقود. `:where(h1…h6)` في `base.css` يأخذ العائلة من `--font-heading-family`، أي إعداد "Heading font" في الثيم.
  - على المتجر الحي، هذا الـ slot يشير إلى خط لاتيني فقط. على الأرجح `--f_family_3` = Libre Baskerville (`font_family_shopify_3`) مع fallback `serif`.
  - النتيجة: الحروف العربية تسقط إلى Times New Roman (Bold بسبب 800)، والمسافات فقط تُرسم من الـ webfont.
  - في `settings_data.json` بالمستودع `font_custom_heading` = `--f_family_1`، فإعداد المتجر الحي مختلف عن المستودع (drift).
  - الوصف والشارة والأزرار لم تتأثر، لأنها ترث خط الـ **body** (`--font-body-family` = Almarai).
- **إعادة إنتاج مطابقة (harness، heading slot ← Libre Baskerville):** `TimesNewRomanPS-BoldMT` ×39 + `Libre-Baskerville-Bold` (webfont) ×6 عند 375. البصمة نفسها التي أبلغ عنها المستخدم.
- **الإصلاح (`assets/dev1.css` فقط):** `font-family: var(--font-body-family)` على `.ayum-slideshow .hdt-h_custom :is(h1…h6, p, strong, b)`. لم يُضف أي @font-face، لأن أوجه Almarai 300/400/700/800 يُعلنها `css-variables.liquid` أصلاً. لا روابط Google Fonts في الثيم.
- **تحقق (harness، Passed):**
  - Heading slot مكسور وسليم: العنوان والـ strong = `Almarai-ExtraBold`، والوصف = `Almarai-Regular`، والشارة والزر الأساسي = `Almarai-ExtraBold`، والزر الثانوي = `Almarai-Bold`.
  - الحبر مطابق لـ Figma (466×179 مقابل 465×183، و303×64 مقابل 303×66).
  - الهندسة عند 1440 و390 و375 لم تتغير.
- **Not run:** المتجر الحقيقي (لا وصول)، وملفات `fonts.shopifycdn.com` الفعلية، ومحرر الثيم.
- **توصية للتاجر (اختيارية، خارج نطاق هذا السكشن):** مراجعة Theme settings ← Typography ← "Heading font". إن كانت Font 3 (Libre Baskerville)، فكل عناوين h1–h6 العربية في المتجر تُرسم بـ Times New Roman.
- **تصحيح لاحق:** أكّد المستخدم من `theme dev` أن Font 1/2/3 كلها Almarai، وأن قاعدة `dev1.css:122` مطبَّقة، وأن الـ computed هو `Almarai, sans-serif`. فرضية "drift الإعداد" أعلاه **غير صحيحة** (انظر الإدخال التالي).

#### 2026-10-13 — تحقيق: Almarai يُحمَّل (200) لكن الحروف العربية تسقط إلى Times New Roman
- **دليل المستخدم (theme dev):**
  - `almarai_n4/n7/n8` كلها 200. الـ computed = `Almarai, sans-serif`.
  - Rendered Fonts للـ `<h2>`: `TimesNewRomanPS-BoldMT` ×39 + `OTS derived font` ×6.
- **السبب (مُعاد إنتاجه بدقة، وغير مُتحقَّق منه على ملفات Shopify نفسها):**
  - ملفات Almarai التي يقدّمها Shopify على الأرجح لا تحتوي إلا subset لاتيني.
  - Google نفسه يوزّع Almarai كملفين منفصلين لكل وزن: `arabic` و`latin`، لكل منهما `unicode-range`.
  - صفحة تعلن `@font-face` بأسلوب `font_face` في Shopify (ملف لكل وزن، بلا `unicode-range`) بملف Latin فقط أعطت بالضبط: `[webfont] Almarai-ExtraBold ×6 | TimesNewRomanPS-BoldMT ×39`.
  - الـ 6 هي المسافات (موجودة في الـ subset اللاتيني).
  - بملف Arabic: `Almarai-ExtraBold ×45`.
- **النطاق:** ليس الهيرو فقط. في نفس الاختبار رُسم نص الوزن 400 (الوصف) بـ `SegoeUI` ×84، فكل نص عربي بخط Almarai في المتجر غالباً ليس Almarai.
- **حجم 34.5px:** ليس خطأ. `base.css` يعطي `.hdt-h_custom` قيمة `max(46×0.75, 25)` = 34.5 في نطاق 768–1149، و46 فقط من 1150. الـ viewport أثناء الفحص أقل من 1150 (DevTools مفتوح بجانب الصفحة).
- **لم يُعدَّل أي ملف ثيم.**
- **الحل المقترح (بانتظار موافقة المستخدم بعد تشغيل probe التغطية على ملفات Shopify):**
  - رفع ملفات Almarai العربية (OFL) مرة واحدة إلى `assets/`: ~31–33KB لكل وزن، للأوزان 400/700/800.
  - إعلانها بـ `@font-face { font-family: Almarai; unicode-range: <arabic> }`، فيبقى Shopify للاتيني وتتكفّل الملفات المحلية بالعربي، بلا تغيير في أي selector أو إعداد.
  - مكان التحميل يُقرَّر مع المستخدم: `dev1.css` (الهيرو/الهوم فقط) أو تحميل عام (كل الصفحات = تغيير عام).

#### 2026-10-13 — تأكيد ثم إصلاح عام: دعم Almarai العربي على كل المتجر
- **تأكيد السبب (CONFIRMED):** فحص جدول cmap لملفات Shopify الحقيقية `almarai_n4/n7/n8` (من الـ preview، HTTP 200، WOFF2 صالح، أوزان OS/2 = 400/700/800، 212 glyph):
  - **0** نقطة عربية (U+0600–06FF، وPresentation Forms A/B). Basic Latin كامل (95).
  - من نص الهيرو: 1/30 فقط (النقطة).
  - جدول الأسماء بلا سجلات family، وهذا يفسّر "OTS derived font" في DevTools.
- **الملفات المضافة:**
  - `assets/almarai-arabic-400.woff2` (31,672 B)، و`-700` (32,912 B)، و`-800` (33,328 B).
  - المصدر: Google Fonts Almarai v19، subset عربي (fonts.gstatic.com).
  - التحقق: WOFF2 صالح، والأسماء الداخلية "Almarai" Regular/Bold/ExtraBold، وأوزان OS/2 = 400/700/800، و290 glyph. التغطية: 104 (U+0600–06FF) + 59 (FB50–FDFF) + 91 (FE70–FEFF)، و29/30 من نص الهيرو (النقطة من ملف Shopify).
  - `licenses/Almarai-OFL.txt`: من `google/fonts/ofl/almarai`. SIL OFL 1.1، **بلا Reserved Font Name**، فاسم `Almarai` مسموح.
  - `snippets/ayum-arabic-font-face.liquid`: 3 قواعد `@font-face` باسم `Almarai`، وأوزان 400/700/800، و`font-style: normal`، و`font-display: swap`، و`asset_url`، و`unicode-range: U+0600-06FF, U+FB50-FDFF, U+FE70-FEFF`. لا preload.
- **التعديل الوحيد على ملف أصلي:** `layout/theme.liquid`، سطر واحد `render 'ayum-arabic-font-face'` بعد `render 'css-variables'` داخل `{%- liquid %}`.
- **لم يُعدَّل:** `css-variables.liquid`، وإعدادات Typography، و`settings_data.json`، والسكاشن والبلوكات الأصلية، و`dev1.css`، و`password.liquid`.
- **تحقق (harness يحاكي المتجر بملفات Shopify الحقيقية + نص الـ snippet الفعلي، Passed):**
  - بدون الـ snippet: `OTS-derived-font ×6 | TimesNewRomanPS-BoldMT ×39`، وهي بصمة المتجر حرفياً.
  - مع الـ snippet (بعد أو قبل قواعد Shopify، والنتيجة نفسها):
    - العنوان والجزء الوردي والشارة والزر الأساسي = `Almarai-ExtraBold`، والوصف = `Almarai-Regular`، والزر الثانوي = `Almarai-Bold`.
    - h3 بوزن 600 والكلاس bold = `Almarai-Bold`، والنص العادي خارج الهيرو = `Almarai-Regular`.
    - النص اللاتيني = ملف Shopify فقط (×46).
  - الحبر مقابل Figma: 466×179/465×183، و303×64/303×66، و497×52/497×51.
  - هندسة الهيرو عند 1440/390/375 لم تتغير، والـ console نظيف.
- **Not run:** الـ preview الحقيقي بعد الإصلاح (يتطلب مزامنة الملفات الجديدة)، وSafari/Firefox، و`theme check`.

#### 2026-10-13 — متابعة (تحسين): التفاف العنوان، ووصف الموبايل، والمسافات
- **Figma:** أُعيد استخدام قياسات عقد `2001:33` و`2001:612` (metadata/design context).
- **السبب 1، التفاف السطر الأول على الديسكتوب:**
  - السطر الأول كان يعتمد على أن "يكبر" لا تتسع بعد العبارة الوردية داخل 520px. الهامش بضع بكسلات فقط، فيختلف بين البيئات (لقطة المتجر: "يكبر" على السطر الأول).
  - في Figma نفسه السطر الثالث فقرة منفصلة، والتوزيع مقصود.
  - **الحل:** `<br/>` قابل للتحرير بعد العبارة الوردية أيضاً، مع `hidden_br_mobile` (موجود) والقاعدة الممتدة حتى 767px.
- **السبب 2، وصف الموبايل:** Figma يستخدم نصاً مختلفاً على الموبايل. بلوك `text` الأصلي لا يملك "إخفاء على الديسكتوب".
  - **الحل:** بلوك `_liquid` الأصلي ("Liquid - HTML"، مسموح أصلاً في `_slide-item`) يحمل النص داخل عنصر بكلاس `ayum-mobile-only`، وبلوك الوصف الحالي يُفعَّل له "Hide on mobile".
  - **`dev1.css`:**
    - إخفاء `.hdt-hide-mobile` داخل محتوى الهيرو حتى 767px (Kalles يتوقف عند 750).
    - إخفاء غلاف `:has(.ayum-mobile-only)` من 768px.
    - تنسيق وصف الموبايل (13px / 400 / 1.7 / `--ayum-hero-text`) على الغلاف، فلا يعتمد على خيارات حجم البلوك.
  - لا تعديل على أي بلوك أصلي.
- **`templates/index.json` لم يُعدَّل عمداً:** نسخة المتجر فيها صور مرفوعة من محرر الثيم، والنسخة المحلية حقول صورها فارغة. رفع الملف المحلي (مثلاً عبر `theme dev`) سيمسح الصور. تعديلات المحتوى تُنفَّذ من محرر الثيم (انظر التقرير)، أو بعد سحب القالب من المتجر.
- **تحقق (harness يحاكي المتجر: ملفات Shopify اللاتينية الحقيقية + snippet العربي + المحتوى المقترح، Passed):**
  - **التفاف الأسطر:** الديسكتوب (1440 و1290) = "سكيتلز مجفف بالتجميد" (وردي) / "يكبر ويقرمش ويذوب" / "في الفم". الموبايل (375 و390) = "سكيتلز مجفف بالتجميد يكبر" / "ويقرمش ويذوب في الفم". وصف الموبايل سطران مطابقان لـ Figma.
  - **الهندسة عند 1440 (موقع / Figma):** الصندوق x800/y81 وارتفاع 379/378؛ الشارة y81 و92×27 = مطابق؛ العنوان y126 بارتفاع 193/192؛ الوصف y337/336؛ الأزرار y414 = مطابق.
  - **الهندسة عند 375:** الشارة y18 و83×23 = مطابق؛ العنوان y49 بارتفاع 73/72؛ الوصف y130/129 بارتفاع 44 = مطابق؛ الزر y182/181 و142×31 مقابل 141×31.
  - 320 و768 و1150 سليمة.
  - **الخطوط المرسومة:** ExtraBold للعنوان والشارة والزر الأساسي، وRegular للوصفين، وBold للزر الثانوي. الحبر مطابق ~1%.
- **تكوين صورة الموبايل:** يحدده الملف المرفوع في "Mobile image" + نقطة التركيز (focal point)، مع `object-fit: cover` في بانر 500px. للمطابقة: رفع تصدير Figma للبانر 375×501 (يُفضَّل @2x). لم يُغيَّر CSS للصورة.
- **Not run:** الـ preview الحقيقي بعد تطبيق خطوات المحرر.

#### 2026-10-13 — تنفيذ: وصف موبايل قابل للتحرير + فحص الـ preview الحقيقي
- **الـ preview الحقيقي:** `shopify theme dev` يعمل على `127.0.0.1:9292`، والثيم "Development (517928-Aya-Helal)" id `193876328629` (role development).
  - يُزامن ملفات الكود من هذا الـ worktree لحظياً: `dev1.css` المنشور مطابق بايت ببايت للمحلي.
  - **لا يُزامن القالب من المحرر:** `index.json` في المتجر = أول نسخة مزروعة + صور التاجر (desktop `4fc1c5eb…png`، وmobile `5142c0d2…png`): بلا `<br/>`، و`hidden_br_mobile` غير مفعّل، وارتفاع سطر الشارة على الموبايل 14.
  - **خطر:** أي تعديل محلي على `templates/index.json` أثناء تشغيل `theme dev` يُرفع فوراً ويمسح الصور، فلم يُعدَّل.
- **الخطوط على الـ preview الحقيقي (HTML شوبيفاي الحقيقي + أصول الـ preview، عبر proxy محلي للقراءة فقط):**
  - قواعد `@font-face` العربية الثلاث موجودة، والملفات الست كلها 200.
  - العنوان والشارة والزر الأساسي = `Almarai-ExtraBold`، والوصف = `Almarai-Regular`، والزر الثانوي = `Almarai-Bold`. ملف Shopify اللاتيني للمسافات والنقطة فقط.
  - ما رآه التاجر سابقاً على الأرجح كاش.
  - الـ preview صار يحوّل كل الطلبات إلى `/password` بعد ذلك، فالقياسات من HTML المتجر الحقيقي الملتقَط قبلها مع الأصول الحية.
- **الملفات المضافة/المعدلة (كود، مُزامَن للـ preview):**
  - `blocks/_ayum-slide-item.liquid`: نسخة من `_slide-item` بنفس الـ markup والإعدادات حرفياً. الاسم "Slide (AYUM)"، ويضيف `_ayum-description` للبلوكات المسموحة، مع preset بمحتوى Figma. أُزيلت فيه فقط فاصلة زائدة موروثة في الـ schema.
  - `blocks/_ayum-description.liquid` ("Description (AYUM)"): `text` (richtext)، و`text_mobile` (richtext اختياري، fallback للوصف)، وحجم desktop/mobile (17/13، خطوة 1).
  - `sections/ayum-slideshow.liquid`: `blocks` = `_slide-item` + `_ayum-slide-item` (الشرائح الحالية تبقى صالحة).
  - `assets/dev1.css`: قواعد `.ayum-desc`، وإزالة قواعد `ayum-mobile-only` و`.hdt-hide-mobile` من الجولة السابقة.
- **ترحيل القالب (جاهز، بانتظار سحب القالب من المتجر):** سكربت يستبدل نص قسم `ayum_slideshow_hero` فقط:
  - الشرائح ← `_ayum-slide-item` (نفس الـ ids والصور).
  - العنوان ← `<br/>` بعد العبارة الوردية وبعد "ويذوب"، مع `hidden_br_mobile`.
  - `text` الوصف ← `_ayum-description` (نص الديسكتوب محفوظ + نص Figma للموبايل).
  - الشارة: ارتفاع السطر على الموبايل 14 ← 13.
  - اختُبر على ملف محاكٍ بصور المتجر: بقية الملف بايت ببايت، والصور و`order` بلا تغيير.
- **تحقق (HTML المتجر الحقيقي + markup ما بعد الترحيل + أصول الـ preview الحية):**
  - 375: الشارة y18 و83×23؛ العنوان y49 بارتفاع 73 (Figma 72)؛ الوصف y130 (129) بارتفاع 44؛ الزر y182 (181) و142×31.
  - 1440: الصندوق x800/y81؛ العنوان y126؛ الوصف y337؛ الأزرار y414.
  - الأسطر مطابقة لـ Figma عند 375 و390 و1290 و1440، والخطوط كلها Almarai الصحيح.
- **Not run:** الـ preview الحي بعد الترحيل (يحتاج سحب القالب + كلمة مرور المتجر في المتصفح).

### 2026-10-13 — S1 Announcement bar: زر "انسخ الكود"
- **Figma:** `get_design_context` + `get_metadata` للعقدتين `2001:4` و`2001:582`.
  - ديسكتوب: بار 1440×49، زر 94×25 (padding 6/16، radius 16، 12px/800)، نص 241×16 (14px/700)، gap 14.
  - موبايل: بار 375×40، زر 80×22 (padding 5/12، radius 14، 11px/800)، نص 206×13 (12px/700)، gap 10.
- **الأصل:** `sections/announcement-bar.liquid` (Kalles)، والـ instance `announcement_bar_QKnWCh` في `sections/header-group.json`. لم تكن هناك نسخة AYUM.
- **الملفات:**
  - جديد `sections/ayum-announcement-bar.liquid`: نسخة من الأصل. نفس اسم الـ schema (`t:sections.announcement-bar.name`)، ونفس class/limit/groups/presets، وكل الإعدادات الأصلية الـ21. أُزيلت فقط فاصلتان زائدتان موروثتان.
    - الإضافات: كلاس `ayum-announcement-bar` + `custom_class`؛ إعدادات القسم `ayum_height_mb` (40)، و`ayum_copy_enable`، و`ayum_copy_label` (انسخ الكود)، و`ayum_copy_code` (AYUM10)، و`ayum_copy_success` (تم نسخ الكود)، و`ayum_copy_error` (تعذّر النسخ)، و`ayum_copy_bg` (#EA3A79)، و`ayum_copy_color` (#FFFFFF)؛ وإعداد البلوك `ayum_show_copy`.
    - الزر في تصميم slider فقط.
  - جديد `assets/ayum-copy-code.js`: custom element `<ayum-copy-code>` (define محمي، ربط واحد، تنظيف في disconnected). Clipboard API في سياق آمن، ثم fallback `execCommand`، ثم حالة فشل. `aria-live` للإعلان.
  - `assets/dev1.css`: قسم منفصل تحت `.ayum-announcement-bar`. الملصق والرسائل في نفس خلية grid، والملصق وحده يحدد العرض، فلا تغيير في الحجم عند النسخ.
  - `sections/header-group.json`: أُضيف `ayum_announcement_bar` أولاً (نفس إعدادات ونص الأصل)، و`"disabled": true` على `announcement_bar_QKnWCh`. بياناته محفوظة، و`custom_liquid_BCTxT9` بلا تغيير. النسخة المحلية كانت مسحوبة من المتجر في `bfdcf3e` ومطابقة لما يرسمه الـ preview.
- **إصلاح عرضي:** `bfdcf3e` حذف `assets/almarai-arabic-800.woff2` (الـ preview أعاد 404، فعاد العنوان 800 إلى Times New Roman). استُعيد من `96f6daa` (SHA-256 مطابق `7acac6ae…`)، والـ preview يعيده 200 (33,328B). ملف فارغ دخيل `assets/dev1.css.tmp.21456.70728f719e45` من نفس الـ commit لم يُحذف (بانتظار قرار المستخدم).
- **تحقق (HTML الـ preview الحقيقي مع markup القسم الجديد + أصول الـ preview الحية؛ الصفحة الحية خلف كلمة المرور):**
  - **1440 (موقع / Figma):** بار 49/49؛ الزر 93.1×25 عند x546.4 (94×25 عند 545.5)؛ النص 240.2×16 عند x653.4 (241×16 عند 653.5)؛ gap 14.
  - **375:** بار 40/40؛ الزر 80×22 عند x39.6 (39.5)؛ النص 205.9×13 عند x129.5؛ gap 10.
  - 320 و768 و1150 في المنتصف، بلا overflow.
  - **الخطوط:** الزر `Almarai-ExtraBold`، والنص `Almarai-Bold`.
  - **السلوك:** النقر ينسخ `AYUM10` (قراءة فعلية من الحافظة)؛ تغيير الكود ← يُنسخ الجديد؛ Enter وSpace؛ إطار التركيز 2px عند Tab؛ لا تغيّر في عرض الزر ولا scroll ولا URL؛ مسار الفشل ← "تعذّر النسخ" + إعلان.
  - الهيرو لم يتأثر.
- **Not run:** المتجر الحي (كلمة المرور)، وإعادة تحميل القسم في محرر الثيم، وSafari/Firefox، ولمس فعلي.
- **معلّق من مهمة الهيرو:** `templates/index.json` المسحوب في `bfdcf3e` فيه صور التاجر، والشرائح ما زالت `_slide-item`. سكربت الترحيل جاهز عند الطلب.

### 2026-10-13 — H2 Shop by category (تسوّق حسب الفئة)
- **Figma:** `get_design_context` + `get_metadata` للعقدتين `2001:55` و`2001:626`.
  - ديسكتوب: py48، العنوان 36/800 #26383A (ارتفاعه 40)، gap 32، 4 بطاقات 305×271 (صورة 220 + شريط 51، 17/800)، gap 20، radius 16، المحتوى 1280، النقاط 12/40×12 gap 6 بعد 32.
  - موبايل: py24، العنوان 21 (23)، gap 24، بطاقات 150×147 (صورة 110 + شريط 37، 13/800)، gap 12، radius 14، بداية 16 من اليمين، peek 35.
  - الخلفية `rgb(228 237 240 / .6)` + حدود `rgb(38 179 208 / .15)`. ألوان الأشرطة: #26B3D0 و#EA3A79 و#B6D561 و#E78333.
- **الأساس:** `sections/collections-list.liquid` (carousel = `<hdt-slider>` الأصلي، نقاط/أسهم أصلية، أعمدة لكل breakpoint، section-heading ثابت). بلوك `_collection_item` يرسم `snippets/collection-item.liquid`. الستايل 5 يضع العنوان تحت الصورة أصلاً.
- **الملفات:**
  - جديد `sections/ayum-collections-list.liquid`: نسخة بنفس الاسم (`t:sections.collections-list.name`) وكل الإعدادات.
    - يضيف: تحميل `dev1.css`، والكلاس `ayum-collections-list` + `custom_class`، والبلوك `_ayum-collection-item` بجانب الأصلي.
    - أُزيل `hdt-reveal` من عنصر النقاط فقط، لأن الـ observer (rootMargin -50px) لا يفعّله قرب نهاية صفحة قصيرة، فتبقى النقاط بشفافية 0.01.
  - جديد `blocks/_ayum-collection-item.liquid` ("Collection (AYUM)"): نسخة من `_collection_item`.
    - يضيف `ayum_label_color` (Blue/Pink/Green/Orange) كـ class عبر بارامتر `class` الموجود في الـ snippet الأصلي غير المعدَّل.
    - العنوان بلا قيمة افتراضية: عند تركه فارغاً يُستخدم عنوان المجموعة.
  - `assets/dev1.css`: قسم `.ayum-collections-list`.
    - الحاوية 16/20px.
    - الموبايل: `--slide-spacing` و`--slide-size: 43.67%` على الـ viewport (بدل قاعدة الـ #id) + bleed للحافة.
    - crop الصورة عبر `hdt-ratio--landscape` (73.33% / 72.13%)، وألوان الأشرطة، والنقاط.
  - `templates/index.json`: أُضيف `ayum_collections_list` بعد الهيرو. القالب المسحوب لم يكن فيه غير الهيرو، والهيرو بقي بايت ببايت كما هو.
    - 4 بطاقات بعناوين وألوان Figma بلا مجموعة/صورة.
    - الإعدادات: style 5، وlandscape، وcol 4/3/2، وspace 20، وcarousel، وdots مع hide on mobile، وpag 6/32، وpd 48/24، والعنوان h_custom 36/21، وdesign_heading "1".
- **تحقق (HTML المتجر الحقيقي الملتقَط من الـ preview + أصول حية؛ الـ preview يتنقّل بين 200 و/password):**
  - Shopify يرسم القسم: 4 بطاقات `ayum-cat--orange/green/pink/blue`، والعنوان، و`lg:hdt-slides-4 md:hdt-slides-3 hdt-slides-2`.
  - **1440:** بطاقات 305×271 عند x 80/405/730/1055 (= Figma)، والعنوان 36/800 عند y49.
  - **375:** بطاقات 150×147 عند x 209/47، وpeek 35 (= Figma)، والعنوان 21/800، وارتفاع القسم 244 (Figma 242 بدون الحدود).
  - 320/390/768/1150 بلا overflow. الخطوط `Almarai-ExtraBold`.
  - **النقاط (صفحة اختبار بـ 6 بطاقات):** 40×12 #26B3D0 نشطة + 12×12 #D3E3E8، gap 6، تبعد 32 عن البطاقات، في المنتصف، النشطة يميناً (RTL)، والنقر ينقل. مخفية على الموبايل، والسحب على الموبايل يعمل.
- **ملاحظات:**
  - مع 4 مجموعات و4 لكل عرض لا توجد صفحات، فـ Kalles لا يعرض نقاطاً على الديسكتوب (سلوك أصلي)، وتظهر عند 5+ مجموعات. Figma يرسم 3 نقاط، أي 6 فئات.
  - لون النقطة النشطة في Figma أزرق #26B3D0 (ليس الوردي المذكور في الطلب)، وطُبّق Figma.
  - تعديل `design_heading` ← "1" وإزالة reveal من النقاط تحقّقا على الصفحة الملتقطة بعد تطبيق نفس المخرجات، لأن الـ preview كان خلف كلمة المرور.
- **Not run:** المتجر الحي بعد آخر تعديلين، والروابط (لا مجموعات مختارة بعد)، ومحرر الثيم، وSafari/Firefox، ولمس فعلي.

### 2026-10-13 — ترحيل H1 وS1 وH2 إلى Color-Scheme-First / Theme-Editor-First (SKILL §2.8 و§5.2)
- **Figma (`get_variable_defs`):**
  - `2001:612`: Ink #26383A، وText #4E6E70، وPink #EA3A79، وBorder #D3E3E8، وWhite.
  - `2001:55`: Surface #E4EDF0 (و60%)، وPrimary #26B3D0 (و15%)، وInk، وWhite، وPink، وGreen #B6D561، وOrange #E78333.
  - `2001:4`: Primary، وPink، وWhite.
- **المخططات (قراءة فقط):**
  - الـ body = `scheme-1` (خلفية #ffffff، ونص #222، وoverlay #000000).
  - `scheme-6707…` (خلفية #26b3d0 / نص #fff) هو مخطط شريط الإعلانات.
  - لا يوجد مخطط فيه Ink أو Surface أو ألوان البطاقات.
- **عدّ الألوان الحرفية في `assets/dev1.css`:** **19 قبل ← 0 بعد**. ملفات AYUM Liquid/JS: 0 خارج `default`/presets في الـ schema.
- **H1 (الهيرو):**
  - مُعاد استخدامه: إعدادات AYUM الموجودة (accent، وheading، وtext، وborder)، وألوان البلوكات الأصلية (`text_custom` للشارة، و`button_custom` للأزرار).
  - متغيرات المخطط: `--color-background` / `--color-base-background` للأسطح البيضاء (الأسهم، ونقاط الموبايل، ولون أيقونة السهم عند hover)، و`--color-overlay` لظل الأسهم.
  - `color-mix` من heading للون الأيقونة الخافت، وأُزيل الـ fallback الحرفي.
  - جديد: `ayum_shade_color` (#666666، "Mobile image shade") لتدرّج الموبايل (30%).
- **S1 (شريط الإعلانات):** لا ألوان حرفية أصلاً. الخلفية والنص من المخطط الأصلي (`colors_by_section` + `color_scheme`)، والزر من `ayum_copy_bg`/`ayum_copy_color`، والـ focus يستخدم `ayum_copy_color`. **بلا تعديل.**
- **H2 (الفئات):**
  - إعدادات قسم جديدة: `ayum_surface_color`، و`ayum_heading_color`، و`ayum_accent_color`، و`ayum_dot_color`، و`ayum_label_text_color`، ولوحة `ayum_label_blue/pink/green/orange`.
  - إعداد بلوك جديد: `ayum_label_bg` ("Custom label color"، بلا قيمة افتراضية)، تصدره القسم كقاعدة مربوطة بـ block id عبر `section.blocks`. لا يوجد `<style>` داخل مسار السلايدر.
  - اختيار `ayum_label_color` الموجود صار يشير لألوان اللوحة.
  - الخلفية من AYUM فقط عند `:not([color-scheme])`، فإن فُعّل المخطط الأصلي فخلفيته هي المعتمدة.
  - لون العنوان من AYUM فقط عند `hdt-s-text`، فخيارات اللون الأصلية الأخرى تعمل.
- **الملفات:** `assets/dev1.css`، و`sections/ayum-slideshow.liquid`، و`sections/ayum-collections-list.liquid`، و`blocks/_ayum-collection-item.liquid`.
  - لم يُعدَّل `templates/index.json`: كل الإعدادات الجديدة تعمل بالـ defaults.
  - لم يُعدَّل أي ملف Kalles أصلي، ولا `settings_data.json`، ولا `css-variables.liquid`.
- **تحقق:**
  - صفحة المتجر الحقيقية الملتقطة (200) + `dev1.css` الجديد حيّاً + مخرجات Liquid الجديدة بالقيم الافتراضية: **42/42 لوناً محسوباً مطابقاً للأساس**. سهم الهيرو بصيغة `color(srgb …)` = rgba(38,56,58,.75) نفسه.
  - محاكاة تغيير الإعدادات (القيم التي يصدرها كل إعداد): لون اللوحة يغيّر بطاقته فقط، واللون المخصص يغيّر بطاقته فقط ويتبعها بعد إعادة الترتيب، والمخطط الأصلي يغلب، وخيار لون العنوان الأصلي يعمل، والـ accent والنقاط والإطار تتغير، والظل وسطح الأسهم يتبعان المخطط، وزر النسخ يتبع إعداداته.
- **Not run:** إخراج Shopify الحي لملفات Liquid المعدّلة (الـ preview خلف كلمة المرور بعد التعديل)، وفتح الإعدادات فعلياً في محرر الثيم.

### تصحيح ترحيل الألوان: المخططات الأصلية أولاً (2026-10-13)

- **السبب:** الترحيل السابق أزال الألوان الحرفية، لكنه استبدلها بـ color pickers جديدة لأدوار يغطيها مخطط Kalles. هذا يمنع تبديل المخطط من التحكم في الألوان.
- **القاعدة:** إذا كان المخطط يحوي الدور (خلفية، نص، accent، أزرار، حدود، overlay) نستخدم متغيّره حتى لو اختلفت قيمته الحالية عن Figma. الإعداد الجديد فقط حين يعجز المخطط بنيوياً عن تمثيل الدور.
- **S0 (الهيرو):**
  - النص من مخطط الشريحة الأصلي (`color_scheme` لكل شريحة)، ثم مخطط القسم، ثم مخطط body.
  - العنوان والوصف من select `text_color` الأصلي. العنوان على الديسكتوب = `--color-foreground` بنسبة 75%.
  - الجزء المميّز (strong) والشارة والنقطة النشطة وhover الأسهم = `--color-accent`.
  - النقاط غير النشطة = `--color-line-border`. الأسهم = `--color-background`.
  - ظل الموبايل = `--color-overlay` بنسبة 18%.
  - **أُزيلت:** `ayum_accent_color`، و`ayum_heading_color`، و`ayum_text_color`، و`ayum_border_color`، و`ayum_shade_color`.
  - أُضيف إلى `_ayum-description` select `text_color` بنفس الخيارات الأصلية، والقيمة الافتراضية Secondary (= Text 2).
  - أزرار CTA باقية على إعدادات `button_custom` الأصلية.
- **S1 (شريط الإعلانات):**
  - الخلفية والنص من المخطط (بلا تغيير).
  - زر النسخ صار من `--hdt-btn-bg` / `--hdt-btn-color`، وhover من `--hdt-btn-hover-*`، وحلقة التركيز `--color-foreground`.
  - **أُزيلت:** `ayum_copy_bg` و`ayum_copy_color`.
- **S2 (التصنيفات):**
  - خلفية القسم من `.hdt-s-gradient` + "Background opacity" الأصلي (Figma: 60%).
  - العنوان = `hdt-s-text`. الإطار = accent بنسبة 15%.
  - خلفية البطاقة = `--color-background`. النقاط = `line-border` / `accent`. نص الملصق = `--hdt-btn-color`.
  - **أُزيلت:** `ayum_surface_color`، و`ayum_heading_color`، و`ayum_accent_color`، و`ayum_dot_color`، و`ayum_label_text_color`، و`ayum_label_bg` (بلوك)، وقواعد per-card.
  - **باقٍ (ضروري بنيوياً):** لوحة `ayum_label_blue/pink/green/orange` + اختيار `ayum_label_color` لكل بطاقة (البيانات المخزّنة فيه محفوظة).
- **بيانات التاجر:**
  - `templates/index.json` يخزّن قيم الهيرو `#ea3a79 / #26383a / #4e6e70 / #d3e3e8`.
  - `sections/header-group.json` يخزّن `ayum_copy_bg #ea3a79` و`ayum_copy_color #ffffff`.
  - لم تُعدَّل هذه الملفات. القيم غير المعروفة يتجاهلها Shopify (متوقّع، لم يُتحقق منه).
  - القيم موثّقة هنا لإدخالها في مخطط.
  - لم يُعدَّل `settings_data.json` ولا أي مخطط.
- **مطلوب من التاجر لاستعادة مظهر Figma:** إنشاء مخطط "AYUM" وتعيينه للشرائح/الأقسام، بدلاً من تعديل scheme-1 المشترك.
  - **الهيرو:** Text #26383A، Text 2 #4E6E70، Accent #EA3A79، Line border #D3E3E8. ووصف الشريحة = Secondary.
  - **الشريط:** مخطط بخلفية #26B3D0، ونص #FFFFFF، وButton #EA3A79، وButton label #FFFFFF. المخطط 6707 مستخدم أيضاً في `page.women.json`.
  - **التصنيفات:** تفعيل "Display colors by section" + مخطط Background #E4EDF0، وText #26383A، وAccent #26B3D0، وLine border #D3E3E8، وButton label #FFFFFF، مع Background opacity 0.6.
  - حتى ذلك، تظهر الأقسام بألوان المخططات الحالية (accent سماوي، نص #222، زر نسخ أبيض).
- **تحقق:**
  - الـ preview الحي عاد لكلمة المرور، فاستُخدمت لقطة الصفحة الحقيقية مع حذف ما حذفه Liquid الجديد بالضبط، و`dev1.css` الجديد حيّاً.
  - **إيقاف المخطط:** الألوان من body.
  - **تفعيل المخطط والتبديل بين مخططين:** الخلفية والنقاط والأسهم تتبع القسم، والعنوان والوصف والشارة تتبع الشريحة.
  - **تعديل لون داخل المخطط:** تتغير كل الأدوار.
  - **الأزرار:** زر النسخ و hover يتبعان المخطط، والنسخ يعمل (AYUM10).
  - **التصنيفات:** بقيم Figma في المخطط تطابق Figma تماماً. لون الملصق مستقل لكل بطاقة.
  - **الأقسام الأخرى:** 0 من 318 عنصراً تغيّر.
  - ألوان حرفية في `dev1.css`: 0.
- **Not run:** إخراج Shopify الحي للـ Liquid الجديد، ومحرر الثيم الفعلي.

### 2026-10-14 — H5 About the brand (تنفيذ)

- **Figma:** `2001:230` (ديسكتوب) و`2001:749` (موبايل)، عبر `get_design_context` مع لقطة. صورة Figma محفوظة خارج المستودع ليرفعها التاجر. لم تُضَف للثيم.
- **الأساس الأصلي:** `sections/image_text.liquid` ("Image with text"). فيه بلوك Media (`_image-text-column` ← `image`) وبلوك Content (`_image-text-col` ← heading/text/button/…).
  - `custom-section` + `_counter` (اقتراح التدقيق) لا يكفي: `_counter` رقمي فقط، بلا عنوان ولا نص موبايل ولا بادئة "+".
- **النسخة المعزولة:** `sections/ayum-image-text.liquid`. الاسم في المحرر `t:sections.image_text.name` = "Image with text" (نفس الأصل).
  - **الإضافات:** `dev1.css`، والكلاس `ayum-image-text`، و`custom_class`، وإعدادات "Image": ارتفاع 380/220 ونصف قطر 20/16.
  - الـ preset صار محتوى About.
  - **الأصل وبلوكاته بلا تعديل.**
- **البلوكات:**
  - **مُعاد استخدامها بلا تعديل:**
    - `_image-text-column` + `image`.
    - `heading` للعنوان الفرعي (Accent، h_custom 17/12) وللعنوان (`<h2>`، Default، h_custom 34/24).
  - **`_ayum-description`:** للوصف، مع نص موبايل منفصل، و18/14، وSecondary. عُدِّل تعليقه فقط.
  - **`_ayum-image-text-col` ("Content"):** نسخة من `_image-text-col` تقبل أيضاً `_ayum-description` و`_ayum-stats`.
  - **جديدة:**
    - `_ayum-stats` ("Statistics"): صف قابل للإضافة والحذف وإعادة الترتيب، مع أحجام 26/23 و18/11.
    - `_ayum-stat` ("Statistic"): رقم، وعنوان، وعنوان موبايل اختياري يرجع للعنوان عند الفراغ.
- **Color Scheme 4 = `scheme-23cf8966-8e57-4acd-9bb3-bb85f222fbb9`:** الرابع في ترتيب `color_schemes`.
  - مستخدم أيضاً في `main-product-tabs` في 11 قالب منتج تجريبي من Kalles، وليس في قوالب AYUM.
- **ربط الألوان (المخطط فقط، بلا أي إعداد لون جديد):**
  - الخلفية = Background (`.hdt-s-gradient` + Background opacity 1).
  - العنوان = Text.
  - العنوان الفرعي والأرقام = Accent.
  - الوصف = Text 2.
  - عناوين الإحصاءات = Text 2 بنسبة 80% (Figma Muted `#6E8788` ≈ `#4E6E70` بنسبة 80% على الخلفية).
- **قيم مطلوبة من التاجر في Scheme 4 (لم تُعدَّل تلقائياً):**
  - Background `#ffffff` ← `#FBECE0`. هذا هو اللون المعتم المكافئ لـ `#E78333` بنسبة 15% فوق الأبيض؛ مدى Background opacity خطوته 0.1 ولا يقبل 0.15.
  - Text `#222222` ← `#26383A`.
  - Text 2 `#878787` ← `#4E6E70`.
  - Accent `#56cfe1` ← `#E78333`.
  - **أثر جانبي:** يغيّر أيضاً تبويبات المنتج في قوالب Kalles التجريبية.
- **التخطيط:**
  - الشبكة مثبتة `direction: ltr` (هندسة فقط)، فالصورة يساراً في كل لغة. النص `rtl` على عمود المحتوى.
  - المسافات: 56 ديسكتوب، و32 تابلت، و14/24 بين عناصر المحتوى، و8 بين العنوان الفرعي والعنوان على الموبايل.
  - Bold الأصلي = 800 داخل السكشن.
- **القالب:**
  - أُضيف `ayum_image_text_about` في آخر `order` بعد `ayum_collections_list`، لأن Best sellers وBundles لم تُبنيا بعد.
  - السكاشن الأخرى مطابقة بايتاً ببايت؛ السطر الوحيد المتغير فاصلة في `order`.
  - لم يُلاحظ انحراف: الـ preview يعرض نفس السكاشن والصور، و21/21 نصاً عربياً من القالب.
  - الصورة فارغة (placeholder) حتى يرفعها التاجر.
- **تحقق (الـ preview الحي عبر theme dev):**
  - **1440:** صورة 612×380 يساراً، ونصف قطر 20، وفجوة 56، وحشوة 48/48، وحاوية 1320/20.
  - **العنوان:** سطر واحد بارتفاع 49.
  - **الوصف:** 1+2 أسطر بارتفاع 103 (Figma 102). المحتوى 303 ومتوسّط عمودياً.
  - **الإحصاءات:** يميناً بفجوة 32، و26/18، وفجوة 2.
  - **375:** صورة 343×220 ونصف قطر 16، والنص في الوسط، والعنوان سطران، ووصف الموبايل 4 أسطر، والإحصاءات صف واحد بثلاثة أعمدة 108 وفجوة 10، والحشوة 24/18.
  - **1150 و1149 و768 و767 و390 و320:** لا overflow أفقي، والإحصاءات صف واحد على الموبايل.
  - **المخطط:** تعديل متغيرات Scheme 4 إلى قيم Figma غيّر كل الأدوار، والتبديل إلى مخطط آخر غيّرها.
  - **أول قياس:** فجوة العنوان الفرعي/العنوان على الموبايل كانت 14 لا 8، لأن بلوك heading يطبع `<style>` بعد الـ div. صُحِّح المحدِّد إلى `+ style +`. بعد التصحيح صارت 8 عند 375 و320، و24 على الديسكتوب. القياس على HTML الصفحة الحقيقية الملتقطة مع `dev1.css` الحي، لأن الـ preview عاد لكلمة المرور.
- **LTR (محاكاة `dir=ltr` على الصفحة الملتقطة):** نفس التخطيط؛ الصورة يساراً، والنص العربي يميناً، والإحصاءات تبدأ بـ +400 من اليمين. صفحة `/en` الحقيقية لم تُفحص بسبب كلمة المرور.
- **Not run:** محرر الثيم الفعلي، والمتجر المنشور.

### 2026-10-14 — H6 How we freeze-dry (تنفيذ)

- **Figma:** `2001:250` (ديسكتوب) و`2001:765` (موبايل)، عبر `get_design_context` مع لقطة، ولقطة مكبّرة لـ `2001:772`.
  - **ترتيب الشارات الفعلي:**
    - ديسكتوب (من اليمين): حافظة، ألوان، أعمار، كويتي.
    - موبايل: صف 1 ألوان ثم أعمار، وصف 2 حافظة ثم كويتي.
    - نصا "أعمار" و"كويتي" أقصر على الموبايل.
  - **أيقونات Figma:** SVG بخط أبيض على شبكة 30. الثلج 6 أذرع مدوّرة بزاوية 60°.
- **الأساس الأصلي:** `sections/icon-box.liquid` ("Icon box"). فيه:
  - section-heading مثبَّت.
  - شبكة `col_dk/col_tb/col_mb` ومسافات.
  - بلوكات `_icon_box`: أيقونة من صورة أو SVG أو `icons`، وعنوان، ووصف.
- **النسخة المعزولة:** `sections/ayum-icon-box.liquid`، الاسم "Icon box".
  - **التغييرات:**
    - بلوك `_ayum-claims` مثبَّت بعد العنوان.
    - خيار `23px` في `space_horizontal`.
    - إعدادات "Heading": حجم العنوان الفرعي للموبايل 13. السبب: مدى البلوك الأصلي خطوته 2px.
    - إعدادات "Step cards": العنوان 20/17، والوصف 14/13، والزوايا 16/14، وحشوة الموبايل.
    - `custom_class`.
  - **أُسقطت 7 منتقيات ألوان من النسخة فقط:** heading/icon/description/box/border/hover. المخطط يحمل هذه الأدوار، ومتغيراتها الأصلية تُغذّى من المخطط في `dev1.css`.
  - **الأصل وكل بلوكاته بلا تعديل.**
- **البلوكات:**
  - **`_ayum-icon-box`:** نسخة من `_icon_box` بكل إعداداته، مع إضافة:
    - رقم الخطوة.
    - وصف موبايل اختياري يرجع للوصف.
    - "AYUM icon" (ثلج/قطرة/عبوة من `snippets/ayum-icons.liquid`).
    - "Icon background".
  - **أُبقيت** صورة/SVG الأصليان وتسبقان أيقونة AYUM. لم يُخزَّن SVG في القالب.
  - **`_ayum-claims` + `_ayum-claim`:** نص، ونص موبايل، و"Accent color" (الحد، والخلفية بنسبة 15%)، و"Mobile position" (1–2 صف أول، 3–4 صف ثانٍ، 5–6 ثالث).
- **الألوان:**
  - **من المخطط:** الخلفية، والعنوان والعنوان الفرعي (Text / Secondary = Text 2)، والبطاقة (Background 2 بنسبة 60%)، وعنوان الخطوة (Text)، والوصف (Text 2)، ولون الأيقونة (Button label)، ونص الشارات (Text).
  - **إعدادات بلوك (ألوان مستقلة متعددة):** دوائر الأيقونات، والشارات.
  - **مخطط القالب:** Scheme 1 (`scheme-1`)، الخلفية البيضاء الوحيدة.
- **قيم مطلوبة من التاجر (لم تُعدَّل تلقائياً):**
  - Text `#222222` ← `#26383A`.
  - Text 2 `#878787` ← `#4E6E70`.
  - Background 2 `#f2f2f2` ← `#E4EDF0`.
  - Scheme 1 هو مخطط الموقع كله، فالأفضل نسخة منه تُعيَّن لهذا السكشن.
  - **فرق متبقٍّ:** العنوان الفرعي في Figma `#6E8788` و"Secondary" = Text 2 = `#4E6E70`.
- **حشوة البطاقة:** الحشوة الأصلية `28px,28px,42px,12px`. حافة النهاية 12 كما في بطاقة Figma الثالثة، حتى يبقى وصفها سطراً واحداً.
- **القالب:**
  - أُضيف `ayum_icon_box_freeze_dry` بعد `ayum_image_text_about` (ترتيب Figma).
  - السكاشن الثلاث الأخرى مطابقة بايتاً ببايت.
  - **انحراف مُلاحظ:** commit "create section 5 in theme editor" بدّل محتوى الإحصاءين 1 و3 في About، ورفع صورة About. حُفظ كما هو.
- **تحقق:**
  - **مكان الاختبار:** الـ `theme dev` الوحيد على 9292 كان يخدم `ayum-dev2-ah`، فلم يُستخدم.
  - **طريقة الاختبار:**
    - أُعيد إنتاج مخرجات Liquid لهذا السكشن بالضبط داخل صفحة المتجر الحقيقية الملتقطة (`ix2.html`)، مع `dev1.css` من هذا الـ worktree والأصول الأصلية المطابقة.
    - رسوم `hdt-reveal` حُيِّدت للقياس فقط.
  - **1440:**
    - الفجوات 16/16/32 والحشوة 48.
    - 4 شارات في صف من اليمين (13px/700، 8×16، نصف قطر 18).
    - 3 بطاقات 411×193 متساوية، والخطوة 1 يميناً، والأيقونة 52 أعلى اليمين، والعناوين 20/800، والأوصاف 14/1.8 سطراً واحداً.
  - **375:**
    - الحشوة 24، والفجوات 8/8/16.
    - الشارات صفّان بترتيب Figma، بفجوة 8.
    - البطاقات مكدّسة 343×70 بفجوة 8، والأيقونة 40 يميناً، والنص بجانبها، و3px بين العنوان والوصف، ونصوص الموبايل ظاهرة.
  - **1150/1149/768/767/390/320:** لا overflow، والبطاقات متساوية الارتفاع.
  - **LTR (محاكاة):** نفس المواضع.
  - **المخطط:** تعديل Scheme 1 إلى قيم Figma غيّر كل الأدوار، والتبديل لمخطط آخر غيّرها.
  - **إعادة الترتيب:** الأيقونة واللون يتبعان البلوك.
  - **ملاحظة خط:** Almarai Bold ارتفاع سطره normal ≈ 1.56، وهو مطابق لـ Figma (24.9px على 16px).
- **Not run:** Liquid على Shopify (لا preview لهذا الـ worktree)، ومحرر الثيم، وإضافة/حذف البلوكات فعلياً في المحرر.

#### 2026-10-14 — متابعة (ألوان فقط): Color Scheme 2 + لون العنوان الفرعي

- **Color Scheme 2 = `scheme-77e4ef58-56a9-4631-876a-12098ba7d57d`:** الثاني في ترتيب `color_schemes`. قيمه: Text `#26383A`، وText 2 `#878787`، وBackground `#E4EDF0`، وBackground 2 `#FFFFFF`، وButton label `#FFFFFF`.
- **القالب:** في `ayum_icon_box_freeze_dry` تغيّر سطران فقط:
  - `color_scheme`: `scheme-1` ← Scheme 2.
  - `background_opacity`: 1 ← 0. السكشن شفاف فوق خلفية الصفحة البيضاء، كما في Figma.
  - باقي السكاشن مطابقة بايتاً ببايت.
  - الـ preset: `background_opacity` 0.
- **ربط الألوان:**
  - **البطاقة:** صارت من scheme Background بنسبة 60% (كانت Background 2). في Scheme 2 هي `#E4EDF0`، أي "Surface 60%" في Figma بالضبط.
  - **باقٍ كما هو:** العنوان وعنوان البطاقة ونص الشارات = Text، والوصف = Text 2، والأيقونة = Button label، والشارات ودوائر الأيقونات = إعدادات البلوكات.
- **إعداد جديد `ayum_subheading_color` ("Subheading color"، `#6E8788`):**
  - **السبب:** Figma يحتاج 3 ألوان نص مستقلة (`#26383A` و`#4E6E70` و`#6E8788`)، والمخطط فيه Text وText 2 فقط.
  - عند مسحه يعود لون "Text color" الأصلي لبلوك العنوان الفرعي، بواسطة كلاس `ayum-icon-box--sub-color`.
- **فرق متبقٍّ:** وصف البطاقات `#878787` (Text 2 في Scheme 2) بدل `#4E6E70`. الدور موجود في المخطط والقيمة فقط مختلفة، فلم يُضَف منتقٍ (SKILL §2.8).
  - يصلحه التاجر: Scheme 2 → Text 2 = `#4E6E70`.
  - **أثر جانبي:** Scheme 2 مستخدم أيضاً في Categories على الرئيسية (لا تستخدم Text 2)، وفي `collection.custom-ayum.json` وقوالب Kalles تجريبية.
- **تحقق (محاكاة على الصفحة الملتقطة؛ لا preview حي لهذا الـ worktree):**
  - **1440 و375:** كل الألوان أعلاه مطابقة لـ Figma ما عدا الوصف. الهندسة مطابقة بالبكسل لما قبل التعديل، ولا overflow.
  - **تعديل Scheme 2:** غيّر العنوان والبطاقة والوصف والأيقونة ونص الشارات. لم يتأثر العنوان الفرعي ولا الشارات ودوائر الأيقونات.
  - **إعداد العنوان الفرعي:** يغيّره، وعند مسحه يعود للأصلي.
- **Not run:** Shopify Preview ومحرر الثيم.
