/**
 * Pre-build script to generate dynamic SEO meta tags
 * Fetches services from the PharmAdPro API and injects them into index.html
 * 
 * Run before build: node scripts/generate-seo.js
 */

const fs = require('fs');
const path = require('path');

// API URL - uses production PharmAdPro API
const API_URL = process.env.REACT_APP_API_URL || 'https://www.pharmadpro.co.uk/api';

// Pharmacy configuration
const PHARMACY_CONFIG = {
  name: "Tritton Road Pharmacy",
  alternateName: "Tritton Road Pharmacy Lincoln",
  phone: "+441522537145",
  phoneDisplay: "01522 537145",
  email: "trittonroadpharmacy@gmail.com",
  website: "https://trittonroadpharmacy.co.uk",
  address: {
    street: "U1 Morrisons Supermarket, Tritton Road",
    city: "Lincoln",
    region: "Lincolnshire",
    postcode: "LN6 7QL",
    country: "GB"
  },
  geo: {
    latitude: 53.2119,
    longitude: -0.5471
  },
  serviceRadius: 24140, // 15 miles in meters
  openingHours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" },
    { days: ["Saturday"], opens: "09:00", closes: "13:00" }
  ]
};

// Lincoln area keywords (15-mile radius) - ALL villages and towns
const LINCOLN_AREA_LOCATIONS = [
  // City Center & Immediate Areas
  'Lincoln', 'Lincoln city centre', 'Uphill Lincoln', 'Downhill Lincoln',
  
  // South of Lincoln (0-5 miles)
  'North Hykeham', 'South Hykeham', 'Waddington', 'Bracebridge Heath', 
  'Bracebridge', 'Canwick', 'Canwick Hill', 'South Common',
  
  // West of Lincoln (0-10 miles)
  'Skellingthorpe', 'Doddington', 'Whisby', 'Thorpe on the Hill',
  'Eagle', 'Eagle Moor', 'North Scarle', 'South Scarle', 'Swinderby',
  'Norton Disney', 'Stapleford', 'Beckingham',
  
  // North of Lincoln (0-10 miles)
  'Nettleham', 'Riseholme', 'Burton', 'Burton Waters', 'Saxilby',
  'Broadholme', 'Ingleby', 'Sturton by Stow', 'Stow',
  
  // East of Lincoln (0-10 miles)
  'Cherry Willingham', 'Reepham', 'Fiskerton', 'Washingborough',
  'Heighington', 'Branston', 'Branston Booths', 'Potterhanworth',
  'Nocton', 'Dunston', 'Metheringham',
  
  // Northeast (5-15 miles)
  'Welton', 'Dunholme', 'Scothern', 'Sudbrooke', 'Langworth',
  'Newball', 'Stainton by Langworth', 'Reasby', 'Rand',
  'Wragby', 'Apley', 'Kingthorpe',
  
  // Southeast (5-15 miles)
  'Bardney', 'Southrey', 'Tupholme', 'Bucknall', 'Horsington',
  'Stixwould', 'Woodhall Spa', 'Martin', 'Timberland',
  'Walcott', 'Billinghay', 'North Kyme', 'South Kyme',
  
  // South (5-15 miles)
  'Harmston', 'Coleby', 'Boothby Graffoe', 'Navenby', 'Wellingore',
  'Leadenham', 'Fulbeck', 'Caythorpe', 'Hough on the Hill',
  'Carlton Scroop', 'Normanton', 'Claypole',
  
  // Southwest (5-15 miles)
  'Aubourn', 'Haddington', 'Thurlby', 'Bassingham', 'Carlton-le-Moorland',
  'Brant Broughton', 'Stragglethorpe', 'Beckingham', 'Fenton',
  'Stubton', 'Dry Doddington', 'Westborough',
  
  // Northwest (5-15 miles)
  'Scampton', 'Aisthorpe', 'Cammeringham', 'Brattleby', 'Thorpe le Fallows',
  'Fillingham', 'Ingham', 'Coates', 'Glentworth',
  
  // Major towns within 15 miles
  'Market Rasen', 'Gainsborough', 'Newark-on-Trent', 'Sleaford',
  'Horncastle', 'Woodhall Spa'
];

