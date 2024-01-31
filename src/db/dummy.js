const defaultMale =
  "https://firebasestorage.googleapis.com/v0/b/dinnermate-database.appspot.com/o/assets%2FMale.png?alt=media&token=b82a2957-545d-4b68-901f-7cbaadb0a42c";

const defaultFemale =
  "https://firebasestorage.googleapis.com/v0/b/dinnermate-database.appspot.com/o/assets%2FFemale.png?alt=media&token=58e5f88b-0954-432b-bd69-6f774b5b3a61";

export const defaultUser = [
  {
    user_bank: {
      bank_name: "국민",
      account_number: "123456789",
    },
    user_birth: "2000-01-01",
    user_email: "cidi@example.com",
    user_food: ["양식"],
    user_gender: "남",
    user_name: "김현우",
    user_password: "1q2w3e4r!",
    user_phone: "01012341234",
    user_place: ["서울특별시 강남구"],
    user_price: 2,
    user_profile: defaultMale,
    user_type: "개인",
    user_info:
      " AI 인공지능 회사에서 CTO로 근무하고 있어요! AI 관심있으신분 평일 저녁에 해운대 현백에서 간단히 식사하면서 얘기 나눠요~",
  },
  {
    user_bank: {
      bank_name: "기업",
      account_number: "123456789",
    },
    user_birth: "2000-01-01",
    user_email: "diej@example.com",
    user_food: ["한식"],
    user_gender: "여",
    user_name: "이소은",
    user_password: "1q2w3e4r!",
    user_phone: "01012341234",
    user_place: ["서울특별시 광진구"],
    user_price: 4,
    user_profile: defaultFemale,
    user_type: "개인",
  },
  {
    user_bank: {
      bank_name: "신한",
      account_number: "123456789",
    },
    user_birth: "2000-01-01",
    user_email: "gsfd@example.com",
    user_food: ["중식"],
    user_gender: "남",
    user_name: "민준서",
    user_password: "1q2w3e4r!",
    user_phone: "01012341234",
    user_place: ["서울특별시 용산구"],
    user_price: 6,
    user_profile: defaultMale,
    user_type: "개인",
  },
  {
    user_bank: {
      bank_name: "신한",
      account_number: "123456789",
    },
    user_birth: "2000-01-01",
    user_email: "eoes@example.com",
    user_food: ["중식"],
    user_gender: "여",
    user_name: "김민지",
    user_password: "1q2w3e4r!",
    user_phone: "01012341234",
    user_place: ["서울특별시 용산구"],
    user_price: 5,
    user_profile: defaultFemale,
    user_type: "개인",
  },
  {
    user_bank: {
      bank_name: "농협",
      account_number: "123456789",
    },
    user_birth: "2000-01-01",
    user_email: "eoe2@example.com",
    user_food: ["중식"],
    user_gender: "남",
    user_name: "유승민",
    user_password: "1q2w3e4r!",
    user_phone: "01012341234",
    user_place: ["서울특별시 양천구"],
    user_price: 8,
    user_profile: defaultMale,
    user_type: "개인",
  },
  {
    user_bank: {
      bank_name: "농협",
      account_number: "123456789",
    },
    user_birth: "2000-01-01",
    user_email: "42dis@example.com",
    user_food: ["한식"],
    user_gender: "여",
    user_name: "김가현",
    user_password: "1q2w3e4r!",
    user_phone: "01012341234",
    user_place: ["서울특별시 서초구"],
    user_price: 10,
    user_profile: defaultFemale,
    user_type: "개인",
  },
];

