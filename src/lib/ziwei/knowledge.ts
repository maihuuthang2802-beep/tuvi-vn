export type KnowledgeTopic =
  | 'overview'
  | 'personality'
  | 'love'
  | 'career'
  | 'wealth'
  | 'health'
  | 'family'
  | 'children'
  | 'move'
  | 'friends'
  | 'home'
  | 'spirit'
  | 'parents';

export interface StarProfile {
  slug: string;
  name: string;
  brief: string;
  strengths: string[];
  cautions: string[];
  loveStyle: string;
  careerStyle: string;
  wealthStyle: string;
  healthStyle: string;
  archetype: string;
  elementStyle: string;
  idealRoles: string[];
  relationshipNeeds: string[];
  stressSignals: string[];
  growthKeys: string[];
  relatedStars: string[];
  keywords: string[];
}

export interface TopicDefinition {
  slug: KnowledgeTopic;
  label: string;
  palaceLabel: string;
  intro: string;
  advice: string;
}

export interface KnowledgeSection {
  title: string;
  body: string;
  bullets: string[];
}

export interface KnowledgeEntry {
  star: string;
  starSlug: string;
  topic: KnowledgeTopic;
  topicLabel: string;
  palaceLabel: string;
  summary: string;
  core: string;
  basis: string;
  guidance: string;
  headline: string;
  cautionHeadline: string;
  practicalUse: string;
  keywords: string[];
  relatedTopics: KnowledgeTopic[];
  relatedStars: string[];
  sections: KnowledgeSection[];
}

