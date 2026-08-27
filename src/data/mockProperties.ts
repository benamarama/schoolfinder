import { Property } from '../types';

export const MOCK_SCHOOLS = [
  'Rosyth School',
  'Nanyang Primary School',
  'Raffles Girls\' Primary',
  'Tao Nan School',
  'Henry Park Primary',
  'Catholic High School',
  'CHIJ St. Nicholas Girls\' School',
  'Anglo-Chinese School (Primary)'
];

export const MOCK_PROPERTIES: Property[] = [
  {
    id: 'prop-skyterrace-dawson',
    title: 'SkyTerrace @ Dawson',
    subtitle: '90 Dawson Rd, Queenstown',
    address: '90 Dawson Rd, Queenstown, Singapore 142090',
    price: 1150000,
    psf: 1025,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1324,
    propertyType: 'HDB',
    subCategory: '5-Room Premium',
    tenure: '91 Years Remaining',
    isNewLaunch: true,
    isFreehold: true,
    isProfessionalPick: true,
    schoolName: 'Rosyth School',
    distanceToSchool: '0.8 km from Rosyth',
    distanceKm: 0.8,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWct-WvTH4iOi9JvmrDE2ArcQVbH7ehs69VHZzYNloW3C6Vh_glLVNH4-uVq6rON3oXf03vvzzCpLKUZPsNcPHZROt7TzKwPvgo4VGmUeUObLtprWpbBwTrzVL8mo9qx_lovkeyFZOQjhDHjZJjXmJPgLm4SlSMnHNOjo186Y7i3cTkNTUwCPaQQBf-tzh6KnFjTAZZNlqHbtjKKllwzUEfToKnjG9VuOvP8SpY0xBwOVDPheqyqo',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAWct-WvTH4iOi9JvmrDE2ArcQVbH7ehs69VHZzYNloW3C6Vh_glLVNH4-uVq6rON3oXf03vvzzCpLKUZPsNcPHZROt7TzKwPvgo4VGmUeUObLtprWpbBwTrzVL8mo9qx_lovkeyFZOQjhDHjZJjXmJPgLm4SlSMnHNOjo186Y7i3cTkNTUwCPaQQBf-tzh6KnFjTAZZNlqHbtjKKllwzUEfToKnjG9VuOvP8SpY0xBwOVDPheqyqo',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBhyGOvKWevgLpkZ71X8qYXSCin6Y1YqNbxcPt-7HGXEH4wB1BZX0a5_0WPeYZVo1iebmDVs8i6q-nddLDMpK5c8iYq0WjGXdToQYhBX2vu6K2j_qSPBWugPrKCojZU3qy8D-CcOxrH6yywsCSxlBB8GdK2O4fv0TE-I9ah8uUKnLvfQXLg1Jj2wpp5pavueDbWEEy0ZBpOegqh1eDCxHNQ2HEzZR8oFFLwVOWUQn3OeP1Dl5QfWFA',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDiNbuK6-lnP8c1e-mA-V7JhAxFvpyYqxzX_QVaXskl8OfM1-hf5SNKIO3Yr5J-N_Fe0AJ0dibi8xDnyZcLZJOvxrUGr3S3poSPo4pOxrVU7iQo7l8mAE7NFfeveXlLNGCiAr0mxohT6eD9KnoRd7ddrGVV1uAh24UQtOgOvtjvmnphWUfsjNKCJHaqbnLVHNZtuj384ijIokZF-CLAZNGni2VkyNuxqeAOxf5SU9_TehvgHCAFIs0'
    ],
    hdbTown: 'Queenstown',
    flatType: '5-Room Premium',
    leaseStartYear: 2016,
    remainingLeaseYears: 91,
    schoolsProximity: [
      {
        school: 'Nanyang Primary School',
        distance: 'Within 1km',
        psf: 1025
      },
      {
        school: 'Raffles Girls\' Primary',
        distance: 'Within 2km',
        psf: 1025
      },
      {
        school: 'Queenstown Primary School',
        distance: 'Within 1km',
        psf: 990
      }
    ],
    locationName: 'The Interlace, Singapore',
    mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwPdu8jIDLC14PneG-cKG5I_5WQguwWjl-6U0x1I_0upcv1LqR-irdCFxizJ-0IwuSgnMSSsmpVQAHLRowHCB89N6V-gr2OfxqyS_P9GVKpQViVPv5IZjh19spnckaDmFeAyf6o4mdN3OBBWDxbMTe8QBuMyaDA779BkUjZxWlpkVPCqlW0QPNhZoF4ZwxJ4467cTUyPiF45W1KOthQgM9WSq3InPW0WOjnQEVnQnS0eyEL54Jy4Y',
    coordinates: {
      lat: 1.2952,
      lng: 103.8055
    },
    recentTransactions: [
      {
        block: 'Blk 91 Dawson Rd',
        type: '5-Room • High Floor',
        price: 1120000,
        date: 'Oct 2023',
        psf: 998
      },
      {
        block: 'Blk 90 Dawson Rd',
        type: '4-Room • Mid Floor',
        price: 945000,
        date: 'Sep 2023',
        psf: 980
      },
      {
        block: 'Blk 92 Dawson Rd',
        type: '5-Room • Loft Unit',
        price: 1250000,
        date: 'Jul 2023',
        psf: 1080
      },
      {
        block: 'Blk 89 Dawson Rd',
        type: '4-Room • High Floor',
        price: 968000,
        date: 'May 2023',
        psf: 985
      }
    ],
    marketInsights: {
      professionalInsight: "Queenstown remains a high-demand district. The proximity to Nanyang Primary adds a significant 'school premium' to this unit. With the remaining 91-year lease, this property offers strong capital preservation potential compared to older HDBs in the area.",
      askingPsf: 1025,
      recentAvgPsf: 980,
      diffPercent: 4.5,
      historicalTrend: [
        { year: '2019', psf: 840, volume: 18, avgRent: 3200 },
        { year: '2020', psf: 875, volume: 24, avgRent: 3400 },
        { year: '2021', psf: 920, volume: 32, avgRent: 3800 },
        { year: '2022', psf: 965, volume: 29, avgRent: 4200 },
        { year: '2023', psf: 1010, volume: 36, avgRent: 4600 },
        { year: '2024', psf: 1025, volume: 28, avgRent: 4800 }
      ]
    },
    description: "Experience unparalleled architectural brilliance at The Interlace. This high-floor 3-bedroom unit offers expansive views, a functional layout, and meticulous attention to detail. Designed by OMA, the development is renowned for its 31 stacked blocks, creating extensive roof gardens and landscaped terraces. High ceilings, floor-to-ceiling windows, and generous natural airflow make this a prized trophy home in Queenstown.",
    facilities: [
      '50m Lap Pool',
      'Gymnasium',
      'Tennis Court',
      'Sky Gardens',
      'Children\'s Playground',
      'BBQ Dining Pavilions',
      'Clubhouse & Function Rooms'
    ],
    agent: {
      name: 'Marcus Tan',
      title: 'PropRadius Lead Agent',
      agency: 'PropRadius Real Estate PTE LTD',
      phone: '+65 9123 4567',
      email: 'marcus.tan@propradius.sg',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCD4TSeIXsUNZReUSMDy8_D_1hRz5Il45cmuTUfI6a_y3giK2GTPqXOBr1tq3yyd4IshxEq6HF04Pk46jJCfqAddfhI6CyhcesPszEGUZtS8n4FwdG2DkzzlQ86SHNPk7dbe8Nx8jLrhrsJPKDAZeZqvrv-PN6M4tfLKAucz404tJBtfkzU_SYcCnUrdQ2F94N9ovwqd9eGZyZURAeXIcwbqHoHEAmt0GzkfF-yOjWmkAtwh8jlSj0',
      rating: 4.9,
      dealsClosed: 84,
      ceaRegNo: 'R048291A'
    }
  },
  {
    id: 'prop-parc-regency',
    title: 'Parc Regency',
    subtitle: 'Serangoon North Ave 1',
    address: '18 Serangoon North Ave 1, Singapore 555890',
    price: 1450000,
    psf: 1850,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 785,
    propertyType: 'Private',
    subCategory: 'Condominium',
    tenure: '99-year Leasehold',
    isNewLaunch: true,
    isProfessionalPick: true,
    schoolName: 'Rosyth School',
    distanceToSchool: '0.4 km from Rosyth',
    distanceKm: 0.4,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJTl26YwiwO4aeLY9k8FpoRNDkrSc54cDvu6HMdHez2Wb0bW47yjZtZQQhY8tB9lDYrUyQwfoq4uy6gGT_Fizk1ueaYUVtHT_35BegazGcJgNCp52yEuf_lo8oELD6UzuRbP7ydiv4ECVeX9JKXbrB5KDOqqmUAzDYBsA6PeHO0_Rg65EebjiPJCJUh8qZEIWRA8KVZ9DUTl0yVGwnWeACPsDom8ck-GXKNbsStvTSwuTvpkV9Pec',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDJTl26YwiwO4aeLY9k8FpoRNDkrSc54cDvu6HMdHez2Wb0bW47yjZtZQQhY8tB9lDYrUyQwfoq4uy6gGT_Fizk1ueaYUVtHT_35BegazGcJgNCp52yEuf_lo8oELD6UzuRbP7ydiv4ECVeX9JKXbrB5KDOqqmUAzDYBsA6PeHO0_Rg65EebjiPJCJUh8qZEIWRA8KVZ9DUTl0yVGwnWeACPsDom8ck-GXKNbsStvTSwuTvpkV9Pec',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDiNbuK6-lnP8c1e-mA-V7JhAxFvpyYqxzX_QVaXskl8OfM1-hf5SNKIO3Yr5J-N_Fe0AJ0dibi8xDnyZcLZJOvxrUGr3S3poSPo4pOxrVU7iQo7l8mAE7NFfeveXlLNGCiAr0mxohT6eD9KnoRd7ddrGVV1uAh24UQtOgOvtjvmnphWUfsjNKCJHaqbnLVHNZtuj384ijIokZF-CLAZNGni2VkyNuxqeAOxf5SU9_TehvgHCAFIs0',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBhyGOvKWevgLpkZ71X8qYXSCin6Y1YqNbxcPt-7HGXEH4wB1BZX0a5_0WPeYZVo1iebmDVs8i6q-nddLDMpK5c8iYq0WjGXdToQYhBX2vu6K2j_qSPBWugPrKCojZU3qy8D-CcOxrH6yywsCSxlBB8GdK2O4fv0TE-I9ah8uUKnLvfQXLg1Jj2wpp5pavueDbWEEy0ZBpOegqh1eDCxHNQ2HEzZR8oFFLwVOWUQn3OeP1Dl5QfWFA'
    ],
    hdbTown: 'Serangoon',
    flatType: 'Private Condominium',
    leaseStartYear: 2021,
    remainingLeaseYears: 96,
    schoolsProximity: [
      {
        school: 'Rosyth School',
        distance: 'Within 0.5km (Priority 1)',
        psf: 1850
      },
      {
        school: 'Zhonghua Primary',
        distance: 'Within 1.5km',
        psf: 1780
      },
      {
        school: 'CHIK Our Lady of Good Counsel',
        distance: 'Within 2km',
        psf: 1820
      }
    ],
    locationName: 'Serangoon North, Singapore',
    coordinates: {
      lat: 1.3712,
      lng: 103.8745
    },
    recentTransactions: [
      {
        block: 'Tower 2 #11-04',
        type: '3-Bed Compact',
        price: 1420000,
        date: 'Nov 2023',
        psf: 1808
      },
      {
        block: 'Tower 1 #08-02',
        type: '3-Bed Premium',
        price: 1465000,
        date: 'Sep 2023',
        psf: 1866
      },
      {
        block: 'Tower 3 #15-01',
        type: '2-Bed + Study',
        price: 1220000,
        date: 'Aug 2023',
        psf: 1890
      }
    ],
    marketInsights: {
      professionalInsight: "Immediate 1km radius eligibility to Rosyth School offers exceptional secondary market liquidity. Entry price under $1.5M for a 3-bedder represents great entry value relative to OCR new launches averaging $2,100 PSF in 2024.",
      askingPsf: 1850,
      recentAvgPsf: 1820,
      diffPercent: 1.6,
      historicalTrend: [
        { year: '2020', psf: 1580, volume: 45, avgRent: 3800 },
        { year: '2021', psf: 1650, volume: 52, avgRent: 4100 },
        { year: '2022', psf: 1740, volume: 38, avgRent: 4500 },
        { year: '2023', psf: 1820, volume: 41, avgRent: 4900 },
        { year: '2024', psf: 1850, volume: 34, avgRent: 5200 }
      ]
    },
    description: "Nestled in the prime landed enclave of Serangoon Gardens vicinity, Parc Regency is designed with resort-inspired landscaping and smart home automation. Situated within a 5-minute stroll to Rosyth School and Serangoon Gardens Market (Chomp Chomp).",
    facilities: [
      '50m Infinity Pool',
      'Hydrotherapy Pavilion',
      'Sky Tennis Court',
      'Clubhouse with Dining Suites',
      'Smart Parcel Locker',
      'Electric Vehicle Chargers'
    ],
    agent: {
      name: 'Marcus Tan',
      title: 'PropRadius Lead Agent',
      agency: 'PropRadius Real Estate PTE LTD',
      phone: '+65 9123 4567',
      email: 'marcus.tan@propradius.sg',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCD4TSeIXsUNZReUSMDy8_D_1hRz5Il45cmuTUfI6a_y3giK2GTPqXOBr1tq3yyd4IshxEq6HF04Pk46jJCfqAddfhI6CyhcesPszEGUZtS8n4FwdG2DkzzlQ86SHNPk7dbe8Nx8jLrhrsJPKDAZeZqvrv-PN6M4tfLKAucz404tJBtfkzU_SYcCnUrdQ2F94N9ovwqd9eGZyZURAeXIcwbqHoHEAmt0GzkfF-yOjWmkAtwh8jlSj0',
      rating: 4.9,
      dealsClosed: 84,
      ceaRegNo: 'R048291A'
    }
  },
  {
    id: 'prop-serangoon-north-ave-4',
    title: 'Serangoon North Ave 4',
    subtitle: 'Blk 532, 4-Room Flat',
    address: 'Blk 532 Serangoon North Ave 4, Singapore 550532',
    price: 580000,
    psf: 539,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1076,
    propertyType: 'HDB',
    subCategory: '4-Room Model A',
    tenure: '72 years left',
    isNewLaunch: false,
    isProfessionalPick: false,
    schoolName: 'Rosyth School',
    distanceToSchool: '0.6 km from Rosyth',
    distanceKm: 0.6,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhyGOvKWevgLpkZ71X8qYXSCin6Y1YqNbxcPt-7HGXEH4wB1BZX0a5_0WPeYZVo1iebmDVs8i6q-nddLDMpK5c8iYq0WjGXdToQYhBX2vu6K2j_qSPBWugPrKCojZU3qy8D-CcOxrH6yywsCSxlBB8GdK2O4fv0TE-I9ah8uUKnLvfQXLg1Jj2wpp5pavueDbWEEy0ZBpOegqh1eDCxHNQ2HEzZR8oFFLwVOWUQn3OeP1Dl5QfWFA',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBhyGOvKWevgLpkZ71X8qYXSCin6Y1YqNbxcPt-7HGXEH4wB1BZX0a5_0WPeYZVo1iebmDVs8i6q-nddLDMpK5c8iYq0WjGXdToQYhBX2vu6K2j_qSPBWugPrKCojZU3qy8D-CcOxrH6yywsCSxlBB8GdK2O4fv0TE-I9ah8uUKnLvfQXLg1Jj2wpp5pavueDbWEEy0ZBpOegqh1eDCxHNQ2HEzZR8oFFLwVOWUQn3OeP1Dl5QfWFA',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDJTl26YwiwO4aeLY9k8FpoRNDkrSc54cDvu6HMdHez2Wb0bW47yjZtZQQhY8tB9lDYrUyQwfoq4uy6gGT_Fizk1ueaYUVtHT_35BegazGcJgNCp52yEuf_lo8oELD6UzuRbP7ydiv4ECVeX9JKXbrB5KDOqqmUAzDYBsA6PeHO0_Rg65EebjiPJCJUh8qZEIWRA8KVZ9DUTl0yVGwnWeACPsDom8ck-GXKNbsStvTSwuTvpkV9Pec'
    ],
    hdbTown: 'Serangoon',
    flatType: '4-Room Flat',
    leaseStartYear: 1997,
    remainingLeaseYears: 72,
    schoolsProximity: [
      {
        school: 'Rosyth School',
        distance: 'Within 1km',
        psf: 539
      },
      {
        school: 'Bowen Secondary',
        distance: 'Within 0.8km',
        psf: 520
      }
    ],
    locationName: 'Serangoon North Ave 4',
    coordinates: {
      lat: 1.3734,
      lng: 103.8762
    },
    recentTransactions: [
      {
        block: 'Blk 532 #07-12',
        type: '4-Room • Mid Floor',
        price: 575000,
        date: 'Oct 2023',
        psf: 534
      },
      {
        block: 'Blk 531 #11-08',
        type: '4-Room • High Floor',
        price: 595000,
        date: 'Aug 2023',
        psf: 553
      }
    ],
    marketInsights: {
      professionalInsight: "Rare point block layout with only 4 units per floor ensuring utmost privacy. At $539 PSF, this is one of the most accessible entry tickets into Rosyth 1km primary admission balloting.",
      askingPsf: 539,
      recentAvgPsf: 545,
      diffPercent: -1.1,
      historicalTrend: [
        { year: '2020', psf: 430, volume: 12, avgRent: 2400 },
        { year: '2021', psf: 460, volume: 16, avgRent: 2600 },
        { year: '2022', psf: 495, volume: 14, avgRent: 2900 },
        { year: '2023', psf: 535, volume: 19, avgRent: 3200 },
        { year: '2024', psf: 539, volume: 11, avgRent: 3400 }
      ]
    },
    description: "Well-maintained 4-Room Model A unit featuring a squarish layout with no odd corners. Modern minimalist renovation with newly upgraded bathrooms and kitchen. Conveniently located near amenities, coffee shops, and express bus services to CBD.",
    facilities: [
      'Multi-Storey Carpark with Linkbridge',
      'Sheltered Walkway to Bus Stop',
      'Neighbourhood Park & Fitness Corner',
      'Resident Precinct Pavilion'
    ],
    agent: {
      name: 'Marcus Tan',
      title: 'PropRadius Lead Agent',
      agency: 'PropRadius Real Estate PTE LTD',
      phone: '+65 9123 4567',
      email: 'marcus.tan@propradius.sg',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCD4TSeIXsUNZReUSMDy8_D_1hRz5Il45cmuTUfI6a_y3giK2GTPqXOBr1tq3yyd4IshxEq6HF04Pk46jJCfqAddfhI6CyhcesPszEGUZtS8n4FwdG2DkzzlQ86SHNPk7dbe8Nx8jLrhrsJPKDAZeZqvrv-PN6M4tfLKAucz404tJBtfkzU_SYcCnUrdQ2F94N9ovwqd9eGZyZURAeXIcwbqHoHEAmt0GzkfF-yOjWmkAtwh8jlSj0',
      rating: 4.9,
      dealsClosed: 84,
      ceaRegNo: 'R048291A'
    }
  },
  {
    id: 'prop-affinity-at-serangoon',
    title: 'Affinity at Serangoon',
    subtitle: 'Serangoon North Ave 1',
    address: '10 Serangoon North Ave 1, Singapore 555894',
    price: 2100000,
    psf: 1890,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 1152,
    propertyType: 'Private',
    subCategory: 'Luxury Condominium',
    tenure: 'Freehold',
    isNewLaunch: false,
    isFreehold: true,
    isProfessionalPick: true,
    schoolName: 'Rosyth School',
    distanceToSchool: '0.9 km from Rosyth',
    distanceKm: 0.9,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiNbuK6-lnP8c1e-mA-V7JhAxFvpyYqxzX_QVaXskl8OfM1-hf5SNKIO3Yr5J-N_Fe0AJ0dibi8xDnyZcLZJOvxrUGr3S3poSPo4pOxrVU7iQo7l8mAE7NFfeveXlLNGCiAr0mxohT6eD9KnoRd7ddrGVV1uAh24UQtOgOvtjvmnphWUfsjNKCJHaqbnLVHNZtuj384ijIokZF-CLAZNGni2VkyNuxqeAOxf5SU9_TehvgHCAFIs0',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDiNbuK6-lnP8c1e-mA-V7JhAxFvpyYqxzX_QVaXskl8OfM1-hf5SNKIO3Yr5J-N_Fe0AJ0dibi8xDnyZcLZJOvxrUGr3S3poSPo4pOxrVU7iQo7l8mAE7NFfeveXlLNGCiAr0mxohT6eD9KnoRd7ddrGVV1uAh24UQtOgOvtjvmnphWUfsjNKCJHaqbnLVHNZtuj384ijIokZF-CLAZNGni2VkyNuxqeAOxf5SU9_TehvgHCAFIs0',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDJTl26YwiwO4aeLY9k8FpoRNDkrSc54cDvu6HMdHez2Wb0bW47yjZtZQQhY8tB9lDYrUyQwfoq4uy6gGT_Fizk1ueaYUVtHT_35BegazGcJgNCp52yEuf_lo8oELD6UzuRbP7ydiv4ECVeX9JKXbrB5KDOqqmUAzDYBsA6PeHO0_Rg65EebjiPJCJUh8qZEIWRA8KVZ9DUTl0yVGwnWeACPsDom8ck-GXKNbsStvTSwuTvpkV9Pec'
    ],
    hdbTown: 'Serangoon',
    flatType: '4-Bedroom Premium',
    leaseStartYear: 2022,
    remainingLeaseYears: 999, // Freehold representation
    schoolsProximity: [
      {
        school: 'Rosyth School',
        distance: 'Within 1km',
        psf: 1890
      },
      {
        school: 'Zhonghua Primary',
        distance: 'Within 1.2km',
        psf: 1850
      },
      {
        school: 'Peicai Secondary',
        distance: 'Within 1.5km',
        psf: 1810
      }
    ],
    locationName: 'Serangoon North Ave 1',
    coordinates: {
      lat: 1.3698,
      lng: 103.8732
    },
    recentTransactions: [
      {
        block: 'Block 26 #12-01',
        type: '4-Bed Premium',
        price: 2080000,
        date: 'Nov 2023',
        psf: 1872
      },
      {
        block: 'Block 28 #09-04',
        type: '3-Bed + Utility',
        price: 1820000,
        date: 'Oct 2023',
        psf: 1895
      }
    ],
    marketInsights: {
      professionalInsight: "Rare Freehold mega-development with unmatched landscape gardens and proximity to future Serangoon North MRT station (Cross Island Line). High rental demand from international school faculties nearby.",
      askingPsf: 1890,
      recentAvgPsf: 1880,
      diffPercent: 0.5,
      historicalTrend: [
        { year: '2020', psf: 1520, volume: 88, avgRent: 4500 },
        { year: '2021', psf: 1640, volume: 94, avgRent: 4900 },
        { year: '2022', psf: 1780, volume: 76, avgRent: 5500 },
        { year: '2023', psf: 1880, volume: 62, avgRent: 6000 },
        { year: '2024', psf: 1890, volume: 45, avgRent: 6200 }
      ]
    },
    description: "Spectacular 4-bedroom pool-facing corner unit featuring high ceiling and private lift access. Enjoy 88 lifestyle facilities including 50m Olympic-length lap pool, floating boardwalks, sanctuary pavilions, and comprehensive wellness sanctuaries.",
    facilities: [
      '50m Olympic Lap Pool',
      'Floating Gym & Aqua Gym',
      'Tennis Court',
      'Alfresco Teppanyaki Pavilions',
      'Pets Pod & Reflexology Path',
      'Kids Water Play Zone'
    ],
    agent: {
      name: 'Marcus Tan',
      title: 'PropRadius Lead Agent',
      agency: 'PropRadius Real Estate PTE LTD',
      phone: '+65 9123 4567',
      email: 'marcus.tan@propradius.sg',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCD4TSeIXsUNZReUSMDy8_D_1hRz5Il45cmuTUfI6a_y3giK2GTPqXOBr1tq3yyd4IshxEq6HF04Pk46jJCfqAddfhI6CyhcesPszEGUZtS8n4FwdG2DkzzlQ86SHNPk7dbe8Nx8jLrhrsJPKDAZeZqvrv-PN6M4tfLKAucz404tJBtfkzU_SYcCnUrdQ2F94N9ovwqd9eGZyZURAeXIcwbqHoHEAmt0GzkfF-yOjWmkAtwh8jlSj0',
      rating: 4.9,
      dealsClosed: 84,
      ceaRegNo: 'R048291A'
    }
  },
  {
    id: 'prop-the-interlace',
    title: 'The Interlace',
    subtitle: 'Depot Road, Bukit Merah',
    address: '180 Depot Road, Singapore 109684',
    price: 2450000,
    psf: 1680,
    bedrooms: 3,
    bathrooms: 3,
    sqft: 1458,
    propertyType: 'Private',
    subCategory: 'Architectural Condominium',
    tenure: '99-year Leasehold',
    isNewLaunch: false,
    isProfessionalPick: true,
    schoolName: 'Rosyth School',
    distanceToSchool: '1.4 km from Rosyth',
    distanceKm: 1.4,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWct-WvTH4iOi9JvmrDE2ArcQVbH7ehs69VHZzYNloW3C6Vh_glLVNH4-uVq6rON3oXf03vvzzCpLKUZPsNcPHZROt7TzKwPvgo4VGmUeUObLtprWpbBwTrzVL8mo9qx_lovkeyFZOQjhDHjZJjXmJPgLm4SlSMnHNOjo186Y7i3cTkNTUwCPaQQBf-tzh6KnFjTAZZNlqHbtjKKllwzUEfToKnjG9VuOvP8SpY0xBwOVDPheqyqo',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAWct-WvTH4iOi9JvmrDE2ArcQVbH7ehs69VHZzYNloW3C6Vh_glLVNH4-uVq6rON3oXf03vvzzCpLKUZPsNcPHZROt7TzKwPvgo4VGmUeUObLtprWpbBwTrzVL8mo9qx_lovkeyFZOQjhDHjZJjXmJPgLm4SlSMnHNOjo186Y7i3cTkNTUwCPaQQBf-tzh6KnFjTAZZNlqHbtjKKllwzUEfToKnjG9VuOvP8SpY0xBwOVDPheqyqo'
    ],
    hdbTown: 'Bukit Merah',
    flatType: '3-Bedroom Penthouse Unit',
    leaseStartYear: 2013,
    remainingLeaseYears: 88,
    schoolsProximity: [
      {
        school: 'Blangah Rise Primary',
        distance: 'Within 0.7km',
        psf: 1650
      },
      {
        school: 'Radin Mas Primary',
        distance: 'Within 1.8km',
        psf: 1720
      }
    ],
    locationName: 'Depot Road, Singapore',
    coordinates: {
      lat: 1.2825,
      lng: 103.8038
    },
    recentTransactions: [
      {
        block: 'Block 210 #18-02',
        type: '3-Bed Garden Suite',
        price: 2400000,
        date: 'Oct 2023',
        psf: 1660
      }
    ],
    marketInsights: {
      professionalInsight: "World Building of the Year winner. Iconic architecture that continually attracts expatriates and design purists. Superb rental yield of 4.2% in District 04.",
      askingPsf: 1680,
      recentAvgPsf: 1640,
      diffPercent: 2.4,
      historicalTrend: [
        { year: '2020', psf: 1380, volume: 32, avgRent: 5500 },
        { year: '2021', psf: 1450, volume: 38, avgRent: 6000 },
        { year: '2022', psf: 1560, volume: 44, avgRent: 6800 },
        { year: '2023', psf: 1640, volume: 41, avgRent: 7200 },
        { year: '2024', psf: 1680, volume: 30, avgRent: 7500 }
      ]
    },
    description: "Designed by Ole Scheeren and OMA, featuring hexagonal courtyard networks that maximize wind corridors and natural light. Expansive living spaces overlooking lush Southern Ridges greenery.",
    facilities: [
      '50m Lap Pool',
      'Water Park Zone',
      '3 Tennis Courts',
      'Putting Green',
      'Billiards Room',
      'Sky Terraces'
    ],
    agent: {
      name: 'Marcus Tan',
      title: 'PropRadius Lead Agent',
      agency: 'PropRadius Real Estate PTE LTD',
      phone: '+65 9123 4567',
      email: 'marcus.tan@propradius.sg',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCD4TSeIXsUNZReUSMDy8_D_1hRz5Il45cmuTUfI6a_y3giK2GTPqXOBr1tq3yyd4IshxEq6HF04Pk46jJCfqAddfhI6CyhcesPszEGUZtS8n4FwdG2DkzzlQ86SHNPk7dbe8Nx8jLrhrsJPKDAZeZqvrv-PN6M4tfLKAucz404tJBtfkzU_SYcCnUrdQ2F94N9ovwqd9eGZyZURAeXIcwbqHoHEAmt0GzkfF-yOjWmkAtwh8jlSj0',
      rating: 4.9,
      dealsClosed: 84,
      ceaRegNo: 'R048291A'
    }
  }
];

export const PROPRADIUS_LOGO_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAP16V0HwDBx1x2Uk9GX0wMGqdYJ4-wGi9cMf5b0QFHhrzp-qpZbofrQmNozXlFXPfzkh1VD9HFIr9y32fzfU9RjgBgOFBHFpqVAfeMfrVfiyBGNdHm5bmkdI0tXI2eV-LRTH90nWo-qrcZXLAailVdmDKFOuJgt6uC27-PukXpA0G72_q7T1Jy7n7mrTjaksHbiTkg3ns1uVvBML8eu4vUt1EBIyz6G8UWX3SgJmROjGF05Ze3LPc';
