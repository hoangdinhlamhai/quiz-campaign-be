/**
 * Static data mapping 16 MBTI types → thông tin chi tiết bằng tiếng Việt.
 * Dùng cho ResultsService.buildMBTIDetail() để trả về kết quả MBTI.
 */

export interface MBTITypeInfo {
  type: string;
  name: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  careers: string[];
}

export const MBTI_TYPES: Record<string, MBTITypeInfo> = {
  INTJ: {
    type: 'INTJ',
    name: 'Nhà chiến lược',
    description:
      'INTJ là những người có tư duy chiến lược, độc lập và quyết đoán. Họ luôn tìm kiếm kiến thức mới, đặt ra tiêu chuẩn cao cho bản thân và người khác. Với khả năng nhìn xa trông rộng, INTJ thường lên kế hoạch dài hạn và kiên trì thực hiện mục tiêu.',
    strengths: [
      'Tư duy chiến lược và logic',
      'Độc lập và quyết đoán',
      'Khả năng lập kế hoạch dài hạn',
      'Tiêu chuẩn cao và cầu tiến',
      'Sáng tạo trong giải quyết vấn đề',
    ],
    weaknesses: [
      'Quá cầu toàn và khắt khe',
      'Khó biểu đạt cảm xúc',
      'Thiếu kiên nhẫn với người chậm hiểu',
      'Có xu hướng xa cách xã hội',
      'Cứng nhắc với quan điểm cá nhân',
    ],
    careers: [
      'Kỹ sư phần mềm',
      'Nhà khoa học',
      'Kiến trúc sư hệ thống',
      'Giám đốc chiến lược',
      'Nhà phân tích tài chính',
    ],
  },
  INTP: {
    type: 'INTP',
    name: 'Nhà logic học',
    description:
      'INTP là những nhà tư tưởng sáng tạo với trí tò mò vô tận. Họ yêu thích phân tích lý thuyết, khám phá ý tưởng mới và tìm kiếm sự thật. INTP thường sống trong thế giới nội tâm phong phú và có khả năng nhìn nhận vấn đề từ nhiều góc độ khác nhau.',
    strengths: [
      'Tư duy phân tích sắc bén',
      'Sáng tạo và đổi mới',
      'Khách quan và logic',
      'Khả năng học hỏi nhanh',
      'Tư duy trừu tượng xuất sắc',
    ],
    weaknesses: [
      'Hay trì hoãn và thiếu tập trung',
      'Khó giao tiếp cảm xúc',
      'Thiếu thực tế trong cuộc sống',
      'Dễ chán với công việc lặp lại',
      'Khó đưa ra quyết định cuối cùng',
    ],
    careers: [
      'Nhà nghiên cứu khoa học',
      'Lập trình viên',
      'Nhà toán học',
      'Triết gia',
      'Kỹ sư dữ liệu',
    ],
  },
  ENTJ: {
    type: 'ENTJ',
    name: 'Nhà chỉ huy',
    description:
      'ENTJ là những nhà lãnh đạo bẩm sinh với tầm nhìn rộng lớn và khả năng tổ chức xuất sắc. Họ tự tin, quyết đoán và luôn hướng đến hiệu quả. ENTJ có khả năng truyền cảm hứng cho người khác và dẫn dắt nhóm đạt được mục tiêu lớn.',
    strengths: [
      'Khả năng lãnh đạo bẩm sinh',
      'Tự tin và quyết đoán',
      'Tầm nhìn chiến lược',
      'Kỹ năng tổ chức xuất sắc',
      'Hiệu quả và hướng kết quả',
    ],
    weaknesses: [
      'Hay áp đặt ý kiến lên người khác',
      'Thiếu kiên nhẫn và nóng tính',
      'Khó chấp nhận thất bại',
      'Bỏ qua cảm xúc của người khác',
      'Quá tập trung vào công việc',
    ],
    careers: [
      'Giám đốc điều hành (CEO)',
      'Luật sư',
      'Quản lý dự án',
      'Doanh nhân',
      'Tư vấn quản trị',
    ],
  },
  ENTP: {
    type: 'ENTP',
    name: 'Nhà tranh luận',
    description:
      'ENTP là những người thông minh, nhanh nhạy và yêu thích thử thách trí tuệ. Họ giỏi nhìn ra cơ hội mới, thích tranh luận và không ngại phá vỡ quy tắc. ENTP có năng lượng dồi dào và khả năng thích ứng cao với mọi tình huống.',
    strengths: [
      'Sáng tạo và đổi mới',
      'Nhanh nhạy và linh hoạt',
      'Giỏi tranh luận và thuyết phục',
      'Tự tin và năng động',
      'Khả năng nhìn ra cơ hội',
    ],
    weaknesses: [
      'Dễ chán và bỏ dở giữa chừng',
      'Hay tranh cãi không cần thiết',
      'Thiếu kiên nhẫn với chi tiết',
      'Khó tuân thủ quy tắc',
      'Có thể vô tâm với cảm xúc người khác',
    ],
    careers: [
      'Doanh nhân khởi nghiệp',
      'Luật sư tranh tụng',
      'Nhà tư vấn',
      'Nhà báo điều tra',
      'Giám đốc sáng tạo',
    ],
  },
  INFJ: {
    type: 'INFJ',
    name: 'Người che chở',
    description:
      'INFJ là những người lý tưởng, sâu sắc và có trực giác mạnh mẽ. Họ quan tâm đến ý nghĩa cuộc sống, luôn muốn giúp đỡ người khác và có khả năng thấu hiểu cảm xúc sâu xa. INFJ hiếm gặp nhất trong 16 nhóm tính cách và thường có tầm nhìn xa về tương lai.',
    strengths: [
      'Trực giác mạnh mẽ và sâu sắc',
      'Giàu lòng trắc ẩn',
      'Sáng tạo và có tầm nhìn',
      'Kiên định với giá trị cá nhân',
      'Khả năng truyền cảm hứng',
    ],
    weaknesses: [
      'Quá lý tưởng hóa',
      'Dễ kiệt sức về cảm xúc',
      'Khó mở lòng với người lạ',
      'Hay tự đặt áp lực lên bản thân',
      'Nhạy cảm quá mức với phê bình',
    ],
    careers: [
      'Nhà tâm lý học',
      'Nhà văn',
      'Cố vấn tâm linh',
      'Giáo viên',
      'Nhà hoạt động xã hội',
    ],
  },
  INFP: {
    type: 'INFP',
    name: 'Người hòa giải',
    description:
      'INFP là những người mơ mộng, giàu cảm xúc và luôn tìm kiếm ý nghĩa trong cuộc sống. Họ có thế giới nội tâm phong phú, trung thành với giá trị cá nhân và có khả năng sáng tạo nghệ thuật. INFP luôn hướng đến sự hài hòa và chân thành trong mọi mối quan hệ.',
    strengths: [
      'Giàu cảm xúc và đồng cảm',
      'Sáng tạo nghệ thuật',
      'Trung thành với giá trị cá nhân',
      'Khả năng lắng nghe tốt',
      'Tư duy sâu sắc và triết lý',
    ],
    weaknesses: [
      'Quá mơ mộng và thiếu thực tế',
      'Dễ bị tổn thương cảm xúc',
      'Khó đưa ra quyết định',
      'Hay trì hoãn',
      'Tự cô lập khi gặp khó khăn',
    ],
    careers: [
      'Nhà văn / Nhà thơ',
      'Nhà thiết kế đồ họa',
      'Nhà tâm lý trị liệu',
      'Nhạc sĩ',
      'Biên tập viên',
    ],
  },
  ENFJ: {
    type: 'ENFJ',
    name: 'Người dẫn dắt',
    description:
      'ENFJ là những nhà lãnh đạo đầy cảm hứng, ấm áp và có khả năng kết nối con người. Họ quan tâm sâu sắc đến sự phát triển của người khác, giỏi giao tiếp và luôn tạo ra môi trường tích cực. ENFJ có sức ảnh hưởng lớn và thường trở thành người dẫn dắt cộng đồng.',
    strengths: [
      'Khả năng lãnh đạo truyền cảm hứng',
      'Giao tiếp xuất sắc',
      'Đồng cảm và quan tâm người khác',
      'Tổ chức và lên kế hoạch tốt',
      'Tạo động lực cho nhóm',
    ],
    weaknesses: [
      'Quá hy sinh cho người khác',
      'Nhạy cảm với phê bình',
      'Hay lo lắng quá mức',
      'Khó nói "không"',
      'Có xu hướng kiểm soát',
    ],
    careers: [
      'Giáo viên / Giảng viên',
      'Quản lý nhân sự',
      'Nhà tư vấn',
      'Diễn giả truyền cảm hứng',
      'Nhà ngoại giao',
    ],
  },
  ENFP: {
    type: 'ENFP',
    name: 'Người truyền cảm hứng',
    description:
      'ENFP là những người nhiệt huyết, sáng tạo và tràn đầy năng lượng. Họ yêu thích khám phá khả năng mới, kết nối với mọi người và sống theo đam mê. ENFP có khả năng nhìn thấy tiềm năng trong mọi thứ và truyền cảm hứng cho người xung quanh.',
    strengths: [
      'Nhiệt huyết và lạc quan',
      'Sáng tạo và giàu trí tưởng tượng',
      'Giao tiếp tốt và thân thiện',
      'Linh hoạt và thích ứng nhanh',
      'Khả năng truyền cảm hứng',
    ],
    weaknesses: [
      'Thiếu tập trung và hay phân tán',
      'Quá lý tưởng hóa',
      'Khó hoàn thành dự án dài hạn',
      'Dễ bị stress khi bị ràng buộc',
      'Hay đưa ra quyết định cảm tính',
    ],
    careers: [
      'Nhà báo',
      'Chuyên viên marketing sáng tạo',
      'Diễn viên / Nghệ sĩ',
      'Nhà tư vấn nghề nghiệp',
      'Nhà thiết kế UX/UI',
    ],
  },
  ISTJ: {
    type: 'ISTJ',
    name: 'Người trách nhiệm',
    description:
      'ISTJ là những người đáng tin cậy, có trách nhiệm và làm việc có hệ thống. Họ coi trọng truyền thống, tuân thủ quy tắc và luôn hoàn thành nhiệm vụ đúng hạn. ISTJ là trụ cột vững chắc trong mọi tổ chức nhờ sự tận tâm và chính xác.',
    strengths: [
      'Đáng tin cậy và có trách nhiệm',
      'Làm việc có hệ thống và tổ chức',
      'Kiên nhẫn và bền bỉ',
      'Chính xác và cẩn thận',
      'Trung thành và tận tâm',
    ],
    weaknesses: [
      'Cứng nhắc và khó thay đổi',
      'Quá tập trung vào chi tiết',
      'Khó thích ứng với tình huống mới',
      'Ít biểu đạt cảm xúc',
      'Hay phán xét người khác',
    ],
    careers: [
      'Kế toán / Kiểm toán',
      'Quản lý hành chính',
      'Kỹ sư xây dựng',
      'Sĩ quan quân đội',
      'Chuyên viên pháp lý',
    ],
  },
  ISFJ: {
    type: 'ISFJ',
    name: 'Người bảo vệ',
    description:
      'ISFJ là những người ấm áp, chu đáo và luôn sẵn sàng giúp đỡ người khác. Họ có trí nhớ tốt, quan tâm đến chi tiết và coi trọng sự ổn định. ISFJ thường âm thầm cống hiến và tạo ra môi trường an toàn, thoải mái cho mọi người xung quanh.',
    strengths: [
      'Chu đáo và quan tâm người khác',
      'Đáng tin cậy và kiên nhẫn',
      'Trí nhớ tốt về chi tiết',
      'Làm việc chăm chỉ và tận tâm',
      'Tạo sự ổn định và hài hòa',
    ],
    weaknesses: [
      'Quá hy sinh bản thân',
      'Khó từ chối yêu cầu',
      'Ngại thay đổi và rủi ro',
      'Hay tự trách bản thân',
      'Khó bày tỏ nhu cầu cá nhân',
    ],
    careers: [
      'Y tá / Bác sĩ',
      'Giáo viên tiểu học',
      'Nhân viên xã hội',
      'Thủ thư',
      'Chuyên viên chăm sóc khách hàng',
    ],
  },
  ESTJ: {
    type: 'ESTJ',
    name: 'Nhà quản lý',
    description:
      'ESTJ là những người thực tế, có tổ chức và giỏi quản lý. Họ coi trọng trật tự, hiệu quả và trách nhiệm. ESTJ thường đảm nhận vai trò lãnh đạo trong cộng đồng và tổ chức, đảm bảo mọi thứ vận hành trơn tru theo kế hoạch.',
    strengths: [
      'Kỹ năng tổ chức và quản lý',
      'Thực tế và hiệu quả',
      'Trung thực và thẳng thắn',
      'Có trách nhiệm và đáng tin cậy',
      'Khả năng ra quyết định nhanh',
    ],
    weaknesses: [
      'Cứng nhắc với quy tắc',
      'Thiếu linh hoạt trong suy nghĩ',
      'Hay phán xét và áp đặt',
      'Khó chấp nhận ý kiến khác biệt',
      'Ít quan tâm đến cảm xúc',
    ],
    careers: [
      'Quản lý doanh nghiệp',
      'Sĩ quan cảnh sát',
      'Thẩm phán',
      'Giám đốc tài chính',
      'Quản lý chuỗi cung ứng',
    ],
  },
  ESFJ: {
    type: 'ESFJ',
    name: 'Người chăm sóc',
    description:
      'ESFJ là những người thân thiện, hào phóng và luôn quan tâm đến hạnh phúc của người khác. Họ giỏi tạo ra sự kết nối xã hội, coi trọng sự hài hòa và truyền thống. ESFJ thường là trung tâm của nhóm bạn và gia đình, mang lại niềm vui cho mọi người.',
    strengths: [
      'Thân thiện và hòa đồng',
      'Quan tâm và chăm sóc người khác',
      'Kỹ năng giao tiếp xã hội tốt',
      'Có trách nhiệm và đáng tin cậy',
      'Tạo sự hài hòa trong nhóm',
    ],
    weaknesses: [
      'Quá phụ thuộc vào sự công nhận',
      'Khó đối mặt với xung đột',
      'Hay lo lắng về ý kiến người khác',
      'Thiếu linh hoạt với thay đổi',
      'Dễ bị tổn thương khi bị phê bình',
    ],
    careers: [
      'Bác sĩ gia đình',
      'Giáo viên',
      'Nhân viên quan hệ công chúng',
      'Quản lý sự kiện',
      'Chuyên viên tư vấn',
    ],
  },
  ISTP: {
    type: 'ISTP',
    name: 'Nhà kỹ thuật',
    description:
      'ISTP là những người thực tế, khéo léo và yêu thích tìm hiểu cách mọi thứ hoạt động. Họ bình tĩnh trong mọi tình huống, giỏi giải quyết vấn đề kỹ thuật và thích tự do hành động. ISTP có khả năng phản ứng nhanh và hiệu quả trong tình huống khẩn cấp.',
    strengths: [
      'Khéo léo và thực tế',
      'Bình tĩnh dưới áp lực',
      'Giỏi giải quyết vấn đề kỹ thuật',
      'Linh hoạt và thích ứng nhanh',
      'Độc lập và tự chủ',
    ],
    weaknesses: [
      'Khó cam kết lâu dài',
      'Ít biểu đạt cảm xúc',
      'Hay mạo hiểm không cần thiết',
      'Thiếu kiên nhẫn với lý thuyết',
      'Khó làm việc theo quy trình cứng',
    ],
    careers: [
      'Kỹ sư cơ khí',
      'Phi công',
      'Thợ sửa chữa chuyên nghiệp',
      'Lập trình viên hệ thống',
      'Nhà thám hiểm',
    ],
  },
  ISFP: {
    type: 'ISFP',
    name: 'Người nghệ sĩ',
    description:
      'ISFP là những người nhạy cảm, nghệ thuật và sống theo khoảnh khắc. Họ yêu thích vẻ đẹp, trân trọng tự do cá nhân và thể hiện bản thân qua nghệ thuật. ISFP có khả năng cảm nhận tinh tế và thường tạo ra những tác phẩm đầy cảm xúc.',
    strengths: [
      'Nhạy cảm và tinh tế',
      'Sáng tạo nghệ thuật',
      'Sống hài hòa với hiện tại',
      'Thân thiện và dễ gần',
      'Linh hoạt và cởi mở',
    ],
    weaknesses: [
      'Khó lên kế hoạch dài hạn',
      'Dễ bị tổn thương cảm xúc',
      'Tránh xung đột quá mức',
      'Thiếu quyết đoán',
      'Hay tự đánh giá thấp bản thân',
    ],
    careers: [
      'Họa sĩ / Nhà điêu khắc',
      'Nhiếp ảnh gia',
      'Nhà thiết kế thời trang',
      'Nhạc sĩ',
      'Đầu bếp sáng tạo',
    ],
  },
  ESTP: {
    type: 'ESTP',
    name: 'Nhà kinh doanh',
    description:
      'ESTP là những người năng động, thực tế và yêu thích hành động. Họ sống trong hiện tại, giỏi nắm bắt cơ hội và có khả năng thuyết phục người khác. ESTP thích mạo hiểm, tìm kiếm trải nghiệm mới và luôn tạo ra năng lượng tích cực xung quanh.',
    strengths: [
      'Năng động và quyết đoán',
      'Giỏi nắm bắt cơ hội',
      'Thực tế và hướng hành động',
      'Kỹ năng thuyết phục tốt',
      'Thích ứng nhanh với thay đổi',
    ],
    weaknesses: [
      'Thiếu kiên nhẫn với kế hoạch dài',
      'Hay mạo hiểm quá mức',
      'Khó tập trung vào chi tiết',
      'Ít quan tâm đến cảm xúc sâu',
      'Dễ chán với công việc đơn điệu',
    ],
    careers: [
      'Doanh nhân',
      'Nhân viên kinh doanh',
      'Vận động viên chuyên nghiệp',
      'Nhà môi giới bất động sản',
      'Quản lý nhà hàng / Khách sạn',
    ],
  },
  ESFP: {
    type: 'ESFP',
    name: 'Người trình diễn',
    description:
      'ESFP là những người vui vẻ, hào phóng và yêu thích cuộc sống. Họ có khả năng giải trí tự nhiên, thích được chú ý và luôn mang lại niềm vui cho người xung quanh. ESFP sống trọn vẹn từng khoảnh khắc và có năng khiếu kết nối với mọi người.',
    strengths: [
      'Vui vẻ và lạc quan',
      'Khả năng giải trí tự nhiên',
      'Thân thiện và hòa đồng',
      'Thực tế và linh hoạt',
      'Năng lượng tích cực lan tỏa',
    ],
    weaknesses: [
      'Thiếu kế hoạch dài hạn',
      'Dễ bị phân tán bởi thú vui',
      'Khó đối mặt với vấn đề nghiêm túc',
      'Hay chi tiêu quá mức',
      'Tránh né xung đột',
    ],
    careers: [
      'Diễn viên / MC',
      'Hướng dẫn viên du lịch',
      'Nhà thiết kế nội thất',
      'Chuyên viên tổ chức sự kiện',
      'Huấn luyện viên thể hình',
    ],
  },
};
