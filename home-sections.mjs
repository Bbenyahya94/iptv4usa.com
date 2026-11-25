const channels = [
  ['ABC','abc','National broadcast TV, news and entertainment.'],
  ['CBS','cbs','Broadcast series, news and sports.'],
  ['NBC','nbc','US broadcast entertainment, news and sports.'],
  ['FOX','fox','Broadcast programming and live sports.'],
  ['PBS','pbs','Public television and educational programs.'],
  ['ESPN','espn','Live sports coverage and analysis.'],
  ['CNN','cnn','National and international news.'],
  ['Fox News','fox-news','US news and opinion programming.'],
  ['TNT','tnt','Entertainment series and selected sports.'],
  ['USA Network','usa-network','Entertainment and event programming.'],
  ['HGTV','hgtv','Home design and renovation shows.'],
  ['Food Network','food-network','Cooking and food entertainment.'],
  ['Discovery','discovery','Documentaries and factual shows.'],
  ['Hallmark','hallmark','Movies and family entertainment.'],
  ['Univision','univision','Spanish-language news and entertainment.'],
  ['Telemundo','telemundo','Spanish-language shows, news and sports.']
];
const platforms = [
  ['Netflix','netflix','On-demand films, series and originals.'],
  ['Prime Video','prime-video','Amazon movies, series and live events.'],
  ['Disney+','disney-plus','Disney, Pixar, Marvel and more.'],
  ['Hulu','hulu','Series, films and original programming.'],
  ['HBO Max','hbo-max','Films, HBO series and originals.'],
  ['Peacock','peacock','NBCUniversal shows, movies and sports.'],
  ['Paramount+','paramount-plus','Paramount films, series and live content.'],
  ['Apple TV','apple-tv','Apple original movies and series.'],
  ['ESPN+','espn-plus','Sports streaming and on-demand events.'],
  ['YouTube TV','youtube-tv','Live TV streaming service.'],
  ['Sling TV','sling-tv','Flexible live TV streaming plans.'],
  ['Tubi','tubi','Free ad-supported films and shows.'],
  ['Pluto TV','pluto-tv','Free ad-supported live channels and films.'],
  ['The Roku Channel','roku-channel','Free movies, series and live channels.']
];
const cards = items => items.map(([name,slug,description]) => `<li class="media-brand"><img src="/assets/brands/${slug}.${['nbc','peacock'].includes(slug)?'jpg':'png'}" alt="" width="48" height="48" loading="lazy" decoding="async"><div><strong>${name}</strong><span>${description}</span></div></li>`).join('');

const slides = [
  { eyebrow:'IPTV subscriptions for the USA', heading:'Stream on your terms with <em>IPTV4USA.</em>', text:'Explore subscription terms, check your device and ask about a trial before you choose. Clear steps and helpful support make getting started easier.', primary:'Request a free trial', primaryHref:'/trial/', secondary:'Explore plans', secondaryHref:'/plans/' },
  { eyebrow:'Plans for your screens', heading:'Choose a plan that fits <em>your home.</em>', text:'Compare 1, 3, 6 and 12 month options. Select one to five connections and see the price before contacting support.', primary:'Compare prices', primaryHref:'/plans/', secondary:'Check your device', secondaryHref:'/devices/' },
  { eyebrow:'Start with confidence', heading:'Get setup help for <em>your device.</em>', text:'Tell support your TV, streaming stick or mobile device model. We can help you check the right player and request a free trial.', primary:'See device guide', primaryHref:'/devices/', secondary:'Ask support', secondaryHref:'/contact/' }
];

const sceneContent = `<div class="scene-montage"><span>LIVE FOOTBALL</span><span>MOVIES</span><span>SERIES</span></div>`;
const slider = `<section class="hero-slider" aria-label="IPTV4USA highlights"><div class="wrap">${slides.map((slide,i) => `<article class="hero-slide${i===0?' is-active':''}" data-slide="${i}" aria-hidden="${i===0?'false':'true'}"${i===0?'':' inert'}><div class="hero-copy"><p class="eyebrow"><span class="dot"></span> ${slide.eyebrow}</p>${i===0?`<h1>${slide.heading}</h1>`:`<h2>${slide.heading}</h2>`}<p class="lead">${slide.text}</p><div class="actions"><a class="button" href="${slide.primaryHref}">${slide.primary}</a><a class="button secondary" href="${slide.secondaryHref}">${slide.secondary}</a></div><div class="trust-row"><span>Flexible terms</span><span>Player guidance</span><span>Setup support</span></div></div><div class="slide-scene slide-scene-${i+1}" aria-hidden="true"><div class="scene-screen"><span class="scene-top">IPTV4USA <b>LIVE</b></span>${sceneContent}<span class="scene-lines"></span></div><span class="scene-glow"></span></div></article>`).join('')}<div class="slider-controls"><button type="button" class="slide-arrow" data-slide-prev aria-label="Previous slide">‹</button><div class="slide-dots" role="group" aria-label="Choose slide">${slides.map((_,i)=>`<button type="button" class="slide-dot${i===0?' is-active':''}" data-slide-to="${i}" aria-label="Slide ${i+1}" aria-current="${i===0?'true':'false'}"></button>`).join('')}</div><button type="button" class="slide-arrow" data-slide-next aria-label="Next slide">›</button></div></div></section>`;

const catalog = `<section class="section media-section" id="popular-channels"><div class="wrap"><div class="section-head"><p class="eyebrow">Worldwide entertainment</p><h2>Explore popular channels from around the world</h2><p>Enjoy a world of entertainment with familiar names in sports, news, movies and more. Browse the highlights below, then try the service on your favorite screen.</p></div><ul class="media-grid">${cards(channels)}</ul><div class="media-actions"><p>Ready to discover what is available for your device?</p><a class="button" href="/trial/">Get Free Trial</a></div></div></section><section class="section media-section media-section-alt" id="streaming-platforms"><div class="wrap"><div class="section-head"><p class="eyebrow">Movie and series platforms</p><h2>Streaming services familiar to US viewers</h2><p>These are popular places people watch films, shows and live TV. Their services require their own access and are not included with IPTV4USA plans.</p></div><ul class="media-grid">${cards(platforms)}</ul><div class="media-callout"><div><h3>Want to know what your plan includes?</h3><p>Request the current channel and on-demand catalog from support before ordering.</p></div><a class="button" href="/contact/">Ask about availability</a></div></div></section>`;

export function enhanceHome(home) {
  return home.replace(/^<section class="hero">.*?<\/section>/s, slider)
    .replace('<section class="section intro">', `${catalog}<section class="section intro">`);
}