// Generate location-based pharmacy keywords
const BASE_KEYWORDS = [
  // Core pharmacy keywords
  'pharmacy Lincoln',
  'NHS pharmacy Lincoln', 
  'pharmacy near me Lincoln',
  'pharmacy LN6',
  'pharmacy Lincolnshire',
  'Tritton Road pharmacy',
  'community pharmacy Lincoln',
  'Morrisons pharmacy Lincoln',
  'late night pharmacy Lincoln',
  'weekend pharmacy Lincoln',
  'Saturday pharmacy Lincoln',
  
  // Generate "pharmacy [location]" for all areas
  ...LINCOLN_AREA_LOCATIONS.map(loc => `pharmacy ${loc}`),
  
  // NHS specific
  'NHS pharmacy near me',
  'free NHS pharmacy Lincoln',
  'NHS services Lincoln pharmacy',
];

// Social media hashtags for posts
const SOCIAL_MEDIA_HASHTAGS = {
  general: [
    '#TrittonRoadPharmacy', '#LincolnPharmacy', '#NHSPharmacy',
    '#LincolnHealthcare', '#Lincolnshire', '#LincolnUK',
    '#CommunityPharmacy', '#YourLocalPharmacy', '#PharmacyFirst',
    '#NHSLincoln', '#HealthcareLincoln', '#LincolnHealth'
  ],
  services: {
    'flu': ['#FluJab', '#FluVaccine', '#WinterHealth', '#GetYourFluJab', '#ProtectYourself'],
    'pharmacy-first': ['#PharmacyFirst', '#NHSPharmacyFirst', '#NoGPNeeded', '#MinorIllness', '#FreeNHSService'],
    'prescription': ['#Prescriptions', '#RepeatPrescription', '#PrescriptionCollection', '#NHSPrescription'],
    'blood-pressure': ['#BloodPressure', '#BPCheck', '#HeartHealth', '#FreeHealthCheck', '#KnowYourNumbers'],
    'contraception': ['#Contraception', '#ReproductiveHealth', '#WomensHealth', '#FreeContraception'],
    'health-advice': ['#HealthAdvice', '#AskYourPharmacist', '#PharmacyAdvice', '#HealthTips'],
    'emergency': ['#EmergencyMedicine', '#UrgentPrescription', '#PharmacyHelp']
  },
  locations: [
    '#Lincoln', '#Lincolnshire', '#NorthHykeham', '#Waddington',
    '#BracebridgeHeath', '#Skellingthorpe', '#Nettleham', '#Saxilby',
    '#CherryWillingham', '#Washingborough', '#WoodhallSpa', '#LN6'
  ],
  seasonal: {
    winter: ['#WinterHealth', '#StayWellThisWinter', '#ColdAndFlu', '#WinterReady'],
    summer: ['#SummerHealth', '#HayFever', '#TravelHealth', '#SunSafety'],
    backToSchool: ['#BackToSchool', '#SchoolHealth', '#ChildrensHealth'],
    christmas: ['#ChristmasOpening', '#FestiveHealth', '#HolidayPharmacy']
  }
};

async function fetchServices() {
  try {
    const response = await fetch(`${API_URL}/pharmacy-admin/settings/public`);
    if (!response.ok) throw new Error('Failed to fetch services');
    const data = await response.json();
    return data.services || [];
  } catch (error) {
    console.log('Using default services (API not available)');
    return getDefaultServices();
  }
}

