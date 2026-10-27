const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function runAudit() {
  console.log('=== STARTING KAMAKSHI TRADERS SIMPLIFIED WEBSITE & WHATSAPP AUDIT ===');
  const browser = await chromium.launch({ headless: true });
  const results = {
    consoleErrors: [],
    consoleWarnings: [],
    failedRequests: [],
    tests: [],
  };

  const screenshotsDir = path.join(__dirname, '..', 'audit-screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  // ==========================================
  // 1. Desktop Test (1440x900) & Official Logo Verification
  // ==========================================
  console.log('\n--- 1. Testing Desktop Layout & Official Logo (1440x900) ---');
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      results.consoleErrors.push(msg.text());
      console.error('Console Error:', msg.text());
    } else if (msg.type() === 'warning') {
      results.consoleWarnings.push(msg.text());
    }
  });

  page.on('response', (response) => {
    if (response.status() >= 400) {
      console.log(`[HTTP ${response.status()}]`, response.url());
    }
  });

  page.on('requestfailed', (request) => {
    // Browsers intentionally abort initial video byte-range probing when metadata is loaded
    if (request.resourceType() === 'media' && request.failure()?.errorText === 'net::ERR_ABORTED') {
      return;
    }
    results.failedRequests.push(`${request.url()}: ${request.failure()?.errorText}`);
    console.error('Failed Request:', request.url(), request.failure()?.errorText);
  });

  const BASE_URL = process.env.BASE_URL || 'http://localhost:3000/';
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Verify official Kamakshi Traders logo rendered in navigation
  const navLogo = page.locator('header img[src*="kamakshi-traders-logo.png"]');
  const isNavLogoVisible = await navLogo.isVisible();
  console.log('Official logo visible in Navigation:', isNavLogoVisible);
  if (!isNavLogoVisible) throw new Error('Official Kamakshi Traders logo not visible in header');

  // Verify official logo in Footer
  const footerLogo = page.locator('footer img[src*="kamakshi-traders-logo.png"]');
  const isFooterLogoVisible = await footerLogo.isVisible();
  console.log('Official logo visible in Footer:', isFooterLogoVisible);
  if (!isFooterLogoVisible) throw new Error('Official Kamakshi Traders logo not visible in footer');

  // Take desktop full page screenshot
  await page.screenshot({ path: path.join(screenshotsDir, 'desktop-full.png'), fullPage: true });
  console.log('Captured desktop full page screenshot.');
  results.tests.push({ name: 'Desktop Initial Load & Official Logo Placement', status: 'PASS' });

  // ==========================================
  // 2. Simplified Navigation Links
  // ==========================================
  console.log('\n--- 2. Testing Simplified Navigation Links ---');
  const navText = await page.locator('header nav').innerText();
  console.log('Header navigation items:', navText.replace(/\n+/g, ' '));
  const hasHome = navText.includes('Home');
  const hasSolutions = navText.includes('Solutions');
  const hasProjects = navText.includes('Projects');
  const hasContact = navText.includes('Contact');

  if (!hasHome || !hasSolutions || !hasProjects || !hasContact) {
    throw new Error('Navigation links do not match required simplified set (Home, Solutions, Projects, Contact)');
  }

  // Ensure removed sections are not in navigation
  if (navText.includes('Calculator') || navText.includes('Technology') || navText.includes('Insights') || navText.includes('FAQ')) {
    throw new Error('Obsolete section links found in navigation');
  }
  results.tests.push({ name: 'Simplified Navigation Links (Home, Solutions, Projects, Contact)', status: 'PASS' });

  // ==========================================
  // 3. Confirm Complete Removal of Unwanted Legacy Sections
  // ==========================================
  console.log('\n--- 3. Verifying Complete Removal of Unwanted Legacy Sections ---');
  const calculatorCount = await page.locator('#calculator').count();
  const technologyCount = await page.locator('#technology').count();
  const insightsCount = await page.locator('#insights').count();
  const topAnnouncementCount = await page.locator('text="Turnkey Solar EPC, Commercial & Residential Installations Across India"').count();

  console.log('Calculator section count:', calculatorCount);
  console.log('Technology section count:', technologyCount);
  console.log('Insights section count:', insightsCount);
  console.log('Top announcement bar count:', topAnnouncementCount);

  if (calculatorCount > 0 || technologyCount > 0 || insightsCount > 0 || topAnnouncementCount > 0) {
    throw new Error('Unwanted legacy sections or top announcement bar still present in DOM');
  }
  results.tests.push({ name: 'Verification: Calculator, Tech, Insights & Top Bar Removed', status: 'PASS' });

  // ==========================================
  // 4. Verify All Quote & Enquiry Buttons Open WhatsApp (wa.me/917014493079)
  // ==========================================
  console.log('\n--- 4. Testing Direct WhatsApp Links (wa.me/917014493079) ---');
  const targetWhatsApp = 'wa.me/917014493079';

  // 4a. Header Quote Button
  const headerQuoteBtn = page.locator('header a:has-text("Get a Solar Quote")').first();
  const headerHref = await headerQuoteBtn.getAttribute('href');
  console.log('Header Quote CTA href:', headerHref);
  if (!headerHref || !headerHref.includes(targetWhatsApp)) {
    throw new Error(`Header Quote button does not point to WhatsApp: ${headerHref}`);
  }

  // 4b. Hero Quote Button
  const heroQuoteBtn = page.locator('section a:has-text("Get a Solar Quote")').first();
  const heroHref = await heroQuoteBtn.getAttribute('href');
  console.log('Hero Quote CTA href:', heroHref);
  if (!heroHref || !heroHref.includes(targetWhatsApp)) {
    throw new Error(`Hero Quote button does not point to WhatsApp: ${heroHref}`);
  }

  // 4c. Solution Card Enquiry Buttons
  const solutionCardBtn = page.locator('#solutions a:has-text("Enquire on WhatsApp")').first();
  const solutionHref = await solutionCardBtn.getAttribute('href');
  console.log('Solution Card CTA href:', solutionHref);
  if (!solutionHref || !solutionHref.includes(targetWhatsApp)) {
    throw new Error(`Solution card CTA does not point to WhatsApp: ${solutionHref}`);
  }

  // 4d. Projects Banner Enquiry Button
  const projectBannerBtn = page.locator('#projects a:has-text("Enquire on WhatsApp")').first();
  const projectHref = await projectBannerBtn.getAttribute('href');
  console.log('Projects Banner CTA href:', projectHref);
  if (!projectHref || !projectHref.includes(targetWhatsApp)) {
    throw new Error(`Projects banner CTA does not point to WhatsApp: ${projectHref}`);
  }

  // 4e. Contact Banner Enquiry Button
  const contactBannerBtn = page.locator('#contact a:has-text("Enquire on WhatsApp")').first();
  const contactHref = await contactBannerBtn.getAttribute('href');
  console.log('Contact Banner CTA href:', contactHref);
  if (!contactHref || !contactHref.includes(targetWhatsApp)) {
    throw new Error(`Contact banner CTA does not point to WhatsApp: ${contactHref}`);
  }

  // 4f. Footer WhatsApp Link
  const footerWhatsAppLink = page.locator('footer a[href*="wa.me/917014493079"]').first();
  const footerHref = await footerWhatsAppLink.getAttribute('href');
  console.log('Footer WhatsApp link href:', footerHref);
  if (!footerHref || !footerHref.includes(targetWhatsApp)) {
    throw new Error(`Footer WhatsApp link does not point to WhatsApp: ${footerHref}`);
  }
  results.tests.push({ name: 'All Quote & Enquiry Buttons Point to WhatsApp (+91 70144 93079)', status: 'PASS' });

  // ==========================================
  // 5. Test Solutions Service Cards
  // ==========================================
  console.log('\n--- 5. Testing Solutions Section ---');
  await page.evaluate(() => {
    document.getElementById('solutions').scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(400);

  const solutionCardsCount = await page.locator('#solutions .group').count();
  console.log('Rendered solution cards count:', solutionCardsCount);
  if (solutionCardsCount !== 3) {
    throw new Error(`Expected exactly 3 core solution cards, found ${solutionCardsCount}`);
  }

  // Verify specified 3 cards are completely removed
  const hasEpc = await page.locator('#solutions').getByText('Turnkey Solar EPC & Installation').count();
  const hasBess = await page.locator('#solutions').getByText('Battery Energy Storage (BESS) & Hybrid Systems').count();
  const hasOm = await page.locator('#solutions').getByText('Solar Operations, Maintenance & Cleaning (O&M)').count();
  if (hasEpc > 0 || hasBess > 0 || hasOm > 0) {
    throw new Error('One or more of the removed service cards are still present in Solutions section');
  }

  const firstCardTitle = await page.locator('#solutions h3').first().innerText();
  console.log('First solution title:', firstCardTitle);
  results.tests.push({ name: 'Solutions Showcase: 3 Service Cards Rendered & Removed Cards Verified Absent', status: 'PASS' });

  // ==========================================
  // 5b. Test Single Continuous Playing Video (Button Removed, Autoplay/Muted/Loop/No Controls)
  // ==========================================
  console.log('\n--- 5b. Testing Homepage Continuous Video Integration ---');
  // 1. Verify "FIELD INSTALLATION & ENGINEERING OVERVIEW" button is completely removed
  const videoButtonCount = await page.locator(':text("FIELD INSTALLATION & ENGINEERING OVERVIEW")').count();
  console.log('Video button count (expected 0):', videoButtonCount);
  if (videoButtonCount !== 0) {
    throw new Error(`Video button was not removed: found ${videoButtonCount} occurrences`);
  }

  // 2. Verify exactly 1 video on homepage
  const videoElements = page.locator('video');
  const videoCount = await videoElements.count();
  console.log('Homepage video count (expected 1):', videoCount);
  if (videoCount !== 1) {
    throw new Error(`Expected exactly 1 video on the homepage, found ${videoCount}`);
  }

  const videoSrc = await videoElements.first().locator('source').getAttribute('src');
  console.log('Video source path:', videoSrc);
  if (!videoSrc || !videoSrc.includes('gemini_generated_video_73d62f32_gwr_video_mvp.mp4')) {
    throw new Error(`Video source does not match provided file: ${videoSrc}`);
  }

  // 3. Verify attributes: no controls, autoplay enabled, muted, loop, playsinline
  const hasControls = await videoElements.first().getAttribute('controls');
  const hasAutoplay = await videoElements.first().getAttribute('autoplay');
  const isMuted = await videoElements.first().evaluate((el) => el.muted);
  const isLoop = await videoElements.first().evaluate((el) => el.loop);
  console.log('Video controls (expected false):', hasControls !== null);
  console.log('Video autoplay (expected true):', hasAutoplay !== null);
  console.log('Video muted (expected true):', isMuted);
  console.log('Video loop (expected true):', isLoop);

  if (hasControls !== null) {
    throw new Error('Video must NOT have controls enabled');
  }
  if (hasAutoplay === null) {
    throw new Error('Video must have autoplay enabled');
  }
  if (!isMuted) {
    throw new Error('Video must be muted for continuous autoplay');
  }
  if (!isLoop) {
    throw new Error('Video must have loop enabled');
  }

  // 4. Verify continuous autoplay without user interaction
  await page.waitForTimeout(1000);
  const isAutoPlaying = await page.evaluate(() => {
    const v = document.querySelector('video');
    return v && !v.paused;
  });
  console.log('Video is auto-playing continuously:', isAutoPlaying);
  if (!isAutoPlaying) {
    throw new Error('Video is not auto-playing continuously');
  }

  // 5. Verify scrolling does NOT pause the video
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(300);
  const isStillPlayingAfterScroll = await page.evaluate(() => {
    const v = document.querySelector('video');
    return v && !v.paused;
  });
  console.log('Video continues playing after scroll:', isStillPlayingAfterScroll);
  if (!isStillPlayingAfterScroll) {
    throw new Error('Video paused upon scrolling; it must continue playing continuously');
  }

  // Scroll back to solutions for screenshot
  await page.evaluate(() => {
    document.getElementById('solutions').scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(400);

  // Capture video box screenshot
  const videoContainer = page.locator('#solutions video').locator('..');
  await videoContainer.screenshot({ path: path.join(screenshotsDir, 'video-box.png') });
  console.log('Captured continuous video box screenshot.');

  results.tests.push({ name: 'Video Button Removed & Replaced with Continuous Looping Video (Muted, No Controls, Scroll Resilient)', status: 'PASS' });

  // ==========================================
  // 6. Test Projects (Clean Image-Only Gallery, No Descriptions, All 5 Photos Displayed)
  // ==========================================
  console.log('\n--- 6. Testing Projects Display (Image-Only Gallery) ---');
  await page.evaluate(() => {
    document.getElementById('projects').scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(400);

  // Verify that category filter buttons are completely removed
  const filterPillCount = await page.locator('#projects button:has-text("All"), #projects button:has-text("Utility Scale"), #projects button:has-text("Microgrid")').count();
  console.log('Category filter button count (expected 0):', filterPillCount);
  if (filterPillCount !== 0) {
    throw new Error(`Category filter buttons were not removed: found ${filterPillCount} buttons`);
  }

  // Verify all 5 project cards and images are displayed
  const projectCards = page.locator('#projects .grid.grid-cols-1 > div');
  const projectCardCount = await projectCards.count();
  console.log('Project card count (expected 5):', projectCardCount);
  if (projectCardCount !== 5) {
    throw new Error(`Expected 5 project cards, found ${projectCardCount}`);
  }

  const projectImages = page.locator('#projects .grid.grid-cols-1 img');
  const projectImageCount = await projectImages.count();
  console.log('Project image count (expected 5):', projectImageCount);
  if (projectImageCount !== 5) {
    throw new Error(`Expected 5 project images, found ${projectImageCount}`);
  }

  // Verify that NO descriptive content, stats, tags, buttons, or case study links exist in the cards
  const inspectBtnCount = await page.locator('#projects button:has-text("Inspect Project Case Study")').count();
  console.log('Inspect case study button count (expected 0):', inspectBtnCount);
  if (inspectBtnCount !== 0) {
    throw new Error(`Found unexpected Inspect Project Case Study buttons: ${inspectBtnCount}`);
  }

  const statsCount = await page.locator('#projects :text("Annual Yield"), #projects :text("Carbon Offset"), #projects :text("System Rating")').count();
  console.log('Project statistics count (expected 0):', statsCount);
  if (statsCount !== 0) {
    throw new Error(`Found unexpected project statistics: ${statsCount}`);
  }

  const tagsCount = await page.locator('#projects :text("#Structural Fabrication"), #projects :text("#Truss Engineering"), #projects :text("#Heavy Industrial"), #projects :text("#EPC Turnkey")').count();
  console.log('Project tags count (expected 0):', tagsCount);
  if (tagsCount !== 0) {
    throw new Error(`Found unexpected project tags: ${tagsCount}`);
  }

  const zeroCurtailmentCount = await page.locator('#projects :text("Zero Grid Curtailment")').count();
  console.log('Zero Grid Curtailment count (expected 0):', zeroCurtailmentCount);
  if (zeroCurtailmentCount !== 0) {
    throw new Error(`Found unexpected Zero Grid Curtailment labels: ${zeroCurtailmentCount}`);
  }

  // Capture projects section screenshot
  const projectsSection = page.locator('#projects');
  await projectsSection.screenshot({ path: path.join(screenshotsDir, 'projects-section.png') });
  console.log('Captured clean image-only projects section screenshot.');

  results.tests.push({ name: 'Projects Clean Image-Only Gallery (No Text/Badges/Buttons, All 5 Photos Displayed)', status: 'PASS' });

  // ==========================================
  // 6b. Verify Complete Removal of FAQ Section & Natural Layout Flow
  // ==========================================
  console.log('\n--- 6b. Verifying Complete Removal of FAQ Section ---');
  const faqSectionCount = await page.locator('#faq').count();
  const faqHeadingCount = await page.locator('text="Frequently Asked Questions on Solar in Jodhpur."').count();
  const faqLabelCount = await page.locator('text="Solar FAQs & Customer Guidance"').count();
  const faqIntroCount = await page.locator('text="Direct, authoritative answers regarding rooftop solar systems"').count();
  const faqAccordionBtns = await page.locator('button[id^="faq-question-"]').count();
  const faqCategoryFilters = await page.locator('button:has-text("Services & Scope"), button:has-text("Locations & Coverage"), button:has-text("Quotations & Process"), button:has-text("Economics & Costs"), button:has-text("Quality & Selection"), button:has-text("Installation Process"), button:has-text("Government Subsidies")').count();
  const footerFaqLinkCount = await page.locator('footer a[href="#faq"]').count();

  console.log('FAQ section count (expected 0):', faqSectionCount);
  console.log('FAQ heading count (expected 0):', faqHeadingCount);
  console.log('FAQ label count (expected 0):', faqLabelCount);
  console.log('FAQ intro count (expected 0):', faqIntroCount);
  console.log('FAQ accordion buttons count (expected 0):', faqAccordionBtns);
  console.log('FAQ category filter buttons count (expected 0):', faqCategoryFilters);
  console.log('Footer FAQ link count (expected 0):', footerFaqLinkCount);

  if (faqSectionCount > 0 || faqHeadingCount > 0 || faqLabelCount > 0 || faqIntroCount > 0 || faqAccordionBtns > 0 || faqCategoryFilters > 0 || footerFaqLinkCount > 0) {
    throw new Error('FAQ section or its elements are still present on the website');
  }

  // Verify natural transition from Projects to Contact section
  const projectsBox = await page.locator('#projects').boundingBox();
  const contactBox = await page.locator('#contact').boundingBox();
  console.log(`Projects bottom: ${projectsBox.y + projectsBox.height}px | Contact top: ${contactBox.y}px`);
  // The distance between bottom of #projects and top of #contact should be virtually 0 (contiguous sections)
  const verticalGap = Math.abs(contactBox.y - (projectsBox.y + projectsBox.height));
  console.log('Vertical gap between Projects and Contact sections (px):', verticalGap);
  if (verticalGap > 5) {
    throw new Error(`Unexpected layout gap between Projects and Contact sections: ${verticalGap}px`);
  }

  results.tests.push({ name: 'Verification: FAQ Section Completely Removed & Natural Flow Preserved', status: 'PASS' });

  // ==========================================
  // 7. Test Contact Banner Section
  // ==========================================
  console.log('\n--- 7. Testing Contact Banner Section ---');
  await page.evaluate(() => {
    document.getElementById('contact').scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(400);

  const contactHeading = await page.locator('#contact h2').innerText();
  console.log('Contact banner heading:', contactHeading);
  if (!contactHeading.includes('Ready to Switch to Solar?')) {
    throw new Error(`Contact heading mismatch: ${contactHeading}`);
  }

  const phoneVisible = await page.locator('#contact').getByText('+91 70144 93079').isVisible();
  console.log('Contact banner displays +91 70144 93079:', phoneVisible);
  if (!phoneVisible) throw new Error('Phone +91 70144 93079 not visible in Contact banner');

  // Verify Instagram & Email in Contact section
  const contactEmailHref = await page.locator('#contact a[href="mailto:kamakshitradersjodhpur@gmail.com"]').getAttribute('href');
  const contactInstaHref = await page.locator('#contact a[href="https://www.instagram.com/kamakshitradersjodhpur/"]').getAttribute('href');
  console.log('Contact section Email href:', contactEmailHref);
  console.log('Contact section Instagram href:', contactInstaHref);
  if (!contactEmailHref || !contactInstaHref) {
    throw new Error('Email or Instagram link missing in Contact section');
  }

  results.tests.push({ name: 'Contact Banner: WhatsApp Hotline, Email & Instagram Channels', status: 'PASS' });

  // ==========================================
  // 7b. Test Footer Email & Instagram Contact Links
  // ==========================================
  console.log('\n--- 7b. Testing Footer Email & Instagram Contact Links ---');
  const footerEmail = page.locator('footer a[href="mailto:kamakshitradersjodhpur@gmail.com"]');
  const footerEmailText = await footerEmail.innerText();
  console.log('Footer Email text:', footerEmailText);
  if (!footerEmailText.includes('kamakshitradersjodhpur@gmail.com')) {
    throw new Error(`Footer email text mismatch: ${footerEmailText}`);
  }

  const footerInsta = page.locator('footer a[href="https://www.instagram.com/kamakshitradersjodhpur/"]');
  const footerInstaText = await footerInsta.innerText();
  const footerInstaTarget = await footerInsta.getAttribute('target');
  const footerInstaRel = await footerInsta.getAttribute('rel');
  console.log('Footer Instagram text:', footerInstaText, '| target:', footerInstaTarget, '| rel:', footerInstaRel);
  if (!footerInstaText.includes('@kamakshitradersjodhpur')) {
    throw new Error(`Footer Instagram text mismatch: ${footerInstaText}`);
  }
  if (footerInstaTarget !== '_blank' || !footerInstaRel?.includes('noopener')) {
    throw new Error('Instagram link must open in a new tab with rel="noopener noreferrer"');
  }

  // Capture footer contact screenshot
  const footerEl = page.locator('footer');
  await footerEl.screenshot({ path: path.join(screenshotsDir, 'footer-contact.png') });
  console.log('Captured footer contact screenshot.');

  results.tests.push({ name: 'Footer: Clickable Email (mailto:) & Instagram Official Profile (@kamakshitradersjodhpur)', status: 'PASS' });

  // ==========================================
  // 8. Test Statutory Policy Modals
  // ==========================================
  console.log('\n--- 8. Testing Statutory Policy Modals ---');
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await page.waitForTimeout(400);

  // Click Privacy Charter link
  await page.locator('footer button:has-text("Privacy Charter")').click();
  await page.waitForTimeout(400);

  const policyModalVisible = await page.locator('text=Corporate Privacy Charter').isVisible();
  console.log('Privacy Charter Policy Modal visible:', policyModalVisible);
  if (!policyModalVisible) throw new Error('Policy modal did not open for Privacy Charter');

  // Close Policy Modal
  await page.locator('[aria-label="Close dialog"]').click();
  await page.waitForTimeout(300);
  results.tests.push({ name: 'Statutory Policy Modals & Compliance Dialogs', status: 'PASS' });

  // ==========================================
  // 9. Test Mobile Viewport (375x812) & Mobile Drawer
  // ==========================================
  console.log('\n--- 9. Testing Mobile Viewport (375x812) ---');
  const mobilePage = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await mobilePage.goto(BASE_URL, { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1000);

  // Check mobile logo
  const mobileLogo = mobilePage.locator('header img[src*="kamakshi-traders-logo.png"]');
  const isMobileLogoVisible = await mobileLogo.isVisible();
  console.log('Official logo visible on mobile:', isMobileLogoVisible);
  if (!isMobileLogoVisible) throw new Error('Official logo not visible on mobile');

  await mobilePage.screenshot({ path: path.join(screenshotsDir, 'mobile-full.png'), fullPage: true });
  console.log('Captured mobile full page screenshot.');

  // Test mobile menu toggle
  const hamburgerBtn = mobilePage.locator('[aria-label="Toggle navigation menu"]');
  await hamburgerBtn.click();
  await mobilePage.waitForTimeout(400);

  const mobileNavDrawer = await mobilePage.locator('.sm\\:hidden a:has-text("Get a Solar Quote")').isVisible();
  console.log('Mobile navigation drawer quote CTA visible:', mobileNavDrawer);
  if (!mobileNavDrawer) throw new Error('Mobile drawer did not open with Quote CTA');

  // Check mobile drawer WhatsApp link
  const mobileQuoteHref = await mobilePage.locator('.sm\\:hidden a:has-text("Get a Solar Quote")').getAttribute('href');
  console.log('Mobile drawer quote href:', mobileQuoteHref);
  if (!mobileQuoteHref || !mobileQuoteHref.includes(targetWhatsApp)) {
    throw new Error('Mobile drawer quote does not point to WhatsApp');
  }

  // Click Solutions link in mobile drawer
  await mobilePage.locator('.sm\\:hidden a:has-text("Solutions")').first().click();
  await mobilePage.waitForTimeout(500);

  // Check mobile footer Email & Instagram links
  const mobileEmailVisible = await mobilePage.locator('footer a[href="mailto:kamakshitradersjodhpur@gmail.com"]').isVisible();
  const mobileInstaVisible = await mobilePage.locator('footer a[href="https://www.instagram.com/kamakshitradersjodhpur/"]').isVisible();
  console.log('Mobile footer Email visible:', mobileEmailVisible, '| Instagram visible:', mobileInstaVisible);
  if (!mobileEmailVisible || !mobileInstaVisible) {
    throw new Error('Email or Instagram link not visible in mobile footer');
  }

  results.tests.push({ name: 'Mobile Viewport & Drawer Navigation (WhatsApp, Email & Instagram Ready)', status: 'PASS' });

  // ==========================================
  // 10. Test Tablet Viewport (768x1024)
  // ==========================================
  console.log('\n--- 10. Testing Tablet Viewport (768x1024) ---');
  const tabletPage = await browser.newPage({ viewport: { width: 768, height: 1024 } });
  await tabletPage.goto(BASE_URL, { waitUntil: 'networkidle' });
  await tabletPage.waitForTimeout(1000);
  await tabletPage.screenshot({ path: path.join(screenshotsDir, 'tablet-full.png'), fullPage: true });
  console.log('Captured tablet full page screenshot.');
  results.tests.push({ name: 'Tablet Viewport Layout', status: 'PASS' });

  // ==========================================
  // 11. Technical SEO, Metadata, & Schema.org Structured Data
  // ==========================================
  console.log('\n--- 11. Testing Technical SEO, Metadata & Schema.org ---');
  // Title & Description
  const pageTitle = await page.title();
  console.log('Page Title:', pageTitle);
  if (!pageTitle.includes('Kamakshi Traders') || !pageTitle.includes('Jodhpur, Rajasthan')) {
    throw new Error(`Page title does not target local high-intent query: "${pageTitle}"`);
  }

  const metaDesc = await page.locator('meta[name="description"]').getAttribute('content');
  console.log('Meta Description:', metaDesc);
  if (!metaDesc || !metaDesc.includes('Kamakshi Traders') || !metaDesc.includes('Jodhpur, Rajasthan')) {
    throw new Error(`Meta description is missing required brand or location details: "${metaDesc}"`);
  }

  // Canonical tag
  const canonicalHref = await page.locator('link[rel="canonical"]').getAttribute('href');
  console.log('Canonical URL:', canonicalHref);
  if (!canonicalHref || !canonicalHref.startsWith('https://')) {
    throw new Error(`Invalid canonical URL: "${canonicalHref}"`);
  }

  // Robots meta
  const robotsMeta = await page.locator('meta[name="robots"]').getAttribute('content');
  console.log('Robots Meta:', robotsMeta);
  if (!robotsMeta || !robotsMeta.includes('index') || !robotsMeta.includes('follow')) {
    throw new Error(`Robots meta must allow indexing: "${robotsMeta}"`);
  }

  // Schema.org JSON-LD
  const schemaScript = await page.locator('script[type="application/ld+json"]').innerText();
  const parsedSchema = JSON.parse(schemaScript);
  console.log('Schema parsed successfully. Entity graph count:', parsedSchema['@graph']?.length);
  if (!parsedSchema['@graph'] || parsedSchema['@graph'].length < 4) {
    throw new Error('Schema.org graph must contain at least LocalBusiness, WebSite, VideoObject, and FAQPage');
  }

  const businessEntity = parsedSchema['@graph'].find(e => e['@type'] === 'SolarEnergyCompany' || e['@type'] === 'LocalBusiness');
  if (!businessEntity || businessEntity.telephone !== '+91-70144-93079' || businessEntity.address?.addressLocality !== 'Jodhpur') {
    throw new Error('Schema.org LocalBusiness entity is missing verified telephone or Jodhpur address');
  }

  const faqEntity = parsedSchema['@graph'].find(e => e['@type'] === 'FAQPage');
  if (!faqEntity || faqEntity.mainEntity?.length !== 8) {
    throw new Error(`Schema.org FAQPage must contain exactly 8 question entities, found: ${faqEntity?.mainEntity?.length}`);
  }

  const videoEntity = parsedSchema['@graph'].find(e => e['@type'] === 'VideoObject');
  if (!videoEntity || !videoEntity.thumbnailUrl || !videoEntity.contentUrl) {
    throw new Error('Schema.org VideoObject entity is missing required properties');
  }

  results.tests.push({ name: 'Technical SEO, High-Intent Local Metadata & Schema.org JSON-LD Graph', status: 'PASS' });

  // ==========================================
  // 12. Static Discovery Files (robots.txt, sitemap.xml, llms.txt)
  // ==========================================
  console.log('\n--- 12. Testing Static Discovery Files ---');
  // robots.txt
  const robotsRes = await page.request.get(`${BASE_URL}robots.txt`);
  const robotsText = await robotsRes.text();
  console.log('robots.txt status:', robotsRes.status(), '| bytes:', robotsText.length);
  if (robotsRes.status() !== 200 || !robotsText.includes('Googlebot') || !robotsText.includes('OAI-SearchBot') || !robotsText.includes('sitemap.xml')) {
    throw new Error('robots.txt does not return 200 or is missing required crawlers/sitemap reference');
  }

  // sitemap.xml
  const sitemapRes = await page.request.get(`${BASE_URL}sitemap.xml`);
  const sitemapXml = await sitemapRes.text();
  console.log('sitemap.xml status:', sitemapRes.status(), '| bytes:', sitemapXml.length);
  if (sitemapRes.status() !== 200 || !sitemapXml.includes('<urlset') || !sitemapXml.includes('image:image') || !sitemapXml.includes('video:video')) {
    throw new Error('sitemap.xml does not return 200 or is missing urlset/images/video extensions');
  }

  // llms.txt
  const llmsRes = await page.request.get(`${BASE_URL}llms.txt`);
  const llmsText = await llmsRes.text();
  console.log('llms.txt status:', llmsRes.status(), '| bytes:', llmsText.length);
  if (llmsRes.status() !== 200 || !llmsText.includes('Kamakshi Traders') || !llmsText.includes('Jodhpur') || !llmsText.includes('70144 93079')) {
    throw new Error('llms.txt does not return 200 or is missing essential business summary');
  }

  results.tests.push({ name: 'Static Discovery Files (robots.txt, sitemap.xml, llms.txt) Available & Validated', status: 'PASS' });

  await browser.close();

  console.log('\n================ AUDIT SUMMARY ================');
  console.log('Total Tests Executed:', results.tests.length);
  results.tests.forEach((t) => console.log(`✓ [${t.status}] ${t.name}`));
  console.log('Console Errors Detected:', results.consoleErrors.length);
  if (results.consoleErrors.length > 0) {
    results.consoleErrors.forEach((err) => console.error('  - Error:', err));
  }
  console.log('Failed Asset Requests:', results.failedRequests.length);
  if (results.failedRequests.length > 0) {
    results.failedRequests.forEach((req) => console.error('  - Failed:', req));
  }
  console.log('================================================');

  if (results.consoleErrors.length > 0 || results.failedRequests.length > 0) {
    process.exit(1);
  }
}

runAudit().catch((err) => {
  console.error('AUDIT RUNTIME FAILURE:', err);
  process.exit(1);
});

