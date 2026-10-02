import type { Locale } from "@/i18n/routing";

export type ArticleSection = {
  id: string;
  title: string;
  paragraphs: string[];
  image?: string;
  imageAlt?: string;
};

export type Journal = {
  slug: string;
  category: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  body: string[];
};

export type Product = {
  sku: string;
  name: string;
  summary: string;
  priceIdr: number;
  weightGrams: number;
  stock: number;
  image: string;
};

export type Role = {
  slug: string;
  department: string;
  title: string;
  location: string;
  type: string;
  summary: string;
  requirements: string[];
  qualifications: string[];
};

const images = {
  hero: "/images/figma/hero-clean.jpg",
  heroVideo: "/videos/hero.mp4",
  facility: "/images/figma/facility.png",
  field: "/images/figma/field.jpg",
  flower: "/images/figma/flower.jpg",
  harvest: "/images/figma/harvest.jpg",
  vertical: "/images/figma/vertical.jpg",
  nutrient: "/images/figma/nutrient.png",
  aisle: "/images/figma/team-aisle.jpg",
  storage: "/images/figma/team-storage.jpg",
  hypermart: "/images/figma/logo-hypermart.png",
  mykonos: "/images/figma/logo-mykonos.png",
};

const en = {
  images,
  techSlides: [
    {
      id: "vertical",
      tab: "Vertical Farming",
      title: "Vertical Farming",
      body: "A vertical layered growing method that maximizes planting space and ensures each plant grows optimally in a fully controlled environment.",
      image: images.vertical,
    },
    {
      id: "hydroponic",
      tab: "Hydroponic System",
      title: "Hydroponic System",
      body: "Plants are grown in a specialized substrate with their roots immersed in a nutrient solution formulated to meet the needs of each growth stage, resulting fresher, sweeter and constant high quality harvest.",
      image: images.nutrient,
    },
    {
      id: "environment",
      tab: "Environment Control",
      title: "Environment Control",
      body: "An innovative approach to agriculture that optimizes space utilization and creates ideal conditions for plant growth, ensuring each crop thrives in a meticulously regulated environment.",
      image: images.hero,
    },
  ],
  portals: [
    {
      href: "/lab",
      eyebrow: "Research",
      title: "The Lab",
      body: "Where the specification is written, and rewritten, against the harvest.",
      image: images.storage,
      cta: "Visit lab",
    },
    {
      href: "/farm",
      eyebrow: "Cultivation",
      title: "The Farm",
      body: "A working facility at sea level. The plants do not know they are in West Jakarta.",
      image: images.vertical,
      cta: "Explore farm",
    },
    {
      href: "/harvest",
      eyebrow: "Harvest",
      title: "The Harvest",
      body: "Punnets packed from a known cycle. Buy what the room just finished.",
      image: images.harvest,
      cta: "Buy our product",
    },
  ],
  journalIntroIndex: ["01", "02", "03", "04", "05", "06", "07", "08", "09"],
  journals: [
    {
      slug: "sea-level-method",
      category: "R&D",
      title: "A method, not a mountain",
      date: "12 Sep 2026",
      excerpt:
        "What we have proven in West Jakarta is not a crop. It is a way to build the weather.",
      image: images.aisle,
      body: [
        "The facility sits near sea level. Strawberries are not supposed to be casual about that. Highland farms rent their climate from altitude. We write ours down.",
        "Every cycle since commissioning has a harvest file: light hours, solution strength, the hour the first ripe fruit was picked. The journal is that file, told in public.",
        "The next site does not need the same postcode. It needs the same specification, and a team willing to keep the log honest.",
      ],
    },
    {
      slug: "first-punnet",
      category: "Harvest",
      title: "The first punnet that left the room",
      date: "28 Aug 2026",
      excerpt: "Packed, weighed, and priced as a retail fruit, not a demonstration.",
      image: images.harvest,
      body: [
        "A punnet is a small object with a long record behind it. This one was picked in the morning, cooled, and packed before noon.",
        "We publish the cycle, not a tasting note. If the fruit is good, the log already knew.",
      ],
    },
    {
      slug: "recipe-for-a-room",
      category: "Recipe",
      title: "Recipe for a room",
      date: "04 Aug 2026",
      excerpt: "Not a kitchen recipe. The set points we refuse to improvise.",
      image: images.flower,
      body: [
        "A recipe here is a list of conditions, not ingredients. Change one and the fruit changes. We would rather change it on purpose.",
        "The flower in the gutter is the checkpoint. If it opens on time, the week is on the specification.",
      ],
    },
    {
      slug: "second-site",
      category: "Partnership",
      title: "Where the second site goes",
      date: "19 Jul 2026",
      excerpt: "Capital, capacity, and a city that wants the fruit closer.",
      image: images.field,
      body: [
        "We are not buying hills. We are looking for a building, power, and a partner who wants the method in their city.",
        "Hypermart and kitchens such as Mykonos already know the fruit. The second facility is how that stays true outside Jakarta.",
      ],
    },
    {
      slug: "people-on-the-grate",
      category: "Stories",
      title: "People on the grate",
      date: "02 Jul 2026",
      excerpt: "The aisle is narrow. The work is a sequence, not a performance.",
      image: images.aisle,
      body: [
        "Cultivation is a shift with a checklist. Boots, gloves, the same walk every morning.",
        "The photograph is the team between tiers. The job is quieter than the picture.",
      ],
    },
    {
      slug: "news-commissioning",
      category: "News",
      title: "Commissioning notes",
      date: "11 Jun 2026",
      excerpt: "What we turned on, and what we waited to trust.",
      image: images.nutrient,
      body: [
        "Pumps first. Then light. Then the decision to let a crop run without a manual override.",
        "Commissioning is finished when the log can explain a bad day without a meeting.",
      ],
    },
  ] satisfies Journal[],
  products: [
    {
      sku: "SF-PUN-250",
      name: "Alpine punnet",
      summary: "250 g. The weekly fruit from the current cycle.",
      priceIdr: 185000,
      weightGrams: 250,
      stock: 48,
      image: images.harvest,
    },
    {
      sku: "SF-PUN-500",
      name: "Chef’s punnet",
      summary: "500 g. For a kitchen that wants the same fruit twice.",
      priceIdr: 320000,
      weightGrams: 500,
      stock: 22,
      image: images.flower,
    },
    {
      sku: "SF-RSV-250",
      name: "Reserve selection",
      summary: "250 g. Held for the cycle we are still grading.",
      priceIdr: 240000,
      weightGrams: 250,
      stock: 0,
      image: images.field,
    },
    {
      sku: "SF-TIP-100",
      name: "Leaves & tips",
      summary: "100 g. Tender tips, packed the morning they were cut.",
      priceIdr: 95000,
      weightGrams: 100,
      stock: 30,
      image: images.vertical,
    },
    {
      sku: "SF-GIFT",
      name: "Facility gift box",
      summary: "Two punnets and a card from the cycle log.",
      priceIdr: 450000,
      weightGrams: 600,
      stock: 12,
      image: images.aisle,
    },
    {
      sku: "SF-PUN-1K",
      name: "Kitchen kilo",
      summary: "1 kg. A flat of the same grade, not a mix.",
      priceIdr: 590000,
      weightGrams: 1000,
      stock: 8,
      image: images.harvest,
    },
  ] satisfies Product[],
  shippingIdr: 25000,
  articles: {
    farm: {
      kicker: "The Farm",
      title: "A working facility at sea level",
      lede: "West Jakarta. No hillside. A room that keeps a strawberry honest.",
      cta: "Explore farm",
      ctaHref: "/contact?to=farm",
      image: images.aisle,
      sections: [
        {
          id: "site",
          title: "The site",
          paragraphs: [
            "The farm is a building, not a view. Outside, the city is at sea level. Inside, the gutters run in straight lines under a light we schedule.",
            "Visitors often look for soil. The work is in the solution, the airflow, and the people who walk the aisle before the city is fully awake.",
          ],
          image: images.aisle,
          imageAlt: "Cultivation team standing between vertical strawberry gutters",
        },
        {
          id: "method",
          title: "The method",
          paragraphs: [
            "Each tier is the same recipe. If one gutter drifts, the log says so before the fruit does.",
            "We do not describe this as magic. It is repetition, with instruments.",
          ],
          image: images.vertical,
          imageAlt: "Three tiers of leafy greens under grow lights",
        },
        {
          id: "people",
          title: "The people",
          paragraphs: [
            "Cultivation is a team sport with a narrow aisle. Boots, gloves, a shared checklist.",
            "The farm page is their room. The careers page is how someone else joins the shift.",
          ],
          image: images.storage,
          imageAlt: "Two operators checking stores beside the growing rooms",
        },
        {
          id: "visit",
          title: "A visit",
          paragraphs: [
            "Walk-ins are not how the room stays clean. If you want to see it, write to us and name the farm.",
            "We will answer with a time, a door, and what to wear on your feet.",
          ],
        },
      ],
    },
    lab: {
      kicker: "The Lab",
      title: "The specification lives here",
      lede: "Research is not a poster. It is the reason the farm can repeat itself.",
      cta: "Visit lab",
      ctaHref: "/contact?to=lab",
      image: images.nutrient,
      sections: [
        {
          id: "question",
          title: "The question",
          paragraphs: [
            "Can a strawberry be a specification instead of a place? The lab is where that question is allowed to fail.",
            "We change one variable at a time. The harvest tells us if the sentence was true.",
          ],
        },
        {
          id: "system",
          title: "The system",
          paragraphs: [
            "Dosing, sensing, and the habit of writing the number down. The pumps in the photograph are not decoration.",
            "If a reading is missing, the cycle is not finished, even if the fruit looks fine.",
          ],
          image: images.nutrient,
          imageAlt: "Nutrient dosing pumps with illuminated gauges",
        },
        {
          id: "measure",
          title: "What we measure",
          paragraphs: [
            "Light, solution, temperature, and the hour of first colour. Everything else is a story we do not need yet.",
            "The journals publish the ones we are willing to stand behind.",
          ],
          image: images.flower,
          imageAlt: "Strawberry flower under the facility lights",
        },
        {
          id: "visit-lab",
          title: "Visit the lab",
          paragraphs: [
            "The lab is a working bench. Visits are short, scheduled, and start from the contact form with “lab” already chosen.",
          ],
        },
      ],
    },
    harvest: {
      kicker: "The Harvest",
      title: "The fruit, after the log",
      lede: "What leaves the building has a cycle number, a weight, and a price in rupiah.",
      cta: "Buy our product",
      ctaHref: "/products",
      image: images.harvest,
      sections: [
        {
          id: "sell",
          title: "What we sell",
          paragraphs: [
            "Punnets. A larger box for a kitchen. Nothing that pretends to be a season we did not grow.",
            "Sold-out stays on the page, quieter, so you can see what the room is between.",
          ],
          image: images.harvest,
          imageAlt: "Gloved hands holding a ripe strawberry under the gutters",
        },
        {
          id: "pack",
          title: "How it is packed",
          paragraphs: [
            "Picked, cooled, weighed. The punnet is the last honest container we have.",
            "Shipping in this first version is a flat fee across Indonesia. The courier choice comes later.",
          ],
        },
        {
          id: "where",
          title: "Where it goes",
          paragraphs: [
            "Retail shelves and a few kitchens in the city. Hypermart and Mykonos are the names already on the fruit.",
            "If you want a case for a restaurant, say so on the contact form. The product page is for the punnet.",
          ],
        },
        {
          id: "buy",
          title: "Buy",
          paragraphs: [
            "The catalog is the harvest that is packed. Add what you want. An empty basket cannot check out.",
          ],
        },
      ],
    },
  },
  departments: [
    {
      name: "Cultivation",
      body: "The aisle, the checklist, the fruit.",
    },
    {
      name: "Research",
      body: "The lab bench and the cycle log.",
    },
    {
      name: "Operations",
      body: "Power, packing, and the door.",
    },
  ],
  benefits: [
    "A room with a real specification, not a slogan",
    "Shift meals from the same harvest",
    "Health cover and a written holiday",
    "Training on the system, not a slide",
  ],
  people: [
    { name: "Sari Wulandari", role: "Cultivation lead", image: images.aisle },
    { name: "Dimas Pratama", role: "Research technician", image: images.nutrient },
    { name: "Maya Kusuma", role: "Packing", image: images.harvest },
  ],
  roles: [
    {
      slug: "cultivation-associate",
      department: "Cultivation",
      title: "Cultivation associate",
      location: "West Jakarta",
      type: "Full-time",
      summary:
        "Walk the aisle, keep the checklist, and notice when a gutter is not on the recipe.",
      requirements: [
        "Comfortable on your feet for a full shift",
        "Careful with a written sequence",
        "Willing to work an early start",
      ],
      qualifications: [
        "Experience in a greenhouse, kitchen, or lab is welcome and not required",
        "Bahasa Indonesia. English is useful, not a gate",
      ],
    },
    {
      slug: "research-technician",
      department: "Research",
      title: "Research technician",
      location: "West Jakarta",
      type: "Full-time",
      summary:
        "Run the dosing bench, file the readings, and tell cultivation when a trial is ready.",
      requirements: [
        "Comfortable with instruments and a logbook",
        "A habit of changing one thing at a time",
      ],
      qualifications: [
        "A science or agriculture background helps",
        "You can explain a number to someone who grows the plant",
      ],
    },
    {
      slug: "facility-operator",
      department: "Operations",
      title: "Facility operator",
      location: "West Jakarta",
      type: "Full-time",
      summary:
        "Power, cold, packing, and the calendar that gets fruit out of the building.",
      requirements: [
        "You have kept a small plant room, warehouse, or kitchen honest",
        "You write things down when they break",
      ],
      qualifications: ["A driving licence is useful for market runs"],
    },
  ] satisfies Role[],
  faqs: [
    {
      q: "Where is the facility?",
      a: "West Jakarta, at sea level. Visits are scheduled. Use the contact form and choose the room you want to see.",
    },
    {
      q: "Do you ship across Indonesia?",
      a: "Yes. This version uses one shipping price in rupiah. A courier picker comes later.",
    },
    {
      q: "What does sold out mean?",
      a: "The punnet stays on the page at reduced opacity and cannot be added. Stock returns when the next cycle is packed.",
    },
    {
      q: "How do I pay?",
      a: "The designed options are QRIS and card. This website shows those screens. Payment is not charged yet.",
    },
    {
      q: "Can I apply without a horticulture degree?",
      a: "Yes. Read the role. The requirement is care with a sequence, not a certificate on the wall.",
    },
    {
      q: "Which language is the site?",
      a: "Bahasa Indonesia and English. The layout is the same. Switch from the menu.",
    },
  ],
  legal: {
    privacy: {
      title: "Privacy policy",
      updated: "2 October 2026",
      sections: [
        {
          heading: "What we hold",
          body: "If you write to us, apply for a role, or check out, we keep the details you typed: name, email, phone, and a shipping address. Passwords and card numbers are not stored on this website.",
        },
        {
          heading: "Why",
          body: "To answer you, to consider an application, and to show you an order. We do not sell the list.",
        },
        {
          heading: "How long",
          body: "Enquiry and application notes stay until the conversation is finished and a short archive after that. You can ask us to delete them.",
        },
      ],
    },
    terms: {
      title: "Terms and conditions",
      updated: "2 October 2026",
      sections: [
        {
          heading: "The site",
          body: "SooFresh publishes a public website about a facility in West Jakarta, a journal, open roles, and a shop front. The operator dashboard is a separate system.",
        },
        {
          heading: "Accounts",
          body: "An account is for shoppers. It is not an operator login. Signing out is a confirmation, not a surprise.",
        },
        {
          heading: "Content",
          body: "Journal text and photographs belong to SooFresh unless a credit says otherwise.",
        },
      ],
    },
    sale: {
      title: "Terms of sale",
      updated: "2 October 2026",
      sections: [
        {
          heading: "Price",
          body: "Prices are in Indonesian rupiah and include the tax treatment shown at checkout. Shipping is a flat amount until a courier rate exists.",
        },
        {
          heading: "Stock",
          body: "Adding to the basket does not reserve a punnet. A sold-out item cannot be added. Payment, when it is connected, is what confirms the order.",
        },
        {
          heading: "Delivery",
          body: "We deliver inside Indonesia to the address you give. The order page shows processing, shipping, and delivered as they happen.",
        },
      ],
    },
  },
  contactTargets: [
    { value: "general", label: "General" },
    { value: "farm", label: "Explore farm" },
    { value: "lab", label: "Visit lab" },
    { value: "visit", label: "Arrange a visit" },
    { value: "invest", label: "Invest with us" },
  ],
  orders: [
    {
      number: "SF-10428",
      placed: "18 Sep 2026",
      status: "Shipping",
      totalIdr: 210000,
      items: [{ name: "Alpine punnet", qty: 1, unitPriceIdr: 185000 }],
      timeline: [
        { status: "Processing", date: "18 Sep 2026", current: false },
        { status: "Shipping", date: "20 Sep 2026", current: true },
        { status: "Delivered", date: null, current: false },
      ],
    },
    {
      number: "SF-10302",
      placed: "02 Aug 2026",
      status: "Delivered",
      totalIdr: 345000,
      items: [{ name: "Chef’s punnet", qty: 1, unitPriceIdr: 320000 }],
      timeline: [
        { status: "Processing", date: "02 Aug 2026", current: false },
        { status: "Shipping", date: "03 Aug 2026", current: false },
        { status: "Delivered", date: "05 Aug 2026", current: true },
      ],
    },
  ],
  partners: [
    { name: "Hypermart", image: images.hypermart },
    { name: "Mykonos", image: images.mykonos },
  ],
};