function getDefaultServices() {
  return [
    { id: "nhs-pharmacy-first", name: "NHS Pharmacy First", description: "Get treatment for 7 common conditions without a GP appointment. Free NHS service.", enabled: true },
    { id: "prescriptions", name: "Prescription Services", description: "Collect your NHS and private prescriptions. Free prescription collection service.", enabled: true },
    { id: "flu-vaccination", name: "Flu Vaccination", description: "Protect yourself this winter. Free for eligible NHS patients or available privately.", enabled: true },
    { id: "blood-pressure", name: "Blood Pressure Check", description: "Free NHS blood pressure check service. Walk in, no appointment required.", enabled: true },
    { id: "contraception", name: "NHS Contraception Service", description: "Free confidential contraception advice and supply. No appointment needed.", enabled: true },
    { id: "health-advice", name: "Health Advice", description: "Speak to our pharmacists for professional advice on minor ailments and medications.", enabled: true },
    { id: "emergency-supply", name: "Emergency Medicine Supply", description: "Run out of your regular medication? We can help with emergency supplies.", enabled: true }
  ];
}

function generateServiceKeywords(services) {
  const serviceKeywords = [];
  services.filter(s => s.enabled !== false).forEach(service => {
    const name = service.name.toLowerCase();
    serviceKeywords.push(`${name} Lincoln`);
    if (name.includes('flu')) serviceKeywords.push('flu jab Lincoln', 'flu vaccine Lincoln');
    if (name.includes('prescription')) serviceKeywords.push('prescription collection Lincoln', 'repeat prescription Lincoln');
    if (name.includes('blood pressure')) serviceKeywords.push('blood pressure check Lincoln', 'free blood pressure test Lincoln');
    if (name.includes('pharmacy first')) serviceKeywords.push('NHS Pharmacy First Lincoln', 'minor illness Lincoln');
    if (name.includes('contraception')) serviceKeywords.push('contraception Lincoln', 'morning after pill Lincoln');
    if (name.includes('emergency')) serviceKeywords.push('emergency medicine Lincoln', 'urgent prescription Lincoln');
  });
  return [...new Set(serviceKeywords)];
}

function generateSchemaServices(services) {
  return services
    .filter(s => s.enabled !== false)
    .map(service => ({
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": service.name,
        "description": service.description
      }
    }));
}

function generateMetaDescription(services) {
  const enabledServices = services.filter(s => s.enabled !== false).slice(0, 4);
  const serviceNames = enabledServices.map(s => s.name).join(', ');
  return `${PHARMACY_CONFIG.name} - Your trusted NHS community pharmacy in Lincoln, Lincolnshire (LN6). ${serviceNames}. Serving Lincoln, North Hykeham, South Hykeham, Waddington, Bracebridge Heath, Skellingthorpe, Nettleham, Saxilby, Cherry Willingham, Washingborough, Woodhall Spa, Market Rasen and all villages within 15 miles. Located inside Morrisons, Tritton Road.`;
}

