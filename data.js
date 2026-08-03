// Geo Historic World - Site Data & Content Store

const SITE_DATA = {
  channelInfo: {
    title: "Geo Historic World",
    handle: "@geohistoricworld",
    url: "https://youtube.com/@geohistoricworld?si=cW3ceLG2CfFmR-ng",
    contactEmail: "geohistoricworld@gmail.com",
    tagline: "Unveiling the Cartography of Time & Geopolitical Power",
    description: "Welcome to Geo Historic World — your premier visual archive for geopolitical history, territorial shifts, map animations, and deep-dive documentaries exploring how ancient borders shaped the modern world.",
    subscribers: "125,000+",
    totalViews: "18.5 Million+",
    videosCount: "140+",
    globalReach: "190+ Countries",
  },

  categories: [
    { id: "all", name: "All Content" },
    { id: "geopolitics", name: "Geopolitics & Borders" },
    { id: "empires", name: "Ancient Empires" },
    { id: "worldwars", name: "World Wars" },
    { id: "shorts", name: "YouTube Shorts" }
  ],

  videos: [
    {
      id: "v1",
      youtubeId: "dQw4w9WgXcQ",
      title: "Rise and Fall of the Roman Empire: Complete Map Evolution",
      category: "empires",
      duration: "18:42",
      views: "1.4M views",
      published: "2 weeks ago",
      thumbnail: "assets/thumb_roman.jpg",
      description: "Trace the 1,000-year expansion and collapse of the Roman Empire through animated historical mapping, from a modest Latin city-state to a tri-continental titan.",
      tags: ["Rome", "Ancient History", "Cartography", "Europe"]
    },
    {
      id: "v2",
      youtubeId: "L_LUpnjgPso",
      title: "How World War II Redrew the Borders of Europe Forever",
      category: "worldwars",
      duration: "24:15",
      views: "890K views",
      published: "1 month ago",
      thumbnail: "assets/thumb_ww2.jpg",
      description: "An in-depth geopolitical analysis of the Yalta and Potsdam conferences, post-WWII border changes, territorial annexations, and the division of Berlin.",
      tags: ["WW2", "Cold War", "Europe", "Geopolitics"]
    },
    {
      id: "v3",
      youtubeId: "dQw4w9WgXcQ",
      title: "The Geopolitics of Ancient Silk Road Trade Routes",
      category: "geopolitics",
      duration: "15:08",
      views: "650K views",
      published: "2 months ago",
      thumbnail: "assets/thumb_silkroad.jpg",
      description: "How ancient trade routes across Eurasia dictated the rise of Central Asian khanates, Chinese dynasties, and European merchant empires.",
      tags: ["Silk Road", "Asia", "Trade Routes", "Ancient Empires"]
    },
    {
      id: "v4",
      youtubeId: "dQw4w9WgXcQ",
      title: "The Mongol Empire: Fastest Territorial Conquest in History",
      category: "empires",
      duration: "21:30",
      views: "2.1M views",
      published: "3 months ago",
      thumbnail: "assets/thumb_roman.jpg",
      description: "Visualizing Genghis Khan's rapid expansion from nomadic steppe tribes to governing 24 million square kilometers of land.",
      tags: ["Mongols", "Asia", "Conquest", "Maps"]
    },
    {
      id: "v5",
      youtubeId: "dQw4w9WgXcQ",
      title: "Top 10 Most Enigmatic & Bizarre Country Borders Explained",
      category: "geopolitics",
      duration: "14:22",
      views: "1.8M views",
      published: "4 months ago",
      thumbnail: "assets/thumb_modern.jpg",
      description: "From enclaves and exclaves like Baarle-Nassau to neutral zones and disputed corridors — exploring Earth's most complex political geography.",
      tags: ["Borders", "Geography", "Enclaves", "Modern Geopolitics"]
    },
    {
      id: "v6",
      youtubeId: "dQw4w9WgXcQ",
      title: "The Eastern Front: WWII Axis vs Allied Territory Shifts (Day by Day)",
      category: "worldwars",
      duration: "29:50",
      views: "1.2M views",
      published: "5 months ago",
      thumbnail: "assets/thumb_ww2.jpg",
      description: "Comprehensive day-by-day mapping animation of Operation Barbarossa, Stalingrad, Kursk, and the march to Berlin.",
      tags: ["WW2", "Eastern Front", "Military Mapping"]
    }
  ],

  shorts: [
    {
      id: "s1",
      title: "How Small Was Ancient Greece? 🇬🇷",
      views: "3.4M views",
      length: "0:58",
      category: "shorts",
      youtubeId: "dQw4w9WgXcQ"
    },
    {
      id: "s2",
      title: "Why Is Russia So Big? 🇷🇺",
      views: "5.1M views",
      length: "0:55",
      category: "shorts",
      youtubeId: "dQw4w9WgXcQ"
    },
    {
      id: "s3",
      title: "The Country Surrounded By South Africa 🇱 Lesotho",
      views: "2.8M views",
      length: "0:45",
      category: "shorts",
      youtubeId: "dQw4w9WgXcQ"
    },
    {
      id: "s4",
      title: "How Constantinople Fell in 1453 ⚔️",
      views: "4.2M views",
      length: "0:59",
      category: "shorts",
      youtubeId: "dQw4w9WgXcQ"
    }
  ],

  timelineEvents: [
    {
      year: "3000 BCE",
      title: "Cradle of Civilizations",
      region: "Mesopotamia & Nile Valley",
      description: "The dawn of city-states along the Tigris, Euphrates, and Nile. The earliest known territorial boundaries and record-keeping systems emerge.",
      keyFact: "Sumerians developed the first known maps drawn on clay tablets.",
      relatedVideoId: "v3"
    },
    {
      year: "117 CE",
      title: "Peak Roman Empire",
      region: "Mediterranean Basin & Europe",
      description: "Under Emperor Trajan, Rome reaches its maximum territorial extent, governing over 5 million square kilometers spanning 3 continents.",
      keyFact: "Over 80,000 km of paved Roman roads connected Britain to the Persian Gulf.",
      relatedVideoId: "v1"
    },
    {
      year: "1279 CE",
      title: "Mongol Empire Dominance",
      region: "Eurasia",
      description: "Kublai Khan completes the conquest of Song China, unifying Eurasia under Pax Mongolica and opening global trade routes.",
      keyFact: "Largest contiguous land empire in human history.",
      relatedVideoId: "v4"
    },
    {
      year: "1648 CE",
      title: "Peace of Westphalia",
      region: "Central Europe",
      description: "The birth of modern international relations and sovereignty. Fixed nation-state borders replace feudal territorial overlapping.",
      keyFact: "Established the concept of sovereign territorial state integrity.",
      relatedVideoId: "v5"
    },
    {
      year: "1945 CE",
      title: "Post-WWII Global Realignment",
      region: "Global",
      description: "End of World War II leads to the Yalta Conference divisions, decolonization of Africa and Asia, and the onset of the Cold War bipolar grid.",
      keyFact: "Over 50 new sovereign nations gained independence between 1945 and 1975.",
      relatedVideoId: "v2"
    },
    {
      year: "2026 CE",
      title: "Modern Geopolitics & Digital Maps",
      region: "Global Cyber & Land Borders",
      description: "Geopolitical tensions shift to maritime trade chokepoints, satellite mapping, boundary disputes, and energy transport routes.",
      keyFact: "Satellite mapping now tracks border movements in real-time.",
      relatedVideoId: "v5"
    }
  ],

  globeHotspots: [
    {
      id: "pin-rome",
      name: "Rome, Italy",
      lat: 41.9,
      lng: 12.5,
      era: "117 CE",
      title: "Heart of the Pax Romana",
      desc: "Capital of Trajan's Empire stretching across 30+ modern nations."
    },
    {
      id: "pin-silk",
      name: "Samarkand",
      lat: 39.65,
      lng: 66.97,
      era: "800 CE",
      title: "Silk Road Gateway",
      desc: "Crossroads of Eurasian silk, spice, and technological exchange."
    },
    {
      id: "pin-berlin",
      name: "Berlin, Germany",
      lat: 52.52,
      lng: 13.4,
      era: "1945 CE",
      title: "Cold War Crucible",
      desc: "Divided epicenter of 20th-century geopolitical conflict."
    },
    {
      id: "pin-singapore",
      name: "Malacca Strait",
      lat: 2.5,
      lng: 101.5,
      era: "Present",
      title: "Chokepoint Geopolitics",
      desc: "Vital maritime passage carrying 25% of global sea trade."
    }
  ],

  quizQuestions: [
    {
      question: "Which empire was the largest contiguous land empire in human history?",
      options: [
        "The Roman Empire",
        "The Mongol Empire",
        "The British Empire",
        "The Ottoman Empire"
      ],
      correctIndex: 1,
      explanation: "The Mongol Empire expanded to cover 24 million km² across Eurasia under Genghis Khan and his successors."
    },
    {
      question: "What 1648 treaty established the modern concept of nation-state sovereignty?",
      options: [
        "Treaty of Versailles",
        "Congress of Vienna",
        "Peace of Westphalia",
        "Treaty of Tordesillas"
      ],
      correctIndex: 2,
      explanation: "The Peace of Westphalia ended the Thirty Years' War and laid the groundwork for modern territorial sovereignty."
    },
    {
      question: "Which African nation has Lesotho entirely encapsulated inside its borders?",
      options: [
        "Zimbabwe",
        "South Africa",
        "Namibia",
        "Mozambique"
      ],
      correctIndex: 1,
      explanation: "Lesotho is an enclave country completely surrounded by South Africa."
    },
    {
      question: "In what year did the Roman Empire reach its maximum geographical expanse under Trajan?",
      options: [
        "44 BCE",
        "117 CE",
        "476 CE",
        "1453 CE"
      ],
      correctIndex: 1,
      explanation: "In 117 CE, Trajan's conquests brought Mesopotamia, Armenia, and Dacia under Roman control."
    },
    {
      question: "What famous maritime strait handles over a quarter of the world's traded goods?",
      options: [
        "Strait of Malacca",
        "Bering Strait",
        "Strait of Gibraltar",
        "Suez Canal"
      ],
      correctIndex: 0,
      explanation: "The Strait of Malacca connects the Indian and Pacific Oceans, making it a critical geopolitical chokepoint."
    }
  ]
};
