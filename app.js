(function () {
  'use strict';

  const MOBILE_NAV_MQ = 900;
  const LS_USER = '808chat.user';
  const LS_LIKES = '808chat.likes';
  const LS_POSTS = '808chat.localPosts';

  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');

  const COLORS = ['#0b3d4a', '#d45d6c', '#1a6b78', '#2c1810', '#b84a58', '#3d7a86'];

  const PACKAGES = [
    {
      id: 'pkg3',
      days: 3,
      name: 'Oahu Long Weekend',
      oneliner: 'Waikiki dawn, Lanikai lookout, plate lunch, one unhurried snorkel.',
      islands: 'Oahu',
      vibe: 'First light on the water. No itinerary panic. You already know you will come back.',
      hotel: 'Waikiki oceanfront, mid-century lanai rooms — not a tower lobby, not a chain name.',
      airfare: 'SFO / LAX / SEA round trip, dummy fare, not bookable yet.',
      excursions: [
        'Waikiki dawn walk before the sidewalk wakes up',
        'Lanikai lookout (park with care; leave no trash)',
        'Plate lunch in a neighborhood kitchen, not a mall food court',
        'One south-shore snorkel in a protected pocket, if the ocean says yes'
      ]
    },
    {
      id: 'pkg5',
      days: 5,
      name: 'Oahu & the North Shore',
      oneliner: 'Trade-wind mornings, shrimp trucks, sunset sail, winter swell from the sand.',
      islands: 'Oahu',
      vibe: 'City-to-country in one island. Watch winter swell with respect — the water is not a toy.',
      hotel: 'Two nights Waikiki oceanfront, mid-century; then a North Shore garden-cottage class, ceiling fan, no tower.',
      airfare: 'SFO / LAX / SEA round trip, dummy fare, not bookable yet.',
      excursions: [
        'Kahuku shrimp trucks — eat outside, no rush',
        'Sunset sail off Waikiki (dummy slot, not live inventory)',
        'North Shore lookouts: Pipeline from the beach, not in the water in winter',
        'One protected-bay snorkel on a calm morning'
      ]
    },
    {
      id: 'pkg7',
      days: 7,
      name: 'Two-Island: Oahu + Maui',
      oneliner: 'Waikiki dawn, then Maui — Road to Hana as one full day, not rushed.',
      islands: 'Oahu + Maui',
      vibe: 'City-to-valley. One unhurried Hana day. Leaves on the road, not a checklist.',
      hotel: 'Waikiki oceanfront, mid-century lanai; then West Maui garden-lanai class facing the water, not a resort brand.',
      airfare: 'SFO / LAX / SEA round trip plus one dummy interisland hop, not bookable yet.',
      excursions: [
        'Waikiki dawn and a plate-lunch crawl',
        'Road to Hana — one full day, waterfalls from the pullouts, no speeding',
        'Haleakalā sunrise lookout (dummy; dress warm, leave no trace)',
        'One Maui snorkel in a sheltered cove, conditions permitting'
      ]
    },
    {
      id: 'pkg10',
      days: 10,
      name: 'Three-Island: Oahu, Maui, Big Island',
      oneliner: 'Volcano sunrise, night manta (dummy), Kona coffee morning, unhurried Hana.',
      islands: 'Oahu + Maui + Hawaiʻi (Big Island)',
      vibe: 'Lava mornings, trade-wind afternoons. Mālama ʻāina — stay on marked paths, take only photos.',
      hotel: 'Waikiki oceanfront, mid-century; Maui garden-lanai; volcano-side lodge class with a wood stove, not a chain name.',
      airfare: 'SFO / LAX / SEA round trip plus two dummy interisland hops, not bookable yet.',
      excursions: [
        'Volcano sunrise from a public lookout — dummy timing, not a guided live book',
        'Night manta (dummy — not bookable yet; ocean decides)',
        'Kona coffee farm morning, small mill, no tasting-room circus',
        'Road to Hana as one day, still not rushed'
      ]
    },
    {
      id: 'pkg14',
      days: 14,
      name: 'Grand Tour — add Kauaʻi',
      oneliner: 'Four islands, slow. Waimea Canyon and a Nāpali lookout — not a fake boat we cannot run.',
      islands: 'Oahu + Maui + Hawaiʻi + Kauaʻi',
      vibe: 'The long inhale. Quiet lookouts. Mālama ʻāina on every island — pack out what you pack in.',
      hotel: 'Mix of Waikiki oceanfront mid-century, Maui garden-lanai, volcano-side lodge, and a Kauaʻi river-valley cottage class.',
      airfare: 'SFO / LAX / SEA round trip plus dummy interisland hops, not bookable yet.',
      excursions: [
        'Waimea Canyon lookout — red earth, no drone circus',
        'Nāpali coastal lookout from land (not a dummy boat we cannot operate)',
        'Volcano sunrise and a Paliku-side quiet walk on marked trail',
        'One Hana day and one Lanikai dawn, still unhurried'
      ]
    }
  ];

  const PLACES = [
    { tag: 'Oahu', title: 'Lanikai', snippet: 'Dawn lookout, kayak calm if the ocean says yes. Park with care.' },
    { tag: 'Oahu', title: 'North Shore', snippet: 'Winter swell from the sand. Shrimp trucks. Respect the water.' },
    { tag: 'Oahu', title: 'Waikiki', snippet: 'Dawn walk before the sidewalk. Mid-century lanai energy, not tacky neon.' },
    { tag: 'Maui', title: 'Road to Hana', snippet: 'One full day. Waterfalls from the pullouts. Not a race.' },
    { tag: 'Maui', title: 'Molokini', snippet: 'Snorkel chatter only — dummy, conditions and permits decide.' },
    { tag: 'Hawaiʻi', title: 'Volcano', snippet: 'Sunrise from a public lookout. Stay on marked paths. Mālama ʻāina.' },
    { tag: 'Hawaiʻi', title: 'Waipiʻo', snippet: 'Valley lookout. Do not drive down unless you know the road.' },
    { tag: 'Kauaʻi', title: 'Waimea Canyon', snippet: 'Red earth lookout. Nāpali from land, not a fake boat.' }
  ];

  const TOPICS = [
    { tag: 'Food', title: 'Plate lunch', snippet: 'Two scoop rice, mac salad, something that tastes like home.' },
    { tag: 'Food', title: 'Poke', snippet: 'Neighborhood counter, not a mall kiosk. Ask what came in today.' },
    { tag: 'Food', title: 'Shave ice', snippet: 'Ice so fine it disappears. Li hing on the side if you want it.' },
    { tag: 'Ocean', title: 'Trade winds', snippet: 'The islands breathing. Palms lean. Laundry dries by noon.' },
    { tag: 'Ocean', title: 'Winter swell', snippet: 'North Shore watching, not entering. Dummy swell talk only.' },
    { tag: 'Culture', title: 'Hula', snippet: 'Morning practice, not a stage show. Listen first.' },
    { tag: 'Culture', title: 'Aloha Friday', snippet: 'Light shirts, slower emails, still showing up for each other.' },
    { tag: 'Land', title: 'Kona coffee', snippet: 'Small mill mornings. Slope, rain, and patience.' }
  ];

  const SEED = [
    { id: 'p1', name: 'Trade Wind', handle: 'tradwind', text: 'Trade winds came in just after breakfast. Palms leaning toward Kauaʻi, laundry dry by noon. This is the 808 breathing. Dummy weather — not a forecast.', hours: 1, likes: 312, replies: 41, followed: true, snippet: { handle: 'alohafriday', text: 'Aloha Friday and the trades showed up on time.' } },
    { id: 'p2', name: 'Plate Lunch', handle: 'platelunch', text: 'Two scoop rice, mac salad, and the katsu that tastes like a Tuesday in Kalihi. Dummy plate. Not a reservation. Sit down. Eat slow.', hours: 2, likes: 428, replies: 67, followed: true },
    { id: 'p3', name: 'North Shore 808', handle: 'northshore808', text: 'Winter swell is standing up on the North Shore. Watch from the sand. Do not paddle out to prove a point. Dummy swell talk — not a buoy feed.', hours: 3, likes: 501, replies: 88, followed: true, snippet: { handle: 'tradwind', text: 'Trades are side-shore. Stay on the beach.' } },
    { id: 'p4', name: 'Kona AM', handle: 'konaam', text: 'Kona coffee at first light. Small mill, slope rain last night, the roast smells like a wood porch. Dummy farm morning. Not a tasting-room circus.', hours: 4, likes: 219, replies: 28, followed: true },
    { id: 'p5', name: 'Waimea Look', handle: 'waimeacanyon', text: 'Waimea Canyon went red-gold after the shower passed. Lookout only. No drone. Dummy Kauaʻi. Nāpali is a land lookout this week, not a fake boat.', hours: 5, likes: 276, replies: 33, followed: false },
    { id: 'p6', name: 'Paliku Quiet', handle: 'paliku', text: 'Paliku-side quiet. Marked trail, pack out what you pack in. Mālama ʻāina is not a slogan if you leave a wrapper. Dummy hike note.', hours: 6, likes: 164, replies: 19, followed: true },
    { id: 'p7', name: 'Poke Counter', handle: 'poke808', text: 'Poke from the neighborhood counter. Ask what came in today. Dummy bowl. Not a mall kiosk. Shoyu, limu, a little heat.', hours: 7, likes: 355, replies: 52, followed: true, snippet: { handle: 'platelunch', text: 'Poke first, plate lunch after. That is the order.' } },
    { id: 'p8', name: 'Hula Morning', handle: 'hulamorning', text: 'Hula practice in the park before the heat. Listen first. Dummy culture post — not a ticketed show, not a luau flyer.', hours: 8, likes: 198, replies: 24, followed: true },
    { id: 'p9', name: 'Volcano Dawn', handle: 'volcanodawn', text: 'Volcano sunrise from a public lookout. Steam, cold hands, stay on the path. Dummy timing. Not a guided live book. The mountain does not owe us a show.', hours: 9, likes: 441, replies: 61, followed: true },
    { id: 'p10', name: 'Molokini Note', handle: 'molokinisnork', text: 'Snorkeling Molokini is a conditions conversation, not a guarantee. Dummy excursion. Ocean decides. If it is a no, the south shore still has pockets.', hours: 11, likes: 187, replies: 22, followed: false },
    { id: 'p11', name: 'Shave Ice 808', handle: 'shaveice808', text: 'Shave ice so fine it disappears. Li hing on the side. Dummy stand. Not a brand. Sit in the shade and let the afternoon do its job.', hours: 13, likes: 263, replies: 31, followed: true },
    { id: 'p12', name: 'Aloha Friday', handle: 'alohafriday', text: 'Aloha Friday. Light shirts, slower emails, still showing up for each other. Dummy calendar. The islands do not close; they just exhale.', hours: 15, likes: 329, replies: 44, followed: true },
    { id: 'p13', name: 'Lanikai Dawn', handle: 'lanikaidawn', text: 'Lanikai at dawn. Two little islands sitting in the blue like they were always going to. Park with care. Dummy lookout — not a drone pad.', hours: 16, likes: 388, replies: 49, followed: true, snippet: { handle: 'tradwind', text: 'Trades were kind this morning. Water looked like glass for ten minutes.' } },
    { id: 'p14', name: 'Hana Highway', handle: 'hanahighway', text: 'Road to Hana is one day, not a race. Waterfalls from the pullouts. Let the car behind you pass. Dummy Maui. Leaves on the road on purpose.', hours: 18, likes: 412, replies: 57, followed: false },
    { id: 'p15', name: 'Waipiʻo Look', handle: 'waipiovalley', text: 'Waipiʻo from the lookout. Do not drive down unless you know the road and the rain. Dummy valley. The taro patches are not a backdrop.', hours: 20, likes: 151, replies: 17, followed: true },
    { id: 'p16', name: 'Ukulele PM', handle: 'ukulelepm', text: 'Someone on the lanai playing slow. Trade winds carrying it two houses down. Dummy evening. Wonderful, not tacky. This is the 808.', hours: 22, likes: 94, replies: 11, followed: false },
    { id: 'p17', name: 'Mālama Note', handle: 'malamaaina', text: 'Mālama ʻāina is the small stuff: reef-safe if you go in, stay on the trail, do not stack rocks for a photo. Dummy reminder. The islands are not a set.', hours: 24, likes: 277, replies: 38, followed: true },
    { id: 'p18', name: 'Kaimuki Table', handle: 'kaimukitable', text: 'Plate lunch in Kaimuki, extra gravy, no photos of other people\'s kids. Dummy neighborhood. Eat like you live here for an hour.', hours: 26, likes: 133, replies: 16, followed: true, snippet: { handle: 'platelunch', text: 'Kaimuki still does it right. Two scoop. Sit down.' } },
    { id: 'p19', name: 'Dawn Patrol 808', handle: 'dawnpatrol808', text: 'Waikiki dawn before the sidewalk wakes up. Joggers, a fisherman, the ocean doing the same thing it did yesterday. Dummy morning. Come back.', hours: 28, likes: 208, replies: 27, followed: false },
    { id: 'p20', name: 'Coffee Slope', handle: 'coffeeslope', text: 'Above Kona the clouds snag on the slope and the coffee trees look like they are listening. Dummy farm. Not a plantation brand. Patience in a cup.', hours: 30, likes: 121, replies: 14, followed: true }
  ];

  const NOTIFS = [
    { id: 'n1', text: '@platelunch liked your take on the Kaimuki two-scoop.', time: '1h', unread: true },
    { id: 'n2', text: '@northshore808 mentioned you in a winter swell watch.', time: '3h', unread: true },
    { id: 'n3', text: '@lanikaidawn started following you. Dummy follow.', time: 'Yesterday', unread: true }
  ];

  const THREADS = [
    { id: 't1', name: 'Plate Lunch', handle: 'platelunch', preview: 'Kaimuki or Kalihi for the katsu?', messages: [
      { me: false, text: 'Kaimuki or Kalihi for the katsu?' },
      { me: true, text: 'Kaimuki today. Sit down. Dummy plate, still the right call.' }
    ]},
    { id: 't2', name: 'Trade Wind', handle: 'tradwind', preview: 'Trades are in. Lanai laundry is done.', messages: [
      { me: false, text: 'Trades are in. Lanai laundry is done.' },
      { me: true, text: 'Palms leaning. Dummy weather. This is the 808 breathing.' }
    ]}
  ];

  function initials(name) {
    return name.split(/\s+/).map(function (w) { return w[0]; }).join('').slice(0, 2).toUpperCase();
  }
  function colorFor(handle) {
    let n = 0;
    for (let i = 0; i < handle.length; i++) n = (n + handle.charCodeAt(i) * (i + 1)) % COLORS.length;
    return COLORS[n];
  }
  function loadJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  }
  function saveJSON(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* private mode */ }
  }

  let currentUser = loadJSON(LS_USER, null);
  let likes = loadJSON(LS_LIKES, {});
  let extraPosts = loadJSON(LS_POSTS, []);
  let currentTab = 'foryou';
  let activeThread = null;

  function allPosts() {
    return extraPosts.concat(SEED);
  }

  function isMobileNav() { return window.innerWidth <= MOBILE_NAV_MQ; }
  function closeMobileNav() {
    document.body.classList.remove('nav-open');
    syncHamburgerAria();
  }
  function syncHamburgerAria() {
    if (!hamburger) return;
    const open = isMobileNav()
      ? document.body.classList.contains('nav-open')
      : !document.body.classList.contains('nav-collapsed');
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    hamburger.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  }

  function highlightSocial(name) {
    document.querySelectorAll('.nav-social-link').forEach(function (l) { l.classList.remove('active'); });
    const el = document.querySelector('[data-social="' + name + '"]');
    if (el) el.classList.add('active');
  }

  function closeSocialOverlays() {
    ['explore-overlay', 'notif-overlay', 'chat-overlay', 'profile-overlay'].forEach(function (id) {
      const el = document.getElementById(id);
      if (el) el.classList.remove('active', 'thread-open');
    });
  }

  function showContentPage(id) {
    document.querySelectorAll('.page').forEach(function (p) { p.classList.remove('active'); });
    const page = document.getElementById('page-' + id);
    if (page) page.classList.add('active');
    window.scrollTo(0, 0);
  }

  function normalizeRoute(route) {
    let id = String(route || '').replace(/^#/, '').trim();
    if (!id) id = 'home';
    try { id = decodeURIComponent(id); } catch (e) { /* keep */ }
    return id;
  }
  function routeFromHash() { return normalizeRoute(window.location.hash); }
  function go(route) {
    const id = normalizeRoute(route);
    const hash = '#' + id;
    if (location.hash === hash) { applyRoute(); return; }
    location.hash = hash;
  }

  function selectThoughtsTab(tab) {
    currentTab = tab;
    document.querySelectorAll('[data-thoughts-tab]').forEach(function (t) {
      t.classList.toggle('active', t.dataset.thoughtsTab === tab);
    });
    renderFeed();
  }

  function applyRoute() {
    closeMobileNav();
    const raw = routeFromHash();

    if (raw === 'following') {
      closeSocialOverlays();
      showContentPage('thoughts');
      highlightSocial('following');
      selectThoughtsTab('following');
      return;
    }
    if (raw === 'hot' || raw === 'new') {
      closeSocialOverlays();
      showContentPage('thoughts');
      highlightSocial('home');
      selectThoughtsTab(raw);
      return;
    }
    if (raw === 'home' || raw === 'feed' || raw === 'thoughts') {
      closeSocialOverlays();
      showContentPage('thoughts');
      highlightSocial('home');
      selectThoughtsTab('foryou');
      return;
    }
    if (raw === 'chat') { openChat(); return; }
    if (raw === 'notifications') { openNotif(); return; }
    if (raw === 'explore') { openExplore(); return; }
    if (raw === 'profile') { openProfile(); return; }
    if (raw === 'packages' || raw === 'news' || raw.indexOf('pkg') === 0) {
      closeSocialOverlays();
      showContentPage('packages');
      highlightSocial('packages');
      if (raw.indexOf('pkg') === 0) {
        setTimeout(function () {
          const card = document.getElementById(raw);
          if (card) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 40);
      }
      return;
    }
    closeSocialOverlays();
    showContentPage('thoughts');
    highlightSocial('home');
  }

  function renderPost(post) {
    const liked = !!likes[post.id];
    const likeCount = post.likes + (liked ? 1 : 0);
    const av = initials(post.name);
    const bg = colorFor(post.handle);
    return (
      '<article class="post" data-post-id="' + post.id + '">' +
        '<div class="post-avatar" style="background:' + bg + '">' + av + '</div>' +
        '<div class="post-body">' +
          '<div class="post-meta">' +
            '<span class="post-name">' + escapeHtml(post.name) + '</span>' +
            '<span class="post-handle">@' + escapeHtml(post.handle) + '</span>' +
            '<span class="post-time">· ' + (post.hours != null ? post.hours + 'h' : 'now') + '</span>' +
          '</div>' +
          '<p class="post-text">' + escapeHtml(post.text) + '</p>' +
          (post.snippet
            ? '<div class="post-snippet"><span class="post-snippet-handle">@' + escapeHtml(post.snippet.handle) + '</span>' + escapeHtml(post.snippet.text) + '</div>'
            : '') +
          '<div class="post-actions">' +
            '<button class="post-action" data-act="reply" type="button">Reply · ' + (post.replies || 0) + '</button>' +
            '<button class="post-action' + (liked ? ' liked' : '') + '" data-act="like" type="button">Like · ' + likeCount + '</button>' +
            '<button class="post-action" data-act="share" type="button">Share</button>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  function sliceFeed(posts, tab) {
    var list = posts.slice();
    if (tab === 'following') {
      return list.filter(function (p) {
        return p.followed || (currentUser && p.handle === currentUser.handle);
      });
    }
    if (tab === 'hot') {
      return list.sort(function (a, b) {
        return (b.likes + (likes[b.id] ? 1 : 0)) - (a.likes + (likes[a.id] ? 1 : 0));
      });
    }
    if (tab === 'new') {
      return list.sort(function (a, b) { return (a.hours || 0) - (b.hours || 0); });
    }
    return list.sort(function (a, b) {
      var sa = (a.replies || 0) * 4 - (a.hours || 0);
      var sb = (b.replies || 0) * 4 - (b.hours || 0);
      return sb - sa;
    });
  }

  function renderFeed() {
    const el = document.getElementById('thoughts-feed');
    if (!el) return;
    var posts = sliceFeed(allPosts(), currentTab);
    if (!posts.length) {
      el.innerHTML = '<div class="post-empty">No posts in this ranking yet. Following / Hot / New are different slices of the same Hawaii feed — dress rehearsal only.</div>';
      return;
    }
    el.innerHTML = posts.map(renderPost).join('');
  }

  function renderPackages() {
    const catalog = document.getElementById('packages-catalog');
    const strip = document.getElementById('pkg-strip-row');
    const rail = document.getElementById('news-feed');
    if (catalog) {
      catalog.innerHTML = PACKAGES.map(function (p) {
        return '<article class="pkg-card" id="' + p.id + '">' +
          '<div class="pkg-card-top">' +
            '<div class="pkg-card-days">' + p.days + ' days</div>' +
            '<div class="pkg-card-islands">' + escapeHtml(p.islands) + '</div>' +
          '</div>' +
          '<h2>' + escapeHtml(p.name) + '</h2>' +
          '<p class="pkg-card-oneliner">' + escapeHtml(p.oneliner) + '</p>' +
          '<div class="pkg-card-grid">' +
            '<div class="pkg-card-block"><h3>Vibe</h3><p>' + escapeHtml(p.vibe) + '</p></div>' +
            '<div class="pkg-card-block"><h3>Hotel class</h3><p>' + escapeHtml(p.hotel) + '</p></div>' +
            '<div class="pkg-card-block"><h3>Airfare</h3><p>' + escapeHtml(p.airfare) + '</p></div>' +
          '</div>' +
          '<div class="pkg-card-block"><h3>Excursions</h3>' +
            '<ul class="pkg-excursions">' + p.excursions.map(function (x) {
              return '<li>' + escapeHtml(x) + '</li>';
            }).join('') + '</ul></div>' +
          '<div class="pkg-card-foot">' +
            '<span class="pkg-card-note">Dummy packages. Hotels and airfare not bookable yet.</span>' +
            '<button class="pkg-inquire" type="button" data-inquire="' + p.id + '">Inquire (dummy)</button>' +
          '</div>' +
        '</article>';
      }).join('');
    }
    if (strip) {
      strip.innerHTML = PACKAGES.map(function (p) {
        return '<a class="pkg-chip" href="#' + p.id + '">' +
          '<div class="pkg-chip-days">' + p.days + ' days</div>' +
          '<div class="pkg-chip-name">' + escapeHtml(p.name) + '</div>' +
          '<div class="pkg-chip-line">' + escapeHtml(p.oneliner) + '</div>' +
        '</a>';
      }).join('');
    }
    if (rail) {
      rail.innerHTML = PACKAGES.map(function (p) {
        return '<a class="news-item" href="#' + p.id + '">' +
          '<div class="news-item-tag">' + p.days + ' days</div>' +
          '<div class="news-item-headline">' + escapeHtml(p.name) + '</div>' +
          '<div class="news-item-snippet">' + escapeHtml(p.oneliner) + '</div>' +
          '<div class="news-item-meta">' + escapeHtml(p.islands) + ' · dummy, not bookable</div>' +
        '</a>';
      }).join('');
    }
  }

  function renderExplore() {
    function cards(list) {
      return list.map(function (c) {
        return '<article class="explore-card">' +
          '<div class="explore-card-tag">' + escapeHtml(c.tag) + '</div>' +
          '<div class="explore-card-title">' + escapeHtml(c.title) + '</div>' +
          '<div class="explore-card-snippet">' + escapeHtml(c.snippet) + '</div>' +
        '</article>';
      }).join('');
    }
    document.getElementById('explore-pane-places').innerHTML = cards(PLACES);
    document.getElementById('explore-pane-topics').innerHTML = cards(TOPICS);
  }

  function renderNotifs() {
    const el = document.getElementById('notif-list');
    if (!el) return;
    el.innerHTML = NOTIFS.map(function (n) {
      return '<div class="notif-item' + (n.unread ? ' unread' : '') + '" data-nid="' + n.id + '">' +
        '<div><p>' + escapeHtml(n.text) + '</p><time>' + n.time + '</time></div></div>';
    }).join('');
    const unread = NOTIFS.filter(function (n) { return n.unread; }).length;
    const badge = document.getElementById('notif-badge');
    if (badge) {
      badge.textContent = String(unread);
      badge.classList.toggle('visible', unread > 0);
    }
  }

  function renderThreads() {
    const el = document.getElementById('chat-thread-list');
    if (!el) return;
    el.innerHTML = THREADS.map(function (t) {
      return '<div class="chat-thread-item" data-tid="' + t.id + '">' +
        '<div class="post-avatar" style="background:' + colorFor(t.handle) + '">' + initials(t.name) + '</div>' +
        '<div><div class="thread-name">' + escapeHtml(t.name) + '</div>' +
        '<div class="thread-preview">' + escapeHtml(t.preview) + '</div></div></div>';
    }).join('');
  }

  function openThread(id) {
    const t = THREADS.find(function (x) { return x.id === id; });
    if (!t) return;
    activeThread = t;
    document.getElementById('chat-placeholder').hidden = true;
    const view = document.getElementById('chat-thread-view');
    view.hidden = false;
    document.getElementById('chat-active-name').textContent = t.name;
    document.getElementById('chat-messages').innerHTML = t.messages.map(function (m) {
      return '<div class="chat-bubble ' + (m.me ? 'me' : 'them') + '">' + escapeHtml(m.text) + '</div>';
    }).join('');
    document.getElementById('chat-overlay').classList.add('thread-open');
  }

  function openChat() {
    closeSocialOverlays();
    document.getElementById('chat-overlay').classList.add('active');
    highlightSocial('chat');
  }
  function openNotif() {
    closeSocialOverlays();
    document.getElementById('notif-overlay').classList.add('active');
    highlightSocial('notifications');
  }
  function openExplore() {
    closeSocialOverlays();
    document.getElementById('explore-overlay').classList.add('active');
    highlightSocial('explore');
  }
  function openProfile() {
    closeSocialOverlays();
    document.getElementById('profile-overlay').classList.add('active');
    highlightSocial('profile');
    syncProfile();
  }

  function syncProfile() {
    const prompt = document.getElementById('profile-signin-prompt');
    const content = document.getElementById('profile-content');
    if (!currentUser) {
      prompt.hidden = false;
      content.hidden = true;
      document.getElementById('profile-topbar-name').textContent = 'Profile';
      return;
    }
    prompt.hidden = true;
    content.hidden = false;
    document.getElementById('profile-topbar-name').textContent = currentUser.name;
    document.getElementById('profile-display-name').textContent = currentUser.name;
    document.getElementById('profile-handle').textContent = '@' + currentUser.handle;
    document.getElementById('profile-avatar').textContent = initials(currentUser.name);
    document.getElementById('profile-bio').textContent = currentUser.bio || 'All things Hawaii.';
    const mine = allPosts().filter(function (p) { return p.handle === currentUser.handle; });
    const pane = document.getElementById('profile-pane-posts');
    if (!mine.length) {
      pane.innerHTML = '<div class="empty-note" id="profile-posts-empty">No posts yet. Hit Post when the trade winds pick up.</div>';
    } else {
      pane.innerHTML = mine.map(renderPost).join('');
    }
  }

  function renderSidebarAuth() {
    const el = document.getElementById('sidebar-auth');
    const av = document.getElementById('thoughts-compose-avatar');
    if (currentUser) {
      el.innerHTML =
        '<div class="sidebar-auth-user">' +
          '<div class="sidebar-auth-avatar">' + initials(currentUser.name) + '</div>' +
          '<div class="sidebar-auth-name">@' + escapeHtml(currentUser.handle) + '</div>' +
        '</div>' +
        '<button class="sidebar-auth-btn" id="auth-signout" type="button">Sign out</button>';
      av.textContent = initials(currentUser.name);
      av.style.background = colorFor(currentUser.handle);
    } else {
      el.innerHTML = '<button class="sidebar-auth-btn primary" id="auth-signin" type="button">Sign in</button>';
      av.textContent = '808';
      av.style.background = '';
    }
  }

  function openAuth(tab) {
    const ov = document.getElementById('cv-auth-overlay');
    ov.classList.add('open');
    document.querySelectorAll('.conv-modal-tab').forEach(function (t) {
      t.classList.toggle('active', t.dataset.tab === tab);
    });
    document.getElementById('cv-panel-login').style.display = tab === 'login' ? '' : 'none';
    document.getElementById('cv-panel-register').style.display = tab === 'register' ? '' : 'none';
    const closeBtn = document.getElementById('cv-modal-close');
    if (closeBtn) closeBtn.focus();
  }
  function closeAuth() {
    document.getElementById('cv-auth-overlay').classList.remove('open');
  }
  function stubSignIn(name, handle) {
    currentUser = {
      name: name || 'Guest',
      handle: (handle || 'guest808').replace(/^@/, '').toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 15) || 'guest808',
      bio: 'All things Hawaii.'
    };
    saveJSON(LS_USER, currentUser);
    closeAuth();
    renderSidebarAuth();
    syncProfile();
  }
  function signOut() {
    currentUser = null;
    saveJSON(LS_USER, null);
    renderSidebarAuth();
    syncProfile();
  }

  function maybePost() {
    const input = document.getElementById('thoughts-compose-input');
    const text = (input.value || '').trim();
    if (!text) return;
    if (!currentUser) { openAuth('login'); return; }
    extraPosts.unshift({
      id: 'local-' + Date.now(),
      name: currentUser.name,
      handle: currentUser.handle,
      text: text.slice(0, 280),
      hours: 0,
      likes: 0,
      replies: 0,
      followed: true
    });
    saveJSON(LS_POSTS, extraPosts);
    input.value = '';
    document.getElementById('thoughts-post-btn').disabled = true;
    renderFeed();
    syncProfile();
  }

  /* ── Events ─────────────────────────────────────── */
  document.addEventListener('click', function (e) {
    const social = e.target.closest('[data-social]');
    if (social) {
      e.preventDefault();
      go(social.dataset.social);
      return;
    }
    if (e.target.closest('#auth-signin') || e.target.closest('#profile-signin-prompt-btn')) {
      openAuth('login');
      return;
    }
    if (e.target.closest('#auth-signout')) { signOut(); return; }

    const inquire = e.target.closest('[data-inquire]');
    if (inquire) {
      const err = 'Dummy packages. Hotels and airfare not bookable yet.';
      inquire.textContent = err;
      inquire.disabled = true;
      return;
    }

    const tab = e.target.closest('[data-thoughts-tab]');
    if (tab) {
      const t = tab.dataset.thoughtsTab;
      if (t === 'following') go('following');
      else if (t === 'hot') go('hot');
      else if (t === 'new') go('new');
      else go('home');
      return;
    }

    const likeBtn = e.target.closest('[data-act="like"]');
    if (likeBtn) {
      const post = likeBtn.closest('[data-post-id]');
      if (!post) return;
      const id = post.dataset.postId;
      likes[id] = !likes[id];
      if (!likes[id]) delete likes[id];
      saveJSON(LS_LIKES, likes);
      renderFeed();
      syncProfile();
      return;
    }
    if (e.target.closest('[data-act="reply"]') || e.target.closest('[data-act="share"]')) {
      if (!currentUser) openAuth('login');
      return;
    }

    const etab = e.target.closest('[data-explore-tab]');
    if (etab) {
      document.querySelectorAll('[data-explore-tab]').forEach(function (t) {
        t.classList.toggle('active', t === etab);
      });
      document.getElementById('explore-pane-places').classList.toggle('active', etab.dataset.exploreTab === 'places');
      document.getElementById('explore-pane-topics').classList.toggle('active', etab.dataset.exploreTab === 'topics');
      return;
    }

    const thread = e.target.closest('[data-tid]');
    if (thread) { openThread(thread.dataset.tid); return; }

    if (isMobileNav() && document.body.classList.contains('nav-open')
        && !sidebar.contains(e.target) && !hamburger.contains(e.target)) {
      closeMobileNav();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    const ov = document.getElementById('cv-auth-overlay');
    if (ov && ov.classList.contains('open')) { e.preventDefault(); closeAuth(); return; }
    if (isMobileNav() && document.body.classList.contains('nav-open')) closeMobileNav();
  });

  hamburger.addEventListener('click', function () {
    if (isMobileNav()) document.body.classList.toggle('nav-open');
    else document.body.classList.toggle('nav-collapsed');
    syncHamburgerAria();
  });
  window.addEventListener('resize', syncHamburgerAria);
  document.getElementById('nav-overlay').addEventListener('click', closeMobileNav);
  document.getElementById('right-panel-tab').addEventListener('click', function () {
    document.body.classList.toggle('right-collapsed');
  });
  document.getElementById('sidebar-search-btn').addEventListener('click', function () { go('explore'); });
  document.getElementById('sidebar-post-btn').addEventListener('click', function () {
    go('home');
    setTimeout(function () {
      const input = document.getElementById('thoughts-compose-input');
      if (input) { input.focus(); input.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    }, 120);
  });

  ['profile-back', 'notif-back', 'explore-back'].forEach(function (id) {
    document.getElementById(id).addEventListener('click', function () { go('home'); });
  });
  document.getElementById('notif-mark-read').addEventListener('click', function () {
    NOTIFS.forEach(function (n) { n.unread = false; });
    renderNotifs();
  });
  document.getElementById('chat-new-btn').addEventListener('click', function () {
    if (!currentUser) { openAuth('login'); return; }
    openThread('t1');
  });
  document.getElementById('chat-placeholder-new').addEventListener('click', function () {
    if (!currentUser) { openAuth('login'); return; }
    openThread('t1');
  });
  document.getElementById('chat-send-btn').addEventListener('click', function () {
    if (!currentUser) { openAuth('login'); return; }
    const input = document.getElementById('chat-compose-input');
    const text = (input.value || '').trim();
    if (!text || !activeThread) return;
    activeThread.messages.push({ me: true, text: text });
    input.value = '';
    openThread(activeThread.id);
  });
  document.getElementById('profile-edit-btn').addEventListener('click', function () {
    openAuth('register');
  });

  const compose = document.getElementById('thoughts-compose-input');
  const postBtn = document.getElementById('thoughts-post-btn');
  compose.addEventListener('input', function () {
    postBtn.disabled = !(compose.value || '').trim();
    compose.style.height = 'auto';
    compose.style.height = Math.min(compose.scrollHeight, 200) + 'px';
  });
  postBtn.addEventListener('click', maybePost);

  document.getElementById('cv-modal-close').addEventListener('click', function (e) {
    e.preventDefault();
    closeAuth();
  });
  document.getElementById('cv-auth-overlay').addEventListener('click', function (e) {
    if (e.target.id === 'cv-auth-overlay') closeAuth();
  });
  document.querySelectorAll('.conv-modal-tab').forEach(function (t) {
    t.addEventListener('click', function () { openAuth(t.dataset.tab); });
  });
  function stubSubmit(errId) {
    const err = document.getElementById(errId);
    err.textContent = 'Dress rehearsal — no live auth. Continuing as guest.';
    err.classList.add('show');
    setTimeout(function () { stubSignIn('Guest', 'guest808'); }, 500);
  }
  document.getElementById('cv-login-btn').addEventListener('click', function () { stubSubmit('cv-login-err'); });
  document.getElementById('cv-reg-btn').addEventListener('click', function () {
    const name = (document.getElementById('cv-reg-name').value || '').trim() || 'Guest';
    const err = document.getElementById('cv-reg-err');
    err.textContent = 'Dress rehearsal — no live auth. Local guest only.';
    err.classList.add('show');
    setTimeout(function () { stubSignIn(name, name.replace(/\s+/g, '').slice(0, 12)); }, 500);
  });
  document.getElementById('cv-google-login').addEventListener('click', function () { stubSignIn('Guest', 'guest808'); });

  const search = document.getElementById('explore-search-input');
  search.addEventListener('input', function () {
    const q = search.value.trim().toLowerCase();
    function filt(list) {
      if (!q) return list;
      return list.filter(function (c) {
        return (c.title + ' ' + c.snippet + ' ' + c.tag).toLowerCase().indexOf(q) !== -1;
      });
    }
    function cards(list) {
      if (!list.length) return '<p class="empty-note">Nothing in the 808 matched that.</p>';
      return list.map(function (c) {
        return '<article class="explore-card"><div class="explore-card-tag">' + escapeHtml(c.tag) +
          '</div><div class="explore-card-title">' + escapeHtml(c.title) +
          '</div><div class="explore-card-snippet">' + escapeHtml(c.snippet) + '</div></article>';
      }).join('');
    }
    document.getElementById('explore-pane-places').innerHTML = cards(filt(PLACES));
    document.getElementById('explore-pane-topics').innerHTML = cards(filt(TOPICS));
  });

  renderPackages();
  renderExplore();
  renderNotifs();
  renderThreads();
  renderSidebarAuth();
  renderFeed();

  window.addEventListener('hashchange', applyRoute);
  if (!location.hash || location.hash === '#') history.replaceState(null, '', '#home');
  applyRoute();
  syncHamburgerAria();
})();