function generateIndexHtml(services) {
  const allKeywords = [...BASE_KEYWORDS, ...generateServiceKeywords(services)];
  const schemaServices = generateSchemaServices(services);
  const metaDescription = generateMetaDescription(services);

  return `<!DOCTYPE html>
<html lang="en-GB">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#1e5631" />
    
    <!-- Primary SEO Meta Tags (Auto-generated from services) -->
    <meta name="description" content="${metaDescription}" />
    <meta name="keywords" content="${allKeywords.join(', ')}" />
    <meta name="robots" content="index, follow" />
    <meta name="author" content="${PHARMACY_CONFIG.name}" />
    
    <!-- Local SEO / Geo Meta Tags -->
    <meta name="geo.region" content="GB-LCN" />
    <meta name="geo.placename" content="${PHARMACY_CONFIG.address.city}, ${PHARMACY_CONFIG.address.region}" />
    <meta name="geo.position" content="${PHARMACY_CONFIG.geo.latitude};${PHARMACY_CONFIG.geo.longitude}" />
    <meta name="ICBM" content="${PHARMACY_CONFIG.geo.latitude}, ${PHARMACY_CONFIG.geo.longitude}" />
    
    <!-- Canonical URL -->
    <link rel="canonical" href="${PHARMACY_CONFIG.website}" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${PHARMACY_CONFIG.website}" />
    <meta property="og:title" content="${PHARMACY_CONFIG.name} | NHS Pharmacy Services in ${PHARMACY_CONFIG.address.city}, ${PHARMACY_CONFIG.address.region}" />
    <meta property="og:description" content="Your trusted NHS community pharmacy in ${PHARMACY_CONFIG.address.city}. Serving ${PHARMACY_CONFIG.address.city} and surrounding areas within 15 miles." />
    <meta property="og:image" content="${PHARMACY_CONFIG.website}/assets/pharmacy-logo.png" />
    <meta property="og:locale" content="en_GB" />
    <meta property="og:site_name" content="${PHARMACY_CONFIG.name}" />
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${PHARMACY_CONFIG.name} | NHS Pharmacy ${PHARMACY_CONFIG.address.city}" />
    <meta name="twitter:description" content="NHS community pharmacy in ${PHARMACY_CONFIG.address.city}. Serving ${PHARMACY_CONFIG.address.city} & 15-mile radius." />
    <meta name="twitter:image" content="${PHARMACY_CONFIG.website}/assets/pharmacy-logo.png" />
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    
    <title>${PHARMACY_CONFIG.name} | NHS Pharmacy Services in ${PHARMACY_CONFIG.address.city}, ${PHARMACY_CONFIG.address.region} | ${PHARMACY_CONFIG.address.postcode.split(' ')[0]}</title>
    
    <!-- Structured Data: Pharmacy (Auto-generated from services) -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Pharmacy",
      "@id": "${PHARMACY_CONFIG.website}/#pharmacy",
      "name": "${PHARMACY_CONFIG.name}",
      "alternateName": "${PHARMACY_CONFIG.alternateName}",
      "description": "${metaDescription}",
      "image": "${PHARMACY_CONFIG.website}/assets/pharmacy-logo.png",
      "logo": "${PHARMACY_CONFIG.website}/assets/pharmacy-logo.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "${PHARMACY_CONFIG.address.street}",
        "addressLocality": "${PHARMACY_CONFIG.address.city}",
        "addressRegion": "${PHARMACY_CONFIG.address.region}",
        "postalCode": "${PHARMACY_CONFIG.address.postcode}",
        "addressCountry": "${PHARMACY_CONFIG.address.country}"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": ${PHARMACY_CONFIG.geo.latitude},
        "longitude": ${PHARMACY_CONFIG.geo.longitude}
      },
      "telephone": "${PHARMACY_CONFIG.phone}",
      "email": "${PHARMACY_CONFIG.email}",
      "url": "${PHARMACY_CONFIG.website}",
      "sameAs": [],
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "09:00",
          "closes": "13:00"
        }
      ],
      "priceRange": "£",
      "currenciesAccepted": "GBP",
      "paymentAccepted": "Cash, Credit Card, Debit Card",
      "areaServed": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": ${PHARMACY_CONFIG.geo.latitude},
          "longitude": ${PHARMACY_CONFIG.geo.longitude}
        },
        "geoRadius": "${PHARMACY_CONFIG.serviceRadius}"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Pharmacy Services",
        "itemListElement": ${JSON.stringify(schemaServices, null, 8).split('\n').map((line, i) => i === 0 ? line : '        ' + line).join('\n')}
      }
    }
    </script>
    
    <!-- Structured Data: LocalBusiness -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "${PHARMACY_CONFIG.name}",
      "image": "${PHARMACY_CONFIG.website}/assets/pharmacy-logo.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "${PHARMACY_CONFIG.address.street}",
        "addressLocality": "${PHARMACY_CONFIG.address.city}",
        "addressRegion": "${PHARMACY_CONFIG.address.region}",
        "postalCode": "${PHARMACY_CONFIG.address.postcode}",
        "addressCountry": "${PHARMACY_CONFIG.address.country}"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": ${PHARMACY_CONFIG.geo.latitude},
        "longitude": ${PHARMACY_CONFIG.geo.longitude}
      },
      "telephone": "${PHARMACY_CONFIG.phoneDisplay}"
    }
    </script>
    
    <!-- Structured Data: FAQ -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What NHS services does ${PHARMACY_CONFIG.name} offer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We offer ${services.filter(s => s.enabled !== false).map(s => s.name).join(', ')}. Most NHS services are free with no appointment needed."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need an appointment at ${PHARMACY_CONFIG.name}?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No appointment is needed for most of our services. Simply walk in during our opening hours. We're open Monday-Friday 9am-6pm and Saturday 9am-1pm."
          }
        },
        {
          "@type": "Question",
          "name": "Where is ${PHARMACY_CONFIG.name} located?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We're located inside Morrisons supermarket on Tritton Road, ${PHARMACY_CONFIG.address.city}, ${PHARMACY_CONFIG.address.postcode}. Free parking is available in the Morrisons car park."
          }
        },
        {
          "@type": "Question",
          "name": "What areas does ${PHARMACY_CONFIG.name} serve?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We serve Lincoln and all areas within a 15-mile radius including: North Hykeham, South Hykeham, Waddington, Bracebridge Heath, Skellingthorpe, Nettleham, Saxilby, Cherry Willingham, Washingborough, Branston, Heighington, Metheringham, Woodhall Spa, Bardney, Welton, Dunholme, Navenby, Market Rasen, and many more villages across Lincolnshire."
          }
        },
        {
          "@type": "Question",
          "name": "Can I get a flu jab at ${PHARMACY_CONFIG.name}?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! We offer free NHS flu vaccinations for eligible patients (over 65s, pregnant women, those with certain health conditions). Private flu jabs are also available. No appointment necessary - just walk in."
          }
        },
        {
          "@type": "Question",
          "name": "What is NHS Pharmacy First?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "NHS Pharmacy First is a free NHS service where our pharmacists can assess and treat 7 common conditions without needing a GP appointment: sinusitis, sore throat, earache, infected insect bites, impetigo, shingles, and uncomplicated UTIs in women."
          }
        },
        {
          "@type": "Question",
          "name": "Do you offer prescription delivery to Lincoln and surrounding areas?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We offer prescription collection and can arrange delivery for patients who are housebound. Contact us on ${PHARMACY_CONFIG.phoneDisplay} to discuss delivery options to your area."
          }
        },
        {
          "@type": "Question",
          "name": "Is there a pharmacy near me in North Hykeham?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "${PHARMACY_CONFIG.name} is just a short drive from North Hykeham. Located in Morrisons on Tritton Road, Lincoln, we serve North Hykeham and all nearby areas with full NHS pharmacy services."
          }
        }
      ]
    }
    </script>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>`;
}

