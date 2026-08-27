export interface SingaporeSchool {
  name: string;
  zone: 'North' | 'South' | 'East' | 'West' | 'North-East' | 'Central';
  area: string;
  postalCode: string;
  lat: number;
  lng: number;
  isPopularGep?: boolean;
}

export const ALL_SINGAPORE_PRIMARY_SCHOOLS: SingaporeSchool[] = [
  // --- ANG MO KIO ---
  { name: 'Ang Mo Kio Primary School', zone: 'North', area: 'Ang Mo Kio', postalCode: '569766', lat: 1.3693, lng: 103.8395 },
  { name: 'Anderson Primary School', zone: 'North', area: 'Ang Mo Kio', postalCode: '569798', lat: 1.3831, lng: 103.8418 },
  { name: "CHIJ St. Nicholas Girls' School", zone: 'North', area: 'Ang Mo Kio', postalCode: '569761', lat: 1.3734, lng: 103.8344, isPopularGep: true },
  { name: 'Jing Shan Primary School', zone: 'North', area: 'Ang Mo Kio', postalCode: '569788', lat: 1.3678, lng: 103.8504 },
  { name: 'Mayflower Primary School', zone: 'North', area: 'Ang Mo Kio', postalCode: '569795', lat: 1.3768, lng: 103.8361 },
  { name: 'Teck Ghee Primary School', zone: 'North', area: 'Ang Mo Kio', postalCode: '569782', lat: 1.3615, lng: 103.8517 },
  { name: 'Townsville Primary School', zone: 'North', area: 'Ang Mo Kio', postalCode: '569785', lat: 1.3644, lng: 103.8542 },

  // --- BEDOK / MARINE PARADE ---
  { name: 'Bedok Green Primary School', zone: 'East', area: 'Bedok', postalCode: '469644', lat: 1.3263, lng: 103.9372 },
  { name: 'Damai Primary School', zone: 'East', area: 'Bedok', postalCode: '469655', lat: 1.3355, lng: 103.9214 },
  { name: 'Fengshan Primary School', zone: 'East', area: 'Bedok', postalCode: '469646', lat: 1.3299, lng: 103.9341 },
  { name: 'Opera Estate Primary School', zone: 'East', area: 'Bedok', postalCode: '458624', lat: 1.3196, lng: 103.9242 },
  { name: 'Red Swastika School', zone: 'East', area: 'Bedok', postalCode: '469637', lat: 1.3328, lng: 103.9348, isPopularGep: true },
  { name: "St. Anthony's Canossian Primary School", zone: 'East', area: 'Bedok', postalCode: '469661', lat: 1.3347, lng: 103.9416 },
  { name: "St. Stephen's School", zone: 'East', area: 'Bedok', postalCode: '458641', lat: 1.3183, lng: 103.9168 },
  { name: 'Tao Nan School', zone: 'East', area: 'Marine Parade', postalCode: '449269', lat: 1.3056, lng: 103.9112, isPopularGep: true },
  { name: 'Telok Kurau Primary School', zone: 'East', area: 'Bedok', postalCode: '469660', lat: 1.3342, lng: 103.9388 },
  { name: 'Temasek Primary School', zone: 'East', area: 'Bedok', postalCode: '469657', lat: 1.3175, lng: 103.9472 },
  { name: 'Yu Neng Primary School', zone: 'East', area: 'Bedok', postalCode: '469647', lat: 1.3345, lng: 103.9318 },
  { name: 'CHIJ (Katong) Primary', zone: 'East', area: 'Marine Parade', postalCode: '449303', lat: 1.3061, lng: 103.9069 },
  { name: 'Haig Girls\' School', zone: 'East', area: 'Marine Parade', postalCode: '427991', lat: 1.3134, lng: 103.8996 },
  { name: 'Tanjong Katong Primary School', zone: 'East', area: 'Marine Parade', postalCode: '436957', lat: 1.3045, lng: 103.8978 },

  // --- BISHAN ---
  { name: 'Ai Tong School', zone: 'Central', area: 'Bishan', postalCode: '579799', lat: 1.3606, lng: 103.8331, isPopularGep: true },
  { name: 'Catholic High School (Primary)', zone: 'Central', area: 'Bishan', postalCode: '579796', lat: 1.3547, lng: 103.8448, isPopularGep: true },
  { name: 'Guangyang Primary School', zone: 'Central', area: 'Bishan', postalCode: '579786', lat: 1.3498, lng: 103.8541 },
  { name: 'Kuo Chuan Presbyterian Primary School', zone: 'Central', area: 'Bishan', postalCode: '579763', lat: 1.3496, lng: 103.8504 },

  // --- BUKIT BATOK ---
  { name: 'Bukit View Primary School', zone: 'West', area: 'Bukit Batok', postalCode: '659083', lat: 1.3458, lng: 103.7547 },
  { name: 'Dazhong Primary School', zone: 'West', area: 'Bukit Batok', postalCode: '659440', lat: 1.3592, lng: 103.7431 },
  { name: 'Keming Primary School', zone: 'West', area: 'Bukit Batok', postalCode: '659578', lat: 1.3453, lng: 103.7578 },
  { name: 'Lianhua Primary School', zone: 'West', area: 'Bukit Batok', postalCode: '659441', lat: 1.3551, lng: 103.7538 },
  { name: 'Princess Elizabeth Primary School', zone: 'West', area: 'Bukit Batok', postalCode: '659086', lat: 1.3491, lng: 103.7412 },
  { name: "St. Anthony's Primary School", zone: 'West', area: 'Bukit Batok', postalCode: '659442', lat: 1.3619, lng: 103.7497 },

  // --- BUKIT MERAH / QUEENSTOWN ---
  { name: 'Alexandra Primary School', zone: 'South', area: 'Bukit Merah', postalCode: '159964', lat: 1.2913, lng: 103.8242 },
  { name: 'Blangah Rise Primary School', zone: 'South', area: 'Bukit Merah', postalCode: '109799', lat: 1.2761, lng: 103.8085 },
  { name: 'Cantonment Primary School', zone: 'South', area: 'Bukit Merah', postalCode: '089744', lat: 1.2759, lng: 103.8398 },
  { name: 'CHIJ (Kellock)', zone: 'South', area: 'Bukit Merah', postalCode: '099351', lat: 1.2764, lng: 103.8273 },
  { name: 'Gan Eng Seng Primary School', zone: 'South', area: 'Bukit Merah', postalCode: '158797', lat: 1.2858, lng: 103.8184 },
  { name: 'New Town Primary School', zone: 'South', area: 'Queenstown', postalCode: '148954', lat: 1.2997, lng: 103.8001 },
  { name: 'Queenstown Primary School', zone: 'South', area: 'Queenstown', postalCode: '148884', lat: 1.2974, lng: 103.8066 },
  { name: 'Radin Mas Primary School', zone: 'South', area: 'Bukit Merah', postalCode: '099840', lat: 1.2748, lng: 103.8217 },
  { name: 'Zhangde Primary School', zone: 'South', area: 'Bukit Merah', postalCode: '169568', lat: 1.2842, lng: 103.8262 },

  // --- BUKIT PANJANG ---
  { name: 'Beacon Primary School', zone: 'West', area: 'Bukit Panjang', postalCode: '677721', lat: 1.3838, lng: 103.7735 },
  { name: 'Bukit Panjang Primary School', zone: 'West', area: 'Bukit Panjang', postalCode: '679962', lat: 1.3739, lng: 103.7694 },
  { name: 'CHIJ Our Lady Queen of Peace', zone: 'West', area: 'Bukit Panjang', postalCode: '679668', lat: 1.3664, lng: 103.7698 },
  { name: 'Greenridge Primary School', zone: 'West', area: 'Bukit Panjang', postalCode: '679578', lat: 1.3853, lng: 103.7698 },
  { name: 'West Spring Primary School', zone: 'West', area: 'Bukit Panjang', postalCode: '677626', lat: 1.3879, lng: 103.7645 },
  { name: 'West View Primary School', zone: 'West', area: 'Bukit Panjang', postalCode: '677741', lat: 1.3842, lng: 103.7608 },
  { name: 'Zhenghua Primary School', zone: 'West', area: 'Bukit Panjang', postalCode: '677738', lat: 1.3794, lng: 103.7695 },

  // --- BUKIT TIMAH ---
  { name: 'Bukit Timah Primary School', zone: 'Central', area: 'Bukit Timah', postalCode: '597592', lat: 1.3361, lng: 103.7675 },
  { name: 'Henry Park Primary School', zone: 'Central', area: 'Bukit Timah', postalCode: '277494', lat: 1.3168, lng: 103.7844, isPopularGep: true },
  { name: "Methodist Girls' School (Primary)", zone: 'Central', area: 'Bukit Timah', postalCode: '597607', lat: 1.3332, lng: 103.7801, isPopularGep: true },
  { name: 'Nanyang Primary School', zone: 'Central', area: 'Bukit Timah', postalCode: '268825', lat: 1.3211, lng: 103.8072, isPopularGep: true },
  { name: 'Pei Hwa Presbyterian Primary School', zone: 'Central', area: 'Bukit Timah', postalCode: '597610', lat: 1.3381, lng: 103.7761 },
  { name: "Raffles Girls' Primary School", zone: 'Central', area: 'Bukit Timah', postalCode: '288683', lat: 1.3298, lng: 103.8062, isPopularGep: true },

  // --- CENTRAL / NOVENA / KALLANG ---
  { name: 'Anglo-Chinese School (Junior)', zone: 'Central', area: 'Central', postalCode: '228892', lat: 1.3094, lng: 103.8415, isPopularGep: true },
  { name: 'Anglo-Chinese School (Primary)', zone: 'Central', area: 'Novena', postalCode: '308441', lat: 1.3184, lng: 103.8354, isPopularGep: true },
  { name: 'Bendemeer Primary School', zone: 'Central', area: 'Kallang', postalCode: '339561', lat: 1.3214, lng: 103.8647 },
  { name: 'Canossa Catholic Primary School', zone: 'Central', area: 'Kallang', postalCode: '379782', lat: 1.3278, lng: 103.8824 },
  { name: 'Cedar Primary School', zone: 'Central', area: 'Kallang', postalCode: '369637', lat: 1.3358, lng: 103.8742 },
  { name: 'Farrer Park Primary School', zone: 'Central', area: 'Kallang', postalCode: '218827', lat: 1.3129, lng: 103.8504 },
  { name: 'Geylang Methodist School (Primary)', zone: 'East', area: 'Geylang', postalCode: '388570', lat: 1.3174, lng: 103.8845 },
  { name: 'Hong Wen School', zone: 'Central', area: 'Kallang', postalCode: '328836', lat: 1.3228, lng: 103.8576 },
  { name: 'Kong Hwa School', zone: 'East', area: 'Geylang', postalCode: '399745', lat: 1.3115, lng: 103.8887 },
  { name: 'Maha Bodhi School', zone: 'East', area: 'Geylang', postalCode: '419799', lat: 1.3298, lng: 103.9015 },
  { name: "St. Andrew's Junior School", zone: 'Central', area: 'Kallang', postalCode: '357690', lat: 1.3312, lng: 103.8664 },
  { name: "St. Joseph's Institution Junior", zone: 'Central', area: 'Novena', postalCode: '308439', lat: 1.3188, lng: 103.8465 },
  { name: "St. Margaret's School (Primary)", zone: 'Central', area: 'Central', postalCode: '228801', lat: 1.3061, lng: 103.8488 },
  { name: 'Stamford Primary School', zone: 'Central', area: 'Central', postalCode: '198753', lat: 1.3041, lng: 103.8582 },

  // --- CHOA CHU KANG ---
  { name: 'Choa Chu Kang Primary School', zone: 'West', area: 'Choa Chu Kang', postalCode: '689881', lat: 1.3817, lng: 103.7438 },
  { name: 'Concord Primary School', zone: 'West', area: 'Choa Chu Kang', postalCode: '689280', lat: 1.3785, lng: 103.7389 },
  { name: 'De La Salle School', zone: 'West', area: 'Choa Chu Kang', postalCode: '689681', lat: 1.3912, lng: 103.7481 },
  { name: 'Kranji Primary School', zone: 'West', area: 'Choa Chu Kang', postalCode: '689285', lat: 1.3892, lng: 103.7431 },
  { name: 'South View Primary School', zone: 'West', area: 'Choa Chu Kang', postalCode: '689028', lat: 1.3812, lng: 103.7471, isPopularGep: true },
  { name: 'Teck Whye Primary School', zone: 'West', area: 'Choa Chu Kang', postalCode: '689408', lat: 1.3831, lng: 103.7548 },
  { name: 'Unity Primary School', zone: 'West', area: 'Choa Chu Kang', postalCode: '689715', lat: 1.3982, lng: 103.7468 },
  { name: 'Yew Tee Primary School', zone: 'West', area: 'Choa Chu Kang', postalCode: '689680', lat: 1.3965, lng: 103.7428 },

  // --- CLEMENTI ---
  { name: 'Clementi Primary School', zone: 'West', area: 'Clementi', postalCode: '129903', lat: 1.3155, lng: 103.7661 },
  { name: 'Nan Hua Primary School', zone: 'West', area: 'Clementi', postalCode: '129954', lat: 1.3218, lng: 103.7701, isPopularGep: true },
  { name: 'Pei Tong Primary School', zone: 'West', area: 'Clementi', postalCode: '129957', lat: 1.3168, lng: 103.7712 },
  { name: 'Qifa Primary School', zone: 'West', area: 'Clementi', postalCode: '128797', lat: 1.3131, lng: 103.7602 },

  // --- HOUGANG ---
  { name: 'CHIJ Our Lady of the Nativity', zone: 'North-East', area: 'Hougang', postalCode: '538746', lat: 1.3731, lng: 103.8961 },
  { name: 'Holy Innocents\' Primary School', zone: 'North-East', area: 'Hougang', postalCode: '538743', lat: 1.3721, lng: 103.8942 },
  { name: 'Hougang Primary School', zone: 'North-East', area: 'Hougang', postalCode: '538805', lat: 1.3789, lng: 103.8804 },
  { name: 'Montfort Junior School', zone: 'North-East', area: 'Hougang', postalCode: '538799', lat: 1.3722, lng: 103.8872 },
  { name: "Paya Lebar Methodist Girls' School (Primary)", zone: 'North-East', area: 'Hougang', postalCode: '534063', lat: 1.3541, lng: 103.8871 },
  { name: 'Xinghua Primary School', zone: 'North-East', area: 'Hougang', postalCode: '538766', lat: 1.3551, lng: 103.8904 },
  { name: 'Xinmin Primary School', zone: 'North-East', area: 'Hougang', postalCode: '538711', lat: 1.3718, lng: 103.8834 },
  { name: 'Yio Chu Kang Primary School', zone: 'North-East', area: 'Hougang', postalCode: '538692', lat: 1.3791, lng: 103.8858 },

  // --- JURONG EAST & JURONG WEST ---
  { name: 'Boon Lay Garden Primary School', zone: 'West', area: 'Jurong West', postalCode: '649882', lat: 1.3431, lng: 103.7121 },
  { name: 'Corporation Primary School', zone: 'West', area: 'Jurong West', postalCode: '649582', lat: 1.3508, lng: 103.7042 },
  { name: 'Frontier Primary School', zone: 'West', area: 'Jurong West', postalCode: '648388', lat: 1.3411, lng: 103.7001 },
  { name: 'Fuhua Primary School', zone: 'West', area: 'Jurong East', postalCode: '609653', lat: 1.3475, lng: 103.7381 },
  { name: 'Jurong Primary School', zone: 'West', area: 'Jurong East', postalCode: '609652', lat: 1.3498, lng: 103.7334 },
  { name: 'Jurong West Primary School', zone: 'West', area: 'Jurong West', postalCode: '648344', lat: 1.3489, lng: 103.6961 },
  { name: 'Lakeside Primary School', zone: 'West', area: 'Jurong West', postalCode: '618990', lat: 1.3385, lng: 103.7201 },
  { name: 'Pioneer Primary School', zone: 'West', area: 'Jurong West', postalCode: '648342', lat: 1.3441, lng: 103.6948 },
  { name: 'Rulang Primary School', zone: 'West', area: 'Jurong West', postalCode: '649978', lat: 1.3468, lng: 103.7185, isPopularGep: true },
  { name: 'Shuqun Primary School', zone: 'West', area: 'Jurong West', postalCode: '649979', lat: 1.3474, lng: 103.7154 },
  { name: 'West Grove Primary School', zone: 'West', area: 'Jurong West', postalCode: '648343', lat: 1.3448, lng: 103.6981 },
  { name: 'Westwood Primary School', zone: 'West', area: 'Jurong West', postalCode: '648345', lat: 1.3531, lng: 103.6951 },
  { name: 'Xingnan Primary School', zone: 'West', area: 'Jurong West', postalCode: '648316', lat: 1.3421, lng: 103.6874 },
  { name: 'Yuhua Primary School', zone: 'West', area: 'Jurong East', postalCode: '609779', lat: 1.3435, lng: 103.7412 },

  // --- PASIR RIS ---
  { name: 'Casuarina Primary School', zone: 'East', area: 'Pasir Ris', postalCode: '519634', lat: 1.3721, lng: 103.9571 },
  { name: 'Elias Park Primary School', zone: 'East', area: 'Pasir Ris', postalCode: '519779', lat: 1.3781, lng: 103.9452 },
  { name: 'Meridian Primary School', zone: 'East', area: 'Pasir Ris', postalCode: '519133', lat: 1.3742, lng: 103.9398 },
  { name: 'Park View Primary School', zone: 'East', area: 'Pasir Ris', postalCode: '519134', lat: 1.3771, lng: 103.9385 },
  { name: 'Pasir Ris Primary School', zone: 'East', area: 'Pasir Ris', postalCode: '519637', lat: 1.3728, lng: 103.9628 },
  { name: 'White Sands Primary School', zone: 'East', area: 'Pasir Ris', postalCode: '519636', lat: 1.3664, lng: 103.9612 },

  // --- PUNGGOL ---
  { name: 'Edgefield Primary School', zone: 'North-East', area: 'Punggol', postalCode: '828850', lat: 1.3985, lng: 103.9064 },
  { name: 'Greendale Primary School', zone: 'North-East', area: 'Punggol', postalCode: '828860', lat: 1.3975, lng: 103.9135 },
  { name: 'Horizon Primary School', zone: 'North-East', area: 'Punggol', postalCode: '828867', lat: 1.3995, lng: 103.9125 },
  { name: 'Mee Toh School', zone: 'North-East', area: 'Punggol', postalCode: '828852', lat: 1.3988, lng: 103.9082 },
  { name: 'Northshore Primary School', zone: 'North-East', area: 'Punggol', postalCode: '828604', lat: 1.4174, lng: 103.9045 },
  { name: 'Oasis Primary School', zone: 'North-East', area: 'Punggol', postalCode: '828859', lat: 1.4042, lng: 103.9102 },
  { name: 'Punggol Cove Primary School', zone: 'North-East', area: 'Punggol', postalCode: '828608', lat: 1.4115, lng: 103.8998 },
  { name: 'Punggol Green Primary School', zone: 'North-East', area: 'Punggol', postalCode: '828865', lat: 1.4012, lng: 103.8994 },
  { name: 'Punggol View Primary School', zone: 'North-East', area: 'Punggol', postalCode: '828866', lat: 1.4055, lng: 103.9051 },
  { name: 'Valour Primary School', zone: 'North-East', area: 'Punggol', postalCode: '828610', lat: 1.4074, lng: 103.8985 },
  { name: 'Waterway Primary School', zone: 'North-East', area: 'Punggol', postalCode: '828858', lat: 1.4048, lng: 103.9142 },

  // --- SENGKANG ---
  { name: 'Anchor Green Primary School', zone: 'North-East', area: 'Sengkang', postalCode: '544963', lat: 1.3912, lng: 103.8872 },
  { name: 'Compassvale Primary School', zone: 'North-East', area: 'Sengkang', postalCode: '545082', lat: 1.3892, lng: 103.8988 },
  { name: 'Fern Green Primary School', zone: 'North-East', area: 'Sengkang', postalCode: '797638', lat: 1.3918, lng: 103.8791 },
  { name: 'Fernvale Primary School', zone: 'North-East', area: 'Sengkang', postalCode: '797637', lat: 1.3891, lng: 103.8761 },
  { name: 'Nan Chiau Primary School', zone: 'North-East', area: 'Sengkang', postalCode: '545085', lat: 1.3925, lng: 103.8905, isPopularGep: true },
  { name: 'North Spring Primary School', zone: 'North-East', area: 'Sengkang', postalCode: '545088', lat: 1.3855, lng: 103.9021 },
  { name: 'North Vista Primary School', zone: 'North-East', area: 'Sengkang', postalCode: '545083', lat: 1.3828, lng: 103.8964 },
  { name: 'Palm View Primary School', zone: 'North-East', area: 'Sengkang', postalCode: '545087', lat: 1.3871, lng: 103.8931 },
  { name: 'Rivervale Primary School', zone: 'North-East', area: 'Sengkang', postalCode: '545084', lat: 1.3928, lng: 103.9038 },
  { name: 'Sengkang Green Primary School', zone: 'North-East', area: 'Sengkang', postalCode: '797636', lat: 1.3881, lng: 103.8732 },
  { name: 'Seng Kang Primary School', zone: 'North-East', area: 'Sengkang', postalCode: '545081', lat: 1.3862, lng: 103.8972 },
  { name: 'Springdale Primary School', zone: 'North-East', area: 'Sengkang', postalCode: '545086', lat: 1.3941, lng: 103.8935 },

  // --- SEMBAWANG & WOODLANDS ---
  { name: 'Admiralty Primary School', zone: 'North', area: 'Woodlands', postalCode: '738965', lat: 1.4428, lng: 103.8001 },
  { name: 'Canberra Primary School', zone: 'North', area: 'Sembawang', postalCode: '757632', lat: 1.4508, lng: 103.8164 },
  { name: 'Endeavour Primary School', zone: 'North', area: 'Sembawang', postalCode: '757631', lat: 1.4551, lng: 103.8185 },
  { name: 'Evergreen Primary School', zone: 'North', area: 'Woodlands', postalCode: '738973', lat: 1.4475, lng: 103.7915 },
  { name: 'Greenwood Primary School', zone: 'North', area: 'Woodlands', postalCode: '738968', lat: 1.4402, lng: 103.7938 },
  { name: 'Innova Primary School', zone: 'North', area: 'Woodlands', postalCode: '738969', lat: 1.4308, lng: 103.7891 },
  { name: 'Northoaks Primary School', zone: 'North', area: 'Sembawang', postalCode: '757630', lat: 1.4582, lng: 103.8155 },
  { name: 'Qihua Primary School', zone: 'North', area: 'Woodlands', postalCode: '738964', lat: 1.4421, lng: 103.7871 },
  { name: 'Riverside Primary School', zone: 'North', area: 'Woodlands', postalCode: '738967', lat: 1.4452, lng: 103.7978 },
  { name: 'Sembawang Primary School', zone: 'North', area: 'Sembawang', postalCode: '757633', lat: 1.4472, lng: 103.8242 },
  { name: 'Si Ling Primary School', zone: 'North', area: 'Woodlands', postalCode: '738970', lat: 1.4338, lng: 103.7852 },
  { name: 'Wellington Primary School', zone: 'North', area: 'Sembawang', postalCode: '757634', lat: 1.4528, lng: 103.8214 },
  { name: 'Woodgrove Primary School', zone: 'North', area: 'Woodlands', postalCode: '738971', lat: 1.4335, lng: 103.7904 },
  { name: 'Woodlands Primary School', zone: 'North', area: 'Woodlands', postalCode: '738966', lat: 1.4371, lng: 103.7942 },
  { name: 'Woodlands Ring Primary School', zone: 'North', area: 'Woodlands', postalCode: '738972', lat: 1.4358, lng: 103.7925 },

  // --- SERANGOON ---
  { name: 'CHIJ Our Lady of Good Counsel', zone: 'North-East', area: 'Serangoon', postalCode: '556083', lat: 1.3582, lng: 103.8645 },
  { name: 'Rosyth School', zone: 'North-East', area: 'Serangoon', postalCode: '555855', lat: 1.3727, lng: 103.8744, isPopularGep: true },
  { name: 'Zhonghua Primary School', zone: 'North-East', area: 'Serangoon', postalCode: '556114', lat: 1.3601, lng: 103.8698 },

  // --- TAMPINES ---
  { name: 'Changkat Primary School', zone: 'East', area: 'Tampines', postalCode: '529598', lat: 1.3402, lng: 103.9535 },
  { name: 'Chongzheng Primary School', zone: 'East', area: 'Tampines', postalCode: '529593', lat: 1.3508, lng: 103.9482 },
  { name: 'East Spring Primary School', zone: 'East', area: 'Tampines', postalCode: '529596', lat: 1.3538, lng: 103.9621 },
  { name: 'Gongshang Primary School', zone: 'East', area: 'Tampines', postalCode: '529594', lat: 1.3571, lng: 103.9491 },
  { name: 'Junyuan Primary School', zone: 'East', area: 'Tampines', postalCode: '528587', lat: 1.3475, lng: 103.9392 },
  { name: 'Poi Ching School', zone: 'East', area: 'Tampines', postalCode: '529595', lat: 1.3562, lng: 103.9378 },
  { name: "St. Hilda's Primary School", zone: 'East', area: 'Tampines', postalCode: '529597', lat: 1.3492, lng: 103.9365, isPopularGep: true },
  { name: 'Tampines North Primary School', zone: 'East', area: 'Tampines', postalCode: '529592', lat: 1.3582, lng: 103.9452 },
  { name: 'Tampines Primary School', zone: 'East', area: 'Tampines', postalCode: '529591', lat: 1.3501, lng: 103.9438 },
  { name: 'Yumin Primary School', zone: 'East', area: 'Tampines', postalCode: '529599', lat: 1.3512, lng: 103.9475 },

  // --- TOA PAYOH ---
  { name: 'CHIJ Primary (Toa Payoh)', zone: 'Central', area: 'Toa Payoh', postalCode: '319191', lat: 1.3325, lng: 103.8428 },
  { name: 'First Toa Payoh Primary School', zone: 'Central', area: 'Toa Payoh', postalCode: '319637', lat: 1.3371, lng: 103.8561 },
  { name: 'Kheng Cheng School', zone: 'Central', area: 'Toa Payoh', postalCode: '319326', lat: 1.3345, lng: 103.8495 },
  { name: 'Marymount Convent School', zone: 'Central', area: 'Toa Payoh', postalCode: '297824', lat: 1.3418, lng: 103.8424 },
  { name: 'Pei Chun Public School', zone: 'Central', area: 'Toa Payoh', postalCode: '319639', lat: 1.3385, lng: 103.8542, isPopularGep: true },

  // --- YISHUN ---
  { name: 'Ahmad Ibrahim Primary School', zone: 'North', area: 'Yishun', postalCode: '768583', lat: 1.4312, lng: 103.8341 },
  { name: 'Chongfu School', zone: 'North', area: 'Yishun', postalCode: '768827', lat: 1.4385, lng: 103.8398, isPopularGep: true },
  { name: 'Huamin Primary School', zone: 'North', area: 'Yishun', postalCode: '768828', lat: 1.4271, lng: 103.8452 },
  { name: 'Jiemin Primary School', zone: 'North', area: 'Yishun', postalCode: '768582', lat: 1.4285, lng: 103.8315 },
  { name: 'Naval Base Primary School', zone: 'North', area: 'Yishun', postalCode: '768079', lat: 1.4172, lng: 103.8385 },
  { name: 'Northland Primary School', zone: 'North', area: 'Yishun', postalCode: '768080', lat: 1.4215, lng: 103.8402 },
  { name: 'North View Primary School', zone: 'North', area: 'Yishun', postalCode: '768826', lat: 1.4278, lng: 103.8488 },
  { name: 'Peiying Primary School', zone: 'North', area: 'Yishun', postalCode: '768581', lat: 1.4182, lng: 103.8312 },
  { name: 'Xishan Primary School', zone: 'North', area: 'Yishun', postalCode: '768825', lat: 1.4345, lng: 103.8381 },
  { name: 'Yishun Primary School', zone: 'North', area: 'Yishun', postalCode: '768829', lat: 1.4331, lng: 103.8335 }
];

export const ALL_SCHOOL_NAMES = ALL_SINGAPORE_PRIMARY_SCHOOLS.map((s) => s.name).sort((a, b) => a.localeCompare(b));

/**
 * Calculates straight line distance (Haversine formula) in kilometers
 */
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(2));
}

/**
 * Finds a school object by name
 */
export function getSchoolByName(name: string): SingaporeSchool | undefined {
  return ALL_SINGAPORE_PRIMARY_SCHOOLS.find((s) => s.name.toLowerCase() === name.toLowerCase());
}