export const STAR_PROFILES: StarProfile[] = [
  {
    slug: 'tu-vi',
    name: 'Tử Vi',
    brief: 'Chủ tinh quyền uy, giỏi điều phối, hợp vai trò trung tâm và gánh trách nhiệm lớn.',
    strengths: ['khả năng dẫn dắt', 'tư duy tổ chức', 'giữ trục ổn định cho tập thể'],
    cautions: ['dễ tự áp lực', 'khó buông quyền chủ động', 'kỳ vọng cao vào người thân'],
    loveStyle: 'Yêu theo kiểu bảo bọc và muốn xây nền nếp rõ.',
    careerStyle: 'Hợp môi trường có cấu trúc, vai trò quản trị hoặc quyết định.',
    wealthStyle: 'Thiên về tích lũy bền, thích kiểm soát nguồn lực.',
    healthStyle: 'Dễ mệt vì ôm việc và căng đầu kéo dài.',
    archetype: 'Người cầm trục và giữ thế trận.',
    elementStyle: 'Năng lượng đi theo quyền, danh, trách nhiệm và độ ổn định của hệ thống.',
    idealRoles: ['quản trị', 'điều phối lớn', 'trưởng nhóm', 'vai trò đại diện'],
    relationshipNeeds: ['sự tôn trọng', 'niềm tin rõ ràng', 'đối tác biết chia vai'],
    stressSignals: ['ôm việc quá mức', 'kiểm soát quá tay', 'khó thả lỏng khi không nắm tình hình'],
    growthKeys: ['học trao quyền', 'nghe phản hồi thật', 'phân biệt trách nhiệm với gánh hộ'],
    relatedStars: ['Thiên Phủ', 'Thiên Tướng', 'Thái Dương'],
    keywords: ['lãnh đạo', 'quyền uy', 'ổn định', 'trung tâm'],
  },
  {
    slug: 'thien-co',
    name: 'Thiên Cơ',
    brief: 'Chủ tinh mưu lược, nhanh trí, linh hoạt, mạnh về quan sát và điều chỉnh.',
    strengths: ['học nhanh', 'nhìn ra phương án', 'khéo xoay sở'],
    cautions: ['dễ phân tán', 'lo xa', 'hay đổi ý khi áp lực'],
    loveStyle: 'Cần đối thoại thông minh và cảm giác được thấu hiểu.',
    careerStyle: 'Hợp phân tích, chiến lược, sản phẩm, giáo dục, tư vấn.',
    wealthStyle: 'Kiếm tiền bằng kỹ năng và ý tưởng hơn là sức bền đơn thuần.',
    healthStyle: 'Cần giữ thần kinh ổn định và ngủ đủ.',
    archetype: 'Người xoay bàn cờ bằng trí và nhịp quan sát.',
    elementStyle: 'Năng lượng biến hóa, lấy độ nhanh nhạy và khả năng nhìn nhiều hướng làm gốc.',
    idealRoles: ['chiến lược', 'tư vấn', 'nghiên cứu', 'product'],
    relationshipNeeds: ['được hiểu đúng', 'không gian suy nghĩ', 'đối thoại có chiều sâu'],
    stressSignals: ['não chạy liên tục', 'khó chốt', 'sợ mất phương án tốt hơn'],
    growthKeys: ['chọn ít mà sâu', 'rèn thói quen chốt', 'giảm lo trước khi nó xảy ra'],
    relatedStars: ['Thái Âm', 'Cự Môn', 'Văn Xương'],
    keywords: ['trí tuệ', 'linh hoạt', 'mưu lược', 'quan sát'],
  },
  {
    slug: 'thai-duong',
    name: 'Thái Dương',
    brief: 'Chủ tinh quang minh, cởi mở, trọng danh dự và thích tạo giá trị công khai.',
    strengths: ['nhiệt thành', 'tinh thần công ích', 'khả năng truyền cảm hứng'],
    cautions: ['quá thẳng', 'dễ kiệt sức vì cho đi nhiều', 'cần được ghi nhận'],
    loveStyle: 'Yêu rõ ràng, thích chủ động chăm và dẫn dắt.',
    careerStyle: 'Hợp truyền thông, giáo dục, quản lý, công việc đối ngoại.',
    wealthStyle: 'Tài lộc đi cùng danh tiếng và khả năng mở rộng quan hệ.',
    healthStyle: 'Cần cân bằng nhịp làm việc, mắt và tim mạch.',
    archetype: 'Người chiếu sáng, dẫn khí và mở mặt trận công khai.',
    elementStyle: 'Năng lượng hướng ngoại, đi cùng danh chính ngôn thuận và tinh thần phục vụ.',
    idealRoles: ['đại diện', 'diễn giả', 'quản lý', 'công việc công chúng'],
    relationshipNeeds: ['sự công khai', 'lòng tin sáng rõ', 'được ghi nhận thiện ý'],
    stressSignals: ['làm quá sức', 'tổn thương vì không được công nhận', 'quá nóng khi va chạm'],
    growthKeys: ['giảm sĩ diện', 'để người khác cùng tỏa sáng', 'nghỉ đúng nhịp'],
    relatedStars: ['Thiên Lương', 'Tử Vi', 'Thiên Tướng'],
    keywords: ['ánh sáng', 'công khai', 'danh dự', 'dẫn dắt'],
  },
  {
    slug: 'vu-khuc',
    name: 'Vũ Khúc',
    brief: 'Chủ tinh tài chính, quyết đoán, thực tế, chịu được áp lực vật chất cao.',
    strengths: ['kỷ luật', 'quản tiền tốt', 'ra quyết định dứt khoát'],
    cautions: ['khô cảm xúc', 'cứng', 'dễ đặt hiệu suất lên trước tình người'],
    loveStyle: 'Thể hiện yêu bằng trách nhiệm và hành động hơn lời nói.',
    careerStyle: 'Hợp tài chính, vận hành, kinh doanh, kỹ thuật, quản trị nguồn lực.',
    wealthStyle: 'Mạnh ở tích lũy, đầu tư có kỷ luật, ít hợp may rủi.',
    healthStyle: 'Cần xả stress cơ xương khớp và áp lực đầu óc.',
    archetype: 'Người chốt việc, giữ tiền và giữ nhịp thực tế.',
    elementStyle: 'Năng lượng đi theo hiệu quả, cấu trúc và sức bền trong áp lực vật chất.',
    idealRoles: ['tài chính', 'ops', 'đầu tư', 'quản trị thực thi'],
    relationshipNeeds: ['sự rõ ràng', 'tính ổn định', 'đối tác biết giữ lời'],
    stressSignals: ['gồng quá lâu', 'thiếu mềm dẻo', 'đo giá trị bằng hiệu suất'],
    growthKeys: ['tập nói cảm xúc', 'giảm cứng khi thân mật', 'tách tiền khỏi giá trị bản thân'],
    relatedStars: ['Thiên Phủ', 'Thất Sát', 'Tử Vi'],
    keywords: ['tài chính', 'kỷ luật', 'thực tế', 'quyết đoán'],
  },
  {
    slug: 'thien-dong',
    name: 'Thiên Đồng',
    brief: 'Chủ tinh phúc khí, mềm, giàu cảm xúc, đề cao sự dễ chịu và hòa khí.',
    strengths: ['tạo cảm giác an toàn', 'dịu xung đột', 'tinh thần nhân hậu'],
    cautions: ['ngại va chạm', 'dễ trì hoãn', 'thiếu quyết đoán lúc khó'],
    loveStyle: 'Ưa sự dịu dàng, quan tâm đều và ít áp lực.',
    careerStyle: 'Hợp dịch vụ, chăm sóc, giáo dục, sáng tạo mềm.',
    wealthStyle: 'Tài lộc tăng tốt khi môi trường làm việc dễ chịu và có quý nhân.',
    healthStyle: 'Cần giữ tiêu hóa, nội tiết và thói quen vận động đều.',
    archetype: 'Người giữ ấm không gian và làm mềm cục diện.',
    elementStyle: 'Năng lượng đi theo phúc khí, cảm giác an toàn và sự nuôi dưỡng đều đặn.',
    idealRoles: ['dịch vụ', 'chăm sóc', 'giáo dục', 'wellness'],
    relationshipNeeds: ['sự nhẹ nhàng', 'ít phán xét', 'một nhịp sống êm'],
    stressSignals: ['né xung đột', 'để việc chậm tích lại', 'co mình khi bị ép'],
    growthKeys: ['học nói không', 'dám chốt ở việc cần chốt', 'nuôi kỷ luật mềm mỗi ngày'],
    relatedStars: ['Thái Âm', 'Thiên Lương', 'Hồng Loan'],
    keywords: ['phúc khí', 'êm', 'nuôi dưỡng', 'hòa khí'],
  },
  {
    slug: 'liem-trinh',
    name: 'Liêm Trinh',
    brief: 'Chủ tinh hấp lực, nguyên tắc, giàu bản năng kiểm soát và ý thức danh dự.',
    strengths: ['sắc bén', 'kiên định', 'giữ chuẩn mực cao'],
    cautions: ['dễ cực đoan', 'ghen hoặc kiểm soát mạnh', 'va chạm quyền lực'],
    loveStyle: 'Yêu sâu, mãnh, cần sự minh bạch và trung thành cao.',
    careerStyle: 'Hợp pháp lý, quản trị, thương lượng, lĩnh vực cần bản lĩnh.',
    wealthStyle: 'Kiếm tiền tốt khi biết giữ kỷ luật và tránh quyết định nóng.',
    healthStyle: 'Cần chú ý stress, gan mật và mất cân bằng cảm xúc.',
    archetype: 'Người mang lực hút mạnh và ý thức chuẩn sai rất rõ.',
    elementStyle: 'Năng lượng đi theo dục lực, nguyên tắc và cách giữ ranh giới quyền - tình.',
    idealRoles: ['pháp lý', 'đàm phán', 'quản trị', 'lãnh đạo bản lĩnh'],
    relationshipNeeds: ['sự trung thực', 'cam kết rõ', 'không mập mờ quyền lực'],
    stressSignals: ['kiểm soát quá mức', 'bốc hỏa trong nghi ngờ', 'đưa mọi việc về thắng - thua'],
    growthKeys: ['giảm cực đoan', 'đặt ranh giới mà không trấn áp', 'học tin đúng người'],
    relatedStars: ['Phá Quân', 'Tham Lang', 'Thiên Tướng'],
    keywords: ['hấp lực', 'nguyên tắc', 'kiểm soát', 'danh dự'],
  },
  {
    slug: 'thien-phu',
    name: 'Thiên Phủ',
    brief: 'Chủ tinh kho tàng, ổn trọng, giữ của, có thiên hướng bảo toàn hệ thống.',
    strengths: ['ổn định', 'đáng tin', 'biết tích lũy và nuôi nền'],
    cautions: ['bảo thủ', 'chậm đổi mới', 'dễ ở lâu trong vùng an toàn'],
    loveStyle: 'Đề cao bền vững, sự tử tế và an toàn lâu dài.',
    careerStyle: 'Hợp quản trị, hậu cần, tài sản, nhân sự, tổ chức bền.',
    wealthStyle: 'Giỏi tích sản và quản lý nguồn lực dài hạn.',
    healthStyle: 'Cần chú ý chuyển hóa, cân nặng và thiếu vận động.',
    archetype: 'Người giữ kho, giữ nền và giữ độ an toàn cho hệ thống.',
    elementStyle: 'Năng lượng đi theo tích lũy, bảo toàn và xây nền dài hơi.',
    idealRoles: ['quản trị nền', 'nhân sự', 'tài sản', 'hậu cần'],
    relationshipNeeds: ['sự tử tế bền', 'an toàn', 'đối tác biết giữ nền'],
    stressSignals: ['ngại đổi mới', 'giữ quá kỹ', 'chần chừ khi thời cuộc đổi'],
    growthKeys: ['linh hoạt hơn với cái mới', 'đừng ôm hết tài nguyên', 'đi chậm nhưng đừng đứng yên'],
    relatedStars: ['Tử Vi', 'Vũ Khúc', 'Thiên Tướng'],
    keywords: ['tích lũy', 'ổn trọng', 'giữ nền', 'an toàn'],
  },
  {
    slug: 'thai-am',
    name: 'Thái Âm',
    brief: 'Chủ tinh cảm xúc, tinh tế, trực giác, thiên về nuôi dưỡng và chiều sâu.',
    strengths: ['thấu cảm', 'gu thẩm mỹ', 'khả năng quan sát tinh'],
    cautions: ['dễ buồn kín', 'nhạy cảm quá mức', 'tự tiêu hao năng lượng'],
    loveStyle: 'Cần sự tinh tế, dịu dàng và bền nhịp cảm xúc.',
    careerStyle: 'Hợp nghiên cứu, tài chính mềm, nội dung, thiết kế, chăm sóc.',
    wealthStyle: 'Tài lộc dễ đi cùng tích lũy, bất động sản hoặc công việc chuyên môn tinh.',
    healthStyle: 'Cần giữ giấc ngủ, nội tiết và cảm xúc ổn định.',
    archetype: 'Người nuôi chiều sâu, giữ cảm xúc và cảm nhận tinh vi.',
    elementStyle: 'Năng lượng âm, mềm, đi qua trực giác, ký ức và khả năng nuôi dưỡng lâu dài.',
    idealRoles: ['nghiên cứu', 'thiết kế', 'nội dung', 'tài chính mềm'],
    relationshipNeeds: ['sự tinh tế', 'nhịp chậm mà thật', 'không gian an toàn để mở lòng'],
    stressSignals: ['thu mình', 'buồn không nói', 'mất ngủ vì suy nhiều'],
    growthKeys: ['gọi tên cảm xúc', 'bớt giữ trong lòng', 'giữ thân - tâm bằng nếp sống đều'],
    relatedStars: ['Thiên Cơ', 'Thiên Đồng', 'Văn Khúc'],
    keywords: ['trực giác', 'chiều sâu', 'nuôi dưỡng', 'tinh tế'],
  },
  {
    slug: 'tham-lang',
    name: 'Tham Lang',
    brief: 'Chủ tinh dục vọng, giao tế, tài nghệ, mạnh về sức hút và trải nghiệm.',
    strengths: ['đa tài', 'mở quan hệ nhanh', 'biết nắm cơ hội'],
    cautions: ['ham nhiều', 'dễ quá tay', 'phân tán vào vui thú hoặc ngắn hạn'],
    loveStyle: 'Yêu có lửa, nhiều cảm hứng nhưng cần kỷ luật để bền.',
    careerStyle: 'Hợp kinh doanh, marketing, giải trí, đàm phán, lĩnh vực cần sức hút.',
    wealthStyle: 'Kiếm tiền nhanh khi gặp thời, nhưng cần kỷ luật giữ tiền.',
    healthStyle: 'Cần tránh quá độ trong ăn uống, thức khuya, rượu và stress vui thú.',
    archetype: 'Người khuấy động cơ hội bằng sức hút và độ lan tỏa.',
    elementStyle: 'Năng lượng đi theo ham muốn sống, trải nghiệm, mạng lưới và cảm hứng tức thời.',
    idealRoles: ['sales', 'marketing', 'kinh doanh', 'giải trí'],
    relationshipNeeds: ['lửa sống', 'sự mới mẻ', 'ranh giới rõ để tự do không thành lệch'],
    stressSignals: ['quá tay', 'tham nhiều hướng', 'dễ sa vào ngắn hạn'],
    growthKeys: ['chọn ít hơn', 'quản cám dỗ', 'đưa cảm hứng vào cấu trúc'],
    relatedStars: ['Liêm Trinh', 'Phá Quân', 'Hồng Loan'],
    keywords: ['sức hút', 'giao tế', 'dục lực', 'cơ hội'],
  },
  {
    slug: 'cu-mon',
    name: 'Cự Môn',
    brief: 'Chủ tinh khẩu tài, phản biện, đào sâu vấn đề, mạnh ở ngôn ngữ và lập luận.',
    strengths: ['phân tích sâu', 'nói có sức nặng', 'nhìn ra góc khuất'],
    cautions: ['dễ tranh biện quá mức', 'sinh thị phi', 'nghi ngờ kéo dài'],
    loveStyle: 'Cần nói thật, nói rõ, tránh vòng vo và suy diễn.',
    careerStyle: 'Hợp luật, giảng dạy, nghiên cứu, tư vấn, nội dung chuyên môn.',
    wealthStyle: 'Tài lộc tốt khi dùng kiến thức và tiếng nói đúng chỗ.',
    healthStyle: 'Cần chú ý họng, tiêu hóa và áp lực tinh thần.',
    archetype: 'Người bóc lớp vỏ ngoài để đi vào lõi vấn đề.',
    elementStyle: 'Năng lượng đi theo lời nói, phản biện, sức nặng tri thức và khả năng nhìn góc khuất.',
    idealRoles: ['luật', 'giảng dạy', 'nội dung chuyên môn', 'tư vấn'],
    relationshipNeeds: ['thật lòng', 'giao tiếp minh bạch', 'không đẩy xung đột bằng mỉa mai'],
    stressSignals: ['suy diễn', 'thị phi', 'nói đúng nhưng làm đau người khác'],
    growthKeys: ['dịu giọng', 'tách sự thật khỏi hơn thua', 'kiểm chứng trước khi kết luận'],
    relatedStars: ['Thiên Cơ', 'Văn Xương', 'Thái Dương'],
    keywords: ['khẩu tài', 'phản biện', 'ngôn ngữ', 'góc khuất'],
  },
  {
    slug: 'thien-tuong',
    name: 'Thiên Tướng',
    brief: 'Chủ tinh phối hợp, chính trực, biết cân bằng lợi ích và giữ phép tắc.',
    strengths: ['ngoại giao', 'công bằng', 'hợp tác tốt'],
    cautions: ['dễ chiều lòng quá mức', 'ngại quyết liệt', 'gánh việc người khác'],
    loveStyle: 'Yêu theo kiểu đồng hành, tôn trọng và giữ hòa khí.',
    careerStyle: 'Hợp hành chính, pháp vụ, đối tác, điều phối, dịch vụ chuẩn chỉnh.',
    wealthStyle: 'Tiền đến tốt khi làm trong hệ thống rõ vai trò và chuẩn mực.',
    healthStyle: 'Cần giữ thận trọng với stress âm thầm và thiếu vận động.',
    archetype: 'Người cân lực, giữ phép và làm trung gian bền bỉ.',
    elementStyle: 'Năng lượng đi theo chuẩn mực, phối hợp và khả năng đỡ hệ thống vận hành êm.',
    idealRoles: ['đối tác', 'hành chính', 'pháp vụ', 'điều phối'],
    relationshipNeeds: ['tôn trọng', 'giữ lời', 'không chơi trò quyền lực mập mờ'],
    stressSignals: ['chiều quá mức', 'khó từ chối', 'mệt vì gánh hòa khí cho tất cả'],
    growthKeys: ['quyết hơn khi cần', 'đặt ranh giới', 'đừng lấy yên bình giả làm hòa hợp'],
    relatedStars: ['Tử Vi', 'Thiên Phủ', 'Thái Dương'],
    keywords: ['công bằng', 'phối hợp', 'chuẩn mực', 'đồng hành'],
  },
  {
    slug: 'thien-luong',
    name: 'Thiên Lương',
    brief: 'Chủ tinh che chở, đạo lý, cứu giải, thiên về trách nhiệm và phẩm chất.',
    strengths: ['đạo đức nghề', 'độ chín', 'khả năng nâng đỡ người khác'],
    cautions: ['dễ thành người gánh hộ', 'hay lo hộ', 'mang giọng dạy bảo'],
    loveStyle: 'Cần sự trưởng thành, đáng tin và trách nhiệm cao.',
    careerStyle: 'Hợp y tế, luật, giáo dục, quản lý, công việc vì cộng đồng.',
    wealthStyle: 'Tài lộc bền khi đi đường dài và giữ uy tín.',
    healthStyle: 'Cần giữ gan mật, huyết áp và giảm lo nghĩ quá mức.',
    archetype: 'Người làm mái che, giữ đạo và đỡ người qua đoạn khó.',
    elementStyle: 'Năng lượng đi theo trách nhiệm, cứu giải và giá trị đạo lý bền.',
    idealRoles: ['y tế', 'luật', 'giáo dục', 'quản lý giàu đạo đức nghề'],
    relationshipNeeds: ['độ chín', 'niềm tin', 'đối tác biết chịu trách nhiệm'],
    stressSignals: ['lo hộ quá mức', 'nói như dạy bảo', 'gánh vai không phải của mình'],
    growthKeys: ['cứu đúng mức', 'học buông hộ', 'chuyển kinh nghiệm thành dẫn đường thay vì áp đặt'],
    relatedStars: ['Thái Dương', 'Thiên Đồng', 'Thiên Tướng'],
    keywords: ['che chở', 'đạo lý', 'cứu giải', 'trách nhiệm'],
  },
  {
    slug: 'that-sat',
    name: 'Thất Sát',
    brief: 'Chủ tinh bản lĩnh, phá thế, chịu áp lực cao, quyết nhanh trong môi trường gắt.',
    strengths: ['gan', 'bứt phá', 'chịu trận tốt'],
    cautions: ['cứng', 'cực đoan', 'dễ làm người khác thấy áp lực'],
    loveStyle: 'Yêu mạnh, rõ, nhưng cần học mềm và kiên nhẫn.',
    careerStyle: 'Hợp startup, quân lệnh, dự án khó, vai trò xử lý khủng hoảng.',
    wealthStyle: 'Tiền đến mạnh khi dám vào việc khó, nhưng cần quản rủi ro.',
    healthStyle: 'Cần tránh quá sức, va chạm và nhịp sinh hoạt thất thường.',
    archetype: 'Người mở đường trong địa hình khó và áp lực cao.',
    elementStyle: 'Năng lượng đi theo quyết chiến, bứt phá và khả năng cắt qua trì trệ.',
    idealRoles: ['startup', 'khủng hoảng', 'đi đầu', 'môi trường áp lực cao'],
    relationshipNeeds: ['thật', 'rõ', 'đối tác không chơi trò tâm lý'],
    stressSignals: ['quá cứng', 'nóng nhanh', 'đi quá xa trước khi kịp nhìn người đi cùng'],
    growthKeys: ['mềm đúng lúc', 'giảm phản xạ thắng - thua', 'để sức mạnh đi cùng nhịp bền'],
    relatedStars: ['Vũ Khúc', 'Phá Quân', 'Liêm Trinh'],
    keywords: ['bản lĩnh', 'bứt phá', 'áp lực', 'mũi nhọn'],
  },
  {
    slug: 'pha-quan',
    name: 'Phá Quân',
    brief: 'Chủ tinh cải tổ, phá cũ mở mới, rất hợp đổi đời nhưng ít hợp đứng yên lâu.',
    strengths: ['sáng tạo kiểu đập đi làm lại', 'thích nghi sau biến động', 'dám thử'],
    cautions: ['biến động cao', 'khó chịu khuôn cũ', 'dễ phá nhịp ổn định'],
    loveStyle: 'Cần khoảng thở, sự thật và tự do trong khuôn cam kết rõ.',
    careerStyle: 'Hợp chuyển đổi, công nghệ, sáng tạo, thương trường biến động.',
    wealthStyle: 'Có thể lên nhanh xuống nhanh; quan trọng nhất là quản trị rủi ro.',
    healthStyle: 'Cần giữ thần kinh, giấc ngủ và sức bền khi đổi nhịp lớn.',
    archetype: 'Người đập khung cũ để mở cục diện khác.',
    elementStyle: 'Năng lượng đi theo thay đổi mạnh, tái cấu trúc và phản xạ thích nghi sau đổ vỡ.',
    idealRoles: ['chuyển đổi', 'công nghệ', 'đột phá', 'thương trường biến động'],
    relationshipNeeds: ['không gian thở', 'sự thật', 'cam kết đủ rõ để tự do không thành hỗn loạn'],
    stressSignals: ['đổi quá nhanh', 'chán ổn định', 'tự phá nền khi bí'],
    growthKeys: ['đổi có chiến lược', 'giữ một trục ổn định', 'không biến tự do thành đứt gãy'],
    relatedStars: ['Liêm Trinh', 'Thất Sát', 'Tham Lang'],
    keywords: ['cải tổ', 'đột phá', 'biến động', 'thay mới'],
  },
];

