import { Property } from '../types';
import { ALL_SCHOOL_NAMES, ALL_SINGAPORE_PRIMARY_SCHOOLS, calculateDistanceKm, getSchoolByName } from './singaporeSchools';

// Export all Singapore Primary Schools (185+ schools)
export const MOCK_SCHOOLS = ALL_SCHOOL_NAMES;

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
    isFreehold: false,
    isProfessionalPick: true,
    schoolName: 'Queenstown Primary School',
    distanceToSchool: '0.5 km from Queenstown Primary',
    distanceKm: 0.5,
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
        school: 'Queenstown Primary School',
        distance: 'Within 0.5km (Priority 1)',
        psf: 990
      },
      {
        school: 'New Town Primary School',
        distance: 'Within 1.1km',
        psf: 980
      },
      {
        school: 'Nanyang Primary School',
        distance: 'Within 2.8km',
        psf: 1025
      }
    ],
    locationName: 'SkyTerrace @ Dawson, Queenstown',
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
      }
    ],
    marketInsights: {
      professionalInsight: "Queenstown remains a high-demand central district. Immediate proximity to Queenstown Primary adds strong balloting appeal. With 91 years lease remaining, this property offers strong capital preservation.",
      askingPsf: 1025,
      recentAvgPsf: 980,
      diffPercent: 4.5,
      historicalTrend: [
        { year: '2020', psf: 875, volume: 24, avgRent: 3400 },
        { year: '2021', psf: 920, volume: 32, avgRent: 3800 },
        { year: '2022', psf: 965, volume: 29, avgRent: 4200 },
        { year: '2023', psf: 1010, volume: 36, avgRent: 4600 },
        { year: '2024', psf: 1025, volume: 28, avgRent: 4800 }
      ]
    },
    description: "Award-winning iconic development in Queenstown featuring sky bridges, lush gardens, and panoramic city views. Designed by SCDA Architects with high-ceiling living and dining areas.",
    facilities: [
      'Sky Gardens & Terraces',
      'Children\'s Playground',
      'Fitness Corners',
      'Covered Linkways to MRT',
      'Multi-Storey Carpark with EV Lots'
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
    subtitle: '18 Serangoon North Ave 1',
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
    isFreehold: false,
    isProfessionalPick: true,
    schoolName: 'Rosyth School',
    distanceToSchool: '0.4 km from Rosyth School',
    distanceKm: 0.4,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJTl26YwiwO4aeLY9k8FpoRNDkrSc54cDvu6HMdHez2Wb0bW47yjZtZQQhY8tB9lDYrUyQwfoq4uy6gGT_Fizk1ueaYUVtHT_35BegazGcJgNCp52yEuf_lo8oELD6UzuRbP7ydiv4ECVeX9JKXbrB5KDOqqmUAzDYBsA6PeHO0_Rg65EebjiPJCJUh8qZEIWRA8KVZ9DUTl0yVGwnWeACPsDom8ck-GXKNbsStvTSwuTvpkV9Pec',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDJTl26YwiwO4aeLY9k8FpoRNDkrSc54cDvu6HMdHez2Wb0bW47yjZtZQQhY8tB9lDYrUyQwfoq4uy6gGT_Fizk1ueaYUVtHT_35BegazGcJgNCp52yEuf_lo8oELD6UzuRbP7ydiv4ECVeX9JKXbrB5KDOqqmUAzDYBsA6PeHO0_Rg65EebjiPJCJUh8qZEIWRA8KVZ9DUTl0yVGwnWeACPsDom8ck-GXKNbsStvTSwuTvpkV9Pec',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDiNbuK6-lnP8c1e-mA-V7JhAxFvpyYqxzX_QVaXskl8OfM1-hf5SNKIO3Yr5J-N_Fe0AJ0dibi8xDnyZcLZJOvxrUGr3S3poSPo4pOxrVU7iQo7l8mAE7NFfeveXlLNGCiAr0mxohT6eD9KnoRd7ddrGVV1uAh24UQtOgOvtjvmnphWUfsjNKCJHaqbnLVHNZtuj384ijIokZF-CLAZNGni2VkyNuxqeAOxf5SU9_TehvgHCAFIs0'
    ],
    hdbTown: 'Serangoon',
    flatType: 'Private Condominium',
    leaseStartYear: 2021,
    remainingLeaseYears: 96,
    schoolsProximity: [
      {
        school: 'Rosyth School',
        distance: 'Within 0.4km (Priority 1)',
        psf: 1850
      },
      {
        school: 'Zhonghua Primary School',
        distance: 'Within 1.4km',
        psf: 1780
      },
      {
        school: 'CHIJ Our Lady of Good Counsel',
        distance: 'Within 1.8km',
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
      }
    ],
    marketInsights: {
      professionalInsight: "Immediate 1km radius eligibility to Rosyth School offers exceptional secondary market liquidity. Entry price under $1.5M for a 3-bedder represents great value relative to OCR new launches.",
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
    description: "Nestled in the prime landed enclave of Serangoon Gardens vicinity, Parc Regency is designed with resort-inspired landscaping and smart home automation. Situated within a 5-minute stroll to Rosyth School.",
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
    isFreehold: false,
    isProfessionalPick: false,
    schoolName: 'Rosyth School',
    distanceToSchool: '0.6 km from Rosyth School',
    distanceKm: 0.6,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhyGOvKWevgLpkZ71X8qYXSCin6Y1YqNbxcPt-7HGXEH4wB1BZX0a5_0WPeYZVo1iebmDVs8i6q-nddLDMpK5c8iYq0WjGXdToQYhBX2vu6K2j_qSPBWugPrKCojZU3qy8D-CcOxrH6yywsCSxlBB8GdK2O4fv0TE-I9ah8uUKnLvfQXLg1Jj2wpp5pavueDbWEEy0ZBpOegqh1eDCxHNQ2HEzZR8oFFLwVOWUQn3OeP1Dl5QfWFA',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBhyGOvKWevgLpkZ71X8qYXSCin6Y1YqNbxcPt-7HGXEH4wB1BZX0a5_0WPeYZVo1iebmDVs8i6q-nddLDMpK5c8iYq0WjGXdToQYhBX2vu6K2j_qSPBWugPrKCojZU3qy8D-CcOxrH6yywsCSxlBB8GdK2O4fv0TE-I9ah8uUKnLvfQXLg1Jj2wpp5pavueDbWEEy0ZBpOegqh1eDCxHNQ2HEzZR8oFFLwVOWUQn3OeP1Dl5QfWFA'
    ],
    hdbTown: 'Serangoon',
    flatType: '4-Room Flat',
    leaseStartYear: 1997,
    remainingLeaseYears: 72,
    schoolsProximity: [
      {
        school: 'Rosyth School',
        distance: 'Within 0.6km (Priority 1)',
        psf: 539
      },
      {
        school: 'Zhonghua Primary School',
        distance: 'Within 1.5km',
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
      }
    ],
    marketInsights: {
      professionalInsight: "Rare point block layout with high privacy. At $539 PSF, this is one of the most accessible entry tickets into Rosyth 1km primary admission balloting.",
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
    description: "Well-maintained 4-Room Model A unit featuring a squarish layout with no odd corners. Modern minimalist renovation with newly upgraded bathrooms and kitchen.",
    facilities: [
      'Multi-Storey Carpark with Linkbridge',
      'Sheltered Walkway to Bus Stop',
      'Neighbourhood Park & Fitness Corner'
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
    subtitle: '10 Serangoon North Ave 1',
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
    distanceToSchool: '0.8 km from Rosyth School',
    distanceKm: 0.8,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiNbuK6-lnP8c1e-mA-V7JhAxFvpyYqxzX_QVaXskl8OfM1-hf5SNKIO3Yr5J-N_Fe0AJ0dibi8xDnyZcLZJOvxrUGr3S3poSPo4pOxrVU7iQo7l8mAE7NFfeveXlLNGCiAr0mxohT6eD9KnoRd7ddrGVV1uAh24UQtOgOvtjvmnphWUfsjNKCJHaqbnLVHNZtuj384ijIokZF-CLAZNGni2VkyNuxqeAOxf5SU9_TehvgHCAFIs0',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDiNbuK6-lnP8c1e-mA-V7JhAxFvpyYqxzX_QVaXskl8OfM1-hf5SNKIO3Yr5J-N_Fe0AJ0dibi8xDnyZcLZJOvxrUGr3S3poSPo4pOxrVU7iQo7l8mAE7NFfeveXlLNGCiAr0mxohT6eD9KnoRd7ddrGVV1uAh24UQtOgOvtjvmnphWUfsjNKCJHaqbnLVHNZtuj384ijIokZF-CLAZNGni2VkyNuxqeAOxf5SU9_TehvgHCAFIs0'
    ],
    hdbTown: 'Serangoon',
    flatType: '4-Bedroom Premium',
    leaseStartYear: 2022,
    remainingLeaseYears: 999,
    schoolsProximity: [
      {
        school: 'Rosyth School',
        distance: 'Within 0.8km (Priority 1)',
        psf: 1890
      },
      {
        school: 'Zhonghua Primary School',
        distance: 'Within 1.3km',
        psf: 1850
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
      }
    ],
    marketInsights: {
      professionalInsight: "Rare mega-development near future Serangoon North MRT station (Cross Island Line). High rental demand from international families.",
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
    description: "Spectacular 4-bedroom pool-facing corner unit featuring high ceiling and private lift access. Enjoy 88 lifestyle facilities including 50m Olympic-length lap pool.",
    facilities: [
      '50m Olympic Lap Pool',
      'Floating Gym & Aqua Gym',
      'Tennis Court',
      'Alfresco Teppanyaki Pavilions'
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
    id: 'prop-duchess-residences',
    title: 'Duchess Residences',
    subtitle: 'Duchess Walk, Bukit Timah',
    address: '10 Duchess Walk, Singapore 269046',
    price: 3350000,
    psf: 2380,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 1408,
    propertyType: 'Private',
    subCategory: 'Prime District 10 Condo',
    tenure: 'Freehold',
    isNewLaunch: false,
    isFreehold: true,
    isProfessionalPick: true,
    schoolName: 'Nanyang Primary School',
    distanceToSchool: '0.4 km from Nanyang Primary',
    distanceKm: 0.4,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWct-WvTH4iOi9JvmrDE2ArcQVbH7ehs69VHZzYNloW3C6Vh_glLVNH4-uVq6rON3oXf03vvzzCpLKUZPsNcPHZROt7TzKwPvgo4VGmUeUObLtprWpbBwTrzVL8mo9qx_lovkeyFZOQjhDHjZJjXmJPgLm4SlSMnHNOjo186Y7i3cTkNTUwCPaQQBf-tzh6KnFjTAZZNlqHbtjKKllwzUEfToKnjG9VuOvP8SpY0xBwOVDPheqyqo',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAWct-WvTH4iOi9JvmrDE2ArcQVbH7ehs69VHZzYNloW3C6Vh_glLVNH4-uVq6rON3oXf03vvzzCpLKUZPsNcPHZROt7TzKwPvgo4VGmUeUObLtprWpbBwTrzVL8mo9qx_lovkeyFZOQjhDHjZJjXmJPgLm4SlSMnHNOjo186Y7i3cTkNTUwCPaQQBf-tzh6KnFjTAZZNlqHbtjKKllwzUEfToKnjG9VuOvP8SpY0xBwOVDPheqyqo'
    ],
    hdbTown: 'Bukit Timah',
    flatType: 'District 10 Luxury Condo',
    leaseStartYear: 2011,
    remainingLeaseYears: 999,
    schoolsProximity: [
      {
        school: 'Nanyang Primary School',
        distance: 'Within 0.4km (Priority 1)',
        psf: 2380
      },
      {
        school: "Raffles Girls' Primary School",
        distance: 'Within 1.1km',
        psf: 2420
      },
      {
        school: 'Henry Park Primary School',
        distance: 'Within 1.9km',
        psf: 2280
      }
    ],
    locationName: 'Duchess Walk, Bukit Timah',
    coordinates: {
      lat: 1.3235,
      lng: 103.8088
    },
    recentTransactions: [
      {
        block: 'Block 12 #04-03',
        type: '4-Bed Deluxe',
        price: 3300000,
        date: 'Oct 2023',
        psf: 2350
      }
    ],
    marketInsights: {
      professionalInsight: "Super prime District 10 freehold enclave within 1km to Nanyang Primary and Raffles Girls' Primary. Exceptional capital upside and generational wealth preservation.",
      askingPsf: 2380,
      recentAvgPsf: 2340,
      diffPercent: 1.7,
      historicalTrend: [
        { year: '2020', psf: 1950, volume: 18, avgRent: 6500 },
        { year: '2021', psf: 2100, volume: 22, avgRent: 7200 },
        { year: '2022', psf: 2250, volume: 26, avgRent: 8000 },
        { year: '2023', psf: 2340, volume: 20, avgRent: 8500 },
        { year: '2024', psf: 2380, volume: 15, avgRent: 8800 }
      ]
    },
    description: "Exclusive low-density District 10 sanctuary surrounded by lush serenity. Within short walking distance to Tan Kah Kee MRT and King Albert Park amenities.",
    facilities: [
      'Resort Pool & Jacuzzi',
      'Private Gym & Wellness Lounge',
      'BBQ Dining Garden',
      '24-Hour Concierge & Security'
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
    id: 'prop-cote-d-azur',
    title: "Côte d'Azur",
    subtitle: 'Marine Parade Road, East Coast',
    address: '60 Marine Parade Rd, Singapore 449299',
    price: 1980000,
    psf: 1720,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1151,
    propertyType: 'Private',
    subCategory: 'Seafront Condominium',
    tenure: '99-year Leasehold',
    isNewLaunch: false,
    isFreehold: false,
    isProfessionalPick: true,
    schoolName: 'Tao Nan School',
    distanceToSchool: '0.3 km from Tao Nan School',
    distanceKm: 0.3,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJTl26YwiwO4aeLY9k8FpoRNDkrSc54cDvu6HMdHez2Wb0bW47yjZtZQQhY8tB9lDYrUyQwfoq4uy6gGT_Fizk1ueaYUVtHT_35BegazGcJgNCp52yEuf_lo8oELD6UzuRbP7ydiv4ECVeX9JKXbrB5KDOqqmUAzDYBsA6PeHO0_Rg65EebjiPJCJUh8qZEIWRA8KVZ9DUTl0yVGwnWeACPsDom8ck-GXKNbsStvTSwuTvpkV9Pec',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDJTl26YwiwO4aeLY9k8FpoRNDkrSc54cDvu6HMdHez2Wb0bW47yjZtZQQhY8tB9lDYrUyQwfoq4uy6gGT_Fizk1ueaYUVtHT_35BegazGcJgNCp52yEuf_lo8oELD6UzuRbP7ydiv4ECVeX9JKXbrB5KDOqqmUAzDYBsA6PeHO0_Rg65EebjiPJCJUh8qZEIWRA8KVZ9DUTl0yVGwnWeACPsDom8ck-GXKNbsStvTSwuTvpkV9Pec'
    ],
    hdbTown: 'Marine Parade',
    flatType: 'District 15 Coastal Condo',
    leaseStartYear: 2004,
    remainingLeaseYears: 79,
    schoolsProximity: [
      {
        school: 'Tao Nan School',
        distance: 'Within 0.3km (Priority 1)',
        psf: 1720
      },
      {
        school: 'CHIJ (Katong) Primary',
        distance: 'Within 0.6km (Priority 1)',
        psf: 1690
      },
      {
        school: 'Tanjong Katong Primary School',
        distance: 'Within 1.1km',
        psf: 1710
      }
    ],
    locationName: 'Marine Parade Road, Singapore',
    coordinates: {
      lat: 1.3038,
      lng: 103.9085
    },
    recentTransactions: [
      {
        block: 'Tower 3 #14-02',
        type: '3-Bed Sea View',
        price: 1950000,
        date: 'Nov 2023',
        psf: 1694
      }
    ],
    marketInsights: {
      professionalInsight: "Adjacent to Parkway Parade and Marine Parade TEL MRT station. Outstanding 1km access to Tao Nan School, CHIJ Katong, and Haig Girls'. Strong rental demand from East Coast professionals.",
      askingPsf: 1720,
      recentAvgPsf: 1700,
      diffPercent: 1.2,
      historicalTrend: [
        { year: '2020', psf: 1390, volume: 30, avgRent: 4200 },
        { year: '2021', psf: 1480, volume: 34, avgRent: 4700 },
        { year: '2022', psf: 1590, volume: 40, avgRent: 5400 },
        { year: '2023', psf: 1680, volume: 36, avgRent: 5900 },
        { year: '2024', psf: 1720, volume: 29, avgRent: 6200 }
      ]
    },
    description: "Coastal resort living in Marine Parade right across East Coast Park. Direct underground connection to Marine Parade MRT and top prestigious schools.",
    facilities: [
      '50m Freeform Pool',
      'Tennis Courts',
      'Sea-Facing Fitness Centre',
      'Sauna & Steam Rooms'
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
    id: 'prop-bishan-loft',
    title: 'Bishan 8',
    subtitle: 'Bishan Street 14',
    address: '61 Bishan St 14, Singapore 579782',
    price: 1850000,
    psf: 1580,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1171,
    propertyType: 'Private',
    subCategory: 'Executive Condominium',
    tenure: '99-year Leasehold',
    isNewLaunch: false,
    isFreehold: false,
    isProfessionalPick: true,
    schoolName: 'Catholic High School (Primary)',
    distanceToSchool: '0.4 km from Catholic High',
    distanceKm: 0.4,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiNbuK6-lnP8c1e-mA-V7JhAxFvpyYqxzX_QVaXskl8OfM1-hf5SNKIO3Yr5J-N_Fe0AJ0dibi8xDnyZcLZJOvxrUGr3S3poSPo4pOxrVU7iQo7l8mAE7NFfeveXlLNGCiAr0mxohT6eD9KnoRd7ddrGVV1uAh24UQtOgOvtjvmnphWUfsjNKCJHaqbnLVHNZtuj384ijIokZF-CLAZNGni2VkyNuxqeAOxf5SU9_TehvgHCAFIs0',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDiNbuK6-lnP8c1e-mA-V7JhAxFvpyYqxzX_QVaXskl8OfM1-hf5SNKIO3Yr5J-N_Fe0AJ0dibi8xDnyZcLZJOvxrUGr3S3poSPo4pOxrVU7iQo7l8mAE7NFfeveXlLNGCiAr0mxohT6eD9KnoRd7ddrGVV1uAh24UQtOgOvtjvmnphWUfsjNKCJHaqbnLVHNZtuj384ijIokZF-CLAZNGni2VkyNuxqeAOxf5SU9_TehvgHCAFIs0'
    ],
    hdbTown: 'Bishan',
    flatType: 'District 20 Condominium',
    leaseStartYear: 2000,
    remainingLeaseYears: 75,
    schoolsProximity: [
      {
        school: 'Catholic High School (Primary)',
        distance: 'Within 0.4km (Priority 1)',
        psf: 1580
      },
      {
        school: 'Kuo Chuan Presbyterian Primary School',
        distance: 'Within 0.9km (Priority 1)',
        psf: 1550
      },
      {
        school: 'Ai Tong School',
        distance: 'Within 1.4km',
        psf: 1620
      }
    ],
    locationName: 'Bishan Street 14, Singapore',
    coordinates: {
      lat: 1.3524,
      lng: 103.8475
    },
    recentTransactions: [
      {
        block: 'Block 61 #10-02',
        type: '3-Bed Premium',
        price: 1820000,
        date: 'Oct 2023',
        psf: 1554
      }
    ],
    marketInsights: {
      professionalInsight: "Minutes walk to Bishan MRT interchange and Junction 8. Premium location for Catholic High Primary balloting priority.",
      askingPsf: 1580,
      recentAvgPsf: 1560,
      diffPercent: 1.3,
      historicalTrend: [
        { year: '2020', psf: 1250, volume: 22, avgRent: 3800 },
        { year: '2021', psf: 1350, volume: 28, avgRent: 4200 },
        { year: '2022', psf: 1460, volume: 32, avgRent: 4800 },
        { year: '2023', psf: 1540, volume: 25, avgRent: 5200 },
        { year: '2024', psf: 1580, volume: 19, avgRent: 5400 }
      ]
    },
    description: "Prime Bishan heartland convenience, steps from Bishan MRT (North-South / Circle Lines), Catholic High, and Bishan-Ang Mo Kio Park.",
    facilities: [
      'Olympic-Length Swimming Pool',
      'Tennis Courts',
      'Clubhouse & Gym',
      'BBQ Dining Pavilions'
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
    id: 'prop-nan-chiau-the-luxurie',
    title: 'The Luxurie',
    subtitle: 'Compassvale Road, Sengkang',
    address: '11 Compassvale Rd, Singapore 544754',
    price: 1380000,
    psf: 1420,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 972,
    propertyType: 'Private',
    subCategory: 'Modern Condominium',
    tenure: '99-year Leasehold',
    isNewLaunch: false,
    isFreehold: false,
    isProfessionalPick: true,
    schoolName: 'Nan Chiau Primary School',
    distanceToSchool: '0.4 km from Nan Chiau Primary',
    distanceKm: 0.4,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWct-WvTH4iOi9JvmrDE2ArcQVbH7ehs69VHZzYNloW3C6Vh_glLVNH4-uVq6rON3oXf03vvzzCpLKUZPsNcPHZROt7TzKwPvgo4VGmUeUObLtprWpbBwTrzVL8mo9qx_lovkeyFZOQjhDHjZJjXmJPgLm4SlSMnHNOjo186Y7i3cTkNTUwCPaQQBf-tzh6KnFjTAZZNlqHbtjKKllwzUEfToKnjG9VuOvP8SpY0xBwOVDPheqyqo',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAWct-WvTH4iOi9JvmrDE2ArcQVbH7ehs69VHZzYNloW3C6Vh_glLVNH4-uVq6rON3oXf03vvzzCpLKUZPsNcPHZROt7TzKwPvgo4VGmUeUObLtprWpbBwTrzVL8mo9qx_lovkeyFZOQjhDHjZJjXmJPgLm4SlSMnHNOjo186Y7i3cTkNTUwCPaQQBf-tzh6KnFjTAZZNlqHbtjKKllwzUEfToKnjG9VuOvP8SpY0xBwOVDPheqyqo'
    ],
    hdbTown: 'Sengkang',
    flatType: 'District 19 Condo',
    leaseStartYear: 2015,
    remainingLeaseYears: 90,
    schoolsProximity: [
      {
        school: 'Nan Chiau Primary School',
        distance: 'Within 0.4km (Priority 1)',
        psf: 1420
      },
      {
        school: 'Compassvale Primary School',
        distance: 'Within 0.7km (Priority 1)',
        psf: 1390
      },
      {
        school: 'Anchor Green Primary School',
        distance: 'Within 0.8km (Priority 1)',
        psf: 1380
      }
    ],
    locationName: 'Compassvale Road, Sengkang',
    coordinates: {
      lat: 1.3915,
      lng: 103.8942
    },
    recentTransactions: [
      {
        block: 'Block 15 #09-02',
        type: '3-Bed Compact',
        price: 1350000,
        date: 'Nov 2023',
        psf: 1388
      }
    ],
    marketInsights: {
      professionalInsight: "Just 2 minutes walk to Sengkang MRT/Compass One mall. Highly sought-after for 1km entry into premier SAP school Nan Chiau Primary.",
      askingPsf: 1420,
      recentAvgPsf: 1390,
      diffPercent: 2.1,
      historicalTrend: [
        { year: '2020', psf: 1100, volume: 38, avgRent: 3200 },
        { year: '2021', psf: 1210, volume: 44, avgRent: 3600 },
        { year: '2022', psf: 1320, volume: 40, avgRent: 4100 },
        { year: '2023', psf: 1390, volume: 35, avgRent: 4500 },
        { year: '2024', psf: 1420, volume: 27, avgRent: 4700 }
      ]
    },
    description: "Convenience meets luxury living at The Luxurie. Directly connected to Sengkang Town Centre, Compass One, and premier educational institutions.",
    facilities: [
      'Grand Hydrotherapy Pool',
      'Tennis Court',
      'Aqua Gym & Sunken Lounge',
      'Function Rooms'
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
    id: 'prop-tampines-the-tapestry',
    title: 'The Tapestry',
    subtitle: 'Tampines Ave 10',
    address: '61 Tampines St 86, Singapore 528574',
    price: 1520000,
    psf: 1610,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 944,
    propertyType: 'Private',
    subCategory: 'Resort Condominium',
    tenure: '99-year Leasehold',
    isNewLaunch: false,
    isFreehold: false,
    isProfessionalPick: true,
    schoolName: "St. Hilda's Primary School",
    distanceToSchool: '1.1 km from St. Hilda\'s Primary',
    distanceKm: 1.1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhyGOvKWevgLpkZ71X8qYXSCin6Y1YqNbxcPt-7HGXEH4wB1BZX0a5_0WPeYZVo1iebmDVs8i6q-nddLDMpK5c8iYq0WjGXdToQYhBX2vu6K2j_qSPBWugPrKCojZU3qy8D-CcOxrH6yywsCSxlBB8GdK2O4fv0TE-I9ah8uUKnLvfQXLg1Jj2wpp5pavueDbWEEy0ZBpOegqh1eDCxHNQ2HEzZR8oFFLwVOWUQn3OeP1Dl5QfWFA',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBhyGOvKWevgLpkZ71X8qYXSCin6Y1YqNbxcPt-7HGXEH4wB1BZX0a5_0WPeYZVo1iebmDVs8i6q-nddLDMpK5c8iYq0WjGXdToQYhBX2vu6K2j_qSPBWugPrKCojZU3qy8D-CcOxrH6yywsCSxlBB8GdK2O4fv0TE-I9ah8uUKnLvfQXLg1Jj2wpp5pavueDbWEEy0ZBpOegqh1eDCxHNQ2HEzZR8oFFLwVOWUQn3OeP1Dl5QfWFA'
    ],
    hdbTown: 'Tampines',
    flatType: 'District 18 Condominium',
    leaseStartYear: 2021,
    remainingLeaseYears: 96,
    schoolsProximity: [
      {
        school: 'Poi Ching School',
        distance: 'Within 0.8km (Priority 1)',
        psf: 1590
      },
      {
        school: "St. Hilda's Primary School",
        distance: 'Within 1.1km (Priority 2)',
        psf: 1610
      },
      {
        school: 'Junyuan Primary School',
        distance: 'Within 1.3km',
        psf: 1560
      }
    ],
    locationName: 'Tampines Avenue 10, Singapore',
    coordinates: {
      lat: 1.3548,
      lng: 103.9352
    },
    recentTransactions: [
      {
        block: 'Block 61 #08-03',
        type: '3-Bed Premium',
        price: 1500000,
        date: 'Nov 2023',
        psf: 1588
      }
    ],
    marketInsights: {
      professionalInsight: "CDL luxury mega-development featuring 100m infinity pool and childcare centre on-site. Close proximity to Poi Ching and St. Hilda's Primary.",
      askingPsf: 1610,
      recentAvgPsf: 1590,
      diffPercent: 1.2,
      historicalTrend: [
        { year: '2020', psf: 1320, volume: 55, avgRent: 3600 },
        { year: '2021', psf: 1420, volume: 60, avgRent: 4000 },
        { year: '2022', psf: 1520, volume: 48, avgRent: 4600 },
        { year: '2023', psf: 1590, volume: 42, avgRent: 4900 },
        { year: '2024', psf: 1610, volume: 30, avgRent: 5100 }
      ]
    },
    description: "Modern resort development with over 50 facilities, including 100m continuous lap pool, pets cabin, and 24-hr gym overlooking Bedok Reservoir.",
    facilities: [
      '100m Infinity Pool',
      'Tennis Court',
      'Childcare Centre on-site',
      'Eco-Pond & Hammock Lounge'
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
    id: 'prop-clementi-the-trilinq',
    title: 'The Trilinq',
    subtitle: 'Jalan Lempeng, Clementi',
    address: '28 Jalan Lempeng, Singapore 128807',
    price: 1780000,
    psf: 1910,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 932,
    propertyType: 'Private',
    subCategory: 'High-Rise Condominium',
    tenure: '99-year Leasehold',
    isNewLaunch: false,
    isFreehold: false,
    isProfessionalPick: true,
    schoolName: 'Nan Hua Primary School',
    distanceToSchool: '0.3 km from Nan Hua Primary',
    distanceKm: 0.3,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiNbuK6-lnP8c1e-mA-V7JhAxFvpyYqxzX_QVaXskl8OfM1-hf5SNKIO3Yr5J-N_Fe0AJ0dibi8xDnyZcLZJOvxrUGr3S3poSPo4pOxrVU7iQo7l8mAE7NFfeveXlLNGCiAr0mxohT6eD9KnoRd7ddrGVV1uAh24UQtOgOvtjvmnphWUfsjNKCJHaqbnLVHNZtuj384ijIokZF-CLAZNGni2VkyNuxqeAOxf5SU9_TehvgHCAFIs0',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDiNbuK6-lnP8c1e-mA-V7JhAxFvpyYqxzX_QVaXskl8OfM1-hf5SNKIO3Yr5J-N_Fe0AJ0dibi8xDnyZcLZJOvxrUGr3S3poSPo4pOxrVU7iQo7l8mAE7NFfeveXlLNGCiAr0mxohT6eD9KnoRd7ddrGVV1uAh24UQtOgOvtjvmnphWUfsjNKCJHaqbnLVHNZtuj384ijIokZF-CLAZNGni2VkyNuxqeAOxf5SU9_TehvgHCAFIs0'
    ],
    hdbTown: 'Clementi',
    flatType: 'District 05 Condominium',
    leaseStartYear: 2017,
    remainingLeaseYears: 92,
    schoolsProximity: [
      {
        school: 'Nan Hua Primary School',
        distance: 'Within 0.3km (Priority 1)',
        psf: 1910
      },
      {
        school: 'Clementi Primary School',
        distance: 'Within 0.6km (Priority 1)',
        psf: 1880
      },
      {
        school: 'Qifa Primary School',
        distance: 'Within 0.7km (Priority 1)',
        psf: 1850
      }
    ],
    locationName: 'Jalan Lempeng, Clementi',
    coordinates: {
      lat: 1.3201,
      lng: 103.7685
    },
    recentTransactions: [
      {
        block: 'Tower 2 #22-01',
        type: '3-Bed High Floor',
        price: 1750000,
        date: 'Oct 2023',
        psf: 1877
      }
    ],
    marketInsights: {
      professionalInsight: "Gold standard educational zone with Nan Hua Primary right next door. Short walk to Clementi MRT and Clementi Mall.",
      askingPsf: 1910,
      recentAvgPsf: 1880,
      diffPercent: 1.6,
      historicalTrend: [
        { year: '2020', psf: 1520, volume: 32, avgRent: 4000 },
        { year: '2021', psf: 1640, volume: 38, avgRent: 4500 },
        { year: '2022', psf: 1760, volume: 36, avgRent: 5100 },
        { year: '2023', psf: 1880, volume: 30, avgRent: 5600 },
        { year: '2024', psf: 1910, volume: 22, avgRent: 5800 }
      ]
    },
    description: "Striking 36-storey high-rise development with panoramic views of Pandan Reservoir and Bukit Timah hill. Unrivalled location for Nan Hua Primary school registration.",
    facilities: [
      '50m Lap Pool & Oasis Pool',
      'Tennis Court',
      'Sky Terraces on 8th & 20th Floors',
      'Gymnasium & Function Suites'
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
    id: 'prop-woodlands-la-casa',
    title: 'La Casa',
    subtitle: 'Woodlands Drive 16',
    address: '60 Woodlands Dr 16, Singapore 737895',
    price: 1180000,
    psf: 1080,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1092,
    propertyType: 'Private',
    subCategory: 'Executive Condominium',
    tenure: '99-year Leasehold',
    isNewLaunch: false,
    isFreehold: false,
    isProfessionalPick: false,
    schoolName: 'Innova Primary School',
    distanceToSchool: '0.3 km from Innova Primary',
    distanceKm: 0.3,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJTl26YwiwO4aeLY9k8FpoRNDkrSc54cDvu6HMdHez2Wb0bW47yjZtZQQhY8tB9lDYrUyQwfoq4uy6gGT_Fizk1ueaYUVtHT_35BegazGcJgNCp52yEuf_lo8oELD6UzuRbP7ydiv4ECVeX9JKXbrB5KDOqqmUAzDYBsA6PeHO0_Rg65EebjiPJCJUh8qZEIWRA8KVZ9DUTl0yVGwnWeACPsDom8ck-GXKNbsStvTSwuTvpkV9Pec',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDJTl26YwiwO4aeLY9k8FpoRNDkrSc54cDvu6HMdHez2Wb0bW47yjZtZQQhY8tB9lDYrUyQwfoq4uy6gGT_Fizk1ueaYUVtHT_35BegazGcJgNCp52yEuf_lo8oELD6UzuRbP7ydiv4ECVeX9JKXbrB5KDOqqmUAzDYBsA6PeHO0_Rg65EebjiPJCJUh8qZEIWRA8KVZ9DUTl0yVGwnWeACPsDom8ck-GXKNbsStvTSwuTvpkV9Pec'
    ],
    hdbTown: 'Woodlands',
    flatType: 'District 25 Condominium',
    leaseStartYear: 2008,
    remainingLeaseYears: 83,
    schoolsProximity: [
      {
        school: 'Innova Primary School',
        distance: 'Within 0.3km (Priority 1)',
        psf: 1080
      },
      {
        school: 'Woodgrove Primary School',
        distance: 'Within 0.6km (Priority 1)',
        psf: 1050
      },
      {
        school: 'Woodlands Ring Primary School',
        distance: 'Within 0.8km (Priority 1)',
        psf: 1060
      }
    ],
    locationName: 'Woodlands Drive 16, Singapore',
    coordinates: {
      lat: 1.4318,
      lng: 103.7912
    },
    recentTransactions: [
      {
        block: 'Block 60 #07-04',
        type: '3-Bed Pool View',
        price: 1150000,
        date: 'Oct 2023',
        psf: 1053
      }
    ],
    marketInsights: {
      professionalInsight: "Superb value below $1,100 PSF in the thriving Woodlands Regional Centre development belt with upcoming RTS Link to Johor Bahru.",
      askingPsf: 1080,
      recentAvgPsf: 1060,
      diffPercent: 1.9,
      historicalTrend: [
        { year: '2020', psf: 820, volume: 28, avgRent: 2800 },
        { year: '2021', psf: 900, volume: 32, avgRent: 3100 },
        { year: '2022', psf: 980, volume: 36, avgRent: 3600 },
        { year: '2023', psf: 1050, volume: 30, avgRent: 4000 },
        { year: '2024', psf: 1080, volume: 24, avgRent: 4200 }
      ]
    },
    description: "Spanish-Mediterranean themed resort condominium located in Woodlands, close to Woodlands South TEL MRT and Singapore Sports School.",
    facilities: [
      'Theme Resort Pools & Spa',
      'Tennis Courts',
      'Clubhouse & Gym',
      'BBQ Pavilions'
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

/**
 * Dynamically decorates properties with live distance and priority zone to any selected school
 */
export function getDecoratedPropertiesForSchool(
  schoolName: string,
  baseProperties: Property[] = MOCK_PROPERTIES
): Property[] {
  const school = getSchoolByName(schoolName);
  if (!school) return baseProperties;

  return baseProperties.map((prop) => {
    const dist = calculateDistanceKm(school.lat, school.lng, prop.coordinates.lat, prop.coordinates.lng);
    const distanceKm = dist;
    
    let distanceLabel = '';
    if (dist <= 1.0) {
      distanceLabel = `${dist} km (Within 1km Priority)`;
    } else if (dist <= 2.0) {
      distanceLabel = `${dist} km (Within 2km Radius)`;
    } else {
      distanceLabel = `${dist} km from ${school.name}`;
    }

    // Clone and update proximity list to put current school at top
    const existingProx = prop.schoolsProximity.filter(
      (s) => s.school.toLowerCase() !== school.name.toLowerCase()
    );

    const updatedProx = [
      {
        school: school.name,
        distance: dist <= 1.0 ? `Within 1km (${dist}km)` : dist <= 2.0 ? `Within 2km (${dist}km)` : `${dist}km away`,
        psf: prop.psf,
      },
      ...existingProx,
    ];

    return {
      ...prop,
      schoolName: school.name,
      distanceToSchool: distanceLabel,
      distanceKm,
      schoolsProximity: updatedProx,
    };
  });
}