export const defaultMentor = [
  {
    user_bank: {
      bank_name: "국민",
      account_number: "123456789",
    },
    user_birth: "2000-01-01",
    user_email: "cidi@example.com",
    user_food: ["양식"],
    user_gender: "남",
    user_name: "김지훈",
    user_password: "1q2w3e4r!",
    user_phone: "01012341234",
    user_place: ["서울특별시 강남구"],
    user_price: 2,
    user_profile: defaultMale,
    user_category: "의류 쇼핑몰",
    user_type: "멘토",
    user_ingo:
      "의류 쇼핑몰 연 매출 20억 달성하고 디자이너 브랜드 런칭하여 운영중에 있어요. 의류 쇼핑몰로 매출 내고 있으신 분들만 식사권 신청 부탁드려요! 식사 가능 시간은 평일 저녁 7시~8시30분 가능합니다!",
  },
  {
    user_bank: {
      bank_name: "기업",
      account_number: "123456789",
    },
    user_birth: "2000-01-01",
    user_email: "diej@example.com",
    user_food: ["한식"],
    user_gender: "여",
    user_name: "박서연",
    user_password: "1q2w3e4r!",
    user_phone: "01012341234",
    user_place: ["서울특별시 광진구"],
    user_price: 4,
    user_profile: defaultFemale,
    user_category: "해외구매대행",
    user_type: "멘토",
    user_info:
      "해외구매대행 처음 시작하시는 분들에게 방향성 및 소싱 방법에 대한 노하우 전수해드립니다. 유통업이 처음이시더라도 조언 들으신 후 사업하시는 것이 시간을 줄이실 수 있으실거에요. 해외구매대행으로만 작년 기준 매출 3억 달성하였고 올해는 아기 용품 브랜드 런칭하였습니다. 브랜드 런칭에도 도움드릴 수 있으니 관심있으신분들은 식사권 신청바랍니다. 식사가능 시간은 평일 저녁 6시 이후 부터 가능합니다",
  },
  {
    user_bank: {
      bank_name: "신한",
      account_number: "123456789",
    },
    user_birth: "2000-01-01",
    user_email: "gsfd@example.com",
    user_food: ["중식"],
    user_gender: "남",
    user_name: "유태윤",
    user_password: "1q2w3e4r!",
    user_phone: "01012341234",
    user_place: ["서울특별시 용산구"],
    user_price: 6,
    user_profile: defaultMale,
    user_category: "교육",
    user_type: "멘토",
    user_info: "",
  },
  {
    user_bank: {
      bank_name: "신한",
      account_number: "123456789",
    },
    user_birth: "2000-01-01",
    user_email: "eoes@example.com",
    user_food: ["중식"],
    user_gender: "여",
    user_name: "유하린",
    user_password: "1q2w3e4r!",
    user_phone: "01012341234",
    user_place: ["서울특별시 용산구"],
    user_price: 5,
    user_profile: defaultFemale,
    user_category: "환경",
    user_type: "멘토",
    user_info: "",
  },
  {
    user_bank: {
      bank_name: "농협",
      account_number: "123456789",
    },
    user_birth: "2000-01-01",
    user_email: "eoe2@example.com",
    user_food: ["중식"],
    user_gender: "남",
    user_name: "박성우",
    user_password: "1q2w3e4r!",
    user_phone: "01012341234",
    user_place: ["서울특별시 양천구"],
    user_price: 8,
    user_profile: defaultMale,
    user_category: "건강 및 피트니스",
    user_type: "멘토",
    user_info: "",
  },
  {
    user_bank: {
      bank_name: "농협",
      account_number: "123456789",
    },
    user_birth: "2000-01-01",
    user_email: "42dis@example.com",
    user_food: ["한식"],
    user_gender: "여",
    user_name: "윤지영",
    user_password: "1q2w3e4r!",
    user_phone: "01012341234",
    user_place: ["서울특별시 서초구"],
    user_price: 10,
    user_profile: defaultFemale,
    user_category: "IT 및 소프트웨어 개발",
    user_type: "멘토",
    user_info:
      "에듀테크 it기업 엑싯경험으로 다양한 경험과 노하우를 알려드리겠습니다. 사업 조언 및 방향성 등에 도움이 많이 되실거에요 식사시간은 평일 점심시간만 역삼동에서 가능합니다. 12시~1시30분 입니다. 감사합니다.",
  },
];