export const TOPICS: TopicDefinition[] = [
  { slug: 'overview', label: 'Tổng quan', palaceLabel: 'Mệnh', intro: 'định khí chất và cách đi đường đời', advice: 'Giữ trục tính cách đúng trước khi tối ưu kỹ thuật sống.' },
  { slug: 'personality', label: 'Tính cách', palaceLabel: 'Mệnh', intro: 'nói về khí chất, phản ứng bản năng và động lực sâu', advice: 'Hiểu tính khí giúp giảm tự xung đột và chọn môi trường đúng.' },
  { slug: 'love', label: 'Tình cảm', palaceLabel: 'Phu thê', intro: 'nói về cách yêu, cách gắn bó và kỳ vọng trong quan hệ', advice: 'Đừng chỉ xem hợp - khắc; hãy nhìn cả khả năng trưởng thành trong quan hệ.' },
  { slug: 'career', label: 'Sự nghiệp', palaceLabel: 'Quan lộc', intro: 'nói về nghề hợp, cách làm việc và kiểu thành tựu', advice: 'Chọn đúng kiểu công việc quan trọng hơn chạy theo danh xưng.' },
  { slug: 'wealth', label: 'Tài bạch', palaceLabel: 'Tài bạch', intro: 'nói về nhịp kiếm tiền, giữ tiền và thái độ với vật chất', advice: 'Tài bạch tốt vẫn cần kỷ luật quản tiền và quyết định đúng chu kỳ.' },
  { slug: 'health', label: 'Sức khỏe', palaceLabel: 'Tật ách', intro: 'nói về điểm cơ địa dễ hao và kiểu stress thường gặp', advice: 'Lá số chỉ ra vùng cần giữ; thói quen hàng ngày mới quyết định kết quả.' },
  { slug: 'family', label: 'Gia đình', palaceLabel: 'Huynh đệ', intro: 'nói về quan hệ thân tộc, anh em và cách gắn kết trong nhà', advice: 'Gia đạo êm nhất khi biết phân vai, bớt kỳ vọng vô lời.' },
  { slug: 'children', label: 'Con cái', palaceLabel: 'Tử tức', intro: 'nói về duyên con cái, cách nuôi dạy và truyền năng lượng đời sau', advice: 'Cách truyền nếp quan trọng không kém việc lo vật chất.' },
  { slug: 'move', label: 'Di chuyển', palaceLabel: 'Thiên di', intro: 'nói về môi trường bên ngoài, đi xa, đổi chỗ và gặp người lạ', advice: 'Thiên di tốt thường mở vận khi dám bước ra ngoài vòng quen.' },
  { slug: 'friends', label: 'Bạn bè', palaceLabel: 'Nô bộc', intro: 'nói về cộng sự, bạn đồng hành và kiểu mạng lưới xã hội', advice: 'Mở rộng quan hệ đúng người tốt hơn mở rộng thật nhiều.' },
  { slug: 'home', label: 'Nhà cửa', palaceLabel: 'Điền trạch', intro: 'nói về nhà cửa, tài sản nền và cảm giác an cư', advice: 'Điền trạch mạnh nên đi cùng kế hoạch tích sản rõ ràng.' },
  { slug: 'spirit', label: 'Tinh thần', palaceLabel: 'Phúc đức', intro: 'nói về chiều sâu tinh thần, độ bền cảm xúc và phúc khí nội tâm', advice: 'Phúc đức là nền bền; tinh thần vững thì các cung khác mới bớt lệch.' },
  { slug: 'parents', label: 'Cha mẹ', palaceLabel: 'Phụ mẫu', intro: 'nói về ảnh hưởng gốc rễ, khuôn phép và bài học từ thế hệ trước', advice: 'Hiểu cung Phụ mẫu giúp tách bài học thật khỏi áp lực vô hình.' },
];