async function main() {
  console.log('🔍 Fetching services from API...');
  const services = await fetchServices();
  console.log(`✅ Found ${services.length} services`);
  
  console.log('📝 Generating SEO-optimized index.html...');
  const html = generateIndexHtml(services);
  
  const outputPath = path.join(__dirname, '..', 'public', 'index.html');
  fs.writeFileSync(outputPath, html);
  console.log(`✅ Generated: ${outputPath}`);
  
  // Generate social media hashtags JSON for PharmAdPro
  const hashtagsPath = path.join(__dirname, '..', 'public', 'hashtags.json');
  fs.writeFileSync(hashtagsPath, JSON.stringify(SOCIAL_MEDIA_HASHTAGS, null, 2));
  console.log(`✅ Generated: ${hashtagsPath}`);
  
  // Log what was included
  console.log('\n📊 SEO Summary:');
  console.log(`   Services included: ${services.filter(s => s.enabled !== false).length}`);
  services.filter(s => s.enabled !== false).forEach(s => {
    console.log(`   - ${s.name}`);
  });
  
  const totalKeywords = BASE_KEYWORDS.length + generateServiceKeywords(services).length;
  console.log(`\n   Keywords generated: ${totalKeywords}`);
  console.log(`   Location keywords: ${LINCOLN_AREA_LOCATIONS.length} villages/towns`);
  console.log('   Schema.org types: Pharmacy, LocalBusiness, FAQPage');
  console.log('   Geo targeting: Lincoln + 15-mile radius (24km)');
  console.log(`   Social media hashtags: ${Object.values(SOCIAL_MEDIA_HASHTAGS).flat().length} total`);
}

main().catch(console.error);
