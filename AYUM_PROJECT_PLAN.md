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
| H3 | Best sellers (tabs) — اسم المحرر: **Featured Collection** | index | `2001:80` / `2001:647` | Design-context inspected | Implemented (+ متابعة 2026-10-13) | Partial (harness محلي فقط) | `ayum-tabs-collection` (فرع `dev2-ah`)؛ انظر §23 |
| H4 | Bundles — اسم المحرر: **Featured Coll. — Bundles** | index | `2001:156` / `2001:721` | Design-context inspected | Implemented | Partial (harness محلي فقط) | `ayum-featured-collection` (فرع `dev2-ah`)؛ انظر §23 |
| H5 | About the brand | index | `2001:230` / `2001:749` | Metadata only | Not started | Not run | لا علاقة له بـ "H5" المذكور في الـ skill |
| H6 | How we freeze-dry | index | `2001:250` / `2001:765` | Metadata only | Not started | Not run | — |
| H7 | Reviews — اسم المحرر: **Testimonials** (اسم Kalles الأصلي) | index | `2001:316` / `2001:826` | Design-context inspected | Implemented | Partial (harness محلي فقط) | `ayum-testimonial_section` (فرع `dev2-ah`)؛ انظر §23 |
| H8 | Product videos — اسم المحرر: **Shoppable Video** (اسم Kalles الأصلي) | index | `2001:366` / `2001:861` | Design-context inspected | Implemented | Partial (harness محلي فقط) | `ayum-product-video` (فرع `dev2-ah`)، بلا تشغيل تلقائي؛ انظر §23 |
| H9 | FAQ | index | `2001:446` / `2001:911` | Metadata only | Not started | Not run | — |
| S1 | Offer / announcement bar | **مشترك: كل الصفحات** | `2001:4` / `2001:582` | Metadata only | Not started | Not run | header-group |
| S2 | Header + category nav | **مشترك: كل الصفحات** | `2001:8` + `2001:21` / `2001:586` | Metadata only | Not started | Not run | الأعلى خطراً |
| S3 | Mobile menu | **مشترك: كل الصفحات** | — / `35:309` | Metadata only | Not started | Not run | يعتمد على S2 |
| S4 | Footer | **مشترك: كل الصفحات** | `2001:483` / `2001:942` | Metadata only | Not started | Not run | footer-group |
| S5 | Mobile bottom nav | **مشترك: كل الصفحات** | — / `2001:1034` | Metadata only | Not started | Not run | system-group |
| — | Newsletter | خارج النطاق | `2001:472` (مخفي) / — | Metadata only | — | — | مخفي في Figma |

## 23. سجل التنفيذ

> على فرع `dev2-ah`: نُفِّذ H3 فقط (2026-10-13). سكاشن فرع `dev1-ah` غير مسجَّلة في هذه النسخة من الخطة.

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

### 2026-10-13 — H3 Best sellers (tabs) — تنفيذ أول (فرع `dev2-ah`)
- **Figma:** فُحصت `2001:80` و`2001:647` عبر `get_metadata` و`get_design_context` و`get_variable_defs` ولقطات الشاشة. ترتيب البطاقة المعتمد: الصورة والشارة ← (الوصف + التقييم في صف واحد) ← العنوان ← السعر ← زر الإضافة.
- **الأساس الأصلي (لم يُعدَّل):** `sections/tabs-collection.liquid` و`blocks/_tab-collection.liquid` و`blocks/_product-carousel.liquid` و`snippets/card-product7.liquid`.
- **ملفات جديدة:**
  - `sections/ayum-tabs-collection.liquid`: نسخة من `tabs-collection`. أُضيف خيار تصميم تبويبات `ayum_pill`، و7 ألوان AYUM، و`custom_class`. التسمية تُعرض كنص فعلي بدل حقن `content:` في CSS.
  - `blocks/_ayum-tab-collection.liquid`: نسخة من `_tab-collection` تسمح بـ `_ayum-product-carousel` إلى جانب `_product-grid`.
  - `blocks/_ayum-product-carousel.liquid`: نسخة من `_product-carousel`. أُضيف خيار بطاقة `ayum` في الـ dispatcher الخاص بها (البطاقات 1–12 كما هي)، وشريط تقدّم السلايدر، و4 إعدادات AYUM.
  - `snippets/card-product-ayum.liquid`: نسخة من `card-product7` بترتيب Figma.
  - `snippets/ayum-card-rating.liquid`: تقييم "4.8 ★★★★★" من metafields التقييم القياسية (`reviews.rating` / `reviews.rating_count`)، وهو المصدر نفسه الذي يقرؤه تكامل Judge.me في `hdt-pr-card-rating.liquid`. لا يُعرض شيء بدون تقييم فعلي.
  - `assets/dev2.css`: كل القواعد تحت `.ayum-tabs-collection`. يُحمَّل من السكشن فقط.
  - `assets/ayum-slider-progress.js`: عنصر `<ayum-slider-progress>` يقرأ Embla API الخاص بـ `<hdt-slider>` الأصلي عبر حدثَي `init:slide` و`select:slide`. لا مكتبة جديدة.