const STAR_BY_SLUG = Object.fromEntries(STAR_PROFILES.map((profile) => [profile.slug, profile] as const));
const TOPIC_BY_SLUG = Object.fromEntries(TOPICS.map((topic) => [topic.slug, topic] as const));

function topicSpecificText(profile: StarProfile, topic: TopicDefinition) {
  if (topic.slug === 'love') return profile.loveStyle;
  if (topic.slug === 'career') return profile.careerStyle;
  if (topic.slug === 'wealth') return profile.wealthStyle;
  if (topic.slug === 'health') return profile.healthStyle;
  if (topic.slug === 'personality') return `Nổi bật ở ${profile.strengths.join(', ')}; cần canh chừng ${profile.cautions.join(', ')}.`;
  if (topic.slug === 'spirit') return `${profile.name} ở trục tinh thần thường cho bài học về cách giữ nhịp nội tâm, xử lý áp lực và nuôi phúc khí đúng chất sao.`;
  if (topic.slug === 'family') return `${profile.name} trong vùng gia đạo cho thấy cách đương số chia vai trò, trách nhiệm và tình nghĩa trong nhà.`;
  if (topic.slug === 'children') return `${profile.name} ở trục con cái nói nhiều về cách truyền nếp, kỳ vọng và năng lượng nuôi dưỡng đời sau.`;
  if (topic.slug === 'move') return `${profile.name} khi chiếu ra ngoài thường cho biết ra ngoài có sáng vận hay dễ va chạm, hợp ổn định hay hợp bôn ba.`;
  if (topic.slug === 'friends') return `${profile.name} ở vùng bạn bè - cộng sự phản ánh kiểu người đồng hành đương số hút vào đời mình.`;
  if (topic.slug === 'home') return `${profile.name} trong cung nhà cửa thường cho biết gu an cư, nhịp tích sản và cách giữ nền vật chất.`;
  if (topic.slug === 'parents') return `${profile.name} ở trục cha mẹ cho thấy ảnh hưởng của khuôn phép, nâng đỡ và áp lực từ thế hệ trước.`;
  return profile.brief;
}

