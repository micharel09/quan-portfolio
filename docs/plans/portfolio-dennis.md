# Thay giao diện portfolio theo Dennis — FLY-68

## Mục tiêu và quyết định đã chốt

User đổi hướng ngày 2026-10-14: dùng skill REA reverse toàn bộ website Dennis, dựng các template tương ứng và thay bằng nội dung/ảnh thật của Quân. Tiếp tục [FLY-68](https://linear.app/fly-group/issue/FLY-68/thay-giao-dien-portfolio-theo-dennis), không tạo task mới.

Repo: https://github.com/micharel09/quan-portfolio. Checkout `E:/RepoGIt/Portfolios/quan-portfolio`, branch `main` hiện có; không tạo worktree. Giữ thay đổi có sẵn và hai ảnh `current-preview.png`, `detail-preview.png` của user. Không push/deploy.

Giữ Next.js 16.2.12, React 19, Lenis, dữ liệu EN/VI, ba slug, ảnh, CV và liên hệ. GSAP/ScrollTrigger sở hữu motion website; Framer Motion chỉ sở hữu gallery. Font Manrope hỗ trợ tiếng Việt theo lựa chọn trước đó. Contact dùng email/social/CV thật theo adaptation đã duyệt, không tạo form/backend hay nhập dự án/thành tích của Dennis.

## Reference và mapping

Nguồn live được đọc ngày 2026-10-14:

| Template nguồn | Consumer | Adaptation |
| --- | --- | --- |
| https://dennissnellenberg.com/ | `/` | Chân dung, tên/chức danh/địa điểm, intro và ba dự án thật; mobile hiện hai tile + nút xem tất cả |
| https://dennissnellenberg.com/work | `/projects` | Filter theo lĩnh vực thật, list/grid desktop, tile responsive |
| https://dennissnellenberg.com/work/twice | Ba `/projects/[slug]` hiện có | Brief/contribution/stack, ảnh đội nhóm, gallery và Next case thật |
| https://dennissnellenberg.com/about | `/about` | Giới thiệu, năng lực, kinh nghiệm, stack, chứng chỉ thật |
| https://dennissnellenberg.com/contact | `/contact` | Bố cục tối và liên hệ/CV thật thay form |

Horizontal image strip đang bị comment trong HTML live; không thêm phần đã tắt. Không tạo Archive thiếu dữ liệu. Nội dung dài và ảnh đời thực làm thay đổi xuống dòng/crop so với mẫu; không giả lập ảnh sản phẩm.

## Bằng chứng REA và nguồn

Áp dụng `ui-ux`/RF/REA reconstruction, `clone-runtime` trước `clone-website`, và `reverse-engineer-anything`. REA MCP không có trong phiên; doctor báo registration Codex stale. Không sửa global config, không cài engine native. Dùng public REA CLI 6.4.0 tại `E:/codex-data/packages/rea/node_modules/.bin/rea.cmd`, Chrome riêng qua CDP 9337; không dùng CDP nội bộ Orca.

- `list-browser-targets`: discovery evidence `ev_d2d6c487f8370b2c3aeb21797f807c5f88e8bac90e0f214e74293a8dc1e145ef`.
- `analyze-web-bundle`: evidence `ev_f15fdfdb42a0329aa90c964e4e4657153c16790e3f3a3976be81e4c398605c85`; ba script first-party, 18,502 AST nodes, 0 parse errors, source maps không có.
- `inspect-web-page`: evidence `ev_ead011548b32ca240f86af5cd836fe76ae13fe341e00487ce14531796106b212`.
- `capture-browser-scenario`: evidence `ev_dde02ad8b08bd01e9d8ea7f415a3dd051915bf04a812633f0a127157490ff273`; tám bước Home/About/Contact/Work/TWICE hoàn thành, có DOM/accessibility/URL và network metadata. Request media chưa kết thúc không có coverage đầy đủ; không coi đây là bằng chứng timing.
- Đọc first-party `/assets/js/index-new.js`, `/assets/css/style-new.css`, `styleguide.css`, `components.css`. JS 36,812 bytes, SHA-256 `7d997e8eed26c01228065ae0fe55a71ee812348429e5e54361947dc2407604aa`.
- Đo computed CSS/DOM năm template ở 1440/768/390 × 900, DPR 1. Chụp đầu/cuối trang và quay source/candidate cùng viewport/thao tác. Nguồn source là căn cứ tham số; capture runtime kiểm tra quỹ đạo và trạng thái thực tế. Mã component được viết lại trong stack hiện có.

## Ownership và contract

- `src/lib/portfolio-data.ts`: nội dung gốc không đổi; `portfolio-media.ts`: tập trung các đường dẫn ảnh/CV/liên hệ có sẵn.
- `src/app/globals.css`: token/layout chung; `portfolio-pages.css`: About/Contact/case. Ink #1c1d20, blue #455ce9, lightgray #e9eaeb, white. Gutter 8vw desktop, 6vw dưới 1200, 20px tại mobile390. Tiles <=1024, một cột <=620; About stack <=840, services <=720.
- `portfolio-site.tsx`: composition/header/home/footer; `portfolio-pages.tsx`: About/Contact/detail; `project-list.tsx`: filter/list-grid/preview.
- `motion.ts`: easing/timing GSAP. `site-provider.tsx`: Lenis ticker, loader/curtain/route lifecycle; `site-link.tsx`: gọi choreography qua Next onNavigate, Next thực hiện navigation ngay.
- Outgoing snapshot là DOM clone inert/aria-hidden và bỏ id/dialog, xóa khi curtain phủ ở .5s. Live shell inert và khóa cuộn trong transition; chờ pathname commit trước reveal, rồi focus main không cuộn. Back giữ scroll history.
- `menu-dialog.tsx`: native dialog, Escape/backdrop, focus restore, Tab/Shift+Tab wrap, timeline reverse từ vị trí hiện tại. `site-dialog.tsx`: gallery Framer opacity; gallery giữ arrows/Escape/focus return.
- `site-elements.tsx`: magnetic button và lớp chữ riêng, fill, elastic; `site-scroll-motion.tsx`: reveal/parallax/ticker/footer. GSAP context/matchMedia/ticker/listeners cleanup theo lifecycle; reduced motion bỏ spatial travel và smooth scroll.

Timing theo nguồn: home loader chín lời chào cách .15s, leave 2.32s, out .8s, entry 1.5s expo/stagger .07; deep link leave .5s/entry1s. Route cover .5s power4.in, label .55s, uncover1.15s/.8s power3.inOut, entry1.3s. Menu .8s cubic(.7,0,.2,1), curve .85s, links stagger .03s. Magnetic1.5s power4.out/elastic.out(1,.3), fill .6s power2.inOut. Preview image/button/text lag12/7/6 tại120Hz, slide .6s power2.inOut. Ticker18s đổi hướng timeScale trong .5s. Parallax theo speed/10 nguồn, desktop>1024; hero name và footer button đi ngang, ảnh/footer đi dọc.

## Kiểm chứng và những lệch đã sửa

Theo lựa chọn user: không chạy toàn bộ bộ test/release gate. Kiểm tra compile/lint bị ảnh hưởng và browser flow/capture để nghiệm thu UI.

- Build `npm.cmd run build`: PASS ở source cuối ngày2026-10-14 (compile, TypeScript, generate8pages).
- `npx.cmd tsc --noEmit` và ESLint các component/lib đổi: PASS; lint menu chạy lại sau sửa focus PASS.
- Browser Chrome production local5380: bảy route ở1440/768/390×900; ảnh trong viewport tải được, không tràn ngang, đúng một h1. Đã duyệt hình Home/About/Contact/menu/footer/case và các trạng thái trung gian chuyển trang/menu.
- Flow EN→VI, menu Tab/Escape/đóng mở nhanh/focus restore, gallery ArrowRight/Escape/focus restore, filter, list-grid desktop: PASS cả ba viewport. Back giữ scroll chính xác1003/1450/1363px tương ứng. Reduced motion390 PASS, không pageerror.
- About/Contact được kiểm tra lại riêng sau sửa arrow/ball responsive; CV endpoint200 application/pdf. Không chạy lại các flow không bị CSS này ảnh hưởng.
- Source/candidate normal-speed clips1440 và390: loader/route/menu đã capture; đối chiếu frame + hình học cho thấy panel đi từ ngoài viewport và curve thu về0, nội dung stagger/curtain kết thúc đúng trạng thái. Không suy input latency từ thời điểm trước Playwright click: source Barba/network và Next khác nhau. Không tuyên bố khớp từng frame hoặc100%, không có benchmark FPS.
- Orca đã mở URL local và đọc DOM ở1419×921. Capture Orca đen rồi tab không còn tồn tại; không dùng capture này làm bằng chứng visual. Bằng chứng visual/runtime dựa trên Chrome Playwright ở viewport cố định.

Các sai lệch có bằng chứng đã sửa: label curtain lệch phải; curve/menu jump do showModal/focus khi panel offscreen; native Tab từ close ra browser chrome (thêm wrap); shell dưới curtain còn tương tác; nhầm trục parallax tên/footer; tỷ lệ thumbnail Next case; line About quá rộng; globe mobile thiếu translate(-20%); CSS override mất góc90° của arrow. QA ban đầu capture sớm lúc hydration/scroll chưa ổn định: đổi curtain SSR pending và chờ ảnh decode/cuộn cuối thực tế, không thay expectation để che lỗi.

Giới hạn: kiểm chứng trên Chromium Windows, chưa có bằng chứng Safari/iPhone thật. Font Manrope, độ dài EN/VI, ảnh cá nhân và contact adaptation khác reference theo dữ liệu/quyết định đã chốt. Không copy nội dung/thành tích của Dennis; không hứa pixel-perfect hoặc100% motion.

## Checkpoint bàn giao

Implementation và browser checks liên quan đã xong; giữ local production preview `http://localhost:5380`. Không commit/push/deploy, không tạo branch/worktree để dọn. Mapping Linear `.agents/linear.json` đúng repo/Fly-Group/Quan Portfolio/teamFLY, pending local gitignored.

Đã ghi/đọc lại marker Linear `[portfolio-dennis:rea-verified:v1]` và xác nhận FLY-68 Done. Đã đóng browser REA riêng, kiểm tra target không có reparse point và dọn toàn bộ temp của task cùng clip QA cũ trong repo; xác nhận cả hai không còn tồn tại. Tab Orca của task đã không còn trong danh sách; không chạm tab khác. Giữ hai ảnh preview gốc của user và server local5380 để xem bản dựng.


## Follow-up loader/hover/navigation — 2026-10-14

Plan được user duyệt: sửa loader SSR lộ hero, hover trắng trên trắng, ẩn scrollbar native và đưa commit navigation xuống sau cover; giữ nội dung/ảnh/CV/EN-VI/URL/stack. Acceptance: cold/reload với JS/ảnh chậm không lộ hero trước loader; fill vào dưới/ra trên, rapid hover và keyboard readable; Home → Projects → About → Home lạnh/ấm, Back/Forward/interrupt giữ history/scroll; viewport 1440/768/390; đo frame gap/long task tại commit; lint/typecheck/build phần ảnh hưởng, không full suite/push/deploy.

FLY-68 đã Done nhưng acceptance cũ còn lệch được source xác nhận. Giữ trạng thái theo plan không tự mở lại; đã ghi và đọc lại marker `[portfolio-dennis:loader-navigation-followup:v1]`. Không tạo task mới. Working tree có toàn bộ implementation trước chưa commit; giữ nguyên thay đổi ngoài scope và hai ảnh preview user. Git dùng safe.directory theo từng lệnh cho đúng checkout, không đổi global config.

Triển khai tại `site-provider.tsx`, `site-link.tsx`, `site-elements.tsx`, `globals.css`, `layout.tsx`. Loader SSR hiện sẵn, noscript/reduced-motion bỏ màn che; CSS chỉ ẩn scrollbar, giữ overflow scrolling khi idle. GSAP khởi tạo fill yPercent không cộng CSS transform; một timeline color/fill bị hủy khi đảo chiều, focus-visible và pointer dùng chung trạng thái. Timing nguồn đọc lại `/assets/js/index-new.js`: fill .6 power2.inOut, chữ .3 power3.in/out, leave delay .3 khi hover hoàn tất; đảo chiều sớm trả chữ ngay để tránh trắng trên trắng.

Checkpoint giữa lượt: build + TypeScript/lint lần đầu PASS; smoke production 5380 Home → Projects PASS. Khi đó chưa nghiệm thu QA cuối sau sửa timing hover, slow load, history/interrupt và source/local responsive. Temp riêng phiên đó `E:/CodexTemp/quan-portfolio/fly-68-loader-fix` giữ backup đầu phiên/source/sample phục vụ review và đã dọn ở checkpoint cuối. Thư mục `dennis-followup/analysis-profile` đã có từ trước, không thuộc lượt đó.

### Kết quả follow-up đã kiểm chứng

- PASS build production cuối (`npm.cmd run build`, compile/TypeScript/generate 8 pages), ESLint `site-provider.tsx site-elements.tsx site-link.tsx layout.tsx`. Diff review với backup đầu phiên xác nhận chỉ năm file implementation trên và plan này đổi trong lượt sửa; không đổi dependency/dữ liệu/URL. `git diff --check` theo cấu hình repo và no-index check các file mới không báo lỗi whitespace; thử ép core.autocrlf=false báo CRLF ở `.gitignore` dòng 43–44 có sẵn, không sửa file ngoài scope.
- PASS Chromium Windows, DPR 1, viewport 1440/768/390 × 900: Home → Projects → About → Home hai vòng (lần đầu route chưa mở và lần sau cache ấm), tổng 18 commit đều ghi nhận curtain `covered`, screen top 0. Không có pageerror trong ba flow này. Không có DOM clone outgoing.
- PASS Back/Forward không tăng history length; vị trí quay lại Home 2154/1985/2379 px tương ứng, sai lệch <5 px. Back ngắt tại cover và reveal không bị pending push kéo lại route cũ, shell hết inert; đổi reduced motion trong cover vẫn hoàn tất URL đã yêu cầu. Kiểm tra tích hợp gọi hai sự kiện navigate liên tiếp (sự kiện thứ hai dispatch dưới shell inert, không phải thao tác người dùng) xác nhận yêu cầu Contact mới nhất thắng About, rồi Home/reload/VI → Projects đạt trên build cuối. Curtain bị ngắt bắt đầu lại từ vị trí hiện tại thay vì nhảy xuống dưới viewport.
- PASS loader khi giữ request JS: SSR curtain visible phủ viewport. Sau thả JS và tiếp tục giữ ảnh quá 3 s, screen vẫn top 0; thả ảnh mới reveal. Reload thông thường đạt. JavaScript disabled và reduced-motion 390 hiện nội dung trực tiếp, navigation/Back reduced đạt. Decode lỗi không giữ loader vĩnh viễn (`Promise.allSettled`); chưa benchmark ảnh hỏng thực tế.
- PASS hover hoàn tất/ba lần vào 60 ms-rời 40 ms/focus-blur: All projects, CV sáng/tối, contact xanh và filter. Fill phủ nút ở endpoint, rời lên trên, clear màu chữ và hồi transform; screenshot desktop/mobile đã đối chiếu. Focus-visible giữ fill khi con trỏ rời. Nút dark/blue giữ chữ trắng, nút sáng trả màu ink. Không thay variant/token/nội dung.
- PASS wheel khi idle, Home sau Lenis kết thúc đà, touch gesture 390 (scroll 522 px); native scrollbar hidden bằng CSS, không khóa overflow thường trực. Bài QA đầu nhấn Home trong lúc wheel còn đà nên timeout; tách kiểm tra đúng trạng thái cuộn ổn định, không sửa Lenis ngoài scope. Chưa chứng minh ưu tiên phím Home giữa quán tính wheel.
- PASS CV download `tran-minh-quan-cv.pdf`, Ctrl+click không preventDefault, giữ trang About/curtain idle và tạo tab thứ hai. Tool chờ `popup` đã timeout vì tab nền không phát sự kiện popup ở trang gốc; đọc context.pages xác nhận có 2 tab. Không thay handler link ngoài/download/modifiers.
- Đo rAF + PerformanceObserver trong flow production: frame gap tối đa cover/reveal 1440 = 13.7/26.4 ms, 768 = 14.0/14.9 ms, 390 = 26.7/14.2 ms. Frame tại commit 13.0–13.9 ms. Gap khi được che có thể 53.7–80.1 ms; long task route 53–89 ms đều nằm trong covered, không có long task >50 ms trong reveal ở lần đo này. Initial load có long task 57–93 ms và gap đến 346.3 ms dưới loader. Đây là số đo một lượt Chromium có các browser capture chạy cùng máy, không phải cam kết FPS/khớp 100% hay benchmark Safari/iPhone.
- Source live `index-new.js` được đọc lại; capture tốc độ bình thường nguồn/candidate ở 1440/768/390, xem ảnh endpoint hover và chuỗi frame transition: fill xanh phủ đúng, curve cover từ dưới và reveal lên trên, route mới xuất hiện sau màn che. Font/nội dung/crop khác mẫu theo adaptation đã chốt. Nguồn Locomotive làm Playwright locator.scrollIntoView dịch sai vùng (rect ngoài viewport); chẩn đoán bằng DOM/screenshot rồi dùng tọa độ DOM trong viewport với mouse thật để capture Work → About, không force/JS click. Không dùng locator timeout làm kết luận nguồn lỗi. Source/local vẫn giữ cơ chế scroll khác nhau đúng plan: Locomotive nguồn, Lenis local.

### Checkpoint cuối follow-up

Acceptance bản lỗi được xử lý và các browser checks trong phạm vi đã đạt với giới hạn nêu trên. Preview build cuối `http://localhost:5380`; server QA 5382 và server 5380 cũ đã đóng, giữ server 5380 mới để user xem. Không commit/push/deploy, không tạo branch/worktree. FLY-68 giữ Done theo plan không tự mở lại; đã ghi và đọc lại marker `[portfolio-dennis:loader-navigation-verified:v1]` cùng task. Đã kiểm tra absolute path/reparse point, xóa temp `fly-68-loader-fix` và xác nhận Test-Path=False sau khi lưu kết luận; giữ nguyên thư mục `dennis-followup/analysis-profile` đã có từ phiên trước, không đủ căn cứ dọn trong lượt đó.

## Follow-up ảnh hero/menu — 2026-10-14

Plan implementation được user duyệt: sửa hai lỗi còn lại trong FLY-68, không thay URL/nội dung/EN-VI/dependency, không push/deploy. Acceptance của báo cáo trước chưa bao phủ bước nhảy ảnh khi loader kết thúc và nút menu hiện đột ngột; giữ trạng thái Done hiện có, ghi nhận sai lệch trong task, không tạo trùng/tự mở lại. Đã ghi và đọc lại marker `[portfolio-dennis:hero-menu-followup:v1]` sau khi xác minh workspace Fly-Group, project Quan Portfolio, team FLY và mapping repo.

### Contract và mapping được chốt

- Hero: source HTML `.personal-image` có `data-scroll-position="top"`; mapping sang `.hero-image-parallax[data-position=top]`, owner `portfolio-site.tsx`/`site-scroll-motion.tsx`. Entrance tiếp tục ở wrapper riêng. Offset ảnh = `scrollY * 0.3` trên desktop >1024; refresh vì ảnh/font/loader không đo wrapper entrance để tính offset. Cleanup trả transform khi đổi locale/breakpoint/reduced motion.
- Panel: source `style-new.css` khởi tạo translate `100% + 6vw` (mobile `20vw`), .8 s cubic(.7,0,.2,1), curve .85 s, links stagger .03 s, inner mobile delay .1 s. CSS local khai báo trạng thái đóng từ đầu; `MenuDialog` giữ một timeline, play/reverse từ progress hiện tại, route change reset và cleanup. Native dialog giữ modal/Escape; Tab/focus preventScroll không dịch trang hoặc panel.
- Nút: source `styleguide.css` dùng scale .4 s cubic(.34,1.5,.64,1) khi nút nổi xuất hiện do cuộn; mở từ header dùng .4 s cubic(.36,0,.66,0). Màu .25 s cubic(.36,0,.66,0), bars .3 s cubic(.7,0,.3,1). Wrapper `.menu-toggle-position`/`.menu-close-position` sở hữu scale, `MagneticButton` sở hữu translate. Mở từ nút nổi giữ vị trí/scale và magnetic offset trước khi đổi màu/hamburger → X; mở từ header animate scale từ 0. Reduced motion vào endpoint. Đã sửa easing mở từ header sau khi đối chiếu selector nguồn; không thêm ease không còn dùng.
- Đọc lại HTML và first-party JS/CSS live; SHA-256 `index-new.js` vẫn khớp bằng chứng REA trước (`7d997e8eed26c01228065ae0fe55a71ee812348429e5e54361947dc2407604aa`). Dùng lại evidence REA/contract trong phần trên, không reverse lại toàn site. Các viewport kiểm chứng là 1440/768/390 × 900 và 1440 × 1050 theo kích thước hai file preview có sẵn của user.

### Checkpoint đang thực hiện

Đã sửa hero, scroll cleanup và lifecycle menu/nút tại `portfolio-site.tsx`, `site-scroll-motion.tsx`, `menu-dialog.tsx`, `globals.css`, `motion.ts`. Baseline Playwright Chromium Windows 1440 × 900: ở scrollY=0, frame cuối loading ảnh top -258.75 px, frame đầu idle -123.75 px, bước nhảy 135 px. Sau sửa mốc top: trước/sau idle đều -103.5 px, parallax y=0, bước nhảy 0 px.

Lệch panel đã tái hiện bằng đo từng frame: dialog tự cuộn ngang 545 px khi focus, khiến panel mobile có x≈-78 px dù transform đang ở trạng thái đóng. Thay `overflow: hidden` bằng `overflow: clip` riêng cho drawer dialog để dialog không thành scroll container; focus/Tab dùng preventScroll. Kiểm tra lại: scrollLeft/scrollTop=0, panel đầu mở x=1526.4/814.08/468 px ở 1440/768/390, rồi đi tới x=892.8125/328/0 qua các vị trí trung gian. Không dùng set scroll mỗi frame hoặc ghi đè transform để che lỗi.

### Kết quả kiểm chứng của lượt sửa ảnh/menu

- PASS production Chromium Windows, DPR 1: cold load, reload, đổi EN → VI và quay về Home ở 1440/768/390 × 900; cold/reload/locale và menu ở 1440 × 1050. Parallax y=0 ở mọi frame được đo khi scrollY=0, sai lệch ảnh so với entrance wrapper tại loader finish =0 px. Desktop scrollY=810 cho parallax y=243 px đúng hướng/tỷ lệ; 768/390 không áp dụng desktop parallax.
- PASS giữ request ảnh qua mốc 3.7 s, rồi thả ảnh và thả font sau loader finish, ở cả ba viewport (390 dùng VI). Curtain vẫn phủ toàn viewport khi ảnh chưa sẵn sàng; ảnh/font tải xong và refresh không tạo offset khi không cuộn. Không pageerror trong các ca này.
- PASS menu: mở từ header mobile và nút nổi, mở lại sau đổi route/locale, X/Escape/backdrop (mobile kiểm tra backdrop khi panel đang vào vì endpoint che toàn màn hình). Mỗi lần mở có ít nhất 19–22 frame trung gian trong lần đo, màu và bars có trạng thái giữa; không có frame panel xuất hiện trọn vẹn ngay từ đầu. Đóng/mở đảo chiều sau 45/350 ms bằng nút nổi ở cả ba viewport; kiểm tra riêng nút header sau sửa easing cuối cũng đạt. Dataset được kiểm tra tại các mốc opening/closing/open/idle, ý định mở cuối cùng thắng; không jump lớn hoặc dialog bị kẹt.
- PASS Tab/Shift+Tab giữ focus trong dialog, focus trả về đúng trigger khi đóng, focus sớm trong opening không cuộn panel; wheel dưới modal không đổi scrollY, scrollLeft/scrollTop/innerScroll đều 0 trong các ca đã đo. Reduced motion ban đầu ở 1440/390 và đổi preference trong opening/closing đạt endpoint, không giữ modal sai trạng thái; transform parallax được trả về 0.
- PASS đọc source CSS + capture normal-speed và đo rAF nguồn/local ở 1440/390: panel vào từ phải, curve thu, links stagger, nút đổi màu/hamburger → X và scale header liên tục; đã xem chuỗi ảnh trung gian/endpoint. Cấu hình .8/.85/.03 s và easing giữ từ nguồn; không khẳng định khớp từng frame hay FPS. Thời gian từ mẫu active đầu tới gần endpoint khác giữa CSS compositor nguồn và GSAP local; đây không phải benchmark input latency. Source/candidate dùng Locomotive/Lenis và nội dung/font/crop theo adaptation đã chốt. Screenshot có độ trễ capture nên dùng rAF thực và một lượt không chụp PNG giữa animation để đọc thời gian, không dùng nhãn mốc screenshot làm số đo frame chính xác.
- Source automation được đồng bộ lại theo DOM/loading và cờ `scroll.scroll.stop`, không đợi load của mọi media. Probe xác nhận nguồn chuẩn hóa mỗi wheel thành khoảng 120 px, cần nhiều wheel để vượt ngưỡng 30% viewport và thấy nút nổi; mobile dùng lớp scroll khác. Các timeout ban đầu là điều kiện chờ/tool chưa đúng, không kết luận source hoặc local lỗi từ timeout.
- PASS ESLint các owner đổi, `npx.cmd tsc --noEmit`, build production cuối sau sửa easing header (`npm.cmd run build`: compile/TypeScript/generate 8 pages). Không chạy toàn bộ suite/release gate. Review diff với backup đầu lượt chỉ có năm file implementation nêu trên và plan này; mapping/dependency/URL/dữ liệu/ảnh preview gốc giữ nguyên. Đã phục hồi phần ghi chú follow-up trước sang UTF-8 có dấu.
- PASS cleanup parallax dùng chung ở About, Contact và case FCR: chuyển reduced motion trả x/y về 0, trở lại normal có transform hữu hạn và offset đúng công thức ở anchor trong viewport. Chờ curtain idle trước đọc trạng thái đã ổn định; kiểm tra giữa reinitialization chỉ chứng minh trạng thái tạm, không dùng làm kết luận regression. Gallery không đổi. `git diff --check` và no-index whitespace checks năm owner + plan không có lỗi; no-index exit 1 do có diff, không phải lỗi whitespace.

Acceptance hai lỗi ảnh/menu đã đạt trong các điều kiện nêu trên. Đã ghi và đọc lại marker Linear `[portfolio-dennis:hero-menu-verified:v1]`, xác nhận FLY-68 vẫn Done theo plan. Đã kiểm tra absolute path/reparse point, dọn toàn bộ temp/capture của lượt sửa `E:/CodexTemp/quan-portfolio/fly-68-hero-menu` và xác nhận không còn tồn tại. Giữ preview production cuối `http://localhost:5380`; server dev QA 5382 và các browser QA đã đóng. Không commit/push/deploy, không tạo branch/worktree. Giới hạn runtime: Chromium Windows, chưa kiểm chứng Safari/iPhone thật; không tuyên bố khớp 100%. Thư mục `dennis-followup/analysis-profile` của phiên trước và hai ảnh preview gốc được giữ nguyên.


## Đổi ảnh hero sang nền studio — 2026-10-15 — FLY-101

### Mục tiêu, phạm vi và nghiệm thu đã duyệt

Tiếp tục plan user giao trong phiên mới; đây là kết quả nghiệm thu mới tại [FLY-101](https://linear.app/fly-group/issue/FLY-101/djoi-anh-chan-dung-trang-chu), giữ FLY-68 Done. Đã đọc toàn bộ danh sách project (cả đã đóng/archived, hasNextPage=false), xác minh mapping repo/workspace Fly-Group/project Quan Portfolio/team FLY và đọc lại task mới In Progress. Marker tạo task: `[portfolio-hero-studio:start:v1]`.

Chỉnh ảnh gốc `public/assets/tran-minh-quan.jpg` (Sharp xác nhận 1080 × 1080) bằng built-in imagegen; giữ đặc điểm mặt, tóc, biểu cảm, màu da, tuổi, dáng nghiêng, sweatshirt, túi/dây túi. Nền xám và ánh sáng mềm theo [ảnh Dennis](https://dennissnellenberg.com/assets/img/DSC07033.jpg), chỉ dùng làm reference nền/ánh sáng. Yêu cầu 3840 × 2160; xác minh metadata đầu ra trước khi gọi là 4K và báo rõ nếu công cụ trả thấp hơn. Không upscale để tuyên bố thêm chi tiết gốc.

Asset riêng `public/assets/tran-minh-quan-hero-studio.png`, mapping `portfolio-media.ts:heroPortrait` → `portfolio-site.tsx:Hero`; `portrait` và các consumer About/Contact/footer giữ ảnh gốc. Hero giữ fill/priority cùng entrance/parallax `data-position=top` hiện có, thêm quality=90; `next.config.ts` thêm allowlist [75, 90] theo docs cục bộ Next.js 16.2.12. `sizes` tính theo chiều rộng ảnh sau object-fit: cover của asset ngang để tránh chọn ảnh thiếu pixel khi crop dọc. Không đổi contract hoặc dependency.

Nghiệm thu: đối chiếu mặt/tóc/mắt/da/viền người/áo ở mức phóng lớn; hero không cắt mặt, chữ rõ tại preview user 1440 × 1050 (metadata hai file preview), desktop1440 × 900, tablet768 × 900 và mobile390 × 900. Cold/reload qua loader, ảnh tải chậm, scroll/parallax và EN/VI; ảnh gốc các trang khác giữ nguyên. Chạy lint/TypeScript/build phần ảnh hưởng, mở preview local5380. Không push/deploy. Chromium Windows là runtime hiện có; không suy Safari/iPhone thật.

### Prompt imagegen (identity-preserve, built-in)

```text
Use case: identity-preserve.
Asset type: ảnh chân dung thật dùng làm nền hero portfolio responsive.
Chỉnh sửa ẢNH 1 (tran-minh-quan.jpg, 1080 × 1080). ẢNH 2 (Dennis) CHỈ là tham khảo phông xám và ánh sáng, tuyệt đối không lấy khuôn mặt, tóc, vóc dáng, biểu cảm, trang phục hay tư thế của người trong ảnh 2.

Yêu cầu đầu ra: đúng 3840 × 2160 pixel, ngang 16:9, ảnh chụp studio chân thực, một ảnh hoàn chỉnh không có giao diện hoặc chữ thêm vào.
Thay toàn bộ cảnh du lịch, cây cối, bầu trời, biển hiệu, mái nhà và lan can bằng phông studio xám trung tính mịn như ảnh 2, nền có biến thiên sáng rất nhẹ. Ánh sáng mềm từ phía trước bên trái, bóng tự nhiên, chi tiết rõ và không kịch tính.

Giữ nguyên căn tính người của ảnh 1 một cách nghiêm ngặt: mắt hơi híp, hình dáng và khoảng cách hai mắt, lông mày, sống và đầu mũi, môi khép với biểu cảm cười nhẹ, đường hàm, tỷ lệ mặt, hai tai, màu da và tuổi. Giữ mái tóc đen rẽ lệch, các lọn tóc trên trán, hướng nhìn vào máy ảnh và góc nghiêng đầu/thân về phía phải ảnh như ảnh gốc. Không xoay thẳng đầu. Giữ nguyên áo sweatshirt xám tím đậm rộng, cổ áo, nếp nhăn, hình in có sẵn trên áo, túi đeo chéo đen và dây/buckle của nó. Không đổi áo thành áo của Dennis. Giữ tư thế vai và hai cánh tay của ảnh gốc.

Bố cục: đặt người chính giữa khung ngang, trung tâm khuôn mặt gần trục x=50%; khung hình từ đầu tóc tới hông. Đầu tóc bắt đầu khoảng 14–18% chiều cao ảnh, khuôn mặt rõ đủ lớn, đầu và tóc có khoảng thở, phần thân tiếp tục xuống mép dưới. Giữ khoảng trống xám rộng hai bên để website đặt nội dung. Có thể cắt tự nhiên phần bàn tay và quần ở mép dưới; không thêm đạo cụ hoặc đổi dáng người. Vùng mặt và tóc nằm trọn trong vùng giữa 20% chiều rộng để vẫn giữ được mặt khi website crop dọc trên mobile.

Khôi phục chi tiết tóc, da, sợi vải và viền người tự nhiên ở độ phân giải cao. Da có texture nhẹ, không làm mịn da, không làm đẹp/đổi tuổi, không thay đặc điểm mặt, không sharpen quá mức, không viền sáng cutout, không mắt giả hoặc skin nhựa, không đổi màu da. Không chữ website, slogan, logo thêm, watermark, UI, khung viền hoặc nhiều người. Ưu tiên giữ giống ảnh gốc hơn sự sáng tạo.
```

### Checkpoint đang thực hiện

Đã xác minh checkout/remote; tái sử dụng branch main, Git safe.directory theo từng lệnh. Working tree có implementation FLY-68 chưa commit và hai ảnh preview user, giữ nguyên. Backup phần task có thể đổi ở `E:/CodexTemp/quan-portfolio/hero-studio/before`; reference nền/ánh sáng và capture QA chỉ trong task-temp này, cần dọn trước bàn giao sau khi ghi kết luận.

Imagegen đã trả ảnh PNG 1672 × 941, 1,809,486 bytes; thấp hơn 3840 × 2160 đã yêu cầu. Đã báo giới hạn cho user, giữ pixel thực, không upscale/gọi là 4K. Bản gốc được xác minh SHA-256 `88e163dea4aa5d72c0715e7c3ce6a325d2f3e75fc956ba8020332a9ea2a805d0`; ảnh mới lưu riêng. Đối chiếu phóng lớn giữ các nét mắt/mũi/miệng, dáng nghiêng, tóc, màu da, áo/túi/dây túi; texture tự nhiên, không thấy viền sáng cutout. Đây là kiểm tra thị giác, không phải đo sinh trắc học hoặc chứng minh từng pixel.

Lint phần đổi/build đầu PASS. TypeScript độc lập lượt đầu gặp TS2307 trong `.next/types/validator.ts` vì chạy đồng thời với build tái tạo `.next/types/routes`; chạy lại sau build PASS, không sửa type/test/config để che lỗi. Preview production5380 đã mở lại. QA đầu tại 1440 × 1050, 1440/768/390 × 900, DPR1, EN/VI: không cắt mặt, không tràn ngang, reload/ảnh chậm qua loader không nhảy (0 px), desktop parallax đúng scrollY × .3, tablet/mobile bằng0, About/Contact/footer vẫn dùng ảnh gốc và quality75. Không pageerror.

Lệch độ nét đã xác minh: `sizes=100vw` chọn bản828/640px ở tablet/mobile trong khi object-fit: cover phóng ảnh ngang tới khoảng2023/1847px; screenshot cho thấy tóc/mắt bị mờ. Đã sửa sizes tại Hero theo hình học CSS có sẵn: desktop115svh ×1.1 × tỉ lệ ảnh≈225svh, mobile110svh ×1.05 × tỉ lệ ảnh≈206svh; dùng max với100vw cho viewport rộng. Giữ layout/token/loader/parallax. Đang build và kiểm chứng lại phần ảnh hưởng, chưa Done trước khi QA bản cuối.


### Kết quả kiểm chứng bản cuối

- PASS lint `npx.cmd eslint next.config.ts src/lib/portfolio-media.ts src/components/portfolio-site.tsx`, TypeScript `npx.cmd tsc --noEmit` chạy sau build, và `npm.cmd run build` (compile/TypeScript/8 pages). Build cuối sau sửa sizes đã được restart vào production local5380.
- PASS Chromium Windows, DPR1, 1440 × 1050, 1440/768/390 × 900, cả EN/VI: mặt/tóc/mắt không bị cắt, chữ header/chức danh/ticker đọc được, không tràn ngang; đã xem ảnh runtime ở cùng viewport. Bản sau sửa sizes giữ nguyên bố cục và rõ tóc/mắt/vải hơn ở tablet/mobile. Browser chọn w3840 cho1440 ×1050, w2048 cho1440/768 ×900, w1920 cho390 ×900, tất cả q90. Endpoint WebP w1920 trả200, metadata1672 ×941, 71,192 bytes; các giá trị w của URL không phải độ phân giải gốc/4K.
- PASS cold/reload, lưu VI qua reload, giữ request ảnh quá3.6s rồi thả ở cả bốn viewport: loader phủ màn hình trước khi ảnh sẵn sàng; độ lệch vị trí ảnh tương đối entrance wrapper tại mốc idle =0px ở reload thường và ảnh chậm; parallax tại scrollY0 =0px. Wheel thật tới scrollY486 cho y145.8px ở desktop, y0 ở768/390; Control+Home trả về0. Không pageerror trong các flow.
- PASS ảnh footer/About/Contact decode được, vẫn dùng `tran-minh-quan.jpg`; About/Contact giữ q75. Hash ảnh gốc khớp đầu phiên. Review diff với backup đầu phiên chỉ có `next.config.ts`, `portfolio-media.ts`, `portfolio-site.tsx`, plan này và asset PNG mới; globals.css, loader, parallax, dependency và hai ảnh preview gốc không đổi. `git diff --check` PASS; các file chưa tracked được kiểm tra thêm bằng no-index.
- Prompt và reference ở trên đã lưu UTF-8 trong plan hiện có. Giới hạn công cụ: ảnh cuối1672 ×941, chưa đạt3840 ×2160; đã báo rõ, không upscale. Kiểm chứng thị giác và runtime trên Chromium Windows; chưa kiểm chứng Safari/iPhone thật.
- Preview `http://localhost:5380` trả200 và tham chiếu asset mới, đã mở bằng Chrome thường để user xem. Tab Orca cũ tải đúng asset/font nhưng animation không tiến và vẫn loading dù không có console error; chưa xác minh nguyên nhân môi trường, không dùng tab này làm bằng chứng runtime. QA dựa trên Chrome/Playwright độc lập đã đạt, không sửa loader ngoài scope vì hiện tượng chỉ có ở tab Orca đó.

### Checkpoint bàn giao ảnh studio

Implementation/QA đã đạt trong phạm vi và giới hạn độ phân giải công cụ được plan cho phép báo rõ. Giữ production preview5380 để user xem; không commit/push/deploy, không tạo branch/worktree. Đã ghi và đọc lại Linear marker `[portfolio-hero-studio:verified:v1]`, xác nhận FLY-101 Done và FLY-68 vẫn Done. Đã kiểm tra absolute path/reparse point, dọn toàn bộ backup/reference/capture của `E:/CodexTemp/quan-portfolio/hero-studio` và xác nhận Test-Path=False. Asset sản phẩm và ảnh gốc giữ đúng vị trí trong project; browser QA đã đóng, giữ Chrome preview và server5380 cho user.


## Nâng ảnh Eigakan và đẩy GitHub — 2026-10-15 — FLY-104

User yêu cầu nâng ảnh tại `/projects/eigakan-movie-sharing-platform` và đẩy portfolio lên GitHub. Repo/nhánh/remote đã xác minh: `E:/RepoGIt/Portfolios/quan-portfolio`, `main`, `origin https://github.com/micharel09/quan-portfolio.git`; local và remote main cùng tip `a8e38de10dd1088b71f3daf49b417938bf36b004` ở đầu lượt. Tái sử dụng checkout, không tạo worktree. Main có auto production theo mapping project; không chạy deploy thủ công. Cần review/stage toàn bộ implementation portfolio đã duyệt, giữ hai file preview gốc ngoài commit.

[FLY-104](https://linear.app/fly-group/issue/FLY-104/nang-chat-luong-anh-du-an-eigakan) In Progress; đã đọc hết danh sách project và xác minh workspace/project/team/mapping trước tạo. Marker `[eigakan-photo:start:v1]`. Đây là kết quả nghiệm thu mới, không mở lại FLY-68/FLY-101.

Ảnh gốc `public/assets/eigakan-team.jpg` thực tế960 ×1280, SHA-256 `951d99a75dfd754c5bade230dc9b626f6eca30ae539dccddd7bff416247df7d7`; giữ nguyên. Built-in imagegen khôi phục chi tiết/giảm nhiễu, không thay bốn người, tên trên áo, màn hình, bố cục, ánh sáng. Asset mới riêng dùng chung qua `photosByProject` cho cover/gallery/lightbox, thumbnail và Next case Eigakan. Kiểm tra khuôn mặt/chữ/viền người với nguồn; metadata kích thước thực; runtime EN/VI1440/768/390, lightbox, tải ảnh, lint/TypeScript/build và ref remote sau push. Temp `E:/CodexTemp/quan-portfolio/eigakan-photo` giữ backup/capture, dọn sau khi ghi kết luận.

### Prompt imagegen

```text
undefined
```

Checkpoint: imagegen đang chạy, chưa tích hợp/kiểm chứng ảnh cuối; chưa commit/push.

### Kết quả ảnh Eigakan và chuẩn bị GitHub

- Built-in imagegen trả1086 ×1448, tăng từ960 ×1280; không đạt yêu cầu prompt1920 ×2560, báo kích thước thực. Asset `public/assets/eigakan-team-enhanced.png`, ánh xạ đúng width/height trong `portfolio-media.ts`; không đổi layout/motion hoặc thêm dependency. Giữ hash ảnh gốc như trên. Đối chiếu thị giác bốn người, khuôn mặt/biểu cảm/tóc/kính, tư thế tay, áo/quần/giày, tên trên áo và chữ lớn/màn hình: bố cục và nội dung chính được giữ, nhiễu/moiré giảm. Chi tiết nhỏ là khôi phục AI, không phải phục hồi pixel gốc chưa tồn tại.
- PASS lint media, TypeScript độc lập sau build, production build (compile/TypeScript/8pages). Restart preview5380 từ build cuối.
- PASS Chromium Windows1440/768/390 ×900, DPR1, EN/VI: cover/gallery tải asset mới, lightbox decode1086 ×1448, Escape/focus return, không tràn ngang/pageerror; danh sách dự án và Next case của VDS render đường dẫn mới. Đã đối chiếu ảnh runtime và lightbox endpoint opacity1 ở ba viewport. Capture đầu ở giữa fade nên tối; chờ opacity1 rồi capture lại, không sửa app/expectation để che lỗi. Chưa kiểm chứng Safari/iPhone thật.
- Review diff mới chỉ thay một entry media và thêm ảnh nâng chất lượng. Phần portfolio/hero đã được nghiệm thu trước được giữ để đẩy cùng theo yêu cầu user. Commit dự kiến gồm source/config/package/plan/mapping và hai asset sản phẩm, không gồm hai file preview user, pending hoặc capture. `/.agents/pending/` đã gitignored.

Checkpoint: triển khai và QA ảnh đã đạt, giữ preview local. Phần đẩy GitHub được theo dõi tại FLY-104 với marker `[eigakan-photo:github-verified:v1]`; đích `origin/main`, chỉ push thường, không force/rebase/reset hoặc deploy thủ công. Bằng chứng commit/ref remote và kết quả dọn temp ghi tại task sau thao tác.
Đã kiểm tra đường dẫn/reparse point, dọn toàn bộ temp `E:/CodexTemp/quan-portfolio/eigakan-photo` và xác nhận không còn; browser QA đã đóng. Giữ asset nâng chất lượng, ảnh gốc và server preview5380. Phần đẩy GitHub xem kết quả xác nhận ở marker Linear nêu trên.
## Sửa lại ảnh Eigakan: chỉ upscale, không AI — 2026-10-15 — FLY-104

User xác nhận bản AI đã làm khác khuôn mặt. Kết luận bảo toàn khuôn mặt của lượt trước không đạt; các QA tải ảnh/build trước không chứng minh fidelity. Tiếp tục sửa trong FLY-104 cùng mục tiêu, không tạo task trùng hoặc tự mở lại task Done.

Yêu cầu chốt: chỉ upscale ảnh gốc, không sinh lại chi tiết/khuôn mặt. Bỏ asset AI `eigakan-team-enhanced.png` khỏi bản hiện tại; giữ nguyên `eigakan-team.jpg`. Dùng Sharp đã có, duy nhất resize1920 ×2560 với Lanczos3 rồi xuất PNG lossless, không sharpen/denoise/retouch hoặc imagegen. Asset `eigakan-team-upscaled.png`; cập nhật metadata và entry media dùng chung.

Kiểm tra sớm: SHA-256 ảnh gốc vẫn `951d99a75dfd754c5bade230dc9b626f6eca30ae539dccddd7bff416247df7d7`. Metadata đầu ra1920 ×2560. So sánh toàn bộ buffer pixel giải mã PNG với kết quả resize Lanczos3 trực tiếp từ nguồn: khớp tuyệt đối. Đây là nội suy, không khôi phục thêm chi tiết thật. Đang build và kiểm tra lại runtime trước corrective commit/push thường lên main; không rewrite lịch sử. Temp/capture riêng tại `E:/CodexTemp/quan-portfolio/eigakan-photo-correction` cần dọn trước bàn giao.
Kết quả bản sửa: PASS lint media, TypeScript sau build và production build8pages. Chromium Windows EN/VI1440/768/390 ×900: cover trỏ asset nội suy, gallery/lightbox tải đúng1920 ×2560; Escape đóng, không pageerror; đã xem lightbox endpoint trên mobile và đối chiếu gốc. Runtime giữ ảnh người và màn hình gốc, bao gồm nhiễu hiện có, không dùng khôi phục AI. Buffer nguồn/đầu ra đã kiểm chứng như trên; đây là bằng chứng chuỗi xử lý, không gọi hình mờ thành chi tiết mới.

Đã review diff: thay entry media, xóa asset AI và thêm ảnh nội suy; không đổi hero hoặc ảnh dự án khác. Đã đóng browser QA, kiểm tra path/reparse point, dọn capture/profile tại `E:/CodexTemp/quan-portfolio/eigakan-photo-correction`, xác nhận không còn. Giữ preview5380. Tiếp tục corrective commit/push theo quyền user đã có; bằng chứng remote cuối ghi ở FLY-104 marker `[eigakan-photo:resize-only-verified:v1]`.
## Tăng nét Eigakan, bảo vệ khuôn mặt — 2026-10-15 — FLY-104

Plan user duyệt: xử lý thông thường, không AI; nền Lanczos `eigakan-team-upscaled.png` 1920 × 2560 và JPEG gốc giữ nguyên. Sharp sharpen `{ sigma: 0.8, m1: 0, m2: 1.2, x1: 2, y2: 3, y3: 3 }`, trộn 40% theo từng kênh RGB, làm tròn pixel. Bốn vùng bảo vệ trên nguồn: (250,550,355,710), (385,575,490,730), (510,560,610,715), (630,600,725,750); nhân đôi trên nền, bao gồm pixel biên. Trong vùng dùng nguyên pixel nền; ngoài vùng chuyển tiếp 24px bằng smoothstep theo khoảng cách Euclid tới hình chữ nhật, lấy mask nhỏ nhất khi chồng nhau. Không chỉnh màu, da, chữ hay hình học. Asset riêng PNG lossless `public/assets/eigakan-team-sharpened.png` (6,646,377 bytes).

Mapping chuẩn hiện có: `portfolio-media.ts:photosByProject` → ProjectDetail cover / ProjectGallery / ProjectList preview / Next case; entry Eigakan quality90, kiểu ProjectPhoto thêm quality tùy chọn, cover/gallery đọc giá trị này. Lightbox/thumbnail/Next case giữ đường dẫn đầy đủ unoptimized theo implementation cũ. Next.js16.2.12 docs cục bộ image.md xác nhận mặc định75 và allowlist; next.config.ts đã có [75,90], không cần đổi. Giữ layout/crop/parallax và dependency.

Kiểm chứng đạt:
- Decode PNG1920 ×2560: 760,062 mẫu kênh trong bốn vùng bảo vệ khớp tuyệt đối nền; chỉ114,482 mẫu kênh ngoài vùng thay đổi. SHA-256 JPEG gốc vẫn951d99a75dfd754c5bade230dc9b626f6eca30ae539dccddd7bff416247df7d7. Bản upscale không bị ghi lại.
- Đối chiếu crop trước/sau cùng1050 ×1000: áo/nhãn/viền vật thể cải thiện nhẹ, không thấy halo mới hoặc moiré tăng rõ; giữ nhiễu màn hình hiện có. Không tạo thêm chi tiết thật từ nguồn960 ×1280. Pixel nguyên vẹn được đảm bảo ở asset PNG; ảnh tối ưu lossy trên web không có đảm bảo pixel tuyệt đối.
- `npm.cmd run lint`, `npm.cmd run build` (8pages) và `npx.cmd tsc --noEmit` sau build PASS.
- Playwright-core có sẵn trong REA, Chrome Windows DPR1, EN/VI1440/768/390 ×900: cover/gallery decode đúng nguồn mới q90, lightbox trực tiếp PNG1920 ×2560, Escape đóng, không tràn ngang/pageerror. Thumbnail danh sách và Next case VDS dùng asset mới; cover VDS vẫn q75. Đã xem capture cover và lightbox; capture cover đầu bị loader che vì selector chờ sai, sửa QA chờ `.route-curtain` visibility hidden rồi chạy lại cả ma trận PASS; không sửa app. Chưa kiểm chứng Safari/iPhone thật.
- Preview production local5380 giữ để user xem. Không tạo worktree/branch; reuse main và quyền push origin/main theo plan. Giữ hai ảnh preview user ngoài commit. Review diff và diff --check trước commit; capture/script/log QA chỉ trong temp task và được dọn trước bàn giao. Bằng chứng commit/ref remote và đồng bộ task tại marker `[eigakan-photo:protected-sharpen-verified:v1]` trên FLY-104; giữ trạng thái Done hiện có theo yêu cầu đối soát task.

## Bổ sung sản phẩm Fly và công nghệ — 2026-10-15 — FLY-106

Task: https://linear.app/fly-group/issue/FLY-106. Đã đối soát toàn bộ project Quan Portfolio (ba task cũ, hasNextPage=false), workspace Fly-Group/team theo `.agents/linear.json`, tạo task nội dung riêng và đọc lại. Preview 5380; không push/deploy. Checkout ban đầu chỉ có hai ảnh user untracked `current-preview.png`, `detail-preview.png`; giữ nguyên.

### Phạm vi và acceptance

Plan ban đầu 11 case; user thu hẹp: “ko mấy project nhỏ đó ko cần liệt kê vào”. Bỏ Jupiter, TIGGO và hai Antrip, còn **7 case**: DJ → Jobs → Labour → PTE → FCR → ITD → Eigakan. Bốn case mới năm2026, EN/VI, brief/contribution/stack/ảnh thật; giữ ba case cũ và lịch sử công việc. About vẫn bổ sung công nghệ có bằng chứng, kể cả Astro, không thêm website case. Home desktop4 featured, tablet/mobile2 tile theo pattern cũ; tổng07. Projects lọc Tất cả/Sản phẩm/Kinh nghiệm & đồ án =7/4/3; category vẫn mô tả lĩnh vực. Next case tuần hoàn theo thứ tự trên. Không thêm dependency, thay backend/public API, repo private hoặc credential trên website.

### Source/revision và attribution

Prefix nguồn `E:/RepoGIt/FlyVisa/`; source mapping chỉ ở plan, không render trên web. Không suy trạng thái production từ source.

| Nguồn | Revision và evidence | Nội dung/đóng góp |
| --- | --- | --- |
| Fly_Talent_DJ | a2b8b38c8d03b190072ef1be1e10d464c27bffec; README, frontend/backend package.json, mobile/pubspec.yaml; Quan commits a2b8b38 legal/App Review, f30075c Flutter pricing, 94395c6 form recovery, 6b14c0d booking pricing | React/Vite/NestJS/TypeORM/PostgreSQL/Redis/Socket.IO/Flutter; web, booking, profile/chat và mobile/release preparation. |
| Fly-Jobs/Fly-Jobs | b300a675c0f13d9f1d480e64fb2c49e476703699; README, docs/CURRENT-STATE.md, manifests, mobile/pubspec.yaml; Quan 054af40 analytics, 9b2824a employer/admin, 7aeef4f mobile flows, b300a67 verified TestFlight17 | Next.js/NestJS/TypeORM/PostgreSQL/Redis/BullMQ/GCS/Flutter. Không dùng bản fly-jobs-* cũ bên ngoài Git root. |
| Fly-labour | 7f8ebf6ce192368498b5a504b7b812cc720a1d0b; frontend/backend/mobile manifests; Quan bcf910a8 Liên Việt catalog, bac11947 pricing, d644a69b showcase, 191a202e topic menus | Stack dự án React/NestJS/PostgreSQL/React Native/Expo. Đóng góp trực tiếp giới hạn showcase/pricing/certificate catalog web/backend; không nhận phát triển mobile vì lịch sử mobile đọc được thuộc tác giả khác. |
| Fly_PTE | 4f557e76c833a597abb883627ee757141a4d7bfd; README, frontend/backend manifests, python-scorer/requirements.txt, capacitor.config.ts, codemagic.yaml; Quan 4f557e7 recording dài, 03bb174 scoring pending, 4613fd1 Gemini JSON, 774f909 scoring/transcripts | React/Vite/NestJS/PostgreSQL/Python/FastAPI/Gemini/Whisper/Capacitor; chấm điểm hỗ trợ AI, không cam kết độ chính xác. |
| Astro | Fly-Jupiter/Jupiter eaf90c65c7498610bb76260720bf662b5e27f1e9, package.json/astro.config.mjs và Quan industry imagery; fly-antrip/package.json xác nhận Astro/TypeScript nhưng folder không có Git metadata | Chỉ kỹ năng About; không tạo case website nhỏ. |
| Case cũ | portfolio-data.ts/portfolio-media.ts tại HEAD đầu task | Giữ copy, slug, năm, tone, stack và ảnh; thêm group experience và đánh số theo thứ tự mới. |

Ảnh public Chromium mới không đăng nhập,1440×1000 DPR1: DJ `https://fly-dj-app-production.up.railway.app/`; Jobs `https://frontend-production-be24.up.railway.app/`; Labour `https://flytalentbridge.vn/`; PTE `https://flypte.up.railway.app/login`. PTE URL được tìm trong script QA cũ `E:/CodexTemp/Fly_PTE/railway-reconnect/public-smoke.cjs`, xác minh lại bằng navigation thật; không chạy script cũ có POST login. Chỉ bỏ qua onboarding, xác nhận consent localStorage của browser tạm để tới login (đối chiếu MOnboardingGate); không nhập/submit credential. Mask browser cho data-private/input có dữ liệu; login cuối có các field rỗng nên giữ UI. Asset WebP quality90; cover/gallery q90, lightbox/thumbnail/Next dùng đầy đủ. Jobs chờ Sign in và search thật thay skeleton. Đổi tên hai asset cuối `fly-jobs-home.webp`, `fly-pte-login.webp` để tránh cache ảnh tối ưu của capture thử trước.

### Mapping và checkpoint

Tái sử dụng Dennis pattern/reference đã duyệt ở phần trước. `portfolio-data.ts`/`portfolio-media.ts` → ProjectCollection (input projects, group filter, row/preview/offset chung visible); Home input featured; ProjectDetail/ProjectGallery/Footer Next dùng cùng media. Optional tone giữ style cũ, case mới dùng layout chung. Không thêm motion/layout mới. Đọc local Next16 docs 01-app/01-getting-started/12-images.md; quality90 đã allowlist.

Đã tích hợp bảy case EN/VI, About/capabilities/skillGroups, giữ experience. Lint/tsc/build đầu PASS. QA Chromium reduced motion EN/VI1440/768/390×900 PASS: Home4/2 tile, total07; filter7/4/3; preview strip count khớp; list/grid; tất cả7 route status200; ảnh cover decode và q90 case mới; Next đúng thứ tự; gallery/full asset/Escape/focus return; About skills/history; không pageerror/tràn ngang. Đã xem ảnh desktop/mobile list, detail và lightbox. Lỗi QA đầu: mask cần array; chụp trước entrance; PTE onboarding chặn login; chờ h1/Log in sai selector; decode lazy image ẩn chờ vô hạn. Đã sửa điều kiện công cụ, không đổi app để hợp thức hóa. Login cuối bỏ mask màu hồng ở field rỗng. Còn kiểm chứng normal-motion hover/filter/featured, build cuối sau tên asset đổi và review diff.

Temp task `E:/CodexTemp/quan-portfolio/fly-content` giữ script/capture/log để hoàn tất, dọn sau khi lưu kết quả chữ. Không tạo branch/worktree; reuse checkout hiện có. Không đụng GitHub profile README.

### Kết quả cuối và bàn giao

- PASS `npm.cmd run lint`, `npm.cmd run build` (compile, TypeScript, static pages và dynamic case route), `npx.cmd tsc --noEmit` sau build cuối; `git diff --check` không lỗi whitespace. Chỉ có warning Git LF→CRLF theo cấu hình hiện có.
- PASS Chromium Windows DPR1, reduced motion, EN/VI ×1440/768/390×900 trên build cuối: toàn bộ bảy route200; 4/2 Home tile; total07; filter7/4/3; list/grid; row và preview count; cover decode/q90; Next case tuần hoàn; gallery asset đầy đủ, Escape và trả focus; About không tràn ngang, giữ3 mục lịch sử; không pageerror. Đã xem capture list desktop/tablet/mobile, grid VI, case DJ mobile, lightbox PTE mobile và About VI390. Ảnh screenshot giữ crop của pattern cũ, gallery/lightbox cho xem đầy đủ; không đổi layout hoặc motion.
- PASS normal motion1440: hover cả14 vị trí qua ba nhóm và4 featured Home; offset preview kết thúc đúng index/chiều cao tile, asset đúng slug sau lọc. Filter fade/list/grid/đổiVI, click case PTE → Next FCR → Back đạt, không pageerror. Bài QA đầu dùng locator tự scroll Next trong footer parallax nên case-story che pointer; sửa công cụ dùng wheel thật tới cuối trang, đợi Lenis ổn định rồi click; không force/JS click hoặc sửa app. Một assert text ban đầu không tính newline của sup đã sửa dùng textContent. Không dùng lỗi selector/tool làm kết luận regression.
- Đối chiếu dữ liệu với HEAD bằng TypeScript transpile/so sánh object: ba case cũ chỉ đổi số thứ tự và thêm group; toàn bộ copy/slug/stack/tone/năm nguyên vẹn. Experience khớp tuyệt đối; bảy slug duy nhất. Bốn WebP1440×1000 đúng metadata, tổng≈345KB; source screenshot đã xem và không có credential/dữ liệu riêng. Hai preview user giữ nguyên, không đưa vào thay đổi task. Review diff không có dependency/config/backend/refactor ngoài phạm vi.
- Giới hạn: kiểm chứng Chromium Windows và viewport responsive, chưa kiểm chứng Safari/iPhone thật; không xác nhận production parity hay tình trạng phát hành của sản phẩm Fly.

Acceptance đã đạt theo phạm vi user thu hẹp; giữ preview production local `http://localhost:5380` (PID26108), không commit/push/deploy. Không tạo branch/worktree. Đã đóng browser QA; temp `E:/CodexTemp/quan-portfolio/fly-content` được kiểm tra absolute path/reparse point và dọn sau khi lưu kết luận này; trạng thái xác nhận dọn và task Done đọc lại tại Linear marker `[portfolio-fly-content:verified:v1]`.

## Giữ ba dự án cũ trên homepage, bỏ Fly PTE — FLY-111

Plan user duyệt ngày 2026-10-15: homepage FCR → ITD → Eigakan đủ ba ở 1440/768/390; Projects sáu case DJ → Jobs → Labour → FCR → ITD → Eigakan, filter6/3/3, CTA06 và Next tuần hoàn. Bỏ case/mapping/asset PTE, slug404; giữ About, nội dung/ảnh cũ, Dennis và hai preview user. Không push/deploy.

Reuse `portfolio-data.ts` featured → `portfolio-site.tsx` Home → `ProjectCollection` nhận danh sách riêng; preview dùng chính danh sách đã lọc. Bỏ giới hạn home-extra-project tại collection/CSS để tablet/mobile dùng grid hiện có cho đủ ba. Không thêm pattern/token/motion.

Checkpoint: đã xác minh checkout dirty, bảo toàn thay đổi trước; đã chuyển featured, bỏ PTE và đánh số01–06. Đang kiểm chứng lint/TypeScript/build và runtime EN/VI1440/768/390, hover/list/grid/gallery/Escape/slug/Next. Temp `E:/CodexTemp/quan-portfolio/home-six` giữ bản trước sửa và QA; dọn sau lưu kết quả. Preview5380 hiện là build cũ, sẽ thay bằng build cuối.

### Kết quả FLY-111

- PASS `npm.cmd run lint`, `npm.cmd run build`, `npx.cmd tsc --noEmit`, `git diff --check` (chỉ warning LF→CRLF có sẵn). Review diff với bản trước lượt này: chỉ data/media/collection/CSS và checkpoint đổi; bảo toàn code dirty cũ và hai ảnh preview.
- PASS Chromium Windows DPR1 EN/VI ×1440/768/390×900: homepage đúng FCR/ITD/Eigakan, cả ba row visible và ảnh decode; CTA06. Projects sáu row theo thứ tự, filter6/3/3 và từng nhóm đúng slug; desktop list/grid; không tràn ngang. Đã xem full-page Home cả ba viewport, Projects390VI và grid1440VI: grid tablet hai cột với Eigakan hàng sau, mobile một cột đủ ba, giữ crop/layout cũ.
- PASS cả sáu detail status200 ở mọi locale/viewport, ảnh gallery decode; Escape đóng và trả focus, FCR ArrowRight đổi ảnh; Next href vòng DJ→Jobs→Labour→FCR→ITD→Eigakan→DJ. `/projects/fly-pte`404. Không pageerror trong flow.
- PASS normal motion1440: hover3 Home và6/3/3/6 row của danh sách/các nhóm, strip count/asset/offset đúng; list↔grid, click DJ và Next→Jobs bằng pointer thật. Không pageerror.
- Đối chiếu object trước/sau bằng TypeScript transpile: mọi case giữ nguyên nội dung trừ number/featured; export About/capabilities/skills/history/copy khớp tuyệt đối. Không còn Fly PTE/slug/mapping trong src, asset riêng đã xóa. Không đổi dependency, token hoặc motion.
- Lỗi công cụ QA đầu đã sửa: curtain idle là hidden nên chờ attached; work-label mobile ẩn nên scroll row; hover sau filter phải chờ collection hoàn tất entrance và đưa pointer ra trước. Không sửa app/expectation để che lỗi hành vi.
- Giới hạn: Chromium Windows/responsive; chưa kiểm chứng Safari/iPhone thật. Preview build cuối `http://localhost:5380` PID29460; không commit/push/deploy, không tạo branch/worktree.

Acceptance FLY-111 đã đạt. Capture/script/backup trong temp home-six sẽ dọn sau lưu kết luận; giữ preview5380 cho user xem.
Đã kiểm tra absolute path/reparse point, dọn temp home-six và xác nhận Test-Path=False. Giữ server5380; không có tài nguyên branch/worktree mới cần dọn.

## Đồng bộ tab và icon công nghệ — 2026-10-15 — FLY-112

Plan user duyệt: title **Trần Minh Quân — Full-stack Developer**, đồng bộ tên OG/Twitter; TMQ trắng nền ink Dennis, bỏ favicon cạnh tranh. About và sáu detail dùng mapping/component react-icons chung, currentColor20px/gap8px, aria-hidden không focus; giữ dữ liệu/nhóm/thứ tự và layout. About dùng list wrap, detail giữ list. Không thêm dependency, đổi ảnh OG, push/deploy.

Nguồn: globals.css ink#1c1d20/paper#fff; portfolio-pages.tsx/CSS giữ pattern Dennis đã duyệt. Component technology.tsx dùng logo chính xác từ react-icons; Oracle/Oracle SQL dùng GrOracle, React/React Native dùng SiReact. Entity Framework dùng database, BullMQ queue/list, SignalR/real-time broadcast, Whisper AI và TestFlight test chức năng khi không có logo phù hợp. Không thay logo thương hiệu khác. Data stack string[] nguyên vẹn.

Checkpoint: đã sửa metadata, SVG và bỏ app/favicon.ico; tích hợp Technology vào About/case. Đang lint/build/TypeScript và QA EN/VI1440/768/390, direct/reload/navigation metadata/icon endpoint. Giữ dirty trước task và hai preview user. Temp E:/CodexTemp/quan-portfolio/tech-icons chứa backup/QA, dọn trước bàn giao; preview5380 cần khởi động build mới.

### Kết quả FLY-112

- PASS npm.cmd run lint, npm.cmd run build bản cuối, npx.cmd tsc --noEmit sau build, git diff --check. Build đầu bị phát hiện metadata chưa thay đúng do encoding của Node qua pipe PowerShell; đã sửa bằng patch UTF-8 và build lại, runtime xác nhận đúng dấu tiếng Việt.
- PASS Chromium Windows DPR1: About + sáu detail × EN/VI ×1440/768/390×900 =42 tổ hợp. Đối chiếu text/thứ tự trực tiếp với skillGroups/project.stack, mọi mục có SVG20×20, gap8px, aria-hidden/focusable=false; không overflow trang hoặc item. Reload42 lượt, title đúng, đúng một favicon /portfolio-mark.svg; OG/Twitter đúng tên. Normal-motion pointer navigation About→Projects đúng title/icon; SVG endpoint200, ink/trắng không còn vàng, không pageerror. Preview production5380 chạy build cuối.
- Đã xem capture VI About và case Jobs cả ba viewport; icon đơn sắc căn hàng, Google Cloud Storage/Entity Framework xuống dòng tại768px, giữ trục chữ và không tràn. Capture có skip-link do focus main của navigation; bổ sung blur capture để quan sát nội dung bị overlay, không sửa hành vi ngoài phạm vi. Runtime/icon mapping bao phủ sáu case và tất cả nhóm About. Chưa kiểm chứng Safari/iPhone thật.
- Review diff với bản trước task: portfolio-pages.tsx chỉ thêm import và hai consumer Technology; CSS chỉ thêm list/icon; metadata/SVG và xóa favicon mặc định đúng phạm vi. Data/ảnh/dependency/motion và dirty trước task giữ nguyên; không sửa ảnh OG, không commit/push/deploy. Không tạo branch/worktree. Capture/script/backup temp sẽ dọn sau ghi kết luận và đóng browser; giữ preview5380 cho user.
Đã đọc lại FLY-112 Done và marker verified; kiểm tra absolute path/reparse point rồi dọn temp tech-icons, xác nhận không còn. Giữ preview5380 build cuối; không có branch/worktree mới cần dọn.

## Đổi ảnh About — 2026-10-15 — FLY-113

User gửi JPEG tại Downloads/812c2a4c-2cd6-491c-943e-39ea44936e15.jpg, yêu cầu thay ảnh lớn /about. Copy nguyên bản sang public/assets/tran-minh-quan-about.jpg, SHA256 cả nguồn/đích46E723455EDBCD0BE97D18154A2D97A1308FA7783CCAA4C157E6D0B43B80E18F. Không xử lý ảnh. aboutPortrait riêng trong portfolio-media.ts → About; giữ portrait cho Contact/footer và heroPortrait cho Home. Reuse layout/parallax/crop Dennis hiện có, không đổi CSS/dependency.

Đang lint/build và QA ảnh1440/768/390 trước restart preview5380. Giữ dirty có sẵn; không commit/push/deploy. Temp E:/CodexTemp/quan-portfolio/about-photo chứa QA/capture, dọn sau ghi kết luận.

Kết quả FLY-113: PASS lint, production build, TypeScript độc lập sau build, diff --check. Chromium Windows normal motion1440/768/390×900: /about200, ảnh mới decode/source đúng, không tràn ngang/pageerror; đã xem capture ba viewport, khuôn mặt đầy đủ và crop theo layout cũ. Asset copy hash khớp tuyệt đối nguồn. Preview5380 đã restart build cuối; không đổi ảnh Home/Contact/footer, CSS hay dependency. Chưa kiểm chứng Safari/iPhone thật. Đã đóng browser QA và sẽ dọn temp sau ghi kết luận; giữ server preview cho user.
Đã đọc lại FLY-113 Done, kiểm tra path/reparse point và dọn temp about-photo, xác nhận không còn. Giữ preview5380; không tạo branch/worktree.

## Link Preview và màu thương hiệu công nghệ — 2026-10-15 — FLY-114

Task: https://linear.app/fly-group/issue/FLY-114. Đối soát toàn bộ project Quan Portfolio (hasNextPage=false), workspace/team/project đúng `.agents/linear.json`; tạo và đọc lại task In Progress. Reuse checkout hiện tại, giữ toàn bộ dirty từ FLY-106/111/112/113 và hai ảnh preview user. Không push/deploy.

### Contract và mapping đã duyệt

- About và sáu detail dùng chung `technology.tsx`: giữ nguyên `string[]`, nhóm/thứ tự/tên, icon chức năng và bố cục/ảnh About. Mapping bổ sung URL chính thức, màu và WebP theo từng URL. React/React Native và Oracle/Oracle SQL cùng logo/màu, tài liệu riêng. Real-time events → MDN DOM events, màu ink. Thương hiệu monochrome dùng ink.
- Nguồn implementation: https://ui.aceternity.com/registry/link-preview.json (đọc2026-10-15), static variant → `link-preview.tsx` → Technology ở hai consumer hiện có trong `portfolio-pages.tsx`. Reuse Radix Hover Card, open50ms/close100ms, appearance spring260/20 từ opacity0/y20/scale0.6 đến1/0/1; cursor spring100/15 và offset một nửa khoảng cách tới tâm. Dùng `framer-motion`12.43 có sẵn; chỉ thêm dependency trực tiếp `@radix-ui/react-hover-card`1.2.1, không qss/Microlink/motion package khác.
- Adaptation được plan duyệt: portal, collision padding32px (dự phòng20px chuyển động ngang), currentTarget tránh đổi tâm giữa SVG/tên, giới hạn x±20px; target_blank/noopener/noreferrer cho trigger/preview; focus/Escape/blur; chạm dùng native anchor, chặn riêng Radix touchstart cancellation qua capture; reduced motion chỉ fade; lỗi ảnh hiện tên/domain. Ảnh tải eager khi popover được mở. Content theo lifecycle Radix như nguồn để preview cũ không tồn tại chồng lên nhau sau đóng.
- Màu từ Simple Icons16.0.0: https://cdn.jsdelivr.net/npm/simple-icons@16.0.0/index.js (metadata `hex`/`source`), màu Microsoft/.NET và sản phẩm thiếu logo theo identity tương ứng. Điều chỉnh RGB tối dần cùng tông đến≥4.5:1 trên #e9eaeb; trắng cũng được kiểm tra runtime. Icon dùng cùng currentColor với tên. Không tạo token/theme cạnh tranh.
- 43 URL/ảnh600×375 DPR1, Chrome, WebP85 tại `public/assets/technology/`, hiển thị200×125. Mapping URL→ảnh lưu ngay trong Technology. Capture trang công khai, đóng consent khi có control thực; không đăng nhập. Whisper trên openai.com bị403/Cloudflare nên dùng URL và ảnh **repository chính thức https://github.com/openai/whisper**, không dùng ảnh website khác cho URL bị lỗi. MDN Events và Oracle SQL có redirect chính thức; giữ URL tài liệu trong mapping, capture destination tương ứng.

### Checkpoint

- PASS lint, TypeScript và production build ban đầu; QA Chromium Windows EN/VI1440/768/390×900:42 tổ hợp, đủ tên/thứ tự/link/icon, contrast≥4.5:1 và không tràn ngang. Tất cả43 WebP decode600×375 đúng URL, About38 mục và5 mục chỉ xuất hiện ở case.
- Đã quan sát demo Aceternity runtime1440×900: hover Tailwind CSS mở phía trên, wrapper212×137 (image200×125 + padding/border), đối chiếu hình dạng/shadow/source spring. Capture trong task-temp; không khẳng định tốc độ khung hình.
- QA phát hiện portal forceMount giữ các preview cũ lúc chạy exit khi hover nhanh: sửa lifecycle Content theo mã nguồn (AnimatePresence nằm trong Content, không forceMount), build lại. PASS hover/spring ngang, chuyển vào preview/click mở tab mới/no opener; hover nhanh ownership; Tab/Shift+Tab/Escape/blur; collision flip và nằm trong viewport1440/768/390.
- Lỗi công cụ đã xử lý: Next Image normalize src thành absolute nên so pathname; tách QA server khỏi session test; kiểm tra reduced motion khi load đúng preference (hook Framer giữ preference lúc mount). Chưa kết luận touch/fallback/reduced motion cuối; đang QA lại. Temp riêng `E:/CodexTemp/quan-portfolio/tech-preview`, dọn sau khi lưu kết quả. Preview5380 đang phục vụ build mới; final lint/TypeScript/diff review còn chờ.

### Kết quả cuối

- PASS normal-motion Chromium: hover nhanh chỉ preview cuối; spring ngang có dịch chuyển đo được; chuyển chuột vào preview vẫn mở, click mở đúng URL ở tab mới và `window.opener === null`. Tab/Shift+Tab chuyển link đúng thứ tự, Escape đóng và rời focus đóng. Preview portal200×125 nằm trong viewport1440/768/390, sát mép trên tự đổi phía xuống dưới. Đã xem capture About desktop/mobile và case nền xám, đối chiếu demo Aceternity.
- PASS reduced motion khi tải trang với OS preference reduce: không translate/scale, chỉ opacity. Chặn ảnh React bằng network interception: preview hiện React + react.dev và href gốc còn đúng. Chromium mobile390/isMobile/hasTouch: chạm đầu tiên mở URL chính thức ở tab mới, không mở preview, không cần chạm lần hai. Chưa kiểm chứng Safari/iPhone thật; không suy kết quả từ giả lập sang thiết bị thật.
- 43 ảnh sản phẩm tổng772,496 bytes; dùng chung giữa các consumer. Review ảnh600×375, đóng consent bằng control website khi có; không sửa DOM để dựng website giả. BullMQ dùng ink sau đối chiếu logo monochrome chính thức tại https://bullmq.io/images/bullmq-logo.png (không dùng đỏ suy đoán). Giữ functional icon đã chọn.
- Final build PASS (Next16.2.12 compile/TypeScript/static routes/dynamic cases); final lint, `npx.cmd tsc --noEmit` và `git diff --check` PASS. Sau màu BullMQ cuối, restart production5380 và chạy lại đủ42 tổ hợp cùng toàn bộ interaction/fallback/touch checks: PASS, không pageerror. Review scope: chỉ mapping/component/CSS preview, package/lock thêm Radix và plan; không ghi lại data/layout/ảnh About hoặc dirty khác. Không commit/push/deploy.
- Đối chiếu runtime motion bằng MutationObserver + requestAnimationFrame Chromium1440×900 normal motion: source mở86ms/đóng118.8ms, local77.9ms/113.8ms (bao gồm render/scheduling; cấu hình vẫn50/100ms). Source49 và local59 mẫu, state đầu opacity0/scale≈0.6/y≈20, cuối opacity1/scale1/y0 ở≈850ms; cursor gần tâm nên x≈0. Không suy frame rate hay đồng nhất tuyệt đối từ số mẫu. Lần đo local đầu thất bại vì server cũ còn giữ build trước; restart đúng build và đo lại thành công, không đổi acceptance/code để che lỗi.
- Đã đóng các browser QA thành công; kiểm tra absolute path và không có reparse point trước dọn temp `E:/CodexTemp/quan-portfolio/tech-preview`. Preview5380 cuối chạy riêng, không giữ log/capture trong temp. Linear final marker `[portfolio-tech-preview:verified:v1]`; phần cleanup và đọc lại Done được xác nhận trước bàn giao.

## Link Preview trong ba mô tả năng lực — 2026-10-15 — FLY-116

Task: https://linear.app/fly-group/issue/FLY-116. Đã đọc đầy đủ project (hasNextPage=false), xác minh mapping và đọc lại In Progress. Reuse checkout dirty, không tạo branch/worktree, không push/deploy.

Mapping: `technology.tsx` mapping và `Technology` hiện có → `TechnologyText(text)` tách chuỗi bằng tên đã escape regex, ưu tiên dài trước → ba `capabilities` tại `portfolio-pages.tsx`. Giữ riêng React Native/Expo, Python/FastAPI với dấu `/`; giữ nguyên data, câu chữ, tiêu đề, CSS/layout, dependency và ảnh. Dùng nguyên LinkPreview và contract FLY-114.

Checkpoint: implementation hoàn tất; lint, TypeScript, production build và diff check PASS. Preview5380 đã restart build mới (PID18428). QA Chromium EN/VI1440 đã đạt text nguyên vẹn, 23 link (5/8/10), icon/màu/URL, ảnh hover đúng và không tràn ngang; đang kiểm tra768/390 và tương tác. Temp `E:/CodexTemp/quan-portfolio/capability-preview` giữ bản trước sửa và capture/script QA, dọn sau lưu kết quả.

### Kết quả FLY-116

- PASS `npm.cmd run lint`, `npx.cmd tsc --noEmit` trước và sau production build, `npm.cmd run build`, `git diff --check` (chỉ warning LF→CRLF có sẵn).
- PASS Chromium Windows EN/VI ×1440/768/390×1000: textContent cả ba đoạn khớp tuyệt đối dữ liệu nguồn, 23 link (5/8/10) đúng tên/icon/màu/URL; React Native không bị tách thành React, các dấu `/` nguyên vẹn. Hover toàn bộ23 link ở cả6 tổ hợp: đúng ảnh mapping, ảnh tải/decode, đóng khi rời chuột, không pageerror hay tràn ngang. Đã xem capture đủ6 tổ hợp: giữ ba cột desktop/tablet, mobile một cột và wrap phù hợp pattern hiện có.
- PASS normal motion1440: chuyển vào preview vẫn mở, click preview mở đúng URL Microsoft ở tab mới và opener=null; focus mở, Escape đóng, Tab sang đúng link tiếp. PASS Chromium mobile390 isMobile/hasTouch: chạm một lần mở tab mới, không bật preview. Giới hạn: chưa kiểm chứng Safari/iPhone thật.
- Review diff với bản trước lượt này: chỉ thêm renderer9 dòng trong Technology và đổi import/render ba mô tả ở portfolio-pages, cùng checkpoint này. Không đổi data, CSS, dependency, ảnh hoặc dirty có sẵn. Không commit/push/deploy.
- Giữ preview production local http://localhost:5380/about chạy build cuối. Browser QA đã đóng; temp được dọn sau khi lưu kết quả này. Linear marker `[portfolio-capability-preview:verified:v1]`.

## Làm rõ năng lực và bỏ logo C# lặp — 2026-10-15 — FLY-118

Task: https://linear.app/fly-group/issue/FLY-118. Đã xác minh mapping workspace/project/team, đọc đủ task project (hasNextPage=false); đây là acceptance mới sau FLY-116. Giữ checkout dirty và hai preview user, không tạo branch/worktree, không push/deploy.

Plan user duyệt: giữ ba tiêu đề, thay đúng mô tả EN/VI về backend, web/mobile và dữ liệu/realtime/AI. Giữ đủ danh sách kỹ năng, thêm Google Play Console ngay sau TestFlight. Mapping `technology.tsx` optional icon → C# chỉ tên/màu/link/preview; các icon khác giữ nguyên. Google Play dùng SiGoogleplay, ink#1c1d20, https://google.play/business/ và ảnh public600×375 WebP chụp trực tiếp trang chính thức ngày2026-10-15. Reuse TechnologyText/LinkPreview/CSS/interaction hiện có, không đổi API/dependency/layout.

Checkpoint: đã sửa portfolio-data.ts, technology.tsx và thêm public/assets/technology/google-play-console.webp; ảnh nguồn được xem, không consent che. Lint và TypeScript PASS; build đang chạy. QA sẽ kiểm tra EN/VI1440/768/390, text/title/wrap, About/VDS C#, preview Google Play và bàn phím/tab mới/touch. Temp E:/CodexTemp/quan-portfolio/capability-copy có backup trước sửa và script/capture, dọn sau lưu kết quả.

QA phát hiện VI1440 dấu chấm sau BullMQ xuống dòng riêng vì anchor inline-flex là một box độc lập. Đã nhóm tên công nghệ và dấu câu liền sau trong TechnologyText bằng span nowrap; giữ nguyên textContent, tên/link, public API, CSS file và bố cục. Đây là sửa wrap trong acceptance, không đổi copy đã duyệt. Chạy lại build/check và toàn bộ sáu tổ hợp sau thay đổi.

Lỗi script QA đã xác minh: Next render src ảnh absolute nên so pathname; Tab rời Google Play chuyển đúng sang PostgreSQL và mở preview mới (không phải đóng mọi preview). Sửa điều kiện kiểm tra theo focus/href thật, không sửa app để che lỗi. Browser sẵn có chromium1243 được dùng bằng executablePath do cache Playwright CLI đòi1248 chưa cài; không thêm dependency/toolchain.

### Kết quả FLY-118

- PASS final `npm.cmd run lint`, `npm.cmd run build`, `npx.cmd tsc --noEmit` sau build; `git diff --check` và no-index diff check hai file source với backup trước sửa (chỉ warning LF→CRLF có sẵn).
- PASS Chromium Windows EN/VI ×1440/768/390×1000: ba body/title khớp source tuyệt đối, 15 link năng lực (3/6/6); hover từng link tải ảnh thật đúng href. Google Play có cả mô tả lẫn skills, ảnh WebP600×375 decode thành công. Không tràn ngang; đã xem ảnh desktop/tablet và toàn section mobile. BullMQ + dấu chấm giữ cùng dòng sau sửa. Capture VI1440 đầu có dấu hiệu paint chưa ổn định; chụp lại sau fonts.ready và đối chiếu DOM x của article/title/number115.19/543.98/972.80 đúng ba cột, ảnh cuối đúng bố cục.
- PASS About và VDS ở đủ sáu tổ hợp: C# đúng một tên, không svg, href/preview cũ còn tải được; VDS bốn công nghệ khác giữ icon. Đối chiếu exports bằng TypeScript transpile: mọi dữ liệu ngoài capabilities/skillGroups nguyên vẹn, title không đổi, skills cũ giữ đủ/thứ tự; chỉ thêm Google Play Console sau TestFlight.
- PASS normal-motion1440 Google Play: hover và chuyển vào preview giữ mở, click mở đúng https://google.play/business/ ở tab mới, opener=null; focus/Tab/Shift+Tab/Escape đúng, Tab sau Google Play sang PostgreSQL và đổi preview đúng href. PASS mobile Chromium390 isMobile/hasTouch: một chạm mở đúng tab mới, không mở hover preview. Không pageerror trong các flow. Giới hạn: chưa kiểm chứng Safari/iPhone thật.
- Review diff so bản trước task: chỉ portfolio-data.ts, technology.tsx, asset Google Play mới và checkpoint này. Không đổi CSS file, public API, dependency hoặc dirty cũ; không commit/push/deploy. Preview cuối http://localhost:5380/about PID28272 giữ cho user xem. Không tạo branch/worktree.
- Acceptance đạt; browser QA đã đóng. Dọn riêng temp capability-copy sau lưu kết luận, giữ hai ảnh preview user và temp của công việc khác. Linear final marker `[portfolio-capability-copy:verified:v1]`.
Đã xác minh absolute path/reparse point, dọn temp capability-copy và xác nhận Test-Path=False. Giữ server5380 build cuối để review.

## Phát hành bản portfolio đã duyệt — 2026-10-15 — FLY-119

User đã yêu cầu đưa bản hiện tại lên GitHub và làm bản chính, thay giới hạn không push/deploy của các task trước. Xác minh repo micharel09/quan-portfolio, origin đúng URL, default branch main; fetch origin cho HEAD=origin/main=d901544 trước commit, không cần merge/rebase. Vercel liên kết project quan-portfolio, push main tự triển khai Production.

Scope release: toàn bộ implementation/asset đã duyệt FLY-106/111/112/113/114/116/118 và checkpoint; giữ current-preview.png/detail-preview.png ngoài commit. Không đổi source trong lượt phát hành. Dùng lại lint/TypeScript/build và QA cuối FLY-118 do source/config/dependency không đổi; review diff release xác nhận đúng các thay đổi đã ghi. Stage explicit source/package/product assets/plan, diff check và kiểm tra asset trước commit; push thường main, đối chiếu SHA GitHub và deployment, smoke production trước Done. Không tạo branch/worktree hoặc deploy thủ công cạnh tranh Git integration.
