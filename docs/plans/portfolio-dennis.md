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