function topicLens(profile: StarProfile, topic: TopicDefinition) {
  if (topic.slug === 'overview') return `${profile.name} khi luận tổng quan thường nhấn mạnh ${profile.archetype.toLowerCase()} ${profile.elementStyle.toLowerCase()}`;
  if (topic.slug === 'personality') return `Tính cách của ${profile.name} đi theo ${profile.keywords.join(', ')}, nên điểm mạnh và điểm lệch đều lộ khá rõ qua phản ứng hàng ngày.`;
  if (topic.slug === 'love') return `Trong chuyện tình cảm, ${profile.name} cần ${profile.relationshipNeeds.join(', ')}. Khi thiếu các điều này, sao dễ nghiêng về ${profile.cautions.join(', ')}.`;
  if (topic.slug === 'career') return `Ở sự nghiệp, ${profile.name} phát sáng khi đứng đúng vai như ${profile.idealRoles.join(', ')}. Sai vai dễ sinh hao lực kéo dài.`;
  if (topic.slug === 'wealth') return `Ở tài bạch, trục kiếm - giữ tiền của ${profile.name} chịu ảnh hưởng mạnh từ ${profile.wealthStyle.toLowerCase()}`;
  if (topic.slug === 'health') return `Ở tật ách, ${profile.name} thường báo trước qua các tín hiệu như ${profile.stressSignals.join(', ')}.`;
  return topicSpecificText(profile, topic);
}