- **ملفات معدَّلة:** `templates/index.json`. أُضيف `ayum_tabs_collection_best_sellers` بعد `collections_list_manual_eErqxt`، وبقية الملف مطابقة بايتاً ببايت (تحقق آلي).
- **الألوان:** من الـ scheme الخلفية، والعنوان (`hdt-s-text`)، ونص البطاقة الثانوي (`--color-foreground2`)، وحد البطاقة (`--color-line-border`)، وخلفية الشارة. ألوان AYUM (قيم Figma افتراضية): `ayum_primary_color` #26B3D0، `ayum_on_primary_color` #FFFFFF، `ayum_surface_color` #E4EDF0، `ayum_tab_text_color` #4E6E70، `ayum_price_color` #EA3A79، `ayum_badge_text_color` #EA3A79، `ayum_star_color` #F2B640.
- **الوصف:** مقتطف نصي من `product.description` (`strip_html` ثم `truncate`)، معزول في سطر واحد داخل `card-product-ayum` ليُستبدل بـ metafield لاحقاً.
- **الشارات:** `snippets/badges.liquid` الأصلي كما هو (خصم %، جديد، `theme.custom_badges` عند تفعيل `use_custom_badge`)، بتنسيق Figma داخل بطاقة AYUM فقط.
- **فحوص مُشغَّلة:** تحليل JSON صارم لكل schema ولـ `index.json`، وتوازن الوسوم، و`node --check` للـ JS، وgrep لألوان حرفية (0)، ونطاق المحددات، ونقاط التوقف (767/1150 فقط)، وروابط Figma (0)، و`git diff` للأصول الأصلية (بدون تغيير).
- **Not run:** `shopify theme dev`/`check`، والعرض في المتصفح، وresponsive وRTL/LTR، ومحرر الثيم، وبيانات المتجر الفعلية (Judge.me metafields و`custom_badges`). موصل Shopify متصل بمتجر آخر، فلم يُستعلم عنه.
- **متابعة 2026-10-13 (التسمية، الحد، الوسم، التبويبات، شارة الخصم):**
  - **التسمية:** `name` والـ preset أصبحا "Featured Collection". اسم الملف `ayum-tabs-collection` ونوع السكشن ومعرّف الـ instance بلا تغيير. ملاحظة: سكشن Kalles الأصلي `featured-collection` يحمل اسماً مشابهاً في قائمة "Add section".
  - **الحد:** السبب أن الحد كان من style 7 الأصلي (`--color-line-border` بشفافية 50%، وهو لون عام من body scheme ولا يُتحكَّم به لكل سكشن). أُضيف `ayum_card_border_color` (#D3E3E8)، والحد 1px. نصف القطر من `--radius-product-card` (16).
  - **صف الوسم والتقييم:** الوصف أُزيل نهائياً. الإعدادان `ayum_show_description` و`ayum_description_length` حُذفا من الـ schema ومن الـ instance، وأُضيف `ayum_show_tag` (true) و`ayum_tag_prefix` (فارغ). المصدر وسم واحد من `product.tags`. تُتخطّى وسوم Kalles الداخلية (`t4_` و`badge_`، نفس قاعدة `_product-meta-tags`). مع البادئة: فقط الوسوم التي تبدأ بها، وتُعرض بدونها. بدون وسم مناسب لا يظهر شيء، وارتفاع الصف ثابت.
  - **التبويبات:** لم يُعثر على سبب اختفاء النص في كود هذا الفرع. harness محلي بملفات CSS الحقيقية وglobal.min.js والخطوط العربية أظهر النصوص بالألوان الصحيحة على 375/768/1440. السبب يحتاج HTML/لقطة من المتجر الفعلي. أُضيفت ألوان مستقلة: `ayum_tab_bg_color` و`ayum_tab_active_bg_color` و`ayum_tab_active_text_color`، ويُعاد استخدام `ayum_tab_text_color` للنص غير النشط.
  - **شارة الخصم:** مفتاح `products.product.ayum_save_percent` في 6 لغات (ar: "وفّر {{ percent }}%"). يُمرَّر لـ `badges.liquid` الأصلي عبر المعامل الموثّق `sale_percent_t`، والنسبة محسوبة من السعر الفعلي. الشارة `display:block` داخل بطاقة AYUM فقط، لأن `display:flex` الأصلي يفصل النص عن الرقم.
  - **فحوص:** JSON صارم لكل schema، وlocale tolerant parse مع تحقق أن المحتوى الآخر لم يتغير، و0 ألوان حرفية، و`node --check`. harness (Playwright): حد البطاقة 1px #D3E3E8 بنصف قطر 16، والبطاقة على الموبايل 158×261 (Figma 158×259)، والتقدّم مخفي على الموبايل، ولا overflow أفقي. تغيير كل متغير لون غيّر العنصر المقصود.
- **متابعة 2026-10-13 (2) — نجوم Judge.me، موضع الصف، التبويبات:**
  - **Judge.me:** التكامل الفعلي في الثيم هو `snippets/hdt-pr-card-rating.liquid` المعدَّل من التاجر (غير committed). لا يوجد أي markup لـ `jdgm` في الثيم. يقرأ `product.metafields.reviews.rating` ويرسم `fill_star_rating.svg` و`unfill_star_rating.svg`، ويُعرض دائماً حتى عند 0 تقييم (5 نجوم فارغة "(0)").
  - **فرقان في نسخة AYUM السابقة:** (1) كانت تشترط `reviews.rating_count.value > 0` بينما الأصل لا يشترطه؛ (2) كانت ترسم ★ Unicode عبر CSS.
  - **التعديل:** أُعيدت كتابة `snippets/ayum-card-rating.liquid` بنفس المصدر ونفس ملفات النجوم ونفس منطق التقريب (0.3–0.7 = نصف نجمة تُرسم ممتلئة). تُعرض القيمة "4.8" بدل "(العدد)". بدون تقييم لا يُعرض شيء (لا نجوم وهمية).
  - **أُزيل `ayum_star_color`** من الـ schema والـ CSS والـ instance، لأن لون النجوم أصبح من ملفات SVG الخاصة بالتكامل.
  - **الصف:** التقييم يميناً والوسم يساراً (Figma 2001:94: الوسم x=0 والتقييم x=194–277). ترتيب المصدر: التقييم ثم الوسم داخل غلاف البطاقة المثبَّت RTL، والوسم يُدفع إلى inline-end بـ `margin-inline-start:auto`. كل عنصر يحتفظ بجهته عند غياب الآخر.
  - **harness:** على 375 و1440 التقييم ملاصق لليمين والوسم لليسار، والمسافة صف↔صورة وصف↔عنوان 6/10px (= Figma)، وارتفاع الصف 13/17px، ونجوم SVG محمَّلة، و3.5 تظهر `****o`. الوسم الطويل على الموبايل يُقطع بـ "…" داخل البطاقة.
  - **التبويبات:** لم يُحدَّد السبب في هذه المتابعة. حُلَّت لاحقاً في متابعة (3) أدناه.
- **متابعة 2026-10-13 (3) — حلّ التبويبات واستعادة التقييم الأصلي:**
  - **سبب التبويبات الفارغة (مؤكَّد):** كتل التبويب هي theme blocks، وإعداداتها لا تُقرأ من حلقة `section.blocks` في السكشن الأب (القيمة فارغة).
    - **الدليل من الكود:** كل سكشن Kalles يقرأ `block.settings` داخل هذه الحلقة يستخدم section-local blocks (announcement-bar وmarquee وcollections-list-tabs وmain-product-tabs وtoolbar-mobile وغيرها). السكشن الوحيد ذو theme blocks (`tabs-collection` + `_tab-collection`) يحقن العنوان من داخل الكتلة عبر CSS `::before content`.
    - **الخطأ:** نسخة AYUM حذفت هذا الحقن واعتمدت `{{ block.settings.title }}` في السكشن، فظهرت الحبوب بالـ padding فقط.
    - **سبب فشل الاختبار المحلي السابق:** الـ harness كان يكتب النص مباشرة في الـ markup.
    - **التحقق:** نسخة harness بنفس المخرجات الفعلية (span فارغ) أعادت إنتاج الخطأ (حبوب 40×18 بلا نص).
  - **إصلاح التبويبات:** أُعيدت آلية الحقن الأصلية إلى `_ayum-tab-collection` مع escaping أأمن (`\` و`'` و`<`)، ويشمل ذلك أيقونة التبويب. أُزيل الـ `<img>` والنص غير القابلَين للقراءة من السكشن، وحُذفت قاعدة `.ayum-tabs-collection__tab-icon`. بعد الإصلاح: الحبوب 104×34 (Figma 106×34) على الديسكتوب و86×30 على الموبايل، والألوان من إعدادات Tabs.
  - **التقييم:** البطاقة ترندر `hdt-pr-card-rating` الأصلي مباشرة بلا تعديل (نفس المصدر ونفس ملفات SVG ونفس التقريب، و5 نجوم فارغة للمنتج بلا تقييم)، داخل غلاف `.ayum-card-rating` في يمين الصف. تُضاف القيمة "4.8" فقط عندما `reviews.rating > 0`. يُخفى "(العدد)" الأصلي بـ CSS مقيّد (غير موجود في Figma)، وتُضبط مقاسات النجوم على Figma.
  - **حُذف `snippets/ayum-card-rating.liquid`** (منطق مكرر لم يعد مستخدماً).
  - **التحقق:** harness فقط. التحقق في محرر الثيم الفعلي **لم يُجرَ**.
- **قيود معروفة:** المسافات من الإعدادات الأصلية مضبوطة على قيم الديسكتوب. على الموبايل تكون المسافة بين العنوان والتبويبات 8px (Figma 16px)، وبين التبويبات والبطاقات 30px (Figma 24px)، بسبب منطق الإعدادات الأصلية. ألوان العنوان والنص الثانوي والحد تتبع الـ scheme الحالي (Kalles demo) حتى يُنشأ scheme خاص بـ AYUM. التبويبات بلا مجموعات مختارة حتى يحددها التاجر.

### 2026-10-13 — H4 Bundles & Trial Packs — تنفيذ أول (فرع `dev2-ah`)
- **Figma:** فُحصت `2001:156` (desktop) و`2001:721` (mobile) عبر `get_metadata` و`get_design_context` و`get_variable_defs` ولقطات الشاشة.
- **الأساس الأصلي (لم يُعدَّل):** `sections/featured-collection.liquid` (static `section-heading` + كتلة منتجات واحدة + `colors_by_section` و`color_scheme` و`background_opacity`)، و`blocks/_product-carousel.liquid`، و`snippets/card-product7.liquid`، و`snippets/btn-ultra.liquid`.
- **أُعيد استخدامها بلا تغيير:** `section-heading` و`_heading_section` و`_sub_heading_section` (بما فيه `hidden_on_mobile`)، و`card-price` و`badges` و`card-product-media`، و`assets/ayum-slider-progress.js`.
- **ملفات جديدة:**
  - `sections/ayum-featured-collection.liquid` باسم المحرر "Featured Collection — Bundles".
  - `blocks/_ayum-bundle-product-carousel.liquid`: خيار بطاقة `ayum_bundle`؛ البطاقات 1–12 كما هي.
  - `snippets/card-product-ayum-bundle.liquid`.
  - `snippets/ayum-btn-ultra.liquid`: نسخة من btn-ultra الأصلي مع `add_label` اختياري فقط.
- **ملفات معدَّلة:**
  - `assets/dev2.css`: إضافات فقط تحت `.ayum-featured-collection`.
  - مفتاح `products.product.ayum_add_bundle` في 6 لغات (ar: "أضف الباكت").
  - `templates/index.json`: أُضيف `ayum_featured_collection_bundles` بعد `ayum_tabs_collection_best_sellers`، وبقية الملف مطابقة بايتاً ببايت.
- **Scheme 2:** المعرّف الفعلي `scheme-77e4ef58-56a9-4631-876a-12098ba7d57d`، مع `colors_by_section` و`background_opacity` 0.6.
  - **[تحقق]** Scheme 2 في `settings_data.json` على هذا الفرع داكن (#222222 خلفية ونص أبيض). على `dev1-ah` هو سطح AYUM (#E4EDF0 خلفية و#26383A نص و#D3E3E8 حد).
  - السكشن يتبع الـ scheme: مُتحقَّق في harness بالقيمتين. يجب ضبط Scheme 2 في Theme settings لهذا الثيم.
- **إعدادات AYUM** (Figma افتراضياً): `ayum_primary_color` #26B3D0 (الزر وشريط التقدّم، والمسار نفسه بشفافية 12%)، و`ayum_on_primary_color` #FFFFFF، و`ayum_card_border_color` #D3E3E8، و`ayum_sale_color` #EA3A79 (السعر ونص الشارة)، و`custom_class`.
  - على الكتلة: `ayum_show_description`، و`ayum_description_length` (40)، و`ayum_atc_label`، و`ayum_show_progress`.
- **الوصف:** metafield الأصلي `theme.description_excerpt` أولاً (نفس منطق `_product-description`)، ثم نص مجرد مقتطع من `product.description`. العنصر يُعرض حتى وهو فارغ لثبات المحاذاة.
- **السعر:** `card-price` الأصلي، والحالي يميناً عبر `order: -1` داخل البطاقة RTL. القديم يساراً بخط الشطب الأصلي. قاعدة اللون بخصوصية (0,5,0) لتغلب قاعدة السعر الأحمر الأصلية (0,4,0).
- **الموبايل:** بطاقة أفقية (grid RTL: الصورة 110×130 يميناً والمحتوى يساراً)، و`--slide-size: 93%` مع ظهور جزء من البطاقة التالية. العنوان الفرعي مخفي بإعداد `hidden_on_mobile` الأصلي، وشريط التقدّم مخفي تحت 1150px.
- **فحوص:**
  - JSON صارم للـ schemas، وتوازن الوسوم، و0 ألوان حرفية، وتحقق أن الـ locales و`index.json` إضافات فقط.
  - harness (Playwright، CSS/JS الحقيقية) على 1440 و768 و375: البطاقة 307×463 desktop (Figma 305×459) و333×156 mobile (Figma 334.5×154)، والسعر الحالي يمين القديم، والتقدّم 510×3، ولا overflow.
  - **Not run:** محرر الثيم، والمتجر الفعلي، والإضافة الفعلية إلى السلة.
- **قيود:**
  - شفافية الخلفية إعداد واحد (0.6)، بينما Figma mobile 50%.
  - Figma mobile يعرض السعر القديم بلا عملة، والتنفيذ يستخدم تنسيق Shopify الكامل.
  - عنوان المنتج سطر واحد.
  - المجموعة فارغة في الـ instance (حالة placeholder الأصلية) حتى يختارها التاجر.
- **ملاحظة على H3 (لم يُعدَّل):** قاعدة السعر في `.ayum-tabs-collection` (0,3,0) أضعف من قاعدة السعر الأحمر الأصلية (0,4,0)، فالمنتجات المخفَّضة في H3 ستظهر بالأحمر الأصلي بدل `ayum_price_color`. يحتاج متابعة لـ H3.
- **متابعة 2026-10-14 — خط العنوان الفرعي، سعر الموبايل، اسم السكشن:**
  - **العنوان الفرعي:**
    - **السبب:** `theme.css` يطبّق على `.hdt-section-heading_block .hdt-subheading-block` الخط `--font-sheading-family` = `--f_family_3` = Libre Baskerville، وهو بلا حروف عربية، فظهر النص بخط نظام رفيع وبوزن 400.
    - **الإصلاح (`dev2.css` فقط):** `font-family: var(--font-body-family)` (Almarai من الإعدادات)، و`font-weight: var(--font-bold)`، و`line-height: 1.556` (24.9/16).
    - **harness:** قبل: Libre Baskerville 400 16/24. بعد: Almarai 700 16/24.896، توسيط، والمسافة عن العنوان 16px، ومخفي على الموبايل.
  - **سعر الموبايل:**
    - **السبب:** عنصرا السعر flex items بـ `flex-shrink:1` وبلا `white-space:nowrap`. حين يضيق العمود يتقلّص كل سعر إلى أطول كلمة فيه، فتنكسر العملة إلى سطر ثانٍ.
    - **الإصلاح:** `flex: 0 0 auto` و`nowrap` على السعرين. على الموبايل `container-type:inline-size` على عمود المحتوى، والأحجام بنسب Figma (`11cqi` و`6.5cqi` والمسافة `4.25cqi`) بحد أدنى 14 و10px.
    - **harness بخط Almarai الحقيقي:** سطر واحد على 320 و375 و390 و425، والحالي يميناً والقديم يساره، بلا overflow. الديسكتوب بلا تغيير (23px، مسافة 10px).
    - **ملاحظة:** Figma يعرض السعر القديم بلا عملة. لا يوجد إعداد Kalles لذلك، فبقي التنسيق الأصلي.
  - **الاسم:**
    - "Featured Collection — Bundles" (29 حرفاً) يتجاوز حد Shopify (25)، وكان سبب رفض الرفع سابقاً.
    - اختار المستخدم "Featured Coll. — Bundles" (24) للـ `name` والـ preset.
    - سكشن Kalles الأصلي بلا تغيير ("Featured collection" عبر `t:sections.collection_products.name`).
  - **الملفات:** `assets/dev2.css`، و`sections/ayum-featured-collection.liquid` (الاسم)، و`blocks/_ayum-bundle-product-carousel.liquid` (تعليق).
  - **Not run:** محرر الثيم.
- **متابعة 2026-10-13 — السكشن لا يظهر في Dev Preview:**
  - **البيئة:** `shopify theme dev` الوحيد يعمل (node PID 20084، بدأ 17:48)، ومجلد العمل الفعلي له `D:Shopifyayum-dev2-ah` (قُرئ من PEB العملية). إذن المعاينة تخدم الـ worktree والفرع الصحيحين.
  - **السبب (مستنتج من قاعدة Theme Check الرسمية `ValidSchemaName`، الحد 25 حرفاً):** اسم السكشن والـ preset كان "Featured Collection — Bundles" (29 حرفاً).
    - Shopify يرفض رفع ملف السكشن.
    - ثم يرفض `templates/index.json` لأنه يشير إلى نوع سكشن غير موجود.
    - فتبقى المعاينة على القالب السابق.
  - **الإصلاح:** الاسم أصبح "Featured Bundles" (16 حرفاً) في `name` والـ preset. نوع السكشن واسم الملف ومعرّف الـ instance بلا تغيير.
  - **فحوص:** كل قيم الـ instance صالحة مقابل الـ schemas، وكل ملفات `render` موجودة، و`dev2.css` يُحمَّل من السكشن.
  - **مطلوب من المستخدم:** حفظ `templates/index.json` مرة واحدة ليُعاد رفعه (الملف لم يتغير محلياً فلن يُرفع تلقائياً)، ثم مراجعة طرفية `theme dev`. لم يُتحقق في Dev Preview.

- **متابعة 2026-10-14 — عدد أسطر عنوان المنتج:**
  - **الإعداد:** `ayum_product_title_lines` ("Product title lines"، select 1–4، افتراضياً "1") في البلوك `_ayum-bundle-product-carousel`، بجانب إعدادات البطاقة الأخرى.
  - **التمرير:** `style="--ayum-product-title-lines: …"` على أغلفة `.ayum-bundle-carousel` الثلاثة.
  - **CSS (`dev2.css`):**
    - العنوان: line-clamp عبر `--ayum-product-title-lines` (`-webkit-line-clamp` + `line-clamp`) مع ellipsis، والاسم الكامل باقٍ في الرابط. ارتفاع محجوز بعدد الأسطر حتى تبقى البطاقات متساوية.
    - `overflow-wrap: anywhere` للكلمات الطويلة، و`unicode-bidi: plaintext` حتى تظهر ellipsis الاسم الإنجليزي في نهايته الصحيحة.
    - على الموبايل `text-align: right` (حافة بداية البطاقة RTL). على desktop يبقى الوسط عبر `match-parent`.
  - **إعادة الاستخدام:** نمط `ayum_title_lines` في `_ayum-product-carousel` (Best sellers)، وآلية `-webkit-line-clamp` في `.hdt-line-clamp` الأصلية. لا إعداد Kalles أصلي لعدد الأسطر.
  - **الارتفاع:** بطاقة الموبايل `min-height: 15.4rem` (ليست ثابتة)، فتكبر مع 3–4 أسطر (156 / 164 / 181px على 375). لم يُغيَّر أي قيد.
  - **harness:** الأسطر 1–4 × 1440/375/320 مع عناوين عربية وإنجليزية طويلة وكلمة بلا مسافات: 12/12 بلا تداخل مع الوصف/السعر/الزر، والزر داخل البطاقة، ولا overflow.
    - **ملاحظة اختبار:** العنوان الأصلي `.hdt-card-product__title` عليه `transition: all .25s`، فالقياس بعد تغيير المتغير في نفس الإطار يعطي قيماً وسطية. في المتجر القيمة تأتي من Liquid عند الرسم.
  - **Not run:** محرر الثيم.

### 2026-10-14 — H7 Reviews / Testimonials — تنفيذ أول (فرع `dev2-ah`)
- **Figma:** فُحصت `2001:316` (desktop) و`2001:826` (mobile) عبر `get_metadata` و`get_design_context` و`get_variable_defs` ولقطات الشاشة. لون نقطة "شراء موثّق" (#2D7A4F) = لون نص الشارة، فتُرسم بـ `currentColor`.
- **الأساس الأصلي (لم يُعدَّل):** `sections/testimonial_section.liquid` (اسمه "Testimonials")، و`blocks/_testimonial_item.liquid`، و`snippets/quote_1.liquid`، و`snippets/rating_star.liquid`، و`assets/testimonials.css`.
  - **لماذا هذا الأساس:** carousel متعدد الأعمدة (`<hdt-slider>`، و`col_dk/tb/mb`)، وإعدادات البطاقة (`cl_bg_item` و`cl_content` و`cl_name` و`bdr` والمسافات)، وheading ثابت. `testimonials_2` تخطيط صورة مزامَن، فهو أبعد.
- **ملفات جديدة:**
  - `sections/ayum-testimonial_section.liquid`: الاسم الظاهر بقي `t:sections.testimonials_section.name` = "Testimonials" (للسكشن والـ preset). يضيف تصميم `ter_des = ayum`، ونجوم الملخّص، وشريط التقدّم.
  - `blocks/_ayum-testimonial-item.liquid`: الاسم "Testimonial"، وكل إعداداته الأصلية باقية، مع إضافة `ayum_product` و`ayum_verified` (افتراضياً false).
  - `snippets/ayum-quote.liquid`: مقتبس من `quote_1`، ويستخدم `rating_star` الأصلي.
- **ملفات معدَّلة:**
  - `assets/dev2.css`: إضافات فقط تحت `.ayum-testimonial-section`.
  - مفتاح `products.product.ayum_verified_purchase` في 6 لغات (ar: "شراء موثّق").
  - `templates/index.json`: أُضيف `ayum_testimonials` بعد `ayum_featured_collection_bundles`، وبقية الملف مطابقة بايتاً ببايت.
- **Scheme 5:** `scheme-fe88a2ec-47a1-478d-8953-54da0178e18c` مع `background_opacity` 0.4.
  - يتحكم في الخلفية والعنوان (`hdt-s-text`) والعنوان الفرعي (`hdt-text-secondary`)، ونجوم الملخّص وتعبئة التقدّم (`--color-accent`).
  - **[تحقق]** قيم Scheme 5 الحالية على هذا الفرع داكنة (#383838)؛ سيضبطها التاجر.
- **إعدادات أصلية مُعاد استخدامها:** `cl_bg_item` #E78333، و`cl_content`/`cl_name` #FFFFFF، و`bdr` 16، و`content_align` right، و`col_dk/tb/mb` 3/2/1، و`space_horizontal` 20، و`space_horizontal_mb` 4، و`layout` carousel. والعنوان والعنوان الفرعي عبر `section-heading` الأصلي.
- **إعدادات AYUM جديدة (Figma افتراضياً):** `ayum_show_header_stars`، و`ayum_header_rating` (يدوي، مع ملاحظة صريحة)، و`ayum_star_color` #FFCC00، و`ayum_badge_bg_color` #FFFFFF، و`ayum_badge_text_color` #2D7A4F (حد الشارة مشتق بنسبة 30%)، و`ayum_progress_track_color` #26B3D0 (بنسبة 12%)، و`ayum_show_progress`، و`custom_class`.
- **المحتوى المبدئي:** نصوص Figma (الملخّص "4.8 من 5 · أكثر من 400 تقييم" و3 مراجعات) كمحتوى قابل للتعديل، وكل المراجعات `ayum_verified = false`.
  - **يجب استبدالها بمراجعات وإحصاءات حقيقية قبل النشر.**
- **قيود:**
  - حجم العنوان الفرعي على الموبايل 14px (Figma 13px)، لأن نطاق الإعداد الأصلي خطوته 2.
  - نجوم التقييم بهندسة LTR الأصلية، فنصف النجمة في أقصى اليسار.
  - لون النصف الفارغ من نصف النجمة `#dedede` موروث من `<style>` عام في السكشن الأصلي، تُرك كما هو كي لا يتغير سلوك Kalles في الصفحة.
- **فحوص:**
  - JSON صارم، وأسماء ≤25، وكل قيم الـ instance صالحة (صُحّح 13 إلى 14)، وملفات `render` موجودة، و0 ألوان حرفية جديدة، والـ locales و`index.json` إضافات فقط.
  - harness (Playwright، CSS/JS والخطوط الحقيقية) على 1440 و768 و375 و320: البطاقة 417×244 desktop و343 mobile، والنجوم ونصف النجمة في مكانها، والشارة اختيارية، والصورة الاختيارية يمين الاسم، والتقدّم 510×3 desktop فقط، ولا overflow.
  - **Not run:** محرر الثيم والمتجر.
- **متابعة 2026-10-14 — المسافات، الخطوط، صيغة الموبايل:**
  - **أسباب ضغط المسافات:**
    - نجوم الملخّص بـ `line-height: 0` في `rating_star`، فكان صندوقها 28px بدل 36 (موبايل 26).
    - العنوان بـ `hdt-lh-1` من الـ instance، فكان سطره 36px بدل 40.
    - صف نجوم البطاقة 14px بدل 25 (موبايل 16).
    - هامش الـ heading الأصلي على الموبايل 16px بدل 14.
  - **الإصلاح (`dev2.css`، كتلة Testimonials فقط):**
    - `min-height` لصندوقي النجوم (36/26 و25/16)، و`line-height: 1.11` للعنوان.
    - `direction: rtl` لمنطقة العنوان (محتوى عربي).
    - `margin-block-start: -0.2rem` للـ carousel على الموبايل.
  - **النتيجة في harness:**
    - desktop: 48 / 36 / 16 / 40 / 16 / 25 / 32.
    - mobile: 24 / 26 / 8 / 23 / 8 / 23 / 14.
    - مطابقة لـ Figma.
  - **الخط الثانوي:**
    - **القياس:** عرض "سكيتلز مجفف بالتجميد" بوزن 700 = 126.3px (Figma 127)، و800 = 132.7، فالوزن المحلي مطابق.
    - **السبب المرجّح في المتجر:** استخدام `--font-bold`/`--font-extrabold` النسبيين (وزن body + 300/400).
    - **الإصلاح:** أوزان Almarai مطلقة (400/700/800) لنصوص هذا السكشن. الشارة لم تُلمس.
  - **صيغة الموبايل:**
    - إعداد جديد `ayum_mobile_summary`، افتراضياً "4.8 من 5 · +400 تقييم".
    - يُعرض كـ `h3` تحت 768px ويُخفى العنوان الأصلي هناك. بـ `display:none` يبقى عنوان واحد فقط مكشوفاً لقارئ الشاشة.
    - فارغ = العنوان الأصلي على الموبايل أيضاً.
  - **حجم العنوان الفرعي على الموبايل:**
    - إعداد جديد `ayum_subtitle_size_mobile` (10–24، خطوة 1، افتراضياً 13)، لأن نطاق الإعداد الأصلي خطوته 2.
    - القيمة 14 المحفوظة في الإعداد الأصلي لم تُغيَّر، لكنها لا تؤثر على الموبايل في هذا السكشن.
  - **ملاحظة:** شارة "شراء موثّق" ارتفاعها المرسوم 21px مقابل 18 في Figma، فالبطاقة أطول بـ 3px (226 مقابل 223). تُركت بطلب المستخدم.
  - **الملفات:** `sections/ayum-testimonial_section.liquid` و`assets/dev2.css` فقط. لم يتغير `index.json` ولا الملفات الأصلية ولا Scheme 5.
  - **Not run:** محرر الثيم.
- **متابعة 2026-10-14 (2) — أحجام النجوم الفعلية ووزن السطر الثانوي:**
  - **السبب:** المتابعة السابقة طابقت صناديق الأسطر لا النجوم المرئية. SVG النجمة الأصلي يملأ صندوقه، فالحجم المرئي = حجم الـ SVG.
    - كان: 28px للملخّص و14px للبطاقة، والمسافة 2.8 و1.4px.
    - المسافة كانت عبر هامش لكل نجمة، فتُضيف نصف مسافة عند طرفي الصف.
  - **القياس من Figma (عدّ البكسلات الملوّنة في صور العقد):**
    - الملخّص: 25×25 والمسافات 6/6/5/6 والصف 148 (موبايل: 18، ~4.75، والصف 108).
    - البطاقة: ~12.5 والمسافة ~2.75 والصف 74 (موبايل: 11، والمسافات 3/3/2/3، والصف 65).
  - **الإصلاح (`dev2.css`، Testimonials فقط):**
    - `.rating` أصبح `inline-flex` مع `gap: var(--ayum-star-gap)`، و`margin: 0` للنجوم. إزاحات نصف النجمة ما زالت بنفس خطوة الحجم + المسافة.
    - الأحجام: ملخّص 2.5rem / 0.58rem (موبايل 1.8 / 0.47)، وبطاقة 1.25rem / 0.28rem (موبايل 1.1 / 0.27).
    - دُمجت قاعدتا `.ayum-quote__rating` على الموبايل في قاعدة واحدة.
  - **التحقق بقياس البكسلات لما رسمناه نحن:**
    - الملخّص desktop: 25، والمسافات 6/6/5/6، والصف 148 (مطابق لـ Figma). موبايل: 18، والصف 108–109.
    - البطاقة desktop: 12، والصف 74. موبايل: 11، والمسافات 3/3/2/3، والصف 66.
    - المسافة تحت حبر النجوم: البطاقة 18px (Figma 19)، والموبايل 15px (Figma 15)، والملخّص إلى العنوان 22px (Figma 23).
  - **السطر الثانوي (المنتج):** `font-weight: 400` بنفس وزن نص المراجعة (طلب التاجر)، والاسم باقٍ 800.
    - **المقاس:** body 400، product 400، name 800 على 1440 و375 و320.
  - شارة "شراء موثّق" لم تُلمس (تحقق آلي).
  - **الملفات:** `assets/dev2.css` فقط.
  - **Not run:** محرر الثيم. الملف المحلي يُرفع عبر جلسة `theme dev` القائمة.

### 2026-10-14 — H8 Product videos / Shoppable Video — تنفيذ أول (فرع `dev2-ah`)
- **Figma:** فُحصت `2001:366` (desktop) و`2001:861` (mobile) عبر `get_metadata` و`get_design_context` و`get_variable_defs` ولقطات الشاشة، وفُحص SVG زر التشغيل (`2040:141`): دائرة 60px بلون Ink 35% ومثلث أبيض.
  - **[تحقق] تعارض:** Figma Desktop فيه **5** بطاقات (225×400 + لوحة 127، بمسافة 38px)، لا 4. طُبِّق Figma: `col_dk` = 5.
  - **[تحقق] تعارض:** مؤشر التقدّم في Figma جزئي (≈67%) رغم أن البطاقات الخمس كلها ظاهرة. طُبِّق السلوك الحقيقي: الشريط يظهر فقط عندما تتحرك البطاقات فعلاً (أكثر من snap).
- **الأساس الأصلي (لم يُعدَّل):** `sections/product-video.liquid` (اسمه "Shoppable Video") و`blocks/_product-video.liquid`، مع `<hdt-video-player>` و`<hdt-slider>` من `global.min.js`.
  - **لماذا يحتاج نسخة:** الأصل يضع `autoplay` ثابتاً، ولا يدعم 5 أعمدة ولا التوسيط على الموبايل، وبطاقته مختلفة.
- **ملفات جديدة:**
  - `sections/ayum-product-video.liquid`: الاسم الظاهر "Shoppable Video" (للسكشن والـ preset). كل إعدادات الأصل باقية، و Style 1/2 يعملان كما في الأصل. أُضيف خيار Style = "AYUM" وخيار `col_dk` = 5.
  - `blocks/_ayum-product-video.liquid`: كل إعدادات الأصل باقية، مع إضافة `ayum_poster` و`ayum_views`. أُزيلت القيمة الافتراضية لرابط YouTube التجريبي في النسخة فقط.
  - `assets/ayum-shoppable-video.js`: عنصر `<ayum-shoppable-video>` يستدعي `play()`/`pause()` الأصليين و`goToTarget()` الأصلي.
- **ملفات معدَّلة:**
  - `assets/dev2.css`: إضافات فقط تحت `.ayum-product-video` (362 سطراً، بلا حذف).
  - `assets/ayum-slider-progress.js`: سطر واحد. `scrollable` أصبح `api.scrollSnapList().length > 1` بدل `size < 1` (التقريب بالبكسل أظهر الشريط مع 5 بطاقات ظاهرة). لا يقرأ هذه السمة إلا هذا السكشن.
  - `templates/index.json`: أُضيف `ayum_shoppable_video` بعد `ayum_testimonials`. التغيير الوحيد في الموجود هو فاصلة بعد `"ayum_testimonials"` في `order` (تحقق آلي: حذف الإضافة يعيد الملف الأصلي حرفياً).
- **إعادة استخدام:**
  - التشغيل: `<hdt-video-player>` بدون `autoplay` + سمة `group` الأصلية للتشغيل الحصري، وأحداث `media:play`/`media:pause` الأصلية.
  - الـ slider: `<hdt-slider>` مع خيارات Embla عبر `config`، و`.is-selected` الأصلي للبطاقة النشطة.
  - العنوان: `section-heading` الأصلي. السعر: `card-price` (مع `ayum-money`). الإضافة للسلة: `ayum-btn-ultra` الموجود مع `add_label`، أي نفس مسارات المتغيرات وquick add ونفاد المخزون.
- **Scheme 3:** `scheme-e0b73555-c767-4eda-aa6d-4e44e10aefce`.
  - يتحكم في الخلفية والعنوان والعنوان الفرعي، وسطح البطاقة، والتسمية على الموبايل، وطبقات الفيديو (شارة المدة Ink 75%، ودائرة التشغيل Ink 35%، وشارة المشاهدات White 90%).
- **إعدادات AYUM جديدة (Figma افتراضياً):**
  - المسافات: `ayum_gap` 38 و`ayum_gap_mb` 12، لأن `space_items` الأصلي لا يتجاوز 20.
  - `ayum_subtitle_size_mobile` 13، لأن خطوة الإعداد الأصلي 2.
  - السلوك: `ayum_video_muted` (true)، و`ayum_show_duration`، و`ayum_show_progress`.
  - النصوص: `ayum_product_label` ("المنتج في الفيديو")، و`ayum_atc_label` ("اطلب المنتج"؛ فارغ = ترجمة الثيم).
  - الألوان: `ayum_primary_color` #26B3D0، و`ayum_on_primary_color` #FFFFFF، و`ayum_card_border_color` #D3E3E8، و`ayum_price_color` #EA3A79، و`ayum_views_text_color` #4E6E70.
  - `custom_class`.
- **المحتوى:**
  - 5 بلوكات فارغة. الفيديو والمنتج يختارهما التاجر.
  - المدة تُقرأ من `video.duration` (ملّي ثانية). المشاهدات نص يدوي اختياري (فارغ = مخفي)، ولا أرقام مختلَقة.
  - بلا فيديو: placeholder في المحرر، ولا شيء في المتجر. بلا منتج: لا لوحة منتج.
- **فحوص ثابتة:** JSON صارم، والأسماء ≤25، وكل قيم الـ instance والـ preset صالحة، وملفات `render` موجودة، وتوازن الوسوم، و0 ألوان حرفية، و0 روابط Figma، ونقاط التوقف 767/768 فقط، و`node --check` للـ JS.
- **harness (Playwright، CSS/JS والخطوط الحقيقية، فيديو WebM حقيقي) على 1440 و1150 و1149 و768 و767 و375 و320، RTL وLTR:**
  - **Desktop 1440:**
    - الحشو 64/40، والعنوان 40، والعنوان الفرعي 24.9، والمسافات 16 و32.
    - 5 بطاقات 227.6 (حاوية 1290 من إعداد الثيم مقابل 1280 في Figma)، والمسافة 38، والوسائط 9:16، واللوحة 127، والصورة 48، والزر 41.
    - التقدّم 510×3 على بعد 32.
  - **Mobile 375:**
    - العنوان 23، والعنوان الفرعي 23.4، والمسافات 8 و14.
    - البطاقة 172.1×436 في الوسط تماماً، والجارتان بشفافية 0.5، واللوحة 130، والزر 33، ولا صورة ولا تقدّم.
  - **وظيفياً:**
    - التشغيل والإيقاف بالزر وبـ Enter. تشغيل بطاقة يوقف الأخرى.
    - السحب يغيّر البطاقة النشطة ويوقف الفيديو السابق. الضغط على بطاقة جانبية يوسّطها ثم يشغّلها.
    - التمرير على desktop يوقف البطاقات الخارجة. زر الإضافة يرسل الفورم الأصلي.
    - لا overflow أفقي، و0 أخطاء console.
  - **أُصلح أثناء الاختبار:**
    - جهة شارة المدة: `direction: ltr` كان يعكس الإزاحة المنطقية.
    - ارتفاع سطر السعر: القائمة الأصلية بـ `line-height: 1`.
    - البداية على الموبايل بالبطاقة الثانية (عند 3 بطاقات أو أكثر) لتظهر جارتان كما في Figma.
- **Not run:** محرر الثيم والمتجر.
  - رفع فيديو Shopify حقيقي، و`video_tag` الفعلي، وقيمة `video.duration`، والصوت عند `ayum_video_muted = false`.
  - ربط منتج حقيقي، والسلة/الـ drawer، وquick add للمنتجات متعددة الخيارات، وإعادة تحميل السكشن في المحرر، و`section.blocks.size` مع البلوك الثابت.
- **متابعة 2026-10-14 — شفافية البطاقة النشطة، شارة المشاهدات، أدوات التحكم الأصلية:**
  - **Figma (أُعيد فحص `2001:366` و`2001:861`):**
    - البطاقة النشطة على الموبايل opacity 1، والجارتان `opacity-50` على البطاقة كاملة، ولا blur.
    - شارة المشاهدات أعلى يمين الفيديو: desktop 15/13 و`4px 10px` وradius 10 و11px Bold؛ mobile 15/12 و`3px 9px` وradius 9 و10px.
  - **الشفافية — السبب الجذري:** القاعدة كانت مشروطة بـ `.is--enabled`، والـ slider الأصلي يحذف هذه الكلاس عند كل حدث `resize` من Embla (إخفاء/إظهار شريط عنوان المتصفح على الموبايل، وتغيير حجم معاينة المحرر).
    - النتيجة: كل البطاقات بشفافية 1.
    - تأكيد في harness بعد resize: القاعدة القديمة تطابق 0 شرائح والجديدة 5.
    - **الإصلاح:** الشرط أصبح `.ayum-pv__slider:has(.is-selected)` (كلاس Embla الأصلي). desktop لم يتغير (كل البطاقات 1).
  - **شارة المشاهدات:**
    - الكود والـ CSS سليمان: تُعرض متى كان الحقل غير فارغ، `z-index: 2` فوق الفيديو، ولا شيء يخفيها.
    - **السبب المرجّح:** حقل `ayum_views` (Views label) فارغ افتراضياً وفي كل البلوكات المزروعة. قيم المتجر غير متاحة محلياً (لم يُنفَّذ pull).
    - **الإصلاح (نفس الـ id، بلا تكرار):**
      - التسمية أصبحت "Views count badge"، مع placeholder "124 ألف مشاهدة" وشرح.
      - أُزيل `visible_if` عن الحقل وعن صورة الـ poster ليظهرا دائماً في المحرر.
      - لا أرقام مختلَقة.
  - **أدوات التحكم الأصلية:**
    - Kalles فيه `show_video_controls` فقط في `blocks/video.liquid` (بلوك آخر، افتراضياً false). أُضيف نفس الـ id للسكشن AYUM: "Show video controls"، checkbox، افتراضياً **true**.
    - `video_tag: controls: section.settings.show_video_controls` + `data-controls` على الوسائط.
    - JS يخفي الأدوات حتى أول تشغيل (مظهر Figma: دائرة + شارات)، ثم يظهرها. زر التشغيل في هذا الوضع هو الدائرة 60px فقط، فلا يغطي الأدوات.
    - بعد البدء تختفي الدائرة وشارة المدة، لأن الأدوات تعرض الوقت وشريطها يغطي مكان الشارة. تعود كلها عندما تغادر البطاقة الشريحة النشطة.
    - الضغط في أسفل 56px من الفيديو (شريط الأدوات) لا يصل للـ slider، فالسحب على شريط الوقت لا يحرّك الـ carousel. السحب على باقي الفيديو وعلى اللوحة يعمل.
    - النقر على فيديو بطاقة جانبية يوسّطها دون تشغيل.
    - عند إيقاف الإعداد يبقى سلوك الزر السابق (تشغيل/إيقاف بالضغط على الفيديو كله). YouTube/Vimeo بلا تغيير.
  - **harness (فيديو WebM حقيقي، خادم بـ HTTP range):**
    - **mobile:**
      - 1/0.5/0.5 قبل resize وبعده وبعد السحب وبعد `goToIndex`، و`filter: none`.
      - التشغيل يُظهر الأدوات. السحب على شريط الأدوات أبقى الشريحة نفسها. السحب على اللوحة وعلى أعلى الفيديو غيّر الشريحة.
      - الفيديو السابق توقف وعاد لمظهر Figma. النقر على الجارة وسّطها. لا overflow.
    - **desktop:** كل البطاقات 1. التشغيل الحصري يعمل. النقر على سطح الفيديو يشغّله أصلياً، والتقديم إلى 10.4s من 22s يعمل.
    - **الوضع بدون أدوات:** نفس نتائج الاختبار الأول (تشغيل/إيقاف، Enter، حصري، إرسال فورم السلة).
    - 0 أخطاء console.
  - **الملفات:** `blocks/_ayum-product-video.liquid`، و`sections/ayum-product-video.liquid` (إعداد واحد)، و`assets/ayum-shoppable-video.js`، و`assets/dev2.css`. لم يتغير `index.json` ولا الملفات الأصلية ولا Scheme 3.
  - **Not run:** محرر الثيم والمتجر.
    - فيديوهات Shopify الحقيقية: أدوات iOS Safari/Android، ومنطقة 56px على أجهزة حقيقية، وملء الشاشة.
    - قيم المشاهدات في بلوكات التاجر، وإعادة تحميل السكشن.
- **متابعة 2026-10-14 — عدد أسطر اسم المنتج:**
  - **الإعداد:** `ayum_product_title_lines` ("Product title lines"، select 1–4، افتراضياً "1") في schema السكشن `ayum-product-video`. إعداد واحد لكل البطاقات، ومستقل عن Bundles.
  - **التمرير:** `--ayum-product-title-lines` في `{% style %}` السكشن.
  - **CSS:**
    - العنوان: line-clamp عبر `--ayum-product-title-lines` (`-webkit-line-clamp` + `line-clamp`) مع ellipsis، والاسم الكامل باقٍ في الرابط. ارتفاع محجوز بعدد الأسطر حتى تبقى البطاقات متساوية.
    - `overflow-wrap: anywhere` للكلمات الطويلة، و`unicode-bidi: plaintext` حتى تظهر ellipsis الاسم الإنجليزي في نهايته الصحيحة.
    - `text-align: right`. `--ayum-pv-title-lh` (1.133 desktop / 1.12 mobile) يربط الارتفاع المحجوز بارتفاع السطر.
  - **الافتراضي يحافظ على Figma:** اللوحة 127 desktop و130 mobile.
  - **harness:** الأسطر 1–4 × 1440/375/320: 12/12. الشفافية والأدوات والتقديم بلا تغيير.
  - **Not run:** محرر الثيم.