const id: typeof en = {
  ...en,
  techSlides: [
    {
      id: "vertical",
      tab: "Vertical Farming",
      title: "Vertical Farming",
      body: "Metode tanam berlapis vertikal yang memaksimalkan ruang tanam dan memastikan setiap tanaman tumbuh optimal di lingkungan yang sepenuhnya terkendali.",
      image: images.vertical,
    },
    {
      id: "hydroponic",
      tab: "Sistem Hidroponik",
      title: "Sistem Hidroponik",
      body: "Tanaman tumbuh pada substrat khusus dengan akar terendam larutan nutrisi yang diracik untuk setiap tahap tumbuh, menghasilkan panen yang lebih segar, lebih manis, dan konsisten.",
      image: images.nutrient,
    },
    {
      id: "environment",
      tab: "Kendali Lingkungan",
      title: "Kendali Lingkungan",
      body: "Pendekatan pertanian yang mengoptimalkan penggunaan ruang dan menciptakan kondisi ideal bagi pertumbuhan tanaman, sehingga setiap tanaman berkembang di lingkungan yang diatur dengan cermat.",
      image: images.hero,
    },
  ],
  portals: [
    {
      href: "/lab",
      eyebrow: "Riset",
      title: "The Lab",
      body: "Tempat spesifikasi ditulis, dan ditulis ulang, berhadapan dengan panen.",
      image: images.storage,
      cta: "Kunjungi lab",
    },
    {
      href: "/farm",
      eyebrow: "Kultivasi",
      title: "The Farm",
      body: "Fasilitas yang bekerja di permukaan laut. Tanamannya tidak tahu mereka di Jakarta Barat.",
      image: images.vertical,
      cta: "Jelajahi farm",
    },
    {
      href: "/harvest",
      eyebrow: "Panen",
      title: "The Harvest",
      body: "Punnet dari siklus yang diketahui. Beli apa yang baru saja ruangan selesaikan.",
      image: images.harvest,
      cta: "Beli produk kami",
    },
  ],
  journals: [
    {
      slug: "sea-level-method",
      category: "R&D",
      title: "Metode, bukan gunung",
      date: "12 Sep 2026",
      excerpt:
        "Yang kami buktikan di Jakarta Barat bukan tanaman. Ini cara membangun cuaca.",
      image: images.aisle,
      body: [
        "Fasilitas ini berada dekat permukaan laut. Stroberi tidak seharusnya cuek soal itu. Kebun dataran tinggi menyewa iklim dari ketinggian. Kami menuliskan milik kami.",
        "Setiap siklus sejak commissioning punya berkas panen: jam cahaya, kekuatan larutan, jam buah pertama dipetik. Jurnal ini adalah berkas itu, diceritakan di depan umum.",
        "Lokasi berikutnya tidak butuh kode pos yang sama. Ia butuh spesifikasi yang sama, dan tim yang mau menjaga catatan tetap jujur.",
      ],
    },
    {
      slug: "first-punnet",
      category: "Panen",
      title: "Punnet pertama yang keluar dari ruangan",
      date: "28 Agu 2026",
      excerpt: "Dikemas, ditimbang, dan dihargai sebagai buah ritel, bukan demonstrasi.",
      image: images.harvest,
      body: [
        "Punnet adalah benda kecil dengan catatan panjang di belakangnya. Yang ini dipetik pagi, didinginkan, dan dikemas sebelum siang.",
        "Kami menerbitkan siklusnya, bukan catatan rasa. Jika buahnya baik, catatannya sudah tahu.",
      ],
    },
    {
      slug: "recipe-for-a-room",
      category: "Resep",
      title: "Resep untuk sebuah ruangan",
      date: "04 Agu 2026",
      excerpt: "Bukan resep dapur. Set point yang tidak kami improvisasi.",
      image: images.flower,
      body: [
        "Resep di sini adalah daftar kondisi, bukan bahan. Ubah satu, buahnya berubah. Kami lebih suka mengubahnya dengan sengaja.",
        "Bunga di talang adalah titik cek. Jika mekar tepat waktu, minggu itu sesuai spesifikasi.",
      ],
    },
    {
      slug: "second-site",
      category: "Kemitraan",
      title: "Ke mana lokasi kedua pergi",
      date: "19 Jul 2026",
      excerpt: "Modal, kapasitas, dan kota yang ingin buahnya lebih dekat.",
      image: images.field,
      body: [
        "Kami tidak membeli bukit. Kami mencari bangunan, listrik, dan mitra yang ingin metode ini di kota mereka.",
        "Hypermart dan dapur seperti Mykonos sudah mengenal buahnya. Fasilitas kedua adalah cara itu tetap benar di luar Jakarta.",
      ],
    },
    {
      slug: "people-on-the-grate",
      category: "Cerita",
      title: "Orang-orang di atas grate",
      date: "02 Jul 2026",
      excerpt: "Lorongnya sempit. Pekerjaannya urutan, bukan pertunjukan.",
      image: images.aisle,
      body: [
        "Kultivasi adalah sif dengan daftar periksa. Sepatu bot, sarung tangan, jalan yang sama setiap pagi.",
        "Fotonya adalah tim di antara tingkat. Pekerjaannya lebih sunyi daripada gambarnya.",
      ],
    },
    {
      slug: "news-commissioning",
      category: "Berita",
      title: "Catatan commissioning",
      date: "11 Jun 2026",
      excerpt: "Apa yang kami nyalakan, dan apa yang kami tunggu sebelum percaya.",
      image: images.nutrient,
      body: [
        "Pompa dulu. Lalu cahaya. Lalu keputusan membiarkan tanaman berjalan tanpa override manual.",
        "Commissioning selesai ketika catatan bisa menjelaskan hari yang buruk tanpa rapat.",
      ],
    },
  ],
  products: [
    {
      sku: "SF-PUN-250",
      name: "Punnet Alpine",
      summary: "250 g. Buah mingguan dari siklus yang sedang berjalan.",
      priceIdr: 185000,
      weightGrams: 250,
      stock: 48,
      image: images.harvest,
    },
    {
      sku: "SF-PUN-500",
      name: "Punnet dapur",
      summary: "500 g. Untuk dapur yang ingin buah yang sama dua kali.",
      priceIdr: 320000,
      weightGrams: 500,
      stock: 22,
      image: images.flower,
    },
    {
      sku: "SF-RSV-250",
      name: "Pilihan cadangan",
      summary: "250 g. Ditahan untuk siklus yang masih kami grading.",
      priceIdr: 240000,
      weightGrams: 250,
      stock: 0,
      image: images.field,
    },
    {
      sku: "SF-TIP-100",
      name: "Daun & pucuk",
      summary: "100 g. Pucuk muda, dikemas pagi saat dipotong.",
      priceIdr: 95000,
      weightGrams: 100,
      stock: 30,
      image: images.vertical,
    },
    {
      sku: "SF-GIFT",
      name: "Kotak hadiah fasilitas",
      summary: "Dua punnet dan kartu dari catatan siklus.",
      priceIdr: 450000,
      weightGrams: 600,
      stock: 12,
      image: images.aisle,
    },
    {
      sku: "SF-PUN-1K",
      name: "Kilo dapur",
      summary: "1 kg. Satu grade yang sama, bukan campuran.",
      priceIdr: 590000,
      weightGrams: 1000,
      stock: 8,
      image: images.harvest,
    },
  ],
  articles: {
    farm: {
      kicker: "The Farm",
      title: "Fasilitas yang bekerja di permukaan laut",
      lede: "Jakarta Barat. Tanpa lereng. Ruangan yang membuat stroberi tetap jujur.",
      cta: "Jelajahi farm",
      ctaHref: "/contact?to=farm",
      image: images.aisle,
      sections: [
        {
          id: "site",
          title: "Lokasinya",
          paragraphs: [
            "Farm ini bangunan, bukan pemandangan. Di luar, kota berada di permukaan laut. Di dalam, talang berjalan lurus di bawah cahaya yang kami jadwalkan.",
            "Pengunjung sering mencari tanah. Pekerjaannya ada di larutan, aliran udara, dan orang yang menyusuri lorong sebelum kota benar-benar bangun.",
          ],
          image: images.aisle,
          imageAlt: "Tim kultivasi di antara talang stroberi vertikal",
        },
        {
          id: "method",
          title: "Metodenya",
          paragraphs: [
            "Setiap tingkat memakai resep yang sama. Jika satu talang menyimpang, catatan mengatakannya sebelum buahnya.",
            "Kami tidak menyebut ini sihir. Ini pengulangan, dengan instrumen.",
          ],
          image: images.vertical,
          imageAlt: "Tiga tingkat sayuran di bawah lampu tumbuh",
        },
        {
          id: "people",
          title: "Orang-orangnya",
          paragraphs: [
            "Kultivasi adalah kerja tim di lorong yang sempit. Sepatu bot, sarung tangan, daftar periksa yang sama.",
            "Halaman farm adalah ruangan mereka. Halaman karier adalah cara orang lain ikut sif.",
          ],
          image: images.storage,
          imageAlt: "Dua operator memeriksa gudang di samping ruang tanam",
        },
        {
          id: "visit",
          title: "Kunjungan",
          paragraphs: [
            "Datang tanpa janji bukan cara ruangan tetap bersih. Jika Anda ingin melihatnya, tulis kepada kami dan sebut farm.",
            "Kami akan membalas dengan waktu, pintu, dan alas kaki yang perlu dipakai.",
          ],
        },
      ],
    },
    lab: {
      kicker: "The Lab",
      title: "Spesifikasi tinggal di sini",
      lede: "Riset bukan poster. Inilah alasan farm bisa mengulang dirinya.",
      cta: "Kunjungi lab",
      ctaHref: "/contact?to=lab",
      image: images.nutrient,
      sections: [
        {
          id: "question",
          title: "Pertanyaannya",
          paragraphs: [
            "Bisakah stroberi menjadi spesifikasi, bukan tempat? Lab adalah tempat pertanyaan itu boleh gagal.",
            "Kami mengubah satu variabel setiap kali. Panen yang memberitahu apakah kalimat itu benar.",
          ],
        },
        {
          id: "system",
          title: "Sistemnya",
          paragraphs: [
            "Dosing, sensor, dan kebiasaan menuliskan angkanya. Pompa di foto itu bukan hiasan.",
            "Jika satu pembacaan hilang, siklus belum selesai, meski buahnya terlihat baik.",
          ],
          image: images.nutrient,
          imageAlt: "Pompa dosing nutrisi dengan indikator menyala",
        },
        {
          id: "measure",
          title: "Yang kami ukur",
          paragraphs: [
            "Cahaya, larutan, suhu, dan jam warna pertama. Yang lain adalah cerita yang belum kami butuhkan.",
            "Jurnal menerbitkan yang kami mau pertanggungjawabkan.",
          ],
          image: images.flower,
          imageAlt: "Bunga stroberi di bawah lampu fasilitas",
        },
        {
          id: "visit-lab",
          title: "Kunjungi lab",
          paragraphs: [
            "Lab adalah meja kerja. Kunjungan singkat, terjadwal, dan dimulai dari formulir kontak dengan “lab” yang sudah terpilih.",
          ],
        },
      ],
    },
    harvest: {
      kicker: "The Harvest",
      title: "Buahnya, setelah catatan",
      lede: "Yang keluar dari gedung punya nomor siklus, berat, dan harga dalam rupiah.",
      cta: "Beli produk kami",
      ctaHref: "/products",
      image: images.harvest,
      sections: [
        {
          id: "sell",
          title: "Yang kami jual",
          paragraphs: [
            "Punnet. Kotak lebih besar untuk dapur. Tidak ada yang berpura-pura menjadi musim yang tidak kami tanam.",
            "Yang habis tetap di halaman, lebih sunyi, supaya terlihat apa yang sedang ruangan lewati.",
          ],
          image: images.harvest,
          imageAlt: "Tangan bersarung memegang stroberi matang",
        },
        {
          id: "pack",
          title: "Cara dikemas",
          paragraphs: [
            "Dipetik, didinginkan, ditimbang. Punnet adalah wadah jujur terakhir yang kami punya.",
            "Pengiriman pada versi ini satu tarif untuk Indonesia. Pilihan kurir menyusul.",
          ],
        },
        {
          id: "where",
          title: "Ke mana perginya",
          paragraphs: [
            "Rak ritel dan beberapa dapur di kota. Hypermart dan Mykonos adalah nama yang sudah mengenal buahnya.",
            "Jika Anda butuh karton untuk restoran, katakan di formulir kontak. Halaman produk untuk punnet.",
          ],
        },
        {
          id: "buy",
          title: "Beli",
          paragraphs: [
            "Katalog adalah panen yang sudah dikemas. Tambahkan yang Anda mau. Keranjang kosong tidak bisa checkout.",
          ],
        },
      ],
    },
  },
  departments: [
    { name: "Kultivasi", body: "Lorong, daftar periksa, buah." },
    { name: "Riset", body: "Meja lab dan catatan siklus." },
    { name: "Operasi", body: "Listrik, pengemasan, dan pintu." },
  ],
  benefits: [
    "Ruangan dengan spesifikasi sungguhan, bukan slogan",
    "Makan sif dari panen yang sama",
    "Jaminan kesehatan dan cuti yang tertulis",
    "Pelatihan pada sistemnya, bukan slide",
  ],
  people: [
    { name: "Sari Wulandari", role: "Lead kultivasi", image: images.aisle },
    { name: "Dimas Pratama", role: "Teknisi riset", image: images.nutrient },
    { name: "Maya Kusuma", role: "Pengemasan", image: images.harvest },
  ],
  roles: [
    {
      slug: "cultivation-associate",
      department: "Kultivasi",
      title: "Asosiat kultivasi",
      location: "Jakarta Barat",
      type: "Penuh waktu",
      summary:
        "Menyusuri lorong, menjaga daftar periksa, dan menyadari saat talang tidak sesuai resep.",
      requirements: [
        "Nyaman berdiri selama satu sif",
        "Teliti dengan urutan tertulis",
        "Bersedia mulai lebih pagi",
      ],
      qualifications: [
        "Pengalaman di rumah kaca, dapur, atau lab diterima dan tidak diwajibkan",
        "Bahasa Indonesia. Bahasa Inggris berguna, bukan syarat",
      ],
    },
    {
      slug: "research-technician",
      department: "Riset",
      title: "Teknisi riset",
      location: "Jakarta Barat",
      type: "Penuh waktu",
      summary:
        "Menjalankan meja dosing, mengarsip pembacaan, dan memberitahu kultivasi saat uji siap.",
      requirements: [
        "Nyaman dengan instrumen dan buku catatan",
        "Kebiasaan mengubah satu hal setiap kali",
      ],
      qualifications: [
        "Latar sains atau pertanian membantu",
        "Anda bisa menjelaskan angka kepada orang yang menanam",
      ],
    },
    {
      slug: "facility-operator",
      department: "Operasi",
      title: "Operator fasilitas",
      location: "Jakarta Barat",
      type: "Penuh waktu",
      summary:
        "Listrik, pendingin, pengemasan, dan kalender yang mengeluarkan buah dari gedung.",
      requirements: [
        "Anda pernah menjaga ruang tanam, gudang, atau dapur tetap jujur",
        "Anda menulis ketika sesuatu rusak",
      ],
      qualifications: ["SIM berguna untuk pengantaran pasar"],
    },
  ],
  faqs: [
    {
      q: "Di mana fasilitasnya?",
      a: "Jakarta Barat, di permukaan laut. Kunjungan terjadwal. Gunakan formulir kontak dan pilih ruangan yang ingin dilihat.",
    },
    {
      q: "Apakah dikirim ke seluruh Indonesia?",
      a: "Ya. Versi ini memakai satu harga kirim dalam rupiah. Pemilih kurir menyusul.",
    },
    {
      q: "Apa artinya habis terjual?",
      a: "Punnet tetap di halaman dengan opasitas lebih rendah dan tidak bisa ditambahkan. Stok kembali saat siklus berikutnya dikemas.",
    },
    {
      q: "Bagaimana pembayarannya?",
      a: "Pilihan yang didesain adalah QRIS dan kartu. Situs ini menampilkan layarnya. Pembayaran belum ditarik.",
    },
    {
      q: "Bisakah melamar tanpa gelar hortikultura?",
      a: "Bisa. Baca perannya. Syaratnya adalah ketelitian pada urutan, bukan sertifikat di dinding.",
    },
    {
      q: "Bahasa apa yang dipakai situs?",
      a: "Bahasa Indonesia dan Inggris. Tata letaknya sama. Ganti dari menu.",
    },
  ],
  legal: {
    privacy: {
      title: "Kebijakan privasi",
      updated: "2 Oktober 2026",
      sections: [
        {
          heading: "Yang kami simpan",
          body: "Jika Anda menulis kepada kami, melamar, atau checkout, kami menyimpan yang Anda ketik: nama, email, telepon, dan alamat kirim. Kata sandi dan nomor kartu tidak disimpan di situs ini.",
        },
        {
          heading: "Untuk apa",
          body: "Untuk membalas Anda, mempertimbangkan lamaran, dan menampilkan pesanan. Kami tidak menjual daftarnya.",
        },
        {
          heading: "Berapa lama",
          body: "Catatan pertanyaan dan lamaran tinggal sampai percakapan selesai, plus arsip singkat sesudahnya. Anda bisa meminta kami menghapusnya.",
        },
      ],
    },
    terms: {
      title: "Syarat dan ketentuan",
      updated: "2 Oktober 2026",
      sections: [
        {
          heading: "Situsnya",
          body: "SooFresh menerbitkan situs publik tentang fasilitas di Jakarta Barat, jurnal, lowongan, dan etalase. Dasbor operator adalah sistem terpisah.",
        },
        {
          heading: "Akun",
          body: "Akun untuk pembeli. Bukan login operator. Keluar meminta konfirmasi, bukan kejutan.",
        },
        {
          heading: "Konten",
          body: "Teks jurnal dan foto milik SooFresh kecuali kredit mengatakan lain.",
        },
      ],
    },
    sale: {
      title: "Syarat penjualan",
      updated: "2 Oktober 2026",
      sections: [
        {
          heading: "Harga",
          body: "Harga dalam rupiah. Pengiriman satu tarif sampai ada ongkir kurir.",
        },
        {
          heading: "Stok",
          body: "Menambah ke keranjang tidak menahan punnet. Barang habis tidak bisa ditambahkan. Pembayaran, saat terhubung, yang mengunci pesanan.",
        },
        {
          heading: "Pengiriman",
          body: "Kami kirim di Indonesia ke alamat yang Anda berikan. Halaman pesanan menampilkan diproses, dikirim, dan sampai.",
        },
      ],
    },
  },
  contactTargets: [
    { value: "general", label: "Umum" },
    { value: "farm", label: "Jelajahi farm" },
    { value: "lab", label: "Kunjungi lab" },
    { value: "visit", label: "Atur kunjungan" },
    { value: "invest", label: "Investasi bersama kami" },
  ],
  orders: [
    {
      number: "SF-10428",
      placed: "18 Sep 2026",
      status: "Dikirim",
      totalIdr: 210000,
      items: [{ name: "Punnet Alpine", qty: 1, unitPriceIdr: 185000 }],
      timeline: [
        { status: "Diproses", date: "18 Sep 2026", current: false },
        { status: "Dikirim", date: "20 Sep 2026", current: true },
        { status: "Sampai", date: null, current: false },
      ],
    },
    {
      number: "SF-10302",
      placed: "02 Agu 2026",
      status: "Sampai",
      totalIdr: 345000,
      items: [{ name: "Punnet dapur", qty: 1, unitPriceIdr: 320000 }],
      timeline: [
        { status: "Diproses", date: "02 Agu 2026", current: false },
        { status: "Dikirim", date: "03 Agu 2026", current: false },
        { status: "Sampai", date: "05 Agu 2026", current: true },
      ],
    },
  ],
};

export function getSite(locale: string) {
  return locale === "en" ? en : id;
}

export function formatIdr(value: number, locale: string) {
  return new Intl.NumberFormat(locale === "id" ? "id-ID" : "en-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}