function buildSections(profile: StarProfile, topic: TopicDefinition): KnowledgeSection[] {
  return [
    {
      title: 'Chân dung khí chất',
      body: `${profile.brief} ${profile.archetype} ${profile.elementStyle}`,
      bullets: profile.keywords,
    },
    {
      title: `Luận theo trục ${topic.palaceLabel}`,
      body: topicLens(profile, topic),
      bullets: [topic.intro, topic.advice, profile.growthKeys[0]],
    },
    {
      title: 'Điểm mạnh nên khai thác',
      body: `${profile.name} mạnh nhất khi dùng đúng chất sao thay vì cố hóa thành kiểu người khác.`,
      bullets: profile.strengths,
    },
    {
      title: 'Điểm dễ lệch nếu đi quá tay',
      body: `Mặt bóng của ${profile.name} thường xuất hiện khi áp lực tăng hoặc khi đương số cố kiểm soát thứ vốn cần mềm hơn.`,
      bullets: profile.cautions,
    },
    {
      title: 'Cách dùng thực tế',
      body: `${profile.name} nên đưa chất sao vào bối cảnh đúng: vai trò phù hợp, nhịp sống phù hợp, người đồng hành phù hợp.`,
      bullets: profile.idealRoles.concat(profile.growthKeys).slice(0, 6),
    },
  ];
}

export function getKnowledgeEntry(starSlug: string, topicSlug: KnowledgeTopic): KnowledgeEntry | null {
  const profile = STAR_BY_SLUG[starSlug];
  const topic = TOPIC_BY_SLUG[topicSlug];
  if (!profile || !topic) return null;
  return {
    star: profile.name,
    starSlug: profile.slug,
    topic: topic.slug,
    topicLabel: topic.label,
    palaceLabel: topic.palaceLabel,
    summary: `${profile.name} ${topic.label.toLowerCase()} thiên về ${topic.intro}.`,
    core: `${profile.brief} Trong chủ đề ${topic.label.toLowerCase()}, sắc thái nổi bật là: ${topicSpecificText(profile, topic)}`,
    basis: `Luận theo khí chất gốc của ${profile.name}, rồi quy chiếu vào trục ${topic.palaceLabel}. Ưu điểm mạnh gồm ${profile.strengths.join(', ')}. Điểm cần giữ gồm ${profile.cautions.join(', ')}.`,
    guidance: `${topic.advice} Với ${profile.name}, nên ưu tiên ${profile.strengths[0]}, đồng thời tiết chế ${profile.cautions[0]}.`,
    headline: `${profile.name} ở chủ đề ${topic.label.toLowerCase()} mạnh nhất khi đi đúng chất ${profile.keywords[0]} và ${profile.keywords[1]}.`,
    cautionHeadline: `Điểm cần giữ của ${profile.name} là tránh trượt sang ${profile.cautions.join(', ')}.`,
    practicalUse: `Ứng dụng thực tế: dùng ${profile.name} để chọn môi trường, cách yêu, cách làm việc và nhịp giữ sức phù hợp với chính khí chất của mình.`,
    keywords: profile.keywords,
    relatedTopics: TOPICS.map((item) => item.slug).filter((item) => item !== topic.slug).slice(0, 6),
    relatedStars: profile.relatedStars,
    sections: buildSections(profile, topic),
  };
}

export function getAllKnowledgeRoutes() {
  return STAR_PROFILES.flatMap((profile) => TOPICS.map((topic) => ({ star: profile.slug, topic: topic.slug })));
}

export function getStarSlugByName(starName: string) {
  return STAR_PROFILES.find((profile) => profile.name === starName)?.slug || null;
}

export function getStarProfile(starSlug: string) {
  return STAR_BY_SLUG[starSlug] || null;
}

export function getTopicDefinition(topicSlug: KnowledgeTopic) {
  return TOPIC_BY_SLUG[topicSlug] || null;
}
